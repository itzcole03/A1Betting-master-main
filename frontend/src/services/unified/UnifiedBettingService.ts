import { EventEmitter } from 'events.ts';
import { UnifiedPredictionService } from './UnifiedPredictionService.ts';
import { UnifiedConfig } from '@/unified/UnifiedConfig.ts';
import { UnifiedLogger } from '@/unified/UnifiedLogger.ts';
import { UnifiedCache } from '@/unified/UnifiedCache.ts';
import { BettingContext, MarketContext, PredictionResult } from '@/types.ts';
import { BaseService } from './BaseService.ts';
import { UnifiedServiceRegistry } from './UnifiedServiceRegistry.ts';
import { UnifiedErrorService } from './UnifiedErrorService.ts';
import {
  Bet,
  BettingState,
  BettingConfig,
  BettingStats,
  BettingOpportunity,
  BettingValidation,
} from '@/types/betting.ts';
import { Event, Market, Selection, Odds } from '@/types/sports.ts';
import { ModelOutput } from '@/types/prediction.ts';
import {
  BettingPreview,
  BettingPreviewRequest,
  BettingValidationRequest,
  BettingPlaceRequest,
} from '@/types/betting.ts';

export interface Bet {
  id: string;
  event: string;
  amount: number;
  odds: number;
  timestamp: number;
  status: 'active' | 'won' | 'lost' | 'cancelled';
  type: 'single' | 'multiple' | 'system';
  selections: BetSelection[];
}

export interface BetSelection {
  event: string;
  market: string;
  selection: string;
  odds: number;
  status: 'active' | 'won' | 'lost' | 'cancelled';
}

export interface BettingOpportunity {
  id: string;
  event: string;
  market: string;
  selection: string;
  odds: number;
  prediction: {
    confidence: number;
    expectedValue: number;
  };
  timestamp: number;
}

export class UnifiedBettingService extends BaseService {
  private static instance: UnifiedBettingService;
  private readonly predictionService: UnifiedPredictionService;
  private readonly config: UnifiedConfig;
  private readonly logger: UnifiedLogger;
  private readonly cache: UnifiedCache;
  private errorService: UnifiedErrorService;
  private bets: Map<string, Bet>;
  private state: BettingState = {
    bets: [],
    activeBets: [],
    balance: 0,
    isLoading: false,
    error: null,
  };

  private constructor(registry: UnifiedServiceRegistry) {
    super('betting', registry);
    this.predictionService = UnifiedPredictionService.getInstance();
    this.config = UnifiedConfig.getInstance();
    this.logger = UnifiedLogger.getInstance();
    this.cache = UnifiedCache.getInstance();
    this.errorService = registry.getService<UnifiedErrorService>('error');
    this.bets = new Map();
  }

  public static getInstance(registry: UnifiedServiceRegistry): UnifiedBettingService {
    if (!UnifiedBettingService.instance) {
      UnifiedBettingService.instance = new UnifiedBettingService(registry);
    }
    return UnifiedBettingService.instance;
  }

  public async analyzeOpportunity(
    marketContext: MarketContext,
    bettingContext: BettingContext;
  ): Promise<BettingOpportunity | null> {
    try {
      // Get prediction;
      const prediction = await this.predictionService.generatePrediction(
        marketContext,
        bettingContext;
      );

      // Calculate expected value;

      // Calculate Kelly fraction;

      // Check if opportunity meets criteria;
      if (!this.meetsBettingCriteria(prediction, expectedValue, kellyFraction)) {
        return null;
      }

      const opportunity: BettingOpportunity = {
        id: `${marketContext.eventId}-${marketContext.marketType}`,
        event: marketContext.eventId,
        market: marketContext.marketType,
        selection: '',
        odds: marketContext.odds,
        prediction,
        timestamp: Date.now(),
      };

      // Cache the opportunity;
      await this.cache.set(
        `opportunity:${opportunity.id}`,
        opportunity,
        this.config.get('opportunityCacheTTL')
      );

      // Emit opportunity event;
      this.emit('opportunity:found', opportunity);

      return opportunity;
    } catch (error) {
      this.logger.error('Failed to analyze betting opportunity', {
        error,
        marketContext,
        bettingContext,
      });
      throw error;
    }
  }

  private calculateExpectedValue(probability: number, odds: number): number {
    return probability * odds - 1;
  }

  // Removed duplicate calculateKellyFraction. Use async version below.

  private meetsBettingCriteria(
    prediction: PredictionResult,
    expectedValue: number,
    kellyFraction: number;
  ): boolean {


    return (
      prediction.confidence >= minConfidence &&
      expectedValue > 0 &&
      kellyFraction > 0 &&
      kellyFraction <= maxRiskPerBet;
    );
  }

  public async getOpportunities(): Promise<BettingOpportunity[]> {
    try {
      const opportunities: BettingOpportunity[] = [];
      for (const [key, value] of this.cache.entries()) {
        if (key.startsWith('opportunity:')) {
          opportunities.push(value as BettingOpportunity);
        }
      }
      return opportunities;
    } catch (error) {
      this.logger.error('Failed to get betting opportunities', { error });
      throw error;
    }
  }

  // Removed duplicate placeBet. Only async placeBet(request: BettingPlaceRequest) remains.

  private isValidStake(stake: number, opportunity: BettingOpportunity): boolean {

    return stake > 0 && stake <= maxStake;
  }

  private calculateMaxStake(opportunity: BettingOpportunity): number {


    // Get current bankroll from cache or default;

    // Calculate maximum stake based on Kelly fraction and risk limits;



    return Math.min(kellyStake, riskLimitStake, percentageStake);
  }

  async getBets(timeRange: 'day' | 'week' | 'month' | 'year' = 'week'): Promise<Bet[]> {
    try {



      return Array.from(this.bets.values())
        .filter(bet => bet.timestamp >= cutoff)
        .sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getBets', timeRange },
      });
      throw error;
    }
  }

  async getRecentBets(limit: number = 10): Promise<Bet[]> {
    try {
      return Array.from(this.bets.values())
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getRecentBets', limit },
      });
      throw error;
    }
  }

  async updateBetStatus(betId: string, status: 'won' | 'lost' | 'cancelled'): Promise<Bet> {
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
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'updateBetStatus', betId, status },
      });
      throw error;
    }
  }

  private generateId(): string {
    return `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getTimeRangeInMs(timeRange: 'day' | 'week' | 'month' | 'year'): number {

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

  async getBettingHistory(eventId: string, marketId: string, selectionId: string): Promise<Bet[]> {
    try {


      if (cached) return cached;

      const response = await this.api.get('/betting/history', {
        params: { eventId, marketId, selectionId },
      });
      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getBettingHistory', eventId, marketId, selectionId },
      });
      throw error;
    }
  }

  async getActiveBets(): Promise<Bet[]> {
    try {

      if (cached) return cached;

      this.state.activeBets = response.data;
      this.cache.set('activeBets', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getActiveBets' },
      });
      throw error;
    }
  }

  async getBettingStats(
    eventId: string,
    marketId: string,
    selectionId: string;
  ): Promise<BettingStats> {
    try {


      if (cached) return cached;

      const response = await this.api.get('/betting/stats', {
        params: { eventId, marketId, selectionId },
      });
      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getBettingStats', eventId, marketId, selectionId },
      });
      throw error;
    }
  }

  async getBalance(): Promise<number> {
    try {

      if (cached) return cached;

      this.state.balance = response.data;
      this.cache.set('balance', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getBalance' },
      });
      throw error;
    }
  }

  async updateOdds(odds: Odds): Promise<void> {
    try {
      await this.api.post('/betting/odds', { odds });
      this.cache.delete('activeBets'); // Invalidate active bets cache;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'updateOdds', odds },
      });
      throw error;
    }
  }

  async calculateKellyFraction(odds: Odds, probability: number): Promise<number> {
    try {


      if (cached) return cached;

      const response = await this.api.post('/betting/kelly', {
        odds,
        probability,
      });
      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'calculateKellyFraction', odds, probability },
      });
      throw error;
    }
  }

  async getBettingOpportunities(
    event: Event,
    market: Market,
    selection: Selection,
    modelOutput: ModelOutput;
  ): Promise<{
    opportunities: BettingOpportunity[];
  }> {
    try {


      if (cached) return cached;

      const response = await this.api.post('/betting/opportunities', {
        event,
        market,
        selection,
        modelOutput,
      });
      this.cache.set(cacheKey, response.data);
      return response.data;
    } catch (error) {
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

  async getBettingConfig(): Promise<BettingConfig> {
    try {

      if (cached) return cached;

      this.cache.set('bettingConfig', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'getBettingConfig' },
      });
      throw error;
    }
  }

  async updateBettingConfig(config: Partial<BettingConfig>): Promise<BettingConfig> {
    try {

      this.cache.delete('bettingConfig'); // Invalidate config cache;
      return response.data;
    } catch (error) {
      this.handleError(error, {
        code: 'BETTING_ERROR',
        source: 'UnifiedBettingService',
        details: { method: 'updateBettingConfig', config },
      });
      throw error;
    }
  }

  async previewBet(request: BettingPreviewRequest): Promise<BettingPreview | null> {
    try {

      return response.data;
    } catch (error) {
      this.logger.error('Failed to preview bet', error);
      return null;
    }
  }

  async validateBet(request: BettingValidationRequest): Promise<BettingValidation> {
    try {

      return response.data;
    } catch (error) {
      this.logger.error('Failed to validate bet', error);
      return {
        isValid: false,
        errors: ['Failed to validate bet'],
      };
    }
  }

  async placeBet(request: BettingPlaceRequest): Promise<Bet | null> {
    try {

      return response.data;
    } catch (error) {
      this.logger.error('Failed to place bet', error);
      return null;
    }
  }
}
