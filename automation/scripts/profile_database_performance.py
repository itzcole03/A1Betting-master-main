#!/usr/bin/env python3
"""
Database Performance Profiler for A1Betting Platform

This script profiles database performance including query analysis,
connection monitoring, and optimization recommendations.
"""

import os
import sys
import json
import time
import logging
import psutil
from datetime import datetime, timedelta
from pathlib import Path
import argparse
from typing import Dict, List, Any, Optional
import warnings
warnings.filterwarnings('ignore')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DatabasePerformanceProfiler:
    """Database performance profiling and analysis system."""
    
    def __init__(self, reports_dir: str = "automation/reports"):
        self.reports_dir = Path(reports_dir)
        self.reports_dir.mkdir(parents=True, exist_ok=True)
        self.profile_results = {}
        
    def profile_postgresql(self, connection_params: Dict[str, Any]) -> Dict[str, Any]:
        """Profile PostgreSQL database performance."""
        logger.info("Profiling PostgreSQL performance...")
        
        results = {
            "status": "success",
            "database_type": "postgresql",
            "performance_metrics": {},
            "slow_queries": [],
            "connection_stats": {},
            "recommendations": []
        }
        
        try:
            import psycopg2
            from psycopg2.extras import DictCursor
            
            # Connect to database
            conn = psycopg2.connect(
                host=connection_params.get('host', 'localhost'),
                port=connection_params.get('port', 5432),
                database=connection_params.get('database', 'postgres'),
                user=connection_params.get('user', 'postgres'),
                password=connection_params.get('password', '')
            )
            
            with conn.cursor(cursor_factory=DictCursor) as cursor:
                # Get database size
                cursor.execute("SELECT pg_size_pretty(pg_database_size(current_database())) as size")
                db_size = cursor.fetchone()['size']
                
                # Get connection stats
                cursor.execute("""
                    SELECT state, count(*) as count 
                    FROM pg_stat_activity 
                    WHERE datname = current_database() 
                    GROUP BY state
                """)
                connection_stats = {row['state']: row['count'] for row in cursor.fetchall()}
                
                # Get slow queries from pg_stat_statements if available
                try:
                    cursor.execute("""
                        SELECT query, calls, total_time, mean_time, rows
                        FROM pg_stat_statements 
                        WHERE mean_time > 100 
                        ORDER BY mean_time DESC 
                        LIMIT 10
                    """)
                    slow_queries = []
                    for row in cursor.fetchall():
                        slow_queries.append({
                            "query": row['query'][:200],  # Truncate for readability
                            "calls": row['calls'],
                            "total_time": row['total_time'],
                            "mean_time": row['mean_time'],
                            "rows": row['rows']
                        })
                    results["slow_queries"] = slow_queries
                except psycopg2.Error:
                    logger.warning("pg_stat_statements not available")
                
                # Get table statistics
                cursor.execute("""
                    SELECT schemaname, tablename, n_tup_ins, n_tup_upd, n_tup_del, n_live_tup, n_dead_tup
                    FROM pg_stat_user_tables 
                    ORDER BY n_live_tup DESC 
                    LIMIT 10
                """)
                table_stats = []
                for row in cursor.fetchall():
                    table_stats.append(dict(row))
                
                # Get index usage
                cursor.execute("""
                    SELECT schemaname, tablename, indexname, idx_tup_read, idx_tup_fetch
                    FROM pg_stat_user_indexes 
                    WHERE idx_tup_read > 0
                    ORDER BY idx_tup_read DESC 
                    LIMIT 10
                """)
                index_stats = []
                for row in cursor.fetchall():
                    index_stats.append(dict(row))
                
                # Performance metrics
                results["performance_metrics"] = {
                    "database_size": db_size,
                    "active_connections": connection_stats.get('active', 0),
                    "idle_connections": connection_stats.get('idle', 0),
                    "table_count": len(table_stats),
                    "index_count": len(index_stats)
                }
                
                results["connection_stats"] = connection_stats
                results["table_statistics"] = table_stats
                results["index_statistics"] = index_stats
                
                # Generate recommendations
                if connection_stats.get('idle', 0) > connection_stats.get('active', 0) * 2:
                    results["recommendations"].append("High number of idle connections - consider connection pooling")
                
                if len(slow_queries) > 5:
                    results["recommendations"].append("Multiple slow queries detected - review and optimize queries")
                
                # Check for tables without primary keys
                cursor.execute("""
                    SELECT t.table_name
                    FROM information_schema.tables t
                    LEFT JOIN information_schema.table_constraints tc ON t.table_name = tc.table_name 
                        AND tc.constraint_type = 'PRIMARY KEY'
                    WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE' 
                        AND tc.table_name IS NULL
                """)
                tables_without_pk = cursor.fetchall()
                if tables_without_pk:
                    results["recommendations"].append(f"{len(tables_without_pk)} tables without primary keys")
            
            conn.close()
            return results
            
        except ImportError:
            return {
                "status": "error",
                "message": "psycopg2 not installed - cannot profile PostgreSQL"
            }
        except Exception as e:
            logger.error(f"Error profiling PostgreSQL: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def profile_mongodb(self, connection_params: Dict[str, Any]) -> Dict[str, Any]:
        """Profile MongoDB database performance."""
        logger.info("Profiling MongoDB performance...")
        
        results = {
            "status": "success",
            "database_type": "mongodb",
            "performance_metrics": {},
            "slow_operations": [],
            "collection_stats": [],
            "recommendations": []
        }
        
        try:
            import pymongo
            
            # Connect to MongoDB
            uri = connection_params.get('uri', 'mongodb://localhost:27017/')
            client = pymongo.MongoClient(uri)
            db_name = connection_params.get('database', 'test')
            db = client[db_name]
            
            # Get database stats
            db_stats = db.command("dbStats")
            
            # Get server status
            server_status = db.command("serverStatus")
            
            # Performance metrics
            results["performance_metrics"] = {
                "database_size_mb": db_stats.get('dataSize', 0) / (1024 * 1024),
                "collection_count": db_stats.get('collections', 0),
                "document_count": db_stats.get('objects', 0),
                "index_count": db_stats.get('indexes', 0),
                "connections": server_status.get('connections', {}).get('current', 0),
                "uptime_hours": server_status.get('uptime', 0) / 3600
            }
            
            # Get collection statistics
            collection_names = db.list_collection_names()
            for collection_name in collection_names[:10]:  # Limit to first 10 collections
                try:
                    collection = db[collection_name]
                    stats = db.command("collStats", collection_name)
                    
                    results["collection_stats"].append({
                        "name": collection_name,
                        "document_count": stats.get('count', 0),
                        "size_mb": stats.get('size', 0) / (1024 * 1024),
                        "average_object_size": stats.get('avgObjSize', 0),
                        "index_count": stats.get('nindexes', 0)
                    })
                except Exception as e:
                    logger.warning(f"Error getting stats for collection {collection_name}: {e}")
            
            # Check for slow operations (if profiling is enabled)
            try:
                # Get profiling status
                profiling_status = db.command("profile", -1)
                if profiling_status.get('was') > 0:
                    # Get slow operations from system.profile
                    slow_ops = list(db['system.profile'].find().sort("ts", -1).limit(10))
                    for op in slow_ops:
                        if op.get('millis', 0) > 100:  # Operations taking more than 100ms
                            results["slow_operations"].append({
                                "operation": op.get('op', 'unknown'),
                                "namespace": op.get('ns', 'unknown'),
                                "duration_ms": op.get('millis', 0),
                                "timestamp": op.get('ts')
                            })
                else:
                    logger.info("MongoDB profiling is not enabled")
            except Exception as e:
                logger.warning(f"Error getting slow operations: {e}")
            
            # Generate recommendations
            memory_usage = server_status.get('mem', {})
            if memory_usage.get('resident', 0) > memory_usage.get('virtual', 1) * 0.8:
                results["recommendations"].append("High memory usage - consider increasing RAM or optimizing queries")
            
            if results["performance_metrics"]["connections"] > 100:
                results["recommendations"].append("High number of connections - consider connection pooling")
            
            if len(results["slow_operations"]) > 5:
                results["recommendations"].append("Multiple slow operations detected - review query performance")
            
            # Check for collections without indexes
            collections_without_indexes = []
            for coll_stat in results["collection_stats"]:
                if coll_stat["index_count"] <= 1:  # Only default _id index
                    collections_without_indexes.append(coll_stat["name"])
            
            if collections_without_indexes:
                results["recommendations"].append(f"Collections without proper indexes: {', '.join(collections_without_indexes)}")
            
            client.close()
            return results
            
        except ImportError:
            return {
                "status": "error",
                "message": "pymongo not installed - cannot profile MongoDB"
            }
        except Exception as e:
            logger.error(f"Error profiling MongoDB: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def profile_redis(self, connection_params: Dict[str, Any]) -> Dict[str, Any]:
        """Profile Redis database performance."""
        logger.info("Profiling Redis performance...")
        
        results = {
            "status": "success",
            "database_type": "redis",
            "performance_metrics": {},
            "memory_analysis": {},
            "slow_log": [],
            "recommendations": []
        }
        
        try:
            import redis
            
            # Connect to Redis
            r = redis.Redis(
                host=connection_params.get('host', 'localhost'),
                port=connection_params.get('port', 6379),
                password=connection_params.get('password'),
                decode_responses=True
            )
            
            # Get Redis info
            info = r.info()
            
            # Performance metrics
            results["performance_metrics"] = {
                "connected_clients": info.get('connected_clients', 0),
                "used_memory_mb": info.get('used_memory', 0) / (1024 * 1024),
                "used_memory_peak_mb": info.get('used_memory_peak', 0) / (1024 * 1024),
                "total_commands_processed": info.get('total_commands_processed', 0),
                "keyspace_hits": info.get('keyspace_hits', 0),
                "keyspace_misses": info.get('keyspace_misses', 0),
                "uptime_hours": info.get('uptime_in_seconds', 0) / 3600
            }
            
            # Calculate hit ratio
            hits = results["performance_metrics"]["keyspace_hits"]
            misses = results["performance_metrics"]["keyspace_misses"]
            if hits + misses > 0:
                hit_ratio = hits / (hits + misses) * 100
                results["performance_metrics"]["hit_ratio_percent"] = hit_ratio
            
            # Memory analysis
            results["memory_analysis"] = {
                "used_memory_human": info.get('used_memory_human', 'N/A'),
                "used_memory_rss_human": info.get('used_memory_rss_human', 'N/A'),
                "mem_fragmentation_ratio": info.get('mem_fragmentation_ratio', 0),
                "maxmemory_human": info.get('maxmemory_human', 'N/A'),
                "maxmemory_policy": info.get('maxmemory_policy', 'N/A')
            }
            
            # Get slow log
            try:
                slow_log = r.slowlog_get(10)
                for entry in slow_log:
                    results["slow_log"].append({
                        "id": entry.get('id'),
                        "start_time": entry.get('start_time'),
                        "duration_microseconds": entry.get('duration'),
                        "command": ' '.join(entry.get('command', []))[:100]  # Truncate for readability
                    })
            except Exception as e:
                logger.warning(f"Error getting slow log: {e}")
            
            # Get database sizes
            db_sizes = {}
            for db_num in range(16):  # Redis has 16 databases by default
                try:
                    r.select(db_num)
                    db_size = r.dbsize()
                    if db_size > 0:
                        db_sizes[f"db{db_num}"] = db_size
                except:
                    continue
            
            results["database_sizes"] = db_sizes
            
            # Generate recommendations
            if results["performance_metrics"]["hit_ratio_percent"] < 80:
                results["recommendations"].append("Low cache hit ratio - review caching strategy")
            
            if results["memory_analysis"]["mem_fragmentation_ratio"] > 1.5:
                results["recommendations"].append("High memory fragmentation - consider Redis restart")
            
            if results["performance_metrics"]["connected_clients"] > 100:
                results["recommendations"].append("High number of connected clients - monitor for connection leaks")
            
            if len(results["slow_log"]) > 5:
                results["recommendations"].append("Multiple slow commands detected - review command performance")
            
            # Check for large keys (simplified check)
            try:
                r.select(0)  # Select first database
                sample_keys = r.randomkey() if r.dbsize() > 0 else None
                if sample_keys:
                    # This is a simplified check - in practice, you'd want to scan more keys
                    key_size = len(str(r.get(sample_keys) or ''))
                    if key_size > 1024 * 1024:  # 1MB
                        results["recommendations"].append("Large keys detected - consider data structure optimization")
            except:
                pass
            
            return results
            
        except ImportError:
            return {
                "status": "error",
                "message": "redis-py not installed - cannot profile Redis"
            }
        except Exception as e:
            logger.error(f"Error profiling Redis: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def profile_mysql(self, connection_params: Dict[str, Any]) -> Dict[str, Any]:
        """Profile MySQL database performance."""
        logger.info("Profiling MySQL performance...")
        
        results = {
            "status": "success",
            "database_type": "mysql",
            "performance_metrics": {},
            "slow_queries": [],
            "table_stats": [],
            "recommendations": []
        }
        
        try:
            import mysql.connector
            
            # Connect to MySQL
            conn = mysql.connector.connect(
                host=connection_params.get('host', 'localhost'),
                port=connection_params.get('port', 3306),
                database=connection_params.get('database'),
                user=connection_params.get('user'),
                password=connection_params.get('password')
            )
            
            cursor = conn.cursor(dictionary=True)
            
            # Get status variables
            cursor.execute("SHOW STATUS")
            status_vars = {row['Variable_name']: row['Value'] for row in cursor.fetchall()}
            
            # Performance metrics
            results["performance_metrics"] = {
                "connections": int(status_vars.get('Connections', 0)),
                "threads_connected": int(status_vars.get('Threads_connected', 0)),
                "queries": int(status_vars.get('Queries', 0)),
                "slow_queries": int(status_vars.get('Slow_queries', 0)),
                "uptime": int(status_vars.get('Uptime', 0)),
                "innodb_buffer_pool_reads": int(status_vars.get('Innodb_buffer_pool_reads', 0)),
                "innodb_buffer_pool_read_requests": int(status_vars.get('Innodb_buffer_pool_read_requests', 0))
            }
            
            # Calculate buffer pool hit ratio
            reads = results["performance_metrics"]["innodb_buffer_pool_reads"]
            requests = results["performance_metrics"]["innodb_buffer_pool_read_requests"]
            if requests > 0:
                hit_ratio = (1 - reads / requests) * 100
                results["performance_metrics"]["buffer_pool_hit_ratio"] = hit_ratio
            
            # Get slow query log entries (if enabled)
            try:
                cursor.execute("SELECT * FROM mysql.slow_log ORDER BY start_time DESC LIMIT 10")
                slow_queries = cursor.fetchall()
                for query in slow_queries:
                    results["slow_queries"].append({
                        "start_time": str(query.get('start_time')),
                        "query_time": str(query.get('query_time')),
                        "sql_text": query.get('sql_text', '')[:200]  # Truncate
                    })
            except mysql.connector.Error:
                logger.warning("Slow query log not accessible or not enabled")
            
            # Get table statistics
            if connection_params.get('database'):
                cursor.execute(f"""
                    SELECT TABLE_NAME, TABLE_ROWS, DATA_LENGTH, INDEX_LENGTH
                    FROM information_schema.TABLES 
                    WHERE TABLE_SCHEMA = '{connection_params['database']}'
                    ORDER BY DATA_LENGTH DESC 
                    LIMIT 10
                """)
                table_stats = cursor.fetchall()
                for table in table_stats:
                    results["table_stats"].append({
                        "table_name": table['TABLE_NAME'],
                        "rows": table['TABLE_ROWS'] or 0,
                        "data_size_mb": (table['DATA_LENGTH'] or 0) / (1024 * 1024),
                        "index_size_mb": (table['INDEX_LENGTH'] or 0) / (1024 * 1024)
                    })
            
            # Generate recommendations
            if results["performance_metrics"]["buffer_pool_hit_ratio"] < 95:
                results["recommendations"].append("Low InnoDB buffer pool hit ratio - consider increasing buffer pool size")
            
            if results["performance_metrics"]["slow_queries"] > 0:
                results["recommendations"].append("Slow queries detected - enable and review slow query log")
            
            if results["performance_metrics"]["threads_connected"] > 100:
                results["recommendations"].append("High number of connected threads - monitor for connection issues")
            
            cursor.close()
            conn.close()
            
            return results
            
        except ImportError:
            return {
                "status": "error",
                "message": "mysql-connector-python not installed - cannot profile MySQL"
            }
        except Exception as e:
            logger.error(f"Error profiling MySQL: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def run_comprehensive_profile(self, databases: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Run comprehensive database performance profiling."""
        logger.info("Starting comprehensive database performance profiling...")
        
        profile_summary = {
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "databases_profiled": 0,
            "profile_results": {},
            "performance_summary": {},
            "recommendations": []
        }
        
        try:
            # If no databases provided, try to auto-detect
            if not databases:
                databases = self._auto_detect_databases()
            
            if not databases:
                # Create mock profile for demonstration
                profile_summary["profile_results"]["mock_database"] = {
                    "status": "info",
                    "message": "No databases configured. Run with specific database connection parameters."
                }
                return profile_summary
            
            # Profile each database
            for db_config in databases:
                db_type = db_config.get('type', 'unknown')
                db_name = db_config.get('name', f'{db_type}_db')
                
                logger.info(f"Profiling {db_type} database: {db_name}")
                
                try:
                    if db_type == 'postgresql':
                        result = self.profile_postgresql(db_config)
                    elif db_type == 'mongodb':
                        result = self.profile_mongodb(db_config)
                    elif db_type == 'redis':
                        result = self.profile_redis(db_config)
                    elif db_type == 'mysql':
                        result = self.profile_mysql(db_config)
                    else:
                        result = {
                            "status": "error",
                            "message": f"Unsupported database type: {db_type}"
                        }
                    
                    profile_summary["profile_results"][db_name] = result
                    
                    if result.get("status") == "success":
                        profile_summary["databases_profiled"] += 1
                
                except Exception as e:
                    logger.error(f"Error profiling database {db_name}: {e}")
                    profile_summary["profile_results"][db_name] = {
                        "status": "error",
                        "message": str(e)
                    }
            
            # Calculate performance summary
            profile_summary["performance_summary"] = self._calculate_performance_summary(profile_summary["profile_results"])
            
            # Generate comprehensive recommendations
            profile_summary["recommendations"] = self._generate_performance_recommendations(profile_summary)
            
            # Save detailed report
            report_file = self.reports_dir / f"database_performance_profile_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(report_file, 'w') as f:
                json.dump(profile_summary, f, indent=2, default=str)
            
            logger.info(f"Database performance profiling completed. Report saved to: {report_file}")
            return profile_summary
            
        except Exception as e:
            logger.error(f"Error during database performance profiling: {e}")
            profile_summary["status"] = "error"
            profile_summary["error"] = str(e)
            return profile_summary
    
    def _auto_detect_databases(self) -> List[Dict[str, Any]]:
        """Auto-detect database configurations from environment."""
        databases = []
        
        # Check environment variables for common database configurations
        if os.getenv('DATABASE_URL') or os.getenv('POSTGRES_URL'):
            databases.append({
                "type": "postgresql",
                "name": "postgres_main",
                "host": os.getenv('POSTGRES_HOST', 'localhost'),
                "port": int(os.getenv('POSTGRES_PORT', 5432)),
                "database": os.getenv('POSTGRES_DB', 'postgres'),
                "user": os.getenv('POSTGRES_USER', 'postgres'),
                "password": os.getenv('POSTGRES_PASSWORD', '')
            })
        
        if os.getenv('MONGODB_URL') or os.getenv('MONGO_URL'):
            databases.append({
                "type": "mongodb",
                "name": "mongodb_main",
                "uri": os.getenv('MONGODB_URL', 'mongodb://localhost:27017/'),
                "database": os.getenv('MONGO_DB', 'test')
            })
        
        if os.getenv('REDIS_URL'):
            databases.append({
                "type": "redis",
                "name": "redis_main",
                "host": os.getenv('REDIS_HOST', 'localhost'),
                "port": int(os.getenv('REDIS_PORT', 6379)),
                "password": os.getenv('REDIS_PASSWORD')
            })
        
        if os.getenv('MYSQL_URL'):
            databases.append({
                "type": "mysql",
                "name": "mysql_main",
                "host": os.getenv('MYSQL_HOST', 'localhost'),
                "port": int(os.getenv('MYSQL_PORT', 3306)),
                "database": os.getenv('MYSQL_DATABASE'),
                "user": os.getenv('MYSQL_USER'),
                "password": os.getenv('MYSQL_PASSWORD')
            })
        
        return databases
    
    def _calculate_performance_summary(self, profile_results: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate overall performance summary."""
        summary = {
            "total_databases": len(profile_results),
            "successful_profiles": 0,
            "performance_issues": 0,
            "critical_issues": 0,
            "database_types": [],
            "overall_health": "good"
        }
        
        try:
            for db_name, result in profile_results.items():
                if result.get("status") == "success":
                    summary["successful_profiles"] += 1
                    db_type = result.get("database_type", "unknown")
                    if db_type not in summary["database_types"]:
                        summary["database_types"].append(db_type)
                    
                    # Count issues based on recommendations
                    recommendations = result.get("recommendations", [])
                    summary["performance_issues"] += len(recommendations)
                    
                    # Check for critical issues
                    critical_keywords = ["urgent", "critical", "high", "immediate"]
                    for rec in recommendations:
                        if any(keyword in rec.lower() for keyword in critical_keywords):
                            summary["critical_issues"] += 1
            
            # Determine overall health
            if summary["critical_issues"] > 0:
                summary["overall_health"] = "critical"
            elif summary["performance_issues"] > summary["successful_profiles"] * 2:
                summary["overall_health"] = "poor"
            elif summary["performance_issues"] > summary["successful_profiles"]:
                summary["overall_health"] = "moderate"
            
        except Exception as e:
            logger.warning(f"Error calculating performance summary: {e}")
        
        return summary
    
    def _generate_performance_recommendations(self, profile_summary: Dict[str, Any]) -> List[str]:
        """Generate comprehensive performance recommendations."""
        recommendations = []
        
        performance_summary = profile_summary.get("performance_summary", {})
        
        if performance_summary.get("overall_health") == "critical":
            recommendations.append("CRITICAL: Immediate database optimization required")
        
        if performance_summary.get("critical_issues", 0) > 0:
            recommendations.append(f"Address {performance_summary['critical_issues']} critical database issues")
        
        # Collect specific recommendations from each database
        for db_name, result in profile_summary.get("profile_results", {}).items():
            if isinstance(result, dict) and result.get("recommendations"):
                # Take top 2 recommendations from each database
                for rec in result["recommendations"][:2]:
                    recommendations.append(f"{db_name}: {rec}")
        
        # General recommendations
        recommendations.extend([
            "Implement database monitoring and alerting",
            "Regular database maintenance and optimization",
            "Consider read replicas for high-traffic databases",
            "Implement proper backup and recovery procedures",
            "Regular performance testing and capacity planning"
        ])
        
        return recommendations

def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="Database Performance Profiler for A1Betting")
    parser.add_argument("--config", help="JSON file with database configurations")
    parser.add_argument("--reports-dir", default="automation/reports", help="Directory for reports")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Load database configurations
    databases = []
    if args.config and os.path.exists(args.config):
        try:
            with open(args.config, 'r') as f:
                config = json.load(f)
                databases = config.get('databases', [])
        except Exception as e:
            logger.error(f"Error loading config file: {e}")
    
    # Create profiler
    profiler = DatabasePerformanceProfiler(reports_dir=args.reports_dir)
    
    # Run comprehensive profiling
    results = profiler.run_comprehensive_profile(databases)
    
    # Print summary
    print("\n" + "="*50)
    print("DATABASE PERFORMANCE PROFILE SUMMARY")
    print("="*50)
    print(f"Status: {results['status']}")
    print(f"Databases Profiled: {results['databases_profiled']}")
    
    if results.get('performance_summary'):
        summary = results['performance_summary']
        print(f"Overall Health: {summary.get('overall_health', 'unknown').upper()}")
        print(f"Performance Issues: {summary.get('performance_issues', 0)}")
        print(f"Critical Issues: {summary.get('critical_issues', 0)}")
        print(f"Database Types: {', '.join(summary.get('database_types', []))}")
    
    if results.get('recommendations'):
        print("\nTop Recommendations:")
        for i, rec in enumerate(results['recommendations'][:7], 1):
            print(f"  {i}. {rec}")
    
    # Exit with appropriate code
    if results['status'] == 'error':
        sys.exit(1)
    elif results.get('performance_summary', {}).get('overall_health') == 'critical':
        print("\nWarning: Critical database performance issues detected")
        sys.exit(1)
    elif results.get('performance_summary', {}).get('critical_issues', 0) > 0:
        print("\nWarning: Critical issues require immediate attention")
        sys.exit(1)
    else:
        print("\nDatabase performance profiling completed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
