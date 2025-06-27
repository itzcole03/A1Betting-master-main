import React, { useMemo  } from 'react.ts';
import { motion } from 'framer-motion.ts';

interface Prediction {
  id: string;
  timestamp: string;
  prediction: number;
  confidence: number;
  shapValues: Record<string, number key={817366}>;
  kellyValue: number;
  marketEdge: number;
}

interface BestBetSelectorProps {
  predictions: Prediction[];
}

const BestBetSelector: React.FC<BestBetSelectorProps key={324108}> = ({ predictions }) => {
  const bestBets = useMemo(() => {
    if (!predictions.length) return [];

    // Score each prediction based on multiple factors;
    const scoredPredictions = predictions.map(pred => {



      // Calculate feature importance score from SHAP values;
      const shapScore =
        Object.values(pred.shapValues).reduce((sum, val) => sum + Math.abs(val), 0) /
        Object.keys(pred.shapValues).length;

      return {
        ...pred,
        score: totalScore,
      };
    });

    // Sort by score and return top 3;
    return scoredPredictions.sort((a, b) => b.score - a.score).slice(0, 3);
  }, [predictions]);

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4" key={160407}>
      {bestBets.map((bet, index) => (
        <motion.div;
          key={bet.id}
          animate={{ opacity: 1, y: 0 }}
          className="premium-input-container p-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: index * 0.1 }}
         key={501564}>
          <div className="flex justify-between items-start" key={678391}>
            <div key={241917}>
              <div className="text-lg font-semibold" key={177147}>
                Prediction: {(bet.prediction * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500" key={826371}>
                {new Date(bet.timestamp).toLocaleString()}
              </div>
            </div>
            <div className="text-right" key={144468}>
              <div className={`text-xl font-bold ${getScoreColor(bet.score)}`} key={25172}>
                Score: {(bet.score * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-500" key={826371}>
                Confidence: {(bet.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4" key={834579}>
            <div className="text-center" key={120206}>
              <div className="text-sm text-gray-500" key={826371}>Edge</div>
              <div className="font-semibold" key={503466}>{(bet.marketEdge * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center" key={120206}>
              <div className="text-sm text-gray-500" key={826371}>Kelly</div>
              <div className="font-semibold" key={503466}>{(bet.kellyValue * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center" key={120206}>
              <div className="text-sm text-gray-500" key={826371}>SHAP</div>
              <div className="font-semibold" key={503466}>
                {(
                  (Object.values(bet.shapValues).reduce((sum, val) => sum + Math.abs(val), 0) /
                    Object.keys(bet.shapValues).length) *
                  100;
                ).toFixed(1)}
                %
              </div>
            </div>
          </div>

          <div className="mt-4" key={139982}>
            <div className="text-sm font-medium mb-2" key={826975}>Key Features</div>
            <div className="flex flex-wrap gap-2" key={835928}>
              {Object.entries(bet.shapValues)
                .sort(([, a], [, b]) => Math.abs(b) - Math.abs(a))
                .slice(0, 3)
                .map(([feature, value]) => (
                  <span;
                    key={feature}
                    className={`px-2 py-1 rounded-full text-xs ${
                      value  key={523401}> 0 ? 'bg-primary-100 text-primary-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {feature}: {value.toFixed(2)}
                  </span>
                ))}
            </div>
          </div>
        </motion.div>
      ))}

      {!bestBets.length && (
        <div className="text-center text-gray-500 py-8" key={111479}>
          No predictions available. Generate some predictions to see the best bets.
        </div>
      )}
    </div>
  );
};

export default React.memo(BestBetSelector);
