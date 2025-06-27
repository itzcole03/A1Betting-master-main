/**
 * Generic GET method for arbitrary endpoints.
 * @param url - The endpoint URL (absolute or relative).
 * @param params - Query parameters as a key-value object.
 * @returns Parsed response data of type T.
 */
import { Subject } from "rxjs";
export class ApiService {
    constructor(config) {
        this.ws = null;
        this.retryCount = 0;
        this.dataStream = new Subject();
        this.config = config;
        this.initializeWebSocket();
    }
    initializeWebSocket() {
        if (this.ws) {
            this.ws.close();
        }
        // Safety checks to prevent invalid WebSocket connections;
        if (!this.config.websocket.url ||
            this.config.websocket.url === "" ||
            this.config.websocket.url === "wss://api.betproai.com/ws" ||
            this.config.websocket.url.includes("api.betproai.com") ||
            this.config.websocket.url.includes("localhost:8000") ||
            this.config.websocket.url.includes("localhost:8080") ||
            this.config.websocket.url.includes("localhost:3001") ||
            this.config.websocket.url.includes("localhost") ||
            import.meta.env.VITE_ENABLE_WEBSOCKET === "false" ||
            import.meta.env.NODE_ENV === "development") {
            // console statement removed:", this.config.websocket.url);
            return;
        }
        this.ws = new WebSocket(this.config.websocket.url);
        this.ws.onopen = () => {
            // console statement removed
            this.retryCount = 0;
            this.subscribeToDataFeeds();
        };
        this.ws.onmessage = (event) => {

            try {

                this.dataStream.next(parsedData);
            }
            catch (error) {
                // console statement removed
            }
        };
        this.ws.onclose = () => {
            // console statement removed
            this.handleReconnection();
        };
        this.ws.onerror = (event) => {
            // console statement removed
            this.handleReconnection();
        };
    }
    handleReconnection() {
        if (this.retryCount < this.config.websocket.maxRetries) {
            this.retryCount++;
            // console statement removed`);
            setTimeout(() => {
                this.initializeWebSocket();
            }, this.config.websocket.reconnectInterval);
        }
        else {
            // console statement removed
        }
    }
    subscribeToDataFeeds() {
        if (!this.ws)
            return;
        // Subscribe to relevant data feeds;
        const subscriptions = [
            { type: "odds_updates", markets: ["player_props"] },
            { type: "player_stats", updateInterval: 60 },
            { type: "injury_updates" },
            { type: "news_feed" },
        ];
        this.ws.send(JSON.stringify({
            action: "subscribe",
            feeds: subscriptions,
        }));
    }
    getDataStream() {
        return this.dataStream.asObservable();
    }
    async fetchPlayerStats(playerId, options = {}) {
        try {
            const response = await fetch(`${this.config.endpoints.sportradar}/players/${playerId}/stats`, {
                headers: this.getHeaders("sportradar"),
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                data,
                timestamp: Date.now(),
            };
        }
        catch (error) {
            // console statement removed
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
            };
        }
    }
    async fetchGameOdds(gameId, options = {}) {
        try {
            const queryParams = new URLSearchParams({
                markets: options.markets?.join(",") || "all",
                books: options.books?.join(",") || "all",
            });
            const response = await fetch(`${this.config.endpoints.oddsapi}/games/${gameId}/odds?${queryParams}`, {
                headers: this.getHeaders("oddsapi"),
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                data,
                timestamp: Date.now(),
            };
        }
        catch (error) {
            // console statement removed
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
            };
        }
    }
    async fetchInjuryReports(options = {}) {
        try {
            const queryParams = new URLSearchParams({
                team: options.team || "",
                status: options.status?.join(",") || "",
            });
            const response = await fetch(`${this.config.endpoints.espn}/injuries?${queryParams}`, {
                headers: this.getHeaders("espn"),
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                data,
                timestamp: Date.now(),
            };
        }
        catch (error) {
            // console statement removed
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
            };
        }
    }
    async getSocialNews(params = {}) {
        try {

            const response = await fetch(`${this.config.endpoints.social}/news?${queryParams}`, {
                headers: this.getHeaders("social"),
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                data,
                timestamp: Date.now(),
            };
        }
        catch (error) {
            // console statement removed
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
            };
        }
    }
    getHeaders(service) {
        const headers = {
            "Content-Type": "application/json",
        };

        if (apiKey) {
            headers["Authorization"] = `Bearer ${apiKey}`;
        }
        return headers;
    }
    async fetchHistoricalData(options) {
        try {
            const queryParams = new URLSearchParams({
                startDate: options.startDate,
                endDate: options.endDate,
                players: options.players?.join(",") || "",
                teams: options.teams?.join(",") || "",
                propTypes: options.propTypes?.join(",") || "",
            });
            const response = await fetch(`${this.config.endpoints.sportradar}/historical?${queryParams}`, {
                headers: this.getHeaders("sportradar"),
                method: "GET",
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return {
                success: true,
                data,
                timestamp: Date.now(),
            };
        }
        catch (error) {
            // console statement removed
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
                timestamp: Date.now(),
            };
        }
    }
    /**
     * Generic GET method for arbitrary endpoints.
     * @param url - The endpoint URL (absolute or relative).
     * @param params - Query parameters as a key-value object.
     * @returns Parsed response data of type T.
     */
    async get(url, params) {


        const response = await fetch(fullUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}
// Create and export the service instance;
export const apiService = new ApiService({
    endpoints: {
        // Vite: use import.meta.env.VITE_SPORTRADAR_API_ENDPOINT etc.
        sportradar: import.meta.env.VITE_SPORTRADAR_API_ENDPOINT || "",
        oddsapi: import.meta.env.VITE_ODDS_API_ENDPOINT || "",
        espn: import.meta.env.VITE_ESPN_API_ENDPOINT || "",
        social: import.meta.env.VITE_SOCIAL_API_ENDPOINT || "",
    },
    apiKeys: {
        sportradar: import.meta.env.VITE_SPORTRADAR_API_KEY,
        oddsapi: import.meta.env.VITE_ODDS_API_KEY,
        espn: import.meta.env.VITE_ESPN_API_KEY,
        social: import.meta.env.VITE_SOCIAL_API_KEY,
    },
    websocket: {
        url: import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8080",
        reconnectInterval: 5000,
        maxRetries: 5,
    },
});
