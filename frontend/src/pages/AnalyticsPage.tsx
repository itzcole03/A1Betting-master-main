import React from 'react.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import Tooltip from '@/components/ui/Tooltip.ts';
import { PatternStrengthMetrics } from '@/components/analytics/PatternStrengthMetrics.ts';

import ShapExplanation from '@/components/analytics/ShapExplanation.tsx';
import PredictionConfidenceGraph from '@/components/analytics/PredictionConfidenceGraph.tsx';
import RiskAssessmentMatrix from '@/components/analytics/RiskAssessmentMatrix.tsx';
import ModelComparisonChart from '@/components/analytics/ModelComparisonChart.tsx';
import TrendAnalysisChart from '@/components/analytics/TrendAnalysisChart.tsx';
import { GlobalErrorBoundary } from '@/components/common/ErrorBoundary.tsx';
import { LoadingSpinner } from '@/components/shared/ui/LoadingSpinner.tsx';
import ToastContainer from '@/components/shared/feedback/Toast.tsx';
// Alpha1 Advanced Widgets;
import ConfidenceBands from '@/components/ui/ConfidenceBands.tsx';
import RiskHeatMap from '@/components/ui/RiskHeatMap.tsx';
import SourceHealthBar from '@/components/ui/SourceHealthBar.tsx';
import WhatIfSimulator from '@/components/advanced/WhatIfSimulator.tsx';
// Personalization overlay;
import { userPersonalizationService } from '@/services/analytics/userPersonalizationService.ts';
// TODO: Add tests for new widgets;

const AnalyticsPage: React.FC = () => {
  return (
    <ToastContainer key={735309}>
      <GlobalErrorBoundary key={775620}>
        <div className="p-6 space-y-8 bg-gradient-to-br from-blue-900/80 to-blue-700/80 min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors" key={729745}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-6" key={289465}>Analytics Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={411597}>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>Prediction Confidence</h2>
              <PredictionConfidenceGraph / key={390053}>
            </GlassCard>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>Risk Assessment</h2>
              <RiskAssessmentMatrix / key={187369}>
            </GlassCard>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>Model Comparison</h2>
              <ModelComparisonChart / key={7536}>
            </GlassCard>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>Trend Analysis</h2>
              <TrendAnalysisChart / key={295296}>
            </GlassCard>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>SHAP Explanation</h2>
              <ShapExplanation eventId={''} / key={106388}>
            </GlassCard>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>Pattern Recognition Strength</h2>
              <PatternStrengthMetrics / key={837043}>
            </GlassCard>
            <GlassCard key={726196}>
              <h2 className="text-xl font-semibold mb-4" key={626401}>Advanced Widgets</h2>
              <div className="space-y-4" key={160407}>
                <div key={241917}>
                  <ConfidenceBands lower={42} upper={68} mean={55} / key={990729}>
                  <Tooltip content="Model confidence interval (hover for details)" key={699435}><span className="text-xs text-gray-400 ml-2" key={405417}>?</span></Tooltip>
                </div>
                <div key={241917}>
                  <RiskHeatMap riskScores={[0.2, 0.6, 0.7]} / key={137762}>
                  <Tooltip content="Risk heat map (hover for details)" key={91460}><span className="text-xs text-gray-400 ml-2" key={405417}>?</span></Tooltip>
                </div>
                <div key={241917}>
                  <SourceHealthBar sources={[
                    { name: 'Sportradar', healthy: true },
                    { name: 'Weather', healthy: true },
                    { name: 'Injury', healthy: false },
                  ]} / key={533883}>
                  <Tooltip content="Source health status (hover for details)" key={914713}><span className="text-xs text-gray-400 ml-2" key={405417}>?</span></Tooltip>
                </div>
                <div key={241917}>
                  <WhatIfSimulator / key={356588}>
                  <Tooltip content="What-if scenario simulator (hover for details)" key={614019}><span className="text-xs text-gray-400 ml-2" key={405417}>?</span></Tooltip>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </GlobalErrorBoundary>
    </ToastContainer>
  );
};

export default AnalyticsPage;
