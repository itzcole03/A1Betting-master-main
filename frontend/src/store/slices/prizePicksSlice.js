import { prizePicksService } from '../../services/prizePicksService';
import { userService } from '../../services/userService';
export const initialPrizePicksState = {
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
export const createPrizePicksSlice = (set, get) => ({
    ...initialPrizePicksState,
    fetchProps: async (league, statType) => {
        set({ isLoadingProps: true, error: null });
        try {

            set({ props, isLoadingProps: false });
        }
        catch (e) {

            set({ error: errorMsg, isLoadingProps: false });
            get().addToast({ message: `Error fetching props: ${errorMsg}`, type: 'error' });
        }
    },
    fetchPrizePicksPlayer: async (playerIdOrName) => {
        set({ isLoadingPlayer: true, error: null });
        try {

            set({ currentPrizePicksPlayer: player, isLoadingPlayer: false });
        }
        catch (e) {

            set({ error: errorMsg, isLoadingPlayer: false });
            get().addToast({
                message: `Error fetching player ${playerIdOrName}: ${errorMsg}`,
                type: 'error',
            });
        }
    },
    fetchPrizePicksLines: async (propId) => {
        set({ isLoadingLines: true, error: null });
        try {

            set({ currentPrizePicksLines: lines, isLoadingLines: false });
        }
        catch (err) {

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
            const sharedEntries = entries.map((e) => ({
                ...e,
                user_id: e.userId,
                created_at: e.timestamp || e.created_at || '',
                updated_at: e.timestamp || e.updated_at || '',
            }));
            set({ entries: sharedEntries, isLoadingEntries: false });
        }
        catch (e) {

            set({ error: errorMsg, isLoadingEntries: false, entries: [] });
            addToast({ message: `Error fetching entries: ${errorMsg}`, type: 'error' });
        }
    },
    addEntry: entry => set(state => ({ entries: [...state.entries, entry] })),
    updateEntry: entry => set(state => ({
        entries: state.entries.map(e => (e.id === entry.id ? { ...e, ...entry } : e)),
    })),
});
