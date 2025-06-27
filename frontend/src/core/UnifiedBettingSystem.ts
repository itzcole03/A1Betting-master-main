import { AnalysisRegistry } from './AnalysisFramework.ts';
import { EventBus } from '@/core/EventBus.ts';
import { PerformanceMonitor } from './PerformanceMonitor.ts';
import { UnifiedPredictionEngine } from './UnifiedPredictionEngine.ts';
import { UnifiedStrategyEngine } from './UnifiedStrategyEngine.ts';
import { unifiedDataEngine } from './UnifiedDataEngine.ts';
import { unifiedState } from './UnifiedState.ts';
import {
  Alert,
  PerformanceMetrics,
  MarketUpdate,
  AnalysisResult,
  RiskTolerance,
  BettingContext,
  BettingDecision,
  BetRecord,
  ClvAnalysis,
  BetType,
  BetResult,
  BettingStrategy,
} from '@/types/core.ts';
import { BettingOpportunity } from '@/types/core.ts';

export interface BankrollConfig {
  initialAmount: number;
  maxRiskPerBet: number;
  maxDailyLoss: number;
  maxExposure: number;
  kellyFraction: number;
}

export interface BankrollState {
  currentAmount: number;
  totalWagered: number;
  totalWon: number;
  totalLost: number;
  openPositions: number;
  maxDrawdown: number;
  lastUpdate: number;
}

export interface BetTransaction {
  id: string;
  timestamp: number;
  type: 'bet' | 'win' | 'loss' | 'deposit' | 'withdrawal';
  amount: number;
  balance: number;
  metadata?: Record<string, unknown>;
}

export interface ActiveBet {
  id: string;
  opportunity: BettingOpportunity;
  stake: number;
  placedAt: number;
  status: 'pending' | 'won' | 'lost';
  result?: {
    actualValue: number;
    profit: number;
    settledAt: number;
  };
}

export interface BettingPosition {
  id: string;
  propId: string;
  type: 'over' | 'under';
  stake: number;
  entryPrice: number;
  timestamp: number;
  status: 'open' | 'closed' | 'pending';
  pnl?: number;
  closeTimestamp?: number;
  closePrice?: number;
}

export interface BettingMetrics {
  totalBets: number;
  winningBets: number;
  losingBets: number;
  totalStake: number;
  totalPnl: number;
  roi: number;
  winRate: number;
  averageStake: number;
  averagePnl: number;
  lastUpdate: number;
}

export interface RiskProfile {
  maxExposure: number;
  maxPositions: number;
  stopLoss: number;
  profitTarget: number;
  riskPerTrade: number;
  maxDrawdown: number;
}

export class UnifiedBettingSystem {
  private static instance: UnifiedBettingSystem;
  private readonly eventBus: EventBus;
  private readonly performanceMonitor: PerformanceMonitor;
  private readonly dataEngine = unifiedDataEngine;
  private readonly predictionEngine = UnifiedPredictionEngine.getInstance();
  private readonly strategyEngine = UnifiedStrategyEngine.getInstance();
  private readonly analysisRegistry: AnalysisRegistry;
  private readonly strategies: Map<string, BettingStrategy>;
  private readonly MIN_CONFIDENCE = 0.7;
  private readonly MAX_ACTIVE_BETS = 10;
  private readonly RISK_THRESHOLD = 0.8;
  private bankrollConfig: BankrollConfig = {
    initialAmount: 10000,
    maxRiskPerBet: 0.05,
    maxDailyLoss: 0.2,
    maxExposure: 0.1,
    kellyFraction: 0.5,
  };
  private bankrollState: BankrollState = {
    currentAmount: 10000,
    totalWagered: 0,
    totalWon: 0,
    totalLost: 0,
    openPositions: 0,
    maxDrawdown: 0,
    lastUpdate: Date.now(),
  };
  private activeBets: Map<string, ActiveBet>;
  private transactions: BetTransaction[];
  private readonly positions: Map<string, BettingPosition>;
  private readonly metrics: BettingMetrics;
  private readonly riskProfile: RiskProfile;

  private constructor() {
    this.eventBus = EventBus.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
    this.analysisRegistry = AnalysisRegistry.getInstance();
    this.strategies = new Map();
    this.activeBets = new Map();
    this.transactions = [];
    this.positions = new Map();
    this.metrics = this.initializeMetrics();
    this.riskProfile = this.initializeRiskProfile();

    this.setupEventListeners();
  }

  static getInstance(): UnifiedBettingSystem {
    if (!UnifiedBettingSystem.instance) {
      UnifiedBettingSystem.instance = new UnifiedBettingSystem();
    }
    return UnifiedBettingSystem.instance;
  }
  public async initialize(): Promise<void> {

    await this.predictionEngine.initialize();
    await this.strategyEngine.initialize();
    this.performanceMonitor.endTrace(traceId);
  }
  public async analyzeBettingOpportunity(context: BettingContext): Promise<BettingDecision> {



    const { confidence, expectedValue } = this.calculateMetrics(
      historicalTrends,
      marketSignals,
      riskFactors;
    );

    // Fix: stake is not defined in this scope, use a calculated value;

    const decision: BettingDecision = {
      id: `decision_${Date.now()}`,
      type,
      odds: 1,
      confidence,
      shouldBet: true,
      stake,
      metadata: {
        strategy: '',
        factors: [],
        riskScore: 0,
      },
    };
    // this.eventBus.emit('bettingDecision', decision); // Commented out unavailable eventBus usage;
    return decision;
  }
  public calculatePerformanceMetrics(bets: BetRecord[]): PerformanceMetrics {
    const completedBets = bets.filter(
      bet => bet.result && bet.result !== 'pending'
    );
    const wins = completedBets.filter(
      bet => bet.result === 'win'
    );

    const totalReturn = completedBets.reduce((sum, bet) => {
      if (bet.result === 'win') {
        return sum + (bet.profitLoss ?? 0);
      }
      return sum - bet.stake;
    }, 0);



    const returns = completedBets.map(bet =>
      bet.result === 'win' && bet.stake;
        ? ((bet.profitLoss ?? 0) - bet.stake) / bet.stake;
        : -1;
    );


    return {
      totalBets: completedBets.length,
      winRate: winRate * 100,
      roi: roi * 100,
      profitLoss,
      clvAverage: clvAnalysis.clvValue,
      edgeRetention: clvAnalysis.edgeRetention,
      kellyMultiplier: this.calculateKellyMultiplier(roi, winRate),
      marketEfficiencyScore: clvAnalysis.marketEfficiency,
      averageOdds: this.calculateAverageOdds(completedBets),
      maxDrawdown: this.calculateMaxDrawdown(completedBets),
      sharpeRatio,
      betterThanExpected: this.calculateEdgeRetention(completedBets),
      timestamp: Date.now(),
      cpu: { usage: 0, cores: 0, temperature: 0 },
      memory: { total: 0, used: 0, free: 0, swap: 0 },
      network: { bytesIn: 0, bytesOut: 0, connections: 0, latency: 0 },
    } as PerformanceMetrics;
  }

  public analyzeClv(bet: BetRecord): ClvAnalysis {



    const timeValue = this.calculateTimingImpact(bet); // Restored timeValue calculation;

    return {
      clvValue,
      edgeRetention,
      marketEfficiency,
      timeValue,
      factors: [
        {
          name: 'Market Timing',
          impact: this.calculateTimingImpact(bet),
          description: 'Impact of bet timing relative to market close',
        },
        {
          name: 'Price Movement',
          impact: this.calculatePriceMovement(bet),
          description: 'Magnitude and direction of line movement',
        },
        {
          name: 'Market Efficiency',
          impact: marketEfficiency,
          description: 'Overall market pricing efficiency',
        },
      ],
    };
  }

  private async analyzeHistoricalTrends(context: BettingContext): Promise<string[]> {
    // Implement historical analysis;
    return [];
  }

  private async analyzeMarketSignals(context: BettingContext): Promise<string[]> {
    // Implement market signal analysis;
    return [];
  }

  private async analyzeRiskFactors(context: BettingContext): Promise<string[]> {
    // Implement risk factor analysis;
    return [];
  }

  private calculateMetrics(
    historicalTrends: string[],
    marketSignals: string[],
    riskFactors: string[]
  ): { confidence: number; expectedValue: number } {
    // Implement metric calculation;
    return { confidence: 0.7, expectedValue: 0.05 };
  }

  private calculateOptimalStake(expectedValue: number, confidence: number): number {
    // TODO: Replace with actual strategyConfig if/when available;




    return Math.min(Math.max(kellyStake, minStake), maxStakeLimit);
  }

  private calculateVariance(returns: number[]): number {

    return returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  }

  private calculateSharpeRatio(returns: number[]): number {


    const riskFreeRate = 0.02 / 365; // Daily risk-free rate;
    return (mean - riskFreeRate) / stdDev;
  }

  private calculateAverageOdds(bets: BetRecord[]): number {
    return bets.length ? bets.reduce((sum, bet) => sum + (bet.odds ?? 0), 0) / bets.length : 0;
  }

  private calculateMaxDrawdown(bets: BetRecord[]): number {
    const maxDrawdown = 0;
    const peak = 0;
    const balance = 0;
    bets.forEach(bet => {
      if (bet.result && bet.result.toLowerCase() === 'win') {
        balance += (bet.payout ?? 0) - (bet.stake ?? 0);
      } else {
        balance -= bet.stake ?? 0;
      }
      if (balance > peak) {
        peak = balance;
      }

      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });
    return maxDrawdown * 100;
  }

  private calculateClvValue(bet: BetRecord): number {
    if (!bet.metadata || typeof bet.metadata.closingOdds !== 'number') return 0;
    return ((bet.metadata.closingOdds - (bet.odds ?? 0)) / (bet.odds ?? 1)) * 100;
  }

  private calculateEdgeRetention(bets: BetRecord[]): number {
    const expectedWinRate = bets.length;
      ? bets.reduce((sum, bet) => sum + (bet.metadata?.confidence ?? 0), 0) / bets.length;
      : 0;
    const actualWinRate = bets.length;
      ? bets.filter(bet => bet.result && bet.result.toUpperCase() === 'WIN').length / bets.length;
      : 0;
    return expectedWinRate ? (actualWinRate / expectedWinRate) * 100 : 0;
  }

  private calculateMarketEfficiency(bet: BetRecord): number {
    if (!bet.metadata || typeof bet.metadata.closingOdds !== 'number') return 1;

    return bet.odds ? 1 - movement / bet.odds : 1;
  }

  private calculateTimingImpact(bet: BetRecord): number {
    if (!bet.metadata || typeof bet.metadata.closingLine !== 'number') return 0;

    return 1 - timeToClose / 24;
  }

  private calculatePriceMovement(bet: BetRecord): number {
    if (!bet.metadata || typeof bet.metadata.closingOdds !== 'number') return 0;
    return bet.odds ? (bet.metadata.closingOdds - bet.odds) / bet.odds : 0;
  }

  private calculateKellyMultiplier(roi: number, winRate: number): number {
    return roi !== 0 ? (roi * winRate - (1 - winRate)) / roi : 0;
  }

  private calculateProfitByStrategy(bets: BetRecord[]): Record<string, number> {
    return bets.reduce(
      (acc, bet) => {

        const profit =
          (bet as any).result && (bet as any).result.toUpperCase() === 'WIN'
            ? ((bet as any).payout ?? 0) - ((bet as any).stake ?? 0)
            : -((bet as any).stake ?? 0);
        acc[strategy] = (acc[strategy] || 0) + profit;
        return acc;
      },
      {} as Record<string, number>
    );
  }

  private calculateSharpnessScore(bets: BetRecord[]): number {

    const winRate = bets.length;
      ? bets.filter(bet => (bet as any).result && (bet as any).result.toUpperCase() === 'WIN')
        .length / bets.length;
      : 0;
    return clvScore * 0.6 + winRate * 100 * 0.4;
  }

  private calculateAverageClv(bets: BetRecord[]): ClvAnalysis {
    const betsWithClv = bets.filter(
      bet => (bet as any).metadata && typeof (bet as any).metadata.closingOdds === 'number'
    );
    if (betsWithClv.length === 0) {
      return {
        clvValue: 0,
        edgeRetention: 0,
        marketEfficiency: 1,
      };
    }


    return {
      clvValue: avgClv,
      edgeRetention: this.calculateEdgeRetention(betsWithClv as any),
      marketEfficiency:
        betsWithClv.reduce((sum, bet) => sum + this.calculateMarketEfficiency(bet as any), 0) /
        betsWithClv.length,
    };
  }

  private setupEventListeners(): void {
    // TODO: Refactor or re-implement event listeners to match available EventBus API;
    // Commenting out broken event bus usage for now;
    /*
    this.eventBus.on('market:update', async event => { ... });
    this.eventBus.on('prediction:feedback', async event => { ... });
    this.eventBus.on('strategy:result', async event => { ... });
    this.eventBus.on('monitor:alert', event => { ... });
    this.eventBus.on('metric:recorded', async data => { ... });
    this.eventBus.on('prediction:update', this.handleOpportunity.bind(this));
    */
  }

  private async handleMarketUpdate(update: MarketUpdate): Promise<void> {
    // Commented out: this.dataEngine.handleMarketUpdate(update);
    // Commented out: this.eventBus.publish({ ... });
    // TODO: Implement with available APIs;
  }

  private async handlePredictionFeedback(feedback: {
    actual: number;
    predicted: number;
    confidence: number;
    factors: Array<{ name: string; source: string }>;
  }): Promise<void> {
    // Commented out: this.eventBus.publish({ ... });
    // TODO: Implement with available APIs;
    // Commented out: unifiedState.getState();
    // Commented out: unifiedState.updateState({ ... });
  }

  private async handleStrategyResult(result: {
    profitLoss: number;
    exposure: number;
    confidence: number;
    factors: Array<{ name: string; source: string }>;
  }): Promise<void> {
    // Commented out: this.eventBus.publish({ ... });
    // TODO: Implement with available APIs;
    // Commented out: unifiedState.getState();
    // Commented out: unifiedState.updateState({ ... });
  }

  private async handleCriticalAlert(alert: Alert): Promise<void> {
    // Commented out: const config = this.configManager.getConfig();
    // Commented out: const state = unifiedState.getState();
    try {
      // Commented out: this.monitor.logError(...)
      // TODO: Implement error logging if/when monitor is available;
      // Commented out: circuit breaker logic;
      // Commented out: eventBus.publish;
      // Commented out: switch(alert.type) { ... }
    } catch (error) {
      // Commented out: this.monitor.logError(...)
      // Commented out: config.system.emergencyMode = true;
      // Commented out: await this.configManager.updateConfig({ system: config.system });
    }
  }

  private shouldActivateCircuitBreaker(alert: Alert): boolean {
    // Commented out: configManager, unifiedState, monitor usage;
    return false;
  }

  private async stopActiveBettingOperations(): Promise<void> {
    // Commented out: unifiedState.getState();
    // Commented out: cancelBet logic;
    // Commented out: this.predictionEngine.stopAllPredictions();
    // Commented out: unifiedState.updateState({ ... });
  }

  private async cancelBet(betId: string): Promise<void> {
    // Commented out: unifiedState.getState();
    // Commented out: bet lookup and update;
    // Commented out: this.eventBus.publish({ ... });
  }

  private async mitigateOddsRisk(alert: Alert): Promise<void> {
    // Commented out: configManager, monitor usage;
  }
  private async mitigateInjuryRisk(alert: Alert): Promise<void> {
    // Commented out: configManager, monitor usage;
  }
  private async mitigateWeatherRisk(alert: Alert): Promise<void> {
    // Commented out: configManager, monitor usage;
  }
  private async mitigateLineMovementRisk(alert: Alert): Promise<void> {
    // Commented out: configManager, monitor usage;
  }
  private async mitigateSystemRisk(alert: Alert): Promise<void> {
    // Commented out: configManager, monitor usage;
  }

  public registerStrategy(strategy: BettingStrategy): void {
    if (this.strategies.has(strategy.id)) {
      throw new Error(`Strategy ${strategy.id} already registered`);
    }
    this.strategies.set(strategy.id, strategy);
    // Commented out: this.eventBus.emit('metric:recorded', ...)
  }

  public async evaluateBet(
    prediction: AnalysisResult,
    odds: number,
    context?: Partial<BettingContext>
  ): Promise<BettingDecision> {
    // Commented out: unifiedState.getState();
    // Commented out: unifiedState.updateBettingState({ ... });
    // Commented out: this.eventBus.emit('metric:recorded', ...)
    // Return a dummy BettingDecision for now;
    return {
      id: `decision_${Date.now()}`,
      odds,
      shouldBet: false,
      stake: 0,
      confidence: 0,
      type: 'single',
      metadata: {
        strategy: 'none',
        factors: ['no_positive_decisions'],
        riskScore: 0,
      },
    };
  }

  public async settleBet(betId: string, result: BetResult): Promise<void> {
    // Commented out: unifiedState.getState();
    // Commented out: unifiedState.updateBettingState({ ... });
    // Commented out: this.eventBus.emit('betting:result', ...)
  }

  private createBettingContext(odds: number, context?: Partial<BettingContext>): BettingContext {
    // Commented out: unifiedState.getState();
    const defaultContext: BettingContext = {
      bankroll: 10000,
      maxRiskPerBet: 0.02,
      minOdds: 1.5,
      maxOdds: 10,
      odds,
      metrics: {
        totalBets: 0,
        winRate: 0,
        roi: 0,
        profitLoss: 0,
        clvAverage: 0,
        edgeRetention: 0,
        kellyMultiplier: 1,
        marketEfficiencyScore: 0,
        averageOdds: 0,
        maxDrawdown: 0,
        sharpeRatio: 0,
        betterThanExpected: 0,
        timestamp: Date.now(),
        cpu: { usage: 0, cores: 0, temperature: 0 },
        memory: { total: 0, used: 0, free: 0, swap: 0 },
        network: { bytesIn: 0, bytesOut: 0, connections: 0, latency: 0 },
      },
      recentBets: [],
      timestamp: Date.now(),
    };

    return { ...defaultContext, ...context };
  }

  private validateSystemConstraints(state: Record<string, unknown>, context: BettingContext): boolean {
    // Check number of active bets;
    if (state.betting.activeBets.size >= this.MAX_ACTIVE_BETS) {
      return false;
    }

    // Check odds range;
    if (context.odds < context.minOdds || context.odds > context.maxOdds) {
      return false;
    }

    // Check system status;
    if (state.status !== 'ready') {
      return false;
    }

    return true;
  }

  private getApplicableStrategies(
    prediction: AnalysisResult,
    context: BettingContext;
  ): BettingStrategy[] {
    return Array.from(this.strategies.values()).filter(strategy => {
      // Commented out: strategy.metadata.minConfidence, riskLevel checks;
      return true;
    });
  }

  private aggregateDecisions(
    decisions: BettingDecision[],
    prediction: AnalysisResult;
  ): BettingDecision {

    if (positiveBets.length === 0) {
      return {
        id: `decision_${Date.now()}`,
        odds: 1,
        shouldBet: false,
        stake: 0,
        confidence: 0,
        type: 'single',
        metadata: {
          strategy: 'none',
          factors: ['no_positive_decisions'],
          riskScore: 0,
        },
      };
    }

    // Calculate weighted stake and confidence;

    const weightedStake = positiveBets.reduce(
      (sum, d) => sum + d.stake * (d.confidence / totalConfidence),
      0;
    );

    // Combine factors and calculate risk;

    const averageRisk =
      positiveBets.reduce((sum, d) => sum + d.metadata.riskScore, 0) / positiveBets.length;

    return {
      id: `decision_${Date.now()}`,
      odds: 1,
      shouldBet: true,
      stake: weightedStake,
      confidence: averageConfidence,
      type: this.determineBetType(positiveBets),
      metadata: {
        strategy: positiveBets.map(d => d.metadata.strategy).join(','),
        factors: allFactors,
        riskScore: averageRisk,
      },
    };
  }

  private createNoBetDecision(reason: string): BettingDecision {
    return {
      shouldBet: false,
      stake: 0,
      confidence: 0,
      type: 'single',
      metadata: {
        strategy: 'none',
        factors: [reason],
        riskScore: 0,
      },
    };
  }

  private calculateRiskScore(prediction: AnalysisResult, context: BettingContext): number {
    const weights = {
      confidence: 0.3,
      recentPerformance: 0.2,
      marketEfficiency: 0.2,
      exposure: 0.3,
    };




    return (
      confidenceRisk * weights.confidence +
      recentPerformanceRisk * weights.recentPerformance +
      marketEfficiencyRisk * weights.marketEfficiency +
      exposureRisk * weights.exposure;
    );
  }

  private calculateExposureRisk(context: BettingContext): number {

    return Math.min(1, totalExposure / (context.bankroll * context.maxRiskPerBet));
  }

  private determineBetType(decisions: BettingDecision[]): BetType {

    return types.includes('parlay') ? 'parlay' : 'single';
  }

  private calculatePayout(bet: BetRecord, result: BetResult): number {
    if (result.toLowerCase() === 'win') {
      return bet.stake * bet.odds;
    }
    if (result.toLowerCase() === 'push') {
      return bet.stake;
    }
    return 0;
  }

  private updatePerformanceMetrics(payout: number): PerformanceMetrics {

    const currentMetrics = state.betting.performance || {
      totalBets: 0,
      winRate: 0,
      roi: 0,
      profitLoss: 0,
      clvAverage: 0,
      edgeRetention: 0,
      kellyMultiplier: 1,
      marketEfficiencyScore: 0,
      averageOdds: 0,
      maxDrawdown: 0,
      sharpeRatio: 0,
      betterThanExpected: 0,
    };


    const roi = profitLoss / (totalBets * 100); // Assuming average stake of 100;

    return {
      ...currentMetrics,
      totalBets,
      profitLoss,
      roi,
      winRate: (currentMetrics.winRate * (totalBets - 1) + (payout > 0 ? 1 : 0)) / totalBets,
    };
  }

  private initializeMetrics(): BettingMetrics {
    return {
      totalBets: 0,
      winningBets: 0,
      losingBets: 0,
      totalStake: 0,
      totalPnl: 0,
      roi: 0,
      winRate: 0,
      averageStake: 0,
      averagePnl: 0,
      lastUpdate: Date.now(),
    };
  }

  private initializeRiskProfile(): RiskProfile {
    return {
      maxExposure: 1000,
      maxPositions: 10,
      stopLoss: 0.1,
      profitTarget: 0.2,
      riskPerTrade: 0.02,
      maxDrawdown: 0.15,
    };
  }

  private async handleOpportunity(opportunity: BettingOpportunity): Promise<void> {

    try {
      // Check if we should take this opportunity;
      if (!this.shouldTakeOpportunity(opportunity)) {
        this.performanceMonitor.endTrace(traceId);
        return;
      }

      // Calculate optimal stake;

      // Create betting position;

      // Update metrics;
      this.updateMetrics(position);

      this.performanceMonitor.endTrace(traceId);
    } catch (error) {
      this.performanceMonitor.endTrace(traceId, error as Error);
      this.monitor.logError('betting', error as Error);
    }
  }

  private shouldTakeOpportunity(opportunity: BettingOpportunity): boolean {
    // Check confidence threshold;
    if (opportunity.confidence < 0.7) return false;

    // Check current exposure;

    if (currentExposure >= this.riskProfile.maxExposure) return false;

    // Check number of open positions;
    if (this.getOpenPositions().length >= this.riskProfile.maxPositions) return false;

    // Check risk factors;

    if (riskFactors.includes('high_volatility') || riskFactors.includes('low_liquidity')) {
      return false;
    }

    return true;
  }

  private async createPosition(
    opportunity: BettingOpportunity,
    stake: number;
  ): Promise<BettingPosition> {
    const position: BettingPosition = {
      id: `pos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      propId: opportunity.propId,
      type: opportunity.type,
      stake,
      entryPrice: opportunity.marketState.line,
      timestamp: Date.now(),
      status: 'open',
    };

    this.positions.set(position.id, position);
    return position;
  }

  private updateMetrics(position: BettingPosition): void {
    this.metrics.totalBets++;
    this.metrics.totalStake += position.stake;
    this.metrics.averageStake = this.metrics.totalStake / this.metrics.totalBets;

    if (position.status === 'closed' && position.pnl !== undefined) {
      this.metrics.totalPnl += position.pnl;
      this.metrics.averagePnl = this.metrics.totalPnl / this.metrics.totalBets;
      this.metrics.roi = this.metrics.totalPnl / this.metrics.totalStake;

      if (position.pnl > 0) {
        this.metrics.winningBets++;
      } else {
        this.metrics.losingBets++;
      }

      this.metrics.winRate = this.metrics.winningBets / this.metrics.totalBets;
    }

    this.metrics.lastUpdate = Date.now();
  }

  private calculateCurrentExposure(): number {
    return Array.from(this.positions.values())
      .filter(p => p.status === 'open')
      .reduce((sum, p) => sum + p.stake, 0);
  }

  private getOpenPositions(): BettingPosition[] {
    return Array.from(this.positions.values()).filter(p => p.status === 'open');
  }

  public async closePosition(positionId: string, closePrice: number): Promise<void> {

    if (!position || position.status !== 'open') {
      throw new Error(`Cannot close position ${positionId}`);
    }

    position.status = 'closed';
    position.closePrice = closePrice;
    position.closeTimestamp = Date.now();
    position.pnl = pnl;

    this.updateMetrics(position);
  }

  private calculatePnl(position: BettingPosition, closePrice: number): number {


    return position.stake * priceChange * multiplier;
  }

  public getMetrics(): BettingMetrics {
    return { ...this.metrics };
  }

  public getRiskProfile(): RiskProfile {
    return { ...this.riskProfile };
  }

  public getPosition(positionId: string): BettingPosition | undefined {
    return this.positions.get(positionId);
  }

  public getAllPositions(): BettingPosition[] {
    return Array.from(this.positions.values());
  }

  public async evaluatePosition(
    positionId: string,
    closePrice: number;
  ): Promise<{
    currentPnl: number;
    riskLevel: 'low' | 'medium' | 'high';
    recommendation: 'hold' | 'close';
  }> {

    if (!position || position.status !== 'open') {
      throw new Error(`Invalid position ${positionId}`);
    }
    // Use uppercase for BetType if needed;
    // Commented out: this.dataEngine.getMarketData(position.propId);


    // Determine risk level;
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (pnlPercent <= -this.riskProfile.stopLoss) {
      riskLevel = 'high';
    } else if (pnlPercent < 0) {
      riskLevel = 'medium';
    }

    // Generate recommendation;
    let recommendation: 'hold' | 'close' = 'hold';
    if (pnlPercent <= -this.riskProfile.stopLoss || pnlPercent >= this.riskProfile.profitTarget) {
      recommendation = 'close';
    }

    return {
      currentPnl,
      riskLevel,
      recommendation,
    };
  }

  public async evaluateBettingOpportunity(
    prediction: AnalysisResult,
    context: BettingContext;
  ): Promise<BettingStrategy> {
    try {
      const opportunity: BettingOpportunity = {
        id: prediction.id,
        propId: prediction.id,
        type: 'OVER', // Use uppercase for BetType;
        confidence: prediction.confidence,
        expectedValue: 0,
        timestamp: Date.now(),
        marketState: {
          line: 0,
          volume: 0,
          movement: 'stable',
        },
        analysis: {
          historicalTrends: prediction.data.historicalTrends,
          marketSignals: prediction.data.marketSignals,
          riskFactors: prediction.risk_factors,
        },
      };
      // Commented out: strategyEngine.evaluateOpportunity, generateRecommendation (private)
      return {
        id: `strategy-${Date.now()}`,
        opportunityId: opportunity.id,
        riskAssessment: {} as any, // Use any for missing fields;
        recommendedStake: 0,
        entryPoints: [],
        exitPoints: [],
        hedgingRecommendations: [],
        timestamp: Date.now(),
        status: 'active',
        metadata: {
          createdAt: Date.now(),
          updatedAt: Date.now(),
          version: '1.0.0',
        },
      };
    } catch (error) {
      // Commented out: this.eventBus.emit('error', ...)
      throw error;
    }
  }

  public async updateBankrollState(
    betType: BetType,
    stake: number,
    odds: number,
    result: BetResult;
  ): Promise<void> {

    this.bankrollState = {
      ...this.bankrollState,
      currentAmount: this.bankrollState.currentAmount + profitLoss,
      totalWagered: this.bankrollState.totalWagered + stake,
      totalWon:
        result.toLowerCase() === 'win'
          ? this.bankrollState.totalWon + profitLoss;
          : this.bankrollState.totalWon,
      totalLost:
        result.toLowerCase() === 'loss'
          ? this.bankrollState.totalLost + stake;
          : this.bankrollState.totalLost,
      openPositions:
        result.toLowerCase() === 'pending'
          ? this.bankrollState.openPositions + 1;
          : this.bankrollState.openPositions,
      maxDrawdown: Math.min(this.bankrollState.maxDrawdown, profitLoss),
      lastUpdate: Date.now(),
    };
    // TODO: Add event emit if/when eventBus is available;
  }

  private calculateProfitLoss(stake: number, odds: number, result: BetResult): number {
    if (result.toLowerCase() === 'win') {
      return stake * (odds - 1);
    } else if (result.toLowerCase() === 'loss') {
      return -stake;
    }
    return 0;
  }
}

export function toRiskTolerance(level: string): RiskTolerance {
  switch (level) {
    case 'LOW':
      return 'low';
    case 'MEDIUM':
      return 'medium';
    case 'HIGH':
      return 'high';
    default:
      return level as RiskTolerance;
  }
}
