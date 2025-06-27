#!/usr/bin/env python3
"""
Enhanced System Performance Monitor for A1Betting Automation System

This script provides comprehensive system monitoring including:
- CPU, memory, disk, and network usage
- Process monitoring and resource allocation
- Service health checks and response times
- Alert generation for threshold violations
- Integration with database monitoring

Features:
- Real-time metrics collection
- Historical trending and analysis
- Automated alerting system
- Performance optimization recommendations
- Integration with external monitoring systems
"""

import asyncio
import json
import logging
import os
import sys
import time
import psutil
import threading
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Any, Optional, Tuple
from dataclasses import dataclass, asdict
import platform
import socket
import requests
from concurrent.futures import ThreadPoolExecutor

# Setup enhanced logging
def setup_logging():
    """Setup comprehensive logging."""
    log_dir = Path('automation/logs')
    log_dir.mkdir(parents=True, exist_ok=True)
    
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
    )
    
    file_handler = logging.FileHandler(log_dir / 'system_monitor.log')
    file_handler.setFormatter(formatter)
    
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

logger = setup_logging()

# Configuration constants
DEFAULT_THRESHOLDS = {
    'cpu_percent': 80.0,
    'memory_percent': 85.0,
    'disk_percent': 90.0,
    'network_latency_ms': 1000.0,
    'load_average': 4.0,
    'swap_percent': 50.0
}

MONITORING_INTERVAL = 60  # seconds
ALERT_COOLDOWN = 300  # 5 minutes


@dataclass
class SystemMetrics:
    """System performance metrics container."""
    timestamp: datetime
    cpu_percent: float
    memory_percent: float
    memory_available_gb: float
    disk_percent: float
    disk_free_gb: float
    network_bytes_sent: int
    network_bytes_recv: int
    load_average: List[float]
    swap_percent: float
    process_count: int
    uptime_hours: float
    
    def to_dict(self) -> Dict[str, Any]:
        result = asdict(self)
        result['timestamp'] = self.timestamp.isoformat()
        return result


@dataclass
class ProcessMetrics:
    """Individual process metrics."""
    pid: int
    name: str
    cpu_percent: float
    memory_percent: float
    memory_mb: float
    status: str
    create_time: datetime
    num_threads: int
    
    def to_dict(self) -> Dict[str, Any]:
        result = asdict(self)
        result['create_time'] = self.create_time.isoformat()
        return result


@dataclass
class ServiceHealthCheck:
    """Service health check result."""
    name: str
    url: str
    status: str  # 'healthy', 'degraded', 'down'
    response_time_ms: Optional[float]
    status_code: Optional[int]
    error_message: Optional[str]
    last_check: datetime
    
    def to_dict(self) -> Dict[str, Any]:
        result = asdict(self)
        result['last_check'] = self.last_check.isoformat()
        return result


class EnhancedSystemMonitor:
    """Enhanced system performance monitoring with alerting and trend analysis."""
    
    def __init__(self, config_file: Optional[str] = None):
        self.config = self._load_config(config_file)
        self.thresholds = self.config.get('thresholds', DEFAULT_THRESHOLDS)
        self.services = self.config.get('services', [])
        self.alert_history = {}
        self.metrics_history = []
        self.is_monitoring = False
        self.alert_callbacks = []
        
        # Initialize system info
        self.system_info = self._get_system_info()
        
    def _load_config(self, config_file: Optional[str]) -> Dict[str, Any]:
        """Load monitoring configuration."""
        default_config = {
            'thresholds': DEFAULT_THRESHOLDS,
            'services': [
                {'name': 'frontend', 'url': 'http://localhost:3000/health'},
                {'name': 'backend', 'url': 'http://localhost:8000/health'},
                {'name': 'api', 'url': 'http://localhost:8080/api/health'}
            ],
            'monitoring_interval': MONITORING_INTERVAL,
            'alert_cooldown': ALERT_COOLDOWN,
            'enable_alerts': True,
            'max_history_entries': 1000
        }
        
        if config_file and Path(config_file).exists():
            try:
                with open(config_file, 'r') as f:
                    user_config = json.load(f)
                    default_config.update(user_config)
            except Exception as e:
                logger.warning(f"Failed to load config file {config_file}: {e}")
        
        return default_config
    
    def _get_system_info(self) -> Dict[str, Any]:
        """Get static system information."""
        return {
            'platform': platform.platform(),
            'processor': platform.processor(),
            'architecture': platform.architecture(),
            'hostname': socket.gethostname(),
            'python_version': sys.version,
            'cpu_count': psutil.cpu_count(logical=True),
            'cpu_count_physical': psutil.cpu_count(logical=False),
            'total_memory_gb': round(psutil.virtual_memory().total / (1024**3), 2),
            'boot_time': datetime.fromtimestamp(psutil.boot_time())
        }
    
    async def collect_system_metrics(self) -> SystemMetrics:
        """Collect comprehensive system performance metrics."""
        try:
            # CPU metrics
            cpu_percent = psutil.cpu_percent(interval=1)
            
            # Memory metrics
            memory = psutil.virtual_memory()
            memory_percent = memory.percent
            memory_available_gb = round(memory.available / (1024**3), 2)
            
            # Disk metrics
            disk = psutil.disk_usage('/')
            disk_percent = (disk.used / disk.total) * 100
            disk_free_gb = round(disk.free / (1024**3), 2)
            
            # Network metrics
            network = psutil.net_io_counters()
            network_bytes_sent = network.bytes_sent
            network_bytes_recv = network.bytes_recv
            
            # Load average (Unix-like systems)
            try:
                load_average = list(os.getloadavg())
            except (OSError, AttributeError):
                load_average = [0.0, 0.0, 0.0]  # Windows fallback
            
            # Swap metrics
            swap = psutil.swap_memory()
            swap_percent = swap.percent
            
            # Process count
            process_count = len(psutil.pids())
            
            # System uptime
            boot_time = psutil.boot_time()
            uptime_hours = (time.time() - boot_time) / 3600
            
            return SystemMetrics(
                timestamp=datetime.now(),
                cpu_percent=cpu_percent,
                memory_percent=memory_percent,
                memory_available_gb=memory_available_gb,
                disk_percent=disk_percent,
                disk_free_gb=disk_free_gb,
                network_bytes_sent=network_bytes_sent,
                network_bytes_recv=network_bytes_recv,
                load_average=load_average,
                swap_percent=swap_percent,
                process_count=process_count,
                uptime_hours=round(uptime_hours, 2)
            )
        
        except Exception as e:
            logger.error(f"Error collecting system metrics: {e}")
            raise
    
    async def collect_process_metrics(self, target_processes: Optional[List[str]] = None) -> List[ProcessMetrics]:
        """Collect metrics for specific processes."""
        if not target_processes:
            target_processes = ['python', 'node', 'mongod', 'redis-server', 'postgres']
        
        process_metrics = []
        
        for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 
                                       'memory_info', 'status', 'create_time', 'num_threads']):
            try:
                proc_info = proc.info
                proc_name = proc_info['name'].lower()
                
                # Check if this is a target process
                if any(target in proc_name for target in target_processes):
                    memory_mb = round(proc_info['memory_info'].rss / (1024*1024), 2)
                    
                    process_metrics.append(ProcessMetrics(
                        pid=proc_info['pid'],
                        name=proc_info['name'],
                        cpu_percent=proc_info['cpu_percent'] or 0.0,
                        memory_percent=proc_info['memory_percent'] or 0.0,
                        memory_mb=memory_mb,
                        status=proc_info['status'],
                        create_time=datetime.fromtimestamp(proc_info['create_time']),
                        num_threads=proc_info['num_threads'] or 0
                    ))
            
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue
        
        return process_metrics
    
    async def check_service_health(self, service: Dict[str, str]) -> ServiceHealthCheck:
        """Check health of a specific service."""
        name = service['name']
        url = service['url']
        timeout = service.get('timeout', 10)
        
        try:
            start_time = time.time()
            response = requests.get(url, timeout=timeout)
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                status = 'healthy'
            elif response.status_code < 500:
                status = 'degraded'
            else:
                status = 'down'
            
            return ServiceHealthCheck(
                name=name,
                url=url,
                status=status,
                response_time_ms=round(response_time, 2),
                status_code=response.status_code,
                error_message=None,
                last_check=datetime.now()
            )
        
        except requests.exceptions.Timeout:
            return ServiceHealthCheck(
                name=name,
                url=url,
                status='down',
                response_time_ms=None,
                status_code=None,
                error_message='Request timeout',
                last_check=datetime.now()
            )
        
        except Exception as e:
            return ServiceHealthCheck(
                name=name,
                url=url,
                status='down',
                response_time_ms=None,
                status_code=None,
                error_message=str(e),
                last_check=datetime.now()
            )
    
    async def check_all_services(self) -> List[ServiceHealthCheck]:
        """Check health of all configured services."""
        tasks = [self.check_service_health(service) for service in self.services]
        return await asyncio.gather(*tasks)
    
    def _check_thresholds(self, metrics: SystemMetrics) -> List[str]:
        """Check if any metrics exceed thresholds."""
        alerts = []
        
        if metrics.cpu_percent > self.thresholds['cpu_percent']:
            alerts.append(f"High CPU usage: {metrics.cpu_percent:.1f}%")
        
        if metrics.memory_percent > self.thresholds['memory_percent']:
            alerts.append(f"High memory usage: {metrics.memory_percent:.1f}%")
        
        if metrics.disk_percent > self.thresholds['disk_percent']:
            alerts.append(f"High disk usage: {metrics.disk_percent:.1f}%")
        
        if metrics.swap_percent > self.thresholds['swap_percent']:
            alerts.append(f"High swap usage: {metrics.swap_percent:.1f}%")
        
        if metrics.load_average and metrics.load_average[0] > self.thresholds['load_average']:
            alerts.append(f"High load average: {metrics.load_average[0]:.2f}")
        
        return alerts
    
    def _should_send_alert(self, alert_type: str) -> bool:
        """Check if enough time has passed since last alert of this type."""
        now = datetime.now()
        last_alert = self.alert_history.get(alert_type)
        
        if not last_alert:
            return True
        
        time_since_alert = (now - last_alert).total_seconds()
        return time_since_alert >= self.config['alert_cooldown']
    
    def _send_alerts(self, alerts: List[str]):
        """Send alerts using configured methods."""
        if not alerts or not self.config.get('enable_alerts', True):
            return
        
        for alert in alerts:
            alert_type = alert.split(':')[0]
            
            if self._should_send_alert(alert_type):
                logger.warning(f"ALERT: {alert}")
                self.alert_history[alert_type] = datetime.now()
                
                # Call registered alert callbacks
                for callback in self.alert_callbacks:
                    try:
                        callback(alert)
                    except Exception as e:
                        logger.error(f"Alert callback failed: {e}")
    
    def add_alert_callback(self, callback):
        """Add a custom alert callback function."""
        self.alert_callbacks.append(callback)
    
    def _generate_recommendations(self, metrics: SystemMetrics, 
                                process_metrics: List[ProcessMetrics]) -> List[str]:
        """Generate performance optimization recommendations."""
        recommendations = []
        
        # CPU recommendations
        if metrics.cpu_percent > 80:
            top_cpu_processes = sorted(process_metrics, key=lambda p: p.cpu_percent, reverse=True)[:3]
            proc_names = [p.name for p in top_cpu_processes]
            recommendations.append(f"🔥 High CPU usage - Top processes: {', '.join(proc_names)}")
        
        # Memory recommendations
        if metrics.memory_percent > 85:
            top_memory_processes = sorted(process_metrics, key=lambda p: p.memory_mb, reverse=True)[:3]
            proc_names = [f"{p.name}({p.memory_mb:.0f}MB)" for p in top_memory_processes]
            recommendations.append(f"💾 High memory usage - Top consumers: {', '.join(proc_names)}")
        
        # Disk recommendations
        if metrics.disk_percent > 90:
            recommendations.append("💿 Disk space critical - Consider cleanup or expansion")
        
        # Swap recommendations
        if metrics.swap_percent > 20:
            recommendations.append("🔄 Swap usage detected - Consider adding more RAM")
        
        # Load average recommendations
        if metrics.load_average and metrics.load_average[0] > psutil.cpu_count():
            recommendations.append("⚡ System overloaded - Consider scaling or optimization")
        
        return recommendations
    
    async def collect_comprehensive_metrics(self) -> Dict[str, Any]:
        """Collect all metrics in one comprehensive report."""
        try:
            # Collect all metrics concurrently
            system_task = asyncio.create_task(self.collect_system_metrics())
            process_task = asyncio.create_task(self.collect_process_metrics())
            services_task = asyncio.create_task(self.check_all_services())
            
            system_metrics, process_metrics, service_checks = await asyncio.gather(
                system_task, process_task, services_task
            )
            
            # Check for alerts
            alerts = self._check_thresholds(system_metrics)
            self._send_alerts(alerts)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(system_metrics, process_metrics)
            
            # Calculate overall health score
            health_score = self._calculate_health_score(system_metrics, service_checks)
            
            comprehensive_report = {
                'timestamp': datetime.now().isoformat(),
                'system_info': self.system_info,
                'system_metrics': system_metrics.to_dict(),
                'process_metrics': [p.to_dict() for p in process_metrics],
                'service_checks': [s.to_dict() for s in service_checks],
                'alerts': alerts,
                'recommendations': recommendations,
                'health_score': health_score,
                'monitoring_config': self.config
            }
            
            # Store in history
            self.metrics_history.append(comprehensive_report)
            
            # Keep only recent history
            max_entries = self.config.get('max_history_entries', 1000)
            if len(self.metrics_history) > max_entries:
                self.metrics_history = self.metrics_history[-max_entries:]
            
            return comprehensive_report
        
        except Exception as e:
            logger.error(f"Error collecting comprehensive metrics: {e}")
            raise
    
    def _calculate_health_score(self, system_metrics: SystemMetrics, 
                              service_checks: List[ServiceHealthCheck]) -> float:
        """Calculate overall system health score (0.0 to 1.0)."""
        score = 1.0
        
        # System metrics impact
        if system_metrics.cpu_percent > 80:
            score -= 0.2
        elif system_metrics.cpu_percent > 60:
            score -= 0.1
        
        if system_metrics.memory_percent > 85:
            score -= 0.2
        elif system_metrics.memory_percent > 70:
            score -= 0.1
        
        if system_metrics.disk_percent > 90:
            score -= 0.3
        elif system_metrics.disk_percent > 80:
            score -= 0.1
        
        # Service health impact
        if service_checks:
            healthy_services = sum(1 for s in service_checks if s.status == 'healthy')
            service_ratio = healthy_services / len(service_checks)
            score *= service_ratio
        
        return max(0.0, min(1.0, score))
    
    def generate_report(self, metrics: Dict[str, Any]) -> str:
        """Generate human-readable monitoring report."""
        system_metrics = metrics['system_metrics']
        
        report = f"""
🖥️  SYSTEM PERFORMANCE MONITORING REPORT
{'='*60}
📅 Timestamp: {metrics['timestamp']}
🎯 Health Score: {metrics['health_score']:.2f}/1.0
⏱️  Uptime: {system_metrics['uptime_hours']:.1f} hours

📊 SYSTEM METRICS:
─────────────────
🔥 CPU Usage: {system_metrics['cpu_percent']:.1f}%
💾 Memory Usage: {system_metrics['memory_percent']:.1f}% ({system_metrics['memory_available_gb']:.1f}GB available)
💿 Disk Usage: {system_metrics['disk_percent']:.1f}% ({system_metrics['disk_free_gb']:.1f}GB free)
🔄 Swap Usage: {system_metrics['swap_percent']:.1f}%
📈 Load Average: {', '.join(f'{x:.2f}' for x in system_metrics['load_average'])}
🏃 Processes: {system_metrics['process_count']}

"""
        
        # Process metrics
        if metrics['process_metrics']:
            report += "🏃‍♂️ TOP PROCESSES:\n"
            report += "─────────────────\n"
            
            # Sort by CPU usage
            top_processes = sorted(metrics['process_metrics'], 
                                 key=lambda p: p['cpu_percent'], reverse=True)[:5]
            
            for proc in top_processes:
                report += f"   {proc['name']:<15} CPU: {proc['cpu_percent']:>5.1f}% "
                report += f"MEM: {proc['memory_mb']:>6.0f}MB PID: {proc['pid']}\n"
            
            report += "\n"
        
        # Service health
        if metrics['service_checks']:
            report += "🌐 SERVICE HEALTH:\n"
            report += "──────────────────\n"
            
            for service in metrics['service_checks']:
                status_emoji = {'healthy': '✅', 'degraded': '⚠️', 'down': '❌'}.get(service['status'], '❓')
                report += f"   {status_emoji} {service['name']:<12} "
                
                if service['response_time_ms']:
                    report += f"({service['response_time_ms']:.0f}ms)"
                else:
                    report += f"({service['error_message']})"
                report += "\n"
            
            report += "\n"
        
        # Alerts
        if metrics['alerts']:
            report += "🚨 ACTIVE ALERTS:\n"
            report += "─────────────────\n"
            for alert in metrics['alerts']:
                report += f"   🔴 {alert}\n"
            report += "\n"
        
        # Recommendations
        if metrics['recommendations']:
            report += "💡 RECOMMENDATIONS:\n"
            report += "────────────────────\n"
            for rec in metrics['recommendations']:
                report += f"   {rec}\n"
            report += "\n"
        
        return report
    
    async def start_monitoring(self, interval: Optional[int] = None):
        """Start continuous monitoring."""
        if self.is_monitoring:
            logger.warning("Monitoring is already running")
            return
        
        interval = interval or self.config.get('monitoring_interval', MONITORING_INTERVAL)
        self.is_monitoring = True
        
        logger.info(f"Starting system monitoring with {interval}s interval...")
        
        try:
            while self.is_monitoring:
                metrics = await self.collect_comprehensive_metrics()
                
                # Save metrics to file
                await self._save_metrics(metrics)
                
                # Log summary
                logger.info(f"System Health: {metrics['health_score']:.2f}, "
                          f"CPU: {metrics['system_metrics']['cpu_percent']:.1f}%, "
                          f"Memory: {metrics['system_metrics']['memory_percent']:.1f}%")
                
                await asyncio.sleep(interval)
        
        except Exception as e:
            logger.error(f"Monitoring error: {e}")
        finally:
            self.is_monitoring = False
    
    def stop_monitoring(self):
        """Stop continuous monitoring."""
        self.is_monitoring = False
        logger.info("Stopping system monitoring...")
    
    async def _save_metrics(self, metrics: Dict[str, Any]):
        """Save metrics to files."""
        reports_dir = Path('automation/reports')
        reports_dir.mkdir(exist_ok=True)
        
        # Save latest metrics
        with open(reports_dir / 'system_monitor_latest.json', 'w') as f:
            json.dump(metrics, f, indent=2, default=str)
        
        # Save historical metrics
        history_file = reports_dir / 'system_monitor_history.json'
        
        # Load existing history
        history = []
        if history_file.exists():
            try:
                with open(history_file, 'r') as f:
                    history = json.load(f)
            except:
                history = []
        
        # Add current metrics (keep only essential data for history)
        history_entry = {
            'timestamp': metrics['timestamp'],
            'health_score': metrics['health_score'],
            'cpu_percent': metrics['system_metrics']['cpu_percent'],
            'memory_percent': metrics['system_metrics']['memory_percent'],
            'disk_percent': metrics['system_metrics']['disk_percent'],
            'alerts_count': len(metrics['alerts'])
        }
        
        history.append(history_entry)
        
        # Keep only last 1000 entries
        history = history[-1000:]
        
        # Save updated history
        with open(history_file, 'w') as f:
            json.dump(history, f, indent=2)


async def main():
    """Main entry point for system monitoring."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Enhanced System Performance Monitor')
    parser.add_argument('--config', help='Configuration file path')
    parser.add_argument('--interval', type=int, default=60, help='Monitoring interval in seconds')
    parser.add_argument('--once', action='store_true', help='Run once and exit')
    parser.add_argument('--report', action='store_true', help='Generate report only')
    
    args = parser.parse_args()
    
    try:
        monitor = EnhancedSystemMonitor(args.config)
        
        if args.report:
            # Generate single report
            metrics = await monitor.collect_comprehensive_metrics()
            report = monitor.generate_report(metrics)
            print(report)
            
            # Save report
            reports_dir = Path('automation/reports')
            reports_dir.mkdir(exist_ok=True)
            with open(reports_dir / 'system_monitor_report.txt', 'w') as f:
                f.write(report)
            
        elif args.once:
            # Single monitoring run
            metrics = await monitor.collect_comprehensive_metrics()
            report = monitor.generate_report(metrics)
            print(report)
            
        else:
            # Continuous monitoring
            await monitor.start_monitoring(args.interval)
    
    except KeyboardInterrupt:
        logger.info("Monitoring stopped by user")
    except Exception as e:
        logger.error(f"System monitoring failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
