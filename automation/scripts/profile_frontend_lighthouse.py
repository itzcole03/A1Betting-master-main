#!/usr/bin/env python3
"""
Frontend Performance Profiling with Lighthouse
Comprehensive frontend performance analysis using Lighthouse and other tools.
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

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class FrontendLighthouseProfiler:
    """Frontend performance profiling using Lighthouse and other tools."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.frontend_path = self.project_root / 'frontend'
        self.profile_results = {}
        self.errors = []
        
    def check_dependencies(self) -> bool:
        """Check if required dependencies are installed."""
        try:
            # Check Node.js and npm
            subprocess.run(['node', '--version'], check=True, capture_output=True)
            subprocess.run(['npm', '--version'], check=True, capture_output=True)
            
            # Check Lighthouse
            try:
                result = subprocess.run(['npx', 'lighthouse', '--version'], check=True, capture_output=True, text=True)
                logger.info(f"✓ Lighthouse version: {result.stdout.strip()}")
            except subprocess.CalledProcessError:
                logger.info("Installing Lighthouse...")
                subprocess.run(['npm', 'install', '-g', 'lighthouse'], check=True)
                logger.info("✓ Lighthouse installed")
            
            # Check webpack-bundle-analyzer
            try:
                subprocess.run(['npx', 'webpack-bundle-analyzer', '--version'], check=True, capture_output=True)
                logger.info("✓ webpack-bundle-analyzer available")
            except subprocess.CalledProcessError:
                logger.info("Installing webpack-bundle-analyzer...")
                subprocess.run(['npm', 'install', '-g', 'webpack-bundle-analyzer'], check=True)
                logger.info("✓ webpack-bundle-analyzer installed")
            
            return True
            
        except (subprocess.CalledProcessError, FileNotFoundError) as e:
            logger.error(f"Dependency check failed: {e}")
            self.errors.append(f"Dependency check failed: {e}")
            return False
    
    def start_development_server(self) -> Optional[subprocess.Popen]:
        """Start the development server for testing."""
        try:
            if not self.frontend_path.exists():
                logger.warning("Frontend directory not found")
                return None
            
            package_json = self.frontend_path / 'package.json'
            if not package_json.exists():
                logger.warning("package.json not found")
                return None
            
            with open(package_json, 'r') as f:
                package_data = json.load(f)
                scripts = package_data.get('scripts', {})
            
            # Determine start command
            start_cmd = None
            if 'dev' in scripts:
                start_cmd = 'dev'
            elif 'start' in scripts:
                start_cmd = 'start'
            elif 'serve' in scripts:
                start_cmd = 'serve'
            
            if not start_cmd:
                logger.warning("No suitable start script found in package.json")
                return None
            
            logger.info(f"Starting development server with: npm run {start_cmd}")
            
            process = subprocess.Popen(
                ['npm', 'run', start_cmd],
                cwd=self.frontend_path,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            
            # Wait for server to start
            time.sleep(15)
            
            # Verify server is running
            try:
                import requests
                response = requests.get('http://localhost:3000', timeout=10)
                if response.status_code == 200:
                    logger.info("✓ Development server started successfully")
                    return process
                else:
                    logger.warning(f"Server responded with status {response.status_code}")
                    return process
            except Exception as e:
                logger.warning(f"Could not verify server status: {e}")
                return process
            
        except Exception as e:
            logger.error(f"Failed to start development server: {e}")
            self.errors.append(f"Failed to start development server: {e}")
            return None
    
    def run_lighthouse_audit(self, url: str = 'http://localhost:3000') -> Dict[str, Any]:
        """Run comprehensive Lighthouse audit."""
        try:
            logger.info("Running Lighthouse performance audit...")
            
            lighthouse_results = {}
            
            # Test different pages
            test_pages = [
                ('home', url),
                ('dashboard', f"{url}/dashboard"),
                ('betting', f"{url}/betting"),
                ('analytics', f"{url}/analytics")
            ]
            
            for page_name, page_url in test_pages:
                logger.info(f"Auditing {page_name}: {page_url}")
                
                try:
                    # Run Lighthouse audit
                    output_path = self.project_root / 'automation' / 'reports' / f'lighthouse_{page_name}.json'
                    
                    result = subprocess.run([
                        'npx', 'lighthouse',
                        page_url,
                        '--output=json',
                        f'--output-path={output_path}',
                        '--chrome-flags=--headless --no-sandbox --disable-dev-shm-usage',
                        '--quiet'
                    ], capture_output=True, text=True, timeout=120)
                    
                    if result.returncode == 0 and output_path.exists():
                        with open(output_path, 'r') as f:
                            lighthouse_data = json.load(f)
                        
                        # Extract key metrics
                        categories = lighthouse_data.get('categories', {})
                        audits = lighthouse_data.get('audits', {})
                        
                        page_results = {
                            'url': page_url,
                            'scores': {},
                            'metrics': {},
                            'opportunities': [],
                            'diagnostics': []
                        }
                        
                        # Extract category scores
                        for category_name, category_data in categories.items():
                            page_results['scores'][category_name] = {
                                'score': category_data.get('score'),
                                'title': category_data.get('title')
                            }
                        
                        # Extract Core Web Vitals and other key metrics
                        key_metrics = [
                            'first-contentful-paint',
                            'largest-contentful-paint',
                            'first-meaningful-paint',
                            'speed-index',
                            'interactive',
                            'total-blocking-time',
                            'cumulative-layout-shift'
                        ]
                        
                        for metric in key_metrics:
                            if metric in audits:
                                audit_data = audits[metric]
                                page_results['metrics'][metric] = {
                                    'value': audit_data.get('numericValue'),
                                    'displayValue': audit_data.get('displayValue'),
                                    'score': audit_data.get('score')
                                }
                        
                        # Extract opportunities (performance improvements)
                        for audit_id, audit_data in audits.items():
                            if audit_data.get('details', {}).get('type') == 'opportunity':
                                page_results['opportunities'].append({
                                    'id': audit_id,
                                    'title': audit_data.get('title'),
                                    'description': audit_data.get('description'),
                                    'score': audit_data.get('score'),
                                    'wastedMs': audit_data.get('details', {}).get('overallSavingsMs', 0)
                                })
                        
                        # Extract diagnostics
                        diagnostic_audits = [
                            'unused-javascript',
                            'unused-css-rules',
                            'render-blocking-resources',
                            'unminified-css',
                            'unminified-javascript'
                        ]
                        
                        for audit_id in diagnostic_audits:
                            if audit_id in audits:
                                audit_data = audits[audit_id]
                                page_results['diagnostics'].append({
                                    'id': audit_id,
                                    'title': audit_data.get('title'),
                                    'score': audit_data.get('score'),
                                    'details': audit_data.get('details', {})
                                })
                        
                        lighthouse_results[page_name] = page_results
                        
                        # Log summary
                        perf_score = page_results['scores'].get('performance', {}).get('score', 0)
                        perf_percentage = int(perf_score * 100) if perf_score else 0
                        logger.info(f"✓ {page_name}: Performance score {perf_percentage}%")
                        
                    else:
                        logger.warning(f"✗ {page_name}: Lighthouse audit failed - {result.stderr}")
                        lighthouse_results[page_name] = {'error': result.stderr}
                
                except subprocess.TimeoutExpired:
                    logger.warning(f"✗ {page_name}: Lighthouse audit timed out")
                    lighthouse_results[page_name] = {'error': 'Audit timed out'}
                except Exception as e:
                    logger.warning(f"✗ {page_name}: Lighthouse audit error - {e}")
                    lighthouse_results[page_name] = {'error': str(e)}
            
            return lighthouse_results
            
        except Exception as e:
            logger.error(f"Lighthouse audit failed: {e}")
            self.errors.append(f"Lighthouse audit failed: {e}")
            return {}
    
    def analyze_bundle_size(self) -> Dict[str, Any]:
        """Analyze bundle size and composition."""
        try:
            logger.info("Analyzing bundle size...")
            
            bundle_results = {}
            
            # Check if build exists or create one
            build_dir = self.frontend_path / 'build'
            dist_dir = self.frontend_path / 'dist'
            
            if not build_dir.exists() and not dist_dir.exists():
                logger.info("Building project for bundle analysis...")
                
                # Try to build the project
                package_json = self.frontend_path / 'package.json'
                if package_json.exists():
                    with open(package_json, 'r') as f:
                        package_data = json.load(f)
                        scripts = package_data.get('scripts', {})
                    
                    build_cmd = None
                    if 'build' in scripts:
                        build_cmd = 'build'
                    elif 'build:prod' in scripts:
                        build_cmd = 'build:prod'
                    
                    if build_cmd:
                        try:
                            subprocess.run([
                                'npm', 'run', build_cmd
                            ], cwd=self.frontend_path, check=True, timeout=300)
                            logger.info("✓ Project built successfully")
                        except subprocess.CalledProcessError as e:
                            logger.warning(f"Build failed: {e}")
                        except subprocess.TimeoutExpired:
                            logger.warning("Build timed out")
            
            # Analyze bundle if it exists
            bundle_dir = build_dir if build_dir.exists() else dist_dir
            if bundle_dir.exists():
                # Calculate total bundle size
                total_size = 0
                file_sizes = {}
                
                for file_path in bundle_dir.rglob('*'):
                    if file_path.is_file():
                        size = file_path.stat().st_size
                        total_size += size
                        
                        # Categorize by file type
                        suffix = file_path.suffix.lower()
                        if suffix not in file_sizes:
                            file_sizes[suffix] = {'count': 0, 'total_size': 0}
                        file_sizes[suffix]['count'] += 1
                        file_sizes[suffix]['total_size'] += size
                
                bundle_results['total_size'] = total_size
                bundle_results['total_size_mb'] = total_size / (1024 * 1024)
                bundle_results['file_breakdown'] = file_sizes
                
                # Find largest files
                large_files = []
                for file_path in bundle_dir.rglob('*'):
                    if file_path.is_file():
                        size = file_path.stat().st_size
                        if size > 100 * 1024:  # Files larger than 100KB
                            large_files.append({
                                'file': str(file_path.relative_to(bundle_dir)),
                                'size': size,
                                'size_kb': size / 1024
                            })
                
                # Sort by size
                large_files.sort(key=lambda x: x['size'], reverse=True)
                bundle_results['large_files'] = large_files[:20]  # Top 20 largest files
                
                logger.info(f"✓ Bundle analysis completed: {bundle_results['total_size_mb']:.2f} MB total")
            else:
                logger.warning("No build directory found for bundle analysis")
                bundle_results['error'] = 'No build directory found'
            
            return bundle_results
            
        except Exception as e:
            logger.error(f"Bundle analysis failed: {e}")
            self.errors.append(f"Bundle analysis failed: {e}")
            return {}
    
    def analyze_dependencies(self) -> Dict[str, Any]:
        """Analyze project dependencies."""
        try:
            logger.info("Analyzing project dependencies...")
            
            dependency_results = {}
            
            package_json = self.frontend_path / 'package.json'
            if package_json.exists():
                with open(package_json, 'r') as f:
                    package_data = json.load(f)
                
                dependencies = package_data.get('dependencies', {})
                dev_dependencies = package_data.get('devDependencies', {})
                
                dependency_results['dependency_count'] = len(dependencies)
                dependency_results['dev_dependency_count'] = len(dev_dependencies)
                dependency_results['total_dependencies'] = len(dependencies) + len(dev_dependencies)
                
                # Check for outdated packages
                try:
                    result = subprocess.run([
                        'npm', 'outdated', '--json'
                    ], cwd=self.frontend_path, capture_output=True, text=True)
                    
                    if result.stdout:
                        outdated_data = json.loads(result.stdout)
                        dependency_results['outdated_packages'] = len(outdated_data)
                        dependency_results['outdated_details'] = list(outdated_data.keys())[:10]  # Top 10
                    else:
                        dependency_results['outdated_packages'] = 0
                        dependency_results['outdated_details'] = []
                        
                except (subprocess.CalledProcessError, json.JSONDecodeError):
                    logger.warning("Could not check for outdated packages")
                    dependency_results['outdated_packages'] = 'unknown'
                
                # Analyze package sizes (if possible)
                try:
                    result = subprocess.run([
                        'npx', 'bundlephobia-cli', '--json'
                    ], cwd=self.frontend_path, capture_output=True, text=True, timeout=60)
                    
                    if result.returncode == 0:
                        size_data = json.loads(result.stdout)
                        dependency_results['package_sizes'] = size_data
                    
                except (subprocess.CalledProcessError, json.JSONDecodeError, subprocess.TimeoutExpired, FileNotFoundError):
                    logger.info("Bundlephobia analysis not available")
                
                logger.info(f"✓ Dependency analysis completed: {dependency_results['total_dependencies']} total packages")
            else:
                logger.warning("package.json not found")
                dependency_results['error'] = 'package.json not found'
            
            return dependency_results
            
        except Exception as e:
            logger.error(f"Dependency analysis failed: {e}")
            self.errors.append(f"Dependency analysis failed: {e}")
            return {}
    
    def run_performance_budget_check(self) -> Dict[str, Any]:
        """Check against performance budgets."""
        try:
            logger.info("Checking performance budgets...")
            
            budget_results = {
                'budget_violations': [],
                'recommendations': []
            }
            
            # Define performance budgets
            budgets = {
                'total_bundle_size_mb': 2.0,
                'first_contentful_paint_ms': 2000,
                'largest_contentful_paint_ms': 4000,
                'time_to_interactive_ms': 5000,
                'performance_score': 0.9,
                'accessibility_score': 0.9,
                'best_practices_score': 0.9
            }
            
            # Check bundle size budget
            bundle_data = self.profile_results.get('bundle_analysis', {})
            if 'total_size_mb' in bundle_data:
                actual_size = bundle_data['total_size_mb']
                budget_size = budgets['total_bundle_size_mb']
                
                if actual_size > budget_size:
                    budget_results['budget_violations'].append({
                        'metric': 'Bundle Size',
                        'budget': f"{budget_size} MB",
                        'actual': f"{actual_size:.2f} MB",
                        'violation_percentage': ((actual_size - budget_size) / budget_size) * 100
                    })
            
            # Check Lighthouse metrics budget
            lighthouse_data = self.profile_results.get('lighthouse_audit', {})
            for page_name, page_data in lighthouse_data.items():
                if 'error' not in page_data:
                    # Check performance scores
                    scores = page_data.get('scores', {})
                    for score_type, score_data in scores.items():
                        if score_type in ['performance', 'accessibility', 'best-practices']:
                            budget_key = f"{score_type.replace('-', '_')}_score"
                            if budget_key in budgets:
                                actual_score = score_data.get('score', 0)
                                budget_score = budgets[budget_key]
                                
                                if actual_score < budget_score:
                                    budget_results['budget_violations'].append({
                                        'page': page_name,
                                        'metric': f"{score_type.title()} Score",
                                        'budget': f"{int(budget_score * 100)}%",
                                        'actual': f"{int(actual_score * 100)}%",
                                        'violation_percentage': ((budget_score - actual_score) / budget_score) * 100
                                    })
                    
                    # Check timing metrics
                    metrics = page_data.get('metrics', {})
                    timing_checks = [
                        ('first-contentful-paint', 'first_contentful_paint_ms'),
                        ('largest-contentful-paint', 'largest_contentful_paint_ms'),
                        ('interactive', 'time_to_interactive_ms')
                    ]
                    
                    for metric_key, budget_key in timing_checks:
                        if metric_key in metrics and budget_key in budgets:
                            actual_value = metrics[metric_key].get('value', 0)
                            budget_value = budgets[budget_key]
                            
                            if actual_value > budget_value:
                                budget_results['budget_violations'].append({
                                    'page': page_name,
                                    'metric': metric_key.replace('-', ' ').title(),
                                    'budget': f"{budget_value} ms",
                                    'actual': f"{actual_value:.0f} ms",
                                    'violation_percentage': ((actual_value - budget_value) / budget_value) * 100
                                })
            
            # Generate recommendations
            if budget_results['budget_violations']:
                budget_results['recommendations'].extend([
                    "Optimize bundle size by removing unused dependencies",
                    "Implement code splitting to reduce initial bundle size",
                    "Optimize images and use modern formats (WebP, AVIF)",
                    "Enable compression (gzip/brotli) on the server",
                    "Lazy load non-critical components",
                    "Use a CDN for static assets"
                ])
            
            logger.info(f"✓ Performance budget check completed: {len(budget_results['budget_violations'])} violations found")
            return budget_results
            
        except Exception as e:
            logger.error(f"Performance budget check failed: {e}")
            self.errors.append(f"Performance budget check failed: {e}")
            return {}
    
    def run_comprehensive_profiling(self) -> bool:
        """Run comprehensive frontend profiling."""
        logger.info("Starting comprehensive frontend performance profiling...")
        
        # Check dependencies first
        if not self.check_dependencies():
            return False
        
        # Start development server
        server_process = self.start_development_server()
        
        try:
            profiling_functions = [
                ("Lighthouse Audit", self.run_lighthouse_audit),
                ("Bundle Analysis", self.analyze_bundle_size),
                ("Dependency Analysis", self.analyze_dependencies),
                ("Performance Budget Check", self.run_performance_budget_check)
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
            logger.info(f"Frontend profiling completed: {success_count}/{total_profiles} profiles successful ({success_rate:.1f}%)")
            
            return success_count >= (total_profiles * 0.75)  # 75% success rate required
            
        finally:
            # Clean up server process
            if server_process:
                try:
                    server_process.terminate()
                    server_process.wait(timeout=10)
                    logger.info("Development server stopped")
                except:
                    server_process.kill()
    
    def generate_profiling_report(self, success_count: int, total_profiles: int):
        """Generate comprehensive frontend profiling report."""
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
            
            # Generate recommendations
            self._add_performance_recommendations(report)
            
            # Save detailed report
            report_file = self.project_root / 'automation' / 'reports' / 'frontend_lighthouse_profile.json'
            with open(report_file, 'w') as f:
                json.dump(report, f, indent=2, default=str)
            
            # Generate human-readable report
            self.generate_human_readable_report(report)
            
            logger.info(f"Frontend profiling report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate profiling report: {e}")
    
    def _add_performance_recommendations(self, report: Dict[str, Any]):
        """Add performance recommendations based on profiling results."""
        recommendations = []
        
        # Bundle size recommendations
        bundle_data = self.profile_results.get('bundle_analysis', {})
        if bundle_data.get('total_size_mb', 0) > 2.0:
            recommendations.append("Bundle size exceeds 2MB - consider code splitting and lazy loading")
        
        # Lighthouse recommendations
        lighthouse_data = self.profile_results.get('lighthouse_audit', {})
        for page_name, page_data in lighthouse_data.items():
            if 'error' not in page_data:
                scores = page_data.get('scores', {})
                perf_score = scores.get('performance', {}).get('score', 1)
                
                if perf_score < 0.8:
                    recommendations.append(f"Improve {page_name} performance score ({int(perf_score * 100)}%)")
                
                # Specific opportunities
                opportunities = page_data.get('opportunities', [])
                for opp in opportunities[:3]:  # Top 3 opportunities
                    if opp.get('wastedMs', 0) > 500:  # Significant impact
                        recommendations.append(f"Optimize {opp['title']} on {page_name}")
        
        # Dependency recommendations
        dependency_data = self.profile_results.get('dependency_analysis', {})
        outdated_count = dependency_data.get('outdated_packages', 0)
        if isinstance(outdated_count, int) and outdated_count > 10:
            recommendations.append(f"Update {outdated_count} outdated packages")
        
        # Budget violations
        budget_data = self.profile_results.get('performance_budget_check', {})
        violations = budget_data.get('budget_violations', [])
        if violations:
            recommendations.append(f"Address {len(violations)} performance budget violations")
        
        report['recommendations'] = recommendations
    
    def generate_human_readable_report(self, report_data: Dict):
        """Generate human-readable frontend profiling report."""
        try:
            report_file = self.project_root / 'automation' / 'reports' / 'frontend_lighthouse_report.md'
            
            with open(report_file, 'w') as f:
                f.write("# Frontend Performance Profiling Report\n\n")
                f.write(f"**Generated:** {report_data['timestamp']}\n\n")
                
                # Summary
                summary = report_data['summary']
                f.write("## Summary\n\n")
                f.write(f"- **Total Profiles:** {summary['total_profiles']}\n")
                f.write(f"- **Successful:** {summary['successful_profiles']}\n")
                f.write(f"- **Failed:** {summary['failed_profiles']}\n")
                f.write(f"- **Success Rate:** {summary['success_rate']:.1f}%\n\n")
                
                # Lighthouse scores
                lighthouse_data = self.profile_results.get('lighthouse_audit', {})
                if lighthouse_data:
                    f.write("## Lighthouse Scores\n\n")
                    f.write("| Page | Performance | Accessibility | Best Practices | SEO |\n")
                    f.write("|------|-------------|---------------|----------------|-----|\n")
                    
                    for page_name, page_data in lighthouse_data.items():
                        if 'error' not in page_data:
                            scores = page_data.get('scores', {})
                            perf = int(scores.get('performance', {}).get('score', 0) * 100)
                            a11y = int(scores.get('accessibility', {}).get('score', 0) * 100)
                            bp = int(scores.get('best-practices', {}).get('score', 0) * 100)
                            seo = int(scores.get('seo', {}).get('score', 0) * 100)
                            f.write(f"| {page_name} | {perf}% | {a11y}% | {bp}% | {seo}% |\n")
                    f.write("\n")
                
                # Bundle analysis
                bundle_data = self.profile_results.get('bundle_analysis', {})
                if bundle_data and 'total_size_mb' in bundle_data:
                    f.write("## Bundle Analysis\n\n")
                    f.write(f"- **Total Bundle Size:** {bundle_data['total_size_mb']:.2f} MB\n")
                    
                    large_files = bundle_data.get('large_files', [])
                    if large_files:
                        f.write("- **Largest Files:**\n")
                        for file_info in large_files[:5]:
                            f.write(f"  - {file_info['file']}: {file_info['size_kb']:.1f} KB\n")
                    f.write("\n")
                
                # Performance budget violations
                budget_data = self.profile_results.get('performance_budget_check', {})
                violations = budget_data.get('budget_violations', [])
                if violations:
                    f.write("## Performance Budget Violations\n\n")
                    for violation in violations:
                        f.write(f"- **{violation['metric']}** (")
                        if 'page' in violation:
                            f.write(f"{violation['page']}")
                        f.write(f"): {violation['actual']} exceeds budget of {violation['budget']}\n")
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
    profiler = FrontendLighthouseProfiler()
    success = profiler.run_comprehensive_profiling()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
