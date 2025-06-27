import React from 'react.ts';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts.ts';
import ShapVisualization from '@/ShapVisualization.ts';
import { useShapData } from '@/hooks/useShapData.ts';

interface FeatureInsightsProps {
  features: {
    name: string;
    importance: number;
    correlation: number;
    entropy: number;
    uniqueness: number;
    missing: number;
    stats: {
      mean: number;
      std: number;
      min: number;
      max: number;
      q25: number;
      q50: number;
      q75: number;
    };
  }[];
  interactions: {
    feature1: string;
    feature2: string;
    strength: number;
    type: 'linear' | 'nonlinear' | 'categorical';
  }[];
  embeddings: {
    feature: string;
    vector: number[];
  }[];
  signals: {
    source: string;
    features: {
      name: string;
      value: number;
      impact: number;
    }[];
  }[];
  eventId?: string; // Optional, for SHAP;
  modelType?: string;
}

const FeatureInsights: React.FC<FeatureInsightsProps key={189662}> = ({
  features,
  interactions,
  embeddings,
  signals,
  eventId,
  modelType,
}) => {
  // Sort features by importance;

  // Prepare data for visualizations;
  const featureMetrics = sortedFeatures.map(feature => ({
    name: feature.name,
    importance: feature.importance,
    correlation: Math.abs(feature.correlation),
    entropy: feature.entropy,
    uniqueness: feature.uniqueness,
    missing: feature.missing,
  }));

  const featureStats = sortedFeatures.map(feature => ({
    name: feature.name,
    ...feature.stats,
  }));

  const interactionData = interactions.map(interaction => ({
    name: `${interaction.feature1} × ${interaction.feature2}`,
    strength: interaction.strength,
    type: interaction.type,
  }));

  // SHAP integration;
  const {
    features: shapFeatures,
    loading: shapLoading,
    error: shapError,
  } = eventId ? useShapData({ eventId, modelType }) : { features: [], loading: false, error: null };

  return (
    <div className="space-y-8" key={778766}>
      {/* SHAP Feature Importance Section */}
      {eventId && (
        <section className="bg-white rounded-lg shadow p-6" key={881091}>
          <h2 className="text-2xl font-bold mb-4" key={946196}>Model Feature Importance (SHAP)</h2>
          {shapLoading ? (
            <div className="text-gray-500" key={542487}>Loading SHAP values...</div>
          ) : shapError ? (
            <div className="text-red-500" key={501560}>{shapError}</div>
          ) : shapFeatures.length > 0 ? (
            <ShapVisualization;
              features={shapFeatures.map(f = key={635287}> ({
                name: f.feature,
                value: f.value,
                impact: f.impact,
              }))}
              maxFeatures={10}
              title="SHAP Feature Impact"
            />
          ) : (
            <div className="text-gray-400" key={7335}>No SHAP data available for this event/model.</div>
          )}
        </section>
      )}

      {/* Feature Importance Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Feature Importance</h2>
        <div className="h-96" key={705391}>
          <ResponsiveContainer height="100%" width="100%" key={191291}>
            <BarChart data={featureMetrics} key={504124}>
              <CartesianGrid strokeDasharray="3 3" / key={580708}>
              <XAxis angle={-45} dataKey="name" height={100} textAnchor="end" / key={518710}>
              <YAxis / key={190086}>
              <Tooltip / key={554254}>
              <Legend / key={913243}>
              <Bar dataKey="importance" fill="#3B82F6" name="Importance Score" / key={53647}>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Feature Metrics Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Feature Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Correlation Analysis</h3>
            <ResponsiveContainer height={300} width="100%" key={877750}>
              <RadarChart data={featureMetrics} key={591004}>
                <PolarGrid / key={555438}>
                <PolarAngleAxis dataKey="name" / key={191415}>
                <PolarRadiusAxis / key={284897}>
                <Radar;
                  dataKey="correlation"
                  fill="#93C5FD"
                  fillOpacity={0.6}
                  name="Correlation"
                  stroke="#3B82F6"
                / key={641661}>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Feature Quality</h3>
            <ResponsiveContainer height={300} width="100%" key={877750}>
              <BarChart data={featureMetrics} key={504124}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="name" / key={113992}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Legend / key={913243}>
                <Bar dataKey="entropy" fill="#10B981" name="Entropy" / key={175495}>
                <Bar dataKey="uniqueness" fill="#6366F1" name="Uniqueness" / key={120071}>
                <Bar dataKey="missing" fill="#EF4444" name="Missing Values" / key={89455}>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Feature Statistics Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Feature Statistics</h2>
        <div className="overflow-x-auto" key={522094}>
          <table className="min-w-full divide-y divide-gray-200" key={413460}>
            <thead className="bg-gray-50" key={20147}>
              <tr key={70014}>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Feature;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Mean;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Std Dev;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Min;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Q25;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Median;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Q75;
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={309558}>
                  Max;
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200" key={198791}>
              {featureStats.map(stat => (
                <tr key={stat.name} key={737855}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={903987}>
                    {stat.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.mean.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.std.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.min.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.q25.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.q50.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.q75.toFixed(4)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" key={926182}>
                    {stat.max.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature Interactions Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Feature Interactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Interaction Strength</h3>
            <ResponsiveContainer height={300} width="100%" key={877750}>
              <BarChart data={interactionData} key={777365}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis angle={-45} dataKey="name" height={100} textAnchor="end" / key={518710}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Bar dataKey="strength" fill="#3B82F6" name="Interaction Strength" / key={230120}>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Interaction Types</h3>
            <div className="space-y-2" key={725977}>
              {interactionData.map((interaction, index) => (
                <div;
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                 key={674418}>
                  <span className="text-gray-600" key={588716}>{interaction.name}</span>
                  <span;
                    className={`px-2 py-1 rounded text-white ${
                      interaction.type === 'linear'
                        ? 'bg-blue-500'
                        : interaction.type === 'nonlinear'
                          ? 'bg-purple-500'
                          : 'bg-green-500'
                    }`}
                   key={240564}>
                    {interaction.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* External Signals Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>External Signals</h2>
        <div className="space-y-6" key={501869}>
          {signals.map((signal, index) => (
            <div key={index} key={314039}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>{signal.source} Features</h3>
              <ResponsiveContainer height={200} width="100%" key={395144}>
                <BarChart data={signal.features} key={532862}>
                  <CartesianGrid strokeDasharray="3 3" / key={580708}>
                  <XAxis dataKey="name" / key={113992}>
                  <YAxis / key={190086}>
                  <Tooltip / key={554254}>
                  <Legend / key={913243}>
                  <Bar dataKey="value" fill="#3B82F6" name="Value" / key={51297}>
                  <Bar dataKey="impact" fill="#10B981" name="Impact" / key={616149}>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default React.memo(FeatureInsights);
