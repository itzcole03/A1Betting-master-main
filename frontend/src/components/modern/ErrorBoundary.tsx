import React, { Component, ErrorInfo, ReactNode  } from 'react.ts';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State key={458171}> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console statement removed
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4" key={605782}>
          <div className="modern-card max-w-lg w-full p-6 text-center" key={519048}>
            <div className="text-6xl mb-4" key={671434}>😢</div>
            <h1 className="text-2xl font-bold mb-4" key={150076}>Oops! Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6" key={966769}>
              We're sorry for the inconvenience. Please try refreshing the page or contact support;
              if the problem persists.
            </p>
            <div className="space-x-4" key={421824}>
              <button className="modern-button" onClick={() = key={307658}> window.location.reload()}>
                Refresh Page;
              </button>
              <button;
                className="modern-button bg-gray-500 hover:bg-gray-600"
                onClick={() = key={410110}> this.setState({ hasError: false })}
              >
                Try Again;
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 text-left" key={15462}>
                <details className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg" key={226557}>
                  <summary className="text-red-600 dark:text-red-400 font-medium cursor-pointer" key={787084}>
                    Error Details;
                  </summary>
                  <pre className="mt-4 text-sm text-red-800 dark:text-red-200 overflow-auto" key={587482}>
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
