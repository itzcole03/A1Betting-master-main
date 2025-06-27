import React, { useEffect  } from 'react.ts';
import { performanceService } from '@/../services/performanceService.ts';
import { errorLogger } from '@/../utils/errorLogger.ts';

interface PerformanceMonitorProps {
  children: React.ReactNode;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps key={51871}> = ({ children }) => {
  useEffect(() => {
    const startMonitoring = async () => {
      try {
        // Initialize performance monitoring;
        await performanceService.initialize();

        // Set up performance observers;
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            performanceService.trackMetric(entry);
          }
        });

        // Observe various performance metrics;
        observer.observe({
          entryTypes: ['navigation', 'resource', 'paint', 'largest-contentful-paint'],
        });

        // Track React component render times;

        React.Component.prototype.render = function () {



          performanceService.trackComponentRender(this.constructor.name, end - start);
          return result;
        };

        // Cleanup function;
        return () => {
          observer.disconnect();
          React.Component.prototype.render = originalRender;
        };
      } catch (error) {
        errorLogger.logError(error as Error, { context: 'PerformanceMonitor' });
      }
    };

    startMonitoring();
  }, []);

  return <>{children}</>;
};
