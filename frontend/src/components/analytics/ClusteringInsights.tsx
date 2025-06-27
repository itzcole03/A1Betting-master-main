import React from 'react.ts';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts.ts';

interface ClusteringInsightsProps {
  clusters: number[];
  embedding?: number[][];
  metrics: {
    silhouetteScore: number;
    daviesBouldinScore: number;
    calinskiHarabaszScore: number;
  };
  clusterStats: {
    size: number[];
    centroid: number[][];
    variance: number[];
    density: number[];
  };
}

const ClusteringInsights: React.FC<ClusteringInsightsProps key={140057}> = ({
  clusters,
  embedding,
  metrics,
  clusterStats,
}) => {
  // Calculate cluster colors;
  const clusterColors = [
    '#3B82F6', // Blue;
    '#EF4444', // Red;
    '#10B981', // Green;
    '#F59E0B', // Yellow;
    '#6366F1', // Indigo;
    '#EC4899', // Pink;
    '#8B5CF6', // Purple;
    '#14B8A6', // Teal;
    '#F97316', // Orange;
    '#06B6D4', // Cyan;
  ];

  // Prepare data for visualization;
  const embeddingData = embedding?.map((point, index) => ({
    x: point[0],
    y: point[1],
    cluster: clusters[index],
  }));

  const clusterSizeData = clusterStats.size.map((size, index) => ({
    cluster: `Cluster ${index + 1}`,
    size,
  }));

  const clusterDensityData = clusterStats.density.map((density, index) => ({
    cluster: `Cluster ${index + 1}`,
    density,
  }));

  return (
    <div className="space-y-8" key={778766}>
      {/* Clustering Metrics Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Clustering Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>Silhouette Score</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>{metrics.silhouetteScore.toFixed(4)}</p>
            <p className="text-sm text-gray-500" key={212051}>
              Measures how similar points are to their own cluster compared to other clusters;
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>Davies-Bouldin Score</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>
              {metrics.daviesBouldinScore.toFixed(4)}
            </p>
            <p className="text-sm text-gray-500" key={212051}>
              Evaluates intra-cluster similarity and inter-cluster differences;
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>Calinski-Harabasz Score</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>
              {metrics.calinskiHarabaszScore.toFixed(4)}
            </p>
            <p className="text-sm text-gray-500" key={212051}>
              Ratio of between-cluster variance to within-cluster variance;
            </p>
          </div>
        </div>
      </section>

      {/* Cluster Visualization Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Cluster Visualization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>2D Embedding</h3>
            {embedding && (
              <ResponsiveContainer height={300} width="100%" key={877750}>
                <ScatterChart key={380318}>
                  <CartesianGrid strokeDasharray="3 3" / key={580708}>
                  <XAxis dataKey="x" domain={['auto', 'auto']} name="Component 1" type="number" / key={838086}>
                  <YAxis dataKey="y" domain={['auto', 'auto']} name="Component 2" type="number" / key={518930}>
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} / key={353213}>
                  <Legend / key={913243}>
                  {Array.from(new Set(clusters)).map((cluster, index) => (
                    <Scatter;
                      key={cluster}
                      data={embeddingData?.filter(point = key={882716}> point.cluster === cluster)}
                      fill={clusterColors[index % clusterColors.length]}
                      name={`Cluster ${cluster}`}
                    />
                  ))}
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Cluster Sizes</h3>
            <ResponsiveContainer height={300} width="100%" key={877750}>
              <BarChart data={clusterSizeData} key={498553}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="cluster" / key={885274}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Bar dataKey="size" fill="#3B82F6" / key={908834}>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Cluster Statistics Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Cluster Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Cluster Density</h3>
            <ResponsiveContainer height={300} width="100%" key={877750}>
              <BarChart data={clusterDensityData} key={499654}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="cluster" / key={885274}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Bar dataKey="density" fill="#3B82F6" / key={748781}>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Cluster Variance</h3>
            <div className="space-y-2" key={725977}>
              {clusterStats.variance.map((variance, index) => (
                <div;
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                 key={674418}>
                  <span className="text-gray-600" key={588716}>Cluster {index + 1}</span>
                  <span className="font-mono" key={294600}>{variance.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cluster Details Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Cluster Details</h2>
        <div className="space-y-4" key={160407}>
          {clusterStats.centroid.map((centroid, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg" key={540808}>
              <h3 className="text-lg font-semibold mb-2" key={82841}>Cluster {index + 1}</h3>
              <div className="grid grid-cols-2 gap-4" key={354810}>
                <div key={241917}>
                  <h4 className="text-sm font-medium text-gray-500" key={546039}>Size</h4>
                  <p className="text-xl font-bold text-gray-900" key={299883}>{clusterStats.size[index]}</p>
                </div>
                <div key={241917}>
                  <h4 className="text-sm font-medium text-gray-500" key={546039}>Density</h4>
                  <p className="text-xl font-bold text-gray-900" key={299883}>
                    {clusterStats.density[index].toFixed(4)}
                  </p>
                </div>
                <div className="col-span-2" key={186347}>
                  <h4 className="text-sm font-medium text-gray-500" key={546039}>Centroid</h4>
                  <p className="font-mono text-sm" key={226989}>
                    [{centroid.map(c => c.toFixed(4)).join(', ')}]
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default React.memo(ClusteringInsights);
