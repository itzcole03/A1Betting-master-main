import React from 'react.ts';
import { Lineup } from '@/types.ts';
interface LineupComparisonTableProps {
    lineups: Lineup[];
    onSelect?: (lineup: Lineup) => void;
}
export declare const LineupComparisonTable: React.FC<LineupComparisonTableProps>;
export {};
