#!/usr/bin/env python3
"""
Performance Metrics Collector for A1Betting Automation System
Collects system and application performance metrics.
"""

import asyncio
import json
import logging
import os
import psutil
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List

import requests

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class MetricsCollector:
    """System and application metrics collector."""
    
    def __init__(self):
        self.metrics = {
            'timestamp': datetime.now().isoformat(),
            'system': {},
            'application': {},
            'network': {},
            'disk': {},
            'processes': {},
            'summary': {}
        }
    
    def collect_system_metrics(self) -> Dict[str, Any]:
        """Collect system-level performance metrics."""
        try:
            # CPU metrics
            cpu_percent = psutil.cpu_percent(interval=1)
            cpu_count = psutil.cpu_count()
            cpu_freq = psutil.cpu_freq()
            
            # Memory metrics
            memory = psutil.virtual_memory()
            swap = psutil.swap_memory()
            
            # Load average (Unix systems)
            load_avg = None
            try:
                load_avg = os.getloadavg()
            except (OSError, AttributeError):
                # Windows doesn't have load average
                pass
            
            system_metrics = {
                'cpu': {
                    'usage_percent': cpu_percent,
                    'count': cpu_count,
                    'frequency_mhz': cpu_freq.current if cpu_freq else None
                },
                'memory': {
                    'total_gb': round(memory.total / (1024**3), 2),
                    'available_gb': round(memory.available / (1024**3), 2),
                    'used_gb': round(memory.used / (1024**3), 2),
                    'usage_percent': memory.percent,
                    'swap_used_gb': round(swap.used / (1024**3), 2),
                    'swap_percent': swap.percent
                },
                'load_average': load_avg,
                'boot_time': datetime.fromtimestamp(psutil.boot_time()).isoformat()
            }
            
            return system_metrics
            
        except Exception as e:
            logger.error(f"Error collecting system metrics: {e}")
            return {'error': str(e)}
    
    def collect_disk_metrics(self) -> Dict[str, Any]:
        """Collect disk usage and I/O metrics."""
        try:
            # Disk usage for project directory
            project_path = Path.cwd()
            disk_usage = psutil.disk_usage(project_path)
            
            # Disk I/O statistics
            disk_io = psutil.disk_io_counters()
            
            disk_metrics = {
                'usage': {
                    'total_gb': round(disk_usage.total / (1024**3), 2),
                    'used_gb': round(disk_usage.used / (1024**3), 2),
                    'free_gb': round(disk_usage.free / (1024**3), 2),
                    'usage_percent': round((disk_usage.used / disk_usage.total) * 100, 2)
                },
                'io': {
                    'read_mb': round(disk_io.read_bytes / (1024**2), 2) if disk_io else None,
                    'write_mb': round(disk_io.write_bytes / (1024**2), 2) if disk_io else None,
                    'read_count': disk_io.read_count if disk_io else None,
                    'write_count': disk_io.write_count if disk_io else None
                } if disk_io else None
            }
            
            return disk_metrics
            
        except Exception as e:
            logger.error(f"Error collecting disk metrics: {e}")
            return {'error': str(e)}
    
    def collect_network_metrics(self) -> Dict[str, Any]:
        """Collect network usage metrics."""
        try:
            # Network I/O statistics
            net_io = psutil.net_io_counters()
            
            # Network connections
            connections = psutil.net_connections()
            listening_ports = [conn.laddr.port for conn in connections 
                             if conn.status == 'LISTEN' and conn.laddr]
            
            network_metrics = {
                'io': {
                    'bytes_sent_mb': round(net_io.bytes_sent / (1024**2), 2),
                    'bytes_recv_mb': round(net_io.bytes_recv / (1024**2), 2),
                    'packets_sent': net_io.packets_sent,
                    'packets_recv': net_io.packets_recv,
                    'errors_in': net_io.errin,
                    'errors_out': net_io.errout
                },
                'connections': {
                    'total_count': len(connections),
                    'listening_ports': sorted(set(listening_ports))[:20]  # First 20 ports
                }
            }
            
            return network_metrics
            
        except Exception as e:
            logger.error(f"Error collecting network metrics: {e}")
            return {'error': str(e)}
    
    def collect_process_metrics(self) -> Dict[str, Any]:
        """Collect process-specific metrics."""
        try:
            # Get current process and children
            current_process = psutil.Process()
            
            # Find related processes (Node.js, Python, etc.)
            related_processes = []
            for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'cmdline']):
                try:
                    if any(keyword in proc.info['name'].lower() 
                          for keyword in ['python', 'node', 'npm', 'docker']):
                        related_processes.append({
                            'pid': proc.info['pid'],
                            'name': proc.info['name'],
                            'cpu_percent': proc.info['cpu_percent'],
                            'memory_percent': proc.info['memory_percent'],
                            'cmdline': ' '.join(proc.info['cmdline'][:3]) if proc.info['cmdline'] else ''
                        })
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    continue
            
            # Sort by CPU usage
            related_processes.sort(key=lambda x: x['cpu_percent'] or 0, reverse=True)
            
            process_metrics = {
                'current_process': {
                    'pid': current_process.pid,
                    'cpu_percent': current_process.cpu_percent(),
                    'memory_percent': current_process.memory_percent(),
                    'memory_mb': round(current_process.memory_info().rss / (1024**2), 2)
                },
                'related_processes': related_processes[:10],  # Top 10 processes
                'total_processes': len(psutil.pids())
            }
            
            return process_metrics
            
        except Exception as e:
            logger.error(f"Error collecting process metrics: {e}")
            return {'error': str(e)}
    
    def collect_application_metrics(self) -> Dict[str, Any]:
        """Collect application-specific metrics."""
        try:
            app_metrics = {
                'endpoints': {},
                'services': {},
                'response_times': {}
            }
            
            # Test backend endpoint if available
            backend_url = os.getenv('BACKEND_URL', 'http://localhost:8000')
            try:
                start_time = time.time()
                response = requests.get(f"{backend_url}/health", timeout=5)
                response_time = (time.time() - start_time) * 1000
                
                app_metrics['endpoints']['backend'] = {
                    'status': 'healthy' if response.status_code == 200 else 'unhealthy',
                    'status_code': response.status_code,
                    'response_time_ms': round(response_time, 2)
                }
            except Exception as e:
                app_metrics['endpoints']['backend'] = {
                    'status': 'unreachable',
                    'error': str(e)
                }
            
            # Test frontend endpoint if available
            frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
            try:
                start_time = time.time()
                response = requests.get(frontend_url, timeout=5)
                response_time = (time.time() - start_time) * 1000
                
                app_metrics['endpoints']['frontend'] = {
                    'status': 'healthy' if response.status_code == 200 else 'unhealthy',
                    'status_code': response.status_code,
                    'response_time_ms': round(response_time, 2)
                }
            except Exception as e:
                app_metrics['endpoints']['frontend'] = {
                    'status': 'unreachable',
                    'error': str(e)
                }
            
            return app_metrics
            
        except Exception as e:
            logger.error(f"Error collecting application metrics: {e}")
            return {'error': str(e)}
    
    def calculate_summary(self) -> Dict[str, Any]:
        """Calculate summary metrics and health scores."""
        try:
            summary = {
                'overall_health': 'unknown',
                'performance_score': 0,
                'alerts': [],
                'recommendations': []
            }
            
            # Calculate performance score (0-100)
            score = 100
            
            # CPU score
            cpu_usage = self.metrics['system'].get('cpu', {}).get('usage_percent', 0)
            if cpu_usage > 90:
                score -= 30
                summary['alerts'].append(f"High CPU usage: {cpu_usage}%")
            elif cpu_usage > 80:
                score -= 15
                summary['alerts'].append(f"Elevated CPU usage: {cpu_usage}%")
            
            # Memory score
            memory_usage = self.metrics['system'].get('memory', {}).get('usage_percent', 0)
            if memory_usage > 90:
                score -= 25
                summary['alerts'].append(f"High memory usage: {memory_usage}%")
            elif memory_usage > 80:
                score -= 10
                summary['alerts'].append(f"Elevated memory usage: {memory_usage}%")
            
            # Disk score
            disk_usage = self.metrics['disk'].get('usage', {}).get('usage_percent', 0)
            if disk_usage > 95:
                score -= 20
                summary['alerts'].append(f"High disk usage: {disk_usage}%")
            elif disk_usage > 85:
                score -= 10
                summary['alerts'].append(f"Elevated disk usage: {disk_usage}%")
            
            # Application endpoints score
            backend_status = self.metrics['application'].get('endpoints', {}).get('backend', {}).get('status')
            frontend_status = self.metrics['application'].get('endpoints', {}).get('frontend', {}).get('status')
            
            if backend_status != 'healthy':
                score -= 25
                summary['alerts'].append("Backend endpoint unhealthy")
            if frontend_status != 'healthy':
                score -= 25
                summary['alerts'].append("Frontend endpoint unhealthy")
            
            summary['performance_score'] = max(0, score)
            
            # Determine overall health
            if score >= 90:
                summary['overall_health'] = 'excellent'
            elif score >= 80:
                summary['overall_health'] = 'good'
            elif score >= 70:
                summary['overall_health'] = 'fair'
            elif score >= 50:
                summary['overall_health'] = 'poor'
            else:
                summary['overall_health'] = 'critical'
            
            # Generate recommendations
            if cpu_usage > 80:
                summary['recommendations'].append("Consider optimizing CPU-intensive processes")
            if memory_usage > 80:
                summary['recommendations'].append("Consider increasing memory or optimizing memory usage")
            if disk_usage > 85:
                summary['recommendations'].append("Consider cleaning up disk space or expanding storage")
            
            return summary
            
        except Exception as e:
            logger.error(f"Error calculating summary: {e}")
            return {'error': str(e)}
    
    def collect_all_metrics(self) -> Dict[str, Any]:
        """Collect all performance metrics."""
        logger.info("Collecting system metrics...")
        self.metrics['system'] = self.collect_system_metrics()
        
        logger.info("Collecting disk metrics...")
        self.metrics['disk'] = self.collect_disk_metrics()
        
        logger.info("Collecting network metrics...")
        self.metrics['network'] = self.collect_network_metrics()
        
        logger.info("Collecting process metrics...")
        self.metrics['processes'] = self.collect_process_metrics()
        
        logger.info("Collecting application metrics...")
        self.metrics['application'] = self.collect_application_metrics()
        
        logger.info("Calculating summary...")
        self.metrics['summary'] = self.calculate_summary()
        
        return self.metrics
    
    def generate_report(self) -> str:
        """Generate a human-readable metrics report."""
        summary = self.metrics['summary']
        system = self.metrics['system']
        
        health_emoji = {
            'excellent': '🟢',
            'good': '🟡',
            'fair': '🟠',
            'poor': '🔴',
            'critical': '🚨'
        }
        
        report = f"""
📊 PERFORMANCE METRICS REPORT
{'='*50}
Timestamp: {self.metrics['timestamp']}
Overall Health: {health_emoji.get(summary['overall_health'], '❓')} {summary['overall_health'].upper()}
Performance Score: {summary['performance_score']}/100

🖥️  SYSTEM RESOURCES:
   CPU Usage: {system.get('cpu', {}).get('usage_percent', 'N/A')}%
   Memory Usage: {system.get('memory', {}).get('usage_percent', 'N/A')}%
   Disk Usage: {self.metrics['disk'].get('usage', {}).get('usage_percent', 'N/A')}%
   Available Memory: {system.get('memory', {}).get('available_gb', 'N/A')} GB

🌐 APPLICATION STATUS:
"""
        
        for endpoint, status in self.metrics['application'].get('endpoints', {}).items():
            status_emoji = "✅" if status.get('status') == 'healthy' else "❌"
            response_time = status.get('response_time_ms', 'N/A')
            report += f"   {status_emoji} {endpoint.capitalize()}: {status.get('status', 'unknown')} ({response_time}ms)\n"
        
        if summary.get('alerts'):
            report += f"\n⚠️  ALERTS:\n"
            for alert in summary['alerts']:
                report += f"   • {alert}\n"
        
        if summary.get('recommendations'):
            report += f"\n💡 RECOMMENDATIONS:\n"
            for rec in summary['recommendations']:
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        collector = MetricsCollector()
        metrics = collector.collect_all_metrics()
        
        # Generate and display report
        report = collector.generate_report()
        print(report)
        
        # Save metrics to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/performance_metrics.json', 'w') as f:
            json.dump(metrics, f, indent=2)
        
        # Exit based on performance score
        score = metrics['summary']['performance_score']
        if score >= 80:
            logger.info("Performance metrics collection completed - System healthy")
            sys.exit(0)
        elif score >= 50:
            logger.warning("Performance metrics collection completed - System needs attention")
            sys.exit(1)
        else:
            logger.error("Performance metrics collection completed - System critical")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Metrics collection failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
