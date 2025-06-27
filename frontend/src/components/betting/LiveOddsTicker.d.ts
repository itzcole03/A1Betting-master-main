import React from 'react.ts';
import { BettingEvent } from '@/types/betting.ts';
interface LiveOddsTickerProps {
    events: BettingEvent[];
    onEventSelect: (event: BettingEvent) => void;
    loading: boolean;
    error: Error | null;
}
export declare const LiveOddsTicker: React.FC<LiveOddsTickerProps>;
export {};
