import React from 'react.ts';
import { PrizePicksProps, SocialSentimentData } from '@/types.ts';
interface PropCardProps {
    prop: PrizePicksProps;
    sentiment?: SocialSentimentData;
    onViewDetails: (propId: string) => void;
    className?: string;
    team: string;
    position: string;
    statType: string;
    line: number;
    pickType?: 'demon' | 'goblin' | 'normal';
    trendValue?: number;
    gameInfo?: {
        opponent: string;
        day: string;
        time: string;
    };
    playerImageUrl?: string;
}
declare const PropCard: React.FC<PropCardProps>;
export default PropCard;
