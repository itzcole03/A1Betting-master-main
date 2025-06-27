import React from 'react.ts';
import type { ModelPrediction } from '@/types/prediction.ts';
interface PredictionEnhancementProps {
    predictions: ModelPrediction[];
    onStakeOptimize: (prediction: ModelPrediction) => void;
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    bankroll: number;
    onRefresh?: () => Promise<void>;
    autoRefresh?: boolean;
    refreshInterval?: number;
}
declare const _default: React.NamedExoticComponent<PredictionEnhancementProps>;
export default _default;
