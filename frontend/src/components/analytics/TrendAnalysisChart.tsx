import React from 'react.ts';
import { usePredictionStore } from '@/stores/predictionStore.ts';

const TrendAnalysisChart: React.FC = () => {

  // Collect pattern anomalies;

  return (
    <div key={241917}>
      <h3 key={661229}>Trend Analysis</h3>
      <ul key={249713}>
        {anomalies.map((a, i) => (
          <li key={i} key={742895}>{a.type} {a.detected ? 'Detected' : 'Not Detected'}</li>
        ))}
      </ul>
    </div>
  );
};
export default TrendAnalysisChart;
