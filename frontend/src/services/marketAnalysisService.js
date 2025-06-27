// Browser-compatible EventEmitter replacement;
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    off(event, listener) {
        if (!this.events[event])
            return;
        this.events[event] = this.events[event].filter((l) => l !== listener);
    }
    emit(event, ...args) {
        if (!this.events[event])
            return;
        this.events[event].forEach((listener) => listener(...args));
    }
}
import { AdvancedMLService } from "./analytics/advancedMLService";
import { HyperAdvancedMLService } from "./analytics/hyperAdvancedMLService";
import { UltraMLService } from "./analytics/ultraMLService";
export class MarketAnalysisService extends EventEmitter {
    constructor() {
        super();
        this.marketMetrics = new Map();
        this.anomalies = new Map();
        this.ANOMALY_THRESHOLD = 2.0;
        this.EFFICIENCY_WINDOW = 24 * 60 * 60 * 1000;
        this.VOLUME_WINDOW = 60 * 60 * 1000; // 1 hour;
        this.TREND_WINDOW = 5; // Number of data points for trend analysis;
        // Add cache property for the methods above;
        this.cache = new Map();
        this.advancedML = AdvancedMLService.getInstance();
        this.hyperAdvancedML = HyperAdvancedMLService.getInstance();
        this.ultraML = UltraMLService.getInstance();
    }
    static getInstance() {
        if (!MarketAnalysisService.instance) {
            MarketAnalysisService.instance = new MarketAnalysisService();
        }
        return MarketAnalysisService.instance;
    }
    updateMarketMetrics(eventId, odds) {
        const currentMetrics = this.marketMetrics.get(eventId) || {
            volume: {
                totalVolume: 0,
                lastUpdate: Date.now(),
                volumeHistory: [],
            },
            liquidity: 0,
            volatility: 0,
            trend: 0,
        };
        // Update metrics with advanced analysis;
        this.updateVolumeMetrics(currentMetrics, odds);
        this.updateLiquidityMetrics(currentMetrics, odds);
        this.updateVolatilityMetrics(currentMetrics);
        this.updateTrendMetrics(currentMetrics);
        // Store updated metrics;
        this.marketMetrics.set(eventId, currentMetrics);
        // Enhanced anomaly detection with ML;
        this.detectAnomalies(eventId, currentMetrics, odds);
        // Calculate market efficiency with advanced metrics;

        this.emit("marketEfficiency", { eventId, metrics: efficiencyMetrics });
        // Emit real-time market updates;
        this.emit("marketUpdate", { eventId, metrics: currentMetrics });
    }
    updateVolumeMetrics(metrics, odds) {


        // Update volume history with time-based window;
        metrics.volume.volumeHistory = metrics.volume.volumeHistory;
            .filter((v) => currentTime - v.timestamp <= this.VOLUME_WINDOW)
            .concat({ timestamp: currentTime, volume: recentVolume });
        metrics.volume.totalVolume = metrics.volume.volumeHistory.reduce((sum, v) => sum + v.volume, 0);
        metrics.volume.lastUpdate = currentTime;
    }
    updateLiquidityMetrics(metrics, odds) {
        if (odds.length < 2)
            return;




        // Enhanced liquidity calculation considering market depth;
        const depthWeightedStake = odds.reduce((sum, odd) => {

            return sum + depth;
        }, 0);
        metrics.liquidity = depthWeightedStake / (spread || 1);
    }
    updateVolatilityMetrics(metrics) {
        if (metrics.volume.volumeHistory.length < 2)
            return;



        const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
            returns.length;
        metrics.volatility = Math.sqrt(variance) * Math.sqrt(252); // Annualized volatility;
    }
    updateTrendMetrics(metrics) {
        if (metrics.volume.volumeHistory.length < 2)
            return;


        const yMean = recentVolumes.reduce((sum, v) => sum + v.volume, 0) /
            recentVolumes.length;
        const numerator = 0;
        const denominator = 0;
        recentVolumes.forEach((v, i) => {


            numerator += xDiff * yDiff;
            denominator += xDiff * xDiff;
        });
        metrics.trend = denominator === 0 ? 0 : numerator / denominator;
    }
    async detectAnomalies(eventId, metrics, odds) {

        // Volume anomaly detection with ML enhancement;
        if (metrics.volume.volumeHistory.length >= 5) {
            const recentVolumes = metrics.volume.volumeHistory;
                .slice(-5)
                .map((v) => v.volume);

            if (mlPrediction.isAnomaly) {
                anomalies.push({
                    type: "volume",
                    severity: this.getAnomalySeverity(mlPrediction.deviation),
                    description: `ML-detected volume anomaly: ${mlPrediction.deviation.toFixed(2)} standard deviations from expected`,
                    timestamp: Date.now(),
                    metrics: {
                        current: recentVolumes[recentVolumes.length - 1],
                        expected: mlPrediction.expectedValue,
                        deviation: mlPrediction.deviation,
                    },
                });
            }
        }
        // Price anomaly detection;
        if (odds.length >= 2) {

            if (priceAnomaly) {
                anomalies.push(priceAnomaly);
            }
        }
        // Spread anomaly detection;

        if (spreadAnomaly) {
            anomalies.push(spreadAnomaly);
        }
        // Liquidity anomaly detection;

        if (liquidityAnomaly) {
            anomalies.push(liquidityAnomaly);
        }
        // Store and emit anomalies;
        if (anomalies.length > 0) {
            this.anomalies.set(eventId, anomalies);
            this.emit("marketAnomaly", { eventId, anomalies });
        }
    }
    async detectPriceAnomaly(odds) {

        if (pricePrediction.isAnomaly) {
            return {
                type: "price",
                severity: this.getAnomalySeverity(pricePrediction.deviation),
                description: `ML-detected price anomaly: ${pricePrediction.deviation.toFixed(2)} standard deviations from expected`,
                timestamp: Date.now(),
                metrics: {
                    current: pricePrediction.currentPrice,
                    expected: pricePrediction.expectedPrice,
                    deviation: pricePrediction.deviation,
                },
            };
        }
        return null;
    }
    async detectSpreadAnomaly(odds) {

        if (spreadPrediction.isAnomaly) {
            return {
                type: "spread",
                severity: this.getAnomalySeverity(spreadPrediction.deviation),
                description: `ML-detected spread anomaly: ${spreadPrediction.deviation.toFixed(2)} standard deviations from expected`,
                timestamp: Date.now(),
                metrics: {
                    current: spreadPrediction.currentSpread,
                    expected: spreadPrediction.expectedSpread,
                    deviation: spreadPrediction.deviation,
                },
            };
        }
        return null;
    }
    async detectLiquidityAnomaly(metrics, odds) {

        if (liquidityPrediction.isAnomaly) {
            return {
                type: "liquidity",
                severity: this.getAnomalySeverity(liquidityPrediction.deviation),
                description: `ML-detected liquidity anomaly: ${liquidityPrediction.deviation.toFixed(2)} standard deviations from expected`,
                timestamp: Date.now(),
                metrics: {
                    current: liquidityPrediction.currentLiquidity,
                    expected: liquidityPrediction.expectedLiquidity,
                    deviation: liquidityPrediction.deviation,
                },
            };
        }
        return null;
    }
    getAnomalySeverity(deviation) {
        if (deviation >= 3.0)
            return "high";
        if (deviation >= 2.0)
            return "medium";
        return "low";
    }
    calculateMarketEfficiency(eventId, odds) {

        if (!metrics) {
            return {
                spreadEfficiency: 0,
                volumeEfficiency: 0,
                priceDiscovery: 0,
                marketDepth: 0,
            };
        }
        // Enhanced market efficiency calculations;




        return {
            spreadEfficiency,
            volumeEfficiency,
            priceDiscovery,
            marketDepth,
        };
    }
    calculateSpreadEfficiency(odds) {
        if (odds.length < 2)
            return 0;




        // Normalize spread efficiency (0-1 scale)
        return Math.max(0, 1 - spread / midPrice);
    }
    calculateVolumeEfficiency(metrics, odds) {
        if (odds.length < 2)
            return 0;
        const spread = Math.max(...odds.map((o) => o.odds)) -
            Math.min(...odds.map((o) => o.odds));

        // Higher volume relative to spread indicates higher efficiency;
        return volume / (spread * 1000); // Normalize to reasonable range;
    }
    calculatePriceDiscovery(metrics) {
        if (metrics.volume.volumeHistory.length < 2)
            return 0;
        // Calculate how quickly prices adjust to new information;

        const volumeChanges = recentVolumes;
            .slice(1)
            .map((v, i) => Math.abs(v.volume - recentVolumes[i].volume));
        const avgChange = volumeChanges.reduce((sum, change) => sum + change, 0) /
            volumeChanges.length;
        return avgChange / metrics.volume.totalVolume;
    }
    calculateMarketDepth(metrics, odds) {
        if (odds.length < 2)
            return 0;

        const spread = Math.max(...odds.map((o) => o.odds)) -
            Math.min(...odds.map((o) => o.odds));
        // Higher total stake relative to spread indicates deeper market;
        return totalStake / (spread * 1000); // Normalize to reasonable range;
    }
    getMarketMetrics(eventId) {
        return this.marketMetrics.get(eventId);
    }
    getAnomalies(eventId) {
        return this.anomalies.get(eventId) || [];
    }
    getMarketEfficiency(eventId) {

        if (!metrics)
            return undefined;
        return this.calculateMarketEfficiency(eventId, []);
    }
    // Missing methods required by MarketAnalysisDashboard;
    async getOddsMovements(eventId, timeRange) {


        if (cached)
            return cached;
        // Mock implementation - replace with actual API call;
        const movements = {
            eventId,
            timeRange,
            movements: [
                { timestamp: Date.now() - 3600000, odds: 1.85, direction: "up" },
                { timestamp: Date.now() - 1800000, odds: 1.9, direction: "up" },
                { timestamp: Date.now(), odds: 1.88, direction: "down" },
            ],
            totalChange: 0.03,
            volatility: 0.15,
        };
        this.cache?.set(cacheKey, movements, 300000); // 5 minutes cache;
        return movements;
    }
    async getVolumeAnalysis(eventId, timeRange) {

        if (!metrics) {
            return {
                eventId,
                totalVolume: 0,
                averageVolume: 0,
                peakVolume: 0,
                volumeGrowth: 0,
            };
        }
        return {
            eventId,
            totalVolume: metrics.volume.totalVolume,
            averageVolume: metrics.volume.totalVolume / (metrics.volume.volumeHistory.length || 1),
            peakVolume: Math.max(...metrics.volume.volumeHistory.map((v) => v.volume)),
            volumeGrowth: metrics.trend || 0,
        };
    }
    async getSentimentData(eventId) {
        // Mock sentiment data - replace with actual sentiment analysis;
        return {
            eventId,
            sentiment: "positive",
            score: 0.65,
            confidence: 0.8,
            sources: ["twitter", "reddit", "news"],
            breakdown: {
                positive: 65,
                neutral: 25,
                negative: 10,
            },
        };
    }
    async getArbitrageOpportunities(eventId) {
        // Mock arbitrage opportunities - replace with actual detection;
        return [
            {
                id: `arb_${eventId}_1`,
                eventId,
                bookmakers: ["bookmaker1", "bookmaker2"],
                profit: 0.025,
                stake: 1000,
                confidence: 0.9,
            },
        ];
    }
    async getMarketDepth(eventId) {

        if (!metrics) {
            return {
                eventId,
                depth: 0,
                liquidityScore: 0,
            };
        }
        return {
            eventId,
            depth: metrics.liquidity || 0,
            liquidityScore: Math.min(metrics.liquidity / 1000, 1), // Normalized score;
        };
    }
    async getLiquidityMetrics(eventId) {

        if (!metrics) {
            return {
                eventId,
                liquidity: 0,
                spread: 0,
                marketDepth: 0,
            };
        }
        return {
            eventId,
            liquidity: metrics.liquidity,
            spread: 0.02, // Mock spread;
            marketDepth: metrics.liquidity,
        };
    }
    async getVolatilityData(eventId, timeRange) {

        if (!metrics) {
            return {
                eventId,
                volatility: 0,
                historicalVolatility: 0,
                impliedVolatility: 0,
            };
        }
        return {
            eventId,
            volatility: metrics.volatility,
            historicalVolatility: metrics.volatility * 0.9,
            impliedVolatility: metrics.volatility * 1.1,
        };
    }
}
