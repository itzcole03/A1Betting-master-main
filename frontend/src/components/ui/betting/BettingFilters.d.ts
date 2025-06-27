import React from 'react.ts';
interface BettingFiltersProps {
    selectedSport: string;
    minConfidence: number;
    sortBy: 'confidence' | 'value' | 'odds';
    onFilterChange: (filters: {
        selectedSport: string;
        minConfidence: number;
        sortBy: 'confidence' | 'value' | 'odds';
    }) => void;
}
export declare const BettingFilters: React.NamedExoticComponent<BettingFiltersProps>;
export {};
