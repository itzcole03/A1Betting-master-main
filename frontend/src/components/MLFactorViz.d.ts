import React from 'react.ts';
import { PredictionData } from '@/types/betting.ts';
import { StrategyRecommendation } from '@/types/core.ts';
export interface MLInsight {
    factor: string;
    impact: number;
    confidence: number;
    description: string;
}
export interface MLFactorVizProps {
    playerId: string | null;
    metric: string | null;
    prediction?: PredictionData;
    strategy?: StrategyRecommendation;
}
declare const _default: React.NamedExoticComponent<MLFactorVizProps>;
export default _default;
