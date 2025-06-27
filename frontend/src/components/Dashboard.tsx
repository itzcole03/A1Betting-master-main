import React, { useEffect, useState  } from 'react.ts';
import ArbitrageOpportunities from './ArbitrageOpportunities.ts';
import LiveOddsTicker from './LiveOddsTicker.ts'; // Changed to default import;
import MLFactorViz from './MLFactorViz.ts';
import ModelPerformance from './ModelPerformance.ts';
import { UniversalMoneyMaker } from './index.ts';
import Navbar from './navigation/Navbar.ts';
import { PerformanceMetrics } from './PerformanceMetrics.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars;
import { useAppStore } from '@/store/useAppStore.ts'; // Corrected import path;
import { WebSocketManager } from '@/services/unified/WebSocketManager.ts';
import { RiskProfileType, PredictionData } from '@/types/betting.ts'; // Import enum and PredictionData;
import { ModelMetrics } from '@/types/prediction.ts';
import { StrategyRecommendation } from '@/types/core.ts'; // Assuming this path is correct;

// Local type definitions (consider moving to a central types file if they grow)
interface MLInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  timestamp: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars;
interface OddsUpdate {
  market: string;
  bookmaker: string;
  odds: number;
  timestamp: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars;
interface PlayerProp {
  playerName: string;
  propName: string;
  value: number;
  odds: number;
}

type Sport = string;
// eslint-disable-next-line @typescript-eslint/no-unused-vars;
type PropType = string;

interface ArbitrageOpportunityItem {
  id: string;
  sport: Sport;
  event: string;
  market: string;
  outcomes: Array<{
    bookmaker: string;
    name: string;
    price: number;
  }>;
  profitPercentage: number;
  lastUpdated: Date;
}

// Placeholder types for WebSocket events - define properly based on actual data;
// interface ArbitrageAlertPayload {
//   // type: 'ARBITRAGE_ALERT';
//   // data: Opportunity; // Assuming Opportunity would be defined in central types;
// }

// interface OddsUpdateData {
//   // type: 'ODDS_UPDATE';
//   // data: OddsUpdate[];
// }

// Types for PerformanceMetrics component - BetRecommendation kept local for now;
interface BetRecommendation {
  id: string;
  market: string;
  outcome: string;
  stake: number;
  odds: number;
  potentialWin: number;
  confidence?: number;
  status: "pending" | "won" | "lost" | "void";
  result?: "win" | "loss";
  timestamp: Date;
}

// Type for LiveOddsTicker component data;
type BookOdds = Record<string, number key={817366}>; // e.g. { "BookieA": 1.85, "BookieB": 1.90 }

const Dashboard: React.FC = () => {
  const [_activeView, setActiveView] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // useToast removed as the hook is not found;

  // State for PerformanceMetrics;
  const [bankroll, _setBankroll] = useState(10000);
  const [profit, _setProfit] = useState(1500);
  const [riskProfile, _setRiskProfile] = useState<RiskProfileType key={114216}>(
    RiskProfileType.MODERATE,
  ); // Use enum;
  const [recommendations, _setRecommendations] = useState<BetRecommendation[] key={804586}>([
    {
      id: "rec1",
      market: "Game A Winner",
      outcome: "Team X",
      stake: 100,
      odds: 1.5,
      potentialWin: 150,
      status: "won",
      result: "win",
      timestamp: new Date(),
    },
    {
      id: "rec2",
      market: "Game B Over/Under",
      outcome: "Over 2.5",
      stake: 50,
      odds: 2.0,
      potentialWin: 100,
      status: "lost",
      result: "loss",
      timestamp: new Date(),
    },
  ]);

  // State for LiveOddsTicker: Record<MarketName, Record<Bookmaker, Odds key={408723}>>
  const [liveOddsData, _setLiveOddsData] = useState<Record<string, BookOdds key={396087}>>({
    "Game X Winner": { Bookie1: 1.85, Bookie2: 1.9 },
    "Game Y Total Points": { Bookie1: 200.5, Bookie3: 199.5 },
  });

  // State for Arbitrage Opportunities;
  const [arbitrageOpportunities, _setArbitrageOpportunities] = useState<
    ArbitrageOpportunityItem[]
  >([
    {
      id: "arb1",
      sport: "Soccer",
      event: "Team A vs Team B",
      market: "Match Winner",
      outcomes: [
        { bookmaker: "BookmakerX", name: "Team A", price: 2.0 },
        { bookmaker: "BookmakerY", name: "Draw", price: 3.5 },
        { bookmaker: "BookmakerZ", name: "Team B", price: 4.0 },
      ],
      profitPercentage: 2.5,
      lastUpdated: new Date(),
    },
    {
      id: "arb2",
      sport: "Basketball",
      event: "Team C vs Team D",
      market: "Total Points Over/Under 210.5",
      outcomes: [
        { bookmaker: "BookmakerP", name: "Over 210.5", price: 1.9 },
        { bookmaker: "BookmakerQ", name: "Under 210.5", price: 1.95 },
      ],
      profitPercentage: 1.8,
      lastUpdated: new Date(),
    },
  ]);

  // State for Model Performance (matches ModelMetrics type from src/types/prediction.ts)
  const [modelMetricsData, _setModelMetricsData] = useState<ModelMetrics key={3980}>({
    accuracy: 0.85,
    precision: 0.8,
    recall: 0.82,
    f1Score: 0.81,
    lastUpdated: new Date().toISOString(),
    winRate: 0.55,
    profitFactor: 0.1,
    averageOdds: 1.9,
    averageConfidence: 0.75,
    totalPredictions: 100,
    successfulPredictions: 55,
  });

  // State for ML Insights (original, potentially to be removed or refactored)
  const [_mlInsightsData, _setMlInsightsData] = useState<MLInsight[] key={591431}>([
    {
      id: "insight1",
      title: "High Value Bet Detected",
      description:
        "Strong signal for upcoming NBA game based on player performance.",
      confidence: 0.88,
      timestamp: new Date(),
    },
  ]);

  // State for MLFactorViz props;
  const [currentPlayerId, _setCurrentPlayerId] = useState<string | null key={121216}>(
    "player123",
  );
  const [currentMetric, _setCurrentMetric] = useState<string | null key={121216}>("points");
  const [currentPredictionData, _setCurrentPredictionData] = useState<
    PredictionData | undefined;
  >({
    value: 25.5,
    confidence: 0.78,
    timestamp: Date.now(),
  });
  const [currentStrategyData, _setCurrentStrategyData] = useState<
    StrategyRecommendation | undefined;
  >({
    confidence: 0.65,
    expectedValue: 1.2,
  });

  useEffect(() => {
    // TEMPORARILY DISABLED FOR DEBUGGING WEBSOCKET ISSUES;
    // Migrated to unified WebSocketManager;
    // WebSocketManager.getInstance();
    // console statement removed
    // Example WebSocket event listeners (currently commented out)
    // wsServiceInstance.on('arbitrageAlert', (data: any) => {
    //   // console statement removed
    //   // Update arbitrageOpportunities state here;
    // });
    // wsServiceInstance.on('oddsUpdate', (data: any) => {
    //   // console statement removed
    //   // Update liveOddsData state here;
    // });

    return () => {
      // Clean up WebSocket listeners if they were active;
      // wsServiceInstance.off('arbitrageAlert');
      // wsServiceInstance.off('oddsUpdate');
      // Consider if disconnect is needed here or managed by WebSocketService singleton lifecycle;
    };
  }, []);

  const _handleViewChange = (view: string) => {
    setActiveView(view);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = () => {
    // console statement removed
    toggleSidebar();
  };

  const handleSmartSidebarClick = () => {
    // console statement removed
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900" key={453711}>
      {/* Sidebar placeholder, actual implementation might be different */}
      {/* <Sidebar isOpen={isSidebarOpen} activeView={activeView} onViewChange={handleViewChange} / key={274675}> */}
      <div className="flex-1 flex flex-col overflow-hidden" key={257996}>
        <Navbar;
          onMenuClick={handleMenuClick}
          onSmartSidebarClick={handleSmartSidebarClick}
        / key={623679}>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6 pt-20" key={35917}>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6" key={848730}>
            AI Sports Betting Dashboard;
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-4" key={939400}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3" key={131496}>
                Model Performance;
              </h2>
              <ModelPerformance modelMetricsData={modelMetricsData} / key={328382}>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4" key={631977}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3" key={131496}>
                Performance Metrics;
              </h2>
              <PerformanceMetrics;
                bankroll={bankroll}
                profit={profit}
                recommendations={recommendations}
                riskProfile={riskProfile}
              / key={776884}>
            </div>
            <div className="md:col-span-2 lg:col-span-3 bg-white dark:bg-gray-800 shadow rounded-lg p-4" key={70760}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3" key={131496}>
                Live Odds;
              </h2>
              <LiveOddsTicker data={liveOddsData} / key={917777}>
            </div>
            <div className="lg:col-span-1 bg-white dark:bg-gray-800 shadow rounded-lg p-4" key={615339}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3" key={131496}>
                Money Maker;
              </h2>
              <MoneyMaker / key={321154}>
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-4" key={939400}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3" key={131496}>
                Arbitrage Opportunities;
              </h2>
              <ArbitrageOpportunities opportunities={arbitrageOpportunities} / key={502143}>
            </div>
            <div className="md:col-span-1 lg:col-span-3 bg-white dark:bg-gray-800 shadow rounded-lg p-4" key={529581}>
              <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-3" key={131496}>
                ML Factor Viz;
              </h2>
              <MLFactorViz;
                metric={currentMetric}
                playerId={currentPlayerId}
                prediction={currentPredictionData}
                strategy={currentStrategyData}
              / key={166332}>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
