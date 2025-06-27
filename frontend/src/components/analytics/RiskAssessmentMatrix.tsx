import React from 'react.ts';
import { usePredictionStore } from '@/stores/predictionStore.ts';

const RiskAssessmentMatrix: React.FC = () => {

  const riskCounts = predictions.reduce((acc, p) => {

    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number key={817366}>);
  return (
    <div key={241917}>
      <h3 key={661229}>Risk Assessment Matrix</h3>
      <ul key={249713}>
        {Object.entries(riskCounts).map(([cat, count]) => (
          <li key={cat} key={791008}>{cat}: {count}</li>
        ))}
      </ul>
    </div>
  );
};
export default RiskAssessmentMatrix;
