#!/usr/bin/env python3
"""
Code Documentation Generator
Automatically generates comprehensive code documentation from source analysis.
"""

import os
import sys
import ast
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional
import re

# Add project root to path
sys.path.append(str(Path(__file__).parent.parent.parent))

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class CodeDocumentationGenerator:
    """Generate comprehensive code documentation from source analysis."""
    
    def __init__(self):
        self.project_root = Path(__file__).parent.parent.parent
        self.docs_dir = self.project_root / "automation" / "reports" / "code_docs"
        self.docs_dir.mkdir(parents=True, exist_ok=True)
        
        # Directories to analyze
        self.source_dirs = [
            self.project_root / "backend",
            self.project_root / "frontend" / "src",
            self.project_root / "automation"
        ]
        
        self.modules = []
        self.classes = []
        self.functions = []
        self.dependencies = {}
        
    def scan_python_files(self) -> List[Path]:
        """Scan for Python files in source directories."""
        python_files = []
        
        for source_dir in self.source_dirs:
            if source_dir.exists():
                for pattern in ["**/*.py"]:
                    files = list(source_dir.glob(pattern))
                    # Filter out __pycache__ and .pyc files
                    files = [f for f in files if '__pycache__' not in str(f)]
                    python_files.extend(files)
        
        return python_files
    
    def scan_javascript_files(self) -> List[Path]:
        """Scan for JavaScript/TypeScript files."""
        js_files = []
        
        frontend_dir = self.project_root / "frontend"
        if frontend_dir.exists():
            for pattern in ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]:
                files = list(frontend_dir.glob(pattern))
                # Filter out node_modules and build directories
                files = [f for f in files if 'node_modules' not in str(f) and 'build' not in str(f)]
                js_files.extend(files)
        
        return js_files
    
    def analyze_python_file(self, file_path: Path) -> Dict[str, Any]:
        """Analyze a Python file and extract documentation."""
        file_info = {
            'path': str(file_path.relative_to(self.project_root)),
            'type': 'python',
            'classes': [],
            'functions': [],
            'imports': [],
            'docstring': None,
            'complexity': 0,
            'lines_of_code': 0
        }
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                file_info['lines_of_code'] = len(content.splitlines())
            
            tree = ast.parse(content)
            
            # Extract module docstring
            file_info['docstring'] = ast.get_docstring(tree)
            
            # Analyze imports
            for node in ast.walk(tree):
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        file_info['imports'].append({
                            'name': alias.name,
                            'alias': alias.asname,
                            'type': 'import'
                        })
                elif isinstance(node, ast.ImportFrom):
                    for alias in node.names:
                        file_info['imports'].append({
                            'from': node.module,
                            'name': alias.name,
                            'alias': alias.asname,
                            'type': 'from_import'
                        })
            
            # Analyze classes
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    class_info = self._analyze_class(node, file_path)
                    file_info['classes'].append(class_info)
                    self.classes.append(class_info)
            
            # Analyze functions (top-level only)
            for node in tree.body:
                if isinstance(node, ast.FunctionDef):
                    func_info = self._analyze_function(node, file_path)
                    file_info['functions'].append(func_info)
                    self.functions.append(func_info)
            
            # Calculate complexity (simplified)
            file_info['complexity'] = self._calculate_complexity(tree)
            
        except Exception as e:
            logger.warning(f"Error analyzing Python file {file_path}: {e}")
        
        return file_info
    
    def _analyze_class(self, node: ast.ClassDef, file_path: Path) -> Dict[str, Any]:
        """Analyze a class definition."""
        class_info = {
            'name': node.name,
            'file': str(file_path.relative_to(self.project_root)),
            'line_number': node.lineno,
            'docstring': ast.get_docstring(node),
            'methods': [],
            'properties': [],
            'inheritance': [],
            'decorators': []
        }
        
        # Extract inheritance
        for base in node.bases:
            if isinstance(base, ast.Name):
                class_info['inheritance'].append(base.id)
            elif isinstance(base, ast.Attribute):
                class_info['inheritance'].append(f"{base.value.id}.{base.attr}")
        
        # Extract decorators
        for decorator in node.decorator_list:
            if isinstance(decorator, ast.Name):
                class_info['decorators'].append(decorator.id)
        
        # Extract methods
        for item in node.body:
            if isinstance(item, ast.FunctionDef):
                method_info = self._analyze_function(item, file_path, is_method=True)
                class_info['methods'].append(method_info)
        
        return class_info
    
    def _analyze_function(self, node: ast.FunctionDef, file_path: Path, is_method: bool = False) -> Dict[str, Any]:
        """Analyze a function definition."""
        func_info = {
            'name': node.name,
            'file': str(file_path.relative_to(self.project_root)),
            'line_number': node.lineno,
            'docstring': ast.get_docstring(node),
            'parameters': [],
            'return_type': None,
            'decorators': [],
            'is_method': is_method,
            'is_async': isinstance(node, ast.AsyncFunctionDef),
            'complexity': 0
        }
        
        # Extract parameters
        for arg in node.args.args:
            param_info = {
                'name': arg.arg,
                'type': None,
                'default': None
            }
            
            if arg.annotation:
                param_info['type'] = ast.unparse(arg.annotation) if hasattr(ast, 'unparse') else 'Any'
            
            func_info['parameters'].append(param_info)
        
        # Extract return type
        if node.returns:
            func_info['return_type'] = ast.unparse(node.returns) if hasattr(ast, 'unparse') else 'Any'
        
        # Extract decorators
        for decorator in node.decorator_list:
            if isinstance(decorator, ast.Name):
                func_info['decorators'].append(decorator.id)
            elif isinstance(decorator, ast.Call) and isinstance(decorator.func, ast.Name):
                func_info['decorators'].append(decorator.func.id)
        
        # Calculate function complexity
        func_info['complexity'] = self._calculate_function_complexity(node)
        
        return func_info
    
    def _calculate_complexity(self, tree: ast.AST) -> int:
        """Calculate cyclomatic complexity of code."""
        complexity = 1  # Base complexity
        
        for node in ast.walk(tree):
            if isinstance(node, (ast.If, ast.While, ast.For, ast.With, ast.Try)):
                complexity += 1
            elif isinstance(node, ast.BoolOp):
                complexity += len(node.values) - 1
            elif isinstance(node, ast.ExceptHandler):
                complexity += 1
        
        return complexity
    
    def _calculate_function_complexity(self, node: ast.FunctionDef) -> int:
        """Calculate complexity for a specific function."""
        complexity = 1
        
        for child in ast.walk(node):
            if isinstance(child, (ast.If, ast.While, ast.For, ast.With, ast.Try)):
                complexity += 1
            elif isinstance(child, ast.BoolOp):
                complexity += len(child.values) - 1
        
        return complexity
    
    def analyze_javascript_file(self, file_path: Path) -> Dict[str, Any]:
        """Analyze a JavaScript/TypeScript file (basic analysis)."""
        file_info = {
            'path': str(file_path.relative_to(self.project_root)),
            'type': 'javascript',
            'functions': [],
            'classes': [],
            'imports': [],
            'exports': [],
            'lines_of_code': 0
        }
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                file_info['lines_of_code'] = len(content.splitlines())
            
            # Basic regex-based analysis for JS/TS
            # Extract imports
            import_pattern = r'import\s+.*?\s+from\s+[\'"]([^\'"]+)[\'"]'
            imports = re.findall(import_pattern, content)
            file_info['imports'] = imports
            
            # Extract function declarations
            func_pattern = r'(?:function\s+(\w+)|(\w+)\s*:\s*function|const\s+(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>)'
            functions = re.findall(func_pattern, content)
            for func_match in functions:
                func_name = next(name for name in func_match if name)
                file_info['functions'].append({
                    'name': func_name,
                    'type': 'function'
                })
            
            # Extract class declarations
            class_pattern = r'class\s+(\w+)'
            classes = re.findall(class_pattern, content)
            for class_name in classes:
                file_info['classes'].append({
                    'name': class_name,
                    'type': 'class'
                })
            
            # Extract exports
            export_pattern = r'export\s+(?:default\s+)?(?:class\s+|function\s+|const\s+)?(\w+)'
            exports = re.findall(export_pattern, content)
            file_info['exports'] = exports
            
        except Exception as e:
            logger.warning(f"Error analyzing JavaScript file {file_path}: {e}")
        
        return file_info
    
    def extract_dependencies(self):
        """Extract project dependencies from package files."""
        dependencies = {}
        
        # Python dependencies
        requirements_files = [
            self.project_root / "requirements.txt",
            self.project_root / "backend" / "requirements.txt",
            self.project_root / "automation" / "requirements.txt"
        ]
        
        python_deps = []
        for req_file in requirements_files:
            if req_file.exists():
                try:
                    with open(req_file, 'r') as f:
                        for line in f:
                            line = line.strip()
                            if line and not line.startswith('#'):
                                python_deps.append(line)
                except Exception as e:
                    logger.warning(f"Error reading {req_file}: {e}")
        
        dependencies['python'] = python_deps
        
        # JavaScript dependencies
        package_json = self.project_root / "frontend" / "package.json"
        if package_json.exists():
            try:
                with open(package_json, 'r') as f:
                    package_data = json.load(f)
                    dependencies['javascript'] = {
                        'dependencies': package_data.get('dependencies', {}),
                        'devDependencies': package_data.get('devDependencies', {})
                    }
            except Exception as e:
                logger.warning(f"Error reading package.json: {e}")
        
        self.dependencies = dependencies
    
    def generate_module_documentation(self, module: Dict[str, Any]) -> str:
        """Generate documentation for a module."""
        doc = f"""
## {module['path']}

**Type:** {module['type'].title()}  
**Lines of Code:** {module['lines_of_code']}  
**Complexity:** {module.get('complexity', 'N/A')}

"""
        
        if module.get('docstring'):
            doc += f"**Description:**\n{module['docstring']}\n\n"
        
        # Imports section
        if module.get('imports'):
            doc += "### Imports\n\n"
            for imp in module['imports']:
                if imp.get('type') == 'from_import':
                    doc += f"- `from {imp.get('from', '')} import {imp['name']}`\n"
                else:
                    doc += f"- `import {imp['name']}`\n"
            doc += "\n"
        
        # Classes section
        if module.get('classes'):
            doc += "### Classes\n\n"
            for cls in module['classes']:
                doc += f"#### `{cls['name']}`\n\n"
                if cls.get('docstring'):
                    doc += f"{cls['docstring']}\n\n"
                
                if cls.get('inheritance'):
                    doc += f"**Inherits from:** {', '.join(cls['inheritance'])}\n\n"
                
                if cls.get('methods'):
                    doc += "**Methods:**\n"
                    for method in cls['methods']:
                        doc += f"- `{method['name']}()`\n"
                    doc += "\n"
        
        # Functions section
        if module.get('functions'):
            doc += "### Functions\n\n"
            for func in module['functions']:
                params = ", ".join([p['name'] for p in func.get('parameters', [])])
                doc += f"#### `{func['name']}({params})`\n\n"
                
                if func.get('docstring'):
                    doc += f"{func['docstring']}\n\n"
                
                if func.get('parameters'):
                    doc += "**Parameters:**\n"
                    for param in func['parameters']:
                        type_info = f" ({param['type']})" if param.get('type') else ""
                        doc += f"- `{param['name']}`{type_info}\n"
                    doc += "\n"
                
                if func.get('return_type'):
                    doc += f"**Returns:** `{func['return_type']}`\n\n"
        
        return doc
    
    def generate_architecture_overview(self) -> str:
        """Generate architecture overview documentation."""
        doc = """# Code Architecture Overview

## Project Structure

The A1Betting project follows a modular architecture with clear separation of concerns:

"""
        
        # Analyze directory structure
        for source_dir in self.source_dirs:
            if source_dir.exists():
                doc += f"### {source_dir.name.title()}\n\n"
                doc += f"**Location:** `{source_dir.relative_to(self.project_root)}`\n\n"
                
                # Count files by type
                python_files = len(list(source_dir.glob("**/*.py")))
                if python_files > 0:
                    doc += f"- Python files: {python_files}\n"
                
                js_files = len(list(source_dir.glob("**/*.js"))) + len(list(source_dir.glob("**/*.jsx")))
                ts_files = len(list(source_dir.glob("**/*.ts"))) + len(list(source_dir.glob("**/*.tsx")))
                if js_files > 0 or ts_files > 0:
                    doc += f"- JavaScript/TypeScript files: {js_files + ts_files}\n"
                
                doc += "\n"
        
        # Code statistics
        total_classes = len(self.classes)
        total_functions = len(self.functions)
        
        doc += f"""## Code Statistics

- **Total Classes:** {total_classes}
- **Total Functions:** {total_functions}
- **Total Modules:** {len(self.modules)}

## Complexity Analysis

"""
        
        # Complexity analysis
        if self.functions:
            complexities = [f.get('complexity', 0) for f in self.functions]
            avg_complexity = sum(complexities) / len(complexities)
            max_complexity = max(complexities)
            
            doc += f"- **Average Function Complexity:** {avg_complexity:.1f}\n"
            doc += f"- **Maximum Function Complexity:** {max_complexity}\n\n"
            
            # Find most complex functions
            complex_functions = sorted(self.functions, key=lambda x: x.get('complexity', 0), reverse=True)[:5]
            if complex_functions:
                doc += "### Most Complex Functions\n\n"
                for func in complex_functions:
                    if func.get('complexity', 0) > 0:
                        doc += f"- `{func['name']}` (complexity: {func['complexity']}) in `{func['file']}`\n"
                doc += "\n"
        
        return doc
    
    def generate_dependency_documentation(self) -> str:
        """Generate dependency documentation."""
        doc = "# Dependencies\n\n"
        
        if 'python' in self.dependencies:
            doc += "## Python Dependencies\n\n"
            for dep in self.dependencies['python']:
                doc += f"- `{dep}`\n"
            doc += "\n"
        
        if 'javascript' in self.dependencies:
            js_deps = self.dependencies['javascript']
            
            if js_deps.get('dependencies'):
                doc += "## JavaScript Dependencies (Runtime)\n\n"
                for name, version in js_deps['dependencies'].items():
                    doc += f"- `{name}`: {version}\n"
                doc += "\n"
            
            if js_deps.get('devDependencies'):
                doc += "## JavaScript Dependencies (Development)\n\n"
                for name, version in js_deps['devDependencies'].items():
                    doc += f"- `{name}`: {version}\n"
                doc += "\n"
        
        return doc
    
    def generate_complete_documentation(self) -> str:
        """Generate complete code documentation."""
        doc = f"""# A1Betting Code Documentation

Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Dependencies](#dependencies)
3. [Modules](#modules)
4. [Classes](#classes)
5. [Functions](#functions)

---

"""
        
        # Add architecture overview
        doc += self.generate_architecture_overview()
        doc += "\n---\n\n"
        
        # Add dependency documentation
        doc += self.generate_dependency_documentation()
        doc += "\n---\n\n"
        
        # Add module documentation
        doc += "# Modules\n\n"
        for module in sorted(self.modules, key=lambda x: x['path']):
            doc += self.generate_module_documentation(module)
            doc += "\n---\n\n"
        
        return doc
    
    def generate_html_documentation(self, markdown_content: str) -> str:
        """Generate HTML documentation with styling."""
        html_content = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>A1Betting Code Documentation</title>
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
        h4 {{ color: #7f8c8d; }}
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
        .toc {{
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 5px;
            margin: 20px 0;
        }}
        .module-section {{
            margin: 30px 0;
            padding: 20px;
            border-left: 4px solid #27ae60;
            background-color: #f8fff8;
        }}
        .class-section {{
            margin: 20px 0;
            padding: 15px;
            border-left: 4px solid #e74c3c;
            background-color: #fff8f8;
        }}
        .function-section {{
            margin: 15px 0;
            padding: 10px;
            border-left: 4px solid #f39c12;
            background-color: #fffaf0;
        }}
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }}
        .stat-card {{
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            text-align: center;
        }}
        .stat-number {{
            font-size: 24px;
            font-weight: bold;
            color: #3498db;
        }}
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
        html = re.sub(r'^#### (.*?)$', r'<h4>\1</h4>', html, flags=re.MULTILINE)
        html = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
        html = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
        html = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
        
        # Code blocks
        html = re.sub(r'```(\w+)?\n(.*?)\n```', r'<pre><code>\2</code></pre>', html, flags=re.DOTALL)
        
        # Inline code
        html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)
        
        # Bold
        html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
        
        # Lists
        html = re.sub(r'^- (.*?)$', r'<li>\1</li>', html, flags=re.MULTILINE)
        html = re.sub(r'(<li>.*?</li>)', r'<ul>\1</ul>', html, flags=re.DOTALL)
        
        # Line breaks
        html = html.replace('\n\n', '</p><p>')
        html = html.replace('\n', '<br>')
        html = f'<p>{html}</p>'
        
        return html
    
    def run(self):
        """Run the code documentation generation."""
        try:
            logger.info("Starting code documentation generation...")
            
            # Scan files
            python_files = self.scan_python_files()
            js_files = self.scan_javascript_files()
            
            logger.info(f"Found {len(python_files)} Python files")
            logger.info(f"Found {len(js_files)} JavaScript/TypeScript files")
            
            # Analyze Python files
            for file_path in python_files:
                module_info = self.analyze_python_file(file_path)
                self.modules.append(module_info)
            
            # Analyze JavaScript files
            for file_path in js_files:
                module_info = self.analyze_javascript_file(file_path)
                self.modules.append(module_info)
            
            # Extract dependencies
            self.extract_dependencies()
            
            # Generate documentation
            markdown_doc = self.generate_complete_documentation()
            html_doc = self.generate_html_documentation(markdown_doc)
            
            # Save documentation files
            markdown_path = self.docs_dir / "code_documentation.md"
            with open(markdown_path, 'w', encoding='utf-8') as f:
                f.write(markdown_doc)
            
            html_path = self.docs_dir / "code_documentation.html"
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(html_doc)
            
            # Generate summary report
            summary = {
                'timestamp': datetime.now().isoformat(),
                'files_analyzed': len(self.modules),
                'python_files': len(python_files),
                'javascript_files': len(js_files),
                'total_classes': len(self.classes),
                'total_functions': len(self.functions),
                'documentation_files': [
                    str(markdown_path),
                    str(html_path)
                ]
            }
            
            summary_path = self.docs_dir / "generation_summary.json"
            with open(summary_path, 'w') as f:
                json.dump(summary, f, indent=2)
            
            logger.info("Code documentation generated successfully!")
            logger.info(f"Markdown: {markdown_path}")
            logger.info(f"HTML: {html_path}")
            logger.info(f"Summary: {summary_path}")
            logger.info(f"Analyzed {len(self.modules)} modules")
            logger.info(f"Found {len(self.classes)} classes and {len(self.functions)} functions")
            
            return 0
            
        except Exception as e:
            logger.error(f"Error generating code documentation: {e}")
            return 1

def main():
    """Main entry point."""
    generator = CodeDocumentationGenerator()
    return generator.run()

if __name__ == "__main__":
    sys.exit(main())
