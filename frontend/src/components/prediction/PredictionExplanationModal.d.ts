import React from 'react.ts';
import { PredictionWithExplanation } from '@/core/types/prediction.ts';
interface PredictionExplanationModalProps {
    open: boolean;
    onClose: () => void;
    prediction: PredictionWithExplanation;
}
export declare const PredictionExplanationModal: React.FC<PredictionExplanationModalProps>;
export {};
