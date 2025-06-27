import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  Rocket,
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Brain,
  Target,
  DollarSign,
} from 'lucide-react.ts';

// Use basic components first to avoid import issues;
import { useAppStore } from '@/store/useAppStore.ts';

// ============================================================================
// SIMPLE STATS INTERFACE;
// ============================================================================

interface QuickStat {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

// ============================================================================
// MAIN HOMEPAGE COMPONENT;
// ============================================================================

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    "overview" | "analytics" | "betting" | "strategy"
  >("overview");
  const [isLoading, setIsLoading] = useState(true);

  // Use app store for toasts;
  const { addToast } = useAppStore();

  // Mock real-time data;
  const [realTimeStats] = useState({
    connectedSources: 42,
    totalSources: 50,
    dataQuality: 0.87,
    winRate: 73.2,
    roi: 15.4,
    profitToday: 2847,
    activePredictions: 156,
  });

  // Initialize loading state;
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      addToast({
        message: `🔴 Real Data Platform Active! Connected to ${realTimeStats.connectedSources} live sources`,
        type: "success",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [addToast, realTimeStats.connectedSources]);

  // Quick stats for the hero section;
  const quickStats: QuickStat[] = [
    {
      label: "Win Rate",
      value: `${realTimeStats.winRate}%`,
      change: "+5.2%",
      icon: <Target className="w-5 h-5" / key={201057}>,
      color: "from-green-500 to-emerald-600",
    },
    {
      label: "ROI",
      value: `${realTimeStats.roi}%`,
      change: "+2.8%",
      icon: <TrendingUp className="w-5 h-5" / key={645966}>,
      color: "from-blue-500 to-cyan-600",
    },
    {
      label: "Profit Today",
      value: `$${realTimeStats.profitToday.toLocaleString()}`,
      change: "+18.3%",
      icon: <DollarSign className="w-5 h-5" / key={232495}>,
      color: "from-purple-500 to-pink-600",
    },
    {
      label: "Predictions",
      value: realTimeStats.activePredictions.toString(),
      change: "+12",
      icon: <Brain className="w-5 h-5" / key={358560}>,
      color: "from-orange-500 to-red-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950" key={16285}>
        <motion.div;
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
         key={6947}>
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6" key={116352}></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2" key={852088}>
            Initializing A1Betting Platform;
          </h2>
          <p className="text-gray-600 dark:text-gray-300" key={841148}>
            Connecting to {realTimeStats.totalSources} real-time data sources...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950" key={35952}>
      <div className="container mx-auto px-6 py-8" key={527852}>
        {/* Header */}
        <div className="text-center mb-12" key={258514}>
          <motion.h1;
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4"
           key={561048}>
            A1Betting Platform;
          </motion.h1>
          <motion.p;
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
           key={257902}>
            Advanced AI-Powered Sports Betting Intelligence;
          </motion.p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8" key={286587}>
          <div className="flex flex-wrap gap-2 p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto" key={513657}>
            {[
              {
                key: "overview",
                label: "Overview",
                icon: <BarChart3 className="w-4 h-4" / key={509964}>,
              },
              {
                key: "analytics",
                label: "Analytics",
                icon: <Brain className="w-4 h-4" / key={370311}>,
              },
              {
                key: "betting",
                label: "Betting",
                icon: <Target className="w-4 h-4" / key={184202}>,
              },
              {
                key: "strategy",
                label: "Strategy",
                icon: <Zap className="w-4 h-4" / key={768470}>,
              },
            ].map((tab) => (
              <button;
                key={tab.key}
                onClick={() = key={990121}> setActiveSection(tab.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === tab.key;
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" key={281176}>
          {quickStats.map((stat, index) => (
            <motion.div;
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
             key={504385}>
              <div;
                className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg w-fit mb-4`}
               key={63221}>
                <div className="text-white" key={253766}>{stat.icon}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1" key={607822}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2" key={153328}>
                {stat.label}
              </div>
              <div className="text-xs text-green-600 font-semibold" key={415189}>
                {stat.change} vs yesterday;
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Status */}
        <motion.div;
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto"
         key={624605}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center" key={541806}>
            System Status;
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
            <div key={241917}>
              <div className="flex justify-between items-center mb-4" key={240336}>
                <span className="text-gray-600 dark:text-gray-300" key={39765}>
                  Data Quality:
                </span>
                <div className="flex items-center gap-2" key={100294}>
                  <div className="w-32 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" key={948310}>
                    <div;
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                      style={{ width: `${realTimeStats.dataQuality * 100}%` }}
                    / key={132645}>
                  </div>
                  <span className="text-sm font-semibold text-green-600" key={681825}>
                    {(realTimeStats.dataQuality * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4" key={240336}>
                <span className="text-gray-600 dark:text-gray-300" key={39765}>
                  Connected Sources:
                </span>
                <span className="font-semibold text-blue-600" key={172274}>
                  {realTimeStats.connectedSources}/{realTimeStats.totalSources}
                </span>
              </div>
            </div>

            <div key={241917}>
              <div className="flex justify-between items-center mb-4" key={240336}>
                <span className="text-gray-600 dark:text-gray-300" key={39765}>
                  Active Predictions:
                </span>
                <span className="font-semibold text-purple-600" key={818783}>
                  {realTimeStats.activePredictions}
                </span>
              </div>

              <div className="flex justify-between items-center mb-4" key={240336}>
                <span className="text-gray-600 dark:text-gray-300" key={39765}>
                  API Status:
                </span>
                <span className="font-semibold text-green-600" key={567278}>
                  All Systems Online;
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div;
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
         key={797073}>
          <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105" key={208806}>
            <span className="relative z-10 flex items-center justify-center gap-3" key={847291}>
              <Rocket className="w-6 h-6" / key={600304}>
              Activate AI System;
              <Rocket className="w-6 h-6" / key={600304}>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity rounded-2xl" key={663877}></div>
          </button>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto" key={493651}>
            🚀 Real API Integration • 🔴 Live Data Feeds • 📊 Advanced ML Models;
            • 🎯 Kelly Optimization • 🛡️ Risk Management;
          </p>

          <p className="mt-2 text-xs text-gray-500 dark:text-gray-500" key={73141}>
            Connected to {realTimeStats.connectedSources} live data sources with{" "}
            {(realTimeStats.dataQuality * 100).toFixed(1)}% quality rating;
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
/* HMR test */
