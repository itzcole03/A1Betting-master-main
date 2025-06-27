import React from 'react.ts';
interface StatusIndicatorProps {
    status: "active" | "warning" | "error" | "offline";
    label: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}
declare const StatusIndicator: React.FC<StatusIndicatorProps>;
export default StatusIndicator;
