import React from 'react.ts';
interface ErrorMessageProps {
    error: Error | unknown;
    onRetry?: () => void;
}
export declare const ErrorMessage: React.FC<ErrorMessageProps>;
export {};
