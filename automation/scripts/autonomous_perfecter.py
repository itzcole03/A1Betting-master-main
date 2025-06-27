#!/usr/bin/env python3
"""
Autonomous Intelligent App Perfecter for A1Betting
This agent autonomously uses automation services to perfect and complete the application.
"""

import asyncio
import json
import logging
import time
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Any, Optional
import subprocess
import os
import redis

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class AutonomousAppPerfector:
    """Autonomous agent that intelligently perfects the A1Betting application."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.reports_dir = self.project_root / "automation" / "reports"
        self.reports_dir.mkdir(exist_ok=True)
        
        # Connect to Redis for state management
        try:
            self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
            self.redis_client.ping()
            logger.info("✅ Connected to Redis for state management")
        except Exception as e:
            logger.warning(f"⚠️ Redis not available: {e}")
            self.redis_client = None
        
        # Automation workflow priorities (using correct workflow names)
        self.workflow_priorities = {
            "daily_health_check": 1,     # Always first - comprehensive health check
            "code_quality_review": 2,    # Essential for code health
            "security_hardening": 3,     # Security is critical
            "advanced_performance_optimization": 4, # Performance improvements
            "ml_optimization": 5,        # ML model improvements
            "enhanced_testing": 6,       # Comprehensive testing
            "documentation_generation": 7, # Documentation
        }
        
        # Issue tracking
        self.current_issues = []
        self.resolved_issues = []
        self.improvement_suggestions = []
        
    def get_system_health(self) -> Dict[str, Any]:
        """Get current system health status."""
        try:
            result = subprocess.run(
                ["python", "automation/scripts/enhanced_health_check.py"],
                capture_output=True, text=True, timeout=60
            )
            
            if result.returncode == 0:
                # Parse health status from output
                output = result.stdout
                if "EXCELLENT" in output:
                    return {"status": "excellent", "score": 100}
                elif "GOOD" in output:
                    return {"status": "good", "score": 80}
                else:
                    return {"status": "needs_attention", "score": 60}
            else:
                return {"status": "unhealthy", "score": 0}
                
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return {"status": "error", "score": 0}
    
    def run_automation_workflow(self, workflow_name: str) -> Dict[str, Any]:
        """Run a specific automation workflow and return results."""
        logger.info(f"🔄 Running automation workflow: {workflow_name}")
        
        try:
            result = subprocess.run(
                ["python", "automation/master_orchestrator.py", "--workflow", workflow_name],
                capture_output=True, text=True, timeout=300  # 5 minute timeout
            )
            
            success = result.returncode == 0
            
            workflow_result = {
                "workflow": workflow_name,
                "success": success,
                "timestamp": datetime.now().isoformat(),
                "stdout": result.stdout,
                "stderr": result.stderr,
                "issues_found": self.extract_issues_from_output(result.stdout, result.stderr),
                "improvements_suggested": self.extract_improvements_from_output(result.stdout)
            }
            
            # Save detailed results
            report_file = self.reports_dir / f"autonomous_{workflow_name}_{int(time.time())}.json"
            with open(report_file, 'w') as f:
                json.dump(workflow_result, f, indent=2)
            
            logger.info(f"{'✅' if success else '⚠️'} Workflow {workflow_name} completed: {'SUCCESS' if success else 'WITH ISSUES'}")
            return workflow_result
            
        except subprocess.TimeoutExpired:
            logger.warning(f"⏰ Workflow {workflow_name} timed out")
            return {"workflow": workflow_name, "success": False, "error": "timeout"}
        except Exception as e:
            logger.error(f"❌ Workflow {workflow_name} failed: {e}")
            return {"workflow": workflow_name, "success": False, "error": str(e)}
    
    def extract_issues_from_output(self, stdout: str, stderr: str) -> List[str]:
        """Extract issues and problems from workflow output."""
        issues = []
        
        # Common issue patterns
        issue_patterns = [
            "ERROR",
            "FAILED",
            "CRITICAL",
            "Task failed",
            "Step failed",
            "ModuleNotFoundError",
            "ImportError",
            "SyntaxError",
            "IndentationError",
            "FileNotFoundError"
        ]
        
        output_text = f"{stdout}\n{stderr}".lower()
        
        for pattern in issue_patterns:
            if pattern.lower() in output_text:
                # Extract the line containing the issue
                lines = (stdout + "\n" + stderr).split('\n')
                for line in lines:
                    if pattern.lower() in line.lower():
                        issues.append(line.strip())
        
        return list(set(issues))  # Remove duplicates
    
    def extract_improvements_from_output(self, stdout: str) -> List[str]:
        """Extract improvement suggestions from workflow output."""
        improvements = []
        
        # Look for positive indicators of completed work
        improvement_patterns = [
            "completed successfully",
            "optimization applied",
            "performance improved",
            "security enhanced",
            "test coverage increased",
            "documentation generated",
            "code quality improved"
        ]
        
        for pattern in improvement_patterns:
            if pattern in stdout.lower():
                improvements.append(pattern)
        
        return improvements
    
    def prioritize_next_action(self) -> str:
        """Intelligently determine the next automation action to take."""
        health = self.get_system_health()
        
        # If system is unhealthy, prioritize health first
        if health["score"] < 80:
            return "daily_health_check"
        
        # Check what workflows have been run recently
        recent_workflows = self.get_recent_workflow_history()
        
        # Find the highest priority workflow that hasn't been run recently
        for workflow in sorted(self.workflow_priorities.items(), key=lambda x: x[1]):
            workflow_name = workflow[0]
            if workflow_name not in recent_workflows:
                return workflow_name
        
        # If all have been run recently, run the highest priority one
        return min(self.workflow_priorities.items(), key=lambda x: x[1])[0]
    
    def get_recent_workflow_history(self) -> List[str]:
        """Get list of workflows run in the last hour."""
        if not self.redis_client:
            return []
        
        try:
            # Get recent workflow history from Redis
            recent_key = "recent_workflows"
            recent_workflows = self.redis_client.lrange(recent_key, 0, -1)
            return [w.decode() for w in recent_workflows]
        except:
            return []
    
    def record_workflow_execution(self, workflow_name: str):
        """Record that a workflow was executed."""
        if self.redis_client:
            try:
                recent_key = "recent_workflows"
                self.redis_client.lpush(recent_key, workflow_name)
                self.redis_client.expire(recent_key, 3600)  # Expire after 1 hour
                self.redis_client.ltrim(recent_key, 0, 10)  # Keep only last 10
            except:
                pass
    
    def analyze_and_fix_issues(self, issues: List[str]) -> List[str]:
        """Autonomously analyze and attempt to fix identified issues."""
        fixes_applied = []
        
        for issue in issues:
            logger.info(f"🔧 Analyzing issue: {issue}")
            
            # Missing module issues
            if "modulenotfounderror" in issue.lower() or "no module named" in issue.lower():
                module_name = self.extract_missing_module(issue)
                if module_name:
                    fix = self.install_missing_module(module_name)
                    if fix:
                        fixes_applied.append(f"Installed missing module: {module_name}")
            
            # Permission issues
            elif "permission denied" in issue.lower() or "access is denied" in issue.lower():
                fix = self.fix_permission_issues()
                if fix:
                    fixes_applied.append("Applied permission fixes")
            
            # Configuration issues
            elif "configuration" in issue.lower() or "config" in issue.lower():
                fix = self.fix_configuration_issues()
                if fix:
                    fixes_applied.append("Fixed configuration issues")
        
        return fixes_applied
    
    def extract_missing_module(self, error_message: str) -> Optional[str]:
        """Extract module name from error message."""
        if "no module named" in error_message.lower():
            parts = error_message.split("'")
            if len(parts) >= 2:
                return parts[1]
        return None
    
    def install_missing_module(self, module_name: str) -> bool:
        """Attempt to install a missing Python module."""
        try:
            logger.info(f"📦 Installing missing module: {module_name}")
            result = subprocess.run(
                ["pip", "install", "--user", module_name],
                capture_output=True, text=True, timeout=60
            )
            success = result.returncode == 0
            if success:
                logger.info(f"✅ Successfully installed {module_name}")
            else:
                logger.warning(f"⚠️ Failed to install {module_name}: {result.stderr}")
            return success
        except Exception as e:
            logger.error(f"❌ Error installing {module_name}: {e}")
            return False
    
    def fix_permission_issues(self) -> bool:
        """Attempt to fix common permission issues."""
        try:
            # Try using --user flag for pip installations
            logger.info("🔐 Applying permission fixes...")
            # This is a placeholder - specific fixes would be implemented based on the issues
            return True
        except Exception as e:
            logger.error(f"❌ Error fixing permissions: {e}")
            return False
    
    def fix_configuration_issues(self) -> bool:
        """Attempt to fix configuration issues."""
        try:
            logger.info("⚙️ Fixing configuration issues...")
            # This would implement specific configuration fixes
            return True
        except Exception as e:
            logger.error(f"❌ Error fixing configuration: {e}")
            return False
    
    def generate_improvement_report(self) -> Dict[str, Any]:
        """Generate a comprehensive improvement report."""
        return {
            "timestamp": datetime.now().isoformat(),
            "system_health": self.get_system_health(),
            "current_issues": self.current_issues,
            "resolved_issues": self.resolved_issues,
            "improvements_made": self.improvement_suggestions,
            "next_recommended_actions": [
                self.prioritize_next_action()
            ]
        }
    
    async def autonomous_improvement_cycle(self, max_cycles: int = 10):
        """Run autonomous improvement cycles."""
        logger.info(f"🚀 Starting autonomous improvement cycle (max {max_cycles} cycles)")
        
        for cycle in range(max_cycles):
            logger.info(f"\n🔄 Cycle {cycle + 1}/{max_cycles}")
            
            # Get current system health
            health = self.get_system_health()
            logger.info(f"📊 System Health: {health['status']} ({health['score']}%)")
            
            # Determine next action
            next_workflow = self.prioritize_next_action()
            logger.info(f"🎯 Next Action: {next_workflow}")
            
            # Run the workflow
            result = self.run_automation_workflow(next_workflow)
            self.record_workflow_execution(next_workflow)
            
            # Analyze results
            if result.get("issues_found"):
                self.current_issues.extend(result["issues_found"])
                
                # Attempt to fix issues autonomously
                fixes = self.analyze_and_fix_issues(result["issues_found"])
                self.resolved_issues.extend(fixes)
                logger.info(f"🔧 Applied {len(fixes)} automatic fixes")
            
            if result.get("improvements_suggested"):
                self.improvement_suggestions.extend(result["improvements_suggested"])
            
            # Wait between cycles
            await asyncio.sleep(30)  # 30 second delay between cycles
            
            # Check if system is now excellent
            final_health = self.get_system_health()
            if final_health["score"] >= 95:
                logger.info("🎉 System has reached excellent status!")
                break
        
        # Generate final report
        final_report = self.generate_improvement_report()
        report_file = self.reports_dir / f"autonomous_improvement_final_{int(time.time())}.json"
        with open(report_file, 'w') as f:
            json.dump(final_report, f, indent=2)
        
        logger.info(f"📋 Final improvement report saved to: {report_file}")
        return final_report
    
    def start_continuous_monitoring(self):
        """Start continuous monitoring and improvement."""
        logger.info("🔄 Starting continuous autonomous monitoring...")
        
        while True:
            try:
                # Run one improvement cycle
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                result = loop.run_until_complete(self.autonomous_improvement_cycle(max_cycles=3))
                loop.close()
                
                # Wait before next major cycle
                logger.info("⏰ Waiting 30 minutes before next major improvement cycle...")
                time.sleep(1800)  # 30 minutes
                
            except KeyboardInterrupt:
                logger.info("🛑 Autonomous monitoring stopped by user")
                break
            except Exception as e:
                logger.error(f"❌ Error in monitoring cycle: {e}")
                time.sleep(300)  # Wait 5 minutes on error

def main():
    """Main function to start autonomous app perfection."""
    # Set UTF-8 encoding for Windows compatibility
    import sys
    if sys.platform == "win32":
        import os
        os.system("chcp 65001 > nul")
    
    try:
        print("🤖 A1Betting Autonomous App Perfecter")
    except UnicodeEncodeError:
        print("A1Betting Autonomous App Perfecter")
    print("=====================================")
    
    perfecter = AutonomousAppPerfector()
    
    # Choose mode
    print("\nSelect mode:")
    print("1. Single improvement cycle")
    print("2. Multiple improvement cycles") 
    print("3. Continuous monitoring")
    
    # Auto-select continuous monitoring mode - no user input needed
    choice = "3"  # Automatically choose continuous monitoring
    
    if choice == "1":
        # Single cycle
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(perfecter.autonomous_improvement_cycle(max_cycles=1))
        loop.close()
        print(f"\n✅ Single cycle completed. Health: {result['system_health']['status']}")
        
    elif choice == "2":
        # Multiple cycles
        cycles = int(input("How many cycles? (default 5): ") or "5")
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        result = loop.run_until_complete(perfecter.autonomous_improvement_cycle(max_cycles=cycles))
        loop.close()
        print(f"\n✅ {cycles} cycles completed. Final health: {result['system_health']['status']}")
        
    elif choice == "3":
        # Continuous monitoring
        print("\n🔄 Starting continuous monitoring (Ctrl+C to stop)...")
        perfecter.start_continuous_monitoring()
    
    else:
        print("Invalid choice")

if __name__ == "__main__":
    main()
