// bankrollSlice.ts;
// Zustand slice for bankroll state and actions;

import { create } from 'zustand.ts';
import type { Transaction, BankrollSettings, BankrollStats } from '@/types/bankroll.ts';

interface BankrollState {
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  settings: BankrollSettings;
  updateSettings: (s: Partial<BankrollSettings>) => void;
  stats: BankrollStats;
  refreshStats: () => void;
  reset: () => void;
}

export const useBankrollStore = create<BankrollState>((set, get) => ({
  transactions: [],
  addTransaction: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),
  settings: {
    maxBetPercentage: 0.05,
    stopLossPercentage: 0.2,
    takeProfitPercentage: 0.5,
    kellyFraction: 0.5,
  },
  updateSettings: (s) => set((state) => ({ settings: { ...state.settings, ...s } })),
  stats: {
    currentBalance: 1000,
    startingBalance: 1000,
    totalWins: 0,
    totalLosses: 0,
    winRate: 0,
    averageBetSize: 0,
    largestWin: 0,
    largestLoss: 0,
    netProfit: 0,
    roi: 0,
  },
  refreshStats: () => {
    // In production, sync with bankrollService.getStats()
    // For now, recalc from local state;
    const { transactions, stats } = get();












    set({
      stats: {
        ...stats,
        currentBalance,
        totalWins: wins.length,
        totalLosses: losses.length,
        winRate,
        averageBetSize,
        largestWin,
        largestLoss,
        netProfit,
        roi,
      },
    });
  },
  reset: () => set({ transactions: [], stats: { ...get().stats, currentBalance: get().stats.startingBalance, netProfit: 0 } }),
}));
