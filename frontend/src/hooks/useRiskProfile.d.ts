import { RiskProfile } from '@/types/core.ts';
export declare function useRiskProfile(): {
    activeProfile: RiskProfile | null;
    profiles: RiskProfile[];
    isLoading: boolean;
    error: Error | null;
    updateProfile: (profile: RiskProfile) => Promise<boolean>;
    setActiveProfile: (profileId: string) => Promise<boolean>;
};
