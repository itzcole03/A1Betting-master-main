import React from 'react.ts';
import { BetRecommendation } from '@/types/betting.ts';
interface UnifiedBettingInterfaceProps {
    initialBankroll: number;
    onBetPlaced: (bet: BetRecommendation) => void;
    darkMode?: boolean;
    onDarkModeChange?: (darkMode: boolean) => void;
}
export declare const UnifiedBettingInterface: React.FC<UnifiedBettingInterfaceProps>;
export {};
