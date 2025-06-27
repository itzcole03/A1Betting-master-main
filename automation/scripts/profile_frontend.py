#!/usr/bin/env python3
"""
Frontend Performance Profiler for A1Betting Automation System
Comprehensive performance analysis for React/JavaScript frontend.
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

import requests

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class FrontendProfiler:
    """Comprehensive frontend performance profiler."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'profiling_results': {},
            'performance_metrics': {},
            'optimization_opportunities': [],
            'recommendations': [],
            'summary': {}
        }
        self.project_root = Path.cwd()
        self.frontend_path = self.project_root / "frontend"
    
    def check_frontend_availability(self) -> bool:
        """Check if frontend directory and package.json exist."""
        if not self.frontend_path.exists():
            logger.error("Frontend directory not found")
            return False
        
        package_json = self.frontend_path / "package.json"
        if not package_json.exists():
            logger.error("package.json not found in frontend directory")
            return False
        
        return True
    
    def analyze_bundle_size(self) -> Dict[str, Any]:
        """Analyze bundle size and identify optimization opportunities."""
        try:
            logger.info("Analyzing bundle size...")
            
            # Check if build directory exists
            build_dir = self.frontend_path / "build"
            dist_dir = self.frontend_path / "dist"
            
            target_dir = None
            if build_dir.exists():
                target_dir = build_dir
            elif dist_dir.exists():
                target_dir = dist_dir
            else:
                # Try to build the project
                logger.info("No build directory found, attempting to build...")
                build_result = self.build_frontend()
                if not build_result.get('success'):
                    return {
                        'status': 'failed',
                        'error': 'No build directory found and build failed',
                        'build_error': build_result.get('error')
                    }
                
                # Check again after build
                if build_dir.exists():
                    target_dir = build_dir
                elif dist_dir.exists():
                    target_dir = dist_dir
                else:
                    return {
                        'status': 'failed',
                        'error': 'Build completed but no build/dist directory found'
                    }
            
            # Analyze bundle files
            bundle_analysis = self.analyze_build_directory(target_dir)
            
            return {
                'status': 'completed',
                'build_directory': str(target_dir),
                'analysis': bundle_analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def build_frontend(self) -> Dict[str, Any]:
        """Build the frontend project."""
        try:
            logger.info("Building frontend project...")
            
            # Check package.json for build script
            with open(self.frontend_path / "package.json", 'r') as f:
                package_data = json.load(f)
            
            scripts = package_data.get('scripts', {})
            build_command = None
            
            if 'build' in scripts:
                build_command = ['npm', 'run', 'build']
            elif 'build:prod' in scripts:
                build_command = ['npm', 'run', 'build:prod']
            else:
                return {
                    'success': False,
                    'error': 'No build script found in package.json'
                }
            
            # Run build command
            result = subprocess.run(
                build_command,
                cwd=self.frontend_path,
                capture_output=True,
                text=True,
                timeout=300  # 5 minutes timeout
            )
            
            if result.returncode == 0:
                return {
                    'success': True,
                    'output': result.stdout
                }
            else:
                return {
                    'success': False,
                    'error': result.stderr or result.stdout
                }
                
        except subprocess.TimeoutExpired:
            return {
                'success': False,
                'error': 'Build timed out after 5 minutes'
            }
        except Exception as e:
            return {
                'success': False,
                'error': str(e)
            }
    
    def analyze_build_directory(self, build_dir: Path) -> Dict[str, Any]:
        """Analyze the build directory for bundle size and composition."""
        analysis = {
            'total_size_mb': 0,
            'file_count': 0,
            'largest_files': [],
            'file_types': {},
            'js_bundles': [],
            'css_files': [],
            'asset_files': []
        }
        
        try:
            all_files = list(build_dir.rglob('*'))
            file_list = [f for f in all_files if f.is_file()]
            
            analysis['file_count'] = len(file_list)
            
            file_sizes = []
            
            for file_path in file_list:
                try:
                    size = file_path.stat().st_size
                    size_mb = size / (1024 * 1024)
                    analysis['total_size_mb'] += size_mb
                    
                    file_info = {
                        'name': file_path.name,
                        'path': str(file_path.relative_to(build_dir)),
                        'size_mb': round(size_mb, 2),
                        'size_bytes': size
                    }
                    
                    file_sizes.append(file_info)
                    
                    # Categorize files
                    ext = file_path.suffix.lower()
                    analysis['file_types'][ext] = analysis['file_types'].get(ext, 0) + 1
                    
                    # Categorize by type
                    if ext == '.js':
                        analysis['js_bundles'].append(file_info)
                    elif ext == '.css':
                        analysis['css_files'].append(file_info)
                    elif ext in ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf']:
                        analysis['asset_files'].append(file_info)
                        
                except Exception as e:
                    logger.warning(f"Error analyzing file {file_path}: {e}")
            
            # Sort and get largest files
            file_sizes.sort(key=lambda x: x['size_bytes'], reverse=True)
            analysis['largest_files'] = file_sizes[:10]
            
            # Sort bundles by size
            analysis['js_bundles'].sort(key=lambda x: x['size_bytes'], reverse=True)
            analysis['css_files'].sort(key=lambda x: x['size_bytes'], reverse=True)
            analysis['asset_files'].sort(key=lambda x: x['size_bytes'], reverse=True)
            
            analysis['total_size_mb'] = round(analysis['total_size_mb'], 2)
            
        except Exception as e:
            logger.error(f"Error analyzing build directory: {e}")
            analysis['error'] = str(e)
        
        return analysis
    
    def analyze_dependencies(self) -> Dict[str, Any]:
        """Analyze package.json dependencies for potential optimizations."""
        try:
            logger.info("Analyzing dependencies...")
            
            with open(self.frontend_path / "package.json", 'r') as f:
                package_data = json.load(f)
            
            dependencies = package_data.get('dependencies', {})
            dev_dependencies = package_data.get('devDependencies', {})
            
            analysis = {
                'total_dependencies': len(dependencies),
                'dev_dependencies': len(dev_dependencies),
                'heavy_dependencies': [],
                'outdated_potential': [],
                'optimization_suggestions': []
            }
            
            # Known heavy dependencies
            heavy_libs = {
                'moment': 'Consider using date-fns or dayjs for smaller bundle size',
                'lodash': 'Consider using lodash-es or cherry-pick specific functions',
                'axios': 'Consider using fetch API for smaller bundle size',
                'bootstrap': 'Consider using only needed components',
                'semantic-ui-react': 'Consider lighter UI library alternatives',
                'antd': 'Use tree-shaking to import only needed components',
                'material-ui': 'Use tree-shaking to import only needed components'
            }
            
            for dep, version in dependencies.items():
                if dep in heavy_libs:
                    analysis['heavy_dependencies'].append({
                        'name': dep,
                        'version': version,
                        'suggestion': heavy_libs[dep]
                    })
            
            # Check for common optimization opportunities
            if 'moment' in dependencies:
                analysis['optimization_suggestions'].append("Replace moment.js with date-fns or dayjs")
            
            if 'lodash' in dependencies and 'lodash-es' not in dependencies:
                analysis['optimization_suggestions'].append("Use lodash-es for better tree-shaking")
            
            if len(dependencies) > 50:
                analysis['optimization_suggestions'].append("Consider dependency audit - many dependencies detected")
            
            return {
                'status': 'completed',
                'analysis': analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_lighthouse_audit(self) -> Dict[str, Any]:
        """Run Lighthouse audit if the application is running."""
        try:
            logger.info("Attempting Lighthouse audit...")
            
            # Check if frontend is running
            frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
            
            try:
                response = requests.get(frontend_url, timeout=5)
                if response.status_code != 200:
                    return {
                        'status': 'skipped',
                        'reason': f'Frontend not accessible at {frontend_url}'
                    }
            except requests.RequestException:
                return {
                    'status': 'skipped',
                    'reason': f'Frontend not running at {frontend_url}'
                }
            
            # Run Lighthouse
            lighthouse_cmd = [
                'npx', 'lighthouse', frontend_url,
                '--output=json',
                '--output-path=/tmp/lighthouse-report.json',
                '--chrome-flags=--headless',
                '--quiet'
            ]
            
            result = subprocess.run(
                lighthouse_cmd,
                capture_output=True,
                text=True,
                timeout=120  # 2 minutes timeout
            )
            
            if result.returncode == 0:
                # Read the Lighthouse report
                try:
                    with open('/tmp/lighthouse-report.json', 'r') as f:
                        lighthouse_data = json.load(f)
                    
                    # Extract key metrics
                    categories = lighthouse_data.get('categories', {})
                    audits = lighthouse_data.get('audits', {})
                    
                    metrics = {
                        'performance_score': categories.get('performance', {}).get('score', 0) * 100,
                        'accessibility_score': categories.get('accessibility', {}).get('score', 0) * 100,
                        'best_practices_score': categories.get('best-practices', {}).get('score', 0) * 100,
                        'seo_score': categories.get('seo', {}).get('score', 0) * 100,
                        'first_contentful_paint': audits.get('first-contentful-paint', {}).get('numericValue'),
                        'largest_contentful_paint': audits.get('largest-contentful-paint', {}).get('numericValue'),
                        'cumulative_layout_shift': audits.get('cumulative-layout-shift', {}).get('numericValue'),
                        'total_blocking_time': audits.get('total-blocking-time', {}).get('numericValue')
                    }
                    
                    return {
                        'status': 'completed',
                        'url': frontend_url,
                        'metrics': metrics,
                        'report_file': '/tmp/lighthouse-report.json'
                    }
                    
                except Exception as e:
                    return {
                        'status': 'error',
                        'error': f'Failed to parse Lighthouse report: {e}'
                    }
            else:
                return {
                    'status': 'failed',
                    'error': result.stderr or result.stdout
                }
                
        except subprocess.TimeoutExpired:
            return {
                'status': 'timeout',
                'error': 'Lighthouse audit timed out'
            }
        except FileNotFoundError:
            return {
                'status': 'not_installed',
                'error': 'Lighthouse is not installed. Install with: npm install -g lighthouse'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def analyze_source_code(self) -> Dict[str, Any]:
        """Analyze frontend source code for performance issues."""
        try:
            logger.info("Analyzing source code...")
            
            analysis = {
                'files_analyzed': 0,
                'total_lines': 0,
                'large_files': [],
                'potential_issues': [],
                'component_analysis': {}
            }
            
            # Analyze JavaScript/TypeScript files
            js_files = list(self.frontend_path.glob('**/*.js'))
            js_files.extend(list(self.frontend_path.glob('**/*.jsx')))
            js_files.extend(list(self.frontend_path.glob('**/*.ts')))
            js_files.extend(list(self.frontend_path.glob('**/*.tsx')))
            
            # Filter out node_modules
            js_files = [f for f in js_files if 'node_modules' not in str(f)]
            
            for js_file in js_files:
                try:
                    with open(js_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                        lines = content.split('\n')
                
                except Exception as e:
                    # Try different encodings for problematic files
                    try:
                        with open(js_file, 'r', encoding='utf-8-sig') as f:
                            content = f.read()
                            lines = content.split('\n')
                    except Exception:
                        try:
                            with open(js_file, 'r', encoding='latin-1') as f:
                                content = f.read()
                                lines = content.split('\n')
                        except Exception:
                            logger.warning(f"Error analyzing {js_file}: {e} - Skipping file")
                            continue
                
                analysis['files_analyzed'] += 1
                analysis['total_lines'] += len(lines)
                
                # Check for large files
                if len(lines) > 300:
                    analysis['large_files'].append({
                        'file': str(js_file.relative_to(self.frontend_path)),
                        'lines': len(lines)
                    })
                
                # Check for potential performance issues
                file_issues = []
                
                # Check for inefficient patterns
                if 'console.log' in content:
                    file_issues.append('Contains console.log statements')
                
                if '.map(' in content and '.filter(' in content:
                    # Count chained operations
                    chained_ops = content.count('.map(') + content.count('.filter(') + content.count('.reduce(')
                    if chained_ops > 10:
                        file_issues.append(f'Many array operations ({chained_ops}) - consider optimization')
                
                if 'useEffect' in content:
                    # Count useEffect hooks
                    useeffect_count = content.count('useEffect')
                    if useeffect_count > 5:
                        file_issues.append(f'Many useEffect hooks ({useeffect_count}) - consider consolidation')
                
                if 'useState' in content:
                    # Count useState hooks
                    usestate_count = content.count('useState')
                    if usestate_count > 10:
                        file_issues.append(f'Many useState hooks ({usestate_count}) - consider useReducer')
                
                if file_issues:
                    analysis['potential_issues'].append({
                        'file': str(js_file.relative_to(self.frontend_path)),
                        'issues': file_issues
                    })
                
                # Component analysis for React files
                if js_file.suffix in ['.jsx', '.tsx']:
                    component_name = js_file.stem
                    analysis['component_analysis'][component_name] = {
                        'lines': len(lines),
                        'hooks_count': content.count('use') - content.count('user'),  # Approximate
                        'has_memo': 'React.memo' in content or 'memo(' in content,
                        'has_callback': 'useCallback' in content,
                        'has_memo_hook': 'useMemo' in content
                    }
            
            # Sort results
            analysis['large_files'].sort(key=lambda x: x['lines'], reverse=True)
            
            return {
                'status': 'completed',
                'analysis': analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_comprehensive_profiling(self) -> Dict[str, Any]:
        """Run all frontend profiling analyses."""
        logger.info("Starting comprehensive frontend profiling...")
        
        if not self.check_frontend_availability():
            return {
                'error': 'Frontend not available for profiling'
            }
        
        # Run all profiling methods
        self.results['profiling_results']['bundle_size'] = self.analyze_bundle_size()
        self.results['profiling_results']['dependencies'] = self.analyze_dependencies()
        self.results['profiling_results']['lighthouse'] = self.run_lighthouse_audit()
        self.results['profiling_results']['source_code'] = self.analyze_source_code()
        
        # Analyze results and generate recommendations
        self.analyze_results()
        
        return self.results
    
    def analyze_results(self):
        """Analyze profiling results and generate recommendations."""
        optimization_opportunities = []
        recommendations = []
        
        # Analyze bundle size
        bundle = self.results['profiling_results'].get('bundle_size', {})
        if bundle.get('status') == 'completed':
            analysis = bundle.get('analysis', {})
            total_size = analysis.get('total_size_mb', 0)
            
            if total_size > 5:
                optimization_opportunities.append({
                    'type': 'large_bundle',
                    'severity': 'high',
                    'description': f"Large bundle size: {total_size:.1f}MB"
                })
                recommendations.append("Implement code splitting and lazy loading to reduce bundle size")
            elif total_size > 2:
                optimization_opportunities.append({
                    'type': 'moderate_bundle',
                    'severity': 'medium',
                    'description': f"Moderate bundle size: {total_size:.1f}MB"
                })
        
        # Analyze dependencies
        deps = self.results['profiling_results'].get('dependencies', {})
        if deps.get('status') == 'completed':
            analysis = deps.get('analysis', {})
            heavy_deps = analysis.get('heavy_dependencies', [])
            
            if heavy_deps:
                optimization_opportunities.append({
                    'type': 'heavy_dependencies',
                    'severity': 'medium',
                    'description': f"{len(heavy_deps)} heavy dependencies found"
                })
                recommendations.extend([dep['suggestion'] for dep in heavy_deps[:3]])
        
        # Analyze Lighthouse results
        lighthouse = self.results['profiling_results'].get('lighthouse', {})
        if lighthouse.get('status') == 'completed':
            metrics = lighthouse.get('metrics', {})
            perf_score = metrics.get('performance_score', 0)
            
            if perf_score < 50:
                optimization_opportunities.append({
                    'type': 'poor_lighthouse',
                    'severity': 'high',
                    'description': f"Poor Lighthouse performance score: {perf_score:.0f}/100"
                })
                recommendations.append("Address Lighthouse performance recommendations")
            elif perf_score < 80:
                optimization_opportunities.append({
                    'type': 'moderate_lighthouse',
                    'severity': 'medium',
                    'description': f"Moderate Lighthouse performance score: {perf_score:.0f}/100"
                })
        
        # Analyze source code
        source = self.results['profiling_results'].get('source_code', {})
        if source.get('status') == 'completed':
            analysis = source.get('analysis', {})
            large_files = analysis.get('large_files', [])
            issues = analysis.get('potential_issues', [])
            
            if len(large_files) > 0:
                optimization_opportunities.append({
                    'type': 'large_components',
                    'severity': 'medium',
                    'description': f"{len(large_files)} large files/components found"
                })
                recommendations.append("Break down large components into smaller, reusable pieces")
            
            if len(issues) > 0:
                optimization_opportunities.append({
                    'type': 'code_issues',
                    'severity': 'low',
                    'description': f"Code optimization opportunities found in {len(issues)} files"
                })
                recommendations.append("Review and optimize identified code patterns")
        
        # Calculate performance score
        performance_score = 100
        
        for opportunity in optimization_opportunities:
            if opportunity['severity'] == 'high':
                performance_score -= 25
            elif opportunity['severity'] == 'medium':
                performance_score -= 15
            else:
                performance_score -= 5
        
        performance_score = max(0, performance_score)
        
        self.results['optimization_opportunities'] = optimization_opportunities
        self.results['recommendations'] = recommendations
        self.results['summary'] = {
            'performance_score': performance_score,
            'opportunities_found': len(optimization_opportunities),
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
⚡ FRONTEND PERFORMANCE PROFILING REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Performance Score: {summary.get('performance_score', 0)}/100
Overall Status: {status_emoji.get(summary.get('overall_status'), '❓')} {summary.get('overall_status', 'unknown').upper()}

📊 PROFILING RESULTS:
"""
        
        # Bundle size
        bundle = self.results['profiling_results'].get('bundle_size', {})
        if bundle.get('status') == 'completed':
            analysis = bundle.get('analysis', {})
            total_size = analysis.get('total_size_mb', 0)
            emoji = "🟢" if total_size < 2 else "🟡" if total_size < 5 else "🔴"
            report += f"   {emoji} Bundle Size: {total_size:.1f}MB\n"
        
        # Dependencies
        deps = self.results['profiling_results'].get('dependencies', {})
        if deps.get('status') == 'completed':
            analysis = deps.get('analysis', {})
            total_deps = analysis.get('total_dependencies', 0)
            heavy_deps = len(analysis.get('heavy_dependencies', []))
            emoji = "🟢" if heavy_deps == 0 else "🟡" if heavy_deps < 3 else "🔴"
            report += f"   {emoji} Dependencies: {total_deps} total, {heavy_deps} heavy\n"
        
        # Lighthouse
        lighthouse = self.results['profiling_results'].get('lighthouse', {})
        if lighthouse.get('status') == 'completed':
            metrics = lighthouse.get('metrics', {})
            perf_score = metrics.get('performance_score', 0)
            emoji = "🟢" if perf_score >= 90 else "🟡" if perf_score >= 70 else "🔴"
            report += f"   {emoji} Lighthouse Performance: {perf_score:.0f}/100\n"
        elif lighthouse.get('status') == 'skipped':
            report += f"   ⏭️ Lighthouse: {lighthouse.get('reason', 'Skipped')}\n"
        
        # Source code
        source = self.results['profiling_results'].get('source_code', {})
        if source.get('status') == 'completed':
            analysis = source.get('analysis', {})
            files_analyzed = analysis.get('files_analyzed', 0)
            total_lines = analysis.get('total_lines', 0)
            report += f"   📁 Source Analysis: {files_analyzed} files ({total_lines:,} lines)\n"
        
        # Optimization opportunities
        if self.results.get('optimization_opportunities'):
            report += f"\n🎯 OPTIMIZATION OPPORTUNITIES:\n"
            for opp in self.results['optimization_opportunities'][:5]:  # Top 5
                severity_emoji = {"high": "🔴", "medium": "🟡", "low": "🟢"}
                emoji = severity_emoji.get(opp['severity'], '❓')
                report += f"   {emoji} {opp['description']}\n"
        
        # Recommendations
        if self.results.get('recommendations'):
            report += f"\n💡 OPTIMIZATION RECOMMENDATIONS:\n"
            for rec in self.results['recommendations'][:5]:  # Top 5
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        profiler = FrontendProfiler()
        results = profiler.run_comprehensive_profiling()
        
        # Generate and display report
        report = profiler.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/frontend_performance.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on performance score
        score = results.get('summary', {}).get('performance_score', 0)
        if score >= 80:
            logger.info("Frontend profiling completed - Performance is good")
            sys.exit(0)
        elif score >= 50:
            logger.warning("Frontend profiling completed - Performance needs improvement")
            sys.exit(1)
        else:
            logger.error("Frontend profiling completed - Critical performance issues found")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Frontend profiling failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
