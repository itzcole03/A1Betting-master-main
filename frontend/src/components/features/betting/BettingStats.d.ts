import React from 'react.ts';
import type { BettingStats as BettingStatsType, ModelPerformance } from '@/types/betting.ts';
interface BettingStatsProps {
    stats: BettingStatsType;
    modelPerformance: ModelPerformance[];
}
declare const _default: React.NamedExoticComponent<BettingStatsProps>;
export default _default;
