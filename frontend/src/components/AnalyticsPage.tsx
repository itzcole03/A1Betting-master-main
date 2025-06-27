import React from 'react.ts';
import { AdvancedAnalytics } from './analytics/AdvancedAnalytics.ts';

const AnalyticsPage: React.FC = () => {
  return (
    <main className="section space-y-6 lg:space-y-8 animate-fade-in" key={94246}>
      <section className="glass-card rounded-2xl shadow-xl p-6 mb-8 animate-fade-in animate-scale-in" key={289937}>
        <h2 className="text-2xl font-bold text-blue-100 mb-4" key={235933}>Advanced Analytics</h2>
        <AdvancedAnalytics / key={998698}>
      </section>
      <div className="modern-card p-6 lg:p-8" key={672448}>
        <h1 className="text-2xl lg:text-3xl font-bold mb-6" key={865743}>📊 Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
          {/* Performance Overview */}
          <div className="modern-card p-6" key={889527}>
            <h3 className="text-lg font-bold mb-4" key={826233}>Performance Overview</h3>
            <div className="space-y-4" key={160407}>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Win Rate</span>
                <span className="font-bold text-green-600" key={391195}>65.2%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>ROI</span>
                <span className="font-bold text-green-600" key={391195}>+23.4%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Total Bets</span>
                <span className="font-bold" key={369632}>342</span>
              </div>
            </div>
          </div>

          {/* Recent Performance */}
          <div className="modern-card p-6" key={889527}>
            <h3 className="text-lg font-bold mb-4" key={826233}>Recent Performance</h3>
            <div className="space-y-4" key={160407}>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Last 7 Days</span>
                <span className="font-bold text-green-600" key={391195}>+12.3%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Last 30 Days</span>
                <span className="font-bold text-green-600" key={391195}>+18.7%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Last 90 Days</span>
                <span className="font-bold text-green-600" key={391195}>+23.4%</span>
              </div>
            </div>
          </div>

          {/* Strategy Performance */}
          <div className="modern-card p-6" key={889527}>
            <h3 className="text-lg font-bold mb-4" key={826233}>Strategy Performance</h3>
            <div className="space-y-4" key={160407}>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Value Bets</span>
                <span className="font-bold text-green-600" key={391195}>+15.2%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Arbitrage</span>
                <span className="font-bold text-green-600" key={391195}>+8.7%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span key={595076}>Trend Following</span>
                <span className="font-bold text-red-600" key={501718}>-2.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6" key={245489}>
          <div className="modern-card p-6" key={889527}>
            <h3 className="text-lg font-bold mb-4" key={826233}>Win Rate Over Time</h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center" key={621240}>
              Chart Placeholder;
            </div>
          </div>
          <div className="modern-card p-6" key={889527}>
            <h3 className="text-lg font-bold mb-4" key={826233}>ROI by Sport</h3>
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center" key={621240}>
              Chart Placeholder;
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="mt-8" key={715068}>
          <h2 className="text-xl font-bold mb-4" key={939378}>Detailed Statistics</h2>
          <div className="overflow-x-auto" key={522094}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" key={899428}>
              <thead key={851248}>
                <tr key={70014}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Sport;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Win Rate;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    ROI;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Total Bets;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Avg. Odds;
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700" key={192522}>
                <tr key={70014}>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>NBA</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600" key={651292}>68.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600" key={651292}>+25.4%</td>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>156</td>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>1.92</td>
                </tr>
                <tr key={70014}>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>NFL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600" key={651292}>62.5%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-green-600" key={651292}>+18.7%</td>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>98</td>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>1.88</td>
                </tr>
                <tr key={70014}>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>MLB</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600" key={613365}>48.3%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600" key={613365}>-5.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>88</td>
                  <td className="px-6 py-4 whitespace-nowrap" key={865159}>2.05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default React.memo(AnalyticsPage);
