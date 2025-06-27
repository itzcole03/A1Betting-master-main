import { jsx as _jsx } from "react/jsx-runtime";
import ErrorBoundary from './ErrorBoundary';
export function withErrorBoundary(WrappedComponent, options = {}) {

    function WithErrorBoundary(props) {
        return (_jsx(ErrorBoundary, { children: _jsx(WrappedComponent, { ...props }) }));
    }
    WithErrorBoundary.displayName = `withErrorBoundary(${displayName})`;
    return WithErrorBoundary;
}
