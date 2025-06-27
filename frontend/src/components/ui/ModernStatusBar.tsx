import React from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  Wifi,
  WifiOff,
  Activity,
  TrendingUp,
  Clock,
  Zap,
  CheckCircle,
  AlertCircle,
  XCircle,
} from 'lucide-react.ts';

interface StatusItem {
  id: string;
  label: string;
  value: string | number;
  status: "active" | "warning" | "error" | "success";
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  lastUpdated?: Date;
}

interface ModernStatusBarProps {
  className?: string;
  items?: StatusItem[];
}

const defaultItems: StatusItem[] = [
  {
    id: "connection",
    label: "Connection",
    value: "Online",
    status: "success",
    icon: <Wifi size={14} / key={523967}>,
    lastUpdated: new Date(),
  },
  {
    id: "api",
    label: "API Status",
    value: "99.9%",
    status: "success",
    icon: <Activity size={14} / key={979433}>,
    trend: "up",
  },
  {
    id: "latency",
    label: "Latency",
    value: "12ms",
    status: "success",
    icon: <Zap size={14} / key={964196}>,
  },
  {
    id: "updates",
    label: "Live Updates",
    value: "Active",
    status: "active",
    icon: <TrendingUp size={14} / key={262025}>,
  },
];

const getStatusColor = (status: StatusItem["status"]) => {
  switch (status) {
    case "success":
      return "text-green-400 bg-green-500/10 border-green-500/20";
    case "active":
      return "text-blue-400 bg-blue-500/10 border-blue-500/20";
    case "warning":
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    case "error":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    default:
      return "text-gray-400 bg-gray-500/10 border-gray-500/20";
  }
};

const getStatusIcon = (status: StatusItem["status"]) => {
  switch (status) {
    case "success":
      return <CheckCircle size={12} className="text-green-400" / key={499113}>;
    case "warning":
      return <AlertCircle size={12} className="text-yellow-400" / key={689946}>;
    case "error":
      return <XCircle size={12} className="text-red-400" / key={826454}>;
    default:
      return null;
  }
};

const getTrendIcon = (trend?: "up" | "down" | "neutral") => {
  switch (trend) {
    case "up":
      return <span className="text-green-400 text-xs" key={681639}>↗</span>;
    case "down":
      return <span className="text-red-400 text-xs" key={344932}>↘</span>;
    default:
      return null;
  }
};

export const ModernStatusBar: React.FC<ModernStatusBarProps key={410599}> = ({
  className = "",
  items = defaultItems,
}) => {
  return (
    <motion.div;
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        fixed top-0 left-0 right-0 z-50;
        backdrop-blur-xl bg-black/10 border-b border-white/5;
        ${className}
      `}
     key={537460}>
      <div className="max-w-full px-6 py-3" key={905091}>
        <div className="flex items-center justify-between" key={96335}>
          {/* Left side - Status items */}
          <div className="flex items-center space-x-6" key={969313}>
            {items.map((item) => (
              <motion.div;
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2"
               key={508424}>
                <div className="flex items-center space-x-1" key={468268}>
                  {item.icon && (
                    <div className="text-gray-400" key={7335}>{item.icon}</div>
                  )}
                  {getStatusIcon(item.status)}
                </div>

                <div className="flex items-center space-x-2" key={740830}>
                  <span className="text-xs text-gray-400 font-medium" key={810954}>
                    {item.label}:
                  </span>
                  <span;
                    className={`text-xs font-semibold ${getStatusColor(item.status).split(" ")[0]}`}
                   key={900403}>
                    {item.value}
                  </span>
                  {getTrendIcon(item.trend)}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right side - Last updated */}
          <div className="flex items-center space-x-2 text-xs text-gray-500" key={632508}>
            <Clock size={12} / key={533564}>
            <span key={595076}>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernStatusBar;
