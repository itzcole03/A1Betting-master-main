#!/usr/bin/env python3
"""
Architecture Diagrams Generator
Automatically generates system architecture diagrams from code analysis.
"""

import os
import sys
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Set, Tuple
import ast
import re

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ArchitectureDiagramsGenerator:
    """Generate system architecture diagrams from code analysis."""
    
    def __init__(self):
        self.project_root = Path(__file__).parent.parent.parent
        self.diagrams_dir = self.project_root / "automation" / "reports" / "architecture_diagrams"
        self.diagrams_dir.mkdir(parents=True, exist_ok=True)
        
        # Data structures to store analysis results
        self.services = {}
        self.databases = {}
        self.apis = {}
        self.components = {}
        self.dependencies = set()
        
    def analyze_project_structure(self):
        """Analyze the overall project structure."""
        logger.info("Analyzing project structure...")
        
        # Identify major components
        components = {
            'backend': self.project_root / "backend",
            'frontend': self.project_root / "frontend",
            'automation': self.project_root / "automation",
            'database': self.project_root / "database",
            'monitoring': self.project_root / "monitoring",
            'deployment': self.project_root / "deployment"
        }
        
        for name, path in components.items():
            if path.exists():
                self.components[name] = {
                    'path': str(path.relative_to(self.project_root)),
                    'type': self._determine_component_type(name, path),
                    'technologies': self._identify_technologies(path),
                    'dependencies': self._analyze_component_dependencies(path)
                }
    
    def _determine_component_type(self, name: str, path: Path) -> str:
        """Determine the type of component based on name and contents."""
        type_mapping = {
            'backend': 'api_service',
            'frontend': 'web_app',
            'automation': 'automation_service',
            'database': 'database',
            'monitoring': 'monitoring',
            'deployment': 'infrastructure'
        }
        return type_mapping.get(name, 'service')
    
    def _identify_technologies(self, path: Path) -> List[str]:
        """Identify technologies used in a component."""
        technologies = []
        
        # Check for Python
        if list(path.glob("**/*.py")):
            technologies.append("Python")
            
            # Check for specific frameworks
            requirements_files = list(path.glob("**/requirements.txt"))
            for req_file in requirements_files:
                try:
                    with open(req_file, 'r') as f:
                        content = f.read().lower()
                        if 'flask' in content:
                            technologies.append("Flask")
                        if 'django' in content:
                            technologies.append("Django")
                        if 'fastapi' in content:
                            technologies.append("FastAPI")
                        if 'sqlalchemy' in content:
                            technologies.append("SQLAlchemy")
                        if 'redis' in content:
                            technologies.append("Redis")
                        if 'celery' in content:
                            technologies.append("Celery")
                except Exception:
                    pass
        
        # Check for JavaScript/TypeScript
        if list(path.glob("**/*.js")) or list(path.glob("**/*.jsx")) or list(path.glob("**/*.ts")) or list(path.glob("**/*.tsx")):
            technologies.append("JavaScript")
            
            # Check package.json for frameworks
            package_json = path / "package.json"
            if package_json.exists():
                try:
                    with open(package_json, 'r') as f:
                        data = json.load(f)
                        deps = {**data.get('dependencies', {}), **data.get('devDependencies', {})}
                        
                        if 'react' in deps:
                            technologies.append("React")
                        if 'vue' in deps:
                            technologies.append("Vue.js")
                        if 'angular' in deps:
                            technologies.append("Angular")
                        if 'next' in deps:
                            technologies.append("Next.js")
                        if 'express' in deps:
                            technologies.append("Express.js")
                        if 'typescript' in deps:
                            technologies.append("TypeScript")
                except Exception:
                    pass
        
        # Check for Docker
        if (path / "Dockerfile").exists() or (path / "docker-compose.yml").exists():
            technologies.append("Docker")
        
        # Check for databases
        if (path / "schema.sql").exists() or list(path.glob("**/*.sql")):
            technologies.append("SQL")
        
        return technologies
    
    def _analyze_component_dependencies(self, path: Path) -> List[str]:
        """Analyze dependencies between components."""
        dependencies = []
        
        # Look for imports and configuration that indicate dependencies
        python_files = list(path.glob("**/*.py"))
        for py_file in python_files[:10]:  # Limit to avoid performance issues
            try:
                with open(py_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                    # Look for database connections
                    if re.search(r'database|db|sql', content, re.IGNORECASE):
                        dependencies.append("database")
                    
                    # Look for Redis connections
                    if re.search(r'redis', content, re.IGNORECASE):
                        dependencies.append("redis")
                    
                    # Look for API calls
                    if re.search(r'requests\.|http\.|fetch\(', content):
                        dependencies.append("external_api")
                    
                    # Look for message queues
                    if re.search(r'celery|rabbitmq|kafka', content, re.IGNORECASE):
                        dependencies.append("message_queue")
                        
            except Exception:
                continue
        
        return dependencies
    
    def analyze_api_endpoints(self):
        """Analyze API endpoints and services."""
        logger.info("Analyzing API endpoints...")
        
        backend_dir = self.project_root / "backend"
        if not backend_dir.exists():
            return
        
        python_files = list(backend_dir.glob("**/*.py"))
        
        for py_file in python_files:
            try:
                with open(py_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Parse AST to find Flask routes
                tree = ast.parse(content)
                for node in ast.walk(tree):
                    if isinstance(node, ast.FunctionDef):
                        route_info = self._extract_route_info(node)
                        if route_info:
                            self.apis[route_info['path']] = {
                                'method': route_info['methods'],
                                'function': node.name,
                                'file': str(py_file.relative_to(self.project_root))
                            }
                            
            except Exception as e:
                logger.warning(f"Error analyzing {py_file}: {e}")
    
    def _extract_route_info(self, node: ast.FunctionDef) -> Dict[str, Any]:
        """Extract route information from function decorators."""
        for decorator in node.decorator_list:
            if isinstance(decorator, ast.Call):
                if (isinstance(decorator.func, ast.Attribute) and 
                    decorator.func.attr == 'route'):
                    
                    route_info = {'methods': ['GET']}
                    
                    # Extract path
                    if decorator.args:
                        if isinstance(decorator.args[0], ast.Str):
                            route_info['path'] = decorator.args[0].s
                        elif isinstance(decorator.args[0], ast.Constant):
                            route_info['path'] = decorator.args[0].value
                    
                    # Extract methods
                    for keyword in decorator.keywords:
                        if keyword.arg == 'methods':
                            if isinstance(keyword.value, ast.List):
                                methods = []
                                for elt in keyword.value.elts:
                                    if isinstance(elt, ast.Str):
                                        methods.append(elt.s)
                                    elif isinstance(elt, ast.Constant):
                                        methods.append(elt.value)
                                route_info['methods'] = methods
                    
                    return route_info
        return None
    
    def analyze_database_schema(self):
        """Analyze database schema and models."""
        logger.info("Analyzing database schema...")
        
        # Look for SQLAlchemy models
        backend_dir = self.project_root / "backend"
        if backend_dir.exists():
            python_files = list(backend_dir.glob("**/*.py"))
            
            for py_file in python_files:
                try:
                    with open(py_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    tree = ast.parse(content)
                    for node in ast.walk(tree):
                        if isinstance(node, ast.ClassDef):
                            # Check if it's a database model
                            is_model = any(
                                (isinstance(base, ast.Name) and 'Model' in base.id) or
                                (isinstance(base, ast.Attribute) and 'Model' in base.attr)
                                for base in node.bases
                            )
                            
                            if is_model:
                                self.databases[node.name] = {
                                    'file': str(py_file.relative_to(self.project_root)),
                                    'fields': self._extract_model_fields(node),
                                    'relationships': self._extract_relationships(node)
                                }
                                
                except Exception as e:
                    logger.warning(f"Error analyzing database model in {py_file}: {e}")
    
    def _extract_model_fields(self, node: ast.ClassDef) -> List[Dict[str, str]]:
        """Extract fields from a database model."""
        fields = []
        
        for item in node.body:
            if isinstance(item, ast.Assign):
                for target in item.targets:
                    if isinstance(target, ast.Name):
                        field_info = {'name': target.id, 'type': 'unknown'}
                        
                        # Try to determine field type
                        if isinstance(item.value, ast.Call):
                            if isinstance(item.value.func, ast.Name):
                                field_info['type'] = item.value.func.id
                            elif isinstance(item.value.func, ast.Attribute):
                                field_info['type'] = item.value.func.attr
                        
                        fields.append(field_info)
        
        return fields
    
    def _extract_relationships(self, node: ast.ClassDef) -> List[str]:
        """Extract relationships from a database model."""
        relationships = []
        
        for item in node.body:
            if isinstance(item, ast.Assign):
                if isinstance(item.value, ast.Call):
                    if (isinstance(item.value.func, ast.Name) and 
                        item.value.func.id == 'relationship'):
                        # Extract relationship target
                        if item.value.args:
                            if isinstance(item.value.args[0], ast.Str):
                                relationships.append(item.value.args[0].s)
                            elif isinstance(item.value.args[0], ast.Constant):
                                relationships.append(item.value.args[0].value)
        
        return relationships
    
    def generate_system_architecture_mermaid(self) -> str:
        """Generate system architecture diagram in Mermaid format."""
        mermaid = """graph TB
    %% A1Betting System Architecture
    
    subgraph "Client Layer"
        WEB[Web Browser]
        MOBILE[Mobile App]
    end
    
    subgraph "Load Balancer"
        LB[Load Balancer]
    end
    
    subgraph "Application Layer"
        API[API Server<br/>Flask/FastAPI]
        AUTH[Authentication Service]
        BETTING[Betting Service]
        USER[User Management]
        ANALYTICS[Analytics Service]
    end
    
    subgraph "Data Layer"
        DB[(Primary Database<br/>PostgreSQL)]
        CACHE[(Redis Cache)]
        QUEUE[Message Queue<br/>Celery/RabbitMQ]
    end
    
    subgraph "External Services"
        PAYMENT[Payment Gateway]
        ODDS[Odds Provider]
        NOTIFICATIONS[Notification Service]
    end
    
    subgraph "Infrastructure"
        MONITOR[Monitoring<br/>Prometheus/Grafana]
        LOGS[Logging<br/>ELK Stack]
        BACKUP[Backup Service]
    end
    
    %% Connections
    WEB --> LB
    MOBILE --> LB
    LB --> API
    
    API --> AUTH
    API --> BETTING
    API --> USER
    API --> ANALYTICS
    
    AUTH --> DB
    BETTING --> DB
    USER --> DB
    ANALYTICS --> DB
    
    API --> CACHE
    BETTING --> QUEUE
    
    BETTING --> PAYMENT
    BETTING --> ODDS
    USER --> NOTIFICATIONS
    
    API --> MONITOR
    DB --> LOGS
    QUEUE --> LOGS
    
    DB --> BACKUP
    
    %% Styling
    classDef client fill:#e1f5fe
    classDef app fill:#f3e5f5
    classDef data fill:#e8f5e8
    classDef external fill:#fff3e0
    classDef infra fill:#fce4ec
    
    class WEB,MOBILE client
    class API,AUTH,BETTING,USER,ANALYTICS app
    class DB,CACHE,QUEUE data
    class PAYMENT,ODDS,NOTIFICATIONS external
    class MONITOR,LOGS,BACKUP infra
"""
        
        return mermaid
    
    def generate_component_diagram_mermaid(self) -> str:
        """Generate component diagram in Mermaid format."""
        mermaid = """graph LR
    %% Component Architecture
    
    subgraph "Frontend Components"
        UI[User Interface]
        ROUTER[Router]
        STATE[State Management]
        COMPONENTS[React Components]
    end
    
    subgraph "Backend Components"
        ROUTES[API Routes]
        CONTROLLERS[Controllers]
        SERVICES[Business Logic]
        MODELS[Data Models]
    end
    
    subgraph "Database Components"
        USERS[Users Table]
        BETS[Bets Table]
        EVENTS[Events Table]
        TRANSACTIONS[Transactions Table]
    end
    
    %% Frontend flow
    UI --> ROUTER
    ROUTER --> COMPONENTS
    COMPONENTS --> STATE
    
    %% API communication
    STATE --> ROUTES
    ROUTES --> CONTROLLERS
    CONTROLLERS --> SERVICES
    SERVICES --> MODELS
    
    %% Database relationships
    MODELS --> USERS
    MODELS --> BETS
    MODELS --> EVENTS
    MODELS --> TRANSACTIONS
    
    BETS --> USERS
    BETS --> EVENTS
    TRANSACTIONS --> USERS
    
    %% Styling
    classDef frontend fill:#e3f2fd
    classDef backend fill:#f1f8e9
    classDef database fill:#fce4ec
    
    class UI,ROUTER,STATE,COMPONENTS frontend
    class ROUTES,CONTROLLERS,SERVICES,MODELS backend
    class USERS,BETS,EVENTS,TRANSACTIONS database
"""
        
        return mermaid
    
    def generate_data_flow_diagram_mermaid(self) -> str:
        """Generate data flow diagram in Mermaid format."""
        mermaid = """graph TD
    %% Data Flow Architecture
    
    START([User Action])
    
    subgraph "Request Processing"
        VALIDATE[Validate Request]
        AUTH_CHECK[Authentication Check]
        RATE_LIMIT[Rate Limiting]
    end
    
    subgraph "Business Logic"
        PROCESS[Process Business Logic]
        CALCULATE[Calculate Results]
        VALIDATE_BIZ[Business Validation]
    end
    
    subgraph "Data Operations"
        CACHE_CHECK{Cache Hit?}
        DB_READ[(Database Read)]
        DB_WRITE[(Database Write)]
        CACHE_UPDATE[Update Cache]
    end
    
    subgraph "Response Generation"
        FORMAT[Format Response]
        LOG[Log Transaction]
        METRICS[Update Metrics]
    end
    
    END([Return Response])
    
    %% Flow
    START --> VALIDATE
    VALIDATE --> AUTH_CHECK
    AUTH_CHECK --> RATE_LIMIT
    RATE_LIMIT --> PROCESS
    
    PROCESS --> CALCULATE
    CALCULATE --> VALIDATE_BIZ
    VALIDATE_BIZ --> CACHE_CHECK
    
    CACHE_CHECK -->|Hit| FORMAT
    CACHE_CHECK -->|Miss| DB_READ
    DB_READ --> DB_WRITE
    DB_WRITE --> CACHE_UPDATE
    CACHE_UPDATE --> FORMAT
    
    FORMAT --> LOG
    LOG --> METRICS
    METRICS --> END
    
    %% Error handling
    VALIDATE -->|Error| FORMAT
    AUTH_CHECK -->|Unauthorized| FORMAT
    RATE_LIMIT -->|Limited| FORMAT
    VALIDATE_BIZ -->|Invalid| FORMAT
    
    %% Styling
    classDef process fill:#e8f5e8
    classDef data fill:#e1f5fe
    classDef decision fill:#fff3e0
    classDef endpoint fill:#f3e5f5
    
    class VALIDATE,AUTH_CHECK,RATE_LIMIT,PROCESS,CALCULATE,VALIDATE_BIZ,FORMAT,LOG,METRICS process
    class DB_READ,DB_WRITE,CACHE_UPDATE data
    class CACHE_CHECK decision
    class START,END endpoint
"""
        
        return mermaid
    
    def generate_deployment_diagram_mermaid(self) -> str:
        """Generate deployment diagram in Mermaid format."""
        mermaid = """graph TB
    %% Deployment Architecture
    
    subgraph "Production Environment"
        subgraph "Load Balancer Tier"
            LB1[Load Balancer 1]
            LB2[Load Balancer 2]
        end
        
        subgraph "Application Tier"
            APP1[App Server 1<br/>Docker Container]
            APP2[App Server 2<br/>Docker Container]
            APP3[App Server 3<br/>Docker Container]
        end
        
        subgraph "Database Tier"
            DB_PRIMARY[(Primary DB<br/>PostgreSQL)]
            DB_REPLICA[(Read Replica)]
            REDIS[(Redis Cluster)]
        end
        
        subgraph "Message Queue"
            RABBIT[RabbitMQ Cluster]
            WORKER1[Worker 1]
            WORKER2[Worker 2]
        end
    end
    
    subgraph "Monitoring & Logging"
        PROMETHEUS[Prometheus]
        GRAFANA[Grafana]
        ELK[ELK Stack]
    end
    
    subgraph "External Services"
        CDN[CDN]
        S3[File Storage]
        EMAIL[Email Service]
    end
    
    %% Internet connection
    INTERNET([Internet]) --> CDN
    CDN --> LB1
    CDN --> LB2
    
    %% Load balancer to apps
    LB1 --> APP1
    LB1 --> APP2
    LB2 --> APP2
    LB2 --> APP3
    
    %% Apps to database
    APP1 --> DB_PRIMARY
    APP2 --> DB_PRIMARY
    APP3 --> DB_PRIMARY
    
    APP1 --> DB_REPLICA
    APP2 --> DB_REPLICA
    APP3 --> DB_REPLICA
    
    %% Apps to cache
    APP1 --> REDIS
    APP2 --> REDIS
    APP3 --> REDIS
    
    %% Message queue
    APP1 --> RABBIT
    APP2 --> RABBIT
    APP3 --> RABBIT
    
    RABBIT --> WORKER1
    RABBIT --> WORKER2
    
    %% External services
    APP1 --> S3
    WORKER1 --> EMAIL
    
    %% Monitoring
    APP1 --> PROMETHEUS
    APP2 --> PROMETHEUS
    APP3 --> PROMETHEUS
    DB_PRIMARY --> PROMETHEUS
    
    PROMETHEUS --> GRAFANA
    
    APP1 --> ELK
    APP2 --> ELK
    APP3 --> ELK
    
    %% Styling
    classDef lb fill:#e1f5fe
    classDef app fill:#e8f5e8
    classDef data fill:#fce4ec
    classDef queue fill:#fff3e0
    classDef monitor fill:#f3e5f5
    classDef external fill:#e0f2f1
    
    class LB1,LB2 lb
    class APP1,APP2,APP3 app
    class DB_PRIMARY,DB_REPLICA,REDIS data
    class RABBIT,WORKER1,WORKER2 queue
    class PROMETHEUS,GRAFANA,ELK monitor
    class CDN,S3,EMAIL external
"""
        
        return mermaid
    
    def generate_sequence_diagram_mermaid(self) -> str:
        """Generate sequence diagram for typical user flow."""
        mermaid = """sequenceDiagram
    participant U as User
    participant F as Frontend
    participant LB as Load Balancer
    participant API as API Server
    participant AUTH as Auth Service
    participant DB as Database
    participant CACHE as Redis Cache
    participant QUEUE as Message Queue
    
    Note over U,QUEUE: User Places a Bet
    
    U->>F: Click "Place Bet"
    F->>F: Validate form data
    F->>LB: POST /api/bets
    LB->>API: Route request
    
    API->>AUTH: Validate JWT token
    AUTH->>CACHE: Check token cache
    CACHE-->>AUTH: Token valid
    AUTH-->>API: User authenticated
    
    API->>API: Validate bet data
    API->>CACHE: Check odds cache
    CACHE-->>API: Current odds
    
    API->>DB: BEGIN transaction
    API->>DB: Check user balance
    DB-->>API: Balance sufficient
    
    API->>DB: Create bet record
    API->>DB: Update user balance
    API->>DB: COMMIT transaction
    
    API->>QUEUE: Queue bet notification
    API->>CACHE: Update user cache
    
    API-->>LB: 201 Created
    LB-->>F: Bet confirmed
    F-->>U: Show success message
    
    Note over QUEUE: Async Processing
    QUEUE->>QUEUE: Process notification
    QUEUE->>U: Send email confirmation
"""
        
        return mermaid
    
    def generate_database_erd_mermaid(self) -> str:
        """Generate Entity Relationship Diagram in Mermaid format."""
        mermaid = """erDiagram
    USERS ||--o{ BETS : places
    USERS ||--o{ TRANSACTIONS : makes
    USERS ||--o{ USER_SESSIONS : has
    
    EVENTS ||--o{ BETS : contains
    EVENTS ||--o{ ODDS : has
    
    BETS ||--|| TRANSACTIONS : creates
    BETS }o--|| BET_TYPES : has
    
    USERS {
        int id PK
        string email UK
        string username UK
        string password_hash
        decimal balance
        datetime created_at
        datetime updated_at
        boolean is_active
        string role
    }
    
    EVENTS {
        int id PK
        string name
        string description
        datetime start_time
        datetime end_time
        string status
        string category
        datetime created_at
    }
    
    BETS {
        int id PK
        int user_id FK
        int event_id FK
        int bet_type_id FK
        decimal amount
        decimal odds
        decimal potential_payout
        string status
        datetime placed_at
        datetime settled_at
    }
    
    BET_TYPES {
        int id PK
        string name
        string description
        boolean is_active
    }
    
    TRANSACTIONS {
        int id PK
        int user_id FK
        int bet_id FK
        decimal amount
        string type
        string status
        datetime created_at
    }
    
    ODDS {
        int id PK
        int event_id FK
        int bet_type_id FK
        decimal odds_value
        datetime updated_at
        boolean is_active
    }
    
    USER_SESSIONS {
        int id PK
        int user_id FK
        string session_token
        datetime expires_at
        datetime created_at
        string ip_address
    }
"""
        
        return mermaid
    
    def generate_html_documentation(self) -> str:
        """Generate HTML documentation with all diagrams."""
        html = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A1Betting Architecture Documentation</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fafafa;
        }}
        .container {{
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        h1 {{
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #34495e;
            border-bottom: 1px solid #ecf0f1;
            padding-bottom: 5px;
            margin-top: 40px;
        }}
        .diagram-container {{
            margin: 30px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #fafafa;
        }}
        .diagram-title {{
            font-weight: bold;
            margin-bottom: 15px;
            color: #2c3e50;
        }}
        .mermaid {{
            text-align: center;
        }}
        .toc {{
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }}
        .toc ul {{
            list-style-type: none;
            padding-left: 0;
        }}
        .toc li {{
            margin: 5px 0;
        }}
        .toc a {{
            text-decoration: none;
            color: #3498db;
        }}
        .toc a:hover {{
            text-decoration: underline;
        }}
        .component-info {{
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }}
        .tech-stack {{
            display: inline-block;
            background-color: #e3f2fd;
            padding: 3px 8px;
            border-radius: 3px;
            margin: 2px;
            font-size: 0.9em;
        }}
    </style>
</head>
<body>
    <div class="container">
        <h1>A1Betting System Architecture Documentation</h1>
        <p><strong>Generated on:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        
        <div class="toc">
            <h3>Table of Contents</h3>
            <ul>
                <li><a href="#overview">System Overview</a></li>
                <li><a href="#system-architecture">System Architecture</a></li>
                <li><a href="#component-diagram">Component Diagram</a></li>
                <li><a href="#data-flow">Data Flow Diagram</a></li>
                <li><a href="#deployment">Deployment Architecture</a></li>
                <li><a href="#sequence">Sequence Diagram</a></li>
                <li><a href="#database">Database Schema</a></li>
                <li><a href="#components">Component Analysis</a></li>
            </ul>
        </div>
        
        <h2 id="overview">System Overview</h2>
        <p>A1Betting is a modern betting platform built with a microservices architecture. The system is designed for scalability, reliability, and real-time performance.</p>
        
        <div class="component-info">
            <h4>Key Features:</h4>
            <ul>
                <li>Real-time betting with live odds updates</li>
                <li>Secure user authentication and authorization</li>
                <li>Payment processing and transaction management</li>
                <li>Comprehensive analytics and reporting</li>
                <li>Mobile-responsive web interface</li>
                <li>Automated testing and deployment pipelines</li>
            </ul>
        </div>
        
        <h2 id="system-architecture">System Architecture</h2>
        <div class="diagram-container">
            <div class="diagram-title">High-Level System Architecture</div>
            <div class="mermaid">
{self.generate_system_architecture_mermaid()}
            </div>
        </div>
        
        <h2 id="component-diagram">Component Diagram</h2>
        <div class="diagram-container">
            <div class="diagram-title">Component Architecture</div>
            <div class="mermaid">
{self.generate_component_diagram_mermaid()}
            </div>
        </div>
        
        <h2 id="data-flow">Data Flow Diagram</h2>
        <div class="diagram-container">
            <div class="diagram-title">Request Processing Flow</div>
            <div class="mermaid">
{self.generate_data_flow_diagram_mermaid()}
            </div>
        </div>
        
        <h2 id="deployment">Deployment Architecture</h2>
        <div class="diagram-container">
            <div class="diagram-title">Production Deployment</div>
            <div class="mermaid">
{self.generate_deployment_diagram_mermaid()}
            </div>
        </div>
        
        <h2 id="sequence">Sequence Diagram</h2>
        <div class="diagram-container">
            <div class="diagram-title">User Bet Placement Flow</div>
            <div class="mermaid">
{self.generate_sequence_diagram_mermaid()}
            </div>
        </div>
        
        <h2 id="database">Database Schema</h2>
        <div class="diagram-container">
            <div class="diagram-title">Entity Relationship Diagram</div>
            <div class="mermaid">
{self.generate_database_erd_mermaid()}
            </div>
        </div>
        
        <h2 id="components">Component Analysis</h2>
"""
        
        # Add component analysis
        for name, component in self.components.items():
            html += f"""
        <div class="component-info">
            <h4>{name.title()} Component</h4>
            <p><strong>Type:</strong> {component['type']}</p>
            <p><strong>Path:</strong> <code>{component['path']}</code></p>
            <p><strong>Technologies:</strong> 
"""
            for tech in component['technologies']:
                html += f'<span class="tech-stack">{tech}</span> '
            
            html += "</p>"
            
            if component['dependencies']:
                html += f"<p><strong>Dependencies:</strong> {', '.join(component['dependencies'])}</p>"
            
            html += "</div>"
        
        html += """
        
        <h2>Architecture Notes</h2>
        <div class="component-info">
            <h4>Design Principles</h4>
            <ul>
                <li><strong>Scalability:</strong> Horizontal scaling with load balancers and multiple app instances</li>
                <li><strong>Reliability:</strong> Database replication and message queue for async processing</li>
                <li><strong>Security:</strong> JWT authentication, rate limiting, and input validation</li>
                <li><strong>Performance:</strong> Redis caching and optimized database queries</li>
                <li><strong>Monitoring:</strong> Comprehensive logging and metrics collection</li>
            </ul>
        </div>
        
        <div class="component-info">
            <h4>Technology Stack Summary</h4>
            <ul>
                <li><strong>Backend:</strong> Python (Flask/FastAPI), SQLAlchemy ORM</li>
                <li><strong>Frontend:</strong> React.js with TypeScript</li>
                <li><strong>Database:</strong> PostgreSQL with Redis caching</li>
                <li><strong>Message Queue:</strong> Celery with RabbitMQ</li>
                <li><strong>Deployment:</strong> Docker containers with Docker Compose</li>
                <li><strong>Monitoring:</strong> Prometheus + Grafana, ELK Stack</li>
            </ul>
        </div>
        
    </div>
    
    <script>
        mermaid.initialize({{ 
            startOnLoad: true,
            theme: 'default',
            themeVariables: {{
                primaryColor: '#3498db',
                primaryTextColor: '#333',
                primaryBorderColor: '#2c3e50',
                lineColor: '#2c3e50'
            }}
        }});
    </script>
</body>
</html>
"""
        
        return html
    
    def run(self):
        """Run the architecture diagram generation."""
        try:
            logger.info("Starting architecture diagram generation...")
            
            # Analyze project
            self.analyze_project_structure()
            self.analyze_api_endpoints()
            self.analyze_database_schema()
            
            # Generate individual Mermaid diagrams
            diagrams = {
                'system_architecture.mmd': self.generate_system_architecture_mermaid(),
                'component_diagram.mmd': self.generate_component_diagram_mermaid(),
                'data_flow.mmd': self.generate_data_flow_diagram_mermaid(),
                'deployment.mmd': self.generate_deployment_diagram_mermaid(),
                'sequence_diagram.mmd': self.generate_sequence_diagram_mermaid(),
                'database_erd.mmd': self.generate_database_erd_mermaid()
            }
            
            # Save individual diagrams
            for filename, content in diagrams.items():
                diagram_path = self.diagrams_dir / filename
                with open(diagram_path, 'w', encoding='utf-8') as f:
                    f.write(content)
            
            # Generate comprehensive HTML documentation
            html_doc = self.generate_html_documentation()
            html_path = self.diagrams_dir / "architecture_documentation.html"
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(html_doc)
            
            # Generate summary report
            summary = {
                'timestamp': datetime.now().isoformat(),
                'components_analyzed': len(self.components),
                'apis_found': len(self.apis),
                'database_models': len(self.databases),
                'diagrams_generated': list(diagrams.keys()),
                'output_files': [
                    str(html_path),
                    *[str(self.diagrams_dir / filename) for filename in diagrams.keys()]
                ]
            }
            
            summary_path = self.diagrams_dir / "generation_summary.json"
            with open(summary_path, 'w') as f:
                json.dump(summary, f, indent=2)
            
            logger.info("Architecture diagrams generated successfully!")
            logger.info(f"HTML Documentation: {html_path}")
            logger.info(f"Individual diagrams: {len(diagrams)} files")
            logger.info(f"Components analyzed: {len(self.components)}")
            logger.info(f"APIs found: {len(self.apis)}")
            logger.info(f"Database models: {len(self.databases)}")
            
            return 0
            
        except Exception as e:
            logger.error(f"Error generating architecture diagrams: {e}")
            return 1

def main():
    """Main entry point."""
    generator = ArchitectureDiagramsGenerator()
    return generator.run()

if __name__ == "__main__":
    sys.exit(main())
