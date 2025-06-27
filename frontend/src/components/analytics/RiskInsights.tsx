import React from 'react.ts';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from 'recharts.ts';

interface RiskInsightsProps {
  riskMetrics: Record<string, number key={817366}>;
  recommendations: {
    shouldBet: boolean;
    confidence: number;
    maxStake: number;
    expectedValue: number;
  };
  simulation: {
    distribution: number[];
    var: number;
    cvar: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
}

const RiskInsights: React.FC<RiskInsightsProps key={334733}> = ({
  riskMetrics,
  recommendations,
  simulation,
}) => {
  return (
    <div className="space-y-8" key={778766}>
      {/* Risk Metrics Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Risk Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={815557}>
          {Object.entries(riskMetrics).map(([metric, value]) => (
            <div key={metric} className="p-4 bg-gray-50 rounded-lg" key={360667}>
              <h3 className="text-sm font-medium text-gray-500 capitalize" key={169316}>
                {metric.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-2xl font-bold text-gray-900" key={842057}>
                {typeof value === 'number' ? value.toFixed(4) : value}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Betting Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div className="space-y-4" key={160407}>
            <div className="flex items-center justify-between" key={96335}>
              <span className="text-gray-600" key={588716}>Should Bet</span>
              <span;
                className={`px-3 py-1 rounded-full text-white ${
                  recommendations.shouldBet ? 'bg-green-500' : 'bg-red-500'
                }`}
               key={693286}>
                {recommendations.shouldBet ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex items-center justify-between" key={96335}>
              <span className="text-gray-600" key={588716}>Confidence</span>
              <span className="font-mono" key={294600}>{recommendations.confidence.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between" key={96335}>
              <span className="text-gray-600" key={588716}>Max Stake</span>
              <span className="font-mono" key={294600}>${recommendations.maxStake.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between" key={96335}>
              <span className="text-gray-600" key={588716}>Expected Value</span>
              <span;
                className={`font-mono ${
                  recommendations.expectedValue  key={683458}>= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                ${recommendations.expectedValue.toFixed(2)}
              </span>
            </div>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Confidence Distribution</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <AreaChart;
                data={[
                  { x: 0, y: 0 },
                  { x: recommendations.confidence / 100, y: 1 },
                  { x: 1, y: 0 },
                ]}
               key={677788}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="x" tickFormatter={value = key={324177}> `${(value * 100).toFixed(0)}%`} />
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Area dataKey="y" fill="#93C5FD" stroke="#3B82F6" type="monotone" / key={543214}>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Simulation Results Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Simulation Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Risk Measures</h3>
            <div className="space-y-4" key={160407}>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-gray-600" key={588716}>Value at Risk (95%)</span>
                <span className="font-mono" key={294600}>${simulation.var.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-gray-600" key={588716}>Conditional VaR</span>
                <span className="font-mono" key={294600}>${simulation.cvar.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-gray-600" key={588716}>Sharpe Ratio</span>
                <span className="font-mono" key={294600}>{simulation.sharpeRatio.toFixed(4)}</span>
              </div>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-gray-600" key={588716}>Max Drawdown</span>
                <span className="font-mono" key={294600}>{(simulation.maxDrawdown * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Return Distribution</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <AreaChart;
                data={simulation.distribution.map((value, index) = key={793404}> ({
                  x: index,
                  value,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="x" / key={944391}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Area dataKey="value" fill="#93C5FD" stroke="#3B82F6" type="monotone" / key={96444}>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Risk Visualization Section */}
      <section className="bg-white rounded-lg shadow p-6" key={881091}>
        <h2 className="text-2xl font-bold mb-4" key={946196}>Risk Visualization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Risk-Return Profile</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <ScatterChart key={380318}>
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="risk" domain={[0, 100]} name="Risk" unit="%" / key={340359}>
                <YAxis dataKey="return" domain={[-100, 100]} name="Return" unit="%" / key={426516}>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} / key={353213}>
                <Scatter;
                  data={[
                    {
                      risk: simulation.var,
                      return: recommendations.expectedValue,
                    },
                  ]}
                  fill="#3B82F6"
                  name="Risk-Return"
                / key={420292}>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div key={241917}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Risk Decomposition</h3>
            <ResponsiveContainer height={200} width="100%" key={395144}>
              <BarChart;
                data={Object.entries(riskMetrics).map(([metric, value]) = key={746876}> ({
                  metric,
                  value,
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" / key={580708}>
                <XAxis dataKey="metric" / key={265359}>
                <YAxis / key={190086}>
                <Tooltip / key={554254}>
                <Bar dataKey="value" fill="#3B82F6" / key={278964}>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(RiskInsights);
