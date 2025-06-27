#!/usr/bin/env python3
"""
Enhanced Service Manager for A1Betting Automation System
Provides intelligent service management with graceful degradation and recovery.
"""

import asyncio
import json
import logging
import os
import subprocess
import time
from datetime import datetime
from enum import Enum
from pathlib import Path
from typing import Dict, List, Optional, Any
import docker
import psutil

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ServiceState(Enum):
    STOPPED = "stopped"
    STARTING = "starting"
    RUNNING = "running"
    UNHEALTHY = "unhealthy"
    FAILED = "failed"

class ServiceMode(Enum):
    DEVELOPMENT = "development"
    TESTING = "testing"
    PRODUCTION = "production"

class EnhancedServiceManager:
    """Enhanced service manager with intelligent automation capabilities."""
    
    def __init__(self, mode: ServiceMode = ServiceMode.DEVELOPMENT):
        self.mode = mode
        self.project_root = Path.cwd()
        self.docker_client = None
        self.services_status = {}
        self.required_services = self._get_required_services()
        self.optional_services = self._get_optional_services()
        
        try:
            self.docker_client = docker.from_env()
        except Exception as e:
            logger.warning(f"Docker not available: {e}")
    
    def _get_required_services(self) -> List[str]:
        """Get list of required services based on mode."""
        if self.mode == ServiceMode.DEVELOPMENT:
            return ["redis"]  # Minimal for development
        elif self.mode == ServiceMode.TESTING:
            return ["redis", "postgres"]
        else:
            return ["redis", "postgres", "mongodb", "backend", "frontend"]
    
    def _get_optional_services(self) -> List[str]:
        """Get list of optional services."""
        return ["mongodb", "monitoring", "ml-service"]
    
    async def ensure_services_ready(self) -> Dict[str, Any]:
        """Ensure required services are ready, start if needed."""
        logger.info("Ensuring services are ready...")
        
        results = {
            "timestamp": datetime.now().isoformat(),
            "mode": self.mode.value,
            "services": {},
            "actions_taken": [],
            "ready": True
        }
        
        # Check Docker availability
        if not self.docker_client:
            results["actions_taken"].append("Docker not available - running in local mode")
            return await self._handle_local_mode(results)
        
        # Check each required service
        for service_name in self.required_services:
            service_status = await self._check_service_status(service_name)
            results["services"][service_name] = service_status
            
            if not service_status["healthy"]:
                if service_name in ["redis", "postgres", "mongodb"]:
                    # Try to start database services
                    if await self._start_database_service(service_name):
                        results["actions_taken"].append(f"Started {service_name}")
                        # Wait a bit for service to be ready
                        await asyncio.sleep(5)
                        service_status = await self._check_service_status(service_name)
                        results["services"][service_name] = service_status
                
                if not service_status["healthy"]:
                    if service_name in self.required_services:
                        results["ready"] = False
                        logger.warning(f"Required service {service_name} is not healthy")
        
        # Check optional services (don't fail if they're not available)
        for service_name in self.optional_services:
            if service_name not in results["services"]:
                service_status = await self._check_service_status(service_name)
                results["services"][service_name] = service_status
                results["services"][service_name]["optional"] = True
        
        return results
    
    async def _handle_local_mode(self, results: Dict[str, Any]) -> Dict[str, Any]:
        """Handle services in local development mode."""
        logger.info("Running in local mode - checking local services...")
        
        # Check for local Redis
        redis_healthy = await self._check_local_redis()
        results["services"]["redis"] = {
            "healthy": redis_healthy,
            "mode": "local",
            "port": 6379
        }
        
        if not redis_healthy:
            results["actions_taken"].append("Redis not available locally - some features may be limited")
            results["ready"] = False
        
        # For development, we can work with minimal services
        if self.mode == ServiceMode.DEVELOPMENT:
            results["ready"] = True  # Allow development even without all services
            results["actions_taken"].append("Development mode - continuing with available services")
        
        return results
    
    async def _check_service_status(self, service_name: str) -> Dict[str, Any]:
        """Check the status of a specific service."""
        try:
            if not self.docker_client:
                return {"healthy": False, "error": "Docker not available"}
            
            # Look for the container
            container_name = f"a1betting-{service_name}"
            try:
                container = self.docker_client.containers.get(container_name)
                status = container.status
                
                if status == "running":
                    # Additional health check for specific services
                    if service_name == "redis":
                        return await self._check_redis_health(container)
                    elif service_name == "postgres":
                        return await self._check_postgres_health(container)
                    elif service_name == "mongodb":
                        return await self._check_mongodb_health(container)
                    else:
                        return {"healthy": True, "status": status}
                else:
                    return {"healthy": False, "status": status}
                    
            except docker.errors.NotFound:
                return {"healthy": False, "error": "Container not found"}
                
        except Exception as e:
            return {"healthy": False, "error": str(e)}
    
    async def _start_database_service(self, service_name: str) -> bool:
        """Start a database service using docker-compose."""
        try:
            logger.info(f"Starting {service_name} service...")
            
            # Use docker-compose to start the specific service
            cmd = ["docker-compose", "up", "-d", service_name]
            process = await asyncio.create_subprocess_exec(
                *cmd,
                cwd=self.project_root,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )
            
            stdout, stderr = await process.communicate()
            
            if process.returncode == 0:
                logger.info(f"Successfully started {service_name}")
                return True
            else:
                logger.error(f"Failed to start {service_name}: {stderr.decode()}")
                return False
                
        except Exception as e:
            logger.error(f"Error starting {service_name}: {e}")
            return False
    
    async def _check_local_redis(self) -> bool:
        """Check if Redis is running locally."""
        try:
            import redis
            r = redis.Redis(host='localhost', port=6379, db=0, socket_timeout=2)
            r.ping()
            return True
        except Exception:
            return False
    
    async def _check_redis_health(self, container) -> Dict[str, Any]:
        """Check Redis container health."""
        try:
            import redis
            r = redis.Redis(host='localhost', port=6379, db=0, socket_timeout=2)
            ping_result = r.ping()
            return {
                "healthy": ping_result,
                "status": container.status,
                "port": 6379
            }
        except Exception as e:
            return {
                "healthy": False,
                "status": container.status,
                "error": str(e)
            }
    
    async def _check_postgres_health(self, container) -> Dict[str, Any]:
        """Check PostgreSQL container health."""
        try:
            import psycopg2
            conn = psycopg2.connect(
                host="localhost",
                port=5432,
                database="a1betting",
                user="postgres",
                password="password",
                connect_timeout=5
            )
            conn.close()
            return {
                "healthy": True,
                "status": container.status,
                "port": 5432
            }
        except Exception as e:
            return {
                "healthy": False,
                "status": container.status,
                "error": str(e)
            }
    
    async def _check_mongodb_health(self, container) -> Dict[str, Any]:
        """Check MongoDB container health."""
        try:
            from pymongo import MongoClient
            client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=5000)
            client.admin.command('ping')
            return {
                "healthy": True,
                "status": container.status,
                "port": 27017
            }
        except Exception as e:
            return {
                "healthy": False,
                "status": container.status,
                "error": str(e)
            }
    
    async def graceful_shutdown(self):
        """Gracefully shutdown services if needed."""
        logger.info("Gracefully shutting down services...")
        
        if self.docker_client:
            try:
                # Stop non-essential services first
                for service in ["frontend", "backend"]:
                    try:
                        container = self.docker_client.containers.get(f"a1betting-{service}")
                        if container.status == "running":
                            container.stop(timeout=10)
                            logger.info(f"Stopped {service}")
                    except docker.errors.NotFound:
                        pass
                    except Exception as e:
                        logger.warning(f"Error stopping {service}: {e}")
                
                # Keep databases running for other processes
                logger.info("Database services kept running for other processes")
                
            except Exception as e:
                logger.error(f"Error during graceful shutdown: {e}")

async def main():
    """Main function for testing the service manager."""
    manager = EnhancedServiceManager(ServiceMode.DEVELOPMENT)
    results = await manager.ensure_services_ready()
    
    print("Service Manager Results:")
    print(json.dumps(results, indent=2))
    
    return results

if __name__ == "__main__":
    asyncio.run(main())
