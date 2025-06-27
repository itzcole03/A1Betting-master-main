import React from 'react.ts';
import Dashboard from '@/components/modern/Dashboard.tsx';
import { UnifiedPredictionInterface } from '@/components/prediction/UnifiedPredictionInterface.tsx';
import PredictionConfidenceGraph from '@/components/analytics/PredictionConfidenceGraph.tsx';
import RiskAssessmentMatrix from '@/components/analytics/RiskAssessmentMatrix.tsx';
import ModelComparisonChart from '@/components/analytics/ModelComparisonChart.tsx';
import TrendAnalysisChart from '@/components/analytics/TrendAnalysisChart.tsx';
import ShapExplanation from '@/components/analytics/ShapExplanation.tsx';
import UserStats from '@/components/analytics/UserStats.tsx';
import MLInsights from '@/components/insights/MLInsights.tsx';
import { GlobalErrorBoundary } from '@/components/common/ErrorBoundary.tsx';
import { LoadingSpinner } from '@/components/shared/ui/LoadingSpinner.tsx';
import ToastContainer from '@/components/shared/feedback/Toast.tsx';
// Alpha1 Advanced Widgets;
import ConfidenceBands from '@/components/ui/ConfidenceBands.tsx';
import RiskHeatMap from '@/components/ui/RiskHeatMap.tsx';
import SourceHealthBar from '@/components/ui/SourceHealthBar.tsx';
import WhatIfSimulator from '@/components/advanced/WhatIfSimulator.tsx';
// Personalization overlay;
// import { userPersonalizationService } from '@/services/analytics/userPersonalizationService.ts';
import { Accordion } from '@/components/Accordion.tsx';
import { Alert } from '@/components/Alert.tsx';
import Analytics from '@/components/Analytics.tsx';
import ApiHealthIndicator from '@/components/ApiHealthIndicator.jsx';
// TODO: Add tests for new widgets;

const DashboardPage: React.FC = () => {
  return (
    <>
      <ToastContainer / key={774020}>
      <GlobalErrorBoundary key={775620}>
        <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-primary-900/80 to-primary-700/80 min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 transition-colors" key={542060}>
          {/* Global Alert Example: can be made dynamic via state or context */}
          <div className="mb-4" key={158827}>
            <Alert;
              type="info"
              title="Welcome to the AI Sports Analytics Platform!"
              message="Stay tuned for real-time updates, new features, and important announcements."
              closable={false}
            / key={14372}>
          </div>
          <React.Suspense fallback={<LoadingSpinner / key={449199}>}>
            <div className="flex justify-end mb-2" key={299759}>
              <ApiHealthIndicator / key={818708}>
            </div>
            <Dashboard / key={547136}>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8" key={46790}>
              <div className="space-y-6" key={501869}>
                <UnifiedPredictionInterface / key={990845}>
                <PredictionConfidenceGraph / key={390053}>
                <RiskAssessmentMatrix / key={187369}>
                <ModelComparisonChart / key={7536}>
                <TrendAnalysisChart / key={295296}>
                <ShapExplanation eventId={''} / key={106388}>
                {/* Analytics Section: User performance, Kelly calculator, arbitrage */}
                <div className="mt-8" key={715068}>
                  <h2 className="text-xl font-bold mb-4" key={939378}>Your Analytics</h2>
                  <Analytics / key={168398}>
                </div>
                {/* Alpha1 Advanced Widgets */}
                <React.Suspense fallback={<LoadingSpinner / key={449199}>}>
                  <div className="mt-4" key={139982}>
                    <ConfidenceBands lower={45} upper={65} mean={55} / key={808715}>
                    <span className="tooltip" key={454703}>Model confidence interval (hover for details)</span>
                  </div>
                  <div className="mt-4" key={139982}>
                    <RiskHeatMap riskScores={[0.1, 0.5, 0.8]} / key={287382}>
                    <span className="tooltip" key={454703}>Risk heat map (hover for details)</span>
                  </div>
                  <div className="mt-4" key={139982}>
                    <SourceHealthBar sources={[
                      { name: 'Sportradar', healthy: true },
                      { name: 'Weather', healthy: false },
                      { name: 'Injury', healthy: true },
                    ]} / key={13493}>
                    <span className="tooltip" key={454703}>Source health status (hover for details)</span>
                  </div>
                  <div className="mt-4" key={139982}>
                    <WhatIfSimulator / key={356588}>
                    <span className="tooltip" key={454703}>What-if scenario simulator (hover for details)</span>
                  </div>
                  {/* FAQ / Help Section using Accordion */}
                  <div className="mt-8" key={715068}>
                    <h2 className="text-xl font-bold mb-4" key={939378}>Frequently Asked Questions</h2>
                    <Accordion;
                      items={[
                        {
                          title: 'How do I use the AI Sports Analytics Platform?',
                          content: (
                            <span key={329689}>
                              Navigate through the dashboard to view predictions, analytics, and insights. Use the widgets to explore advanced features.
                            </span>
                          ),
                        },
                        {
                          title: 'What do the confidence bands mean?',
                          content: (
                            <span key={595076}>
                              The confidence bands show the range in which the model expects the true value to fall, based on historical data.
                            </span>
                          ),
                        },
                        {
                          title: 'How can I simulate what-if scenarios?',
                          content: (
                            <span key={595076}>
                              Use the What-If Simulator widget to adjust parameters and see how predictions change in real time.
                            </span>
                          ),
                        },
                        {
                          title: 'Who can I contact for support?',
                          content: (
                            <span key={595076}>
                              Please use the in-app chat or email support@ultimatesportsbetting.com for assistance.
                            </span>
                          ),
                        },
                      ]}
                      variant="bordered"
                      allowMultiple={true}
                    />
                  </div>
                </React.Suspense>
              </div>
              <div className="space-y-6" key={501869}>
                <UserStats / key={388552}>
                <MLInsights / key={210267}>
                {/* Personalization overlay example */}
                <div className="mt-4" key={139982}>
                  {/* TODO: Personalization overlays from userPersonalizationService */}
                  {/* {userPersonalizationService.getOverlay()} */}
                </div>
              </div>
            </section>
          </React.Suspense>
        </div>
      </GlobalErrorBoundary>
    </>
  );
};

export default DashboardPage;