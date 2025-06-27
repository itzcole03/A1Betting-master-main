import React from 'react.ts';
import type { ArbitrageOpportunity } from '@/types/betting.ts';
interface ArbitrageOpportunitiesProps {
    opportunities: ArbitrageOpportunity[];
    onPlaceBet: (opportunity: ArbitrageOpportunity) => void;
}
declare const _default: React.NamedExoticComponent<ArbitrageOpportunitiesProps>;
export default _default;
