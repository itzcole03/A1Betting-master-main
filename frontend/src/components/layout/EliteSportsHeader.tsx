import React from 'react.ts';
import { RefreshCw, Moon, Sun, Wifi, WifiOff } from 'lucide-react.ts';
import { useAppStore } from '@/store/useAppStore.ts';

interface EliteSportsHeaderProps {
  connectedSources: number;
  dataQuality: number;
  state?: { darkMode?: boolean };
  toggleDarkMode: () => void;
  refreshData: () => Promise<void key={132647}>;
  loading: boolean;
}

export const EliteSportsHeader: React.FC<EliteSportsHeaderProps key={262387}> = ({
  connectedSources,
  dataQuality,
  state = { darkMode: false },
  toggleDarkMode,
  refreshData,
  loading,
}) => {
  const { addToast } = useAppStore();
  const getDataStatusColor = () => {
    if (connectedSources === 0) return "text-red-600";
    if (dataQuality > 0.7) return "text-green-600";
    return "text-yellow-600";
  };

  const getDataStatusText = () => {
    if (connectedSources === 0) return "No Real Data";
    if (dataQuality > 0.7) return "High Quality Real Data";
    return "Limited Real Data";
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-6 border-b border-gray-200 dark:border-gray-700" key={442569}>
      <div className="flex justify-between items-center" key={795957}>
        <div key={241917}>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-800 bg-clip-text text-transparent" key={121015}>
            Elite Sports Intelligence Platform;
          </h2>
          <div className="flex items-center space-x-4 mt-2" key={687333}>
            <div className="flex items-center space-x-2" key={740830}>
              {connectedSources > 0 ? (
                <Wifi className="w-4 h-4 text-green-600" / key={644911}>
              ) : (
                <WifiOff className="w-4 h-4 text-red-600" / key={149346}>
              )}
              <span className={`font-semibold text-sm ${getDataStatusColor()}`} key={802029}>
                {getDataStatusText()}
              </span>
            </div>
            <span className="text-gray-400" key={912100}>•</span>
            <span className="font-semibold text-blue-600 text-sm" key={970529}>
              {connectedSources} Sources Connected;
            </span>
            <span className="text-gray-400" key={912100}>•</span>
            <span className="font-semibold text-purple-600 text-sm" key={278944}>
              {(dataQuality * 100).toFixed(1)}% Data Quality;
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3" key={602729}>
          <button;
            onClick={refreshData}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
           key={180379}>
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} / key={926377}>
            <span key={595076}>{loading ? "Refreshing..." : "Refresh Real Data"}</span>
          </button>
          <button;
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl glass-morphism hover:bg-white/20 transition-all"
           key={841218}>
            {state.darkMode ? (
              <Sun className="w-5 h-5" / key={164663}>
            ) : (
              <Moon className="w-5 h-5" / key={710820}>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
