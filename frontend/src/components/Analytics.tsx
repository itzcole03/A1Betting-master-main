import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { motion } from 'framer-motion.ts';
import React, { useMemo, useState  } from 'react.ts';
import { FaCalculator, FaChartLine, FaExchangeAlt } from 'react-icons/fa.ts';
import { useApiRequest } from '@/hooks/useApiRequest.ts';
import type { ArbitrageOpportunity } from '@/types/betting.ts';
import { americanToDecimal, calculateKellyCriterion } from '@/utils/odds.ts';
import SafeChart from './ui/SafeChart.ts';

// Register ChartJS components;
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

/**
 * Analytics component displays user betting performance metrics, a Kelly Criterion calculator,
 * and arbitrage opportunities. Uses memoization for performance optimization.
 */

interface PerformanceData {
  totalBets: number;
  winRate: number;
  profit: number;
  roi: number;
  recentHistory: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
    }>;
  };
}

const Analytics: React.FC = () => {
  // State for Kelly calculator;
  const [kellyBankroll, setKellyBankroll] = useState<number key={430559}>(1000);
  const [kellyProb, setKellyProb] = useState<number key={430559}>(0.5);
  const [kellyOdds, setKellyOdds] = useState<number key={430559}>(-110);
  const [kellyFraction, setKellyFraction] = useState<number key={430559}>(1);

  // Fetch user performance data;
  const {
    data: perf,
    isLoading: perfLoading,
    error: perfError,
  } = useApiRequest<PerformanceData key={689720}>("/api/user/performance");
  // Fetch arbitrage opportunities;
  const {
    data: arbs,
    isLoading: arbsLoading,
    error: arbsError,
  } = useApiRequest<ArbitrageOpportunity[] key={128378}>("/api/arbitrage/opportunities");

  // Chart data for recent history;
  const chartData = useMemo(() => {
    if (!perf) {
      return {
        labels: [],
        datasets: [],
      };
    }
    return {
      labels: perf.recentHistory.labels,
      datasets: perf.recentHistory.datasets.map((dataset) => ({
        ...dataset,
        fill: true,
        tension: 0.4,
        borderColor: dataset.borderColor || "rgb(16, 185, 129)",
        backgroundColor: dataset.backgroundColor || "rgba(16, 185, 129, 0.1)",
      })),
    };
  }, [perf]);

  // Kelly calculation;
  const kellyStake = useMemo(() => {

    return calculateKellyCriterion(
      Number(kellyProb),
      decOdds,
      Number(kellyBankroll),
      Number(kellyFraction),
    );
  }, [kellyBankroll, kellyProb, kellyOdds, kellyFraction]);

  return (
    <div className="space-y-6" key={501869}>
      {/* Performance Metrics */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
       key={501823}>
        <h3 className="text-lg font-semibold mb-4 flex items-center" key={729357}>
          <FaChartLine className="w-5 h-5 mr-2 text-primary-500" / key={18841}>
          My Performance;
        </h3>
        {perfLoading ? (
          <div className="text-gray-500 animate-pulse-soft" key={232369}>
            Loading performance...
          </div>
        ) : perfError ? (
          <div className="text-red-500" key={501560}>{perfError.message}</div>
        ) : perf ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" key={477110}>
            <div key={241917}>
              <div className="text-xs text-gray-500" key={585363}>Total Bets</div>
              <div className="text-2xl font-bold" key={377308}>{perf.totalBets}</div>
            </div>
            <div key={241917}>
              <div className="text-xs text-gray-500" key={585363}>Win Rate</div>
              <div className="text-2xl font-bold text-green-600" key={702696}>
                {(perf.winRate * 100).toFixed(1)}%
              </div>
            </div>
            <div key={241917}>
              <div className="text-xs text-gray-500" key={585363}>Profit</div>
              <div className="text-2xl font-bold text-blue-600" key={634378}>
                ${perf.profit.toLocaleString()}
              </div>
            </div>
            <div key={241917}>
              <div className="text-xs text-gray-500" key={585363}>ROI</div>
              <div className="text-2xl font-bold text-purple-600" key={630773}>
                {(perf.roi * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        ) : null}
        {/* Recent History Chart */}
        <div className="h-64" key={118048}>
          <SafeChart;
            type="line"
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: { duration: 800 },
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: "rgba(156,163,175,0.1)" },
                },
                x: { grid: { display: false } },
              },
            }}
            loadingMessage="Loading performance history..."
          / key={715423}>
        </div>
      </motion.div>

      {/* Kelly Criterion Calculator */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
       key={954054}>
        <h3 className="text-lg font-semibold mb-4 flex items-center" key={729357}>
          <FaCalculator className="w-5 h-5 mr-2 text-primary-500" / key={326227}>
          Kelly Criterion Calculator;
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" key={477110}>
          <div key={241917}>
            <label className="block text-xs text-gray-500 mb-1" key={617802}>Bankroll</label>
            <input;
              className="premium-input w-full"
              min={1}
              type="number"
              value={kellyBankroll}
              onChange={(e) = key={257377}> setKellyBankroll(Number(e.target.value))}
            />
          </div>
          <div key={241917}>
            <label className="block text-xs text-gray-500 mb-1" key={617802}>
              Win Probability;
            </label>
            <input;
              className="premium-input w-full"
              max={1}
              min={0}
              step={0.01}
              type="number"
              value={kellyProb}
              onChange={(e) = key={367058}> setKellyProb(Number(e.target.value))}
            />
          </div>
          <div key={241917}>
            <label className="block text-xs text-gray-500 mb-1" key={617802}>
              Odds (American)
            </label>
            <input;
              className="premium-input w-full"
              type="number"
              value={kellyOdds}
              onChange={(e) = key={249492}> setKellyOdds(Number(e.target.value))}
            />
          </div>
          <div key={241917}>
            <label className="block text-xs text-gray-500 mb-1" key={617802}>Fraction</label>
            <input;
              className="premium-input w-full"
              max={1}
              min={0.01}
              step={0.01}
              type="number"
              value={kellyFraction}
              onChange={(e) = key={632943}> setKellyFraction(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mt-2 text-lg font-bold text-green-600" key={880}>
          Optimal Bet: ${kellyStake.toFixed(2)}
        </div>
      </motion.div>

      {/* Arbitrage Opportunities */}
      <motion.div;
        animate={{ opacity: 1, y: 0 }}
        className="glass-morphism p-6 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.2 }}
       key={572647}>
        <h3 className="text-lg font-semibold mb-4 flex items-center" key={729357}>
          <FaExchangeAlt className="w-5 h-5 mr-2 text-primary-500" / key={843735}>
          Arbitrage Opportunities;
        </h3>
        {arbsLoading ? (
          <div className="text-gray-500 animate-pulse-soft" key={232369}>
            Loading opportunities...
          </div>
        ) : arbsError ? (
          <div className="text-red-500" key={501560}>{arbsError.message}</div>
        ) : arbs && arbs.length > 0 ? (
          <div className="space-y-4" key={160407}>
            {arbs.map((opp) => (
              <div;
                key={opp.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
               key={248196}>
                <div className="flex items-start justify-between" key={653478}>
                  <div key={241917}>
                    <div className="flex items-center space-x-2" key={740830}>
                      <span className="font-medium" key={514486}>{opp.player.name}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400" key={10584}>
                        {opp.player.team.abbreviation}
                      </span>
                      <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded" key={855859}>
                        {opp.propType}
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-4" key={987904}>
                      {opp.books.map((book) => (
                        <div key={book.name} className="text-sm" key={796291}>
                          <span className="text-gray-600 dark:text-gray-400" key={517223}>
                            {book.name}:
                          </span>
                          <span className="ml-1 font-medium" key={561754}>
                            {book.line} @ {book.odds > 0 ? "+" : ""}
                            {book.odds}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right" key={144468}>
                    <div className="flex items-center space-x-2" key={740830}>
                      <span className="text-xs text-gray-600 dark:text-gray-400" key={575319}>
                        Potential Profit;
                      </span>
                      <span className="text-lg font-bold text-green-500" key={943800}>
                        ${opp.potentialProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400" key={430041}>
                      Expires: {new Date(opp.expiresAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500" key={542487}>No arbitrage opportunities found.</div>
        )}
      </motion.div>
    </div>
  );
};

// React.memo is used here to prevent unnecessary re-renders of Analytics when its props/state do not change.
// This is beneficial because Analytics fetches data and renders charts, which can be expensive operations.
export default React.memo(Analytics);
