#!/usr/bin/env python3
"""
Penetration Testing Script for A1Betting Platform

This script performs automated penetration testing to identify
security vulnerabilities in the application and infrastructure.
"""

import os
import sys
import json
import time
import socket
import requests
import logging
import subprocess
from datetime import datetime
from pathlib import Path
import argparse
from typing import Dict, List, Any, Optional, Tuple
import warnings
warnings.filterwarnings('ignore')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class PenetrationTester:
    """Automated penetration testing system for security assessment."""
    
    def __init__(self, reports_dir: str = "automation/reports"):
        self.reports_dir = Path(reports_dir)
        self.reports_dir.mkdir(parents=True, exist_ok=True)
        self.test_results = {}
        self.target_urls = []
        self.session = requests.Session()
        self.session.timeout = 10
        
    def port_scan(self, target: str, ports: List[int] = None) -> Dict[str, Any]:
        """Perform basic port scanning."""
        if ports is None:
            # Common ports to scan
            ports = [21, 22, 23, 25, 53, 80, 110, 443, 993, 995, 3306, 5432, 6379, 27017]
        
        logger.info(f"Port scanning target: {target}")
        
        open_ports = []
        closed_ports = []
        filtered_ports = []
        
        try:
            # Resolve target if it's a hostname
            target_ip = socket.gethostbyname(target)
            
            for port in ports:
                try:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sock.settimeout(2)
                    result = sock.connect_ex((target_ip, port))
                    
                    if result == 0:
                        open_ports.append(port)
                        # Try to grab banner
                        try:
                            sock.send(b"HEAD / HTTP/1.0\\r\\n\\r\\n")
                            banner = sock.recv(1024).decode('utf-8', errors='ignore')
                        except:
                            banner = ""
                    else:
                        closed_ports.append(port)
                    
                    sock.close()
                    
                except Exception:
                    filtered_ports.append(port)
            
            return {
                "status": "success",
                "target": target,
                "target_ip": target_ip,
                "open_ports": open_ports,
                "closed_ports": closed_ports,
                "filtered_ports": filtered_ports,
                "total_ports_scanned": len(ports),
                "scan_summary": {
                    "open": len(open_ports),
                    "closed": len(closed_ports),
                    "filtered": len(filtered_ports)
                }
            }
            
        except Exception as e:
            logger.error(f"Error during port scan: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def web_vulnerability_scan(self, base_url: str) -> Dict[str, Any]:
        """Perform web application vulnerability scanning."""
        logger.info(f"Web vulnerability scanning: {base_url}")
        
        vulnerabilities = []
        test_results = {
            "status": "success",
            "base_url": base_url,
            "vulnerabilities": [],
            "tests_performed": [],
            "security_headers": {},
            "ssl_analysis": {}
        }
        
        try:
            # Test 1: Check for common security headers
            logger.info("Testing security headers...")
            headers_result = self._test_security_headers(base_url)
            test_results["security_headers"] = headers_result
            test_results["tests_performed"].append("security_headers")
            
            if headers_result.get("missing_headers"):
                vulnerabilities.append({
                    "type": "Missing Security Headers",
                    "severity": "medium",
                    "description": f"Missing headers: {', '.join(headers_result['missing_headers'])}",
                    "recommendation": "Implement proper security headers"
                })
            
            # Test 2: SQL Injection testing
            logger.info("Testing for SQL injection...")
            sqli_result = self._test_sql_injection(base_url)
            test_results["tests_performed"].append("sql_injection")
            
            if sqli_result.get("vulnerable"):
                vulnerabilities.append({
                    "type": "SQL Injection",
                    "severity": "high",
                    "description": "Potential SQL injection vulnerability detected",
                    "endpoint": sqli_result.get("endpoint", "unknown"),
                    "recommendation": "Use parameterized queries and input validation"
                })
            
            # Test 3: XSS testing
            logger.info("Testing for XSS...")
            xss_result = self._test_xss(base_url)
            test_results["tests_performed"].append("xss")
            
            if xss_result.get("vulnerable"):
                vulnerabilities.append({
                    "type": "Cross-Site Scripting (XSS)",
                    "severity": "high",
                    "description": "Potential XSS vulnerability detected",
                    "endpoint": xss_result.get("endpoint", "unknown"),
                    "recommendation": "Implement proper input sanitization and output encoding"
                })
            
            # Test 4: Directory traversal
            logger.info("Testing for directory traversal...")
            traversal_result = self._test_directory_traversal(base_url)
            test_results["tests_performed"].append("directory_traversal")
            
            if traversal_result.get("vulnerable"):
                vulnerabilities.append({
                    "type": "Directory Traversal",
                    "severity": "high",
                    "description": "Potential directory traversal vulnerability detected",
                    "recommendation": "Implement proper path validation and access controls"
                })
            
            # Test 5: Authentication bypass
            logger.info("Testing authentication mechanisms...")
            auth_result = self._test_authentication(base_url)
            test_results["tests_performed"].append("authentication")
            
            if auth_result.get("weak_authentication"):
                vulnerabilities.append({
                    "type": "Weak Authentication",
                    "severity": "medium",
                    "description": "Weak authentication mechanisms detected",
                    "recommendation": "Implement strong authentication and session management"
                })
            
            # Test 6: SSL/TLS analysis
            if base_url.startswith('https'):
                logger.info("Analyzing SSL/TLS configuration...")
                ssl_result = self._test_ssl_configuration(base_url)
                test_results["ssl_analysis"] = ssl_result
                test_results["tests_performed"].append("ssl_analysis")
                
                if ssl_result.get("weak_cipher"):
                    vulnerabilities.append({
                        "type": "Weak SSL/TLS Configuration",
                        "severity": "medium",
                        "description": "Weak SSL/TLS ciphers or protocols detected",
                        "recommendation": "Update SSL/TLS configuration to use strong ciphers"
                    })
            
            # Test 7: Information disclosure
            logger.info("Testing for information disclosure...")
            info_disclosure = self._test_information_disclosure(base_url)
            test_results["tests_performed"].append("information_disclosure")
            
            if info_disclosure.get("disclosed_info"):
                vulnerabilities.append({
                    "type": "Information Disclosure",
                    "severity": "low",
                    "description": "Sensitive information disclosed in responses",
                    "details": info_disclosure.get("disclosed_info", []),
                    "recommendation": "Remove sensitive information from error messages and responses"
                })
            
            test_results["vulnerabilities"] = vulnerabilities
            test_results["vulnerability_count"] = len(vulnerabilities)
            
            return test_results
            
        except Exception as e:
            logger.error(f"Error during web vulnerability scan: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def _test_security_headers(self, url: str) -> Dict[str, Any]:
        """Test for presence of security headers."""
        required_headers = [
            'X-Content-Type-Options',
            'X-Frame-Options',
            'X-XSS-Protection',
            'Strict-Transport-Security',
            'Content-Security-Policy',
            'Referrer-Policy'
        ]
        
        try:
            response = self.session.get(url)
            response_headers = {k.lower(): v for k, v in response.headers.items()}
            
            present_headers = []
            missing_headers = []
            
            for header in required_headers:
                if header.lower() in response_headers:
                    present_headers.append(header)
                else:
                    missing_headers.append(header)
            
            return {
                "present_headers": present_headers,
                "missing_headers": missing_headers,
                "response_headers": dict(response.headers),
                "security_score": len(present_headers) / len(required_headers) * 100
            }
            
        except Exception as e:
            logger.warning(f"Error testing security headers: {e}")
            return {"error": str(e)}
    
    def _test_sql_injection(self, base_url: str) -> Dict[str, Any]:
        """Test for SQL injection vulnerabilities."""
        # Simple SQL injection payloads
        payloads = [
            "'", '"', "1' OR '1'='1", "1\" OR \"1\"=\"1", 
            "'; DROP TABLE users; --", "\"; DROP TABLE users; --"
        ]
        
        # Common parameter names to test
        test_params = ['id', 'user', 'username', 'search', 'q', 'query']
        
        try:
            # Test various endpoints
            test_endpoints = [
                f"{base_url}/search",
                f"{base_url}/user",
                f"{base_url}/login",
                f"{base_url}/api/search"
            ]
            
            for endpoint in test_endpoints:
                for param in test_params:
                    for payload in payloads:
                        try:
                            response = self.session.get(
                                endpoint, 
                                params={param: payload},
                                timeout=5
                            )
                            
                            # Look for SQL error indicators
                            sql_errors = [
                                'sql syntax', 'mysql_fetch', 'pg_query', 'sqlite_',
                                'syntax error', 'mysql_', 'postgresql', 'ora-',
                                'microsoft jet database', 'mysql server'
                            ]
                            
                            response_text = response.text.lower()
                            for error in sql_errors:
                                if error in response_text:
                                    return {
                                        "vulnerable": True,
                                        "endpoint": endpoint,
                                        "parameter": param,
                                        "payload": payload,
                                        "error_indicator": error
                                    }
                        
                        except Exception:
                            continue
            
            return {"vulnerable": False}
            
        except Exception as e:
            logger.warning(f"Error testing SQL injection: {e}")
            return {"error": str(e)}
    
    def _test_xss(self, base_url: str) -> Dict[str, Any]:
        """Test for Cross-Site Scripting vulnerabilities."""
        # Simple XSS payloads
        payloads = [
            '<script>alert("XSS")</script>',
            '"><script>alert("XSS")</script>',
            "'><script>alert('XSS')</script>",
            '<img src=x onerror=alert("XSS")>',
            'javascript:alert("XSS")'
        ]
        
        test_params = ['search', 'q', 'query', 'message', 'comment', 'name']
        
        try:
            test_endpoints = [
                f"{base_url}/search",
                f"{base_url}/contact",
                f"{base_url}/comment"
            ]
            
            for endpoint in test_endpoints:
                for param in test_params:
                    for payload in payloads:
                        try:
                            # Test GET parameter
                            response = self.session.get(
                                endpoint,
                                params={param: payload},
                                timeout=5
                            )
                            
                            # Check if payload is reflected in response
                            if payload in response.text:
                                return {
                                    "vulnerable": True,
                                    "endpoint": endpoint,
                                    "parameter": param,
                                    "payload": payload,
                                    "method": "GET"
                                }
                            
                            # Test POST parameter
                            response = self.session.post(
                                endpoint,
                                data={param: payload},
                                timeout=5
                            )
                            
                            if payload in response.text:
                                return {
                                    "vulnerable": True,
                                    "endpoint": endpoint,
                                    "parameter": param,
                                    "payload": payload,
                                    "method": "POST"
                                }
                        
                        except Exception:
                            continue
            
            return {"vulnerable": False}
            
        except Exception as e:
            logger.warning(f"Error testing XSS: {e}")
            return {"error": str(e)}
    
    def _test_directory_traversal(self, base_url: str) -> Dict[str, Any]:
        """Test for directory traversal vulnerabilities."""
        payloads = [
            '../../../etc/passwd',
            '..\\..\\..\\windows\\system32\\drivers\\etc\\hosts',
            '%2e%2e%2f%2e%2e%2f%2e%2e%2f%65%74%63%2f%70%61%73%73%77%64',
            '....//....//....//etc/passwd'
        ]
        
        try:
            test_endpoints = [
                f"{base_url}/file",
                f"{base_url}/download",
                f"{base_url}/view",
                f"{base_url}/api/file"
            ]
            
            for endpoint in test_endpoints:
                for payload in payloads:
                    try:
                        response = self.session.get(
                            endpoint,
                            params={'file': payload, 'path': payload, 'filename': payload},
                            timeout=5
                        )
                        
                        # Look for indicators of successful traversal
                        unix_indicators = ['root:', 'bin:', 'daemon:', '/bin/bash']
                        windows_indicators = ['[drivers]', '[fonts]', 'SYSTEM\\']
                        
                        response_text = response.text.lower()
                        
                        for indicator in unix_indicators + windows_indicators:
                            if indicator.lower() in response_text:
                                return {
                                    "vulnerable": True,
                                    "endpoint": endpoint,
                                    "payload": payload,
                                    "indicator": indicator
                                }
                    
                    except Exception:
                        continue
            
            return {"vulnerable": False}
            
        except Exception as e:
            logger.warning(f"Error testing directory traversal: {e}")
            return {"error": str(e)}
    
    def _test_authentication(self, base_url: str) -> Dict[str, Any]:
        """Test authentication mechanisms."""
        auth_issues = []
        
        try:
            # Test for default credentials
            default_creds = [
                ('admin', 'admin'), ('admin', 'password'), ('admin', '123456'),
                ('root', 'root'), ('test', 'test'), ('guest', 'guest')
            ]
            
            login_endpoints = [
                f"{base_url}/login",
                f"{base_url}/api/login",
                f"{base_url}/admin/login"
            ]
            
            for endpoint in login_endpoints:
                try:
                    # Check if endpoint exists
                    response = self.session.get(endpoint, timeout=5)
                    if response.status_code == 200:
                        # Test default credentials
                        for username, password in default_creds:
                            try:
                                login_response = self.session.post(
                                    endpoint,
                                    data={'username': username, 'password': password},
                                    timeout=5
                                )
                                
                                # Look for successful login indicators
                                if (login_response.status_code == 200 and 
                                    any(indicator in login_response.text.lower() 
                                        for indicator in ['welcome', 'dashboard', 'logout', 'profile'])):
                                    auth_issues.append(f"Default credentials work: {username}:{password}")
                            
                            except Exception:
                                continue
                
                except Exception:
                    continue
            
            # Test for weak session management
            # This would require more sophisticated testing in practice
            
            return {
                "weak_authentication": len(auth_issues) > 0,
                "issues": auth_issues
            }
            
        except Exception as e:
            logger.warning(f"Error testing authentication: {e}")
            return {"error": str(e)}
    
    def _test_ssl_configuration(self, url: str) -> Dict[str, Any]:
        """Test SSL/TLS configuration."""
        try:
            import ssl
            from urllib.parse import urlparse
            
            parsed_url = urlparse(url)
            hostname = parsed_url.hostname
            port = parsed_url.port or 443
            
            # Get SSL certificate info
            context = ssl.create_default_context()
            
            with socket.create_connection((hostname, port), timeout=10) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    cert = ssock.getpeercert()
                    cipher = ssock.cipher()
                    version = ssock.version()
            
            # Analyze certificate
            cert_issues = []
            
            # Check certificate expiration
            import datetime
            not_after = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z')
            days_until_expiry = (not_after - datetime.datetime.now()).days
            
            if days_until_expiry < 30:
                cert_issues.append(f"Certificate expires soon: {days_until_expiry} days")
            
            # Check cipher strength
            weak_cipher = False
            if cipher:
                cipher_name = cipher[0]
                if any(weak in cipher_name.upper() for weak in ['RC4', 'DES', 'MD5']):
                    weak_cipher = True
                    cert_issues.append(f"Weak cipher detected: {cipher_name}")
            
            # Check protocol version
            if version in ['SSLv2', 'SSLv3', 'TLSv1', 'TLSv1.1']:
                cert_issues.append(f"Outdated protocol version: {version}")
            
            return {
                "certificate": {
                    "subject": cert.get('subject', []),
                    "issuer": cert.get('issuer', []),
                    "expires": cert.get('notAfter'),
                    "days_until_expiry": days_until_expiry
                },
                "cipher": cipher,
                "protocol_version": version,
                "weak_cipher": weak_cipher,
                "issues": cert_issues
            }
            
        except Exception as e:
            logger.warning(f"Error testing SSL configuration: {e}")
            return {"error": str(e)}
    
    def _test_information_disclosure(self, base_url: str) -> Dict[str, Any]:
        """Test for information disclosure vulnerabilities."""
        disclosed_info = []
        
        try:
            # Test common sensitive files
            sensitive_files = [
                '.env', '.git/config', 'config.php', 'wp-config.php',
                'web.config', 'robots.txt', 'sitemap.xml', '.htaccess'
            ]
            
            for file in sensitive_files:
                try:
                    response = self.session.get(f"{base_url}/{file}", timeout=5)
                    if response.status_code == 200 and len(response.text) > 0:
                        disclosed_info.append(f"Accessible file: {file}")
                except Exception:
                    continue
            
            # Test error handling
            try:
                # Trigger 404 error
                response = self.session.get(f"{base_url}/nonexistent-page-12345", timeout=5)
                if 'version' in response.text.lower() or 'server' in response.text.lower():
                    disclosed_info.append("Server information in error pages")
            except Exception:
                pass
            
            # Check HTTP methods
            try:
                response = self.session.request('OPTIONS', base_url, timeout=5)
                if 'allow' in response.headers:
                    allowed_methods = response.headers['allow']
                    dangerous_methods = ['TRACE', 'DELETE', 'PUT']
                    for method in dangerous_methods:
                        if method in allowed_methods:
                            disclosed_info.append(f"Dangerous HTTP method allowed: {method}")
            except Exception:
                pass
            
            return {
                "disclosed_info": disclosed_info,
                "has_disclosure": len(disclosed_info) > 0
            }
            
        except Exception as e:
            logger.warning(f"Error testing information disclosure: {e}")
            return {"error": str(e)}
    
    def network_reconnaissance(self, target: str) -> Dict[str, Any]:
        """Perform network reconnaissance."""
        logger.info(f"Network reconnaissance on: {target}")
        
        recon_results = {
            "status": "success",
            "target": target,
            "dns_info": {},
            "whois_info": {},
            "subdomain_enum": []
        }
        
        try:
            # DNS enumeration
            try:
                import dns.resolver
                
                dns_records = {}
                record_types = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME']
                
                for record_type in record_types:
                    try:
                        answers = dns.resolver.resolve(target, record_type)
                        dns_records[record_type] = [str(rdata) for rdata in answers]
                    except:
                        dns_records[record_type] = []
                
                recon_results["dns_info"] = dns_records
                
            except ImportError:
                logger.warning("dnspython not available for DNS enumeration")
            
            # Basic subdomain enumeration
            common_subdomains = [
                'www', 'mail', 'admin', 'test', 'dev', 'staging', 'api',
                'ftp', 'smtp', 'pop', 'imap', 'vpn', 'remote'
            ]
            
            found_subdomains = []
            for subdomain in common_subdomains:
                try:
                    full_domain = f"{subdomain}.{target}"
                    socket.gethostbyname(full_domain)
                    found_subdomains.append(full_domain)
                except:
                    continue
            
            recon_results["subdomain_enum"] = found_subdomains
            
            return recon_results
            
        except Exception as e:
            logger.error(f"Error during network reconnaissance: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def run_comprehensive_test(self, targets: List[str], 
                             include_network: bool = True,
                             include_web: bool = True) -> Dict[str, Any]:
        """Run comprehensive penetration testing."""
        logger.info("Starting comprehensive penetration testing...")
        
        test_summary = {
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "targets_tested": len(targets),
            "test_results": {},
            "security_summary": {},
            "recommendations": []
        }
        
        try:
            for target in targets:
                logger.info(f"Testing target: {target}")
                
                target_results = {
                    "target": target,
                    "tests_completed": []
                }
                
                # Determine if target is URL or hostname/IP
                if target.startswith(('http://', 'https://')):
                    # Web application target
                    if include_web:
                        target_results["web_vuln_scan"] = self.web_vulnerability_scan(target)
                        target_results["tests_completed"].append("web_vulnerability_scan")
                    
                    # Extract hostname for network tests
                    from urllib.parse import urlparse
                    parsed = urlparse(target)
                    hostname = parsed.hostname
                    
                    if include_network and hostname:
                        target_results["port_scan"] = self.port_scan(hostname)
                        target_results["network_recon"] = self.network_reconnaissance(hostname)
                        target_results["tests_completed"].extend(["port_scan", "network_reconnaissance"])
                
                else:
                    # Network target (hostname/IP)
                    if include_network:
                        target_results["port_scan"] = self.port_scan(target)
                        target_results["network_recon"] = self.network_reconnaissance(target)
                        target_results["tests_completed"].extend(["port_scan", "network_reconnaissance"])
                    
                    # Try web testing on common ports
                    if include_web:
                        for protocol, port in [('http', 80), ('https', 443)]:
                            web_url = f"{protocol}://{target}:{port}"
                            try:
                                response = self.session.get(web_url, timeout=5)
                                if response.status_code == 200:
                                    target_results[f"web_scan_{protocol}"] = self.web_vulnerability_scan(web_url)
                                    target_results["tests_completed"].append(f"web_scan_{protocol}")
                            except:
                                continue
                
                test_summary["test_results"][target] = target_results
            
            # Calculate security summary
            test_summary["security_summary"] = self._calculate_security_summary(test_summary["test_results"])
            
            # Generate recommendations
            test_summary["recommendations"] = self._generate_security_recommendations(test_summary)
            
            # Save detailed report
            report_file = self.reports_dir / f"penetration_test_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(report_file, 'w') as f:
                json.dump(test_summary, f, indent=2, default=str)
            
            logger.info(f"Penetration testing completed. Report saved to: {report_file}")
            return test_summary
            
        except Exception as e:
            logger.error(f"Error during penetration testing: {e}")
            test_summary["status"] = "error"
            test_summary["error"] = str(e)
            return test_summary
    
    def _calculate_security_summary(self, test_results: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate overall security summary."""
        summary = {
            "total_vulnerabilities": 0,
            "high_risk": 0,
            "medium_risk": 0,
            "low_risk": 0,
            "open_ports": 0,
            "security_score": 100
        }
        
        try:
            for target, results in test_results.items():
                # Count web vulnerabilities
                for key, result in results.items():
                    if "web" in key and isinstance(result, dict):
                        vulnerabilities = result.get("vulnerabilities", [])
                        for vuln in vulnerabilities:
                            summary["total_vulnerabilities"] += 1
                            severity = vuln.get("severity", "low")
                            summary[f"{severity}_risk"] += 1
                
                # Count open ports
                port_scan = results.get("port_scan", {})
                if port_scan.get("open_ports"):
                    summary["open_ports"] += len(port_scan["open_ports"])
            
            # Calculate security score
            deductions = 0
            deductions += summary["high_risk"] * 15
            deductions += summary["medium_risk"] * 8
            deductions += summary["low_risk"] * 3
            deductions += min(summary["open_ports"] * 2, 20)  # Cap port deductions
            
            summary["security_score"] = max(0, 100 - deductions)
            
        except Exception as e:
            logger.warning(f"Error calculating security summary: {e}")
        
        return summary
    
    def _generate_security_recommendations(self, test_summary: Dict[str, Any]) -> List[str]:
        """Generate security recommendations."""
        recommendations = []
        
        security_summary = test_summary.get("security_summary", {})
        
        if security_summary.get("security_score", 100) < 70:
            recommendations.append("Overall security posture needs improvement. Address high-risk vulnerabilities immediately.")
        
        if security_summary.get("high_risk", 0) > 0:
            recommendations.append(f"Found {security_summary['high_risk']} high-risk vulnerabilities requiring immediate attention.")
        
        if security_summary.get("open_ports", 0) > 10:
            recommendations.append("Large number of open ports detected. Review and close unnecessary services.")
        
        # General recommendations
        recommendations.extend([
            "Implement Web Application Firewall (WAF)",
            "Regular security updates and patch management",
            "Implement network segmentation and access controls",
            "Conduct regular security audits and penetration testing",
            "Implement comprehensive logging and monitoring",
            "Security awareness training for developers and staff"
        ])
        
        return recommendations

def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="Penetration Testing for A1Betting")
    parser.add_argument("targets", nargs='+', help="Target URLs or hostnames to test")
    parser.add_argument("--skip-network", action="store_true", help="Skip network reconnaissance")
    parser.add_argument("--skip-web", action="store_true", help="Skip web vulnerability testing")
    parser.add_argument("--reports-dir", default="automation/reports", help="Directory for reports")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Create tester
    tester = PenetrationTester(reports_dir=args.reports_dir)
    
    # Run comprehensive test
    results = tester.run_comprehensive_test(
        targets=args.targets,
        include_network=not args.skip_network,
        include_web=not args.skip_web
    )
    
    # Print summary
    print("\n" + "="*50)
    print("PENETRATION TEST SUMMARY")
    print("="*50)
    print(f"Status: {results['status']}")
    print(f"Targets Tested: {results['targets_tested']}")
    
    if results.get('security_summary'):
        summary = results['security_summary']
        print(f"Security Score: {summary.get('security_score', 'N/A')}/100")
        print(f"Total Vulnerabilities: {summary.get('total_vulnerabilities', 0)}")
        print(f"  High Risk: {summary.get('high_risk', 0)}")
        print(f"  Medium Risk: {summary.get('medium_risk', 0)}")
        print(f"  Low Risk: {summary.get('low_risk', 0)}")
        print(f"Open Ports: {summary.get('open_ports', 0)}")
    
    if results.get('recommendations'):
        print("\nTop Recommendations:")
        for i, rec in enumerate(results['recommendations'][:5], 1):
            print(f"  {i}. {rec}")
    
    # Exit with appropriate code
    if results['status'] == 'error':
        sys.exit(1)
    elif results.get('security_summary', {}).get('high_risk', 0) > 0:
        print("\nWarning: High-risk vulnerabilities found")
        sys.exit(1)
    elif results.get('security_summary', {}).get('security_score', 100) < 70:
        print("\nWarning: Security score below recommended threshold")
        sys.exit(1)
    else:
        print("\nPenetration testing completed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    # Default targets if none provided
    if len(sys.argv) == 1:
        sys.argv.extend(["http://localhost:3000", "http://localhost:8000"])
    
    main()
