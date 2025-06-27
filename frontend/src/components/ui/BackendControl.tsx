import React, { useState, useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  Server,
  Play,
  RefreshCw,
  Square,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Terminal,
} from 'lucide-react.ts';
import { api } from '@/services/api.ts';
import { BackendStarter } from '@/utils/backendStarter.ts';
import toast from 'react-hot-toast.ts';

interface BackendControlProps {
  isOffline: boolean;
  onStatusChange?: (isOnline: boolean) => void;
}

// Detect if user is on Windows;
const isWindows = () => {
  if (typeof navigator === "undefined") return false;
  const isWin =
    navigator.platform.includes("Win") ||
    navigator.userAgent.includes("Windows");
  // console statement removed
  return isWin;
};

export const BackendControl: React.FC<BackendControlProps key={625300}> = ({
  isOffline,
  onStatusChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [backendStatus, setBackendStatus] = useState<
    "online" | "offline" | "starting" | "error"
  >("offline");

  // Update backend status when isOffline prop changes;
  useEffect(() => {
    setBackendStatus(isOffline ? "offline" : "online");
  }, [isOffline]);

  const testConnection = async () => {
    setIsLoading(true);

    try {
      toast.loading("Testing backend connection...", { id: "connection-test" });

      if (status.isOnline) {
        setBackendStatus("online");
        toast.success(
          <>
            <div className="font-semibold" key={503466}>✅ Backend Online</div>
            <div className="text-sm" key={280879}>All services are responding normally</div>
          </>,
          { id: "connection-test" },
        );
        onStatusChange?.(true);
      } else {
        setBackendStatus("offline");

        // Check if we're in a cloud environment;
        const isCloudEnv =
          !window.location.hostname.includes("localhost") &&
          !window.location.hostname.includes("127.0.0.1");

        toast.error(
          <>
            <div className="font-semibold" key={503466}>❌ Backend Offline</div>
            <div className="text-sm" key={280879}>
              {status.error || "Services are not responding"}
            </div>
            <div className="text-xs mt-1 opacity-75" key={994602}>
              {isCloudEnv;
                ? "In production, ensure your backend service is deployed and accessible"
                : "Try starting the backend or check if it's running on a different port"}
            </div>
          </>,
          {
            id: "connection-test",
            duration: 6000,
          },
        );
        onStatusChange?.(false);
      }
    } catch (error) {
      setBackendStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      toast.error(
        <>
          <div className="font-semibold" key={503466}>🚫 Connection Error</div>
          <div className="text-sm" key={280879}>{errorMessage}</div>
          <div className="text-xs mt-1 opacity-75" key={994602}>
            Backend may not be running or accessible;
          </div>
        </>,
        {
          id: "connection-test",
          duration: 6000,
        },
      );

      // console statement removed
      onStatusChange?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  const startBackend = async () => {
    // console statement removed
    setIsLoading(true);
    setBackendStatus("starting");

    try {
      // Always show immediate feedback that the button was clicked;
      toast.loading("Checking backend status...", { id: "backend-start" });
      // console statement removed...");

      // First, try multiple connection attempts;

      // console statement removed

      // Always process the result, whether success or failure;
      if (result?.success) {
        setBackendStatus("online");
        toast.success(result.message, { id: "backend-start" });
        onStatusChange?.(true);

        // Retest connection after a short delay;
        setTimeout(async () => {

          if (!status.isOnline) {
            setBackendStatus("offline");
            toast.error(
              "Backend started but connection lost. Please check manually.",
              {
                id: "backend-recheck",
                duration: 8000,
              },
            );
          }
        }, 3000);
      } else {
        setBackendStatus("offline");

        // Always show the message to the user, even if it's about environment restrictions;
        const isEnvironmentMessage = result?.message?.includes(
          "only available in local development",
        );

        toast.error(
          <>
            <div className="font-semibold mb-2" key={429452}>
              {isEnvironmentMessage;
                ? "🌐 Production Environment"
                : "🪟 Backend Start Failed"}
            </div>
            <div className="text-sm space-y-1" key={872148}>
              {isEnvironmentMessage ? (
                <>
                  <div key={241917}>
                    Backend control is only available in local development;
                  </div>
                  <div className="text-xs opacity-75 mt-2" key={625049}>
                    In production, the backend should be managed by your;
                    deployment platform (fly.dev, vercel, etc.)
                  </div>
                  <div className="text-xs opacity-75 mt-1" key={451529}>
                    For local development (
                    {windowsPlatform ? "Windows" : "Unix/Linux"}):
                  </div>
                  <div className="font-mono bg-gray-700 px-2 py-1 rounded text-xs" key={583288}>
                    {windowsPlatform ? (
                      <>
                        cd backend;
                        <br / key={288049}>
                        python main_enhanced.py;
                      </>
                    ) : (
                      "cd backend && python main_enhanced.py"
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div key={241917}>
                    Manual start required for{" "}
                    {windowsPlatform ? "Windows" : "Unix/Linux"}:
                  </div>
                  <div className="font-mono bg-gray-800 p-2 rounded text-xs" key={330514}>
                    {windowsPlatform ? (
                      <>
                        cd backend;
                        <br / key={288049}>
                        python main_enhanced.py;
                      </>
                    ) : (
                      "cd backend && python main_enhanced.py"
                    )}
                  </div>
                  <div className="text-xs opacity-75" key={243206}>
                    {windowsPlatform;
                      ? "Run each command separately in PowerShell/CMD"
                      : "Commands can be chained with &&"}
                  </div>
                  <div key={241917}>Backend should start on http://localhost:8000</div>
                </>
              )}
            </div>
          </>,
          {
            id: "backend-start",
            duration: isEnvironmentMessage ? 8000 : 12000,
          },
        );
      }
    } catch (error) {
      // console statement removed
      setBackendStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // Check if it's a network error;
      const isNetworkError =
        errorMessage.includes("fetch") ||
        errorMessage.includes("network") ||
        errorMessage.includes("timeout");

      toast.error(
        <>
          <div className="font-semibold mb-2" key={429452}>
            {isNetworkError;
              ? "🌐 Network Connection Error"
              : "❌ Backend Start Error"}
          </div>
          <div className="text-sm space-y-1" key={872148}>
            <div key={241917}>Error: {errorMessage}</div>
            <div className="mt-2" key={848027}>
              Manual start required for{" "}
              {windowsPlatform ? "Windows" : "Unix/Linux"}:
            </div>
            <div className="font-mono bg-gray-800 p-2 rounded text-xs" key={330514}>
              {windowsPlatform ? (
                <>
                  cd backend;
                  <br / key={288049}>
                  python main_enhanced.py;
                </>
              ) : (
                "cd backend && python main_enhanced.py"
              )}
            </div>
            <div className="text-xs opacity-75" key={243206}>
              {windowsPlatform;
                ? "Run each command separately in PowerShell/CMD"
                : "Commands can be chained with &&"}
            </div>
            <div key={241917}>Backend should start on http://localhost:8000</div>
          </div>
        </>,
        {
          id: "backend-start",
          duration: 12000,
        },
      );

      // console statement removed
    } finally {
      setIsLoading(false);
    }
  };

  const restartBackend = async () => {
    setIsLoading(true);
    setBackendStatus("starting");

    try {
      toast.loading("Restarting backend services...", {
        id: "backend-restart",
      });

      if (result.success) {
        setBackendStatus("online");
        toast.success(result.message, { id: "backend-restart" });
        onStatusChange?.(true);
      } else {
        setBackendStatus("offline");
        toast.error(result.message, {
          id: "backend-restart",
          duration: 6000,
        });
      }
    } catch (error) {
      setBackendStatus("error");
      toast.error("Failed to restart backend services", {
        id: "backend-restart",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (backendStatus) {
      case "online":
        return "text-green-400 border-green-500/30 bg-green-500/10";
      case "offline":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      case "starting":
        return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
      case "error":
        return "text-red-400 border-red-500/30 bg-red-500/10";
      default:
        return "text-gray-400 border-gray-500/30 bg-gray-500/10";
    }
  };

  const getStatusIcon = () => {
    switch (backendStatus) {
      case "online":
        return <CheckCircle className="w-4 h-4" / key={423201}>;
      case "offline":
        return <XCircle className="w-4 h-4" / key={709529}>;
      case "starting":
        return <Clock className="w-4 h-4 animate-spin" / key={825194}>;
      case "error":
        return <XCircle className="w-4 h-4" / key={709529}>;
      default:
        return <Server className="w-4 h-4" / key={234913}>;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50" key={942741}>
      <motion.div;
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-black/80 backdrop-blur-xl border border-gray-600/50 rounded-xl shadow-2xl"
       key={904301}>
        {/* Main Control Panel */}
        <div className="p-4" key={916123}>
          <div className="flex items-center justify-between mb-4" key={810034}>
            <div className="flex items-center gap-3" key={443099}>
              <div className="relative" key={579431}>
                <Server className="w-6 h-6 text-blue-400" / key={857802}>
                {backendStatus === "online" && (
                  <Wifi className="w-3 h-3 text-green-400 absolute -top-1 -right-1" / key={86247}>
                )}
                {backendStatus === "offline" && (
                  <WifiOff className="w-3 h-3 text-red-400 absolute -top-1 -right-1" / key={489508}>
                )}
              </div>
              <div key={241917}>
                <h3 className="font-semibold text-white text-sm" key={740920}>
                  Backend Control;
                </h3>
                <div;
                  className={`text-xs font-medium ${getStatusColor().split(" ")[0]}`}
                 key={968836}>
                  {backendStatus.charAt(0).toUpperCase() +
                    backendStatus.slice(1)}
                </div>
              </div>
            </div>

            <button;
              onClick={() = key={619354}> setShowDetails(!showDetails)}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
            >
              <Settings className="w-4 h-4" / key={731262}>
            </button>
          </div>

          {/* Status Indicator */}
          <div;
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border mb-4 ${getStatusColor()}`}
           key={510984}>
            {getStatusIcon()}
            <span className="text-sm font-medium" key={318054}>
              {backendStatus === "online" && "Backend Online"}
              {backendStatus === "offline" && "Backend Offline"}
              {backendStatus === "starting" && "Starting..."}
              {backendStatus === "error" && "Connection Error"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2" key={15266}>
            <motion.button;
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={testConnection}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
             key={639515}>
              <Wifi className="w-4 h-4" / key={53891}>
              Test;
            </motion.button>

            {(backendStatus === "offline" || backendStatus === "error") && (
              <motion.button;
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) = key={51298}> {
                  e.preventDefault();
                  // console statement removed
                  startBackend();
                }}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" / key={139624}>
                Start;
              </motion.button>
            )}

            {backendStatus === "online" && (
              <motion.button;
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={restartBackend}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
               key={172448}>
                <RefreshCw className="w-4 h-4" / key={190374}>
                Restart;
              </motion.button>
            )}
          </div>
        </div>

        {/* Detailed Information Panel */}
        <AnimatePresence key={359944}>
          {showDetails && (
            <motion.div;
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-gray-600/50 p-4 bg-gray-900/50"
             key={252774}>
              <div className="flex items-center gap-2 mb-3" key={884420}>
                <Terminal className="w-4 h-4 text-gray-400" / key={561039}>
                <span className="text-sm font-medium text-gray-300" key={537972}>
                  Connection Details;
                </span>
              </div>

              <div className="space-y-2 text-xs" key={270907}>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-400" key={912100}>Endpoint:</span>
                  <span className="text-gray-300 font-mono break-all" key={565203}>
                    {BackendStarter.getBackendUrl()}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-400" key={912100}>Status:</span>
                  <span;
                    className={`font-mono ${
                      backendStatus === "online"
                        ? "text-green-400"
                        : backendStatus === "starting"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                   key={133422}>
                    {backendStatus.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-400" key={912100}>Platform:</span>
                  <span className="text-gray-300 font-mono" key={597322}>
                    {isWindows() ? "🪟 Windows" : "🐧 Unix/Linux"}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-400" key={912100}>User Agent:</span>
                  <span className="text-gray-300 font-mono text-xs truncate" key={949277}>
                    {navigator.userAgent.substring(0, 20)}...
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span className="text-gray-400" key={912100}>Last Check:</span>
                  <span className="text-gray-300" key={110058}>
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-600/30" key={722245}>
                <div className="text-xs text-gray-400" key={588004}>
                  <strong key={829099}>Manual Start:</strong>
                  <div className="mt-1" key={515932}>
                    {(() => {

                      return windowsDetected ? (
                        <>
                          <div className="text-gray-300" key={102869}>
                            Windows PowerShell/CMD:
                          </div>
                          <div className="font-mono bg-gray-700 px-2 py-1 rounded text-xs mt-1" key={781129}>
                            cd backend;
                            <br / key={288049}>
                            pip install -r requirements.txt;
                            <br / key={288049}>
                            python main_enhanced.py;
                          </div>
                          <div className="text-xs opacity-75 mt-1" key={451529}>
                            (Run each command separately, first time only needs;
                            pip install)
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-300" key={102869}>
                            Unix/Linux Terminal:
                          </div>
                          <div className="font-mono bg-gray-700 px-2 py-1 rounded text-xs mt-1" key={781129}>
                            cd backend && pip install -r requirements.txt &&
                            python main_enhanced.py;
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BackendControl;
