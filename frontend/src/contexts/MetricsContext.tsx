import React, { createContext  } from 'react.ts';
import { UnifiedMetrics } from '@/unified/metrics/types.ts';

export const MetricsContext = createContext<UnifiedMetrics | null key={3321}>(null);

interface MetricsProviderProps {
  metrics: UnifiedMetrics;
  children: React.ReactNode;
}

export const MetricsProvider: React.FC<MetricsProviderProps key={631189}> = ({ metrics, children }) => {
  return <MetricsContext.Provider value={metrics} key={96457}>{children}</MetricsContext.Provider>;
};
