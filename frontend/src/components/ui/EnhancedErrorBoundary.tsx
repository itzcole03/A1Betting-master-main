/**
 * Enhanced Error Boundary System for A1Betting;
 */

import React, { Component, ErrorInfo, ReactNode  } from 'react.ts';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react.ts';

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

class EnhancedErrorBoundary extends Component<Props, State key={458171}> {
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

  static getDerivedStateFromError(error: Error): Partial<State key={260086}> {
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

    // Log error to monitoring service;
    this.logError(error, errorInfo);

    // Call custom error handler;
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

    // In production, send to monitoring service;
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      // console statement removed
    } else {
      // console statement removed
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
      <details className="mt-4 p-4 bg-gray-900 rounded-lg" key={950640}>
        <summary className="cursor-pointer text-sm font-medium text-gray-300 hover:text-white" key={228761}>
          Error Details (Development Only)
        </summary>
        <div className="mt-2 text-xs font-mono text-gray-400" key={121075}>
          <div className="mb-2" key={477075}>
            <strong key={829099}>Error:</strong> {this.state.error?.message}
          </div>
          <div className="mb-2" key={477075}>
            <strong key={829099}>Stack:</strong>
            <pre className="mt-1 overflow-auto" key={395279}>{this.state.error?.stack}</pre>
          </div>
          {this.state.errorInfo && (
            <div key={241917}>
              <strong key={829099}>Component Stack:</strong>
              <pre className="mt-1 overflow-auto" key={395279}>{this.state.errorInfo.componentStack}</pre>
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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4" key={228910}>
          <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl p-6 text-center" key={473840}>
            <div className="flex justify-center mb-4" key={367379}>
              <AlertTriangle className="h-16 w-16 text-red-500" / key={996684}>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-2" key={631220}>
              Oops! Something went wrong;
            </h1>
            
            <p className="text-gray-300 mb-6" key={882871}>
              We encountered an unexpected error. Don't worry, our team has been notified.
            </p>

            <div className="space-y-3" key={186520}>
              {this.state.retryCount < this.maxRetries && (
                <button;
                  onClick={this.handleRetry}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                 key={628632}>
                  <RefreshCw className="h-4 w-4" / key={465777}>
                  <span key={595076}>Try Again ({this.maxRetries - this.state.retryCount} attempts left)</span>
                </button>
              )}
              
              <button;
                onClick={this.handleGoHome}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
               key={865208}>
                <Home className="h-4 w-4" / key={799014}>
                <span key={595076}>Go to Dashboard</span>
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

// Lightweight error boundary for specific components;
export const ComponentErrorBoundary: React.FC<{
  children: ReactNode;
  componentName: string;
}> = ({ children, componentName }) => {
  return (
    <EnhancedErrorBoundary;
      fallback={
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg" key={206342}>
          <div className="flex items-center space-x-2" key={740830}>
            <AlertTriangle className="h-5 w-5 text-red-500" / key={741294}>
            <p className="text-red-700" key={800724}>
              {componentName} failed to load. Please refresh the page.
            </p>
          </div>
        </div>
      }
      onError={(error, errorInfo) => {
        // console statement removed
      }}
    >
      {children}
    </EnhancedErrorBoundary>
  );
};

// Async component error boundary;
export const AsyncBoundary: React.FC<{
  children: ReactNode;
  loading?: ReactNode;
}> = ({ children, loading = <div key={241917}>Loading...</div> }) => {
  return (
    <EnhancedErrorBoundary;
      fallback={
        <div className="flex items-center justify-center h-32" key={732144}>
          <div className="text-gray-500" key={542487}>Failed to load component</div>
        </div>
      }
    >
      <React.Suspense fallback={loading} key={576864}>
        {children}
      </React.Suspense>
    </EnhancedErrorBoundary>
  );
};

export default EnhancedErrorBoundary;
