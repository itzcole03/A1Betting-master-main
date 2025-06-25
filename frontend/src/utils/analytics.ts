/**
 * Enhanced Monitoring and Analytics System for A1Betting
 */

import React from 'react';

// Analytics event types
export interface AnalyticsEvent {
  name: string;
  category: 'user_action' | 'system_performance' | 'error' | 'business_metric';
  data?: Record<string, any>;
  timestamp?: Date;
  userId?: string;
  sessionId?: string;
}

// Performance metrics interface
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  apiResponseTime: number;
  cacheHitRate: number;
  errorRate: number;
  userEngagement: number;
}

class EnhancedAnalytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId?: string;
  private performanceMetrics: Partial<PerformanceMetrics> = {};

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializePerformanceTracking();
  }

  // Add convenience track method
  track(eventName: string, data?: any): void {
    this.trackEvent({
      name: eventName,
      category: 'user_action',
      data
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializePerformanceTracking(): void {
    // Track page load time
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        this.trackPerformance('page_load', loadTime);
      });

      // Track navigation performance
      if ('navigation' in performance) {
        const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navTiming) {
          this.performanceMetrics.loadTime = navTiming.loadEventEnd - navTiming.fetchStart;
        }
      }
    }
  }

  // Track user actions
  trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>): void {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date(),
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.events.push(fullEvent);
    this.sendToAnalytics(fullEvent);

    // Store in local storage for offline support
    this.storeEventLocally(fullEvent);
  }

  // Track betting-specific events
  trackBettingAction(action: string, data: any): void {
    this.trackEvent({
      name: `betting_${action}`,
      category: 'user_action',
      data: {
        ...data,
        accuracy: this.getCurrentAccuracy(),
        balance: this.getCurrentBalance(),
      },
    });
  }

  // Track prediction accuracy
  trackPredictionAccuracy(predictionId: string, actual: boolean, predicted: boolean): void {
    const isCorrect = actual === predicted;
    this.trackEvent({
      name: 'prediction_result',
      category: 'business_metric',
      data: {
        predictionId,
        isCorrect,
        actual,
        predicted,
      },
    });
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number): void {
    this.trackEvent({
      name: `performance_${metric}`,
      category: 'system_performance',
      data: { metric, value },
    });

    // Update internal metrics
    if (metric === 'page_load') {
      this.performanceMetrics.loadTime = value;
    } else if (metric === 'api_response') {
      this.performanceMetrics.apiResponseTime = value;
    }
  }

  // Track errors
  trackError(error: Error, context?: string): void {
    this.trackEvent({
      name: 'error_occurred',
      category: 'error',
      data: {
        message: error.message,
        stack: error.stack,
        context,
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    });
  }

  // User engagement tracking
  trackUserEngagement(): void {
    let startTime = Date.now();
    let isActive = true;

    // Track time spent on page
    const trackTimeSpent = () => {
      if (isActive) {
        const timeSpent = Date.now() - startTime;
        this.trackEvent({
          name: 'time_spent',
          category: 'user_action',
          data: { timeSpent },
        });
      }
    };

    // Track when user becomes inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isActive = false;
        trackTimeSpent();
      } else {
        isActive = true;
        startTime = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', trackTimeSpent);
  }

  // A/B testing support
  trackExperiment(experimentName: string, variant: string, conversion?: boolean): void {
    this.trackEvent({
      name: 'experiment_exposure',
      category: 'business_metric',
      data: {
        experimentName,
        variant,
        conversion,
      },
    });
  }

  // Real-time dashboard metrics
  getDashboardMetrics(): PerformanceMetrics {
    const recent = this.getRecentEvents(5 * 60 * 1000); // Last 5 minutes
    
    return {
      loadTime: this.performanceMetrics.loadTime || 0,
      renderTime: this.performanceMetrics.renderTime || 0,
      apiResponseTime: this.performanceMetrics.apiResponseTime || 0,
      cacheHitRate: this.calculateCacheHitRate(recent),
      errorRate: this.calculateErrorRate(recent),
      userEngagement: this.calculateUserEngagement(recent),
    };
  }

  private getRecentEvents(timeWindow: number): AnalyticsEvent[] {
    const cutoff = new Date(Date.now() - timeWindow);
    return this.events.filter(event => 
      event.timestamp && event.timestamp > cutoff
    );
  }

  private calculateCacheHitRate(events: AnalyticsEvent[]): number {
    const apiEvents = events.filter(e => e.name.includes('api_'));
    const cacheHits = apiEvents.filter(e => e.data?.fromCache);
    return apiEvents.length > 0 ? (cacheHits.length / apiEvents.length) * 100 : 0;
  }

  private calculateErrorRate(events: AnalyticsEvent[]): number {
    const totalEvents = events.length;
    const errorEvents = events.filter(e => e.category === 'error');
    return totalEvents > 0 ? (errorEvents.length / totalEvents) * 100 : 0;
  }

  private calculateUserEngagement(events: AnalyticsEvent[]): number {
    const engagementEvents = events.filter(e => 
      e.category === 'user_action' && !e.name.includes('time_spent')
    );
    return engagementEvents.length;
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // In production, send to analytics service (Google Analytics, Mixpanel, etc.)
    if (process.env.NODE_ENV === 'production') {
      // Example: gtag('event', event.name, event.data);
      console.log('Analytics Event:', event);
    } else {
      console.log('Dev Analytics Event:', event);
    }
  }

  private storeEventLocally(event: AnalyticsEvent): void {
    try {
      const stored = localStorage.getItem('a1betting_analytics') || '[]';
      const events = JSON.parse(stored);
      events.push(event);
      
      // Keep only last 100 events locally
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('a1betting_analytics', JSON.stringify(events));
    } catch (error) {
      console.warn('Failed to store analytics event locally:', error);
    }
  }

  private getCurrentAccuracy(): number {
    // Get current model accuracy from global state or API
    return 85.0; // Placeholder
  }

  private getCurrentBalance(): number {
    // Get current user balance from global state or API
    return 1250.75; // Placeholder
  }

  // Set user ID for tracking
  setUserId(userId: string): void {
    this.userId = userId;
  }

  // Get analytics summary
  getAnalyticsSummary(): any {
    return {
      totalEvents: this.events.length,
      sessionId: this.sessionId,
      userId: this.userId,
      performanceMetrics: this.performanceMetrics,
      recentActivity: this.getRecentEvents(30 * 60 * 1000), // Last 30 minutes
    };
  }
}

// Create singleton instance
export const analytics = new EnhancedAnalytics();

// Add convenience method for quick tracking
(analytics as any).track = (eventName: string, data?: any) => {
  analytics.trackEvent({
    name: eventName,
    category: 'user_action',
    data
  });
};

// React hook for analytics
export const useAnalytics = () => {
  return {
    trackEvent: analytics.trackEvent.bind(analytics),
    trackBettingAction: analytics.trackBettingAction.bind(analytics),
    trackPredictionAccuracy: analytics.trackPredictionAccuracy.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    trackError: analytics.trackError.bind(analytics),
    trackExperiment: analytics.trackExperiment.bind(analytics),
    getDashboardMetrics: analytics.getDashboardMetrics.bind(analytics),
    setUserId: analytics.setUserId.bind(analytics),
  };
};

// HOC for automatic component tracking
export const withAnalytics = (WrappedComponent: React.ComponentType, componentName: string) => {
  return (props: any) => {
    React.useEffect(() => {
      analytics.trackEvent({
        name: 'component_mounted',
        category: 'system_performance',
        data: { componentName },
      });

      return () => {
        analytics.trackEvent({
          name: 'component_unmounted',
          category: 'system_performance',
          data: { componentName },
        });
      };
    }, []);

    return React.createElement(WrappedComponent, props);
  };
};
