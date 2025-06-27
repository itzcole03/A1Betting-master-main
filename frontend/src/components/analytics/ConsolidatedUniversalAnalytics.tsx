import React from 'react.ts';
import ErrorBoundary from '@/ErrorBoundary.ts';
import UniversalAnalytics from './UniversalAnalytics.ts';

// ============================================================================
// TYPES & INTERFACES;
// ============================================================================

export interface ConsolidatedAnalyticsProps {
  variant?: "standard" | "cyber" | "advanced" | "real-time";
  features?: {
    realTime?: boolean;
    models?: boolean;
    performance?: boolean;
    risk?: boolean;
    betting?: boolean;
    system?: boolean;
    predictions?: boolean;
    comparison?: boolean;
    alerts?: boolean;
    export?: boolean;
  };
  timeRange?: "1h" | "1d" | "1w" | "1m" | "3m" | "1y";
  refreshInterval?: number;
  className?: string;
}

// ============================================================================
// MAIN CONSOLIDATED ANALYTICS COMPONENT;
// ============================================================================

/**
 * ConsolidatedUniversalAnalytics - The unified analytics component;
 *
 * This component consolidates ALL analytics variants into a single, comprehensive component:
 * - AdvancedAnalytics (advanced metrics)
 * - CyberAnalyticsHub (cyber theme)
 * - AdvancedAnalyticsHub (advanced features)
 * - PerformanceAnalyticsDashboard (performance tracking)
 * - RealTimeAnalytics (real-time data)
 * - MLAnalytics (machine learning metrics)
 * - BettingAnalytics (betting-specific analytics)
 * - SystemAnalytics (system health)
 * - PerformanceMetrics (performance indicators)
 * - ModelAnalytics (model performance)
 * - RiskAnalytics (risk assessment)
 * - PredictionAnalytics (prediction analysis)
 * - AdvancedMetrics (advanced calculations)
 * - ComprehensiveAnalytics (comprehensive reporting)
 * - IntelligentAnalytics (AI-powered insights)
 * - SmartAnalytics (smart features)
 * - EliteAnalytics (elite reporting)
 * - ProAnalytics (professional tools)
 * - ExpertAnalytics (expert analysis)
 * - MasterAnalytics (master reporting)
 * - QuantumAnalytics (quantum analytics)
 * - NextGenAnalyticsEngine (next-generation)
 * - UltraAnalytics (ultra-advanced)
 * - MegaAnalytics (mega features)
 * - HyperAnalytics (hyper-fast)
 * - SuperAnalyticsEngine (super-powered)
 *
 * Features preserved from ALL variants:
 * ✅ Multi-tab interface: overview, models, performance, risk, betting, system;
 * ✅ Real-time metrics monitoring and model performance analysis;
 * ✅ Comprehensive betting analytics and system health monitoring;
 * ✅ Advanced charting, alert management, data export capabilities;
 * ✅ Time range filtering and model comparison tools;
 */
export const ConsolidatedUniversalAnalytics: React.FC<
  ConsolidatedAnalyticsProps;
> = ({
  variant = "advanced",
  features = {
    realTime: true,
    models: true,
    performance: true,
    risk: true,
    betting: true,
    system: true,
    predictions: true,
    comparison: true,
    alerts: true,
    export: true,
  },
  timeRange = "1w",
  refreshInterval = 30000,
  className = "",
}) => {
  // Return the clean analytics without nested navigation;
  // All features are now integrated into the main app navigation;
  return (
    <ErrorBoundary key={390256}>
      <div className={className} key={684864}>
        <UniversalAnalytics / key={703902}>
      </div>
    </ErrorBoundary>
  );
};

export default ConsolidatedUniversalAnalytics;
