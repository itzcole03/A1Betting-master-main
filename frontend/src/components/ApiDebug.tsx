/**
 * API Debug Component;
 * Simple component to test API connections and display detailed error information;
 */

import React, { useState, useEffect  } from 'react.ts';
import { backendApi } from '@/services/backendApi.ts';

interface ApiTestResult {
  endpoint: string;
  status: "success" | "error" | "loading";
  data?: any;
  error?: string;
  responseTime?: number;
}

export const ApiDebug: React.FC = () => {
  const [results, setResults] = useState<ApiTestResult[] key={870981}>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any key={295429}>(null);

  const testEndpoints = [
    { name: "Health Check", fn: () => backendApi.getHealth() },
    {
      name: "Betting Opportunities",
      fn: () => backendApi.getBettingOpportunities(),
    },
    { name: "Advanced Analytics", fn: () => backendApi.getAdvancedAnalytics() },
    { name: "Model Performance", fn: () => backendApi.getModelPerformance() },
  ];

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    // First, get connection status;
    try {

      setConnectionStatus(status);
      // console statement removed
    } catch (error) {
      // console statement removed
    }

    for (const test of testEndpoints) {

      try {
        setResults((prev) => [
          ...prev,
          { endpoint: test.name, status: "loading" },
        ]);


        setResults((prev) =>
          prev.map((r) =>
            r.endpoint === test.name;
              ? { ...r, status: "success", data, responseTime }
              : r,
          ),
        );
      } catch (error: any) {

        setResults((prev) =>
          prev.map((r) =>
            r.endpoint === test.name;
              ? {
                  ...r,
                  status: "error",
                  error: error.message || "Unknown error",
                  responseTime,
                }
              : r,
          ),
        );
      }
    }

    setIsRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "loading":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "loading":
        return "⏳";
      default:
        return "❓";
    }
  };

  return (
    <div className="w-full h-full overflow-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white" key={473557}>
      <div className="max-w-4xl mx-auto p-6" key={367344}>
        <div className="flex justify-between items-center mb-6" key={962854}>
          <h2 className="text-2xl font-bold text-white" key={416278}>
            API Connection Debug;
          </h2>
          <button;
            onClick={runTests}
            disabled={isRunning}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg disabled:opacity-50 transition-colors"
           key={404451}>
            {isRunning ? "Testing..." : "Run Tests"}
          </button>
        </div>

        <div className="space-y-4" key={160407}>
          {results.map((result, index) => (
            <div;
              key={index}
              className="bg-black/30 backdrop-blur-lg rounded-lg p-4 border border-cyan-500/20"
             key={792666}>
              <div className="flex items-center justify-between mb-2" key={120997}>
                <div className="flex items-center space-x-2" key={740830}>
                  <span key={595076}>{getStatusIcon(result.status)}</span>
                  <h3 className="font-semibold text-white" key={766242}>
                    {result.endpoint}
                  </h3>
                  <span;
                    className={`text-sm ${result.status === "success" ? "text-green-400" : result.status === "error" ? "text-red-400" : "text-yellow-400"}`}
                   key={743711}>
                    {result.status}
                  </span>
                </div>
                {result.responseTime && (
                  <span className="text-sm text-gray-400" key={257018}>
                    {result.responseTime}ms;
                  </span>
                )}
              </div>

              {result.error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mb-2" key={235027}>
                  <p className="text-red-400 text-sm font-medium" key={87166}>Error:</p>
                  <p className="text-red-300 text-sm" key={887666}>{result.error}</p>
                </div>
              )}

              {result.data && (
                <div className="bg-gray-800/30 border border-gray-600/30 rounded p-3" key={115339}>
                  <p className="text-gray-300 text-sm font-medium mb-2" key={787303}>
                    Response:
                  </p>
                  <pre className="text-xs text-gray-200 overflow-auto max-h-40 bg-black/20 p-2 rounded" key={581169}>
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg backdrop-blur-sm" key={440362}>
          <h3 className="font-semibold text-cyan-400 mb-2" key={611298}>
            Debug Information;
          </h3>
          <div className="text-sm text-gray-300 space-y-1" key={375326}>
            <p key={161203}>
              <strong key={829099}>Environment:</strong>{" "}
              {import.meta.env.DEV ? "Development" : "Production"}
            </p>
            <p key={161203}>
              <strong key={829099}>API Base URL:</strong>{" "}
              {import.meta.env.VITE_API_URL || "http://localhost:8000"}
            </p>
            <p key={161203}>
              <strong key={829099}>WebSocket URL:</strong>{" "}
              {import.meta.env.VITE_WEBSOCKET_URL || "ws://localhost:8000"}
            </p>
            <p key={161203}>
              <strong key={829099}>Current Time:</strong> {new Date().toISOString()}
            </p>
            <p key={161203}>
              <strong key={829099}>Cloud Environment:</strong>{" "}
              {window.location.hostname.includes("fly.dev")
                ? "Yes (Mock Service Active)"
                : "No"}
            </p>
          </div>
        </div>

        {connectionStatus && (
          <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur-sm" key={780634}>
            <h3 className="font-semibold text-purple-400 mb-2" key={741333}>
              Connection Status;
            </h3>
            <div className="text-sm space-y-2" key={849987}>
              <div className="flex items-center space-x-2" key={740830}>
                <span key={595076}>{connectionStatus.isConnected ? "✅" : "❌"}</span>
                <span className="text-gray-300" key={110058}>
                  <strong key={829099}>Backend Connection:</strong>{" "}
                  {connectionStatus.isConnected ? "Connected" : "Disconnected"}
                </span>
              </div>
              <p className="text-gray-300" key={821246}>
                <strong key={829099}>Base URL:</strong> {connectionStatus.baseURL}
              </p>
              {connectionStatus.error && (
                <p className="text-red-400" key={874034}>
                  <strong key={829099}>Error:</strong> {connectionStatus.error}
                </p>
              )}

              <div className="mt-2" key={848027}>
                <p className="font-medium mb-1 text-gray-300" key={300989}>
                  Endpoint Status:
                </p>
                <div className="grid grid-cols-2 gap-1 text-xs" key={431352}>
                  {Object.entries(connectionStatus.endpoints).map(
                    ([endpoint, isWorking]) => (
                      <div;
                        key={endpoint}
                        className="flex items-center space-x-1"
                       key={361182}>
                        <span key={595076}>{isWorking ? "✅" : "❌"}</span>
                        <span className="text-gray-400" key={912100}>{endpoint}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiDebug;
