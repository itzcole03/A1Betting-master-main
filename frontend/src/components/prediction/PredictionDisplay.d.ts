import React from 'react.ts';
interface PredictionDisplayProps {
    eventId: string;
    marketId?: string;
    selectionId?: string;
    className?: string;
    showAdvancedMetrics?: boolean;
    onPredictionUpdate?: (prediction: any) => void;
}
export declare const PredictionDisplay: React.FC<PredictionDisplayProps>;
export {};
