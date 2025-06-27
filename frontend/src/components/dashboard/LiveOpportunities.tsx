import React, { useState, useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Target,
  Star,
  Activity,
  ChevronRight,
  Flame,
  Zap,
  Eye,
} from 'lucide-react.ts';

interface LiveOpportunity {
  id: string;
  game: string;
  teams: {
    home: string;
    away: string;
  };
  prediction: string;
  predictionType: "spread" | "total" | "moneyline" | "player_prop";
  confidence: number;
  odds: number;
  expectedValue: number;
  valueRating: "hot" | "warm" | "cool";
  timeUntilGame: string;
  currentLine: number;
  recommendedLine: number;
  edgePercentage: number;
  bookmaker: string;
  lastUpdated: Date;
  volume?: number;
  marketMovement?: "up" | "down" | "stable";
}

const mockOpportunities: LiveOpportunity[] = [
  {
    id: "1",
    game: "Lakers vs Warriors",
    teams: { home: "Lakers", away: "Warriors" },
    prediction: "Over 235.5 Points",
    predictionType: "total",
    confidence: 94,
    odds: 1.85,
    expectedValue: 12.3,
    valueRating: "hot",
    timeUntilGame: "2h 15m",
    currentLine: 235.5,
    recommendedLine: 238.0,
    edgePercentage: 12.3,
    bookmaker: "DraftKings",
    lastUpdated: new Date(),
    volume: 85000,
    marketMovement: "up",
  },
  {
    id: "2",
    game: "Celtics vs Heat",
    teams: { home: "Celtics", away: "Heat" },
    prediction: "Celtics -5.5",
    predictionType: "spread",
    confidence: 87,
    odds: 1.92,
    expectedValue: 8.7,
    valueRating: "warm",
    timeUntilGame: "4h 32m",
    currentLine: -5.5,
    recommendedLine: -4.0,
    edgePercentage: 8.7,
    bookmaker: "FanDuel",
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
    volume: 62000,
    marketMovement: "stable",
  },
  {
    id: "3",
    game: "Nuggets vs Suns",
    teams: { home: "Nuggets", away: "Suns" },
    prediction: "Under 228.5 Points",
    predictionType: "total",
    confidence: 81,
    odds: 1.78,
    expectedValue: 6.2,
    valueRating: "cool",
    timeUntilGame: "6h 45m",
    currentLine: 228.5,
    recommendedLine: 225.0,
    edgePercentage: 6.2,
    bookmaker: "BetMGM",
    lastUpdated: new Date(Date.now() - 10 * 60 * 1000),
    volume: 43000,
    marketMovement: "down",
  },
  {
    id: "4",
    game: "Bucks vs Nets",
    teams: { home: "Bucks", away: "Nets" },
    prediction: "Giannis Over 28.5 Points",
    predictionType: "player_prop",
    confidence: 92,
    odds: 1.95,
    expectedValue: 15.8,
    valueRating: "hot",
    timeUntilGame: "1h 45m",
    currentLine: 28.5,
    recommendedLine: 26.0,
    edgePercentage: 15.8,
    bookmaker: "Caesars",
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
    volume: 71000,
    marketMovement: "up",
  },
];

const getValueRatingConfig = (rating: LiveOpportunity["valueRating"]) => {
  switch (rating) {
    case "hot":
      return {
        icon: <Flame size={16} className="text-red-400" / key={939706}>,
        gradient: "from-red-500/20 to-orange-500/20",
        border: "border-red-500/30",
        badge: "bg-red-500/20 text-red-400",
        emoji: "🔥",
      };
    case "warm":
      return {
        icon: <Zap size={16} className="text-yellow-400" / key={875922}>,
        gradient: "from-yellow-500/20 to-orange-500/20",
        border: "border-yellow-500/30",
        badge: "bg-yellow-500/20 text-yellow-400",
        emoji: "⚡",
      };
    case "cool":
      return {
        icon: <Target size={16} className="text-blue-400" / key={179200}>,
        gradient: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-400",
        emoji: "🎯",
      };
    default:
      return {
        icon: <Activity size={16} className="text-gray-400" / key={231894}>,
        gradient: "from-gray-500/20 to-gray-600/20",
        border: "border-gray-500/30",
        badge: "bg-gray-500/20 text-gray-400",
        emoji: "📊",
      };
  }
};

const getMovementIcon = (movement?: string) => {
  switch (movement) {
    case "up":
      return <TrendingUp size={12} className="text-green-400" / key={205504}>;
    case "down":
      return <TrendingDown size={12} className="text-red-400" / key={363946}>;
    default:
      return <Activity size={12} className="text-gray-400" / key={873790}>;
  }
};

interface LiveOpportunitiesProps {
  className?: string;
  maxItems?: number;
  showHeader?: boolean;
}

export const LiveOpportunities: React.FC<LiveOpportunitiesProps key={344846}> = ({
  className = "",
  maxItems = 4,
  showHeader = true,
}) => {
  const [opportunities, setOpportunities] =
    useState<LiveOpportunity[] key={741573}>(mockOpportunities);
  const [selectedOpportunity, setSelectedOpportunity] = useState<string | null key={121216}>(
    null,
  );

  // Simulate real-time updates;
  useEffect(() => {
    const interval = setInterval(() => {
      setOpportunities((prev) =>
        prev.map((opp) => ({
          ...opp,
          lastUpdated: new Date(),
          confidence: Math.max(
            75,
            Math.min(95, opp.confidence + (Math.random() - 0.5) * 2),
          ),
          expectedValue: Math.max(
            3,
            Math.min(20, opp.expectedValue + (Math.random() - 0.5) * 1),
          ),
        })),
      );
    }, 30000); // Update every 30 seconds;

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={className} key={684864}>
      {showHeader && (
        <div className="flex items-center justify-between mb-6" key={530716}>
          <div className="flex items-center space-x-3" key={602729}>
            <div className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20" key={514416}>
              <TrendingUp size={20} className="text-green-400" / key={706098}>
            </div>
            <div key={241917}>
              <h2 className="text-xl font-bold text-white" key={79740}>
                Live Opportunities;
              </h2>
              <p className="text-sm text-gray-400" key={965781}>
                AI-powered betting opportunities updated in real-time;
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2" key={740830}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" / key={724634}>
            <span className="text-sm text-green-400 font-medium" key={630471}>Live</span>
          </div>
        </div>
      )}

      <div className="space-y-4" key={160407}>
        {displayOpportunities.map((opportunity, index) => {


          return (
            <motion.div;
              key={opportunity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`
                relative p-6 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all;
                bg-gradient-to-r ${config.gradient} ${config.border}
                ${isSelected ? "ring-2 ring-blue-500/50" : ""}
                hover:shadow-xl hover:border-opacity-60;
              `}
              onClick={() = key={164965}>
                setSelectedOpportunity(isSelected ? null : opportunity.id)
              }
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4" key={886571}>
                <div className="flex items-center space-x-3" key={602729}>
                  <div;
                    className={`px-3 py-1 rounded-full text-sm font-bold ${config.badge}`}
                   key={509429}>
                    {config.emoji} {opportunity.valueRating.toUpperCase()}
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400" key={491177}>
                    <Clock size={14} / key={984046}>
                    <span className="text-sm" key={887361}>{opportunity.timeUntilGame}</span>
                  </div>
                </div>
                <div className="text-right" key={144468}>
                  <div className="text-2xl font-bold text-green-400" key={77409}>
                    +{opportunity.expectedValue.toFixed(1)}%
                  </div>
                  <div className="text-xs text-gray-400" key={588004}>Expected Value</div>
                </div>
              </div>

              {/* Game Info */}
              <div className="mb-4" key={158827}>
                <h3 className="text-lg font-bold text-white mb-1" key={866290}>
                  {opportunity.game}
                </h3>
                <p className="text-blue-400 font-medium" key={231121}>
                  {opportunity.prediction}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-4 gap-4 mb-4" key={199832}>
                <div className="text-center" key={120206}>
                  <div className="text-sm text-gray-400" key={372957}>Confidence</div>
                  <div className="text-lg font-bold text-white" key={142411}>
                    {opportunity.confidence}%
                  </div>
                </div>
                <div className="text-center" key={120206}>
                  <div className="text-sm text-gray-400" key={372957}>Odds</div>
                  <div className="text-lg font-bold text-white" key={142411}>
                    {opportunity.odds}
                  </div>
                </div>
                <div className="text-center" key={120206}>
                  <div className="text-sm text-gray-400" key={372957}>Edge</div>
                  <div className="text-lg font-bold text-green-400" key={499793}>
                    {opportunity.edgePercentage}%
                  </div>
                </div>
                <div className="text-center" key={120206}>
                  <div className="text-sm text-gray-400" key={372957}>Book</div>
                  <div className="text-sm font-medium text-white" key={334331}>
                    {opportunity.bookmaker}
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="flex items-center justify-between text-sm" key={20634}>
                <div className="flex items-center space-x-4" key={787951}>
                  <div className="flex items-center space-x-1 text-gray-400" key={430425}>
                    <Eye size={12} / key={944778}>
                    <span key={595076}>${opportunity.volume?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1" key={468268}>
                    {getMovementIcon(opportunity.marketMovement)}
                    <span className="text-gray-400" key={912100}>Market</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2" key={740830}>
                  <span className="text-gray-400" key={912100}>View Details</span>
                  <ChevronRight size={14} className="text-gray-400" / key={79492}>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence key={359944}>
                {isSelected && (
                  <motion.div;
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700/50"
                   key={616682}>
                    <div className="grid grid-cols-2 gap-4 text-sm" key={538116}>
                      <div key={241917}>
                        <span className="text-gray-400" key={912100}>Current Line:</span>
                        <span className="ml-2 text-white font-medium" key={20703}>
                          {opportunity.currentLine}
                        </span>
                      </div>
                      <div key={241917}>
                        <span className="text-gray-400" key={912100}>Recommended:</span>
                        <span className="ml-2 text-green-400 font-medium" key={410878}>
                          {opportunity.recommendedLine}
                        </span>
                      </div>
                      <div key={241917}>
                        <span className="text-gray-400" key={912100}>Last Updated:</span>
                        <span className="ml-2 text-white" key={628443}>
                          {opportunity.lastUpdated.toLocaleTimeString()}
                        </span>
                      </div>
                      <div key={241917}>
                        <span className="text-gray-400" key={912100}>Type:</span>
                        <span className="ml-2 text-blue-400 capitalize" key={770726}>
                          {opportunity.predictionType.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3" key={449023}>
                      <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all" key={910136}>
                        Place Bet;
                      </button>
                      <button className="px-4 py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-all" key={313272}>
                        Track;
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {opportunities.length > maxItems && (
        <div className="mt-6 text-center" key={81087}>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 text-blue-400 hover:text-blue-300 font-medium rounded-lg transition-all" key={749034}>
            View All {opportunities.length} Opportunities;
          </button>
        </div>
      )}
    </div>
  );
};

export default LiveOpportunities;
