#!/usr/bin/env python3
"""
Backup Verification Script for A1Betting Automation System
Verifies the integrity and completeness of system backups.
"""

import asyncio
import json
import logging
import os
import subprocess
import sys
import hashlib
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, Any, List

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class BackupVerifier:
    """Backup integrity and completeness verifier."""
    
    def __init__(self):
        self.results = {
            'timestamp': datetime.now().isoformat(),
            'backup_locations': {},
            'verification_results': {},
            'summary': {
                'total_backups': 0,
                'verified_backups': 0,
                'failed_backups': 0,
                'missing_backups': 0,
                'overall_status': 'unknown'
            },
            'recommendations': []
        }
        self.project_root = Path.cwd()
        self.backup_dirs = [
            'backups',
            'automation/backups',
            os.path.expanduser('~/backups/a1betting'),
            '/var/backups/a1betting'  # Linux standard location
        ]
    
    def find_backup_locations(self) -> Dict[str, Any]:
        """Find all potential backup locations."""
        locations = {}
        
        # Check standard backup directories
        for backup_dir in self.backup_dirs:
            backup_path = Path(backup_dir)
            if backup_path.exists() and backup_path.is_dir():
                try:
                    backup_files = list(backup_path.glob('**/*'))
                    locations[str(backup_path)] = {
                        'exists': True,
                        'files_count': len([f for f in backup_files if f.is_file()]),
                        'total_size_mb': self.calculate_directory_size(backup_path),
                        'last_modified': self.get_last_modified(backup_path)
                    }
                except Exception as e:
                    locations[str(backup_path)] = {
                        'exists': True,
                        'error': str(e)
                    }
            else:
                locations[str(backup_path)] = {
                    'exists': False,
                    'message': 'Directory not found'
                }
        
        # Check for environment-specified backup locations
        env_backup_dir = os.getenv('BACKUP_DIR')
        if env_backup_dir:
            env_path = Path(env_backup_dir)
            if env_path.exists():
                locations[str(env_path)] = {
                    'exists': True,
                    'source': 'environment_variable',
                    'files_count': len(list(env_path.glob('*'))),
                    'total_size_mb': self.calculate_directory_size(env_path),
                    'last_modified': self.get_last_modified(env_path)
                }
        
        return locations
    
    def calculate_directory_size(self, directory: Path) -> float:
        """Calculate total size of directory in MB."""
        try:
            total_size = sum(f.stat().st_size for f in directory.rglob('*') if f.is_file())
            return round(total_size / (1024 * 1024), 2)
        except Exception as e:
            logger.warning(f"Error calculating size for {directory}: {e}")
            return 0.0
    
    def get_last_modified(self, directory: Path) -> str:
        """Get the last modified time of the most recent file in directory."""
        try:
            files = [f for f in directory.rglob('*') if f.is_file()]
            if not files:
                return 'No files found'
            
            latest_file = max(files, key=lambda f: f.stat().st_mtime)
            return datetime.fromtimestamp(latest_file.stat().st_mtime).isoformat()
        except Exception as e:
            logger.warning(f"Error getting last modified for {directory}: {e}")
            return 'Unknown'
    
    def verify_database_backups(self) -> Dict[str, Any]:
        """Verify database backup files."""
        verification = {
            'mongodb': {'status': 'not_found', 'files': []},
            'postgresql': {'status': 'not_found', 'files': []},
            'redis': {'status': 'not_found', 'files': []}
        }
        
        # Look for database backup files
        for location, info in self.results['backup_locations'].items():
            if not info.get('exists'):
                continue
                
            location_path = Path(location)
            
            # MongoDB backups
            mongo_backups = list(location_path.glob('**/*mongo*'))
            mongo_backups.extend(list(location_path.glob('**/*.bson')))
            if mongo_backups:
                verification['mongodb'] = {
                    'status': 'found',
                    'files': [str(f) for f in mongo_backups[:5]],  # First 5 files
                    'count': len(mongo_backups),
                    'latest': max(mongo_backups, key=lambda f: f.stat().st_mtime).name if mongo_backups else None
                }
            
            # PostgreSQL backups
            pg_backups = list(location_path.glob('**/*postgres*'))
            pg_backups.extend(list(location_path.glob('**/*.sql')))
            pg_backups.extend(list(location_path.glob('**/*.dump')))
            if pg_backups:
                verification['postgresql'] = {
                    'status': 'found',
                    'files': [str(f) for f in pg_backups[:5]],
                    'count': len(pg_backups),
                    'latest': max(pg_backups, key=lambda f: f.stat().st_mtime).name if pg_backups else None
                }
            
            # Redis backups
            redis_backups = list(location_path.glob('**/*redis*'))
            redis_backups.extend(list(location_path.glob('**/*.rdb')))
            if redis_backups:
                verification['redis'] = {
                    'status': 'found',
                    'files': [str(f) for f in redis_backups[:5]],
                    'count': len(redis_backups),
                    'latest': max(redis_backups, key=lambda f: f.stat().st_mtime).name if redis_backups else None
                }
        
        return verification
    
    def verify_code_backups(self) -> Dict[str, Any]:
        """Verify source code backup files."""
        verification = {
            'git_bundles': {'status': 'not_found', 'files': []},
            'source_archives': {'status': 'not_found', 'files': []},
            'config_backups': {'status': 'not_found', 'files': []}
        }
        
        for location, info in self.results['backup_locations'].items():
            if not info.get('exists'):
                continue
                
            location_path = Path(location)
            
            # Git bundle backups
            git_bundles = list(location_path.glob('**/*.bundle'))
            if git_bundles:
                verification['git_bundles'] = {
                    'status': 'found',
                    'files': [str(f) for f in git_bundles[:5]],
                    'count': len(git_bundles),
                    'latest': max(git_bundles, key=lambda f: f.stat().st_mtime).name if git_bundles else None
                }
            
            # Source code archives
            archives = list(location_path.glob('**/*.tar.gz'))
            archives.extend(list(location_path.glob('**/*.zip')))
            archives.extend(list(location_path.glob('**/*source*')))
            if archives:
                verification['source_archives'] = {
                    'status': 'found',
                    'files': [str(f) for f in archives[:5]],
                    'count': len(archives),
                    'latest': max(archives, key=lambda f: f.stat().st_mtime).name if archives else None
                }
            
            # Configuration backups
            config_backups = list(location_path.glob('**/*config*'))
            config_backups.extend(list(location_path.glob('**/*.env*')))
            config_backups.extend(list(location_path.glob('**/*.yaml')))
            if config_backups:
                verification['config_backups'] = {
                    'status': 'found',
                    'files': [str(f) for f in config_backups[:5]],
                    'count': len(config_backups),
                    'latest': max(config_backups, key=lambda f: f.stat().st_mtime).name if config_backups else None
                }
        
        return verification
    
    def verify_backup_integrity(self) -> Dict[str, Any]:
        """Verify backup file integrity using checksums."""
        integrity_results = {
            'checked_files': 0,
            'valid_files': 0,
            'corrupted_files': 0,
            'checksum_files': []
        }
        
        for location, info in self.results['backup_locations'].items():
            if not info.get('exists'):
                continue
                
            location_path = Path(location)
            
            # Look for checksum files
            checksum_files = list(location_path.glob('**/*.md5'))
            checksum_files.extend(list(location_path.glob('**/*.sha256')))
            checksum_files.extend(list(location_path.glob('**/checksums.txt')))
            
            for checksum_file in checksum_files:
                try:
                    with open(checksum_file, 'r') as f:
                        lines = f.readlines()
                    
                    for line in lines:
                        line = line.strip()
                        if not line or line.startswith('#'):
                            continue
                        
                        # Parse checksum line (format: checksum filename)
                        parts = line.split()
                        if len(parts) >= 2:
                            expected_checksum = parts[0]
                            filename = ' '.join(parts[1:])
                            
                            file_path = checksum_file.parent / filename
                            if file_path.exists():
                                actual_checksum = self.calculate_file_checksum(file_path)
                                integrity_results['checked_files'] += 1
                                
                                if actual_checksum == expected_checksum:
                                    integrity_results['valid_files'] += 1
                                else:
                                    integrity_results['corrupted_files'] += 1
                                    logger.warning(f"Checksum mismatch for {filename}")
                    
                    integrity_results['checksum_files'].append(str(checksum_file))
                    
                except Exception as e:
                    logger.warning(f"Error reading checksum file {checksum_file}: {e}")
        
        return integrity_results
    
    def calculate_file_checksum(self, file_path: Path, algorithm='md5') -> str:
        """Calculate checksum for a file."""
        try:
            hash_obj = hashlib.new(algorithm)
            with open(file_path, 'rb') as f:
                for chunk in iter(lambda: f.read(4096), b""):
                    hash_obj.update(chunk)
            return hash_obj.hexdigest()
        except Exception as e:
            logger.warning(f"Error calculating checksum for {file_path}: {e}")
            return ""
    
    def check_backup_freshness(self) -> Dict[str, Any]:
        """Check if backups are recent enough."""
        freshness_results = {
            'recent_backups': 0,
            'old_backups': 0,
            'very_old_backups': 0,
            'backup_ages': []
        }
        
        now = datetime.now()
        
        for location, info in self.results['backup_locations'].items():
            if not info.get('exists') or 'last_modified' not in info:
                continue
            
            try:
                last_modified = datetime.fromisoformat(info['last_modified'])
                age_days = (now - last_modified).days
                
                freshness_results['backup_ages'].append({
                    'location': location,
                    'age_days': age_days,
                    'last_modified': info['last_modified']
                })
                
                if age_days <= 1:
                    freshness_results['recent_backups'] += 1
                elif age_days <= 7:
                    freshness_results['old_backups'] += 1
                else:
                    freshness_results['very_old_backups'] += 1
                    
            except Exception as e:
                logger.warning(f"Error parsing date for {location}: {e}")
        
        return freshness_results
    
    def run_verification(self) -> Dict[str, Any]:
        """Run complete backup verification."""
        logger.info("Starting backup verification...")
        
        # Find backup locations
        logger.info("Finding backup locations...")
        self.results['backup_locations'] = self.find_backup_locations()
        
        # Verify different types of backups
        logger.info("Verifying database backups...")
        self.results['verification_results']['database_backups'] = self.verify_database_backups()
        
        logger.info("Verifying code backups...")
        self.results['verification_results']['code_backups'] = self.verify_code_backups()
        
        logger.info("Verifying backup integrity...")
        self.results['verification_results']['integrity'] = self.verify_backup_integrity()
        
        logger.info("Checking backup freshness...")
        self.results['verification_results']['freshness'] = self.check_backup_freshness()
        
        # Calculate summary
        self.calculate_summary()
        
        return self.results
    
    def calculate_summary(self):
        """Calculate summary statistics and overall status."""
        # Count backup locations
        existing_locations = sum(1 for info in self.results['backup_locations'].values() 
                               if info.get('exists'))
        
        # Count verified backups
        db_backups = self.results['verification_results']['database_backups']
        code_backups = self.results['verification_results']['code_backups']
        
        found_db_backups = sum(1 for backup in db_backups.values() 
                              if backup.get('status') == 'found')
        found_code_backups = sum(1 for backup in code_backups.values() 
                                if backup.get('status') == 'found')
        
        integrity = self.results['verification_results']['integrity']
        freshness = self.results['verification_results']['freshness']
        
        self.results['summary'] = {
            'total_backup_locations': len(self.results['backup_locations']),
            'existing_locations': existing_locations,
            'database_backups_found': found_db_backups,
            'code_backups_found': found_code_backups,
            'integrity_checked_files': integrity.get('checked_files', 0),
            'integrity_valid_files': integrity.get('valid_files', 0),
            'recent_backups': freshness.get('recent_backups', 0),
            'overall_status': self.determine_overall_status()
        }
        
        # Generate recommendations
        self.generate_recommendations()
    
    def determine_overall_status(self) -> str:
        """Determine overall backup status."""
        existing_locations = self.results['summary']['existing_locations']
        db_backups = self.results['summary']['database_backups_found']
        recent_backups = self.results['summary']['recent_backups']
        
        if existing_locations == 0:
            return 'no_backups'
        elif db_backups == 0 and recent_backups == 0:
            return 'insufficient'
        elif recent_backups == 0:
            return 'outdated'
        elif db_backups > 0 and recent_backups > 0:
            return 'good'
        else:
            return 'partial'
    
    def generate_recommendations(self):
        """Generate backup recommendations."""
        recommendations = []
        
        status = self.results['summary']['overall_status']
        
        if status == 'no_backups':
            recommendations.append("URGENT: No backup locations found. Set up backup system immediately.")
        elif status == 'insufficient':
            recommendations.append("Set up automated database and code backups.")
        elif status == 'outdated':
            recommendations.append("Update backup schedule - current backups are too old.")
        
        # Specific recommendations
        if self.results['summary']['database_backups_found'] == 0:
            recommendations.append("Set up automated database backups (MongoDB, PostgreSQL, Redis).")
        
        if self.results['summary']['code_backups_found'] == 0:
            recommendations.append("Set up automated source code backups (Git bundles, archives).")
        
        integrity = self.results['verification_results']['integrity']
        if integrity.get('checksum_files') == 0:
            recommendations.append("Implement backup integrity verification with checksums.")
        
        if integrity.get('corrupted_files', 0) > 0:
            recommendations.append("URGENT: Some backup files are corrupted. Investigate and replace.")
        
        freshness = self.results['verification_results']['freshness']
        if freshness.get('very_old_backups', 0) > 0:
            recommendations.append("Some backups are very old (>7 days). Increase backup frequency.")
        
        self.results['recommendations'] = recommendations
    
    def generate_report(self) -> str:
        """Generate a human-readable backup verification report."""
        summary = self.results['summary']
        
        status_emoji = {
            'good': '🟢',
            'partial': '🟡',
            'outdated': '🟠',
            'insufficient': '🔴',
            'no_backups': '🚨'
        }
        
        report = f"""
💾 BACKUP VERIFICATION REPORT
{'='*50}
Timestamp: {self.results['timestamp']}
Overall Status: {status_emoji.get(summary['overall_status'], '❓')} {summary['overall_status'].upper().replace('_', ' ')}

📊 BACKUP SUMMARY:
   Backup Locations: {summary['existing_locations']}/{summary['total_backup_locations']} found
   Database Backups: {summary['database_backups_found']} type(s) found
   Code Backups: {summary['code_backups_found']} type(s) found
   Recent Backups: {summary['recent_backups']} location(s)

🗄️  DATABASE BACKUPS:
"""
        
        db_backups = self.results['verification_results']['database_backups']
        for db_type, info in db_backups.items():
            status = info.get('status', 'unknown')
            emoji = "✅" if status == 'found' else "❌"
            report += f"   {emoji} {db_type.capitalize()}: {status}"
            if status == 'found':
                report += f" ({info.get('count', 0)} files)"
            report += "\n"
        
        report += f"\n📁 CODE BACKUPS:\n"
        code_backups = self.results['verification_results']['code_backups']
        for backup_type, info in code_backups.items():
            status = info.get('status', 'unknown')
            emoji = "✅" if status == 'found' else "❌"
            report += f"   {emoji} {backup_type.replace('_', ' ').title()}: {status}"
            if status == 'found':
                report += f" ({info.get('count', 0)} files)"
            report += "\n"
        
        # Integrity information
        integrity = self.results['verification_results']['integrity']
        if integrity.get('checked_files', 0) > 0:
            report += f"\n🔒 INTEGRITY CHECK:\n"
            report += f"   Files Checked: {integrity['checked_files']}\n"
            report += f"   Valid Files: {integrity['valid_files']}\n"
            if integrity.get('corrupted_files', 0) > 0:
                report += f"   ❌ Corrupted Files: {integrity['corrupted_files']}\n"
        
        if self.results['recommendations']:
            report += f"\n💡 RECOMMENDATIONS:\n"
            for rec in self.results['recommendations']:
                report += f"   • {rec}\n"
        
        return report


def main():
    """Main entry point."""
    try:
        verifier = BackupVerifier()
        results = verifier.run_verification()
        
        # Generate and display report
        report = verifier.generate_report()
        print(report)
        
        # Save results to file
        os.makedirs('automation/reports', exist_ok=True)
        with open('automation/reports/backup_verification.json', 'w') as f:
            json.dump(results, f, indent=2)
        
        # Exit based on backup status
        status = results['summary']['overall_status']
        if status == 'good':
            logger.info("Backup verification completed - All backups verified")
            sys.exit(0)
        elif status in ['partial', 'outdated']:
            logger.warning("Backup verification completed - Issues found")
            sys.exit(1)
        else:
            logger.error("Backup verification completed - Critical backup issues!")
            sys.exit(2)
            
    except Exception as e:
        logger.error(f"Backup verification failed: {e}")
        sys.exit(3)


if __name__ == "__main__":
    main()
