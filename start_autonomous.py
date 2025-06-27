#!/usr/bin/env python3
"""
A1Betting Autonomous System Launcher
Easy way to start autonomous intelligent automation.
"""

import subprocess
import sys
import time
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def print_banner():
    """Print the system banner."""
    print("""
🤖 A1BETTING AUTONOMOUS INTELLIGENCE SYSTEM
============================================
Your AI-powered development assistant is ready to:
✨ Automatically fix code issues
🔍 Continuously monitor system health  
🚀 Optimize performance and ML models
🔒 Enhance security continuously
📊 Generate comprehensive reports
🎯 Perfect your application autonomously
""")

def check_prerequisites():
    """Check if prerequisites are met."""
    logger.info("🔍 Checking prerequisites...")
    
    # Check if Redis is running
    try:
        import redis
        client = redis.Redis(host='localhost', port=6379, db=0)
        client.ping()
        logger.info("✅ Redis is running")
    except:
        logger.warning("⚠️ Redis not running - some features will be limited")
    
    # Check if Docker is running
    try:
        result = subprocess.run(["docker", "ps"], capture_output=True, timeout=10)
        if result.returncode == 0:
            logger.info("✅ Docker is running")
        else:
            logger.warning("⚠️ Docker not running - some services may be unavailable")
    except:
        logger.warning("⚠️ Docker not available")
    
    return True

def start_autonomous_mode():
    """Start the autonomous perfecter."""
    print("\n🚀 Starting Autonomous App Perfecter...")
    print("This will continuously monitor and improve your application.")
    print("Press Ctrl+C to stop at any time.\n")
    
    try:
        subprocess.run([
            sys.executable, "automation/scripts/autonomous_perfecter.py"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Autonomous mode stopped")

def start_intelligent_scheduler():
    """Start the intelligent scheduler."""
    print("\n📅 Starting Intelligent Scheduler...")
    print("This will run automation tasks on a smart schedule.")
    print("Press Ctrl+C to stop at any time.\n")
    
    try:
        subprocess.run([
            sys.executable, "automation/scripts/intelligent_scheduler.py"
        ])
    except KeyboardInterrupt:
        print("\n🛑 Scheduler stopped")

def run_single_improvement():
    """Run a single improvement cycle."""
    print("\n🔄 Running Single Improvement Cycle...")
    
    try:
        result = subprocess.run([
            sys.executable, "automation/scripts/autonomous_perfecter.py"
        ], input="1\n", text=True, timeout=600)
        
        if result.returncode == 0:
            print("✅ Improvement cycle completed successfully!")
        else:
            print("⚠️ Improvement cycle completed with some issues")
            
    except subprocess.TimeoutExpired:
        print("⏰ Improvement cycle timed out")
    except Exception as e:
        print(f"❌ Error running improvement cycle: {e}")

def show_current_status():
    """Show current system status."""
    print("\n📊 Current System Status:")
    print("=" * 40)
    
    # Run health check
    try:
        result = subprocess.run([
            "python", "automation/scripts/enhanced_health_check.py"
        ], capture_output=True, text=True, timeout=60)
        
        if "EXCELLENT" in result.stdout:
            print("🟢 System Health: EXCELLENT")
        elif "GOOD" in result.stdout:
            print("🟡 System Health: GOOD")
        else:
            print("🔴 System Health: NEEDS ATTENTION")
            
    except Exception as e:
        print(f"❌ Could not get health status: {e}")
    
    # Check automation orchestrator
    try:
        result = subprocess.run([
            "python", "automation/master_orchestrator.py", "--status"
        ], capture_output=True, text=True, timeout=30)
        
        if result.returncode == 0:
            print("🤖 Automation Orchestrator: RUNNING")
        else:
            print("⚠️ Automation Orchestrator: ISSUES")
            
    except Exception as e:
        print(f"❌ Could not get orchestrator status: {e}")

def main():
    """Main function."""
    print_banner()
    
    if not check_prerequisites():
        print("❌ Prerequisites check failed")
        return
    
    while True:
        print("\n🎯 What would you like to do?")
        print("1. 🚀 Start Autonomous Mode (continuous improvement)")
        print("2. 📅 Start Intelligent Scheduler (scheduled automation)")
        print("3. 🔄 Run Single Improvement Cycle")
        print("4. 📊 Show Current Status")
        print("5. 🛑 Exit")
        
        # AUTO-START autonomous mode - no user input needed
        print("🚀 AUTO-STARTING AUTONOMOUS MODE...")
        choice = "1"  # Automatically start autonomous mode
        
        if choice == "1":
            start_autonomous_mode()
        elif choice == "2":
            start_intelligent_scheduler()
        elif choice == "3":
            run_single_improvement()
        elif choice == "4":
            show_current_status()
        elif choice == "5":
            print("\n👋 Goodbye! Your automation system will continue running in Docker.")
            break
        else:
            print("❌ Invalid choice. Please enter 1-5.")

if __name__ == "__main__":
    main()
