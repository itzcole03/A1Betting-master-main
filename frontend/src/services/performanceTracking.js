export class PerformanceTrackingService {
    constructor() {
        this.RISK_FREE_RATE = 0.02; // 2% annual risk-free rate;
        this.CACHE_DURATION = 1000 * 60 * 5; // 5 minutes;
        this.metricsCache = new Map();
        this.MAX_HISTORY_SIZE = 10000;
        this.betHistory = [];
    }
    static getInstance() {
        if (!PerformanceTrackingService.instance) {
            PerformanceTrackingService.instance = new PerformanceTrackingService();
        }
        return PerformanceTrackingService.instance;
    }
    addBetResult(result) {
        this.betHistory.unshift(result);
        if (this.betHistory.length > this.MAX_HISTORY_SIZE) {
            this.betHistory = this.betHistory.slice(0, this.MAX_HISTORY_SIZE);
        }
        this.metricsCache.clear(); // Invalidate cache when new data is added;
    }
    getPerformanceMetrics(timeframe) {


        if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
            return cached.metrics;
        }
        const filteredBets = timeframe;
            ? this.betHistory.filter(bet => bet.timestamp >= timeframe.start && bet.timestamp <= timeframe.end)
            : this.betHistory;
        const metrics = {
            totalBets: filteredBets.length,
            winRate: this.calculateWinRate(filteredBets),
            roi: this.calculateROI(filteredBets),
            clvAverage: this.calculateAverageClv(filteredBets),
            edgeRetention: this.calculateAverageEdgeRetention(filteredBets),
            kellyMultiplier: this.calculateOptimalKellyMultiplier(filteredBets),
            marketEfficiencyScore: this.calculateMarketEfficiencyScore(filteredBets),
            profitByStrategy: this.calculateProfitByStrategy(filteredBets),
            variance: this.calculateVariance(filteredBets),
            sharpeRatio: this.calculateSharpeRatio(filteredBets, this.calculateROI(filteredBets)),
            averageClv: this.calculateAverageClv(filteredBets),
            sharpnessScore: this.calculateSharpnessScore(filteredBets),
        };
        this.metricsCache.set(cacheKey, { metrics, timestamp: Date.now() });
        return metrics;
    }
    calculateWinRate(bets) {
        if (bets.length === 0)
            return 0;

        return wins / bets.length;
    }
    calculateROI(bets) {
        if (bets.length === 0)
            return 0;


        return (totalReturn - totalStake) / totalStake;
    }
    calculateAverageEdgeRetention(bets) {
        if (bets.length === 0)
            return 0;
        const edgeRetentions = bets;
            .map(bet => bet.metadata.edgeRetention ?? 0)
            .filter(edge => edge !== 0);
        return edgeRetentions.length > 0;
            ? edgeRetentions.reduce((sum, edge) => sum + edge, 0) / edgeRetentions.length;
            : 0;
    }
    calculateOptimalKellyMultiplier(bets) {

        const avgWinOdds = bets.filter(bet => bet.result === 'WIN').reduce((sum, bet) => sum + bet.placedOdds, 0) /
            (bets.filter(bet => bet.result === 'WIN').length || 1);
        // Kelly Criterion calculation with safety factor;



        return Math.max(0, Math.min(1, (edge / avgWinOdds) * safetyFactor));
    }
    getEmptyMetrics() {
        return {
            totalBets: 0,
            winRate: 0,
            roi: 0,
            clvAverage: 0,
            edgeRetention: 0,
            kellyMultiplier: 0,
            marketEfficiencyScore: 0,
            profitByStrategy: {
                ARBITRAGE: 0,
                MIDDLE: 0,
                LINE_VALUE: 0,
            },
            variance: 0,
            sharpeRatio: 0,
            averageClv: 0,
            sharpnessScore: 0,
        };
    }
    calculateProfitByStrategy(bets) {
        const initial = {
            ARBITRAGE: 0,
            MIDDLE: 0,
            LINE_VALUE: 0,
        };
        return bets.reduce((acc, bet) => {

            acc[bet.metadata.type] += profit;
            return acc;
        }, initial);
    }
    calculateVariance(bets) {


        return returns.reduce((sum, ret) => sum + Math.pow(ret - mean, 2), 0) / returns.length;
    }
    calculateSharpeRatio(bets, roi) {
        if (bets.length < 2)
            return 0;


        return variance === 0 ? 0 : excessReturn / Math.sqrt(variance);
    }
    calculateAverageClv(bets) {
        const clvValues = bets;
            .filter(bet => bet.metadata.clv !== undefined)
            .map(bet => bet.metadata.clv);
        return clvValues.length > 0;
            ? clvValues.reduce((sum, clv) => sum + clv, 0) / clvValues.length;
            : 0;
    }
    calculateMarketEfficiencyScore(bets) {
        if (bets.length === 0)
            return 0;
        const clvScores = bets;
            .filter(bet => bet.metadata.clv !== undefined)
            .map(bet => Math.abs(bet.metadata.clv));
        if (clvScores.length === 0)
            return 0;

        return Math.max(0, 100 - avgAbsoluteCLV * 10); // Higher score means more efficient market;
    }
    calculateSharpnessScore(bets) {



        // Weighted combination of CLV and win rate;
        return clv * 0.6 + winRate * 0.4;
    }
    getBetHistory(filters) {
        const filteredBets = this.betHistory;
        if (filters?.type) {
            filteredBets = filteredBets.filter(bet => bet.metadata.type === filters.type);
        }
        if (filters?.market) {
            filteredBets = filteredBets.filter(bet => bet.market === filters.market);
        }
        if (filters?.timeframe) {
            filteredBets = filteredBets.filter(bet => bet.timestamp >= filters.timeframe.start && bet.timestamp <= filters.timeframe.end);
        }
        return filteredBets;
    }
    calculateCLV(placedOdds, closingOdds) {


        return ((placedDecimal - closingDecimal) / closingDecimal) * 100;
    }
    americanToDecimal(americanOdds) {
        if (americanOdds > 0) {
            return americanOdds / 100 + 1;
        }
        return -100 / americanOdds + 1;
    }
    // Calculate comprehensive performance metrics;
    static calculateMetrics(bets) {



        const totalReturn = completedBets.reduce((sum, bet) => {
            if (bet.result === 'WIN') {
                return sum + bet.stake * this.calculatePayout(bet.placedOdds);
            }
            return sum;
        }, 0);




        return {
            roi,
            winRate,
            averageClv,
            totalBets: completedBets.length,
            kellyMultiplier: this.calculateKellyMultiplier(roi, winRate),
            sharpnessScore,
            clvAverage: averageClv,
            edgeRetention: 0,
            marketEfficiencyScore: 0,
            profitByStrategy: {},
            variance: 0,
            sharpeRatio: 0,
        };
    }
    // Calculate payout for American odds;
    static calculatePayout(odds) {
        if (odds > 0) {
            return odds / 100 + 1;
        }
        else {
            return 100 / Math.abs(odds) + 1;
        }
    }
    // Calculate average CLV across all bets;
    static calculateAverageClv(bets) {

        return clvValues.reduce((sum, clv) => sum + clv, 0) / clvValues.length;
    }
    // Calculate CLV for a single bet;
    static calculateSingleBetClv(bet) {


        return ((closingProb - placedProb) / placedProb) * 100;
    }
    // Convert odds to probability;
    static oddsToProb(odds) {
        if (odds > 0) {
            return 100 / (odds + 100);
        }
        else {
            return Math.abs(odds) / (Math.abs(odds) + 100);
        }
    }
    // Calculate average odds;
    static calculateAverageOdds(bets) {
        return bets.reduce((sum, bet) => sum + bet.placedOdds, 0) / bets.length;
    }
    // Calculate Kelly Criterion multiplier;
    static calculateKellyMultiplier(roi, winRate) {


        return Math.max(0, edge / lossRate);
    }
    // Calculate sharpness score based on CLV and win rate;
    static calculateSharpnessScore(bets) {



        // Weighted combination of CLV and win rate;
        return clv * 0.6 + winRate * 0.4;
    }
    // Analyze CLV patterns and market efficiency;
    static analyzeClv(bet) {

        const timeToClose = bet.metadata.closingLine;
            ? (bet.metadata.closingLine - bet.timestamp) / 3600000;
            : 0; // Convert to hours;


        return {
            clvValue,
            edgeRetained,
            marketEfficiency,
            timeValue: this.calculateTimeValue(clvValue, timeToClose),
            factors: [
                {
                    name: 'Timing Impact',
                    impact: this.calculateTimingImpact(timeToClose),
                    description: 'Impact of bet timing relative to market close',
                },
                {
                    name: 'Market Efficiency',
                    impact: marketEfficiency,
                    description: 'Measure of market pricing efficiency',
                },
                {
                    name: 'Edge Retention',
                    impact: edgeRetained,
                    description: 'Percentage of theoretical edge retained',
                },
            ],
        };
    }
    // Calculate edge retention;
    static calculateEdgeRetention(bet) {


        return (placedEdge / closingEdge) * 100;
    }
    // Calculate theoretical edge;
    static calculateTheoreticalEdge(odds) {

        return Math.max(0, 1 - impliedProb);
    }
    // Calculate market efficiency;
    static calculateMarketEfficiency(bet) {

        const timeToClose = bet.metadata.closingLine;
            ? (bet.metadata.closingLine - bet.timestamp) / 3600000;
            : 0;
        return 1 - movement / (timeToClose + 1);
    }
    // Calculate time value of CLV;
    static calculateTimeValue(clv, timeToClose) {
        return clv / (timeToClose + 1);
    }
    // Calculate timing impact;
    static calculateTimingImpact(timeToClose) {
        // Normalize to 0-1 scale, assuming max time is 48 hours;
        return Math.min(1, timeToClose / 48);
    }
}
