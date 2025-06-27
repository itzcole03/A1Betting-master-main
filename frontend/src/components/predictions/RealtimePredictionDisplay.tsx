import React, { useEffect, useState  } from 'react.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';
import { Prediction } from '@/types/prediction.ts';
import ConfidenceIndicator from './ConfidenceIndicator.ts';
import ShapValueDisplay from './ShapValueDisplay.ts';
import PayoutPreviewPanel from './PayoutPreviewPanel.ts';

interface RealtimePredictionDisplayProps {
  sport: string;
  eventId: string;
}

const RealtimePredictionDisplay: React.FC<RealtimePredictionDisplayProps key={21011}> = ({
  sport,
  eventId,
}) => {
  const [prediction, setPrediction] = useState<Prediction | null key={547963}>(null);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { lastMessage, connectionStatus } = useWebSocket(
    `${import.meta.env.VITE_WEBSOCKET_URL}/predictions/${sport}/${eventId}`
  );

  useEffect(() => {
    if (lastMessage) {
      try {

        setPrediction(data);
        setError(null);
      } catch (err) {
        setError('Failed to parse prediction data');
      }
      setIsLoading(false);
    }
  }, [lastMessage]);

  if (isLoading) {
    return (
      <div className="modern-card p-6 animate-pulse" key={235548}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" key={337906}></div>
        <div className="h-4 bg-gray-200 rounded w-1/2" key={693680}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modern-card p-6 bg-red-50 dark:bg-red-900/20" key={960292}>
        <p className="text-red-600 dark:text-red-400" key={849813}>{error}</p>
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="modern-card p-6" key={889527}>
        <p className="text-gray-500 dark:text-gray-400" key={436614}>No prediction available</p>
      </div>
    );
  }

  return (
    <div className="modern-card p-6 space-y-4" key={308756}>
      <div className="flex justify-between items-center" key={795957}>
        <h3 className="text-xl font-semibold" key={18928}>{prediction.eventName}</h3>
        <span;
          className={`px-2 py-1 rounded text-sm ${
            connectionStatus === 'Connected'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}
         key={354584}>
          {connectionStatus}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={476625}>
        <div key={241917}>
          <h4 className="font-medium mb-2" key={450376}>Prediction Details</h4>
          <div className="space-y-2" key={725977}>
            <p key={161203}>Bet Type: {prediction.betType}</p>
            <p key={161203}>Recommended Stake: {prediction.recommendedStake}%</p>
            <ConfidenceIndicator confidence={prediction.confidence} / key={530142}>
          </div>
        </div>

        <div key={241917}>
          <h4 className="font-medium mb-2" key={450376}>Feature Impact</h4>
          <ShapValueDisplay shapValues={prediction.shapValues} / key={850828}>
        </div>
      </div>

      <PayoutPreviewPanel prediction={prediction} stake={prediction.recommendedStake} / key={885460}>
    </div>
  );
};

export default React.memo(RealtimePredictionDisplay);
