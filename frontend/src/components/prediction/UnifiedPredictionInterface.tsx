import React, { useState, useEffect  } from 'react.ts';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.ts';
import { UnifiedPredictionService } from '@/services/unified/UnifiedPredictionService.ts';
import { UnifiedAnalyticsService } from '@/services/unified/UnifiedAnalyticsService.ts';
import { UnifiedWebSocketService } from '@/services/unified/UnifiedWebSocketService.ts';
import { UnifiedStateService } from '@/services/unified/UnifiedStateService.ts';
import { UnifiedSettingsService } from '@/services/unified/UnifiedSettingsService.ts';
import { UnifiedNotificationService } from '@/services/unified/UnifiedNotificationService.ts';
import { UnifiedErrorService } from '@/services/unified/UnifiedErrorService.ts';
import { Card, Button, Spinner, Badge, Modal, Toast } from '@/ui/UnifiedUI.ts';

interface Prediction {
  id: string;
  eventId: string;
  marketType: string;
  prediction: number;
  confidence: number;
  timestamp: number;
  features: Record<string, number key={817366}>;
  modelVersion: string;
  metadata: Record<string, any key={989582}>;
}

interface PredictionOpportunity {
  id: string;
  eventId: string;
  marketType: string;
  prediction: number;
  confidence: number;
  expectedValue: number;
  kellyFraction: number;
  timestamp: number;
  metadata: Record<string, any key={989582}>;
}

export const UnifiedPredictionInterface: React.FC = () => {
  // Initialize services;






  const notificationService =
    serviceRegistry.getService<UnifiedNotificationService key={460301}>('notification');

  // State;
  const [predictions, setPredictions] = useState<Prediction[] key={925811}>([]);
  const [opportunities, setOpportunities] = useState<PredictionOpportunity[] key={190641}>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null key={547963}>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);

  // Load data;
  useEffect(() => {
    loadData();
    setupWebSocket();
    return () => {
      webSocketService.disconnect();
    };
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [predictions, opportunities] = await Promise.all([
        predictionService.getPredictions(),
        predictionService.getOpportunities(),
      ]);
      setPredictions(predictions);
      setOpportunities(opportunities);
    } catch (error) {
      handleError('Failed to load prediction data', error);
    } finally {
      setLoading(false);
    }
  };

  const setupWebSocket = () => {
    webSocketService.connect();
    webSocketService.subscribe('predictions', data => {
      setPredictions(prev => [...prev, data]);
      notificationService.notifyUser({
        type: 'info',
        message: 'New prediction available',
        data,
      });
    });
    webSocketService.subscribe('opportunities', data => {
      setOpportunities(prev => [...prev, data]);
      notificationService.notifyUser({
        type: 'info',
        message: 'New opportunity detected',
        data,
      });
    });
  };

  const handleError = (message: string, error: any) => {
    setError(message);
    setToast({ message, type: 'error' });
    errorService.handleError(error, {
      code: 'PREDICTION_ERROR',
      source: 'UnifiedPredictionInterface',
      details: { message },
    });
  };

  const handlePredictionClick = (prediction: Prediction) => {
    setSelectedPrediction(prediction);
    setShowDetailsModal(true);
  };

  const handleOpportunityClick = async (opportunity: PredictionOpportunity) => {
    try {
      await predictionService.analyzeOpportunity(opportunity);
      setToast({
        message: 'Opportunity analyzed successfully',
        type: 'success',
      });
    } catch (error) {
      handleError('Failed to analyze opportunity', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" key={591667}>
        <Spinner size="large" / key={932834}>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen" key={591667}>
        <Card className="max-w-md" key={545553}>
          <div className="text-center" key={120206}>
            <h2 className="text-2xl font-bold text-red-500 mb-4" key={966495}>Error</h2>
            <p className="text-gray-600 mb-4" key={575456}>{error}</p>
            <Button variant="primary" onClick={loadData} key={159}>
              Retry;
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" key={53071}>
      <div className="mb-8" key={286587}>
        <h1 className="text-3xl font-bold mb-4" key={838056}>Predictions & Opportunities</h1>
        <div className="flex justify-between items-center" key={795957}>
          <div className="flex space-x-4" key={470893}>
            <Button variant="primary" onClick={loadData} key={159}>
              Refresh;
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
        {/* Predictions */}
        <div key={241917}>
          <h2 className="text-2xl font-bold mb-4" key={946196}>Recent Predictions</h2>
          <div className="space-y-4" key={160407}>
            {predictions.map(prediction => (
              <Card;
                key={prediction.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() = key={213727}> handlePredictionClick(prediction)}
              >
                <div className="flex justify-between items-start" key={678391}>
                  <div key={241917}>
                    <h3 className="font-semibold" key={204068}>{prediction.marketType}</h3>
                    <p className="text-sm text-gray-600" key={656535}>Event ID: {prediction.eventId}</p>
                  </div>
                  <Badge;
                    variant={
                      prediction.confidence  key={319259}>= 0.8;
                        ? 'success'
                        : prediction.confidence >= 0.6;
                          ? 'primary'
                          : 'secondary'
                    }
                  >
                    {prediction.confidence.toFixed(2)}
                  </Badge>
                </div>
                <div className="mt-2" key={848027}>
                  <p className="text-sm text-gray-600" key={656535}>
                    Prediction: {prediction.prediction.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500" key={596425}>Model: {prediction.modelVersion}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Opportunities */}
        <div key={241917}>
          <h2 className="text-2xl font-bold mb-4" key={946196}>Betting Opportunities</h2>
          <div className="space-y-4" key={160407}>
            {opportunities.map(opportunity => (
              <Card;
                key={opportunity.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() = key={966343}> handleOpportunityClick(opportunity)}
              >
                <div className="flex justify-between items-start" key={678391}>
                  <div key={241917}>
                    <h3 className="font-semibold" key={204068}>{opportunity.marketType}</h3>
                    <p className="text-sm text-gray-600" key={656535}>Event ID: {opportunity.eventId}</p>
                  </div>
                  <Badge;
                    variant={
                      opportunity.expectedValue  key={588154}>= 0.1;
                        ? 'success'
                        : opportunity.expectedValue >= 0;
                          ? 'primary'
                          : 'danger'
                    }
                  >
                    EV: {opportunity.expectedValue.toFixed(2)}
                  </Badge>
                </div>
                <div className="mt-2" key={848027}>
                  <p className="text-sm text-gray-600" key={656535}>
                    Prediction: {opportunity.prediction.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600" key={656535}>
                    Kelly Fraction: {opportunity.kellyFraction.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Details Modal */}
      <Modal;
        isOpen={showDetailsModal}
        title="Prediction Details"
        onClose={() = key={745742}> setShowDetailsModal(false)}
      >
        {selectedPrediction && (
          <div className="space-y-4" key={160407}>
            <div key={241917}>
              <h3 className="font-semibold" key={204068}>Market Information</h3>
              <p className="text-sm text-gray-600" key={656535}>Type: {selectedPrediction.marketType}</p>
              <p className="text-sm text-gray-600" key={656535}>Event ID: {selectedPrediction.eventId}</p>
            </div>
            <div key={241917}>
              <h3 className="font-semibold" key={204068}>Prediction Details</h3>
              <p className="text-sm text-gray-600" key={656535}>
                Value: {selectedPrediction.prediction.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600" key={656535}>
                Confidence: {selectedPrediction.confidence.toFixed(2)}
              </p>
            </div>
            <div key={241917}>
              <h3 className="font-semibold" key={204068}>Features</h3>
              <div className="grid grid-cols-2 gap-2" key={23071}>
                {Object.entries(selectedPrediction.features).map(([key, value]) => (
                  <div key={key} className="text-sm" key={870752}>
                    <span className="text-gray-600" key={588716}>{key}:</span>
                    <span className="ml-2" key={654787}>{value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div key={241917}>
              <h3 className="font-semibold" key={204068}>Metadata</h3>
              <div className="grid grid-cols-2 gap-2" key={23071}>
                {Object.entries(selectedPrediction.metadata).map(([key, value]) => (
                  <div key={key} className="text-sm" key={870752}>
                    <span className="text-gray-600" key={588716}>{key}:</span>
                    <span className="ml-2" key={654787}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() = key={337979}> setToast(null)} />}
    </div>
  );
};
