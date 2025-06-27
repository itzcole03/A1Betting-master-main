import React, { useState, useEffect  } from 'react.ts';
import { CheckCircle, XCircle, Clock, Wifi } from 'lucide-react.ts';

interface ApiEndpoint {
  name: string;
  url: string;
  status: "pending" | "success" | "error";
  response?: any;
  error?: string;
}

export const DebugApiStatus: React.FC = () => {
  const [endpoints, setEndpoints] = useState<ApiEndpoint[] key={481875}>([
    { name: "Health", url: "/health", status: "pending" },
    {
      name: "Betting Opportunities",
      url: "/api/betting-opportunities",
      status: "pending",
    },
    { name: "Predictions", url: "/api/predictions", status: "pending" },
    { name: "Analytics", url: "/api/analytics/advanced", status: "pending" },
  ]);

  const [environment, setEnvironment] = useState({
    isDev: import.meta.env.DEV,
    hostname: window.location.hostname,
    protocol: window.location.protocol,
    port: window.location.port,
  });

  useEffect(() => {
    const testEndpoints = async () => {
      const results = await Promise.allSettled(
        endpoints.map(async (endpoint) => {
          try {


            return { ...endpoint, status: "success", response: data };
          } catch (error: any) {
            return { ...endpoint, status: "error", error: error.message };
          }
        }),
      );

      setEndpoints(
        results.map((result, index) =>
          result.status === "fulfilled"
            ? result.value;
            : { ...endpoints[index], status: "error", error: "Request failed" },
        ),
      );
    };

    testEndpoints();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" / key={94912}>;
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" / key={673140}>;
      default:
        return <Clock className="w-5 h-5 text-yellow-400 animate-spin" / key={180477}>;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm" key={772300}>
      <div className="bg-black/80 backdrop-blur-lg border border-gray-700 rounded-lg p-4 text-sm" key={821852}>
        <div className="flex items-center gap-2 mb-3" key={884420}>
          <Wifi className="w-4 h-4 text-cyan-400" / key={871599}>
          <span className="font-semibold text-cyan-400" key={883063}>API Status</span>
        </div>

        <div className="space-y-2 mb-3" key={694283}>
          {endpoints.map((endpoint, index) => (
            <div key={index} className="flex items-center justify-between" key={912667}>
              <span className="text-gray-300" key={110058}>{endpoint.name}</span>
              <div className="flex items-center gap-2" key={100294}>
                {getStatusIcon(endpoint.status)}
                <span;
                  className={`text-xs ${
                    endpoint.status === "success"
                      ? "text-green-400"
                      : endpoint.status === "error"
                        ? "text-red-400"
                        : "text-yellow-400"
                  }`}
                 key={345565}>
                  {endpoint.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-2 text-xs text-gray-400" key={656799}>
          <div key={241917}>
            Environment: {environment.isDev ? "Development" : "Production"}
          </div>
          <div key={241917}>
            Host: {environment.hostname}:{environment.port}
          </div>
          <div key={241917}>Protocol: {environment.protocol}</div>
        </div>
      </div>
    </div>
  );
};

export default DebugApiStatus;
