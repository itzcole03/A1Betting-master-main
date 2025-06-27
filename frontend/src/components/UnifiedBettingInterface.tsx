import React, { useState, useMemo  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';
import { useShapData } from '@/hooks/useShapData.ts';
import { useAuth } from '@/hooks/useAuth.ts';
import { formatCurrency } from '@/utils/formatters.ts';
import {
  BetRecommendation,
  RiskProfileType,
  UserConstraints,
  ShapFeature,
} from '@/types/betting.ts';
import { RiskProfileSelector } from './RiskProfileSelector.ts';
import ShapVisualization from './ShapVisualization.ts';
import { BettingOpportunities } from './BettingOpportunities.ts';
import { PerformanceMetrics } from './PerformanceMetrics.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';
import {
  Button,
  Card,
  Input,
  Select,
  Tabs,
  Tab,
  Badge,
  Spinner,
} from './ui/UnifiedUI.ts';
import { useFilterStore } from '@/stores/filterStore.ts';

// Animation variants;
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { duration: 0.2, ease: "easeOut" },
};

interface UnifiedBettingInterfaceProps {
  initialBankroll: number;
  onBetPlaced: (bet: BetRecommendation) => void;
  darkMode?: boolean;
  onDarkModeChange?: (darkMode: boolean) => void;
}

interface BettingConfig {
  investment: number;
  modelSet:
    | "ensemble"
    | "traditional"
    | "deeplearning"
    | "timeseries"
    | "optimization";
  confidence: number;
  strategy:
    | "maximum"
    | "balanced"
    | "conservative"
    | "aggressive"
    | "arbitrage"
    | "ai_adaptive";
  sports:
    | "all"
    | "nba"
    | "nfl"
    | "mlb"
    | "nhl"
    | "soccer"
    | "wnba"
    | "pga"
    | "tennis"
    | "esports"
    | "mma"
    | "mixed";
}

export const UnifiedBettingInterface: React.FC<
  UnifiedBettingInterfaceProps;
> = ({
  initialBankroll,
  onBetPlaced,
  darkMode: externalDarkMode,
  onDarkModeChange: _onDarkModeChange,
}) => {
  const { token: _token } = useAuth();
  const [activeTab, setActiveTab] = useState("opportunities");
  const [internalDarkMode, setInternalDarkMode] = useState(false);
  const [bankroll, _setBankroll] = useState(initialBankroll);
  const [riskProfile, setRiskProfile] = useState<RiskProfileType key={114216}>(
    RiskProfileType.MODERATE,
  );
  const [_userConstraints] = useState<UserConstraints key={803230}>({
    max_bankroll_stake: 0.1,
    time_window_hours: 24,
    preferred_sports: [],
    preferred_markets: [],
  });
  const [selectedEvent, _setSelectedEvent] = useState<BetRecommendation | null key={725325}>(
    null,
  );
  const [notification, _setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [bettingOpportunities, setBettingOpportunities] = useState<
    BetRecommendation[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, _setAlerts] = useState<
    Array<{
      type: string;
      severity: string;
      message: string;
      metadata: Record<string, unknown key={843221}>;
    }>
  >([]);
  const [config, setConfig] = useState<BettingConfig key={519112}>({
    investment: 1000,
    modelSet: "ensemble",
    confidence: 0.8,
    strategy: "balanced",
    sports: "all",
  });

  // WebSocket connection for real-time updates;
  const wsQuery = new URLSearchParams({
    riskProfile: filterStore.riskProfile,
    confidenceThreshold: String(filterStore.confidenceThreshold),
    stakeSizing: String(filterStore.stakeSizing),
    model: filterStore.model,
    activeFilters: Array.from(filterStore.activeFilters).join(","),
  }).toString();

  const { isConnected } = useWebSocket(wsUrl, {
    onMessage: (data: Record<string, unknown key={843221}>) => {
      if (data.type === "betting_opportunities") {
        setBettingOpportunities(data.opportunities as BetRecommendation[]);
        setIsLoading(false);
      }
    },
  });

  // Analytics and predictions;
  const { performance } = useUnifiedAnalytics({
    ...config,
    ml: { autoUpdate: true, updateInterval: 300000 }, // 5 minutes;
    performance: true,
    drift: true,
  });

  // SHAP visualization data;
  const {
    features: shapData,
    loading: shapLoading,
    error: _shapError,
  } = useShapData({
    eventId: selectedEvent?.id || "",
    modelType: "xgboost",
  });

  const shapFeatures: ShapFeature[] = useMemo(() => {
    if (!shapData) return [];
    return Object.entries(shapData).map(([name, impact]) => ({
      name,
      value: 0,
      impact: Number(impact),
    }));
  }, [shapData]);

  // Memoize selected model and metrics;
  const selectedModel = useMemo(
    () => performance?.data?.[0],
    [performance?.data],
  );

  // Calculate profit based on model performance;
  const calculatedProfit = useMemo(() => {
    if (!modelMetrics) return 0;
    // Use f1Score as a proxy for ROI until real bankroll tracking is implemented;
    return config.investment * (modelMetrics.f1 ?? 0);
  }, [modelMetrics, config.investment]);

  // Memoize recommendations from betting opportunities;
  const bettingRecommendations = useMemo(() => {
    return bettingOpportunities.map((opp) => ({
      ...opp,
      result: "pending" as const, // Add result field required by PerformanceMetrics;
    }));
  }, [bettingOpportunities]);

  return (
    <motion.div;
      animate="animate"
      aria-label="Unified Betting Interface"
      className="w-full max-w-7xl mx-auto p-4 space-y-6"
      exit="exit"
      initial="initial"
      variants={fadeInUp}
     key={982539}>
      <Card className="p-6" key={260389}>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4" key={303748}>
          <div key={241917}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100" key={226320}>
              Betting Interface;
            </h2>
            <p className="text-gray-600 dark:text-gray-400" key={300965}>
              Current Bankroll: {formatCurrency(bankroll)}
            </p>
          </div>
          <div className="flex items-center gap-4" key={782146}>
            <RiskProfileSelector;
              currentProfile={riskProfile}
              onProfileChange={setRiskProfile}
            / key={527844}>
            <Button;
              aria-label="Toggle dark mode"
              variant="ghost"
              onClick={() = key={745914}> setInternalDarkMode(!internalDarkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </div>
        </header>

        <main className="mt-6" key={235572}>
          <Tabs value={activeTab} onChange={setActiveTab} key={178197}>
            <Tab label="Opportunities" value="opportunities" / key={610513}>
            <Tab label="Analytics" value="analytics" / key={144039}>
            <Tab label="Settings" value="settings" / key={262162}>
          </Tabs>

          <motion.section;
            animate="animate"
            aria-label={activeTab}
            className="mt-4"
            exit="exit"
            initial="initial"
            variants={scaleIn}
           key={373656}>
            {activeTab === "opportunities" && (
              <motion.div;
                key="opportunities"
                animate="animate"
                className="mt-4"
                exit="exit"
                initial="initial"
                variants={scaleIn}
               key={551592}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64" key={951011}>
                    <Spinner aria-label="Loading opportunities" size="large" / key={262090}>
                  </div>
                ) : (
                  <BettingOpportunities;
                    alerts={alerts}
                    isLoading={isLoading}
                    opportunities={bettingOpportunities}
                    onBetPlacement={onBetPlaced}
                  / key={888546}>
                )}
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div;
                key="analytics"
                animate="animate"
                className="mt-4"
                exit="exit"
                initial="initial"
                variants={scaleIn}
               key={94240}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
                  <Card key={650115}>
                    <PerformanceMetrics;
                      bankroll={bankroll}
                      profit={calculatedProfit}
                      recommendations={bettingRecommendations}
                      riskProfile={riskProfile}
                    / key={613345}>
                  </Card>
                  <Card key={650115}>
                    <ShapVisualization;
                      features={shapFeatures}
                      isLoading={shapLoading}
                      title="Feature Importance"
                    / key={946130}>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div;
                key="settings"
                animate="animate"
                className="mt-4"
                exit="exit"
                initial="initial"
                variants={scaleIn}
               key={17703}>
                <Card key={650115}>
                  <div className="space-y-4" key={160407}>
                    <Input;
                      aria-label="Investment Amount"
                      helperText="Maximum amount to invest per bet"
                      label="Investment Amount"
                      type="number"
                      value={config.investment.toString()}
                      onChange={(value) = key={351891}>
                        setConfig((prev) => ({
                          ...prev,
                          investment: Number(value),
                        }))
                      }
                    />
                    <Select;
                      aria-label="Model Set"
                      label="Model Set"
                      options={[
                        { value: "ensemble", label: "Ensemble" },
                        { value: "traditional", label: "Traditional" },
                        { value: "deeplearning", label: "Deep Learning" },
                        { value: "timeseries", label: "Time Series" },
                        { value: "optimization", label: "Optimization" },
                      ]}
                      value={config.modelSet}
                      onChange={(value) = key={131624}>
                        setConfig((prev) => ({
                          ...prev,
                          modelSet: value as BettingConfig["modelSet"],
                        }))
                      }
                    />
                    <Select;
                      aria-label="Strategy"
                      label="Strategy"
                      options={[
                        { value: "maximum", label: "Maximum" },
                        { value: "balanced", label: "Balanced" },
                        { value: "conservative", label: "Conservative" },
                        { value: "aggressive", label: "Aggressive" },
                        { value: "arbitrage", label: "Arbitrage" },
                        { value: "ai_adaptive", label: "AI Adaptive" },
                      ]}
                      value={config.strategy}
                      onChange={(value) = key={374168}>
                        setConfig((prev) => ({
                          ...prev,
                          strategy: value as BettingConfig["strategy"],
                        }))
                      }
                    />
                  </div>
                </Card>
              </motion.div>
            )}
          </motion.section>
        </main>

        {notification && (
          <motion.div;
            animate={{ opacity: 1, y: 0 }}
            aria-live="polite"
            className="mt-4"
            exit={{ opacity: 0, y: -20 }}
            initial={{ opacity: 0, y: 20 }}
           key={184732}>
            <Badge;
              variant={notification.type === "success" ? "success" : "danger"}
             key={288119}>
              {notification.message}
            </Badge>
          </motion.div>
        )}

        {!isConnected && (
          <motion.div;
            animate={{ opacity: 1 }}
            aria-live="polite"
            className="mt-4"
            initial={{ opacity: 0 }}
           key={953040}>
            <Badge variant="warning" key={848621}>
              WebSocket disconnected. Attempting to reconnect...
            </Badge>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};
