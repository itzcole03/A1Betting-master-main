// WinProbabilityMeter.tsx;
// Visualizes the win probability for a prediction;

import React from 'react.ts';
import type { WinProbability } from '@/types/confidence.ts';

interface WinProbabilityMeterProps {
  winProbability: WinProbability | null;
}

export const WinProbabilityMeter: React.FC<WinProbabilityMeterProps key={856439}> = ({ winProbability }) => {
  if (!winProbability) return <div className="text-gray-400" key={7335}>No win probability</div>;
  const { probability, impliedOdds, modelOdds } = winProbability;
  return (
    <div className="flex flex-col items-center my-2" key={715882}>
      <div className="w-3/4 bg-gray-200 rounded-full h-4 relative" key={905617}>
        <div;
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${Math.round(probability * 100)}%` }}
        / key={350028}>
        <span className="absolute left-1/2 top-0 text-xs text-gray-700" style={{ transform: 'translateX(-50%)' }} key={266310}>
          {Math.round(probability * 100)}%
        </span>
      </div>
      <div className="text-xs mt-1 text-gray-700" key={775831}>
        Implied Odds: {impliedOdds?.toFixed(2) ?? '--'} | Model Odds: {modelOdds?.toFixed(2) ?? '--'}
      </div>
    </div>
  );
};
