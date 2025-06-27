import React from 'react.ts';
import { CheckCircle, XCircle, Clock, AlertTriangle, Wifi } from 'lucide-react.ts';

interface DataSource {
  name: string;
  status: "connected" | "disconnected" | "connecting" | "error";
  lastUpdate: string;
  dataQuality: number;
  endpoint: string;
}

interface DataSourcesPanelProps {
  connectedSources?: number;
  totalSources?: number;
}

export function DataSourcesPanel({
  connectedSources = 12,
  totalSources = 15,
}: DataSourcesPanelProps) {
  // Mock data sources - in a real app, this would come from your data service;
  const dataSources: DataSource[] = [
    {
      name: "PrizePicks API",
      status: "connected",
      lastUpdate: "2s ago",
      dataQuality: 0.95,
      endpoint: "api.prizepicks.com",
    },
    {
      name: "ESPN API",
      status: "connected",
      lastUpdate: "5s ago",
      dataQuality: 0.88,
      endpoint: "api.espn.com",
    },
    {
      name: "SportsRadar",
      status: "connected",
      lastUpdate: "3s ago",
      dataQuality: 0.92,
      endpoint: "api.sportsradar.com",
    },
    {
      name: "DraftKings",
      status: "connecting",
      lastUpdate: "30s ago",
      dataQuality: 0.0,
      endpoint: "api.draftkings.com",
    },
    {
      name: "FanDuel",
      status: "error",
      lastUpdate: "2m ago",
      dataQuality: 0.0,
      endpoint: "api.fanduel.com",
    },
    {
      name: "Injury Reports",
      status: "connected",
      lastUpdate: "1m ago",
      dataQuality: 0.85,
      endpoint: "injuries.api.com",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-500" / key={393338}>;
      case "connecting":
        return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" / key={899645}>;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" / key={661472}>;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" / key={242173}>;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400";
      case "connecting":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "error":
        return "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const connectionPercentage =
    totalSources > 0 ? (connectedSources / totalSources) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg" key={65136}>
      <div className="flex items-center justify-between mb-6" key={530716}>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center" key={307918}>
          <Wifi className="w-5 h-5 mr-2 text-blue-500" / key={934661}>
          Real Data Sources;
        </h3>
        <div className="text-right" key={144468}>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400" key={512924}>
            {connectedSources}/{totalSources}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
            {connectionPercentage.toFixed(0)}% Connected;
          </div>
        </div>
      </div>

      {/* Connection Status Bar */}
      <div className="mb-6" key={677855}>
        <div className="flex justify-between items-center mb-2" key={88839}>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300" key={95670}>
            Connection Health;
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400" key={896462}>
            {connectionPercentage.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700" key={808701}>
          <div;
            className={`h-3 rounded-full transition-all duration-500 ${
              connectionPercentage  key={179482}>= 80;
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : connectionPercentage >= 60;
                  ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                  : "bg-gradient-to-r from-red-500 to-red-600"
            }`}
            style={{ width: `${connectionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Data Sources List */}
      <div className="space-y-3" key={186520}>
        {dataSources.map((source, index) => (
          <div;
            key={index}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
           key={709131}>
            <div className="flex items-center space-x-3" key={602729}>
              {getStatusIcon(source.status)}
              <div key={241917}>
                <div className="font-medium text-gray-900 dark:text-white" key={501455}>
                  {source.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
                  {source.endpoint}
                </div>
              </div>
            </div>

            <div className="text-right" key={144468}>
              <div;
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(source.status)}`}
               key={17752}>
                {source.status}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1" key={276145}>
                {source.lastUpdate}
              </div>
              {source.status === "connected" && (
                <div className="text-xs text-green-600 dark:text-green-400" key={681410}>
                  {(source.dataQuality * 100).toFixed(0)}% quality;
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700" key={176543}>
        <div className="grid grid-cols-3 gap-4 text-center" key={762234}>
          <div key={241917}>
            <div className="text-lg font-bold text-green-600 dark:text-green-400" key={285990}>
              {dataSources.filter((s) => s.status === "connected").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
              Active;
            </div>
          </div>
          <div key={241917}>
            <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400" key={217507}>
              {dataSources.filter((s) => s.status === "connecting").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
              Connecting;
            </div>
          </div>
          <div key={241917}>
            <div className="text-lg font-bold text-red-600 dark:text-red-400" key={828458}>
              {dataSources.filter((s) => s.status === "error").length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>
              Error;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
