#!/usr/bin/env python3
"""
Docker Security Scanner for A1Betting Platform

This script performs comprehensive security scanning of Docker containers,
images, and configurations to identify vulnerabilities and security issues.
"""

import os
import sys
import json
import logging
import subprocess
import re
from datetime import datetime
from pathlib import Path
import argparse
from typing import Dict, List, Any, Optional
import warnings
warnings.filterwarnings('ignore')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DockerSecurityScanner:
    """Comprehensive Docker security scanning system."""
    
    def __init__(self, reports_dir: str = "automation/reports"):
        self.reports_dir = Path(reports_dir)
        self.reports_dir.mkdir(parents=True, exist_ok=True)
        self.scan_results = {}
        
    def run_command(self, command: List[str], capture_output: bool = True) -> Dict[str, Any]:
        """Run a shell command safely and return results."""
        try:
            result = subprocess.run(
                command,
                capture_output=capture_output,
                text=True,
                timeout=300,  # 5 minute timeout
                check=False
            )
            
            return {
                "success": result.returncode == 0,
                "stdout": result.stdout,
                "stderr": result.stderr,
                "returncode": result.returncode
            }
        except subprocess.TimeoutExpired:
            logger.error(f"Command timed out: {' '.join(command)}")
            return {"success": False, "error": "Command timed out"}
        except Exception as e:
            logger.error(f"Error running command {' '.join(command)}: {e}")
            return {"success": False, "error": str(e)}
    
    def check_docker_installation(self) -> Dict[str, Any]:
        """Check if Docker is installed and accessible."""
        logger.info("Checking Docker installation...")
        
        docker_check = self.run_command(["docker", "--version"])
        
        if not docker_check["success"]:
            return {
                "status": "error",
                "message": "Docker is not installed or not accessible",
                "recommendation": "Install Docker and ensure it's running"
            }
        
        # Check if Docker daemon is running
        daemon_check = self.run_command(["docker", "info"])
        
        return {
            "status": "success" if daemon_check["success"] else "warning",
            "docker_version": docker_check["stdout"].strip(),
            "daemon_running": daemon_check["success"],
            "daemon_info": daemon_check["stdout"] if daemon_check["success"] else daemon_check["stderr"]
        }
    
    def scan_dockerfile_security(self, dockerfile_path: str) -> Dict[str, Any]:
        """Scan Dockerfile for security best practices."""
        logger.info(f"Scanning Dockerfile: {dockerfile_path}")
        
        if not os.path.exists(dockerfile_path):
            return {
                "status": "error",
                "message": f"Dockerfile not found: {dockerfile_path}"
            }
        
        security_issues = []
        recommendations = []
        
        try:
            with open(dockerfile_path, 'r') as f:
                dockerfile_content = f.read()
                lines = dockerfile_content.split('\n')
            
            # Security checks
            has_user_instruction = False
            runs_as_root = True
            uses_latest_tag = False
            has_secrets = False
            has_exposed_ports = []
            has_healthcheck = False
            
            for i, line in enumerate(lines, 1):
                line = line.strip()
                
                # Check for USER instruction
                if line.startswith('USER '):
                    has_user_instruction = True
                    user = line.split()[1]
                    if user != 'root' and user != '0':
                        runs_as_root = False
                
                # Check for latest tag usage
                if 'FROM ' in line and ':latest' in line:
                    uses_latest_tag = True
                    security_issues.append({
                        "line": i,
                        "issue": "Using 'latest' tag",
                        "severity": "medium",
                        "description": "Using 'latest' tag can lead to unpredictable builds"
                    })
                
                # Check for potential secrets
                secret_patterns = [
                    r'password\s*=\s*[\'"][^\'"]+[\'"]',
                    r'secret\s*=\s*[\'"][^\'"]+[\'"]',
                    r'token\s*=\s*[\'"][^\'"]+[\'"]',
                    r'api_key\s*=\s*[\'"][^\'"]+[\'"]'
                ]
                
                for pattern in secret_patterns:
                    if re.search(pattern, line, re.IGNORECASE):
                        has_secrets = True
                        security_issues.append({
                            "line": i,
                            "issue": "Potential hardcoded secret",
                            "severity": "high",
                            "description": "Hardcoded secrets in Dockerfile are security risks"
                        })
                
                # Check for exposed ports
                if line.startswith('EXPOSE '):
                    port = line.split()[1]
                    has_exposed_ports.append(port)
                    
                    # Check for risky ports
                    risky_ports = ['22', '3389', '21', '23', '25', '53', '135', '139', '445']
                    if port in risky_ports:
                        security_issues.append({
                            "line": i,
                            "issue": f"Exposed risky port {port}",
                            "severity": "high",
                            "description": f"Port {port} is commonly targeted by attackers"
                        })
                
                # Check for HEALTHCHECK
                if line.startswith('HEALTHCHECK '):
                    has_healthcheck = True
                
                # Check for apt-get without --no-install-recommends
                if 'apt-get install' in line and '--no-install-recommends' not in line:
                    security_issues.append({
                        "line": i,
                        "issue": "apt-get without --no-install-recommends",
                        "severity": "low",
                        "description": "Installing recommended packages increases attack surface"
                    })
                
                # Check for curl/wget with insecure options
                if ('curl' in line or 'wget' in line) and ('-k' in line or '--insecure' in line):
                    security_issues.append({
                        "line": i,
                        "issue": "Insecure download",
                        "severity": "high",
                        "description": "Using insecure download options"
                    })
            
            # Generate recommendations
            if not has_user_instruction or runs_as_root:
                recommendations.append("Add USER instruction to run container as non-root user")
            
            if not has_healthcheck:
                recommendations.append("Add HEALTHCHECK instruction for better container monitoring")
            
            if uses_latest_tag:
                recommendations.append("Use specific version tags instead of 'latest'")
            
            if has_secrets:
                recommendations.append("Use environment variables or secrets management for sensitive data")
            
            return {
                "status": "success",
                "dockerfile_path": dockerfile_path,
                "security_issues": security_issues,
                "recommendations": recommendations,
                "summary": {
                    "total_issues": len(security_issues),
                    "high_severity": len([i for i in security_issues if i["severity"] == "high"]),
                    "medium_severity": len([i for i in security_issues if i["severity"] == "medium"]),
                    "low_severity": len([i for i in security_issues if i["severity"] == "low"]),
                    "runs_as_root": runs_as_root,
                    "has_healthcheck": has_healthcheck,
                    "exposed_ports": has_exposed_ports
                }
            }
            
        except Exception as e:
            logger.error(f"Error scanning Dockerfile: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def scan_docker_images(self) -> Dict[str, Any]:
        """Scan Docker images for vulnerabilities."""
        logger.info("Scanning Docker images...")
        
        # Get list of Docker images
        images_result = self.run_command(["docker", "images", "--format", "json"])
        
        if not images_result["success"]:
            return {
                "status": "error",
                "message": "Failed to list Docker images",
                "error": images_result.get("stderr", "Unknown error")
            }
        
        scan_results = {
            "status": "success",
            "images_scanned": 0,
            "vulnerabilities_found": 0,
            "image_results": {}
        }
        
        try:
            # Parse Docker images
            images = []
            for line in images_result["stdout"].strip().split('\n'):
                if line:
                    try:
                        image_info = json.loads(line)
                        images.append(image_info)
                    except json.JSONDecodeError:
                        continue
            
            # If no images, create mock results
            if not images:
                logger.warning("No Docker images found for scanning")
                scan_results["image_results"]["no_images"] = {
                    "status": "info",
                    "message": "No Docker images found to scan"
                }
                return scan_results
            
            # Scan each image
            for image in images[:5]:  # Limit to first 5 images to avoid long execution
                image_name = f"{image.get('Repository', 'unknown')}:{image.get('Tag', 'unknown')}"
                logger.info(f"Scanning image: {image_name}")
                
                # Try to use docker scout if available
                scout_result = self.run_command(["docker", "scout", "cves", image_name])
                
                if scout_result["success"]:
                    # Parse scout results (simplified)
                    vulnerabilities = self._parse_scout_output(scout_result["stdout"])
                    scan_results["image_results"][image_name] = {
                        "status": "success",
                        "scanner": "docker_scout",
                        "vulnerabilities": vulnerabilities,
                        "total_vulnerabilities": len(vulnerabilities)
                    }
                else:
                    # Fallback to basic image inspection
                    inspect_result = self.run_command(["docker", "inspect", image_name])
                    
                    if inspect_result["success"]:
                        try:
                            image_data = json.loads(inspect_result["stdout"])[0]
                            scan_results["image_results"][image_name] = {
                                "status": "success",
                                "scanner": "basic_inspection",
                                "image_info": {
                                    "created": image_data.get("Created"),
                                    "size": image.get("Size", "unknown"),
                                    "architecture": image_data.get("Architecture"),
                                    "os": image_data.get("Os")
                                },
                                "basic_checks": self._perform_basic_image_checks(image_data)
                            }
                        except (json.JSONDecodeError, IndexError):
                            scan_results["image_results"][image_name] = {
                                "status": "error",
                                "message": "Failed to parse image inspection data"
                            }
                    else:
                        scan_results["image_results"][image_name] = {
                            "status": "error",
                            "message": "Failed to inspect image"
                        }
                
                scan_results["images_scanned"] += 1
            
            # Calculate total vulnerabilities
            total_vulns = 0
            for image_result in scan_results["image_results"].values():
                if isinstance(image_result, dict):
                    total_vulns += image_result.get("total_vulnerabilities", 0)
            
            scan_results["vulnerabilities_found"] = total_vulns
            
            return scan_results
            
        except Exception as e:
            logger.error(f"Error scanning Docker images: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def _parse_scout_output(self, scout_output: str) -> List[Dict[str, Any]]:
        """Parse Docker Scout CVE output."""
        vulnerabilities = []
        
        # This is a simplified parser - in reality, you'd need more sophisticated parsing
        lines = scout_output.split('\n')
        
        current_cve = None
        for line in lines:
            line = line.strip()
            
            # Look for CVE identifiers
            cve_match = re.search(r'CVE-\d{4}-\d+', line)
            if cve_match:
                if current_cve:
                    vulnerabilities.append(current_cve)
                
                current_cve = {
                    "cve_id": cve_match.group(),
                    "severity": "unknown",
                    "description": line,
                    "package": "unknown"
                }
            
            # Look for severity indicators
            elif current_cve and any(sev in line.lower() for sev in ['critical', 'high', 'medium', 'low']):
                for sev in ['critical', 'high', 'medium', 'low']:
                    if sev in line.lower():
                        current_cve["severity"] = sev
                        break
        
        if current_cve:
            vulnerabilities.append(current_cve)
        
        return vulnerabilities
    
    def _perform_basic_image_checks(self, image_data: Dict[str, Any]) -> Dict[str, Any]:
        """Perform basic security checks on image metadata."""
        checks = {
            "runs_as_root": True,
            "has_exposed_ports": False,
            "exposed_ports": [],
            "environment_variables": [],
            "potential_issues": []
        }
        
        try:
            config = image_data.get("Config", {})
            
            # Check user
            user = config.get("User", "")
            if user and user != "root" and user != "0":
                checks["runs_as_root"] = False
            
            # Check exposed ports
            exposed_ports = config.get("ExposedPorts", {})
            if exposed_ports:
                checks["has_exposed_ports"] = True
                checks["exposed_ports"] = list(exposed_ports.keys())
            
            # Check environment variables for potential secrets
            env_vars = config.get("Env", [])
            for env_var in env_vars:
                checks["environment_variables"].append(env_var)
                
                # Look for potential secrets in environment variables
                if any(secret in env_var.lower() for secret in ['password', 'secret', 'token', 'key']):
                    checks["potential_issues"].append(f"Potential secret in environment: {env_var.split('=')[0]}")
            
            # Check for root user
            if checks["runs_as_root"]:
                checks["potential_issues"].append("Container runs as root user")
            
            # Check for risky ports
            risky_ports = ['22/tcp', '3389/tcp', '21/tcp']
            for port in checks["exposed_ports"]:
                if port in risky_ports:
                    checks["potential_issues"].append(f"Exposed risky port: {port}")
        
        except Exception as e:
            logger.warning(f"Error performing basic image checks: {e}")
        
        return checks
    
    def scan_docker_compose_security(self, compose_file: str = "docker-compose.yml") -> Dict[str, Any]:
        """Scan Docker Compose file for security issues."""
        logger.info(f"Scanning Docker Compose file: {compose_file}")
        
        if not os.path.exists(compose_file):
            return {
                "status": "warning",
                "message": f"Docker Compose file not found: {compose_file}"
            }
        
        try:
            import yaml
            
            with open(compose_file, 'r') as f:
                compose_data = yaml.safe_load(f)
            
            security_issues = []
            recommendations = []
            
            services = compose_data.get('services', {})
            
            for service_name, service_config in services.items():
                # Check for privileged mode
                if service_config.get('privileged', False):
                    security_issues.append({
                        "service": service_name,
                        "issue": "Privileged mode enabled",
                        "severity": "high",
                        "description": "Privileged containers have full access to host"
                    })
                
                # Check for host network mode
                if service_config.get('network_mode') == 'host':
                    security_issues.append({
                        "service": service_name,
                        "issue": "Host network mode",
                        "severity": "medium",
                        "description": "Host network mode reduces isolation"
                    })
                
                # Check for volume mounts
                volumes = service_config.get('volumes', [])
                for volume in volumes:
                    if isinstance(volume, str):
                        # Check for dangerous mounts
                        if volume.startswith('/') and ':/' in volume:
                            host_path = volume.split(':')[0]
                            if host_path in ['/', '/etc', '/var', '/usr', '/boot']:
                                security_issues.append({
                                    "service": service_name,
                                    "issue": f"Dangerous volume mount: {volume}",
                                    "severity": "high",
                                    "description": "Mounting sensitive host directories"
                                })
                
                # Check for environment files
                env_files = service_config.get('env_file', [])
                if env_files:
                    for env_file in env_files:
                        if not os.path.exists(env_file):
                            security_issues.append({
                                "service": service_name,
                                "issue": f"Missing environment file: {env_file}",
                                "severity": "low",
                                "description": "Referenced environment file not found"
                            })
                
                # Check for exposed ports
                ports = service_config.get('ports', [])
                for port in ports:
                    if isinstance(port, str) and ':' in port:
                        host_port = port.split(':')[0]
                        if host_port in ['22', '3389', '21']:
                            security_issues.append({
                                "service": service_name,
                                "issue": f"Exposed risky port: {port}",
                                "severity": "medium",
                                "description": f"Port {host_port} is commonly targeted"
                            })
            
            # Generate recommendations
            if security_issues:
                recommendations.append("Review and address identified security issues")
            
            recommendations.append("Use secrets management for sensitive data")
            recommendations.append("Implement least privilege principle for containers")
            recommendations.append("Regular security updates for base images")
            
            return {
                "status": "success",
                "compose_file": compose_file,
                "services_scanned": len(services),
                "security_issues": security_issues,
                "recommendations": recommendations,
                "summary": {
                    "total_issues": len(security_issues),
                    "high_severity": len([i for i in security_issues if i["severity"] == "high"]),
                    "medium_severity": len([i for i in security_issues if i["severity"] == "medium"]),
                    "low_severity": len([i for i in security_issues if i["severity"] == "low"])
                }
            }
            
        except ImportError:
            return {
                "status": "error",
                "message": "PyYAML not available for Docker Compose scanning"
            }
        except Exception as e:
            logger.error(f"Error scanning Docker Compose file: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def run_comprehensive_scan(self, dockerfile_paths: List[str] = None, 
                             compose_files: List[str] = None) -> Dict[str, Any]:
        """Run comprehensive Docker security scan."""
        logger.info("Starting comprehensive Docker security scan...")
        
        scan_summary = {
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "scan_results": {},
            "security_summary": {},
            "recommendations": []
        }
        
        try:
            # Check Docker installation
            scan_summary["scan_results"]["docker_check"] = self.check_docker_installation()
            
            # Scan Dockerfiles
            if dockerfile_paths is None:
                dockerfile_paths = []
                # Auto-discover Dockerfiles
                for root, dirs, files in os.walk('.'):
                    for file in files:
                        if file.lower() in ['dockerfile', 'dockerfile.dev', 'dockerfile.prod']:
                            dockerfile_paths.append(os.path.join(root, file))
            
            if not dockerfile_paths:
                # Check common locations
                common_dockerfiles = ['Dockerfile', 'docker/Dockerfile', 'backend/Dockerfile', 'frontend/Dockerfile']
                dockerfile_paths = [f for f in common_dockerfiles if os.path.exists(f)]
            
            dockerfile_results = {}
            for dockerfile in dockerfile_paths:
                dockerfile_results[dockerfile] = self.scan_dockerfile_security(dockerfile)
            
            scan_summary["scan_results"]["dockerfile_scans"] = dockerfile_results
            
            # Scan Docker images
            scan_summary["scan_results"]["image_scan"] = self.scan_docker_images()
            
            # Scan Docker Compose files
            if compose_files is None:
                compose_files = []
                # Auto-discover compose files
                common_compose_files = [
                    'docker-compose.yml', 'docker-compose.yaml',
                    'docker-compose.prod.yml', 'docker-compose.dev.yml'
                ]
                compose_files = [f for f in common_compose_files if os.path.exists(f)]
            
            compose_results = {}
            for compose_file in compose_files:
                compose_results[compose_file] = self.scan_docker_compose_security(compose_file)
            
            scan_summary["scan_results"]["compose_scans"] = compose_results
            
            # Calculate security summary
            scan_summary["security_summary"] = self._calculate_security_summary(scan_summary["scan_results"])
            
            # Generate recommendations
            scan_summary["recommendations"] = self._generate_security_recommendations(scan_summary)
            
            # Save detailed report
            report_file = self.reports_dir / f"docker_security_scan_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(report_file, 'w') as f:
                json.dump(scan_summary, f, indent=2, default=str)
            
            logger.info(f"Docker security scan completed. Report saved to: {report_file}")
            return scan_summary
            
        except Exception as e:
            logger.error(f"Error during Docker security scan: {e}")
            scan_summary["status"] = "error"
            scan_summary["error"] = str(e)
            return scan_summary
    
    def _calculate_security_summary(self, scan_results: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate overall security summary."""
        summary = {
            "total_issues": 0,
            "critical_issues": 0,
            "high_issues": 0,
            "medium_issues": 0,
            "low_issues": 0,
            "dockerfiles_scanned": 0,
            "images_scanned": 0,
            "compose_files_scanned": 0,
            "security_score": 100
        }
        
        try:
            # Count Dockerfile issues
            dockerfile_scans = scan_results.get("dockerfile_scans", {})
            for dockerfile_result in dockerfile_scans.values():
                if isinstance(dockerfile_result, dict) and dockerfile_result.get("status") == "success":
                    summary["dockerfiles_scanned"] += 1
                    issues = dockerfile_result.get("security_issues", [])
                    for issue in issues:
                        severity = issue.get("severity", "low")
                        summary["total_issues"] += 1
                        summary[f"{severity}_issues"] += 1
            
            # Count image vulnerabilities
            image_scan = scan_results.get("image_scan", {})
            if isinstance(image_scan, dict):
                summary["images_scanned"] = image_scan.get("images_scanned", 0)
                summary["total_issues"] += image_scan.get("vulnerabilities_found", 0)
            
            # Count Compose issues
            compose_scans = scan_results.get("compose_scans", {})
            for compose_result in compose_scans.values():
                if isinstance(compose_result, dict) and compose_result.get("status") == "success":
                    summary["compose_files_scanned"] += 1
                    issues = compose_result.get("security_issues", [])
                    for issue in issues:
                        severity = issue.get("severity", "low")
                        summary["total_issues"] += 1
                        summary[f"{severity}_issues"] += 1
            
            # Calculate security score
            # Start with 100 and deduct points for issues
            deductions = 0
            deductions += summary["critical_issues"] * 20
            deductions += summary["high_issues"] * 10
            deductions += summary["medium_issues"] * 5
            deductions += summary["low_issues"] * 1
            
            summary["security_score"] = max(0, 100 - deductions)
            
        except Exception as e:
            logger.warning(f"Error calculating security summary: {e}")
        
        return summary
    
    def _generate_security_recommendations(self, scan_summary: Dict[str, Any]) -> List[str]:
        """Generate security recommendations based on scan results."""
        recommendations = []
        
        security_summary = scan_summary.get("security_summary", {})
        
        if security_summary.get("security_score", 100) < 70:
            recommendations.append("Overall security score is low. Address critical and high-severity issues immediately.")
        
        if security_summary.get("critical_issues", 0) > 0:
            recommendations.append(f"Found {security_summary['critical_issues']} critical security issues that require immediate attention.")
        
        if security_summary.get("high_issues", 0) > 0:
            recommendations.append(f"Found {security_summary['high_issues']} high-severity security issues.")
        
        # Docker-specific recommendations
        docker_check = scan_summary.get("scan_results", {}).get("docker_check", {})
        if docker_check.get("status") != "success":
            recommendations.append("Ensure Docker is properly installed and running.")
        
        if security_summary.get("dockerfiles_scanned", 0) == 0:
            recommendations.append("No Dockerfiles found. Ensure Docker configurations are properly secured.")
        
        if security_summary.get("images_scanned", 0) == 0:
            recommendations.append("No Docker images found for vulnerability scanning.")
        
        # General security recommendations
        recommendations.extend([
            "Regularly update base images to latest security patches",
            "Use multi-stage builds to reduce image size and attack surface",
            "Implement Docker Content Trust for image signing",
            "Use secrets management instead of environment variables for sensitive data",
            "Run containers with non-root users when possible",
            "Implement network segmentation for Docker containers",
            "Monitor container runtime for anomalous behavior"
        ])
        
        return recommendations

def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="Docker Security Scanner for A1Betting")
    parser.add_argument("--dockerfiles", nargs='+', help="Specific Dockerfile paths to scan")
    parser.add_argument("--compose-files", nargs='+', help="Specific Docker Compose files to scan")
    parser.add_argument("--reports-dir", default="automation/reports", help="Directory for reports")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Create scanner
    scanner = DockerSecurityScanner(reports_dir=args.reports_dir)
    
    # Run comprehensive scan
    results = scanner.run_comprehensive_scan(
        dockerfile_paths=args.dockerfiles,
        compose_files=args.compose_files
    )
    
    # Print summary
    print("\n" + "="*50)
    print("DOCKER SECURITY SCAN SUMMARY")
    print("="*50)
    print(f"Status: {results['status']}")
    
    if results.get('security_summary'):
        summary = results['security_summary']
        print(f"Security Score: {summary.get('security_score', 'N/A')}/100")
        print(f"Total Issues: {summary.get('total_issues', 0)}")
        print(f"  Critical: {summary.get('critical_issues', 0)}")
        print(f"  High: {summary.get('high_issues', 0)}")
        print(f"  Medium: {summary.get('medium_issues', 0)}")
        print(f"  Low: {summary.get('low_issues', 0)}")
        print(f"Dockerfiles Scanned: {summary.get('dockerfiles_scanned', 0)}")
        print(f"Images Scanned: {summary.get('images_scanned', 0)}")
        print(f"Compose Files Scanned: {summary.get('compose_files_scanned', 0)}")
    
    if results.get('recommendations'):
        print("\nTop Recommendations:")
        for i, rec in enumerate(results['recommendations'][:5], 1):
            print(f"  {i}. {rec}")
    
    # Exit with appropriate code
    if results['status'] == 'error':
        sys.exit(1)
    elif results.get('security_summary', {}).get('security_score', 100) < 70:
        print("\nWarning: Security score below recommended threshold")
        sys.exit(1)
    elif results.get('security_summary', {}).get('critical_issues', 0) > 0:
        print("\nWarning: Critical security issues found")
        sys.exit(1)
    else:
        print("\nDocker security scan completed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
