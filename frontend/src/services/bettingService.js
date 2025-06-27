import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const bettingApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
// API endpoints;
const endpoints = {
    sports: "/sports",
    events: "/events",
    odds: "/odds",
    bets: "/bets",
};
// Queries;
export const useSports = () => {
    return useQuery({
        queryKey: ["sports"],
        queryFn: async () => {
            const { data } = await bettingApi.get(endpoints.sports);
            return data;
        },
    });
};
export const useEvents = (sportId) => {
    return useQuery({
        queryKey: ["events", sportId],
        queryFn: async () => {
            const { data } = await bettingApi.get(`${endpoints.events}?sportId=${sportId}`);
            return data;
        },
        enabled: !!sportId,
    });
};
export const useOdds = (eventId) => {
    return useQuery({
        queryKey: ["odds", eventId],
        queryFn: async () => {
            const { data } = await bettingApi.get(`${endpoints.odds}/${eventId}`);
            return data;
        },
        enabled: !!eventId,
        refetchInterval: false, // Disable auto-refresh to prevent errors;
    });
};
export const useActiveBets = () => {
    return useQuery({
        queryKey: ["bets", "active"],
        queryFn: async () => {
            const { data } = await bettingApi.get(`${endpoints.bets}/active`);
            return data;
        },
    });
};
// Mutations;
export const usePlaceBet = () => {

    return useMutation({
        mutationFn: async (bet) => {
            const { data } = await bettingApi.post(endpoints.bets, bet);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bets", "active"] });
        },
    });
};
export const useCancelBet = () => {

    return useMutation({
        mutationFn: async (betId) => {
            const { data } = await bettingApi.post(`${endpoints.bets}/${betId}/cancel`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bets", "active"] });
        },
    });
};
// WebSocket connection for real-time updates;
export const connectToOddsWebSocket = (eventId, onUpdate) => {

    // Safety checks to prevent invalid WebSocket connections;
    if (!wsUrl ||
        wsUrl === "" ||
        wsUrl === "wss://api.betproai.com/ws" ||
        wsUrl.includes("api.betproai.com") ||
        wsUrl.includes("localhost:8000") ||
        wsUrl.includes("localhost:3001") ||
        wsUrl.includes("undefined") ||
        import.meta.env.VITE_ENABLE_WEBSOCKET === "false") {
        // console statement removed
        return () => { }; // Return empty cleanup function;
    }

    ws.onmessage = (event) => {

        onUpdate(odds);
    };
    return () => {
        ws.close();
    };
};
// Main betting service object;
const bettingService = {
    placeBet: async (betData) => {
        try {

            return { success: true, bet: response.data };
        }
        catch (error) {
            // console statement removed
            return { success: false, error: "Failed to place bet" };
        }
    },
    cancelBet: async (betId) => {
        try {

            return { success: true, bet: response.data };
        }
        catch (error) {
            // console statement removed
            return { success: false, error: "Failed to cancel bet" };
        }
    },
    getActiveBets: async () => {
        try {

            return response.data;
        }
        catch (error) {
            // console statement removed
            return [];
        }
    },
    getSports: async () => {
        try {

            return response.data;
        }
        catch (error) {
            // console statement removed
            return [];
        }
    },
    getEvents: async (sportId) => {
        try {

            return response.data;
        }
        catch (error) {
            // console statement removed
            return [];
        }
    },
    getOdds: async (eventId) => {
        try {

            return response.data;
        }
        catch (error) {
            // console statement removed
            return null;
        }
    },
};
// Export both ways for maximum compatibility;
export { bettingService };
export default bettingService;
