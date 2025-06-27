import React from 'react.ts';
import type { Prediction } from '@/services/predictionService.ts';
interface LivePredictionsProps {
    predictions: Prediction[];
}
export declare const LivePredictions: React.FC<LivePredictionsProps>;
export {};
