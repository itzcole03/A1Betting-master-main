import { StateCreator } from 'zustand.ts';
import { BettingState, RootState } from '@/types.ts';

export const createBettingSlice: StateCreator<RootState, [], [], BettingState> = (set, get) => ({
  bets: [],
  odds: {},
  payouts: {},

  placeBet: bet => {
    set(state => ({
      bets: [...state.bets, bet],
    }));
  },

  updateActiveBet: (betId, update) => {
    set(state => ({
      bets: state.bets.map(bet => (bet.id === betId ? { ...bet, ...update } : bet)),
    }));
  },

  clearOpportunities: () => {
    set(state => ({
      bets: state.bets.filter(bet => bet.status !== 'opportunity'),
    }));
  },
});
