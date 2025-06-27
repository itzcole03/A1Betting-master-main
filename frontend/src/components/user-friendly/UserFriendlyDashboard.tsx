import React, { useState, useEffect, useMemo  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import { useQuery } from '@tanstack/react-query.ts';
import {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Brain,
  Zap,
  Trophy,
  Star,
  Clock,
  Eye,
  ArrowRight,
  PlayCircle,
  BarChart3,
} from 'lucide-react.ts';
import { api } from '@/services/integrationService.ts';
import { enhancedIntegrationBridge } from '@/services/enhancedIntegrationBridge.ts';
import {
  useValueBets,
  useArbitrageOpportunities,
} from '@/hooks/useBetting.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';
import useUserStats from '@/hooks/useUserStats.ts';
import OfflineIndicator from '@/ui/OfflineIndicator.ts';
import EmptyState from '@/ui/EmptyState.ts';
import { useQueryClient } from '@tanstack/react-query.ts';

interface LiveStats {
  totalProfit: number;
  winRate: number;
  activeGames: number;
  aiAccuracy: number;
  todaysPicks: number;
  liveAlerts: number;
}

interface LiveGame {
  id: string;
  teams: string;
  time: string;
  aiPick: string;
  confidence: number;
  status: "live" | "upcoming" | "final";
}

export const UserFriendlyDashboard: React.FC<{
  onNavigate: (page: string) => void;
}> = ({ onNavigate }) => {

  // Real user statistics from backend;
  const {
    userStats,
    backendHealth,
    isLoading: statsLoading,
    error: statsError,
  } = useUserStats();

  // Real API data fetching;
  const {
    valueBets,
    stats: valueBetStats,
    error: valueBetsError,
  } = useValueBets();
  const {
    arbitrageOpportunities,
    stats: arbStats,
    error: arbError,
  } = useArbitrageOpportunities();

  // Real-time accuracy metrics;
  const { data: accuracyMetrics, error: accuracyError } = useQuery({
    queryKey: ["accuracyMetrics"],
    queryFn: () => api.getAccuracyMetrics(),
    refetchInterval: 10000, // Update every 10 seconds;
    retry: false,
  });

  // Real-time health status;
  const { data: healthStatus, error: healthError } = useQuery({
    queryKey: ["healthStatus"],
    queryFn: () => api.getHealthStatus(),
    refetchInterval: 30000, // Update every 30 seconds;
    retry: false,
  });

  // User analytics;
  const { data: userAnalytics, error: analyticsError } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: () => api.getUserAnalytics("default_user"),
    refetchInterval: 60000, // Update every minute;
    retry: false,
  });

  // Check if backend is offline - detect when we're getting default/empty values due to network errors;
  const isOffline =
    valueBetsError ||
    arbError ||
    accuracyError ||
    healthError ||
    analyticsError ||
    statsError ||
    (healthStatus && healthStatus.status === "offline") ||
    (backendHealth && backendHealth.status === "offline") ||
    !userAnalytics ||
    !accuracyMetrics;

  // WebSocket for real-time updates;
  const { lastMessage } = useWebSocket("/ws/dashboard", {
    onMessage: (message) => {
      // console statement removed
    },
  });

  // Calculate live stats from real backend data - memoized to prevent infinite re-renders;
  const liveStats: LiveStats = useMemo(() => {
    return {
      totalProfit: userStats.totalProfit || 0,
      winRate: userStats.winRate * 100 || 0,
      activeGames:
        userStats.activeBets || healthStatus?.metrics?.active_predictions || 0,
      aiAccuracy: userStats.accuracy || backendHealth.accuracy || 0,
      todaysPicks: valueBets?.length || backendHealth.activePredictions || 0,
      liveAlerts: arbitrageOpportunities?.length || 0,
    };
  }, [
    userStats,
    backendHealth,
    healthStatus,
    valueBets,
    arbitrageOpportunities,
  ]);

  // Handle retry functionality;
  const handleRetry = () => {
    queryClient.invalidateQueries();
  };

  // Convert value bets to live games format - memoized to prevent re-renders;
  const liveGames: LiveGame[] = useMemo(() => {

    return (valueBets || []).slice(0, 6).map((bet, index) => ({
      id: bet.event + index,
      teams: bet.event,
      time: new Date(bet.commence_time).toLocaleTimeString(),
      aiPick: `${bet.outcome} (${bet.odds}) - Edge: ${((bet.edge || 0) * 100).toFixed(1)}%`,
      confidence: (bet.model_prob || 0) * 100,
      status: new Date(bet.commence_time) > now ? "upcoming" : "live",
    }));
  }, [valueBets]);

  return (
    <div className="space-y-8 animate-slide-in-up" key={741941}>
      {/* Offline Indicator */}
      <OfflineIndicator;
        show={!!isOffline}
        service="Backend API"
        onRetry={handleRetry}
      / key={580991}>
      {/* Hero Section */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 glass-card rounded-3xl p-12 shadow-neon relative"
       key={964913}>
        <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-3xl blur-2xl opacity-50 animate-pulse" / key={402208}>
        <div className="relative" key={579431}>
          <div className="text-8xl mb-6 animate-float" key={926086}>💰</div>
          <h1 className="holographic text-6xl font-black mb-6" key={739999}>
            A1BETTING INTELLIGENCE;
          </h1>
          <div className="text-6xl font-black text-electric-500 mb-6 animate-cyber-pulse" key={887450}>
            {isOffline;
              ? "OFFLINE"
              : `$${liveStats.totalProfit.toLocaleString()}`}
          </div>
          <p className="text-2xl text-gray-300 mb-8" key={437085}>
            Real-time AI-powered sports analysis with quantum enhancement;
          </p>
          <div className="flex justify-center space-x-8 text-sm" key={980631}>
            <div;
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border backdrop-blur-sm ${isOffline ? "bg-red-500/10 border-red-500/30" : "bg-green-500/10 border-green-500/30"}`}
             key={713387}>
              <div;
                className={`w-2 h-2 rounded-full shadow-lg ${isOffline ? "bg-red-400 shadow-red-400/50" : "bg-green-400 shadow-green-400/50 animate-pulse"}`}
              / key={801066}>
              <span;
                className={`font-semibold drop-shadow-lg ${isOffline ? "text-red-400" : "text-green-400"}`}
               key={565403}>
                {isOffline ? "Services Offline" : "All Systems Online"}
              </span>
            </div>
            <div;
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border backdrop-blur-sm ${isOffline ? "bg-red-500/10 border-red-500/30" : "bg-blue-500/10 border-blue-500/30"}`}
             key={754555}>
              <div;
                className={`w-2 h-2 rounded-full shadow-lg ${isOffline ? "bg-red-400 shadow-red-400/50" : "bg-blue-400 shadow-blue-400/50 animate-pulse"}`}
              / key={998135}>
              <span;
                className={`font-semibold drop-shadow-lg ${isOffline ? "text-red-400" : "text-blue-400"}`}
               key={446136}>
                {isOffline;
                  ? "No Games Data"
                  : `${liveStats.activeGames} Live Games`}
              </span>
            </div>
            <div;
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border backdrop-blur-sm ${isOffline ? "bg-red-500/10 border-red-500/30" : "bg-purple-500/10 border-purple-500/30"}`}
             key={160321}>
              <div;
                className={`w-2 h-2 rounded-full shadow-lg ${isOffline ? "bg-red-400 shadow-red-400/50" : "bg-purple-400 shadow-purple-400/50 animate-pulse"}`}
              / key={400174}>
              <span;
                className={`font-semibold drop-shadow-lg ${isOffline ? "text-red-400" : "text-purple-400"}`}
               key={744270}>
                {isOffline ? "Processing Offline" : "Quantum Processing Active"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Stats Grid */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
       key={222713}>
        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105" key={318180}>
          <div className="text-3xl mb-3 text-electric-400" key={686990}>
            <i className="fas fa-dollar-sign" key={936699}></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse" key={618274}>
            ${liveStats.totalProfit.toLocaleString()}
          </div>
          <div className="text-gray-400 text-sm mb-2" key={180484}>Total Profit (Today)</div>
          <div className="flex items-center justify-center text-xs text-gray-500" key={817218}>
            {isOffline ? "API Offline" : "Real-time data"}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105" key={318180}>
          <div className="text-3xl mb-3 text-electric-400" key={686990}>
            <i className="fas fa-target" key={551636}></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse" key={618274}>
            {liveStats.winRate.toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm mb-2" key={180484}>AI Win Rate</div>
          <div className="flex items-center justify-center text-xs text-gray-500" key={817218}>
            {isOffline ? "API Offline" : "Real-time data"}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105" key={318180}>
          <div className="text-3xl mb-3 text-electric-400" key={686990}>
            <i className="fas fa-brain" key={556406}></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse" key={618274}>
            {liveStats.aiAccuracy.toFixed(1)}%
          </div>
          <div className="text-gray-400 text-sm mb-2" key={180484}>Real-Time Accuracy</div>
          <div className="flex items-center justify-center text-xs text-gray-500" key={817218}>
            {isOffline ? "API Offline" : "Real-time data"}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center hover:shadow-neon transition-all duration-300 transform hover:scale-105" key={318180}>
          <div className="text-3xl mb-3 text-electric-400" key={686990}>
            <i className="fas fa-bolt" key={146949}></i>
          </div>
          <div className="text-2xl font-bold mb-2 text-white animate-cyber-pulse" key={618274}>
            {liveStats.liveAlerts}
          </div>
          <div className="text-gray-400 text-sm mb-2" key={180484}>Live Alerts</div>
          <div className="flex items-center justify-center text-xs text-gray-500" key={817218}>
            {isOffline ? "API Offline" : "Real-time data"}
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
       key={881915}>
        {/* Money Maker Pro */}
        <motion.div;
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() = key={94464}> onNavigate("money-maker")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-green-400 animate-float" key={165119}>💰</div>
          <h3 className="text-xl font-bold mb-2 text-green-400" key={168219}>
            Money Maker Pro;
          </h3>
          <p className="text-gray-300 mb-4 text-sm" key={206731}>
            AI-powered profit generation with quantum enhancement;
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300" key={160533}>
            <div className="flex items-center justify-center space-x-2" key={936866}>
              <span key={595076}>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" / key={734926}>
            </div>
          </button>
        </motion.div>

        {/* PrizePicks Pro */}
        <motion.div;
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() = key={946433}> onNavigate("prizepicks")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-blue-400 animate-float" key={576029}>🏆</div>
          <h3 className="text-xl font-bold mb-2 text-blue-400" key={136397}>
            PrizePicks Pro;
          </h3>
          <p className="text-gray-300 mb-4 text-sm" key={206731}>
            Enhanced player prop analysis with AI recommendations;
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300" key={160533}>
            <div className="flex items-center justify-center space-x-2" key={936866}>
              <span key={595076}>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" / key={734926}>
            </div>
          </button>
        </motion.div>

        {/* PropOllama Chat */}
        <motion.div;
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() = key={704261}> onNavigate("propgpt")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-purple-400 animate-float" key={839777}>🤖</div>
          <h3 className="text-xl font-bold mb-2 text-purple-400" key={772434}>
            propOllama&nbsp;Chat;
          </h3>
          <p className="text-gray-300 mb-4 text-sm" key={206731}>
            Discuss all things sports with a real-time AI expert;
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300" key={160533}>
            <div className="flex items-center justify-center space-x-2" key={936866}>
              <span key={595076}>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" / key={734926}>
            </div>
          </button>
        </motion.div>

        {/* Live Analytics */}
        <motion.div;
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -4 }}
          onClick={() = key={79100}> onNavigate("analytics")}
          className="glass-card rounded-2xl p-8 text-center hover:shadow-neon transition-all duration-300 cursor-pointer group"
        >
          <div className="text-5xl mb-4 text-orange-400 animate-float" key={891500}>📊</div>
          <h3 className="text-xl font-bold mb-2 text-orange-400" key={927828}>
            Live Analytics;
          </h3>
          <p className="text-gray-300 mb-4 text-sm" key={206731}>
            Real-time data analysis and performance tracking;
          </p>
          <button className="cyber-btn w-full py-3 rounded-xl font-semibold transition-all duration-300" key={160533}>
            <div className="flex items-center justify-center space-x-2" key={936866}>
              <span key={595076}>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" / key={734926}>
            </div>
          </button>
        </motion.div>
      </motion.div>

      {/* Live Games Analysis */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
       key={171426}>
        <div className="glass-card rounded-2xl p-8 shadow-neon" key={375010}>
          <h3 className="text-2xl font-bold text-electric-400 mb-6 text-center" key={641750}>
            🔴 Live Games Analysis;
          </h3>
          <div className="space-y-4" key={160407}>
            {liveGames.map((game, index) => (
              <motion.div;
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  game.status === "live"
                    ? "bg-green-500/10 border-green-500/30"
                    : game.status === "upcoming"
                      ? "bg-blue-500/10 border-blue-500/30"
                      : "bg-gray-500/10 border-gray-500/30"
                }`}
               key={479470}>
                <div className="flex justify-between items-center" key={795957}>
                  <div className="flex items-center space-x-4" key={787951}>
                    <div;
                      className={`w-2 h-2 rounded-full ${
                        game.status === "live"
                          ? "bg-green-400 animate-pulse shadow-lg shadow-green-400/50"
                          : game.status === "upcoming"
                            ? "bg-blue-400"
                            : "bg-gray-400"
                      }`}
                    / key={836081}>
                    <div key={241917}>
                      <h4 className="font-bold text-white" key={665663}>{game.teams}</h4>
                      <p className="text-gray-400 text-sm" key={516838}>{game.time}</p>
                    </div>
                  </div>
                  <div className="text-right" key={144468}>
                    <div className="text-electric-400 font-semibold" key={237678}>
                      {game.aiPick}
                    </div>
                    <div className="text-sm text-green-400" key={572030}>
                      {game.confidence}% confidence;
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8" key={13072}>
          <h3 className="text-2xl font-bold text-electric-400 mb-6 text-center" key={641750}>
            🧠 AI Processing Activity;
          </h3>
          <div className="space-y-4" key={160407}>
            <motion.div;
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-4 p-3 bg-electric-500/10 rounded-lg hover:bg-electric-500/20 transition-all cursor-pointer"
              onClick={() = key={705213}> onNavigate("intelligence")}
            >
              <div className="w-2 h-2 bg-electric-400 rounded-full animate-pulse shadow-lg shadow-electric-400/50" / key={844379}>
              <span className="text-electric-300 text-sm" key={397204}>
                Neural Network processed{" "}
                {(1247 + Math.floor(Math.random() * 100)).toLocaleString()} data;
                points (12ms)
              </span>
              <Eye className="w-4 h-4 text-electric-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" / key={956900}>
            </motion.div>
            <motion.div;
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4 p-3 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all cursor-pointer"
              onClick={() = key={801023}> onNavigate("intelligence")}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50" / key={504207}>
              <span className="text-purple-300 text-sm" key={762109}>
                Quantum processor generated {Math.floor(Math.random() * 5) + 1}{" "}
                new predictions;
              </span>
              <BarChart3 className="w-4 h-4 text-purple-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" / key={313748}>
            </motion.div>
            <motion.div;
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4 p-3 bg-blue-500/10 rounded-lg hover:bg-blue-500/20 transition-all cursor-pointer"
              onClick={() = key={410318}> onNavigate("intelligence")}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50" / key={471674}>
              <span className="text-blue-300 text-sm" key={522424}>
                Ensemble model accuracy:{" "}
                {(97.3 + Math.random() * 0.5).toFixed(1)}%
              </span>
              <TrendingUp className="w-4 h-4 text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" / key={841920}>
            </motion.div>
            <motion.div;
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center space-x-4 p-3 bg-green-500/10 rounded-lg hover:bg-green-500/20 transition-all cursor-pointer"
              onClick={() = key={934313}> onNavigate("moneymaker")}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" / key={22601}>
              <span className="text-green-300 text-sm" key={697917}>
                ${(Math.random() * 500 + 100).toFixed(2)} profit opportunity;
                detected;
              </span>
              <DollarSign className="w-4 h-4 text-green-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" / key={810092}>
            </motion.div>
          </div>

          {/* AI System Status */}
          <div className="mt-6 pt-4 border-t border-gray-700" key={620200}>
            <div className="flex items-center justify-between text-sm" key={20634}>
              <div className="flex items-center space-x-2" key={740830}>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" / key={724634}>
                <span className="text-gray-400" key={912100}>System Status</span>
              </div>
              <span className="text-green-400 font-semibold" key={426839}>OPTIMAL</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2" key={560233}>
              <span className="text-gray-400" key={912100}>Processing Power</span>
              <div className="flex items-center space-x-2" key={740830}>
                <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden" key={284859}>
                  <div className="w-full h-full bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse" / key={501219}>
                </div>
                <span className="text-blue-400" key={510194}>100%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserFriendlyDashboard;
