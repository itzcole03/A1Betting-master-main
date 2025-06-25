/**
 * Intelligent Merged Interface - A1BETTING
 * Combines the simplicity of SimpleUserInterface with the power of CyberModernSidebar
 * Progressive disclosure: Simple by default, advanced features available on demand
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  DollarSign,
  Target,
  BarChart3,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
  Activity,
  Bell,
  Search,
  Plus,
  MessageCircle,
  Zap,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

// Import components we want to merge
import CyberUltimateMoneyMaker from "../cyber/CyberUltimateMoneyMaker";
import CyberAnalyticsHub from "../cyber/CyberAnalyticsHub";
import EnhancedRevolutionaryInterface from "../revolutionary/EnhancedRevolutionaryInterface";
import UltraAdvancedMLDashboard from "../ml/UltraAdvancedMLDashboard";
import { UnifiedProfile } from "../profile/UnifiedProfile";
import UltimateSettingsPage from "../settings/UltimateSettingsPage";

// Import hooks
import { useMockUserProfile } from "../../hooks/UniversalHooks";

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: "ready" | "active" | "processing";
  component: React.ComponentType<any>;
  gradient: string;
  badge?: string;
}

interface DashboardStats {
  totalProfit: number;
  aiWinRate: number;
  liveAccuracy: number;
  activeAlerts: number;
}

const IntelligentMergedInterface: React.FC = () => {
  const [activeView, setActiveView] = useState<string>("dashboard");
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalProfit: 48390,
    aiWinRate: 94.7,
    liveAccuracy: 97.3,
    activeAlerts: 6,
  });

  // Fetch user data
  const { profile: userData, isLoading: isUserLoading } = useMockUserProfile();
  const user = userData || {
    name: "Elite Bettor",
    tier: "Quantum Pro",
    winRate: 94.7,
    totalProfit: 78450,
    accuracy: 96.8,
  };

  // Service definitions with both simple and advanced features
  const services: ServiceCard[] = [
    {
      id: "money-maker",
      title: "Money Maker Pro",
      description: "AI-powered profit generation with quantum enhancement",
      icon: <DollarSign className="w-8 h-8" />,
      status: "ready",
      component: CyberUltimateMoneyMaker,
      gradient: "from-emerald-500 to-green-600",
      badge: "CYBER",
    },
    {
      id: "ai-predictions",
      title: "AI Predictions",
      description: "Revolutionary AI-powered betting predictions",
      icon: <Brain className="w-8 h-8" />,
      status: "active",
      component: EnhancedRevolutionaryInterface,
      gradient: "from-purple-500 to-violet-600",
      badge: "ELITE",
    },
    {
      id: "analytics",
      title: "Analytics Hub",
      description: "Elite neural analytics and performance tracking",
      icon: <BarChart3 className="w-8 h-8" />,
      status: "ready",
      component: CyberAnalyticsHub,
      gradient: "from-blue-500 to-cyan-600",
      badge: "PRO",
    },
    {
      id: "ml-center",
      title: "ML Center",
      description: "Advanced machine learning model management",
      icon: <Activity className="w-8 h-8" />,
      status: "processing",
      component: UltraAdvancedMLDashboard,
      gradient: "from-orange-500 to-red-600",
      badge: "ML",
    },
    {
      id: "profile",
      title: "Profile",
      description: "User profile and betting statistics",
      icon: <User className="w-8 h-8" />,
      status: "ready",
      component: UnifiedProfile,
      gradient: "from-pink-500 to-rose-600",
    },
    {
      id: "settings",
      title: "Settings",
      description: "Quantum configuration portal",
      icon: <Settings className="w-8 h-8" />,
      status: "ready",
      component: UltimateSettingsPage,
      gradient: "from-gray-500 to-gray-700",
    },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalProfit: prev.totalProfit + Math.floor(Math.random() * 50),
        liveAccuracy: Math.min(
          99.9,
          prev.liveAccuracy + (Math.random() - 0.5) * 0.1,
        ),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const ActiveComponent = services.find((s) => s.id === activeView)?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Top Navigation Bar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="h-16 bg-gradient-to-r from-gray-900/95 to-black/95 border-b border-cyan-500/30 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between px-6 h-full">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-75 animate-pulse" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-black font-bold" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                A1BETTING
              </h1>
              <p className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                Elite Intelligence
              </p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-semibold">
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span className="text-xs text-cyan-400 font-semibold">
                47 Models Active
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setIsAdvancedMode(!isAdvancedMode)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                isAdvancedMode
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                  : "bg-gray-800/50 border-gray-700/50 text-gray-400"
              }`}
            >
              <span className="text-sm font-medium">
                {isAdvancedMode ? "🔧 Advanced" : "😊 Simple"}
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 bg-gray-800/80 border border-gray-700/50 rounded-lg"
            >
              {isSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Responsive */}
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 768) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 bg-gradient-to-b from-gray-900/95 to-black/95 border-r border-cyan-500/20 backdrop-blur-xl overflow-y-auto"
            >
              {/* User Stats */}
              <div className="p-6 border-b border-cyan-500/20">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-3 rounded-lg bg-gradient-to-b from-emerald-500/20 to-green-600/20 border border-emerald-500/30"
                  >
                    <p className="text-lg font-bold text-emerald-400">
                      {user?.winRate || 0}%
                    </p>
                    <p className="text-xs text-emerald-300 font-medium">
                      Win Rate
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-3 rounded-lg bg-gradient-to-b from-cyan-500/20 to-blue-600/20 border border-cyan-500/30"
                  >
                    <p className="text-lg font-bold text-cyan-400">
                      ${((user?.totalProfit || 0) / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-cyan-300 font-medium">Profit</p>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-3 rounded-lg bg-gradient-to-b from-purple-500/20 to-violet-600/20 border border-purple-500/30"
                  >
                    <p className="text-lg font-bold text-purple-400">
                      {user?.accuracy || 0}%
                    </p>
                    <p className="text-xs text-purple-300 font-medium">
                      Accuracy
                    </p>
                  </motion.div>
                </div>

                {/* User Profile */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-75" />
                    <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {(user?.name || "U")
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {user?.name || "Loading..."}
                    </p>
                    <p className="text-xs text-cyan-400 font-medium">
                      {user?.tier || "Basic"} Member
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4, scale: 1.02 }}
                      onClick={() => {
                        setActiveView(service.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-300 group ${
                        activeView === service.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20"
                          : "text-gray-300 hover:bg-gradient-to-r hover:from-white/10 hover:to-cyan-500/10 hover:text-cyan-300 hover:border hover:border-cyan-500/30"
                      }`}
                    >
                      <div
                        className={`${activeView === service.id ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"} transition-colors`}
                      >
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-sm">
                          {service.title}
                        </span>
                        {isAdvancedMode && (
                          <p className="text-xs text-gray-400 mt-1">
                            {service.description}
                          </p>
                        )}
                      </div>
                      {service.badge && (
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-black text-xs font-bold rounded-full"
                        >
                          {service.badge}
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,255,165,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,255,165,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

          <div className="relative z-10 p-6">
            {activeView === "dashboard" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
              >
                {/* Dashboard Header */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    Elite Sports Intelligence
                  </h2>
                  <p className="text-xl text-gray-300 mb-4">
                    Real-time AI-powered sports analysis with quantum
                    enhancement
                  </p>

                  {/* Status Chips */}
                  <div className="flex justify-center gap-3 mb-6">
                    <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                      <span className="text-emerald-400 font-semibold">
                        All Systems Online
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
                      <span className="text-blue-400 font-semibold">
                        25 Live Games
                      </span>
                    </div>
                    <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full">
                      <span className="text-purple-400 font-semibold">
                        Quantum Processing Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-emerald-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-emerald-500/20 rounded-full">
                        <DollarSign className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-400">
                          ${stats.totalProfit.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-400">
                          Total Profit (Today)
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full inline-block">
                      +$190 (9%)
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-500/20 rounded-full">
                        <Target className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-400">
                          {stats.aiWinRate}%
                        </p>
                        <p className="text-sm text-gray-400">AI Win Rate</p>
                      </div>
                    </div>
                    <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full inline-block">
                      +0.3% (24h)
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-purple-500/20 rounded-full">
                        <TrendingUp className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-400">
                          {stats.liveAccuracy.toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-400">Live Accuracy</p>
                      </div>
                    </div>
                    <div className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full inline-block">
                      +0.2% (1h)
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-orange-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-orange-500/20 rounded-full">
                        <Zap className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-400">
                          {stats.activeAlerts}
                        </p>
                        <p className="text-sm text-gray-400">Live Alerts</p>
                      </div>
                    </div>
                    <div className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full inline-block">
                      +3 new
                    </div>
                  </motion.div>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((s) => s.id !== "settings")
                    .map((service, index) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        onClick={() => setActiveView(service.id)}
                        className={`p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-2 border-gray-700/50 hover:border-cyan-500/50 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-br ${service.gradient} bg-opacity-10`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`p-3 bg-gradient-to-br ${service.gradient} bg-opacity-20 rounded-full`}
                          >
                            {service.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white">
                              {service.title}
                            </h3>
                            {service.badge && (
                              <span
                                className={`inline-block px-2 py-1 bg-gradient-to-r ${service.gradient} text-black text-xs font-bold rounded-full mt-1`}
                              >
                                {service.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                          {service.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full py-3 bg-gradient-to-r ${service.gradient} text-black font-bold rounded-lg transition-all duration-300 hover:shadow-lg`}
                        >
                          GET STARTED →
                        </motion.button>
                      </motion.div>
                    ))}
                </div>

                {/* Live Games Footer */}
                <div className="text-center mt-8 p-6 bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-cyan-500/20 rounded-xl">
                  <h3 className="text-xl font-bold text-cyan-400 mb-2">
                    🔴 Live Games Analysis
                  </h3>
                  <p className="text-gray-300">
                    AI is actively monitoring 25 live games and processing
                    real-time opportunities
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {ActiveComponent && (
                  <ActiveComponent onNavigate={setActiveView} />
                )}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default IntelligentMergedInterface;
