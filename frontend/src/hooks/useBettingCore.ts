import useStore from '@/store/useStore.ts';
import { BetRecord, Opportunity } from '@/types/core.ts';
import { BettingContext, BettingDecision, PerformanceMetrics } from '@/types.ts';
import { UnifiedBettingCore } from '@/services/unified/UnifiedBettingCore.ts';
import { useDataSync } from './useDataSync.ts';
import { useState, useEffect, useCallback } from 'react.ts';



interface UseBettingCoreOptions {
  playerId?: string;
  metric?: string;
  minConfidence?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onNewDecision?: (decision: BettingDecision) => void;
  onPerformanceUpdate?: (metrics: PerformanceMetrics) => void;
}

interface BettingCoreState {
  decision: BettingDecision | null;
  performance: PerformanceMetrics;
  opportunities: Opportunity[];
  isAnalyzing: boolean;
  error: Error | null;
}

export function useBettingCore({
  playerId,
  metric,
  minConfidence = 0.6,
  autoRefresh = true,
  refreshInterval = 30000,
  onNewDecision,
  onPerformanceUpdate;
}: UseBettingCoreOptions = {}) {
  const [state, setState] = useState<BettingCoreState>({
    decision: null,
    performance: UnifiedBettingCore.getInstance().calculatePerformanceMetrics([]),
    opportunities: [],
    isAnalyzing: false,
    error: null;
  });

  const { addToast } = useStore();

  // Sync betting history with local storage;
  const { data: bettingHistory } = useDataSync<BetRecord[]>({
    key: 'betting-history',
    initialData: [],
    syncInterval: 60000;
  });

  // Analyze betting opportunity;
  const analyze = useCallback(async () => {
    if (!playerId || !metric) return;

    setState(prev => ({ ...prev, isAnalyzing: true, error: null }));

    try {
      const context: BettingContext = {
        playerId,
        metric,
        timestamp: Date.now(),
        marketState: 'active',
        correlationFactors: []
      };

      if (decision.confidence >= minConfidence) {
        setState(prev => ({ ...prev, decision }));
        onNewDecision?.(decision);
      }
    } catch (err) {

      setState(prev => ({ ...prev, error }));
      addToast({
        id: 'analysis-error',
        type: 'error',
        title: 'Analysis Error',
        message: error.message;
      });
    } finally {
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  }, [playerId, metric, minConfidence, bettingCore, onNewDecision, addToast]);

  // Update performance metrics;
  const updatePerformanceMetrics = useCallback(() => {
    if (!bettingHistory?.length) return;

    try {

      setState(prev => ({
        ...prev,
        performance: metrics;
      }));

      onPerformanceUpdate?.(metrics);
    } catch (err) {

      setState(prev => ({ ...prev, error }));
      addToast({
        id: 'metrics-error',
        type: 'error',
        title: 'Metrics Error',
        message: error.message;
      });
    }
  }, [bettingHistory, bettingCore, onPerformanceUpdate, addToast]);

  // Handle new opportunities;
  const handleNewOpportunity = useCallback((opportunity: Opportunity) => {
    setState(prev => ({
      ...prev,
      opportunities: [...prev.opportunities, opportunity]
    }));

    if (opportunity.confidence >= minConfidence) {
      addToast({
        id: `opportunity-${opportunity.id}`,
        type: 'info',
        title: 'New Betting Opportunity',
        message: `High confidence opportunity found for ${opportunity.metric}`
      });
    }
  }, [minConfidence, addToast]);

  // Setup event listeners;
  useEffect(() => {
    bettingCore.on('newDecision', (decision: BettingDecision) => {
      if (decision.confidence >= minConfidence) {
        onNewDecision?.(decision);
      }
    });

    bettingCore.on('metricsUpdated', (metrics: PerformanceMetrics) => {
      onPerformanceUpdate?.(metrics);
    });

    bettingCore.on('error', (error: Error) => {
      addToast({
        id: 'betting-error',
        type: 'error',
        title: 'Error',
        message: error.message;
      });
    });

    return () => {
      bettingCore.removeAllListeners();
    };
  }, [bettingCore, minConfidence, onNewDecision, onPerformanceUpdate, addToast]);

  // Auto-refresh analysis;
  useEffect(() => {
    analyze();

    if (autoRefresh && playerId && metric) {

      return () => clearInterval(interval);
    }
  }, [analyze, autoRefresh, playerId, metric, refreshInterval]);

  // Update metrics when betting history changes;
  useEffect(() => {
    updatePerformanceMetrics();
  }, [updatePerformanceMetrics]);

  return {
    ...state,
    analyze,
    updatePerformanceMetrics,
    handleNewOpportunity;
  };
} 