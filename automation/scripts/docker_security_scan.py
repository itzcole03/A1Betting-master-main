#!/usr/bin/env python3
"""
Docker Security Scanner
Scans Docker images and containers for security vulnerabilities.
"""

import json
import logging
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DockerSecurityScanner:
    """Scanner for Docker security vulnerabilities."""

    def __init__(self):
        self.project_root = Path.cwd()
        self.reports_dir = self.project_root / "automation" / "reports"
        self.reports_dir.mkdir(parents=True, exist_ok=True)

    def check_docker_available(self) -> bool:
        """Check if Docker is available."""
        try:
            result = subprocess.run(
                ["docker", "--version"], capture_output=True, text=True, timeout=10
            )
            return result.returncode == 0
        except Exception as e:
            logger.warning(f"Docker not available: {e}")
            return False

    def scan_dockerfile(self, dockerfile_path: str) -> Dict[str, Any]:
        """Scan Dockerfile for security issues."""
        issues = []

        try:
            with open(dockerfile_path, "r") as f:
                content = f.read()

            lines = content.split("\n")
            for i, line in enumerate(lines, 1):
                line = line.strip()

                # Check for common security issues
                if line.startswith("USER root"):
                    issues.append(
                        {
                            "line": i,
                            "issue": "Running as root user",
                            "severity": "HIGH",
                            "description": "Container should not run as root user",
                        }
                    )

                if "ADD http" in line or "ADD ftp" in line:
                    issues.append(
                        {
                            "line": i,
                            "issue": "Using ADD with remote URLs",
                            "severity": "MEDIUM",
                            "description": "Use COPY instead of ADD for remote URLs",
                        }
                    )

                if line.startswith("RUN") and "curl" in line and "|" in line:
                    issues.append(
                        {
                            "line": i,
                            "issue": "Piping curl to shell",
                            "severity": "HIGH",
                            "description": "Avoid piping curl output directly to shell",
                        }
                    )

        except Exception as e:
            logger.error(f"Error scanning Dockerfile: {e}")
            issues.append(
                {
                    "line": 0,
                    "issue": f"Failed to scan Dockerfile: {e}",
                    "severity": "ERROR",
                    "description": "Could not read or parse Dockerfile",
                }
            )

        return {"file": dockerfile_path, "issues": issues, "total_issues": len(issues)}

    def scan_docker_compose(self, compose_path: str) -> Dict[str, Any]:
        """Scan docker-compose.yml for security issues."""
        issues = []

        try:
            with open(compose_path, "r") as f:
                content = f.read()

            # Basic security checks
            if "privileged: true" in content:
                issues.append(
                    {
                        "issue": "Privileged containers",
                        "severity": "CRITICAL",
                        "description": "Avoid using privileged containers",
                    }
                )

            if "network_mode: host" in content:
                issues.append(
                    {
                        "issue": "Host networking",
                        "severity": "HIGH",
                        "description": "Host networking reduces container isolation",
                    }
                )

            if "security_opt:" in content and "no-new-privileges" not in content:
                issues.append(
                    {
                        "issue": "Missing security options",
                        "severity": "MEDIUM",
                        "description": "Consider adding no-new-privileges security option",
                    }
                )

        except Exception as e:
            logger.error(f"Error scanning docker-compose.yml: {e}")
            issues.append(
                {
                    "issue": f"Failed to scan docker-compose.yml: {e}",
                    "severity": "ERROR",
                    "description": "Could not read or parse docker-compose.yml",
                }
            )

        return {"file": compose_path, "issues": issues, "total_issues": len(issues)}

    def run_security_scan(self) -> Dict[str, Any]:
        """Run comprehensive Docker security scan."""
        logger.info("Starting Docker security scan...")

        results: Dict[str, Any] = {
            "timestamp": str(
                subprocess.run(["date"], capture_output=True, text=True).stdout.strip()
            ),
            "docker_available": self.check_docker_available(),
            "scans": {},
        }

        # Scan Dockerfile
        dockerfile_path = self.project_root / "Dockerfile"
        if dockerfile_path.exists():
            results["scans"]["dockerfile"] = self.scan_dockerfile(str(dockerfile_path))
        else:
            logger.warning("Dockerfile not found")
            results["scans"]["dockerfile"] = {
                "file": "Dockerfile",
                "issues": [{"issue": "Dockerfile not found", "severity": "INFO"}],
                "total_issues": 0,
            }

        # Scan docker-compose.yml
        compose_path = self.project_root / "docker-compose.yml"
        if compose_path.exists():
            results["scans"]["docker_compose"] = self.scan_docker_compose(
                str(compose_path)
            )
        else:
            logger.warning("docker-compose.yml not found")
            results["scans"]["docker_compose"] = {
                "file": "docker-compose.yml",
                "issues": [
                    {"issue": "docker-compose.yml not found", "severity": "INFO"}
                ],
                "total_issues": 0,
            }

        # Summary
        scans_dict = results["scans"]
        total_issues = sum(scan.get("total_issues", 0) for scan in scans_dict.values())
        results["summary"] = {
            "total_issues": total_issues,
            "files_scanned": len(scans_dict),
            "status": "PASSED" if total_issues == 0 else "ISSUES_FOUND",
        }

        return results

    def save_report(self, results: Dict[str, Any]) -> None:
        """Save scan results to report file."""
        report_path = self.reports_dir / "docker_security_scan.json"

        try:
            with open(report_path, "w") as f:
                json.dump(results, f, indent=2)
            logger.info(f"Docker security scan report saved to: {report_path}")
        except Exception as e:
            logger.error(f"Failed to save report: {e}")


def main():
    """Main function."""
    scanner = DockerSecurityScanner()
    results = scanner.run_security_scan()
    scanner.save_report(results)

    # Print summary
    print(f"\nDocker Security Scan Summary:")
    print(f"Files scanned: {results['summary']['files_scanned']}")
    print(f"Total issues: {results['summary']['total_issues']}")
    print(f"Status: {results['summary']['status']}")

    # Exit with appropriate code
    if results["summary"]["total_issues"] > 0:
        high_severity_issues = sum(
            1
            for scan in results["scans"].values()
            for issue in scan.get("issues", [])
            if issue.get("severity") in ["HIGH", "CRITICAL"]
        )
        if high_severity_issues > 0:
            logger.warning(
                f"Found {high_severity_issues} high/critical severity issues"
            )
            sys.exit(1)

    sys.exit(0)


if __name__ == "__main__":
    main()
