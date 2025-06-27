import React from 'react.ts';
interface StakeSizingControlProps {
    onStakeChange: (stake: number) => void;
    maxStake?: number;
    minStake?: number;
    defaultStake?: number;
}
export declare const StakeSizingControl: React.FC<StakeSizingControlProps>;
export {};
