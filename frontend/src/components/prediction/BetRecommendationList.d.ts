import React from 'react.ts';
import { BetRecommendation } from '@/core/types/prediction.ts';
interface BetRecommendationListProps {
    recommendations: BetRecommendation[];
    loading?: boolean;
    error?: string;
}
export declare const BetRecommendationList: React.FC<BetRecommendationListProps>;
export {};
