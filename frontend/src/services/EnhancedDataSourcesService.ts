/**
 * Enhanced Data Sources Configuration;
 * Optimized for your specific API keys and data sources;
 */

import APIConfigurationService from './APIConfigurationService.ts';

export interface DataSourceConfig {
  name: string;
  type: 'primary' | 'secondary' | 'fallback';
  endpoints: {
    base: string;
    odds?: string;
    stats?: string;
    projections?: string;
    scores?: string;
  };
  apiKey: string;
  enabled: boolean;
  priority: number;
  capabilities: string[];
}

export class EnhancedDataSourcesService {
  private static instance: EnhancedDataSourcesService;
  private apiConfig: APIConfigurationService;
  private dataSources: Map<string, DataSourceConfig> = new Map();

  private constructor() {
    this.apiConfig = APIConfigurationService.getInstance();
    this.initializeDataSources();
  }

  public static getInstance(): EnhancedDataSourcesService {
    if (!EnhancedDataSourcesService.instance) {
      EnhancedDataSourcesService.instance = new EnhancedDataSourcesService();
    }
    return EnhancedDataSourcesService.instance;
  }

  private initializeDataSources(): void {
    // PRIMARY: TheOdds API (Your Key) - Main odds source;
    this.dataSources.set('theodds', {
      name: 'TheOdds API',
      type: 'primary',
      endpoints: {
        base: 'https://api.the-odds-api.com/v4',
        odds: '/sports/{sport}/odds',
        scores: '/sports/{sport}/scores'
      },
      apiKey: '8684be37505fc5ce63b0337d472af0ee',
      enabled: true,
      priority: 1,
      capabilities: ['live_odds', 'line_movements', 'multiple_bookmakers', 'arbitrage_detection']
    });

    // PRIMARY: SportsRadar API (Your Key) - Main stats source;  
    this.dataSources.set('sportradar', {
      name: 'SportsRadar',
      type: 'primary',
      endpoints: {
        base: 'https://api.sportradar.us',
        stats: '/{sport}/trial/v7/en/seasons/{season}/statistics',
        scores: '/{sport}/trial/v7/en/games/{date}/schedule'
      },
      apiKey: 'R10yQbjTO5fZF6BPkfxjOaftsyN9X4ImAJv95H7s',
      enabled: true,
      priority: 1,
      capabilities: ['detailed_stats', 'player_analytics', 'team_performance', 'historical_data']
    });

    // PRIMARY: PrizePicks API (Public) - Main props source;
    this.dataSources.set('prizepicks', {
      name: 'PrizePicks',
      type: 'primary',
      endpoints: {
        base: 'https://api.prizepicks.com',
        projections: '/projections',
        odds: '/projections'
      },
      apiKey: 'public_access',
      enabled: true,
      priority: 1,
      capabilities: ['player_props', 'prop_lines', 'pick_suggestions', 'daily_fantasy']
    });

    // SECONDARY: ESPN API (Public) - Scores and schedules;
    this.dataSources.set('espn', {
      name: 'ESPN',
      type: 'secondary',
      endpoints: {
        base: 'https://site.api.espn.com/apis/site/v2/sports',
        scores: '/{sport}/scoreboard',
        stats: '/{sport}/teams/{team}/statistics'
      },
      apiKey: 'public_access',
      enabled: true,
      priority: 2,
      capabilities: ['live_scores', 'schedules', 'basic_stats', 'team_info']
    });

    // FALLBACK: Open Weather (Public) - Weather data;
    this.dataSources.set('weather', {
      name: 'Open-Meteo Weather',
      type: 'fallback',
      endpoints: {
        base: 'https://api.open-meteo.com/v1',
        odds: '/forecast'
      },
      apiKey: 'public_access',
      enabled: true,
      priority: 3,
      capabilities: ['weather_conditions', 'game_weather', 'outdoor_sports']
    });

    // FALLBACK: Sports News RSS (Public) - News and injuries;
    this.dataSources.set('news', {
      name: 'Sports News Aggregator',
      type: 'fallback',
      endpoints: {
        base: 'https://rss.espn.com/rss',
        odds: '/{sport}/news'
      },
      apiKey: 'public_access',
      enabled: true,
      priority: 3,
      capabilities: ['injury_reports', 'team_news', 'player_updates', 'trade_news']
    });
  }

  public getPrimaryOddsSource(): DataSourceConfig | null {
    return this.dataSources.get('theodds') || null;
  }

  public getPrimaryStatsSource(): DataSourceConfig | null {
    return this.dataSources.get('sportradar') || null;
  }

  public getPrimaryPropsSource(): DataSourceConfig | null {
    return this.dataSources.get('prizepicks') || null;
  }

  public getDataSourceByCapability(capability: string): DataSourceConfig[] {
    const sources: DataSourceConfig[] = [];
    
    for (const source of this.dataSources.values()) {
      if (source.enabled && source.capabilities.includes(capability)) {
        sources.push(source);
      }
    }

    // Sort by priority (lower number = higher priority)
    return sources.sort((a, b) => a.priority - b.priority);
  }

  public buildAPIUrl(sourceName: string, endpoint: string, params: Record<string, string> = {}): string {

    if (!source) return '';

    const url = source.endpoints.base;
    
    // Add specific endpoint;
    if (endpoint === 'odds' && source.endpoints.odds) {
      url += source.endpoints.odds;
    } else if (endpoint === 'stats' && source.endpoints.stats) {
      url += source.endpoints.stats;
    } else if (endpoint === 'projections' && source.endpoints.projections) {
      url += source.endpoints.projections;
    } else if (endpoint === 'scores' && source.endpoints.scores) {
      url += source.endpoints.scores;
    }

    // Replace parameters in URL;
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`{${key}}`, value);
    }

    // Add API key for services that require it;
    if (source.apiKey !== 'public_access') {

      if (sourceName === 'theodds') {
        url += `${separator}apiKey=${source.apiKey}`;
      } else if (sourceName === 'sportradar') {
        url += `${separator}api_key=${source.apiKey}`;
      }
    }

    return url;
  }

  public getOptimalDataStrategy(): {
    odds: string;
    stats: string;
    props: string;
    scores: string;
    arbitrage: string[];
  } {
    return {
      odds: 'theodds',           // Your TheOdds API for live odds;
      stats: 'sportradar',       // Your SportsRadar API for detailed stats;
      props: 'prizepicks',       // Public PrizePicks API for props;
      scores: 'espn',            // Public ESPN API for live scores;
      arbitrage: ['theodds', 'prizepicks', 'espn'] // Multiple sources for arbitrage;
    };
  }

  public getServiceHealth(): Record<string, {
    status: 'operational' | 'degraded' | 'down';
    lastCheck: number;
    responseTime: number;
    errorRate: number;
  }> {
    // This would be updated by health check service;
    return {
      theodds: { status: 'operational', lastCheck: Date.now(), responseTime: 200, errorRate: 0 },
      sportradar: { status: 'operational', lastCheck: Date.now(), responseTime: 350, errorRate: 0 },
      prizepicks: { status: 'operational', lastCheck: Date.now(), responseTime: 150, errorRate: 0 },
      espn: { status: 'operational', lastCheck: Date.now(), responseTime: 180, errorRate: 0 },
      weather: { status: 'operational', lastCheck: Date.now(), responseTime: 120, errorRate: 0 },
      news: { status: 'operational', lastCheck: Date.now(), responseTime: 250, errorRate: 0 }
    };
  }

  public getDataSourceRecommendations(): {
    sport: string;
    sources: { primary: string; fallback: string[] };
  }[] {
    return [
      {
        sport: 'NFL',
        sources: {
          primary: 'sportradar',
          fallback: ['theodds', 'espn', 'prizepicks']
        }
      },
      {
        sport: 'NBA',
        sources: {
          primary: 'sportradar',
          fallback: ['theodds', 'prizepicks', 'espn']
        }
      },
      {
        sport: 'MLB',
        sources: {
          primary: 'sportradar',
          fallback: ['theodds', 'espn', 'weather']
        }
      },
      {
        sport: 'NHL',
        sources: {
          primary: 'sportradar',
          fallback: ['theodds', 'espn']
        }
      },
      {
        sport: 'ESPORTS',
        sources: {
          primary: 'theodds',
          fallback: ['espn', 'news']
        }
      }
    ];
  }

  public validateDataSources(): {
    valid: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check if we have primary sources for critical data;



    if (!theodds?.enabled) {
      issues.push('TheOdds API not enabled - primary odds source unavailable');
    }

    if (!sportradar?.enabled) {
      issues.push('SportsRadar API not enabled - primary stats source unavailable');
    }

    if (!prizepicks?.enabled) {
      issues.push('PrizePicks API not enabled - primary props source unavailable');
    }

    // Recommendations;
    if (theodds?.enabled && sportradar?.enabled) {
      recommendations.push('Excellent: Both premium APIs active - optimal data quality expected');
    }

    if (prizepicks?.enabled) {
      recommendations.push('PrizePicks integration active - prop betting opportunities available');
    }

    recommendations.push('Consider implementing data caching to optimize API usage');
    recommendations.push('Monitor API rate limits to prevent service disruption');

    return {
      valid: issues.length === 0,
      issues,
      recommendations;
    };
  }
}

export default EnhancedDataSourcesService;
