import React from 'react.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';
import PerformanceMetrics from './PerformanceMetrics.ts';
import { NoResultsFallback } from './NoResultsFallback.ts';

const PerformanceAnalytics: React.FC = () => {
  const { performance } = useUnifiedAnalytics({ performance: true });

  if (!performance || performance.loading) {
    return <div className="text-center py-8" key={715292}>Loading performance metrics...</div>;
  }
  if (performance.error) {
    return <NoResultsFallback / key={711153}>;
  }
  if (!performance.performance.length) {
    return <NoResultsFallback / key={711153}>;
  }

  // Transform performance data to metrics for the UI;
  const metrics = performance.performance.map(modelPerf => ({
    label: modelPerf.model,
    trend: 'neutral' as const, // TODO: Add trend logic;
    value: modelPerf.metrics.f1,
    change: 0, // TODO: Add change logic;
  }));

  return <PerformanceMetrics metrics={metrics} / key={696344}>;
};

export default React.memo(PerformanceAnalytics);
