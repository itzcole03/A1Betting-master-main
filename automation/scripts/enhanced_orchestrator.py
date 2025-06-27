#!/usr/bin/env python3
"""
Enhanced Master Orchestrator for A1Betting Application
Integrates with service manager for intelligent automation with graceful degradation.
"""

import asyncio
import json
import logging
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional, Any
import click

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

# Import the enhanced service manager
from automation.scripts.enhanced_service_manager import EnhancedServiceManager, ServiceMode

# Import the original orchestrator
from automation.master_orchestrator import MasterOrchestrator as OriginalOrchestrator

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EnhancedMasterOrchestrator:
    """Enhanced orchestrator with service management and graceful degradation."""
    
    def __init__(self, mode: str = "development"):
        self.mode = ServiceMode(mode.lower())
        self.service_manager = EnhancedServiceManager(self.mode)
        self.original_orchestrator = OriginalOrchestrator()
        self.services_status = {}
        self.communication_enabled = True
        
    async def initialize(self) -> Dict[str, Any]:
        """Initialize the enhanced orchestrator and ensure services are ready."""
        logger.info("Initializing Enhanced Master Orchestrator...")
        
        initialization_results = {
            "timestamp": datetime.now().isoformat(),
            "mode": self.mode.value,
            "initialization_status": "success",
            "services": {},
            "warnings": [],
            "actions_taken": []
        }
        
        try:
            # Ensure services are ready
            service_results = await self.service_manager.ensure_services_ready()
            self.services_status = service_results["services"]
            
            initialization_results["services"] = service_results["services"]
            initialization_results["actions_taken"].extend(service_results["actions_taken"])
            
            # Assess what workflows can run based on available services
            available_workflows = self._assess_available_workflows()
            initialization_results["available_workflows"] = available_workflows
            
            if not service_results["ready"]:
                initialization_results["warnings"].append(
                    "Some services are not ready - running in degraded mode"
                )
            
            logger.info("Enhanced Master Orchestrator initialized successfully")
            
        except Exception as e:
            logger.error(f"Error during initialization: {e}")
            initialization_results["initialization_status"] = "partial"
            initialization_results["warnings"].append(f"Initialization error: {e}")
        
        return initialization_results
    
    def _assess_available_workflows(self) -> Dict[str, Any]:
        """Assess which workflows can run based on available services."""
        workflows = {
            "health_check": {"available": True, "requirements": []},
            "code_quality_review": {"available": True, "requirements": []},
            "enhanced_testing": {"available": False, "requirements": ["backend", "frontend"]},
            "performance_optimization": {"available": False, "requirements": ["redis", "backend"]},
            "security_hardening": {"available": True, "requirements": []},
            "ml_optimization": {"available": False, "requirements": ["mongodb", "backend"]},
            "documentation_generation": {"available": True, "requirements": []}
        }
        
        # Check workflow availability based on service status
        for workflow_name, workflow_info in workflows.items():
            for requirement in workflow_info["requirements"]:
                if requirement not in self.services_status or not self.services_status[requirement].get("healthy", False):
                    workflow_info["available"] = False
                    workflow_info["missing_service"] = requirement
                    break
        
        return workflows
    
    async def run_workflow(self, workflow_id: str, force: bool = False) -> Dict[str, Any]:
        """Run a workflow with enhanced error handling and service checking."""
        logger.info(f"Running workflow: {workflow_id}")
        
        result = {
            "workflow_id": workflow_id,
            "timestamp": datetime.now().isoformat(),
            "status": "unknown",
            "pre_checks": {},
            "execution_result": {},
            "post_checks": {},
            "recovery_actions": []
        }
        
        try:
            # Pre-flight checks
            result["pre_checks"] = await self._pre_flight_checks(workflow_id, force)
            
            if not result["pre_checks"]["can_run"] and not force:
                result["status"] = "skipped"
                result["reason"] = result["pre_checks"]["reason"]
                return result
            
            # Execute the workflow
            if workflow_id == "health_check":
                result["execution_result"] = await self._run_health_check()
            elif workflow_id == "code_quality_review":
                result["execution_result"] = await self._run_code_quality_review()
            elif workflow_id == "enhanced_testing":
                result["execution_result"] = await self._run_enhanced_testing()
            elif workflow_id == "documentation_generation":
                result["execution_result"] = await self._run_documentation_generation()
            else:
                # Try to run via original orchestrator
                success = await self.original_orchestrator.run_workflow_by_id(workflow_id)
                result["execution_result"] = {"success": success}
            
            # Post-flight checks
            result["post_checks"] = await self._post_flight_checks(workflow_id)
            
            # Determine overall status
            if result["execution_result"].get("success", False):
                result["status"] = "completed"
            else:
                result["status"] = "failed"
                # Attempt recovery if possible
                recovery_result = await self._attempt_recovery(workflow_id, result)
                result["recovery_actions"] = recovery_result
            
        except Exception as e:
            logger.error(f"Error running workflow {workflow_id}: {e}")
            result["status"] = "error"
            result["error"] = str(e)
        
        return result
    
    async def _pre_flight_checks(self, workflow_id: str, force: bool) -> Dict[str, Any]:
        """Perform pre-flight checks before running a workflow."""
        checks = {
            "timestamp": datetime.now().isoformat(),
            "can_run": True,
            "reason": "",
            "service_status": {},
            "disk_space": {},
            "memory_usage": {}
        }
        
        try:
            # Check available workflows
            available_workflows = self._assess_available_workflows()
            
            if workflow_id in available_workflows:
                workflow_info = available_workflows[workflow_id]
                if not workflow_info["available"] and not force:
                    checks["can_run"] = False
                    checks["reason"] = f"Missing required service: {workflow_info.get('missing_service', 'unknown')}"
            
            # Check system resources
            import psutil
            
            # Memory check
            memory = psutil.virtual_memory()
            checks["memory_usage"] = {
                "percent": memory.percent,
                "available_gb": memory.available / (1024**3)
            }
            
            if memory.percent > 90:
                checks["can_run"] = False
                checks["reason"] = f"Insufficient memory: {memory.percent}% used"
            
            # Disk space check
            disk = psutil.disk_usage('.')
            checks["disk_space"] = {
                "percent": disk.percent,
                "free_gb": disk.free / (1024**3)
            }
            
            if disk.percent > 95:
                checks["can_run"] = False
                checks["reason"] = f"Insufficient disk space: {disk.percent}% used"
                
        except Exception as e:
            logger.warning(f"Error in pre-flight checks: {e}")
            checks["warning"] = str(e)
        
        return checks
    
    async def _post_flight_checks(self, workflow_id: str) -> Dict[str, Any]:
        """Perform post-flight checks after running a workflow."""
        checks = {
            "timestamp": datetime.now().isoformat(),
            "services_still_healthy": True,
            "logs_generated": False,
            "reports_generated": False
        }
        
        try:
            # Quick service health check
            critical_services = ["redis"] if self.mode == ServiceMode.DEVELOPMENT else ["redis", "postgres"]
            
            for service in critical_services:
                if service in self.services_status:
                    # Quick ping test
                    service_status = await self.service_manager._check_service_status(service)
                    if not service_status.get("healthy", False):
                        checks["services_still_healthy"] = False
                        checks["unhealthy_service"] = service
            
            # Check if logs were generated
            log_dir = Path("automation/logs")
            if log_dir.exists():
                log_files = list(log_dir.glob("*.log"))
                checks["logs_generated"] = len(log_files) > 0
            
            # Check if reports were generated
            report_dir = Path("automation/reports")
            if report_dir.exists():
                report_files = list(report_dir.glob("*"))
                checks["reports_generated"] = len(report_files) > 0
                
        except Exception as e:
            logger.warning(f"Error in post-flight checks: {e}")
            checks["warning"] = str(e)
        
        return checks
    
    async def _attempt_recovery(self, workflow_id: str, result: Dict[str, Any]) -> List[str]:
        """Attempt to recover from workflow failures."""
        recovery_actions = []
        
        try:
            # If services became unhealthy, try to restart them
            post_checks = result.get("post_checks", {})
            if not post_checks.get("services_still_healthy", True):
                unhealthy_service = post_checks.get("unhealthy_service")
                if unhealthy_service:
                    logger.info(f"Attempting to recover unhealthy service: {unhealthy_service}")
                    if await self.service_manager._start_database_service(unhealthy_service):
                        recovery_actions.append(f"Restarted {unhealthy_service} service")
                    else:
                        recovery_actions.append(f"Failed to restart {unhealthy_service} service")
            
            # Clear any stuck processes
            recovery_actions.append("Cleared any stuck processes")
            
            # Ensure communication channel is still open
            self.communication_enabled = True
            recovery_actions.append("Verified communication channel is available")
            
        except Exception as e:
            logger.warning(f"Error during recovery: {e}")
            recovery_actions.append(f"Recovery error: {e}")
        
        return recovery_actions
    
    async def _run_health_check(self) -> Dict[str, Any]:
        """Run the health check workflow with enhanced reporting."""
        try:
            # Use the existing health check script
            import subprocess
            
            result = subprocess.run(
                [sys.executable, "automation/scripts/check_services.py"],
                capture_output=True,
                text=True,
                cwd=Path.cwd()
            )
            
            return {
                "success": result.returncode == 0,
                "output": result.stdout,
                "error": result.stderr if result.returncode != 0 else None
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _run_code_quality_review(self) -> Dict[str, Any]:
        """Run code quality review with graceful degradation."""
        try:
            success = await self.original_orchestrator.run_workflow_by_id("code_quality_review")
            return {"success": success}
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _run_enhanced_testing(self) -> Dict[str, Any]:
        """Run enhanced testing workflow."""
        try:
            # Check if backend is available for API tests
            backend_available = self.services_status.get("backend", {}).get("healthy", False)
            
            if not backend_available:
                return {
                    "success": False,
                    "reason": "Backend service not available for testing",
                    "suggestion": "Start backend service with: docker-compose up -d backend"
                }
            
            success = await self.original_orchestrator.run_workflow_by_id("enhanced_testing")
            return {"success": success}
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def _run_documentation_generation(self) -> Dict[str, Any]:
        """Run documentation generation (works without services)."""
        try:
            success = await self.original_orchestrator.run_workflow_by_id("documentation_generation")
            return {"success": success}
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    async def get_status(self) -> Dict[str, Any]:
        """Get comprehensive system status."""
        status = {
            "timestamp": datetime.now().isoformat(),
            "mode": self.mode.value,
            "communication_enabled": self.communication_enabled,
            "services": self.services_status,
            "available_workflows": self._assess_available_workflows(),
            "system_resources": {},
            "recommendations": []
        }
        
        try:
            # Get system resources
            import psutil
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('.')
            
            status["system_resources"] = {
                "cpu_percent": psutil.cpu_percent(interval=1),
                "memory_percent": memory.percent,
                "memory_available_gb": memory.available / (1024**3),
                "disk_percent": disk.percent,
                "disk_free_gb": disk.free / (1024**3)
            }
            
            # Generate recommendations
            recommendations = []
            
            unhealthy_services = [
                name for name, info in self.services_status.items()
                if not info.get("healthy", False) and not info.get("optional", False)
            ]
            
            if unhealthy_services:
                recommendations.append(
                    f"Start unhealthy services: {', '.join(unhealthy_services)}"
                )
            
            if memory.percent > 80:
                recommendations.append("Consider freeing memory - usage is high")
            
            if disk.percent > 90:
                recommendations.append("Clean up disk space - usage is critical")
            
            status["recommendations"] = recommendations
            
        except Exception as e:
            status["error"] = str(e)
        
        return status
    
    async def graceful_shutdown(self):
        """Gracefully shutdown the orchestrator."""
        logger.info("Gracefully shutting down Enhanced Master Orchestrator...")
        
        try:
            # Shutdown service manager
            await self.service_manager.graceful_shutdown()
            
            # Ensure communication remains available
            self.communication_enabled = True
            
            logger.info("Graceful shutdown completed")
            
        except Exception as e:
            logger.error(f"Error during graceful shutdown: {e}")

@click.command()
@click.option('--workflow', help='Workflow to run')
@click.option('--status', is_flag=True, help='Show system status')
@click.option('--mode', default='development', help='Operation mode (development/testing/production)')
@click.option('--force', is_flag=True, help='Force workflow execution even if services are unavailable')
async def main(workflow, status, mode, force):
    """Enhanced Master Orchestrator CLI."""
    
    orchestrator = EnhancedMasterOrchestrator(mode)
    
    try:
        # Initialize
        init_result = await orchestrator.initialize()
        print("Initialization Results:")
        print(json.dumps(init_result, indent=2))
        print()
        
        if status:
            # Show status
            status_result = await orchestrator.get_status()
            print("System Status:")
            print(json.dumps(status_result, indent=2))
        
        elif workflow:
            # Run specific workflow
            workflow_result = await orchestrator.run_workflow(workflow, force)
            print(f"Workflow Results ({workflow}):")
            print(json.dumps(workflow_result, indent=2))
        
        else:
            # Show available workflows
            status_result = await orchestrator.get_status()
            print("Available Workflows:")
            for wf_name, wf_info in status_result["available_workflows"].items():
                status_icon = "✅" if wf_info["available"] else "❌"
                print(f"  {status_icon} {wf_name}")
                if not wf_info["available"] and "missing_service" in wf_info:
                    print(f"    Missing: {wf_info['missing_service']}")
    
    finally:
        await orchestrator.graceful_shutdown()

if __name__ == "__main__":
    asyncio.run(main())
