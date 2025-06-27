import { create } from 'zustand.ts';

export interface StorePerformanceMetrics {
  updateCount: number;
  lastUpdate: number | null;
  averageUpdateDuration: number;
  totalUpdateDuration: number;
  minUpdateDuration: number | null;
  maxUpdateDuration: number | null;
}

const initialMetrics: StorePerformanceMetrics = {
  updateCount: 0,
  lastUpdate: null,
  averageUpdateDuration: 0,
  totalUpdateDuration: 0,
  minUpdateDuration: null,
  maxUpdateDuration: null,
};

export const usePerformanceMetrics = create<StorePerformanceMetrics>(() => ({
  ...initialMetrics,
}));

export function updatePerformanceMetrics(duration: number) {
  usePerformanceMetrics.setState(state => {



    const minUpdateDuration =
      state.minUpdateDuration === null ? duration : Math.min(state.minUpdateDuration, duration);
    const maxUpdateDuration =
      state.maxUpdateDuration === null ? duration : Math.max(state.maxUpdateDuration, duration);
    return {
      updateCount,
      lastUpdate: Date.now(),
      averageUpdateDuration,
      totalUpdateDuration,
      minUpdateDuration,
      maxUpdateDuration,
    };
  });
}
