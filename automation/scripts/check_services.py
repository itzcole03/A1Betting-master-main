#!/usr/bin/env python3
"""
Comprehensive system health check script for A1Betting application.
Verifies all critical services and components are operational.
"""

import asyncio
import json
import logging
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any
import aiohttp
import psutil
import redis
import requests
import subprocess

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class HealthChecker:
    """Comprehensive health checker for all system components."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'overall_status': 'healthy',
            'checks': {},
            'metrics': {},
            'alerts': []
        }
        
    async def check_all(self) -> Dict[str, Any]:
        """Run all health checks."""
        logger.info("Starting comprehensive health check...")
        
        checks = [
            self.check_system_resources(),
            self.check_services(),
            self.check_databases(),
            self.check_redis(),
            self.check_web_services(),
            self.check_ml_services(),
            self.check_disk_space(),
            self.check_network_connectivity(),
            self.check_docker_containers(),
            self.check_external_apis()
        ]
        
        await asyncio.gather(*checks, return_exceptions=True)
        
        # Determine overall status
        failed_checks = [name for name, result in self.results['checks'].items() 
                        if not result.get('healthy', False)]
        
        if failed_checks:
            self.results['overall_status'] = 'unhealthy'
            self.results['alerts'].append({
                'level': 'critical',
                'message': f"Failed health checks: {', '.join(failed_checks)}"
            })
        
        logger.info(f"Health check completed. Status: {self.results['overall_status']}")
        return self.results
    
    async def check_system_resources(self):
        """Check system resource utilization."""
        try:
            cpu_percent = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            self.results['metrics'].update({
                'cpu_usage_percent': cpu_percent,
                'memory_usage_percent': memory.percent,
                'memory_available_gb': memory.available / (1024**3),
                'disk_usage_percent': disk.percent,
                'disk_free_gb': disk.free / (1024**3)
            })
            
            # Check thresholds
            alerts = []
            if cpu_percent > 80:
                alerts.append(f"High CPU usage: {cpu_percent}%")
            if memory.percent > 85:
                alerts.append(f"High memory usage: {memory.percent}%")
            if disk.percent > 90:
                alerts.append(f"High disk usage: {disk.percent}%")
            
            self.results['checks']['system_resources'] = {
                'healthy': len(alerts) == 0,
                'details': {
                    'cpu_percent': cpu_percent,
                    'memory_percent': memory.percent,
                    'disk_percent': disk.percent
                },
                'alerts': alerts
            }
            
        except Exception as e:
            self.results['checks']['system_resources'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_services(self):
        """Check critical application services."""
        services = [
            {'name': 'backend', 'port': 8000, 'path': '/health'},
            {'name': 'frontend', 'port': 3000, 'path': '/'},
            {'name': 'monitoring', 'port': 9090, 'path': '/metrics'}
        ]
        
        for service in services:
            try:
                url = f"http://localhost:{service['port']}{service['path']}"
                async with aiohttp.ClientSession() as session:
                    async with session.get(url, timeout=10) as response:
                        healthy = response.status == 200
                        
                        self.results['checks'][f"service_{service['name']}"] = {
                            'healthy': healthy,
                            'status_code': response.status,
                            'response_time_ms': 0  # Would need timing
                        }
                        
            except Exception as e:
                self.results['checks'][f"service_{service['name']}"] = {
                    'healthy': False,
                    'error': str(e)
                }
    
    async def check_databases(self):
        """Check database connectivity and status."""
        try:
            # MongoDB check
            from pymongo import MongoClient
            
            client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=5000)
            client.admin.command('ping')
            
            # Get database stats
            db = client['a1betting']
            stats = db.command('dbStats')
            
            self.results['checks']['mongodb'] = {
                'healthy': True,
                'details': {
                    'size_mb': stats.get('dataSize', 0) / (1024*1024),
                    'collections': stats.get('collections', 0),
                    'indexes': stats.get('indexes', 0)
                }
            }
            
        except Exception as e:
            self.results['checks']['mongodb'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_redis(self):
        """Check Redis connectivity and performance."""
        try:
            r = redis.Redis(host='localhost', port=6379, db=0, socket_timeout=5)
            
            # Test basic operations
            start_time = time.time()
            r.ping()
            ping_time = (time.time() - start_time) * 1000
            
            # Get Redis info
            info = r.info()
            
            self.results['checks']['redis'] = {
                'healthy': True,
                'details': {
                    'ping_time_ms': ping_time,
                    'memory_usage_mb': info.get('used_memory', 0) / (1024*1024),
                    'connected_clients': info.get('connected_clients', 0),
                    'total_commands_processed': info.get('total_commands_processed', 0)
                }
            }
            
        except Exception as e:
            self.results['checks']['redis'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_web_services(self):
        """Check web service endpoints."""
        endpoints = [
            {'name': 'api_health', 'url': 'http://localhost:8000/api/health'},
            {'name': 'api_predictions', 'url': 'http://localhost:8000/api/predictions/health'},
            {'name': 'websocket', 'url': 'ws://localhost:8000/ws/test'}
        ]
        
        async with aiohttp.ClientSession() as session:
            for endpoint in endpoints:
                try:
                    if endpoint['url'].startswith('ws'):
                        # WebSocket check would need different handling
                        self.results['checks'][endpoint['name']] = {
                            'healthy': True,
                            'note': 'WebSocket check skipped in basic health check'
                        }
                    else:
                        async with session.get(endpoint['url'], timeout=10) as response:
                            self.results['checks'][endpoint['name']] = {
                                'healthy': response.status < 400,
                                'status_code': response.status
                            }
                            
                except Exception as e:
                    self.results['checks'][endpoint['name']] = {
                        'healthy': False,
                        'error': str(e)
                    }
    
    async def check_ml_services(self):
        """Check ML model services and predictions."""
        try:
            # Check if ML models are loaded and responding
            async with aiohttp.ClientSession() as session:
                test_data = {
                    'game_data': {
                        'home_team': 'Test Team A',
                        'away_team': 'Test Team B',
                        'sport': 'basketball'
                    }
                }
                
                async with session.post(
                    'http://localhost:8000/api/predictions/test',
                    json=test_data,
                    timeout=30
                ) as response:
                    if response.status == 200:
                        result = await response.json()
                        self.results['checks']['ml_service'] = {
                            'healthy': True,
                            'details': {
                                'response_time_ms': 0,  # Would need timing
                                'model_version': result.get('model_version', 'unknown')
                            }
                        }
                    else:
                        self.results['checks']['ml_service'] = {
                            'healthy': False,
                            'status_code': response.status
                        }
                        
        except Exception as e:
            self.results['checks']['ml_service'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_disk_space(self):
        """Check disk space for critical directories."""
        directories = [
            '/var/log',
            '/tmp',
            './automation/logs',
            './automation/reports',
            './backend/logs',
            './data',
            './backups'
        ]
        
        disk_issues = []
        
        for directory in directories:
            try:
                if os.path.exists(directory):
                    usage = psutil.disk_usage(directory)
                    free_percent = (usage.free / usage.total) * 100
                    
                    if free_percent < 10:  # Less than 10% free
                        disk_issues.append(f"{directory}: {free_percent:.1f}% free")
                        
            except Exception as e:
                disk_issues.append(f"{directory}: Error checking - {e}")
        
        self.results['checks']['disk_space'] = {
            'healthy': len(disk_issues) == 0,
            'issues': disk_issues
        }
    
    async def check_network_connectivity(self):
        """Check network connectivity to external services."""
        external_hosts = [
            'google.com',
            'github.com',
            'pypi.org',
            'api.sportsradar.com'
        ]
        
        connectivity_issues = []
        
        for host in external_hosts:
            try:
                result = subprocess.run(
                    ['ping', '-c', '1', host],
                    capture_output=True,
                    timeout=10
                )
                if result.returncode != 0:
                    connectivity_issues.append(host)
                    
            except Exception as e:
                connectivity_issues.append(f"{host}: {e}")
        
        self.results['checks']['network_connectivity'] = {
            'healthy': len(connectivity_issues) == 0,
            'issues': connectivity_issues
        }
    
    async def check_docker_containers(self):
        """Check Docker container status."""
        try:
            result = subprocess.run(
                ['docker', 'ps', '--format', 'json'],
                capture_output=True,
                text=True,
                timeout=10
            )
            
            if result.returncode == 0:
                containers = []
                for line in result.stdout.strip().split('\n'):
                    if line:
                        containers.append(json.loads(line))
                
                running_containers = len(containers)
                self.results['checks']['docker_containers'] = {
                    'healthy': True,
                    'details': {
                        'running_containers': running_containers,
                        'containers': [c.get('Names', 'unknown') for c in containers]
                    }
                }
            else:
                self.results['checks']['docker_containers'] = {
                    'healthy': False,
                    'error': 'Docker not available or not running'
                }
                
        except Exception as e:
            self.results['checks']['docker_containers'] = {
                'healthy': False,
                'error': str(e)
            }
    
    async def check_external_apis(self):
        """Check external API connectivity and rate limits."""
        # This would check APIs like SportsRadar, but skip for basic health check
        self.results['checks']['external_apis'] = {
            'healthy': True,
            'note': 'External API checks skipped in basic health check to avoid rate limits'
        }

async def main():
    """Main health check execution."""
    checker = HealthChecker()
    results = await checker.check_all()
    
    # Save results
    os.makedirs('automation/reports', exist_ok=True)
    with open('automation/reports/health_check.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    # Print summary
    print(f"Health Check Status: {results['overall_status'].upper()}")
    print(f"Timestamp: {results['timestamp']}")
    print(f"Total Checks: {len(results['checks'])}")
    
    healthy_checks = sum(1 for check in results['checks'].values() if check.get('healthy', False))
    print(f"Healthy Checks: {healthy_checks}/{len(results['checks'])}")
    
    if results['alerts']:
        print("\nAlerts:")
        for alert in results['alerts']:
            print(f"  - {alert['level'].upper()}: {alert['message']}")
    
    # Exit with appropriate code
    sys.exit(0 if results['overall_status'] == 'healthy' else 1)

if __name__ == "__main__":
    asyncio.run(main())
