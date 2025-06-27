/**
 * Performance optimization utilities for A1Betting;
 */

import React from 'react.ts';
import { QueryClient } from '@tanstack/react-query.ts';

// Enhanced query client configuration with intelligent caching;
export const createOptimizedQueryClient = (): QueryClient => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors;
          if (error?.status >= 400 && error?.status < 500) {
            return false;
          }
          return failureCount < 3;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes;
        gcTime: 10 * 60 * 1000, // 10 minutes;
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: 'always',
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        retry: 1,
        retryDelay: 1000,
      },
    },
  });
};

// Cache keys for consistent query management;
export const CACHE_KEYS = {
  userStats: ['user', 'stats'] as const,
  bettingOpportunities: ['betting', 'opportunities'] as const,
  predictions: ['predictions'] as const,
  arbitrage: ['arbitrage'] as const,
  health: ['health'] as const,
  modelPerformance: ['model', 'performance'] as const,
  analytics: ['analytics'] as const,
} as const;

// Performance monitoring utilities;
export class PerformanceMonitor {
  private static measurements = new Map<string, number>();

  static startTiming(label: string): void {
    this.measurements.set(label, performance.now());
  }

  static endTiming(label: string): number {

    if (!start) {
      // console statement removed
      return 0;
    }

    this.measurements.delete(label);
    
    // Log slow operations (> 100ms)
    if (duration > 100) {
      // console statement removed}ms`);
    }
    
    return duration;
  }

  static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label);
    return fn().finally(() => {
      this.endTiming(label);
    });
  }
}

// Memory optimization utilities;
export const memoizedSelectors = {
  selectUserBalance: (userStats: any) => userStats?.balance ?? 0,
  selectWinRate: (userStats: any) => userStats?.winRate ?? 0,
  selectTotalProfit: (userStats: any) => userStats?.totalProfit ?? 0,
};

// Bundle size optimization - lazy loading utilities;
export const lazyLoad = (importFn: () => Promise<{ default: React.ComponentType<any> }>) => {
  return React.lazy(() => 
    importFn().catch(() => 
      Promise.resolve({ 
        default: () => React.createElement('div', null, 'Failed to load component')
      })
    )
  );
};

// Resource preloading;
export const preloadResource = (url: string, type: 'script' | 'style' | 'image' = 'script'): void => {

  link.rel = 'preload';
  link.href = url;
  link.as = type;
  document.head.appendChild(link);
};

// Intersection Observer for lazy loading;
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
};
