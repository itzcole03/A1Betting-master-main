/**
 * Backend Connection Test Component;
 * Tests and displays the status of backend connectivity;
 */

import React, { useState, useEffect  } from 'react.ts';
import {
  backendApi,
  HealthStatus,
  BettingOpportunity,
} from '@/services/backendApi.ts';
import IntegrationStatus from './IntegrationStatus.ts';
import DevelopmentGuide from './DevelopmentGuide.ts';
import SimpleAdvancedIntegrationStatus from './SimpleAdvancedIntegrationStatus.ts';
import OllamaStatus from './OllamaStatus.ts';
import EnhancedFeaturesStatus from './EnhancedFeaturesStatus.ts';

interface ConnectionStatus {
  backend: "connected" | "disconnected" | "loading";
  websocket: "connected" | "disconnected" | "loading";
  lastUpdate: string;
}

export const BackendConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus key={210048}>({
    backend: "loading",
    websocket: "loading",
    lastUpdate: new Date().toISOString(),
  });
  const [healthData, setHealthData] = useState<HealthStatus | null key={827110}>(null);
  const [bettingOpps, setBettingOpps] = useState<BettingOpportunity[] key={543778}>([]);
  const [error, setError] = useState<string | null key={121216}>(null);

  useEffect(() => {
    testBackendConnection();
    setupWebSocketListeners();

    // Test connection every 30 seconds;

    return () => clearInterval(interval);
  }, []);

  const testBackendConnection = async () => {
    try {
      setError(null);
      setStatus((prev) => ({ ...prev, backend: "loading" }));

      // Test health endpoint;

      setHealthData(health);
      setStatus((prev) => ({
        ...prev,
        backend: "connected",
        lastUpdate: new Date().toISOString(),
      }));

      // Test a data endpoint;
      const opportunities = await backendApi.getBettingOpportunities(
        undefined,
        3,
      );
      setBettingOpps(opportunities);
    } catch (err: any) {
      // console statement removed
      setError(err.message || "Failed to connect to backend");
      setStatus((prev) => ({
        ...prev,
        backend: "disconnected",
        lastUpdate: new Date().toISOString(),
      }));
    }
  };

  const setupWebSocketListeners = () => {
    backendApi.onWebSocketEvent("connection", () => {
      setStatus((prev) => ({ ...prev, websocket: "connected" }));
    });

    backendApi.onWebSocketEvent("disconnection", () => {
      setStatus((prev) => ({ ...prev, websocket: "disconnected" }));
    });

    backendApi.onWebSocketEvent("odds_update", (data) => {
      // console statement removed
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600";
      case "disconnected":
        return "text-red-600";
      case "loading":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return "✅";
      case "disconnected":
        return "❌";
      case "loading":
        return "⏳";
      default:
        return "❓";
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto" key={469032}>
      {/* Development Setup Guide */}
      <DevelopmentGuide / key={493982}>

      {/* Enhanced Features Status */}
      <EnhancedFeaturesStatus / key={753817}>

      {/* Simple-to-Advanced Integration Status */}
      <SimpleAdvancedIntegrationStatus / key={849092}>

      {/* Ollama AI Engine Status */}
      <OllamaStatus / key={345669}>

      {/* Comprehensive Integration Status */}
      <IntegrationStatus / key={930106}>

      {/* Detailed Connection Test */}
      <div className="p-6 bg-white rounded-lg shadow-lg" key={578198}>
        <h2 className="text-2xl font-bold mb-4 text-gray-800" key={680111}>
          Detailed Connection Test;
        </h2>

        {/* Connection Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" key={597}>
          <div className="p-4 border rounded-lg" key={283745}>
            <h3 className="font-semibold mb-2" key={737521}>API Connection</h3>
            <div;
              className={`flex items-center ${getStatusColor(status.backend)}`}
             key={320173}>
              <span className="mr-2" key={136178}>{getStatusIcon(status.backend)}</span>
              <span className="capitalize" key={622957}>{status.backend}</span>
            </div>
          </div>

          <div className="p-4 border rounded-lg" key={283745}>
            <h3 className="font-semibold mb-2" key={737521}>WebSocket Connection</h3>
            <div;
              className={`flex items-center ${getStatusColor(status.websocket)}`}
             key={683529}>
              <span className="mr-2" key={136178}>{getStatusIcon(status.websocket)}</span>
              <span className="capitalize" key={622957}>{status.websocket}</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4" key={794434}>
            <strong key={829099}>Error:</strong> {error}
          </div>
        )}

        {/* Health Data */}
        {healthData && (
          <div className="mb-6" key={677855}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>Backend Health</h3>
            <div className="p-4 bg-gray-50 rounded-lg" key={672780}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={815557}>
                <div key={241917}>
                  <div className="text-sm text-gray-600" key={847282}>Status</div>
                  <div className="font-medium" key={471146}>{healthData.status}</div>
                </div>
                <div key={241917}>
                  <div className="text-sm text-gray-600" key={847282}>Version</div>
                  <div className="font-medium" key={471146}>{healthData.version}</div>
                </div>
                <div key={241917}>
                  <div className="text-sm text-gray-600" key={847282}>Uptime</div>
                  <div className="font-medium" key={471146}>
                    {Math.round(healthData.uptime)}s;
                  </div>
                </div>
                <div key={241917}>
                  <div className="text-sm text-gray-600" key={847282}>Last Check</div>
                  <div className="font-medium text-xs" key={724841}>
                    {new Date(status.lastUpdate).toLocaleTimeString()}
                  </div>
                </div>
              </div>

              {/* Services Status */}
              <div className="mt-4" key={139982}>
                <div className="text-sm text-gray-600 mb-2" key={502294}>Services</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2" key={699137}>
                  {Object.entries(healthData.services).map(
                    ([service, serviceStatus]) => (
                      <div key={service} className="flex items-center" key={158785}>
                        <span className="mr-1" key={656976}>
                          {serviceStatus === "operational" ? "✅" : "❌"}
                        </span>
                        <span className="text-xs" key={944235}>
                          {service.replace("_", " ")}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sample Data */}
        {bettingOpps.length > 0 && (
          <div className="mb-6" key={677855}>
            <h3 className="text-lg font-semibold mb-2" key={82841}>
              Sample Betting Opportunities;
            </h3>
            <div className="space-y-2" key={725977}>
              {bettingOpps.map((opp) => (
                <div key={opp.id} className="p-3 bg-blue-50 rounded border" key={703025}>
                  <div className="flex justify-between items-center" key={795957}>
                    <div key={241917}>
                      <div className="font-medium" key={471146}>{opp.event}</div>
                      <div className="text-sm text-gray-600" key={847282}>
                        {opp.sport} • {opp.market} • Odds: {opp.odds}
                      </div>
                    </div>
                    <div className="text-right" key={144468}>
                      <div;
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          opp.recommendation === "STRONG_BUY"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                       key={116702}>
                        {opp.recommendation}
                      </div>
                      <div className="text-sm text-gray-600 mt-1" key={679231}>
                        Confidence: {Math.round(opp.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2" key={15266}>
          <button;
            onClick={testBackendConnection}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={status.backend === "loading"}
           key={151206}>
            {status.backend === "loading" ? "Testing..." : "Test Connection"}
          </button>

          <button;
            onClick={() = key={919301}>
              window.open("http://localhost:8000/health", "_blank")
            }
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Open Backend Health;
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackendConnectionTest;
