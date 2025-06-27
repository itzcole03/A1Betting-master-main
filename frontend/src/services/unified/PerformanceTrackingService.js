import EventEmitter from 'eventemitter3';
export class PerformanceTrackingService extends EventEmitter {
    constructor() {
        super(...arguments);
        this.betHistory = [];
        this.systemMetrics = {
            apiLatency: 0,
            predictionAccuracy: 0,
            errorRate: 0,
            processingTime: 0,
        };
    }
    // User Performance Tracking;
    recordBetResult(result) {
        this.betHistory.push(result);
        this.emit('betRecorded', result);
        this.updateMetrics();
    }
    getPerformanceMetrics(timeRange) {
        const relevantBets = this.betHistory;
        if (timeRange) {
            relevantBets = this.betHistory.filter(bet => bet.timestamp >= timeRange.start && bet.timestamp <= timeRange.end);
        }
        const metrics = {
            winRate: this.calculateWinRate(relevantBets),
            roi: this.calculateROI(relevantBets),
            totalBets: relevantBets.length,
            profitLoss: this.calculateTotalProfitLoss(relevantBets),
            averageStake: this.calculateAverageStake(relevantBets),
            streaks: this.calculateStreaks(relevantBets),
            byConfidence: this.calculateMetricsByConfidence(relevantBets),
        };
        return metrics;
    }
    // System Performance Tracking;
    updateSystemMetrics(metrics) {
        this.systemMetrics = { ...this.systemMetrics, ...metrics };
        this.emit('systemMetricsUpdated', this.systemMetrics);
    }
    getSystemMetrics() {
        return this.systemMetrics;
    }
    // Private helper methods;
    calculateWinRate(bets) {
        if (bets.length === 0)
            return 0;

        return (wins / bets.length) * 100;
    }
    calculateROI(bets) {
        if (bets.length === 0)
            return 0;


        return (totalProfit / totalStake) * 100;
    }
    calculateTotalProfitLoss(bets) {
        return bets.reduce((sum, bet) => sum + bet.profitLoss, 0);
    }
    calculateAverageStake(bets) {
        if (bets.length === 0)
            return 0;

        return totalStake / bets.length;
    }
    calculateStreaks(bets) {
        const current = 0;
        const longest = 0;
        const isWinStreak = false;
        bets.forEach((bet, index) => {
            if (index === 0) {
                current = 1;
                longest = 1;
                isWinStreak = bet.isWin;
            }
            else if (bet.isWin === isWinStreak) {
                current++;
                longest = Math.max(longest, current);
            }
            else {
                current = 1;
                isWinStreak = bet.isWin;
            }
        });
        return { current, longest };
    }
    calculateMetricsByConfidence(bets) {

        bets.forEach(bet => {


            if (!confidenceBuckets[key]) {
                confidenceBuckets[key] = {
                    winRate: 0,
                    totalBets: 0,
                };
            }
            confidenceBuckets[key].totalBets++;
            if (bet.isWin) {
                confidenceBuckets[key].winRate =
                    (confidenceBuckets[key].winRate * (confidenceBuckets[key].totalBets - 1) + 100) /
                        confidenceBuckets[key].totalBets;
            }
        });
        return confidenceBuckets;
    }
    updateMetrics() {

        this.emit('metricsUpdated', metrics);
    }
}
