export class ModelPerformanceTracker {
    constructor(logger, metrics, maxHistoryLength = 100) {
        this.logger = logger;
        this.metrics = metrics;
        this.maxHistoryLength = maxHistoryLength;
        this.performanceHistory = new Map();
        this.currentMetrics = new Map();
        this.calibrationData = new Map();
    }
    trackPrediction(modelName, prediction, recommendation) {

        current.totalPredictions++;
        current.totalStake += recommendation.stake;
        current.averageConfidence = this.updateAverage(current.averageConfidence, prediction.confidence, current.totalPredictions);
        // Update calibration data;
        this.updateCalibrationData(modelName, prediction.confidence);
        this.currentMetrics.set(modelName, current);
        this.trackMetrics(modelName, current);
    }
    recordOutcome(modelName, stake, payout, odds) {


        current.totalPayout += payout;
        current.correctPredictions += profit > 0 ? 1 : 0;
        current.roi = (current.totalPayout - current.totalStake) / current.totalStake;
        current.winRate = current.correctPredictions / current.totalPredictions;
        current.averageOdds = this.updateAverage(current.averageOdds, odds, current.totalPredictions);
        // Calculate advanced metrics;
        current.profitFactor = this.calculateProfitFactor(current);
        current.sharpeRatio = this.calculateSharpeRatio(modelName);
        current.maxDrawdown = this.calculateMaxDrawdown(modelName);
        current.kellyCriterion = this.calculateKellyCriterion(current);
        current.expectedValue = this.calculateExpectedValue(current, odds);
        current.calibrationScore = this.calculateCalibrationScore(modelName);
        current.lastUpdated = new Date();
        // Update history;
        this.updateHistory(modelName, current);
        this.currentMetrics.set(modelName, current);
        this.trackMetrics(modelName, current);
    }
    getModelPerformance(modelName) {
        return this.currentMetrics.get(modelName);
    }
    getPerformanceHistory(modelName, timeframe = 'all') {



        return history.filter(snapshot => snapshot.timestamp >= cutoff);
    }
    getTopPerformingModels(metric = 'roi', limit = 5) {
        return Array.from(this.currentMetrics.entries())
            .map(([modelName, metrics]) => ({ modelName, metrics }))
            .sort((a, b) => {


            return bValue - aValue;
        })
            .slice(0, limit);
    }
    getOrCreateMetrics(modelName) {
        return (this.currentMetrics.get(modelName) || {
            totalPredictions: 0,
            correctPredictions: 0,
            totalStake: 0,
            totalPayout: 0,
            roi: 0,
            winRate: 0,
            averageConfidence: 0,
            averageOdds: 0,
            profitFactor: 0,
            sharpeRatio: 0,
            maxDrawdown: 0,
            kellyCriterion: 0,
            expectedValue: 0,
            calibrationScore: 0,
            lastUpdated: new Date(),
        });
    }
    updateAverage(currentAverage, newValue, totalCount) {
        return (currentAverage * (totalCount - 1) + newValue) / totalCount;
    }
    calculateProfitFactor(metrics) {


        return grossLoss === 0 ? 0 : Number(grossProfit) / Number(grossLoss);
    }
    calculateSharpeRatio(modelName) {

        if (history.length < 2)
            return 0;
        const returns = history.map((snapshot, i) => {
            if (i === 0)
                return 0;

            return snapshot.metrics.roi - prevRoi;
        });


        return stdDev === 0 ? 0 : avgReturn / stdDev;
    }
    calculateMaxDrawdown(modelName) {

        if (history.length < 2)
            return 0;
        const maxDrawdown = 0;
        const peak = history[0].metrics.roi;
        for (const snapshot of history) {

            if (roi > peak) {
                peak = roi;
            }

            maxDrawdown = Math.max(maxDrawdown, drawdown);
        }
        return maxDrawdown;
    }
    calculateKellyCriterion(metrics) {





        return Math.max(0, Math.min(kelly, 0.5)); // Cap at 50% of bankroll;
    }
    calculateExpectedValue(metrics, odds) {




        return winProb * winAmount - (1 - winProb) * lossAmount;
    }
    updateCalibrationData(modelName, predictedConfidence) {

        data.predicted.push(predictedConfidence);
        this.calibrationData.set(modelName, data);
    }
    calculateCalibrationScore(modelName) {

        if (!data || data.predicted.length < 10)
            return 0;
        // Group predictions into bins;




        data.predicted.forEach((pred, i) => {

            binCounts[bin]++;
            if (data.actual[i])
                binCorrect[bin]++;
        });
        // Calculate calibration error;
        const calibrationError = 0;
        for (const i = 0; i < bins; i++) {
            if (binCounts[i] > 0) {


                calibrationError += Math.pow(expectedProb - actualProb, 2);
            }
        }
        return 1 - Math.sqrt(calibrationError / bins);
    }
    updateHistory(modelName, metrics) {

        history.push({
            timestamp: new Date(),
            metrics: { ...metrics },
        });
        // Maintain history length limit;
        if (history.length > this.maxHistoryLength) {
            history.shift();
        }
        this.performanceHistory.set(modelName, history);
    }
    getCutoffDate(timeframe) {

        switch (timeframe) {
            case 'day':
                return new Date(now.setDate(now.getDate() - 1));
            case 'week':
                return new Date(now.setDate(now.getDate() - 7));
            case 'month':
                return new Date(now.setMonth(now.getMonth() - 1));
            default:
                return new Date(0);
        }
    }
    trackMetrics(modelName, metrics) {
        this.metrics.gauge(`model.${modelName}.roi`, metrics.roi);
        this.metrics.gauge(`model.${modelName}.win_rate`, metrics.winRate);
        this.metrics.gauge(`model.${modelName}.profit_factor`, metrics.profitFactor);
        this.metrics.gauge(`model.${modelName}.sharpe_ratio`, metrics.sharpeRatio);
        this.metrics.gauge(`model.${modelName}.max_drawdown`, metrics.maxDrawdown);
        this.metrics.gauge(`model.${modelName}.kelly_criterion`, metrics.kellyCriterion);
        this.metrics.gauge(`model.${modelName}.expected_value`, metrics.expectedValue);
        this.metrics.gauge(`model.${modelName}.calibration_score`, metrics.calibrationScore);
        this.metrics.gauge(`model.${modelName}.average_confidence`, metrics.averageConfidence);
        this.metrics.gauge(`model.${modelName}.average_odds`, metrics.averageOdds);
    }
}
