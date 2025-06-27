import React from 'react.ts';
import type { BettingSettings } from '@/services/bettingService.ts';
type RiskProfile = BettingSettings['riskProfile'];
interface RiskProfileSelectorProps {
    currentProfile: RiskProfile;
    onProfileChange: (profile: RiskProfile) => void;
}
export declare const RiskProfileSelector: React.FC<RiskProfileSelectorProps>;
export {};
