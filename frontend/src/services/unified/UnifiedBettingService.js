import { UnifiedPredictionService } from './UnifiedPredictionService';
import { UnifiedConfig } from '../unified/UnifiedConfig';
import { UnifiedLogger } from '../unified/UnifiedLogger';
import { UnifiedCache } from '../unified/UnifiedCache';
import { BaseService } from './BaseService';
export class UnifiedBettingService extends BaseService {
    constructor(registry) {
        super('betting', registry);
        this.state = {
            bets: [],
            activeBets: [],
            balance: 0,
            isLoading: false,
            error: null,
        };
        this.predictionService = UnifiedPredictionService.getInstance();
        this.config = UnifiedConfig.getInstance();
        this.logger = UnifiedLogger.getInstance();
        this.cache = UnifiedCache.getInstance();
        this.errorService = registry.getService('error');
        this.bets = new Map();
    }
    static getInstance(registry) {
        if (!UnifiedBettingService.instance) {
            UnifiedBettingService.instance = new UnifiedBettingService(registry);
        }
        return UnifiedBettingService.instance;
    }
    async analyzeOpportunity(marketContext, bettingContext) {
        try {
            // Get prediction;

            // Calculate expected value;

            // Calculate Kelly fraction;

            // Check if opportunity meets criteria;
            if (!this.meetsBettingCriteria(prediction, expectedValue, kellyFraction)) {
                return null;
            }
            const opportunity = {
                id: `${marketContext.eventId}-${marketContext.marketType}`,
                event: marketContext.eventId,
                market: marketContext.marketType,
                selection: '',
                odds: marketContext.odds,
                prediction,
                timestamp: Date.now(),
            };
            // Cache the opportunity;
            await this.cache.set(`opportunity:${opportunity.id}`, opportunity, this.config.get('opportunityCacheTTL'));
            // Emit opportunity event;
            this.emit('opportunity:found', opportunity);
            return opportunity;
        }
        catch (error) {
            this.logger.error('Failed to analyze betting opportunity', {
                error,
                marketContext,
                bettingContext,
            });
            throw error;
        }
    }
    calculateExpectedValue(probability, odds) {
        return probability * odds - 1;
    }
    // Removed duplicate calculateKellyFraction. Use async version below.
    meetsBettingCriteria(prediction, expectedValue, kellyFraction) {


        return (prediction.confidence >= minConfidence &&
            expectedValue > 0 &&
            kellyFraction > 0 &&
            kellyFraction <= maxRiskPerBet);
    }
    async getOpportunities() {
        try {

            for (const [key, value] of this.cache.entries()) {
                if (key.startsWith('opportunity:')) {
                    opportunities.push(value);
                }
            }
            return opportunities;
        }
        catch (error) {
            this.logger.error('Failed to get betting opportunities', { error });
            throw error;
        }
    }
    // Removed duplicate placeBet. Only async placeBet(request: BettingPlaceRequest) remains.
    isValidStake(stake, opportunity) {

        return stake > 0 && stake <= maxStake;
    }
    calculateMaxStake(opportunity) {


        // Get current bankroll from cache or default;

        // Calculate maximum stake based on Kelly fraction and risk limits;



        return Math.min(kellyStake, riskLimitStake, percentageStake);
    }
    async getBets(timeRange = 'week') {
        try {



            return Array.from(this.bets.values())
                .filter(bet => bet.timestamp >= cutoff)
                .sort((a, b) => b.timestamp - a.timestamp);
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getBets', timeRange },
            });
            throw error;
        }
    }
    async getRecentBets(limit = 10) {
        try {
            return Array.from(this.bets.values())
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, limit);
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getRecentBets', limit },
            });
            throw error;
        }
    }
    async updateBetStatus(betId, status) {
        try {

            if (!bet) {
                throw new Error(`Bet with ID ${betId} not found`);
            }
            bet.status = status;
            bet.selections.forEach(selection => {
                selection.status = status;
            });
            this.bets.set(betId, bet);
            return bet;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'updateBetStatus', betId, status },
            });
            throw error;
        }
    }
    generateId() {
        return `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    getTimeRangeInMs(timeRange) {

        switch (timeRange) {
            case 'day':
                return day;
            case 'week':
                return 7 * day;
            case 'month':
                return 30 * day;
            case 'year':
                return 365 * day;
            default:
                return day;
        }
    }
    async getBettingHistory(eventId, marketId, selectionId) {
        try {


            if (cached)
                return cached;
            const response = await this.api.get('/betting/history', {
                params: { eventId, marketId, selectionId },
            });
            this.cache.set(cacheKey, response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getBettingHistory', eventId, marketId, selectionId },
            });
            throw error;
        }
    }
    async getActiveBets() {
        try {

            if (cached)
                return cached;

            this.state.activeBets = response.data;
            this.cache.set('activeBets', response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getActiveBets' },
            });
            throw error;
        }
    }
    async getBettingStats(eventId, marketId, selectionId) {
        try {


            if (cached)
                return cached;
            const response = await this.api.get('/betting/stats', {
                params: { eventId, marketId, selectionId },
            });
            this.cache.set(cacheKey, response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getBettingStats', eventId, marketId, selectionId },
            });
            throw error;
        }
    }
    async getBalance() {
        try {

            if (cached)
                return cached;

            this.state.balance = response.data;
            this.cache.set('balance', response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getBalance' },
            });
            throw error;
        }
    }
    async updateOdds(odds) {
        try {
            await this.api.post('/betting/odds', { odds });
            this.cache.delete('activeBets'); // Invalidate active bets cache;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'updateOdds', odds },
            });
            throw error;
        }
    }
    async calculateKellyFraction(odds, probability) {
        try {


            if (cached)
                return cached;
            const response = await this.api.post('/betting/kelly', {
                odds,
                probability,
            });
            this.cache.set(cacheKey, response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'calculateKellyFraction', odds, probability },
            });
            throw error;
        }
    }
    async getBettingOpportunities(event, market, selection, modelOutput) {
        try {


            if (cached)
                return cached;
            const response = await this.api.post('/betting/opportunities', {
                event,
                market,
                selection,
                modelOutput,
            });
            this.cache.set(cacheKey, response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: {
                    method: 'getBettingOpportunities',
                    event,
                    market,
                    selection,
                    modelOutput,
                },
            });
            throw error;
        }
    }
    // Removed duplicate validateBet. Only async validateBet(request: BettingValidationRequest) remains.
    async getBettingConfig() {
        try {

            if (cached)
                return cached;

            this.cache.set('bettingConfig', response.data);
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'getBettingConfig' },
            });
            throw error;
        }
    }
    async updateBettingConfig(config) {
        try {

            this.cache.delete('bettingConfig'); // Invalidate config cache;
            return response.data;
        }
        catch (error) {
            this.handleError(error, {
                code: 'BETTING_ERROR',
                source: 'UnifiedBettingService',
                details: { method: 'updateBettingConfig', config },
            });
            throw error;
        }
    }
    async previewBet(request) {
        try {

            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to preview bet', error);
            return null;
        }
    }
    async validateBet(request) {
        try {

            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to validate bet', error);
            return {
                isValid: false,
                errors: ['Failed to validate bet'],
            };
        }
    }
    async placeBet(request) {
        try {

            return response.data;
        }
        catch (error) {
            this.logger.error('Failed to place bet', error);
            return null;
        }
    }
}
