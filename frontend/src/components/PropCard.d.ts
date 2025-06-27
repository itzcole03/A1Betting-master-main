import React from 'react.ts';
import { PrizePicksProjection } from '@/api/PrizePicksAPI.ts';
interface PropCardProps {
    projection: PrizePicksProjection;
    onClick: () => void;
    isSelected: boolean;
}
declare const PropCard: React.FC<PropCardProps>;
export default PropCard;
