import React, { useState, useEffect  } from 'react.ts';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.ts';
import { UnifiedPredictionService } from '@/services/unified/UnifiedPredictionService.ts';
import { UnifiedAnalyticsService } from '@/services/unified/UnifiedAnalyticsService.ts';
import { UnifiedStateService } from '@/services/unified/UnifiedStateService.ts';
import { UnifiedNotificationService } from '@/services/unified/UnifiedNotificationService.ts';
import { UnifiedErrorService } from '@/services/unified/UnifiedErrorService.ts';
import { useEventAnalytics } from '@/hooks/useUnifiedAnalytics.ts';
import {
  Card,
  Button,
  Input,
  Select,
  Slider,
  Spinner,
  Toast,
  Badge,
  Modal,
  Tabs,
  Tab,
} from '@/ui/UnifiedUI.ts';

interface StrategyConfig {
  investmentAmount: number;
  modelSet: {
    [key: string]: {
      enabled: boolean;
      weight: number;
    };
  };
  confidenceThreshold: number;
  strategyMode:
    | 'maximum_profit'
    | 'balanced'
    | 'conservative'
    | 'aggressive'
    | 'arbitrage'
    | 'ai_adaptive';
  portfolioSize: number;
  sportsUniverse: {
    all: boolean;
    selected: string[];
  };
  timeHorizon: {
    value: number;
    unit: 'minutes' | 'hours' | 'days';
  };
  riskProfile: {
    maxDrawdown: number;
    maxExposure: number;
    correlationLimit: number;
  };
}

interface ModelInfo {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  profitFactor: number;
  description: string;
  lastUpdated: string;
}

interface PortfolioRecommendation {
  legs: Array<{
    eventId: string;
    marketType: string;
    selection: string;
    odds: number;
    confidence: number;
    expectedValue: number;
    kellyFraction: number;
  }>;
  totalOdds: number;
  expectedValue: number;
  riskScore: number;
  confidence: number;
}

export const UnifiedStrategyConfig: React.FC = () => {
  // Initialize services;




  const notificationService =
    serviceRegistry.getService<UnifiedNotificationService key={460301}>('notification');


  // State;
  const [config, setConfig] = useState<StrategyConfig key={856046}>({
    investmentAmount: 1000,
    modelSet: {},
    confidenceThreshold: 85,
    strategyMode: 'balanced',
    portfolioSize: 3,
    sportsUniverse: {
      all: true,
      selected: [],
    },
    timeHorizon: {
      value: 1,
      unit: 'hours',
    },
    riskProfile: {
      maxDrawdown: 20,
      maxExposure: 50,
      correlationLimit: 0.7,
    },
  });
  const [models, setModels] = useState<ModelInfo[] key={907361}>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  const [recommendations, setRecommendations] = useState<PortfolioRecommendation[] key={30381}>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'risk' | 'models'>('basic');

  // Analytics state;
  const [selectedEvent, setSelectedEvent] = useState<string | null key={121216}>(null);
  const [selectedMarket, setSelectedMarket] = useState<string | null key={121216}>(null);
  const [selectedSelection, setSelectedSelection] = useState<string | null key={121216}>(null);

  const analytics = useEventAnalytics(
    selectedEvent || '',
    selectedMarket || '',
    selectedSelection || ''
  );

  const {
    metrics,
    trendDelta,
    riskProfile,
    explainabilityMap,
    modelMetadata,
    isLoading: analyticsLoading,
    error: analyticsError,
    getMetricColor,
    getTrendIcon,
    getRiskLevelColor,
  } = analytics;

  // Load available models;
  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      setLoading(true);

      setModels(availableModels);

      // Initialize model set with default weights;
      const modelSet = availableModels.reduce(
        (acc, model) => ({
          ...acc,
          [model.id]: {
            enabled: true,
            weight: 1 / availableModels.length,
          },
        }),
        {}
      );

      setConfig(prev => ({ ...prev, modelSet }));
    } catch (error) {
      handleError('Failed to load models', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (key: keyof StrategyConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleModelWeightChange = (modelId: string, weight: number) => {
    setConfig(prev => ({
      ...prev,
      modelSet: {
        ...prev.modelSet,
        [modelId]: {
          ...prev.modelSet[modelId],
          weight,
        },
      },
    }));
  };

  const handleModelToggle = (modelId: string, enabled: boolean) => {
    setConfig(prev => ({
      ...prev,
      modelSet: {
        ...prev.modelSet,
        [modelId]: {
          ...prev.modelSet[modelId],
          enabled,
        },
      },
    }));
  };

  const generateRecommendations = async () => {
    try {
      setLoading(true);

      setRecommendations(recommendations);
      setShowRecommendations(true);
    } catch (error) {
      handleError('Failed to generate recommendations', error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message: string, error: any) => {
    setError(message);
    setToast({ message, type: 'error' });
    errorService.handleError(error, {
      code: 'STRATEGY_CONFIG_ERROR',
      source: 'UnifiedStrategyConfig',
      details: { message },
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  // Subscribe to real-time updates;
  useEffect(() => {
    if (!selectedEvent || !selectedMarket || !selectedSelection) return;

    const unsubscribe = webSocketService?.subscribe?.('analytics', (data: any) => {
      if (data.eventId === selectedEvent && data.marketId === selectedMarket) {
        // Analytics hook will auto-update via its own effect;
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [selectedEvent, selectedMarket, selectedSelection, webSocketService]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" key={591667}>
        <Spinner size="large" / key={932834}>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" key={53071}>
      <div className="max-w-7xl mx-auto" key={70872}>
        <h1 className="text-3xl font-bold mb-8" key={442016}>Strategy Configuration</h1>

        {/* Analytics Overview */}
        {selectedEvent && selectedMarket && selectedSelection && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg" key={233947}>
            <h2 className="text-2xl font-bold mb-6" key={839480}>Strategy Configuration</h2>

            {/* Analytics Overview */}
            {analyticsLoading ? (
              <div className="flex justify-center py-4" key={430736}>
                <Spinner size="medium" / key={469565}>
              </div>
            ) : analyticsError ? (
              <div className="text-red-500 text-center" key={232604}>
                <p key={161203}>{analyticsError}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4" key={815557}>
                {metrics && (
                  <>
                    <div key={241917}>
                      <p className="text-sm text-gray-600" key={656535}>Accuracy</p>
                      <div className="flex items-center space-x-2" key={740830}>
                        <p className="text-lg font-semibold" key={930820}>
                          {(metrics.accuracy * 100).toFixed(1)}%
                        </p>
                        {trendDelta && (
                          <Icon;
                            className={`w-4 h-4 ${getMetricColor(trendDelta.accuracyDelta, 'positive')}`}
                            name={getTrendIcon(trendDelta.accuracyDelta)}
                          / key={438800}>
                        )}
                      </div>
                    </div>

                    <div key={241917}>
                      <p className="text-sm text-gray-600" key={656535}>Precision</p>
                      <div className="flex items-center space-x-2" key={740830}>
                        <p className="text-lg font-semibold" key={930820}>
                          {(metrics.precision * 100).toFixed(1)}%
                        </p>
                        {trendDelta && (
                          <Icon;
                            className={`w-4 h-4 ${getMetricColor(trendDelta.precisionDelta, 'positive')}`}
                            name={getTrendIcon(trendDelta.precisionDelta)}
                          / key={876676}>
                        )}
                      </div>
                    </div>

                    <div key={241917}>
                      <p className="text-sm text-gray-600" key={656535}>Recall</p>
                      <div className="flex items-center space-x-2" key={740830}>
                        <p className="text-lg font-semibold" key={930820}>
                          {(metrics.recall * 100).toFixed(1)}%
                        </p>
                        {trendDelta && (
                          <Icon;
                            className={`w-4 h-4 ${getMetricColor(trendDelta.recallDelta, 'positive')}`}
                            name={getTrendIcon(trendDelta.recallDelta)}
                          / key={205804}>
                        )}
                      </div>
                    </div>

                    <div key={241917}>
                      <p className="text-sm text-gray-600" key={656535}>Profit/Loss</p>
                      <div className="flex items-center space-x-2" key={740830}>
                        <p className="text-lg font-semibold" key={930820}>{metrics.profitLoss.toFixed(2)}%</p>
                        <Icon;
                          className={`w-4 h-4 ${getMetricColor(metrics.profitLoss, 'positive')}`}
                          name={getTrendIcon(metrics.profitLoss)}
                        / key={106987}>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Risk Profile */}
            {riskProfile && (
              <div className="mt-4" key={139982}>
                <h4 className="text-sm font-medium mb-2" key={943837}>Risk Profile</h4>
                <div className="flex items-center space-x-2" key={740830}>
                  <Badge variant={riskProfile.riskLevel.toLowerCase() as any} key={679506}>
                    {riskProfile.riskLevel}
                  </Badge>
                  <p className="text-sm text-gray-600" key={656535}>{riskProfile.recommendation}</p>
                </div>
              </div>
            )}

            {/* Model Stability */}
            {modelMetadata && (
              <div className="mt-4" key={139982}>
                <h4 className="text-sm font-medium mb-2" key={943837}>Model Stability</h4>
                <div className="flex items-center space-x-2" key={740830}>
                  <Badge;
                    variant={
                      modelMetadata.stability  key={197442}> 0.8;
                        ? 'success'
                        : modelMetadata.stability > 0.6;
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {modelMetadata.stability > 0.8;
                      ? 'High'
                      : modelMetadata.stability > 0.6;
                        ? 'Medium'
                        : 'Low'}
                  </Badge>
                  <p className="text-sm text-gray-600" key={656535}>
                    Last updated: {new Date(modelMetadata.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation Tabs */}
        <Tabs className="mb-8" value={activeTab} onChange={setActiveTab} key={900880}>
          <Tab label="Basic Settings" value="basic" / key={913312}>
          <Tab label="Advanced Settings" value="advanced" / key={352110}>
          <Tab label="Risk Management" value="risk" / key={783938}>
          <Tab label="Model Selection" value="models" / key={430226}>
        </Tabs>

        {/* Basic Settings Tab */}
        {activeTab === 'basic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={411597}>
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Investment & Strategy</h2>
              <div className="space-y-6" key={501869}>
                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                    Investment Amount;
                  </label>
                  <Input;
                    max="100000"
                    min="10"
                    type="number"
                    value={config.investmentAmount}
                    onChange={e = key={965761}>
                      handleConfigChange('investmentAmount', parseFloat(e.target.value))
                    }
                  />
                  <p className="mt-1 text-sm text-gray-500" key={381339}>Range: $10 - $100,000</p>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                    Strategy Mode;
                  </label>
                  <Select;
                    options={[
                      { value: 'maximum_profit', label: 'Maximum Profit' },
                      { value: 'balanced', label: 'Balanced' },
                      { value: 'conservative', label: 'Conservative' },
                      { value: 'aggressive', label: 'Aggressive' },
                      { value: 'arbitrage', label: 'Arbitrage' },
                      { value: 'ai_adaptive', label: 'AI-Adaptive' },
                    ]}
                    value={config.strategyMode}
                    onChange={e = key={272996}> handleConfigChange('strategyMode', e.target.value)}
                  />
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                    Portfolio Size;
                  </label>
                  <Select;
                    options={[
                      { value: 2, label: '2 Legs' },
                      { value: 3, label: '3 Legs' },
                      { value: 4, label: '4 Legs' },
                      { value: 5, label: '5 Legs' },
                      { value: 6, label: '6 Legs' },
                    ]}
                    value={config.portfolioSize}
                    onChange={e = key={127004}> handleConfigChange('portfolioSize', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </Card>

            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Sports & Time Horizon</h2>
              <div className="space-y-6" key={501869}>
                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                    Sports Universe;
                  </label>
                  <div className="space-y-2" key={725977}>
                    <div className="flex items-center" key={520222}>
                      <input;
                        checked={config.sportsUniverse.all}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        type="checkbox"
                        onChange={e = key={83568}>
                          handleConfigChange('sportsUniverse', {
                            ...config.sportsUniverse,
                            all: e.target.checked,
                            selected: e.target.checked ? [] : config.sportsUniverse.selected,
                          })
                        }
                      />
                      <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300" key={273366}>
                        All Sports;
                      </label>
                    </div>
                    {!config.sportsUniverse.all && (
                      <Select;
                        multiple;
                        options={[
                          { value: 'football', label: 'Football' },
                          { value: 'basketball', label: 'Basketball' },
                          { value: 'baseball', label: 'Baseball' },
                          { value: 'hockey', label: 'Hockey' },
                          { value: 'soccer', label: 'Soccer' },
                          { value: 'tennis', label: 'Tennis' },
                        ]}
                        value={config.sportsUniverse.selected}
                        onChange={e = key={516223}>
                          handleConfigChange('sportsUniverse', {
                            ...config.sportsUniverse,
                            selected: Array.from(e.target.selectedOptions, option => option.value),
                          })
                        }
                      />
                    )}
                  </div>
                </div>

                <div key={241917}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                    Time Horizon;
                  </label>
                  <div className="flex space-x-4" key={470893}>
                    <Input;
                      className="w-24"
                      min="1"
                      type="number"
                      value={config.timeHorizon.value}
                      onChange={e = key={687887}>
                        handleConfigChange('timeHorizon', {
                          ...config.timeHorizon,
                          value: parseInt(e.target.value),
                        })
                      }
                    />
                    <Select;
                      options={[
                        { value: 'minutes', label: 'Minutes' },
                        { value: 'hours', label: 'Hours' },
                        { value: 'days', label: 'Days' },
                      ]}
                      value={config.timeHorizon.unit}
                      onChange={e = key={574377}>
                        handleConfigChange('timeHorizon', {
                          ...config.timeHorizon,
                          unit: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Advanced Settings Tab */}
        {activeTab === 'advanced' && (
          <Card key={650115}>
            <h2 className="text-xl font-bold mb-4" key={939378}>Advanced Configuration</h2>
            <div className="space-y-6" key={501869}>
              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Confidence Threshold;
                </label>
                <div className="space-y-2" key={725977}>
                  <Slider;
                    max={99}
                    min={80}
                    value={config.confidenceThreshold}
                    onChange={value = key={250813}> handleConfigChange('confidenceThreshold', value)}
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400" key={323743}>
                    <span key={595076}>80%</span>
                    <span key={595076}>Current: {config.confidenceThreshold}%</span>
                    <span key={595076}>99%</span>
                  </div>
                </div>
              </div>

              <div key={241917}>
                <h3 className="font-medium mb-2" key={656044}>Model Weights</h3>
                <div className="space-y-4" key={160407}>
                  {models.map(model => (
                    <div key={model.id} className="flex items-center space-x-4" key={110244}>
                      <input;
                        checked={config.modelSet[model.id]?.enabled}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        type="checkbox"
                        onChange={e = key={926582}> handleModelToggle(model.id, e.target.checked)}
                      />
                      <div className="flex-1" key={745195}>
                        <div className="flex justify-between mb-1" key={790471}>
                          <span className="font-medium" key={514486}>{model.name}</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400" key={10584}>
                            Accuracy: {formatPercentage(model.accuracy)}
                          </span>
                        </div>
                        <Slider;
                          disabled={!config.modelSet[model.id]?.enabled}
                          max={100}
                          min={0}
                          value={config.modelSet[model.id]?.weight * 100}
                          onChange={value = key={699377}> handleModelWeightChange(model.id, value / 100)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Risk Management Tab */}
        {activeTab === 'risk' && (
          <Card key={650115}>
            <h2 className="text-xl font-bold mb-4" key={939378}>Risk Management</h2>
            <div className="space-y-6" key={501869}>
              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Maximum Drawdown;
                </label>
                <div className="space-y-2" key={725977}>
                  <Slider;
                    max={50}
                    min={5}
                    value={config.riskProfile.maxDrawdown}
                    onChange={value = key={35135}>
                      handleConfigChange('riskProfile', {
                        ...config.riskProfile,
                        maxDrawdown: value,
                      })
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400" key={323743}>
                    <span key={595076}>5%</span>
                    <span key={595076}>Current: {config.riskProfile.maxDrawdown}%</span>
                    <span key={595076}>50%</span>
                  </div>
                </div>
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Maximum Exposure;
                </label>
                <div className="space-y-2" key={725977}>
                  <Slider;
                    max={100}
                    min={10}
                    value={config.riskProfile.maxExposure}
                    onChange={value = key={321190}>
                      handleConfigChange('riskProfile', {
                        ...config.riskProfile,
                        maxExposure: value,
                      })
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400" key={323743}>
                    <span key={595076}>10%</span>
                    <span key={595076}>Current: {config.riskProfile.maxExposure}%</span>
                    <span key={595076}>100%</span>
                  </div>
                </div>
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Correlation Limit;
                </label>
                <div className="space-y-2" key={725977}>
                  <Slider;
                    max={1}
                    min={0}
                    step={0.1}
                    value={config.riskProfile.correlationLimit}
                    onChange={value = key={313517}>
                      handleConfigChange('riskProfile', {
                        ...config.riskProfile,
                        correlationLimit: value,
                      })
                    }
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400" key={323743}>
                    <span key={595076}>0.0</span>
                    <span key={595076}>Current: {config.riskProfile.correlationLimit}</span>
                    <span key={595076}>1.0</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Model Selection Tab */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={411597}>
            {models.map(model => (
              <Card key={model.id} key={137354}>
                <div className="flex items-center justify-between mb-4" key={810034}>
                  <h3 className="text-lg font-medium" key={767483}>{model.name}</h3>
                  <Badge;
                    variant={
                      model.accuracy  key={852568}>= 90 ? 'success' : model.accuracy >= 80 ? 'warning' : 'danger'
                    }
                  >
                    {formatPercentage(model.accuracy)} Accuracy;
                  </Badge>
                </div>
                <div className="space-y-4" key={160407}>
                  <p className="text-gray-600 dark:text-gray-400" key={300965}>{model.description}</p>
                  <div className="grid grid-cols-2 gap-4" key={354810}>
                    <div key={241917}>
                      <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Type</p>
                      <p className="font-medium" key={787187}>{model.type}</p>
                    </div>
                    <div key={241917}>
                      <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Profit Factor</p>
                      <p className="font-medium" key={787187}>{model.profitFactor.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between" key={96335}>
                    <span className="text-sm text-gray-600 dark:text-gray-400" key={10584}>
                      Last Updated: {new Date(model.lastUpdated).toLocaleDateString()}
                    </span>
                    <input;
                      checked={config.modelSet[model.id]?.enabled}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      type="checkbox"
                      onChange={e = key={24149}> handleModelToggle(model.id, e.target.checked)}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end mt-8 space-x-4" key={407679}>
          <Button;
            variant="secondary"
            onClick={() = key={565568}> {
              // Reset to default configuration;
              loadModels();
            }}
          >
            Reset;
          </Button>
          <Button disabled={loading} variant="primary" onClick={generateRecommendations} key={260562}>
            {loading ? <Spinner size="small" / key={64504}> : 'Generate Recommendations'}
          </Button>
        </div>
      </div>

      {/* Recommendations Modal */}
      <Modal;
        isOpen={showRecommendations}
        title="Portfolio Recommendations"
        onClose={() = key={68107}> setShowRecommendations(false)}
      >
        <div className="space-y-6" key={501869}>
          {recommendations.map((recommendation, index) => (
            <Card key={index} key={520458}>
              <div className="flex items-center justify-between mb-4" key={810034}>
                <h3 className="text-lg font-medium" key={767483}>Portfolio {index + 1}</h3>
                <Badge;
                  variant={
                    recommendation.expectedValue  key={601424}> 0;
                      ? 'success'
                      : recommendation.expectedValue < 0;
                        ? 'danger'
                        : 'warning'
                  }
                >
                  {formatPercentage(recommendation.expectedValue)} Expected Value;
                </Badge>
              </div>
              <div className="space-y-4" key={160407}>
                <div key={241917}>
                  <h4 className="font-medium mb-2" key={450376}>Legs</h4>
                  <div className="space-y-2" key={725977}>
                    {recommendation.legs.map((leg, legIndex) => (
                      <div key={legIndex} className="p-2 bg-gray-50 dark:bg-gray-800 rounded" key={23676}>
                        <div className="flex justify-between mb-1" key={790471}>
                          <span className="font-medium" key={514486}>{leg.selection}</span>
                          <span key={595076}>{leg.odds.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400" key={323743}>
                          <span key={595076}>{leg.marketType}</span>
                          <span key={595076}>Confidence: {formatPercentage(leg.confidence)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4" key={354810}>
                  <div key={241917}>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Total Odds</p>
                    <p className="font-medium" key={787187}>{recommendation.totalOdds.toFixed(2)}</p>
                  </div>
                  <div key={241917}>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Risk Score</p>
                    <p className="font-medium" key={787187}>{recommendation.riskScore.toFixed(2)}</p>
                  </div>
                  <div key={241917}>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Confidence</p>
                    <p className="font-medium" key={787187}>{formatPercentage(recommendation.confidence)}</p>
                  </div>
                  <div key={241917}>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Expected Value</p>
                    <p;
                      className={`font-medium ${
                        recommendation.expectedValue  key={78306}> 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {formatPercentage(recommendation.expectedValue)}
                    </p>
                  </div>
                </div>
                <Button;
                  className="w-full"
                  variant="primary"
                  onClick={() = key={769449}> {
                    // Handle portfolio selection;
                    setShowRecommendations(false);
                  }}
                >
                  Select Portfolio;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Modal>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() = key={337979}> setToast(null)} />}
    </div>
  );
};
