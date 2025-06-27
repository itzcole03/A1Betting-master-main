import React from 'react.ts';
import * as Sentry from '@sentry/react.ts';
import { Component, ErrorInfo, ReactNode } from 'react.ts';


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class GlobalErrorBoundary extends Component<Props, State key={458171}> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    Sentry.captureException(error);
    // console statement removed
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900/80 to-red-700/80 text-white p-6 animate-fade-in" key={533979}>
          <div className="glass modern-card rounded-3xl shadow-2xl p-8 max-w-xl w-full text-center" key={409925}>
            <h1 className="text-4xl font-extrabold text-red-200 mb-4 drop-shadow-lg" key={399870}>Oops! Something went wrong.</h1>
            <p className="text-lg mb-2 text-red-100" key={158369}>We've been notified of the issue and are working to fix it.</p>
            <p className="text-md mb-4 text-red-100" key={390397}>Please try refreshing the page or contact support if the problem persists.</p>
            {/* Optional: display error details in development */} 
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 p-4 bg-red-900/60 rounded-xl shadow-inner w-full max-w-2xl text-left text-red-200" key={324880}>
                <summary className="font-semibold cursor-pointer" key={229510}>Error Details</summary>
                <pre className="mt-2 text-sm whitespace-pre-wrap break-all" key={12731}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button; 
              onClick={() = key={788559}> window.location.reload()}
              className="mt-6 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold text-lg shadow-lg transition-colors animate-bounce-subtle"
            >
              Refresh Page;
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { GlobalErrorBoundary }; 