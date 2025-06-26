#!/usr/bin/env python3
"""
Project setup and initialization script for A1Betting automation system.
Sets up all dependencies, configurations, and initial requirements.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
from pathlib import Path
from typing import List, Dict, Any
import yaml

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ProjectSetup:
    """Handles complete project setup and initialization."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.setup_status = {
            'steps_completed': [],
            'steps_failed': [],
            'warnings': [],
            'recommendations': []
        }
    
    async def setup_all(self):
        """Run complete project setup."""
        logger.info("Starting A1Betting project setup...")
        
        setup_steps = [
            self.create_directories,
            self.setup_python_environment,
            self.setup_node_environment,
            self.install_automation_dependencies,
            self.setup_docker_environment,
            self.initialize_databases,
            self.setup_monitoring,
            self.configure_git_hooks,
            self.setup_vscode_configuration,
            self.validate_installation
        ]
        
        for step in setup_steps:
            try:
                await step()
                self.setup_status['steps_completed'].append(step.__name__)
                logger.info(f"✓ {step.__name__} completed successfully")
            except Exception as e:
                self.setup_status['steps_failed'].append(f"{step.__name__}: {str(e)}")
                logger.error(f"✗ {step.__name__} failed: {e}")
        
        self.generate_setup_report()
    
    async def create_directories(self):
        """Create necessary project directories."""
        directories = [
            'automation/logs',
            'automation/reports',
            'automation/scripts',
            'automation/config',
            'automation/templates',
            'backups/database',
            'backups/files',
            'backups/configs',
            'logs/backend',
            'logs/frontend',
            'logs/monitoring',
            'data/models',
            'data/training',
            'data/cache',
            'monitoring/configs',
            'monitoring/dashboards',
            'docs/api',
            'docs/architecture',
            'docs/user-guides',
            'tests/reports',
            'tests/fixtures',
            'tests/e2e',
            'deploy/staging',
            'deploy/production'
        ]
        
        for directory in directories:
            dir_path = self.project_root / directory
            dir_path.mkdir(parents=True, exist_ok=True)
            
        logger.info(f"Created {len(directories)} project directories")
    
    async def setup_python_environment(self):
        """Setup Python virtual environment and dependencies."""
        # Check Python version
        result = subprocess.run([sys.executable, '--version'], capture_output=True, text=True)
        python_version = result.stdout.strip()
        logger.info(f"Using Python: {python_version}")
        
        if not (3, 8) <= sys.version_info < (4, 0):
            raise Exception("Python 3.8+ required")
        
        # Install backend dependencies
        if (self.project_root / 'backend' / 'requirements.txt').exists():
            subprocess.run([
                sys.executable, '-m', 'pip', 'install', '-r', 
                'backend/requirements.txt'
            ], check=True)
        
        # Install automation dependencies
        if (self.project_root / 'automation' / 'requirements.txt').exists():
            subprocess.run([
                sys.executable, '-m', 'pip', 'install', '-r', 
                'automation/requirements.txt'
            ], check=True)
    
    async def setup_node_environment(self):
        """Setup Node.js environment and frontend dependencies."""
        # Check Node.js version
        try:
            result = subprocess.run(['node', '--version'], capture_output=True, text=True)
            node_version = result.stdout.strip()
            logger.info(f"Using Node.js: {node_version}")
        except FileNotFoundError:
            raise Exception("Node.js not found. Please install Node.js 16+")
        
        # Install frontend dependencies
        frontend_dir = self.project_root / 'frontend'
        if frontend_dir.exists() and (frontend_dir / 'package.json').exists():
            subprocess.run(['npm', 'install'], cwd=frontend_dir, check=True)
            
            # Install Playwright browsers
            subprocess.run(['npx', 'playwright', 'install'], cwd=frontend_dir, check=True)
    
    async def install_automation_dependencies(self):
        """Install automation system dependencies."""
        # Install system-level dependencies
        system_deps = [
            'redis-server',
            'docker',
            'docker-compose'
        ]
        
        missing_deps = []
        for dep in system_deps:
            try:
                subprocess.run([dep, '--version'], capture_output=True, check=True)
            except (FileNotFoundError, subprocess.CalledProcessError):
                missing_deps.append(dep)
        
        if missing_deps:
            self.setup_status['warnings'].append(
                f"Missing system dependencies: {', '.join(missing_deps)}"
            )
            self.setup_status['recommendations'].append(
                "Install missing dependencies using your system package manager"
            )
    
    async def setup_docker_environment(self):
        """Setup Docker environment and containers."""
        try:
            # Check Docker availability
            subprocess.run(['docker', '--version'], capture_output=True, check=True)
            subprocess.run(['docker-compose', '--version'], capture_output=True, check=True)
            
            # Build Docker images
            if (self.project_root / 'docker-compose.yml').exists():
                subprocess.run(['docker-compose', 'build'], check=True)
                logger.info("Docker images built successfully")
        
        except FileNotFoundError:
            self.setup_status['warnings'].append("Docker not available")
        except subprocess.CalledProcessError as e:
            self.setup_status['warnings'].append(f"Docker setup failed: {e}")
    
    async def initialize_databases(self):
        """Initialize databases and run migrations."""
        try:
            # Check MongoDB
            subprocess.run(['mongod', '--version'], capture_output=True, check=True)
            
            # Check Redis
            subprocess.run(['redis-server', '--version'], capture_output=True, check=True)
            
            # Initialize database schema (if scripts exist)
            db_init_script = self.project_root / 'backend' / 'init_database.py'
            if db_init_script.exists():
                subprocess.run([sys.executable, str(db_init_script)], check=True)
        
        except FileNotFoundError:
            self.setup_status['warnings'].append("Database servers not available")
        except subprocess.CalledProcessError as e:
            self.setup_status['warnings'].append(f"Database initialization failed: {e}")
    
    async def setup_monitoring(self):
        """Setup monitoring and logging infrastructure."""
        # Create monitoring configuration
        monitoring_config = {
            'prometheus': {
                'enabled': True,
                'port': 9090,
                'scrape_interval': '15s'
            },
            'grafana': {
                'enabled': True,
                'port': 3001,
                'admin_password': 'admin123'
            },
            'logging': {
                'level': 'INFO',
                'rotation': 'daily',
                'retention_days': 30
            }
        }
        
        config_path = self.project_root / 'monitoring' / 'config.yaml'
        with open(config_path, 'w') as f:
            yaml.dump(monitoring_config, f, default_flow_style=False)
    
    async def configure_git_hooks(self):
        """Setup Git hooks for automated quality checks."""
        git_hooks_dir = self.project_root / '.git' / 'hooks'
        
        if git_hooks_dir.exists():
            # Pre-commit hook
            pre_commit_hook = git_hooks_dir / 'pre-commit'
            pre_commit_content = """#!/bin/bash
# A1Betting pre-commit hook
echo "Running pre-commit checks..."

# Run linting
python -m pylint backend/ --errors-only
cd frontend && npm run lint:check

# Run tests
python -m pytest backend/tests/unit/ -x
cd frontend && npm test -- --watchAll=false --passWithNoTests

echo "Pre-commit checks passed!"
"""
            
            with open(pre_commit_hook, 'w') as f:
                f.write(pre_commit_content)
            
            # Make executable
            os.chmod(pre_commit_hook, 0o755)
    
    async def setup_vscode_configuration(self):
        """Setup VS Code workspace configuration."""
        vscode_dir = self.project_root / '.vscode'
        vscode_dir.mkdir(exist_ok=True)
        
        # Launch configuration
        launch_config = {
            "version": "0.2.0",
            "configurations": [
                {
                    "name": "Debug Backend",
                    "type": "python",
                    "request": "launch",
                    "program": "backend/main.py",
                    "console": "integratedTerminal",
                    "cwd": "${workspaceFolder}",
                    "env": {
                        "PYTHONPATH": "${workspaceFolder}/backend"
                    }
                },
                {
                    "name": "Debug Frontend",
                    "type": "node",
                    "request": "launch",
                    "program": "frontend/src/index.tsx",
                    "cwd": "${workspaceFolder}/frontend",
                    "runtimeExecutable": "npm",
                    "runtimeArgs": ["start"]
                },
                {
                    "name": "Debug Automation",
                    "type": "python",
                    "request": "launch",
                    "program": "automation/master_orchestrator.py",
                    "args": ["--status"],
                    "console": "integratedTerminal",
                    "cwd": "${workspaceFolder}"
                }
            ]
        }
        
        with open(vscode_dir / 'launch.json', 'w') as f:
            json.dump(launch_config, f, indent=2)
        
        # Settings configuration
        settings_config = {
            "python.defaultInterpreterPath": "./venv/bin/python",
            "python.linting.enabled": True,
            "python.linting.pylintEnabled": True,
            "python.formatting.provider": "black",
            "typescript.preferences.importModuleSpecifier": "relative",
            "eslint.workingDirectories": ["frontend"],
            "files.associations": {
                "*.yaml": "yaml",
                "*.yml": "yaml"
            },
            "editor.formatOnSave": True,
            "editor.codeActionsOnSave": {
                "source.organizeImports": True
            }
        }
        
        with open(vscode_dir / 'settings.json', 'w') as f:
            json.dump(settings_config, f, indent=2)
    
    async def validate_installation(self):
        """Validate the complete installation."""
        validation_checks = []
        
        # Check Python packages
        try:
            import requests, yaml, redis, pytest
            validation_checks.append("✓ Python dependencies installed")
        except ImportError as e:
            validation_checks.append(f"✗ Python dependency missing: {e}")
        
        # Check Node packages
        frontend_dir = self.project_root / 'frontend'
        if frontend_dir.exists():
            node_modules = frontend_dir / 'node_modules'
            if node_modules.exists():
                validation_checks.append("✓ Node.js dependencies installed")
            else:
                validation_checks.append("✗ Node.js dependencies not installed")
        
        # Check Docker
        try:
            subprocess.run(['docker', 'ps'], capture_output=True, check=True)
            validation_checks.append("✓ Docker is running")
        except:
            validation_checks.append("✗ Docker not available or not running")
        
        # Check project structure
        required_files = [
            'automation/master_orchestrator.py',
            'automation/config.yaml',
            '.vscode/tasks.json'
        ]
        
        for file_path in required_files:
            if (self.project_root / file_path).exists():
                validation_checks.append(f"✓ {file_path} exists")
            else:
                validation_checks.append(f"✗ {file_path} missing")
        
        logger.info("Installation validation:")
        for check in validation_checks:
            logger.info(f"  {check}")
    
    def generate_setup_report(self):
        """Generate comprehensive setup report."""
        report = {
            'setup_timestamp': str(os.popen('date').read().strip()),
            'project_root': str(self.project_root),
            'python_version': sys.version,
            'steps_completed': self.setup_status['steps_completed'],
            'steps_failed': self.setup_status['steps_failed'],
            'warnings': self.setup_status['warnings'],
            'recommendations': self.setup_status['recommendations']
        }
        
        # Save report
        report_path = self.project_root / 'automation' / 'reports' / 'setup_report.json'
        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2)
        
        # Print summary
        total_steps = len(self.setup_status['steps_completed']) + len(self.setup_status['steps_failed'])
        success_rate = len(self.setup_status['steps_completed']) / total_steps * 100 if total_steps > 0 else 0
        
        print(f"\n{'='*60}")
        print(f"A1Betting Project Setup Complete")
        print(f"{'='*60}")
        print(f"Success Rate: {success_rate:.1f}% ({len(self.setup_status['steps_completed'])}/{total_steps} steps)")
        print(f"Warnings: {len(self.setup_status['warnings'])}")
        print(f"Setup Report: {report_path}")
        
        if self.setup_status['steps_failed']:
            print(f"\nFailed Steps:")
            for failure in self.setup_status['steps_failed']:
                print(f"  ✗ {failure}")
        
        if self.setup_status['warnings']:
            print(f"\nWarnings:")
            for warning in self.setup_status['warnings']:
                print(f"  ⚠ {warning}")
        
        if self.setup_status['recommendations']:
            print(f"\nRecommendations:")
            for rec in self.setup_status['recommendations']:
                print(f"  💡 {rec}")
        
        print(f"\nNext Steps:")
        print(f"  1. Run: python automation/master_orchestrator.py --status")
        print(f"  2. Start services: docker-compose up -d")
        print(f"  3. Run health check: python automation/scripts/check_services.py")
        print(f"  4. Open VS Code and use 'Ctrl+Shift+P' > 'Tasks: Run Task'")

async def main():
    """Main setup execution."""
    setup = ProjectSetup()
    await setup.setup_all()

if __name__ == "__main__":
    asyncio.run(main())
