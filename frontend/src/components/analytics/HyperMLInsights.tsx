import React from 'react.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';

const exportToJson = (data: any) => {



  a.href = url;
  a.download = 'hyperml-insights.json';
  a.click();
  URL.revokeObjectURL(url);
};

interface HyperMLInsightsProps {
  autoUpdateInterval?: number;
  showMarketAnalysis?: boolean;
  showRiskMetrics?: boolean;
  showInefficiencies?: boolean;
  showHedging?: boolean;
  showRecommendation?: boolean;
}

const HyperMLInsights: React.FC<HyperMLInsightsProps key={889266}> = ({
  autoUpdateInterval = 60000,
  showMarketAnalysis = true,
  showRiskMetrics = true,
  showInefficiencies = true,
  showHedging = true,
  showRecommendation = true,
}) => {
  const { ml, betting } = useUnifiedAnalytics({
    ml: { autoUpdate: true, updateInterval: autoUpdateInterval },
    betting: true,
  });

  if (ml.loading || betting.loading) {
    return (
      <div aria-live="polite" className="flex items-center justify-center h-96" role="status" key={621965}>
        <div;
          aria-label="Loading"
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
        / key={205544}>
      </div>
    );
  }

  if (ml.error || betting.error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert" key={87509}>
        <h3 className="font-bold" key={736331}>Error</h3>
        <p key={161203}>{ml.error || betting.error}</p>
        <button;
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() = key={602268}> {
            ml.refetch();
            betting.refetch();
          }}
        >
          Retry;
        </button>
      </div>
    );
  }


  if (!mlResult) {
    return (
      <div className="p-4 text-gray-500" role="status" key={928858}>
        No HyperML analytics available.
      </div>
    );
  }

  // BettingAnalytics type: { roi, winRate, profitLoss, riskMetrics: { var, sharpe, sortino }, confidence }
  // Remove kelly, use only available fields;

  return (
    <div className="space-y-8" data-testid="hypermlinsights-root" key={987803}>
      {/* Deep Market Analysis */}
      {showMarketAnalysis && (
        <section;
          aria-labelledby="hyperml-market-heading"
          className="bg-white rounded-lg shadow p-6"
         key={666864}>
          <h2 className="text-2xl font-bold mb-4" id="hyperml-market-heading" key={845442}>
            Deep Market Analysis;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Market VaR</h3>
              <div className="font-mono text-2xl" key={585595}>
                ${safeNumber(bettingResult?.riskMetrics?.var).toFixed(2)}
              </div>
            </div>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Sharpe Ratio</h3>
              <div className="font-mono text-2xl" key={585595}>
                {safeNumber(bettingResult?.riskMetrics?.sharpe).toFixed(2)}
              </div>
            </div>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Win Rate</h3>
              <div className="font-mono text-2xl" key={585595}>
                {safeNumber(bettingResult?.winRate).toFixed(2)}%
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Risk Metrics */}
      {showRiskMetrics && (
        <section aria-labelledby="hyperml-risk-heading" className="bg-white rounded-lg shadow p-6" key={704783}>
          <h2 className="text-2xl font-bold mb-4" id="hyperml-risk-heading" key={47070}>
            Advanced Risk Analysis;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Sortino Ratio</h3>
              <div className="font-mono text-2xl" key={585595}>
                {safeNumber(bettingResult?.riskMetrics?.sortino).toFixed(2)}
              </div>
            </div>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Profit/Loss</h3>
              <div className="font-mono text-2xl" key={585595}>
                ${safeNumber(bettingResult?.profitLoss).toFixed(2)}
              </div>
            </div>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>ROI</h3>
              <div className="font-mono text-2xl" key={585595}>{safeNumber(bettingResult?.roi).toFixed(2)}%</div>
            </div>
          </div>
        </section>
      )}
      {/* Market Inefficiencies */}
      {showInefficiencies && (
        <section;
          aria-labelledby="hyperml-inefficiencies-heading"
          className="bg-white rounded-lg shadow p-6"
         key={500946}>
          <h2 className="text-2xl font-bold mb-4" id="hyperml-inefficiencies-heading" key={587193}>
            Market Inefficiencies;
          </h2>
          <div className="text-gray-500" key={542487}>
            (Unified analytics: see feature importance and model insights for inefficiency signals.)
          </div>
        </section>
      )}
      {/* Hedging Strategies */}
      {showHedging && (
        <section;
          aria-labelledby="hyperml-hedging-heading"
          className="bg-white rounded-lg shadow p-6"
         key={384352}>
          <h2 className="text-2xl font-bold mb-4" id="hyperml-hedging-heading" key={649572}>
            Hedging Opportunities;
          </h2>
          <div className="text-gray-500" key={542487}>
            (Unified analytics: hedging strategies available in advanced betting modules.)
          </div>
        </section>
      )}
      {/* Final Recommendation */}
      {showRecommendation && (
        <section;
          aria-labelledby="hyperml-recommendation-heading"
          className="bg-white rounded-lg shadow p-6"
         key={753291}>
          <h2 className="text-2xl font-bold mb-4" id="hyperml-recommendation-heading" key={219619}>
            AI Recommendation;
          </h2>
          <div className="flex items-center gap-4" key={782146}>
            <span className="font-bold text-lg" key={5423}>
              {safeNumber(bettingResult?.confidence) > 0.7 ? 'Place Bet' : 'Hold'}
            </span>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800" key={26112}>
              {(safeNumber(bettingResult?.confidence) * 100).toFixed(1)}% Confidence;
            </span>
          </div>
          <div className="flex justify-end mt-4 gap-2" key={466919}>
            <button;
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() = key={299616}> {
                ml.refetch();
                betting.refetch();
              }}
            >
              Refresh Analysis;
            </button>
            <button;
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              onClick={() = key={833748}> exportToJson({ mlResult, bettingResult })}
            >
              Export JSON;
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(HyperMLInsights);
