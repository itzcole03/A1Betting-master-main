/**
 * Enhanced SportsRadar API Service;
 * Integrates with multiple SportsRadar APIs for comprehensive sports data;
 */

export interface SportsRadarAPIEndpoints {
  // Odds Comparison APIs;
  oddsComparison: {
    prematch: string;
    playerProps: string;
    futures: string;
    regular: string;
  };

  // Sports APIs;
  sports: {
    nba: string;
    wnba: string;
    nfl: string;
    nhl: string;
    mlb: string;
    soccer: string;
    tennis: string;
    golf: string;
    mma: string;
  };
}

export interface SportsRadarConfig {
  apiKey: string;
  baseUrl: string;
  rateLimit: number;
  quotaLimit: number;
  cacheTTL: number;
}

export interface OddsData {
  eventId: string;
  sport: string;
  homeTeam: string;
  awayTeam: string;
  odds: {
    moneyline: {
      home: number;
      away: number;
    };
    spread: {
      line: number;
      home: number;
      away: number;
    };
    total: {
      line: number;
      over: number;
      under: number;
    };
  };
  playerProps?: Array<{
    playerId: string;
    playerName: string;
    propType: string;
    line: number;
    overOdds: number;
    underOdds: number;
  }>;
  timestamp: string;
}

export interface PlayerStatsData {
  playerId: string;
  playerName: string;
  team: string;
  position: string;
  season: string;
  stats: {
    games: number;
    points: number;
    rebounds: number;
    assists: number;
    [key: string]: number;
  };
  recentForm: Array<{
    gameId: string;
    date: string;
    opponent: string;
    stats: Record<string, number>;
  }>;
}

export interface GameData {
  gameId: string;
  sport: string;
  status: "scheduled" | "live" | "completed";
  scheduled: string;
  homeTeam: {
    id: string;
    name: string;
    abbreviation: string;
  };
  awayTeam: {
    id: string;
    name: string;
    abbreviation: string;
  };
  score?: {
    home: number;
    away: number;
  };
  period?: {
    current: number;
    timeRemaining?: string;
  };
}

export class EnhancedSportsRadarService {
  private config: SportsRadarConfig;
  private cache: Map<string, { data: any; timestamp: number }>;
  private requestQueue: Array<() => Promise<any>>;
  private lastRequestTime: number;

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_SPORTRADAR_API_KEY || "",
      baseUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
      rateLimit: parseInt(import.meta.env.VITE_SPORTSRADAR_RATE_LIMIT || "1"),
      quotaLimit: parseInt(
        import.meta.env.VITE_SPORTSRADAR_QUOTA_LIMIT || "1000",
      ),
      cacheTTL: parseInt(
        import.meta.env.VITE_SPORTSRADAR_CACHE_TTL || "300000",
      ),
    };

    this.cache = new Map();
    this.requestQueue = [];
    this.lastRequestTime = 0;
  }

  /**
   * Generic API request method with rate limiting and caching;
   */
  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, string> = {},
  ): Promise<T> {

    // Check cache first;

    if (cached && Date.now() - cached.timestamp < this.config.cacheTTL) {
      return cached.data;
    }

    // Rate limiting - ensure we don't exceed 1 QPS;



    if (timeSinceLastRequest < minInterval) {
      await new Promise((resolve) =>
        setTimeout(resolve, minInterval - timeSinceLastRequest),
      );
    }



    try {
      this.lastRequestTime = Date.now();

      if (!response.ok) {

        // Handle graceful degradation responses;
        if (response.status === 503 && errorData.suggestion) {
          // console statement removed
          // Return the fallback data if available;
          if (errorData.games || errorData.odds || errorData.sports) {
            return errorData;
          }
        }

        throw new Error(
          `Backend API error: ${response.status} ${response.statusText}`,
        );
      }

      // Cache the response;
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  /**
   * Get NBA games and schedule;
   */
  async getNBAGames(date?: string): Promise<GameData[]> {


    return await this.makeRequest<GameData[]>(endpoint);
  }

  /**
   * Get player statistics;
   */
  async getPlayerStats(
    sport: string,
    playerId: string,
    season?: string,
  ): Promise<PlayerStatsData | null> {


    return await this.makeRequest<PlayerStatsData>(endpoint, params);
  }

  /**
   * Get odds comparison data;
   */
  async getOddsComparison(
    sport: string,
    eventId?: string,
  ): Promise<OddsData[]> {


    return await this.makeRequest<OddsData[]>(endpoint, params);
  }

  /**
   * Get player props odds;
   */
  async getPlayerPropsOdds(
    sport: string,
    eventId: string,
  ): Promise<OddsData["playerProps"]> {

    return await this.makeRequest<OddsData["playerProps"]>(endpoint);
  }

  /**
   * Health check to verify API access;
   */
  async healthCheck(): Promise<{ status: string; availableAPIs: string[] }> {

    return await this.makeRequest<{ status: string; availableAPIs: string[] }>(
      endpoint,
    );
  }

  /**
   * Clear cache;
   */
  clearCache(): void {
    this.cache.clear();
    // Also clear backend cache;
    fetch(`${this.config.baseUrl}/api/sportsradar/cache`, {
      method: "DELETE",
    }).catch(console.warn);
  }

  /**
   * Get cache statistics;
   */
  getCacheStats(): { size: number; totalRequests: number } {
    return {
      size: this.cache.size,
      totalRequests: this.cache.size,
    };
  }
}

// Export singleton instance;
export const sportsRadarService = new EnhancedSportsRadarService();
