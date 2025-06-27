import { ModelOutput, BetRecommendation } from '@/types/prediction.ts';
import { UnifiedLogger } from '@/logging/types.ts';
import { UnifiedMetrics } from '@/metrics/types.ts';

export interface ModelPerformanceMetrics {
  totalPredictions: number;
  correctPredictions: number;
  totalStake: number;
  totalPayout: number;
  roi: number;
  winRate: number;
  averageConfidence: number;
  averageOdds: number;
  profitFactor: number;
  sharpeRatio: number;
  maxDrawdown: number;
  kellyCriterion: number;
  expectedValue: number;
  calibrationScore: number;
  lastUpdated: Date;
}

interface PerformanceSnapshot {
  timestamp: Date;
  metrics: ModelPerformanceMetrics;
}

export class ModelPerformanceTracker {
  private performanceHistory: Map<string, PerformanceSnapshot[]>;
  private currentMetrics: Map<string, ModelPerformanceMetrics>;
  private calibrationData: Map<string, { predicted: number[]; actual: number[] }>;

  constructor(
    private logger: UnifiedLogger,
    private metrics: UnifiedMetrics,
    private readonly maxHistoryLength: number = 100;
  ) {
    this.performanceHistory = new Map();
    this.currentMetrics = new Map();
    this.calibrationData = new Map();
  }

  public trackPrediction(
    modelName: string,
    prediction: ModelOutput,
    recommendation: BetRecommendation;
  ): void {

    current.totalPredictions++;
    current.totalStake += recommendation.stake;
    current.averageConfidence = this.updateAverage(
      current.averageConfidence,
      prediction.confidence,
      current.totalPredictions;
    );

    // Update calibration data;
    this.updateCalibrationData(modelName, prediction.confidence);

    this.currentMetrics.set(modelName, current);
    this.trackMetrics(modelName, current);
  }

  public recordOutcome(modelName: string, stake: number, payout: number, odds: number): void {


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

  public getModelPerformance(modelName: string): ModelPerformanceMetrics | undefined {
    return this.currentMetrics.get(modelName);
  }

  public getPerformanceHistory(
    modelName: string,
    timeframe: 'day' | 'week' | 'month' | 'all' = 'all'
  ): PerformanceSnapshot[] {



    return history.filter(snapshot => snapshot.timestamp >= cutoff);
  }

  public getTopPerformingModels(
    metric: keyof ModelPerformanceMetrics = 'roi',
    limit: number = 5;
  ): Array<{ modelName: string; metrics: ModelPerformanceMetrics }> {
    return Array.from(this.currentMetrics.entries())
      .map(([modelName, metrics]) => ({ modelName, metrics }))
      .sort((a, b) => {


        return bValue - aValue;
      })
      .slice(0, limit);
  }

  private getOrCreateMetrics(modelName: string): ModelPerformanceMetrics {
    return (
      this.currentMetrics.get(modelName) || {
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
      }
    );
  }

  private updateAverage(currentAverage: number, newValue: number, totalCount: number): number {
    return (currentAverage * (totalCount - 1) + newValue) / totalCount;
  }

  private calculateProfitFactor(metrics: ModelPerformanceMetrics): number {


    return grossLoss === 0 ? 0 : Number(grossProfit) / Number(grossLoss);
  }

  private calculateSharpeRatio(modelName: string): number {

    if (history.length < 2) return 0;

    const returns = history.map((snapshot, i) => {
      if (i === 0) return 0;

      return snapshot.metrics.roi - prevRoi;
    });

    const stdDev = Math.sqrt(
      returns.reduce((sum, ret) => sum + Math.pow(ret - avgReturn, 2), 0) / returns.length;
    );

    return stdDev === 0 ? 0 : avgReturn / stdDev;
  }

  private calculateMaxDrawdown(modelName: string): number {

    if (history.length < 2) return 0;

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

  private calculateKellyCriterion(metrics: ModelPerformanceMetrics): number {




    return Math.max(0, Math.min(kelly, 0.5)); // Cap at 50% of bankroll;
  }

  private calculateExpectedValue(metrics: ModelPerformanceMetrics, odds: number): number {




    return winProb * winAmount - (1 - winProb) * lossAmount;
  }

  private updateCalibrationData(modelName: string, predictedConfidence: number): void {

    data.predicted.push(predictedConfidence);
    this.calibrationData.set(modelName, data);
  }

  private calculateCalibrationScore(modelName: string): number {

    if (!data || data.predicted.length < 10) return 0;

    // Group predictions into bins;




    data.predicted.forEach((pred, i) => {

      binCounts[bin]++;
      if (data.actual[i]) binCorrect[bin]++;
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

  private updateHistory(modelName: string, metrics: ModelPerformanceMetrics): void {

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

  private getCutoffDate(timeframe: 'day' | 'week' | 'month' | 'all'): Date {

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

  private trackMetrics(modelName: string, metrics: ModelPerformanceMetrics): void {
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
