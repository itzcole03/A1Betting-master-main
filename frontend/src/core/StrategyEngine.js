import { AdvancedAnalysisEngine, } from "./AdvancedAnalysisEngine";
import { DataIntegrationHub } from "./DataIntegrationHub";
import { EventBus } from "./EventBus";
import { FeatureFlags } from "./FeatureFlags";
import { PerformanceMonitor } from "./PerformanceMonitor";
import { PredictionEngine } from "./PredictionEngine";
function toRiskTolerance(level) {
    switch (level) {
        case "LOW":
            return "low";
        case "MEDIUM":
            return "medium";
        case "HIGH":
            return "high";
        default:
            return level;
    }
}
export class StrategyEngine {
    constructor() {
        this.PERFORMANCE_UPDATE_INTERVAL = 1000 * 60 * 60; // 1 hour;
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.featureManager = FeatureFlags.getInstance();
        this.analysisEngine = AdvancedAnalysisEngine.getInstance();
        this.dataHub = DataIntegrationHub.getInstance();
        this.config = this.getDefaultConfig();
        this.state = this.getDefaultState();
        this.compositeStrategies = new Map();
        this.strategyPerformance = new Map();
        this.predictionEngine = PredictionEngine.getInstance();
        this.setupPerformanceTracking();
    }
    static getInstance() {
        if (!StrategyEngine.instance) {
            StrategyEngine.instance = new StrategyEngine();
        }
        return StrategyEngine.instance;
    }
    getDefaultConfig() {
        return {
            maxExposure: 100,
            minStake: 10,
            maxStake: 100,
            kellyFraction: 0.5,
            volatilityThreshold: 0.5,
            liquidityThreshold: 0.5,
            depthThreshold: 0.5,
            momentumThreshold: 0.5,
            marginOfError: 0.05,
            stopLossPercentage: 0.1,
            takeProfitPercentage: 0.2,
            hedgingThreshold: 0.1,
            maxVolatility: 1.5,
            minLiquidity: 0.5,
            minValueGap: 0.1,
            sentimentThreshold: 0.6,
            minConfidence: 0.7,
            maxRiskLevel: "medium",
            requiredDataQuality: 0.8,
            marketEfficiencyThreshold: 0.85,
        };
    }
    getDefaultState() {
        return {
            bankroll: 1000,
            activeBets: new Map(),
            performance: {
                totalBets: 0,
                winRate: 0,
                roi: 0,
                averageOdds: 0,
                profitLoss: 0,
                latency: [],
                throughput: 0,
                errorRate: 0,
                resourceUsage: {
                    cpu: 0,
                    memory: 0,
                    network: 0,
                },
                streakData: {
                    current: 0,
                    longest: {
                        wins: 0,
                        losses: 0,
                    },
                },
            },
        };
    }
    setupPerformanceTracking() {
        setInterval(() => this.updateStrategyPerformance(), this.PERFORMANCE_UPDATE_INTERVAL);
        this.eventBus.subscribe("strategy:execution-completed", (event) => {
            const { strategyId, result } = event.payload;
            this.updateStrategyResult(strategyId, result);
        });
    }
    createCompositeStrategy(name, strategies, weights, conditions) {
        if (strategies.length !== weights.length) {
            throw new Error("Strategies and weights arrays must have the same length");
        }
        if (Math.abs(weights.reduce((a, b) => a + b, 0) - 1) > 0.0001) {
            throw new Error("Weights must sum to 1");
        }

        this.compositeStrategies.set(id, {
            id,
            name,
            strategies,
            weights,
            conditions,
            performance: {
                totalExecutions: 0,
                successRate: 0,
                averageReturn: 0,
                riskProfile: {
                    level: "low",
                    factors: [],
                },
                lastUpdated: Date.now(),
            },
        });
        return id;
    }
    async analyzeOpportunity(playerId, metric) {

        try {

            if (!this.meetsQualityThresholds(analysis)) {
                return null;
            }


            if (!baseRecommendation) {
                return null;
            }
            // Apply composite strategies if available;

            this.performanceMonitor.endTrace(traceId);
            return enhancedRecommendation;
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    meetsQualityThresholds(analysis) {
        return (analysis.meta_analysis.data_quality >= this.config.requiredDataQuality &&
            analysis.meta_analysis.market_efficiency >=
                this.config.marketEfficiencyThreshold);
    }
    async generateRecommendation(playerId, metric, analysis, data) {

        if (!prediction || prediction.confidence < this.config.minConfidence) {
            return null;
        }



        if (Math.abs(valueGap) < this.config.minValueGap) {
            return null;
        }


        if (this.getRiskLevel(toRiskTolerance(riskAssessment.level)) >
            this.getRiskLevel(toRiskTolerance(this.config.maxRiskLevel))) {
            return null;
        }
        // Compose risk_reasoning from riskAssessment and analysis;
        const risk_reasoning = [
            ...(riskAssessment.factors || []),
            ...(analysis.risks ? Object.values(analysis.risks).flatMap(r => r.factors || []) : []),
        ];
        return {
            id: `strategy-${Date.now()}`,
            type: position.toUpperCase(),
            confidence: prediction.confidence,
            expectedValue: this.calculateExpectedValue(valueGap, prediction.confidence),
            riskAssessment,
            analysis: {
                historicalTrends: [], // Placeholder;
                marketSignals: [], // Placeholder;
                riskFactors: [], // Placeholder;
                risk_reasoning,
            },
            risk_reasoning, // direct field for legacy/compat;
            propId: `${playerId}:${metric}`,
        };
    }
    analyzeMarketData(playerId, metric, data) {

        const currentLine = 0;
        const movement = "stable";
        const valueGap = 0;
        if (relevantMarkets && Object.keys(relevantMarkets).length > 0) {
            currentLine = this.calculateWeightedLine(relevantMarkets);
            movement = this.analyzeMarketMovement(relevantMarkets, data);
            valueGap = this.calculateMarketValueGap(currentLine, data.projections[playerId]?.stats[metric]);
        }
        return {
            playerId,
            metric,
            currentLine,
            movement,
            valueGap,
            volatility: 0,
            liquidity: 0,
            marketDepth: 0,
            momentum: 0,
        };
    }
    findRelevantMarkets(playerId, metric, data) {

        Object.entries(data.odds).forEach(([eventId, odds]) => {
            Object.entries(odds.markets).forEach(([market, price]) => {
                if (this.isMarketRelevant(market, playerId, metric)) {
                    markets[market] = price;
                }
            });
        });
        return Object.keys(markets).length > 0 ? markets : null;
    }
    isMarketRelevant(market, playerId, metric) {



        return (marketLower.includes(playerLower) && marketLower.includes(metricLower));
    }
    calculateWeightedLine(markets) {

        if (prices.length === 0)
            return 0;
        // Simple average for now, could be enhanced with volume-weighted average;
        return prices.reduce((a, b) => a + b, 0) / prices.length;
    }
    analyzeMarketMovement(markets, data) {
        const movements = Object.keys(markets).map((market) => {

            if (!eventId)
                return "stable";

            return odds?.movement.direction ?? "stable";
        });


        if (Math.abs(upCount - downCount) < 2)
            return "stable";
        return upCount > downCount ? "increasing" : "decreasing";
    }
    findEventIdForMarket(market, data) {
        for (const [eventId, odds] of Object.entries(data.odds)) {
            if (market in odds.markets) {
                return eventId;
            }
        }
        return null;
    }
    calculateMarketValueGap(currentLine, projectedValue) {
        if (!projectedValue)
            return 0;
        return projectedValue - currentLine;
    }
    analyzeSentiment(playerId, data) {

        if (!sentiment) {
            return `${playerId}:unknown:0:neutral:[]`;
        }
        return `${playerId}:${sentiment.sentiment.score}:${this.determineSentimentTrend(sentiment)}:${sentiment.keywords.join(",")}`;
    }
    calculateValueGap(marketData) {
        return marketData.valueGap;
    }
    assessRisk(marketData, analysis) {


        return {
            level: riskLevel,
            factors: riskFactors,
        };
    }
    calculateRiskLevel(marketData, analysis) {




        if (riskScore < 0.3)
            return "low";
        if (riskScore < 0.7)
            return "medium";
        return "high";
    }
    identifyRiskFactors(marketData, analysis) {

        if (marketData.volatility > this.config.volatilityThreshold) {
            factors.push("High market volatility");
        }
        if (marketData.liquidity < this.config.liquidityThreshold) {
            factors.push("Low market liquidity");
        }
        if (marketData.marketDepth < this.config.depthThreshold) {
            factors.push("Insufficient market depth");
        }
        if (marketData.momentum < this.config.momentumThreshold) {
            factors.push("Weak market momentum");
        }
        // Add risks from analysis;
        Object.entries(analysis.risks).forEach(([type, risk]) => {
            if (toRiskTolerance(risk.level) !== "low") {
                factors.push(...risk.factors);
            }
        });
        return factors;
    }
    calculateExpectedValue(valueGap, confidence) {
        return Math.abs(valueGap) * confidence * (1 - this.config.marginOfError);
    }
    determineSentimentTrend(sentiment) {


        if (volume < 100)
            return "insufficient data";
        if (Math.abs(score) < 0.2)
            return "neutral";
        if (Math.abs(score) < 0.5)
            return score > 0 ? "slightly positive" : "slightly negative";
        if (Math.abs(score) < 0.8)
            return score > 0 ? "positive" : "negative";
        return score > 0 ? "strongly positive" : "strongly negative";
    }
    getRiskLevel(level) {
        switch (level) {
            case "low":
                return 1;
            case "medium":
                return 2;
            case "high":
                return 3;
        }
    }
    async applyCompositeStrategies(baseRecommendation, analysis, data) {


        const totalWeight = 0;
        for (const [, composite] of this.compositeStrategies) {
            if (this.shouldApplyStrategy(composite, analysis, data)) {
                const strategyResults = await Promise.all(composite.strategies.map(async (strategyId, index) => {

                    return {
                        result,
                        weight: composite.weights[index],
                    };
                }));
                // Combine strategy results;
                strategyResults.forEach(({ result, weight }) => {
                    if (result) {
                        finalRecommendation.confidence =
                            (finalRecommendation.confidence * totalWeight +
                                result.confidence * weight) /
                                (totalWeight + weight);
                        finalRecommendation.expectedValue =
                            (finalRecommendation.expectedValue * totalWeight +
                                result.expectedValue * weight) /
                                (totalWeight + weight);
                        totalWeight += weight;
                    }
                });
            }
        }
        return finalRecommendation;
    }
    shouldApplyStrategy(strategy, analysis, data) {
        // Check confidence threshold;
        if (analysis.meta_analysis.prediction_stability <
            strategy.conditions.minConfidence) {
            return false;
        }
        // Check risk level;


        if (currentRisk) {
            return false;
        }
        // Check market state conditions;

        if (!strategy.conditions.marketStates.includes(marketState)) {
            return false;
        }
        return true;
    }
    async executeStrategy(strategyId, baseRecommendation, analysis, data) {
        // Implementation for individual strategy execution;
        return baseRecommendation; // Placeholder;
    }
    determineMarketState(data) {
        // Analyze market conditions to determine state;
        // Example states: 'stable', 'volatile', 'trending', etc.
        return "stable"; // Placeholder;
    }
    updateStrategyResult(strategyId, result) {
        const performance = this.strategyPerformance.get(strategyId) || {
            totalExecutions: 0,
            successRate: 0,
            averageReturn: 0,
            riskProfile: {
                level: "low",
                factors: [],
            },
            lastUpdated: Date.now(),
        };
        // Update performance metrics;
        performance.totalExecutions++;
        performance.lastUpdated = Date.now();
        this.strategyPerformance.set(strategyId, performance);
        // Adjust composite strategy weights based on performance;
        this.adjustStrategyWeights();
    }
    adjustStrategyWeights() {
        for (const [id, composite] of this.compositeStrategies) {

            if (performances.some((p) => !p))
                continue;
            // Calculate new weights based on relative performance;


            // Update weights;
            this.compositeStrategies.set(id, {
                ...composite,
                weights: newWeights,
            });
        }
    }
    updateStrategyPerformance() {
        for (const [strategyId, performance] of this.strategyPerformance) {
            if (Date.now() - performance.lastUpdated >
                this.PERFORMANCE_UPDATE_INTERVAL) {
                // Recalculate long-term performance metrics;
                this.recalculatePerformanceMetrics(strategyId);
            }
        }
    }
    recalculatePerformanceMetrics(strategyId) {
        // Implementation for recalculating long-term performance metrics;
        // This would typically involve fetching historical data and updating the metrics;
    }
    validateRecommendation(recommendation) {
        if (!recommendation.id) {
            throw new Error("Strategy recommendation must have an ID");
        }
        if (!recommendation.type) {
            throw new Error("Strategy recommendation must have a type");
        }
        if (typeof recommendation.confidence !== "number" ||
            recommendation.confidence < 0 ||
            recommendation.confidence > 1) {
            throw new Error("Invalid confidence value");
        }
        if (typeof recommendation.expectedValue !== "number" ||
            recommendation.expectedValue <= 0) {
            throw new Error("Invalid expected value");
        }
        if (!recommendation.riskAssessment ||
            !recommendation.riskAssessment.level) {
            throw new Error("Invalid risk assessment");
        }
    }
    async generateStrategy(marketData) {

        try {


            if (Math.abs(valueGap) < this.config.minValueGap) {
                throw new Error("Value gap below minimum threshold");
            }
            if (!this.meetsQualityThresholds(analysis)) {
                throw new Error("Analysis quality below required threshold");
            }


            if (this.getRiskLevel(toRiskTolerance(riskAssessment.level)) >
                this.getRiskLevel(toRiskTolerance(this.config.maxRiskLevel))) {
                throw new Error("Risk level exceeds maximum threshold");
            }

            if (!prediction || prediction.confidence < this.config.minConfidence) {
                throw new Error("Prediction confidence below minimum threshold");
            }
            const historicalTrends = Object.entries(analysis.trends)
                .map(([metric, trend]) => {

                return [
                    `${metric}: ${trendData.direction} (${trendData.strength})`,
                    ...(trendData.supporting_data || []),
                ];
            })
                .flat();
            const recommendation = {
                id: `strategy-${Date.now()}`,
                type: position.toUpperCase(),
                confidence: prediction.confidence,
                expectedValue: this.calculateExpectedValue(valueGap, prediction.confidence),
                riskAssessment,
                analysis: {
                    historicalTrends,
                    marketSignals: analysis.opportunities;
                        .map((opp) => opp.rationale)
                        .flat(),
                    riskFactors: Object.entries(analysis.risks)
                        .map(([type, risk]) => [`${type}: ${risk.level}`, ...risk.factors])
                        .flat(),
                },
                propId: `${marketData.playerId}:${marketData.metric}`,
            };
            this.validateRecommendation(recommendation);
            this.performanceMonitor.endTrace(traceId);
            return recommendation;
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    calculateExposure(valueGap, confidence) {
        return Math.min(valueGap * confidence, this.config.maxExposure);
    }
    calculateStake(valueGap, confidence) {



        const kellyStake = bankroll *
            ((odds * confidence - (1 - confidence)) / odds) *
            kellyFraction;
        return Math.min(Math.max(kellyStake, this.config.minStake), this.config.maxStake);
    }
    determineExecutionTiming(marketData, sentiment) {
        if (marketData.volatility > this.config.volatilityThreshold) {
            return "monitor";
        }
        if (sentiment.score < this.config.sentimentThreshold) {
            return "wait";
        }
        return "immediate";
    }
    determineExecutionConditions(marketData) {

        if (marketData.volatility > this.config.volatilityThreshold) {
            conditions.push(`Wait for volatility to drop below ${this.config.volatilityThreshold}`);
        }
        if (marketData.liquidity < this.config.liquidityThreshold) {
            conditions.push(`Wait for liquidity to increase above ${this.config.liquidityThreshold}`);
        }
        if (marketData.valueGap < this.config.minValueGap) {
            conditions.push(`Wait for value gap to increase above ${this.config.minValueGap}`);
        }
        return conditions;
    }
    determineExitCriteria(marketData) {
        return [
            `Stop loss at ${this.calculateStopLoss(marketData)}`,
            `Take profit at ${this.calculateTakeProfit(marketData)}`,
            `Exit if volatility exceeds ${this.config.maxVolatility}`,
            `Exit if liquidity drops below ${this.config.minLiquidity}`,
        ];
    }
    findHedgingOpportunities(marketData) {
        return [
            `Consider opposite position if value gap reverses by ${this.config.hedgingThreshold}%`,
            `Look for correlated markets with inverse movement`,
            `Monitor alternative betting lines for arbitrage`,
        ];
    }
    calculateStopLoss(marketData) {
        return marketData.currentLine * (1 - this.config.stopLossPercentage);
    }
    calculateTakeProfit(marketData) {
        return marketData.currentLine * (1 + this.config.takeProfitPercentage);
    }
    determinePosition(valueGap) {
        return valueGap > 0 ? "over" : "under";
    }
}
