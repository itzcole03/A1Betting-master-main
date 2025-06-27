/**
 * API Health Check Utility;
 * Provides centralized health checking and fallback mechanisms;
 */

import { api } from '@/services/integrationService.ts';

interface ApiHealthResult {
  isOnline: boolean;
  lastCheck: string;
  services: {
    backend: boolean;
    analytics: boolean;
    predictions: boolean;
  };
  fallbackMode: boolean;
}

class ApiHealthChecker {
  private static instance: ApiHealthChecker;
  private healthCache: ApiHealthResult | null = null;
  private lastCheckTime = 0;
  private readonly CACHE_DURATION = 30000; // 30 seconds;

  private constructor() {}

  public static getInstance(): ApiHealthChecker {
    if (!ApiHealthChecker.instance) {
      ApiHealthChecker.instance = new ApiHealthChecker();
    }
    return ApiHealthChecker.instance;
  }

  /**
   * Check API health with caching;
   */
  public async checkHealth(): Promise<ApiHealthResult> {

    // Return cached result if still valid;
    if (this.healthCache && now - this.lastCheckTime < this.CACHE_DURATION) {
      return this.healthCache;
    }

    const result: ApiHealthResult = {
      isOnline: false,
      lastCheck: new Date().toISOString(),
      services: {
        backend: false,
        analytics: false,
        predictions: false,
      },
      fallbackMode: false,
    };

    try {
      // Test main health endpoint;

      result.services.backend = healthStatus.status === "online";
      result.isOnline = result.services.backend;

      // Test analytics endpoint;
      try {
        await api.getUserAnalytics("default_user");
        result.services.analytics = true;
      } catch (error) {
        result.services.analytics = false;
      }

      // Test predictions endpoint;
      try {
        await api.getBettingOpportunities(undefined, 1);
        result.services.predictions = true;
      } catch (error) {
        result.services.predictions = false;
      }
    } catch (error) {
      // console statement removed
      result.fallbackMode = true;
    }

    // Update cache;
    this.healthCache = result;
    this.lastCheckTime = now;

    return result;
  }

  /**
   * Get cached health status without making new requests;
   */
  public getCachedHealth(): ApiHealthResult | null {
    return this.healthCache;
  }

  /**
   * Force refresh health status;
   */
  public async forceRefresh(): Promise<ApiHealthResult> {
    this.healthCache = null;
    this.lastCheckTime = 0;
    return await this.checkHealth();
  }

  /**
   * Check if we should use fallback data;
   */
  public shouldUseFallback(): boolean {
    if (!this.healthCache) return true;
    return this.healthCache.fallbackMode || !this.healthCache.isOnline;
  }
}

// Export singleton instance;
export const apiHealthChecker = ApiHealthChecker.getInstance();

/**
 * Wrapper for API calls with automatic fallback;
 */
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallbackData: T,
  serviceName = "API",
): Promise<{ data: T; fromFallback: boolean }> {
  try {

    return { data, fromFallback: false };
  } catch (error) {
    // console statement removed
    // In production, consider throwing the error instead of using fallback;
    return { data: fallbackData, fromFallback: true };
  }
}

/**
 * Get fallback data for common API endpoints;
 * WARNING: This should only be used for development/testing, not production;
 */
export const fallbackData = {
  userAnalytics: {
    current_balance: 3250,
    total_profit: 890,
    win_rate: 0.67,
    roi: 0.128,
    daily: {},
    monthly_profit: 340,
    total_wagered: 12500,
    max_drawdown: -150,
  },

  healthStatus: {
    status: "offline",
    services: {},
    uptime: 0,
    version: "offline",
    metrics: {
      active_predictions: 0,
      active_connections: 0,
      api_calls_per_minute: 0,
      average_response_time: 0,
    },
  },

  bettingOpportunities: [
    {
      id: "fallback_1",
      sport: "NBA",
      event: "Lakers vs Warriors",
      market: "Spread",
      odds: 1.95,
      probability: 0.85,
      expected_value: 0.05,
      confidence: 0.88,
      recommendation: "Strong Buy - High value detected",
    },
  ],
};

export default apiHealthChecker;
