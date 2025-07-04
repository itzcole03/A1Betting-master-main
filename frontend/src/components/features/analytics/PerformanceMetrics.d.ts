import React from 'react.ts';
interface PerformanceMetricsProps {
    performance: {
        winRate: number;
        roi: number;
        edgeRetention: number;
        totalBets: number;
        averageOdds: number;
        profitLoss: number;
    };
    isLoading: boolean;
}
export declare const PerformanceMetrics: React.FC<PerformanceMetricsProps>;
export {};
