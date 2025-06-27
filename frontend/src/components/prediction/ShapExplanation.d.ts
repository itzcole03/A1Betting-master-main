import React from 'react.ts';
import { ModelExplanation } from '@/core/types/prediction.ts';
interface ShapExplanationProps {
    explanation: ModelExplanation;
    className?: string;
}
export declare const ShapExplanation: React.FC<ShapExplanationProps>;
export {};
