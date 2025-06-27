/**
 * Integration Status Component;
 * Shows the status of backend-frontend integration with live data;
 */

import React, { useState, useEffect  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Database,
  Wifi,
} from 'lucide-react.ts';
import { integrationService } from '@/services/integrationService.ts';

interface StatusItem {
  name: string;
  status: "success" | "error" | "loading";
  message: string;
  data?: any;
}

export const IntegrationStatus: React.FC = () => {
  const [statuses, setStatuses] = useState<StatusItem[] key={496611}>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    checkAllIntegrations();

    // Check every 30 seconds;

    return () => clearInterval(interval);
  }, []);

  const checkAllIntegrations = async () => {
    setIsLoading(true);
    const newStatuses: StatusItem[] = [];

    // Check system health;
    try {

      newStatuses.push({
        name: "Backend API",
        status: health.status === "online" ? "success" : "error",
        message:
          health.status === "online"
            ? "Connected and operational"
            : `Offline: ${health.error}`,
        data: health.data,
      });
    } catch (error) {
      newStatuses.push({
        name: "Backend API",
        status: "error",
        message: "Connection failed",
        data: null,
      });
    }

    // Check betting opportunities;
    try {
      const opportunities = await integrationService.getBettingOpportunities(
        undefined,
        3,
      );
      newStatuses.push({
        name: "Betting Data",
        status: opportunities.length > 0 ? "success" : "error",
        message: `${opportunities.length} opportunities available`,
        data: opportunities,
      });
    } catch (error) {
      newStatuses.push({
        name: "Betting Data",
        status: "error",
        message: "Failed to fetch betting data",
        data: null,
      });
    }

    // Check analytics;
    try {

      newStatuses.push({
        name: "Analytics Service",
        status: analytics.current_balance !== undefined ? "success" : "error",
        message: `Balance: $${analytics.current_balance?.toLocaleString() || 0}`,
        data: analytics,
      });
    } catch (error) {
      newStatuses.push({
        name: "Analytics Service",
        status: "error",
        message: "Analytics unavailable",
        data: null,
      });
    }

    // Check model performance;
    try {

      newStatuses.push({
        name: "ML Models",
        status: accuracy.overall_accuracy > 0 ? "success" : "error",
        message: `${(accuracy.overall_accuracy * 100).toFixed(1)}% accuracy`,
        data: accuracy,
      });
    } catch (error) {
      newStatuses.push({
        name: "ML Models",
        status: "error",
        message: "Model performance unavailable",
        data: null,
      });
    }

    // Check transactions;
    try {

      newStatuses.push({
        name: "Transaction System",
        status: "success",
        message: `${transactions.total_count} transactions tracked`,
        data: transactions,
      });
    } catch (error) {
      newStatuses.push({
        name: "Transaction System",
        status: "error",
        message: "Transaction data unavailable",
        data: null,
      });
    }

    setStatuses(newStatuses);
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" / key={94912}>;
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" / key={673140}>;
      case "loading":
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" / key={180477}>;
      default:
        return <Database className="w-5 h-5 text-gray-400" / key={680506}>;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-500/10 border-green-500/30";
      case "error":
        return "bg-red-500/10 border-red-500/30";
      case "loading":
        return "bg-yellow-500/10 border-yellow-500/30";
      default:
        return "bg-gray-500/10 border-gray-500/30";
    }
  };

  const overallStatus = statuses.every((s) => s.status === "success")
    ? "success"
    : statuses.some((s) => s.status === "success")
      ? "partial"
      : "error";

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-2xl max-w-6xl mx-auto" key={87849}>
      <div className="flex items-center justify-between mb-6" key={530716}>
        <div className="flex items-center space-x-3" key={602729}>
          <Wifi className="w-6 h-6 text-cyan-400" / key={620046}>
          <h2 className="text-2xl font-bold text-white" key={416278}>
            Backend Integration Status;
          </h2>
        </div>

        <div className="flex items-center space-x-4" key={787951}>
          <div;
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              overallStatus === "success"
                ? "bg-green-500/20 text-green-400"
                : overallStatus === "partial"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
            }`}
           key={418177}>
            {overallStatus === "success"
              ? "✅ All Systems Operational"
              : overallStatus === "partial"
                ? "⚠️ Partial Integration"
                : "❌ Integration Issues"}
          </div>

          <button;
            onClick={checkAllIntegrations}
            disabled={isLoading}
            className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors disabled:opacity-50"
           key={178624}>
            {isLoading ? "Checking..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-4" key={853865}>
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={696568}>
        {statuses.map((item, index) => (
          <motion.div;
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border backdrop-blur-sm ${getStatusBg(item.status)}`}
           key={850864}>
            <div className="flex items-center justify-between mb-3" key={56204}>
              <h3 className="font-semibold text-white" key={766242}>{item.name}</h3>
              {getStatusIcon(item.status)}
            </div>

            <p className="text-sm text-gray-300 mb-3" key={11613}>{item.message}</p>

            {item.data && (
              <div className="space-y-2" key={725977}>
                {item.name === "Backend API" && item.data && (
                  <div className="text-xs space-y-1" key={937692}>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Status:</span>
                      <span className="text-green-400" key={40612}>{item.data.status}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Version:</span>
                      <span className="text-white" key={453983}>{item.data.version}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Uptime:</span>
                      <span className="text-white" key={453983}>
                        {Math.round(item.data.uptime)}s;
                      </span>
                    </div>
                  </div>
                )}

                {item.name === "Betting Data" &&
                  item.data &&
                  item.data.length > 0 && (
                    <div className="text-xs space-y-1" key={937692}>
                      {item.data.slice(0, 2).map((opp: any) => (
                        <div;
                          key={opp.id}
                          className="flex justify-between text-gray-300"
                         key={585030}>
                          <span className="truncate" key={201964}>{opp.event}</span>
                          <span className="text-cyan-400" key={797516}>{opp.odds}</span>
                        </div>
                      ))}
                    </div>
                  )}

                {item.name === "Analytics Service" && item.data && (
                  <div className="text-xs space-y-1" key={937692}>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Win Rate:</span>
                      <span className="text-green-400" key={40612}>
                        {(item.data.win_rate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>ROI:</span>
                      <span className="text-cyan-400" key={797516}>
                        {item.data.roi.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Total Wagered:</span>
                      <span className="text-white" key={453983}>
                        ${item.data.total_wagered?.toLocaleString() || 0}
                      </span>
                    </div>
                  </div>
                )}

                {item.name === "ML Models" && item.data && (
                  <div className="text-xs space-y-1" key={937692}>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Precision:</span>
                      <span className="text-green-400" key={40612}>
                        {(item.data.precision * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>Recall:</span>
                      <span className="text-cyan-400" key={797516}>
                        {(item.data.recall * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span className="text-gray-400" key={912100}>F1 Score:</span>
                      <span className="text-purple-400" key={846332}>
                        {(item.data.f1_score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700" key={644452}>
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center" key={810298}>
          <TrendingUp className="w-5 h-5 text-green-400 mr-2" / key={554464}>
          Integration Summary;
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" key={472236}>
          <div key={241917}>
            <div className="text-2xl font-bold text-green-400" key={77409}>
              {statuses.filter((s) => s.status === "success").length}
            </div>
            <div className="text-sm text-gray-400" key={372957}>Services Online</div>
          </div>

          <div key={241917}>
            <div className="text-2xl font-bold text-red-400" key={683097}>
              {statuses.filter((s) => s.status === "error").length}
            </div>
            <div className="text-sm text-gray-400" key={372957}>Services Offline</div>
          </div>

          <div key={241917}>
            <div className="text-2xl font-bold text-cyan-400" key={312838}>
              {statuses.length > 0;
                ? Math.round(
                    (statuses.filter((s) => s.status === "success").length /
                      statuses.length) *
                      100,
                  )
                : 0}
              %
            </div>
            <div className="text-sm text-gray-400" key={372957}>System Health</div>
          </div>

          <div key={241917}>
            <div className="text-2xl font-bold text-white" key={868017}>
              {Math.round((Date.now() - lastUpdate.getTime()) / 1000)}s;
            </div>
            <div className="text-sm text-gray-400" key={372957}>Last Check</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationStatus;
