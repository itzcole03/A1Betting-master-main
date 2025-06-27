#!/usr/bin/env python3
"""
Backend Performance Profiler for A1Betting Automation System
Comprehensive performance analysis and profiling for Python backend.
"""

import asyncio
import cProfile
import io
import json
import logging
import os
import pstats
import sys
import time
import tracemalloc
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List
import subprocess

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class BackendProfiler:
    """Comprehensive backend performance profiler."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'profiling_results': {},
            'performance_metrics': {},
            'bottlenecks': [],
            'recommendations': [],
            'summary': {}
        }
        self.project_root = Path.cwd()
        self.backend_path = self.project_root / "backend"
    
    def check_backend_availability(self) -> bool:
        """Check if backend directory and main files exist."""
        if not self.backend_path.exists():
            logger.error("Backend directory not found")
            return False
        
        # Look for main application files
        main_files = [
            'main.py',
            'app.py',
            'server.py',
            'wsgi.py',
            'asgi.py'
        ]
        
        found_main = any((self.backend_path / f).exists() for f in main_files)
        if not found_main:
            logger.warning("No main application file found in backend directory")
        
        return True
    
    def profile_startup_time(self) -> Dict[str, Any]:
        """Profile application startup time."""
        try:
            logger.info("Profiling backend startup time...")
            
            # Look for main application file
            main_files = ['main.py', 'app.py', 'server.py']
            main_file = None
            
            for file in main_files:
                if (self.backend_path / file).exists():
                    main_file = file
                    break
            
            if not main_file:
                return {
                    'status': 'skipped',
                    'reason': 'No main application file found'
                }
            
            # Profile startup
            startup_code = f"""
import sys
import time
sys.path.insert(0, '{self.backend_path}')

start_time = time.time()
try:
    import {main_file.split('.')[0]}
    startup_time = time.time() - start_time
    print(f"STARTUP_TIME: {{startup_time:.4f}}")
except Exception as e:
    print(f"STARTUP_ERROR: {{e}}")
"""
            
            result = subprocess.run(
                [sys.executable, '-c', startup_code],
                capture_output=True,
                text=True,
                timeout=30,
                cwd=self.backend_path
            )
            
            if 'STARTUP_TIME:' in result.stdout:
                startup_time = float(result.stdout.split('STARTUP_TIME:')[1].split()[0])
                return {
                    'status': 'completed',
                    'startup_time_seconds': startup_time,
                    'main_file': main_file
                }
            else:
                return {
                    'status': 'error',
                    'error': result.stderr or result.stdout,
                    'main_file': main_file
                }
                
        except subprocess.TimeoutExpired:
            return {
                'status': 'timeout',
                'error': 'Startup profiling timed out after 30 seconds'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def profile_memory_usage(self) -> Dict[str, Any]:
        """Profile memory usage patterns."""
        try:
            logger.info("Profiling memory usage...")
            
            # Start memory tracing
            tracemalloc.start()
            
            # Simulate typical application operations
            memory_snapshots = []
            
            # Initial snapshot
            initial_snapshot = tracemalloc.take_snapshot()
            memory_snapshots.append({
                'stage': 'initial',
                'timestamp': time.time(),
                'snapshot': initial_snapshot
            })
            
            # Import main modules
            try:
                sys.path.insert(0, str(self.backend_path))
                
                # Try to import common modules
                common_modules = ['models', 'services', 'routes', 'utils', 'config']
                imported_modules = []
                
                for module in common_modules:
                    try:
                        __import__(module)
                        imported_modules.append(module)
                        
                        snapshot = tracemalloc.take_snapshot()
                        memory_snapshots.append({
                            'stage': f'after_import_{module}',
                            'timestamp': time.time(),
                            'snapshot': snapshot
                        })
                    except ImportError:
                        continue
                
                # Final snapshot
                final_snapshot = tracemalloc.take_snapshot()
                memory_snapshots.append({
                    'stage': 'final',
                    'timestamp': time.time(),
                    'snapshot': final_snapshot
                })
                
            except Exception as import_error:
                logger.warning(f"Error during module import: {import_error}")
            
            # Analyze memory usage
            memory_analysis = self.analyze_memory_snapshots(memory_snapshots)
            
            tracemalloc.stop()
            
            return {
                'status': 'completed',
                'imported_modules': imported_modules,
                'memory_analysis': memory_analysis
            }
            
        except Exception as e:
            tracemalloc.stop()
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def analyze_memory_snapshots(self, snapshots: List[Dict]) -> Dict[str, Any]:
        """Analyze memory snapshots for patterns and leaks."""
        analysis = {
            'peak_memory_mb': 0,
            'memory_growth_mb': 0,
            'top_allocators': [],
            'memory_timeline': []
        }
        
        if len(snapshots) < 2:
            return analysis
        
        try:
            initial_snapshot = snapshots[0]['snapshot']
            final_snapshot = snapshots[-1]['snapshot']
            
            # Calculate memory growth
            initial_stats = initial_snapshot.statistics('lineno')
            final_stats = final_snapshot.statistics('lineno')
            
            initial_total = sum(stat.size for stat in initial_stats)
            final_total = sum(stat.size for stat in final_stats)
            
            analysis['memory_growth_mb'] = round((final_total - initial_total) / (1024 * 1024), 2)
            analysis['peak_memory_mb'] = round(final_total / (1024 * 1024), 2)
            
            # Top memory allocators
            top_stats = final_stats[:10]
            analysis['top_allocators'] = [
                {
                    'filename': stat.traceback.format()[-1] if stat.traceback else 'unknown',
                    'size_mb': round(stat.size / (1024 * 1024), 2),
                    'count': stat.count
                }
                for stat in top_stats
            ]
            
            # Memory timeline
            for snapshot_info in snapshots:
                snapshot = snapshot_info['snapshot']
                stats = snapshot.statistics('lineno')
                total_size = sum(stat.size for stat in stats)
                
                analysis['memory_timeline'].append({
                    'stage': snapshot_info['stage'],
                    'memory_mb': round(total_size / (1024 * 1024), 2),
                    'timestamp': snapshot_info['timestamp']
                })
                
        except Exception as e:
            logger.warning(f"Error analyzing memory snapshots: {e}")
        
        return analysis
    
    def profile_with_cprofile(self) -> Dict[str, Any]:
        """Profile using cProfile for detailed function-level analysis."""
        try:
            logger.info("Running cProfile analysis...")
            
            # Create a simple test script to profile
            test_script = f"""
import sys
sys.path.insert(0, '{self.backend_path}')

# Import and run basic operations
try:
    # Try to import main modules
    modules_to_test = []
    
    # Common module patterns
    import os
    for item in os.listdir('{self.backend_path}'):
        if item.endswith('.py') and not item.startswith('_'):
            module_name = item[:-3]
            try:
                exec(f'import {{module_name}}')
                modules_to_test.append(module_name)
            except:
                pass
    
    print(f"Profiled modules: {{modules_to_test}}")
    
except Exception as e:
    print(f"Profiling error: {{e}}")
"""
            
            # Run cProfile
            pr = cProfile.Profile()
            pr.enable()
            
            # Execute the test script
            exec(test_script)
            
            pr.disable()
            
            # Get profiling statistics
            s = io.StringIO()
            stats = pstats.Stats(pr, stream=s)
            stats.sort_stats('cumulative')
            stats.print_stats(20)  # Top 20 functions
            
            profile_output = s.getvalue()
            
            # Parse statistics
            stats.sort_stats('tottime')
            top_time_consuming = []
            
            for func, (cc, nc, tt, ct, callers) in stats.stats.items():
                if tt > 0.001:  # Only functions taking more than 1ms
                    top_time_consuming.append({
                        'function': f"{func[0]}:{func[1]}({func[2]})",
                        'total_time': round(tt, 4),
                        'cumulative_time': round(ct, 4),
                        'call_count': nc
                    })
            
            top_time_consuming.sort(key=lambda x: x['total_time'], reverse=True)
            
            # Save detailed profile
            profile_file = self.project_root / "automation/reports/backend_profile.prof"
            pr.dump_stats(str(profile_file))
            
            return {
                'status': 'completed',
                'profile_output': profile_output,
                'top_functions': top_time_consuming[:10],
                'profile_file': str(profile_file)
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def analyze_code_complexity(self) -> Dict[str, Any]:
        """Analyze code complexity and potential performance issues."""
        try:
            logger.info("Analyzing code complexity...")
            
            complexity_analysis = {
                'files_analyzed': 0,
                'total_lines': 0,
                'complex_functions': [],
                'large_files': [],
                'import_analysis': {}
            }
            
            # Analyze Python files in backend
            python_files = list(self.backend_path.glob('**/*.py'))
            
            for py_file in python_files:
                try:
                    with open(py_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                        lines = content.split('\n')
                    
                    complexity_analysis['files_analyzed'] += 1
                    complexity_analysis['total_lines'] += len(lines)
                    
                    # Check for large files
                    if len(lines) > 500:
                        complexity_analysis['large_files'].append({
                            'file': str(py_file.relative_to(self.backend_path)),
                            'lines': len(lines)
                        })
                    
                    # Analyze imports
                    imports = [line.strip() for line in lines if line.strip().startswith(('import ', 'from '))]
                    complexity_analysis['import_analysis'][str(py_file.relative_to(self.backend_path))] = len(imports)
                    
                    # Look for complex functions (simple heuristic)
                    function_lines = [i for i, line in enumerate(lines) if line.strip().startswith('def ')]
                    for func_line in function_lines:
                        # Count indented lines after function definition
                        func_end = func_line + 1
                        while func_end < len(lines) and (lines[func_end].startswith('    ') or lines[func_end].strip() == ''):
                            func_end += 1
                        
                        func_length = func_end - func_line
                        if func_length > 50:  # Functions longer than 50 lines
                            func_name = lines[func_line].strip().split('(')[0].replace('def ', '')
                            complexity_analysis['complex_functions'].append({
                                'file': str(py_file.relative_to(self.backend_path)),
                                'function': func_name,
                                'lines': func_length
                            })
                
                except Exception as e:
                    logger.warning(f"Error analyzing {py_file}: {e}")
            
            # Sort results
            complexity_analysis['large_files'].sort(key=lambda x: x['lines'], reverse=True)
            complexity_analysis['complex_functions'].sort(key=lambda x: x['lines'], reverse=True)
            
            return {
                'status': 'completed',
                'analysis': complexity_analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_comprehensive_profiling(self) -> Dict[str, Any]:
        """Run all profiling analyses."""
        logger.info("Starting comprehensive backend profiling...")
        
        if not self.check_backend_availability():
            return {
                'error': 'Backend not available for profiling'
            }
        
        # Run all profiling methods
        self.results['profiling_results']['startup'] = self.profile_startup_time()
        self.results['profiling_results']['memory'] = self.profile_memory_usage()
        self.results['profiling_results']['cprofile'] = self.profile_with_cprofile()
        self.results['profiling_results']['complexity'] = self.analyze_code_complexity()
        
        # Analyze results and generate recommendations
        self.analyze_results()
        
        return self.results
    
    def analyze_results(self):
        """Analyze profiling results and generate recommendations."""
        bottlenecks = []
        recommendations = []
        
        # Analyze startup time
        startup = self.results['profiling_results'].get('startup', {})
        if startup.get('status') == 'completed':
            startup_time = startup.get('startup_time_seconds', 0)
            if startup_time > 5:
                bottlenecks.append({
                    'type': 'slow_startup',
                    'severity': 'high',
                    'description': f"Slow startup time: {startup_time:.2f}s"
                })
                recommendations.append("Optimize imports and initialization code to reduce startup time")
            elif startup_time > 2:
                bottlenecks.append({
                    'type': 'moderate_startup',
                    'severity': 'medium',
                    'description': f"Moderate startup time: {startup_time:.2f}s"
                })
        
        # Analyze memory usage
        memory = self.results['profiling_results'].get('memory', {})
        if memory.get('status') == 'completed':
            memory_analysis = memory.get('memory_analysis', {})
            peak_memory = memory_analysis.get('peak_memory_mb', 0)
            memory_growth = memory_analysis.get('memory_growth_mb', 0)
            
            if peak_memory > 500:
                bottlenecks.append({
                    'type': 'high_memory',
                    'severity': 'high',
                    'description': f"High memory usage: {peak_memory:.1f}MB"
                })
                recommendations.append("Investigate high memory usage and optimize data structures")
            
            if memory_growth > 100:
                bottlenecks.append({
                    'type': 'memory_growth',
                    'severity': 'medium',
                    'description': f"Significant memory growth: {memory_growth:.1f}MB"
                })
                recommendations.append("Check for potential memory leaks during startup")
        
        # Analyze code complexity
        complexity = self.results['profiling_results'].get('complexity', {})
        if complexity.get('status') == 'completed':
            analysis = complexity.get('analysis', {})
            large_files = analysis.get('large_files', [])
            complex_functions = analysis.get('complex_functions', [])
            
            if len(large_files) > 0:
                bottlenecks.append({
                    'type': 'large_files',
                    'severity': 'medium',
                    'description': f"{len(large_files)} files with >500 lines"
                })
                recommendations.append("Consider refactoring large files into smaller modules")
            
            if len(complex_functions) > 0:
                bottlenecks.append({
                    'type': 'complex_functions',
                    'severity': 'medium',
                    'description': f"{len(complex_functions)} functions with >50 lines"
                })
                recommendations.append("Refactor complex functions into smaller, more manageable pieces")
        
        # Performance summary
        performance_score = 100
        
        for bottleneck in bottlenecks:
            if bottleneck['severity'] == 'high':
                performance_score -= 25
            elif bottleneck['severity'] == 'medium':
                performance_score -= 10
            else:
                performance_score -= 5
        
        performance_score = max(0, performance_score)
        
        self.results['bottlenecks'] = bottlenecks
        self.results['recommendations'] = recommendations
        self.results['summary'] = {
            'performance_score': performance_score,
            'bottlenecks_found': len(bottlenecks),
            'recommendations_count': len(recommendations),
            'overall_status': 'excellent' if performance_score >= 90 else
                            'good' if performance_score >= 80 else
                            'fair' if performance_score >= 70 else
                            'poor' if performance_score >= 50 else 'critical'
        }
    
    def generate_report(self) -> str:
        """Generate a human-readable profiling report."""
        summary = self.results.get('summary', {})
        
        status_emoji = {
            'excellent': '🟢',
            'good': '🟡',
            'fair': '🟠',
            'poor': '🔴',
            'critical': '🚨'
        }
        
        report = f"""
⚡ BACKEND PERFORMANCE PROFILING REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Performance Score: {summary.get('performance_score', 0)}/100
Overall Status: {status_emoji.get(summary.get('overall_status'), '❓')} {summary.get('overall_status', 'unknown').upper()}

📊 PROFILING RESULTS:
"""
        
        # Startup time
        startup = self.results['profiling_results'].get('startup', {})
        if startup.get('status') == 'completed':
            startup_time = startup.get('startup_time_seconds', 0)
            emoji = "🟢" if startup_time < 2 else "🟡" if startup_time < 5 else "🔴"
            report += f"   {emoji} Startup Time: {startup_time:.2f}s\n"
        
        # Memory usage
        memory = self.results['profiling_results'].get('memory', {})
        if memory.get('status') == 'completed':
            memory_analysis = memory.get('memory_analysis', {})
            peak_memory = memory_analysis.get('peak_memory_mb', 0)
            emoji = "🟢" if peak_memory < 100 else "🟡" if peak_memory < 500 else "🔴"
            report += f"   {emoji} Peak Memory: {peak_memory:.1f}MB\n"
        
        # Code complexity
        complexity = self.results['profiling_results'].get('complexity', {})
        if complexity.get('status') == 'completed':
            analysis = complexity.get('analysis', {})
            files_analyzed = analysis.get('files_analyzed', 0)
            total_lines = analysis.get('total_lines', 0)
            report += f"   📁 Files Analyzed: {files_analyzed} ({total_lines:,} lines)\n"
        
        # Bottlenecks
        if self.results.get('bottlenecks'):
            report += f"\n⚠️  PERFORMANCE BOTTLENECKS:\n"
            for bottleneck in self.results['bottlenecks'][:5]:  # Top 5
                severity_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
                emoji = severity_emoji.get(bottleneck['severity'], '❓')
                report += f"   {emoji} {bottleneck['description']}\n"
        
        # Recommendations
        if self.results.get('recommendations'):
            report += f"\n💡 OPTIMIZATION RECOMMENDATIONS:\n"
            for rec in self.results['recommendations'][:5]:  # Top 5
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        profiler = BackendProfiler()
        results = profiler.run_comprehensive_profiling()
        
        # Generate and display report
        report = profiler.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/backend_performance.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on performance score
        score = results.get('summary', {}).get('performance_score', 0)
        if score >= 80:
            logger.info("Backend profiling completed - Performance is good")
            sys.exit(0)
        elif score >= 50:
            logger.warning("Backend profiling completed - Performance needs improvement")
            sys.exit(1)
        else:
            logger.error("Backend profiling completed - Critical performance issues found")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Backend profiling failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
