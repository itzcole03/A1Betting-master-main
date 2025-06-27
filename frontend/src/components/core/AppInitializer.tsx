import React, { useEffect, useState  } from 'react.ts';
import { UnifiedBettingSystem } from '@/core/UnifiedBettingSystem.ts';
import { unifiedConfig } from '@/core/UnifiedConfig.ts';
import { UnifiedDataEngine } from '@/core/UnifiedDataEngine.ts';
import { SystemError } from '@/core/UnifiedError.ts';
import { UnifiedMonitor } from '@/core/UnifiedMonitor.ts';
import { UnifiedPredictionEngine } from '@/core/UnifiedPredictionEngine.ts';
import { UnifiedStateManager } from '@/core/UnifiedState.ts';
import { UnifiedStrategyEngine } from '@/core/UnifiedStrategyEngine.ts';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<AppInitializerProps key={419560}> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null key={77961}>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize configuration first;
        await unifiedConfig.initialize();

        // Initialize core systems;
        const systems = [
          UnifiedDataEngine.getInstance(),
          UnifiedPredictionEngine.getInstance(),
          UnifiedStrategyEngine.getInstance(),
          UnifiedBettingSystem.getInstance(),
          UnifiedStateManager.getInstance(),
          UnifiedMonitor.getInstance()
        ];

        // Initialize all systems in parallel;
        await Promise.all(systems.map(system => system.initialize()));

        setIsInitialized(true);
      } catch (err) {

        setError(error);
        // console statement removed
      }
    };

    initializeApp();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50" key={602149}>
        <div className="p-6 bg-white rounded-lg shadow-lg" key={578198}>
          <h2 className="text-2xl font-bold text-red-600 mb-4" key={763076}>Initialization Error</h2>
          <p className="text-gray-700 mb-4" key={519885}>{error.message}</p>
          <button;
            onClick={() = key={919301}> window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry;
          </button>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50" key={773627}>
        <div className="text-center" key={120206}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" key={280489}></div>
          <p className="text-gray-600" key={486863}>Initializing application...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
