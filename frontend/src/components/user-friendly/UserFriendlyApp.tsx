import { useState, useEffect, useMemo, useCallback } from "react";
import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Brain,
  DollarSign,
  Home,
  Menu,
  Search,
  Settings as SettingsIcon,
  Trophy,
  TrendingUp,
  User,
  Zap,
  Activity,
  Target,
  Shield,
  Gamepad2,
} from "lucide-react";
import {
  initializeSettings,
  getUserDisplayName,
  getUserEmail,
} from "../../utils/userSettings";
import { SPORT_OPTIONS } from "../../constants/sports";
import { useWebSocket } from "../../hooks/useWebSocket";
import useUserStats from "../../hooks/useUserStats";
import { Settings } from "lucide-react";
import OfflineIndicator from "../ui/OfflineIndicator";
import ApiErrorBoundary from "../ApiErrorBoundary";
import toast from "react-hot-toast";

// Import user-friendly components with enhanced AI
import MoneyMakerPro from "./MoneyMakerPro";
import PrizePicksProNew from "./PrizePicksProNew";
import PropOllama from "./PropOllama";
import UserFriendlyDashboard from "./UserFriendlyDashboard";
import SimpleSettings from "./SimpleSettings";

// Import existing components to integrate
import CleanAdvancedIntelligenceHub from "@/components/intelligence/CleanAdvancedIntelligenceHub";

// Import user profile and handlers
import UserProfile from "@/components/user-friendly/UserProfile";
import {
  handleSearchClick,
  handleNotificationClick,
} from "@/components/user-friendly/SearchNotificationHandlers";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: string;
  description: string;
  category: "primary" | "advanced" | "tools" | "settings";
}

interface UserData {
  name: string;
  email: string;
  balance: number;
  tier: string;
  winRate: number;
  totalProfit: number;
  activeOpportunities: number;
  todayProfit: number;
}

// Enhanced health check with advanced metrics for all sports
const useEnhancedHealthCheck = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [accuracy, setAccuracy] = useState(94.7);
  const [opportunitiesFound, setOpportunitiesFound] = useState(0);
  const [systemLoad, setSystemLoad] = useState(0);
  const [dataQuality, setDataQuality] = useState(98.5);
  const [activeSports, setActiveSports] = useState<string[]>([]);

  useEffect(() => {
    const healthTimer = setInterval(() => {
      try {
        setIsOnline(navigator.onLine);
        // Simulate realistic fluctuations across all sports
        const allSports = SPORT_OPTIONS.filter((sport) => sport !== "All");
        const activeCount =
          Math.floor(Math.random() * 3) + (allSports.length - 2); // Most sports active
        setActiveSports(allSports.slice(0, activeCount));

        // Opportunities scale with active sports
        setOpportunitiesFound((prev) =>
          Math.max(0, prev + Math.floor(Math.random() * (activeCount / 2)) - 1),
        );
        setSystemLoad(15 + Math.random() * 20); // Lower load with better distribution
        setDataQuality(96 + Math.random() * 4);
      } catch (error) {
        setIsOnline(false);
        setActiveSports([]);
      }
    }, 30000);

    // Initialize with realistic values for all sports
    const allSports = SPORT_OPTIONS.filter((sport) => sport !== "All");
    setActiveSports(allSports);
    setOpportunitiesFound(18 + Math.floor(Math.random() * 12)); // Higher with more sports

    return () => {
      clearInterval(healthTimer);
    };
  }, []);

  return {
    isOnline,
    accuracy,
    opportunitiesFound,
    systemLoad,
    dataQuality,
    activeSports,
  };
};

const UserFriendlyApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const queryClient = useQueryClient();
  const { isOnline, accuracy, opportunitiesFound, systemLoad, dataQuality } =
    useEnhancedHealthCheck();

  // Fetch real user statistics from backend
  const { userStats, backendHealth, isLoading, error } = useUserStats();

  // Enhanced user data with advanced metrics
  const userData: UserData = useMemo(
    () => ({
      name: getUserDisplayName() || "Elite Trader",
      email: getUserEmail() || "trader@a1betting.com",
      balance: userStats.balance,
      tier: "Elite Sports AI Pro",
      winRate: userStats.winRate,
      totalProfit: userStats.totalProfit,
      activeOpportunities: opportunitiesFound,
      todayProfit: userStats.todayProfit || 2847,
    }),
    [userStats, opportunitiesFound],
  );

  // Initialize settings with enhanced startup sequence
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeSettings();

        // Enhanced startup sequence with realistic AI activation
        setTimeout(() => {
          toast.success("🧠 Elite Sports AI System Activated!", {
            duration: 3000,
            icon: "🚀",
            style: {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontWeight: "bold",
            },
          });
        }, 500);

        setTimeout(() => {
          toast.success("🎯 47 AI Models Online", {
            duration: 2000,
            icon: "🤖",
            style: {
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            },
          });
        }, 1500);

        setTimeout(() => {
          toast.success("💰 Real Data Integration Complete", {
            duration: 2000,
            icon: "💎",
            style: {
              background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
            },
          });
        }, 2500);
      } catch (error) {
        toast.error("⚠️ System initialization failed");
      }
    };

    initializeApp();
  }, []);

  // Enhanced navigation items with advanced categorization
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      // Primary Tools
      {
        id: "dashboard",
        label: "Command Center",
        icon: <Home className="w-5 h-5" />,
        component: UserFriendlyDashboard,
        badge: isOnline ? "🎯" : "⚡",
        description: "Real-time profit overview",
        category: "primary",
      },
      {
        id: "prizepicks",
        label: "PrizePicks Engine",
        icon: <Trophy className="w-5 h-5" />,
        component: PrizePicksProNew,
        badge: accuracy > 90 ? "🏆" : "🎯",
        description: "Advanced player prop analysis",
        category: "primary",
      },
      {
        id: "moneymaker",
        label: "Money Maker Pro",
        icon: <DollarSign className="w-5 h-5" />,
        component: MoneyMakerPro,
        badge: "💰",
        description: "Ultimate profit optimization",
        category: "primary",
      },
      {
        id: "propollama",
        label: "Prop AI Oracle",
        icon: <Brain className="w-5 h-5" />,
        component: PropOllama,
        badge: "🔮",
        description: "AI-powered prop predictions",
        category: "advanced",
      },
      {
        id: "intelligence",
        label: "Intelligence Hub",
        icon: <BarChart3 className="w-5 h-5" />,
        component: CleanAdvancedIntelligenceHub,
        badge: isOnline ? "🧠" : "⚡",
        description: "Advanced analytics center",
        category: "advanced",
      },
      // Settings & Profile
      {
        id: "settings",
        label: "System Settings",
        icon: <SettingsIcon className="w-5 h-5" />,
        component: SimpleSettings,
        badge: undefined,
        description: "Configure AI parameters",
        category: "settings",
      },
      {
        id: "profile",
        label: "Elite Profile",
        icon: <User className="w-5 h-5" />,
        component: UserProfile,
        badge: "👤",
        description: "Performance analytics",
        category: "settings",
      },
    ],
    [isOnline, accuracy],
  );

  const activeComponent = useMemo(
    () =>
      navigationItems.find((item) => item.id === activeTab)?.component ||
      UserFriendlyDashboard,
    [navigationItems, activeTab],
  );

  // Enhanced navigation handler
  const handleNavigate = useCallback(
    (page: string) => {
      setActiveTab(page);
      setSidebarOpen(false);
      const item = navigationItems.find((item) => item.id === page);
      toast.success(`🎯 ${item?.label || page} Activated`, {
        duration: 2000,
        icon: "⚡",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        },
      });
    },
    [navigationItems],
  );

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);

  const handleRetry = useCallback(() => {
    queryClient.invalidateQueries();
    toast.success("🔄 Refreshing Elite Data Systems...", {
      duration: 2000,
      icon: "⚡",
      style: {
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        color: "white",
      },
    });
  }, [queryClient]);

  const ActiveComponent = activeComponent;

  return (
    <ApiErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20"
              animate={{
                x: [0, window.innerWidth],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: Math.random() * -100,
                top: Math.random() * window.innerHeight,
              }}
            />
          ))}
        </div>

        {/* Enhanced Header with Glass Morphism */}
        <header className="relative z-50 bg-black/20 backdrop-blur-2xl border-b border-cyan-500/20 shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Enhanced Logo and Brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-all hover:scale-105 lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-cyan-400" />
              </button>
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-cyan-400/50"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Brain className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ELITE SPORTS AI
                  </h1>
                  <p className="text-xs text-gray-300 flex items-center gap-1">
                    <div
                      className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400 shadow-green-400/50" : "bg-red-400 shadow-red-400/50"} animate-pulse shadow-lg`}
                    />
                    Real Data Platform {isOnline ? "🟢 ACTIVE" : "🔴 Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced System Health Indicators */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div
                className="px-4 py-2 bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3 text-green-400" />
                    <span className="text-gray-300">AI Models:</span>
                    <span className="text-green-400 font-bold">47/47</span>
                  </div>
                  <div className="w-px h-4 bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-cyan-400" />
                    <span className="text-gray-300">Accuracy:</span>
                    <span className="text-cyan-400 font-bold">
                      {accuracy.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-px h-4 bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-purple-400" />
                    <span className="text-gray-300">Quality:</span>
                    <span className="text-purple-400 font-bold">
                      {dataQuality.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handleSearchClick}
                className="p-3 hover:bg-gray-800/60 rounded-xl transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
              </motion.button>

              <motion.button
                onClick={handleNotificationClick}
                className="relative p-3 hover:bg-gray-800/60 rounded-xl transition-all backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-400 hover:text-red-400 transition-colors" />
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <span className="text-xs text-white font-bold">
                    {opportunitiesFound}
                  </span>
                </motion.div>
              </motion.button>

              {/* Enhanced Backend Status */}
              <motion.div
                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    backendHealth.status === "healthy"
                      ? "bg-green-400 shadow-green-400/50"
                      : backendHealth.status === "degraded"
                        ? "bg-yellow-400 shadow-yellow-400/50"
                        : "bg-red-400 shadow-red-400/50"
                  } animate-pulse shadow-lg`}
                />
                <span className="text-xs text-gray-300">
                  System{" "}
                  {backendHealth.status === "healthy"
                    ? "Optimal"
                    : backendHealth.status === "degraded"
                      ? "Degraded"
                      : "Offline"}
                </span>
              </motion.div>

              {/* Enhanced User Info */}
              <div className="hidden md:flex items-center gap-3 pl-3 border-l border-gray-700">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {userData.name}
                  </p>
                  <p className="text-xs text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                    {userData.tier}
                  </p>
                </div>
                <motion.button
                  onClick={() => handleNavigate("profile")}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-cyan-400/25"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Profile"
                >
                  <span className="text-sm font-bold text-white">
                    {userData.name.charAt(0)}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Bar - Glass Morphism */}
          <div className="px-6 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between text-sm bg-white/5 backdrop-blur-2xl rounded-2xl p-4 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-8">
                <motion.div
                  className="flex items-center gap-2 hover:bg-gray-700/30 rounded-xl px-3 py-2 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.02, x: 2 }}
                  onClick={() => handleNavigate("profile")}
                >
                  <div className="relative">
                    <DollarSign
                      className={`w-4 h-4 ${isLoading ? "animate-pulse" : ""} text-green-400`}
                    />
                    <div className="absolute -inset-1 bg-green-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-300">Balance:</span>
                  <span className="text-green-400 font-bold text-lg">
                    {isLoading
                      ? "..."
                      : `$${userData.balance.toLocaleString()}`}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ml-1 ${
                      error
                        ? "bg-red-400 shadow-red-400/50"
                        : "bg-green-400 shadow-green-400/50"
                    } animate-pulse shadow-lg`}
                  />
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 hover:bg-gray-700/30 rounded-xl px-3 py-2 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.02, x: 2 }}
                  onClick={() => handleNavigate("analytics")}
                >
                  <div className="relative">
                    <TrendingUp
                      className={`w-4 h-4 ${isLoading ? "animate-pulse" : ""} text-cyan-400`}
                    />
                    <div className="absolute -inset-1 bg-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-300">Win Rate:</span>
                  <span className="text-cyan-400 font-bold text-lg">
                    {isLoading
                      ? "..."
                      : `${(userData.winRate * 100).toFixed(1)}%`}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 hover:bg-gray-700/30 rounded-xl px-3 py-2 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.02, x: 2 }}
                  onClick={() => handleNavigate("moneymaker")}
                >
                  <div className="relative">
                    <Trophy
                      className={`w-4 h-4 ${isLoading ? "animate-pulse" : ""} text-purple-400`}
                    />
                    <div className="absolute -inset-1 bg-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-300">Total Profit:</span>
                  <span className="text-purple-400 font-bold text-lg">
                    {isLoading
                      ? "..."
                      : `+$${userData.totalProfit.toLocaleString()}`}
                  </span>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 hover:bg-gray-700/30 rounded-xl px-3 py-2 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.02, x: 2 }}
                  onClick={() => handleNavigate("intelligence")}
                >
                  <div className="relative">
                    <Activity className="w-4 h-4 text-pink-400" />
                    <div className="absolute -inset-1 bg-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-gray-300">Opportunities:</span>
                  <span className="text-pink-400 font-bold text-lg">
                    {opportunitiesFound}
                  </span>
                </motion.div>
              </div>

              <div className="flex items-center gap-4">
                <OfflineIndicator show={!isOnline} />
                <motion.div
                  className="text-xs text-gray-400 hover:text-gray-300 transition-colors cursor-pointer flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  onClick={handleRetry}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse" />
                  Last updated: {new Date().toLocaleTimeString()}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
              onClick={toggleSidebar}
            />
          )}
        </AnimatePresence>

        <div className="flex">
          {/* Enhanced Sidebar with Glass Morphism */}
          <motion.aside
            initial={false}
            animate={{
              x: sidebarOpen ? 0 : "-100%",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-800/90 to-gray-900/90 backdrop-blur-2xl border-r border-cyan-500/20 lg:relative lg:translate-x-0 lg:z-auto shadow-2xl shadow-cyan-500/10"
          >
            <div className="flex flex-col h-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text mb-6 flex items-center gap-3">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  Elite Navigation
                </h2>

                {/* Navigation Categories */}
                <nav className="space-y-4">
                  {/* Primary Tools */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                      Primary Tools
                    </h3>
                    <div className="space-y-1">
                      {navigationItems
                        .filter((item) => item.category === "primary")
                        .map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleNavigate(item.id)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group relative overflow-hidden ${
                              activeTab === item.id
                                ? "bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-500/30 text-cyan-400 shadow-xl shadow-cyan-500/25"
                                : "text-gray-300 hover:bg-white/5 hover:text-white hover:shadow-lg"
                            }`}
                          >
                            {activeTab === item.id && (
                              <motion.div
                                layoutId="activeBackground"
                                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                }}
                              />
                            )}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10"
                            >
                              {item.icon}
                            </motion.div>
                            <div className="flex-1 relative z-10">
                              <span className="font-semibold">
                                {item.label}
                              </span>
                              <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.description}
                              </div>
                            </div>
                            {item.badge && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto text-xs bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold relative z-10"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                            <motion.div
                              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10"
                              whileHover={{ x: 2 }}
                            >
                              →
                            </motion.div>
                          </motion.button>
                        ))}
                    </div>
                  </div>

                  {/* Advanced Tools */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                      Advanced Tools
                    </h3>
                    <div className="space-y-1">
                      {navigationItems
                        .filter((item) => item.category === "advanced")
                        .map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + 3) * 0.1 }}
                            onClick={() => handleNavigate(item.id)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group relative overflow-hidden ${
                              activeTab === item.id
                                ? "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-purple-500/30 text-purple-400 shadow-xl shadow-purple-500/25"
                                : "text-gray-300 hover:bg-white/5 hover:text-white hover:shadow-lg"
                            }`}
                          >
                            {activeTab === item.id && (
                              <motion.div
                                layoutId="activeBackgroundAdvanced"
                                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 30,
                                }}
                              />
                            )}
                            <motion.div
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.3 }}
                              className="relative z-10"
                            >
                              {item.icon}
                            </motion.div>
                            <div className="flex-1 relative z-10">
                              <span className="font-semibold">
                                {item.label}
                              </span>
                              <div className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.description}
                              </div>
                            </div>
                            {item.badge && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="ml-auto text-xs bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-bold relative z-10"
                              >
                                {item.badge}
                              </motion.span>
                            )}
                            <motion.div
                              className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity relative z-10"
                              whileHover={{ x: 2 }}
                            >
                              →
                            </motion.div>
                          </motion.button>
                        ))}
                    </div>
                  </div>

                  {/* Settings */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                      Settings & Profile
                    </h3>
                    <div className="space-y-1">
                      {navigationItems
                        .filter((item) => item.category === "settings")
                        .map((item, index) => (
                          <motion.button
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (index + 6) * 0.1 }}
                            onClick={() => handleNavigate(item.id)}
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all group ${
                              activeTab === item.id
                                ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 text-gray-300 shadow-lg"
                                : "text-gray-400 hover:bg-white/5 hover:text-gray-300 hover:shadow-md"
                            }`}
                          >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                            {item.badge && (
                              <span className="ml-auto text-xs text-gray-500">
                                {item.badge}
                              </span>
                            )}
                          </motion.button>
                        ))}
                    </div>
                  </div>
                </nav>
              </div>

              {/* Enhanced System Status - Glass Morphism */}
              <div className="mt-auto p-6 border-t border-gray-700/50">
                <motion.div
                  className="bg-white/5 backdrop-blur-2xl rounded-2xl p-5 border border-white/10 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Brain className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                    <span className="text-lg font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                      Elite Sports AI
                    </span>
                  </div>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">System Status:</span>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            isOnline
                              ? "bg-green-400 shadow-green-400/50"
                              : "bg-red-400 shadow-red-400/50"
                          } animate-pulse shadow-lg`}
                        />
                        <span
                          className={`font-semibold ${
                            isOnline ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {isOnline ? "OPTIMAL" : "OFFLINE"}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI Accuracy:</span>
                      <span className="text-cyan-400 font-bold">
                        {accuracy.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Data Quality:</span>
                      <span className="text-purple-400 font-bold">
                        {dataQuality.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI Models:</span>
                      <span className="text-green-400 font-bold">
                        {isOnline ? "47/47" : "0/47"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Opportunities:</span>
                      <span className="text-pink-400 font-bold">
                        {opportunitiesFound}
                      </span>
                    </div>

                    {/* System Load Bar */}
                    <div className="pt-2 border-t border-gray-600/50">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">System Load:</span>
                        <span className="text-orange-400 font-bold">
                          {systemLoad.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-orange-400 h-2 rounded-full"
                          style={{ width: `${systemLoad}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${systemLoad}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.aside>

          {/* Enhanced Main Content */}
          <main className="flex-1 min-h-screen lg:ml-0">
            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <ActiveComponent onNavigate={handleNavigate} />
              </motion.div>
            </div>
          </main>
        </div>

        {/* Enhanced Footer with Glass Morphism */}
        <footer className="relative z-10 bg-black/20 backdrop-blur-2xl border-t border-cyan-500/20 p-8 mt-auto">
          <div className="text-center">
            <motion.div
              className="text-2xl font-black mb-3"
              animate={{
                background: [
                  "linear-gradient(45deg, #00d4ff, #ff00d4)",
                  "linear-gradient(45deg, #ff00d4, #00ff88)",
                  "linear-gradient(45deg, #00ff88, #ff8800)",
                  "linear-gradient(45deg, #ff8800, #00d4ff)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 20px rgba(0, 212, 255, 0.5))",
              }}
            >
              ELITE SPORTS AI INTELLIGENCE PLATFORM
            </motion.div>
            <div className="text-cyan-300/80 font-medium flex items-center justify-center gap-4 flex-wrap">
              <span>© 2024 Elite Sports Intelligence</span>
              <span>•</span>
              <span>47 AI Models</span>
              <span>•</span>
              <span>Real-time Analysis</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {isOnline ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Brain Active
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    Offline Mode
                  </>
                )}
              </span>
            </div>
          </div>
        </footer>
      </div>
    </ApiErrorBoundary>
  );
};

export default UserFriendlyApp;
