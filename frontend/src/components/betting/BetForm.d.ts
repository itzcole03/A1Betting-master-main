import React from 'react.ts';
interface BetFormProps {
    eventId: string;
    marketType: string;
    selection: string;
    odds: number;
    metadata: {
        sport: string;
        league: string;
        homeTeam: string;
        awayTeam: string;
        startTime: Date;
    };
}
export declare const BetForm: React.FC<BetFormProps>;
export {};
