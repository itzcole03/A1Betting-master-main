import { DailyFantasyAdapter, DailyFantasyData } from '@/adapters/DailyFantasyAdapter.ts';
import { DataSource } from './DataSource.ts';
import { ESPNAdapter } from '@/adapters/ESPNAdapter.ts';
import { EventBus } from '@/core/EventBus.ts';
import { PerformanceMonitor } from './PerformanceMonitor.ts';
import { PrizePicksAdapter, PrizePicksData } from '@/betaTest4/src/adapters/PrizePicksAdapter.ts';
import { SocialSentimentAdapter, SocialSentimentData } from '@/adapters/SocialSentimentAdapter.ts';
import { SportsRadarAdapter, SportsRadarData } from '@/adapters/SportsRadarAdapter.ts';
import { TheOddsAdapter, TheOddsData } from '@/adapters/TheOddsAdapter.ts';



export interface IntegratedData {
  timestamp: number;
  projections: {
    [playerId: string]: {
      stats: Record<string, number>;
      confidence: number;
      lastUpdated: number;
    };
  };
  sentiment: {
    [playerId: string]: SocialSentimentData;
  };
  odds: {
    [eventId: string]: {
      markets: Record<string, number>;
      movement: {
        direction: 'up' | 'down' | 'stable';
        magnitude: number;
      };
    };
  };
  injuries: {
    [playerId: string]: {
      status: string;
      details: string;
      impact: number;
      timeline: string;
    };
  };
  trends: {
    [metric: string]: {
      value: number;
      change: number;
      significance: number;
    };
  };
}

export interface DataSourceMetrics {
  latency: number;
  reliability: number;
  accuracy: number;
  lastSync: number;
}

interface DataCorrelation {
  sourceA: string;
  sourceB: string;
  correlation: number;
  significance: number;
  timestamp: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  correlations: DataCorrelation[];
  confidence: number;
}

export class DataIntegrationHub {
  private static instance: DataIntegrationHub;
  private readonly eventBus: EventBus;
  private readonly performanceMonitor: PerformanceMonitor;
  private readonly dataSources: Map<string, DataSource<any>>;
  private readonly sourceMetrics: Map<string, DataSourceMetrics>;
  private integratedData: IntegratedData;
  private correlationCache: Map<string, DataCorrelation[]>;
  private dataCache: Map<string, CacheEntry<any>>;
  private syncInterval: number;
  private isRealTimeEnabled: boolean;

  private constructor() {
    this.eventBus = EventBus.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
    this.dataSources = new Map<string, DataSource<any>>();
    this.sourceMetrics = new Map();
    this.correlationCache = new Map();
    this.dataCache = new Map();
    this.integratedData = this.initializeIntegratedData();
    this.syncInterval = 30000; // 30 seconds default;
    this.isRealTimeEnabled = false;

    // Register all adapters;

    this.registerDataSource(espnAdapter);

    this.registerDataSource(socialSentimentAdapter);

    // Configure and register TheOddsAdapter;

    if (theOddsApiKey) {
      const theOddsAdapter = new TheOddsAdapter({
        apiKey: theOddsApiKey,
        baseUrl: 'https://api.the-odds-api.com/v4',
        cacheTimeout: 300000; 
      });
      this.registerDataSource(theOddsAdapter);
    } else {
      // console statement removed
    }

    // Configure and register SportsRadarAdapter;

    if (sportsRadarApiKey) {
      const sportsRadarAdapter = new SportsRadarAdapter({
        apiKey: sportsRadarApiKey,
        baseUrl: 'https://api.sportradar.us',
        cacheTimeout: 300000; 
      });
      this.registerDataSource(sportsRadarAdapter);
    } else {
      // console statement removed
    }

    // Configure and register DailyFantasyAdapter;

    if (dailyFantasyApiKey) {
      const dailyFantasyAdapter = new DailyFantasyAdapter({
        apiKey: dailyFantasyApiKey,
        baseUrl: 'https://api.example.com/dailyfantasy', 
        cacheTimeout: 300000;
      });
      this.registerDataSource(dailyFantasyAdapter);
    } else {
      // console statement removed
    }

    // Configure and register PrizePicksAdapter;

    if (prizePicksApiKey) {
      const prizePicksAdapter = new PrizePicksAdapter({
        apiKey: prizePicksApiKey,
        // baseUrl can be omitted to use default from PrizePicksAdapter;
        // defaultLeagueId can be set here if there's a global default, e.g., 'NBA'
        cacheTimeout: 300000 // 5 minutes cache;
      });
      this.registerDataSource(prizePicksAdapter);
    } else {
      // console statement removed
    }

    this.setupEventListeners();
  }

  static getInstance(): DataIntegrationHub {
    if (!DataIntegrationHub.instance) {
      DataIntegrationHub.instance = new DataIntegrationHub();
    }
    return DataIntegrationHub.instance;
  }

  private initializeIntegratedData(): IntegratedData {
    return {
      timestamp: Date.now(),
      projections: {},
      sentiment: {},
      odds: {},
      injuries: {},
      trends: {}
    };
  }

  public registerDataSource(source: DataSource<any>): void {
    this.dataSources.set(source.id, source);
    this.sourceMetrics.set(source.id, {
      latency: 0,
      reliability: 1,
      accuracy: 1,
      lastSync: 0;
    });
  }

  public async startRealTimeSync(): Promise<void> {
    this.isRealTimeEnabled = true;
    await this.synchronizeAll();
  }

  public stopRealTimeSync(): void {
    this.isRealTimeEnabled = false;
  }

  public setSyncInterval(milliseconds: number): void {
    this.syncInterval = milliseconds;
  }

  private async synchronizeAll(): Promise<void> {

    try {
      const syncPromises = Array.from(this.dataSources.entries()).map(
        async ([id, source]) => {

          try {

            this.updateSourceMetrics(id, startTime, true, (data as any)?.accuracy);
            return { id, data, error: null } as const;
          } catch (error) {
            this.updateSourceMetrics(id, startTime, false);
            return { id, data: null, error: error instanceof Error ? error : new Error(String(error)) } as const;
          }
        }
      );

      await this.integrateData(results);

      if (this.isRealTimeEnabled) {
        setTimeout(() => this.synchronizeAll(), this.syncInterval);
      }

      this.performanceMonitor.endTrace(traceId);
    } catch (error) {
      this.performanceMonitor.endTrace(traceId, error as Error);
      throw error;
    }
  }

  private updateSourceMetrics(
    sourceId: string,
    startTime: number,
    success: boolean,
    accuracy?: number;
  ): void {


    metrics.latency = (metrics.latency * 0.8 + latency * 0.2);
    metrics.reliability = success;
      ? Math.min(1, metrics.reliability * 0.95 + 0.05)
      : metrics.reliability * 0.9;
    if (accuracy !== undefined) {
      metrics.accuracy = (metrics.accuracy * 0.9 + accuracy * 0.1);
    }
    metrics.lastSync = Date.now();

    this.sourceMetrics.set(sourceId, metrics);
    this.eventBus.emit('data-source-metric-updated', {
      sourceId,
      latency: metrics.latency,
      reliability: metrics.reliability,
      accuracy: metrics.accuracy,
      lastSync: metrics.lastSync,
    });
  }

  private async integrateData(results: Array<{ id: string; data: any; error: Error | null }>): Promise<void> {

    const correlations: DataCorrelation[] = [];

    for (const result of results) {
      if (result.error) continue;

      // Cache the raw data with metadata;

      this.dataCache.set(result.id, { 
        data: result.data, 
        timestamp: Date.now(), 
        correlations: [], // Placeholder, to be updated later if correlation analysis is run on this source;
        confidence; 
      });

      this.updateIntegratedDataSource(newData, result);
    }

    // After all individual sources are processed and cached, perform cross-source analysis;
    // For example, calculate correlations if multiple projection sources exist;
    // this.analyzeAndCacheCorrelations(results.filter(r => !r.error).map(r => ({id: r.id, data: r.data })));

    this.integratedData = newData;
    this.eventBus.emit('data:integrated', { integratedData: this.integratedData, timestamp: Date.now() });
  }

  private calculateDataConfidence(data: any): number {
    // Basic confidence: presence of data and key fields;
    if (!data) return 0;
    if (data.projections && Array.isArray(data.projections) && data.projections.length > 0) return 0.75;
    if (data.sentiment && Object.keys(data.sentiment).length > 0) return 0.7;
    // Add more sophisticated checks based on data quality, recency, etc.
    return 0.5; // Default baseline confidence;
  }

  // Placeholder for a more sophisticated correlation analysis if needed;
  // private analyzeAndCacheCorrelations(activeDataSources: Array<{id: string, data: any }>): void {
  //   // ... implementation ...
  // }

  private updateIntegratedDataSource(newData: IntegratedData, result: { id: string; data: any; error: Error | null }): void {
    if (result.error || !result.data) return;

    switch (result.id) {
      case 'daily-fantasy': // Assuming DailyFantasyAdapter.id is 'daily-fantasy'
        this.integrateProjections(newData, result.data as DailyFantasyData);
        break;
      case 'prize-picks': // Assuming PrizePicksAdapter.id is 'prize-picks'
        this.integratePrizePicksProjections(newData, result.data as PrizePicksData);
        break;
      case 'social-sentiment': // Assuming SocialSentimentAdapter.id is 'social-sentiment'
        this.integrateSentiment(newData, result.data as SocialSentimentData[]); // Assuming it's an array;
        break;
      case 'sports-radar': // Assuming SportsRadarAdapter.id is 'sports-radar'
        this.integrateSportsData(newData, result.data as SportsRadarData);
        break;
      case 'the-odds': // Assuming TheOddsAdapter.id is 'the-odds'
        this.integrateOdds(newData, result.data as TheOddsData);
        break;
      // Add cases for other adapters like ESPN if they have specific integration logic;
      default:
        // console statement removed
        // Attempt a generic integration or log/ignore;
        break;
    }
  }

  private integrateProjections(newData: IntegratedData, projectionData: DailyFantasyData): void {
    if (!projectionData || !projectionData.projections) return;

    projectionData.projections.forEach(proj => {
      if (!proj.playerId || !proj.stats) return;

      newData.projections[proj.playerId] = {
        stats: proj.stats,
        confidence: proj.confidence !== undefined ? proj.confidence : 0.7, // Default confidence for DF projections;
        lastUpdated: proj.lastUpdated || Date.now(),
      };
    });
  }

  // New method to integrate PrizePicks projection data;
  private integratePrizePicksProjections(newData: IntegratedData, prizePicksData: PrizePicksData): void {
    if (!prizePicksData || !prizePicksData.projections) return;

    prizePicksData.projections.forEach(proj => {
      if (!proj.playerId || !proj.statType || proj.line === undefined) return;

      // Initialize player in projections if not already present;
      if (!newData.projections[proj.playerId]) {
        newData.projections[proj.playerId] = {
          stats: {},
          confidence: 0, // Will be updated;
          lastUpdated: Date.now() // Will be updated;
        };
      }

      // Add/update the specific stat from PrizePicks;
      // Note: PrizePicks gives one stat_type per projection object (e.g., 'Points', 'Rebounds')
      // This structure is slightly different from DailyFantasyData which might have a general 'stats' object;
      newData.projections[proj.playerId].stats[proj.statType] = proj.line;
      
      // Update confidence and lastUpdated for this player;
      // A more sophisticated confidence model could be used here, considering data freshness, source reliability etc.
      // For now, let's use a simple model. If multiple sources contribute, confidence could be averaged or maximized.

      newData.projections[proj.playerId].confidence = Math.max(existingConfidence, 0.75); // PrizePicks might be considered high confidence;
      newData.projections[proj.playerId].lastUpdated = Date.now();
    });
  }

  private integrateSentiment(newData: IntegratedData, sentimentDataArray: SocialSentimentData[]): void {
    sentimentDataArray.forEach(data => {
      newData.sentiment[data.player] = data;
    });
  }

  private integrateSportsData(newData: IntegratedData, sportsData: SportsRadarData): void {
    sportsData.games.forEach(game => {
      game.players.forEach(player => {
        if (player.injuries.length > 0) {
          newData.injuries[player.id] = {
            status: player.injuries[0].status,
            details: player.injuries[0].type,
            impact: this.calculateInjuryImpact(player.injuries[0]),
            timeline: player.injuries[0].startDate;
          };
        }
      });
    });
  }

  private integrateOdds(newData: IntegratedData, oddsData: TheOddsData): void {
    oddsData.events.forEach(event => {
      const markets: Record<string, number> = {};
      event.bookmakers.forEach(bookmaker => {
        bookmaker.markets.forEach(market => {
          market.outcomes.forEach(outcome => {
            markets[`${market.key}_${outcome.name}`] = outcome.price;
          });
        });
      });

      newData.odds[event.id] = {
        markets,
        movement: this.calculateOddsMovement(event.id, markets)
      };
    });
  }

  private calculateInjuryImpact(injury: { status: string; type: string }): number {
    const statusImpact = {
      out: 1,
      doubtful: 0.75,
      questionable: 0.5,
      probable: 0.25;
    }[injury.status.toLowerCase()] ?? 0;

    return statusImpact;
  }

  private calculateOddsMovement(
    eventId: string,
    currentMarkets: Record<string, number>
  ): { direction: 'up' | 'down' | 'stable'; magnitude: number } {

    if (!previousData) {
      return { direction: 'stable', magnitude: 0 };
    }




    if (magnitude < 0.05) return { direction: 'stable', magnitude };
    return {
      direction: difference > 0 ? 'up' : 'down',
      magnitude;
    };
  }

  private analyzeTrendsWithCorrelations(newData: IntegratedData, correlations: DataCorrelation[]): void {
    // Analyze projection trends;
    this.analyzeProjectionTrends(newData);
    
    // Analyze sentiment trends;
    this.analyzeSentimentTrends(newData);
    
    // Analyze market trends;
    this.analyzeMarketTrends(newData);
    
    // Analyze correlation trends;
    this.analyzeCorrelationTrends(newData, correlations);
  }

  private analyzeProjectionTrends(newData: IntegratedData): void {
    Object.entries(newData.projections).forEach(([playerId, projection]) => {
      Object.entries(projection.stats).forEach(([metric, value]) => {


        if (previousValue !== undefined) {


          newData.trends[trendKey] = {
            value,
            change,
            significance;
          };
        }
      });
    });
  }

  private analyzeSentimentTrends(newData: IntegratedData): void {
    Object.entries(newData.sentiment).forEach(([playerId, sentiment]) => {


      if (previousSentiment) {



        newData.trends[trendKey] = {
          value: sentiment.sentiment.score,
          change,
          significance: significance * (1 + Math.min(1, volumeChange / 1000))
        };
      }
    });
  }

  private analyzeMarketTrends(newData: IntegratedData): void {
    Object.entries(newData.odds).forEach(([eventId, odds]) => {
      Object.entries(odds.markets).forEach(([market, price]) => {


        if (previousPrice !== undefined) {


          newData.trends[trendKey] = {
            value: price,
            change,
            significance;
          };
        }
      });
    });
  }

  private analyzeCorrelationTrends(newData: IntegratedData, correlations: DataCorrelation[]): void {
    // Analyze correlations between different data points;
    Object.entries(newData.projections).forEach(([playerId, projection]) => {


      if (sentiment && projection) {


        const performanceCorrelation = this.calculateCorrelation(
          Object.values(projection.stats),
          [sentimentImpact]
        );
        
        newData.trends[correlationKey] = {
          value: performanceCorrelation,
          change: 0, // We don't track change for correlations;
          significance: Math.abs(performanceCorrelation)
        };
      }
      
      if (injuries) {

        newData.trends[injuryKey] = {
          value: injuries.impact,
          change: 0,
          significance: injuries.impact;
        };
      }
    });

    // Analyze correlations with other data sources;
    for (const correlation of correlations) {




      newData.trends[trendKey] = {
        value: correlationValue,
        change: 0,
        significance: significance;
      };
    }
  }

  private calculateTrendSignificance(change: number, baseValue: number): number {
    if (baseValue === 0) return change === 0 ? 0 : 1;

    return Math.min(1, percentageChange);
  }

  private calculateCorrelation(series1: number[], series2: number[]): number {
    if (series1.length !== series2.length || series1.length === 0) return 0;




    if (variance1 === 0 || variance2 === 0) return 0;
    
    const covariance = series1.reduce((a, b, i) => {
      return a + ((b - mean1) * (series2[i] - mean2));
    }, 0);
    
    return covariance / Math.sqrt(variance1 * variance2);
  }

  private setupEventListeners(): void {
    this.eventBus.on('dataSource:error', async (event) => {


      if (metrics) {
        metrics.reliability *= 0.9;
        this.sourceMetrics.set(sourceId, metrics);
      }
    });

    this.eventBus.on('cache:clear', (event) => {
      if (event.source === 'all' || event.source === 'dataHub') {
        this.dataCache.clear();
        this.correlationCache.clear();
        this.integratedData = this.initializeIntegratedData();
        
        this.eventBus.emit('cache:cleared', { source: 'dataHub' });
      }
    });

    this.eventBus.on('config:updated', (event) => {
      if (event.section === 'dataSources' || event.section === 'all') {
        
      }
    });
  }

  public getIntegratedData(): IntegratedData {
    return this.integratedData;
  }

  public getSourceMetrics(): Map<string, DataSourceMetrics> {
    return new Map(this.sourceMetrics);
  }
} 