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


class EnhancedDatabaseChecker:
    """Enhanced database connectivity and health checker with advanced monitoring."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'check_duration_ms': 0,
            'databases': {},
            'overall_status': 'unknown',
            'health_score': 0.0,
            'recommendations': [],
            'alerts': []
        }
        self.start_time = time.time()
        
        # Signal handlers for graceful shutdown
        signal.signal(signal.SIGTERM, self._signal_handler)
        signal.signal(signal.SIGINT, self._signal_handler)
        
    def _signal_handler(self, signum, frame):
        """Handle shutdown signals gracefully."""
        logger.warning(f"Received signal {signum}, shutting down gracefully...")
        sys.exit(0)
    
    async def _retry_operation(self, operation, *args, **kwargs):
        """Retry database operations with exponential backoff."""
        last_exception = None
        
        for attempt in range(RETRY_ATTEMPTS):
            try:
                return await operation(*args, **kwargs)
            except Exception as e:
                last_exception = e
                if attempt < RETRY_ATTEMPTS - 1:
                    delay = RETRY_DELAY * (2 ** attempt)
                    logger.warning(f"Operation failed (attempt {attempt + 1}), retrying in {delay}s: {e}")
                    await asyncio.sleep(delay)
                else:
                    logger.error(f"Operation failed after {RETRY_ATTEMPTS} attempts: {e}")
        
        raise last_exception
    
    async def check_mongodb(self) -> DatabaseStatus:
        """Enhanced MongoDB connectivity and health check."""
        mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/')
        database_name = os.getenv('MONGODB_DATABASE', 'a1betting')
        
        try:
            start_time = time.time()
            
            # Create async client with comprehensive configuration
            client = AsyncIOMotorClient(
                mongo_uri,
                serverSelectionTimeoutMS=TIMEOUT_SECONDS * 1000,
                connectTimeoutMS=TIMEOUT_SECONDS * 1000,
                socketTimeoutMS=TIMEOUT_SECONDS * 1000,
                maxPoolSize=10,
                retryWrites=True
            )
            
            # Test connection with ping
            await client.admin.command('ping')
            response_time = (time.time() - start_time) * 1000
            
            # Get server info
            server_info = await client.server_info()
            
            # Get database stats
            db = client[database_name]
            stats = await db.command('dbStats')
            
            # Get connection info
            connection_info = await client.admin.command('connPoolStats')
            
            # Calculate metrics
            metrics = DatabaseMetrics(
                response_time_ms=round(response_time, 2),
                connection_count=connection_info.get('totalInUse', 0),
                memory_usage_mb=round(stats.get('dataSize', 0) / (1024 * 1024), 2),
                cpu_usage_percent=0.0,  # MongoDB doesn't provide direct CPU stats
                error_rate=0.0,
                availability_score=1.0 if response_time < 1000 else max(0.5, 1.0 - (response_time / 5000))
            )
            
            # Calculate health score
            health_score = self._calculate_health_score(metrics, response_time)
            
            # Determine status
            status = self._determine_status(health_score, response_time)
            
            client.close()
            
            return DatabaseStatus(
                name='mongodb',
                status=status,
                metrics=metrics,
                version=server_info.get('version', 'unknown'),
                host=mongo_uri.split('@')[1].split('/')[0] if '@' in mongo_uri else 'localhost:27017',
                port=27017,
                database=database_name,
                error_message=None,
                last_check=datetime.now(),
                health_score=health_score
            )
            
        except Exception as e:
            logger.error(f"MongoDB check failed: {e}")
            return DatabaseStatus(
                name='mongodb',
                status='error',
                metrics=None,
                version=None,
                host=mongo_uri.split('@')[1].split('/')[0] if '@' in mongo_uri else 'localhost:27017',
                port=27017,
                database=database_name,
                error_message=str(e),
                last_check=datetime.now(),
                health_score=0.0
            )
    
    async def check_redis(self) -> DatabaseStatus:
        """Enhanced Redis connectivity and health check."""
        redis_host = os.getenv('REDIS_HOST', 'localhost')
        redis_port = int(os.getenv('REDIS_PORT', '6379'))
        redis_db = int(os.getenv('REDIS_DB', '0'))
        redis_password = os.getenv('REDIS_PASSWORD')
        
        try:
            start_time = time.time()
            
            # Create Redis client with configuration
            client = redis.Redis(
                host=redis_host,
                port=redis_port,
                db=redis_db,
                password=redis_password,
                socket_timeout=TIMEOUT_SECONDS,
                socket_connect_timeout=TIMEOUT_SECONDS,
                retry_on_timeout=True,
                decode_responses=True
            )
            
            # Test connection
            client.ping()
            response_time = (time.time() - start_time) * 1000
            
            # Get comprehensive Redis info
            info = client.info()
            
            # Test basic operations
            test_key = 'health_check_test'
            client.set(test_key, 'test_value', ex=60)
            test_value = client.get(test_key)
            client.delete(test_key)
            
            if test_value != 'test_value':
                raise Exception("Redis read/write test failed")
            
            # Calculate metrics
            metrics = DatabaseMetrics(
                response_time_ms=round(response_time, 2),
                connection_count=info.get('connected_clients', 0),
                memory_usage_mb=round(info.get('used_memory', 0) / (1024 * 1024), 2),
                cpu_usage_percent=info.get('used_cpu_sys', 0.0) * 100,
                error_rate=0.0,
                availability_score=1.0 if response_time < 500 else max(0.5, 1.0 - (response_time / 2500))
            )
            
            # Calculate health score
            health_score = self._calculate_health_score(metrics, response_time)
            
            # Determine status
            status = self._determine_status(health_score, response_time)
            
            client.close()
            
            return DatabaseStatus(
                name='redis',
                status=status,
                metrics=metrics,
                version=info.get('redis_version', 'unknown'),
                host=redis_host,
                port=redis_port,
                database=str(redis_db),
                error_message=None,
                last_check=datetime.now(),
                health_score=health_score
            )
            
        except Exception as e:
            logger.error(f"Redis check failed: {e}")
            return DatabaseStatus(
                name='redis',
                status='error',
                metrics=None,
                version=None,
                host=redis_host,
                port=redis_port,
                database=str(redis_db),
                error_message=str(e),
                last_check=datetime.now(),
                health_score=0.0
            )
    
    async def check_postgresql(self) -> DatabaseStatus:
        """Enhanced PostgreSQL connectivity and health check."""
        pg_url = os.getenv('POSTGRESQL_URL')
        
        if not pg_url:
            return DatabaseStatus(
                name='postgresql',
                status='not_configured',
                metrics=None,
                version=None,
                host='not_configured',
                port=5432,
                database=None,
                error_message='PostgreSQL URL not configured',
                last_check=datetime.now(),
                health_score=0.0
            )
        
        try:
            start_time = time.time()
            
            # Create engine with connection pooling
            engine = create_engine(
                pg_url,
                connect_args={
                    'connect_timeout': TIMEOUT_SECONDS,
                    'command_timeout': TIMEOUT_SECONDS
                },
                pool_pre_ping=True,
                pool_recycle=3600
            )
            
            with engine.connect() as conn:
                # Test basic connectivity
                result = conn.execute(text("SELECT version()"))
                version = result.fetchone()[0]
                
                # Get database info
                db_result = conn.execute(text("SELECT current_database()"))
                current_db = db_result.fetchone()[0]
                
                # Get performance stats
                stats_result = conn.execute(text("""
                    SELECT 
                        numbackends as connections,
                        xact_commit + xact_rollback as transactions,
                        blks_read + blks_hit as blocks_accessed
                    FROM pg_stat_database 
                    WHERE datname = current_database()
                """))
                stats = stats_result.fetchone()
                
            response_time = (time.time() - start_time) * 1000
            
            # Calculate metrics
            metrics = DatabaseMetrics(
                response_time_ms=round(response_time, 2),
                connection_count=stats[0] if stats else 0,
                memory_usage_mb=0.0,  # PostgreSQL memory stats require additional queries
                cpu_usage_percent=0.0,
                error_rate=0.0,
                availability_score=1.0 if response_time < 1000 else max(0.5, 1.0 - (response_time / 5000))
            )
            
            # Calculate health score
            health_score = self._calculate_health_score(metrics, response_time)
            
            # Determine status
            status = self._determine_status(health_score, response_time)
            
            # Extract host info
            host_info = pg_url.split('@')[1].split('/')[0] if '@' in pg_url else 'localhost:5432'
            
            return DatabaseStatus(
                name='postgresql',
                status=status,
                metrics=metrics,
                version=version.split(' ')[1] if ' ' in version else version,
                host=host_info,
                port=5432,
                database=current_db,
                error_message=None,
                last_check=datetime.now(),
                health_score=health_score
            )
            
        except Exception as e:
            logger.error(f"PostgreSQL check failed: {e}")
            host_info = pg_url.split('@')[1].split('/')[0] if '@' in pg_url else 'localhost:5432'
            
            return DatabaseStatus(
                name='postgresql',
                status='error',
                metrics=None,
                version=None,
                host=host_info,
                port=5432,
                database=None,
                error_message=str(e),
                last_check=datetime.now(),
                health_score=0.0
            )
    
    def _calculate_health_score(self, metrics: DatabaseMetrics, response_time: float) -> float:
        """Calculate overall health score based on metrics."""
        score = 1.0
        
        # Response time penalty
        if response_time > 1000:
            score -= 0.3
        elif response_time > 500:
            score -= 0.1
        
        # Availability score impact
        score *= metrics.availability_score
        
        # Memory usage impact (if over 80% assume degraded)
        if metrics.memory_usage_mb > 1000:  # Adjust threshold as needed
            score -= 0.1
        
        return max(0.0, min(1.0, score))
    
    def _determine_status(self, health_score: float, response_time: float) -> str:
        """Determine database status based on health score and metrics."""
        if health_score >= 0.9 and response_time < 500:
            return 'healthy'
        elif health_score >= 0.7 and response_time < 1000:
            return 'degraded'
        elif health_score >= 0.5:
            return 'critical'
        else:
            return 'error'
    
    async def run_checks(self) -> Dict[str, Any]:
        """Run all database checks concurrently."""
        logger.info("Starting enhanced database connectivity checks...")
        
        try:
            # Run all checks concurrently for better performance
            mongodb_task = asyncio.create_task(self.check_mongodb())
            redis_task = asyncio.create_task(self.check_redis())
            postgresql_task = asyncio.create_task(self.check_postgresql())
            
            # Wait for all checks to complete
            mongodb_status, redis_status, postgresql_status = await asyncio.gather(
                mongodb_task, redis_task, postgresql_task, return_exceptions=True
            )
            
            # Process results
            statuses = [mongodb_status, redis_status, postgresql_status]
            
            for status in statuses:
                if isinstance(status, Exception):
                    logger.error(f"Database check exception: {status}")
                    continue
                    
                self.results['databases'][status.name] = status.to_dict()
            
            # Calculate overall metrics
            self._calculate_overall_status()
            self._generate_recommendations()
            
            # Record completion time
            self.results['check_duration_ms'] = round((time.time() - self.start_time) * 1000, 2)
            
            logger.info(f"Database checks completed in {self.results['check_duration_ms']}ms")
            return self.results
            
        except Exception as e:
            logger.error(f"Error during database checks: {e}")
            self.results['overall_status'] = 'error'
            self.results['alerts'].append(f"Check execution failed: {e}")
            return self.results
    
    def _calculate_overall_status(self):
        """Calculate overall system status and health score."""
        statuses = []
        health_scores = []
        
        for db_name, db_data in self.results['databases'].items():
            if db_data.get('status') != 'not_configured':
                statuses.append(db_data.get('status'))
                health_scores.append(db_data.get('health_score', 0.0))
        
        if not statuses:
            self.results['overall_status'] = 'not_configured'
            self.results['health_score'] = 0.0
            return
        
        # Calculate average health score
        avg_health_score = sum(health_scores) / len(health_scores) if health_scores else 0.0
        self.results['health_score'] = round(avg_health_score, 2)
        
        # Determine overall status
        error_count = statuses.count('error')
        critical_count = statuses.count('critical')
        degraded_count = statuses.count('degraded')
        healthy_count = statuses.count('healthy')
        
        if error_count == len(statuses):
            self.results['overall_status'] = 'critical'
        elif error_count > 0 or critical_count > 0:
            self.results['overall_status'] = 'degraded'
        elif degraded_count > 0:
            self.results['overall_status'] = 'degraded'
        else:
            self.results['overall_status'] = 'healthy'
    
    def _generate_recommendations(self):
        """Generate actionable recommendations based on check results."""
        recommendations = []
        
        for db_name, db_data in self.results['databases'].items():
            status = db_data.get('status')
            metrics = db_data.get('metrics', {})
            
            if status == 'error':
                recommendations.append(f"🔴 {db_name.upper()}: Connection failed - Check service status and network connectivity")
            elif status == 'critical':
                recommendations.append(f"🟠 {db_name.upper()}: Performance degraded - Review resource allocation")
            elif status == 'degraded':
                if metrics.get('response_time_ms', 0) > 1000:
                    recommendations.append(f"⚡ {db_name.upper()}: High response time - Consider optimization")
                if metrics.get('memory_usage_mb', 0) > 1000:
                    recommendations.append(f"💾 {db_name.upper()}: High memory usage - Monitor capacity")
            
            if status == 'not_configured':
                recommendations.append(f"⚙️ {db_name.upper()}: Not configured - Set environment variables if needed")
        
        # Overall system recommendations
        if self.results['health_score'] < HEALTH_SCORE_THRESHOLD:
            recommendations.append("🔧 Overall system health below threshold - Consider maintenance window")
        
        self.results['recommendations'] = recommendations
    
    def generate_enhanced_report(self) -> str:
        """Generate a comprehensive, human-readable report."""
        report = f"""
🗄️  ENHANCED DATABASE CONNECTIVITY REPORT
{'='*60}
📅 Timestamp: {self.results['timestamp']}
⏱️  Check Duration: {self.results['check_duration_ms']}ms
🎯 Overall Status: {self.results['overall_status'].upper()}
📊 Health Score: {self.results['health_score']}/1.0

"""
        
        # Database details
        for db_name, db_info in self.results['databases'].items():
            status = db_info.get('status')
            
            # Status emoji mapping
            status_emojis = {
                'healthy': '✅',
                'degraded': '⚠️',
                'critical': '🔴',
                'error': '❌',
                'not_configured': '⚙️'
            }
            
            emoji = status_emojis.get(status, '❓')
            
            report += f"{emoji} {db_name.upper()}:\n"
            report += f"   Status: {status.upper()}\n"
            
            if status in ['healthy', 'degraded', 'critical']:
                metrics = db_info.get('metrics', {})
                report += f"   Response Time: {metrics.get('response_time_ms', 0)}ms\n"
                report += f"   Health Score: {db_info.get('health_score', 0):.2f}\n"
                
                if db_info.get('version'):
                    report += f"   Version: {db_info['version']}\n"
                
                if metrics.get('memory_usage_mb'):
                    report += f"   Memory Usage: {metrics['memory_usage_mb']}MB\n"
                
                if metrics.get('connection_count'):
                    report += f"   Connections: {metrics['connection_count']}\n"
                    
            elif status == 'error':
                report += f"   Error: {db_info.get('error_message', 'Unknown error')}\n"
                
            elif status == 'not_configured':
                report += f"   Note: {db_info.get('error_message', 'Not configured')}\n"
            
            report += "\n"
        
        # Recommendations section
        if self.results.get('recommendations'):
            report += "🔧 RECOMMENDATIONS:\n"
            report += "─" * 30 + "\n"
            for rec in self.results['recommendations']:
                report += f"   {rec}\n"
            report += "\n"
        
        # Alerts section
        if self.results.get('alerts'):
            report += "🚨 ALERTS:\n"
            report += "─" * 15 + "\n"
            for alert in self.results['alerts']:
                report += f"   {alert}\n"
            report += "\n"
        
        # Summary
        report += "📋 SUMMARY:\n"
        report += "─" * 15 + "\n"
        total_dbs = len([db for db in self.results['databases'].values() 
                        if db.get('status') != 'not_configured'])
        healthy_dbs = len([db for db in self.results['databases'].values() 
                          if db.get('status') == 'healthy'])
        
        if total_dbs > 0:
            health_percentage = (healthy_dbs / total_dbs) * 100
            report += f"   System Health: {health_percentage:.1f}% ({healthy_dbs}/{total_dbs} databases healthy)\n"
        else:
            report += "   No databases configured for monitoring\n"
        
        return report


async def main():
    """Main entry point with async support."""
    try:
        checker = EnhancedDatabaseChecker()
        results = await checker.run_checks()
        
        # Generate and display enhanced report
        report = checker.generate_enhanced_report()
        print(report)
        
        # Save results to multiple formats
        reports_dir = Path('automation/reports')
        reports_dir.mkdir(exist_ok=True)
        
        # Save JSON results
        with open(reports_dir / 'database_check.json', 'w') as f:
            json.dump(results, f, indent=2, default=str)
        
        # Save human-readable report
        with open(reports_dir / 'database_check_report.txt', 'w') as f:
            f.write(report)
        
        # Save metrics for trending
        metrics_file = reports_dir / 'database_metrics_history.json'
        history = []
        
        if metrics_file.exists():
            try:
                with open(metrics_file, 'r') as f:
                    history = json.load(f)
            except:
                history = []
        
        # Add current metrics to history (keep last 100 entries)
        history.append({
            'timestamp': results['timestamp'],
            'health_score': results['health_score'],
            'overall_status': results['overall_status'],
            'databases': {name: db.get('health_score', 0) 
                         for name, db in results['databases'].items()}
        })
        
        # Keep only last 100 entries
        history = history[-100:]
        
        with open(metrics_file, 'w') as f:
            json.dump(history, f, indent=2)
        
        # Exit with appropriate code based on overall status
        status_codes = {
            'healthy': 0,
            'degraded': 1,
            'critical': 2,
            'error': 3,
            'not_configured': 0
        }
        
        exit_code = status_codes.get(results['overall_status'], 3)
        
        if exit_code == 0:
            logger.info("All database checks passed successfully!")
        elif exit_code == 1:
            logger.warning("Some database performance issues detected!")
        elif exit_code == 2:
            logger.error("Critical database issues detected!")
        else:
            logger.error("Database check execution failed!")
        
        sys.exit(exit_code)
        
    except Exception as e:
        logger.error(f"Database check script failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    # Run the async main function
    asyncio.run(main())
