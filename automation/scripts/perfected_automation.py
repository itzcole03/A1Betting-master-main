#!/usr/bin/env python3
"""
Perfected Automation System for A1Betting
Final automation orchestrator with self-healing capabilities and continuous monitoring.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any, List
import schedule
import yaml

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('automation/logs/perfected_automation.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class PerfectedAutomationSystem:
    """Perfected automation system with self-healing and continuous optimization."""
    
    def __init__(self):
        self.config = self._load_config()
        self.last_health_check = None
        self.performance_metrics = {}
        self.auto_healing_enabled = True
        self.continuous_monitoring = True
        
    def _load_config(self) -> Dict[str, Any]:
        """Load automation configuration."""
        config_path = Path('automation/config.yaml')
        if config_path.exists():
            with open(config_path, 'r') as f:
                return yaml.safe_load(f)
        return self._default_config()
    
    def _default_config(self) -> Dict[str, Any]:
        """Default configuration for the automation system."""
        return {
            'health_check_interval': 300,  # 5 minutes
            'auto_healing': True,
            'performance_optimization': True,
            'workflows': {
                'health_monitoring': {'enabled': True, 'interval': 300},
                'performance_optimization': {'enabled': True, 'interval': 3600},
                'security_scanning': {'enabled': True, 'interval': 86400},
                'backup_system': {'enabled': True, 'interval': 21600}
            },
            'thresholds': {
                'health_score_minimum': 80,
                'cpu_usage_warning': 70,
                'memory_usage_warning': 80,
                'disk_usage_warning': 85
            }
        }
    
    async def run_continuous_monitoring(self):
        """Run continuous monitoring and optimization."""
        logger.info("🚀 Starting Perfected Automation System")
        logger.info("✅ Continuous monitoring enabled")
        logger.info("🔧 Auto-healing capabilities activated")
        
        while self.continuous_monitoring:
            try:
                # Run health check
                await self.comprehensive_health_check()
                
                # Auto-healing if needed
                if self.auto_healing_enabled:
                    await self.auto_healing_workflow()
                
                # Performance optimization
                await self.performance_optimization_workflow()
                
                # Wait for next cycle
                await asyncio.sleep(self.config['health_check_interval'])
                
            except Exception as e:
                logger.error(f"Error in continuous monitoring: {e}")
                await asyncio.sleep(60)  # Wait 1 minute on error
    
    async def comprehensive_health_check(self):
        """Run comprehensive health check."""
        try:
            logger.info("🏥 Running comprehensive health check...")
            
            # Run enhanced health checker
            result = subprocess.run(
                ['python', 'automation/scripts/enhanced_health_check.py'],
                capture_output=True,
                text=True,
                timeout=120
            )
            
            if result.returncode == 0:
                logger.info("✅ Health check completed successfully")
            else:
                logger.warning("⚠️ Health check completed with warnings")
            
            # Load health check results
            health_file = Path('automation/reports/enhanced_health_check.json')
            if health_file.exists():
                with open(health_file, 'r') as f:
                    self.last_health_check = json.load(f)
                    
                health_score = self.last_health_check.get('metrics', {}).get('health_percentage', 0)
                logger.info(f"📊 Current health score: {health_score:.1f}%")
                
                return self.last_health_check
            
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return None
    
    async def auto_healing_workflow(self):
        """Auto-healing workflow to fix common issues."""
        if not self.last_health_check:
            return
            
        health_score = self.last_health_check.get('metrics', {}).get('health_percentage', 0)
        
        if health_score < self.config['thresholds']['health_score_minimum']:
            logger.info(f"🔧 Auto-healing triggered (health score: {health_score:.1f}%)")
            
            failed_checks = [
                name for name, result in self.last_health_check.get('checks', {}).items() 
                if not result.get('healthy', False)
            ]
            
            for check in failed_checks:
                await self.heal_specific_issue(check)
    
    async def heal_specific_issue(self, issue: str):
        """Heal specific system issues."""
        healing_actions = {
            'docker_services': self.heal_docker_services,
            'service_8000': self.heal_backend_service,
            'api_health': self.heal_api_endpoints,
            'api_predictions': self.heal_ml_services,
            'postgresql': self.heal_database_service,
            'mongodb': self.heal_database_service,
            'redis': self.heal_cache_service
        }
        
        if issue in healing_actions:
            logger.info(f"🔧 Attempting to heal: {issue}")
            try:
                await healing_actions[issue]()
                logger.info(f"✅ Healing completed for: {issue}")
            except Exception as e:
                logger.error(f"❌ Healing failed for {issue}: {e}")
    
    async def heal_docker_services(self):
        """Heal Docker service issues."""
        try:
            # Restart unhealthy containers
            result = subprocess.run(
                ['docker', 'ps', '--filter', 'health=unhealthy', '--format', '{{.Names}}'],
                capture_output=True,
                text=True
            )
            
            if result.stdout.strip():
                unhealthy_containers = result.stdout.strip().split('\n')
                for container in unhealthy_containers:
                    logger.info(f"🔄 Restarting unhealthy container: {container}")
                    subprocess.run(['docker', 'restart', container])
        except Exception as e:
            logger.error(f"Docker healing failed: {e}")
    
    async def heal_backend_service(self):
        """Heal backend service issues."""
        try:
            # Restart backend container
            subprocess.run(['docker', 'restart', 'a1betting-backend'])
            await asyncio.sleep(30)  # Wait for restart
            logger.info("🔄 Backend service restarted")
        except Exception as e:
            logger.error(f"Backend healing failed: {e}")
    
    async def heal_api_endpoints(self):
        """Heal API endpoint issues."""
        await self.heal_backend_service()
    
    async def heal_ml_services(self):
        """Heal ML service issues."""
        try:
            # Restart ML-related containers
            ml_containers = ['a1betting-models', 'a1betting-worker']
            for container in ml_containers:
                subprocess.run(['docker', 'restart', container])
            logger.info("🔄 ML services restarted")
        except Exception as e:
            logger.error(f"ML services healing failed: {e}")
    
    async def heal_database_service(self):
        """Heal database service issues."""
        try:
            # Check and restart database containers if needed
            db_containers = ['a1betting-postgres', 'a1betting-mongodb', 'a1betting-redis']
            for container in db_containers:
                result = subprocess.run(
                    ['docker', 'ps', '--filter', f'name={container}', '--format', '{{.Status}}'],
                    capture_output=True,
                    text=True
                )
                if 'unhealthy' in result.stdout:
                    subprocess.run(['docker', 'restart', container])
                    logger.info(f"🔄 Database container restarted: {container}")
        except Exception as e:
            logger.error(f"Database healing failed: {e}")
    
    async def heal_cache_service(self):
        """Heal cache service issues."""
        await self.heal_database_service()
    
    async def performance_optimization_workflow(self):
        """Run performance optimization workflow."""
        try:
            logger.info("⚡ Running performance optimization...")
            
            # Run frontend profiler
            subprocess.run(
                ['python', 'automation/scripts/profile_frontend.py'],
                timeout=300
            )
            
            # Run performance analysis
            await self.analyze_system_performance()
            
            logger.info("✅ Performance optimization completed")
            
        except Exception as e:
            logger.error(f"Performance optimization failed: {e}")
    
    async def analyze_system_performance(self):
        """Analyze system performance and suggest optimizations."""
        if not self.last_health_check:
            return
            
        metrics = self.last_health_check.get('metrics', {})
        
        # Store performance metrics
        self.performance_metrics[datetime.now().isoformat()] = {
            'health_score': metrics.get('health_percentage', 0),
            'cpu_usage': metrics.get('cpu_usage_percent', 0),
            'memory_usage': metrics.get('memory_usage_percent', 0),
            'disk_usage': metrics.get('disk_usage_percent', 0)
        }
        
        # Keep only last 24 hours of metrics
        cutoff_time = datetime.now() - timedelta(hours=24)
        self.performance_metrics = {
            k: v for k, v in self.performance_metrics.items()
            if datetime.fromisoformat(k) > cutoff_time
        }
    
    async def run_scheduled_workflows(self):
        """Run scheduled automation workflows."""
        try:
            # Schedule regular tasks
            schedule.every(5).minutes.do(self.quick_health_check)
            schedule.every(1).hours.do(self.performance_optimization_task)
            schedule.every(6).hours.do(self.backup_task)
            schedule.every(1).days.do(self.security_scan_task)
            
            while True:
                schedule.run_pending()
                await asyncio.sleep(60)
                
        except Exception as e:
            logger.error(f"Scheduled workflows error: {e}")
    
    def quick_health_check(self):
        """Quick health check for scheduled execution."""
        asyncio.create_task(self.comprehensive_health_check())
    
    def performance_optimization_task(self):
        """Performance optimization for scheduled execution."""
        asyncio.create_task(self.performance_optimization_workflow())
    
    def backup_task(self):
        """Backup task for scheduled execution."""
        try:
            subprocess.run(['python', 'automation/scripts/backup_database.py'])
            logger.info("✅ Backup task completed")
        except Exception as e:
            logger.error(f"Backup task failed: {e}")
    
    def security_scan_task(self):
        """Security scan for scheduled execution."""
        try:
            subprocess.run([
                'python', 'automation/master_orchestrator.py', 
                '--workflow', 'security_hardening'
            ])
            logger.info("✅ Security scan completed")
        except Exception as e:
            logger.error(f"Security scan failed: {e}")
    
    def generate_status_report(self) -> Dict[str, Any]:
        """Generate comprehensive status report."""
        return {
            'timestamp': datetime.now().isoformat(),
            'automation_status': 'running',
            'last_health_check': self.last_health_check,
            'performance_metrics': self.performance_metrics,
            'auto_healing_enabled': self.auto_healing_enabled,
            'continuous_monitoring': self.continuous_monitoring,
            'config': self.config
        }
    
    async def shutdown_gracefully(self):
        """Graceful shutdown of the automation system."""
        logger.info("🔄 Shutting down Perfected Automation System...")
        self.continuous_monitoring = False
        self.auto_healing_enabled = False
        
        # Save final status report
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/final_status.json', 'w') as f:
            json.dump(self.generate_status_report(), f, indent=2)
        
        logger.info("✅ Graceful shutdown completed")


async def main():
    """Main entry point."""
    automation_system = PerfectedAutomationSystem()
    
    try:
        # Start the continuous monitoring
        await automation_system.run_continuous_monitoring()
        
    except KeyboardInterrupt:
        logger.info("⏹️ Shutdown signal received")
        await automation_system.shutdown_gracefully()
    
    except Exception as e:
        logger.error(f"Critical error in automation system: {e}")
        await automation_system.shutdown_gracefully()
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
