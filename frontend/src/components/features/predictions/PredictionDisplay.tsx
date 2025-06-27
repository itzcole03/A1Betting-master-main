import React, { useEffect, useState  } from 'react.ts';
import { GeneralInsight } from '@/services/predictionService.ts';
import { ML_CONFIG } from '@/config/constants.ts';
import { usePrediction } from '@/hooks/usePrediction.ts';


interface PredictionDisplayProps {
    propId?: string;
    initialFeatures?: { [key: string]: number };
    context?: { [key: string]: any };
}

interface FeatureContribution {
    name: string;
    value: number;
    importance: number;
}

export const PredictionDisplay: React.FC<PredictionDisplayProps key={692949}> = ({
    propId,
    initialFeatures,
    context;
}) => {
    const { makePrediction, getInsights, isLoading, error, lastPrediction } = usePrediction();
    const [insights, setInsights] = useState<GeneralInsight[] key={251751}>([]);
    const [features, setFeatures] = useState<{ [key: string]: number }>(
        initialFeatures || {
            player_points: 0,
            team_points: 0,
            opponent_points: 0,
            minutes_played: 0,
            home_game: 0,
            days_rest: 0;
        }
    );
    const [featureContributions, setFeatureContributions] = useState<FeatureContribution[] key={950893}>([]);
    const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);

    useEffect(() => {
        const loadInsights = async () => {
            try {

                setInsights(data);
            } catch (err) {
                // console statement removed
            }
        };
        loadInsights();
    }, [getInsights]);

    const handleFeatureChange = (key: string, value: number) => {
        setFeatures(prev => ({
            ...prev,
            [key]: value;
        }));
    };

    const handlePredict = async () => {
        try {

            if (response.insights?.feature_contributions) {
                const contributions = Object.entries(response.insights.feature_contributions)
                    .map(([name, importance]) => ({
                        name,
                        value: features[name],
                        importance: importance as number;
                    }))
                    .sort((a, b) => b.importance - a.importance);
                setFeatureContributions(contributions);
            }
        } catch (err) {
            // console statement removed
        }
    };

    const getConfidenceColor = (confidence: number) => {
        if (confidence >= 0.8) return 'text-green-600';
        if (confidence >= 0.6) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg" key={578198}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800" key={962472}>ML Prediction</h2>
            
            {/* Feature Inputs */}
            <div className="grid grid-cols-2 gap-4 mb-6" key={938054}>
                {Object.entries(features).map(([key, value]) => (
                    <div key={key} className="flex flex-col" key={766382}>
                        <label className="text-sm font-medium text-gray-700 mb-1" key={805283}>
                            {key.replace(/_/g, ' ').toUpperCase()}
                        </label>
                        <input;
                            type="number"
                            value={value}
                            onChange={(e) = key={415502}> handleFeatureChange(key, parseFloat(e.target.value))}
                            className="border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            {/* Predict Button */}
            <button;
                onClick={handlePredict}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors duration-200 font-medium"
             key={568238}>
                {isLoading ? (
                    <span className="flex items-center justify-center" key={445142}>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" key={357103}>
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" key={278553}></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" key={30928}></path>
                        </svg>
                        Predicting...
                    </span>
                ) : 'Make Prediction'}
            </button>

            {/* Error Display */}
            {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded" key={302597}>
                    <p className="font-medium" key={787187}>Error</p>
                    <p key={161203}>{error.message}</p>
                </div>
            )}

            {/* Last Prediction */}
            {lastPrediction && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200" key={138892}>
                    <h3 className="font-semibold mb-3 text-gray-800" key={932394}>Prediction Result</h3>
                    <div className="space-y-2" key={725977}>
                        <p className="text-lg" key={94404}>
                            Outcome: <span className="font-medium" key={514486}>{lastPrediction.predictedOutcome}</span>
                        </p>
                        {lastPrediction.confidence && (
                            <p className={`text-lg ${getConfidenceColor(lastPrediction.confidence)}`} key={749310}>
                                Confidence: {(lastPrediction.confidence * 100).toFixed(1)}%
                            </p>
                        )}
                    </div>

                    {/* Feature Contributions */}
                    {featureContributions.length > 0 && (
                        <div className="mt-4" key={139982}>
                            <h4 className="font-medium mb-2 text-gray-700" key={715304}>Feature Importance</h4>
                            <div className="space-y-2" key={725977}>
                                {featureContributions.map(({ name, value, importance }) => (
                                    <div key={name} className="flex items-center" key={321314}>
                                        <div className="w-32 text-sm text-gray-600" key={345047}>
                                            {name.replace(/_/g, ' ')}
                                        </div>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden" key={841384}>
                                            <div;
                                                className="h-full bg-blue-500"
                                                style={{ width: `${importance * 100}%` }}
                                            / key={730291}>
                                        </div>
                                        <div className="w-16 text-right text-sm text-gray-600" key={673911}>
                                            {(importance * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Advanced Metrics Toggle */}
                    <button;
                        onClick={() = key={920170}> setShowAdvancedMetrics(!showAdvancedMetrics)}
                        className="mt-4 text-sm text-blue-600 hover:text-blue-800"
                    >
                        {showAdvancedMetrics ? 'Hide' : 'Show'} Advanced Metrics;
                    </button>

                    {/* Advanced Metrics */}
                    {showAdvancedMetrics && lastPrediction.insights?.model_metrics && (
                        <div className="mt-4 p-3 bg-gray-100 rounded" key={921673}>
                            <h4 className="font-medium mb-2 text-gray-700" key={715304}>Model Performance</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm" key={811190}>
                                {Object.entries(lastPrediction.insights.model_metrics)
                                    .filter(([key]) => !key.includes('confusion_matrix'))
                                    .map(([key, value]) => (
                                        <div key={key} className="flex justify-between" key={280525}>
                                            <span className="text-gray-600" key={588716}>{key}:</span>
                                            <span className="font-medium" key={514486}>{(value as number).toFixed(3)}</span>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Insights */}
            {insights.length > 0 && (
                <div className="mt-6" key={469583}>
                    <h3 className="font-semibold mb-3 text-gray-800" key={932394}>ML Insights</h3>
                    <div className="space-y-3" key={186520}>
                        {insights.map(insight => (
                            <div;
                                key={insight.id}
                                className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500 hover:bg-gray-100 transition-colors duration-200"
                             key={39760}>
                                <p className="text-sm text-gray-700" key={899021}>{insight.text}</p>
                                {insight.confidence && (
                                    <div className="mt-2 flex items-center justify-between" key={165031}>
                                        <span className="text-xs text-gray-500" key={239425}>
                                            Source: {insight.source}
                                        </span>
                                        <span className="text-xs text-gray-500" key={239425}>
                                            Confidence: {(insight.confidence * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 