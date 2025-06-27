import React from 'react.ts';
import { BettingMetrics } from '@/types/betting.ts';
interface PerformanceMetricsProps {
    metrics: BettingMetrics;
    loading: boolean;
    error: Error | null;
}
export declare const PerformanceMetrics: React.FC<PerformanceMetricsProps>;
export {};
