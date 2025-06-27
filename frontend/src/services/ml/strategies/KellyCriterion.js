import { UnifiedLogger } from '@/core/UnifiedLogger';
import { UnifiedCache } from '../../services/core/UnifiedCache';
export class KellyCriterion {
    constructor(config) {
        this.CACHE_KEY = 'kelly_state';
        this.CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds;
        this.logger = UnifiedLogger.getInstance();
        this.cache = UnifiedCache.getInstance();
        this.config = {
            maxFraction: 0.5,
            minConfidence: 0.6,
            riskTolerance: 0.3,
            volatilityThreshold: 0.2,
            drawdownLimit: 0.1,
            profitTarget: 0.2,
            stopLoss: 0.1,
            positionSizing: {
                method: 'adaptive',
                baseSize: 0.02,
                maxSize: 0.1,
                minSize: 0.01,
            },
            bankrollManagement: {
                method: 'adaptive',
                initialSize: 1000,
                maxRiskPerTrade: 0.02,
                maxDrawdown: 0.2,
            },
            ...config,
        };
        this.state = this.initializeState();
        this.loadState();
    }
    initializeState() {
        return {
            bankroll: this.config.bankrollManagement.initialSize,
            trades: [],
            performance: {
                totalTrades: 0,
                winningTrades: 0,
                losingTrades: 0,
                totalProfit: 0,
                maxDrawdown: 0,
                currentDrawdown: 0,
                winRate: 0,
                profitFactor: 0,
                sharpeRatio: 0,
            },
        };
    }
    async loadState() {
        try {

            if (cachedState) {
                this.state = cachedState;
            }
        }
        catch (error) {
            this.logger.error('Failed to load Kelly state from cache', error);
        }
    }
    async saveState() {
        try {
            this.cache.set(this.CACHE_KEY, this.state, this.CACHE_TTL);
        }
        catch (error) {
            this.logger.error('Failed to save Kelly state to cache', error);
        }
    }
    async analyze(predictions, labels) {
        try {


            // Calculate base metrics;




            // Calculate advanced metrics;






            // Calculate expected value and risk-adjusted return;


            // Calculate optimal stake with position sizing;

            // Calculate confidence with uncertainty consideration;

            return {
                fraction: adjustedFraction,
                expectedValue,
                riskAdjustedReturn,
                optimalStake,
                confidence,
                uncertainty,
                volatility,
                sharpeRatio,
                maxDrawdown,
                winRate,
                profitFactor,
            };
        }
        catch (error) {
            this.logger.error('Kelly Criterion analysis failed', error);
            throw error;
        }
    }
    calculateWinProbability(predictions, labels) {
        const correctPredictions = 0;
        const totalPredictions = 0;
        for (const i = 0; i < predictions.length; i++) {


            if (pred === label) {
                correctPredictions++;
            }
            totalPredictions++;
        }
        return correctPredictions / totalPredictions;
    }
    calculateOdds(predictions) {
        // Calculate average odds from predictions;
        const avgOdds = predictions.reduce((sum, pred) => {

            return sum + 1 / maxProb;
        }, 0) / predictions.length;
        return avgOdds;
    }
    calculateKellyFraction(winProb, odds) {
        // Kelly Criterion formula: f* = (bp - q) / b;
        // where b = odds - 1, p = win probability, q = 1 - p;



        return Math.max(0, kellyFraction); // Ensure non-negative fraction;
    }
    adjustKellyFraction(kellyFraction) {
        // Apply dynamic adjustments based on performance and risk metrics;
        const { maxDrawdown, winRate } = this.state.performance;

        // Reduce fraction based on volatility;
        const adjustedFraction = kellyFraction * (1 - volatility);
        // Reduce fraction based on drawdown;
        if (maxDrawdown > this.config.drawdownLimit) {
            adjustedFraction *= 1 - maxDrawdown;
        }
        // Adjust based on win rate;
        if (winRate < 0.5) {
            adjustedFraction *= winRate;
        }
        // Apply position sizing method;
        switch (this.config.positionSizing.method) {
            case 'fixed':
                adjustedFraction = this.config.positionSizing.baseSize;
                break;
            case 'dynamic':
                adjustedFraction *= 1 + winRate - 0.5;
                break;
            case 'adaptive':
                adjustedFraction *= this.calculateAdaptiveMultiplier();
                break;
        }
        return Math.min(Math.max(adjustedFraction, this.config.positionSizing.minSize), this.config.positionSizing.maxSize);
    }
    calculateAdaptiveMultiplier() {
        const { winRate, profitFactor, sharpeRatio } = this.state.performance;

        // Combine multiple factors for adaptive sizing;



        return (confidenceMultiplier + riskMultiplier + performanceMultiplier) / 3;
    }
    calculateExpectedValue(winProb, odds, fraction) {
        // Expected value = (winProb * (odds - 1) * fraction) - ((1 - winProb) * fraction)
        return winProb * (odds - 1) * fraction - (1 - winProb) * fraction;
    }
    calculateRiskAdjustedReturn(expectedValue, fraction) {
        // Risk-adjusted return = expected value / fraction;
        return expectedValue / fraction;
    }
    calculateOptimalStake(fraction, expectedValue) {
        // Optimal stake = fraction * expected value;
        return fraction * expectedValue;
    }
    calculateUncertainty(predictions) {
        // Calculate prediction uncertainty using entropy;
        const entropy = predictions.map(pred => {
            const probs = pred.map(p => p + 1e-10); // Add small epsilon to avoid log(0)


            return -normalized.reduce((a, b) => a + b * Math.log(b), 0);
        });
        return entropy.reduce((a, b) => a + b, 0) / entropy.length;
    }
    calculateVolatility(predictions) {
        // Calculate prediction volatility;



        return Math.sqrt(variance);
    }
    calculateSharpeRatio(fraction, volatility) {
        if (volatility === 0)
            return 0;
        const riskFreeRate = 0.02; // 2% annual risk-free rate;
        return (fraction - riskFreeRate) / volatility;
    }
    calculateMaxDrawdown() {
        const peak = this.state.bankroll;
        const maxDrawdown = 0;
        for (const trade of this.state.trades) {
            peak = Math.max(peak, trade.profit);

            maxDrawdown = Math.max(maxDrawdown, drawdown);
        }
        return maxDrawdown;
    }
    calculateWinRate() {
        const { winningTrades, totalTrades } = this.state.performance;
        return totalTrades > 0 ? winningTrades / totalTrades : 0;
    }
    calculateProfitFactor() {
        const { trades } = this.state;


        return grossLoss > 0 ? grossProfit / grossLoss : 0;
    }
    calculateConfidence(predictions, labels, uncertainty) {
        const totalConfidence = 0;
        const correctPredictions = 0;
        for (const i = 0; i < predictions.length; i++) {


            if (pred === label) {
                correctPredictions++;
                totalConfidence += Math.max(...predictions[i]);
            }
        }
        return correctPredictions > 0 ? totalConfidence / correctPredictions : 0;
    }
    shouldPlaceBet(metrics) {
        const { confidence, expectedValue, riskAdjustedReturn, uncertainty, volatility, maxDrawdown } = metrics;
        // Basic criteria;
        if (confidence < this.config.minConfidence || expectedValue <= 0 || riskAdjustedReturn <= 0) {
            return false;
        }
        // Risk management criteria;
        if (uncertainty > this.config.riskTolerance || volatility > this.config.volatilityThreshold) {
            return false;
        }
        // Drawdown protection;
        if (maxDrawdown > this.config.drawdownLimit) {
            return false;
        }
        // Performance-based criteria;
        const { winRate, profitFactor } = this.state.performance;
        if (winRate < 0.4 || profitFactor < 1.2) {
            return false;
        }
        return true;
    }
    getBetSize(metrics, bankroll) {
        if (!this.shouldPlaceBet(metrics)) {
            return 0;
        }
        let betSize;
        switch (this.config.bankrollManagement.method) {
            case 'fixed':
                betSize = bankroll * this.config.positionSizing.baseSize;
                break;
            case 'progressive':
                betSize = bankroll * metrics.fraction * (1 + this.state.performance.winRate);
                break;
            case 'adaptive':
                betSize = this.calculateAdaptiveBetSize(metrics, bankroll);
                break;
            default:
                betSize = bankroll * metrics.fraction;
        }
        // Apply risk limits;

        betSize = Math.min(betSize, maxRiskAmount);
        // Apply position size limits;
        betSize = Math.min(Math.max(betSize, bankroll * this.config.positionSizing.minSize), bankroll * this.config.positionSizing.maxSize);
        return betSize;
    }
    calculateAdaptiveBetSize(metrics, bankroll) {
        const { confidence, uncertainty, volatility, sharpeRatio } = metrics;
        // Calculate base size from Kelly fraction;
        const betSize = bankroll * metrics.fraction;
        // Adjust for confidence;
        betSize *= confidence;
        // Adjust for uncertainty;
        betSize *= 1 - uncertainty;
        // Adjust for volatility;
        betSize *= 1 - volatility;
        // Adjust for Sharpe ratio;
        if (sharpeRatio > 0) {
            betSize *= 1 + sharpeRatio;
        }
        return betSize;
    }
    updateState(betSize, outcome, profit, metrics) {
        // Update trade history;
        this.state.trades.push({
            timestamp: Date.now(),
            betSize,
            outcome,
            profit,
            metrics,
        });
        // Update bankroll;
        this.state.bankroll += profit;
        // Update performance metrics;
        this.state.performance.totalTrades++;
        if (profit > 0) {
            this.state.performance.winningTrades++;
        }
        else {
            this.state.performance.losingTrades++;
        }
        this.state.performance.totalProfit += profit;
        this.state.performance.winRate = this.calculateWinRate();
        this.state.performance.profitFactor = this.calculateProfitFactor();
        this.state.performance.maxDrawdown = this.calculateMaxDrawdown();
        // Save updated state;
        this.saveState();
    }
}
