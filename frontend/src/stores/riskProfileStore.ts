import { create } from 'zustand.ts';
import { devtools } from 'zustand/middleware.ts';
import { RiskProfile, RiskProfileType, DEFAULT_RISK_PROFILES } from '@/types/betting.ts';

interface RiskState {
  currentProfile: RiskProfile;
  bankroll: number;
  updateRiskProfile: (updates: Partial<RiskProfile>) => void;
  updateBankroll: (amount: number) => void;
  getMaxStake: () => number;
  getRiskAdjustedStake: (baseStake: number) => number;
  setProfileType: (type: RiskProfileType) => void;
}

export const useRiskProfileStore = create<RiskState>()(
  devtools(
    (set, get) => ({
      currentProfile: DEFAULT_RISK_PROFILES[RiskProfileType.MODERATE],
      bankroll: 1000,

      updateRiskProfile: (updates: Partial<RiskProfile>) => {
        set(state => ({
          currentProfile: {
            ...state.currentProfile,
            ...updates,
          },
        }));
      },

      updateBankroll: (amount: number) => {
        set({ bankroll: amount });
      },

      getMaxStake: () => {
        const { currentProfile, bankroll } = get();
        return bankroll * currentProfile.max_stake_percentage;
      },

      getRiskAdjustedStake: (baseStake: number) => {
        const { currentProfile, bankroll } = get();

        return Math.min(baseStake, maxStake);
      },

      setProfileType: (type: RiskProfileType) => {
        set({ currentProfile: DEFAULT_RISK_PROFILES[type] });
      },
    }),
    { name: 'risk-profile-store' }
  )
);
