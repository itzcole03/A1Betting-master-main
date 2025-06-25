/**
 * Enhanced Error Boundary System for A1Betting
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

class EnhancedErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    this.logError(error, errorInfo);

    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  private logError = (error: Error, errorInfo: ErrorInfo) => {
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      retryCount: this.state.retryCount,
    };

    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      console.error('Error captured by boundary:', errorData);
    } else {
      console.error('Development Error:', errorData);
    }
  };

  private handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: this.state.retryCount + 1,
      });
    }
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private renderErrorDetails = () => {
    if (!this.props.showDetails || process.env.NODE_ENV === 'production') {
      return null;
    }

    return (
      <details className="mt-4 p-4 bg-gray-900 rounded-lg">
        <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white">
          Error Details (Development Only)
        </summary>
        <div className="mt-2 text-xs font-mono text-gray-400">
          <div className="mb-2">
            <strong>Error:</strong> {this.state.error?.message}
          </div>
          <div className="mb-2">
            <strong>Stack:</strong>
            <pre className="mt-1 overflow-auto">{this.state.error?.stack}</pre>
          </div>
          {this.state.errorInfo && (
            <div>
              <strong>Component Stack:</strong>
              <pre className="mt-1 overflow-auto">{this.state.errorInfo.componentStack}</pre>
            </div>
          )}
        </div>
      </details>
    );
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h1>
            
            <p className="text-gray-300 mb-6">
              We encountered an unexpected error. Don't worry, our team has been notified.
            </p>

            <div className="space-y-3">
              {this.state.retryCount < this.maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Try Again ({this.maxRetries - this.state.retryCount} attempts left)</span>
                </button>
              )}
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Go to Dashboard</span>
              </button>
            </div>

            {this.renderErrorDetails()}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Lightweight error boundary for specific components
export const ComponentErrorBoundary: React.FC<{
  children: ReactNode;
  componentName: string;
}> = ({ children, componentName }) => {
  return (
    <EnhancedErrorBoundary
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <p className="text-red-700">
              {componentName} failed to load. Please refresh the page.
            </p>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        console.error(`Component Error in ${componentName}:`, error, errorInfo);
      }}
    >
      {children}
    </EnhancedErrorBoundary>
  );
};

// Async component error boundary
export const AsyncBoundary: React.FC<{
  children: ReactNode;
  loading?: ReactNode;
}> = ({ children, loading = <div>Loading...</div> }) => {
  return (
    <EnhancedErrorBoundary
      fallback={
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Failed to load component</div>
        </div>
      }
    >
      <React.Suspense fallback={loading}>
        {children}
      </React.Suspense>
    </EnhancedErrorBoundary>
  );
};

export default EnhancedErrorBoundary;
