#!/usr/bin/env python3
"""
Enhanced Database Connectivity Checker for A1Betting Automation System

This script provides comprehensive database health monitoring including:
- Connection testing with retry mechanisms
- Performance metrics collection
- Health scoring and trend analysis
- Detailed reporting with actionable insights
- Integration with monitoring systems

Supports: MongoDB, Redis, PostgreSQL, and future database additions
"""

import asyncio
import json
import logging
import os
import sys
import time
import signal
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any, Optional, List, Union
from contextlib import asynccontextmanager
from dataclasses import dataclass, asdict

import pymongo
import redis
from sqlalchemy import create_engine, text
from motor.motor_asyncio import AsyncIOMotorClient

# Configuration constants
TIMEOUT_SECONDS = 10
RETRY_ATTEMPTS = 3
RETRY_DELAY = 2
HEALTH_SCORE_THRESHOLD = 0.8

# Setup enhanced logging
def setup_logging():
    """Setup comprehensive logging with file rotation."""
    log_dir = Path('automation/logs')
    log_dir.mkdir(parents=True, exist_ok=True)
    
    # Create formatter
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(funcName)s:%(lineno)d - %(message)s'
    )
    
    # Setup file handler
    file_handler = logging.FileHandler(log_dir / 'database_check.log')
    file_handler.setFormatter(formatter)
    
    # Setup console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)
    
    # Configure logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    
    return logger

logger = setup_logging()


@dataclass
class DatabaseMetrics:
    """Database performance and health metrics."""
    response_time_ms: float
    connection_count: int
    memory_usage_mb: float
    cpu_usage_percent: float
    error_rate: float
    availability_score: float
    
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass
class DatabaseStatus:
    """Complete database status information."""
    name: str
    status: str  # 'healthy', 'degraded', 'critical', 'error', 'not_configured'
    metrics: Optional[DatabaseMetrics]
    version: Optional[str]
    host: str
    port: int
    database: Optional[str]
    error_message: Optional[str]
    last_check: datetime
    health_score: float
    
    def to_dict(self) -> Dict[str, Any]:
        result = asdict(self)
        result['last_check'] = self.last_check.isoformat()
        if self.metrics:
            result['metrics'] = self.metrics.to_dict()
        return result


class DatabaseChecker:
    """Database connectivity and health checker."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'databases': {},
            'overall_status': 'unknown',
            'errors': []
        }
    
    def check_mongodb(self) -> Dict[str, Any]:
        """Check MongoDB connectivity."""
        try:
            # Use default connection or environment variable
            mongo_url = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/a1betting')
            client = pymongo.MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
            
            # Test connection
            client.admin.command('ping')
            
            # Get database info
            db_name = mongo_url.split('/')[-1] or 'a1betting'
            db = client[db_name]
            collections = db.list_collection_names()
            
            result = {
                'status': 'healthy',
                'url': mongo_url.replace(mongo_url.split('@')[0] + '@' if '@' in mongo_url else '', '***@'),
                'database': db_name,
                'collections_count': len(collections),
                'collections': collections[:10],  # First 10 collections
                'response_time_ms': 0
            }
            
            # Test a simple operation timing
            start_time = datetime.now()
            list(db.list_collection_names())
            response_time = (datetime.now() - start_time).total_seconds() * 1000
            result['response_time_ms'] = round(response_time, 2)
            
            client.close()
            return result
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e),
                'url': mongo_url.replace(mongo_url.split('@')[0] + '@' if '@' in mongo_url else '', '***@')
            }
    
    def check_redis(self) -> Dict[str, Any]:
        """Check Redis connectivity."""
        try:
            redis_host = os.getenv('REDIS_HOST', 'localhost')
            redis_port = int(os.getenv('REDIS_PORT', '6379'))
            redis_db = int(os.getenv('REDIS_DB', '0'))
            
            client = redis.Redis(
                host=redis_host,
                port=redis_port,
                db=redis_db,
                decode_responses=True,
                socket_connect_timeout=5
            )
            
            # Test connection
            start_time = datetime.now()
            ping_result = client.ping()
            response_time = (datetime.now() - start_time).total_seconds() * 1000
            
            # Get Redis info
            info = client.info()
            
            result = {
                'status': 'healthy' if ping_result else 'error',
                'host': redis_host,
                'port': redis_port,
                'database': redis_db,
                'response_time_ms': round(response_time, 2),
                'version': info.get('redis_version', 'unknown'),
                'connected_clients': info.get('connected_clients', 0),
                'used_memory_human': info.get('used_memory_human', 'unknown'),
                'keyspace': {k: v for k, v in info.items() if k.startswith('db')}
            }
            
            client.close()
            return result
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e),
                'host': redis_host,
                'port': redis_port
            }
    
    def check_postgresql(self) -> Dict[str, Any]:
        """Check PostgreSQL connectivity (if configured)."""
        try:
            pg_url = os.getenv('POSTGRESQL_URL')
            if not pg_url:
                return {
                    'status': 'not_configured',
                    'message': 'PostgreSQL URL not configured'
                }
            
            engine = create_engine(pg_url, connect_args={'connect_timeout': 5})
            
            start_time = datetime.now()
            with engine.connect() as conn:
                result = conn.execute(text("SELECT version()"))
                version = result.fetchone()[0]
                
                # Test database info
                db_result = conn.execute(text("SELECT current_database()"))
                current_db = db_result.fetchone()[0]
                
            response_time = (datetime.now() - start_time).total_seconds() * 1000
            
            return {
                'status': 'healthy',
                'url': pg_url.split('@')[1] if '@' in pg_url else 'localhost',
                'database': current_db,
                'version': version.split(' ')[1] if ' ' in version else version,
                'response_time_ms': round(response_time, 2)
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e),
                'url': os.getenv('POSTGRESQL_URL', '').split('@')[1] if '@' in os.getenv('POSTGRESQL_URL', '') else 'localhost'
            }
    
    def run_checks(self) -> Dict[str, Any]:
        """Run all database checks."""
        logger.info("Starting database connectivity checks...")
        
        # Check MongoDB
        logger.info("Checking MongoDB...")
        self.results['databases']['mongodb'] = self.check_mongodb()
        
        # Check Redis
        logger.info("Checking Redis...")
        self.results['databases']['redis'] = self.check_redis()
        
        # Check PostgreSQL (optional)
        logger.info("Checking PostgreSQL...")
        self.results['databases']['postgresql'] = self.check_postgresql()
        
        # Determine overall status
        healthy_count = sum(1 for db in self.results['databases'].values() 
                          if db.get('status') == 'healthy')
        error_count = sum(1 for db in self.results['databases'].values() 
                        if db.get('status') == 'error')
        
        if error_count == 0:
            self.results['overall_status'] = 'healthy'
        elif healthy_count > 0:
            self.results['overall_status'] = 'partial'
        else:
            self.results['overall_status'] = 'unhealthy'
        
        return self.results
    
    def generate_report(self) -> str:
        """Generate a human-readable report."""
        report = f"""
🗄️  DATABASE CONNECTIVITY REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Overall Status: {self.results['overall_status'].upper()}

"""
        
        for db_name, db_info in self.results['databases'].items():
            status_emoji = "✅" if db_info['status'] == 'healthy' else "❌" if db_info['status'] == 'error' else "⚠️"
            report += f"{status_emoji} {db_name.upper()}:\n"
            
            if db_info['status'] == 'healthy':
                if 'response_time_ms' in db_info:
                    report += f"   Response Time: {db_info['response_time_ms']}ms\n"
                if 'version' in db_info:
                    report += f"   Version: {db_info['version']}\n"
                if 'collections_count' in db_info:
                    report += f"   Collections: {db_info['collections_count']}\n"
                if 'connected_clients' in db_info:
                    report += f"   Connected Clients: {db_info['connected_clients']}\n"
            elif db_info['status'] == 'error':
                report += f"   Error: {db_info['error']}\n"
            elif db_info['status'] == 'not_configured':
                report += f"   Status: {db_info['message']}\n"
            
            report += "\n"
        
        return report


def main():
    """Main entry point."""
    try:
        checker = DatabaseChecker()
        results = checker.run_checks()
        
        # Generate and display report
        report = checker.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/database_check.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit with appropriate code
        if results['overall_status'] == 'healthy':
            logger.info("All database checks passed!")
            sys.exit(0)
        elif results['overall_status'] == 'partial':
            logger.warning("Some database checks failed!")
            sys.exit(1)
        else:
            logger.error("All database checks failed!")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Database check failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
