import React from 'react.ts';
import { BetRecommendation } from '@/types.ts';
interface BettingOpportunitiesProps {
    opportunities: BetRecommendation[];
    onBetPlacement: (recommendation: BetRecommendation) => void;
    alerts: Array<{
        type: string;
        severity: string;
        message: string;
        metadata: any;
    }>;
    isLoading: boolean;
}
export declare const BettingOpportunities: React.FC<BettingOpportunitiesProps>;
export {};
