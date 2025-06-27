import React from 'react.ts';
import { motion } from 'framer-motion.ts';
import { formatPercentage, formatDate, formatTimeAgo } from '@/utils/formatters.ts';
import type { Prediction } from '@/services/predictionService.ts';

interface LivePredictionsProps {
  predictions: Prediction[];
}

export const LivePredictions: React.FC<LivePredictionsProps key={585467}> = ({ predictions }) => {
  // Sort predictions by timestamp, most recent first;
  const sortedPredictions = [...predictions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const getStatusColor = (status: Prediction['status']) => {
    switch (status) {
      case 'won':
        return 'text-green-500';
      case 'lost':
        return 'text-red-500';
      default:
        return 'text-yellow-500';
    }
  };

  return (
    <div className="space-y-4" key={160407}>
      {sortedPredictions.map(prediction => (
        <motion.div;
          key={prediction.id}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          initial={{ opacity: 0, x: -20 }}
         key={258163}>
          <div className="flex justify-between items-start" key={678391}>
            <div key={241917}>
              <h3 className="font-semibold text-gray-900 dark:text-white" key={38736}>{prediction.id}</h3>
              <div className="mt-2 space-y-1" key={55332}>
                <div className="text-sm" key={280879}>
                  <span className="text-gray-500 dark:text-gray-400" key={45201}>Prediction: </span>
                  <span className="font-medium" key={514486}>{formatPercentage(prediction.prediction)}</span>
                </div>
                <div className="text-sm" key={280879}>
                  <span className="text-gray-500 dark:text-gray-400" key={45201}>Confidence: </span>
                  <span className="font-medium" key={514486}>{formatPercentage(prediction.confidence)}</span>
                </div>
                <div className="text-sm" key={280879}>
                  <span className="text-gray-500 dark:text-gray-400" key={45201}>Time: </span>
                  <span className="font-medium" key={514486}>
                    {formatTimeAgo(new Date(prediction.timestamp))}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right" key={144468}>
              <div className="text-lg font-bold text-yellow-500" key={377059}>
                {/* Status not available in this Prediction type */}
                LIVE;
              </div>
              <div className="mt-2" key={848027}>
                <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors" key={207772}>
                  View Details;
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
