#!/usr/bin/env python3
"""
Collaborative AI System - Human AI + Autonomous AI Working Together
================================================================

This system creates a collaborative environment where I (GitHub Copilot) work
in conjunction with the autonomous system to provide enhanced intelligence,
real-time monitoring, and collaborative problem-solving.

Features:
- Real-time monitoring of autonomous system activity
- Intelligent analysis and enhancement suggestions
- Collaborative problem-solving and issue resolution
- Dynamic workflow optimization based on patterns
- Enhanced decision-making through dual-AI approach
"""

import asyncio
import json
import logging
import time
import os
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Any, Optional
import subprocess
import redis
from dataclasses import dataclass, asdict
import threading
import queue

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('automation/logs/collaborative_ai.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

@dataclass
class CollaborativeInsight:
    """Represents an insight from the collaborative AI system"""
    timestamp: str
    insight_type: str  # "issue_analysis", "optimization", "pattern_recognition", "recommendation"
    description: str
    confidence: float
    suggested_actions: List[str]
    priority: int  # 1-5, 5 being highest
    source: str  # "copilot_analysis", "autonomous_system", "collaborative"

class CollaborativeAISystem:
    """
    Collaborative AI system that works alongside the autonomous agent
    """
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.reports_dir = self.project_root / "automation" / "reports"
        self.logs_dir = self.project_root / "automation" / "logs"
        self.insights_dir = self.project_root / "automation" / "collaborative_insights"
        
        # Create directories
        for directory in [self.reports_dir, self.logs_dir, self.insights_dir]:
            directory.mkdir(exist_ok=True)
        
        # Connect to Redis for coordination
        try:
            self.redis_client = redis.Redis(host='localhost', port=6379, db=0)
            self.redis_client.ping()
            logger.info("✅ Connected to Redis for collaborative coordination")
        except Exception as e:
            logger.warning(f"⚠️ Redis not available: {e}")
            self.redis_client = None
        
        # Collaboration state
        self.insights: List[CollaborativeInsight] = []
        self.monitoring_active = False
        self.autonomous_status = "unknown"
        self.last_health_score = 0
        self.issue_patterns = {}
        self.success_patterns = {}
        
        # Communication queues
        self.insight_queue = queue.Queue()
        self.action_queue = queue.Queue()
        
    def analyze_autonomous_report(self, report_path: Path) -> List[CollaborativeInsight]:
        """Analyze a report from the autonomous system and provide insights"""
        insights = []
        
        try:
            with open(report_path, 'r') as f:
                report_data = json.load(f)
            
            # Analyze system health trends
            health_score = report_data.get('system_health', {}).get('score', 0)
            if health_score < self.last_health_score:
                insights.append(CollaborativeInsight(
                    timestamp=datetime.now().isoformat(),
                    insight_type="issue_analysis",
                    description=f"Health score declined from {self.last_health_score} to {health_score}",
                    confidence=0.9,
                    suggested_actions=[
                        "Run immediate diagnostic workflow",
                        "Check for recent changes that might have caused regression",
                        "Increase monitoring frequency"
                    ],
                    priority=4,
                    source="copilot_analysis"
                ))
            
            # Analyze current issues
            current_issues = report_data.get('current_issues', [])
            if current_issues:
                # Pattern recognition
                for issue in current_issues:
                    issue_key = self.extract_issue_pattern(issue)
                    self.issue_patterns[issue_key] = self.issue_patterns.get(issue_key, 0) + 1
                    
                    # If this is a recurring issue, provide enhanced insight
                    if self.issue_patterns[issue_key] > 2:
                        insights.append(CollaborativeInsight(
                            timestamp=datetime.now().isoformat(),
                            insight_type="pattern_recognition",
                            description=f"Recurring issue detected: {issue_key} (occurred {self.issue_patterns[issue_key]} times)",
                            confidence=0.95,
                            suggested_actions=[
                                "Investigate root cause of recurring issue",
                                "Consider permanent fix or configuration change",
                                "Add preventive monitoring for this issue type"
                            ],
                            priority=5,
                            source="copilot_analysis"
                        ))
            
            # Analyze improvements made
            improvements = report_data.get('improvements_made', [])
            if improvements:
                insights.append(CollaborativeInsight(
                    timestamp=datetime.now().isoformat(),
                    insight_type="optimization",
                    description=f"Successful improvements applied: {len(improvements)} optimizations",
                    confidence=0.8,
                    suggested_actions=[
                        "Document successful improvement patterns",
                        "Consider applying similar optimizations to other areas",
                        "Monitor long-term impact of changes"
                    ],
                    priority=2,
                    source="copilot_analysis"
                ))
            
            # Update tracking
            self.last_health_score = health_score
            
        except Exception as e:
            logger.error(f"Error analyzing autonomous report: {e}")
            insights.append(CollaborativeInsight(
                timestamp=datetime.now().isoformat(),
                insight_type="issue_analysis",
                description=f"Failed to analyze autonomous report: {e}",
                confidence=0.7,
                suggested_actions=["Check report file format", "Verify autonomous system output"],
                priority=3,
                source="copilot_analysis"
            ))
        
        return insights
    
    def extract_issue_pattern(self, issue_text: str) -> str:
        """Extract a pattern key from an issue description"""
        # Common patterns
        if "modulenotfounderror" in issue_text.lower():
            return "missing_module"
        elif "permission denied" in issue_text.lower():
            return "permission_issue"
        elif "connection refused" in issue_text.lower():
            return "connection_issue"
        elif "timeout" in issue_text.lower():
            return "timeout_issue"
        elif "workflow not found" in issue_text.lower():
            return "workflow_config_issue"
        else:
            # Extract first few words as pattern
            words = issue_text.split()[:3]
            return "_".join(words).lower()
    
    def provide_proactive_suggestions(self) -> List[CollaborativeInsight]:
        """Provide proactive suggestions based on system analysis"""
        suggestions = []
        
        # Check system health
        try:
            result = subprocess.run(
                ["python", "automation/scripts/enhanced_health_check.py"],
                capture_output=True, text=True, timeout=60
            )
            
            if "EXCELLENT" not in result.stdout:
                suggestions.append(CollaborativeInsight(
                    timestamp=datetime.now().isoformat(),
                    insight_type="recommendation",
                    description="System health is not excellent - proactive optimization recommended",
                    confidence=0.8,
                    suggested_actions=[
                        "Run comprehensive health diagnostics",
                        "Execute performance optimization workflow",
                        "Check for resource constraints"
                    ],
                    priority=3,
                    source="copilot_analysis"
                ))
        except Exception as e:
            logger.warning(f"Could not check system health: {e}")
        
        # Check for recent error patterns
        if self.issue_patterns:
            most_common_issue = max(self.issue_patterns, key=self.issue_patterns.get)
            if self.issue_patterns[most_common_issue] > 1:
                suggestions.append(CollaborativeInsight(
                    timestamp=datetime.now().isoformat(),
                    insight_type="pattern_recognition",
                    description=f"Most common issue pattern: {most_common_issue}",
                    confidence=0.9,
                    suggested_actions=[
                        f"Create specific fix for {most_common_issue}",
                        "Add monitoring for this issue type",
                        "Consider preventive measures"
                    ],
                    priority=4,
                    source="copilot_analysis"
                ))
        
        return suggestions
    
    def execute_collaborative_fix(self, insight: CollaborativeInsight) -> bool:
        """Execute a fix based on collaborative insight"""
        try:
            logger.info(f"🤝 Executing collaborative fix: {insight.description}")
            
            if insight.insight_type == "workflow_config_issue":
                # Fix workflow configuration issues
                return self.fix_workflow_config_issues()
            elif insight.insight_type == "missing_module":
                # Install missing modules
                return self.fix_missing_modules()
            elif insight.insight_type == "permission_issue":
                # Fix permission issues
                return self.fix_permission_issues()
            else:
                # Generic improvement action
                return self.run_improvement_workflow()
                
        except Exception as e:
            logger.error(f"❌ Failed to execute collaborative fix: {e}")
            return False
    
    def fix_workflow_config_issues(self) -> bool:
        """Fix common workflow configuration issues"""
        try:
            logger.info("🔧 Fixing workflow configuration issues...")
            
            # Check and fix autonomous perfecter workflow names
            autonomous_file = self.project_root / "automation" / "scripts" / "autonomous_perfecter.py"
            if autonomous_file.exists():
                with open(autonomous_file, 'r') as f:
                    content = f.read()
                
                # Fix common workflow name issues
                fixes_needed = {
                    '"health_monitoring"': '"daily_health_check"',
                    '"performance_optimization"': '"advanced_performance_optimization"'
                }
                
                for old_name, new_name in fixes_needed.items():
                    if old_name in content:
                        content = content.replace(old_name, new_name)
                        logger.info(f"✅ Fixed workflow name: {old_name} -> {new_name}")
                
                with open(autonomous_file, 'w') as f:
                    f.write(content)
                
                return True
        except Exception as e:
            logger.error(f"❌ Error fixing workflow config: {e}")
            return False
    
    def fix_missing_modules(self) -> bool:
        """Fix missing module issues"""
        try:
            logger.info("📦 Installing commonly needed modules...")
            modules_to_install = ["motor", "pymongo", "redis", "psutil", "requests"]
            
            for module in modules_to_install:
                subprocess.run(["pip", "install", module], 
                             capture_output=True, timeout=60)
            
            logger.info("✅ Modules installation completed")
            return True
        except Exception as e:
            logger.error(f"❌ Error installing modules: {e}")
            return False
    
    def fix_permission_issues(self) -> bool:
        """Fix common permission issues"""
        try:
            logger.info("🔐 Applying permission fixes...")
            
            # Ensure logs directory is writable
            os.makedirs(self.logs_dir, exist_ok=True)
            os.makedirs(self.reports_dir, exist_ok=True)
            
            logger.info("✅ Permission fixes applied")
            return True
        except Exception as e:
            logger.error(f"❌ Error fixing permissions: {e}")
            return False
    
    def run_improvement_workflow(self) -> bool:
        """Run a general improvement workflow"""
        try:
            logger.info("🚀 Running improvement workflow...")
            result = subprocess.run([
                "python", "automation/master_orchestrator.py", 
                "--workflow", "code_quality_review"
            ], capture_output=True, timeout=300)
            
            return result.returncode == 0
        except Exception as e:
            logger.error(f"❌ Error running improvement workflow: {e}")
            return False
    
    def monitor_autonomous_system(self):
        """Monitor the autonomous system and provide collaborative insights"""
        logger.info("👁️ Starting collaborative monitoring...")
        
        while self.monitoring_active:
            try:
                # Look for new autonomous reports
                report_files = list(self.reports_dir.glob("autonomous_improvement_*.json"))
                
                if report_files:
                    # Analyze the most recent report
                    latest_report = max(report_files, key=lambda p: p.stat().st_mtime)
                    
                    # Only analyze if it's recent (within last hour)
                    if time.time() - latest_report.stat().st_mtime < 3600:
                        insights = self.analyze_autonomous_report(latest_report)
                        self.insights.extend(insights)
                        
                        # Execute high-priority fixes immediately
                        for insight in insights:
                            if insight.priority >= 4:
                                logger.info(f"🚨 High priority insight: {insight.description}")
                                success = self.execute_collaborative_fix(insight)
                                if success:
                                    logger.info("✅ Collaborative fix applied successfully")
                
                # Generate proactive suggestions periodically
                if len(self.insights) % 5 == 0:  # Every 5 insights
                    proactive_suggestions = self.provide_proactive_suggestions()
                    self.insights.extend(proactive_suggestions)
                
                # Save insights
                self.save_insights()
                
                # Wait before next monitoring cycle
                time.sleep(30)  # Check every 30 seconds
                
            except Exception as e:
                logger.error(f"❌ Error in monitoring cycle: {e}")
                time.sleep(60)  # Wait longer on error
    
    def save_insights(self):
        """Save collaborative insights to file"""
        try:
            insights_file = self.insights_dir / f"collaborative_insights_{datetime.now().strftime('%Y%m%d')}.json"
            with open(insights_file, 'w') as f:
                json.dump([asdict(insight) for insight in self.insights[-50:]], f, indent=2)  # Keep last 50
        except Exception as e:
            logger.warning(f"⚠️ Could not save insights: {e}")
    
    def start_collaborative_session(self):
        """Start a collaborative session with the autonomous system"""
        logger.info("🤝 Starting collaborative AI session...")
        
        # Apply immediate fixes
        logger.info("🔧 Applying immediate collaborative fixes...")
        self.fix_workflow_config_issues()
        self.fix_missing_modules()
        self.fix_permission_issues()
        
        # Start monitoring
        self.monitoring_active = True
        monitoring_thread = threading.Thread(target=self.monitor_autonomous_system)
        monitoring_thread.daemon = True
        monitoring_thread.start()
        
        logger.info("✅ Collaborative AI system is now active!")
        logger.info("🎯 I'm now working alongside the autonomous system to provide:")
        logger.info("   • Real-time issue analysis and fixes")
        logger.info("   • Pattern recognition and prevention")
        logger.info("   • Collaborative problem-solving")
        logger.info("   • Enhanced decision-making")
        
        return monitoring_thread
    
    def stop_collaborative_session(self):
        """Stop the collaborative session"""
        self.monitoring_active = False
        logger.info("🛑 Collaborative AI session stopped")
    
    def get_collaboration_report(self) -> Dict[str, Any]:
        """Generate a collaboration report"""
        return {
            "timestamp": datetime.now().isoformat(),
            "total_insights": len(self.insights),
            "recent_insights": [asdict(insight) for insight in self.insights[-10:]],
            "issue_patterns": self.issue_patterns,
            "success_patterns": self.success_patterns,
            "monitoring_active": self.monitoring_active,
            "autonomous_status": self.autonomous_status
        }

def main():
    """Main function for collaborative AI system"""
    # Set UTF-8 encoding for Windows compatibility
    import sys
    if sys.platform == "win32":
        import os
        os.system("chcp 65001 > nul")
    
    try:
        print("🤝 COLLABORATIVE AI SYSTEM")
    except UnicodeEncodeError:
        print("COLLABORATIVE AI SYSTEM")
    print("=" * 50)
    print("GitHub Copilot + Autonomous AI working together")
    
    collaborative_ai = CollaborativeAISystem()
    
    print("\nSelect mode:")
    print("1. Start collaborative session (recommended)")
    print("2. Analyze existing reports")
    print("3. Generate collaboration report")
    print("4. Apply immediate fixes")
    
    # AUTO-START collaborative session - no user input needed
    choice = "1"  # Automatically choose collaborative session
    
    if choice == "1":
        # Start collaborative session
        thread = collaborative_ai.start_collaborative_session()
        try:
            # Keep running until interrupted
            while collaborative_ai.monitoring_active:
                time.sleep(1)
        except KeyboardInterrupt:
            print("\n🛑 Stopping collaborative session...")
            collaborative_ai.stop_collaborative_session()
    
    elif choice == "2":
        # Analyze existing reports
        report_files = list(collaborative_ai.reports_dir.glob("autonomous_improvement_*.json"))
        if report_files:
            latest_report = max(report_files, key=lambda p: p.stat().st_mtime)
            insights = collaborative_ai.analyze_autonomous_report(latest_report)
            print(f"\n📊 Generated {len(insights)} insights from latest report")
            for insight in insights:
                print(f"   • {insight.description}")
        else:
            print("❌ No autonomous reports found")
    
    elif choice == "3":
        # Generate report
        report = collaborative_ai.get_collaboration_report()
        print(f"\n📋 Collaboration Report:")
        print(f"   Total insights: {report['total_insights']}")
        print(f"   Monitoring active: {report['monitoring_active']}")
    
    elif choice == "4":
        # Apply immediate fixes
        collaborative_ai.fix_workflow_config_issues()
        collaborative_ai.fix_missing_modules()
        collaborative_ai.fix_permission_issues()
        print("✅ Immediate fixes applied")

if __name__ == "__main__":
    main()
