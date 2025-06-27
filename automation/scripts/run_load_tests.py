#!/usr/bin/env python3
"""
Load Testing Script
Comprehensive load testing for the A1Betting application.
"""

import json
import logging
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
import threading
import concurrent.futures

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class LoadTester:
    """Comprehensive load testing suite."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.test_results = {}
        self.errors = []
        
    def check_dependencies(self) -> bool:
        """Check if required dependencies are installed."""
        try:
            # Check if locust is available
            try:
                subprocess.run(['locust', '--version'], check=True, capture_output=True)
                logger.info("✓ Locust is available")
            except (subprocess.CalledProcessError, FileNotFoundError):
                logger.info("Installing Locust...")
                subprocess.run(['pip', 'install', 'locust'], check=True)
                logger.info("✓ Locust installed")
            
            # Check if requests is available
            try:
                import requests
                logger.info("✓ Requests library available")
            except ImportError:
                subprocess.run(['pip', 'install', 'requests'], check=True)
                logger.info("✓ Requests library installed")
            
            return True
            
        except Exception as e:
            logger.error(f"Dependency check failed: {e}")
            self.errors.append(f"Dependency check failed: {e}")
            return False
    
    def create_locust_file(self) -> bool:
        """Create Locust load testing file."""
        try:
            locust_content = '''
from locust import HttpUser, task, between
import json
import random

class A1BettingUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        """Actions to perform when a user starts."""
        # Simulate user login
        login_data = {
            "username": f"testuser{random.randint(1, 1000)}",
            "password": "testpassword"
        }
        
        response = self.client.post("/api/auth/login", json=login_data)
        if response.status_code == 200:
            # Store auth token if returned
            self.auth_token = response.json().get("token", "")
        else:
            self.auth_token = ""
    
    @task(3)
    def view_home_page(self):
        """Load the home page."""
        self.client.get("/")
    
    @task(2)
    def view_dashboard(self):
        """Load the dashboard."""
        headers = {"Authorization": f"Bearer {self.auth_token}"} if self.auth_token else {}
        self.client.get("/dashboard", headers=headers)
    
    @task(2)
    def view_betting_page(self):
        """Load the betting page."""
        self.client.get("/betting")
    
    @task(1)
    def view_analytics(self):
        """Load analytics page."""
        headers = {"Authorization": f"Bearer {self.auth_token}"} if self.auth_token else {}
        self.client.get("/analytics", headers=headers)
    
    @task(2)
    def api_get_odds(self):
        """Test odds API endpoint."""
        self.client.get("/api/odds")
    
    @task(1)
    def api_get_predictions(self):
        """Test predictions API endpoint."""
        headers = {"Authorization": f"Bearer {self.auth_token}"} if self.auth_token else {}
        self.client.get("/api/predictions", headers=headers)
    
    @task(1)
    def api_place_bet(self):
        """Test bet placement API."""
        if not self.auth_token:
            return
            
        bet_data = {
            "amount": random.uniform(10, 100),
            "selection": f"team_{random.randint(1, 10)}",
            "odds": random.uniform(1.5, 5.0)
        }
        
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        self.client.post("/api/bets", json=bet_data, headers=headers)
    
    @task(1)
    def api_get_balance(self):
        """Test balance API endpoint."""
        if not self.auth_token:
            return
            
        headers = {"Authorization": f"Bearer {self.auth_token}"}
        self.client.get("/api/user/balance", headers=headers)

class HighFrequencyUser(HttpUser):
    """High-frequency user for stress testing."""
    wait_time = between(0.1, 0.5)
    
    @task
    def rapid_api_calls(self):
        """Make rapid API calls."""
        endpoints = ["/api/odds", "/api/sports", "/api/markets"]
        endpoint = random.choice(endpoints)
        self.client.get(endpoint)

class MobileUser(HttpUser):
    """Mobile user simulation."""
    wait_time = between(2, 5)
    
    def on_start(self):
        """Set mobile user agent."""
        self.client.headers.update({
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
        })
    
    @task(4)
    def mobile_home(self):
        """Mobile home page access."""
        self.client.get("/")
    
    @task(2)
    def mobile_betting(self):
        """Mobile betting page."""
        self.client.get("/betting")
    
    @task(1)
    def mobile_api_odds(self):
        """Mobile API access."""
        self.client.get("/api/odds")
'''
            
            locust_file = self.project_root / 'automation' / 'reports' / 'locustfile.py'
            with open(locust_file, 'w') as f:
                f.write(locust_content)
            
            logger.info("✓ Locust file created")
            return True
            
        except Exception as e:
            logger.error(f"Failed to create Locust file: {e}")
            self.errors.append(f"Failed to create Locust file: {e}")
            return False
    
    def run_basic_load_test(self, target_url: str = 'http://localhost:3000') -> Dict[str, Any]:
        """Run basic load test."""
        try:
            logger.info("Running basic load test...")
            
            # Create Locust file
            if not self.create_locust_file():
                return {}
            
            locust_file = self.project_root / 'automation' / 'reports' / 'locustfile.py'
            
            # Run Locust test
            test_duration = 60  # 1 minute test
            users = 10
            spawn_rate = 2
            
            cmd = [
                'locust',
                '-f', str(locust_file),
                '--headless',
                '--users', str(users),
                '--spawn-rate', str(spawn_rate),
                '--run-time', f'{test_duration}s',
                '--host', target_url,
                '--csv', str(self.project_root / 'automation' / 'reports' / 'load_test'),
                '--html', str(self.project_root / 'automation' / 'reports' / 'load_test_report.html')
            ]
            
            logger.info(f"Running load test: {users} users, {spawn_rate} spawn rate, {test_duration}s duration")
            
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=test_duration + 30
            )
            
            if result.returncode == 0:
                # Parse results from CSV files
                stats_file = self.project_root / 'automation' / 'reports' / 'load_test_stats.csv'
                failures_file = self.project_root / 'automation' / 'reports' / 'load_test_failures.csv'
                
                load_test_results = {
                    'test_duration': test_duration,
                    'total_users': users,
                    'spawn_rate': spawn_rate,
                    'target_url': target_url,
                    'stats': [],
                    'failures': [],
                    'summary': {}
                }
                
                # Read stats
                if stats_file.exists():
                    import csv
                    with open(stats_file, 'r') as f:
                        reader = csv.DictReader(f)
                        load_test_results['stats'] = list(reader)
                
                # Read failures
                if failures_file.exists():
                    import csv
                    with open(failures_file, 'r') as f:
                        reader = csv.DictReader(f)
                        load_test_results['failures'] = list(reader)
                
                # Calculate summary metrics
                if load_test_results['stats']:
                    total_requests = sum(int(row.get('Request Count', 0)) for row in load_test_results['stats'] if row.get('Type') != 'Aggregated')
                    total_failures = sum(int(row.get('Failure Count', 0)) for row in load_test_results['stats'] if row.get('Type') != 'Aggregated')
                    
                    # Get aggregated stats
                    aggregated = next((row for row in load_test_results['stats'] if row.get('Type') == 'Aggregated'), {})
                    
                    load_test_results['summary'] = {
                        'total_requests': total_requests,
                        'total_failures': total_failures,
                        'failure_rate': (total_failures / total_requests * 100) if total_requests > 0 else 0,
                        'avg_response_time': float(aggregated.get('Average Response Time', 0)),
                        'min_response_time': float(aggregated.get('Min Response Time', 0)),
                        'max_response_time': float(aggregated.get('Max Response Time', 0)),
                        'requests_per_second': float(aggregated.get('Requests/s', 0))
                    }
                
                logger.info(f"✓ Basic load test completed: {load_test_results['summary'].get('total_requests', 0)} requests")
                return load_test_results
            else:
                logger.error(f"Load test failed: {result.stderr}")
                return {'error': result.stderr}
            
        except subprocess.TimeoutExpired:
            logger.error("Load test timed out")
            return {'error': 'Load test timed out'}
        except Exception as e:
            logger.error(f"Load test failed: {e}")
            self.errors.append(f"Load test failed: {e}")
            return {}
    
    def run_stress_test(self, target_url: str = 'http://localhost:3000') -> Dict[str, Any]:
        """Run stress test with increasing load."""
        try:
            logger.info("Running stress test...")
            
            stress_results = {
                'test_phases': [],
                'breaking_point': None,
                'max_stable_users': 0
            }
            
            # Test with increasing number of users
            user_levels = [5, 10, 20, 30, 50, 75, 100]
            
            for users in user_levels:
                logger.info(f"Testing with {users} users...")
                
                # Quick stress test (30 seconds each)
                cmd = [
                    'locust',
                    '-f', str(self.project_root / 'automation' / 'reports' / 'locustfile.py'),
                    '--headless',
                    '--users', str(users),
                    '--spawn-rate', str(min(users, 10)),
                    '--run-time', '30s',
                    '--host', target_url,
                    '--csv', str(self.project_root / 'automation' / 'reports' / f'stress_test_{users}'),
                    '--only-summary'
                ]
                
                try:
                    result = subprocess.run(
                        cmd,
                        capture_output=True,
                        text=True,
                        timeout=60
                    )
                    
                    if result.returncode == 0:
                        # Parse results
                        stats_file = self.project_root / 'automation' / 'reports' / f'stress_test_{users}_stats.csv'
                        
                        phase_result = {
                            'users': users,
                            'success': True,
                            'avg_response_time': 0,
                            'failure_rate': 0,
                            'requests_per_second': 0
                        }
                        
                        if stats_file.exists():
                            import csv
                            with open(stats_file, 'r') as f:
                                reader = csv.DictReader(f)
                                stats = list(reader)
                                
                                # Get aggregated stats
                                aggregated = next((row for row in stats if row.get('Type') == 'Aggregated'), {})
                                if aggregated:
                                    phase_result['avg_response_time'] = float(aggregated.get('Average Response Time', 0))
                                    phase_result['requests_per_second'] = float(aggregated.get('Requests/s', 0))
                                    
                                    total_requests = int(aggregated.get('Request Count', 0))
                                    total_failures = int(aggregated.get('Failure Count', 0))
                                    phase_result['failure_rate'] = (total_failures / total_requests * 100) if total_requests > 0 else 0
                        
                        stress_results['test_phases'].append(phase_result)
                        
                        # Check if this is still stable (failure rate < 5%, response time < 5s)
                        if phase_result['failure_rate'] < 5 and phase_result['avg_response_time'] < 5000:
                            stress_results['max_stable_users'] = users
                        else:
                            stress_results['breaking_point'] = users
                            logger.info(f"Breaking point found at {users} users")
                            break
                        
                        logger.info(f"  {users} users: {phase_result['failure_rate']:.1f}% failures, {phase_result['avg_response_time']:.0f}ms avg")
                        
                    else:
                        stress_results['test_phases'].append({
                            'users': users,
                            'success': False,
                            'error': result.stderr
                        })
                        stress_results['breaking_point'] = users
                        break
                        
                except subprocess.TimeoutExpired:
                    stress_results['test_phases'].append({
                        'users': users,
                        'success': False,
                        'error': 'Test timed out'
                    })
                    stress_results['breaking_point'] = users
                    break
                
                # Brief pause between tests
                time.sleep(5)
            
            logger.info(f"✓ Stress test completed: Max stable users = {stress_results['max_stable_users']}")
            return stress_results
            
        except Exception as e:
            logger.error(f"Stress test failed: {e}")
            self.errors.append(f"Stress test failed: {e}")
            return {}
    
    def run_spike_test(self, target_url: str = 'http://localhost:3000') -> Dict[str, Any]:
        """Run spike test to check handling of sudden load increases."""
        try:
            logger.info("Running spike test...")
            
            # Simulate sudden spike in traffic
            spike_results = {
                'baseline_users': 5,
                'spike_users': 50,
                'baseline_results': {},
                'spike_results': {},
                'recovery_results': {}
            }
            
            # Phase 1: Baseline (5 users for 30s)
            logger.info("Phase 1: Baseline load...")
            baseline_cmd = [
                'locust',
                '-f', str(self.project_root / 'automation' / 'reports' / 'locustfile.py'),
                '--headless',
                '--users', '5',
                '--spawn-rate', '5',
                '--run-time', '30s',
                '--host', target_url,
                '--csv', str(self.project_root / 'automation' / 'reports' / 'spike_baseline'),
                '--only-summary'
            ]
            
            subprocess.run(baseline_cmd, timeout=60)
            
            # Phase 2: Spike (50 users for 30s)
            logger.info("Phase 2: Traffic spike...")
            spike_cmd = [
                'locust',
                '-f', str(self.project_root / 'automation' / 'reports' / 'locustfile.py'),
                '--headless',
                '--users', '50',
                '--spawn-rate', '50',  # Rapid spawn
                '--run-time', '30s',
                '--host', target_url,
                '--csv', str(self.project_root / 'automation' / 'reports' / 'spike_test'),
                '--only-summary'
            ]
            
            subprocess.run(spike_cmd, timeout=60)
            
            # Phase 3: Recovery (back to 5 users for 30s)
            logger.info("Phase 3: Recovery...")
            recovery_cmd = [
                'locust',
                '-f', str(self.project_root / 'automation' / 'reports' / 'locustfile.py'),
                '--headless',
                '--users', '5',
                '--spawn-rate', '5',
                '--run-time', '30s',
                '--host', target_url,
                '--csv', str(self.project_root / 'automation' / 'reports' / 'spike_recovery'),
                '--only-summary'
            ]
            
            subprocess.run(recovery_cmd, timeout=60)
            
            # Parse all results
            import csv
            
            def parse_stats_file(filename):
                stats_file = self.project_root / 'automation' / 'reports' / f'{filename}_stats.csv'
                if stats_file.exists():
                    with open(stats_file, 'r') as f:
                        reader = csv.DictReader(f)
                        stats = list(reader)
                        aggregated = next((row for row in stats if row.get('Type') == 'Aggregated'), {})
                        
                        if aggregated:
                            return {
                                'avg_response_time': float(aggregated.get('Average Response Time', 0)),
                                'requests_per_second': float(aggregated.get('Requests/s', 0)),
                                'total_requests': int(aggregated.get('Request Count', 0)),
                                'total_failures': int(aggregated.get('Failure Count', 0))
                            }
                return {}
            
            spike_results['baseline_results'] = parse_stats_file('spike_baseline')
            spike_results['spike_results'] = parse_stats_file('spike_test')
            spike_results['recovery_results'] = parse_stats_file('spike_recovery')
            
            # Calculate spike impact
            baseline_rt = spike_results['baseline_results'].get('avg_response_time', 0)
            spike_rt = spike_results['spike_results'].get('avg_response_time', 0)
            
            if baseline_rt > 0:
                spike_results['response_time_increase'] = ((spike_rt - baseline_rt) / baseline_rt) * 100
            else:
                spike_results['response_time_increase'] = 0
            
            logger.info(f"✓ Spike test completed: {spike_results['response_time_increase']:.1f}% response time increase during spike")
            return spike_results
            
        except Exception as e:
            logger.error(f"Spike test failed: {e}")
            self.errors.append(f"Spike test failed: {e}")
            return {}
    
    def run_comprehensive_load_tests(self) -> bool:
        """Run comprehensive load testing suite."""
        logger.info("Starting comprehensive load testing...")
        
        # Check dependencies first
        if not self.check_dependencies():
            return False
        
        # Check if target application is running
        target_url = 'http://localhost:3000'
        try:
            import requests
            response = requests.get(target_url, timeout=5)
            logger.info(f"✓ Target application is running at {target_url}")
        except Exception:
            logger.warning(f"Target application may not be running at {target_url}")
            # Continue anyway as the application might be starting
        
        test_functions = [
            ("Basic Load Test", lambda: self.run_basic_load_test(target_url)),
            ("Stress Test", lambda: self.run_stress_test(target_url)),
            ("Spike Test", lambda: self.run_spike_test(target_url))
        ]
        
        success_count = 0
        total_tests = len(test_functions)
        
        for test_name, test_func in test_functions:
            logger.info(f"Running: {test_name}")
            try:
                result = test_func()
                if result and 'error' not in result:
                    self.test_results[test_name.lower().replace(' ', '_')] = result
                    success_count += 1
                    logger.info(f"✓ {test_name} completed")
                else:
                    logger.error(f"✗ {test_name} failed")
                    if result and 'error' in result:
                        self.errors.append(f"{test_name}: {result['error']}")
            except Exception as e:
                logger.error(f"✗ {test_name} failed with exception: {e}")
                self.errors.append(f"{test_name}: {e}")
        
        # Generate test report
        self.generate_test_report(success_count, total_tests)
        
        success_rate = (success_count / total_tests) * 100
        logger.info(f"Load testing completed: {success_count}/{total_tests} tests successful ({success_rate:.1f}%)")
        
        return success_count >= (total_tests * 0.6)  # 60% success rate required
    
    def generate_test_report(self, success_count: int, total_tests: int):
        """Generate comprehensive load testing report."""
        try:
            report = {
                'timestamp': datetime.now().isoformat(),
                'summary': {
                    'total_tests': total_tests,
                    'successful_tests': success_count,
                    'failed_tests': total_tests - success_count,
                    'success_rate': (success_count / total_tests) * 100
                },
                'test_results': self.test_results,
                'errors': self.errors,
                'recommendations': []
            }
            
            # Generate recommendations
            self._add_load_test_recommendations(report)
            
            # Save detailed report
            report_file = self.project_root / 'automation' / 'reports' / 'load_test_report.json'
            with open(report_file, 'w') as f:
                json.dump(report, f, indent=2, default=str)
            
            # Generate human-readable report
            self.generate_human_readable_report(report)
            
            logger.info(f"Load testing report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate test report: {e}")
    
    def _add_load_test_recommendations(self, report: Dict[str, Any]):
        """Add load testing recommendations."""
        recommendations = []
        
        # Basic load test recommendations
        basic_test = self.test_results.get('basic_load_test', {})
        summary = basic_test.get('summary', {})
        
        if summary.get('failure_rate', 0) > 5:
            recommendations.append(f"High failure rate ({summary['failure_rate']:.1f}%) - investigate error handling")
        
        if summary.get('avg_response_time', 0) > 2000:
            recommendations.append(f"Slow response time ({summary['avg_response_time']:.0f}ms) - optimize performance")
        
        # Stress test recommendations
        stress_test = self.test_results.get('stress_test', {})
        max_users = stress_test.get('max_stable_users', 0)
        
        if max_users < 20:
            recommendations.append(f"Low maximum stable users ({max_users}) - scale infrastructure")
        
        # Spike test recommendations
        spike_test = self.test_results.get('spike_test', {})
        rt_increase = spike_test.get('response_time_increase', 0)
        
        if rt_increase > 200:
            recommendations.append(f"High response time increase during spikes ({rt_increase:.1f}%) - implement load balancing")
        
        report['recommendations'] = recommendations
    
    def generate_human_readable_report(self, report_data: Dict):
        """Generate human-readable load testing report."""
        try:
            report_file = self.project_root / 'automation' / 'reports' / 'load_test_summary.md'
            
            with open(report_file, 'w') as f:
                f.write("# Load Testing Report\n\n")
                f.write(f"**Generated:** {report_data['timestamp']}\n\n")
                
                # Summary
                summary = report_data['summary']
                f.write("## Summary\n\n")
                f.write(f"- **Total Tests:** {summary['total_tests']}\n")
                f.write(f"- **Successful:** {summary['successful_tests']}\n")
                f.write(f"- **Failed:** {summary['failed_tests']}\n")
                f.write(f"- **Success Rate:** {summary['success_rate']:.1f}%\n\n")
                
                # Test Results
                basic_test = self.test_results.get('basic_load_test', {})
                if basic_test:
                    f.write("## Basic Load Test Results\n\n")
                    summary = basic_test.get('summary', {})
                    f.write(f"- **Total Requests:** {summary.get('total_requests', 0)}\n")
                    f.write(f"- **Failure Rate:** {summary.get('failure_rate', 0):.1f}%\n")
                    f.write(f"- **Average Response Time:** {summary.get('avg_response_time', 0):.0f}ms\n")
                    f.write(f"- **Requests per Second:** {summary.get('requests_per_second', 0):.1f}\n\n")
                
                stress_test = self.test_results.get('stress_test', {})
                if stress_test:
                    f.write("## Stress Test Results\n\n")
                    f.write(f"- **Maximum Stable Users:** {stress_test.get('max_stable_users', 0)}\n")
                    if stress_test.get('breaking_point'):
                        f.write(f"- **Breaking Point:** {stress_test['breaking_point']} users\n")
                    f.write("\n")
                
                # Recommendations
                if report_data['recommendations']:
                    f.write("## Recommendations\n\n")
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
    tester = LoadTester()
    success = tester.run_comprehensive_load_tests()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
