import { useMemo } from 'react.ts';
import { usePredictions } from '@/hooks/usePredictions.ts';

// Type definition;
interface Player {
  id: string;
  name: string;
  position: string;
  team: string;
  salary: number;
  confidence: number;
  projectedPoints?: number;
}

interface PayoutPreviewProps {
  selectedPlayers: Player[];
  entryFee: number;
  className?: string;
}

export function PayoutPreview({
  selectedPlayers,
  entryFee,
  className = "",
}: PayoutPreviewProps) {
  const { getPlayerPrediction } = usePredictions();

  const projectedStats = useMemo(() => {
    const totalProjectedPoints = selectedPlayers.reduce((sum, player) => {

      return sum + (prediction?.projectedPoints || 0);
    }, 0);

    const averageConfidence =
      selectedPlayers.reduce((sum, player) => {
        return sum + player.confidence;
      }, 0) / selectedPlayers.length;

    return {
      totalProjectedPoints,
      averageConfidence,
    };
  }, [selectedPlayers, getPlayerPrediction]);

  const payoutEstimates = useMemo(() => {
    const { totalProjectedPoints, averageConfidence } = projectedStats;

    // These are example payout calculations - adjust based on actual contest rules;
    const estimatedRank =
      totalProjectedPoints > 150 ? 1 : totalProjectedPoints > 130 ? 10 : 100;

    const confidenceBonus =
      averageConfidence > 0.8 ? 1.2 : averageConfidence > 0.6 ? 1.1 : 1;

    return {
      estimatedRank,
      potentialWinnings: Math.round(potentialWinnings * 100) / 100,
      roi: ((potentialWinnings - entryFee) / entryFee) * 100,
    };
  }, [projectedStats, entryFee]);

  const getRankColor = (rank: number) => {
    if (rank <= 10) return "text-success-500";
    if (rank <= 50) return "text-primary-500";
    if (rank <= 100) return "text-yellow-500";
    return "text-red-500";
  };

  const getROIColor = (roi: number) => {
    if (roi >= 100) return "text-success-500";
    if (roi >= 50) return "text-primary-500";
    if (roi >= 0) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div;
      className={`rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800 ${className}`}
     key={12310}>
      <h3 className="mb-4 text-lg font-semibold" key={94916}>Payout Preview</h3>

      <div className="space-y-4" key={160407}>
        <div key={241917}>
          <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>
            Projected Points;
          </div>
          <div className="text-2xl font-bold text-primary-500" key={475327}>
            {projectedStats.totalProjectedPoints.toFixed(1)}
          </div>
        </div>

        <div key={241917}>
          <div className="text-sm text-gray-600 dark:text-gray-400" key={885780}>
            Average Confidence;
          </div>
          <div className="text-2xl font-bold text-primary-500" key={475327}>
            {(projectedStats.averageConfidence * 100).toFixed(1)}%
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 dark:border-gray-700" key={10177}>
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400" key={176067}>
            Estimated Rank;
          </div>
          <div;
            className={`text-2xl font-bold ${getRankColor(payoutEstimates.estimatedRank)}`}
           key={793039}>
            #{payoutEstimates.estimatedRank}
          </div>
        </div>

        <div key={241917}>
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400" key={176067}>
            Potential Winnings;
          </div>
          <div className="text-2xl font-bold text-success-500" key={477526}>
            ${payoutEstimates.potentialWinnings.toLocaleString()}
          </div>
          <div;
            className={`text-sm font-medium ${getROIColor(payoutEstimates.roi)}`}
           key={958216}>
            ROI: {payoutEstimates.roi.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500 dark:text-gray-400" key={646405}>
        * Estimates based on historical contest data and current lineup;
        projections;
      </div>
    </div>
  );
}
