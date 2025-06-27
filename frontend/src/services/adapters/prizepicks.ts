import {
  PrizePicksProps,
  PrizePicksPlayer,
  PrizePicksLines,
} from '@/types/prizePicks.ts';
// No separate PrizePicksAdapter file exists; using implementation from this file.
import { logger } from '@/logger.ts';
import { cache } from '@/cache.ts';

export class PrizePicksAdapterImpl {
  private static instance: PrizePicksAdapterImpl;
  private baseUrl: string;
  private apiKey: string;

  private constructor() {
    this.baseUrl =
      import.meta.env.VITE_PRIZEPICKS_API_URL || "https://api.prizepicks.com";
    this.apiKey = import.meta.env.VITE_PRIZEPICKS_API_KEY || "";
  }

  public static getInstance(): PrizePicksAdapterImpl {
    if (!PrizePicksAdapterImpl.instance) {
      PrizePicksAdapterImpl.instance = new PrizePicksAdapterImpl();
    }
    return PrizePicksAdapterImpl.instance;
  }

  public async fetchProps(params: {
    sports: string[];
    timeWindow: string;
  }): Promise<PrizePicksProps[]> {
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
    } catch (error) {
      logger.error("Failed to fetch PrizePicks props", { error, params });
      throw error;
    }
  }

  public async fetchPlayers(params: {
    sports: string[];
  }): Promise<PrizePicksPlayer[]> {
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
    } catch (error) {
      logger.error("Failed to fetch PrizePicks players", { error, params });
      throw error;
    }
  }

  public async fetchLines(params: {
    propIds: string[];
  }): Promise<PrizePicksLines[]> {
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
    } catch (error) {
      logger.error("Failed to fetch PrizePicks lines", { error, params });
      throw error;
    }
  }
}

export const prizePicksAdapter = PrizePicksAdapterImpl.getInstance();
export default prizePicksAdapter;
