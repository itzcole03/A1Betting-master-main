import React from 'react.ts';
import { useState, useEffect } from 'react.ts';

interface EnhancedPrediction {
  id: string;
  sport: string;
  type: string;
  game: string;
  prediction: string;
  confidence: number;
  odds: number;
  valueGrade: string;
  risk: number;
  expectedValue: number;
  timestamp: Date;
}

interface RealTimePredictionsProps {
  predictions?: EnhancedPrediction[];
  loading?: boolean;
}

export function RealTimePredictions({
  predictions: propPredictions,
  loading: propLoading,
}: RealTimePredictionsProps = {}) {
  // State declarations first;
  const [predictions, setPredictions] = useState<EnhancedPrediction[] key={424258}>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Mock data setup;
  useEffect(() => {
    if (!propPredictions) {
      setLoading(true);
      // Simulate loading and then set mock data;
      setTimeout(() => {
        setPredictions([
          {
            id: "1",
            sport: "NBA",
            type: "game",
            game: "Lakers vs Warriors",
            prediction: "Over 235.5 Points",
            confidence: 89,
            odds: 1.85,
            valueGrade: "A",
            risk: 0.15,
            expectedValue: 12.3,
            timestamp: new Date(),
          },
          {
            id: "2",
            sport: "NBA",
            type: "player_prop",
            game: "Celtics vs Heat",
            prediction: "LeBron Over 28.5 Points",
            confidence: 84,
            odds: 1.92,
            valueGrade: "B+",
            risk: 0.22,
            expectedValue: 8.7,
            timestamp: new Date(),
          },
          {
            id: "3",
            sport: "NFL",
            type: "game",
            game: "Chiefs vs Bills",
            prediction: "Chiefs -3.5",
            confidence: 91,
            odds: 1.95,
            valueGrade: "A+",
            risk: 0.12,
            expectedValue: 15.8,
            timestamp: new Date(),
          },
        ]);
        setLoading(false);
      }, 1000);
    } else {
      setPredictions(propPredictions || []);
      setLoading(propLoading || false);
    }
  }, [propPredictions, propLoading]);

  // Safe filtering with proper checks;

  const filteredPredictions = safePredictions.filter((pred) => {
    if (!pred) return false; // Additional safety check;


    return sportMatch && typeMatch;
  });

  const getValueGradeColor = (grade: string) => {
    const colors = {
      "A+": "text-green-600 bg-green-100 dark:bg-green-900/30",
      A: "text-green-500 bg-green-50 dark:bg-green-900/20",
      "B+": "text-blue-600 bg-blue-100 dark:bg-blue-900/30",
      B: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
      "C+": "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30",
      C: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
      D: "text-red-600 bg-red-100 dark:bg-red-900/30",
    };
    return colors[grade as keyof typeof colors] || colors["C"];
  };

  const getRiskColor = (risk: number) => {
    if (risk < 0.2) return "text-green-600";
    if (risk < 0.4) return "text-yellow-600";
    return "text-red-600";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 85) return "text-green-600";
    if (confidence >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(timestamp);
  };

  if (loading) {
    return (
      <div className="space-y-4" key={160407}>
        <div className="flex items-center justify-between" key={96335}>
          <h2 className="text-xl font-bold" key={540247}>Real-Time Predictions</h2>
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" key={685875}></div>
        </div>
        <div className="space-y-3" key={186520}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse" key={317458}>
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" key={361400}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" key={160407}>
      <div className="flex items-center justify-between" key={96335}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white" key={186467}>
          Real-Time Predictions;
        </h2>
        <div className="flex items-center space-x-2" key={740830}>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" key={866883}></div>
          <span className="text-sm text-green-600 dark:text-green-400" key={780175}>
            Live;
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-4" key={470893}>
        <select;
          value={selectedSport}
          onChange={(e) = key={247838}> setSelectedSport(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="All" key={343575}>All Sports</option>
          <option value="NBA" key={172467}>NBA</option>
          <option value="NFL" key={613230}>NFL</option>
          <option value="MLB" key={328030}>MLB</option>
          <option value="NHL" key={500575}>NHL</option>
        </select>

        <select;
          value={selectedType}
          onChange={(e) = key={524962}> setSelectedType(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {types.map((type) => (
            <option key={type} value={type} key={168558}>
              {type === "All"
                ? "All Types"
                : type.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Predictions List */}
      <div className="space-y-3" key={186520}>
        {filteredPredictions.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400" key={263433}>
            No predictions available for the selected filters.
          </div>
        ) : (
          filteredPredictions.map((prediction) => (
            <div;
              key={prediction.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
             key={261524}>
              <div className="flex items-start justify-between" key={653478}>
                <div className="flex-1" key={745195}>
                  <div className="flex items-center space-x-3 mb-2" key={351479}>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded" key={418439}>
                      {prediction.sport}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400" key={10584}>
                      {prediction.game}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2" key={6978}>
                    {prediction.prediction}
                  </h3>

                  <div className="flex items-center space-x-4 text-sm" key={828276}>
                    <div className="flex items-center space-x-1" key={468268}>
                      <span className="text-gray-600 dark:text-gray-400" key={517223}>
                        Confidence:
                      </span>
                      <span;
                        className={`font-semibold ${getConfidenceColor(prediction.confidence)}`}
                       key={103840}>
                        {prediction.confidence}%
                      </span>
                    </div>

                    <div className="flex items-center space-x-1" key={468268}>
                      <span className="text-gray-600 dark:text-gray-400" key={517223}>
                        Odds:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white" key={733225}>
                        {prediction.odds}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1" key={468268}>
                      <span className="text-gray-600 dark:text-gray-400" key={517223}>
                        Risk:
                      </span>
                      <span;
                        className={`font-semibold ${getRiskColor(prediction.risk)}`}
                       key={52211}>
                        {(prediction.risk * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right" key={144468}>
                  <div;
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getValueGradeColor(prediction.valueGrade)}`}
                   key={858352}>
                    {prediction.valueGrade}
                  </div>
                  <div className="mt-2 text-lg font-bold text-green-600 dark:text-green-400" key={298235}>
                    +{prediction.expectedValue.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
                    {formatTimestamp(prediction.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
