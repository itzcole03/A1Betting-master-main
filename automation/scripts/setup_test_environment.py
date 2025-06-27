#!/usr/bin/env python3
"""
Setup Test Environment Script
Prepares the testing environment for comprehensive automation testing.
"""

import logging
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Dict, List, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class TestEnvironmentSetup:
    """Setup and configure test environment."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.test_env_ready = False
        self.errors = []
        
    def setup_directories(self) -> bool:
        """Create necessary test directories."""
        try:
            directories = [
                'automation/reports',
                'automation/logs',
                'test_data/fixtures',
                'test_data/mocks',
                'test_data/output',
                'backend/tests/unit',
                'backend/tests/integration',
                'frontend/tests/unit',
                'frontend/tests/integration',
                'frontend/tests/e2e'
            ]
            
            for directory in directories:
                Path(directory).mkdir(parents=True, exist_ok=True)
                logger.info(f"Created directory: {directory}")
                
            return True
            
        except Exception as e:
            logger.error(f"Failed to setup directories: {e}")
            self.errors.append(f"Directory setup failed: {e}")
            return False
    
    def check_dependencies(self) -> bool:
        """Check if required dependencies are available."""
        try:
            required_tools = {
                'python': ['python', '--version'],
                'node': ['node', '--version'],
                'npm': ['npm', '--version'],
                'docker': ['docker', '--version'],
                'git': ['git', '--version']
            }
            
            missing_tools = []
            
            for tool, command in required_tools.items():
                try:
                    result = subprocess.run(
                        command,
                        capture_output=True,
                        text=True,
                        check=True,
                        shell=True  # Add shell=True for Windows compatibility
                    )
                    logger.info(f"{tool} version: {result.stdout.strip()}")
                except (subprocess.CalledProcessError, FileNotFoundError):
                    missing_tools.append(tool)
                    logger.error(f"Missing required tool: {tool}")
            
            if missing_tools:
                self.errors.append(f"Missing tools: {', '.join(missing_tools)}")
                return False
                
            return True
            
        except Exception as e:
            logger.error(f"Dependency check failed: {e}")
            self.errors.append(f"Dependency check failed: {e}")
            return False
    
    def setup_python_environment(self) -> bool:
        """Setup Python virtual environment and install dependencies."""
        try:
            # Check if backend requirements exist
            backend_requirements = self.project_root / 'backend' / 'requirements.txt'
            if backend_requirements.exists():
                logger.info("Installing backend Python dependencies...")
                result = subprocess.run([
                    'pip', 'install', '-r', str(backend_requirements)
                ], capture_output=True, text=True)
                
                if result.returncode != 0:
                    logger.warning(f"Backend dependency installation warning: {result.stderr}")
                else:
                    logger.info("Backend dependencies installed successfully")
            
            # Install test dependencies
            test_dependencies = [
                'pytest>=7.0.0',
                'pytest-cov>=4.0.0',
                'pytest-asyncio>=0.21.0',
                'pytest-mock>=3.10.0',
                'factory-boy>=3.2.0',
                'faker>=18.0.0'
            ]
            
            for dep in test_dependencies:
                try:
                    subprocess.run([
                        'pip', 'install', dep
                    ], check=True, capture_output=True)
                    logger.info(f"Installed: {dep}")
                except subprocess.CalledProcessError as e:
                    logger.warning(f"Could not install {dep}: {e}")
            
            return True
            
        except Exception as e:
            logger.error(f"Python environment setup failed: {e}")
            self.errors.append(f"Python environment setup failed: {e}")
            return False
    
    def setup_node_environment(self) -> bool:
        """Setup Node.js environment and install dependencies."""
        try:
            frontend_dir = self.project_root / 'frontend'
            if not frontend_dir.exists():
                logger.warning("Frontend directory not found")
                return True
            
            package_json = frontend_dir / 'package.json'
            if package_json.exists():
                logger.info("Installing frontend dependencies...")
                result = subprocess.run([
                    'npm', 'install'
                ], cwd=frontend_dir, capture_output=True, text=True, shell=True)
                
                if result.returncode != 0:
                    logger.warning(f"Frontend dependency installation warning: {result.stderr}")
                else:
                    logger.info("Frontend dependencies installed successfully")
                
                # Install additional test dependencies
                test_deps = [
                    '@testing-library/react',
                    '@testing-library/jest-dom',
                    '@testing-library/user-event',
                    'jest-environment-jsdom'
                ]
                
                for dep in test_deps:
                    try:
                        subprocess.run([
                            'npm', 'install', '--save-dev', dep
                        ], cwd=frontend_dir, check=True, capture_output=True, shell=True)
                        logger.info(f"Installed frontend test dependency: {dep}")
                    except subprocess.CalledProcessError:
                        logger.warning(f"Could not install {dep}")
            
            return True
            
        except Exception as e:
            logger.error(f"Node.js environment setup failed: {e}")
            self.errors.append(f"Node.js environment setup failed: {e}")
            return False
    
    def setup_test_database(self) -> bool:
        """Setup test database configuration."""
        try:
            # Create test database configuration
            test_db_config = {
                'mongodb': {
                    'test_database': 'a1betting_test',
                    'host': 'localhost',
                    'port': 27017
                },
                'redis': {
                    'test_database': 1,
                    'host': 'localhost', 
                    'port': 6379
                }
            }
            
            # Create test configuration file
            test_config_path = self.project_root / 'test_config.json'
            import json
            with open(test_config_path, 'w') as f:
                json.dump(test_db_config, f, indent=2)
            
            logger.info("Test database configuration created")
            return True
            
        except Exception as e:
            logger.error(f"Test database setup failed: {e}")
            self.errors.append(f"Test database setup failed: {e}")
            return False
    
    def check_services(self) -> bool:
        """Check if required services are running."""
        try:
            services_status = {}
            
            # Check Redis
            try:
                import redis
                r = redis.Redis(host='localhost', port=6379, db=1)
                r.ping()
                services_status['redis'] = 'running'
                logger.info("Redis service is running")
            except Exception:
                services_status['redis'] = 'not_running'
                logger.warning("Redis service is not running")
            
            # Check MongoDB
            try:
                import pymongo
                client = pymongo.MongoClient('localhost', 27017, serverSelectionTimeoutMS=2000)
                client.server_info()
                services_status['mongodb'] = 'running'
                logger.info("MongoDB service is running")
            except Exception:
                services_status['mongodb'] = 'not_running'
                logger.warning("MongoDB service is not running")
            
            # Save service status
            status_file = self.project_root / 'automation' / 'reports' / 'test_services_status.json'
            import json
            with open(status_file, 'w') as f:
                json.dump(services_status, f, indent=2)
            
            return True
            
        except Exception as e:
            logger.error(f"Service check failed: {e}")
            self.errors.append(f"Service check failed: {e}")
            return False
    
    def cleanup_previous_test_data(self) -> bool:
        """Clean up previous test data and reports."""
        try:
            cleanup_paths = [
                'automation/reports/*.json',
                'automation/reports/*.html',
                'automation/reports/*.xml',
                'test_data/output/*',
                '.pytest_cache',
                'htmlcov',
                'coverage.xml',
                '.coverage'
            ]
            
            import glob
            for pattern in cleanup_paths:
                files = glob.glob(str(self.project_root / pattern))
                for file_path in files:
                    try:
                        if os.path.isfile(file_path):
                            os.remove(file_path)
                        elif os.path.isdir(file_path):
                            import shutil
                            shutil.rmtree(file_path)
                        logger.info(f"Cleaned up: {file_path}")
                    except Exception as e:
                        logger.warning(f"Could not clean up {file_path}: {e}")
            
            return True
            
        except Exception as e:
            logger.error(f"Cleanup failed: {e}")
            self.errors.append(f"Cleanup failed: {e}")
            return False
    
    def run_setup(self) -> bool:
        """Run complete test environment setup."""
        logger.info("Starting test environment setup...")
        
        setup_steps = [
            ("Creating directories", self.setup_directories),
            ("Checking dependencies", self.check_dependencies),
            ("Setting up Python environment", self.setup_python_environment),
            ("Setting up Node.js environment", self.setup_node_environment),
            ("Setting up test database", self.setup_test_database),
            ("Checking services", self.check_services),
            ("Cleaning up previous test data", self.cleanup_previous_test_data)
        ]
        
        success_count = 0
        for step_name, step_func in setup_steps:
            logger.info(f"Running: {step_name}")
            try:
                if step_func():
                    success_count += 1
                    logger.info(f"✓ {step_name} completed successfully")
                else:
                    logger.error(f"✗ {step_name} failed")
            except Exception as e:
                logger.error(f"✗ {step_name} failed with exception: {e}")
                self.errors.append(f"{step_name}: {e}")
        
        self.test_env_ready = success_count == len(setup_steps)
        
        # Generate setup report
        self.generate_setup_report(success_count, len(setup_steps))
        
        if self.test_env_ready:
            logger.info("Test environment setup completed successfully!")
            return True
        else:
            logger.error("Test environment setup completed with errors!")
            return False
    
    def generate_setup_report(self, success_count: int, total_steps: int):
        """Generate test environment setup report."""
        try:
            report = {
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
                'environment_ready': self.test_env_ready,
                'setup_steps_completed': success_count,
                'total_setup_steps': total_steps,
                'success_rate': (success_count / total_steps) * 100,
                'errors': self.errors,
                'recommendations': []
            }
            
            if not self.test_env_ready:
                report['recommendations'].extend([
                    "Check that all required services (MongoDB, Redis) are running",
                    "Ensure all dependencies are properly installed",
                    "Review error logs for specific issues"
                ])
            
            # Save report
            report_file = self.project_root / 'automation' / 'reports' / 'test_environment_setup.json'
            import json
            with open(report_file, 'w') as f:
                json.dump(report, f, indent=2)
            
            logger.info(f"Setup report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate setup report: {e}")

def main():
    """Main execution function."""
    setup = TestEnvironmentSetup()
    success = setup.run_setup()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
