#!/usr/bin/env python3
"""
Cache Optimization Script for A1Betting Automation System
Analyzes and optimizes Redis cache performance.
"""

import asyncio
import json
import logging
import os
import sys
import time
from datetime import datetime
from typing import Dict, Any, List

import redis

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class CacheOptimizer:
    """Redis cache performance analyzer and optimizer."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'optimization_results': {},
            'performance_analysis': {},
            'recommendations': [],
            'summary': {}
        }
        self.redis_client = None
    
    def connect_to_redis(self) -> bool:
        """Connect to Redis."""
        try:
            redis_host = os.getenv('REDIS_HOST', 'localhost')
            redis_port = int(os.getenv('REDIS_PORT', '6379'))
            redis_db = int(os.getenv('REDIS_DB', '0'))
            redis_password = os.getenv('REDIS_PASSWORD')
            
            self.redis_client = redis.Redis(
                host=redis_host,
                port=redis_port,
                db=redis_db,
                password=redis_password,
                decode_responses=True,
                socket_connect_timeout=5
            )
            
            # Test connection
            self.redis_client.ping()
            logger.info("Connected to Redis successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to connect to Redis: {e}")
            return False
    
    def analyze_redis_performance(self) -> Dict[str, Any]:
        """Analyze Redis performance and memory usage."""
        try:
            logger.info("Analyzing Redis performance...")
            
            if not self.redis_client:
                return {
                    'status': 'failed',
                    'error': 'No Redis connection'
                }
            
            # Get Redis info
            info = self.redis_client.info()
            
            analysis = {
                'server_info': {
                    'version': info.get('redis_version'),
                    'uptime_days': round(info.get('uptime_in_seconds', 0) / 86400, 1),
                    'connected_clients': info.get('connected_clients', 0),
                    'blocked_clients': info.get('blocked_clients', 0),
                    'total_connections_received': info.get('total_connections_received', 0)
                },
                'memory_analysis': {
                    'used_memory_mb': round(info.get('used_memory', 0) / (1024*1024), 2),
                    'used_memory_peak_mb': round(info.get('used_memory_peak', 0) / (1024*1024), 2),
                    'used_memory_rss_mb': round(info.get('used_memory_rss', 0) / (1024*1024), 2),
                    'mem_fragmentation_ratio': info.get('mem_fragmentation_ratio', 0),
                    'maxmemory_mb': round(info.get('maxmemory', 0) / (1024*1024), 2) if info.get('maxmemory') else None,
                    'maxmemory_policy': info.get('maxmemory_policy')
                },
                'performance_metrics': {
                    'total_commands_processed': info.get('total_commands_processed', 0),
                    'instantaneous_ops_per_sec': info.get('instantaneous_ops_per_sec', 0),
                    'keyspace_hits': info.get('keyspace_hits', 0),
                    'keyspace_misses': info.get('keyspace_misses', 0),
                    'hit_rate_percent': 0,
                    'expired_keys': info.get('expired_keys', 0),
                    'evicted_keys': info.get('evicted_keys', 0)
                },
                'persistence_info': {
                    'rdb_last_save_time': info.get('rdb_last_save_time'),
                    'rdb_changes_since_last_save': info.get('rdb_changes_since_last_save', 0),
                    'aof_enabled': info.get('aof_enabled', 0),
                    'aof_rewrite_in_progress': info.get('aof_rewrite_in_progress', 0)
                }
            }
            
            # Calculate hit rate
            hits = analysis['performance_metrics']['keyspace_hits']
            misses = analysis['performance_metrics']['keyspace_misses']
            if hits + misses > 0:
                analysis['performance_metrics']['hit_rate_percent'] = round((hits / (hits + misses)) * 100, 2)
            
            # Analyze keyspace
            keyspace_analysis = self.analyze_keyspace()
            analysis['keyspace_analysis'] = keyspace_analysis
            
            return {
                'status': 'completed',
                'analysis': analysis
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def analyze_keyspace(self) -> Dict[str, Any]:
        """Analyze Redis keyspace and key patterns."""
        try:
            keyspace_analysis = {
                'total_keys': 0,
                'key_patterns': {},
                'memory_by_pattern': {},
                'ttl_analysis': {
                    'keys_with_ttl': 0,
                    'keys_without_ttl': 0,
                    'avg_ttl_seconds': 0
                },
                'large_keys': [],
                'recommendations': []
            }
            
            # Get all keys (be careful with large datasets)
            keys = self.redis_client.keys('*')
            keyspace_analysis['total_keys'] = len(keys)
            
            if len(keys) > 10000:
                # Sample keys if there are too many
                import random
                keys = random.sample(keys, 1000)
                keyspace_analysis['sampled'] = True
                keyspace_analysis['sample_size'] = 1000
            
            ttl_values = []
            
            for key in keys[:1000]:  # Limit analysis to prevent performance issues
                try:
                    # Analyze key pattern
                    pattern = self.extract_key_pattern(key)
                    keyspace_analysis['key_patterns'][pattern] = keyspace_analysis['key_patterns'].get(pattern, 0) + 1
                    
                    # Check key size
                    key_type = self.redis_client.type(key)
                    memory_usage = self.estimate_key_memory(key, key_type)
                    
                    if memory_usage > 1024 * 100:  # Keys larger than 100KB
                        keyspace_analysis['large_keys'].append({
                            'key': key,
                            'type': key_type,
                            'estimated_size_kb': round(memory_usage / 1024, 2)
                        })
                    
                    # Analyze TTL
                    ttl = self.redis_client.ttl(key)
                    if ttl > 0:
                        keyspace_analysis['ttl_analysis']['keys_with_ttl'] += 1
                        ttl_values.append(ttl)
                    elif ttl == -1:
                        keyspace_analysis['ttl_analysis']['keys_without_ttl'] += 1
                    
                except Exception as e:
                    logger.warning(f"Error analyzing key {key}: {e}")
            
            # Calculate average TTL
            if ttl_values:
                keyspace_analysis['ttl_analysis']['avg_ttl_seconds'] = round(sum(ttl_values) / len(ttl_values), 0)
            
            # Sort large keys by size
            keyspace_analysis['large_keys'].sort(key=lambda x: x['estimated_size_kb'], reverse=True)
            keyspace_analysis['large_keys'] = keyspace_analysis['large_keys'][:10]  # Top 10
            
            # Generate recommendations based on analysis
            if keyspace_analysis['ttl_analysis']['keys_without_ttl'] > keyspace_analysis['ttl_analysis']['keys_with_ttl']:
                keyspace_analysis['recommendations'].append("Many keys without TTL - consider setting expiration times")
            
            if len(keyspace_analysis['large_keys']) > 0:
                keyspace_analysis['recommendations'].append("Large keys detected - consider data structure optimization")
            
            if keyspace_analysis['total_keys'] > 100000:
                keyspace_analysis['recommendations'].append("High key count - monitor memory usage and consider partitioning")
            
            return keyspace_analysis
            
        except Exception as e:
            logger.warning(f"Error in keyspace analysis: {e}")
            return {'error': str(e)}
    
    def extract_key_pattern(self, key: str) -> str:
        """Extract pattern from Redis key."""
        # Replace numbers and UUIDs with placeholders
        import re
        
        # Replace UUIDs
        pattern = re.sub(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', '{uuid}', key, flags=re.IGNORECASE)
        
        # Replace numbers
        pattern = re.sub(r'\d+', '{id}', pattern)
        
        # Replace timestamps
        pattern = re.sub(r'\d{10,13}', '{timestamp}', pattern)
        
        return pattern
    
    def estimate_key_memory(self, key: str, key_type: str) -> int:
        """Estimate memory usage of a Redis key."""
        try:
            if key_type == 'string':
                value = self.redis_client.get(key)
                return len(str(value).encode('utf-8')) if value else 0
            elif key_type == 'hash':
                return len(str(self.redis_client.hgetall(key)).encode('utf-8'))
            elif key_type == 'list':
                # Get list length and sample items
                length = self.redis_client.llen(key)
                if length > 0:
                    sample = self.redis_client.lrange(key, 0, min(10, length-1))
                    avg_item_size = sum(len(str(item).encode('utf-8')) for item in sample) / len(sample)
                    return int(avg_item_size * length)
                return 0
            elif key_type == 'set':
                members = self.redis_client.smembers(key)
                return sum(len(str(member).encode('utf-8')) for member in members)
            elif key_type == 'zset':
                members = self.redis_client.zrange(key, 0, -1, withscores=True)
                return sum(len(str(member).encode('utf-8')) + 8 for member, score in members)  # 8 bytes for score
            else:
                return 100  # Default estimate
                
        except Exception as e:
            logger.warning(f"Error estimating memory for key {key}: {e}")
            return 0
    
    def optimize_redis_configuration(self) -> Dict[str, Any]:
        """Analyze and suggest Redis configuration optimizations."""
        try:
            logger.info("Analyzing Redis configuration...")
            
            if not self.redis_client:
                return {
                    'status': 'failed',
                    'error': 'No Redis connection'
                }
            
            config = self.redis_client.config_get('*')
            info = self.redis_client.info()
            
            optimization_results = {
                'current_config': {},
                'recommendations': [],
                'performance_improvements': []
            }
            
            # Key configuration parameters to analyze
            important_configs = [
                'maxmemory',
                'maxmemory-policy',
                'maxclients',
                'timeout',
                'tcp-keepalive',
                'save',
                'stop-writes-on-bgsave-error',
                'rdbcompression',
                'rdbchecksum'
            ]
            
            for param in important_configs:
                if param in config:
                    optimization_results['current_config'][param] = config[param]
            
            # Memory optimization recommendations
            used_memory = info.get('used_memory', 0)
            maxmemory = int(config.get('maxmemory', 0))
            
            if maxmemory == 0:
                optimization_results['recommendations'].append({
                    'parameter': 'maxmemory',
                    'issue': 'No memory limit set',
                    'recommendation': 'Set maxmemory to prevent OOM conditions',
                    'suggested_value': f'{int(used_memory * 1.5)}'  # 1.5x current usage
                })
            elif used_memory / maxmemory > 0.8:
                optimization_results['recommendations'].append({
                    'parameter': 'maxmemory',
                    'issue': 'Memory usage is high',
                    'recommendation': 'Consider increasing maxmemory or optimizing data',
                    'current_usage_percent': round((used_memory / maxmemory) * 100, 1)
                })
            
            # Eviction policy recommendations
            maxmemory_policy = config.get('maxmemory-policy', 'noeviction')
            if maxmemory_policy == 'noeviction' and maxmemory > 0:
                optimization_results['recommendations'].append({
                    'parameter': 'maxmemory-policy',
                    'issue': 'No eviction policy set',
                    'recommendation': 'Set appropriate eviction policy (allkeys-lru or volatile-lru)',
                    'suggested_value': 'allkeys-lru'
                })
            
            # Performance recommendations
            hit_rate = 0
            hits = info.get('keyspace_hits', 0)
            misses = info.get('keyspace_misses', 0)
            if hits + misses > 0:
                hit_rate = (hits / (hits + misses)) * 100
            
            if hit_rate < 90:
                optimization_results['performance_improvements'].append({
                    'metric': 'hit_rate',
                    'current_value': f'{hit_rate:.1f}%',
                    'issue': 'Low cache hit rate',
                    'recommendation': 'Review caching strategy and TTL values'
                })
            
            # Persistence optimization
            save_config = config.get('save', '')
            if save_config and 'performance' in save_config.lower():
                optimization_results['recommendations'].append({
                    'parameter': 'save',
                    'issue': 'Frequent saves may impact performance',
                    'recommendation': 'Consider adjusting save intervals for better performance'
                })
            
            return {
                'status': 'completed',
                'results': optimization_results
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'error': str(e)
            }
    
    def cleanup_expired_keys(self) -> Dict[str, Any]:
        """Clean up expired keys and optimize memory usage."""
        try:
            logger.info("Cleaning up expired keys...")
            
            if not self.redis_client:
                return {
                    'status': 'failed',
                    'error': 'No Redis connection'
                }
            
            cleanup_results = {
                'keys_scanned': 0,
                'expired_keys_found': 0,
                'memory_freed_mb': 0,
                'operations_performed': []
            }
            
            # Get memory before cleanup
            info_before = self.redis_client.info('memory')
            memory_before = info_before.get('used_memory', 0)
            
            # Sample keys to check for expiration issues
            keys = self.redis_client.keys('*')
            sample_size = min(1000, len(keys))  # Limit to prevent performance issues
            
            if len(keys) > sample_size:
                import random
                keys_to_check = random.sample(keys, sample_size)
            else:
                keys_to_check = keys
            
            cleanup_results['keys_scanned'] = len(keys_to_check)
            
            for key in keys_to_check:
                try:
                    ttl = self.redis_client.ttl(key)
                    
                    # Check for keys that should have expired but haven't
                    if ttl == -1:  # No expiration set
                        # For cache keys, consider setting TTL if they match certain patterns
                        if any(pattern in key.lower() for pattern in ['cache:', 'session:', 'temp:']):
                            # Set a default TTL for cache-like keys
                            self.redis_client.expire(key, 3600)  # 1 hour default
                            cleanup_results['operations_performed'].append(f'Set TTL for {key}')
                    
                except Exception as e:
                    logger.warning(f"Error processing key {key}: {e}")
            
            # Force expired key cleanup
            try:
                # This command forces Redis to clean up expired keys
                scan_result = self.redis_client.scan(0, count=100)
                cleanup_results['operations_performed'].append('Forced expired key scan')
            except Exception as e:
                logger.warning(f"Error during forced cleanup: {e}")
            
            # Get memory after cleanup
            info_after = self.redis_client.info('memory')
            memory_after = info_after.get('used_memory', 0)
            
            memory_freed = memory_before - memory_after
            cleanup_results['memory_freed_mb'] = round(memory_freed / (1024*1024), 2)
            
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
        """Run complete cache optimization."""
        logger.info("Starting cache optimization...")
        
        if not self.connect_to_redis():
            return {
                'error': 'Failed to connect to Redis'
            }
        
        try:
            # Run all optimization steps
            self.results['optimization_results']['performance_analysis'] = self.analyze_redis_performance()
            self.results['optimization_results']['config_optimization'] = self.optimize_redis_configuration()
            self.results['optimization_results']['cleanup'] = self.cleanup_expired_keys()
            
            # Generate summary and recommendations
            self.generate_summary()
            
            return self.results
            
        finally:
            if self.redis_client:
                self.redis_client.close()
    
    def generate_summary(self):
        """Generate optimization summary and recommendations."""
        recommendations = []
        
        # Analyze performance results
        perf_analysis = self.results['optimization_results'].get('performance_analysis', {})
        if perf_analysis.get('status') == 'completed':
            analysis = perf_analysis.get('analysis', {})
            
            # Memory analysis
            memory = analysis.get('memory_analysis', {})
            fragmentation = memory.get('mem_fragmentation_ratio', 0)
            if fragmentation > 1.5:
                recommendations.append(f"High memory fragmentation ({fragmentation:.1f}) - consider restarting Redis")
            
            # Performance metrics
            performance = analysis.get('performance_metrics', {})
            hit_rate = performance.get('hit_rate_percent', 0)
            if hit_rate < 90:
                recommendations.append(f"Low cache hit rate ({hit_rate:.1f}%) - review caching strategy")
            
            evicted_keys = performance.get('evicted_keys', 0)
            if evicted_keys > 1000:
                recommendations.append(f"High key eviction rate ({evicted_keys}) - consider increasing memory")
            
            # Keyspace analysis
            keyspace = analysis.get('keyspace_analysis', {})
            if 'recommendations' in keyspace:
                recommendations.extend(keyspace['recommendations'])
        
        # Configuration optimization
        config_opt = self.results['optimization_results'].get('config_optimization', {})
        if config_opt.get('status') == 'completed':
            results = config_opt.get('results', {})
            config_recommendations = results.get('recommendations', [])
            for rec in config_recommendations:
                recommendations.append(f"Config: {rec.get('recommendation', '')}")
        
        # Cleanup results
        cleanup = self.results['optimization_results'].get('cleanup', {})
        if cleanup.get('status') == 'completed':
            results = cleanup.get('results', {})
            memory_freed = results.get('memory_freed_mb', 0)
            if memory_freed > 0:
                recommendations.append(f"Freed {memory_freed:.1f}MB through cleanup operations")
        
        # Calculate optimization score
        optimization_score = 100
        
        if len(recommendations) == 0:
            optimization_score = 95  # Nearly perfect
        elif len(recommendations) <= 2:
            optimization_score = 85  # Good
        elif len(recommendations) <= 5:
            optimization_score = 70  # Fair
        else:
            optimization_score = 50  # Needs work
        
        # Adjust score based on hit rate
        if perf_analysis.get('status') == 'completed':
            hit_rate = perf_analysis.get('analysis', {}).get('performance_metrics', {}).get('hit_rate_percent', 0)
            if hit_rate < 70:
                optimization_score -= 20
            elif hit_rate < 90:
                optimization_score -= 10
        
        optimization_score = max(0, optimization_score)
        
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
🚀 CACHE OPTIMIZATION REPORT
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
            
            # Server info
            server = analysis.get('server_info', {})
            report += f"   🔧 Redis Version: {server.get('version', 'Unknown')}\n"
            report += f"   🔌 Connected Clients: {server.get('connected_clients', 0)}\n"
            
            # Memory info
            memory = analysis.get('memory_analysis', {})
            report += f"   💾 Memory Usage: {memory.get('used_memory_mb', 0):.1f}MB\n"
            report += f"   📈 Peak Memory: {memory.get('used_memory_peak_mb', 0):.1f}MB\n"
            
            fragmentation = memory.get('mem_fragmentation_ratio', 0)
            frag_emoji = "🟢" if fragmentation < 1.5 else "🟡" if fragmentation < 2.0 else "🔴"
            report += f"   {frag_emoji} Fragmentation Ratio: {fragmentation:.2f}\n"
            
            # Performance metrics
            performance = analysis.get('performance_metrics', {})
            hit_rate = performance.get('hit_rate_percent', 0)
            hit_emoji = "🟢" if hit_rate >= 90 else "🟡" if hit_rate >= 70 else "🔴"
            report += f"   {hit_emoji} Cache Hit Rate: {hit_rate:.1f}%\n"
            
            # Keyspace info
            keyspace = analysis.get('keyspace_analysis', {})
            total_keys = keyspace.get('total_keys', 0)
            report += f"   🔑 Total Keys: {total_keys:,}\n"
            
            large_keys = len(keyspace.get('large_keys', []))
            if large_keys > 0:
                report += f"   📦 Large Keys: {large_keys} found\n"
        
        # Configuration optimization
        config_opt = self.results['optimization_results'].get('config_optimization', {})
        if config_opt.get('status') == 'completed':
            results = config_opt.get('results', {})
            config_recs = len(results.get('recommendations', []))
            perf_improvements = len(results.get('performance_improvements', []))
            report += f"   ⚙️ Configuration Issues: {config_recs} found\n"
            report += f"   ⚡ Performance Improvements: {perf_improvements} identified\n"
        
        # Cleanup results
        cleanup = self.results['optimization_results'].get('cleanup', {})
        if cleanup.get('status') == 'completed':
            results = cleanup.get('results', {})
            keys_scanned = results.get('keys_scanned', 0)
            memory_freed = results.get('memory_freed_mb', 0)
            report += f"   🧹 Keys Scanned: {keys_scanned:,}\n"
            if memory_freed > 0:
                report += f"   💾 Memory Freed: {memory_freed:.1f}MB\n"
        
        # Recommendations
        if self.results.get('recommendations'):
            report += f"\n💡 OPTIMIZATION RECOMMENDATIONS:\n"
            for rec in self.results['recommendations'][:7]:  # Top 7
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        optimizer = CacheOptimizer()
        results = optimizer.run_optimization()
        
        # Generate and display report
        report = optimizer.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/cache_optimization.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on optimization score
        score = results.get('summary', {}).get('optimization_score', 0)
        if score >= 80:
            logger.info("Cache optimization completed - Performance is good")
            sys.exit(0)
        elif score >= 60:
            logger.warning("Cache optimization completed - Some issues found")
            sys.exit(1)
        else:
            logger.error("Cache optimization completed - Significant issues found")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Cache optimization failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
