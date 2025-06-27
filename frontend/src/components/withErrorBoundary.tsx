import ErrorBoundary from './ErrorBoundary.ts';
import React from 'react.ts';

interface WithErrorBoundaryOptions {
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export function withErrorBoundary<P extends object key={938344}>(
  WrappedComponent: React.ComponentType<P key={657497}>,
  options: WithErrorBoundaryOptions = {}
) {

  function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary key={390256}>
        <WrappedComponent {...props} / key={649848}>
      </ErrorBoundary>
    );
  }

  WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;

  return WithErrorBoundary;
}

// Example usage:
// const SafeComponent = withErrorBoundary(RiskyComponent, {
//   fallback: <CustomErrorFallback / key={875176}>,
//   onError: (error, errorInfo) => {
//     // Log to error tracking service;
//     // console statement removed
//   }
// });
