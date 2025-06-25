import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Target,
  Gamepad2,
  Activity,
  Shield,
  BarChart,
} from "lucide-react";

// Enhanced imports for consolidated money-making interface
import { useQueryClient } from "@tanstack/react-query";
import { useWebSocket } from "../../hooks/useWebSocket";
import useUserStats from "../../hooks/useUserStats";
import { 
  initializeSettings, 
  getUserDisplayName, 
  getUserEmail 
} from "../../utils/userSettings";

// Money-making service imports
import RealTimeMoneyMakingService from "../../services/RealTimeMoneyMakingService";
import { analytics } from "../../utils/analytics";

// Core components
import OfflineIndicator from "../ui/OfflineIndicator";
import ApiErrorBoundary from "../ApiErrorBoundary";
import toast from "react-hot-toast";

// Enhanced money-making components
import UltimateOpportunityScanner from "./UltimateOpportunityScanner";
import ArbitrageHunter from "./ArbitrageHunter";
import EsportsMoneyMaker from "./EsportsMoneyMaker";
import PortfolioCommander from "./PortfolioCommander";
import RiskEngineInterface from "./RiskEngineInterface";
import AnalyticsCommandCenter from "./AnalyticsCommandCenter";

// Existing user-friendly components
import MoneyMakerPro from "./MoneyMakerPro";
import PrizePicksProNew from "./PrizePicksProNew";
import PropOllama from "./PropOllama";
import UserFriendlyDashboard from "./UserFriendlyDashboard";
import SimpleSettings from "./SimpleSettings";
import UserProfile from "./UserProfile";
import CleanAdvancedIntelligenceHub from "../intelligence/CleanAdvancedIntelligenceHub";

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: string;
  description: string;
  category: 'primary' | 'advanced' | 'tools' | 'settings';
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

// Enhanced health check with money-making metrics
const useEnhancedHealthCheck = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [accuracy, setAccuracy] = useState(85.0);
  const [opportunitiesFound, setOpportunitiesFound] = useState(0);
  const [systemLoad, setSystemLoad] = useState(0);

  useEffect(() => {
    const healthTimer = setInterval(async () => {
      try {
        setIsOnline(navigator.onLine);
        
        // Get real-time metrics from money-making service
        const moneyService = RealTimeMoneyMakingService.getInstance();
        const metrics = moneyService.getPerformanceMetrics();
        
        setOpportunitiesFound(metrics.totalOpportunitiesFound);
        setSystemLoad(Math.random() * 30 + 20); // Simulated system load
        
        // Track analytics
        analytics.track('system_health_check', {
          isOnline,
          accuracy,
          opportunities: opportunitiesFound,
          systemLoad
        });
      } catch (error) {
        setIsOnline(false);
        console.error('Health check failed:', error);
      }
    }, 30000);

    return () => clearInterval(healthTimer);
  }, [isOnline, accuracy, opportunitiesFound, systemLoad]);

  return { isOnline, accuracy, opportunitiesFound, systemLoad };
};

const EnhancedUserFriendlyApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const queryClient = useQueryClient();
  const { isOnline, accuracy, opportunitiesFound, systemLoad } = useEnhancedHealthCheck();
  const { userStats, backendHealth, isLoading, error } = useUserStats();

  // Enhanced user data with money-making metrics
  const userData: UserData = useMemo(
    () => ({
      name: getUserDisplayName() || "Ultimate Trader",
      email: getUserEmail() || "trader@a1betting.com",
      balance: userStats.balance,
      tier: "Elite Money Maker",
      winRate: userStats.winRate,
      totalProfit: userStats.totalProfit,
      activeOpportunities: opportunitiesFound,
      todayProfit: userStats.todayProfit || 0,
    }),
    [userStats, opportunitiesFound],
  );

  // Initialize enhanced settings and money-making service
  useEffect(() => {
    try {
      initializeSettings();
      
      // Initialize real-time money making service
      const moneyService = RealTimeMoneyMakingService.getInstance();
      moneyService.startRealTimeScanning({
        sports: ['nfl', 'nba', 'mlb', 'nhl', 'soccer', 'esports'],
        minConfidence: 0.7,
        maxExposure: 1000,
        scanIntervalMs: 30000,
        strategies: ['prizepicks', 'arbitrage', 'value_bet']
      });

      toast.success("🚀 Ultimate Money Making System Activated!", {
        duration: 3000,
        icon: "💰",
      });
      
      analytics.track('app_initialized', {
        user: userData.name,
        tier: userData.tier
      });
    } catch (error) {
      toast.error("⚠️ System initialization failed");
      console.error('Initialization error:', error);
    }
  }, [userData.name, userData.tier]);

  // Enhanced navigation with all money-making tools
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      // Primary money-making tools
      {
        id: "dashboard",
        label: "Command Center",
        icon: <Home className="w-5 h-5" />,
        component: UserFriendlyDashboard,
        badge: isOnline ? "🎯" : "⚡",
        description: "Real-time profit overview",
        category: 'primary'
      },
      {
        id: "opportunities",
        label: "Opportunity Scanner",
        icon: <Target className="w-5 h-5" />,
        component: UltimateOpportunityScanner,
        badge: opportunitiesFound > 0 ? `${opportunitiesFound}` : "🔍",
        description: "Live profit opportunities",
        category: 'primary'
      },
      {
        id: "arbitrage",
        label: "Arbitrage Hunter",
        icon: <Zap className="w-5 h-5" />,
        component: ArbitrageHunter,
        badge: "⚡",
        description: "Guaranteed profit detection",
        category: 'primary'
      },
      {
        id: "prizepicks",
        label: "PrizePicks Pro",
        icon: <Trophy className="w-5 h-5" />,
        component: PrizePicksProNew,
        badge: accuracy > 80 ? "🎯" : "📊",
        description: "Daily fantasy optimization",
        category: 'primary'
      },
      
      // Advanced tools
      {
        id: "esports",
        label: "Esports Engine",
        icon: <Gamepad2 className="w-5 h-5" />,
        component: EsportsMoneyMaker,
        badge: "🎮",
        description: "Esports betting opportunities",
        category: 'advanced'
      },
      {
        id: "moneymaker",
        label: "Money Maker Pro",
        icon: <DollarSign className="w-5 h-5" />,
        component: MoneyMakerPro,
        badge: "💰",
        description: "Advanced money making",
        category: 'advanced'
      },
      {
        id: "portfolio",
        label: "Portfolio Manager",
        icon: <BarChart className="w-5 h-5" />,
        component: PortfolioCommander,
        badge: "📈",
        description: "Portfolio optimization",
        category: 'advanced'
      },
      {
        id: "risk",
        label: "Risk Engine",
        icon: <Shield className="w-5 h-5" />,
        component: RiskEngineInterface,
        badge: "🛡️",
        description: "Risk management tools",
        category: 'advanced'
      },
      
      // Tools and analytics
      {
        id: "ai-oracle",
        label: "AI Oracle",
        icon: <Brain className="w-5 h-5" />,
        component: PropOllama,
        badge: "🤖",
        description: "AI prediction engine",
        category: 'tools'
      },
      {
        id: "analytics",
        label: "Analytics Center",
        icon: <BarChart3 className="w-5 h-5" />,
        component: AnalyticsCommandCenter,
        badge: "📊",
        description: "Performance analytics",
        category: 'tools'
      },
      {
        id: "intelligence",
        label: "Intelligence Hub",
        icon: <Activity className="w-5 h-5" />,
        component: CleanAdvancedIntelligenceHub,
        badge: isOnline ? "🧠" : "⚡",
        description: "Advanced intelligence",
        category: 'tools'
      },
      
      // Settings
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon className="w-5 h-5" />,
        component: SimpleSettings,
        badge: undefined,
        description: "System configuration",
        category: 'settings'
      },
      {
        id: "profile",
        label: "Profile",
        icon: <User className="w-5 h-5" />,
        component: UserProfile,
        badge: "👤",
        description: "Account management",
        category: 'settings'
      },
    ],
    [isOnline, accuracy, opportunitiesFound],
  );

  const activeComponent = useMemo(
    () =>
      navigationItems.find((item) => item.id === activeTab)?.component ||
      UserFriendlyDashboard,
    [navigationItems, activeTab],
  );

  const handleNavigate = useCallback(
    (page: string) => {
      setActiveTab(page);
      setSidebarOpen(false);
      
      const item = navigationItems.find((item) => item.id === page);
      toast.success(`Switched to ${item?.label || page}`, {
        duration: 2000,
        icon: "🎯",
      });
      
      analytics.track('navigation', { 
        from: activeTab, 
        to: page,
        category: item?.category 
      });
    },
    [navigationItems, activeTab],
  );

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const toggleAdvanced = useCallback(() => setShowAdvanced((prev) => !prev), []);

  const ActiveComponent = activeComponent;

  // Filter navigation items based on view mode
  const visibleItems = useMemo(() => {
    if (showAdvanced) return navigationItems;
    return navigationItems.filter(item => 
      item.category === 'primary' || item.category === 'settings'
    );
  }, [navigationItems, showAdvanced]);

  return (
    <ApiErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Enhanced header with system metrics */}
        <header className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-cyan-500/20">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo and brand */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-gray-800/60 rounded-lg transition-colors lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 text-cyan-400" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    A1BETTING ELITE
                  </h1>
                  <p className="text-xs text-gray-400">
                    Money Making System {isOnline ? "🚀 ACTIVE" : "⚡ Offline"}
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced system status */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/40 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-red-400"}`} />
                <span className="text-sm text-gray-300">
                  {accuracy.toFixed(1)}% Accuracy
                </span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/40 rounded-lg">
                <Target className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">
                  {opportunitiesFound} Opportunities
                </span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/40 rounded-lg">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">
                  ${userData.todayProfit.toFixed(2)} Today
                </span>
              </div>
            </div>

            {/* User info */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAdvanced}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  showAdvanced 
                    ? "bg-cyan-500/20 text-cyan-400" 
                    : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/40"
                }`}
              >
                {showAdvanced ? "Simple" : "Advanced"}
              </button>
              
              <div className="text-right">
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-gray-400">${userData.balance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex h-[calc(100vh-80px)]">
          {/* Enhanced sidebar */}
          <AnimatePresence>
            {(sidebarOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed lg:relative z-40 w-80 h-full bg-black/30 backdrop-blur-xl border-r border-cyan-500/20 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold text-cyan-400 mb-2">
                      Money Making Tools
                    </h2>
                    <div className="text-sm text-gray-400">
                      {showAdvanced ? "All Features" : "Essential Tools"}
                    </div>
                  </div>

                  <nav className="space-y-2">
                    {visibleItems.map((item) => (
                      <motion.button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === item.id
                            ? "bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
                            : "text-gray-300 hover:bg-gray-800/40 hover:text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex-shrink-0">{item.icon}</div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                        {item.badge && (
                          <div className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                            {item.badge}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ActiveComponent />
              </motion.div>
            </div>
          </main>
        </div>

        {/* Offline indicator */}
        {!isOnline && <OfflineIndicator show={!isOnline} service="Network Connection" />}
      </div>
    </ApiErrorBoundary>
  );
};

export default EnhancedUserFriendlyApp;
