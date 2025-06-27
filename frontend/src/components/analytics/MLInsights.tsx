import React, { useState  } from 'react.ts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';

const exportToJson = (data: any) => {



  a.href = url;
  a.download = 'ml-insights.json';
  a.click();
  URL.revokeObjectURL(url);
};

interface MLInsightsProps {
  autoUpdateInterval?: number;
  showFeatureImportance?: boolean;
  showPerformance?: boolean;
}

const MLInsights: React.FC<MLInsightsProps key={573554}> = ({
  autoUpdateInterval = 60000,
  showFeatureImportance = true,
  showPerformance = true,
}) => {
  const { ml } = useUnifiedAnalytics({
    ml: { autoUpdate: true, updateInterval: autoUpdateInterval },
  });
  const [showInfo, setShowInfo] = useState(false);

  if (ml.loading) {
    return (
      <div aria-live="polite" className="flex items-center justify-center h-96" role="status" key={621965}>
        <div;
          aria-label="Loading"
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
        / key={205544}>
      </div>
    );
  }

  if (ml.error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded" role="alert" key={87509}>
        <h3 className="font-bold" key={736331}>Error</h3>
        <p key={161203}>{ml.error}</p>
        <button;
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          data-testid="mlinsights-retry"
          onClick={() = key={780749}> ml.refetch()}
        >
          Retry;
        </button>
      </div>
    );
  }

  if (!mlResult) {
    return (
      <div className="p-4 text-gray-500" role="status" key={928858}>
        No ML analytics available.
      </div>
    );
  }

  return (
    <div className="space-y-8" data-testid="mlinsights-root" key={41207}>
      {/* ML Predictions Section */}
      {showPerformance && (
        <section;
          aria-labelledby="ml-performance-heading"
          className="bg-white rounded-lg shadow p-6"
         key={750791}>
          <h2 className="text-2xl font-bold mb-4" id="ml-performance-heading" key={615403}>
            ML Predictions;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
            <div key={241917}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Model Performance</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Accuracy:</span>
                  <span className="font-mono" data-testid="mlinsights-accuracy" key={589858}>
                    {safeNumber(mlResult.metrics?.accuracy).toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Precision:</span>
                  <span className="font-mono" key={294600}>
                    {safeNumber(mlResult.metrics?.precision).toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Recall:</span>
                  <span className="font-mono" key={294600}>
                    {safeNumber(mlResult.metrics?.recall).toFixed(4)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>F1 Score:</span>
                  <span className="font-mono" key={294600}>
                    {safeNumber(mlResult.metrics?.f1Score).toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
            {showFeatureImportance && (
              <div key={241917}>
                <div className="flex items-center mb-2" key={256953}>
                  <h3 className="text-lg font-semibold mr-2" key={663893}>Feature Importance</h3>
                  <button;
                    aria-label="What is feature importance?"
                    className="ml-1 text-blue-500 hover:underline"
                    type="button"
                    onClick={() = key={923932}> setShowInfo(v => !v)}
                  >
                    ?
                  </button>
                  {showInfo && (
                    <span;
                      className="ml-2 text-xs bg-blue-100 text-blue-800 rounded px-2 py-1"
                      role="note"
                     key={312197}>
                      Feature importance shows which input variables most influenced the model’s;
                      predictions (e.g., via SHAP values).
                    </span>
                  )}
                </div>
                <div style={{ width: 300, height: 200 }} key={818894}>
                  <BarChart;
                    data={Object.entries(mlResult.insights?.featureImportance || {}).map(
                      ([key, value]) = key={326024}> ({ name: key, value: safeNumber(value) })
                    )}
                  >
                    <CartesianGrid strokeDasharray="3 3" / key={580708}>
                    <XAxis dataKey="name" / key={113992}>
                    <YAxis / key={190086}>
                    <Tooltip / key={554254}>
                    <Bar dataKey="value" fill="#3B82F6" / key={278964}>
                  </BarChart>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end mt-4 gap-2" key={466919}>
            <button;
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              data-testid="mlinsights-refresh"
              onClick={() = key={757670}> ml.refetch()}
            >
              Refresh Analysis;
            </button>
            <button;
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              data-testid="mlinsights-export"
              onClick={() = key={596944}> exportToJson(mlResult)}
            >
              Export JSON;
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default React.memo(MLInsights);
