#!/usr/bin/env python3
"""
GDPR Compliance Checker for A1Betting Platform

This script checks the application for GDPR compliance issues including
data processing, storage, user consent, and data protection measures.
"""

import os
import sys
import json
import logging
import re
from datetime import datetime
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

class GDPRComplianceChecker:
    """GDPR compliance assessment system."""
    
    def __init__(self, reports_dir: str = "automation/reports"):
        self.reports_dir = Path(reports_dir)
        self.reports_dir.mkdir(parents=True, exist_ok=True)
        self.compliance_results = {}
        
    def scan_privacy_policy_requirements(self, project_dir: str = ".") -> Dict[str, Any]:
        """Scan for privacy policy and legal requirements."""
        logger.info("Scanning privacy policy requirements...")
        
        results = {
            "status": "success",
            "privacy_policy_found": False,
            "terms_of_service_found": False,
            "cookie_policy_found": False,
            "data_processing_agreements": False,
            "missing_documents": [],
            "recommendations": []
        }
        
        try:
            # Search for privacy-related documents
            privacy_files = []
            legal_files = []
            
            for root, dirs, files in os.walk(project_dir):
                for file in files:
                    file_lower = file.lower()
                    file_path = os.path.join(root, file)
                    
                    # Check for privacy policy
                    if any(term in file_lower for term in ['privacy', 'privacypolicy', 'privacy_policy']):
                        privacy_files.append(file_path)
                        results["privacy_policy_found"] = True
                    
                    # Check for terms of service
                    if any(term in file_lower for term in ['terms', 'tos', 'terms_of_service', 'termsofservice']):
                        legal_files.append(file_path)
                        results["terms_of_service_found"] = True
                    
                    # Check for cookie policy
                    if any(term in file_lower for term in ['cookie', 'cookies']):
                        results["cookie_policy_found"] = True
                    
                    # Check for data processing agreements
                    if any(term in file_lower for term in ['dpa', 'data_processing', 'gdpr']):
                        results["data_processing_agreements"] = True
            
            # Identify missing documents
            if not results["privacy_policy_found"]:
                results["missing_documents"].append("Privacy Policy")
                results["recommendations"].append("Create a comprehensive privacy policy")
            
            if not results["terms_of_service_found"]:
                results["missing_documents"].append("Terms of Service")
                results["recommendations"].append("Create terms of service document")
            
            if not results["cookie_policy_found"]:
                results["missing_documents"].append("Cookie Policy")
                results["recommendations"].append("Create cookie policy for tracking compliance")
            
            if not results["data_processing_agreements"]:
                results["missing_documents"].append("Data Processing Agreements")
                results["recommendations"].append("Create data processing agreements for third parties")
            
            results["found_privacy_files"] = privacy_files
            results["found_legal_files"] = legal_files
            
            return results
            
        except Exception as e:
            logger.error(f"Error scanning privacy policy requirements: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def scan_data_collection_practices(self, project_dir: str = ".") -> Dict[str, Any]:
        """Scan code for data collection practices."""
        logger.info("Scanning data collection practices...")
        
        results = {
            "status": "success",
            "personal_data_fields": [],
            "data_collection_points": [],
            "third_party_integrations": [],
            "potential_issues": [],
            "consent_mechanisms": []
        }
        
        try:
            # Patterns for personal data
            personal_data_patterns = [
                r'email.*=',
                r'phone.*=',
                r'address.*=',
                r'first_?name.*=',
                r'last_?name.*=',
                r'birth_?date.*=',
                r'ssn.*=',
                r'passport.*=',
                r'credit_?card.*=',
                r'ip_?address.*=',
                r'user_?id.*=',
                r'location.*=',
                r'geolocation.*='
            ]
            
            # Patterns for third-party services
            third_party_patterns = [
                r'google.*analytics',
                r'facebook.*pixel',
                r'stripe',
                r'paypal',
                r'mailchimp',
                r'sendgrid',
                r'amazon.*s3',
                r'cloudflare',
                r'hotjar',
                r'mixpanel'
            ]
            
            # Patterns for consent mechanisms
            consent_patterns = [
                r'consent.*=',
                r'cookie.*consent',
                r'gdpr.*consent',
                r'opt.*in',
                r'accept.*terms',
                r'privacy.*agreement'
            ]
            
            # Scan source files
            source_extensions = ['.py', '.js', '.ts', '.jsx', '.tsx', '.php', '.java', '.cs']
            
            for root, dirs, files in os.walk(project_dir):
                # Skip common non-source directories
                dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__', '.venv', 'venv']]
                
                for file in files:
                    if any(file.endswith(ext) for ext in source_extensions):
                        file_path = os.path.join(root, file)
                        
                        try:
                            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                                content = f.read().lower()
                                
                                # Check for personal data collection
                                for pattern in personal_data_patterns:
                                    if re.search(pattern, content):
                                        field_name = pattern.replace('.*=', '').replace('_?', '_')
                                        if field_name not in results["personal_data_fields"]:
                                            results["personal_data_fields"].append(field_name)
                                            results["data_collection_points"].append({
                                                "file": file_path,
                                                "field": field_name,
                                                "type": "personal_data"
                                            })
                                
                                # Check for third-party integrations
                                for pattern in third_party_patterns:
                                    if re.search(pattern, content):
                                        service = pattern.replace('.*', ' ')
                                        if service not in results["third_party_integrations"]:
                                            results["third_party_integrations"].append(service)
                                
                                # Check for consent mechanisms
                                for pattern in consent_patterns:
                                    if re.search(pattern, content):
                                        consent_type = pattern.replace('.*=', '').replace('.*', '')
                                        results["consent_mechanisms"].append({
                                            "file": file_path,
                                            "type": consent_type
                                        })
                        
                        except Exception as e:
                            logger.warning(f"Error reading file {file_path}: {e}")
                            continue
            
            # Identify potential issues
            if results["personal_data_fields"] and not results["consent_mechanisms"]:
                results["potential_issues"].append("Personal data collection without consent mechanisms")
            
            if results["third_party_integrations"]:
                results["potential_issues"].append("Third-party integrations require data processing agreements")
            
            if 'email' in results["personal_data_fields"]:
                results["potential_issues"].append("Email collection requires explicit consent and unsubscribe options")
            
            return results
            
        except Exception as e:
            logger.error(f"Error scanning data collection practices: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def check_data_storage_security(self, project_dir: str = ".") -> Dict[str, Any]:
        """Check data storage security measures."""
        logger.info("Checking data storage security...")
        
        results = {
            "status": "success",
            "encryption_found": False,
            "database_security": {},
            "file_storage_security": {},
            "security_issues": [],
            "recommendations": []
        }
        
        try:
            # Check for encryption implementations
            encryption_patterns = [
                r'encrypt',
                r'bcrypt',
                r'scrypt',
                r'pbkdf2',
                r'aes',
                r'rsa',
                r'ssl',
                r'tls'
            ]
            
            # Check for database security
            database_patterns = [
                r'database.*url',
                r'db.*password',
                r'connection.*string',
                r'mongodb',
                r'postgresql',
                r'mysql',
                r'redis'
            ]
            
            # Scan configuration files
            config_files = []
            security_files = []
            
            for root, dirs, files in os.walk(project_dir):
                dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__']]
                
                for file in files:
                    file_lower = file.lower()
                    file_path = os.path.join(root, file)
                    
                    # Configuration files
                    if any(pattern in file_lower for pattern in ['.env', 'config', 'settings']):
                        config_files.append(file_path)
                    
                    # Security-related files
                    if any(pattern in file_lower for pattern in ['security', 'auth', 'encryption']):
                        security_files.append(file_path)
                    
                    # Check source files for security implementations
                    if file.endswith(('.py', '.js', '.ts', '.php')):
                        try:
                            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                                content = f.read().lower()
                                
                                # Check for encryption
                                for pattern in encryption_patterns:
                                    if pattern in content:
                                        results["encryption_found"] = True
                                        break
                        except:
                            continue
            
            # Check environment files for security
            for config_file in config_files:
                if '.env' in config_file:
                    try:
                        with open(config_file, 'r') as f:
                            env_content = f.read()
                            
                            # Check for database URLs in plaintext
                            if 'DATABASE_URL' in env_content or 'DB_PASSWORD' in env_content:
                                results["security_issues"].append("Database credentials in environment file")
                            
                            # Check for API keys
                            if any(key in env_content for key in ['API_KEY', 'SECRET_KEY', 'TOKEN']):
                                results["security_issues"].append("API keys in environment file")
                    except:
                        continue
            
            # Generate recommendations
            if not results["encryption_found"]:
                results["recommendations"].append("Implement encryption for sensitive data storage")
            
            if results["security_issues"]:
                results["recommendations"].append("Review and secure credential storage")
            
            results["recommendations"].extend([
                "Implement data encryption at rest and in transit",
                "Use strong authentication for database access",
                "Regular security audits of data storage systems",
                "Implement data backup and disaster recovery procedures"
            ])
            
            results["config_files_found"] = len(config_files)
            results["security_files_found"] = len(security_files)
            
            return results
            
        except Exception as e:
            logger.error(f"Error checking data storage security: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def check_user_rights_implementation(self, project_dir: str = ".") -> Dict[str, Any]:
        """Check implementation of user rights (access, rectification, erasure, etc.)."""
        logger.info("Checking user rights implementation...")
        
        results = {
            "status": "success",
            "implemented_rights": [],
            "missing_rights": [],
            "api_endpoints": [],
            "ui_components": [],
            "recommendations": []
        }
        
        try:
            # GDPR user rights to check for
            gdpr_rights = {
                "access": ["data_export", "profile", "download", "get_user_data"],
                "rectification": ["edit", "update", "modify", "correct"],
                "erasure": ["delete", "remove", "purge", "forget"],
                "portability": ["export", "download", "transfer"],
                "restriction": ["restrict", "limit", "suspend"],
                "objection": ["opt_out", "object", "unsubscribe"]
            }
            
            found_implementations = {right: [] for right in gdpr_rights.keys()}
            
            # Scan for API endpoints and UI components
            for root, dirs, files in os.walk(project_dir):
                dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '__pycache__']]
                
                for file in files:
                    if file.endswith(('.py', '.js', '.ts', '.jsx', '.tsx', '.php')):
                        file_path = os.path.join(root, file)
                        
                        try:
                            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                                content = f.read().lower()
                                
                                # Check for each GDPR right implementation
                                for right, keywords in gdpr_rights.items():
                                    for keyword in keywords:
                                        if keyword in content:
                                            found_implementations[right].append({
                                                "file": file_path,
                                                "keyword": keyword
                                            })
                                
                                # Look for API endpoints
                                api_patterns = [
                                    r'@app\.route.*delete',
                                    r'app\.delete',
                                    r'router\.delete',
                                    r'@app\.route.*user',
                                    r'/api/user',
                                    r'delete.*user',
                                    r'export.*data'
                                ]
                                
                                for pattern in api_patterns:
                                    if re.search(pattern, content):
                                        results["api_endpoints"].append({
                                            "file": file_path,
                                            "pattern": pattern
                                        })
                        
                        except:
                            continue
            
            # Determine implemented and missing rights
            for right, implementations in found_implementations.items():
                if implementations:
                    results["implemented_rights"].append(right)
                else:
                    results["missing_rights"].append(right)
            
            # Generate recommendations
            for missing_right in results["missing_rights"]:
                if missing_right == "access":
                    results["recommendations"].append("Implement user data access/download functionality")
                elif missing_right == "rectification":
                    results["recommendations"].append("Implement user data editing capabilities")
                elif missing_right == "erasure":
                    results["recommendations"].append("Implement account deletion functionality")
                elif missing_right == "portability":
                    results["recommendations"].append("Implement data export in standard formats")
                elif missing_right == "restriction":
                    results["recommendations"].append("Implement data processing restriction options")
                elif missing_right == "objection":
                    results["recommendations"].append("Implement opt-out mechanisms")
            
            if not results["api_endpoints"]:
                results["recommendations"].append("Create API endpoints for user rights management")
            
            results["compliance_score"] = len(results["implemented_rights"]) / len(gdpr_rights) * 100
            
            return results
            
        except Exception as e:
            logger.error(f"Error checking user rights implementation: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def check_data_processing_records(self, project_dir: str = ".") -> Dict[str, Any]:
        """Check for data processing records and documentation."""
        logger.info("Checking data processing records...")
        
        results = {
            "status": "success",
            "processing_records_found": False,
            "data_flows_documented": False,
            "retention_policies": False,
            "breach_procedures": False,
            "documentation_files": [],
            "missing_documentation": [],
            "recommendations": []
        }
        
        try:
            documentation_patterns = {
                "processing_records": ["processing_record", "data_processing", "ropa"],
                "data_flows": ["data_flow", "data_map", "processing_flow"],
                "retention": ["retention", "data_retention", "retention_policy"],
                "breach": ["breach", "incident", "security_incident", "data_breach"]
            }
            
            found_docs = {category: [] for category in documentation_patterns.keys()}
            
            # Search for documentation files
            for root, dirs, files in os.walk(project_dir):
                for file in files:
                    file_lower = file.lower()
                    file_path = os.path.join(root, file)
                    
                    # Check for documentation files
                    if any(ext in file_lower for ext in ['.md', '.txt', '.pdf', '.doc']):
                        for category, patterns in documentation_patterns.items():
                            for pattern in patterns:
                                if pattern in file_lower:
                                    found_docs[category].append(file_path)
                                    results["documentation_files"].append(file_path)
            
            # Update results based on found documentation
            results["processing_records_found"] = bool(found_docs["processing_records"])
            results["data_flows_documented"] = bool(found_docs["data_flows"])
            results["retention_policies"] = bool(found_docs["retention"])
            results["breach_procedures"] = bool(found_docs["breach"])
            
            # Identify missing documentation
            if not results["processing_records_found"]:
                results["missing_documentation"].append("Records of Processing Activities (ROPA)")
                results["recommendations"].append("Create Records of Processing Activities documentation")
            
            if not results["data_flows_documented"]:
                results["missing_documentation"].append("Data Flow Documentation")
                results["recommendations"].append("Document data flows and processing activities")
            
            if not results["retention_policies"]:
                results["missing_documentation"].append("Data Retention Policies")
                results["recommendations"].append("Establish and document data retention policies")
            
            if not results["breach_procedures"]:
                results["missing_documentation"].append("Data Breach Procedures")
                results["recommendations"].append("Create data breach response procedures")
            
            # Additional recommendations
            results["recommendations"].extend([
                "Regular review and update of processing records",
                "Implement data protection impact assessments (DPIA)",
                "Document legal basis for data processing",
                "Maintain audit trail of data processing activities"
            ])
            
            results["found_documentation"] = found_docs
            
            return results
            
        except Exception as e:
            logger.error(f"Error checking data processing records: {e}")
            return {
                "status": "error",
                "message": str(e)
            }
    
    def run_comprehensive_check(self, project_dir: str = ".") -> Dict[str, Any]:
        """Run comprehensive GDPR compliance check."""
        logger.info("Starting comprehensive GDPR compliance check...")
        
        compliance_summary = {
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "project_directory": project_dir,
            "compliance_results": {},
            "overall_compliance": {},
            "recommendations": []
        }
        
        try:
            # Run all compliance checks
            compliance_summary["compliance_results"]["privacy_policy"] = self.scan_privacy_policy_requirements(project_dir)
            compliance_summary["compliance_results"]["data_collection"] = self.scan_data_collection_practices(project_dir)
            compliance_summary["compliance_results"]["data_storage"] = self.check_data_storage_security(project_dir)
            compliance_summary["compliance_results"]["user_rights"] = self.check_user_rights_implementation(project_dir)
            compliance_summary["compliance_results"]["documentation"] = self.check_data_processing_records(project_dir)
            
            # Calculate overall compliance
            compliance_summary["overall_compliance"] = self._calculate_overall_compliance(compliance_summary["compliance_results"])
            
            # Generate comprehensive recommendations
            compliance_summary["recommendations"] = self._generate_compliance_recommendations(compliance_summary)
            
            # Save detailed report
            report_file = self.reports_dir / f"gdpr_compliance_check_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(report_file, 'w') as f:
                json.dump(compliance_summary, f, indent=2, default=str)
            
            logger.info(f"GDPR compliance check completed. Report saved to: {report_file}")
            return compliance_summary
            
        except Exception as e:
            logger.error(f"Error during GDPR compliance check: {e}")
            compliance_summary["status"] = "error"
            compliance_summary["error"] = str(e)
            return compliance_summary
    
    def _calculate_overall_compliance(self, compliance_results: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate overall compliance score."""
        overall = {
            "compliance_score": 0,
            "areas_checked": 0,
            "compliant_areas": 0,
            "major_issues": 0,
            "compliance_level": "low"
        }
        
        try:
            scores = []
            
            # Privacy policy compliance
            privacy_result = compliance_results.get("privacy_policy", {})
            if privacy_result.get("status") == "success":
                overall["areas_checked"] += 1
                privacy_score = 0
                if privacy_result.get("privacy_policy_found"):
                    privacy_score += 30
                if privacy_result.get("terms_of_service_found"):
                    privacy_score += 20
                if privacy_result.get("cookie_policy_found"):
                    privacy_score += 25
                if privacy_result.get("data_processing_agreements"):
                    privacy_score += 25
                scores.append(privacy_score)
                if privacy_score >= 70:
                    overall["compliant_areas"] += 1
                else:
                    overall["major_issues"] += 1
            
            # Data collection compliance
            data_collection = compliance_results.get("data_collection", {})
            if data_collection.get("status") == "success":
                overall["areas_checked"] += 1
                collection_score = 50  # Base score
                if data_collection.get("consent_mechanisms"):
                    collection_score += 30
                if not data_collection.get("potential_issues"):
                    collection_score += 20
                scores.append(collection_score)
                if collection_score >= 70:
                    overall["compliant_areas"] += 1
                else:
                    overall["major_issues"] += 1
            
            # User rights compliance
            user_rights = compliance_results.get("user_rights", {})
            if user_rights.get("status") == "success":
                overall["areas_checked"] += 1
                rights_score = user_rights.get("compliance_score", 0)
                scores.append(rights_score)
                if rights_score >= 70:
                    overall["compliant_areas"] += 1
                else:
                    overall["major_issues"] += 1
            
            # Data storage compliance
            storage = compliance_results.get("data_storage", {})
            if storage.get("status") == "success":
                overall["areas_checked"] += 1
                storage_score = 40  # Base score
                if storage.get("encryption_found"):
                    storage_score += 30
                if not storage.get("security_issues"):
                    storage_score += 30
                scores.append(storage_score)
                if storage_score >= 70:
                    overall["compliant_areas"] += 1
                else:
                    overall["major_issues"] += 1
            
            # Documentation compliance
            docs = compliance_results.get("documentation", {})
            if docs.get("status") == "success":
                overall["areas_checked"] += 1
                docs_score = 0
                if docs.get("processing_records_found"):
                    docs_score += 25
                if docs.get("data_flows_documented"):
                    docs_score += 25
                if docs.get("retention_policies"):
                    docs_score += 25
                if docs.get("breach_procedures"):
                    docs_score += 25
                scores.append(docs_score)
                if docs_score >= 70:
                    overall["compliant_areas"] += 1
                else:
                    overall["major_issues"] += 1
            
            # Calculate overall score
            if scores:
                overall["compliance_score"] = sum(scores) / len(scores)
            
            # Determine compliance level
            if overall["compliance_score"] >= 80:
                overall["compliance_level"] = "high"
            elif overall["compliance_score"] >= 60:
                overall["compliance_level"] = "medium"
            else:
                overall["compliance_level"] = "low"
            
        except Exception as e:
            logger.warning(f"Error calculating overall compliance: {e}")
        
        return overall
    
    def _generate_compliance_recommendations(self, compliance_summary: Dict[str, Any]) -> List[str]:
        """Generate comprehensive compliance recommendations."""
        recommendations = []
        
        overall = compliance_summary.get("overall_compliance", {})
        
        if overall.get("compliance_level") == "low":
            recommendations.append("URGENT: Low GDPR compliance level. Immediate action required.")
        
        if overall.get("major_issues", 0) > 2:
            recommendations.append("Multiple compliance areas need attention. Prioritize user rights and data protection.")
        
        # Collect specific recommendations from each area
        for area_name, area_results in compliance_summary.get("compliance_results", {}).items():
            if isinstance(area_results, dict) and area_results.get("recommendations"):
                recommendations.extend(area_results["recommendations"][:2])  # Take top 2 from each area
        
        # Add general GDPR recommendations
        recommendations.extend([
            "Appoint a Data Protection Officer (DPO) if required",
            "Conduct Data Protection Impact Assessments (DPIA) for high-risk processing",
            "Implement Privacy by Design principles",
            "Regular GDPR compliance training for staff",
            "Establish procedures for handling data subject requests",
            "Regular audits and compliance monitoring"
        ])
        
        return list(set(recommendations))  # Remove duplicates

def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="GDPR Compliance Checker for A1Betting")
    parser.add_argument("--project-dir", default=".", help="Project directory to scan")
    parser.add_argument("--reports-dir", default="automation/reports", help="Directory for reports")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Create checker
    checker = GDPRComplianceChecker(reports_dir=args.reports_dir)
    
    # Run comprehensive check
    results = checker.run_comprehensive_check(project_dir=args.project_dir)
    
    # Print summary
    print("\n" + "="*50)
    print("GDPR COMPLIANCE CHECK SUMMARY")
    print("="*50)
    print(f"Status: {results['status']}")
    
    if results.get('overall_compliance'):
        overall = results['overall_compliance']
        print(f"Compliance Score: {overall.get('compliance_score', 0):.1f}/100")
        print(f"Compliance Level: {overall.get('compliance_level', 'unknown').upper()}")
        print(f"Areas Checked: {overall.get('areas_checked', 0)}")
        print(f"Compliant Areas: {overall.get('compliant_areas', 0)}")
        print(f"Major Issues: {overall.get('major_issues', 0)}")
    
    if results.get('recommendations'):
        print("\nTop Recommendations:")
        for i, rec in enumerate(results['recommendations'][:7], 1):
            print(f"  {i}. {rec}")
    
    # Exit with appropriate code
    if results['status'] == 'error':
        sys.exit(1)
    elif results.get('overall_compliance', {}).get('compliance_level') == 'low':
        print("\nWarning: Low GDPR compliance level")
        sys.exit(1)
    elif results.get('overall_compliance', {}).get('major_issues', 0) > 2:
        print("\nWarning: Multiple major compliance issues")
        sys.exit(1)
    else:
        print("\nGDPR compliance check completed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
