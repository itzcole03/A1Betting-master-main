#!/usr/bin/env python3
"""
Security Scanner for A1Betting Automation System
Performs comprehensive security vulnerability scanning.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class SecurityScanner:
    """Comprehensive security vulnerability scanner."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'scans': {},
            'summary': {
                'total_vulnerabilities': 0,
                'critical': 0,
                'high': 0,
                'medium': 0,
                'low': 0,
                'overall_status': 'unknown'
            },
            'recommendations': []
        }
        self.project_root = Path.cwd()
    
    def run_bandit_scan(self) -> Dict[str, Any]:
        """Run Bandit security scanner on Python code."""
        try:
            logger.info("Running Bandit security scan...")
            
            backend_path = self.project_root / "backend"
            if not backend_path.exists():
                return {
                    'status': 'skipped',
                    'message': 'Backend directory not found'
                }
            
            # Run Bandit
            cmd = [
                'bandit', '-r', str(backend_path),
                '-f', 'json',
                '-ll'  # Only report low and above
            ]
            
            result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
            
            if result.returncode in [0, 1]:  # 0 = no issues, 1 = issues found
                try:
                    bandit_output = json.loads(result.stdout)
                    
                    vulnerabilities = bandit_output.get('results', [])
                    severity_counts = {
                        'HIGH': len([v for v in vulnerabilities if v.get('issue_severity') == 'HIGH']),
                        'MEDIUM': len([v for v in vulnerabilities if v.get('issue_severity') == 'MEDIUM']),
                        'LOW': len([v for v in vulnerabilities if v.get('issue_severity') == 'LOW'])
                    }
                    
                    return {
                        'status': 'completed',
                        'vulnerabilities_found': len(vulnerabilities),
                        'severity_breakdown': severity_counts,
                        'issues': vulnerabilities[:10],  # First 10 issues
                        'metrics': bandit_output.get('metrics', {}),
                        'raw_output': result.stdout
                    }
                except json.JSONDecodeError:
                    return {
                        'status': 'error',
                        'error': 'Failed to parse Bandit output',
                        'raw_output': result.stdout
                    }
            else:
                return {
                    'status': 'error',
                    'error': f"Bandit failed with code {result.returncode}",
                    'stderr': result.stderr
                }
                
        except subprocess.TimeoutExpired:
            return {
                'status': 'timeout',
                'error': 'Bandit scan timed out after 5 minutes'
            }
        except FileNotFoundError:
            return {
                'status': 'not_installed',
                'error': 'Bandit is not installed. Install with: pip install bandit'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_safety_scan(self) -> Dict[str, Any]:
        """Run Safety scanner for Python dependencies."""
        try:
            logger.info("Running Safety dependency scan...")
            
            # Check for requirements files
            req_files = [
                'requirements.txt',
                'backend/requirements.txt',
                'automation/requirements.txt'
            ]
            
            found_req_files = [f for f in req_files if (self.project_root / f).exists()]
            
            if not found_req_files:
                return {
                    'status': 'skipped',
                    'message': 'No requirements.txt files found'
                }
            
            all_vulnerabilities = []
            
            for req_file in found_req_files:
                try:
                    cmd = ['safety', 'check', '-r', str(self.project_root / req_file), '--json']
                    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
                    
                    if result.returncode == 0:
                        # No vulnerabilities found
                        continue
                    elif result.returncode == 64:
                        # Vulnerabilities found
                        try:
                            safety_output = json.loads(result.stdout)
                            all_vulnerabilities.extend(safety_output)
                        except json.JSONDecodeError:
                            logger.warning(f"Failed to parse Safety output for {req_file}")
                    else:
                        logger.warning(f"Safety scan failed for {req_file}: {result.stderr}")
                        
                except subprocess.TimeoutExpired:
                    logger.warning(f"Safety scan timed out for {req_file}")
            
            return {
                'status': 'completed',
                'vulnerabilities_found': len(all_vulnerabilities),
                'vulnerabilities': all_vulnerabilities,
                'files_scanned': found_req_files
            }
            
        except FileNotFoundError:
            return {
                'status': 'not_installed',
                'error': 'Safety is not installed. Install with: pip install safety'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_npm_audit(self) -> Dict[str, Any]:
        """Run npm audit for JavaScript dependencies."""
        try:
            logger.info("Running npm audit...")
            
            frontend_path = self.project_root / "frontend"
            if not frontend_path.exists() or not (frontend_path / "package.json").exists():
                return {
                    'status': 'skipped',
                    'message': 'Frontend directory or package.json not found'
                }
            
            # Run npm audit
            cmd = ['npm', 'audit', '--json']
            result = subprocess.run(
                cmd, 
                capture_output=True, 
                text=True, 
                cwd=frontend_path, 
                timeout=180
            )
            
            try:
                audit_output = json.loads(result.stdout)
                
                vulnerabilities = audit_output.get('vulnerabilities', {})
                metadata = audit_output.get('metadata', {})
                
                severity_counts = {
                    'critical': 0,
                    'high': 0,
                    'moderate': 0,
                    'low': 0,
                    'info': 0
                }
                
                # Count vulnerabilities by severity
                for vuln_name, vuln_data in vulnerabilities.items():
                    severity = vuln_data.get('severity', 'unknown')
                    if severity in severity_counts:
                        severity_counts[severity] += 1
                
                total_vulns = sum(severity_counts.values())
                
                return {
                    'status': 'completed',
                    'vulnerabilities_found': total_vulns,
                    'severity_breakdown': severity_counts,
                    'metadata': metadata,
                    'sample_vulnerabilities': list(vulnerabilities.items())[:5],  # First 5
                    'raw_output': result.stdout
                }
                
            except json.JSONDecodeError:
                return {
                    'status': 'error',
                    'error': 'Failed to parse npm audit output',
                    'raw_output': result.stdout
                }
                
        except subprocess.TimeoutExpired:
            return {
                'status': 'timeout',
                'error': 'npm audit timed out after 3 minutes'
            }
        except FileNotFoundError:
            return {
                'status': 'not_installed',
                'error': 'npm is not installed or not in PATH'
            }
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def scan_file_permissions(self) -> Dict[str, Any]:
        """Scan for potentially insecure file permissions."""
        try:
            logger.info("Scanning file permissions...")
            
            issues = []
            
            # Check for overly permissive files
            sensitive_files = [
                '.env',
                '.env.local',
                '.env.production',
                'config.yaml',
                'automation/config.yaml',
                'backend/config.py',
                'backend/.env'
            ]
            
            for file_path in sensitive_files:
                full_path = self.project_root / file_path
                if full_path.exists():
                    try:
                        stat_info = full_path.stat()
                        # Check if file is readable by others (Unix-like systems)
                        if hasattr(stat_info, 'st_mode'):
                            mode = stat_info.st_mode
                            if mode & 0o044:  # Others can read
                                issues.append({
                                    'file': str(file_path),
                                    'issue': 'File readable by others',
                                    'severity': 'medium'
                                })
                    except Exception as e:
                        logger.warning(f"Could not check permissions for {file_path}: {e}")
            
            # Check for git files in web directories
            web_git_files = [
                'frontend/.git',
                'backend/.git',
                '.git'
            ]
            
            for git_path in web_git_files:
                if (self.project_root / git_path).exists():
                    issues.append({
                        'file': str(git_path),
                        'issue': 'Git repository in web-accessible location',
                        'severity': 'low'
                    })
            
            return {
                'status': 'completed',
                'issues_found': len(issues),
                'issues': issues
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def scan_environment_variables(self) -> Dict[str, Any]:
        """Scan for potentially exposed environment variables."""
        try:
            logger.info("Scanning environment variables...")
            
            issues = []
            warnings = []
            
            # Check for common dangerous environment variables
            dangerous_env_vars = [
                'AWS_SECRET_ACCESS_KEY',
                'DATABASE_PASSWORD',
                'MONGODB_PASSWORD',
                'JWT_SECRET',
                'API_KEY',
                'PRIVATE_KEY'
            ]
            
            for var in dangerous_env_vars:
                if var in os.environ:
                    warnings.append({
                        'variable': var,
                        'issue': 'Sensitive variable found in environment',
                        'severity': 'info'
                    })
            
            # Check .env files for hardcoded secrets
            env_files = ['.env', 'backend/.env', 'frontend/.env']
            
            for env_file in env_files:
                env_path = self.project_root / env_file
                if env_path.exists():
                    try:
                        with open(env_path, 'r') as f:
                            content = f.read()
                            
                        # Check for hardcoded values that look like secrets
                        lines = content.split('\n')
                        for i, line in enumerate(lines, 1):
                            if '=' in line and not line.strip().startswith('#'):
                                key, value = line.split('=', 1)
                                value = value.strip()
                                
                                # Check for potentially hardcoded secrets
                                if (len(value) > 20 and 
                                    any(keyword in key.upper() for keyword in ['SECRET', 'KEY', 'PASSWORD', 'TOKEN'])):
                                    issues.append({
                                        'file': str(env_file),
                                        'line': i,
                                        'variable': key.strip(),
                                        'issue': 'Potential hardcoded secret',
                                        'severity': 'medium'
                                    })
                                    
                    except Exception as e:
                        logger.warning(f"Could not read {env_file}: {e}")
            
            return {
                'status': 'completed',
                'issues_found': len(issues),
                'warnings_found': len(warnings),
                'issues': issues,
                'warnings': warnings
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_all_scans(self) -> Dict[str, Any]:
        """Run all security scans."""
        logger.info("Starting comprehensive security scan...")
        
        # Run all scans
        self.results['scans']['bandit'] = self.run_bandit_scan()
        self.results['scans']['safety'] = self.run_safety_scan()
        self.results['scans']['npm_audit'] = self.run_npm_audit()
        self.results['scans']['file_permissions'] = self.scan_file_permissions()
        self.results['scans']['environment_vars'] = self.scan_environment_variables()
        
        # Calculate summary
        self.calculate_summary()
        
        return self.results
    
    def calculate_summary(self):
        """Calculate summary statistics and recommendations."""
        total_vulns = 0
        critical = 0
        high = 0
        medium = 0
        low = 0
        
        # Count vulnerabilities from all scans
        for scan_name, scan_results in self.results['scans'].items():
            if scan_results.get('status') != 'completed':
                continue
                
            if scan_name == 'bandit':
                breakdown = scan_results.get('severity_breakdown', {})
                high += breakdown.get('HIGH', 0)
                medium += breakdown.get('MEDIUM', 0)
                low += breakdown.get('LOW', 0)
                
            elif scan_name == 'npm_audit':
                breakdown = scan_results.get('severity_breakdown', {})
                critical += breakdown.get('critical', 0)
                high += breakdown.get('high', 0)
                medium += breakdown.get('moderate', 0)
                low += breakdown.get('low', 0)
                
            elif scan_name == 'safety':
                # Safety vulnerabilities are generally considered medium
                vulns = scan_results.get('vulnerabilities_found', 0)
                medium += vulns
                
            elif scan_name in ['file_permissions', 'environment_vars']:
                issues = scan_results.get('issues', [])
                for issue in issues:
                    severity = issue.get('severity', 'low')
                    if severity == 'critical':
                        critical += 1
                    elif severity == 'high':
                        high += 1
                    elif severity == 'medium':
                        medium += 1
                    else:
                        low += 1
        
        total_vulns = critical + high + medium + low
        
        self.results['summary'] = {
            'total_vulnerabilities': total_vulns,
            'critical': critical,
            'high': high,
            'medium': medium,
            'low': low,
            'overall_status': self.determine_overall_status(critical, high, medium, low)
        }
        
        # Generate recommendations
        self.generate_recommendations()
    
    def determine_overall_status(self, critical: int, high: int, medium: int, low: int) -> str:
        """Determine overall security status."""
        if critical > 0:
            return 'critical'
        elif high > 0:
            return 'high_risk'
        elif medium > 3:
            return 'medium_risk'
        elif medium > 0 or low > 5:
            return 'low_risk'
        else:
            return 'secure'
    
    def generate_recommendations(self):
        """Generate security recommendations."""
        recommendations = []
        
        summary = self.results['summary']
        
        if summary['critical'] > 0:
            recommendations.append("URGENT: Address critical vulnerabilities immediately")
        
        if summary['high'] > 0:
            recommendations.append("High priority: Fix high-severity vulnerabilities")
        
        # Scan-specific recommendations
        for scan_name, scan_results in self.results['scans'].items():
            if scan_results.get('status') == 'not_installed':
                recommendations.append(f"Install {scan_name} security scanner for better coverage")
            elif scan_results.get('status') == 'error':
                recommendations.append(f"Fix {scan_name} scan configuration")
        
        # General recommendations
        if summary['total_vulnerabilities'] > 10:
            recommendations.append("Consider implementing automated security scanning in CI/CD")
        
        if self.results['scans']['environment_vars'].get('issues_found', 0) > 0:
            recommendations.append("Review and secure environment variable configurations")
        
        if self.results['scans']['file_permissions'].get('issues_found', 0) > 0:
            recommendations.append("Review and fix file permission issues")
        
        self.results['recommendations'] = recommendations
    
    def generate_report(self) -> str:
        """Generate a human-readable security report."""
        summary = self.results['summary']
        
        status_emoji = {
            'secure': '🟢',
            'low_risk': '🟡',
            'medium_risk': '🟠',
            'high_risk': '🔴',
            'critical': '🚨'
        }
        
        report = f"""
🔒 SECURITY VULNERABILITY REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Overall Status: {status_emoji.get(summary['overall_status'], '❓')} {summary['overall_status'].upper().replace('_', ' ')}

📊 VULNERABILITY SUMMARY:
   Total Vulnerabilities: {summary['total_vulnerabilities']}
   🚨 Critical: {summary['critical']}
   🔴 High: {summary['high']}
   🟠 Medium: {summary['medium']}
   🟡 Low: {summary['low']}

🔍 SCAN RESULTS:
"""
        
        for scan_name, scan_results in self.results['scans'].items():
            status = scan_results.get('status', 'unknown')
            status_emoji_map = {
                'completed': '✅',
                'skipped': '⏭️',
                'error': '❌',
                'timeout': '⏰',
                'not_installed': '❓'
            }
            
            emoji = status_emoji_map.get(status, '❓')
            report += f"   {emoji} {scan_name.replace('_', ' ').title()}: {status}\n"
            
            if status == 'completed' and 'vulnerabilities_found' in scan_results:
                vulns = scan_results['vulnerabilities_found']
                report += f"      Found {vulns} issue{'s' if vulns != 1 else ''}\n"
        
        if self.results['recommendations']:
            report += f"\n💡 RECOMMENDATIONS:\n"
            for rec in self.results['recommendations']:
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        scanner = SecurityScanner()
        results = scanner.run_all_scans()
        
        # Generate and display report
        report = scanner.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/security_scan.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on security status
        status = results['summary']['overall_status']
        if status == 'secure':
            logger.info("Security scan completed - No significant issues found")
            sys.exit(0)
        elif status in ['low_risk', 'medium_risk']:
            logger.warning("Security scan completed - Issues found, review recommended")
            sys.exit(1)
        else:
            logger.error("Security scan completed - Critical issues found!")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Security scan failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
