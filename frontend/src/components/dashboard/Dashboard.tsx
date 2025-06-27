import { useQuery } from '@tanstack/react-query.ts';
import React from 'react.ts';
import { Line } from 'react-chartjs-2.ts';
import { predictionService } from '@/services/predictionService.ts';
import useStore from '@/store/useStore.ts';
import { UnifiedStrategyConfig } from '@/strategy/UnifiedStrategyConfig.ts';
import EnhancedPropCard from '@/ui/EnhancedPropCard.ts';
import GlassCard from '@/ui/GlassCard.ts';
import GlowButton from '@/ui/GlowButton.ts';
import { NotificationCenter } from '@/ui/NotificationCenter.ts';
import Tooltip from '@/ui/Tooltip.ts';

const Dashboard: React.FC = () => {
  const { darkMode } = useStore();

  // Fetch recent predictions;
  const { data: predictions, isLoading: predictionsLoading } = useQuery({
    queryKey: ['predictions'],
    queryFn: () => predictionService.getRecentPredictions(),
    staleTime: 30000,
  });

  // Fetch engine metrics;
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => predictionService.getEngineMetrics(),
    staleTime: 30000,
  });

  // Performance chart data;
  const chartData = {
    labels: predictions?.map(p => new Date(p.timestamp).toLocaleTimeString()) || [],
    datasets: [
      {
        label: 'Prediction Accuracy',
        data: predictions?.map(p => p.prediction) || [],
        borderColor: '#5D5CDE',
        backgroundColor: 'rgba(93, 92, 222, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Confidence',
        data: predictions?.map(p => p.confidence) || [],
        borderColor: '#FFD700',
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
      },
    },
  };

  return (
    <div className="space-y-8" key={778766}>
      {/* Notification Center */}
      <div className="flex justify-end mb-2" key={299759}>
        <NotificationCenter / key={153924}>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
        <GlassCard key={726196}>
          <div className="flex items-center justify-between" key={96335}>
            <Tooltip content="Total number of predictions made by the engine." key={602979}>
              <span className="text-sm text-gray-500 cursor-help" key={746776}>Total Predictions</span>
            </Tooltip>
            <span className="text-3xl font-bold text-primary-500" key={608874}>
              {metricsLoading ? '...' : metrics?.total_predictions || 0}
            </span>
          </div>
        </GlassCard>
        <GlassCard key={726196}>
          <div className="flex items-center justify-between" key={96335}>
            <Tooltip content="Average accuracy of all predictions." key={626095}>
              <span className="text-sm text-gray-500 cursor-help" key={746776}>Avg Accuracy</span>
            </Tooltip>
            <span className="text-3xl font-bold text-primary-500" key={608874}>
              {metricsLoading ? '...' : metrics?.average_accuracy ? `${(metrics.average_accuracy * 100).toFixed(1)}%` : '0%'}
            </span>
          </div>
        </GlassCard>
        <GlassCard key={726196}>
          <div className="flex items-center justify-between" key={96335}>
            <Tooltip content="Success rate of predictions (win %)." key={396730}>
              <span className="text-sm text-gray-500 cursor-help" key={746776}>Success Rate</span>
            </Tooltip>
            <span className="text-3xl font-bold text-primary-500" key={608874}>
              {metricsLoading ? '...' : metrics?.success_rate ? `${(metrics.success_rate * 100).toFixed(1)}%` : '0%'}
            </span>
          </div>
        </GlassCard>
        <GlassCard key={726196}>
          <div className="flex items-center justify-between" key={96335}>
            <Tooltip content="Return on investment from all predictions." key={170727}>
              <span className="text-sm text-gray-500 cursor-help" key={746776}>ROI</span>
            </Tooltip>
            <span className="text-3xl font-bold text-primary-500" key={608874}>
              {metricsLoading ? '...' : metrics?.roi ? `${metrics.roi.toFixed(2)}%` : '0%'}
            </span>
          </div>
        </GlassCard>
      </div>
      {/* Performance Chart */}
      <GlassCard className="p-6" key={913512}>
        <div className="flex justify-between items-center mb-4" key={240336}>
          <h2 className="text-xl font-semibold" key={97699}>Performance Overview</h2>
          <Tooltip content="Refresh chart data" key={39782}>
            <GlowButton onClick={() = key={666391}> window.location.reload()}>
              Refresh;
            </GlowButton>
          </Tooltip>
        </div>
        <div className="h-80" key={286132}>
          <Line data={chartData} options={chartOptions} / key={773846}>
        </div>
      </GlassCard>
      {/* Recent Predictions */}
      <GlassCard key={726196}>
        <h2 className="text-xl font-semibold mb-4" key={626401}>Recent Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" key={583338}>
          {predictionsLoading;
            ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" / key={478346}>
            ))
            : predictions?.slice(0, 6).map(prediction => (
              <EnhancedPropCard;
                key={prediction.id}
                playerName={prediction.playerName}
                statType={prediction.statType}
                line={prediction.line}
                overOdds={prediction.overOdds}
                underOdds={prediction.underOdds}
                sentiment={prediction.sentiment}
                aiBoost={prediction.aiBoost}
                patternStrength={prediction.patternStrength}
                bonusPercent={prediction.bonusPercent}
                enhancementPercent={prediction.enhancementPercent}
                onSelect={() = key={77260}> { }}
                onViewDetails={() => { }}
              />
            ))}
        </div>
      </GlassCard>
      {/* Strategy Compositor */}
      <GlassCard key={726196}>
        <h2 className="text-xl font-semibold mb-4" key={626401}>Strategy Compositor</h2>
        <UnifiedStrategyConfig / key={921723}>
      </GlassCard>
    </div>
  );
};

// DEPRECATED: Use UnifiedDashboard.tsx instead. This file is no longer used.

export default Dashboard;
