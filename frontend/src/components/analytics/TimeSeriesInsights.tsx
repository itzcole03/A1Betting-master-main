import React from 'react.ts';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts.ts';

interface TimeSeriesInsightsProps {
  forecast: number[];
  confidence: {
    lower: number[];
    upper: number[];
  };
  metrics: {
    mse: number;
    mae: number;
    mape: number;
    r2: number;
  };
  seasonality: {
    trend: number[];
    seasonal: number[];
    residual: number[];
  };
  changePoints: {
    index: number;
    value: number;
    type: 'trend' | 'level' | 'volatility';
  }[];
  anomalies: {
    index: number;
    value: number;
    score: number;
  }[];
}

const TimeSeriesInsights: React.FC<TimeSeriesInsightsProps key={884783}> = ({
  forecast,
  confidence,
  metrics,
  seasonality,
  changePoints,
  anomalies,
}) => {
  // Prepare data for visualization;
  const forecastData = forecast.map((value, index) => ({
    x: index,
    value,
    lower: confidence.lower[index],
    upper: confidence.upper[index],
  }));

  const seasonalityData = seasonality.trend.map((trend, index) => ({
    x: index,
    trend,
    seasonal: seasonality.seasonal[index],
    residual: seasonality.residual[index],
  }));

  const anomalyData = anomalies.map(anomaly => ({
    x: anomaly.index,
    value: anomaly.value,
    score: anomaly.score,
  }));

  return (
    <div className="space-y-8" key={778766}>
      {/* Time Series Metrics Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Time Series Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={815557}>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>Mean Squared Error</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>{metrics.mse.toFixed(4)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>Mean Absolute Error</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>{metrics.mae.toFixed(4)}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>Mean Absolute Percentage Error</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>{metrics.mape.toFixed(2)}%</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
            <h3 className="text-sm font-medium text-gray-500" key={48312}>R-squared</h3>
            <p className="text-2xl font-bold text-gray-900" key={842057}>{metrics.r2.toFixed(4)}</p>
          </div>
        </div>
      </section>

      {/* Forecast Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Forecast</h2>
        <div className="h-96" key={705391}>
          <ResponsiveContainer height="100%" width="100%" key={191291}>
            <LineChart data={forecastData} key={144978}>
              <CartesianGrid strokeDasharray="3 3" / key={580708}>
              <XAxis dataKey="x" / key={944391}>
              <YAxis / key={190086}>
              <Tooltip / key={554254}>
              <Legend / key={913243}>
              <Line;
                dataKey="value"
                dot={false}
                name="Forecast"
                stroke="#3B82F6"
                strokeWidth={2}
                type="monotone"
              / key={698219}>
              <Line;
                dataKey="lower"
                dot={false}
                name="Lower Bound"
                stroke="#93C5FD"
                strokeDasharray="3 3"
                type="monotone"
              / key={258577}>
              <Line;
                dataKey="upper"
                dot={false}
                name="Upper Bound"
                stroke="#93C5FD"
                strokeDasharray="3 3"
                type="monotone"
              / key={732419}>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Seasonality Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Seasonality Decomposition</h2>
        <div className="grid grid-cols-1 gap-6" key={164307}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Trend</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <LineChart data={seasonalityData} key={969193}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="x" / key={944391}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Line dataKey="trend" dot={false} stroke="#3B82F6" type="monotone" / key={983318}>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Seasonal Pattern</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <LineChart data={seasonalityData} key={969193}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="x" / key={944391}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Line dataKey="seasonal" dot={false} stroke="#10B981" type="monotone" / key={549817}>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Residuals</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <LineChart data={seasonalityData} key={969193}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="x" / key={944391}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Line dataKey="residual" dot={false} stroke="#EF4444" type="monotone" / key={450565}>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Change Points Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Change Points</h2>
        <div className="space-y-4" key={160407}>
          {changePoints.map((point, index) => (
            <div;
              key={index}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
             key={373741}>
              <div key={241917}>
                <h3 className="text-lg font-semibold" key={304656}>
                  {point.type.charAt(0).toUpperCase() + point.type.slice(1)} Change;
                </h3>
                <p className="text-sm text-gray-500" key={212051}>At time index: {point.index}</p>
              </div>
              <div className="text-right" key={144468}>
                <p className="text-xl font-bold text-gray-900" key={299883}>{point.value.toFixed(4)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Anomalies Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Anomaly Detection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Anomaly Scores</h3>
            <ResponsiveContainer height={300} width="100%" key={877750}>
              <BarChart data={anomalyData} key={687291}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="x" / key={944391}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Bar dataKey="score" fill="#3B82F6" name="Anomaly Score" / key={592853}>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Anomaly Points</h3>
            <div className="space-y-2" key={725977}>
              {anomalies.map((anomaly, index) => (
                <div;
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                 key={674418}>
                  <span className="text-gray-600" key={588716}>Time Index: {anomaly.index}</span>
                  <div className="text-right" key={144468}>
                    <span className="block font-mono" key={944603}>Value: {anomaly.value.toFixed(4)}</span>
                    <span className="block text-sm text-gray-500" key={602645}>
                      Score: {anomaly.score.toFixed(4)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(TimeSeriesInsights);
