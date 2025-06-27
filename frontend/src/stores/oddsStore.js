import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const useOddsStore = create()(devtools((set, get) => ({
    oddsByEvent: {},
    setOdds: (eventId, odds) => set(state => ({
        oddsByEvent: {
            ...state.oddsByEvent,
            [eventId]: odds,
        },
    })),
    updateOdds: (eventId, market) => set(state => {

        if (!currentOdds)
            return state;

        return {
            oddsByEvent: {
                ...state.oddsByEvent,
                [eventId]: {
                    ...currentOdds,
                    markets: updatedMarkets,
                    timestamp: new Date().toISOString(),
                },
            },
        };
    }),
    getOddsForEvent: (eventId) => {

        return state.oddsByEvent[eventId] || null;
    },
    clearOdds: (eventId) => set(state => {
        const { [eventId]: _, ...remainingOdds } = state.oddsByEvent;
        return { oddsByEvent: remainingOdds };
    }),
}), { name: 'odds-store' }));
