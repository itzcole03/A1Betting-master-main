import React from 'react.ts';
import { RiskProfileType } from '@/types/betting.ts';
interface RiskProfileSelectorProps {
    currentProfile: RiskProfileType;
    onProfileChange: (profile: RiskProfileType) => void;
}
export declare const RiskProfileSelector: React.FC<RiskProfileSelectorProps>;
export {};
