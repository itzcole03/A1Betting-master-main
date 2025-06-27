// No separate PrizePicksAdapter file exists; using implementation from this file.
import { logger } from "../logger";
import { cache } from "../cache";
export class PrizePicksAdapterImpl {
    constructor() {
        this.baseUrl =
            import.meta.env.VITE_PRIZEPICKS_API_URL || "https://api.prizepicks.com";
        this.apiKey = import.meta.env.VITE_PRIZEPICKS_API_KEY || "";
    }
    static getInstance() {
        if (!PrizePicksAdapterImpl.instance) {
            PrizePicksAdapterImpl.instance = new PrizePicksAdapterImpl();
        }
        return PrizePicksAdapterImpl.instance;
    }
    async fetchProps(params) {
        try {


            if (cachedProps) {
                return cachedProps;
            }
            const response = await fetch(`${this.baseUrl}/props`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch props: ${response.statusText}`);
            }

            await cache.set(cacheKey, props);
            return props;
        }
        catch (error) {
            logger.error("Failed to fetch PrizePicks props", { error, params });
            throw error;
        }
    }
    async fetchPlayers(params) {
        try {


            if (cachedPlayers) {
                return cachedPlayers;
            }
            const response = await fetch(`${this.baseUrl}/players`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch players: ${response.statusText}`);
            }

            await cache.set(cacheKey, players);
            return players;
        }
        catch (error) {
            logger.error("Failed to fetch PrizePicks players", { error, params });
            throw error;
        }
    }
    async fetchLines(params) {
        try {


            if (cachedLines) {
                return cachedLines;
            }
            const response = await fetch(`${this.baseUrl}/lines`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(params),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch lines: ${response.statusText}`);
            }

            await cache.set(cacheKey, lines);
            return lines;
        }
        catch (error) {
            logger.error("Failed to fetch PrizePicks lines", { error, params });
            throw error;
        }
    }
}
export const prizePicksAdapter = PrizePicksAdapterImpl.getInstance();
export default prizePicksAdapter;
