#!/usr/bin/env python3
"""
Analyze application completeness and identify missing features.
This script works with the autonomous system to complete the A1Betting application.
"""

import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AppCompletenessAnalyzer:
    """Analyze what features need to be completed in the application."""

    def __init__(self):
        self.project_root = Path.cwd()
        self.analysis_report = {
            "timestamp": str(datetime.now()),
            "completion_status": {},
            "missing_features": [],
            "recommendations": [],
        }

    def analyze_authentication_system(self) -> Dict[str, Any]:
        """Analyze authentication system completeness."""
        auth_files = [
            "backend/auth.py",
            "backend/models/user.py",
            "frontend/src/auth/AuthContext.jsx",
            "frontend/src/components/Login.jsx",
            "frontend/src/components/Register.jsx",
        ]

        missing_files = []
        existing_files = []

        for file_path in auth_files:
            full_path = self.project_root / file_path
            if not full_path.exists():
                missing_files.append(file_path)
            else:
                existing_files.append(file_path)

        # Check if backend has any auth-related code
        backend_files = list((self.project_root / "backend").glob("**/*.py"))
        has_auth_logic = False

        for file_path in backend_files:
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read().lower()
                    if any(
                        keyword in content
                        for keyword in ["jwt", "token", "auth", "login", "user"]
                    ):
                        has_auth_logic = True
                        break
            except:
                continue

        return {
            "status": "incomplete" if missing_files else "complete",
            "missing_files": missing_files,
            "existing_files": existing_files,
            "has_auth_logic": has_auth_logic,
            "priority": "critical",
        }

    def analyze_api_endpoints(self) -> Dict[str, Any]:
        """Analyze API endpoint completeness."""
        backend_main = self.project_root / "backend" / "main.py"
        simple_backend = self.project_root / "backend" / "simple_healthy_backend.py"

        api_files = []
        if backend_main.exists():
            api_files.append(backend_main)
        if simple_backend.exists():
            api_files.append(simple_backend)

        if not api_files:
            return {
                "status": "missing",
                "priority": "critical",
                "missing_files": ["backend/main.py"],
            }

        required_endpoints = [
            "/auth/login",
            "/auth/register",
            "/api/bets",
            "/api/predictions",
            "/api/user/profile",
        ]

        found_endpoints = []
        missing_endpoints = []

        for api_file in api_files:
            try:
                with open(api_file, "r", encoding="utf-8") as f:
                    content = f.read()

                    for endpoint in required_endpoints:
                        if (
                            endpoint in content
                            or endpoint.replace("/api/", "/").replace("/auth/", "/")
                            in content
                        ):
                            if endpoint not in found_endpoints:
                                found_endpoints.append(endpoint)
            except:
                continue

        for endpoint in required_endpoints:
            if endpoint not in found_endpoints:
                missing_endpoints.append(endpoint)

        return {
            "status": "incomplete" if missing_endpoints else "complete",
            "missing_endpoints": missing_endpoints,
            "found_endpoints": found_endpoints,
            "priority": "high",
        }

    def analyze_frontend_components(self) -> Dict[str, Any]:
        """Analyze frontend component completeness."""
        frontend_src = self.project_root / "frontend" / "src"

        if not frontend_src.exists():
            return {
                "status": "missing",
                "priority": "critical",
                "missing_directory": "frontend/src",
            }

        required_components = [
            "frontend/src/components/Dashboard.jsx",
            "frontend/src/components/BettingInterface.jsx",
            "frontend/src/components/UserProfile.jsx",
            "frontend/src/components/PredictionDisplay.jsx",
            "frontend/src/components/Login.jsx",
            "frontend/src/components/Register.jsx",
        ]

        missing_components = []
        existing_components = []

        for component in required_components:
            full_path = self.project_root / component
            if not full_path.exists():
                missing_components.append(component)
            else:
                existing_components.append(component)

        # Check what components actually exist
        actual_components = []
        if (frontend_src / "components").exists():
            for comp_file in (frontend_src / "components").glob("*.jsx"):
                actual_components.append(str(comp_file.relative_to(self.project_root)))

        return {
            "status": "incomplete" if missing_components else "complete",
            "missing_components": missing_components,
            "existing_components": existing_components,
            "actual_components": actual_components,
            "priority": "high",
        }

    def analyze_database_models(self) -> Dict[str, Any]:
        """Analyze database model completeness."""
        models_dir = self.project_root / "backend" / "models"

        if not models_dir.exists():
            return {
                "status": "missing",
                "priority": "high",
                "missing_directory": "backend/models",
            }

        required_models = ["user.py", "bet.py", "prediction.py", "match.py"]

        missing_models = []
        existing_models = []

        for model in required_models:
            model_path = models_dir / model
            if not model_path.exists():
                missing_models.append(f"backend/models/{model}")
            else:
                existing_models.append(f"backend/models/{model}")

        # Check what models actually exist
        actual_models = []
        for model_file in models_dir.glob("*.py"):
            if model_file.name != "__init__.py":
                actual_models.append(str(model_file.relative_to(self.project_root)))

        return {
            "status": "incomplete" if missing_models else "complete",
            "missing_models": missing_models,
            "existing_models": existing_models,
            "actual_models": actual_models,
            "priority": "high",
        }

    def run_analysis(self) -> Dict[str, Any]:
        """Run complete application analysis."""
        logger.info("🔍 Starting application completeness analysis...")

        # Analyze different aspects
        self.analysis_report["completion_status"][
            "authentication"
        ] = self.analyze_authentication_system()
        self.analysis_report["completion_status"][
            "api_endpoints"
        ] = self.analyze_api_endpoints()
        self.analysis_report["completion_status"][
            "frontend_components"
        ] = self.analyze_frontend_components()
        self.analysis_report["completion_status"][
            "database_models"
        ] = self.analyze_database_models()

        # Generate recommendations
        self._generate_recommendations()

        # Calculate overall completion percentage
        self._calculate_completion_percentage()

        # Save report
        reports_dir = self.project_root / "automation" / "reports"
        reports_dir.mkdir(exist_ok=True)

        with open(reports_dir / "app_completeness.json", "w") as f:
            json.dump(self.analysis_report, f, indent=2)

        logger.info("✅ Application completeness analysis completed")
        return self.analysis_report

    def _calculate_completion_percentage(self):
        """Calculate overall completion percentage."""
        total_components = len(self.analysis_report["completion_status"])
        completed_components = sum(
            1
            for comp in self.analysis_report["completion_status"].values()
            if comp["status"] == "complete"
        )

        percentage = (
            (completed_components / total_components) * 100
            if total_components > 0
            else 0
        )
        self.analysis_report["completion_percentage"] = round(percentage, 2)

    def _generate_recommendations(self):
        """Generate recommendations based on analysis."""
        recommendations = []

        for component, analysis in self.analysis_report["completion_status"].items():
            if analysis["status"] == "incomplete" or analysis["status"] == "missing":
                if component == "authentication":
                    recommendations.append(
                        {
                            "priority": "critical",
                            "action": "implement_auth_system",
                            "description": "Implement complete authentication system with JWT tokens",
                            "estimated_time": "2-4 hours",
                        }
                    )
                elif component == "api_endpoints":
                    recommendations.append(
                        {
                            "priority": "high",
                            "action": "complete_api_endpoints",
                            "description": "Complete missing API endpoints for full functionality",
                            "estimated_time": "1-3 hours",
                        }
                    )
                elif component == "frontend_components":
                    recommendations.append(
                        {
                            "priority": "high",
                            "action": "complete_frontend_components",
                            "description": "Complete missing React components for user interface",
                            "estimated_time": "3-6 hours",
                        }
                    )
                elif component == "database_models":
                    recommendations.append(
                        {
                            "priority": "high",
                            "action": "complete_database_models",
                            "description": "Complete missing database models and relationships",
                            "estimated_time": "1-2 hours",
                        }
                    )

        self.analysis_report["recommendations"] = recommendations


if __name__ == "__main__":
    analyzer = AppCompletenessAnalyzer()
    report = analyzer.run_analysis()

    print("🔍 APPLICATION COMPLETENESS ANALYSIS")
    print("=" * 50)
    print(f"📊 Overall Completion: {report['completion_percentage']}%")
    print()

    for component, status in report["completion_status"].items():
        status_icon = "✅" if status["status"] == "complete" else "❌"
        print(
            f"{status_icon} {component.title().replace('_', ' ')}: {status['status']}"
        )

        # Show details
        if "missing_files" in status and status["missing_files"]:
            print(f"   Missing files: {', '.join(status['missing_files'])}")
        if "missing_endpoints" in status and status["missing_endpoints"]:
            print(f"   Missing endpoints: {', '.join(status['missing_endpoints'])}")
        if "missing_components" in status and status["missing_components"]:
            print(f"   Missing components: {', '.join(status['missing_components'])}")
        if "missing_models" in status and status["missing_models"]:
            print(f"   Missing models: {', '.join(status['missing_models'])}")

    if report["recommendations"]:
        print("\n📋 PRIORITY RECOMMENDATIONS:")
        for i, rec in enumerate(report["recommendations"], 1):
            priority_icon = "🔥" if rec["priority"] == "critical" else "⚡"
            print(f"{priority_icon} {i}. {rec['description']}")
            print(
                f"      Priority: {rec['priority'].title()} | Est. Time: {rec['estimated_time']}"
            )

    print(f"\n📄 Full report saved to: automation/reports/app_completeness.json")
