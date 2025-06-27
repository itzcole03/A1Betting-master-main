import { EventBus } from '@/core/EventBus';
import { PerformanceMonitor } from '@/core/PerformanceMonitor';
import { UnifiedBettingSystem } from '@/core/UnifiedBettingSystem';
import { useState, useEffect } from 'react';
export function useInitializeApp() {
    const [isInitialized, setIsInitialized] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const initializeApp = async () => {
            try {
                // Initialize core systems;



                // Start performance monitoring;

                // Initialize betting system;
                await bettingSystem.initialize();
                // Set up global error handling;
                window.onerror = (message, source, lineno, colno, error) => {
                    eventBus.publish({
                        type: 'error',
                        payload: {
                            error: error || new Error(message),
                            source: source || 'window',
                            context: { lineno, colno }
                        }
                    });
                    return false;
                };
                // End performance trace;
                performanceMonitor.endTrace(traceId);
                setIsInitialized(true);
            }
            catch (err) {
                setError(err);
            }
        };
        initializeApp();
    }, []);
    return { isInitialized, error };
}
