#!/usr/bin/env python3
"""
ML Data Validation Script for A1Betting Platform

This script validates machine learning datasets for quality, consistency,
and compliance with expected schemas and constraints.
"""

import os
import sys
import json
import logging
import pandas as pd
import numpy as np
from datetime import datetime
from pathlib import Path
import argparse
from typing import Dict, List, Any, Tuple
import warnings
warnings.filterwarnings('ignore')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class MLDataValidator:
    """Comprehensive ML data validation system."""
    
    def __init__(self, reports_dir: str = "automation/reports"):
        self.reports_dir = Path(reports_dir)
        self.reports_dir.mkdir(parents=True, exist_ok=True)
        self.validation_results = {}
        
    def validate_dataset_structure(self, data_path: str) -> Dict[str, Any]:
        """Validate dataset structure and basic properties."""
        try:
            if data_path.endswith('.csv'):
                df = pd.read_csv(data_path)
            elif data_path.endswith('.json'):
                df = pd.read_json(data_path)
            else:
                logger.warning(f"Unsupported file format: {data_path}")
                return {"status": "error", "message": "Unsupported file format"}
            
            structure_results = {
                "status": "success",
                "rows": len(df),
                "columns": len(df.columns),
                "column_names": list(df.columns),
                "dtypes": df.dtypes.to_dict(),
                "memory_usage": df.memory_usage(deep=True).sum(),
                "null_counts": df.isnull().sum().to_dict(),
                "duplicate_rows": df.duplicated().sum()
            }
            
            # Check for minimum data requirements
            if len(df) < 100:
                structure_results["warnings"] = structure_results.get("warnings", [])
                structure_results["warnings"].append("Dataset has fewer than 100 rows")
            
            return structure_results
            
        except Exception as e:
            logger.error(f"Error validating dataset structure: {e}")
            return {"status": "error", "message": str(e)}
    
    def validate_data_quality(self, data_path: str) -> Dict[str, Any]:
        """Validate data quality metrics."""
        try:
            if data_path.endswith('.csv'):
                df = pd.read_csv(data_path)
            elif data_path.endswith('.json'):
                df = pd.read_json(data_path)
            else:
                return {"status": "error", "message": "Unsupported file format"}
            
            quality_results = {
                "status": "success",
                "completeness": {},
                "consistency": {},
                "validity": {},
                "uniqueness": {}
            }
            
            # Completeness checks
            for col in df.columns:
                completeness = (df[col].notna().sum() / len(df)) * 100
                quality_results["completeness"][col] = round(completeness, 2)
            
            # Consistency checks for numeric columns
            numeric_cols = df.select_dtypes(include=[np.number]).columns
            for col in numeric_cols:
                if len(df[col].dropna()) > 0:
                    outliers = self._detect_outliers(df[col].dropna())
                    quality_results["consistency"][col] = {
                        "outlier_count": len(outliers),
                        "outlier_percentage": round((len(outliers) / len(df[col].dropna())) * 100, 2)
                    }
            
            # Validity checks
            for col in df.columns:
                if col.lower() in ['email', 'email_address']:
                    valid_emails = df[col].str.contains(r'^[^@]+@[^@]+\.[^@]+$', na=False).sum()
                    quality_results["validity"][col] = {
                        "valid_count": valid_emails,
                        "valid_percentage": round((valid_emails / len(df[col].dropna())) * 100, 2)
                    }
                elif col.lower() in ['date', 'timestamp', 'created_at', 'updated_at']:
                    try:
                        pd.to_datetime(df[col], errors='raise')
                        quality_results["validity"][col] = {"status": "valid_datetime"}
                    except:
                        quality_results["validity"][col] = {"status": "invalid_datetime"}
            
            # Uniqueness checks
            for col in df.columns:
                unique_count = df[col].nunique()
                uniqueness_ratio = unique_count / len(df)
                quality_results["uniqueness"][col] = {
                    "unique_count": unique_count,
                    "uniqueness_ratio": round(uniqueness_ratio, 4)
                }
            
            return quality_results
            
        except Exception as e:
            logger.error(f"Error validating data quality: {e}")
            return {"status": "error", "message": str(e)}
    
    def _detect_outliers(self, series: pd.Series) -> List:
        """Detect outliers using IQR method."""
        Q1 = series.quantile(0.25)
        Q3 = series.quantile(0.75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        return series[(series < lower_bound) | (series > upper_bound)].tolist()
    
    def validate_ml_schema(self, data_path: str, schema_path: str = None) -> Dict[str, Any]:
        """Validate data against ML schema requirements."""
        try:
            # Load expected schema (if provided)
            expected_schema = {
                "required_columns": ["timestamp", "user_id", "bet_amount", "odds", "outcome"],
                "numeric_columns": ["bet_amount", "odds"],
                "categorical_columns": ["outcome"],
                "datetime_columns": ["timestamp"]
            }
            
            if schema_path and os.path.exists(schema_path):
                with open(schema_path, 'r') as f:
                    expected_schema = json.load(f)
            
            if data_path.endswith('.csv'):
                df = pd.read_csv(data_path)
            elif data_path.endswith('.json'):
                df = pd.read_json(data_path)
            else:
                return {"status": "error", "message": "Unsupported file format"}
            
            schema_results = {
                "status": "success",
                "required_columns_check": {},
                "data_types_check": {},
                "constraints_check": {}
            }
            
            # Check required columns
            missing_columns = set(expected_schema.get("required_columns", [])) - set(df.columns)
            schema_results["required_columns_check"] = {
                "missing_columns": list(missing_columns),
                "all_required_present": len(missing_columns) == 0
            }
            
            # Check data types
            for col in expected_schema.get("numeric_columns", []):
                if col in df.columns:
                    is_numeric = pd.api.types.is_numeric_dtype(df[col])
                    schema_results["data_types_check"][col] = {
                        "expected": "numeric",
                        "is_valid": is_numeric
                    }
            
            for col in expected_schema.get("datetime_columns", []):
                if col in df.columns:
                    try:
                        pd.to_datetime(df[col], errors='raise')
                        schema_results["data_types_check"][col] = {
                            "expected": "datetime",
                            "is_valid": True
                        }
                    except:
                        schema_results["data_types_check"][col] = {
                            "expected": "datetime",
                            "is_valid": False
                        }
            
            # Check business constraints
            if "bet_amount" in df.columns:
                negative_bets = (df["bet_amount"] < 0).sum()
                schema_results["constraints_check"]["bet_amount"] = {
                    "negative_values": negative_bets,
                    "constraint_violated": negative_bets > 0
                }
            
            if "odds" in df.columns:
                invalid_odds = ((df["odds"] <= 0) | (df["odds"] > 1000)).sum()
                schema_results["constraints_check"]["odds"] = {
                    "invalid_values": invalid_odds,
                    "constraint_violated": invalid_odds > 0
                }
            
            return schema_results
            
        except Exception as e:
            logger.error(f"Error validating ML schema: {e}")
            return {"status": "error", "message": str(e)}
    
    def validate_training_data(self, data_path: str) -> Dict[str, Any]:
        """Specific validation for ML training data."""
        try:
            if data_path.endswith('.csv'):
                df = pd.read_csv(data_path)
            elif data_path.endswith('.json'):
                df = pd.read_json(data_path)
            else:
                return {"status": "error", "message": "Unsupported file format"}
            
            training_results = {
                "status": "success",
                "data_balance": {},
                "feature_analysis": {},
                "target_analysis": {}
            }
            
            # Check for common target columns
            target_columns = ["outcome", "result", "target", "label", "class"]
            found_target = None
            for col in target_columns:
                if col in df.columns:
                    found_target = col
                    break
            
            if found_target:
                # Data balance analysis
                target_distribution = df[found_target].value_counts()
                training_results["data_balance"] = {
                    "target_column": found_target,
                    "class_distribution": target_distribution.to_dict(),
                    "is_balanced": target_distribution.std() / target_distribution.mean() < 0.5
                }
                
                # Target analysis
                training_results["target_analysis"] = {
                    "unique_values": df[found_target].nunique(),
                    "null_values": df[found_target].isnull().sum(),
                    "data_type": str(df[found_target].dtype)
                }
            
            # Feature analysis
            feature_cols = [col for col in df.columns if col != found_target]
            for col in feature_cols[:10]:  # Analyze first 10 features
                if pd.api.types.is_numeric_dtype(df[col]):
                    training_results["feature_analysis"][col] = {
                        "mean": float(df[col].mean()) if pd.notna(df[col].mean()) else None,
                        "std": float(df[col].std()) if pd.notna(df[col].std()) else None,
                        "min": float(df[col].min()) if pd.notna(df[col].min()) else None,
                        "max": float(df[col].max()) if pd.notna(df[col].max()) else None,
                        "null_percentage": (df[col].isnull().sum() / len(df)) * 100
                    }
            
            return training_results
            
        except Exception as e:
            logger.error(f"Error validating training data: {e}")
            return {"status": "error", "message": str(e)}
    
    def run_validation(self, data_dir: str = "data") -> Dict[str, Any]:
        """Run comprehensive ML data validation."""
        logger.info("Starting ML data validation...")
        
        validation_summary = {
            "timestamp": datetime.now().isoformat(),
            "status": "success",
            "datasets_validated": 0,
            "validation_results": {},
            "overall_score": 0,
            "recommendations": []
        }
        
        try:
            # Find data files
            data_files = []
            if os.path.exists(data_dir):
                for root, dirs, files in os.walk(data_dir):
                    for file in files:
                        if file.endswith(('.csv', '.json')):
                            data_files.append(os.path.join(root, file))
            
            # If no data directory, create sample validation
            if not data_files:
                logger.warning("No data files found. Running sample validation...")
                # Create sample data for demonstration
                sample_data = pd.DataFrame({
                    'timestamp': pd.date_range('2024-01-01', periods=1000, freq='H'),
                    'user_id': np.random.randint(1, 100, 1000),
                    'bet_amount': np.random.exponential(50, 1000),
                    'odds': np.random.uniform(1.1, 10.0, 1000),
                    'outcome': np.random.choice(['win', 'loss'], 1000)
                })
                
                sample_path = self.reports_dir / "sample_data.csv"
                sample_data.to_csv(sample_path, index=False)
                data_files = [str(sample_path)]
            
            total_score = 0
            for data_file in data_files:
                logger.info(f"Validating: {data_file}")
                
                file_results = {
                    "structure_validation": self.validate_dataset_structure(data_file),
                    "quality_validation": self.validate_data_quality(data_file),
                    "schema_validation": self.validate_ml_schema(data_file),
                    "training_validation": self.validate_training_data(data_file)
                }
                
                # Calculate file score
                file_score = self._calculate_validation_score(file_results)
                file_results["validation_score"] = file_score
                total_score += file_score
                
                validation_summary["validation_results"][os.path.basename(data_file)] = file_results
                validation_summary["datasets_validated"] += 1
            
            # Calculate overall score
            if validation_summary["datasets_validated"] > 0:
                validation_summary["overall_score"] = total_score / validation_summary["datasets_validated"]
            
            # Generate recommendations
            validation_summary["recommendations"] = self._generate_recommendations(validation_summary)
            
            # Save detailed report
            report_file = self.reports_dir / f"ml_data_validation_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
            with open(report_file, 'w') as f:
                json.dump(validation_summary, f, indent=2, default=str)
            
            logger.info(f"ML data validation completed. Report saved to: {report_file}")
            return validation_summary
            
        except Exception as e:
            logger.error(f"Error during ML data validation: {e}")
            validation_summary["status"] = "error"
            validation_summary["error"] = str(e)
            return validation_summary
    
    def _calculate_validation_score(self, results: Dict[str, Any]) -> float:
        """Calculate validation score for a dataset."""
        score = 0
        total_checks = 0
        
        # Structure validation score
        if results["structure_validation"]["status"] == "success":
            score += 25
            total_checks += 1
        
        # Quality validation score
        if results["quality_validation"]["status"] == "success":
            # Average completeness score
            completeness_scores = list(results["quality_validation"]["completeness"].values())
            if completeness_scores:
                avg_completeness = sum(completeness_scores) / len(completeness_scores)
                score += (avg_completeness / 100) * 25
            total_checks += 1
        
        # Schema validation score
        if results["schema_validation"]["status"] == "success":
            if results["schema_validation"]["required_columns_check"]["all_required_present"]:
                score += 25
            total_checks += 1
        
        # Training validation score
        if results["training_validation"]["status"] == "success":
            if results["training_validation"].get("data_balance", {}).get("is_balanced", False):
                score += 25
            total_checks += 1
        
        return score if total_checks == 0 else score
    
    def _generate_recommendations(self, validation_summary: Dict[str, Any]) -> List[str]:
        """Generate recommendations based on validation results."""
        recommendations = []
        
        if validation_summary["overall_score"] < 50:
            recommendations.append("Overall data quality is low. Consider data cleaning and preprocessing.")
        
        if validation_summary["datasets_validated"] < 3:
            recommendations.append("Consider adding more diverse datasets for better model training.")
        
        # Analyze common issues across datasets
        for dataset, results in validation_summary["validation_results"].items():
            if results["structure_validation"].get("duplicate_rows", 0) > 0:
                recommendations.append(f"Remove duplicate rows from {dataset}")
            
            null_counts = results["structure_validation"].get("null_counts", {})
            high_null_cols = [col for col, count in null_counts.items() if count > len(null_counts) * 0.1]
            if high_null_cols:
                recommendations.append(f"Handle missing values in columns: {', '.join(high_null_cols)} for {dataset}")
        
        if not recommendations:
            recommendations.append("Data validation passed successfully. Consider regular validation scheduling.")
        
        return recommendations

def main():
    """Main execution function."""
    parser = argparse.ArgumentParser(description="ML Data Validation for A1Betting")
    parser.add_argument("--data-dir", default="data", help="Directory containing data files")
    parser.add_argument("--reports-dir", default="automation/reports", help="Directory for reports")
    parser.add_argument("--verbose", action="store_true", help="Enable verbose logging")
    
    args = parser.parse_args()
    
    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)
    
    # Create validator
    validator = MLDataValidator(reports_dir=args.reports_dir)
    
    # Run validation
    results = validator.run_validation(data_dir=args.data_dir)
    
    # Print summary
    print("\n" + "="*50)
    print("ML DATA VALIDATION SUMMARY")
    print("="*50)
    print(f"Status: {results['status']}")
    print(f"Datasets Validated: {results['datasets_validated']}")
    print(f"Overall Score: {results['overall_score']:.1f}/100")
    
    if results.get('recommendations'):
        print("\nRecommendations:")
        for i, rec in enumerate(results['recommendations'], 1):
            print(f"  {i}. {rec}")
    
    # Exit with appropriate code
    if results['status'] == 'error':
        sys.exit(1)
    elif results['overall_score'] < 70:
        print("\nWarning: Data quality below recommended threshold (70)")
        sys.exit(1)
    else:
        print("\nData validation completed successfully!")
        sys.exit(0)

if __name__ == "__main__":
    main()
