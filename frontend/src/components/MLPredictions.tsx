import React, { useState, useEffect  } from 'react.ts';
import { usePredictions } from '@/store/unified/UnifiedStoreManager.ts';
import { mlEngine } from '@/services/ml/UnifiedMLEngine.ts';
import type {
  PredictionInput,
  EnsemblePrediction,
} from '@/services/ml/UnifiedMLEngine.ts';

interface MLPredictionsProps {
  eventId?: string;
  sport?: string;
}

export const MLPredictions: React.FC<MLPredictionsProps key={745992}> = ({
  eventId,
  sport = "basketball_nba",
}) => {
  const { predictions, latestPredictions, updatePrediction } = usePredictions();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(eventId || "");

  const generatePrediction = async () => {
    if (!selectedEventId) return;

    setIsGenerating(true);
    try {
      const input: PredictionInput = {
        eventId: selectedEventId,
        sport,
        homeTeam: "Team A",
        awayTeam: "Team B",
        features: {
          elo_difference: 50,
          player_recent_form: 0.8,
          home_court_advantage: 2.5,
          rest_days: 1,
          injury_impact: 0.1,
        },
        market: "moneyline",
        timestamp: Date.now(),
      };

      updatePrediction(selectedEventId, {
        id: selectedEventId,
        confidence: prediction.confidence,
        predictedValue: prediction.finalPrediction,
        factors: prediction.factors,
        timestamp: Date.now(),
        metadata: {
          modelVersion: "ensemble_v1.0",
          features: input.features,
        },
      });
    } catch (error) {
      // console statement removed
    } finally {
      setIsGenerating(false);
    }
  };

  const formatConfidence = (confidence: number) => {
    return (confidence * 100).toFixed(1);
  };

  const formatPrediction = (value: number) => {
    return (value * 100).toFixed(1);
  };

  return (
    <div className="space-y-6" key={501869}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6" key={31178}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4" key={397418}>
          ML Predictions;
        </h2>

        {/* Generate New Prediction */}
        <div className="mb-6" key={677855}>
          <div className="flex space-x-4 mb-4" key={693799}>
            <input;
              type="text"
              placeholder="Enter Event ID"
              value={selectedEventId}
              onChange={(e) = key={580771}> setSelectedEventId(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button;
              onClick={generatePrediction}
              disabled={!selectedEventId || isGenerating}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
             key={689640}>
              {isGenerating ? "Generating..." : "Generate Prediction"}
            </button>
          </div>
        </div>

        {/* Current Prediction */}
        {selectedEventId && predictions[selectedEventId] && (
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6" key={496533}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3" key={181558}>
              Event: {selectedEventId}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-blue-600" key={634378}>
                  {formatPrediction(
                    predictions[selectedEventId].predictedValue,
                  )}
                  %
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300" key={158819}>
                  Win Probability;
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-green-600" key={702696}>
                  {formatConfidence(predictions[selectedEventId].confidence)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300" key={158819}>
                  Confidence;
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-purple-600" key={630773}>
                  {predictions[selectedEventId].factors.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300" key={158819}>
                  Key Factors;
                </div>
              </div>
            </div>

            {/* Key Factors */}
            {predictions[selectedEventId].factors.length > 0 && (
              <div className="mt-4" key={139982}>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2" key={157643}>
                  Key Factors;
                </h4>
                <div className="space-y-2" key={725977}>
                  {predictions[selectedEventId].factors;
                    .slice(0, 5)
                    .map((factor, index) => (
                      <div;
                        key={index}
                        className="flex items-center justify-between"
                       key={210997}>
                        <span className="text-sm text-gray-600 dark:text-gray-300" key={674635}>
                          {factor.name;
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </span>
                        <div className="flex items-center space-x-2" key={740830}>
                          <div;
                            className={`w-16 h-2 rounded-full ${
                              factor.direction === "positive"
                                ? "bg-green-200"
                                : "bg-red-200"
                            }`}
                           key={332680}>
                            <div;
                              className={`h-full rounded-full ${
                                factor.direction === "positive"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${Math.abs(factor.impact) * 100}%`,
                              }}
                            / key={17870}>
                          </div>
                          <span;
                            className={`text-sm font-medium ${
                              factor.direction === "positive"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                           key={635505}>
                            {factor.direction === "positive" ? "+" : "-"}
                            {(Math.abs(factor.impact) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Recent Predictions */}
        <div key={241917}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" key={122149}>
            Recent Predictions;
          </h3>
          {latestPredictions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8" key={756789}>
              No predictions yet. Generate your first prediction above.
            </p>
          ) : (
            <div className="space-y-3" key={186520}>
              {latestPredictions.slice(0, 10).map((prediction) => (
                <div;
                  key={prediction.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                 key={83739}>
                  <div className="flex-1" key={745195}>
                    <div className="font-medium text-gray-900 dark:text-white" key={501455}>
                      Event {prediction.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                      {new Date(prediction.timestamp).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right" key={144468}>
                    <div className="font-semibold text-blue-600" key={946676}>
                      {formatPrediction(prediction.predictedValue)}%
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                      {formatConfidence(prediction.confidence)}% confidence;
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MLPredictions;
