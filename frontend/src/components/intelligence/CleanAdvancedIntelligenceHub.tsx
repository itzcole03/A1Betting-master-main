/**
 * Clean Advanced Intelligence Hub;
 * User-friendly interface with simplified navigation and backend monitoring;
 */

import React, { useState, useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  Brain,
  Activity,
  Target,
  Settings,
  Monitor,
  Server,
  Zap,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Eye,
  Play,
  Pause,
  Power,
  Wifi,
  WifiOff,
  Database,
} from 'lucide-react.ts';

// Clean, minimal interfaces;
interface SystemHealth {
  backend: "healthy" | "degraded" | "offline";
  apis: {
    sportsradar: "healthy" | "degraded" | "offline";
    dailyfantasy: "healthy" | "degraded" | "offline";
    theodds: "healthy" | "degraded" | "offline";
  };
  accuracy: number;
  uptime: number;
  lastUpdate: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  status?: "active" | "inactive" | "pending";
}

export const CleanAdvancedIntelligenceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [systemHealth, setSystemHealth] = useState<SystemHealth key={277585}>({
    backend: "healthy",
    apis: {
      sportsradar: "healthy",
      dailyfantasy: "healthy",
      theodds: "healthy",
    },
    accuracy: 85.0,
    uptime: 99.8,
    lastUpdate: new Date().toLocaleTimeString(),
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check system health with graceful fallback;
  const checkSystemHealth = async () => {
    setIsLoading(true);
    try {
      // Check if we're in development and backend is available;
      const backendUrl =
        process.env.NODE_ENV === "development"
          ? "http://localhost:8000/api/health/all"
          : "/api/health/all";

      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout;

      const response = await fetch(backendUrl, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (response.ok) {

        setSystemHealth((prev) => ({
          ...prev,
          backend: "healthy",
          apis: {
            sportsradar:
              data.services?.sportsradar?.status === "healthy"
                ? "healthy"
                : "degraded",
            dailyfantasy:
              data.services?.dailyfantasy?.status === "healthy"
                ? "healthy"
                : "degraded",
            theodds:
              data.services?.theodds?.status === "healthy"
                ? "healthy"
                : "degraded",
          },
          accuracy: data.accuracy || prev.accuracy,
          uptime: data.uptime || prev.uptime,
          lastUpdate: new Date().toLocaleTimeString(),
        }));
      } else {
        // Backend responded but with error status;
        setSystemHealth((prev) => ({
          ...prev,
          backend: "degraded",
          lastUpdate: new Date().toLocaleTimeString(),
        }));
      }
    } catch (error) {
      // Network error, CORS error, timeout, or other fetch failure;
      // console statement removed
      setSystemHealth((prev) => ({
        ...prev,
        backend: "offline",
        apis: {
          sportsradar: "offline",
          dailyfantasy: "offline",
          theodds: "offline",
        },
        lastUpdate: new Date().toLocaleTimeString(),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-refresh system health with error resilience;
  useEffect(() => {
    // Initial health check with delay to avoid immediate fetch on mount;
    const initialCheck = setTimeout(() => {
      checkSystemHealth().catch(console.warn);
    }, 1000);

    // Less aggressive interval - check every 2 minutes instead of 30 seconds;
    const interval = setInterval(() => {
      checkSystemHealth().catch(console.warn);
    }, 120000);

    return () => {
      clearTimeout(initialCheck);
      clearInterval(interval);
    };
  }, []);

  // Quick actions for easy access;
  const quickActions: QuickAction[] = [
    {
      id: "refresh",
      label: "Refresh System",
      icon: <RefreshCw className="w-4 h-4" / key={190374}>,
      action: () => checkSystemHealth().catch(console.warn),
      status: isLoading ? "pending" : "active",
    },
    {
      id: "backend",
      label: "Backend Status",
      icon:
        systemHealth.backend === "healthy" ? (
          <Server className="w-4 h-4" / key={234913}>
        ) : (
          <AlertCircle className="w-4 h-4" / key={466896}>
        ),
      action: () => setActiveTab("backend"),
      status: systemHealth.backend === "healthy" ? "active" : "inactive",
    },
    {
      id: "predictions",
      label: "View Predictions",
      icon: <Target className="w-4 h-4" / key={184202}>,
      action: () => setActiveTab("predictions"),
      status: "active",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 className="w-4 h-4" / key={509964}>,
      action: () => setActiveTab("analytics"),
      status: "active",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-green-500" / key={862748}>;
      case "degraded":
        return <AlertCircle className="w-5 h-5 text-yellow-500" / key={11964}>;
      case "offline":
        return <AlertCircle className="w-5 h-5 text-red-500" / key={55732}>;
      default:
        return <Activity className="w-5 h-5 text-gray-500" / key={276792}>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600 bg-green-50 border-green-200";
      case "degraded":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "offline":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" key={738459}>
      {/* Header */}
      <div className="mb-8" key={286587}>
        <div className="flex items-center gap-3 mb-2" key={283743}>
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg" key={137666}>
            <Brain className="w-8 h-8 text-white" / key={457993}>
          </div>
          <div key={241917}>
            <h1 className="text-3xl font-bold text-gray-900" key={314869}>
              Intelligence Hub;
            </h1>
            <p className="text-gray-600" key={486863}>
              AI-powered sports betting intelligence center;
            </p>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm" key={631969}>
          <div className="flex items-center gap-2" key={100294}>
            <div;
              className={`w-3 h-3 rounded-full ${systemHealth.backend === "healthy" ? "bg-green-500" : "bg-red-500"} animate-pulse`}
             key={930622}></div>
            <span className="text-sm font-medium" key={318054}>System Active</span>
          </div>
          <div className="flex items-center gap-2" key={100294}>
            <Target className="w-4 h-4 text-blue-500" / key={3129}>
            <span className="text-sm font-medium" key={318054}>
              {systemHealth.accuracy}% Accuracy;
            </span>
          </div>
          <div className="flex items-center gap-2" key={100294}>
            <Activity className="w-4 h-4 text-green-500" / key={349045}>
            <span className="text-sm font-medium" key={318054}>
              {systemHealth.uptime}% Uptime;
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500" key={767995}>
            <span className="text-sm" key={887361}>
              Last update: {systemHealth.lastUpdate}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8" key={286587}>
        <h2 className="text-lg font-semibold text-gray-900 mb-4" key={505621}>
          Quick Actions;
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={815557}>
          {quickActions.map((action) => (
            <motion.button;
              key={action.id}
              onClick={action.action}
              disabled={action.status === "pending"}
              className={`p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 ${
                action.status === "pending"
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              whileHover={{ scale: action.status === "pending" ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
             key={10919}>
              <div className="flex flex-col items-center gap-2" key={12501}>
                <div;
                  className={`p-2 rounded-lg ${
                    action.status === "active"
                      ? "bg-blue-100 text-blue-600"
                      : action.status === "inactive"
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                  }`}
                 key={95274}>
                  {action.status === "pending" ? (
                    <RefreshCw className="w-4 h-4 animate-spin" / key={971972}>
                  ) : (
                    action.icon;
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700" key={436322}>
                  {action.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm" key={240958}>
        {/* Tab Navigation */}
        <div className="border-b border-gray-200" key={635094}>
          <nav className="flex space-x-8 px-6" key={700003}>
            {[
              {
                id: "overview",
                label: "Overview",
                icon: <Eye className="w-4 h-4" / key={800383}>,
              },
              {
                id: "backend",
                label: "Backend Control",
                icon: <Server className="w-4 h-4" / key={234913}>,
              },
              {
                id: "api-tests",
                label: "API Testing",
                icon: <Activity className="w-4 h-4" / key={270767}>,
              },
              {
                id: "predictions",
                label: "Predictions",
                icon: <Target className="w-4 h-4" / key={184202}>,
              },
              {
                id: "analytics",
                label: "Analytics",
                icon: <BarChart3 className="w-4 h-4" / key={509964}>,
              },
            ].map((tab) => (
              <button;
                key={tab.id}
                onClick={() = key={56550}> setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id;
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6" key={935494}>
          <AnimatePresence mode="wait" key={725119}>
            {activeTab === "overview" && (
              <motion.div;
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
               key={481042}>
                <OverviewTab systemHealth={systemHealth} / key={444295}>
              </motion.div>
            )}

            {activeTab === "backend" && (
              <motion.div;
                key="backend"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
               key={492947}>
                <BackendControlTab;
                  systemHealth={systemHealth}
                  onRefresh={checkSystemHealth}
                / key={430938}>
              </motion.div>
            )}

            {activeTab === "api-tests" && (
              <motion.div;
                key="api-tests"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
               key={85660}>
                <APITestingTab / key={113361}>
              </motion.div>
            )}

            {activeTab === "predictions" && (
              <motion.div;
                key="predictions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
               key={152096}>
                <PredictionsTab / key={802345}>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div;
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
               key={96978}>
                <AnalyticsTab / key={883332}>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component;
const OverviewTab: React.FC<{ systemHealth: SystemHealth }> = ({
  systemHealth,
}) => {
  return (
    <div className="space-y-6" key={501869}>
      <div key={241917}>
        <h3 className="text-xl font-semibold text-gray-900 mb-4" key={36403}>
          System Overview;
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
          {/* System Status */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200" key={344493}>
            <div className="flex items-center gap-3 mb-3" key={734472}>
              <Monitor className="w-6 h-6 text-blue-600" / key={70269}>
              <h4 className="font-semibold text-blue-900" key={421040}>System Status</h4>
            </div>
            <div className="space-y-2" key={725977}>
              <div className="flex justify-between" key={588832}>
                <span className="text-blue-700" key={194576}>Backend</span>
                <span;
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    systemHealth.backend === "healthy"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                 key={107785}>
                  {systemHealth.backend}
                </span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span className="text-blue-700" key={194576}>Accuracy</span>
                <span className="font-semibold text-blue-900" key={889942}>
                  {systemHealth.accuracy}%
                </span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span className="text-blue-700" key={194576}>Uptime</span>
                <span className="font-semibold text-blue-900" key={889942}>
                  {systemHealth.uptime}%
                </span>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200" key={854737}>
            <div className="flex items-center gap-3 mb-3" key={734472}>
              <Database className="w-6 h-6 text-green-600" / key={458528}>
              <h4 className="font-semibold text-green-900" key={425511}>API Services</h4>
            </div>
            <div className="space-y-2" key={725977}>
              {Object.entries(systemHealth.apis).map(([api, status]) => (
                <div key={api} className="flex justify-between items-center" key={137921}>
                  <span className="text-green-700 capitalize" key={715826}>{api}</span>
                  <div className="flex items-center gap-1" key={238246}>
                    <div;
                      className={`w-2 h-2 rounded-full ${
                        status === "healthy"
                          ? "bg-green-500"
                          : status === "degraded"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                     key={273279}></div>
                    <span className="text-xs" key={944235}>{status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200" key={177163}>
            <div className="flex items-center gap-3 mb-3" key={734472}>
              <TrendingUp className="w-6 h-6 text-purple-600" / key={192903}>
              <h4 className="font-semibold text-purple-900" key={484649}>Performance</h4>
            </div>
            <div className="space-y-2" key={725977}>
              <div className="flex justify-between" key={588832}>
                <span className="text-purple-700" key={676348}>Predictions Today</span>
                <span className="font-semibold text-purple-900" key={615255}>147</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span className="text-purple-700" key={676348}>Win Rate</span>
                <span className="font-semibold text-purple-900" key={615255}>87.3%</span>
              </div>
              <div className="flex justify-between" key={588832}>
                <span className="text-purple-700" key={676348}>Active Strategies</span>
                <span className="font-semibold text-purple-900" key={615255}>5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Backend Control Tab Component;
const BackendControlTab: React.FC<{
  systemHealth: SystemHealth;
  onRefresh: () => void;
}> = ({ systemHealth, onRefresh }) => {
  const [logs, setLogs] = useState<string[] key={530032}>([
    "✅ Backend server started on port 8000",
    "✅ WebSocket server initialized",
    "✅ API endpoints registered",
    "⚠️ SportsRadar API key validation pending",
    "✅ Health check endpoints active",
  ]);

  const restartService = async (service: string) => {
    setLogs((prev) => [...prev, `🔄 Restarting ${service}...`]);
    // Simulate restart;
    setTimeout(() => {
      setLogs((prev) => [...prev, `✅ ${service} restarted successfully`]);
      onRefresh();
    }, 2000);
  };

  return (
    <div className="space-y-6" key={501869}>
      <div className="flex justify-between items-center" key={795957}>
        <h3 className="text-xl font-semibold text-gray-900" key={438842}>
          Backend Control Center;
        </h3>
        <button;
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
         key={795286}>
          <RefreshCw className="w-4 h-4" / key={190374}>
          Refresh Status;
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
        {/* Service Controls */}
        <div className="space-y-4" key={160407}>
          <h4 className="text-lg font-semibold text-gray-800" key={282654}>
            Service Management;
          </h4>

          {/* Backend Service */}
          <div className="border border-gray-200 rounded-lg p-4" key={680449}>
            <div className="flex justify-between items-center mb-3" key={719380}>
              <div className="flex items-center gap-3" key={443099}>
                <Server;
                  className={`w-5 h-5 ${systemHealth.backend === "healthy" ? "text-green-500" : "text-red-500"}`}
                / key={721819}>
                <span className="font-medium" key={514486}>Backend Server</span>
              </div>
              <span;
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  systemHealth.backend === "healthy"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
               key={393178}>
                {systemHealth.backend}
              </span>
            </div>
            <div className="flex gap-2" key={15266}>
              <button;
                onClick={() = key={206350}> restartService("Backend Server")}
                className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-sm"
              >
                Restart;
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm" key={298291}>
                View Logs;
              </button>
            </div>
          </div>

          {/* API Services */}
          {Object.entries(systemHealth.apis).map(([api, status]) => (
            <div key={api} className="border border-gray-200 rounded-lg p-4" key={490235}>
              <div className="flex justify-between items-center mb-3" key={719380}>
                <div className="flex items-center gap-3" key={443099}>
                  <Database;
                    className={`w-5 h-5 ${status === "healthy" ? "text-green-500" : "text-yellow-500"}`}
                  / key={460660}>
                  <span className="font-medium capitalize" key={530937}>{api} API</span>
                </div>
                <span;
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status === "healthy"
                      ? "bg-green-100 text-green-700"
                      : status === "degraded"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                 key={820593}>
                  {status}
                </span>
              </div>
              <div className="flex gap-2" key={15266}>
                <button;
                  onClick={() = key={887064}> restartService(`${api} API`)}
                  className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-sm"
                >
                  Reconnect;
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm" key={298291}>
                  Test;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* System Logs */}
        <div key={241917}>
          <h4 className="text-lg font-semibold text-gray-800 mb-4" key={231621}>
            System Logs;
          </h4>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-80 overflow-y-auto font-mono text-sm" key={388694}>
            {logs.map((log, index) => (
              <div key={index} className="mb-1" key={746128}>
                <span className="text-gray-500" key={816110}>
                  [{new Date().toLocaleTimeString()}]
                </span>{" "}
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Predictions Tab Component;
const PredictionsTab: React.FC = () => {
  return (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold text-gray-900" key={438842}>AI Predictions</h3>
      <div className="text-center py-12 text-gray-500" key={880657}>
        <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" / key={984176}>
        <p key={161203}>Advanced prediction interface coming soon...</p>
        <p className="text-sm" key={364551}>Integrated with Ultra Accuracy Dashboard</p>
      </div>
    </div>
  );
};

// Analytics Tab Component;
const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6" key={501869}>
      <h3 className="text-xl font-semibold text-gray-900" key={438842}>
        Analytics Dashboard;
      </h3>
      <div className="text-center py-12 text-gray-500" key={880657}>
        <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-400" / key={476700}>
        <p key={161203}>Advanced analytics interface coming soon...</p>
        <p className="text-sm" key={364551}>Performance metrics and insights</p>
      </div>
    </div>
  );
};

// API Testing Tab Component;
const APITestingTab: React.FC = () => {
  const [activeTestSuite, setActiveTestSuite] = useState<
    "comprehensive" | "sportsradar"
  >("comprehensive");

  return (
    <div className="space-y-6" key={501869}>
      <div className="flex justify-between items-center" key={795957}>
        <h3 className="text-xl font-semibold text-gray-900" key={438842}>
          API Testing Suite;
        </h3>
        <div className="flex gap-2" key={15266}>
          <button;
            onClick={() = key={919301}> setActiveTestSuite("comprehensive")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTestSuite === "comprehensive"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All APIs;
          </button>
          <button;
            onClick={() = key={919301}> setActiveTestSuite("sportsradar")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTestSuite === "sportsradar"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            SportsRadar Only;
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" key={635587}>
        <div className="flex items-center gap-2 text-yellow-800" key={78387}>
          <Activity className="w-5 h-5" / key={942081}>
          <span className="font-medium" key={514486}>Admin Feature</span>
        </div>
        <p className="text-yellow-700 mt-1" key={493622}>
          API testing tools for system administrators. Test external API;
          integrations and monitor service health.
        </p>
      </div>

      {activeTestSuite === "comprehensive" && (
        <div className="space-y-4" key={160407}>
          <h4 className="text-lg font-semibold text-gray-800" key={282654}>
            Comprehensive API Test Suite;
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200" key={344493}>
              <div className="flex items-center gap-3 mb-3" key={734472}>
                <Database className="w-6 h-6 text-blue-600" / key={485370}>
                <h5 className="font-semibold text-blue-900" key={651768}>SportsRadar API</h5>
              </div>
              <p className="text-blue-700 text-sm mb-3" key={550802}>
                NBA games, player stats, odds comparison;
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full" key={59428}>
                Test SportsRadar;
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-200" key={854737}>
              <div className="flex items-center gap-3 mb-3" key={734472}>
                <Database className="w-6 h-6 text-green-600" / key={458528}>
                <h5 className="font-semibold text-green-900" key={137717}>
                  DailyFantasy API;
                </h5>
              </div>
              <p className="text-green-700 text-sm mb-3" key={256932}>
                Contests, players, projections, lineups;
              </p>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors w-full" key={855435}>
                Test DailyFantasy;
              </button>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-6 rounded-xl border border-purple-200" key={177163}>
              <div className="flex items-center gap-3 mb-3" key={734472}>
                <Database className="w-6 h-6 text-purple-600" / key={729503}>
                <h5 className="font-semibold text-purple-900" key={473352}>TheOdds API</h5>
              </div>
              <p className="text-purple-700 text-sm mb-3" key={245000}>
                Live odds, sports data, scores;
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full" key={187367}>
                Test TheOdds;
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTestSuite === "sportsradar" && (
        <div className="space-y-4" key={160407}>
          <h4 className="text-lg font-semibold text-gray-800" key={282654}>
            SportsRadar API Testing;
          </h4>
          <div className="bg-white border border-gray-200 rounded-lg p-6" key={623637}>
            <div className="text-center py-8 text-gray-500" key={998723}>
              <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" / key={975643}>
              <p key={161203}>SportsRadar-specific testing interface</p>
              <p className="text-sm" key={364551}>
                Health checks, NBA games, player stats, odds comparison;
              </p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" key={676566}>
                Run SportsRadar Tests;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CleanAdvancedIntelligenceHub;
