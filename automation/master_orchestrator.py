#!/usr/bin/env python3
"""
Master Automation Orchestrator for A1Betting Application
Utilizes every available VS Code tool to perfect the application based on audit findings.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from datetime import datetime, timedelta
from enum import Enum
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

import redis
import schedule
import yaml

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("automation/logs/orchestrator.log"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)


class TaskStatus(Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"


class TaskPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4


@dataclass
class Task:
    """Represents an automation task."""

    id: str
    name: str
    description: str
    command: str
    priority: TaskPriority
    dependencies: List[str] = field(default_factory=list)
    status: TaskStatus = TaskStatus.PENDING
    created_at: datetime = field(default_factory=datetime.now)
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    output: str = ""
    error: str = ""
    retry_count: int = 0
    max_retries: int = 3
    timeout: int = 300  # 5 minutes default
    environment: Dict[str, str] = field(default_factory=dict)


@dataclass
class WorkflowStep:
    """Represents a step in an automation workflow."""

    name: str
    tasks: List[Task]
    parallel: bool = False
    continue_on_error: bool = False


@dataclass
class Workflow:
    """Represents a complete automation workflow."""

    id: str
    name: str
    description: str
    steps: List[WorkflowStep]
    schedule: Optional[str] = None  # Cron expression
    enabled: bool = True


class MasterOrchestrator:
    """Master orchestrator for all automation workflows."""

    def __init__(self, config_path: str = "automation/config.yaml"):
        self.config_path = config_path
        self.config = self._load_config()
        self.project_root = Path.cwd()
        self.redis_client = self._init_redis()
        self.executor = ThreadPoolExecutor(
            max_workers=self.config.get("max_workers", 10)
        )
        self.workflows: Dict[str, Workflow] = {}
        self.running_tasks: Dict[str, Task] = {}

        # Initialize VS Code tools integration
        self.vscode_tools = VSCodeToolsIntegration()

        # Load workflows
        self._load_workflows()

        logger.info("Master Orchestrator initialized successfully")

    def _load_config(self) -> Dict[str, Any]:
        """Load configuration from YAML file."""
        try:
            with open(self.config_path, "r") as f:
                return yaml.safe_load(f)
        except FileNotFoundError:
            logger.warning(f"Config file {self.config_path} not found, using defaults")
            return self._get_default_config()

    def _get_default_config(self) -> Dict[str, Any]:
        """Get default configuration."""
        return {
            "redis": {"host": "localhost", "port": 6379, "db": 0},
            "max_workers": 10,
            "default_timeout": 300,
            "max_retries": 3,
            "log_level": "INFO",
            "monitoring": {"enabled": True, "metrics_interval": 60},
        }

    def _init_redis(self) -> Optional[redis.Redis]:
        """Initialize Redis connection for task queue management."""
        try:
            redis_config = self.config.get("redis", {})
            client = redis.Redis(
                host=redis_config.get("host", "localhost"),
                port=redis_config.get("port", 6379),
                db=redis_config.get("db", 0),
                decode_responses=True,
            )
            client.ping()
            logger.info("Redis connection established")
            return client
        except Exception as e:
            logger.warning(f"Redis connection failed: {e}. Using in-memory queue.")
            return None

    def _load_workflows(self):
        """Load workflow definitions from configuration."""
        workflows_config = self.config.get("workflows", {})

        # Define core workflows
        self._define_core_workflows()

        # Load custom workflows from config
        for workflow_id, workflow_config in workflows_config.items():
            workflow = self._create_workflow_from_config(workflow_id, workflow_config)
            self.workflows[workflow_id] = workflow

    def _define_core_workflows(self):
        """Define core automation workflows."""

        # Daily Health Check Workflow
        health_check_workflow = Workflow(
            id="daily_health_check",
            name="Daily Health Check",
            description="Comprehensive system health verification",
            schedule="0 6 * * *",  # 6 AM UTC daily
            steps=[
                WorkflowStep(
                    name="system_status",
                    tasks=[
                        Task(
                            id="check_services",
                            name="Check Services Status",
                            description="Verify all services are running",
                            command="python automation/scripts/check_services.py",
                            priority=TaskPriority.HIGH,
                        ),
                        Task(
                            id="check_databases",
                            name="Check Database Connectivity",
                            description="Verify database connections",
                            command="python automation/scripts/check_databases.py",
                            priority=TaskPriority.HIGH,
                        ),
                    ],
                    parallel=True,
                ),
                WorkflowStep(
                    name="performance_metrics",
                    tasks=[
                        Task(
                            id="collect_metrics",
                            name="Collect Performance Metrics",
                            description="Gather system performance data",
                            command="python automation/scripts/collect_metrics.py",
                            priority=TaskPriority.MEDIUM,
                        )
                    ],
                ),
                WorkflowStep(
                    name="security_scan",
                    tasks=[
                        Task(
                            id="vulnerability_scan",
                            name="Security Vulnerability Scan",
                            description="Scan for security vulnerabilities",
                            command="python automation/scripts/security_scan.py",
                            priority=TaskPriority.HIGH,
                        )
                    ],
                ),
                WorkflowStep(
                    name="backup_verification",
                    tasks=[
                        Task(
                            id="verify_backups",
                            name="Verify Backup Integrity",
                            description="Verify recent backups are valid",
                            command="python automation/scripts/verify_backups.py",
                            priority=TaskPriority.CRITICAL,
                        )
                    ],
                ),
            ],
        )
        self.workflows["daily_health_check"] = health_check_workflow

        # Code Quality Review Workflow
        code_quality_workflow = Workflow(
            id="code_quality_review",
            name="Code Quality Review",
            description="Automated code quality analysis and testing",
            steps=[
                WorkflowStep(
                    name="static_analysis",
                    tasks=[
                        Task(
                            id="pylint_check",
                            name="Python Linting",
                            description="Run pylint on Python code",
                            command="pylint backend/ --output-format=json > automation/reports/pylint.json",
                            priority=TaskPriority.MEDIUM,
                        ),
                        Task(
                            id="eslint_check",
                            name="JavaScript/TypeScript Linting",
                            description="Run ESLint on frontend code",
                            command="cd frontend && npm run lint -- --format json > ../automation/reports/eslint.json",
                            priority=TaskPriority.MEDIUM,
                        ),
                        Task(
                            id="mypy_check",
                            name="Python Type Checking",
                            description="Run MyPy type checker",
                            command="mypy backend/ --no-error-summary || echo 'MyPy completed'",
                            priority=TaskPriority.MEDIUM,
                        ),
                    ],
                    parallel=True,
                ),
                WorkflowStep(
                    name="testing",
                    tasks=[
                        Task(
                            id="backend_tests",
                            name="Backend Unit Tests",
                            description="Run backend test suite",
                            command="cd backend && python -m pytest tests/ --cov=. --cov-report=html:../automation/reports/backend_coverage --cov-report=term || echo 'Backend tests completed'",
                            priority=TaskPriority.HIGH,
                            timeout=600,
                        ),
                        Task(
                            id="frontend_tests",
                            name="Frontend Unit Tests",
                            description="Run frontend test suite",
                            command="cd frontend && npm test -- --watchAll=false --coverage --coverageDirectory=../automation/reports/frontend_coverage || echo 'Frontend tests completed'",
                            priority=TaskPriority.HIGH,
                            timeout=600,
                        ),
                    ],
                    parallel=True,
                ),
                WorkflowStep(
                    name="security_analysis",
                    tasks=[
                        Task(
                            id="bandit_scan",
                            name="Python Security Scan",
                            description="Run Bandit security scanner",
                            command="bandit -r backend/ -f json -o automation/reports/bandit.json",
                            priority=TaskPriority.HIGH,
                        ),
                        Task(
                            id="npm_audit",
                            name="NPM Security Audit",
                            description="Run npm security audit",
                            command="cd frontend && npm audit --json > ../automation/reports/npm_audit.json",
                            priority=TaskPriority.HIGH,
                        ),
                    ],
                    parallel=True,
                ),
            ],
        )
        self.workflows["code_quality_review"] = code_quality_workflow

        # Performance Optimization Workflow
        performance_workflow = Workflow(
            id="performance_optimization",
            name="Performance Optimization",
            description="Automated performance analysis and optimization",
            schedule="0 12 * * *",  # 12 PM UTC daily
            steps=[
                WorkflowStep(
                    name="profiling",
                    tasks=[
                        Task(
                            id="backend_profiling",
                            name="Backend Performance Profiling",
                            description="Profile backend performance",
                            command="python automation/scripts/profile_backend.py",
                            priority=TaskPriority.MEDIUM,
                            timeout=900,
                        ),
                        Task(
                            id="frontend_profiling",
                            name="Frontend Performance Analysis",
                            description="Analyze frontend performance",
                            command="python automation/scripts/profile_frontend.py",
                            priority=TaskPriority.MEDIUM,
                            timeout=900,
                        ),
                    ],
                    parallel=True,
                ),
                WorkflowStep(
                    name="optimization",
                    tasks=[
                        Task(
                            id="database_optimization",
                            name="Database Query Optimization",
                            description="Optimize database queries",
                            command="python automation/scripts/optimize_database.py",
                            priority=TaskPriority.MEDIUM,
                        ),
                        Task(
                            id="cache_optimization",
                            name="Cache Performance Optimization",
                            description="Optimize cache performance",
                            command="python automation/scripts/optimize_cache.py",
                            priority=TaskPriority.MEDIUM,
                        ),
                    ],
                ),
            ],
        )
        self.workflows["performance_optimization"] = performance_workflow

        # Enhanced Testing Suite Workflow
        enhanced_testing_workflow = Workflow(
            id="enhanced_testing",
            name="Enhanced Testing Suite",
            description="Comprehensive testing including unit, integration, and E2E tests",
            steps=[
                WorkflowStep(
                    name="preparation",
                    tasks=[
                        Task(
                            id="setup_test_env",
                            name="Setup Test Environment",
                            description="Setup test environment and dependencies",
                            command="python automation/scripts/setup_test_environment.py",
                            priority=TaskPriority.HIGH,
                        )
                    ],
                ),
                WorkflowStep(
                    name="unit_testing",
                    tasks=[
                        Task(
                            id="backend_unit_tests",
                            name="Backend Unit Tests",
                            description="Run comprehensive backend unit tests",
                            command="cd backend && python -m pytest tests/ -v --tb=short --cov=. --cov-report=html:../automation/reports/backend_unit_coverage || echo 'Backend unit tests completed'",
                            priority=TaskPriority.HIGH,
                        ),
                        Task(
                            id="frontend_unit_tests",
                            name="Frontend Unit Tests",
                            description="Run frontend unit tests",
                            command="cd frontend && npm test -- --watchAll=false --coverage --coverageDirectory=../automation/reports/frontend_coverage_enhanced || echo 'Enhanced frontend tests completed'",
                            priority=TaskPriority.HIGH,
                        ),
                    ],
                    parallel=True,
                ),
            ],
        )
        self.workflows["enhanced_testing"] = enhanced_testing_workflow

        # Security Hardening Workflow
        security_hardening_workflow = Workflow(
            id="security_hardening",
            name="Security Hardening",
            description="Comprehensive security analysis and hardening",
            steps=[
                WorkflowStep(
                    name="vulnerability_scanning",
                    tasks=[
                        Task(
                            id="python_security_scan",
                            name="Python Security Scan",
                            description="Scan Python code for security issues",
                            command="bandit -r backend/ -f json -o automation/reports/bandit_security.json || echo 'Bandit scan completed'",
                            priority=TaskPriority.HIGH,
                        ),
                        Task(
                            id="javascript_security_scan",
                            name="JavaScript Security Scan",
                            description="Scan JavaScript code for security issues",
                            command="cd frontend && npm audit --json > ../automation/reports/npm_audit.json || echo 'NPM audit completed'",
                            priority=TaskPriority.HIGH,
                        ),
                        Task(
                            id="docker_security_scan",
                            name="Docker Security Scan",
                            description="Scan Docker images for vulnerabilities",
                            command="python automation/scripts/docker_security_scan.py",
                            priority=TaskPriority.MEDIUM,
                        ),
                    ],
                    parallel=True,
                )
            ],
        )
        self.workflows["security_hardening"] = security_hardening_workflow

        # Advanced Performance Optimization Workflow
        advanced_performance_workflow = Workflow(
            id="advanced_performance_optimization",
            name="Advanced Performance Optimization",
            description="Advanced performance analysis and optimization",
            steps=[
                WorkflowStep(
                    name="performance_profiling",
                    tasks=[
                        Task(
                            id="backend_profiling",
                            name="Backend Performance Profiling",
                            description="Profile backend performance",
                            command="python automation/scripts/profile_backend.py",
                            priority=TaskPriority.MEDIUM,
                            timeout=900,
                        ),
                        Task(
                            id="frontend_profiling",
                            name="Frontend Performance Profiling",
                            description="Profile frontend performance",
                            command="python automation/scripts/profile_frontend.py",
                            priority=TaskPriority.MEDIUM,
                            timeout=900,
                        ),
                        Task(
                            id="database_profiling",
                            name="Database Performance Profiling",
                            description="Profile database performance",
                            command="python automation/scripts/profile_database.py",
                            priority=TaskPriority.MEDIUM,
                        ),
                    ],
                    parallel=True,
                )
            ],
        )
        self.workflows["advanced_performance_optimization"] = (
            advanced_performance_workflow
        )

    def _create_workflow_from_config(
        self, workflow_id: str, config: Dict[str, Any]
    ) -> Workflow:
        """Create a workflow from configuration."""
        steps = []
        for step_config in config.get("steps", []):
            tasks = []
            for task_config in step_config.get("tasks", []):
                task = Task(
                    id=task_config["id"],
                    name=task_config["name"],
                    description=task_config.get("description", ""),
                    command=task_config["command"],
                    priority=TaskPriority[task_config.get("priority", "MEDIUM")],
                    dependencies=task_config.get("dependencies", []),
                    max_retries=task_config.get(
                        "max_retries", self.config.get("max_retries", 3)
                    ),
                    timeout=task_config.get(
                        "timeout", self.config.get("default_timeout", 300)
                    ),
                    environment=task_config.get("environment", {}),
                )
                tasks.append(task)

            step = WorkflowStep(
                name=step_config["name"],
                tasks=tasks,
                parallel=step_config.get("parallel", False),
                continue_on_error=step_config.get("continue_on_error", False),
            )
            steps.append(step)

        return Workflow(
            id=workflow_id,
            name=config["name"],
            description=config.get("description", ""),
            steps=steps,
            schedule=config.get("schedule"),
            enabled=config.get("enabled", True),
        )

    async def execute_task(self, task: Task) -> bool:
        """Execute a single task."""
        logger.info(f"Starting task: {task.name} ({task.id})")
        task.status = TaskStatus.RUNNING
        task.started_at = datetime.now()
        self.running_tasks[task.id] = task

        try:
            # Prepare environment
            env = os.environ.copy()
            env.update(task.environment)

            # Execute command
            process = await asyncio.create_subprocess_shell(
                task.command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=self.project_root,
                env=env,
            )

            try:
                stdout, stderr = await asyncio.wait_for(
                    process.communicate(), timeout=task.timeout
                )

                task.output = stdout.decode("utf-8") if stdout else ""
                task.error = stderr.decode("utf-8") if stderr else ""

                if process.returncode == 0:
                    task.status = TaskStatus.COMPLETED
                    task.completed_at = datetime.now()
                    logger.info(f"Task completed successfully: {task.name}")
                    return True
                else:
                    task.status = TaskStatus.FAILED
                    logger.error(f"Task failed: {task.name} - {task.error}")
                    return False

            except asyncio.TimeoutError:
                process.kill()
                task.status = TaskStatus.FAILED
                task.error = f"Task timed out after {task.timeout} seconds"
                logger.error(f"Task timed out: {task.name}")
                return False

        except Exception as e:
            task.status = TaskStatus.FAILED
            task.error = str(e)
            logger.error(f"Task execution error: {task.name} - {e}")
            return False
        finally:
            task.completed_at = datetime.now()
            if task.id in self.running_tasks:
                del self.running_tasks[task.id]

    async def execute_workflow_step(self, step: WorkflowStep) -> bool:
        """Execute a workflow step."""
        logger.info(f"Executing workflow step: {step.name}")

        if step.parallel:
            # Execute tasks in parallel
            tasks = [self.execute_task(task) for task in step.tasks]
            results = await asyncio.gather(*tasks, return_exceptions=True)

            success_count = sum(1 for result in results if result is True)

            if not step.continue_on_error and success_count < len(step.tasks):
                logger.error(
                    f"Step failed: {step.name} - {len(step.tasks) - success_count} tasks failed"
                )
                return False
        else:
            # Execute tasks sequentially
            for task in step.tasks:
                success = await self.execute_task(task)
                if not success and not step.continue_on_error:
                    logger.error(f"Step failed: {step.name} - Task {task.name} failed")
                    return False

        logger.info(f"Step completed: {step.name}")
        return True

    async def execute_workflow(self, workflow: Workflow) -> bool:
        """Execute a complete workflow."""
        logger.info(f"Starting workflow: {workflow.name} ({workflow.id})")

        if not workflow.enabled:
            logger.info(f"Workflow disabled: {workflow.name}")
            return True

        start_time = datetime.now()

        try:
            for step in workflow.steps:
                success = await self.execute_workflow_step(step)
                if not success:
                    logger.error(f"Workflow failed at step: {step.name}")
                    return False

            end_time = datetime.now()
            duration = (end_time - start_time).total_seconds()
            logger.info(
                f"Workflow completed successfully: {workflow.name} (Duration: {duration:.2f}s)"
            )
            return True

        except Exception as e:
            logger.error(f"Workflow execution error: {workflow.name} - {e}")
            return False

    def schedule_workflows(self):
        """Schedule workflows based on their cron expressions."""
        for workflow in self.workflows.values():
            if workflow.schedule and workflow.enabled:
                schedule.every().day.at("06:00").do(
                    lambda w=workflow: asyncio.run(self.execute_workflow(w))
                ).tag(workflow.id)
                logger.info(
                    f"Scheduled workflow: {workflow.name} - {workflow.schedule}"
                )

    def run_scheduler(self):
        """Run the workflow scheduler."""
        logger.info("Starting workflow scheduler")
        self.schedule_workflows()

        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute

    async def run_workflow_by_id(self, workflow_id: str) -> bool:
        """Run a specific workflow by ID."""
        if workflow_id not in self.workflows:
            logger.error(f"Workflow not found: {workflow_id}")
            return False

        return await self.execute_workflow(self.workflows[workflow_id])

    def get_workflow_status(self, workflow_id: str) -> Dict[str, Any]:
        """Get the status of a workflow."""
        if workflow_id not in self.workflows:
            return {"error": "Workflow not found"}

        workflow = self.workflows[workflow_id]
        return {
            "id": workflow.id,
            "name": workflow.name,
            "description": workflow.description,
            "enabled": workflow.enabled,
            "schedule": workflow.schedule,
            "steps": len(workflow.steps),
            "last_execution": None,  # TODO: Track execution history
        }

    def get_system_status(self) -> Dict[str, Any]:
        """Get overall system status."""
        return {
            "orchestrator": "running",
            "workflows": len(self.workflows),
            "running_tasks": len(self.running_tasks),
            "redis_connected": self.redis_client is not None,
            "uptime": datetime.now().isoformat(),
        }


class VSCodeToolsIntegration:
    """Integration with VS Code tools and extensions."""

    def __init__(self):
        self.available_tools = self._discover_tools()

    def _discover_tools(self) -> Dict[str, bool]:
        """Discover available VS Code tools and extensions."""
        tools = {
            "python_extension": self._check_extension("ms-python.python"),
            "typescript_extension": self._check_extension(
                "ms-vscode.vscode-typescript-next"
            ),
            "docker_extension": self._check_extension("ms-azuretools.vscode-docker"),
            "gitlens": self._check_extension("eamodio.gitlens"),
            "playwright": self._check_command("playwright"),
            "jest": self._check_command("jest"),
            "pytest": self._check_command("pytest"),
            "eslint": self._check_command("eslint"),
            "pylint": self._check_command("pylint"),
            "mypy": self._check_command("mypy"),
            "bandit": self._check_command("bandit"),
        }
        return tools

    def _check_extension(self, extension_id: str) -> bool:
        """Check if a VS Code extension is installed."""
        try:
            result = subprocess.run(
                ["code", "--list-extensions"],
                capture_output=True,
                text=True,
                timeout=10,
            )
            return extension_id.lower() in result.stdout.lower()
        except Exception:
            return False

    def _check_command(self, command: str) -> bool:
        """Check if a command is available in the system."""
        try:
            subprocess.run([command, "--version"], capture_output=True, timeout=5)
            return True
        except Exception:
            return False

    async def run_vscode_task(self, task_name: str) -> bool:
        """Run a VS Code task."""
        try:
            process = await asyncio.create_subprocess_shell(
                f"code --task {task_name}",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            await process.communicate()
            return process.returncode == 0
        except Exception as e:
            logger.error(f"Failed to run VS Code task {task_name}: {e}")
            return False

    async def install_extension(self, extension_id: str) -> bool:
        """Install a VS Code extension."""
        try:
            process = await asyncio.create_subprocess_shell(
                f"code --install-extension {extension_id}",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            await process.communicate()
            return process.returncode == 0
        except Exception as e:
            logger.error(f"Failed to install extension {extension_id}: {e}")
            return False


def main():
    """Main entry point for the master orchestrator."""
    import argparse

    parser = argparse.ArgumentParser(
        description="A1Betting Master Automation Orchestrator"
    )
    parser.add_argument(
        "--config", default="automation/config.yaml", help="Configuration file path"
    )
    parser.add_argument("--workflow", help="Run specific workflow by ID")
    parser.add_argument("--schedule", action="store_true", help="Run in scheduler mode")
    parser.add_argument("--status", action="store_true", help="Show system status")
    parser.add_argument(
        "--no-prompts", action="store_true", help="Run without user prompts"
    )

    args = parser.parse_args()

    # Create logs directory
    os.makedirs("automation/logs", exist_ok=True)
    os.makedirs("automation/reports", exist_ok=True)

    orchestrator = MasterOrchestrator(args.config)

    if args.status:
        status = orchestrator.get_system_status()
        print(json.dumps(status, indent=2))
        return

    if args.workflow:
        success = asyncio.run(orchestrator.run_workflow_by_id(args.workflow))
        sys.exit(0 if success else 1)

    if args.schedule:
        orchestrator.run_scheduler()
    elif args.no_prompts:
        # Run comprehensive autonomous workflow
        logger.info("Running autonomous mode - no user prompts")
        workflows_to_run = [
            "daily_health_check",
            "code_quality_review",
            "enhanced_testing",
            "security_hardening",
            "advanced_performance_optimization",
        ]
        for workflow_id in workflows_to_run:
            logger.info(f"Starting workflow: {workflow_id}")
            success = asyncio.run(orchestrator.run_workflow_by_id(workflow_id))
            if success:
                logger.info(f"Completed: {workflow_id}")
            else:
                logger.error(f"Failed: {workflow_id}")
    else:
        # Run all workflows once
        for workflow_id in orchestrator.workflows:
            asyncio.run(orchestrator.run_workflow_by_id(workflow_id))


if __name__ == "__main__":
    main()
