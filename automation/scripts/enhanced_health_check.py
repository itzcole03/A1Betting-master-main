#!/usr/bin/env python3
"""
Enhanced Service Health Checker for A1Betting Automation System
Smart detection of actual service endpoints and improved health monitoring.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List
import psutil
import requests
import aiohttp
import docker

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class EnhancedHealthChecker:
    """Enhanced health checker with smart endpoint detection."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'overall_status': 'unknown',
            'checks': {},
            'metrics': {},
            'alerts': [],
            'recommendations': []
        }
        self.docker_client = None
        try:
            self.docker_client = docker.from_env()
        except Exception as e:
            logger.warning(f"Docker client unavailable: {e}")
    
    async def run_comprehensive_check(self) -> Dict[str, Any]:
        """Run all health checks."""
        logger.info("Starting enhanced comprehensive health check...")
        
        checks = [
            self.check_system_resources(),
            self.check_docker_services(),
            self.check_database_connections(),
            self.check_web_services_smart(),
            self.check_external_connectivity(),
            self.check_automation_system()
        ]
        
        await asyncio.gather(*checks, return_exceptions=True)
        
        # Analyze results and generate recommendations
        self.analyze_results()
        
        logger.info(f"Enhanced health check completed. Status: {self.results['overall_status']}")
        return self.results
    
    async def check_system_resources(self):
        """Check system resource utilization."""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            
            # Try to get disk usage safely
            try:
                disk = psutil.disk_usage('/')
            except:
                # Windows fallback
                disk = psutil.disk_usage('C:')
            
            self.results['metrics'].update({
                'cpu_usage_percent': round(cpu_percent, 2),
                'memory_usage_percent': round(memory.percent, 2),
                'memory_available_gb': round(memory.available / (1024**3), 2),
                'disk_usage_percent': round(disk.percent, 2),
                'disk_free_gb': round(disk.free / (1024**3), 2)
            })
            
            # Check thresholds
            alerts = []
            if cpu_percent > 80:
                alerts.append(f"High CPU usage: {cpu_percent:.1f}%")
            if memory.percent > 85:
                alerts.append(f"High memory usage: {memory.percent:.1f}%")
            if disk.percent > 90:
                alerts.append(f"High disk usage: {disk.percent:.1f}%")
            
            self.results['checks']['system_resources'] = {
                'healthy': len(alerts) == 0,
                'details': self.results['metrics'],
                'alerts': alerts
            }
            
        except Exception as e:
            self.results['checks']['system_resources'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_docker_services(self):
        """Check Docker container status."""
        if not self.docker_client:
            self.results['checks']['docker_services'] = {
                'healthy': False,
                'error': 'Docker client not available'
            }
            return
        
        try:
            containers = self.docker_client.containers.list()
            container_status = {}
            healthy_count = 0
            total_count = 0
            
            for container in containers:
                name = container.name
                status = container.status
                health = container.attrs.get('State', {}).get('Health', {}).get('Status', 'unknown')
                
                container_status[name] = {
                    'status': status,
                    'health': health,
                    'image': container.image.tags[0] if container.image.tags else 'unknown'
                }
                
                total_count += 1
                if status == 'running' and (health in ['healthy', 'unknown'] or 'health' not in container.attrs.get('State', {})):
                    healthy_count += 1
            
            self.results['checks']['docker_services'] = {
                'healthy': healthy_count > 0 and healthy_count >= total_count * 0.7,  # 70% healthy threshold
                'details': {
                    'containers': container_status,
                    'healthy_count': healthy_count,
                    'total_count': total_count,
                    'health_ratio': healthy_count / total_count if total_count > 0 else 0
                }
            }
            
        except Exception as e:
            self.results['checks']['docker_services'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_database_connections(self):
        """Check database connectivity."""
        databases = {
            'postgresql': {'port': 5432, 'name': 'PostgreSQL'},
            'mongodb': {'port': 27017, 'name': 'MongoDB'},
            'redis': {'port': 6379, 'name': 'Redis'}
        }
        
        for db_key, db_info in databases.items():
            try:
                # Check if port is open
                import socket
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(5)
                result = sock.connect_ex(('localhost', db_info['port']))
                sock.close()
                
                if result == 0:
                    self.results['checks'][db_key] = {
                        'healthy': True,
                        'details': f"{db_info['name']} port {db_info['port']} is accessible"
                    }
                else:
                    self.results['checks'][db_key] = {
                        'healthy': False,
                        'error': f"{db_info['name']} port {db_info['port']} not accessible"
                    }
                    
            except Exception as e:
                self.results['checks'][db_key] = {
                    'healthy': False,
                    'error': f"{db_info['name']} check failed: {str(e)}"
                }
    
    async def check_web_services_smart(self):
        """Smart web service endpoint detection and testing."""
        # Common endpoint patterns to try
        base_urls = ['http://localhost:8000', 'http://localhost:3000', 'http://localhost:80']
        endpoint_patterns = [
            '/health', '/api/health', '/', '/status', '/ping', 
            '/api/status', '/api/ping', '/healthz'
        ]
        
        async with aiohttp.ClientSession() as session:
            for base_url in base_urls:
                service_name = f"service_{base_url.split(':')[-1]}"
                found_endpoint = False
                
                for pattern in endpoint_patterns:
                    try:
                        url = f"{base_url}{pattern}"
                        async with session.get(url, timeout=5) as response:
                            if response.status < 400:
                                self.results['checks'][service_name] = {
                                    'healthy': True,
                                    'details': {
                                        'url': url,
                                        'status_code': response.status,
                                        'endpoint': pattern
                                    }
                                }
                                found_endpoint = True
                                break
                    except Exception:
                        continue
                
                if not found_endpoint:
                    self.results['checks'][service_name] = {
                        'healthy': False,
                        'error': f'No accessible endpoints found at {base_url}'
                    }
        
        # Specific API health checks
        api_endpoints = {
            'api_health': 'http://localhost:8000/health',
            'api_predictions': 'http://localhost:8000/api/predictions',
            'frontend_health': 'http://localhost:3000'
        }
        
        async with aiohttp.ClientSession() as session:
            for name, url in api_endpoints.items():
                try:
                    async with session.get(url, timeout=10) as response:
                        self.results['checks'][name] = {
                            'healthy': response.status < 400,
                            'details': {
                                'status_code': response.status,
                                'url': url
                            }
                        }
                except Exception as e:
                    self.results['checks'][name] = {
                        'healthy': False,
                        'error': str(e)
                    }
    
    async def check_external_connectivity(self):
        """Check external network connectivity."""
        test_urls = [
            'https://www.google.com',
            'https://api.github.com',
            'https://www.espn.com'
        ]
        
        async with aiohttp.ClientSession() as session:
            successful_connections = 0
            
            for url in test_urls:
                try:
                    async with session.get(url, timeout=10) as response:
                        if response.status < 400:
                            successful_connections += 1
                except Exception:
                    pass
            
            self.results['checks']['network_connectivity'] = {
                'healthy': successful_connections >= len(test_urls) // 2,
                'details': {
                    'successful_connections': successful_connections,
                    'total_tested': len(test_urls),
                    'success_rate': successful_connections / len(test_urls)
                }
            }
    
    async def check_automation_system(self):
        """Check the automation system itself."""
        try:
            # Check if master orchestrator is accessible
            result = subprocess.run(
                ['python', 'automation/master_orchestrator.py', '--status'],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            if result.returncode == 0:
                try:
                    status_data = json.loads(result.stdout)
                    self.results['checks']['automation_orchestrator'] = {
                        'healthy': status_data.get('orchestrator') == 'running',
                        'details': status_data
                    }
                except json.JSONDecodeError:
                    self.results['checks']['automation_orchestrator'] = {
                        'healthy': True,
                        'details': 'Orchestrator running but output not JSON parseable'
                    }
            else:
                self.results['checks']['automation_orchestrator'] = {
                    'healthy': False,
                    'error': result.stderr or 'Orchestrator failed to respond'
                }
                
        except Exception as e:
            self.results['checks']['automation_orchestrator'] = {
                'healthy': False,
                'error': str(e)
            }
    
    def analyze_results(self):
        """Analyze results and generate recommendations."""
        total_checks = len(self.results['checks'])
        healthy_checks = sum(1 for check in self.results['checks'].values() if check.get('healthy', False))
        
        # Update metrics
        self.results['metrics']['total_checks'] = total_checks
        self.results['metrics']['healthy_checks'] = healthy_checks
        self.results['metrics']['health_percentage'] = (healthy_checks / total_checks * 100) if total_checks > 0 else 0
        
        # Determine overall status
        health_percentage = self.results['metrics']['health_percentage']
        if health_percentage >= 90:
            self.results['overall_status'] = 'excellent'
        elif health_percentage >= 80:
            self.results['overall_status'] = 'good'
        elif health_percentage >= 60:
            self.results['overall_status'] = 'fair'
        elif health_percentage >= 40:
            self.results['overall_status'] = 'poor'
        else:
            self.results['overall_status'] = 'critical'
        
        # Generate alerts for failed checks
        failed_checks = [name for name, result in self.results['checks'].items() 
                        if not result.get('healthy', False)]
        
        if failed_checks:
            self.results['alerts'].append({
                'level': 'warning' if len(failed_checks) <= total_checks // 2 else 'critical',
                'message': f"Failed health checks: {', '.join(failed_checks)}"
            })
        
        # Generate recommendations
        if self.results['metrics'].get('cpu_usage_percent', 0) > 70:
            self.results['recommendations'].append("Consider optimizing CPU-intensive processes")
        
        if self.results['metrics'].get('memory_usage_percent', 0) > 80:
            self.results['recommendations'].append("Consider increasing available memory or optimizing memory usage")
        
        if 'docker_services' in self.results['checks'] and not self.results['checks']['docker_services'].get('healthy', True):
            self.results['recommendations'].append("Check Docker container logs and restart failed services")
        
        if healthy_checks < total_checks:
            self.results['recommendations'].append(f"Address {total_checks - healthy_checks} failing health checks for optimal performance")
    
    def generate_report(self) -> str:
        """Generate a human-readable health report."""
        status_emoji = {
            'excellent': '🟢',
            'good': '🟡', 
            'fair': '🟠',
            'poor': '🔴',
            'critical': '🚨'
        }
        
        overall_status = self.results['overall_status']
        health_percentage = self.results['metrics'].get('health_percentage', 0)
        
        report = f"""
🏥 ENHANCED SYSTEM HEALTH REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Overall Status: {status_emoji.get(overall_status, '❓')} {overall_status.upper()}
Health Score: {health_percentage:.1f}% ({self.results['metrics']['healthy_checks']}/{self.results['metrics']['total_checks']} checks passing)

📊 SYSTEM METRICS:
   💻 CPU Usage: {self.results['metrics'].get('cpu_usage_percent', 'N/A')}%
   🧠 Memory Usage: {self.results['metrics'].get('memory_usage_percent', 'N/A')}%
   💾 Disk Usage: {self.results['metrics'].get('disk_usage_percent', 'N/A')}%

🔧 SERVICE STATUS:
"""
        
        # Group checks by category
        for check_name, check_result in self.results['checks'].items():
            emoji = "✅" if check_result.get('healthy', False) else "❌"
            report += f"   {emoji} {check_name}: {'Healthy' if check_result.get('healthy', False) else 'Failed'}\n"
        
        # Add alerts
        if self.results['alerts']:
            report += f"\n🚨 ALERTS:\n"
            for alert in self.results['alerts']:
                level_emoji = {"critical": "🔴", "warning": "🟡", "info": "🔵"}
                emoji = level_emoji.get(alert['level'], '❓')
                report += f"   {emoji} {alert['message']}\n"
        
        # Add recommendations
        if self.results['recommendations']:
            report += f"\n💡 RECOMMENDATIONS:\n"
            for rec in self.results['recommendations']:
                report += f"   • {rec}\n"
        
        return report


async def main():
    """Main entry point."""
    try:
        checker = EnhancedHealthChecker()
        results = await checker.run_comprehensive_check()
        
        # Generate and display report
        report = checker.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/enhanced_health_check.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on health status
        if results['overall_status'] in ['excellent', 'good']:
            sys.exit(0)
        elif results['overall_status'] in ['fair', 'poor']:
            sys.exit(1)
        else:
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Enhanced health check failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    asyncio.run(main())
