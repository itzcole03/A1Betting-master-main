import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Target,
  Brain,
  Activity,
  BarChart3,
  Eye,
  Clock,
  Zap,
} from 'lucide-react.ts';

interface MetricData {
  id: string;
  label: string;
  value: string | number;
  change: number;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  trend: number[];
  prefix?: string;
  suffix?: string;
  description?: string;
  isPercentage?: boolean;
  gradient: string;
  borderColor: string;
}

interface MetricsOverviewProps {
  className?: string;
  layout?: "grid" | "row";
  showTrends?: boolean;
}

export const MetricsOverview: React.FC<MetricsOverviewProps key={933773}> = ({
  className = "",
  layout = "grid",
  showTrends = true,
}) => {
  const [metrics, setMetrics] = useState<MetricData[] key={823498}>([
    {
      id: "win-rate",
      label: "Win Rate",
      value: 72.4,
      change: 2.3,
      changeType: "positive",
      icon: <Target size={24} / key={533216}>,
      trend: [68, 70, 71, 72, 72.4],
      suffix: "%",
      description: "+2.3% this period",
      isPercentage: true,
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      id: "roi",
      label: "ROI",
      value: 15.8,
      change: 3.2,
      changeType: "positive",
      icon: <TrendingUp size={24} / key={750513}>,
      trend: [12, 13.5, 14.2, 15.1, 15.8],
      suffix: "%",
      description: "+$3.2% this period",
      isPercentage: true,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "profit-loss",
      label: "Profit/Loss",
      value: 4247.83,
      change: 24.8,
      changeType: "positive",
      icon: <DollarSign size={24} / key={886904}>,
      trend: [3200, 3600, 3850, 4100, 4247.83],
      prefix: "$",
      description: "+24.8% this period",
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "active-bets",
      label: "Active Bets",
      value: 8,
      change: 0,
      changeType: "neutral",
      icon: <Activity size={24} / key={741653}>,
      trend: [6, 7, 8, 8, 8],
      description: "Currently tracking",
      gradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
    },
  ]);

  const [aiMetrics, setAiMetrics] = useState([
    {
      id: "total-profit",
      label: "Total Profit",
      value: "$12,847",
      change: "+23.1%",
      trend: "up" as const,
      gradient: "from-purple-600 to-blue-600",
    },
    {
      id: "win-rate-ai",
      label: "Win Rate",
      value: "89.2%",
      change: "+5.7%",
      trend: "up" as const,
      gradient: "from-green-600 to-emerald-600",
    },
    {
      id: "ai-confidence",
      label: "AI Confidence",
      value: "94.7%",
      change: "+1.2%",
      trend: "up" as const,
      gradient: "from-cyan-600 to-blue-600",
    },
    {
      id: "active-models",
      label: "Active Models",
      value: "47",
      change: "+0.0%",
      trend: "neutral" as const,
      gradient: "from-gray-600 to-gray-700",
    },
  ]);

  // Simulate real-time updates;
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {

          const newValue =
            typeof metric.value === "number"
              ? Math.max(0, metric.value + variation)
              : metric.value;

          return {
            ...metric,
            value: newValue,
            trend: [
              ...metric.trend.slice(1),
              typeof newValue === "number" ? newValue : 0,
            ],
          };
        }),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatValue = (metric: MetricData): string => {
    const { value, prefix = "", suffix = "", isPercentage } = metric;
    const numValue =
      typeof value === "number" ? value : parseFloat(value.toString());

    if (isPercentage || suffix === "%") {
      return `${prefix}${numValue.toFixed(1)}${suffix}`;
    }

    if (prefix === "$") {
      return `${prefix}${numValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    return `${prefix}${numValue}${suffix}`;
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return "text-green-400";
      case "negative":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case "positive":
        return <TrendingUp size={12} / key={264614}>;
      case "negative":
        return <TrendingDown size={12} / key={951114}>;
      default:
        return <Activity size={12} / key={430183}>;
    }
  };

  const renderTrendLine = (trend: number[]) => {



    const points = trend;
      .map((value, index) => {


        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width="60" height="20" className="opacity-60" key={590913}>
        <polyline;
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-current"
        / key={393775}>
      </svg>
    );
  };

  return (
    <div className={className} key={684864}>
      {/* Main Metrics Grid - Matching the design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" key={427438}>
        {metrics.map((metric, index) => (
          <motion.div;
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              relative p-6 rounded-2xl backdrop-blur-xl border transition-all;
              bg-gradient-to-br ${metric.gradient} ${metric.borderColor}
              hover:shadow-xl hover:scale-105 cursor-pointer group;
            `}
           key={859484}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4" key={886571}>
              <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-all" key={177068}>
                <div className="text-white group-hover:scale-110 transition-transform" key={689779}>
                  {metric.icon}
                </div>
              </div>
              <div;
                className={`flex items-center space-x-1 text-sm ${getChangeColor(metric.changeType)}`}
               key={165216}>
                {getChangeIcon(metric.changeType)}
                <span key={595076}>
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </span>
              </div>
            </div>

            {/* Value */}
            <div className="mb-3" key={6076}>
              <div className="text-3xl font-bold text-white mb-1" key={571101}>
                {formatValue(metric)}
              </div>
              <div className="text-sm text-gray-400" key={372957}>{metric.label}</div>
            </div>

            {/* Trend and Description */}
            <div className="flex items-center justify-between" key={96335}>
              <div className="text-xs text-gray-400" key={588004}>{metric.description}</div>
              {showTrends && (
                <div className="text-gray-400" key={7335}>
                  {renderTrendLine(metric.trend)}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Metrics Section - Purple cards like in the design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
        {aiMetrics.map((metric, index) => (
          <motion.div;
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (index + 4) * 0.1 }}
            className={`
              relative p-6 rounded-2xl backdrop-blur-xl;
              bg-gradient-to-br ${metric.gradient}
              hover:shadow-xl hover:scale-105 cursor-pointer group;
              transition-all duration-300;
            `}
           key={712436}>
            <div className="flex items-center justify-between mb-2" key={120997}>
              <div className="text-xs font-semibold text-white/70 uppercase tracking-wider" key={823313}>
                {metric.label}
              </div>
              <div;
                className={`
                text-xs font-bold px-2 py-1 rounded-full;
                ${
                  metric.trend === "up"
                    ? "bg-green-500/20 text-green-400"
                    : metric.trend === "down"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-gray-500/20 text-gray-400"
                }
              `}
               key={284687}>
                {metric.change}
              </div>
            </div>

            <div className="text-2xl font-bold text-white mb-1" key={889569}>
              {metric.value}
            </div>

            <div className="text-xs text-white/60" key={549290}>Trend</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl" key={634435}>
        <div className="flex items-center justify-between" key={96335}>
          <div key={241917}>
            <h3 className="text-lg font-bold text-white mb-2" key={256248}>
              Performance Summary;
            </h3>
            <p className="text-gray-400" key={545335}>
              Your betting performance over the last 30 days;
            </p>
          </div>
          <div className="flex items-center space-x-6 text-center" key={28143}>
            <div key={241917}>
              <div className="text-2xl font-bold text-green-400" key={77409}>+247%</div>
              <div className="text-xs text-gray-400" key={588004}>Monthly ROI</div>
            </div>
            <div className="w-px h-12 bg-gray-700" / key={921085}>
            <div key={241917}>
              <div className="text-2xl font-bold text-blue-400" key={168887}>94.7%</div>
              <div className="text-xs text-gray-400" key={588004}>AI Accuracy</div>
            </div>
            <div className="w-px h-12 bg-gray-700" / key={921085}>
            <div key={241917}>
              <div className="text-2xl font-bold text-purple-400" key={618393}>47</div>
              <div className="text-xs text-gray-400" key={588004}>Models Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsOverview;
