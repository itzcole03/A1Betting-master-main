import { Observable } from 'rxjs';
import { apiClient } from '@/services/api/client';
class BookmakerAnalysisService {
    constructor() {
        this.patterns = new Map();
        this.recentTags = [];
        this.patternUpdateInterval = null;
        this.initializeService();
    }
    async initializeService() {
        try {
            // Load historical patterns;

            this.patterns = new Map(historicalData.map(pattern => [`${pattern.tag}`, pattern]));
            // Start pattern analysis update interval;
            this.startPatternAnalysis();
            // Load recent tags;
            this.recentTags = await this.loadRecentTags();
        }
        catch (error) {
            // console statement removed
        }
    }
    async loadHistoricalPatterns() {
        try {

            return response.data;
        }
        catch (error) {
            // console statement removed
            return [];
        }
    }
    async loadRecentTags() {
        try {

            return response.data;
        }
        catch (error) {
            // console statement removed
            return [];
        }
    }
    startPatternAnalysis() {
        if (this.patternUpdateInterval) {
            clearInterval(this.patternUpdateInterval);
        }
        this.patternUpdateInterval = setInterval(async () => {
            await this.updatePatternAnalysis();
        }, 6 * 60 * 60 * 1000); // Update every 6 hours;
    }
    async updatePatternAnalysis() {


        for (const tagType of ['demon', 'goblin', 'normal']) {

            if (tagsOfType.length < BookmakerAnalysisService.MIN_SAMPLE_SIZE) {
                continue;
            }




            const pattern = {
                tag: tagType,
                successRate,
                averageDeviation,
                confidence: this.calculateConfidence(tagsOfType.length),
                lastUpdated: now,
                sampleSize: tagsOfType.length,
            };
            this.patterns.set(tagType, pattern);
        }
        // Persist updated patterns;
        await this.savePatterns();
    }
    calculateConfidence(sampleSize) {
        // Using a simplified confidence calculation;
        // Could be enhanced with more sophisticated statistical methods;

        return Math.pow(baseConfidence, 0.5); // Square root to smooth the confidence curve;
    }
    async savePatterns() {
        try {
            await apiClient.post('/analytics/bookmaker/patterns', Array.from(this.patterns.values()));
        }
        catch (error) {
            // console statement removed
        }
    }
    async analyzeProp(propData) {


        // Calculate raw statistical probability;

        // Analyze bookmaker intent;

        // Calculate risk score;

        // Generate warnings;
        if (this.isSuspiciouslyFavorable(rawStatisticalProbability, bookmakerIntent)) {
            warnings.push('This prop appears suspiciously favorable. Exercise caution.');
        }
        if (pattern && pattern.successRate < 0.4) {
            warnings.push(`Historical success rate for ${propData.tag} props is unusually low (${Math.round(pattern.successRate * 100)}%)`);
        }
        // Calculate adjusted probability;

        return {
            rawStatisticalProbability,
            bookmakerIntent,
            adjustedProbability,
            riskScore,
            warnings,
        };
    }
    calculateRawProbability(projectedValue, historicalAverage) {
        // Simple probability calculation based on historical average;
        // Could be enhanced with more sophisticated statistical methods;

        const maxDeviation = historicalAverage * 0.5; // 50% of historical average;
        return Math.max(0, 1 - deviation / maxDeviation);
    }
    async analyzeBookmakerIntent(propData, pattern) {




        let warning;
        if (suspiciousLevel > BookmakerAnalysisService.SUSPICIOUS_THRESHOLD) {
            warning = 'Unusual pattern detected in bookmaker behavior';
        }
        return {
            suspiciousLevel,
            historicalAccuracy,
            marketTrend,
            confidence,
            warning,
        };
    }
    calculateSuspiciousLevel(propData, pattern) {
        const suspiciousLevel = 0;
        // Factor 1: Deviation from historical average;


        suspiciousLevel += deviationScore * 0.3;
        // Factor 2: Tag type analysis;
        if (pattern) {

            suspiciousLevel += tagScore * 0.3;
        }
        // Factor 3: Odds analysis;

        suspiciousLevel += oddsScore * 0.4;
        return Math.min(suspiciousLevel, 1);
    }
    async analyzeMarketTrend(propData) {
        try {

            return response.data.trend;
        }
        catch (error) {
            // console statement removed
            return 'stable';
        }
    }
    calculateRiskScore(rawProbability, bookmakerIntent, propData) {
        const weights = {
            rawProbability: 0.4,
            suspiciousLevel: 0.3,
            historicalAccuracy: 0.2,
            marketTrend: 0.1,
        };
        const riskScore = 0;
        // Raw probability contribution;
        riskScore += (1 - rawProbability) * weights.rawProbability;
        // Suspicious level contribution;
        riskScore += bookmakerIntent.suspiciousLevel * weights.suspiciousLevel;
        // Historical accuracy contribution;
        riskScore += (1 - bookmakerIntent.historicalAccuracy) * weights.historicalAccuracy;
        // Market trend contribution;
        const marketTrendScore = bookmakerIntent.marketTrend === 'stable'
            ? 0.5;
            : bookmakerIntent.marketTrend === 'increasing'
                ? 0.7;
                : 0.3;
        riskScore += marketTrendScore * weights.marketTrend;
        return Math.min(Math.max(riskScore, 0), 1);
    }
    calculateAdjustedProbability(rawProbability, bookmakerIntent, pattern) {
        const weights = {
            rawProbability: 0.5,
            bookmakerIntent: 0.3,
            patternHistory: 0.2,
        };
        const adjustedProbability = rawProbability * weights.rawProbability;
        // Adjust based on bookmaker intent;

        adjustedProbability += bookmakerFactor * weights.bookmakerIntent;
        // Adjust based on pattern history;
        if (pattern) {
            adjustedProbability += pattern.successRate * weights.patternHistory;
        }
        else {
            adjustedProbability += 0.5 * weights.patternHistory;
        }
        return Math.min(Math.max(adjustedProbability, 0), 1);
    }
    isSuspiciouslyFavorable(rawProbability, bookmakerIntent) {
        return (rawProbability > 0.8 &&
            bookmakerIntent.suspiciousLevel > BookmakerAnalysisService.SUSPICIOUS_THRESHOLD);
    }
    getPatternUpdateStream() {
        return new Observable(subscriber => {
            const interval = setInterval(() => {
                subscriber.next(this.patterns);
            }, 60000); // Update every minute;
            return () => clearInterval(interval);
        });
    }
}
BookmakerAnalysisService.SUSPICIOUS_THRESHOLD = 0.85;
BookmakerAnalysisService.PATTERN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days;
BookmakerAnalysisService.MIN_SAMPLE_SIZE = 30;
export const bookmakerAnalysisService = new BookmakerAnalysisService();
