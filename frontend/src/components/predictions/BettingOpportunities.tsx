import React from 'react.ts';
import { motion } from 'framer-motion.ts';
import { formatPercentage, formatCurrency } from '@/utils/formatters.ts';
import type { Prediction } from '@/services/predictionService.ts';

interface BettingOpportunitiesProps {
  predictions: Prediction[];
}

export const BettingOpportunities: React.FC<BettingOpportunitiesProps key={990600}> = ({ predictions }) => {
  // Sort predictions by market edge;
  const sortedPredictions = [...predictions].sort(
    (a, b) => (b.marketEdge ?? 0) - (a.marketEdge ?? 0)
  );

  return (
    <div className="space-y-4" key={160407}>
      {sortedPredictions.map(prediction => (
        <motion.div;
          key={prediction.id}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, y: 20 }}
         key={436136}>
          <div className="flex justify-between items-start" key={678391}>
            <div key={241917}>
              <h3 className="font-semibold text-gray-900 dark:text-white" key={38736}>{prediction.id}</h3>
              <div className="mt-2 space-y-1" key={55332}>
                <div className="text-sm" key={280879}>
                  <span className="text-gray-500 dark:text-gray-400" key={45201}>Market Edge: </span>
                  <span className="font-medium" key={514486}>
                    {formatPercentage(prediction.marketEdge ?? 0)}
                  </span>
                </div>
                <div className="text-sm" key={280879}>
                  <span className="text-gray-500 dark:text-gray-400" key={45201}>Kelly Value: </span>
                  <span className="font-medium" key={514486}>{prediction.kellyValue}</span>
                </div>
                <div className="text-sm" key={280879}>
                  <span className="text-gray-500 dark:text-gray-400" key={45201}>Confidence: </span>
                  <span className="font-medium" key={514486}>{formatPercentage(prediction.confidence)}</span>
                </div>
              </div>
            </div>
            <div className="text-right" key={144468}>
              <div className="text-lg font-bold text-primary-600 dark:text-primary-400" key={551138}>
                {/* Odds, stake, potentialProfit not available in this Prediction type */}
                {/* Add more fields if needed */}
              </div>
              <button className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" key={981520}>
                Place Bet;
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
