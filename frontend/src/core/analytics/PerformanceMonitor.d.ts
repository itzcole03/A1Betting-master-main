import { ModelPerformanceMetrics } from './ModelPerformanceTracker.ts';
import { UnifiedLogger } from '@/logging/types.ts';
import { UnifiedMetrics } from '@/metrics/types.ts';
interface AlertThreshold {
    metric: keyof ModelPerformanceMetrics;
    threshold: number;
    condition: 'above' | 'below';
    severity: 'warning' | 'critical';
}
interface Alert {
    modelName: string;
    metric: keyof ModelPerformanceMetrics;
    value: number;
    threshold: number;
    severity: 'warning' | 'critical';
    timestamp: Date;
}
export declare class PerformanceMonitor {
    private logger;
    private metrics;
    private customThresholds;
    private static instance;
    private alerts;
    private readonly maxAlerts;
    private readonly defaultThresholds;
    private constructor();
    static getInstance(logger: UnifiedLogger, metrics: UnifiedMetrics, customThresholds?: AlertThreshold[]): PerformanceMonitor;
    monitorPerformance(modelName: string, metrics: ModelPerformanceMetrics): void;
    getAlerts(modelName?: string, severity?: 'warning' | 'critical', startTime?: Date): Alert[];
    clearAlerts(modelName?: string): void;
    private checkThreshold;
    private createAlert;
    private trackMetrics;
}
export {};
