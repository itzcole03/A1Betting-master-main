import React from 'react.ts';
import { PredictionModelOutput } from '@/hooks/usePredictions.ts';
interface MoneyMakerResultsProps {
    event: string;
    market: string;
    selection: string;
    odds: number;
    modelOutput: PredictionModelOutput;
    kellyFraction: number;
    expectedValue: number;
    timestamp: number;
    onPlaceBet: () => void;
    className?: string;
}
export declare const MoneyMakerResults: React.FC<MoneyMakerResultsProps>;
export {};
