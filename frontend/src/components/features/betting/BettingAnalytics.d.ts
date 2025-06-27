import React from 'react.ts';
import { BettingOpportunity } from '@/services/bettingStrategy.ts';
interface BettingAnalyticsProps {
    onOpportunitySelect?: (opportunity: BettingOpportunity) => void;
}
export declare const BettingAnalytics: React.FC<BettingAnalyticsProps>;
export {};
