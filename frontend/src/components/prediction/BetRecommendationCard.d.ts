import React from 'react.ts';
import { BetRecommendation } from '@/core/types/prediction.ts';
interface BetRecommendationCardProps {
    recommendation: BetRecommendation;
    onViewDetails?: () => void;
}
export declare const BetRecommendationCard: React.FC<BetRecommendationCardProps>;
export {};
