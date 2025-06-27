import { StateCreator } from 'zustand.ts';
import {
  PrizePicksEntry,
  PrizePicksProps,
  PrizePicksPlayer,
  PrizePicksLines,
} from '@/../../shared/prizePicks.ts';
import { prizePicksService } from '@/services/prizePicksService.ts';
import { userService } from '@/services/userService.ts';
import { AppStore } from '@/stores/useAppStore.ts'; // Corrected path;

export interface PrizePicksSlice {
  props: PrizePicksProps[];
  currentPrizePicksPlayer: PrizePicksPlayer | null;
  currentPrizePicksLines: PrizePicksLines | null;
  entries: PrizePicksEntry[];
  isLoadingProps: boolean;
  isLoadingEntries: boolean;
  isLoadingPlayer: boolean; // Combined from isLoadingPrizePicksPlayer;
  isLoadingLines: boolean; // Combined from isLoadingPrizePicksLines;
  error: string | null; // Shared error for this slice;
  fetchProps: (league?: string, statType?: string) => Promise<void>;
  fetchPrizePicksPlayer: (playerIdOrName: string) => Promise<void>; // Changed to playerIdOrName for clarity;
  fetchPrizePicksLines: (propId: string) => Promise<void>;
  setProps: (props: PrizePicksProps[]) => void;
  fetchEntries: () => Promise<void>;
  addEntry: (entry: PrizePicksEntry) => void;
  updateEntry: (entry: PrizePicksEntry) => void;
}

export const initialPrizePicksState: Pick<
  PrizePicksSlice,
  | 'props'
  | 'currentPrizePicksPlayer'
  | 'currentPrizePicksLines'
  | 'entries'
  | 'isLoadingProps'
  | 'isLoadingEntries'
  | 'isLoadingPlayer'
  | 'isLoadingLines'
  | 'error'
> = {
  props: [],
  currentPrizePicksPlayer: null,
  currentPrizePicksLines: null,
  entries: [],
  isLoadingProps: false,
  isLoadingEntries: false,
  isLoadingPlayer: false,
  isLoadingLines: false,
  error: null,
};

export const createPrizePicksSlice: StateCreator<AppStore, [], [], PrizePicksSlice> = (
  set,
  get;
) => ({
  ...initialPrizePicksState,
  fetchProps: async (league, statType) => {
    set({ isLoadingProps: true, error: null });
    try {

      set({ props, isLoadingProps: false });
    } catch (e: any) {

      set({ error: errorMsg, isLoadingProps: false });
      get().addToast({ message: `Error fetching props: ${errorMsg}`, type: 'error' });
    }
  },
  fetchPrizePicksPlayer: async playerIdOrName => {
    set({ isLoadingPlayer: true, error: null });
    try {

      set({ currentPrizePicksPlayer: player, isLoadingPlayer: false });
    } catch (e: any) {

      set({ error: errorMsg, isLoadingPlayer: false });
      get().addToast({
        message: `Error fetching player ${playerIdOrName}: ${errorMsg}`,
        type: 'error',
      });
    }
  },
  fetchPrizePicksLines: async propId => {
    set({ isLoadingLines: true, error: null });
    try {

      set({ currentPrizePicksLines: lines, isLoadingLines: false });
    } catch (err: any) {

      set({ error: errorMsg, isLoadingLines: false });
      get().addToast({ message: errorMsg, type: 'error' });
    }
  },
  setProps: props => set({ props }),
  fetchEntries: async () => {
    const { isAuthenticated, user, addToast } = get(); // Get required state/actions;
    if (!isAuthenticated || !user?.id) {
      set({ error: 'User not authenticated to fetch entries.', isLoadingEntries: false });
      addToast({ message: 'Please login to see your entries.', type: 'warning' });
      return;
    }
    set({ isLoadingEntries: true, error: null });
    try {

      // Transform to shared type;
      const sharedEntries: PrizePicksEntry[] = entries.map((e: any) => ({
        ...e,
        user_id: e.userId,
        created_at: e.timestamp || e.created_at || '',
        updated_at: e.timestamp || e.updated_at || '',
      }));
      set({ entries: sharedEntries, isLoadingEntries: false });
    } catch (e: any) {

      set({ error: errorMsg, isLoadingEntries: false, entries: [] });
      addToast({ message: `Error fetching entries: ${errorMsg}`, type: 'error' });
    }
  },
  addEntry: entry => set(state => ({ entries: [...state.entries, entry] })),
  updateEntry: entry =>
    set(state => ({
      entries: state.entries.map(e => (e.id === entry.id ? { ...e, ...entry } : e)),
    })),
});
