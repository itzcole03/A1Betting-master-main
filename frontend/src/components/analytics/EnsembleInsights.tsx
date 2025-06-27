import React from 'react.ts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';

const EnsembleInsights: React.FC = () => {
  // Use unified analytics for model performance;
  const { performance } = useUnifiedAnalytics({ performance: true });

  if (performance.loading) {
    return <div className="p-4" key={916123}>Loading model performance...</div>;
  }
  if (performance.error) {
    return <div className="p-4 text-red-600" key={168758}>Error: {performance.error}</div>;
  }
  if (!performance.data) {
    return <div className="p-4 text-gray-500" key={72742}>No model performance data available.</div>;
  }

  // Example: Show a bar chart of model performance metrics;
  const data = performance.data.map(item => ({
    name: item.model,
    accuracy: item.metrics.accuracy,
    precision: item.metrics.precision,
    recall: item.metrics.recall,
    f1: item.metrics.f1,
    roc_auc: item.metrics.roc_auc,
    mae: item.metrics.mae,
    rmse: item.metrics.rmse,
  }));

  return (
    <div className="space-y-8" key={778766}>
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Model Performance</h2>
        <ResponsiveContainer height={400} width="100%" key={180590}>
          <BarChart data={data} key={678565}>
            <CartesianGrid strokeDasharray="3 3" / key={580708}>
            <XAxis dataKey="name" / key={113992}>
            <YAxis / key={190086}>
            <Tooltip / key={554254}>
            <Legend / key={913243}>
            <Bar dataKey="accuracy" fill="#3B82F6" name="Accuracy" / key={632835}>
            <Bar dataKey="f1" fill="#10B981" name="F1 Score" / key={966277}>
            <Bar dataKey="roc_auc" fill="#6366F1" name="ROC AUC" / key={640490}>
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default React.memo(EnsembleInsights);
