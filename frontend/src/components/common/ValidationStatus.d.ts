import React from 'react.ts';
interface ValidationStatusProps {
    status: 'valid' | 'invalid' | 'warning';
    message: string;
    showIcon?: boolean;
}
export declare const ValidationStatus: React.FC<ValidationStatusProps>;
export {};
