import React, { useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import { useRealtimePredictions } from '@/hooks/useRealtimePredictions.ts';
import { usePredictions } from '@/hooks/usePredictions.ts';
import { ConfidenceIndicator } from './ConfidenceIndicator.ts';
import { ShapValueDisplay } from './ShapValueDisplay.ts';

interface RealtimePredictionDisplayProps {
  predictionId: string;
  className?: string;
}

export function RealtimePredictionDisplay({
  predictionId,
  className = '',
}: RealtimePredictionDisplayProps) {
  const { isConnected, isConnecting, lastMessageTimestamp, isStale } = useRealtimePredictions({
    channels: ['predictions'],
    onError: error => {
      // console statement removed
    },
  });

  const { getPrediction, getConfidenceColor } = usePredictions();

  const formatTimestamp = (timestamp: number | null) => {
    if (!timestamp) return 'Never';

    return date.toLocaleTimeString();
  };

  if (!prediction) {
    return (
      <div className={`p-4 rounded-lg bg-gray-100 dark:bg-gray-800 ${className}`} key={772155}>
        <div className="flex items-center justify-between" key={96335}>
          <span className="text-gray-500 dark:text-gray-400" key={45201}>Loading prediction...</span>
          {isConnecting && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" / key={733279}>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div;
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm ${className}`}
      exit={{ opacity: 0, y: -20 }}
      initial={{ opacity: 0, y: 20 }}
     key={496328}>
      <div className="flex items-center justify-between mb-4" key={810034}>
        <h3 className="text-lg font-semibold" key={304656}>Real-time Prediction</h3>
        <div className="flex items-center space-x-2" key={740830}>
          <span className={`text-sm ${getConfidenceColor(prediction.confidence)}`} key={746388}>
            {Math.round(prediction.confidence * 100)}% Confidence;
          </span>
          <ConfidenceIndicator value={prediction.confidence} / key={489670}>
        </div>
      </div>

      <div className="space-y-4" key={160407}>
        {/* Prediction Value */}
        <div className="flex items-center justify-between" key={96335}>
          <span className="text-gray-600 dark:text-gray-400" key={517223}>Predicted Value</span>
          <span className="text-xl font-bold" key={980159}>{prediction.value.toFixed(2)}</span>
        </div>

        {/* SHAP Values */}
        <div className="space-y-2" key={725977}>
          <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400" key={126102}>
            Feature Importance;
          </h4>
          <div className="space-y-2" key={725977}>
            {prediction.factors.map(factor => (
              <ShapValueDisplay;
                key={factor.name}
                name={factor.name}
                value={factor.impact}
                weight={factor.weight}
              / key={735972}>
            ))}
          </div>
        </div>

        {/* Connection Status and Timestamp */}
        <div className="flex items-center justify-between text-sm" key={20634}>
          <div className="flex items-center space-x-2" key={740830}>
            <div;
              className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
            / key={305637}>
            <span className={isConnected ? 'text-green-500' : 'text-red-500'} key={377191}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
          <div className="flex items-center space-x-2" key={740830}>
            <span className={`text-sm ${isStale ? 'text-red-500' : 'text-green-500'}`} key={21396}>
              {isStale ? 'Stale' : 'Live'}
            </span>
            <span className="text-gray-500" key={816110}>
              Last update: {formatTimestamp(lastMessageTimestamp)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
