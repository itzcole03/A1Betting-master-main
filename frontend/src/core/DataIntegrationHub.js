import { DailyFantasyAdapter } from '../adapters/DailyFantasyAdapter';
import { ESPNAdapter } from '../adapters/ESPNAdapter';
import { EventBus } from '@/core/EventBus';
import { PerformanceMonitor } from './PerformanceMonitor';
import { PrizePicksAdapter } from '../adapters/PrizePicksAdapter';
import { SocialSentimentAdapter } from '../adapters/SocialSentimentAdapter';
import { SportsRadarAdapter } from '../adapters/SportsRadarAdapter';
import { TheOddsAdapter } from '../adapters/TheOddsAdapter';
export class DataIntegrationHub {
    constructor() {
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.dataSources = new Map();
        this.metrics = new Map();
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
                cacheTimeout: 300000,
            });
            this.registerDataSource(theOddsAdapter);
        }
        else {
            // console statement removed
        }
        // Configure and register SportsRadarAdapter;

        if (sportsRadarApiKey) {
            const sportsRadarAdapter = new SportsRadarAdapter({
                apiKey: sportsRadarApiKey,
                baseUrl: 'https://api.sportradar.us',
                cacheTimeout: 300000,
            });
            this.registerDataSource(sportsRadarAdapter);
        }
        else {
            // console statement removed
        }
        // Configure and register DailyFantasyAdapter;

        if (dailyFantasyApiKey) {
            const dailyFantasyAdapter = new DailyFantasyAdapter({
                apiKey: dailyFantasyApiKey,
                baseUrl: 'https://api.example.com/dailyfantasy',
                cacheTimeout: 300000,
            });
            this.registerDataSource(dailyFantasyAdapter);
        }
        else {
            // console statement removed
        }
        // Configure and register PrizePicksAdapter;

        if (prizePicksApiKey) {
            const prizePicksAdapter = new PrizePicksAdapter({
                apiKey: prizePicksApiKey,
                baseUrl: import.meta.env.VITE_PRIZEPICKS_API_URL || 'https://api.prizepicks.com',
                cacheTimeout: 300000, // 5 minutes cache;
            });
            this.registerDataSource(prizePicksAdapter);
        }
        else {
            // console statement removed
        }
        this.setupEventListeners();
    }
    static getInstance() {
        if (!DataIntegrationHub.instance) {
            DataIntegrationHub.instance = new DataIntegrationHub();
        }
        return DataIntegrationHub.instance;
    }
    initializeIntegratedData() {
        return {
            timestamp: Date.now(),
            projections: {},
            sentiment: {},
            odds: {},
            injuries: {},
            trends: {},
        };
    }
    registerDataSource(source) {
        this.dataSources.set(source.id, source);
        this.metrics.set(source.id, {
            latency: [],
            errorRate: 0,
            lastUpdate: 0,
            dataQuality: 0,
        });
    }
    async startRealTimeSync() {
        this.isRealTimeEnabled = true;
        await this.synchronizeAll();
    }
    stopRealTimeSync() {
        this.isRealTimeEnabled = false;
    }
    setSyncInterval(milliseconds) {
        this.syncInterval = milliseconds;
    }
    async synchronizeAll() {

        try {
            const syncPromises = Array.from(this.dataSources.entries()).map(async ([id, source]) => {

                try {

                    this.updateSourceMetrics(id, {
                        latency: [Date.now() - startTime],
                        errorRate: 0,
                        lastUpdate: Date.now(),
                        dataQuality: 0.8,
                    });
                    return { id, data, error: null };
                }
                catch (error) {
                    this.updateSourceMetrics(id, {
                        latency: [Date.now() - startTime],
                        errorRate: 1,
                        lastUpdate: Date.now(),
                        dataQuality: 0.0,
                    });
                    return {
                        id,
                        data: null,
                        error: error instanceof Error ? error : new Error(String(error)),
                    };
                }
            });

            await this.integrateData(results);
            if (this.isRealTimeEnabled) {
                setTimeout(() => this.synchronizeAll(), this.syncInterval);
            }
            this.performanceMonitor.endTrace(traceId);
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    updateSourceMetrics(sourceId, metrics) {
        if (!this.metrics.has(sourceId)) {
            this.metrics.set(sourceId, metrics);
        }
        else {

            this.metrics.set(sourceId, {
                ...existingMetrics,
                latency: [...existingMetrics.latency, ...metrics.latency].slice(-10),
                errorRate: metrics.errorRate,
                lastUpdate: metrics.lastUpdate,
                dataQuality: metrics.dataQuality,
            });
        }
        this.emitMetricsUpdate(sourceId);
    }
    async integrateData(results) {


        for (const result of results) {
            if (result.error)
                continue;
            // Cache the raw data with metadata;

            this.dataCache.set(result.id, {
                data: result.data,
                timestamp: Date.now(),
                correlations: [], // Placeholder, to be updated later if correlation analysis is run on this source;
                confidence,
            });
            this.updateIntegratedDataSource(newData, result);
        }
        // After all individual sources are processed and cached, perform cross-source analysis;
        // For example, calculate correlations if multiple projection sources exist;
        // this.analyzeAndCacheCorrelations(results.filter(r => !r.error).map(r => ({id: r.id, data: r.data })));
        this.integratedData = newData;
        this.eventBus.emit('data:integrated', {
            integratedData: this.integratedData,
            timestamp: Date.now(),
        });
    }
    calculateDataConfidence(data) {
        // Basic confidence: presence of data and key fields;
        if (!data)
            return 0;
        if (data.projections && Array.isArray(data.projections) && data.projections.length > 0)
            return 0.75;
        if (data.sentiment && Object.keys(data.sentiment).length > 0)
            return 0.7;
        // Add more sophisticated checks based on data quality, recency, etc.
        return 0.5; // Default baseline confidence;
    }
    // Placeholder for a more sophisticated correlation analysis if needed;
    // private analyzeAndCacheCorrelations(activeDataSources: Array<{id: string, data: any }>): void {
    //   // ... implementation ...
    // }
    updateIntegratedDataSource(newData, result) {
        if (result.error || !result.data)
            return;
        switch (result.id) {
            case 'daily-fantasy': // Assuming DailyFantasyAdapter.id is 'daily-fantasy'
                this.integrateProjections(newData, result.data);
                break;
            case 'prize-picks': // Assuming PrizePicksAdapter.id is 'prize-picks'
                this.integratePrizePicksProjections(newData, result.data);
                break;
            case 'social-sentiment': // Assuming SocialSentimentAdapter.id is 'social-sentiment'
                this.integrateSentiment(newData, result.data); // Assuming it's an array;
                break;
            case 'sports-radar': // Assuming SportsRadarAdapter.id is 'sports-radar'
                this.integrateSportsData(newData, result.data);
                break;
            case 'the-odds': // Assuming TheOddsAdapter.id is 'the-odds'
                this.integrateOdds(newData, result.data);
                break;
            // Add cases for other adapters like ESPN if they have specific integration logic;
            default:
                // console statement removed
                // Attempt a generic integration or log/ignore;
                break;
        }
    }
    integrateProjections(newData, dailyFantasyData) {
        dailyFantasyData.projections.forEach(projection => {

            if (!newData.projections[playerId]) {
                newData.projections[playerId] = {
                    stats: {},
                    confidence: 0.8,
                    lastUpdated: Date.now(),
                };
            }
            // Map DailyFantasy stats to our internal format;
            newData.projections[playerId].stats = {
                points: projection.pts,
                rebounds: projection.reb,
                assists: projection.ast,
                steals: projection.stl,
                blocks: projection.blk,
                threePointers: projection.three_pt,
                minutes: projection.min,
            };
            newData.projections[playerId].lastUpdated = Date.now();
        });
    }
    integratePrizePicksProjections(newData, prizePicksData) {
        prizePicksData.projections.forEach((proj) => {
            if (!newData.projections[proj.playerId]) {
                newData.projections[proj.playerId] = {
                    stats: {},
                    confidence: 0.8,
                    lastUpdated: Date.now(),
                };
            }
            // Map PrizePicks stat types to our internal format;

            newData.projections[proj.playerId].stats[statType] = proj.line;
            newData.projections[proj.playerId].lastUpdated = Date.now();
        });
    }
    integrateSentiment(newData, sentimentDataArray) {
        sentimentDataArray.forEach(data => {
            newData.sentiment[data.player] = data;
        });
    }
    integrateSportsData(newData, sportsData) {
        sportsData.games.forEach(game => {
            game.players.forEach(player => {
                if (player.injuries.length > 0) {
                    newData.injuries[player.id] = {
                        status: player.injuries[0].status,
                        details: player.injuries[0].type,
                        impact: this.calculateInjuryImpact(player.injuries[0]),
                        timeline: player.injuries[0].startDate,
                    };
                }
            });
        });
    }
    integrateOdds(newData, oddsData) {
        oddsData.events.forEach(event => {

            event.bookmakers.forEach(bookmaker => {
                bookmaker.markets.forEach(market => {
                    market.outcomes.forEach(outcome => {
                        markets[`${market.key}_${outcome.name}`] = outcome.price;
                    });
                });
            });
            newData.odds[event.id] = {
                markets,
                movement: this.calculateOddsMovement(event.id, markets),
            };
        });
    }
    calculateInjuryImpact(injury) {
        const statusImpact = {
            out: 1,
            doubtful: 0.75,
            questionable: 0.5,
            probable: 0.25,
        }[injury.status.toLowerCase()] ?? 0;
        return statusImpact;
    }
    calculateOddsMovement(eventId, currentMarkets) {

        if (!previousData) {
            return { direction: 'stable', magnitude: 0 };
        }
        const avgCurrentPrice = Object.values(currentMarkets).reduce((a, b) => a + b, 0) /
            Object.values(currentMarkets).length;
        const avgPreviousPrice = Object.values(previousData.markets).reduce((a, b) => a + b, 0) /
            Object.values(previousData.markets).length;


        if (magnitude < 0.05)
            return { direction: 'stable', magnitude };
        return {
            direction: difference > 0 ? 'up' : 'down',
            magnitude,
        };
    }
    analyzeTrendsWithCorrelations(newData, correlations) {
        // Analyze projection trends;
        this.analyzeProjectionTrends(newData);
        // Analyze sentiment trends;
        this.analyzeSentimentTrends(newData);
        // Analyze market trends;
        this.analyzeMarketTrends(newData);
        // Analyze correlation trends;
        this.analyzeCorrelationTrends(newData, correlations);
    }
    analyzeProjectionTrends(newData) {
        Object.entries(newData.projections).forEach(([playerId, projection]) => {
            Object.entries(projection.stats).forEach(([metric, value]) => {


                if (previousValue !== undefined) {


                    newData.trends[trendKey] = {
                        value,
                        change,
                        significance,
                    };
                }
            });
        });
    }
    analyzeSentimentTrends(newData) {
        Object.entries(newData.sentiment).forEach(([playerId, sentiment]) => {


            if (previousSentiment) {



                newData.trends[trendKey] = {
                    value: sentiment.sentiment.score,
                    change,
                    significance: significance * (1 + Math.min(1, volumeChange / 1000)),
                };
            }
        });
    }
    analyzeMarketTrends(newData) {
        Object.entries(newData.odds).forEach(([eventId, odds]) => {
            Object.entries(odds.markets).forEach(([market, price]) => {


                if (previousPrice !== undefined) {


                    newData.trends[trendKey] = {
                        value: price,
                        change,
                        significance,
                    };
                }
            });
        });
    }
    analyzeCorrelationTrends(newData, correlations) {
        // Analyze correlations between different data points;
        Object.entries(newData.projections).forEach(([playerId, projection]) => {


            if (sentiment && projection) {


                const performanceCorrelation = this.calculateCorrelation(Object.values(projection.stats), [
                    sentimentImpact,
                ]);
                newData.trends[correlationKey] = {
                    value: performanceCorrelation,
                    change: 0, // We don't track change for correlations;
                    significance: Math.abs(performanceCorrelation),
                };
            }
            if (injuries) {

                newData.trends[injuryKey] = {
                    value: injuries.impact,
                    change: 0,
                    significance: injuries.impact,
                };
            }
        });
        // Analyze correlations with other data sources;
        for (const correlation of correlations) {





            newData.trends[trendKey] = {
                value: correlationValue,
                change: 0,
                significance: significance,
            };
        }
    }
    calculateTrendSignificance(change, baseValue) {
        if (baseValue === 0)
            return change === 0 ? 0 : 1;

        return Math.min(1, percentageChange);
    }
    calculateCorrelation(series1, series2) {
        if (series1.length !== series2.length || series1.length === 0)
            return 0;




        if (variance1 === 0 || variance2 === 0)
            return 0;
        const covariance = series1.reduce((a, b, i) => {
            return a + (b - mean1) * (series2[i] - mean2);
        }, 0);
        return covariance / Math.sqrt(variance1 * variance2);
    }
    setupEventListeners() {
        this.eventBus.on('dataSource:error', async (event) => {

            const metrics = this.metrics.get(sourceId) || {
                latency: [],
                errorRate: 0,
                lastUpdate: 0,
                dataQuality: 0,
            };
            this.updateSourceMetrics(sourceId, {
                ...metrics,
                errorRate: metrics.errorRate + 0.1,
                dataQuality: metrics.dataQuality * 0.9,
            });
        });
        this.eventBus.on('cache:clear', event => {
            if (event.source === 'all' || event.source === 'dataHub') {
                this.dataCache.clear();
                this.correlationCache.clear();
                this.integratedData = this.initializeIntegratedData();
                this.eventBus.emit('cache:cleared', { source: 'dataHub' });
            }
        });
        this.eventBus.on('config:updated', event => {
            if (event.section === 'dataSources' || event.section === 'all') {
                // Handle config updates;
            }
        });
    }
    getIntegratedData() {
        return this.integratedData;
    }
    getSourceMetrics() {
        return new Map(this.metrics);
    }
    calculateMetrics(sourceId, data) {

        return {
            latency: [Date.now() - startTime],
            errorRate: 0,
            lastUpdate: Date.now(),
            dataQuality: 0.8,
        };
    }
    emitMetricsUpdate(sourceId) {
        const metrics = this.metrics.get(sourceId) || {
            latency: [],
            errorRate: 0,
            lastUpdate: 0,
            dataQuality: 0,
        };
        this.eventBus.emit('data-source-metric-updated', {
            sourceId,
            latency: metrics.latency[0] || 0,
            errorRate: metrics.errorRate,
            lastUpdate: metrics.lastUpdate,
            dataQuality: metrics.dataQuality,
        });
    }
}
