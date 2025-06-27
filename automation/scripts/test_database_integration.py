#!/usr/bin/env python3
"""
Database Integration Tests Script
Tests database operations and integrations for the A1Betting platform.
"""

import asyncio
import json
import logging
import os
import sys
import time
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class DatabaseIntegrationTester:
    """Database integration testing suite."""
    
    def __init__(self):
        self.project_root = Path.cwd()
        self.test_results = {
            'mongodb': {},
            'redis': {},
            'postgresql': {}
        }
        self.errors = []
        
    def test_mongodb_integration(self) -> bool:
        """Test MongoDB database operations."""
        try:
            logger.info("Testing MongoDB integration...")
            
            # Import MongoDB client
            try:
                import pymongo
                from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
            except ImportError:
                logger.error("PyMongo not installed")
                self.errors.append("PyMongo dependency missing")
                return False
            
            # Test connection
            try:
                client = pymongo.MongoClient(
                    'localhost', 
                    27017,
                    serverSelectionTimeoutMS=5000
                )
                client.server_info()
                self.test_results['mongodb']['connection'] = 'success'
                logger.info("✓ MongoDB connection successful")
            except (ConnectionFailure, ServerSelectionTimeoutError) as e:
                self.test_results['mongodb']['connection'] = 'failed'
                self.errors.append(f"MongoDB connection failed: {e}")
                logger.error(f"✗ MongoDB connection failed: {e}")
                return False
            
            # Test database operations
            test_db = client['a1betting_test']
            test_collection = test_db['integration_test']
            
            # Test insert
            test_doc = {
                'test_id': 'integration_test_' + str(int(time.time())),
                'timestamp': datetime.now(),
                'data': {'test': True, 'value': 42}
            }
            
            try:
                result = test_collection.insert_one(test_doc)
                self.test_results['mongodb']['insert'] = 'success'
                logger.info("✓ MongoDB insert operation successful")
            except Exception as e:
                self.test_results['mongodb']['insert'] = 'failed'
                self.errors.append(f"MongoDB insert failed: {e}")
                logger.error(f"✗ MongoDB insert failed: {e}")
                return False
            
            # Test query
            try:
                found_doc = test_collection.find_one({'test_id': test_doc['test_id']})
                if found_doc and found_doc['data']['value'] == 42:
                    self.test_results['mongodb']['query'] = 'success'
                    logger.info("✓ MongoDB query operation successful")
                else:
                    self.test_results['mongodb']['query'] = 'failed'
                    self.errors.append("MongoDB query returned unexpected result")
                    logger.error("✗ MongoDB query failed")
                    return False
            except Exception as e:
                self.test_results['mongodb']['query'] = 'failed'
                self.errors.append(f"MongoDB query failed: {e}")
                logger.error(f"✗ MongoDB query failed: {e}")
                return False
            
            # Test update
            try:
                update_result = test_collection.update_one(
                    {'test_id': test_doc['test_id']},
                    {'$set': {'data.updated': True}}
                )
                if update_result.modified_count == 1:
                    self.test_results['mongodb']['update'] = 'success'
                    logger.info("✓ MongoDB update operation successful")
                else:
                    self.test_results['mongodb']['update'] = 'failed'
                    self.errors.append("MongoDB update failed to modify document")
                    return False
            except Exception as e:
                self.test_results['mongodb']['update'] = 'failed'
                self.errors.append(f"MongoDB update failed: {e}")
                logger.error(f"✗ MongoDB update failed: {e}")
                return False
            
            # Test delete
            try:
                delete_result = test_collection.delete_one({'test_id': test_doc['test_id']})
                if delete_result.deleted_count == 1:
                    self.test_results['mongodb']['delete'] = 'success'
                    logger.info("✓ MongoDB delete operation successful")
                else:
                    self.test_results['mongodb']['delete'] = 'failed'
                    self.errors.append("MongoDB delete failed to remove document")
                    return False
            except Exception as e:
                self.test_results['mongodb']['delete'] = 'failed'
                self.errors.append(f"MongoDB delete failed: {e}")
                logger.error(f"✗ MongoDB delete failed: {e}")
                return False
            
            # Test indexing
            try:
                test_collection.create_index([("test_id", 1)])
                indexes = list(test_collection.list_indexes())
                self.test_results['mongodb']['indexing'] = 'success'
                logger.info("✓ MongoDB indexing operation successful")
            except Exception as e:
                self.test_results['mongodb']['indexing'] = 'failed'
                self.errors.append(f"MongoDB indexing failed: {e}")
                logger.error(f"✗ MongoDB indexing failed: {e}")
                return False
            
            client.close()
            return True
            
        except Exception as e:
            logger.error(f"MongoDB integration test failed: {e}")
            self.errors.append(f"MongoDB integration test failed: {e}")
            return False
    
    def test_redis_integration(self) -> bool:
        """Test Redis cache operations."""
        try:
            logger.info("Testing Redis integration...")
            
            # Import Redis client
            try:
                import redis
                from redis.exceptions import ConnectionError, TimeoutError
            except ImportError:
                logger.error("Redis client not installed")
                self.errors.append("Redis dependency missing")
                return False
            
            # Test connection
            try:
                r = redis.Redis(host='localhost', port=6379, db=1, decode_responses=True)
                r.ping()
                self.test_results['redis']['connection'] = 'success'
                logger.info("✓ Redis connection successful")
            except (ConnectionError, TimeoutError) as e:
                self.test_results['redis']['connection'] = 'failed'
                self.errors.append(f"Redis connection failed: {e}")
                logger.error(f"✗ Redis connection failed: {e}")
                return False
            
            # Test basic operations
            test_key = f"integration_test_{int(time.time())}"
            test_value = "test_value_42"
            
            # Test set
            try:
                r.set(test_key, test_value, ex=60)  # Expire in 60 seconds
                self.test_results['redis']['set'] = 'success'
                logger.info("✓ Redis set operation successful")
            except Exception as e:
                self.test_results['redis']['set'] = 'failed'
                self.errors.append(f"Redis set failed: {e}")
                logger.error(f"✗ Redis set failed: {e}")
                return False
            
            # Test get
            try:
                retrieved_value = r.get(test_key)
                if retrieved_value == test_value:
                    self.test_results['redis']['get'] = 'success'
                    logger.info("✓ Redis get operation successful")
                else:
                    self.test_results['redis']['get'] = 'failed'
                    self.errors.append("Redis get returned unexpected value")
                    return False
            except Exception as e:
                self.test_results['redis']['get'] = 'failed'
                self.errors.append(f"Redis get failed: {e}")
                logger.error(f"✗ Redis get failed: {e}")
                return False
            
            # Test hash operations
            hash_key = f"hash_test_{int(time.time())}"
            try:
                r.hset(hash_key, mapping={'field1': 'value1', 'field2': 'value2'})
                hash_value = r.hget(hash_key, 'field1')
                if hash_value == 'value1':
                    self.test_results['redis']['hash'] = 'success'
                    logger.info("✓ Redis hash operations successful")
                else:
                    self.test_results['redis']['hash'] = 'failed'
                    self.errors.append("Redis hash operation failed")
                    return False
            except Exception as e:
                self.test_results['redis']['hash'] = 'failed'
                self.errors.append(f"Redis hash operation failed: {e}")
                logger.error(f"✗ Redis hash operation failed: {e}")
                return False
            
            # Test list operations
            list_key = f"list_test_{int(time.time())}"
            try:
                r.lpush(list_key, 'item1', 'item2', 'item3')
                list_length = r.llen(list_key)
                if list_length == 3:
                    self.test_results['redis']['list'] = 'success'
                    logger.info("✓ Redis list operations successful")
                else:
                    self.test_results['redis']['list'] = 'failed'
                    self.errors.append("Redis list operation failed")
                    return False
            except Exception as e:
                self.test_results['redis']['list'] = 'failed'
                self.errors.append(f"Redis list operation failed: {e}")
                logger.error(f"✗ Redis list operation failed: {e}")
                return False
            
            # Test cleanup
            try:
                r.delete(test_key, hash_key, list_key)
                self.test_results['redis']['cleanup'] = 'success'
                logger.info("✓ Redis cleanup successful")
            except Exception as e:
                self.test_results['redis']['cleanup'] = 'failed'
                self.errors.append(f"Redis cleanup failed: {e}")
                logger.error(f"✗ Redis cleanup failed: {e}")
            
            return True
            
        except Exception as e:
            logger.error(f"Redis integration test failed: {e}")
            self.errors.append(f"Redis integration test failed: {e}")
            return False
    
    def test_postgresql_integration(self) -> bool:
        """Test PostgreSQL database operations (if configured)."""
        try:
            logger.info("Testing PostgreSQL integration...")
            
            # Check if PostgreSQL is configured
            try:
                import psycopg2
                from psycopg2 import OperationalError
            except ImportError:
                logger.info("PostgreSQL client not installed, skipping PostgreSQL tests")
                self.test_results['postgresql']['status'] = 'skipped'
                return True
            
            # Try to connect (using common defaults)
            try:
                conn = psycopg2.connect(
                    host='localhost',
                    database='postgres',
                    user='postgres',
                    password='postgres',
                    port=5432
                )
                conn.close()
                self.test_results['postgresql']['connection'] = 'success'
                logger.info("✓ PostgreSQL connection successful")
                return True
            except OperationalError:
                logger.info("PostgreSQL not configured or not running, skipping tests")
                self.test_results['postgresql']['status'] = 'not_configured'
                return True
            
        except Exception as e:
            logger.warning(f"PostgreSQL integration test skipped: {e}")
            self.test_results['postgresql']['status'] = 'skipped'
            return True
    
    def test_database_performance(self) -> bool:
        """Test database performance metrics."""
        try:
            logger.info("Testing database performance...")
            
            performance_results = {}
            
            # MongoDB performance test
            try:
                import pymongo
                client = pymongo.MongoClient('localhost', 27017)
                test_db = client['a1betting_test']
                test_collection = test_db['perf_test']
                
                # Bulk insert test
                start_time = time.time()
                docs = [{'test_id': i, 'data': f'test_data_{i}'} for i in range(1000)]
                test_collection.insert_many(docs)
                insert_time = time.time() - start_time
                
                # Bulk query test
                start_time = time.time()
                results = list(test_collection.find({'test_id': {'$lt': 500}}))
                query_time = time.time() - start_time
                
                performance_results['mongodb'] = {
                    'bulk_insert_1000_docs': f"{insert_time:.3f}s",
                    'query_500_docs': f"{query_time:.3f}s",
                    'docs_retrieved': len(results)
                }
                
                # Cleanup
                test_collection.drop()
                client.close()
                
                logger.info("✓ MongoDB performance test completed")
                
            except Exception as e:
                logger.warning(f"MongoDB performance test failed: {e}")
                performance_results['mongodb'] = {'error': str(e)}
            
            # Redis performance test
            try:
                import redis
                r = redis.Redis(host='localhost', port=6379, db=1)
                
                # Bulk set test
                start_time = time.time()
                pipe = r.pipeline()
                for i in range(1000):
                    pipe.set(f"perf_test_{i}", f"value_{i}")
                pipe.execute()
                set_time = time.time() - start_time
                
                # Bulk get test
                start_time = time.time()
                pipe = r.pipeline()
                for i in range(500):
                    pipe.get(f"perf_test_{i}")
                results = pipe.execute()
                get_time = time.time() - start_time
                
                performance_results['redis'] = {
                    'bulk_set_1000_keys': f"{set_time:.3f}s",
                    'bulk_get_500_keys': f"{get_time:.3f}s",
                    'keys_retrieved': len([r for r in results if r is not None])
                }
                
                # Cleanup
                pipe = r.pipeline()
                for i in range(1000):
                    pipe.delete(f"perf_test_{i}")
                pipe.execute()
                
                logger.info("✓ Redis performance test completed")
                
            except Exception as e:
                logger.warning(f"Redis performance test failed: {e}")
                performance_results['redis'] = {'error': str(e)}
            
            self.test_results['performance'] = performance_results
            return True
            
        except Exception as e:
            logger.error(f"Database performance test failed: {e}")
            self.errors.append(f"Database performance test failed: {e}")
            return False
    
    def run_integration_tests(self) -> bool:
        """Run all database integration tests."""
        logger.info("Starting database integration tests...")
        
        test_functions = [
            ("MongoDB Integration", self.test_mongodb_integration),
            ("Redis Integration", self.test_redis_integration),
            ("PostgreSQL Integration", self.test_postgresql_integration),
            ("Database Performance", self.test_database_performance)
        ]
        
        success_count = 0
        total_tests = len(test_functions)
        
        for test_name, test_func in test_functions:
            logger.info(f"Running: {test_name}")
            try:
                if test_func():
                    success_count += 1
                    logger.info(f"✓ {test_name} passed")
                else:
                    logger.error(f"✗ {test_name} failed")
            except Exception as e:
                logger.error(f"✗ {test_name} failed with exception: {e}")
                self.errors.append(f"{test_name}: {e}")
        
        # Generate test report
        self.generate_test_report(success_count, total_tests)
        
        success_rate = (success_count / total_tests) * 100
        logger.info(f"Database integration tests completed: {success_count}/{total_tests} passed ({success_rate:.1f}%)")
        
        return success_count == total_tests
    
    def generate_test_report(self, success_count: int, total_tests: int):
        """Generate database integration test report."""
        try:
            report = {
                'timestamp': datetime.now().isoformat(),
                'summary': {
                    'total_tests': total_tests,
                    'passed_tests': success_count,
                    'failed_tests': total_tests - success_count,
                    'success_rate': (success_count / total_tests) * 100
                },
                'test_results': self.test_results,
                'errors': self.errors,
                'recommendations': []
            }
            
            # Add recommendations based on results
            if self.test_results.get('mongodb', {}).get('connection') == 'failed':
                report['recommendations'].append("Start MongoDB service and verify connection settings")
            
            if self.test_results.get('redis', {}).get('connection') == 'failed':
                report['recommendations'].append("Start Redis service and verify connection settings")
            
            if self.errors:
                report['recommendations'].append("Review error logs and fix database connectivity issues")
            
            # Save report
            report_file = self.project_root / 'automation' / 'reports' / 'database_integration_test.json'
            with open(report_file, 'w') as f:
                json.dump(report, f, indent=2, default=str)
            
            logger.info(f"Test report saved to: {report_file}")
            
        except Exception as e:
            logger.error(f"Failed to generate test report: {e}")

def main():
    """Main execution function."""
    tester = DatabaseIntegrationTester()
    success = tester.run_integration_tests()
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()
