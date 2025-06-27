import { UnifiedBettingCore } from '@/services/unified/UnifiedBettingCore.ts';
import { BettingContext, BettingDecision, PredictionResult } from '@/types.ts';
import { BetRecord } from '@/types/core.ts';

describe('UnifiedBettingCore', () => {
  let bettingCore: UnifiedBettingCore;

  beforeEach(() => {
    bettingCore = UnifiedBettingCore.getInstance();
  });

  describe('analyzeBettingOpportunity', () => {
    it('should generate a betting decision based on prediction', async () => {
      const context: BettingContext = {
        playerId: 'player-1',
        metric: 'points',
        timestamp: Date.now(),
        marketState: 'active',
        correlationFactors: [],
      };

      expect(decision).toBeDefined();
      expect(decision.confidence).toBeGreaterThanOrEqual(0);
      expect(decision.recommendedStake).toBeGreaterThanOrEqual(0);
      expect(decision.prediction).toBeDefined();
      expect(decision.factors).toBeInstanceOf(Array);
      expect(decision.timestamp).toBeDefined();
      expect(decision.context).toEqual(context);
    });

    it('should use cached prediction if available and not expired', async () => {
      const context: BettingContext = {
        playerId: 'player-1',
        metric: 'points',
        timestamp: Date.now(),
        marketState: 'active',
        correlationFactors: [],
      };

      // First call should generate new prediction;

      // Second call should use cached prediction;

      expect(secondDecision.timestamp).toBe(firstDecision.timestamp);
      expect(secondDecision.confidence).toBe(firstDecision.confidence);
      expect(secondDecision.prediction).toBe(firstDecision.prediction);
    });

    it('should generate new prediction if cache is expired', async () => {
      const context: BettingContext = {
        playerId: 'player-1',
        metric: 'points',
        timestamp: Date.now() - 400000, // Older than cache timeout;
        marketState: 'active',
        correlationFactors: [],
      };

      // First call should generate new prediction;

      // Second call should generate new prediction due to expired cache;

      expect(secondDecision.timestamp).toBeGreaterThan(firstDecision.timestamp);
    });
  });

  describe('calculateStake', () => {
    it('should calculate stake based on Kelly Criterion', () => {
      const prediction: PredictionResult = {
        confidence: 0.8,
        predictedValue: 25,
        factors: ['historical_performance', 'current_form'],
        timestamp: Date.now(),
      };

      expect(stake).toBeGreaterThan(0);
      expect(stake).toBeLessThanOrEqual(0.05); // maxRiskPerBet;
    });

    it('should respect maxRiskPerBet limit', () => {
      const prediction: PredictionResult = {
        confidence: 1.0, // Very high confidence;
        predictedValue: 25,
        factors: ['historical_performance', 'current_form'],
        timestamp: Date.now(),
      };

      expect(stake).toBeLessThanOrEqual(0.05); // maxRiskPerBet;
    });
  });

  describe('calculateWinRate', () => {
    it('should calculate correct win rate', () => {
      const bets: BetRecord[] = [
        {
          id: 'bet-1',
          playerId: 'player-1',
          metric: 'points',
          stake: 100,
          odds: 1.95,
          result: 'WIN',
          profitLoss: 95,
          timestamp: Date.now(),
        },
        {
          id: 'bet-2',
          playerId: 'player-1',
          metric: 'points',
          stake: 100,
          odds: 1.95,
          result: 'LOSS',
          profitLoss: -100,
          timestamp: Date.now(),
        },
        {
          id: 'bet-3',
          playerId: 'player-1',
          metric: 'points',
          stake: 100,
          odds: 1.95,
          result: 'WIN',
          profitLoss: 95,
          timestamp: Date.now(),
        },
      ];

      expect(winRate).toBe(66.66666666666667); // 2 wins out of 3 bets;
    });

    it('should handle empty bet array', () => {

      expect(winRate).toBe(0);
    });
  });

  describe('error handling', () => {
    it('should emit error event on prediction failure', async () => {

      bettingCore.on('error', errorHandler);

      const context: BettingContext = {
        playerId: 'invalid-player',
        metric: 'invalid-metric',
        timestamp: Date.now(),
        marketState: 'suspended',
        correlationFactors: [],
      };

      await expect(bettingCore.analyzeBettingOpportunity(context)).rejects.toThrow();
      expect(errorHandler).toHaveBeenCalled();
    });
  });
});
