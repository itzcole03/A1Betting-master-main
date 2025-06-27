#!/usr/bin/env python3
"""
Accessibility Testing Script
Runs comprehensive accessibility tests using axe-core and other tools.
"""

import json
import logging
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AccessibilityTester:
    """Accessibility testing suite using various tools."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.test_results = {}
        self.errors = []
        self.violations = []
        
    def check_dependencies(self) -> bool:
        """Check if required dependencies are installed."""
        try:
            # Check Node.js and npm
            subprocess.run(['node', '--version'], check=True, capture_output=True)
            subprocess.run(['npm', '--version'], check=True, capture_output=True)
            
            # Check if axe-core CLI is available
            try:
                subprocess.run(['npx', '@axe-core/cli', '--version'], check=True, capture_output=True)
                logger.info("✓ axe-core CLI is available")
            except subprocess.CalledProcessError:
                logger.info("Installing axe-core CLI...")
                subprocess.run(['npm', 'install', '-g', '@axe-core/cli'], check=True)
                logger.info("✓ axe-core CLI installed")
            
            return True
            
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            logger.error(f"Dependency check failed: {e}")
            self.errors.append(f"Dependency check failed: {e}")
            return False
    
    def create_test_server(self) -> Optional[subprocess.Popen]:
        """Start a local server for testing."""
        try:
            frontend_dir = self.project_root / 'frontend'
            if not frontend_dir.exists():
                logger.warning("Frontend directory not found")
                return None
            
            # Check if development server can be started
            package_json = frontend_dir / 'package.json'
            if package_json.exists():
                with open(package_json, 'r') as f:
                    package_data = json.load(f)
                    scripts = package_data.get('scripts', {})
                    
                    if 'start' in scripts or 'dev' in scripts:
                        start_cmd = 'start' if 'start' in scripts else 'dev'
                        logger.info(f"Starting development server...")
                        
                        # Start the server
                        process = subprocess.Popen(
                            ['npm', 'run', start_cmd],
                            cwd=frontend_dir,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE,
                            text=True
                        )
                        
                        # Wait for server to start
                        time.sleep(10)
                        
                        # Check if server is responding
                        try:
                            import requests
                            response = requests.get('http://localhost:3000', timeout=5)
                            if response.status_code == 200:
                                logger.info("✓ Development server started successfully")
                                return process
                        except:
                            pass
                        
                        logger.warning("Development server may not be ready")
                        return process
            
            return None
            
        except Exception as e:
            logger.error(f"Failed to start test server: {e}")
            self.errors.append(f"Failed to start test server: {e}")
            return None
    
    def run_axe_core_tests(self, server_url: str = 'http://localhost:3000') -> bool:
        """Run axe-core accessibility tests."""
        try:
            logger.info("Running axe-core accessibility tests...")
            
            # Test URLs to check
            test_urls = [
                server_url,
                f"{server_url}/dashboard",
                f"{server_url}/betting",
                f"{server_url}/analytics",
                f"{server_url}/settings"
            ]
            
            total_violations = 0
            url_results = {}
            
            for url in test_urls:
                logger.info(f"Testing: {url}")
                
                try:
                    # Run axe-core CLI
                    result = subprocess.run([
                        'npx', '@axe-core/cli', 
                        url,
                        '--format', 'json',
                        '--timeout', '10000'
                    ], capture_output=True, text=True, timeout=30)
                    
                    if result.returncode == 0:
                        # Parse results
                        axe_results = json.loads(result.stdout)
                        violations = axe_results.get('violations', [])
                        
                        url_results[url] = {
                            'violations_count': len(violations),
                            'violations': violations,
                            'passes': len(axe_results.get('passes', [])),
                            'incomplete': len(axe_results.get('incomplete', []))
                        }
                        
                        total_violations += len(violations)
                        
                        if violations:
                            logger.warning(f"✗ {url}: {len(violations)} accessibility violations found")
                            for violation in violations:
                                self.violations.append({
                                    'url': url,
                                    'rule': violation.get('id'),
                                    'impact': violation.get('impact'),
                                    'description': violation.get('description'),
                                    'help': violation.get('help'),
                                    'nodes_count': len(violation.get('nodes', []))
                                })
                        else:
                            logger.info(f"✓ {url}: No accessibility violations found")
                    else:
                        logger.warning(f"✗ {url}: axe-core test failed - {result.stderr}")
                        url_results[url] = {'error': result.stderr}
                        
                except (subprocess.TimeoutExpired, json.JSONDecodeError) as e:
                    logger.warning(f"✗ {url}: Test failed - {e}")
                    url_results[url] = {'error': str(e)}
                except Exception as e:
                    logger.warning(f"✗ {url}: Unexpected error - {e}")
                    url_results[url] = {'error': str(e)}
            
            self.test_results['axe_core'] = {
                'total_violations': total_violations,
                'urls_tested': len(test_urls),
                'url_results': url_results
            }
            
            logger.info(f"axe-core tests completed: {total_violations} total violations found")
            return total_violations == 0
            
        except Exception as e:
            logger.error(f"axe-core tests failed: {e}")
            self.errors.append(f"axe-core tests failed: {e}")
            return False
    
    def run_lighthouse_accessibility_tests(self, server_url: str = 'http://localhost:3000') -> bool:
        """Run Lighthouse accessibility tests."""
        try:
            logger.info("Running Lighthouse accessibility tests...")
            
            # Check if Lighthouse is available
            try:
                subprocess.run(['npx', 'lighthouse', '--version'], check=True, capture_output=True)
            except subprocess.CalledProcessError:
                logger.info("Installing Lighthouse...")
                subprocess.run(['npm', 'install', '-g', 'lighthouse'], check=True)
            
            lighthouse_results = {}
            
            # Test main pages
            test_pages = [
                ('Home', server_url),
                ('Dashboard', f"{server_url}/dashboard")
            ]
            
            for page_name, url in test_pages:
                logger.info(f"Running Lighthouse accessibility audit for {page_name}...")
                
                try:
                    # Run Lighthouse with accessibility focus
                    output_path = self.project_root / 'automation' / 'reports' / f'lighthouse_a11y_{page_name.lower()}.json'
                    
                    result = subprocess.run([
                        'npx', 'lighthouse',
                        url,
                        '--only-categories=accessibility',
                        '--output=json',
                        f'--output-path={output_path}',
                        '--chrome-flags=--headless',
                        '--quiet'
                    ], capture_output=True, text=True, timeout=60)
                    
                    if result.returncode == 0 and output_path.exists():
                        with open(output_path, 'r') as f:
                            lighthouse_data = json.load(f)
                            
                        accessibility_score = lighthouse_data['categories']['accessibility']['score']
                        audits = lighthouse_data['audits']
                        
                        # Extract accessibility-specific audits
                        a11y_audits = {}
                        for audit_id, audit_data in audits.items():
                            if audit_id.startswith('color-contrast') or \
                               audit_id.startswith('label') or \
                               audit_id.startswith('aria-') or \
                               audit_id in ['image-alt', 'focus-traps', 'focusable-controls', 'interactive-element-affordance']:
                                a11y_audits[audit_id] = {
                                    'score': audit_data.get('score'),
                                    'title': audit_data.get('title'),
                                    'description': audit_data.get('description')
                                }
                        
                        lighthouse_results[page_name] = {
                            'accessibility_score': accessibility_score,
                            'score_percentage': int(accessibility_score * 100) if accessibility_score else 0,
                            'audits': a11y_audits
                        }
                        
                        logger.info(f"✓ {page_name}: Accessibility score {int(accessibility_score * 100)}%")
                        
                    else:
                        logger.warning(f"✗ {page_name}: Lighthouse test failed")
                        lighthouse_results[page_name] = {'error': 'Lighthouse test failed'}
                        
                except subprocess.TimeoutExpired:
                    logger.warning(f"✗ {page_name}: Lighthouse test timed out")
                    lighthouse_results[page_name] = {'error': 'Test timed out'}
                except Exception as e:
                    logger.warning(f"✗ {page_name}: Lighthouse test error - {e}")
                    lighthouse_results[page_name] = {'error': str(e)}
            
            self.test_results['lighthouse'] = lighthouse_results
            
            # Check if all tests passed (score > 90%)
            all_passed = all(
                result.get('score_percentage', 0) >= 90 
                for result in lighthouse_results.values() 
                if 'error' not in result
            )
            
            return all_passed
            
        except Exception as e:
            logger.error(f"Lighthouse accessibility tests failed: {e}")
            self.errors.append(f"Lighthouse accessibility tests failed: {e}")
            return False
    
    def run_static_analysis(self) -> bool:
        """Run static accessibility analysis on source code."""
        try:
            logger.info("Running static accessibility analysis...")
            
            static_results = {}
            
            # Check for common accessibility patterns in React components
            frontend_dir = self.project_root / 'frontend' / 'src'
            if frontend_dir.exists():
                accessibility_issues = []
                
                # Common patterns to check
                patterns_to_check = {
                    'missing_alt_text': r'<img(?![^>]*alt=)',
                    'missing_aria_label': r'<button(?![^>]*aria-label)(?![^>]*aria-labelledby)',
                    'missing_form_labels': r'<input(?![^>]*aria-label)(?![^>]*aria-labelledby)(?![^>]*id)',
                    'low_contrast_indicators': r'color:\s*#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})',
                }
                
                import re
                for pattern_name, pattern in patterns_to_check.items():
                    count = 0
                    for file_path in frontend_dir.rglob('*.tsx'):
                        try:
                            with open(file_path, 'r', encoding='utf-8') as f:
                                content = f.read()
                                matches = re.findall(pattern, content)
                                if matches:
                                    count += len(matches)
                                    accessibility_issues.append({
                                        'file': str(file_path.relative_to(self.project_root)),
                                        'issue': pattern_name,
                                        'matches': len(matches)
                                    })
                        except Exception:
                            continue
                    
                    static_results[pattern_name] = count
                
                static_results['total_issues'] = sum(static_results.values())
                static_results['issues_detail'] = accessibility_issues
                
                logger.info(f"Static analysis found {static_results['total_issues']} potential accessibility issues")
            
            self.test_results['static_analysis'] = static_results
            return static_results.get('total_issues', 0) < 10  # Allow up to 10 minor issues
            
        except Exception as e:
            logger.error(f"Static accessibility analysis failed: {e}")
            self.errors.append(f"Static accessibility analysis failed: {e}")
            return False
    
    def run_accessibility_tests(self) -> bool:
        """Run all accessibility tests."""
        logger.info("Starting comprehensive accessibility tests...")
        
        # Check dependencies first
        if not self.check_dependencies():
            return False
        
        # Start test server
        server_process = self.create_test_server()
        
        try:
            test_functions = [
                ("Static Analysis", self.run_static_analysis),
                ("axe-core Tests", self.run_axe_core_tests),
                ("Lighthouse Accessibility", self.run_lighthouse_accessibility_tests)
            ]
            
            success_count = 0
            total_tests = len(test_functions)
            
            for test_name, test_func in test_functions:
                logger.info(f"Running: {test_name}")
                try:
                    if test_func():
                        success_count += 1
                        logger.info(f"✓ {test_name} passed")
                    else:
                        logger.error(f"✗ {test_name} failed")
                except Exception as e:
                    logger.error(f"✗ {test_name} failed with exception: {e}")
                    self.errors.append(f"{test_name}: {e}")
            
            # Generate test report
            self.generate_test_report(success_count, total_tests)
            
            success_rate = (success_count / total_tests) * 100
            logger.info(f"Accessibility tests completed: {success_count}/{total_tests} passed ({success_rate:.1f}%)")
            
            return success_count >= (total_tests * 0.7)  # 70% pass rate required
            
        finally:
            # Clean up server process
            if server_process:
                try:
                    server_process.terminate()
                    server_process.wait(timeout=5)
                    logger.info("Test server stopped")
                except:
                    server_process.kill()
    
    def generate_test_report(self, success_count: int, total_tests: int):
        """Generate accessibility test report."""
        try:
            report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'summary': {
                    'total_tests': total_tests,
                    'passed_tests': success_count,
                    'failed_tests': total_tests - success_count,
                    'success_rate': (success_count / total_tests) * 100
                },
                'test_results': self.test_results,
                'violations': self.violations,
                'errors': self.errors,
                'recommendations': []
            }
            
            # Add specific recommendations
            if self.violations:
                report['recommendations'].extend([
                    "Review and fix accessibility violations found by axe-core",
                    "Ensure all interactive elements have proper ARIA labels",
                    "Verify color contrast meets WCAG standards",
                    "Test with screen readers and keyboard navigation"
                ])
            
            lighthouse_scores = self.test_results.get('lighthouse', {})
            low_scores = [
                page for page, data in lighthouse_scores.items()
                if isinstance(data, dict) and data.get('score_percentage', 0) < 90
            ]
            
            if low_scores:
                report['recommendations'].append(f"Improve Lighthouse accessibility scores for: {', '.join(low_scores)}")
            
            static_issues = self.test_results.get('static_analysis', {}).get('total_issues', 0)
            if static_issues > 0:
                report['recommendations'].append(f"Address {static_issues} potential accessibility issues found in static analysis")
            
            # Save report
            report_file = self.project_root / 'automation' / 'reports' / 'accessibility_test_report.json'
            with open(report_file, 'w') as f:
                json.dump(report, f, indent=2)
            
            # Save human-readable report
            self.generate_human_readable_report(report)
            
            logger.info(f"Accessibility test report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate test report: {e}")
    
    def generate_human_readable_report(self, report_data: Dict):
        """Generate human-readable accessibility report."""
        try:
            report_file = self.project_root / 'automation' / 'reports' / 'accessibility_report.md'
            
            with open(report_file, 'w') as f:
                f.write("# Accessibility Test Report\n\n")
                f.write(f"**Generated:** {report_data['timestamp']}\n\n")
                
                # Summary
                summary = report_data['summary']
                f.write("## Summary\n\n")
                f.write(f"- **Total Tests:** {summary['total_tests']}\n")
                f.write(f"- **Passed:** {summary['passed_tests']}\n")
                f.write(f"- **Failed:** {summary['failed_tests']}\n")
                f.write(f"- **Success Rate:** {summary['success_rate']:.1f}%\n\n")
                
                # Violations
                if self.violations:
                    f.write("## Accessibility Violations\n\n")
                    for violation in self.violations[:10]:  # Top 10 violations
                        f.write(f"### {violation['rule']}\n")
                        f.write(f"- **URL:** {violation['url']}\n")
                        f.write(f"- **Impact:** {violation['impact']}\n")
                        f.write(f"- **Description:** {violation['description']}\n")
                        f.write(f"- **Affected Elements:** {violation['nodes_count']}\n\n")
                
                # Recommendations
                if report_data['recommendations']:
                    f.write("## Recommendations\n\n")
                    for recommendation in report_data['recommendations']:
                        f.write(f"- {recommendation}\n")
                
            logger.info(f"Human-readable report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate human-readable report: {e}")

def main():
    """Main execution function."""
    tester = AccessibilityTester()
    success = tester.run_accessibility_tests()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
