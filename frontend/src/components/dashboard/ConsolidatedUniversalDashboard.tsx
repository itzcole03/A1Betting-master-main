import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  TrendingUp,
  DollarSign,
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Clock,
  Zap,
  Brain,
  Trophy,
  Star,
  ChevronRight,
  MoreHorizontal,
  Play,
  Pause,
  RefreshCw,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Users,
  Globe,
} from 'lucide-react.ts';

// ============================================================================
// MOCK DATA;
// ============================================================================

const mockMetrics = [
  {
    id: "1",
    title: "Win Rate",
    value: "72.4%",
    change: "+2.3%",
    trend: "up",
    color: "green",
  },
  {
    id: "2",
    title: "Total Profit",
    value: "$18,247",
    change: "+$3,421",
    trend: "up",
    color: "blue",
  },
  {
    id: "3",
    title: "Active Bets",
    value: "8",
    change: "+3",
    trend: "up",
    color: "purple",
  },
  {
    id: "4",
    title: "Accuracy",
    value: "91.5%",
    change: "+1.2%",
    trend: "up",
    color: "orange",
  },
];

const mockOpportunities = [
  {
    id: "1",
    game: "Lakers vs Warriors",
    prediction: "Over 230.5",
    confidence: 94,
    value: "+12.3%",
    status: "live",
    timeLeft: "2h 15m",
  },
  {
    id: "2",
    game: "Celtics vs Heat",
    prediction: "Celtics -4.5",
    confidence: 87,
    value: "+8.7%",
    status: "upcoming",
    timeLeft: "4h 30m",
  },
  {
    id: "3",
    game: "Warriors vs Nets",
    prediction: "Under 225.5",
    confidence: 82,
    value: "+6.1%",
    status: "upcoming",
    timeLeft: "6h 45m",
  },
];

const mockRecentActivity = [
  {
    id: "1",
    type: "win",
    message: "Lakers Over 230.5 ✓",
    amount: "+$247",
    time: "5m ago",
  },
  {
    id: "2",
    type: "prediction",
    message: "New prediction: Celtics -4.5",
    confidence: "94%",
    time: "12m ago",
  },
  {
    id: "3",
    type: "win",
    message: "Warriors ML ✓",
    amount: "+$180",
    time: "1h ago",
  },
  {
    id: "4",
    type: "alert",
    message: "Value opportunity detected",
    time: "2h ago",
  },
];

// ============================================================================
// COMPONENTS;
// ============================================================================

const MetricCard: React.FC<{
  metric: (typeof mockMetrics)[0];
  index: number;
}> = ({ metric, index }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "border-green-200 bg-gradient-to-br from-green-50 to-green-100";
      case "blue":
        return "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100";
      case "purple":
        return "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100";
      case "orange":
        return "border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100";
      default:
        return "border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100";
    }
  };

  const getTextColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-700";
      case "blue":
        return "text-blue-700";
      case "purple":
        return "text-purple-700";
      case "orange":
        return "text-orange-700";
      default:
        return "text-gray-700";
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "blue":
        return "text-blue-600";
      case "purple":
        return "text-purple-600";
      case "orange":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getGlowColor = (color: string) => {
    switch (color) {
      case "green":
        return "rgba(34, 197, 94, 0.1)";
      case "blue":
        return "rgba(59, 130, 246, 0.1)";
      case "purple":
        return "rgba(147, 51, 234, 0.1)";
      case "orange":
        return "rgba(251, 146, 60, 0.1)";
      default:
        return "rgba(156, 163, 175, 0.1)";
    }
  };

  return (
    <motion.div;
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: `0 20px 40px ${getGlowColor(metric.color)}`,
      }}
      className={`p-6 rounded-xl border-2 ${getColorClasses(metric.color)} hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden`}
     key={756559}>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" / key={741805}>

      <div className="relative z-10" key={407833}>
        <div className="flex items-center justify-between mb-4" key={810034}>
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide" key={265715}>
            {metric.title}
          </h3>
          <motion.div;
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-lg ${getColorClasses(metric.color)} shadow-sm`}
           key={383166}>
            {metric.trend === "up" ? (
              <TrendingUp className={`w-4 h-4 ${getIconColor(metric.color)}`} / key={386806}>
            ) : (
              <ArrowDownRight;
                className={`w-4 h-4 ${getIconColor(metric.color)}`}
              / key={730633}>
            )}
          </motion.div>
        </div>

        <div className="mb-3" key={6076}>
          <motion.p;
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className={`text-3xl font-bold ${getTextColor(metric.color)} tracking-tight`}
           key={852275}>
            {metric.value}
          </motion.p>
        </div>

        <div className="flex items-center justify-between" key={96335}>
          <p;
            className={`text-sm font-medium ${getTextColor(metric.color)} flex items-center gap-1`}
           key={616167}>
            <span className="w-2 h-2 rounded-full bg-green-400" key={358650}></span>
            {metric.change} from last period;
          </p>
          <motion.div;
            whileHover={{ scale: 1.1 }}
            className="text-xs text-gray-500 bg-white/70 px-2 py-1 rounded-full"
           key={390086}>
            24h;
          </motion.div>
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-pulse" / key={63076}>
    </motion.div>
  );
};

const OpportunityCard: React.FC<{
  opportunity: (typeof mockOpportunities)[0];
}> = ({ opportunity }) => {
  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200" key={831504}>
      <div className="flex items-center justify-between mb-3" key={56204}>
        <div className="flex items-center gap-2" key={100294}>
          <div;
            className={`w-2 h-2 rounded-full ${
              opportunity.status === "live"
                ? "bg-green-500 animate-pulse"
                : "bg-orange-500"
            }`}
           key={691854}></div>
          <h3 className="font-semibold text-gray-900" key={702224}>{opportunity.game}</h3>
        </div>
        <span className="text-green-600 font-bold text-sm" key={558357}>
          {opportunity.value}
        </span>
      </div>

      <div className="space-y-2" key={725977}>
        <div className="flex justify-between" key={588832}>
          <span className="text-sm text-gray-600" key={279234}>Prediction</span>
          <span className="text-sm font-medium text-gray-900" key={412874}>
            {opportunity.prediction}
          </span>
        </div>
        <div className="flex justify-between" key={588832}>
          <span className="text-sm text-gray-600" key={279234}>Confidence</span>
          <span className="text-sm font-bold text-blue-600" key={158279}>
            {opportunity.confidence}%
          </span>
        </div>
        <div className="flex justify-between" key={588832}>
          <span className="text-sm text-gray-600" key={279234}>Time Left</span>
          <span className="text-sm font-medium text-orange-600" key={845348}>
            {opportunity.timeLeft}
          </span>
        </div>
      </div>

      <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors" key={380041}>
        View Details;
      </button>
    </div>
  );
};

const ActivityItem: React.FC<{ activity: (typeof mockRecentActivity)[0] }> = ({
  activity,
}) => {
  const getIcon = () => {
    switch (activity.type) {
      case "win":
        return <CheckCircle className="w-4 h-4 text-green-600" / key={227144}>;
      case "prediction":
        return <Brain className="w-4 h-4 text-blue-600" / key={587488}>;
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-orange-600" / key={887574}>;
      default:
        return <Activity className="w-4 h-4 text-gray-600" / key={697010}>;
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors" key={896444}>
      <div className="flex-shrink-0" key={11962}>{getIcon()}</div>
      <div className="flex-1 min-w-0" key={704093}>
        <p className="text-sm font-medium text-gray-900 truncate" key={736214}>
          {activity.message}
        </p>
        {activity.confidence && (
          <p className="text-xs text-blue-600" key={857120}>
            Confidence: {activity.confidence}
          </p>
        )}
      </div>
      <div className="text-right flex-shrink-0" key={47512}>
        {activity.amount && (
          <p className="text-sm font-bold text-green-600" key={818485}>{activity.amount}</p>
        )}
        <p className="text-xs text-gray-500" key={596425}>{activity.time}</p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD COMPONENT;
// ============================================================================

const ConsolidatedUniversalDashboard: React.FC = () => {
  const [isLive, setIsLive] = useState(true);

  return (
    <div className="min-h-full bg-gray-50" key={356886}>
      <div className="max-w-7xl mx-auto p-6 space-y-6" key={432184}>
        {/* Header Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6" key={195079}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <h1 className="text-2xl font-bold text-gray-900 mb-2" key={249521}>
                Welcome back, Alex;
              </h1>
              <p className="text-gray-600" key={486863}>
                Here's what's happening with your betting strategy today;
              </p>
            </div>

            <div className="flex items-center gap-4" key={782146}>
              <div className="flex items-center gap-2" key={100294}>
                <div;
                  className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                 key={400218}></div>
                <span className="text-sm font-medium text-gray-700" key={436322}>
                  {isLive ? "Live Data" : "Offline"}
                </span>
              </div>

              <button;
                onClick={() = key={206350}> setIsLive(!isLive)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isLive ? (
                  <Pause className="w-5 h-5 text-gray-600" / key={682741}>
                ) : (
                  <Play className="w-5 h-5 text-gray-600" / key={664706}>
                )}
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" key={44036}>
                <RefreshCw className="w-5 h-5 text-gray-600" / key={897682}>
              </button>

              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors" key={802868}>
                New Prediction;
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
          {mockMetrics.map((metric, index) => (
            <MetricCard key={metric.id} metric={metric} index={index} / key={752729}>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" key={793741}>
          {/* Live Opportunities */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6" key={143636}>
            <div className="flex items-center justify-between mb-6" key={530716}>
              <div className="flex items-center gap-3" key={443099}>
                <div className="p-2 bg-green-50 rounded-lg" key={992448}>
                  <Target className="w-5 h-5 text-green-600" / key={657326}>
                </div>
                <div key={241917}>
                  <h2 className="text-lg font-semibold text-gray-900" key={507398}>
                    Live Opportunities;
                  </h2>
                  <p className="text-sm text-gray-600" key={656535}>
                    AI-detected high-value bets;
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2" key={100294}>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" key={44036}>
                  <Filter className="w-4 h-4 text-gray-600" / key={948388}>
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1" key={407367}>
                  View All <ChevronRight className="w-4 h-4" / key={749664}>
                </button>
              </div>
            </div>

            <div className="space-y-4" key={160407}>
              {mockOpportunities.map((opportunity) => (
                <OpportunityCard;
                  key={opportunity.id}
                  opportunity={opportunity}
                / key={841370}>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6" key={501869}>
            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6" key={195079}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4" key={939281}>
                Quick Stats;
              </h3>
              <div className="space-y-4" key={160407}>
                <div className="flex items-center justify-between" key={96335}>
                  <span className="text-sm text-gray-600" key={279234}>Today's Bets</span>
                  <span className="text-sm font-bold text-gray-900" key={322450}>3</span>
                </div>
                <div className="flex items-center justify-between" key={96335}>
                  <span className="text-sm text-gray-600" key={279234}>This Week</span>
                  <span className="text-sm font-bold text-green-600" key={709091}>
                    +$1,247;
                  </span>
                </div>
                <div className="flex items-center justify-between" key={96335}>
                  <span className="text-sm text-gray-600" key={279234}>Pending</span>
                  <span className="text-sm font-bold text-orange-600" key={973888}>
                    5 bets;
                  </span>
                </div>
                <div className="flex items-center justify-between" key={96335}>
                  <span className="text-sm text-gray-600" key={279234}>AI Confidence</span>
                  <span className="text-sm font-bold text-blue-600" key={158279}>94.2%</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6" key={195079}>
              <div className="flex items-center justify-between mb-4" key={810034}>
                <h3 className="text-lg font-semibold text-gray-900" key={841723}>
                  Recent Activity;
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium" key={864485}>
                  View All;
                </button>
              </div>

              <div className="space-y-2" key={725977}>
                {mockRecentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} / key={728702}>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6" key={195079}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4" key={939281}>
                System Status;
              </h3>
              <div className="space-y-3" key={186520}>
                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center gap-2" key={100294}>
                    <div className="w-2 h-2 bg-green-500 rounded-full" key={500238}></div>
                    <span className="text-sm text-gray-700" key={995798}>Data Feed</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium" key={978662}>
                    Operational;
                  </span>
                </div>
                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center gap-2" key={100294}>
                    <div className="w-2 h-2 bg-green-500 rounded-full" key={500238}></div>
                    <span className="text-sm text-gray-700" key={995798}>ML Models</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium" key={978662}>
                    Operational;
                  </span>
                </div>
                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center gap-2" key={100294}>
                    <div className="w-2 h-2 bg-green-500 rounded-full" key={500238}></div>
                    <span className="text-sm text-gray-700" key={995798}>Predictions</span>
                  </div>
                  <span className="text-xs text-green-600 font-medium" key={978662}>
                    Operational;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
          {/* Performance Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6" key={195079}>
            <div className="flex items-center justify-between mb-6" key={530716}>
              <div key={241917}>
                <h3 className="text-lg font-semibold text-gray-900" key={841723}>
                  Performance Trend;
                </h3>
                <p className="text-sm text-gray-600" key={656535}>Profit over time</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" key={44036}>
                <MoreHorizontal className="w-5 h-5 text-gray-600" / key={583631}>
              </button>
            </div>

            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg" key={363556}>
              <div className="text-center" key={120206}>
                <LineChart className="w-12 h-12 text-gray-400 mx-auto mb-2" / key={999408}>
                <p className="text-sm text-gray-500" key={212051}>
                  Chart visualization would go here;
                </p>
              </div>
            </div>
          </div>

          {/* Betting Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6" key={195079}>
            <div className="flex items-center justify-between mb-6" key={530716}>
              <div key={241917}>
                <h3 className="text-lg font-semibold text-gray-900" key={841723}>
                  Bet Distribution;
                </h3>
                <p className="text-sm text-gray-600" key={656535}>By sport and type</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" key={44036}>
                <MoreHorizontal className="w-5 h-5 text-gray-600" / key={583631}>
              </button>
            </div>

            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg" key={363556}>
              <div className="text-center" key={120206}>
                <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" / key={10386}>
                <p className="text-sm text-gray-500" key={212051}>
                  Distribution chart would go here;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsolidatedUniversalDashboard;
