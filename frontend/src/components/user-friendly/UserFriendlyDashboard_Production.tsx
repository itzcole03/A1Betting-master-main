import React, { useState, useEffect, useMemo, useCallback  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import { useQuery, useQueryClient } from '@tanstack/react-query.ts';
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
  AlertCircle,
  CheckCircle,
  TrendingDown,
} from 'lucide-react.ts';
import { api } from '@/services/api/ProductionApiService.ts';
import {
  useValueBets,
  useArbitrageOpportunities,
} from '@/hooks/useBetting.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';
import {
  logger,
  logUserAction,
  logError,
  logPerformance,
} from '@/utils/logger.ts';
import {
  handleApiError,
  handleComponentError,
} from '@/utils/productionErrorHandler.ts';
import OfflineIndicator from '@/ui/OfflineIndicator.ts';
import EmptyState from '@/ui/EmptyState.ts';
import toast from 'react-hot-toast.ts';

interface LiveStats {
  totalProfit: number;
  winRate: number;
  activeGames: number;
  aiAccuracy: number;
  todaysPicks: number;
  liveAlerts: number;
  profitToday: number;
  accuracy24h: number;
}

interface LiveGame {
  id: string;
  teams: string;
  time: string;
  aiPick: string;
  confidence: number;
  status: "live" | "upcoming" | "final";
  edge: number;
  sport: string;
  league: string;
  predictedValue: number;
  marketOdds: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
  color: string;
}

export const ProductionUserFriendlyDashboard: React.FC<{
  onNavigate: (page: string) => void;
}> = ({ onNavigate }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "24h" | "7d" | "30d"
  >("24h");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());


  // Real-time data fetching with intelligent error handling;
  const {
    valueBets,
    stats: valueBetStats,
    error: valueBetsError,
    isLoading: valueBetsLoading,
  } = useValueBets();

  const {
    arbitrageOpportunities,
    stats: arbStats,
    error: arbError,
    isLoading: arbLoading,
  } = useArbitrageOpportunities();

  // Real-time accuracy metrics with caching;
  const {
    data: accuracyMetrics,
    error: accuracyError,
    isLoading: accuracyLoading,
    refetch: refetchAccuracy,
  } = useQuery({
    queryKey: ["accuracyMetrics", selectedTimeframe],
    queryFn: () => api.getAccuracyMetrics(),
    refetchInterval: autoRefresh ? 10000 : false,
    retry: 3,
    retryDelay: 1000,
    staleTime: 5000,
    onError: (error) =>
      handleApiError(error as Error, "/metrics/accuracy", () =>
        refetchAccuracy(),
      ),
  });

  // System health monitoring;
  const {
    data: healthStatus,
    error: healthError,
    isLoading: healthLoading,
  } = useQuery({
    queryKey: ["healthStatus"],
    queryFn: () => api.getSystemHealth(),
    refetchInterval: autoRefresh ? 30000 : false,
    retry: 2,
    retryDelay: 2000,
    onError: (error) => handleApiError(error as Error, "/health"),
  });

  // User analytics with error handling;
  const {
    data: userAnalytics,
    error: analyticsError,
    isLoading: analyticsLoading,
  } = useQuery({
    queryKey: ["userAnalytics", selectedTimeframe],
    queryFn: () => api.getUserAnalytics("default_user"),
    refetchInterval: autoRefresh ? 60000 : false,
    retry: 2,
    onError: (error) =>
      handleApiError(error as Error, "/analytics/users/default_user"),
  });

  // Enhanced WebSocket integration;
  const { lastMessage, connectionState } = useWebSocket("/ws/dashboard", {
    onMessage: useCallback(
      (message) => {
        try {

          logger.info("Real-time dashboard update received", data, "WebSocket");

          // Invalidate relevant queries to refresh data;
          if (data.type === "accuracy_update") {
            queryClient.invalidateQueries(["accuracyMetrics"]);
          } else if (data.type === "health_update") {
            queryClient.invalidateQueries(["healthStatus"]);
          }

          setLastRefresh(new Date());
        } catch (error) {
          logError(error as Error, "WebSocket message parsing");
        }
      },
      [queryClient],
    ),
    onError: useCallback((error) => {
      handleApiError(error, "/ws/dashboard");
    }, []),
  });

  // Comprehensive error detection;
  const hasErrors =
    valueBetsError ||
    arbError ||
    accuracyError ||
    healthError ||
    analyticsError;

  // Enhanced live stats calculation with error handling;
  const liveStats: LiveStats = useMemo(() => {
    try {

      const baseStats = {
        totalProfit: userAnalytics?.yearly?.[currentYear] || 0,
        winRate: accuracyMetrics?.overall_accuracy;
          ? accuracyMetrics.overall_accuracy * 100;
          : 0,
        activeGames: healthStatus?.activePredictions || 0,
        aiAccuracy: accuracyMetrics?.overall_accuracy;
          ? accuracyMetrics.overall_accuracy * 100;
          : 0,
        todaysPicks: valueBets?.length || 0,
        liveAlerts: arbitrageOpportunities?.length || 0,
        profitToday: 0, // Calculate from today's bets;
        accuracy24h: accuracyMetrics?.daily_accuracy;
          ? accuracyMetrics.daily_accuracy * 100;
          : 0,
      };

      // Calculate today's profit from value bets;
      if (valueBets && valueBets.length > 0) {

        const todaysBets = valueBets.filter(
          (bet) => bet.commence_time && bet.commence_time.startsWith(today),
        );
        baseStats.profitToday = todaysBets.reduce(
          (sum, bet) => sum + (bet.edge || 0) * 100,
          0,
        );
      }

      return baseStats;
    } catch (error) {
      handleComponentError(error as Error, "LiveStats calculation");
      // Return safe defaults;
      return {
        totalProfit: 0,
        winRate: 0,
        activeGames: 0,
        aiAccuracy: 0,
        todaysPicks: 0,
        liveAlerts: 0,
        profitToday: 0,
        accuracy24h: 0,
      };
    }
  }, [
    userAnalytics,
    accuracyMetrics,
    healthStatus,
    valueBets,
    arbitrageOpportunities,
  ]);

  // Enhanced live games with comprehensive data;
  const liveGames: LiveGame[] = useMemo(() => {
    try {
      if (!valueBets || valueBets.length === 0) return [];

      return valueBets.slice(0, 6).map((bet, index) => {



        const isLive = !isUpcoming && timeDiff < 3 * 60 * 60 * 1000; // Within 3 hours;

        return {
          id: `${bet.event}_${index}`,
          teams: bet.event,
          time: commenceTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          aiPick: `${bet.outcome} (${bet.odds?.toFixed(2) || "N/A"})`,
          confidence: (bet.model_prob || 0) * 100,
          status: isLive ? "live" : isUpcoming ? "upcoming" : "final",
          edge: (bet.edge || 0) * 100,
          sport: bet.sport_title || "Unknown",
          league: bet.sport_title || "Unknown",
          predictedValue: bet.model_prob || 0,
          marketOdds: bet.odds || 0,
        } as LiveGame;
      });
    } catch (error) {
      handleComponentError(error as Error, "LiveGames calculation");
      return [];
    }
  }, [valueBets]);

  // Quick actions with enhanced functionality;
  const quickActions: QuickAction[] = useMemo(
    () => [
      {
        id: "prizepicks",
        title: "Ultra PrizePicks",
        description: "AI-powered prop selections",
        icon: <Trophy className="w-6 h-6" / key={849542}>,
        action: () => {
          logUserAction("quick_action_prizepicks");
          onNavigate("prizepicks");
        },
        badge: `${liveStats.todaysPicks}`,
        color: "from-yellow-500 to-orange-500",
      },
      {
        id: "moneymaker",
        title: "Money Maker Pro",
        description: "Maximize your profits",
        icon: <DollarSign className="w-6 h-6" / key={555051}>,
        action: () => {
          logUserAction("quick_action_moneymaker");
          onNavigate("moneymaker");
        },
        badge:
          liveStats.profitToday > 0;
            ? `+$${liveStats.profitToday.toFixed(0)}`
            : undefined,
        color: "from-green-500 to-emerald-500",
      },
      {
        id: "propollama",
        title: "Prop AI Oracle",
        description: "Chat with AI analyst",
        icon: <Brain className="w-6 h-6" / key={674415}>,
        action: () => {
          logUserAction("quick_action_propollama");
          onNavigate("propollama");
        },
        badge: "🤖",
        color: "from-purple-500 to-indigo-500",
      },
      {
        id: "intelligence",
        title: "Intelligence Hub",
        description: "Advanced analytics",
        icon: <BarChart3 className="w-6 h-6" / key={609853}>,
        action: () => {
          logUserAction("quick_action_intelligence");
          onNavigate("intelligence");
        },
        badge:
          liveStats.activeGames > 0 ? `${liveStats.activeGames}` : undefined,
        color: "from-cyan-500 to-blue-500",
      },
    ],
    [liveStats, onNavigate],
  );

  // Auto-refresh toggle handler;
  const handleAutoRefreshToggle = useCallback(() => {
    setAutoRefresh(!autoRefresh);
    logUserAction("auto_refresh_toggle", { enabled: !autoRefresh });
    toast.success(`Auto-refresh ${!autoRefresh ? "enabled" : "disabled"}`);
  }, [autoRefresh]);

  // Manual refresh handler;
  const handleManualRefresh = useCallback(async () => {

    logUserAction("manual_refresh");

    try {
      await queryClient.invalidateQueries();
      setLastRefresh(new Date());

      logPerformance("dashboard_refresh", refreshEnd - refreshStart);

      toast.success("Dashboard refreshed!");
    } catch (error) {
      handleApiError(error as Error, "manual_refresh");
    }
  }, [queryClient]);

  // Performance tracking;
  useEffect(() => {

    logPerformance("dashboard_load", endTime - startTime);
  }, [startTime]);

  // Loading state;
  const isLoading =
    valueBetsLoading ||
    arbLoading ||
    accuracyLoading ||
    healthLoading ||
    analyticsLoading;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse" key={383154}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-800/40 rounded-xl p-6 h-32" / key={57456}>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" key={778766}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between" key={96335}>
        <div key={241917}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" key={167446}>
            Ultimate Dashboard;
          </h1>
          <p className="text-gray-400 mt-1" key={561557}>
            Real-time sports betting intelligence;
            {lastRefresh && (
              <span className="ml-2 text-xs" key={940402}>
                • Updated {lastRefresh.toLocaleTimeString()}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3" key={443099}>
          {/* Timeframe selector */}
          <div className="flex bg-gray-800/40 rounded-lg p-1" key={108394}>
            {(["24h", "7d", "30d"] as const).map((timeframe) => (
              <button;
                key={timeframe}
                onClick={() = key={501505}> {
                  setSelectedTimeframe(timeframe);
                  logUserAction("timeframe_change", { timeframe });
                }}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  selectedTimeframe === timeframe;
                    ? "bg-cyan-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>

          {/* Auto-refresh toggle */}
          <button;
            onClick={handleAutoRefreshToggle}
            className={`p-2 rounded-lg transition-all ${
              autoRefresh;
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-800/40 text-gray-400 hover:text-white"
            }`}
            title={`Auto-refresh ${autoRefresh ? "enabled" : "disabled"}`}
           key={15652}>
            <Activity className="w-5 h-5" / key={942081}>
          </button>

          {/* Manual refresh */}
          <button;
            onClick={handleManualRefresh}
            className="p-2 bg-gray-800/40 rounded-lg text-gray-400 hover:text-white transition-all hover:scale-105"
            title="Refresh now"
           key={924718}>
            <ArrowRight className="w-5 h-5" / key={840713}>
          </button>
        </div>
      </div>

      {/* Offline indicator */}
      {isOffline && (
        <motion.div;
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
         key={646659}>
          <AlertCircle className="w-5 h-5 text-red-400" / key={516197}>
          <div key={241917}>
            <p className="text-red-400 font-medium" key={355970}>
              Limited connectivity detected;
            </p>
            <p className="text-red-300/60 text-sm" key={759003}>
              Some features may not be available. Using cached data where;
              possible.
            </p>
          </div>
        </motion.div>
      )}

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
        {[
          {
            title: "AI Accuracy",
            value: `${liveStats.aiAccuracy.toFixed(1)}%`,
            change: liveStats.accuracy24h - liveStats.aiAccuracy,
            icon: <Brain className="w-6 h-6" / key={674415}>,
            color: "from-cyan-500 to-blue-500",
            subtitle: "24h performance",
          },
          {
            title: "Total Profit",
            value: `$${liveStats.totalProfit.toLocaleString()}`,
            change: liveStats.profitToday,
            icon: <DollarSign className="w-6 h-6" / key={555051}>,
            color: "from-green-500 to-emerald-500",
            subtitle: "Today: +$" + liveStats.profitToday.toFixed(0),
          },
          {
            title: "Win Rate",
            value: `${liveStats.winRate.toFixed(1)}%`,
            change: 0,
            icon: <Target className="w-6 h-6" / key={637226}>,
            color: "from-purple-500 to-indigo-500",
            subtitle: "Historical performance",
          },
          {
            title: "Active Games",
            value: liveStats.activeGames.toString(),
            change: 0,
            icon: <Activity className="w-6 h-6" / key={861320}>,
            color: "from-orange-500 to-red-500",
            subtitle: `${liveStats.liveAlerts} arbitrage alerts`,
          },
        ].map((stat, index) => (
          <motion.div;
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:scale-105 transition-all duration-300"
           key={237663}>
            <div className="flex items-center justify-between mb-4" key={810034}>
              <div;
                className={`p-3 rounded-lg bg-gradient-to-r ${stat.color} bg-opacity-20`}
               key={108705}>
                {stat.icon}
              </div>
              {stat.change !== 0 && (
                <div;
                  className={`flex items-center gap-1 text-sm ${
                    stat.change  key={167011}> 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change > 0 ? (
                    <TrendingUp className="w-4 h-4" / key={673347}>
                  ) : (
                    <TrendingDown className="w-4 h-4" / key={272607}>
                  )}
                  {Math.abs(stat.change).toFixed(1)}
                </div>
              )}
            </div>
            <div key={241917}>
              <p className="text-2xl font-bold text-white mb-1" key={70656}>{stat.value}</p>
              <p className="text-gray-400 text-sm" key={516838}>{stat.title}</p>
              <p className="text-gray-500 text-xs mt-1" key={261009}>{stat.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div key={241917}>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2" key={115874}>
          <Zap className="w-5 h-5 text-yellow-400" / key={315149}>
          Quick Actions;
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" key={653876}>
          {quickActions.map((action) => (
            <motion.button;
              key={action.id}
              onClick={action.action}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300 text-left"
             key={75567}>
              <div className="flex items-center justify-between mb-3" key={56204}>
                <div;
                  className={`p-3 rounded-lg bg-gradient-to-r ${action.color} bg-opacity-20`}
                 key={856942}>
                  {action.icon}
                </div>
                {action.badge && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full" key={619534}>
                    {action.badge}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-white mb-1" key={891202}>{action.title}</h3>
              <p className="text-gray-400 text-sm" key={516838}>{action.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Live Games */}
      <div key={241917}>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2" key={115874}>
          <PlayCircle className="w-5 h-5 text-green-400" / key={629}>
          Live AI Picks;
          <span className="text-sm text-gray-400" key={257018}>
            ({liveGames.length} active)
          </span>
        </h2>

        {liveGames.length === 0 ? (
          <EmptyState;
            title="No active picks"
            description="Check back soon for new AI-generated opportunities"
            icon={<Target className="w-12 h-12" / key={507831}>}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" key={26124}>
            {liveGames.map((game) => (
              <motion.div;
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300"
               key={714602}>
                <div className="flex items-center justify-between mb-3" key={56204}>
                  <div className="flex items-center gap-2" key={100294}>
                    <div;
                      className={`w-2 h-2 rounded-full ${
                        game.status === "live"
                          ? "bg-red-500 animate-pulse"
                          : game.status === "upcoming"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                      }`}
                    / key={290197}>
                    <span className="text-sm text-gray-400 capitalize" key={609462}>
                      {game.status}
                    </span>
                  </div>
                  <span className="text-xs text-cyan-400" key={524278}>{game.sport}</span>
                </div>

                <h3 className="font-semibold text-white mb-2" key={816170}>{game.teams}</h3>
                <p className="text-sm text-gray-400 mb-3" key={255238}>{game.aiPick}</p>

                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center gap-4" key={782146}>
                    <div className="text-center" key={120206}>
                      <p className="text-xs text-gray-400" key={777449}>Confidence</p>
                      <p className="font-semibold text-cyan-400" key={157936}>
                        {game.confidence.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center" key={120206}>
                      <p className="text-xs text-gray-400" key={777449}>Edge</p>
                      <p;
                        className={`font-semibold ${
                          game.edge  key={528370}> 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {game.edge > 0 ? "+" : ""}
                        {game.edge.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="text-right" key={144468}>
                    <p className="text-xs text-gray-400" key={777449}>Time</p>
                    <p className="font-semibold text-white" key={380514}>{game.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl p-6" key={975426}>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2" key={115874}>
          <CheckCircle className="w-5 h-5 text-green-400" / key={94912}>
          System Status;
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
          <div className="text-center" key={120206}>
            <div className="flex items-center justify-center gap-2 mb-2" key={956367}>
              <div;
                className={`w-3 h-3 rounded-full ${isOffline ? "bg-red-500" : "bg-green-500"}`}
              / key={486105}>
              <span className="font-semibold text-white" key={905106}>API Status</span>
            </div>
            <p className="text-sm text-gray-400" key={965781}>
              {isOffline ? "Degraded" : "Operational"}
            </p>
          </div>

          <div className="text-center" key={120206}>
            <div className="flex items-center justify-center gap-2 mb-2" key={956367}>
              <div;
                className={`w-3 h-3 rounded-full ${connectionState === "connected" ? "bg-green-500" : "bg-yellow-500"}`}
              / key={685017}>
              <span className="font-semibold text-white" key={905106}>Real-time</span>
            </div>
            <p className="text-sm text-gray-400 capitalize" key={836809}>
              {connectionState}
            </p>
          </div>

          <div className="text-center" key={120206}>
            <div className="flex items-center justify-center gap-2 mb-2" key={956367}>
              <Brain className="w-5 h-5 text-cyan-400" / key={153680}>
              <span className="font-semibold text-white" key={905106}>AI Engines</span>
            </div>
            <p className="text-sm text-gray-400" key={965781}>
              {isOffline ? "0/6" : "6/6"} Active;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionUserFriendlyDashboard;
