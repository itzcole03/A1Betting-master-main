import React from 'react.ts';
import { BarChart3 } from 'lucide-react.ts';

interface ChartErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

interface ChartErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ChartErrorBoundary extends React.Component<
  ChartErrorBoundaryProps,
  ChartErrorBoundaryState;
> {
  constructor(props: ChartErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ChartErrorBoundaryState {
    // Check if this is a Chart.js related error;
    const isChartError =
      error.message.includes("labels") ||
      error.message.includes("datasets") ||
      error.message.includes("Chart") ||
      error.stack?.includes("react-chartjs-2") ||
      error.stack?.includes("ChartComponent");

    if (isChartError) {
      return {
        hasError: true,
        errorMessage: error.message,
      };
    }

    // If it's not a chart error, don't catch it;
    return { hasError: false, errorMessage: "" };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log Chart.js related errors;
    if (this.state.hasError) {
      // console statement removed
    } else {
      // Re-throw non-chart errors;
      throw error;
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center h-64 text-gray-400 bg-gray-800/30 rounded-lg border border-gray-700/50" key={41384}>
          <div className="text-center p-6" key={609406}>
            <BarChart3 className="w-12 h-12 mx-auto mb-3 text-gray-500" / key={761767}>
            <h3 className="text-lg font-semibold text-gray-300 mb-2" key={141639}>
              Chart Unavailable;
            </h3>
            <p className="text-sm text-gray-400 mb-1" key={595098}>
              Chart data is still loading or unavailable;
            </p>
            <p className="text-xs text-gray-500" key={596425}>
              Please wait for data to load;
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component to wrap any chart component;
export const withChartErrorBoundary = <P extends object key={938344}>(
  Component: React.ComponentType<P key={657497}>,
) => {
  const WrappedComponent = (props: P) => (
    <ChartErrorBoundary key={372958}>
      <Component {...props} / key={356342}>
    </ChartErrorBoundary>
  );

  WrappedComponent.displayName = `withChartErrorBoundary(${Component.displayName || Component.name})`;

  return WrappedComponent;
};
