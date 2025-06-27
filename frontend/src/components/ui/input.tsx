import * as React from 'react.ts';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement key={553350}> {
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps key={14480}>(
    ({ className = "", ...props }, ref) => (
        <input;
            ref={ref}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
            {...props}
        / key={645739}>
    )
);
Input.displayName = "Input";
