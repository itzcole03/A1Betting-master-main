/**
 * Performance Optimization Service
 * Handles component performance monitoring and optimization
 */

import { useCallback, useMemo, useRef, useEffect } from "react";

interface PerformanceMetrics {
  renderTime: number;
  memoryUsage: number;
  componentRenders: number;
  lastRenderTime: number;
}

class PerformanceOptimizer {
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private renderCounters: Map<string, number> = new Map();

  // Track component render performance
  trackRender(componentName: string) {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      const existing = this.metrics.get(componentName) || {
        renderTime: 0,
        memoryUsage: 0,
        componentRenders: 0,
        lastRenderTime: 0,
      };

      this.metrics.set(componentName, {
        ...existing,
        renderTime: (existing.renderTime + renderTime) / 2, // Average
        componentRenders: existing.componentRenders + 1,
        lastRenderTime: renderTime,
        memoryUsage: this.getMemoryUsage(),
      });

      // Log slow renders
      if (renderTime > 16) {
        // More than one frame
        console.warn(
          `Slow render detected: ${componentName} took ${renderTime.toFixed(2)}ms`,
        );
      }
    };
  }

  // Get current memory usage
  private getMemoryUsage(): number {
    if ("memory" in performance) {
      return (performance as any).memory.usedJSHeapSize / 1024 / 1024; // MB
    }
    return 0;
  }

  // Get performance metrics for a component
  getMetrics(componentName: string): PerformanceMetrics | null {
    return this.metrics.get(componentName) || null;
  }

  // Get all performance metrics
  getAllMetrics(): Map<string, PerformanceMetrics> {
    return new Map(this.metrics);
  }

  // Reset metrics for a component
  resetMetrics(componentName: string) {
    this.metrics.delete(componentName);
    this.renderCounters.delete(componentName);
  }

  // Get performance summary
  getPerformanceSummary() {
    const allMetrics = Array.from(this.metrics.entries());

    return {
      totalComponents: allMetrics.length,
      averageRenderTime:
        allMetrics.reduce((sum, [, metrics]) => sum + metrics.renderTime, 0) /
        allMetrics.length,
      totalRenders: allMetrics.reduce(
        (sum, [, metrics]) => sum + metrics.componentRenders,
        0,
      ),
      memoryUsage: this.getMemoryUsage(),
      slowComponents: allMetrics
        .filter(([, metrics]) => metrics.renderTime > 16)
        .map(([name]) => name),
    };
  }
}

// Singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// React hook for performance tracking
export const usePerformanceTracker = (componentName: string) => {
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current++;
    const endTracking = performanceOptimizer.trackRender(componentName);
    return endTracking;
  });

  return {
    renderCount: renderCountRef.current,
    getMetrics: () => performanceOptimizer.getMetrics(componentName),
  };
};

// Memoization helpers
export const createMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList,
): T => {
  return useCallback(callback, deps);
};

export const createMemoizedValue = <T>(
  factory: () => T,
  deps: React.DependencyList,
): T => {
  return useMemo(factory, deps);
};

// Debounce hook for expensive operations
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for high-frequency events
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): T => {
  const lastRun = useRef(Date.now());

  return useCallback(
    ((...args) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay],
  );
};

// Virtual scrolling helper for large lists
export const useVirtualScrolling = (
  items: any[],
  itemHeight: number,
  containerHeight: number,
) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length,
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
};

// Image lazy loading helper
export const useLazyLoading = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};
