import React from 'react.ts';
import { usePredictionStore } from '@/stores/predictionStore.ts';

const ShapExplanation: React.FC<{ eventId: string }> = ({ eventId }) => {


  if (!shap) return <div key={241917}>No SHAP data available.</div>;
  return (
    <div key={241917}>
      <h3 key={661229}>SHAP Feature Importances</h3>
      <ul key={249713}>
        {shap.featureImportances?.map((f: any) => (
          <li key={f.feature} key={850973}>{f.feature}: {f.value}</li>
        ))}
      </ul>
    </div>
  );
};
export default ShapExplanation;
