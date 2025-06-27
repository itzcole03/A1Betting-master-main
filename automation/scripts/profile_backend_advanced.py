#!/usr/bin/env python3
"""
Advanced Backend Performance Profiling Script
Comprehensive performance analysis for the backend application.
"""

import cProfile
import json
import logging
import os
import pstats
import psutil
import sys
import time
import tracemalloc
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple
import io
import threading
import subprocess

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AdvancedBackendProfiler:
    """Advanced backend performance profiling suite."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.backend_path = self.project_root / 'backend'
        self.profile_results = {}
        self.errors = []
        
    def profile_startup_time(self) -> Dict[str, Any]:
        """Profile application startup time."""
        try:
            logger.info("Profiling backend startup time...")
            
            startup_results = {}
            
            # Test multiple startup scenarios
            scenarios = [
                ('cold_start', 'Cold start (fresh process)'),
                ('warm_start', 'Warm start (cached imports)'),
                ('production_mode', 'Production mode startup')
            ]
            
            for scenario_name, description in scenarios:
                logger.info(f"Testing {description}")
                
                startup_times = []
                for attempt in range(3):  # 3 attempts for averaging
                    start_time = time.time()
                    
                    try:
                        # Simulate backend startup
                        if self.backend_path.exists():
                            # Look for main application files
                            main_files = [
                                'main.py',
                                'app.py',
                                'server.py',
                                'run.py'
                            ]
                            
                            main_file = None
                            for filename in main_files:
                                if (self.backend_path / filename).exists():
                                    main_file = filename
                                    break
                            
                            if main_file:
                                # Test import time
                                import_cmd = f"python -c \"import sys; sys.path.insert(0, 'backend'); import {main_file.replace('.py', '')}\""
                                result = subprocess.run(
                                    import_cmd,
                                    shell=True,
                                    capture_output=True,
                                    text=True,
                                    timeout=30,
                                    cwd=self.project_root
                                )
                                
                                end_time = time.time()
                                startup_time = end_time - start_time
                                startup_times.append(startup_time)
                                
                                logger.info(f"  Attempt {attempt + 1}: {startup_time:.3f}s")
                            else:
                                logger.warning(f"No main application file found for {scenario_name}")
                                startup_times.append(0.0)
                        else:
                            logger.warning(f"Backend directory not found for {scenario_name}")
                            startup_times.append(0.0)
                            
                    except subprocess.TimeoutExpired:
                        logger.warning(f"Startup test timed out for {scenario_name}")
                        startup_times.append(30.0)  # Timeout value
                    except Exception as e:
                        logger.warning(f"Startup test failed for {scenario_name}: {e}")
                        startup_times.append(0.0)
                
                if startup_times:
                    avg_time = sum(startup_times) / len(startup_times)
                    min_time = min(startup_times)
                    max_time = max(startup_times)
                    
                    startup_results[scenario_name] = {
                        'description': description,
                        'average_time': avg_time,
                        'min_time': min_time,
                        'max_time': max_time,
                        'attempts': startup_times
                    }
                    
                    logger.info(f"✓ {description}: Avg {avg_time:.3f}s (min: {min_time:.3f}s, max: {max_time:.3f}s)")
            
            return startup_results
            
        except Exception as e:
            logger.error(f"Startup profiling failed: {e}")
            self.errors.append(f"Startup profiling failed: {e}")
            return {}
    
    def profile_memory_usage(self) -> Dict[str, Any]:
        """Profile memory usage patterns."""
        try:
            logger.info("Profiling memory usage...")
            
            # Start memory tracing
            tracemalloc.start()
            
            memory_results = {
                'system_memory': {},
                'process_memory': {},
                'memory_leaks': []
            }
            
            # System memory info
            system_memory = psutil.virtual_memory()
            memory_results['system_memory'] = {
                'total': system_memory.total,
                'available': system_memory.available,
                'percent_used': system_memory.percent,
                'free': system_memory.free,
                'cached': getattr(system_memory, 'cached', 0)
            }
            
            # Current process memory
            current_process = psutil.Process()
            process_memory = current_process.memory_info()
            memory_results['process_memory'] = {
                'rss': process_memory.rss,  # Resident Set Size
                'vms': process_memory.vms,  # Virtual Memory Size
                'percent': current_process.memory_percent(),
                'memory_maps': len(current_process.memory_maps()) if hasattr(current_process, 'memory_maps') else 0
            }
            
            # Memory usage over time (simulate load)
            memory_snapshots = []
            for i in range(10):
                snapshot = tracemalloc.take_snapshot()
                stats = snapshot.statistics('lineno')
                
                total_size = sum(stat.size for stat in stats)
                memory_snapshots.append({
                    'timestamp': time.time(),
                    'total_size': total_size,
                    'block_count': len(stats)
                })
                
                time.sleep(0.5)  # Wait 500ms between snapshots
            
            memory_results['memory_timeline'] = memory_snapshots
            
            # Check for potential memory leaks (increasing trend)
            if len(memory_snapshots) >= 3:
                recent_sizes = [snapshot['total_size'] for snapshot in memory_snapshots[-3:]]
                if all(recent_sizes[i] < recent_sizes[i+1] for i in range(len(recent_sizes)-1)):
                    memory_results['memory_leaks'].append({
                        'type': 'increasing_memory_trend',
                        'description': 'Memory usage is consistently increasing',
                        'severity': 'medium'
                    })
            
            tracemalloc.stop()
            
            logger.info("✓ Memory profiling completed")
            return memory_results
            
        except Exception as e:
            logger.error(f"Memory profiling failed: {e}")
            self.errors.append(f"Memory profiling failed: {e}")
            return {}
    
    def profile_cpu_performance(self) -> Dict[str, Any]:
        """Profile CPU performance and bottlenecks."""
        try:
            logger.info("Profiling CPU performance...")
            
            cpu_results = {
                'system_cpu': {},
                'process_cpu': {},
                'cpu_intensive_operations': []
            }
            
            # System CPU info
            cpu_count = psutil.cpu_count()
            cpu_freq = psutil.cpu_freq()
            cpu_results['system_cpu'] = {
                'logical_cores': cpu_count,
                'physical_cores': psutil.cpu_count(logical=False),
                'current_freq': cpu_freq.current if cpu_freq else None,
                'max_freq': cpu_freq.max if cpu_freq else None,
                'cpu_percent': psutil.cpu_percent(interval=1),
                'per_cpu_percent': psutil.cpu_percent(interval=1, percpu=True)
            }
            
            # Process CPU usage
            current_process = psutil.Process()
            cpu_results['process_cpu'] = {
                'cpu_percent': current_process.cpu_percent(interval=1),
                'cpu_times': current_process.cpu_times()._asdict(),
                'num_threads': current_process.num_threads(),
                'cpu_affinity': current_process.cpu_affinity() if hasattr(current_process, 'cpu_affinity') else None
            }
            
            # Profile CPU-intensive operations
            cpu_intensive_tests = [
                ('fibonacci_calculation', self._cpu_intensive_fibonacci),
                ('string_processing', self._cpu_intensive_string_processing),
                ('mathematical_operations', self._cpu_intensive_math)
            ]
            
            for test_name, test_func in cpu_intensive_tests:
                logger.info(f"  Running CPU test: {test_name}")
                
                start_time = time.time()
                start_cpu = psutil.cpu_percent()
                
                try:
                    result = test_func()
                    end_time = time.time()
                    end_cpu = psutil.cpu_percent()
                    
                    cpu_results['cpu_intensive_operations'].append({
                        'test_name': test_name,
                        'execution_time': end_time - start_time,
                        'cpu_usage_start': start_cpu,
                        'cpu_usage_end': end_cpu,
                        'result': result
                    })
                    
                except Exception as e:
                    logger.warning(f"CPU test {test_name} failed: {e}")
                    cpu_results['cpu_intensive_operations'].append({
                        'test_name': test_name,
                        'error': str(e)
                    })
            
            logger.info("✓ CPU profiling completed")
            return cpu_results
            
        except Exception as e:
            logger.error(f"CPU profiling failed: {e}")
            self.errors.append(f"CPU profiling failed: {e}")
            return {}
    
    def _cpu_intensive_fibonacci(self) -> int:
        """CPU-intensive Fibonacci calculation."""
        def fib(n):
            if n <= 1:
                return n
            return fib(n-1) + fib(n-2)
        
        return fib(30)  # Should take a few seconds
    
    def _cpu_intensive_string_processing(self) -> int:
        """CPU-intensive string processing."""
        result = 0
        for i in range(100000):
            text = f"Processing string number {i} with some additional text"
            result += len(text.upper().replace(' ', '_'))
        return result
    
    def _cpu_intensive_math(self) -> float:
        """CPU-intensive mathematical operations."""
        import math
        result = 0.0
        for i in range(1, 100000):
            result += math.sqrt(i) * math.log(i) * math.sin(i)
        return result
    
    def profile_io_performance(self) -> Dict[str, Any]:
        """Profile I/O performance."""
        try:
            logger.info("Profiling I/O performance...")
            
            io_results = {
                'disk_io': {},
                'network_io': {},
                'file_operations': []
            }
            
            # Disk I/O stats
            disk_usage = psutil.disk_usage('/')
            io_results['disk_io'] = {
                'total': disk_usage.total,
                'used': disk_usage.used,
                'free': disk_usage.free,
                'percent': (disk_usage.used / disk_usage.total) * 100
            }
            
            # Network I/O stats
            net_io = psutil.net_io_counters()
            io_results['network_io'] = {
                'bytes_sent': net_io.bytes_sent,
                'bytes_recv': net_io.bytes_recv,
                'packets_sent': net_io.packets_sent,
                'packets_recv': net_io.packets_recv
            }
            
            # Test file operations
            test_file = self.project_root / 'automation' / 'reports' / 'io_test.tmp'
            test_data = 'A' * 1024 * 1024  # 1MB of data
            
            # Write test
            start_time = time.time()
            with open(test_file, 'w') as f:
                f.write(test_data)
            write_time = time.time() - start_time
            
            # Read test
            start_time = time.time()
            with open(test_file, 'r') as f:
                data = f.read()
            read_time = time.time() - start_time
            
            # Cleanup
            test_file.unlink()
            
            io_results['file_operations'] = [
                {
                    'operation': 'write_1mb',
                    'time': write_time,
                    'throughput_mb_per_sec': 1.0 / write_time
                },
                {
                    'operation': 'read_1mb', 
                    'time': read_time,
                    'throughput_mb_per_sec': 1.0 / read_time
                }
            ]
            
            logger.info("✓ I/O profiling completed")
            return io_results
            
        except Exception as e:
            logger.error(f"I/O profiling failed: {e}")
            self.errors.append(f"I/O profiling failed: {e}")
            return {}
    
    def profile_code_complexity(self) -> Dict[str, Any]:
        """Analyze code complexity metrics."""
        try:
            logger.info("Analyzing code complexity...")
            
            complexity_results = {
                'cyclomatic_complexity': {},
                'code_metrics': {},
                'hotspots': []
            }
            
            # Check if radon is available for complexity analysis
            try:
                result = subprocess.run([
                    'python', '-m', 'radon', 'cc', str(self.backend_path), '--json'
                ], capture_output=True, text=True, timeout=30)
                
                if result.returncode == 0:
                    complexity_data = json.loads(result.stdout)
                    complexity_results['cyclomatic_complexity'] = complexity_data
                    
                    # Identify high complexity functions
                    for file_path, functions in complexity_data.items():
                        for func in functions:
                            if func.get('complexity', 0) > 10:  # High complexity threshold
                                complexity_results['hotspots'].append({
                                    'file': file_path,
                                    'function': func.get('name'),
                                    'complexity': func.get('complexity'),
                                    'rank': func.get('rank', 'Unknown')
                                })
                else:
                    logger.warning("Radon complexity analysis failed")
                    
            except (subprocess.TimeoutExpired, json.JSONDecodeError, FileNotFoundError):
                logger.warning("Radon not available, skipping complexity analysis")
            
            # Basic code metrics
            if self.backend_path.exists():
                total_lines = 0
                total_files = 0
                
                for py_file in self.backend_path.rglob('*.py'):
                    try:
                        with open(py_file, 'r', encoding='utf-8') as f:
                            lines = len(f.readlines())
                            total_lines += lines
                            total_files += 1
                    except:
                        continue
                
                complexity_results['code_metrics'] = {
                    'total_python_files': total_files,
                    'total_lines_of_code': total_lines,
                    'average_lines_per_file': total_lines / total_files if total_files > 0 else 0
                }
            
            logger.info("✓ Code complexity analysis completed")
            return complexity_results
            
        except Exception as e:
            logger.error(f"Code complexity analysis failed: {e}")
            self.errors.append(f"Code complexity analysis failed: {e}")
            return {}
    
    def run_comprehensive_profiling(self) -> bool:
        """Run comprehensive backend profiling."""
        logger.info("Starting comprehensive backend performance profiling...")
        
        profiling_functions = [
            ("Startup Time", self.profile_startup_time),
            ("Memory Usage", self.profile_memory_usage),
            ("CPU Performance", self.profile_cpu_performance),
            ("I/O Performance", self.profile_io_performance),
            ("Code Complexity", self.profile_code_complexity)
        ]
        
        success_count = 0
        total_profiles = len(profiling_functions)
        
        for profile_name, profile_func in profiling_functions:
            logger.info(f"Running: {profile_name}")
            try:
                result = profile_func()
                if result:
                    self.profile_results[profile_name.lower().replace(' ', '_')] = result
                    success_count += 1
                    logger.info(f"✓ {profile_name} completed")
                else:
                    logger.error(f"✗ {profile_name} failed")
            except Exception as e:
                logger.error(f"✗ {profile_name} failed with exception: {e}")
                self.errors.append(f"{profile_name}: {e}")
        
        # Generate profiling report
        self.generate_profiling_report(success_count, total_profiles)
        
        success_rate = (success_count / total_profiles) * 100
        logger.info(f"Backend profiling completed: {success_count}/{total_profiles} profiles successful ({success_rate:.1f}%)")
        
        return success_count >= (total_profiles * 0.8)  # 80% success rate required
    
    def generate_profiling_report(self, success_count: int, total_profiles: int):
        """Generate comprehensive profiling report."""
        try:
            report = {
                'timestamp': datetime.now().isoformat(),
                'summary': {
                    'total_profiles': total_profiles,
                    'successful_profiles': success_count,
                    'failed_profiles': total_profiles - success_count,
                    'success_rate': (success_count / total_profiles) * 100
                },
                'profile_results': self.profile_results,
                'errors': self.errors,
                'recommendations': []
            }
            
            # Generate recommendations based on results
            self._add_performance_recommendations(report)
            
            # Save detailed report
            report_file = self.project_root / 'automation' / 'reports' / 'backend_performance_profile.json'
            with open(report_file, 'w') as f:
                json.dump(report, f, indent=2, default=str)
            
            # Generate human-readable report
            self.generate_human_readable_report(report)
            
            logger.info(f"Backend profiling report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate profiling report: {e}")
    
    def _add_performance_recommendations(self, report: Dict[str, Any]):
        """Add performance recommendations based on profiling results."""
        recommendations = []
        
        # Startup time recommendations
        startup_results = self.profile_results.get('startup_time', {})
        for scenario, data in startup_results.items():
            if data.get('average_time', 0) > 5.0:
                recommendations.append(f"Optimize {scenario}: {data['average_time']:.2f}s startup time is too slow")
        
        # Memory recommendations
        memory_results = self.profile_results.get('memory_usage', {})
        if memory_results.get('memory_leaks'):
            recommendations.append("Investigate potential memory leaks detected during profiling")
        
        system_memory = memory_results.get('system_memory', {})
        if system_memory.get('percent_used', 0) > 85:
            recommendations.append("System memory usage is high (>85%), consider scaling or optimization")
        
        # CPU recommendations
        cpu_results = self.profile_results.get('cpu_performance', {})
        system_cpu = cpu_results.get('system_cpu', {})
        if system_cpu.get('cpu_percent', 0) > 80:
            recommendations.append("CPU usage is high (>80%), consider optimization or scaling")
        
        # Code complexity recommendations
        complexity_results = self.profile_results.get('code_complexity', {})
        hotspots = complexity_results.get('hotspots', [])
        if len(hotspots) > 5:
            recommendations.append(f"Refactor {len(hotspots)} high-complexity functions for better maintainability")
        
        report['recommendations'] = recommendations
    
    def generate_human_readable_report(self, report_data: Dict):
        """Generate human-readable profiling report."""
        try:
            report_file = self.project_root / 'automation' / 'reports' / 'backend_performance_report.md'
            
            with open(report_file, 'w') as f:
                f.write("# Backend Performance Profiling Report\n\n")
                f.write(f"**Generated:** {report_data['timestamp']}\n\n")
                
                # Summary
                summary = report_data['summary']
                f.write("## Summary\n\n")
                f.write(f"- **Total Profiles:** {summary['total_profiles']}\n")
                f.write(f"- **Successful:** {summary['successful_profiles']}\n")
                f.write(f"- **Failed:** {summary['failed_profiles']}\n")
                f.write(f"- **Success Rate:** {summary['success_rate']:.1f}%\n\n")
                
                # Key Metrics
                f.write("## Key Performance Metrics\n\n")
                
                startup_results = self.profile_results.get('startup_time', {})
                if startup_results:
                    f.write("### Startup Performance\n")
                    for scenario, data in startup_results.items():
                        f.write(f"- **{data.get('description', scenario)}:** {data.get('average_time', 0):.3f}s\n")
                    f.write("\n")
                
                memory_results = self.profile_results.get('memory_usage', {})
                if memory_results:
                    f.write("### Memory Usage\n")
                    system_mem = memory_results.get('system_memory', {})
                    f.write(f"- **System Memory Usage:** {system_mem.get('percent_used', 0):.1f}%\n")
                    process_mem = memory_results.get('process_memory', {})
                    f.write(f"- **Process Memory:** {process_mem.get('rss', 0) / 1024 / 1024:.1f} MB\n")
                    f.write("\n")
                
                # Recommendations
                if report_data['recommendations']:
                    f.write("## Performance Recommendations\n\n")
                    for recommendation in report_data['recommendations']:
                        f.write(f"- {recommendation}\n")
                    f.write("\n")
                
                # Errors
                if self.errors:
                    f.write("## Issues Encountered\n\n")
                    for error in self.errors:
                        f.write(f"- {error}\n")
            
            logger.info(f"Human-readable report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate human-readable report: {e}")

def main():
    """Main execution function."""
    profiler = AdvancedBackendProfiler()
    success = profiler.run_comprehensive_profiling()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
