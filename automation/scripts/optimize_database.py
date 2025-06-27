#!/usr/bin/env python3
"""
Database Optimization Script for A1Betting Automation System
Analyzes and optimizes database performance.
"""

import asyncio
import json
import logging
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, List

import pymongo
from pymongo import MongoClient

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class DatabaseOptimizer:
    """Database performance analyzer and optimizer."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'optimization_results': {},
            'performance_analysis': {},
            'recommendations': [],
            'summary': {}
        }
        self.mongo_client = None
    
    def connect_to_mongodb(self) -> bool:
        """Connect to MongoDB."""
        try:
            mongo_url = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/a1betting')
            self.mongo_client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
            
            # Test connection
            self.mongo_client.admin.command('ping')
            logger.info("Connected to MongoDB successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            return False
    
    def analyze_mongodb_performance(self) -> Dict[str, Any]:
        """Analyze MongoDB performance and identify optimization opportunities."""
        try:
            logger.info("Analyzing MongoDB performance...")
            
            if not self.mongo_client:
                return {
                    'status': 'failed',
                    'error': 'No MongoDB connection'
                }
            
            # Get database info
            db_name = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/a1betting').split('/')[-1] or 'a1betting'
            db = self.mongo_client[db_name]
            
            analysis = {
                'database_stats': {},
                'collection_stats': [],
                'index_analysis': {},
                'slow_operations': [],
                'optimization_opportunities': []
            }
            
            # Database statistics
            db_stats = db.command('dbStats')
            analysis['database_stats'] = {
                'collections': db_stats.get('collections', 0),
                'objects': db_stats.get('objects', 0),
                'data_size_mb': round(db_stats.get('dataSize', 0) / (1024*1024), 2),
                'storage_size_mb': round(db_stats.get('storageSize', 0) / (1024*1024), 2),
                'index_size_mb': round(db_stats.get('indexSize', 0) / (1024*1024), 2),
                'avg_obj_size': db_stats.get('avgObjSize', 0)
            }
            
            # Collection statistics
            collections = db.list_collection_names()
            for collection_name in collections:
                try:
                    collection = db[collection_name]
                    
                    # Get collection stats
                    coll_stats = db.command('collStats', collection_name)
                    
                    # Get index information
                    indexes = list(collection.list_indexes())
                    
                    coll_analysis = {
                        'name': collection_name,
                        'count': coll_stats.get('count', 0),
                        'size_mb': round(coll_stats.get('size', 0) / (1024*1024), 2),
                        'storage_size_mb': round(coll_stats.get('storageSize', 0) / (1024*1024), 2),
                        'avg_obj_size': coll_stats.get('avgObjSize', 0),
                        'indexes': len(indexes),
                        'index_details': [
                            {
                                'name': idx.get('name'),
                                'keys': idx.get('key'),
                                'unique': idx.get('unique', False),
                                'sparse': idx.get('sparse', False)
                            }
                            for idx in indexes
                        ]
                    }
                    
                    analysis['collection_stats'].append(coll_analysis)
                    
                    # Check for optimization opportunities
                    if coll_analysis['count'] > 1000 and coll_analysis['indexes'] <= 1:
                        analysis['optimization_opportunities'].append({
                            'collection': collection_name,
                            'issue': 'Large collection with minimal indexes',
                            'recommendation': 'Consider adding indexes for common queries'
                        })
                    
                    if coll_analysis['avg_obj_size'] > 16 * 1024:  # 16KB
                        analysis['optimization_opportunities'].append({
                            'collection': collection_name,
                            'issue': f'Large average document size: {coll_analysis["avg_obj_size"]} bytes',
                            'recommendation': 'Consider document schema optimization'
                        })
                
                except Exception as e:
                    logger.warning(f"Error analyzing collection {collection_name}: {e}")
            
            # Analyze profiling data (if enabled)
            try:
                # Enable profiling for slow operations
                db.set_profiling_level(1, slow_ms=100)
                
                # Get recent slow operations
                profiling_data = list(db.system.profile.find().sort('ts', -1).limit(10))
                
                for op in profiling_data:
                    analysis['slow_operations'].append({
                        'timestamp': op.get('ts'),
                        'operation': op.get('op'),
                        'collection': op.get('ns', '').split('.')[-1] if op.get('ns') else 'unknown',
                        'duration_ms': op.get('millis', 0),
                        'command': str(op.get('command', {}))[:200]  # Truncate long commands
                    })
                
            except Exception as e:
                logger.warning(f"Error analyzing profiling data: {e}")
            
            return {
                'status': 'completed',
                'analysis': analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def optimize_mongodb_indexes(self) -> Dict[str, Any]:
        """Optimize MongoDB indexes based on analysis."""
        try:
            logger.info("Optimizing MongoDB indexes...")
            
            if not self.mongo_client:
                return {
                    'status': 'failed',
                    'error': 'No MongoDB connection'
                }
            
            optimization_results = {
                'indexes_created': [],
                'indexes_dropped': [],
                'recommendations': []
            }
            
            db_name = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/a1betting').split('/')[-1] or 'a1betting'
            db = self.mongo_client[db_name]
            
            # Common index patterns for betting applications
            suggested_indexes = {
                'users': [
                    {'email': 1},
                    {'username': 1},
                    {'created_at': -1}
                ],
                'bets': [
                    {'user_id': 1, 'created_at': -1},
                    {'status': 1, 'created_at': -1},
                    {'event_id': 1},
                    {'created_at': -1}
                ],
                'events': [
                    {'start_time': 1},
                    {'status': 1, 'start_time': 1},
                    {'sport': 1, 'start_time': 1}
                ],
                'transactions': [
                    {'user_id': 1, 'created_at': -1},
                    {'type': 1, 'created_at': -1},
                    {'status': 1}
                ]
            }
            
            collections = db.list_collection_names()
            
            for collection_name in collections:
                if collection_name in suggested_indexes:
                    collection = db[collection_name]
                    existing_indexes = {idx['name']: idx for idx in collection.list_indexes()}
                    
                    for index_spec in suggested_indexes[collection_name]:
                        # Generate index name
                        index_name = '_'.join([f"{k}_{v}" for k, v in index_spec.items()])
                        
                        # Check if similar index already exists
                        if not any(idx.get('key') == index_spec for idx in existing_indexes.values()):
                            try:
                                # Check if collection has enough documents to benefit from index
                                doc_count = collection.count_documents({})
                                if doc_count > 100:  # Only create indexes for collections with substantial data
                                    collection.create_index(list(index_spec.items()), name=index_name, background=True)
                                    optimization_results['indexes_created'].append({
                                        'collection': collection_name,
                                        'index': index_spec,
                                        'name': index_name
                                    })
                                    logger.info(f"Created index {index_name} on {collection_name}")
                                else:
                                    optimization_results['recommendations'].append({
                                        'collection': collection_name,
                                        'recommendation': f'Collection has only {doc_count} documents - index creation skipped'
                                    })
                            except Exception as e:
                                logger.warning(f"Failed to create index {index_name} on {collection_name}: {e}")
            
            return {
                'status': 'completed',
                'results': optimization_results
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def analyze_query_performance(self) -> Dict[str, Any]:
        """Analyze query performance and suggest optimizations."""
        try:
            logger.info("Analyzing query performance...")
            
            if not self.mongo_client:
                return {
                    'status': 'failed',
                    'error': 'No MongoDB connection'
                }
            
            db_name = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/a1betting').split('/')[-1] or 'a1betting'
            db = self.mongo_client[db_name]
            
            query_analysis = {
                'slow_queries': [],
                'index_usage': {},
                'recommendations': []
            }
            
            # Enable profiling to capture slow queries
            db.set_profiling_level(2, slow_ms=50)  # Profile queries slower than 50ms
            
            # Wait a bit to capture some operations
            time.sleep(2)
            
            # Analyze profiled operations
            profile_collection = db.system.profile
            slow_queries = list(profile_collection.find({'millis': {'$gt': 50}}).sort('ts', -1).limit(20))
            
            for query in slow_queries:
                query_info = {
                    'timestamp': query.get('ts'),
                    'duration_ms': query.get('millis', 0),
                    'operation': query.get('op'),
                    'collection': query.get('ns', '').split('.')[-1] if query.get('ns') else 'unknown',
                    'examined_docs': query.get('docsExamined', 0),
                    'returned_docs': query.get('docsReturned', 0),
                    'execution_stats': query.get('execStats', {})
                }
                
                # Check if query is inefficient
                examined = query_info['examined_docs']
                returned = query_info['returned_docs']
                
                if examined > 0 and returned > 0:
                    efficiency_ratio = returned / examined
                    if efficiency_ratio < 0.1:  # Less than 10% efficiency
                        query_info['inefficient'] = True
                        query_info['efficiency_ratio'] = efficiency_ratio
                        query_analysis['recommendations'].append({
                            'type': 'inefficient_query',
                            'collection': query_info['collection'],
                            'issue': f'Query examined {examined} docs but returned only {returned}',
                            'recommendation': 'Consider adding appropriate indexes'
                        })
                
                query_analysis['slow_queries'].append(query_info)
            
            # Reset profiling level
            db.set_profiling_level(0)
            
            return {
                'status': 'completed',
                'analysis': query_analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def cleanup_database(self) -> Dict[str, Any]:
        """Perform database cleanup operations."""
        try:
            logger.info("Performing database cleanup...")
            
            if not self.mongo_client:
                return {
                    'status': 'failed',
                    'error': 'No MongoDB connection'
                }
            
            cleanup_results = {
                'operations_performed': [],
                'space_reclaimed_mb': 0,
                'collections_compacted': []
            }
            
            db_name = os.getenv('MONGODB_URL', 'mongodb://localhost:27017/a1betting').split('/')[-1] or 'a1betting'
            db = self.mongo_client[db_name]
            
            # Get initial database size
            initial_stats = db.command('dbStats')
            initial_storage_size = initial_stats.get('storageSize', 0)
            
            collections = db.list_collection_names()
            
            for collection_name in collections:
                try:
                    collection = db[collection_name]
                    
                    # Get collection stats before cleanup
                    stats_before = db.command('collStats', collection_name)
                    storage_before = stats_before.get('storageSize', 0)
                    
                    # Compact collection (if supported)
                    try:
                        db.command('compact', collection_name)
                        cleanup_results['collections_compacted'].append(collection_name)
                        
                        # Get stats after compaction
                        stats_after = db.command('collStats', collection_name)
                        storage_after = stats_after.get('storageSize', 0)
                        
                        space_saved = (storage_before - storage_after) / (1024*1024)
                        if space_saved > 0:
                            cleanup_results['space_reclaimed_mb'] += space_saved
                        
                    except Exception as e:
                        logger.warning(f"Compact operation not supported or failed for {collection_name}: {e}")
                
                except Exception as e:
                    logger.warning(f"Error during cleanup of {collection_name}: {e}")
            
            # Repair database (if needed)
            try:
                repair_result = db.command('repairDatabase')
                cleanup_results['operations_performed'].append('Database repair')
            except Exception as e:
                logger.warning(f"Database repair not supported or failed: {e}")
            
            cleanup_results['space_reclaimed_mb'] = round(cleanup_results['space_reclaimed_mb'], 2)
            
            return {
                'status': 'completed',
                'results': cleanup_results
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def run_optimization(self) -> Dict[str, Any]:
        """Run complete database optimization."""
        logger.info("Starting database optimization...")
        
        if not self.connect_to_mongodb():
            return {
                'error': 'Failed to connect to MongoDB'
            }
        
        try:
            # Run all optimization steps
            self.results['optimization_results']['performance_analysis'] = self.analyze_mongodb_performance()
            self.results['optimization_results']['index_optimization'] = self.optimize_mongodb_indexes()
            self.results['optimization_results']['query_analysis'] = self.analyze_query_performance()
            self.results['optimization_results']['cleanup'] = self.cleanup_database()
            
            # Generate summary and recommendations
            self.generate_summary()
            
            return self.results
            
        finally:
            if self.mongo_client:
                self.mongo_client.close()
    
    def generate_summary(self):
        """Generate optimization summary and recommendations."""
        recommendations = []
        
        # Analyze performance results
        perf_analysis = self.results['optimization_results'].get('performance_analysis', {})
        if perf_analysis.get('status') == 'completed':
            analysis = perf_analysis.get('analysis', {})
            
            # Database size recommendations
            db_stats = analysis.get('database_stats', {})
            data_size = db_stats.get('data_size_mb', 0)
            index_size = db_stats.get('index_size_mb', 0)
            
            if index_size > data_size:
                recommendations.append("Index size exceeds data size - review index strategy")
            
            # Collection-specific recommendations
            for opp in analysis.get('optimization_opportunities', []):
                recommendations.append(f"{opp['collection']}: {opp['recommendation']}")
        
        # Index optimization results
        index_opt = self.results['optimization_results'].get('index_optimization', {})
        if index_opt.get('status') == 'completed':
            results = index_opt.get('results', {})
            indexes_created = len(results.get('indexes_created', []))
            if indexes_created > 0:
                recommendations.append(f"Created {indexes_created} new indexes for better query performance")
        
        # Query analysis recommendations
        query_analysis = self.results['optimization_results'].get('query_analysis', {})
        if query_analysis.get('status') == 'completed':
            analysis = query_analysis.get('analysis', {})
            slow_queries = len(analysis.get('slow_queries', []))
            if slow_queries > 5:
                recommendations.append(f"Found {slow_queries} slow queries - consider query optimization")
        
        # Cleanup results
        cleanup = self.results['optimization_results'].get('cleanup', {})
        if cleanup.get('status') == 'completed':
            results = cleanup.get('results', {})
            space_reclaimed = results.get('space_reclaimed_mb', 0)
            if space_reclaimed > 0:
                recommendations.append(f"Reclaimed {space_reclaimed:.1f}MB of storage space")
        
        # Calculate optimization score
        optimization_score = 100
        
        if len(recommendations) == 0:
            optimization_score = 95  # Nearly perfect
        elif len(recommendations) <= 3:
            optimization_score = 85  # Good
        elif len(recommendations) <= 6:
            optimization_score = 70  # Fair
        else:
            optimization_score = 50  # Needs work
        
        self.results['recommendations'] = recommendations
        self.results['summary'] = {
            'optimization_score': optimization_score,
            'recommendations_count': len(recommendations),
            'overall_status': 'excellent' if optimization_score >= 90 else
                            'good' if optimization_score >= 80 else
                            'fair' if optimization_score >= 70 else
                            'poor'
        }
    
    def generate_report(self) -> str:
        """Generate a human-readable optimization report."""
        summary = self.results.get('summary', {})
        
        status_emoji = {
            'excellent': '🟢',
            'good': '🟡',
            'fair': '🟠',
            'poor': '🔴'
        }
        
        report = f"""
🗄️  DATABASE OPTIMIZATION REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Optimization Score: {summary.get('optimization_score', 0)}/100
Overall Status: {status_emoji.get(summary.get('overall_status'), '❓')} {summary.get('overall_status', 'unknown').upper()}

📊 OPTIMIZATION RESULTS:
"""
        
        # Performance analysis
        perf_analysis = self.results['optimization_results'].get('performance_analysis', {})
        if perf_analysis.get('status') == 'completed':
            analysis = perf_analysis.get('analysis', {})
            db_stats = analysis.get('database_stats', {})
            
            report += f"   📈 Database Stats:\n"
            report += f"      Collections: {db_stats.get('collections', 0)}\n"
            report += f"      Data Size: {db_stats.get('data_size_mb', 0):.1f}MB\n"
            report += f"      Index Size: {db_stats.get('index_size_mb', 0):.1f}MB\n"
            
            collections = analysis.get('collection_stats', [])
            if collections:
                largest_collection = max(collections, key=lambda x: x.get('size_mb', 0))
                report += f"      Largest Collection: {largest_collection['name']} ({largest_collection.get('size_mb', 0):.1f}MB)\n"
        
        # Index optimization
        index_opt = self.results['optimization_results'].get('index_optimization', {})
        if index_opt.get('status') == 'completed':
            results = index_opt.get('results', {})
            indexes_created = len(results.get('indexes_created', []))
            report += f"   📚 Index Optimization: {indexes_created} new indexes created\n"
        
        # Query analysis
        query_analysis = self.results['optimization_results'].get('query_analysis', {})
        if query_analysis.get('status') == 'completed':
            analysis = query_analysis.get('analysis', {})
            slow_queries = len(analysis.get('slow_queries', []))
            report += f"   🐌 Query Analysis: {slow_queries} slow queries identified\n"
        
        # Cleanup results
        cleanup = self.results['optimization_results'].get('cleanup', {})
        if cleanup.get('status') == 'completed':
            results = cleanup.get('results', {})
            space_reclaimed = results.get('space_reclaimed_mb', 0)
            collections_compacted = len(results.get('collections_compacted', []))
            report += f"   🧹 Cleanup: {space_reclaimed:.1f}MB reclaimed, {collections_compacted} collections compacted\n"
        
        # Recommendations
        if self.results.get('recommendations'):
            report += f"\n💡 OPTIMIZATION RECOMMENDATIONS:\n"
            for rec in self.results['recommendations'][:7]:  # Top 7
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        optimizer = DatabaseOptimizer()
        results = optimizer.run_optimization()
        
        # Generate and display report
        report = optimizer.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/database_optimization.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on optimization score
        score = results.get('summary', {}).get('optimization_score', 0)
        if score >= 80:
            logger.info("Database optimization completed - Performance is good")
            sys.exit(0)
        elif score >= 60:
            logger.warning("Database optimization completed - Some issues found")
            sys.exit(1)
        else:
            logger.error("Database optimization completed - Significant issues found")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Database optimization failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
