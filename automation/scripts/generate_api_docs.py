#!/usr/bin/env python3
"""
API Documentation Generator
Automatically generates comprehensive API documentation from code analysis.
"""

import os
import sys
import json
import ast
import re
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional
import requests

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class APIDocumentationGenerator:
    """Generate comprehensive API documentation from code analysis."""
    
    def __init__(self):
        self.project_root = Path(__file__).parent.parent.parent
        self.backend_dir = self.project_root / "backend"
        self.docs_dir = self.project_root / "automation" / "reports" / "api_docs"
        self.docs_dir.mkdir(parents=True, exist_ok=True)
        self.api_endpoints = []
        self.models = []
        
    def scan_python_files(self) -> List[Path]:
        """Scan for Python files in the backend directory."""
        python_files = []
        if self.backend_dir.exists():
            for pattern in ["**/*.py"]:
                python_files.extend(self.backend_dir.glob(pattern))
        return python_files
    
    def extract_flask_routes(self, file_path: Path) -> List[Dict[str, Any]]:
        """Extract Flask routes from Python files."""
        routes = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Parse AST
            tree = ast.parse(content)
            
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef):
                    # Look for Flask route decorators
                    route_info = self._extract_route_decorator(node)
                    if route_info:
                        # Extract function docstring
                        docstring = ast.get_docstring(node)
                        
                        # Extract function parameters
                        params = self._extract_function_params(node)
                        
                        route_data = {
                            'path': route_info.get('path', ''),
                            'methods': route_info.get('methods', ['GET']),
                            'function_name': node.name,
                            'file': str(file_path.relative_to(self.project_root)),
                            'docstring': docstring,
                            'parameters': params,
                            'line_number': node.lineno
                        }
                        
                        routes.append(route_data)
                        
        except Exception as e:
            logger.warning(f"Error parsing {file_path}: {e}")
        
        return routes
    
    def _extract_route_decorator(self, node: ast.FunctionDef) -> Optional[Dict[str, Any]]:
        """Extract route information from Flask decorators."""
        for decorator in node.decorator_list:
            if isinstance(decorator, ast.Call):
                # Handle @app.route() or @bp.route()
                if (isinstance(decorator.func, ast.Attribute) and 
                    decorator.func.attr == 'route'):
                    
                    route_info = {'methods': ['GET']}
                    
                    # Extract path from first argument
                    if decorator.args:
                        if isinstance(decorator.args[0], ast.Str):
                            route_info['path'] = decorator.args[0].s
                        elif isinstance(decorator.args[0], ast.Constant):
                            route_info['path'] = decorator.args[0].value
                    
                    # Extract methods from keyword arguments
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
            
            elif isinstance(decorator, ast.Name):
                # Handle simple decorators like @auth_required
                if decorator.id in ['auth_required', 'login_required']:
                    return {'requires_auth': True}
        
        return None
    
    def _extract_function_params(self, node: ast.FunctionDef) -> List[Dict[str, str]]:
        """Extract function parameters and their types."""
        params = []
        
        for arg in node.args.args:
            param_info = {'name': arg.arg}
            
            # Extract type annotation if available
            if arg.annotation:
                param_info['type'] = ast.unparse(arg.annotation) if hasattr(ast, 'unparse') else 'Any'
            else:
                param_info['type'] = 'Any'
            
            params.append(param_info)
        
        return params
    
    def extract_pydantic_models(self, file_path: Path) -> List[Dict[str, Any]]:
        """Extract Pydantic models from Python files."""
        models = []
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            tree = ast.parse(content)
            
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    # Check if it inherits from BaseModel or similar
                    is_model = any(
                        (isinstance(base, ast.Name) and base.id == 'BaseModel') or
                        (isinstance(base, ast.Attribute) and base.attr == 'BaseModel')
                        for base in node.bases
                    )
                    
                    if is_model:
                        model_info = {
                            'name': node.name,
                            'file': str(file_path.relative_to(self.project_root)),
                            'docstring': ast.get_docstring(node),
                            'fields': self._extract_model_fields(node),
                            'line_number': node.lineno
                        }
                        models.append(model_info)
                        
        except Exception as e:
            logger.warning(f"Error extracting models from {file_path}: {e}")
        
        return models
    
    def _extract_model_fields(self, node: ast.ClassDef) -> List[Dict[str, Any]]:
        """Extract fields from a Pydantic model."""
        fields = []
        
        for item in node.body:
            if isinstance(item, ast.AnnAssign) and isinstance(item.target, ast.Name):
                field_info = {
                    'name': item.target.id,
                    'type': ast.unparse(item.annotation) if hasattr(ast, 'unparse') else 'Any',
                    'required': True
                }
                
                # Check if it has a default value
                if item.value:
                    field_info['required'] = False
                    if isinstance(item.value, ast.Call):
                        # Handle Field() definitions
                        if (isinstance(item.value.func, ast.Name) and 
                            item.value.func.id == 'Field'):
                            # Extract field parameters
                            for keyword in item.value.keywords:
                                if keyword.arg == 'description':
                                    if isinstance(keyword.value, ast.Str):
                                        field_info['description'] = keyword.value.s
                                    elif isinstance(keyword.value, ast.Constant):
                                        field_info['description'] = keyword.value.value
                
                fields.append(field_info)
        
        return fields
    
    def analyze_openapi_spec(self) -> Dict[str, Any]:
        """Try to find and analyze OpenAPI/Swagger specifications."""
        openapi_data = {}
        
        # Look for common OpenAPI spec files
        spec_files = [
            self.backend_dir / "openapi.json",
            self.backend_dir / "swagger.json",
            self.backend_dir / "api_spec.json",
            self.project_root / "openapi.json",
            self.project_root / "swagger.json"
        ]
        
        for spec_file in spec_files:
            if spec_file.exists():
                try:
                    with open(spec_file, 'r') as f:
                        openapi_data = json.load(f)
                    logger.info(f"Found OpenAPI spec: {spec_file}")
                    break
                except Exception as e:
                    logger.warning(f"Error reading OpenAPI spec {spec_file}: {e}")
        
        return openapi_data
    
    def generate_endpoint_documentation(self, endpoint: Dict[str, Any]) -> str:
        """Generate documentation for a single endpoint."""
        doc = f"""
## {endpoint['function_name']}

**Path:** `{endpoint['path']}`  
**Methods:** {', '.join(endpoint['methods'])}  
**File:** `{endpoint['file']}:{endpoint['line_number']}`

"""
        
        if endpoint.get('docstring'):
            doc += f"**Description:**\n{endpoint['docstring']}\n\n"
        
        if endpoint.get('parameters'):
            doc += "**Parameters:**\n"
            for param in endpoint['parameters']:
                doc += f"- `{param['name']}` ({param['type']})\n"
            doc += "\n"
        
        # Add example request/response if available
        doc += "**Example Request:**\n```bash\n"
        method = endpoint['methods'][0] if endpoint['methods'] else 'GET'
        doc += f"curl -X {method} http://localhost:5000{endpoint['path']}\n"
        doc += "```\n\n"
        
        return doc
    
    def generate_model_documentation(self, model: Dict[str, Any]) -> str:
        """Generate documentation for a data model."""
        doc = f"""
## {model['name']}

**File:** `{model['file']}:{model['line_number']}`

"""
        
        if model.get('docstring'):
            doc += f"**Description:**\n{model['docstring']}\n\n"
        
        if model.get('fields'):
            doc += "**Fields:**\n\n"
            doc += "| Field | Type | Required | Description |\n"
            doc += "|-------|------|----------|-------------|\n"
            
            for field in model['fields']:
                required = "✓" if field.get('required', True) else "✗"
                description = field.get('description', '-')
                doc += f"| `{field['name']}` | `{field['type']}` | {required} | {description} |\n"
            
            doc += "\n"
        
        # Add example JSON
        doc += "**Example JSON:**\n```json\n{\n"
        for i, field in enumerate(model.get('fields', [])):
            comma = "," if i < len(model.get('fields', [])) - 1 else ""
            example_value = self._get_example_value(field['type'])
            doc += f'  "{field["name"]}": {example_value}{comma}\n'
        doc += "}\n```\n\n"
        
        return doc
    
    def _get_example_value(self, field_type: str) -> str:
        """Get example value for a field type."""
        type_examples = {
            'str': '"string"',
            'int': '123',
            'float': '123.45',
            'bool': 'true',
            'datetime': '"2024-01-01T00:00:00Z"',
            'List': '[]',
            'Dict': '{}',
            'Optional': 'null'
        }
        
        for type_name, example in type_examples.items():
            if type_name in field_type:
                return example
        
        return '"value"'
    
    def generate_markdown_documentation(self) -> str:
        """Generate complete API documentation in Markdown format."""
        doc = f"""# A1Betting API Documentation

Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Overview

This document describes the REST API endpoints and data models for the A1Betting platform.

## Base URL

```
http://localhost:5000
```

## Authentication

Most endpoints require authentication. Include the Authorization header with your requests:

```
Authorization: Bearer <your-token>
```

---

# API Endpoints

"""
        
        # Group endpoints by path prefix
        grouped_endpoints = {}
        for endpoint in self.api_endpoints:
            prefix = endpoint['path'].split('/')[1] if '/' in endpoint['path'] else 'root'
            if prefix not in grouped_endpoints:
                grouped_endpoints[prefix] = []
            grouped_endpoints[prefix].append(endpoint)
        
        # Generate documentation for each group
        for group_name, endpoints in sorted(grouped_endpoints.items()):
            if group_name:
                doc += f"## {group_name.title()} Endpoints\n\n"
            
            for endpoint in sorted(endpoints, key=lambda x: x['path']):
                doc += self.generate_endpoint_documentation(endpoint)
        
        # Add data models section
        if self.models:
            doc += "---\n\n# Data Models\n\n"
            
            for model in sorted(self.models, key=lambda x: x['name']):
                doc += self.generate_model_documentation(model)
        
        # Add footer
        doc += """---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad request",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to 1000 requests per hour per user. Rate limit information is included in response headers:

- `X-RateLimit-Limit`: Request limit per hour
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit window resets

## Support

For API support, please contact the development team or refer to the project documentation.
"""
        
        return doc
    
    def generate_openapi_spec(self) -> Dict[str, Any]:
        """Generate OpenAPI 3.0 specification from discovered endpoints."""
        spec = {
            "openapi": "3.0.0",
            "info": {
                "title": "A1Betting API",
                "version": "1.0.0",
                "description": "REST API for the A1Betting platform",
                "contact": {
                    "name": "A1Betting Development Team"
                }
            },
            "servers": [
                {
                    "url": "http://localhost:5000",
                    "description": "Development server"
                }
            ],
            "paths": {},
            "components": {
                "schemas": {},
                "securitySchemes": {
                    "bearerAuth": {
                        "type": "http",
                        "scheme": "bearer",
                        "bearerFormat": "JWT"
                    }
                }
            }
        }
        
        # Add endpoints to paths
        for endpoint in self.api_endpoints:
            path = endpoint['path']
            if path not in spec["paths"]:
                spec["paths"][path] = {}
            
            for method in endpoint['methods']:
                method_lower = method.lower()
                spec["paths"][path][method_lower] = {
                    "summary": endpoint['function_name'].replace('_', ' ').title(),
                    "description": endpoint.get('docstring', ''),
                    "responses": {
                        "200": {
                            "description": "Successful response"
                        },
                        "400": {
                            "description": "Bad request"
                        },
                        "401": {
                            "description": "Unauthorized"
                        }
                    }
                }
                
                # Add security if required
                if endpoint.get('requires_auth'):
                    spec["paths"][path][method_lower]["security"] = [
                        {"bearerAuth": []}
                    ]
        
        # Add models to schemas
        for model in self.models:
            schema = {
                "type": "object",
                "properties": {},
                "required": []
            }
            
            for field in model.get('fields', []):
                schema["properties"][field['name']] = {
                    "type": self._map_python_type_to_openapi(field['type']),
                    "description": field.get('description', '')
                }
                
                if field.get('required', True):
                    schema["required"].append(field['name'])
            
            spec["components"]["schemas"][model['name']] = schema
        
        return spec
    
    def _map_python_type_to_openapi(self, python_type: str) -> str:
        """Map Python types to OpenAPI types."""
        type_mapping = {
            'str': 'string',
            'int': 'integer',
            'float': 'number',
            'bool': 'boolean',
            'datetime': 'string',
            'List': 'array',
            'Dict': 'object'
        }
        
        for py_type, openapi_type in type_mapping.items():
            if py_type in python_type:
                return openapi_type
        
        return 'string'
    
    def run(self):
        """Run the API documentation generation."""
        try:
            logger.info("Starting API documentation generation...")
            
            # Scan Python files
            python_files = self.scan_python_files()
            logger.info(f"Found {len(python_files)} Python files to analyze")
            
            # Extract API endpoints and models
            for file_path in python_files:
                routes = self.extract_flask_routes(file_path)
                self.api_endpoints.extend(routes)
                
                models = self.extract_pydantic_models(file_path)
                self.models.extend(models)
            
            logger.info(f"Found {len(self.api_endpoints)} API endpoints")
            logger.info(f"Found {len(self.models)} data models")
            
            # Try to load existing OpenAPI spec
            existing_openapi = self.analyze_openapi_spec()
            if existing_openapi:
                logger.info("Found existing OpenAPI specification")
            
            # Generate documentation
            markdown_doc = self.generate_markdown_documentation()
            openapi_spec = self.generate_openapi_spec()
            
            # Save documentation files
            markdown_path = self.docs_dir / "api_documentation.md"
            with open(markdown_path, 'w', encoding='utf-8') as f:
                f.write(markdown_doc)
            
            openapi_path = self.docs_dir / "openapi_spec.json"
            with open(openapi_path, 'w', encoding='utf-8') as f:
                json.dump(openapi_spec, f, indent=2)
            
            # Generate HTML version using a simple converter
            html_doc = self.convert_markdown_to_html(markdown_doc)
            html_path = self.docs_dir / "api_documentation.html"
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(html_doc)
            
            # Generate summary report
            summary = {
                'timestamp': datetime.now().isoformat(),
                'endpoints_found': len(self.api_endpoints),
                'models_found': len(self.models),
                'files_analyzed': len(python_files),
                'documentation_files': [
                    str(markdown_path),
                    str(openapi_path),
                    str(html_path)
                ]
            }
            
            summary_path = self.docs_dir / "generation_summary.json"
            with open(summary_path, 'w') as f:
                json.dump(summary, f, indent=2)
            
            logger.info("API documentation generated successfully!")
            logger.info(f"Markdown: {markdown_path}")
            logger.info(f"OpenAPI: {openapi_path}")
            logger.info(f"HTML: {html_path}")
            logger.info(f"Summary: {summary_path}")
            
            return 0
            
        except Exception as e:
            logger.error(f"Error generating API documentation: {e}")
            return 1
    
    def convert_markdown_to_html(self, markdown_content: str) -> str:
        """Convert Markdown to HTML with basic styling."""
        html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A1Betting API Documentation</title>
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
        h1 {{ color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }}
        h2 {{ color: #34495e; border-bottom: 1px solid #ecf0f1; padding-bottom: 5px; }}
        h3 {{ color: #2c3e50; }}
        code {{
            background-color: #f8f9fa;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Monaco', 'Courier New', monospace;
        }}
        pre {{
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            border-left: 4px solid #3498db;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 15px 0;
        }}
        th, td {{
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }}
        th {{ background-color: #f2f2f2; font-weight: bold; }}
        .endpoint {{ margin: 20px 0; padding: 15px; border-left: 4px solid #27ae60; background-color: #f8fff8; }}
        .model {{ margin: 20px 0; padding: 15px; border-left: 4px solid #e74c3c; background-color: #fff8f8; }}
    </style>
</head>
<body>
    <div class="container">
        {self._basic_markdown_to_html(markdown_content)}
    </div>
</body>
</html>
        """
        return html_content
    
    def _basic_markdown_to_html(self, markdown: str) -> str:
        """Basic Markdown to HTML conversion."""
        html = markdown
        
        # Headers
        html = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
        html = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
        html = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
        
        # Code blocks
        html = re.sub(r'```(\w+)?\n(.*?)\n```', r'<pre><code>\2</code></pre>', html, flags=re.DOTALL)
        
        # Inline code
        html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)
        
        # Bold
        html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
        
        # Links
        html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)
        
        # Line breaks
        html = html.replace('\n\n', '</p><p>')
        html = html.replace('\n', '<br>')
        html = f'<p>{html}</p>'
        
        return html

def main():
    """Main entry point."""
    generator = APIDocumentationGenerator()
    return generator.run()

if __name__ == "__main__":
    sys.exit(main())
