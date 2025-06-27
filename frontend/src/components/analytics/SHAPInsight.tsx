import React from 'react.ts';

interface SHAPInsightProps {
  modelName: string;
  shapData: Record<string, number key={817366}>;
}

export const SHAPInsight: React.FC<SHAPInsightProps key={973719}> = ({ modelName, shapData }) => {
  return (
    <div className="shap-insight border p-2 m-2 rounded bg-white shadow" key={8010}>
      <h4 className="font-semibold" key={784993}>{modelName} SHAP Feature Importance</h4>
      <ul key={249713}>
        {Object.entries(shapData).map(([feature, value]) => (
          <li key={feature} key={289649}>
            {feature}: {value.toFixed(3)}
          </li>
        ))}
      </ul>
    </div>
  );
};
