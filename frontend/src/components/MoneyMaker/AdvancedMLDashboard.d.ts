import React from 'react.ts';
interface ModelStatus {
    id: string;
    name: string;
    status: 'active' | 'training' | 'error';
    confidence: number;
    lastUpdate: string;
}
interface AdvancedMLDashboardProps {
    models: ModelStatus[];
}
export declare const AdvancedMLDashboard: React.FC<AdvancedMLDashboardProps>;
export {};
