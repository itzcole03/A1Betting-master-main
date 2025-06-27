#!/usr/bin/env python3
"""
Intelligent Task Scheduler for A1Betting Automation
Schedules and runs automation tasks based on intelligent priorities and system state.
"""

import schedule
import time
import logging
import subprocess
import json
from datetime import datetime, timedelta
from pathlib import Path
import redis

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class IntelligentScheduler:
    """Intelligent scheduler for automation tasks."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.reports_dir = self.project_root / "automation" / "reports"
        
        # Connect to Redis for coordination
        try:
            self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
            self.redis_client.ping()
            logger.info("✅ Connected to Redis")
        except:
            self.redis_client = None
            logger.warning("⚠️ Redis not available, running in standalone mode")
    
    def run_health_check(self):
        """Run periodic health check."""
        logger.info("🏥 Running scheduled health check...")
        try:
            result = subprocess.run(
                ["python", "automation/scripts/enhanced_health_check.py"],
                capture_output=True, text=True, timeout=60
            )
            
            if "EXCELLENT" in result.stdout:
                logger.info("✅ Health check: EXCELLENT")
                return True
            else:
                logger.warning("⚠️ Health check: Needs attention")
                # Trigger immediate improvement cycle
                self.trigger_improvement_cycle()
                return False
        except Exception as e:
            logger.error(f"❌ Health check failed: {e}")
            return False
    
    def run_code_quality_check(self):
        """Run code quality analysis."""
        logger.info("🔍 Running code quality analysis...")
        try:
            result = subprocess.run(
                ["python", "automation/master_orchestrator.py", "--workflow", "code_quality_review"],
                capture_output=True, text=True, timeout=300
            )
            
            success = result.returncode == 0
            logger.info(f"{'✅' if success else '⚠️'} Code quality check: {'PASSED' if success else 'ISSUES FOUND'}")
            
            if not success:
                self.schedule_fix_tasks()
                
        except Exception as e:
            logger.error(f"❌ Code quality check failed: {e}")
    
    def run_security_scan(self):
        """Run security vulnerability scan."""
        logger.info("🔒 Running security scan...")
        try:
            result = subprocess.run(
                ["python", "automation/master_orchestrator.py", "--workflow", "security_hardening"],
                capture_output=True, text=True, timeout=300
            )
            
            success = result.returncode == 0
            logger.info(f"{'✅' if success else '⚠️'} Security scan: {'CLEAN' if success else 'VULNERABILITIES FOUND'}")
            
        except Exception as e:
            logger.error(f"❌ Security scan failed: {e}")
    
    def run_performance_optimization(self):
        """Run performance optimization."""
        logger.info("⚡ Running performance optimization...")
        try:
            result = subprocess.run(
                ["python", "automation/master_orchestrator.py", "--workflow", "performance_optimization"],
                capture_output=True, text=True, timeout=300
            )
            
            success = result.returncode == 0
            logger.info(f"{'✅' if success else '⚠️'} Performance optimization: {'COMPLETED' if success else 'ISSUES'}")
            
        except Exception as e:
            logger.error(f"❌ Performance optimization failed: {e}")
    
    def run_ml_optimization(self):
        """Run ML model optimization."""
        logger.info("🧠 Running ML model optimization...")
        try:
            result = subprocess.run(
                ["python", "automation/master_orchestrator.py", "--workflow", "ml_optimization"],
                capture_output=True, text=True, timeout=600
            )
            
            success = result.returncode == 0
            logger.info(f"{'✅' if success else '⚠️'} ML optimization: {'COMPLETED' if success else 'ISSUES'}")
            
        except Exception as e:
            logger.error(f"❌ ML optimization failed: {e}")
    
    def trigger_improvement_cycle(self):
        """Trigger immediate improvement cycle."""
        logger.info("🚀 Triggering autonomous improvement cycle...")
        try:
            subprocess.Popen([
                "python", "automation/scripts/autonomous_perfecter.py"
            ])
        except Exception as e:
            logger.error(f"❌ Failed to trigger improvement cycle: {e}")
    
    def schedule_fix_tasks(self):
        """Schedule specific fix tasks based on issues found."""
        logger.info("🔧 Scheduling targeted fix tasks...")
        # This could be enhanced to schedule specific fixes
        
    def setup_schedule(self):
        """Setup the intelligent schedule."""
        logger.info("📅 Setting up intelligent automation schedule...")
        
        # High frequency (every 5 minutes)
        schedule.every(5).minutes.do(self.run_health_check)
        
        # Medium frequency (every 30 minutes)
        schedule.every(30).minutes.do(self.run_code_quality_check)
        
        # Low frequency (every 2 hours)
        schedule.every(2).hours.do(self.run_security_scan)
        schedule.every(2).hours.do(self.run_performance_optimization)
        
        # Daily tasks
        schedule.every().day.at("09:00").do(self.run_ml_optimization)
        schedule.every().day.at("18:00").do(self.trigger_improvement_cycle)
        
        # Weekly comprehensive analysis
        schedule.every().monday.at("06:00").do(self.run_comprehensive_analysis)
        
    def run_comprehensive_analysis(self):
        """Run weekly comprehensive analysis."""
        logger.info("📊 Running weekly comprehensive analysis...")
        try:
            # Run all workflows in sequence
            workflows = [
                "code_quality_review",
                "security_hardening", 
                "performance_optimization",
                "ml_optimization",
                "enhanced_testing"
            ]
            
            for workflow in workflows:
                logger.info(f"Running {workflow}...")
                subprocess.run([
                    "python", "automation/master_orchestrator.py", 
                    "--workflow", workflow
                ], timeout=600)
                time.sleep(60)  # Wait between workflows
                
        except Exception as e:
            logger.error(f"❌ Comprehensive analysis failed: {e}")
    
    def run_scheduler(self):
        """Start the intelligent scheduler."""
        self.setup_schedule()
        logger.info("🤖 Intelligent scheduler started!")
        logger.info("Schedule:")
        logger.info("  • Health checks: Every 5 minutes")
        logger.info("  • Code quality: Every 30 minutes") 
        logger.info("  • Security scans: Every 2 hours")
        logger.info("  • Performance: Every 2 hours")
        logger.info("  • ML optimization: Daily at 9 AM")
        logger.info("  • Improvement cycle: Daily at 6 PM")
        logger.info("  • Comprehensive: Weekly on Monday at 6 AM")
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(30)  # Check every 30 seconds
        except KeyboardInterrupt:
            logger.info("🛑 Scheduler stopped by user")

if __name__ == "__main__":
    scheduler = IntelligentScheduler()
    scheduler.run_scheduler()
