import { EventBus } from './EventBus.ts';
import { PerformanceMonitor } from './PerformanceMonitor.ts';
import { UnifiedConfigManager } from './UnifiedConfigManager.ts';
import { unifiedDataEngine } from './UnifiedDataEngine.ts';
import { unifiedMonitor } from './UnifiedMonitor.ts';
import { UnifiedPredictionEngine } from './UnifiedPredictionEngine.ts';
import { UnifiedPredictionService, } from '../services/unified/UnifiedPredictionService.ts';
export class UnifiedStrategyEngine {
    constructor() {
        this.isInitialized = false;
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.dataEngine = unifiedDataEngine;
        this.predictionEngine = UnifiedPredictionEngine.getInstance();
        this.configManager = UnifiedConfigManager.getInstance();
        this.monitor = unifiedMonitor;
        this.predictionService = new UnifiedPredictionService({
            minConfidence: 0.65,
            maxRiskPerBet: 0.05,
            bankrollPercentage: 0.02,
        });
        this.performance = new Map();
        this.riskProfiles = new Map();
        this.activeStrategies = new Map();
        this.hedgingOpportunities = new Map();
        this.strategies = new Map();
        this.metrics = new Map();
        this.strategyConfig = {
            riskTolerance: 0.5,
            maxExposure: 1000,
            minConfidence: 0.7,
            hedgingEnabled: false,
            adaptiveStaking: true,
            profitTarget: 0.1,
            stopLoss: 0.05,
            confidenceThreshold: 0.8,
            maxRiskPerBet: 0.05,
            kellyMultiplier: 1.0,
        };
        this.setupEventListeners();
        this.initializeStrategies();
    }
    static getInstance() {
        if (!UnifiedStrategyEngine.instance) {
            UnifiedStrategyEngine.instance = new UnifiedStrategyEngine();
        }
        return UnifiedStrategyEngine.instance;
    }
    async initialize() {
        if (this.isInitialized)
            return;

        try {
            // Load configuration;

            // Initialize strategy configuration;
            this.strategyConfig = {
                ...this.strategyConfig,
                ...config.strategy,
            };
            this.isInitialized = true;
            this.performanceMonitor.endTrace(traceId);
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    setupEventListeners() {
        this.eventBus.on('market:update', this.handleMarketUpdate.bind(this));
        this.eventBus.on('prediction:update', this.handlePredictionUpdate.bind(this));
        this.eventBus.on('data:updated', async ({ data }) => {
            try {

                this.eventBus.emit('strategy:opportunities', { opportunities });
            }
            catch (error) {
                // console statement removed
            }
        });
    }
    async handleMarketUpdate(update) {

        try {
            const context = {
                playerId: update.data.playerId,
                metric: update.data.metric,
                timestamp: update.timestamp,
                marketState: {
                    line: update.data.value,
                    volume: update.data.volume || 0,
                    movement: update.data.movement || 'stable',
                },
                predictionState: await this.getPredictionState(update.data.playerId, update.data.metric),
            };

            this.eventBus.emit('strategy:recommendation', recommendation);
            this.performanceMonitor.endTrace(traceId);
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            this.monitor.reportError('strategy', error);
        }
    }
    async handlePredictionUpdate(update) {

        try {
            const context = {
                playerId: update.propId.split(':')[0],
                metric: update.propId.split(':')[1],
                timestamp: update.timestamp,
                marketState: update.marketState,
                predictionState: {
                    value: update.expectedValue,
                    confidence: update.confidence,
                    factors: update.analysis.marketSignals.map(s => s.signal),
                },
            };

            this.eventBus.emit('strategy:recommendation', recommendation);
            this.performanceMonitor.endTrace(traceId);
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            this.monitor.reportError('strategy', error);
        }
    }
    async generateRecommendation(context) {

        try {
            // Execute all registered strategies;
            const recommendations = await Promise.all(Array.from(this.strategies.entries()).map(async ([id, strategy]) => {

                try {

                    this.updateMetrics(id, result);
                    this.performanceMonitor.endTrace(strategyTraceId);
                    return result;
                }
                catch (error) {
                    this.performanceMonitor.endTrace(strategyTraceId, error);
                    return null;
                }
            }));
            // Filter out failed strategies and combine recommendations;


            this.performanceMonitor.endTrace(traceId);
            return combinedRecommendation;
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    async getPredictionState(playerId, metric) {
        const prediction = await this.predictionEngine.generatePrediction({
            playerId,
            metric,
            timestamp: Date.now(),
        });
        return {
            value: prediction.expectedValue,
            confidence: prediction.confidence,
            factors: prediction.analysis.marketSignals.map(s => s.signal),
        };
    }
    async getMarketState(propId) {

        return {
            line: marketData.line,
            volume: marketData.volume,
            movement: marketData.movement,
        };
    }
    updateMetrics(strategyId, recommendation) {
        const currentMetrics = this.metrics.get(strategyId) || {
            totalRecommendations: 0,
            successfulRecommendations: 0,
            averageConfidence: 0,
            lastUpdate: 0,
        };
        this.metrics.set(strategyId, {
            totalRecommendations: currentMetrics.totalRecommendations + 1,
            successfulRecommendations: currentMetrics.successfulRecommendations + (recommendation.success ? 1 : 0),
            averageConfidence: (currentMetrics.averageConfidence * currentMetrics.totalRecommendations +
                recommendation.confidence) /
                (currentMetrics.totalRecommendations + 1),
            lastUpdate: Date.now(),
        });
    }
    combineRecommendations(recommendations) {
        if (recommendations.length === 0) {
            throw new Error('No valid recommendations to combine');
        }
        // Weight recommendations by strategy performance and confidence;
        const weightedRecommendations = recommendations.map(rec => {

            const successRate = metrics;
                ? metrics.successfulRecommendations / metrics.totalRecommendations;
                : 0.5;
            return {
                ...rec,
                weight: rec.confidence * successRate,
            };
        });

        return {
            strategyId: 'combined',
            type: this.getMostCommonType(weightedRecommendations),
            confidence: weightedRecommendations.reduce((sum, rec) => sum + rec.confidence * rec.weight, 0) /
                totalWeight,
            expectedValue: weightedRecommendations.reduce((sum, rec) => sum + rec.expectedValue * rec.weight, 0) /
                totalWeight,
            riskAssessment: this.combineRiskAssessments(weightedRecommendations.map(r => r.riskAssessment)),
            timestamp: Date.now(),
            success: false, // Will be updated when outcome is known;
        };
    }
    getMostCommonType(recommendations) {
        const typeWeights = recommendations.reduce((acc, rec) => {
            acc[rec.type] = (acc[rec.type] || 0) + rec.weight;
            return acc;
        }, {});
        return typeWeights.OVER > (typeWeights.UNDER || 0) ? 'OVER' : 'UNDER';
    }
    combineRiskAssessments(assessments) {

        const totalRiskScore = 0;
        assessments.forEach(assessment => {
            assessment.factors.forEach(factor => riskFactors.add(factor));
            totalRiskScore += assessment.riskScore;
        });
        return {
            riskScore: totalRiskScore / assessments.length,
            factors: Array.from(riskFactors),
            timestamp: Date.now(),
        };
    }
    initializeStrategies() {
        // Register default strategies;
        this.registerStrategy('momentum', async (context) => {

            return {
                strategyId: 'momentum',
                type: momentum > 0 ? 'OVER' : 'UNDER',
                confidence: Math.abs(momentum),
                expectedValue: context.marketState.line * (1 + momentum),
                riskAssessment: {
                    riskScore: 1 - Math.abs(momentum),
                    factors: ['market_momentum'],
                    timestamp: Date.now(),
                },
                timestamp: Date.now(),
                success: false,
            };
        });
        this.registerStrategy('value', async (context) => {

            return {
                strategyId: 'value',
                type: edge > 0 ? 'OVER' : 'UNDER',
                confidence: context.predictionState.confidence,
                expectedValue: context.predictionState.value,
                riskAssessment: {
                    riskScore: 1 - context.predictionState.confidence,
                    factors: ['prediction_edge'],
                    timestamp: Date.now(),
                },
                timestamp: Date.now(),
                success: false,
            };
        });
    }
    calculateMomentum(context) {
        switch (context.marketState.movement) {
            case 'up':
                return context.marketState.volume > 1000 ? 0.8 : 0.4;
            case 'down':
                return context.marketState.volume > 1000 ? -0.8 : -0.4;
            default:
                return 0;
        }
    }
    registerStrategy(id, strategy) {
        if (this.strategies.has(id)) {
            throw new Error(`Strategy with ID ${id} is already registered`);
        }
        this.strategies.set(id, strategy);
    }
    getMetrics() {
        return new Map(this.metrics);
    }
    async evaluateOpportunity(opportunity) {
        const context = {
            playerId: opportunity.propId.split(':')[0],
            metric: opportunity.propId.split(':')[1],
            timestamp: Date.now(),
            marketState: opportunity.marketState,
            predictionState: await this.getPredictionState(opportunity.propId.split(':')[0], opportunity.propId.split(':')[1]),
        };

        return recommendation.riskAssessment;
    }
    async updatePerformance(bet) {

        const performance = this.performance.get(key);
        if (!performance) {
            performance = {
                wins: 0,
                losses: 0,
                totalBets: 0,
                profitLoss: 0,
                roi: 0,
                lastUpdate: Date.now(),
            };
            this.performance.set(key, performance);
        }
        // Update performance metrics;
        performance.totalBets++;
        if (bet.result === 'WIN') {
            performance.wins++;
            performance.profitLoss += bet.payout - bet.stake;
        }
        else {
            performance.losses++;
            performance.profitLoss -= bet.stake;
        }
        performance.roi = performance.profitLoss / (performance.totalBets * bet.stake);
        performance.lastUpdate = Date.now();
        // Emit performance update event;
        this.eventBus.emit('metric:recorded', {
            name: 'strategy_performance',
            value: performance.roi,
            timestamp: Date.now(),
            labels: {
                strategy: key,
                wins: String(performance.wins),
                losses: String(performance.losses),
                profit_loss: String(performance.profitLoss),
            },
        });
    }
    async analyzeOpportunities(data) {

        // Group props by game;

        // Analyze single props;
        for (const prop of data) {
            if (prop.type === 'prop') {

                if (opportunity) {
                    opportunities.push(opportunity);
                }
            }
        }
        // Analyze potential parlays;
        for (const [, gameProps] of propsByGame) {

            opportunities.push(...parlayOpportunities);
        }
        // Sort by expected value;
        return opportunities.sort((a, b) => b.expectedValue - a.expectedValue);
    }
    groupPropsByGame(data) {

        for (const point of data) {
            if (point.type === 'prop' && point.metadata?.gameId) {

                if (!propsByGame.has(gameId)) {
                    propsByGame.set(gameId, []);
                }
                propsByGame.get(gameId).push(point);
            }
        }
        return propsByGame;
    }
    async analyzeSingleProp(prop) {

        if (prediction.confidence < this.strategyConfig.minConfidence) {
            return null;
        }



        return {
            id: `single_${prop.id}`,
            type: 'prop',
            confidence: prediction.confidence,
            expectedValue,
            risk,
            recommendedStake: stake,
            maxStake: this.calculateMaxStake(risk),
            props: [
                {
                    id: prop.id,
                    prediction,
                    odds: prop.value.odds,
                },
            ],
        };
    }
    async analyzeParlayOpportunities(props) {

        const maxLegs = 4; // Maximum number of legs in a parlay;
        // Generate combinations of 2-4 legs;
        for (const legs = 2; legs <= maxLegs; legs++) {

            for (const combo of combinations) {

                if (opportunity) {
                    opportunities.push(opportunity);
                }
            }
        }
        return opportunities;
    }
    async analyzeParlay(props) {

        // Calculate combined confidence;

        if (combinedConfidence < this.strategyConfig.minConfidence) {
            return null;
        }


        // Calculate combined odds and expected value;


        return {
            id: `parlay_${props.map(p => p.id).join('_')}`,
            type: 'parlay',
            confidence: combinedConfidence,
            expectedValue,
            risk,
            recommendedStake: stake,
            maxStake: this.calculateMaxStake(risk),
            props: props.map((prop, i) => ({
                id: prop.id,
                prediction: predictions[i],
                odds: prop.value.odds,
            })),
        };
    }
    calculateRiskLevel(confidence) {
        if (confidence >= 0.8)
            return 'low';
        if (confidence >= 0.7)
            return 'medium';
        return 'high';
    }
    calculateOptimalStake(confidence, risk) {
        // Kelly Criterion calculation with risk adjustment;


        return Math.min(kellyStake, this.strategyConfig.maxRiskPerBet, this.calculateMaxStake(risk));
    }
    calculateMaxStake(risk) {

        switch (risk) {
            case 'low':
                return baseMax;
            case 'medium':
                return baseMax * 0.75;
            case 'high':
                return baseMax * 0.5;
        }
    }
    calculateExpectedValue(confidence, odds) {
        return confidence * (odds - 1) - (1 - confidence);
    }
    generateCombinations(items, size) {
        if (size === 0)
            return [[]];
        if (items.length === 0)
            return [];



        const combosWithFirst = this.generateCombinations(rest, size - 1).map(combo => [
            first,
            ...combo,
        ]);
        return [...combosWithoutFirst, ...combosWithFirst];
    }
    assessRisk(currentBets) {




        return {
            currentExposure,
            maxAllowedStake,
            riskLevel,
            factors,
        };
    }
    calculatePortfolioRisk(bets) {


        if (exposureRatio >= 0.8)
            return 'high';
        if (exposureRatio >= 0.5)
            return 'medium';
        return 'low';
    }
    identifyRiskFactors(bets, exposure) {

        // Check exposure;
        if (exposure > this.strategyConfig.maxExposure * 0.8) {
            factors.push('High total exposure');
        }
        // Check concentration;

        for (const bet of bets) {
            for (const prop of bet.props) {

                gameConcentration.set(gameId, (gameConcentration.get(gameId) || 0) + bet.recommendedStake);
            }
        }

        if (maxGameExposure > this.strategyConfig.maxExposure * 0.4) {
            factors.push('High game concentration');
        }
        // Check correlation;

        if (correlatedBets.length > 0) {
            factors.push('Correlated bets detected');
        }
        return factors;
    }
    findCorrelatedBets(bets) {

        for (const i = 0; i < bets.length; i++) {
            for (const j = i + 1; j < bets.length; j++) {
                if (this.areCorrelated(bets[i], bets[j])) {
                    correlated.push([bets[i].id, bets[j].id]);
                }
            }
        }
        return correlated;
    }
    areCorrelated(bet1, bet2) {
        // Check if bets are from the same game;



        if (!sameGame)
            return false;
        // Check if bets involve the same player;


        return Array.from(players1).some(p => players2.has(p));
    }
}
function isMarketUpdate(payload) {
    if (!payload || typeof payload !== 'object')
        return false;

    return (typeof update.data.playerId === 'string' &&
        typeof update.data.metric === 'string' &&
        typeof update.data.value === 'number' &&
        typeof update.data.timestamp === 'number');
}
function isStrategyRecommendation(payload) {
    if (!payload || typeof payload !== 'object')
        return false;

    return (typeof rec.id === 'string' &&
        typeof rec.propId === 'string' &&
        typeof rec.confidence === 'number' &&
        typeof rec.expectedValue === 'number' &&
        Array.isArray(rec.analysis?.historicalTrends) &&
        Array.isArray(rec.analysis?.marketSignals) &&
        Array.isArray(rec.analysis?.riskFactors));
}
