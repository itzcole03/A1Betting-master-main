import { Prediction, RiskProfile } from '@/types/core.ts';
export declare const usePredictionService: () => {
    getPredictions: (riskProfile: RiskProfile) => Promise<Prediction[]>;
    subscribeToUpdates: (onUpdate: (prediction: Prediction) => void, onError: (error: Error) => void) => () => void;
};
