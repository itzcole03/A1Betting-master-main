import { useState, useEffect, useMemo } from 'react.ts';
import React from 'react.ts';
import { AnimatePresence, motion } from 'framer-motion.ts';
import {
  BarChart3,
  Bell,
  Brain,
  DollarSign,
  Home,
  Menu,
  MessageCircle,
  Search,
  Settings as SettingsIcon,
  Trophy,
  TrendingUp,
  X,
  Filter,
  Clock,
  AlertCircle,
  CheckCircle,
  Target,
} from 'lucide-react.ts';
import { useQuery, useQueryClient } from '@tanstack/react-query.ts';
import { api } from '@/services/integrationService.ts';
import OfflineIndicator from '@/ui/OfflineIndicator.ts';
import ApiErrorBoundary from '@/ApiErrorBoundary.ts';
import { ultraAccuracyIntegrationService } from '@/services/UltraAccuracyIntegrationService.ts';
import {
  initializeSettings,
  getUserDisplayName,
  getUserEmail,
} from '@/utils/userSettings.ts';
import toast from 'react-hot-toast.ts';

// Import ULTIMATE BRAIN SYSTEM 🧠⚡
import {
  ultimateBrainCentralNervousSystem,
  type UltimateAccuracyResult,
  type SportsPredictionRequest,
} from '@/core/UltimateBrainCentralNervousSystem.ts';

// Import user-friendly components;
import MoneyMakerPro from './MoneyMakerPro.ts';
import PrizePicksPro from './PrizePicksPro.ts';
import PropOllama from './PropOllama.ts';
import UserFriendlyDashboard from './UserFriendlyDashboard.ts';
import SimpleSettings from './SimpleSettings.ts';

// Import existing components to integrate;
import { AdvancedIntelligenceHub } from '@/intelligence/AdvancedIntelligenceHub.ts';
import { UltraAccuracyDashboard } from '@/overview/UltraAccuracyOverview.ts';
import { AdminSettings } from '@/admin/AdminSettings.ts';

// Modal components;
import SearchModal from '@/modals/SearchModal.ts';
import NotificationsModal from '@/modals/NotificationsModal.ts';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<{ onNavigate?: (page: string) => void }>;
  badge?: string;
}

const UserFriendlyApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [isUltimateBrainInitialized, setIsUltimateBrainInitialized] =
    useState(false);

  // Navigation handler - Fixed to handle navigation properly;
  const handleNavigate = (page: string) => {
    setActiveTab(page);
    setSidebarOpen(false);
  };

  // Initialize user and Ultimate Brain with fallback;
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeSettings();

        // Initialize Ultimate Brain System in background;
        try {
          const initResult =
            await ultimateBrainCentralNervousSystem.initialize();
          setIsUltimateBrainInitialized(initResult.success);

          if (initResult.success) {
            toast.success("🧠 Ultimate Brain System Activated!");
          } else {
            // console statement removed
            setIsUltimateBrainInitialized(false);
          }
        } catch (brainError) {
          // console statement removed
          // Continue without Ultimate Brain - app should still work;
          setIsUltimateBrainInitialized(false);
        }

        setUserLoading(false);
      } catch (error) {
        // console statement removed
        setUserLoading(false);
      }
    };

    initializeApp();
  }, []);

  // Real-time Ultimate Brain health monitoring;
  const { data: ultimateBrainHealth } = useQuery({
    queryKey: ["ultimateBrainHealth"],
    queryFn: async () => {
      if (!isUltimateBrainInitialized) return null;

      try {
        const health =
          await ultimateBrainCentralNervousSystem.getSystemHealth();
        return health;
      } catch (error) {
        // console statement removed
        return null;
      }
    },
    refetchInterval: 30000,
    enabled: isUltimateBrainInitialized,
  });

  // Streamlined navigation for user-friendly main tools;
  const navigationItems: NavigationItem[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home className="w-5 h-5" / key={543832}>,
        component: UserFriendlyDashboard,
        badge: isUltimateBrainInitialized ? "🧠" : undefined,
      },
      {
        id: "prizepicks",
        label: "PrizePicks Pro",
        icon: <Trophy className="w-5 h-5" / key={798887}>,
        component: PrizePicksPro,
        badge: "🏆",
      },
      {
        id: "moneymaker",
        label: "Money Maker Pro",
        icon: <DollarSign className="w-5 h-5" / key={232495}>,
        component: MoneyMakerPro,
        badge: "💰",
      },
      {
        id: "propollama",
        label: "propOllama",
        icon: <Brain className="w-5 h-5" / key={358560}>,
        component: PropOllama,
        badge: "🤖",
      },
      {
        id: "intelligence",
        label: "Intelligence Hub",
        icon: <BarChart3 className="w-5 h-5" / key={878433}>,
        component: AdvancedIntelligenceHub,
        badge: isUltimateBrainInitialized ? "🧠" : "⚡",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <SettingsIcon className="w-5 h-5" / key={989077}>,
        component: SimpleSettings,
      },
    ],
    [isUltimateBrainInitialized, ultimateBrainHealth],
  );


  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center" key={745183}>
        <motion.div;
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
         key={6947}>
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" / key={841878}>
          <div className="text-cyan-400 text-xl font-semibold mb-2" key={941222}>
            Initializing Autonomous Intelligence...
          </div>
          <div className="text-gray-400" key={7335}>Loading advanced AI systems</div>
        </motion.div>
      </div>
    );
  }

  return (
    <ApiErrorBoundary key={860757}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden" key={168819}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden" key={122683}>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" / key={257348}>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" / key={607667}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse" / key={336199}>
        </div>

        {/* Header */}
        <header className="relative z-20 bg-black/20 backdrop-blur-xl border-b border-cyan-500/20 p-4" key={824727}>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center gap-4" key={782146}>
              <button;
                onClick={() = key={206350}> setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/40 transition-colors"
              >
                <Menu className="w-5 h-5" / key={408892}>
              </button>
              <div className="flex items-center gap-3" key={443099}>
                <div className="text-2xl" key={78407}>🧠</div>
                <div key={241917}>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text text-transparent" key={452237}>
                    A1BETTING AUTONOMOUS AI;
                  </h1>
                  <div className="text-xs text-gray-400" key={588004}>
                    {getUserDisplayName()} • {getUserEmail()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4" key={782146}>
              {/* Status Indicator */}
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-800/40 rounded-full" key={384305}>
                <div;
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    isUltimateBrainInitialized;
                      ? "bg-green-400"
                      : "bg-orange-400"
                  }`}
                / key={69958}>
                <span className="text-xs" key={944235}>
                  {isUltimateBrainInitialized ? "AI Active" : "Autonomous Mode"}
                </span>
              </div>

              <button;
                onClick={() = key={206350}> setSearchModalOpen(true)}
                className="p-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/40 transition-colors"
              >
                <Search className="w-5 h-5" / key={771302}>
              </button>
              <button;
                onClick={() = key={206350}> setNotificationsOpen(true)}
                className="p-2 rounded-lg bg-gray-800/40 hover:bg-gray-700/40 transition-colors relative"
              >
                <Bell className="w-5 h-5" / key={689128}>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" / key={273140}>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile overlay */}
        <AnimatePresence key={359944}>
          {sidebarOpen && (
            <motion.div;
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() = key={805083}> setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        <div className="flex" key={916621}>
          {/* Sidebar */}
          <motion.aside;
            initial={false}
            animate={{
              x: sidebarOpen ? 0 : "-100%",
            }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900/95 backdrop-blur-2xl border-r border-cyan-500/20 lg:relative lg:translate-x-0 lg:z-auto"
           key={21351}>
            <div className="flex flex-col h-full" key={46356}>
              <div className="p-6" key={935494}>
                <h2 className="text-lg font-semibold text-cyan-400 mb-6 flex items-center gap-2" key={201691}>
                  <Brain className="w-5 h-5" / key={358560}>
                  Navigation;
                </h2>
                <nav className="space-y-2" key={533789}>
                  {navigationItems.map((item) => (
                    <button;
                      key={item.id}
                      onClick={() = key={653385}> handleNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === item.id;
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400"
                          : "text-gray-300 hover:bg-gray-800/40 hover:text-white"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium" key={514486}>{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs" key={667085}>{item.badge}</span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Autonomous AI Status */}
              <div className="mt-auto p-6 border-t border-gray-800" key={148258}>
                <div className="bg-gray-800/40 rounded-lg p-4" key={502957}>
                  <div className="flex items-center gap-2 mb-2" key={988706}>
                    <Brain className="w-4 h-4 text-cyan-400" / key={248250}>
                    <span className="text-sm font-medium text-cyan-400" key={416695}>
                      Autonomous AI;
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 space-y-1" key={532392}>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Status:</span>
                      <span className="text-green-400" key={40612}>ACTIVE</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Mode:</span>
                      <span className="text-blue-400" key={510194}>
                        {isUltimateBrainInitialized ? "Enhanced" : "Autonomous"}
                      </span>
                    </div>
                    <div className="text-xs text-green-400 mt-2" key={464623}>
                      ✅ All tools AI-enhanced;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <main className="flex-1 min-h-screen lg:ml-0" key={250670}>
            <div className="p-6" key={935494}>
              <motion.div;
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
               key={40209}>
                <ActiveComponent onNavigate={handleNavigate} / key={232163}>
              </motion.div>
            </div>
          </main>
        </div>

        {/* Modals */}
        <SearchModal;
          isOpen={searchModalOpen}
          onClose={() = key={468189}> setSearchModalOpen(false)}
        />
        <NotificationsModal;
          isOpen={notificationsOpen}
          onClose={() = key={547180}> setNotificationsOpen(false)}
        />

        {/* Footer */}
        <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-cyan-500/20 p-6 mt-auto" key={21353}>
          <div className="text-center" key={120206}>
            <div className="text-cyan-400 bg-gradient-to-r from-cyan-400 via-green-400 to-blue-500 bg-clip-text font-bold mb-2 text-lg drop-shadow-2xl relative" key={567940}>
              <span className="relative z-10" key={763511}>
                A1BETTING AUTONOMOUS INTELLIGENCE;
              </span>
            </div>
            <div className="text-cyan-300/60 font-medium" key={183083}>
              © 2024 Autonomous Sports Intelligence Platform • AI-Enhanced;
              Tools • Real-time Analysis •{" "}
              {isUltimateBrainInitialized;
                ? "🧠 Enhanced Mode"
                : "⚡ Autonomous Mode"}
            </div>
          </div>
        </footer>
      </div>
    </ApiErrorBoundary>
  );
};

export default UserFriendlyApp;
