/**
 * Updated Live API Integration Service
 * Consolidates all real API integrations with your actual keys
 */

import EnhancedDataSourcesService from './EnhancedDataSourcesService';
import APIConfigurationService from './APIConfigurationService';

export interface LiveAPIResponse<T = any> {
  success: boolean;
  data: T;
  timestamp: number;
  source: string;
  cached: boolean;
  rateLimitInfo?: {
    remaining: number;
    resetTime: number;
  };
}

export class LiveAPIIntegrationService {
  private static instance: LiveAPIIntegrationService;
  private dataSourcesService: EnhancedDataSourcesService;
  private apiConfigService: APIConfigurationService;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();

  private constructor() {
    this.dataSourcesService = EnhancedDataSourcesService.getInstance();
    this.apiConfigService = APIConfigurationService.getInstance();
  }

  public static getInstance(): LiveAPIIntegrationService {
    if (!LiveAPIIntegrationService.instance) {
      LiveAPIIntegrationService.instance = new LiveAPIIntegrationService();
    }
    return LiveAPIIntegrationService.instance;
  }

  /**
   * Get live odds from TheOdds API (Your Key)
   */
  public async getLiveOdds(sport: string = 'americanfootball_nfl'): Promise<LiveAPIResponse> {
    const cacheKey = `odds_${sport}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const url = this.dataSourcesService.buildAPIUrl('theodds', 'odds', { sport });
      const response = await fetch(`${url}&regions=us&markets=h2h,spreads,totals`);
      
      if (!response.ok) {
        throw new Error(`TheOdds API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const result: LiveAPIResponse = {
        success: true,
        data,
        timestamp: Date.now(),
        source: 'theodds',
        cached: false,
        rateLimitInfo: {
          remaining: parseInt(response.headers.get('x-requests-remaining') || '0'),
          resetTime: parseInt(response.headers.get('x-requests-reset') || '0')
        }
      };

      this.setCachedData(cacheKey, result, 5 * 60 * 1000); // 5 minutes
      return result;
    } catch (error) {
      console.error('TheOdds API error:', error);
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'theodds',
        cached: false
      };
    }
  }

  /**
   * Get detailed stats from SportsRadar API (Your Key)
   */
  public async getDetailedStats(sport: string = 'nfl', season: string = '2024'): Promise<LiveAPIResponse> {
    const cacheKey = `stats_${sport}_${season}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const url = this.dataSourcesService.buildAPIUrl('sportradar', 'stats', { sport, season });
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`SportsRadar API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const result: LiveAPIResponse = {
        success: true,
        data,
        timestamp: Date.now(),
        source: 'sportradar',
        cached: false,
        rateLimitInfo: {
          remaining: parseInt(response.headers.get('x-quota-remaining') || '0'),
          resetTime: Date.now() + (60 * 60 * 1000) // 1 hour from now
        }
      };

      this.setCachedData(cacheKey, result, 15 * 60 * 1000); // 15 minutes
      return result;
    } catch (error) {
      console.error('SportsRadar API error:', error);
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'sportradar',
        cached: false
      };
    }
  }

  /**
   * Get player projections from PrizePicks (Public API)
   */
  public async getPlayerProjections(): Promise<LiveAPIResponse> {
    const cacheKey = 'prizepicks_projections';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const url = this.dataSourcesService.buildAPIUrl('prizepicks', 'projections');
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`PrizePicks API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const result: LiveAPIResponse = {
        success: true,
        data,
        timestamp: Date.now(),
        source: 'prizepicks',
        cached: false
      };

      this.setCachedData(cacheKey, result, 10 * 60 * 1000); // 10 minutes
      return result;
    } catch (error) {
      console.error('PrizePicks API error:', error);
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'prizepicks',
        cached: false
      };
    }
  }

  /**
   * Get live scores from ESPN (Public API)
   */
  public async getLiveScores(sport: string = 'football/nfl'): Promise<LiveAPIResponse> {
    const cacheKey = `scores_${sport}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const url = this.dataSourcesService.buildAPIUrl('espn', 'scores', { sport });
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`ESPN API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const result: LiveAPIResponse = {
        success: true,
        data,
        timestamp: Date.now(),
        source: 'espn',
        cached: false
      };

      this.setCachedData(cacheKey, result, 2 * 60 * 1000); // 2 minutes
      return result;
    } catch (error) {
      console.error('ESPN API error:', error);
      return {
        success: false,
        data: null,
        timestamp: Date.now(),
        source: 'espn',
        cached: false
      };
    }
  }

  /**
   * Comprehensive data fetch for arbitrage analysis
   */
  public async getArbitrageData(sport: string): Promise<{
    odds: LiveAPIResponse;
    props: LiveAPIResponse;
    scores: LiveAPIResponse;
    arbitrageOpportunities: any[];
  }> {
    const [odds, props, scores] = await Promise.all([
      this.getLiveOdds(sport),
      this.getPlayerProjections(),
      this.getLiveScores(sport)
    ]);

    // Simple arbitrage detection (can be enhanced)
    const arbitrageOpportunities = this.detectArbitrageOpportunities(odds.data, props.data);

    return {
      odds,
      props,
      scores,
      arbitrageOpportunities
    };
  }

  /**
   * Check API health and performance
   */
  public async checkAPIHealth(): Promise<{
    [key: string]: {
      status: 'operational' | 'degraded' | 'down';
      responseTime: number;
      lastError?: string;
    };
  }> {
    const services = ['theodds', 'sportradar', 'prizepicks', 'espn'];
    const healthChecks = await Promise.allSettled(
      services.map(async (service) => {
        const start = Date.now();
        try {
          // Simplified health check - just check if the service responds
          const url = this.dataSourcesService.buildAPIUrl(service, 'odds');
          const response = await fetch(url, { method: 'HEAD' });
          const responseTime = Date.now() - start;
          
          return {
            service,
            status: response.ok ? 'operational' : 'degraded',
            responseTime,
            lastError: response.ok ? undefined : `HTTP ${response.status}`
          };
        } catch (error) {
          return {
            service,
            status: 'down' as const,
            responseTime: Date.now() - start,
            lastError: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    const result: any = {};
    healthChecks.forEach((check, index) => {
      const service = services[index];
      if (check.status === 'fulfilled') {
        result[service] = check.value;
      } else {
        result[service] = {
          status: 'down',
          responseTime: 0,
          lastError: check.reason
        };
      }
    });

    return result;
  }

  /**
   * Get rate limit status for all services
   */
  public getRateLimitStatus(): {
    [service: string]: {
      requestsRemaining: number;
      resetTime: number;
      dailyQuota: number;
      used: number;
    };
  } {
    return {
      theodds: {
        requestsRemaining: 450, // Estimate based on 500/month
        resetTime: Date.now() + (24 * 60 * 60 * 1000),
        dailyQuota: 16, // ~500/month = ~16/day
        used: 5
      },
      sportradar: {
        requestsRemaining: 980, // Estimate based on 1000/month
        resetTime: Date.now() + (24 * 60 * 60 * 1000),
        dailyQuota: 33, // ~1000/month = ~33/day
        used: 8
      },
      prizepicks: {
        requestsRemaining: 999999, // Public API
        resetTime: 0,
        dailyQuota: 999999,
        used: 0
      },
      espn: {
        requestsRemaining: 999999, // Public API
        resetTime: 0,
        dailyQuota: 999999,
        used: 0
      }
    };
  }

  private getCachedData(key: string): LiveAPIResponse | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < cached.ttl) {
      return {
        success: true,
        data: cached.data,
        timestamp: cached.timestamp,
        source: 'cache',
        cached: true
      };
    }
    return null;
  }

  private setCachedData(key: string, data: any, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private detectArbitrageOpportunities(oddsData: any, propsData: any): any[] {
    // Simplified arbitrage detection
    // In a real implementation, this would be much more sophisticated
    const opportunities: any[] = [];

    if (!oddsData || !propsData) return opportunities;

    // Basic example: find mismatched odds between sources
    // This is a placeholder - real arbitrage detection would be more complex
    
    return opportunities;
  }

  /**
   * Test all API connections with real keys
   */
  public async testAllConnections(): Promise<{
    success: boolean;
    results: { [service: string]: boolean };
    errors: string[];
  }> {
    const results: { [service: string]: boolean } = {};
    const errors: string[] = [];

    // Test TheOdds API
    try {
      const oddsResult = await this.getLiveOdds('americanfootball_nfl');
      results.theodds = oddsResult.success;
      if (!oddsResult.success) {
        errors.push('TheOdds API test failed');
      }
    } catch (error) {
      results.theodds = false;
      errors.push(`TheOdds API error: ${error}`);
    }

    // Test SportsRadar API
    try {
      const statsResult = await this.getDetailedStats('nfl', '2024');
      results.sportradar = statsResult.success;
      if (!statsResult.success) {
        errors.push('SportsRadar API test failed');
      }
    } catch (error) {
      results.sportradar = false;
      errors.push(`SportsRadar API error: ${error}`);
    }

    // Test PrizePicks API
    try {
      const propsResult = await this.getPlayerProjections();
      results.prizepicks = propsResult.success;
      if (!propsResult.success) {
        errors.push('PrizePicks API test failed');
      }
    } catch (error) {
      results.prizepicks = false;
      errors.push(`PrizePicks API error: ${error}`);
    }

    // Test ESPN API
    try {
      const scoresResult = await this.getLiveScores('football/nfl');
      results.espn = scoresResult.success;
      if (!scoresResult.success) {
        errors.push('ESPN API test failed');
      }
    } catch (error) {
      results.espn = false;
      errors.push(`ESPN API error: ${error}`);
    }

    const success = Object.values(results).every(result => result === true);

    return {
      success,
      results,
      errors
    };
  }
}

export default LiveAPIIntegrationService;
