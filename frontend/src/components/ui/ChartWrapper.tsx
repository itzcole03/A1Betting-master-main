/**
 * Chart Wrapper Component;
 * Provides bulletproof chart rendering with error boundaries and cleanup;
 */

import React, { ErrorBoundary  } from 'react.ts';
import { BarChart3, AlertTriangle, RefreshCw } from 'lucide-react.ts';

interface ChartWrapperProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  height?: string;
  onRetry?: () => void;
}

interface ChartErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ChartErrorBoundary extends React.Component<
  ChartWrapperProps,
  ChartErrorBoundaryState;
> {
  constructor(props: ChartWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // console statement removed
  }

  render() {
    if (this.state.hasError) {
      return (
        <div;
          className={`flex items-center justify-center bg-gray-900/50 rounded-lg border border-gray-700 ${this.props.height || "h-64"}`}
         key={253849}>
          <div className="text-center p-6" key={609406}>
            <AlertTriangle className="w-8 h-8 mx-auto mb-3 text-yellow-500" / key={30305}>
            <h3 className="text-sm font-medium text-gray-300 mb-2" key={974630}>
              {this.props.fallbackTitle || "Chart Rendering Error"}
            </h3>
            <p className="text-xs text-gray-500 mb-4" key={539067}>
              Unable to display chart data;
            </p>
            {this.props.onRetry && (
              <button;
                onClick={() = key={206350}> {
                  this.setState({ hasError: false, error: undefined });
                  this.props.onRetry?.();
                }}
                className="inline-flex items-center px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
              >
                <RefreshCw className="w-3 h-3 mr-1" / key={987673}>
                Retry;
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className={`relative ${this.props.height || "h-64"}`} key={540034}>
        {this.props.children}
      </div>
    );
  }
}

const ChartWrapper: React.FC<ChartWrapperProps key={336808}> = (props) => {
  return <ChartErrorBoundary {...props} / key={108475}>;
};

export default ChartWrapper;
