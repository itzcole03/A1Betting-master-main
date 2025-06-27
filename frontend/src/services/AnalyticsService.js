import { UnifiedConfig } from '../core/UnifiedConfig.js';
import { EventBus } from '../core/EventBus.js';
/**
 * Analytics service for tracking performance metrics.
 */
/**
 * Simulated fallback metrics for disabled/feature-flag scenarios.
 */
// Removed unused simulatedMetrics to resolve lint error.
// Modernized AnalyticsService: strict typing, UnifiedConfig, EventBus, no simulation/fallback, singleton only.
export class AnalyticsService {
    /**
     * Returns the current analytics status: 'enabled', 'disabled', or 'error'.
     */
    /**
     * Returns the current analytics status: 'enabled', 'disabled', or 'error'.
     */
    // Status is now handled by UnifiedConfig feature flag, no direct status field needed.
    /**
     * Returns true if analytics is enabled via feature flag.
     */
    static isEnabled() {
        return UnifiedConfig.getInstance().get('enableAnalytics') === true;
    }
    constructor() {
        this.eventBus = EventBus.getInstance();
        this.config = this.initializeConfig();
        this.bets = new Map();
        this.opportunities = new Map();
        this.riskAssessments = new Map();
        this.timeSeriesData = [];
        this.metrics = this.initializeMetrics();
        this.setupEventListeners();
        this.startPeriodicUpdates();
    }
    // Feature flag is now handled by UnifiedConfig. No window/appStatus or legacy status logic.
    // Removed unused reportAnalyticsStatus to resolve lint error.
    /**
     * Returns the singleton instance of AnalyticsService.
     */
    static getInstance() {
        if (!AnalyticsService.instance) {
            AnalyticsService.instance = new AnalyticsService();
        }
        return AnalyticsService.instance;
    }
    initializeConfig() {
        return {
            retentionPeriod: 7776000000, // 90 days in milliseconds;
            aggregationIntervals: ['1h', '1d', '7d', '30d'],
            metrics: [
                'bets',
                'stake',
                'profitLoss',
                'roi',
                'winRate',
                'clv'
            ],
            dimensions: [
                'player',
                'metric',
                'book',
                'risk_level',
                'confidence'
            ],
            filters: {
                minBets: 10,
                minStake: 100,
                minConfidence: 0.6;
            }
        };
    }
    initializeMetrics() {
        return {
            totalBets: 0,
            winningBets: 0,
            losingBets: 0,
            pushBets: 0,
            pendingBets: 0,
            totalStake: 0,
            totalReturn: 0,
            profitLoss: 0,
            roi: 0,
            winRate: 0,
            averageOdds: 0,
            averageStake: 0,
            maxDrawdown: 0,
            sharpeRatio: 0,
            kellyMultiplier: 1,
            clvAverage: 0,
            edgeRetention: 0,
            timeInMarket: 0;
        };
    }
    setupEventListeners() {
        // Listen for new betting opportunities;
        this.eventBus.on('prediction:update', (data) => {


            this.opportunities.set(opportunity.id, opportunity);
        });
        // Listen for risk assessments;
        this.eventBus.on('data:updated', (data) => {

            if (event.sourceId === 'risk-manager') {

                this.riskAssessments.set(assessment.id, assessment);
            }
        });
        // Listen for placed bets;
        this.eventBus.on('bet:placed', (data) => {

            const { bet } = event.data;
            this.bets.set(bet.id, bet);
            this.updateMetrics();
        });
        // Listen for settled bets;
        this.eventBus.on('bet:settled', (data) => {

            const { bet, result } = event.data;
            this.handleBetSettlement(bet.id, result);
            this.updateMetrics();
        });
    }
    startPeriodicUpdates() {
        // Update time series data every hour;
        setInterval(() => {
            this.updateTimeSeriesData();
            this.cleanupOldData();
        }, 3600000); // 1 hour;
    }
    updateTimeSeriesData() {
        const currentMetrics = {
            bets: this.metrics.totalBets,
            stake: this.metrics.totalStake,
            profitLoss: this.metrics.profitLoss,
            roi: this.metrics.roi,
            winRate: this.metrics.winRate,
            clv: this.metrics.clvAverage;
        };
        this.timeSeriesData.push({
            timestamp: Date.now(),
            metrics: currentMetrics;
        });
        // Emit metrics update;
        this.eventBus.emit('metric:recorded', {
            name: 'performance_metrics',
            value: this.metrics.profitLoss,
            timestamp: Date.now(),
            labels: {
                win_rate: this.metrics.winRate.toFixed(2),
                roi: this.metrics.roi.toFixed(2),
                clv: this.metrics.clvAverage.toFixed(2)
            }
        });
    }
    cleanupOldData() {

        // Clean up time series data;
        while (this.timeSeriesData.length > 0 &&
            this.timeSeriesData[0].timestamp < cutoffTime) {
            this.timeSeriesData.shift();
        }
        // Clean up bets;
        for (const [id, bet] of this.bets) {
            if (bet.placedAt < cutoffTime) {
                this.bets.delete(id);
            }
        }
        // Clean up opportunities;
        for (const [id, opportunity] of this.opportunities) {
            if (opportunity.timestamp < cutoffTime) {
                this.opportunities.delete(id);
            }
        }
        // Clean up risk assessments;
        for (const [id, assessment] of this.riskAssessments) {
            if (assessment.timestamp < cutoffTime) {
                this.riskAssessments.delete(id);
            }
        }
    }
    handleBetSettlement(betId, result) {

        if (!bet)
            return;
        // Update bet result;
        bet.result = result.won ? 'WIN' : 'LOSS';
        bet.profitLoss = result.profitLoss;
        // Calculate CLV if closing odds available;
        if (bet.metadata?.closingOdds) {



            bet.metadata.clv = clv;
        }
    }
    updateMetrics() {


        // Calculate basic metrics;
        metrics.totalBets = bets.length;
        metrics.winningBets = bets.filter(bet => bet.result === 'WIN').length;
        metrics.losingBets = bets.filter(bet => bet.result === 'LOSS').length;
        metrics.pushBets = bets.filter(bet => bet.result === 'PUSH').length;
        metrics.pendingBets = bets.filter(bet => bet.result === 'PENDING').length;
        // Calculate stake and returns;
        metrics.totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0);
        metrics.totalReturn = bets.reduce((sum, bet) => sum + (bet.profitLoss || 0), 0);
        metrics.profitLoss = metrics.totalReturn - metrics.totalStake;
        // Calculate ratios;

        metrics.winRate = settledBets.length > 0;
            ? metrics.winningBets / settledBets.length;
            : 0;
        metrics.roi = metrics.totalStake > 0;
            ? metrics.profitLoss / metrics.totalStake;
            : 0;
        // Calculate averages;
        metrics.averageStake = metrics.totalBets > 0;
            ? metrics.totalStake / metrics.totalBets;
            : 0;
        metrics.averageOdds = bets.length > 0;
            ? bets.reduce((sum, bet) => sum + bet.odds, 0) / bets.length;
            : 0;
        // Calculate CLV metrics;

        metrics.clvAverage = betsWithClv.length > 0;
            ? betsWithClv.reduce((sum, bet) => sum + (bet.metadata?.clv || 0), 0) / betsWithClv.length;
            : 0;
        // Calculate edge retention;
        const predictedEdge = bets.reduce((sum, bet) => {

            return sum + (opportunity?.edge || 0);
        }, 0);

        metrics.edgeRetention = predictedEdge > 0;
            ? realizedEdge / predictedEdge;
            : 0;
        // Calculate advanced metrics;
        metrics.maxDrawdown = this.calculateMaxDrawdown(bets);
        metrics.sharpeRatio = this.calculateSharpeRatio(bets);
        metrics.kellyMultiplier = this.calculateKellyMultiplier(metrics);
        metrics.timeInMarket = this.calculateTimeInMarket(bets);
        this.metrics = metrics;
    }
    calculateMaxDrawdown(bets) {
        const peak = 0;
        const maxDrawdown = 0;
        const currentBalance = 0;
        for (const bet of bets) {
            if (bet.result === 'PENDING')
                continue;
            currentBalance += bet.profitLoss || 0;
            peak = Math.max(peak, currentBalance);
            maxDrawdown = Math.max(maxDrawdown, peak - currentBalance);
        }
        return maxDrawdown;
    }
    calculateSharpeRatio(bets) {
        const returns = bets;
            .filter(bet => bet.result !== 'PENDING')
            .map(bet => bet.profitLoss || 0);
        if (returns.length < 2)
            return 0;



        return stdDev > 0 ? averageReturn / stdDev : 0;
    }
    calculateKellyMultiplier(metrics) {
        const { winRate, averageOdds } = metrics;
        if (winRate <= 0 || averageOdds <= 1)
            return 0;



        // Return a conservative fraction of Kelly;
        return Math.max(0, Math.min(kelly * 0.5, 1));
    }
    calculateTimeInMarket(bets) {
        return bets.reduce((total, bet) => {


            return total + (endTime - startTime);
        }, 0);
    }
    /**
     * Returns a breakdown of metrics by metric type. If analytics is disabled, returns an empty array.
     */
    getMetricBreakdown() {
        if (!UnifiedConfig.getInstance().get('enableAnalytics')) {
            return [];
        }

        for (const bet of this.bets.values()) {

            if (!breakdown.has(metric || '')) {
                breakdown.set(metric, {
                    metric,
                    bets: 0,
                    stake: 0,
                    profitLoss: 0,
                    roi: 0,
                    winRate: 0,
                    averageOdds: 0,
                    clv: 0;
                });
            }

            stats.bets++;
            stats.stake += bet.stake;
            stats.profitLoss += bet.profitLoss || 0;
            stats.averageOdds += bet.odds;
            if (bet.result === 'WIN')
                stats.winRate++;
            if (bet.metadata?.clv)
                stats.clv += bet.metadata.clv;
        }
        // Calculate final metrics;
        return Array.from(breakdown.values()).map(stats => ({
            ...stats,
            roi: stats.stake > 0 ? stats.profitLoss / stats.stake : 0,
            winRate: stats.bets > 0 ? stats.winRate / stats.bets : 0,
            averageOdds: stats.bets > 0 ? stats.averageOdds / stats.bets : 0,
            clv: stats.bets > 0 ? stats.clv / stats.bets : 0;
        }));
    }
    /**
     * Returns a breakdown of metrics by player. If analytics is disabled, returns an empty array.
     */
    getPlayerBreakdown() {
        if (!UnifiedConfig.getInstance().get('enableAnalytics')) {
            return [];
        }

        for (const bet of this.bets.values()) {

            if (!breakdown.has(playerId)) {
                breakdown.set(playerId, {
                    playerId,
                    bets: 0,
                    stake: 0,
                    profitLoss: 0,
                    roi: 0,
                    winRate: 0,
                    averageOdds: 0,
                    metrics: []
                });
            }

            stats.bets += 1;
            stats.stake += bet.stake;
            stats.profitLoss += bet.profitLoss ?? 0;
            if (bet.result === 'WIN')
                stats.winRate += 1;
            stats.averageOdds += bet.odds;
            if (bet.metric) {
                stats.metrics.push(bet.metric);
            }
        }
        return Array.from(breakdown.values()).map(stats => ({
            ...stats,
            roi: stats.stake > 0 ? stats.profitLoss / stats.stake : 0,
            winRate: stats.bets > 0 ? stats.winRate / stats.bets : 0,
            averageOdds: stats.bets > 0 ? stats.averageOdds / stats.bets : 0;
        }));
    }
    getTimeSeriesData(interval) {

        let intervalMs;
        switch (interval) {
            case '7d':
                intervalMs = 604800000;
                break;
            case '30d':
                intervalMs = 2592000000;
                break;
            case '1d':
            default:
                intervalMs = 86400000;
                break;
        }
        return this.timeSeriesData.filter(point => now - point.timestamp <= intervalMs);
    }
    getMetrics() {
        return { ...this.metrics };
    }
    getBets() {
        return Array.from(this.bets.values());
    }
    getConfig() {
        return { ...this.config };
    }
}
