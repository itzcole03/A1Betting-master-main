import { AnimatePresence, motion } from 'framer-motion.ts';
import { Menu, X } from 'lucide-react.ts';
import * as React from 'react.ts';
import { useState, useCallback, Suspense } from 'react.ts';
import { useAnimatedValue } from '@/hooks/useAnimatedValue.ts';
import { usePrizePicksLiveData } from '@/hooks/usePrizePicksLiveData.ts';
import { useStrategyEngineData } from '@/hooks/useStrategyEngineData.ts';
import { PerformanceAnalyticsDashboard } from '@/analytics/PerformanceAnalyticsDashboard.ts';
import { MarketAnalysisDashboard } from '@/MarketAnalysisDashboard.ts';
import { ArbitrageOpportunities } from '@/ArbitrageOpportunities.ts';
import { PrizePicksEdgeDisplay } from '@/betting/PrizePicksEdgeDisplay.ts';
import { SmartLineupBuilder } from '@/lineup/SmartLineupBuilder.ts';
import MLFactorViz from '@/MLFactorViz.ts';
import { UnifiedMoneyMaker } from '@/money-maker/UnifiedMoneyMaker.ts';
import { QuantumPredictionsInterface } from '@/prediction/QuantumPredictionsInterface.ts';
import { UnifiedProfile } from '@/profile/UnifiedProfile.ts';
import { UnifiedSettingsInterface } from '@/settings/UnifiedSettingsInterface.ts';
import UnifiedStrategyEngineDisplay from '@/strategy/UnifiedStrategyEngineDisplay.ts';
import { Badge } from '@/ui/badge.ts';
import { BetSimulationTool } from '@/ui/BetSimulationTool.ts';
import { Card } from '@/ui/card.ts';
import { FeatureFlagIndicators } from '@/ui/FeatureFlagIndicators.ts';
import { ServiceStatusIndicators } from '@/ui/ServiceStatusIndicators.ts';
import { Skeleton } from '@/ui/Skeleton.ts';
import { Toast } from '@/ui/UnifiedUI.ts';
import { HeroSection } from './HeroSection.ts';
import { LiveGamesDisplay } from './LiveGamesDisplay.ts';
import { RealTimePredictions } from './RealTimePredictions.ts';
import { DataSourcesPanel } from './DataSourcesPanel.ts';

// ============================================================================
// TYPES & INTERFACES;
// ============================================================================

interface TabConfig {
  key: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any key={295429}>;
  props?: Record<string, any key={989582}>;
  requiresAuth?: boolean;
  isPremium?: boolean;
}

interface ActivityItem {
  id: string;
  type: "bet" | "prediction" | "analysis";
  description: string;
  amount?: number;
  odds?: number;
  timestamp: number;
  status: "success" | "pending" | "error";
}

interface DashboardMetrics {
  winRate: number;
  roi: number;
  profitLoss: number;
  totalBets: number;
  activePredictions: number;
}

// ============================================================================
// TAB COMPONENTS & CONFIGURATION;
// ============================================================================

// Overview tab content;
const OverviewTab: React.FC<{
  metrics: DashboardMetrics;
  recentActivity: ActivityItem[];
  winRate: any;
  roi: any;
  profitLoss: any;
  dataQuality: number;
}> = ({ metrics, recentActivity, winRate, roi, profitLoss, dataQuality }) => (
  <>
    <HeroSection;
      connectedSources={50}
      totalSources={60}
      gamesCount={20}
      playersCount={100}
      dataQuality={0.85}
      dataReliability={0.9}
    / key={545141}>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8" key={472228}>
      <Card className="glass-card bg-gradient-to-br from-blue-500/20 to-purple-500/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" key={129701}>
        <div className="p-6" key={935494}>
          <div className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2" key={200913}>
            Win Rate;
          </div>
          <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-300" key={126638}>
            {winRate.value.toFixed(1)}%
          </div>
          <div className="text-sm text-blue-500/70 mt-1" key={739048}>+2.3% this week</div>
        </div>
      </Card>

      <Card className="glass-card bg-gradient-to-br from-green-500/20 to-teal-500/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" key={538585}>
        <div className="p-6" key={935494}>
          <div className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2" key={826167}>
            ROI;
          </div>
          <div className="text-3xl font-extrabold text-green-600 dark:text-green-300" key={640329}>
            {roi.value.toFixed(1)}%
          </div>
          <div className="text-sm text-green-500/70 mt-1" key={255335}>+5.1% this month</div>
        </div>
      </Card>

      <Card className="glass-card bg-gradient-to-br from-yellow-500/20 to-orange-500/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" key={618650}>
        <div className="p-6" key={935494}>
          <div className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2" key={438975}>
            Profit/Loss;
          </div>
          <div;
            className={`text-3xl font-extrabold ${profitLoss.value  key={7700}>= 0 ? "text-green-500" : "text-red-500"}`}
          >
            ${profitLoss.value.toFixed(2)}
          </div>
          <div className="text-sm text-yellow-600/70 mt-1" key={429214}>Last 30 days</div>
        </div>
      </Card>

      <Card className="glass-card bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-0 shadow-xl hover:shadow-2xl transition-all duration-300" key={647603}>
        <div className="p-6" key={935494}>
          <div className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-2" key={260677}>
            Active Bets;
          </div>
          <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-300" key={793055}>
            {metrics.activePredictions}
          </div>
          <div className="text-sm text-purple-500/70 mt-1" key={521471}>
            Currently tracking;
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8" key={563408}>
      <DataSourcesPanel;
        connectedSources={metrics.activePredictions}
        totalSources={15}
      / key={603072}>
      <div className="space-y-6" key={501869}>
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg" key={65136}>
          <h3 className="text-lg font-bold mb-4 dark:text-white" key={705349}>
            Real-Time System Status;
          </h3>
          <div className="space-y-3" key={186520}>
            <div className="flex justify-between" key={588832}>
              <span className="text-gray-600 dark:text-gray-400" key={517223}>
                Connection Status:
              </span>
              <span className="font-medium dark:text-white" key={88816}>Connected</span>
            </div>
            <div className="flex justify-between" key={588832}>
              <span className="text-gray-600 dark:text-gray-400" key={517223}>
                Data Quality:
              </span>
              <span className="font-medium text-green-600" key={6962}>
                {(dataQuality * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between" key={588832}>
              <span className="text-gray-600 dark:text-gray-400" key={517223}>
                Active Predictions:
              </span>
              <span className="font-medium text-purple-600" key={892758}>
                {metrics.activePredictions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8" key={462618}>
      <LiveGamesDisplay games={[]} / key={270800}>
      <RealTimePredictions predictions={[]} loading={false} / key={826960}>
    </div>
  </>
);

// PrizePicks tab with loading states;
const PrizePicksTab: React.FC<{
  livePrizePicksData: any[];
  showDebug: boolean;
}> = ({ livePrizePicksData, showDebug }) => (
  <div className="space-y-6" key={501869}>
    <div className="text-center mb-8" key={490373}>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={11526}>
        🎯 PrizePicks Intelligence Hub;
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2" key={616181}>
        Real-time prop analysis with advanced ML predictions;
      </p>
    </div>

    {livePrizePicksData.length === 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} height={200} className="w-full rounded-xl" / key={30987}>
        ))}
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
        {livePrizePicksData.map((pick, idx) => (
          <PrizePicksEdgeDisplay;
            key={pick.id || idx}
            {...pick}
            showDebug={showDebug}
          / key={605186}>
        ))}
      </div>
    )}
  </div>
);

// Create icon component helper;
const createIcon = (emoji: string, label: string) => (
  <span role="img" aria-label={label} className="text-xl" key={593886}>
    {emoji}
  </span>
);

// Main tab configuration;
const TAB_CONFIGS: TabConfig[] = [
  {
    key: "overview",
    label: "Overview",
    icon: createIcon("📊", "overview"),
    component: OverviewTab,
  },
  {
    key: "analytics",
    label: "Analytics",
    icon: createIcon("📈", "analytics"),
    component: ({}) => (
      <div className="space-y-8" key={778766}>
        <PerformanceAnalyticsDashboard / key={799941}>
        <MarketAnalysisDashboard / key={219624}>
      </div>
    ),
  },
  {
    key: "prizepicks",
    label: "PrizePicks",
    icon: createIcon("🎯", "prizepicks"),
    component: PrizePicksTab,
  },
  {
    key: "strategyEngine",
    label: "Strategy Engine",
    icon: createIcon("🧠", "strategy"),
    component: ({ recommendations, showDebug }: any) => (
      <UnifiedStrategyEngineDisplay;
        recommendations={recommendations}
        showDebug={showDebug}
      / key={141991}>
    ),
  },
  {
    key: "moneyMaker",
    label: "Money Maker",
    icon: createIcon("💰", "money"),
    component: UnifiedMoneyMaker,
    isPremium: true,
  },
  {
    key: "arbitrage",
    label: "Arbitrage",
    icon: createIcon("🔀", "arbitrage"),
    component: ArbitrageOpportunities,
  },
  {
    key: "ml",
    label: "ML Models",
    icon: createIcon("🤖", "ml"),
    component: ({}) => <MLFactorViz playerId={null} metric={null} / key={189834}>,
  },
  {
    key: "quantum",
    label: "Quantum",
    icon: createIcon("🧬", "quantum"),
    component: QuantumPredictionsInterface,
    isPremium: true,
  },
  {
    key: "simulator",
    label: "Simulator",
    icon: createIcon("🧪", "simulator"),
    component: BetSimulationTool,
  },
  {
    key: "lineup",
    label: "Smart Lineup",
    icon: createIcon("📋", "lineup"),
    component: SmartLineupBuilder,
  },
  {
    key: "profile",
    label: "Profile",
    icon: createIcon("👤", "profile"),
    component: UnifiedProfile,
  },
  {
    key: "settings",
    label: "Settings",
    icon: createIcon("⚙️", "settings"),
    component: UnifiedSettingsInterface,
  },
];

// ============================================================================
// MAIN COMPONENT;
// ============================================================================

const UnifiedDashboard: React.FC = () => {
  // ========== STATE ==========
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);

  // Demo data - replace with real data sources;
  const [recentActivity] = useState<ActivityItem[] key={553340}>([
    {
      id: "1",
      type: "bet",
      description: "Lakers vs Warriors Over 220.5",
      amount: 100,
      odds: 2.1,
      timestamp: Date.now() - 3600000,
      status: "success",
    },
    {
      id: "2",
      type: "prediction",
      description: "Patriots ML Prediction",
      amount: 50,
      odds: 1.8,
      timestamp: Date.now() - 7200000,
      status: "pending",
    },
  ]);

  const [metrics] = useState<DashboardMetrics key={943642}>({
    winRate: 72.4,
    roi: 18.2,
    profitLoss: 1240.55,
    totalBets: 156,
    activePredictions: 8,
  });

  // ========== HOOKS ==========





  // ========== HANDLERS ==========
  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
    setIsMobileMenuOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const showToast = useCallback(
    (
      message: string,
      type: "success" | "error" | "warning" | "info" = "info",
    ) => {
      setToast({ message, type });
    },
    [],
  );

  // ========== COMPUTED VALUES ==========


  // Get props for current tab;
  const getTabProps = () => {
    switch (activeTab) {
      case "overview":
        return {
          metrics,
          recentActivity,
          winRate,
          roi,
          profitLoss,
          dataQuality: 0.87,
        };
      case "prizepicks":
        return { livePrizePicksData, showDebug };
      case "strategyEngine":
        return { recommendations: strategyRecommendations, showDebug };
      default:
        return {};
    }
  };

  // ========== ANIMATION VARIANTS ==========
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  // ========== RENDER COMPONENTS ==========

  // Mobile Header;
  const MobileHeader = () => (
    <div className="lg:hidden flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/20 sticky top-0 z-40" key={821506}>
      <div className="flex items-center gap-2" key={100294}>
        <span className="text-2xl animate-pulse" key={546796}>⚡</span>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={855341}>
          A1Betting;
        </span>
      </div>
      <button;
        onClick={() = key={698206}> setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} / key={518705}> : <Menu size={20} / key={913194}>}
      </button>
    </div>
  );

  // Sidebar component;
  const Sidebar = () => (
    <>
      {/* Mobile overlay */}
      <AnimatePresence key={359944}>
        {isMobileMenuOpen && (
          <motion.div;
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          / key={954269}>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside;
        initial={false}
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`
          fixed lg:static top-0 left-0 h-full w-72 z-50;
          lg:translate-x-0 lg:opacity-100;
          bg-gradient-to-b from-blue-600/95 to-purple-700/95;
          backdrop-blur-xl shadow-2xl rounded-none lg:rounded-2xl;
          flex flex-col gap-4 text-white overflow-y-auto;
        `}
       key={845661}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10" key={829422}>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center gap-3" key={443099}>
              <span className="text-3xl animate-pulse" key={599785}>⚡</span>
              <div key={241917}>
                <div className="text-2xl font-extrabold tracking-tight" key={704443}>
                  A1Betting;
                </div>
                <div className="text-xs text-blue-200 opacity-75" key={818713}>
                  AI Sports Intelligence;
                </div>
              </div>
            </div>
            <button;
              onClick={closeMobileMenu}
              className="lg:hidden p-1 rounded text-white/70 hover:text-white"
              aria-label="Close menu"
             key={530888}>
              <X size={20} / key={518705}>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 pb-6 space-y-2" key={519557}>
          {TAB_CONFIGS.map((tab) => (
            <button;
              key={tab.key}
              className={`
                w-full flex items-center gap-4 px-4 py-3 rounded-xl;
                transition-all duration-200 font-semibold text-left;
                ${
                  activeTab === tab.key;
                    ? "bg-white/20 shadow-lg ring-2 ring-yellow-400/50 text-white"
                    : "hover:bg-white/10 text-white/90 hover:text-white"
                }
                ${tab.isPremium ? "border border-yellow-400/30" : ""}
              `}
              onClick={() = key={789556}> handleTabChange(tab.key)}
            >
              <span className="text-xl" key={674561}>{tab.icon}</span>
              <span className="flex-1" key={78291}>{tab.label}</span>
              {tab.isPremium && (
                <Badge;
                  variant="warning"
                  className="text-xs bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                 key={359590}>
                  PRO;
                </Badge>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10" key={623543}>
          <div className="text-xs text-white/60 text-center" key={842609}>
            Version 2.1.0 • Real-time AI;
          </div>
        </div>
      </motion.aside>
    </>
  );

  // Main content;
  const MainContent = () => (
    <main className="flex-1 min-h-screen p-4 lg:p-8 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-yellow-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" key={579788}>
      <AnimatePresence mode="wait" key={725119}>
        <motion.div;
          key={activeTab}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={contentVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="space-y-8 min-h-[60vh]"
         key={83710}>
          <Suspense;
            fallback={
              <div className="space-y-6" key={175723}>
                <Skeleton height={120} className="w-full" / key={955865}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} height={200} className="w-full" / key={498701}>
                  ))}
                </div>
              </div>
            }
          >
            {CurrentTabComponent ? (
              <CurrentTabComponent {...getTabProps()} / key={242500}>
            ) : (
              <div className="text-center py-12" key={752807}>
                <div className="text-4xl mb-4" key={363178}>🚧</div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2" key={538448}>
                  Tab Under Development;
                </h3>
                <p className="text-gray-500 dark:text-gray-400" key={436614}>
                  This feature is coming soon!
                </p>
              </div>
            )}
          </Suspense>

          {/* Footer Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12" key={1858}>
            <Card className="glass-card bg-white/70 dark:bg-gray-900/70 shadow-lg" key={714441}>
              <div className="p-6" key={935494}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" key={201138}>
                  <span key={595076}>📊</span>
                  Recent Activity;
                </h3>
                <div className="space-y-3" key={186520}>
                  {recentActivity.length === 0 ? (
                    <div className="text-gray-400 text-center py-4" key={766698}>
                      No recent activity.
                    </div>
                  ) : (
                    recentActivity.map((activity) => (
                      <div;
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg"
                       key={143992}>
                        <div className="flex-1" key={745195}>
                          <div className="font-medium text-sm" key={243951}>
                            {activity.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-1" key={777441}>
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-3" key={443099}>
                          {activity.amount && (
                            <span className="text-sm font-medium" key={318054}>
                              ${activity.amount}
                            </span>
                          )}
                          <Badge;
                            variant={
                              activity.status === "success"
                                ? "success"
                                : activity.status === "pending"
                                  ? "warning"
                                  : "danger"
                            }
                           key={389294}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </Card>

            <Card className="glass-card bg-white/70 dark:bg-gray-900/70 shadow-lg" key={714441}>
              <div className="p-6" key={935494}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" key={201138}>
                  <span key={595076}>🔧</span>
                  System Status;
                </h3>
                <ServiceStatusIndicators / key={46612}>
                <div className="mt-4" key={139982}>
                  <FeatureFlagIndicators / key={735360}>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence key={359944}>
        {toast && (
          <Toast;
            message={toast.message}
            type={toast.type}
            onClose={() = key={746243}> setToast(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );

  // ========== MAIN RENDER ==========
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800" key={277413}>
      <MobileHeader / key={126039}>

      <div className="flex-1 flex overflow-hidden" key={570163}>
        <Sidebar / key={403360}>
        <MainContent / key={499272}>
      </div>
    </div>
  );
};

export default UnifiedDashboard;
