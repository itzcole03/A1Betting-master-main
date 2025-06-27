import React, { useEffect, useState  } from 'react.ts';
import { Card, Badge, Icon, Spinner } from '@/ui/UnifiedUI.js';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.js';
import { UnifiedAnalyticsService } from '@/services/unified/UnifiedAnalyticsService.js';
import { UnifiedWebSocketService } from '@/services/unified/UnifiedWebSocketService.js';
import { PerformanceMetrics, TrendDelta, RiskProfile } from '@/types/analytics.js';

interface RealTimeMetricsProps {
  eventId: string;
  marketId: string;
  selectionId: string;
  className?: string;
}

export const RealTimeMetrics: React.FC<RealTimeMetricsProps key={981146}> = ({
  eventId,
  marketId,
  selectionId,
  className = '',
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null key={797932}>(null);
  const [trendDelta, setTrendDelta] = useState<TrendDelta | null key={60268}>(null);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null key={675486}>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);



  useEffect(() => {
    const loadMetrics = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!analyticsService) {
          setError('Analytics service is not available.');
          setIsLoading(false);
          return;
        }

        const [metricsData, trendData, riskData] = await Promise.all([
          analyticsService.getPerformanceMetrics(eventId, marketId, selectionId),
          analyticsService.getTrendDelta(eventId, marketId, selectionId, 'day'),
          analyticsService.getRiskProfile(eventId, marketId, selectionId),
        ]);

        setMetrics(metricsData);
        setTrendDelta(trendData);
        setRiskProfile(riskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load metrics');
      } finally {
        setIsLoading(false);
      }
    };

    loadMetrics();

    // Subscribe to real-time updates;
    const unsubscribe = () => { };
    if (webSocketService) {
      unsubscribe = webSocketService.subscribe('metrics', (data: unknown) => {
        // Type guard to ensure data has the expected structure;
        if (
          data &&
          typeof data === 'object' &&
          'eventId' in data &&
          'marketId' in data &&
          'metrics' in data &&
          'trendDelta' in data &&
          'riskProfile' in data;
        ) {
          const typedData = data as {
            eventId: string;
            marketId: string;
            metrics: PerformanceMetrics;
            trendDelta: TrendDelta;
            riskProfile: RiskProfile;
          };

          if (typedData.eventId === eventId && typedData.marketId === marketId) {
            setMetrics(typedData.metrics);
            setTrendDelta(typedData.trendDelta);
            setRiskProfile(typedData.riskProfile);
          }
        }
      });
    }
    return () => unsubscribe();
  }, [eventId, marketId, selectionId, analyticsService, webSocketService]);

  const getMetricColor = (value: number, type: 'positive' | 'negative'): string => {
    if (type === 'positive') {
      return value >= 0 ? 'text-green-500' : 'text-red-500';
    }
    return value <= 0 ? 'text-green-500' : 'text-red-500';
  };

  const getTrendIcon = (value: number): string => {
    if (value > 0) return 'arrow-trending-up';
    if (value < 0) return 'arrow-trending-down';
    return 'minus';
  };

  const getRiskBadgeVariant = (riskLevel: string): 'success' | 'warning' | 'danger' | 'info' => {
    switch (riskLevel.toLowerCase()) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'danger';
      default:
        return 'info';
    }
  };

  if (isLoading) {
    return (
      <Card aria-live="polite" className={`p-6 ${className}`} key={22411}>
        <div className="flex justify-center items-center h-32" key={71295}>
          <Spinner size="large" / key={932834}>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card aria-live="polite" className={`p-6 ${className}`} key={22411}>
        <div className="text-red-500 text-center" key={232604}>
          <Icon className="w-8 h-8 mx-auto mb-2" name="exclamation-circle" / key={646897}>
          <p key={161203}>{error}</p>
        </div>
      </Card>
    );
  }

  if (!metrics || !trendDelta || !riskProfile) {
    return null;
  }

  return (
    <Card aria-live="polite" className={`p-6 ${className}`} key={22411}>
      <h3 className="text-lg font-semibold mb-4" key={792268}>Real-Time Metrics</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" key={293803}>
        <div key={241917}>
          <p className="text-sm text-gray-600" key={656535}>Accuracy</p>
          <div className="flex items-center space-x-2" key={740830}>
            <p className="text-lg font-semibold" key={930820}>{(metrics.accuracy * 100).toFixed(1)}%</p>
            <Icon;
              aria-label={
                trendDelta.accuracyDelta  key={677491}> 0;
                  ? 'Positive accuracy trend'
                  : trendDelta.accuracyDelta < 0;
                    ? 'Negative accuracy trend'
                    : 'No accuracy trend'
              }
              className={`w-4 h-4 ${getMetricColor(trendDelta.accuracyDelta, 'positive')}`}
              name={getTrendIcon(trendDelta.accuracyDelta)}
            />
          </div>
        </div>

        <div key={241917}>
          <p className="text-sm text-gray-600" key={656535}>Precision</p>
          <div className="flex items-center space-x-2" key={740830}>
            <p className="text-lg font-semibold" key={930820}>{(metrics.precision * 100).toFixed(1)}%</p>
            <Icon;
              className={`w-4 h-4 ${getMetricColor(trendDelta.precisionDelta, 'positive')}`}
              name={getTrendIcon(trendDelta.precisionDelta)}
            / key={899176}>
          </div>
        </div>

        <div key={241917}>
          <p className="text-sm text-gray-600" key={656535}>Recall</p>
          <div className="flex items-center space-x-2" key={740830}>
            <p className="text-lg font-semibold" key={930820}>{(metrics.recall * 100).toFixed(1)}%</p>
            <Icon;
              className={`w-4 h-4 ${getMetricColor(trendDelta.recallDelta, 'positive')}`}
              name={getTrendIcon(trendDelta.recallDelta)}
            / key={392654}>
          </div>
        </div>

        <div key={241917}>
          <p className="text-sm text-gray-600" key={656535}>Profit/Loss</p>
          <div className="flex items-center space-x-2" key={740830}>
            <p className="text-lg font-semibold" key={930820}>${metrics.profitLoss.toFixed(2)}</p>
            <Icon;
              className={`w-4 h-4 ${getMetricColor(metrics.profitLoss, 'positive')}`}
              name={getTrendIcon(metrics.profitLoss)}
            / key={509844}>
          </div>
        </div>
      </div>

      <div className="space-y-4" key={160407}>
        <div key={241917}>
          <h4 className="text-sm font-medium mb-2" key={943837}>Risk Profile</h4>
          <div className="flex items-center space-x-2" key={740830}>
            <Badge variant={getRiskBadgeVariant(riskProfile.riskLevel)} key={154690}>
              {riskProfile.riskLevel}
            </Badge>
            <p className="text-sm text-gray-600" key={656535}>{riskProfile.recommendation}</p>
          </div>
        </div>

        <div key={241917}>
          <h4 className="text-sm font-medium mb-2" key={943837}>Top Risk Factors</h4>
          <div className="space-y-2" key={725977}>
            {Array.isArray(riskProfile.factors) && riskProfile.factors.length > 0 ? (
              riskProfile.factors.map((factor: string, index) => (
                <div key={index} className="flex items-center justify-between" key={912667}>
                  <p className="text-sm" key={364551}>{factor}</p>
                  <Badge variant="warning" key={848621}>Risk Factor</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm" key={364551}>No risk factors available.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
