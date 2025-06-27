import React from 'react.ts';
import { EntryStatus } from '@/types.ts';
interface ProgressBarProps {
    current: number;
    target: number;
    status: EntryStatus;
    showPercentage?: boolean;
    className?: string;
    showGlow?: boolean;
    animated?: boolean;
}
export declare const ProgressBar: React.FC<ProgressBarProps>;
export {};
