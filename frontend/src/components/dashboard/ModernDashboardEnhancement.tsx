import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Brain,
  Zap,
  BarChart3,
  Activity,
  Eye,
  Shield,
  Clock,
  Star,
} from 'lucide-react.ts';

// Import our modern components;
import ModernActivityFeed from '@/ui/ModernActivityFeed.ts';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  trend?: number[];
  loading?: boolean;
}

interface OpportunityCardProps {
  game: string;
  prediction: string;
  confidence: number;
  odds: number;
  value: number;
  timeLeft: string;
  status: "hot" | "warm" | "cool";
}

const MetricCard: React.FC<MetricCardProps key={656645}> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  trend,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="p-6 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl" key={650287}>
        <div className="animate-pulse space-y-4" key={119861}>
          <div className="h-4 bg-gray-700/50 rounded w-3/4" / key={671088}>
          <div className="h-8 bg-gray-700/50 rounded w-1/2" / key={887514}>
          <div className="h-3 bg-gray-700/50 rounded w-2/3" / key={887033}>
        </div>
      </div>
    );
  }

  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-green-400";
      case "negative":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "positive":
        return <TrendingUp size={12} / key={264614}>;
      case "negative":
        return <TrendingDown size={12} / key={951114}>;
      default:
        return null;
    }
  };

  return (
    <motion.div;
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl hover:border-gray-700/50 transition-all group cursor-pointer"
     key={594793}>
      <div className="flex items-start justify-between mb-4" key={886571}>
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all" key={537966}>
          <div className="text-blue-400 group-hover:text-blue-300 transition-colors" key={834539}>
            {icon}
          </div>
        </div>
        {change !== undefined && (
          <div;
            className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}
           key={701921}>
            {getChangeIcon()}
            <span key={595076}>
              {change > 0 ? "+" : ""}
              {change}%
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2" key={725977}>
        <h3 className="text-sm font-medium text-gray-400" key={180531}>{title}</h3>
        <p className="text-2xl font-bold text-white" key={36139}>{value}</p>

        {trend && (
          <div className="flex items-center space-x-2" key={740830}>
            <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden" key={911085}>
              <div;
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(...trend)}%` }}
              / key={252286}>
            </div>
            <span className="text-xs text-gray-500" key={239425}>Trend</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const OpportunityCard: React.FC<OpportunityCardProps key={839417}> = ({
  game,
  prediction,
  confidence,
  odds,
  value,
  timeLeft,
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case "hot":
        return "from-red-500/20 to-orange-500/20 border-red-500/30";
      case "warm":
        return "from-yellow-500/20 to-orange-500/20 border-yellow-500/30";
      case "cool":
        return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "hot":
        return "🔥";
      case "warm":
        return "⚡";
      case "cool":
        return "❄️";
    }
  };

  return (
    <motion.div;
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-2xl border bg-gradient-to-br backdrop-blur-xl hover:shadow-lg transition-all cursor-pointer ${getStatusColor()}`}
     key={184991}>
      <div className="flex items-start justify-between mb-4" key={886571}>
        <div key={241917}>
          <div className="flex items-center space-x-2 mb-1" key={455610}>
            <span className="text-lg" key={107211}>{getStatusIcon()}</span>
            <h3 className="font-semibold text-white" key={766242}>{game}</h3>
          </div>
          <p className="text-sm text-gray-300" key={741226}>{prediction}</p>
        </div>
        <div className="text-right" key={144468}>
          <div className="text-sm text-gray-400" key={372957}>Value</div>
          <div className="text-lg font-bold text-green-400" key={499793}>+{value}%</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center" key={762234}>
        <div key={241917}>
          <div className="text-xs text-gray-400" key={588004}>Confidence</div>
          <div className="text-sm font-medium text-white" key={334331}>{confidence}%</div>
        </div>
        <div key={241917}>
          <div className="text-xs text-gray-400" key={588004}>Odds</div>
          <div className="text-sm font-medium text-white" key={334331}>{odds}</div>
        </div>
        <div key={241917}>
          <div className="text-xs text-gray-400" key={588004}>Time Left</div>
          <div className="text-sm font-medium text-white" key={334331}>{timeLeft}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700/50" key={494181}>
        <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all" key={14356}>
          View Details;
        </button>
      </div>
    </motion.div>
  );
};

export const ModernDashboardEnhancement: React.FC = () => {
  const [metrics, setMetrics] = useState([
    {
      title: "Total Profit",
      value: "$12,847",
      change: 15.3,
      changeType: "positive" as const,
      icon: <DollarSign size={20} / key={594218}>,
      trend: [65, 78, 85, 92, 89],
    },
    {
      title: "Win Rate",
      value: "89.2%",
      change: 2.1,
      changeType: "positive" as const,
      icon: <Target size={20} / key={69317}>,
      trend: [82, 85, 87, 89, 89],
    },
    {
      title: "AI Confidence",
      value: "94.7%",
      change: 1.8,
      changeType: "positive" as const,
      icon: <Brain size={20} / key={20798}>,
      trend: [88, 91, 93, 95, 95],
    },
    {
      title: "Active Models",
      value: "47",
      change: 0,
      changeType: "neutral" as const,
      icon: <Activity size={20} / key={927794}>,
      trend: [45, 46, 47, 47, 47],
    },
  ]);

  const [opportunities] = useState([
    {
      game: "Lakers vs Warriors",
      prediction: "Over 235.5 Points",
      confidence: 94,
      odds: 1.85,
      value: 12.3,
      timeLeft: "2h 15m",
      status: "hot" as const,
    },
    {
      game: "Celtics vs Heat",
      prediction: "Celtics -5.5",
      confidence: 87,
      odds: 1.92,
      value: 8.7,
      timeLeft: "4h 32m",
      status: "warm" as const,
    },
    {
      game: "Nuggets vs Suns",
      prediction: "Under 228.5 Points",
      confidence: 81,
      odds: 1.78,
      value: 6.2,
      timeLeft: "6h 45m",
      status: "cool" as const,
    },
  ]);

  return (
    <div className="space-y-8" key={778766}>
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} / key={953265}>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" key={728164}>
        {/* Opportunities column */}
        <div className="lg:col-span-2 space-y-6" key={381409}>
          <div className="flex items-center justify-between" key={96335}>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2" key={505748}>
              <Zap size={20} className="text-yellow-400" / key={21037}>
              <span key={595076}>Live Opportunities</span>
            </h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors" key={64895}>
              View All;
            </button>
          </div>

          <div className="space-y-4" key={160407}>
            {opportunities.map((opportunity, index) => (
              <OpportunityCard key={index} {...opportunity} / key={505167}>
            ))}
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4" key={354810}>
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20" key={215957}>
              <div className="flex items-center space-x-3" key={602729}>
                <div className="p-2 rounded-lg bg-green-500/20" key={230602}>
                  <TrendingUp size={16} className="text-green-400" / key={5435}>
                </div>
                <div key={241917}>
                  <div className="text-sm text-gray-400" key={372957}>
                    Today's Performance;
                  </div>
                  <div className="text-lg font-bold text-green-400" key={499793}>
                    +$2,347;
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20" key={106016}>
              <div className="flex items-center space-x-3" key={602729}>
                <div className="p-2 rounded-lg bg-blue-500/20" key={690190}>
                  <Eye size={16} className="text-blue-400" / key={496839}>
                </div>
                <div key={241917}>
                  <div className="text-sm text-gray-400" key={372957}>Watching</div>
                  <div className="text-lg font-bold text-blue-400" key={930283}>
                    12 Games;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity feed column */}
        <div className="space-y-6" key={501869}>
          <ModernActivityFeed maxItems={6} showTimeline={true} / key={238917}>

          {/* System Status */}
          <div className="p-6 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl" key={650287}>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2" key={677181}>
              <Shield size={18} className="text-green-400" / key={428118}>
              <span key={595076}>System Status</span>
            </h3>

            <div className="space-y-3" key={186520}>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>API Status</span>
                <div className="flex items-center space-x-2" key={740830}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" / key={724634}>
                  <span className="text-sm text-green-400" key={232194}>Online</span>
                </div>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Model Performance</span>
                <span className="text-sm text-white" key={614306}>94.7%</span>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Data Latency</span>
                <span className="text-sm text-white" key={614306}>12ms</span>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Last Update</span>
                <div className="flex items-center space-x-1 text-sm text-gray-400" key={167331}>
                  <Clock size={12} / key={533564}>
                  <span key={595076}>Just now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboardEnhancement;
