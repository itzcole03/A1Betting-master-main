import * as tf from '@tensorflow/tfjs.ts';
import dayjs from 'dayjs.ts';
import { PlayerPropService } from '@/betting/PlayerPropService.ts';
import { dataIntegrationService } from '@/data/dataIntegrationService.ts';
import { FeatureEngineeringService } from './featureEngineeringService.ts';
import { ModelTrainingService } from './modelTrainingService.ts';

// Enhanced interfaces for BacktestingService;
export interface BacktestData {
  props: BacktestProp[];
  models: BacktestModel[];
  historical: HistoricalData[];
  metadata: Record<string, unknown>;
}

export interface BacktestProp {
  id: string;
  playerId: string;
  playerName: string;
  propType: string;
  line: number;
  odds: number;
  gameId: string;
  gameDate: string;
  actualValue?: number;
  metadata: Record<string, unknown>;
}

export interface BacktestModel {
  id: string;
  name: string;
  type: string;
  version: string;
  weights: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface ModelPrediction {
  modelId: string;
  prediction: number;
  confidence: number;
  features: Record<string, number>;
  metadata: Record<string, unknown>;
}

export interface PropAnalysis {
  prop: BacktestProp;
  predictions: ModelPrediction[];
  combinedPrediction: number;
  combinedConfidence: number;
  edge: number;
  riskScore: number;
  qualifies: boolean;
  metadata: Record<string, unknown>;
}

export interface HistoricalData {
  date: string;
  timestamp: string;
  events: BacktestEvent[];
  marketData: MarketData[];
  metadata: Record<string, unknown>;
}

export interface BacktestEvent {
  id: string;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  metadata: Record<string, unknown>;
}

export interface MarketData {
  propId: string;
  playerId: string;
  playerName: string;
  propType: string;
  line: number;
  odds: number;
  gameId: string;
  openingLine: number;
  closingLine: number;
  volume: number;
  movement: number;
  metadata: Record<string, unknown>;
}

export interface TimeSeriesMetric {
  date: string;
  value: number;
  cumulativeValue: number;
  metadata: Record<string, unknown>;
}

export interface Features {
  numerical: number[];
  categorical?: Record<string, unknown>;
}

interface BacktestConfig {
  startDate: string;
  endDate: string;
  modelIds: string[];
  propTypes: string[];
  minConfidence: number;
  minValue: number;
  maxRisk: number;
  targetLegs: number;
  initialBankroll: number;
  stakeSize: number | 'kelly';
  riskManagement: {
    maxPositionSize: number;
    stopLoss: number;
    maxDrawdown: number;
  };
}

interface BacktestResult {
  summary: {
    totalBets: number;
    winningBets: number;
    losingBets: number;
    winRate: number;
    roi: number;
    profitLoss: number;
    maxDrawdown: number;
    sharpeRatio: number;
    kellyFraction: number;
  };
  modelPerformance: Record<
    string,
    {
      accuracy: number;
      precision: number;
      recall: number;
      f1Score: number;
      profitContribution: number;
    }
  >;
  propTypePerformance: Record<
    string,
    {
      totalBets: number;
      winRate: number;
      roi: number;
      averageEdge: number;
    }
  >;
  timeSeriesMetrics: {
    timestamp: number;
    bankroll: number;
    dailyPnL: number;
    runningWinRate: number;
    drawdown: number;
  }[];
  riskMetrics: {
    valueAtRisk: number;
    expectedShortfall: number;
    betaSharpe: number;
    informationRatio: number;
  };
}

interface SimulatedBet {
  timestamp: number;
  prop: {
    player: string;
    type: string;
    line: number;
    odds: { over: number; under: number };
  };
  prediction: {
    value: number;
    confidence: number;
    edge: number;
  };
  decision: {
    side: 'over' | 'under';
    stake: number;
    odds: number;
  };
  result: {
    actualValue: number;
    won: boolean;
    pnl: number;
  };
}

export class BacktestingService {
  private readonly playerPropService: PlayerPropService;
  private readonly modelTraining: ModelTrainingService;
  private readonly featureEngineering: FeatureEngineeringService;

  constructor(
    playerPropService: PlayerPropService,
    modelTraining: ModelTrainingService,
    featureEngineering: FeatureEngineeringService;
  ) {
    this.playerPropService = playerPropService;
    this.modelTraining = modelTraining;
    this.featureEngineering = featureEngineering;
  }

  public async runBacktest(config: BacktestConfig): Promise<BacktestResult> {
    try {
      // Load historical data;

      // Initialize tracking variables;
      const bankroll = config.initialBankroll;
      const maxBankroll = bankroll;
      const currentDrawdown = 0;
      const maxDrawdown = 0;
      const dailyPnL: Record<string, number> = {};
      const bets: SimulatedBet[] = [];

      // Run simulation;
      for (const date of this.getDateRange(config.startDate, config.endDate)) {

        if (!dayData) continue;

        // Get available props for the day;

        // Analyze props and generate predictions;
        const propAnalyses = await Promise.all(
          availableProps.map(prop => this.analyzeProp(prop, config.modelIds))
        );

        // Filter qualified props;
        const qualifiedProps = propAnalyses.filter(analysis =>
          this.qualifiesProp(analysis, config)
        );

        // Optimize lineup if needed;
        const selectedProps =
          config.targetLegs > 1;
            ? await this.optimizeLineup(qualifiedProps, config)
            : qualifiedProps;

        // Place simulated bets;
        for (const prop of selectedProps) {

          bets.push(bet);

          // Update bankroll and metrics;
          bankroll += bet.result.pnl;
          maxBankroll = Math.max(maxBankroll, bankroll);
          currentDrawdown = (maxBankroll - bankroll) / maxBankroll;
          maxDrawdown = Math.max(maxDrawdown, currentDrawdown);

          // Update daily P&L;

          dailyPnL[day] = (dailyPnL[day] || 0) + bet.result.pnl;
        }

        // Check stop loss and drawdown limits;
        if (this.shouldStopTrading(bankroll, maxDrawdown, config)) {
          break;
        }
      }

      // Calculate final metrics;
      return this.calculateBacktestResults(bets, config, {
        finalBankroll: bankroll,
        maxDrawdown,
        dailyPnL,
      });
    } catch (error) {
      // console statement removed
      throw error;
    }
  }
  private async loadHistoricalData(config: BacktestConfig): Promise<Record<string, HistoricalData[]>> {
    // Load historical data from data integration service;
    const data = await dataIntegrationService.fetchHistoricalData({
      startDate: config.startDate,
      endDate: config.endDate,
      propTypes: config.propTypes,
    });

    return this.organizeDataByDate(data);
  }
  private organizeDataByDate(data: HistoricalData[]): Record<string, HistoricalData[]> {
    // Organize raw data by date for efficient access;
    const organized: Record<string, HistoricalData[]> = {};

    for (const item of data) {

      organized[date] = organized[date] || [];
      organized[date].push(item);
    }

    return organized;
  }

  private getDateRange(startDate: string, endDate: string): string[] {
    const dates: string[] = [];
    const currentDate = dayjs(startDate);

    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }

    return dates;
  }
  private async getAvailableProps(dayData: HistoricalData[]): Promise<BacktestProp[]> {
    // Extract available props from day's data;
    return dayData.flatMap(item =>
      item.marketData.map(market => ({
        id: market.propId,
        playerId: market.playerId,
        playerName: market.playerName || '',
        propType: market.propType,
        line: market.line,
        odds: market.odds,
        gameId: market.gameId || '',
        gameDate: item.date,
        metadata: market.metadata,
      }))
    );
  }
  private async analyzeProp(prop: BacktestProp, modelIds: string[]): Promise<PropAnalysis> {
    // Get predictions from each model;
    const predictions = await Promise.all(
      modelIds.map(async modelId => {

        if (!model) throw new Error(`Model ${modelId} not found`);

        const features = await this.featureEngineering.engineerFeatures(prop.playerName, prop.propType, {
          /* raw data */
        });

        return {
          modelId,
          prediction: prediction.value,
          confidence: prediction.confidence,
          features: features.numerical.reduce((acc, val, idx) => {
            acc[`feature_${idx}`] = val;
            return acc;
          }, {} as Record<string, number>),
          metadata: {},
        };
      })
    );

    // Combine predictions using ensemble weights;
    return this.combineModelPredictions(predictions, prop);
  }
  private async predict(model: BacktestModel, features: Features): Promise<{ value: number; confidence: number }> {
    // Make prediction using model;
    if (model.model instanceof tf.LayersModel) {



      prediction.dispose();
      tensor.dispose();
      return { value, confidence: 0.8 }; // Default confidence;
    }

    return { value: prediction, confidence: 0.8 }; // Default confidence;
  }
  private combineModelPredictions(predictions: ModelPrediction[], prop: BacktestProp): PropAnalysis {
    // Combine predictions using weighted ensemble;

    const weightedPrediction =
      predictions.reduce((sum, p) => {
        return sum + p.prediction * p.confidence;
      }, 0) / totalWeight;


    return {
      prop,
      predictions,
      combinedPrediction: weightedPrediction,
      combinedConfidence,
      edge,
      riskScore: this.calculateRiskScore(prop),
      qualifies: false, // Will be set later;
      metadata: {},
    };
  }
  private calculateEdge(predictedValue: number, prop: BacktestProp): number {
    const impliedProbability = 1 / prop.odds; // Simplified;
    return Math.abs(predictedValue - impliedProbability);
  }

  private qualifiesProp(analysis: PropAnalysis, config: BacktestConfig): boolean {
    return (
      analysis.combinedConfidence >= config.minConfidence &&
      analysis.edge >= config.minValue &&
      analysis.riskScore <= config.maxRisk;
    );
  }

  private calculateRiskScore(_analysis: BacktestProp): number {
    // Calculate risk score based on various factors;
    return Math.random(); // Placeholder implementation;
  }
  private async optimizeLineup(props: PropAnalysis[], config: BacktestConfig): Promise<BacktestProp[]> {
    // Use player prop service to optimize lineup;
    const optimization = await this.playerPropService.optimizeLineup(
      props.map(p => p.prop),
      config.targetLegs;
    );

    return optimization.legs;
  }

  private async simulateBet(
    prop: PropAnalysis,
    bankroll: number,
    config: BacktestConfig;
  ): Promise<SimulatedBet> {



    const won =
      (side === 'over' && actualValue > prop.prop.line) ||
      (side === 'under' && actualValue < prop.prop.line);

    return {
      timestamp: prop.prop.gameDate,
      prop: prop.prop,
      prediction: {
        value: prop.combinedPrediction,
        confidence: prop.combinedConfidence,
        edge: prop.edge,
      },
      decision: {
        side,
        stake,
        odds,
      },
      result: {
        actualValue,
        won,
        pnl: won ? stake * (odds - 1) : -stake,
      },
    };
  }
  private calculateStakeSize(prop: PropAnalysis, bankroll: number, config: BacktestConfig): number {
    if (config.stakeSize === 'kelly') {
      return this.calculateKellyStake(prop, bankroll, config);
    }
    return typeof config.stakeSize === 'number'
      ? Math.min(config.stakeSize, bankroll * config.riskManagement.maxPositionSize)
      : 0;
  }

  private calculateKellyStake(prop: PropAnalysis, bankroll: number, config: BacktestConfig): number {



    const adjustedKelly = kellyFraction * 0.5; // Half Kelly for safety;

    return Math.min(bankroll * adjustedKelly, bankroll * config.riskManagement.maxPositionSize);
  }

  private async getActualValue(prop: BacktestProp): Promise<number> {
    // In real backtest, this would fetch the actual result;
    // This is a placeholder implementation;
    return prop.line + (Math.random() - 0.5) * 5;
  }

  private shouldStopTrading(bankroll: number, drawdown: number, config: BacktestConfig): boolean {
    return (
      bankroll <= config.initialBankroll * (1 - config.riskManagement.stopLoss) ||
      drawdown >= config.riskManagement.maxDrawdown;
    );
  }

  private calculateBacktestResults(
    bets: SimulatedBet[],
    config: BacktestConfig,
    metrics: {
      finalBankroll: number;
      maxDrawdown: number;
      dailyPnL: Record<string, number>;
    }
  ): BacktestResult {


    return {
      summary: {
        totalBets: bets.length,
        winningBets: winningBets.length,
        losingBets: bets.length - winningBets.length,
        winRate: winningBets.length / bets.length,
        roi: (metrics.finalBankroll - config.initialBankroll) / config.initialBankroll,
        profitLoss: metrics.finalBankroll - config.initialBankroll,
        maxDrawdown: metrics.maxDrawdown,
        sharpeRatio: this.calculateSharpeRatio(dailyReturns),
        kellyFraction: this.calculateOptimalKellyFraction(bets),
      },
      modelPerformance: this.calculateModelPerformance(bets),
      propTypePerformance: this.calculatePropTypePerformance(bets),
      timeSeriesMetrics: this.calculateTimeSeriesMetrics(bets, config),
      riskMetrics: this.calculateRiskMetrics(dailyReturns),
    };
  }

  private calculateSharpeRatio(returns: number[]): number {



    const riskFreeRate = 0.02 / 252; // Assuming 2% annual risk-free rate;

    return ((mean - riskFreeRate) / stdDev) * Math.sqrt(252); // Annualized;
  }

  private calculateOptimalKellyFraction(bets: SimulatedBet[]): number {

    const avgWin =
      bets.filter(bet => bet.result.won).reduce((sum, bet) => sum + bet.result.pnl, 0) /
      bets.filter(bet => bet.result.won).length;
    const avgLoss = Math.abs(
      bets.filter(bet => !bet.result.won).reduce((sum, bet) => sum + bet.result.pnl, 0) /
      bets.filter(bet => !bet.result.won).length;
    );

    return winRate / avgLoss - (1 - winRate) / avgWin;
  }
  private calculateModelPerformance(_bets: SimulatedBet[]): Record<string, Record<string, number>> {
    // Calculate performance metrics for each model;
    // This is a placeholder implementation;
    return {};
  }

  private calculatePropTypePerformance(_bets: SimulatedBet[]): Record<string, Record<string, number>> {
    // Calculate performance metrics for each prop type;
    // This is a placeholder implementation;
    return {};
  }

  private calculateTimeSeriesMetrics(_bets: SimulatedBet[], _config: BacktestConfig): TimeSeriesMetric[] {
    // Calculate time series metrics;
    // This is a placeholder implementation;
    return [];
  }

  private calculateRiskMetrics(returns: number[]): BacktestResult['riskMetrics'] {
    // Calculate risk metrics;
    return {
      valueAtRisk: this.calculateVaR(returns, 0.95),
      expectedShortfall: this.calculateExpectedShortfall(returns, 0.95),
      betaSharpe: this.calculateBetaSharpe(returns),
      informationRatio: this.calculateInformationRatio(returns),
    };
  }

  private calculateVaR(returns: number[], confidence: number): number {


    return -sortedReturns[index];
  }

  private calculateExpectedShortfall(returns: number[], confidence: number): number {


    return -(tailReturns.reduce((a, b) => a + b, 0) / tailReturns.length);
  }
  private calculateBetaSharpe(_returns: number[]): number {
    // Calculate beta-adjusted Sharpe ratio;
    // This is a placeholder implementation;
    return 0;
  }

  private calculateInformationRatio(_returns: number[]): number {
    // Calculate information ratio;
    // This is a placeholder implementation;
    return 0;
  }
}

export const backtestingService = new BacktestingService(
  playerPropService,
  modelTrainingService,
  featureEngineeringService;
);
