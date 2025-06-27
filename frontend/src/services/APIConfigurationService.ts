/**
 * API Configuration Service for A1Betting;
 * Manages API keys and endpoints for live data sources;
 */

export interface APIConfig {
  name: string;
  endpoint: string;
  apiKey: string;
  enabled: boolean;
  rateLimit: {
    requestsPerMinute: number;
    burstLimit: number;
  };
  timeout: number;
}

export class APIConfigurationService {
  private static instance: APIConfigurationService;
  private configs: Map<string, APIConfig> = new Map();

  private constructor() {
    this.initializeConfigurations();
  }

  public static getInstance(): APIConfigurationService {
    if (!APIConfigurationService.instance) {
      APIConfigurationService.instance = new APIConfigurationService();
    }
    return APIConfigurationService.instance;
  }

  private initializeConfigurations(): void {
    // SportsRadar API Configuration (YOUR KEY)
    this.configs.set('sportradar', {
      name: 'SportsRadar',
      endpoint: 'https://api.sportradar.us',
      apiKey: 'R10yQbjTO5fZF6BPkfxjOaftsyN9X4ImAJv95H7s',
      enabled: true,
      rateLimit: {
        requestsPerMinute: 30, // SportsRadar typically allows 1000/month;
        burstLimit: 5;
      },
      timeout: 15000;
    });

    // TheOdds API Configuration (YOUR KEY)
    this.configs.set('theodds', {
      name: 'TheOdds API',
      endpoint: 'https://api.the-odds-api.com',
      apiKey: '8684be37505fc5ce63b0337d472af0ee',
      enabled: true,
      rateLimit: {
        requestsPerMinute: 60, // TheOdds typically allows 500/month;
        burstLimit: 10;
      },
      timeout: 10000;
    });

    // PrizePicks API Configuration (PUBLIC ACCESS)
    this.configs.set('prizepicks', {
      name: 'PrizePicks',
      endpoint: 'https://api.prizepicks.com',
      apiKey: 'public_access',
      enabled: true,
      rateLimit: {
        requestsPerMinute: 120, // More generous for public API;
        burstLimit: 20;
      },
      timeout: 8000;
    });

    // ESPN API Configuration (PUBLIC ACCESS)
    this.configs.set('espn', {
      name: 'ESPN',
      endpoint: 'https://site.api.espn.com/apis/site',
      apiKey: 'public_access',
      enabled: true,
      rateLimit: {
        requestsPerMinute: 60,
        burstLimit: 15;
      },
      timeout: 10000;
    });

    // Open Weather API (FREE PUBLIC ACCESS)
    this.configs.set('weather', {
      name: 'Open-Meteo Weather',
      endpoint: 'https://api.open-meteo.com',
      apiKey: 'public_access',
      enabled: true,
      rateLimit: {
        requestsPerMinute: 120,
        burstLimit: 30;
      },
      timeout: 5000;
    });

    // News API (RSS FEEDS - PUBLIC ACCESS)
    this.configs.set('news', {
      name: 'Sports News Aggregator',
      endpoint: 'https://rss.espn.com/rss/nfl/news',
      apiKey: 'public_access',
      enabled: true,
      rateLimit: {
        requestsPerMinute: 30,
        burstLimit: 10;
      },
      timeout: 8000;
    });
  }

  public getConfig(service: string): APIConfig | null {
    return this.configs.get(service) || null;
  }

  public getAllConfigs(): Map<string, APIConfig> {
    return new Map(this.configs);
  }

  public isServiceEnabled(service: string): boolean {

    return config ? config.enabled : false;
  }

  public updateConfig(service: string, updates: Partial<APIConfig>): void {

    if (existing) {
      this.configs.set(service, { ...existing, ...updates });
    }
  }

  public getServiceEndpoint(service: string): string {

    return config ? config.endpoint : '';
  }

  public getServiceKey(service: string): string {

    return config ? config.apiKey : '';
  }

  public getRateLimit(service: string): { requestsPerMinute: number; burstLimit: number } {

    return config ? config.rateLimit : { requestsPerMinute: 60, burstLimit: 10 };
  }

  public getTimeout(service: string): number {

    return config ? config.timeout : 10000;
  }

  public validateConfiguration(): { valid: boolean; issues: string[] } {
    const issues: string[] = [];
    const valid = true;

    // Check critical services;

    for (const service of criticalServices) {

      if (!config) {
        issues.push(`Missing configuration for critical service: ${service}`);
        valid = false;
      } else if (!config.enabled) {
        issues.push(`Critical service disabled: ${service}`);
      } else if (!config.apiKey || config.apiKey === 'your_key_here') {
        if (service !== 'prizepicks') { // PrizePicks is public;
          issues.push(`Invalid API key for service: ${service}`);
          valid = false;
        }
      }
    }

    return { valid, issues };
  }

  public getServiceStatus(): Record<string, { status: 'active' | 'disabled' | 'error'; message: string }> {
    const status: Record<string, { status: 'active' | 'disabled' | 'error'; message: string }> = {};

    for (const [service, config] of this.configs) {
      if (!config.enabled) {
        status[service] = { status: 'disabled', message: 'Service disabled in configuration' };
      } else if (config.apiKey === 'your_key_here' || !config.apiKey) {
        status[service] = { status: 'error', message: 'Invalid or missing API key' };
      } else {
        status[service] = { status: 'active', message: 'Service configured and ready' };
      }
    }

    return status;
  }

  public getPrimaryDataSources(): { odds: string; stats: string; props: string; weather: string } {
    return {
      odds: 'theodds',      // Your TheOdds API key;
      stats: 'sportradar',  // Your SportsRadar API key;  
      props: 'prizepicks',  // Public API access;
      weather: 'weather'    // Free weather API;
    };
  }

  public getAPIUsageGuidelines(): Record<string, string> {
    return {
      sportradar: 'Use for detailed player stats, team analytics, and historical data. Rate limited to 30 requests/minute.',
      theodds: 'Primary source for live odds, line movements, and bookmaker data. Rate limited to 60 requests/minute.',
      prizepicks: 'Public API for player props and projection data. Use https://api.prizepicks.com/projections endpoint.',
      espn: 'Public API for scores, schedules, and basic team information. No authentication required.',
      weather: 'Free weather data for outdoor games. No authentication required.',
      news: 'RSS feeds for sports news and injury reports. No authentication required.'
    };
  }
}

export default APIConfigurationService;
