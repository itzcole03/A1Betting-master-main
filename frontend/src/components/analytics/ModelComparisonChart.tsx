import React from 'react.ts';
import { usePredictionStore } from '@/stores/predictionStore.ts';

const ModelComparisonChart: React.FC = () => {

  // Group by modelId;
  const byModel = predictions.reduce((acc, p) => {

    if (!acc[model]) acc[model] = [];
    acc[model].push(p);
    return acc;
  }, {} as Record<string, any[] key={536834}>);
  return (
    <div key={241917}>
      <h3 key={661229}>Model Comparison</h3>
      <ul key={249713}>
        {Object.entries(byModel).map(([model, preds]) => (
          <li key={model} key={673611}>{model}: {preds.length} predictions</li>
        ))}
      </ul>
    </div>
  );
};
export default ModelComparisonChart;
