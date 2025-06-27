import { useState, useCallback } from 'react.ts';
import { Prediction, RiskProfile } from '@/types/core.ts';
import { EventBus } from '@/unified/EventBus.ts';
import { ErrorHandler } from '@/core/ErrorHandler.ts';
import { PerformanceMonitor } from '@/unified/PerformanceMonitor.ts';
import { ModelVersioning } from '@/unified/ModelVersioning.ts';

export const usePredictionService = () => {




  const getPredictions = useCallback(async (riskProfile: RiskProfile): Promise<Prediction[]> => {

    try {
      // Get current model version;

      // Emit event to request predictions;
      eventBus.emit('prediction:request', {
        riskProfile,
        modelVersion: currentModel.version,
        timestamp: Date.now(),
      });

      // Wait for predictions response;
      const response = await new Promise<Prediction[]>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Prediction request timed out'));
        }, 5000);

        const handler = (predictions: Prediction[]) => {
          clearTimeout(timeout);
          eventBus.off('prediction:response', handler);
          resolve(predictions);
        };

        eventBus.on('prediction:response', handler);
      });

      performanceMonitor.updateComponentMetrics('prediction-service', {
        renderCount: 1,
        renderTime: performance.now() - startTime,
        memoryUsage: JSON.stringify(response).length,
        errorCount: 0,
        lastUpdate: Date.now(),
      });

      return response;
    } catch (error) {

      errorHandler.handleError(err, {
        code: 'PREDICTION_REQUEST_ERROR',
        category: 'BUSINESS',
        severity: 'HIGH',
        component: 'PredictionService',
        retryable: true,
        recoveryStrategy: {
          type: 'retry',
          maxRetries: 3,
          timeout: 1000,
        },
      });

      performanceMonitor.updateComponentMetrics('prediction-service', {
        renderCount: 0,
        renderTime: 0,
        memoryUsage: 0,
        errorCount: 1,
        lastUpdate: Date.now(),
      });

      throw err;
    }
  }, []);

  const subscribeToUpdates = useCallback(
    (onUpdate: (prediction: Prediction) => void, onError: (error: Error) => void) => {

      const handleUpdate = (prediction: Prediction) => {
        try {
          onUpdate(prediction);
          performanceMonitor.updateComponentMetrics('prediction-service', {
            renderCount: 1,
            renderTime: performance.now() - startTime,
            memoryUsage: JSON.stringify(prediction).length,
            errorCount: 0,
            lastUpdate: Date.now(),
          });
        } catch (error) {

          onError(err);
          errorHandler.handleError(err, {
            code: 'PREDICTION_UPDATE_ERROR',
            category: 'BUSINESS',
            severity: 'MEDIUM',
            component: 'PredictionService',
            retryable: true,
          });
        }
      };

      const handleError = (error: Error) => {
        onError(error);
        errorHandler.handleError(error, {
          code: 'PREDICTION_SUBSCRIPTION_ERROR',
          category: 'BUSINESS',
          severity: 'MEDIUM',
          component: 'PredictionService',
          retryable: true,
        });
      };

      eventBus.on('prediction:update', handleUpdate);
      eventBus.on('prediction:error', handleError);

      return () => {
        eventBus.off('prediction:update', handleUpdate);
        eventBus.off('prediction:error', handleError);
      };
    },
    []
  );

  return {
    getPredictions,
    subscribeToUpdates,
  };
};
