#!/usr/bin/env python3
"""
Database Performance Profiler
Profiles database performance and generates optimization recommendations.
"""

import json
import logging
import sqlite3
import sys
import time
from pathlib import Path
from typing import Any, Dict, List

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class DatabaseProfiler:
    """Database performance profiler."""

    def __init__(self):
        self.project_root = Path.cwd()
        self.reports_dir = self.project_root / "automation" / "reports"
        self.reports_dir.mkdir(parents=True, exist_ok=True)

    def profile_sqlite_performance(self, db_path: str) -> Dict[str, Any]:
        """Profile SQLite database performance."""
        logger.info(f"Profiling SQLite database: {db_path}")

        results = {
            "database": db_path,
            "type": "sqlite",
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
            "metrics": {},
            "recommendations": [],
        }

        try:
            # Check if database exists
            if not Path(db_path).exists():
                logger.warning(f"Database not found: {db_path}")
                results["status"] = "not_found"
                return results

            # Connect to database
            start_time = time.time()
            conn = sqlite3.connect(db_path)
            connection_time = (time.time() - start_time) * 1000

            cursor = conn.cursor()

            # Basic database info
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = [row[0] for row in cursor.fetchall()]

            # Get database size
            db_size = Path(db_path).stat().st_size

            # Basic performance metrics
            results["metrics"] = {
                "connection_time_ms": round(connection_time, 2),
                "database_size_bytes": db_size,
                "table_count": len(tables),
                "tables": tables,
            }

            # Query performance test
            start_time = time.time()
            cursor.execute("SELECT COUNT(*) FROM sqlite_master")
            cursor.fetchone()
            query_time = (time.time() - start_time) * 1000
            results["metrics"]["simple_query_time_ms"] = round(query_time, 2)

            # Generate recommendations
            if db_size > 100 * 1024 * 1024:  # 100MB
                results["recommendations"].append(
                    {
                        "type": "size",
                        "message": "Database is large, consider archiving old data",
                        "priority": "medium",
                    }
                )

            if connection_time > 100:  # 100ms
                results["recommendations"].append(
                    {
                        "type": "performance",
                        "message": "Connection time is slow, check database location and disk I/O",
                        "priority": "high",
                    }
                )

            conn.close()
            results["status"] = "success"

        except Exception as e:
            logger.error(f"Error profiling database: {e}")
            results["status"] = "error"
            results["error"] = str(e)

        return results

    def run_database_profiling(self) -> Dict[str, Any]:
        """Run comprehensive database profiling."""
        logger.info("Starting database performance profiling...")

        # Common database file locations
        database_files = [
            self.project_root / "a1betting.db",
            self.project_root / "betting.db",
            self.project_root / "database.db",
            self.project_root / "app.db",
        ]

        results = {"timestamp": time.strftime("%Y-%m-%d %H:%M:%S"), "databases": []}

        for db_file in database_files:
            if db_file.exists():
                db_results = self.profile_sqlite_performance(str(db_file))
                results["databases"].append(db_results)

        # If no databases found, create a mock result
        if not results["databases"]:
            logger.info("No databases found, creating placeholder result")
            results["databases"].append(
                {
                    "database": "no_database_found",
                    "type": "none",
                    "status": "not_applicable",
                    "metrics": {
                        "connection_time_ms": 0,
                        "database_size_bytes": 0,
                        "table_count": 0,
                    },
                    "recommendations": [
                        {
                            "type": "setup",
                            "message": "No databases found - consider setting up database schema",
                            "priority": "low",
                        }
                    ],
                }
            )

        # Overall summary
        total_databases = len(
            [db for db in results["databases"] if db["status"] == "success"]
        )
        results["summary"] = {"total_databases": total_databases, "status": "completed"}

        return results

    def save_report(self, results: Dict[str, Any]) -> None:
        """Save profiling results to report file."""
        report_path = self.reports_dir / "database_profiling.json"

        try:
            with open(report_path, "w") as f:
                json.dump(results, f, indent=2)
            logger.info(f"Database profiling report saved to: {report_path}")
        except Exception as e:
            logger.error(f"Failed to save report: {e}")


def main():
    """Main function."""
    profiler = DatabaseProfiler()
    results = profiler.run_database_profiling()
    profiler.save_report(results)

    # Print summary
    print(f"\nDatabase Performance Profiling Summary:")
    print(f"Databases profiled: {results['summary']['total_databases']}")
    print(f"Status: {results['summary']['status']}")

    sys.exit(0)


if __name__ == "__main__":
    main()
