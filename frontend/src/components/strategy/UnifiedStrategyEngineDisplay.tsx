import { motion } from 'framer-motion.ts';
import {
  TrendingUp,
  TrendingDown,
  Zap,
  Target,
  Brain,
  AlertTriangle,
} from 'lucide-react.ts';
import React from 'react.ts';
import { Badge } from '@/ui/badge.ts';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card.ts';

// ============================================================================
// TYPES & INTERFACES;
// ============================================================================

export interface StrategyRecommendation {
  strategyId: string;
  strategyName: string;
  confidence: number;
  expectedReturn: number;
  riskLevel: "low" | "medium" | "high";
  recommendation: string;
  reasoning: string[];
  data: {
    winProbability: number;
    expectedValue: number;
    kellyFraction: number;
    sharpeRatio: number;
    maxDrawdown: number;
  };
  timeframe: string;
  sport: string;
  lastUpdated: number;
}

interface Props {
  recommendations?: StrategyRecommendation[];
  showDebug?: boolean;
}

// ============================================================================
// DEMO DATA;
// ============================================================================

const DEMO_RECOMMENDATIONS: StrategyRecommendation[] = [
  {
    strategyId: "momentum-nba",
    strategyName: "NBA Momentum Strategy",
    confidence: 0.84,
    expectedReturn: 12.5,
    riskLevel: "medium",
    recommendation: "Strong Buy Signal - Lakers vs Warriors Over",
    reasoning: [
      "Both teams averaging 115+ points in last 5 games",
      "Historical pace indicates high-scoring matchup",
      "Weather conditions favor offensive play",
      "Key players healthy and in form",
    ],
    data: {
      winProbability: 0.67,
      expectedValue: 0.125,
      kellyFraction: 0.08,
      sharpeRatio: 1.4,
      maxDrawdown: 0.15,
    },
    timeframe: "24h",
    sport: "NBA",
    lastUpdated: Date.now() - 300000,
  },
  {
    strategyId: "value-nfl",
    strategyName: "NFL Value Betting",
    confidence: 0.92,
    expectedReturn: 18.7,
    riskLevel: "low",
    recommendation: "Patriots ML - Significant Value Detected",
    reasoning: [
      "Market overreacting to recent loss",
      "Key players returning from injury",
      "Strong defensive metrics vs opponent weakness",
      "Public betting creating line value",
    ],
    data: {
      winProbability: 0.78,
      expectedValue: 0.187,
      kellyFraction: 0.12,
      sharpeRatio: 2.1,
      maxDrawdown: 0.08,
    },
    timeframe: "3 days",
    sport: "NFL",
    lastUpdated: Date.now() - 600000,
  },
  {
    strategyId: "arbitrage-mlb",
    strategyName: "MLB Arbitrage Opportunity",
    confidence: 0.99,
    expectedReturn: 4.2,
    riskLevel: "low",
    recommendation: "Risk-Free Arbitrage - Yankees/Red Sox",
    reasoning: [
      "Price discrepancy across sportsbooks",
      "Guaranteed profit opportunity",
      "Low capital requirement",
      "Quick execution window",
    ],
    data: {
      winProbability: 1.0,
      expectedValue: 0.042,
      kellyFraction: 1.0,
      sharpeRatio: Infinity,
      maxDrawdown: 0.0,
    },
    timeframe: "2h",
    sport: "MLB",
    lastUpdated: Date.now() - 120000,
  },
];

// ============================================================================
// HELPER FUNCTIONS;
// ============================================================================

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case "low":
      return "text-green-600 bg-green-100 border-green-200";
    case "medium":
      return "text-yellow-600 bg-yellow-100 border-yellow-200";
    case "high":
      return "text-red-600 bg-red-100 border-red-200";
    default:
      return "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700";
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 0.8) return "text-green-600";
  if (confidence >= 0.6) return "text-yellow-600";
  return "text-red-600";
};

const getSportIcon = (sport: string) => {
  const icons: Record<string, string key={248182}> = {
    NBA: "🏀",
    NFL: "🏈",
    MLB: "⚾",
    NHL: "🏒",
    Soccer: "⚽",
  };
  return icons[sport] || "🏆";
};

const formatTimeAgo = (timestamp: number) => {




  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

// ============================================================================
// COMPONENTS;
// ============================================================================

const StrategyCard: React.FC<{
  recommendation: StrategyRecommendation;
  index: number;
  showDebug: boolean;
}> = ({ recommendation, index, showDebug }) => {
  const {
    strategyName,
    confidence,
    expectedReturn,
    riskLevel,
    recommendation: rec,
    reasoning,
    data,
    timeframe,
    sport,
    lastUpdated,
  } = recommendation;

  return (
    <motion.div;
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
     key={829941}>
      <Card className="glass-card hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-900/60" key={518344}>
        <CardHeader className="pb-3" key={82141}>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center gap-3" key={443099}>
              <span className="text-2xl" key={18044}>{getSportIcon(sport)}</span>
              <div key={241917}>
                <CardTitle className="text-lg font-bold text-gray-800 dark:text-white" key={855443}>
                  {strategyName}
                </CardTitle>
                <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                  {sport} • {timeframe}
                </div>
              </div>
            </div>
            <div className="text-right" key={144468}>
              <div;
                className={`text-2xl font-bold ${getConfidenceColor(confidence)}`}
               key={477945}>
                {(confidence * 100).toFixed(0)}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
                Confidence;
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4" key={796196}>
          {/* Main Recommendation */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200/30" key={709854}>
            <div className="flex items-start gap-3" key={412732}>
              <Zap className="w-5 h-5 text-blue-600 mt-0.5" / key={582214}>
              <div key={241917}>
                <div className="font-semibold text-blue-800 dark:text-blue-200 mb-1" key={942350}>
                  Recommendation;
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300" key={259909}>
                  {rec}
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4" key={354810}>
            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg" key={295588}>
              <div className="flex items-center justify-center gap-1 mb-1" key={453505}>
                <TrendingUp className="w-4 h-4 text-green-600" / key={734039}>
                <span className="text-xs text-gray-500 dark:text-gray-400" key={920878}>
                  Expected Return;
                </span>
              </div>
              <div className="text-lg font-bold text-green-600" key={134873}>
                +{expectedReturn.toFixed(1)}%
              </div>
            </div>

            <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg" key={295588}>
              <div className="flex items-center justify-center gap-1 mb-1" key={453505}>
                <Target className="w-4 h-4 text-blue-600" / key={693749}>
                <span className="text-xs text-gray-500 dark:text-gray-400" key={920878}>
                  Win Probability;
                </span>
              </div>
              <div className="text-lg font-bold text-blue-600" key={585111}>
                {(data.winProbability * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center gap-2" key={100294}>
              <AlertTriangle className="w-4 h-4 text-gray-500 dark:text-gray-400" / key={493820}>
              <span className="text-sm text-gray-600 dark:text-gray-400" key={10584}>
                Risk Level:
              </span>
            </div>
            <Badge;
              variant={riskLevel as any}
              className={getRiskColor(riskLevel)}
             key={3927}>
              {riskLevel.toUpperCase()}
            </Badge>
          </div>

          {/* Reasoning */}
          <div className="space-y-2" key={725977}>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300" key={84572}>
              <Brain className="w-4 h-4" / key={370311}>
              AI Reasoning:
            </div>
            <ul className="space-y-1" key={662051}>
              {reasoning.slice(0, 3).map((reason, idx) => (
                <li;
                  key={idx}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                 key={242252}>
                  <span className="text-blue-500 mt-1" key={101936}>•</span>
                  <span key={595076}>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Advanced Metrics (Debug Mode) */}
          {showDebug && (
            <motion.div;
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2"
             key={312433}>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2" key={971805}>
                Advanced Metrics:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs" key={190504}>
                <div key={241917}>
                  Kelly Fraction:{" "}
                  <span className="font-mono" key={294600}>
                    {(data.kellyFraction * 100).toFixed(1)}%
                  </span>
                </div>
                <div key={241917}>
                  Sharpe Ratio:{" "}
                  <span className="font-mono" key={294600}>
                    {data.sharpeRatio.toFixed(2)}
                  </span>
                </div>
                <div key={241917}>
                  Expected Value:{" "}
                  <span className="font-mono" key={294600}>
                    {(data.expectedValue * 100).toFixed(1)}%
                  </span>
                </div>
                <div key={241917}>
                  Max Drawdown:{" "}
                  <span className="font-mono" key={294600}>
                    {(data.maxDrawdown * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2" key={897611}>
                Last Updated: {formatTimeAgo(lastUpdated)}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const EmptyState: React.FC = () => (
  <div className="text-center py-12" key={752807}>
    <motion.div;
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
     key={269130}>
      <div className="text-6xl mb-4" key={671434}>🧠</div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2" key={538448}>
        Strategy Engine Analyzing;
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto" key={501018}>
        Our AI is currently processing market data and generating personalized;
        betting strategies. Check back in a few moments for the latest;
        recommendations.
      </p>
      <div className="mt-6" key={469583}>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full" key={750293}>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" key={940421}></div>
          <span className="text-sm text-blue-700 dark:text-blue-300" key={998820}>
            Processing live data...
          </span>
        </div>
      </div>
    </motion.div>
  </div>
);

// ============================================================================
// MAIN COMPONENT;
// ============================================================================

const UnifiedStrategyEngineDisplay: React.FC<Props key={757196}> = ({
  recommendations = [],
  showDebug = false,
}) => {
  // Use demo data if no recommendations provided;
  const displayRecommendations =
    recommendations.length > 0 ? recommendations : DEMO_RECOMMENDATIONS;

  if (displayRecommendations.length === 0) {
    return <EmptyState / key={141903}>;
  }

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
       key={951381}>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" key={11526}>
          🧠 Strategy Engine Intelligence;
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto" key={920050}>
          AI-powered betting strategies with real-time market analysis, risk;
          assessment, and personalized recommendations.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-sm" key={387289}>
          <div className="flex items-center gap-2" key={100294}>
            <div className="w-2 h-2 bg-green-500 rounded-full" key={500238}></div>
            <span className="text-green-600" key={209818}>Live Analysis</span>
          </div>
          <div className="flex items-center gap-2" key={100294}>
            <div className="w-2 h-2 bg-blue-500 rounded-full" key={363552}></div>
            <span className="text-blue-600" key={489125}>
              {displayRecommendations.length} Active Strategies;
            </span>
          </div>
          <div className="flex items-center gap-2" key={100294}>
            <div className="w-2 h-2 bg-purple-500 rounded-full" key={917826}></div>
            <span className="text-purple-600" key={642192}>Real-time Updates</span>
          </div>
        </div>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
        {displayRecommendations.map((recommendation, index) => (
          <StrategyCard;
            key={recommendation.strategyId}
            recommendation={recommendation}
            index={index}
            showDebug={showDebug}
          / key={381786}>
        ))}
      </div>

      {/* Performance Summary */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
       key={189381}>
        <Card className="glass-card bg-gradient-to-r from-blue-50/80 to-purple-50/80 dark:from-blue-900/20 dark:to-purple-900/20 border-0" key={243983}>
          <CardContent className="p-6" key={184394}>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white" key={625738}>
              Strategy Performance Overview;
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4" key={426410}>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-green-600" key={702696}>
                  {Math.round(
                    displayRecommendations.reduce(
                      (acc, r) => acc + r.expectedReturn,
                      0,
                    ) / displayRecommendations.length,
                  )}
                  %
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                  Avg Expected Return;
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-blue-600" key={634378}>
                  {Math.round(
                    (displayRecommendations.reduce(
                      (acc, r) => acc + r.confidence,
                      0,
                    ) /
                      displayRecommendations.length) *
                      100,
                  )}
                  %
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                  Avg Confidence;
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-purple-600" key={630773}>
                  {
                    displayRecommendations.filter((r) => r.riskLevel === "low")
                      .length;
                  }
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                  Low Risk Strategies;
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-2xl font-bold text-orange-600" key={478722}>
                  {displayRecommendations.length}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                  Active Strategies;
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default UnifiedStrategyEngineDisplay;
