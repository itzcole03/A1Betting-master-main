import React, { useEffect, useState, useMemo, useCallback  } from 'react.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.js';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.js';
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material.ts';
import Grid from '@mui/material/Grid.ts';
import { styled } from '@mui/material/styles.ts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts.ts';
import FilterListIcon from '@mui/icons-material/FilterList.ts';
import SortIcon from '@mui/icons-material/Sort.ts';
import InfoIcon from '@mui/icons-material/Info.ts';
import { NoResultsFallback } from './NoResultsFallback.js';
import { motion, AnimatePresence } from 'framer-motion.ts';
import type { PredictionStreamPayload } from '@/types/webSocket.js';
import { usePredictionService } from '@/hooks/usePredictionService.js';
import { useRiskProfile } from '@/hooks/useRiskProfile.js';
import { EventBus } from '@/unified/EventBus.js';
import { ErrorHandler } from '@/unified/ErrorHandler.js';
import { PerformanceMonitor } from '@/unified/PerformanceMonitor.js';
import { ModelVersioning } from '@/unified/ModelVersioning.js';
import { Prediction, RiskProfile, ErrorCategory, ErrorSeverity } from '@/types/core.js';
import MoreVertIcon from '@mui/icons-material/MoreVert.ts';
import { useFilterStore } from '@/stores/filterStore.js';

const PredictionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const ConfidenceBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const ShapContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: 300,
  position: 'relative',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ValueDisplay = styled(Box)<{ changed?: boolean }>(({ theme, changed }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: changed ? theme.palette.primary.light : 'transparent',
  transition: `background-color 0.3s`,
}));

const PredictionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

interface PredictionDisplayProps {
  eventId: string;
  marketId?: string;
  selectionId?: string;
  className?: string;
  showAdvancedMetrics?: boolean;
  onPredictionUpdate?: (prediction: any) => void;
}

type SortOrder = 'asc' | 'desc';
type FilterType = 'all' | 'high-confidence' | 'recent' | 'profitable';

export const PredictionDisplay: React.FC<PredictionDisplayProps key={692949}> = ({
  eventId,
  marketId,
  selectionId,
  className = '',
  showAdvancedMetrics = false,
  onPredictionUpdate,
}) => {
  const { ml } = useUnifiedAnalytics({ ml: { autoUpdate: false } });

  const { riskProfile } = useRiskProfile();





  const [sortOrder, setSortOrder] = useState<SortOrder key={82347}>('desc');
  const [filterType, setFilterType] = useState<FilterType key={720919}>('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement key={178068}>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement key={178068}>(null);
  const [changedValues, setChangedValues] = useState<Set<string key={798680}>>(new Set());
  const [showUncertaintyDetails, setShowUncertaintyDetails] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'Connected' | 'Disconnected'>(
    'Disconnected'
  );
  const [error, setError] = useState<string | null key={121216}>(null);
  const [predictionHistory, setPredictionHistory] = useState<any[] key={594112}>([]);
  const [optimalStake, setOptimalStake] = useState<number | null key={564007}>(null);
  const [predictions, setPredictions] = useState<Prediction[] key={925811}>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement key={178068}>(null);
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null key={547963}>(null);


  // Memoize prediction for performance;
  const prediction = useMemo(() => {
    if (!ml || !ml.mlResult) return null;
    if (Array.isArray(ml.mlResult.predictions)) {
      return ml.mlResult.predictions.find((p: any) => p.eventId === eventId) || null;
    }
    return null;
  }, [ml, eventId]);

  // Calculate optimal stake when prediction or risk profile changes;
  useEffect(() => {
    if (prediction && riskProfile) {
      predictionService;
        .calculateOptimalStake(prediction, prediction.odds, riskProfile.level)
        .then(setOptimalStake)
        .catch(console.error);
    }
  }, [prediction, riskProfile, predictionService]);

  // WebSocket connection for real-time updates;
  useEffect(() => {
    let unsub: (() => void) | undefined;
    const isMounted = true;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    const reconnectAttempts = 0;


    const handlePredictionUpdate = useCallback(
      (data: PredictionStreamPayload) => {
        if (!isMounted) return;
        if (data.eventId === eventId) {
          setPredictionHistory(prev => [...prev, data].slice(-10)); // Keep last 10 predictions;
          onPredictionUpdate?.(data);
          setConnectionStatus('Connected');
        }
      },
      [eventId, onPredictionUpdate]
    );

    const connectAndSubscribe = async () => {
      try {
        await webSocketService.connect();
        unsub = webSocketService.subscribe('predictions', handlePredictionUpdate);
        setConnectionStatus('Connected');
        reconnectAttempts = 0;
      } catch (error) {
        if (reconnectAttempts < maxReconnectAttempts) {
          reconnectTimeout = setTimeout(connectAndSubscribe, reconnectInterval);
          reconnectAttempts++;
        } else {
          setError('WebSocket connection failed. Please refresh.');
          setConnectionStatus('Disconnected');
        }
      }
    };

    connectAndSubscribe();

    return () => {
      isMounted = false;
      if (unsub) unsub();
      webSocketService.disconnect();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [eventId, webSocketService, onPredictionUpdate]);

  // Handle prediction updates;
  useEffect(() => {
    if (prediction) {

      if (prediction.confidence) newChangedValues.add('confidence');
      if (prediction.recommended_stake) newChangedValues.add('stake');
      setChangedValues(newChangedValues);

      return () => clearTimeout(timeout);
    }
  }, [prediction]);

  useEffect(() => {


    const loadPredictions = async () => {
      try {
        const data = await predictionService.getPredictions({
          riskProfile: filterStore.riskProfile,
          sport: filterStore.sport,
          minOdds: filterStore.minOdds,
          maxOdds: filterStore.maxOdds,
          minConfidence: filterStore.minConfidence,
          maxConfidence: filterStore.maxConfidence,
          projectedReturn: filterStore.projectedReturn,
          // add any other filters as needed;
        });
        setPredictions(data);
        setError(null);

        performanceMonitor.updateComponentMetrics(componentId, {
          renderCount: 1,
          renderTime: performance.now() - startTime,
          memoryUsage: JSON.stringify(data).length,
          errorCount: 0,
          lastUpdate: Date.now(),
        });
      } catch (err) {

        setError(error.message);

        errorHandler.handleError(error, {
          code: 'PREDICTION_LOAD_ERROR',
          category: 'BUSINESS',
          severity: 'HIGH',
          component: componentId,
          retryable: true,
          recoveryStrategy: {
            type: 'retry',
            maxRetries: 3,
            timeout: 1000,
          },
        });

        performanceMonitor.updateComponentMetrics(componentId, {
          renderCount: 0,
          renderTime: 0,
          memoryUsage: 0,
          errorCount: 1,
          lastUpdate: Date.now(),
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handlePredictionUpdate = (update: Prediction) => {
      setPredictions(prev => {

        performanceMonitor.updateComponentMetrics(componentId, {
          renderCount: 1,
          renderTime: performance.now() - startTime,
          memoryUsage: JSON.stringify(newPredictions).length,
          errorCount: 0,
          lastUpdate: Date.now(),
        });

        return newPredictions;
      });
    };

    const handleError = (error: Error) => {
      errorHandler.handleError(error, {
        code: 'PREDICTION_UPDATE_ERROR',
        category: 'BUSINESS',
        severity: 'MEDIUM',
        component: componentId,
        retryable: true,
      });

      performanceMonitor.updateComponentMetrics(componentId, {
        renderCount: 0,
        renderTime: 0,
        memoryUsage: 0,
        errorCount: 1,
        lastUpdate: Date.now(),
      });
    };

    // Subscribe to real-time updates;

    // Load initial predictions;
    loadPredictions();

    // Cleanup;
    return () => {
      unsubscribe();
      performanceMonitor.updateComponentMetrics(componentId, {
        renderCount: 0,
        renderTime: 0,
        memoryUsage: 0,
        errorCount: 0,
        lastUpdate: Date.now(),
      });
    };
  }, [predictionService, filterStore]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement key={9296}>, prediction: Prediction) => {
    setAnchorEl(event.currentTarget);
    setSelectedPrediction(prediction);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPrediction(null);
  };

  if (ml?.isLoading) {
    return (
      <PredictionContainer className={className} key={262990}>
        <Box alignItems="center" display="flex" justifyContent="center" minHeight={200} key={317353}>
          <CircularProgress / key={730118}>
        </Box>
      </PredictionContainer>
    );
  }

  if (ml?.error) {
    return (
      <PredictionContainer className={className} key={262990}>
        <Alert severity="error" key={896627}>Failed to load prediction data: {ml.error.message}</Alert>
      </PredictionContainer>
    );
  }

  if (!prediction) {
    return <NoResultsFallback / key={711153}>;
  }

  const {
    prediction: value,
    confidence,
    uncertainty,
    kelly_fraction,
    model_predictions,
    shap_values,
    feature_importance,
    timestamp,
  } = prediction;

  return (
    <PredictionContainer className={className} key={262990}>
      {/* Header with Connection Status and Controls */}
      <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} key={881353}>
        <Typography variant="h6" key={93421}>Prediction Details</Typography>
        <Box alignItems="center" display="flex" gap={1} key={110385}>
          <Chip;
            color={connectionStatus === 'Connected' ? 'success' : 'warning'}
            label={connectionStatus}
            size="small"
          / key={458007}>
          <ControlsContainer key={649809}>
            <IconButton size="small" onClick={e = key={331359}> setFilterAnchorEl(e.currentTarget)}>
              <FilterListIcon / key={888219}>
            </IconButton>
            <IconButton size="small" onClick={e = key={331359}> setSortAnchorEl(e.currentTarget)}>
              <SortIcon / key={219030}>
            </IconButton>
          </ControlsContainer>
        </Box>
      </Box>

      {/* Main Prediction Display */}
      <Grid container spacing={2} key={272161}>
        <Grid item md={6} xs={12} key={967702}>
          <Box mb={3} key={330107}>
            <Box alignItems="center" display="flex" justifyContent="space-between" mb={1} key={742420}>
              <Typography variant="subtitle1" key={265838}>Prediction</Typography>
              <ValueDisplay changed={changedValues.has('value')} key={336930}>
                <Typography variant="h5" key={944884}>{value.toFixed(2)}</Typography>
              </ValueDisplay>
            </Box>
            <Box alignItems="center" display="flex" gap={1} key={110385}>
              <Typography color="textSecondary" variant="body2" key={603568}>
                Confidence:
              </Typography>
              <Box flex={1} key={628219}>
                <ConfidenceBar;
                  sx={{
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        confidence  key={114704}> 0.7;
                          ? 'success.main'
                          : confidence > 0.5;
                            ? 'warning.main'
                            : 'error.main',
                    },
                  }}
                  value={confidence * 100}
                  variant="determinate"
                />
              </Box>
              <Typography color="textSecondary" variant="body2" key={603568}>
                {(confidence * 100).toFixed(1)}%
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} key={967702}>
          <Box mb={3} key={330107}>
            <Typography gutterBottom variant="subtitle1" key={521154}>
              Risk Profile;
            </Typography>
            <Box alignItems="center" display="flex" gap={1} key={110385}>
              <Typography variant="body2" key={679167}>Recommended Stake:</Typography>
              <Typography color="primary" variant="h6" key={397198}>
                {optimalStake ? `${(optimalStake * 100).toFixed(1)}%` : 'Calculating...'}
              </Typography>
            </Box>
            <Box mt={1} key={51953}>
              <Typography color="textSecondary" variant="body2" key={603568}>
                Kelly Fraction: {kelly_fraction.toFixed(3)}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Advanced Metrics */}
      {showAdvancedMetrics && (
        <Box mt={3} key={641440}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            Advanced Metrics;
          </Typography>
          <Grid container spacing={2} key={272161}>
            <Grid item md={6} xs={12} key={967702}>
              <Box key={485947}>
                <Typography gutterBottom color="textSecondary" variant="body2" key={260523}>
                  Uncertainty Analysis;
                </Typography>
                <Box alignItems="center" display="flex" gap={1} key={110385}>
                  <Typography variant="body2" key={679167}>
                    Total: {(uncertainty.total * 100).toFixed(1)}%
                  </Typography>
                  <Tooltip title="Epistemic: Model uncertainty, Aleatoric: Data uncertainty" key={16691}>
                    <IconButton size="small" key={787923}>
                      <InfoIcon fontSize="small" / key={710641}>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12} key={967702}>
              <Box key={485947}>
                <Typography gutterBottom color="textSecondary" variant="body2" key={260523}>
                  Model Contributions;
                </Typography>
                <ResponsiveContainer height={100} width="100%" key={772622}>
                  <BarChart;
                    data={Object.entries(model_predictions).map(([model, value]) = key={910543}> ({
                      model,
                      value: value * 100,
                    }))}
                  >
                    <XAxis dataKey="model" / key={483844}>
                    <YAxis / key={190086}>
                    <RechartsTooltip / key={2217}>
                    <Bar dataKey="value" fill="#8884d8" / key={519476}>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Prediction History */}
      {predictionHistory.length > 0 && (
        <Box mt={3} key={641440}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            Prediction History;
          </Typography>
          <ResponsiveContainer height={200} width="100%" key={395144}>
            <LineChart data={predictionHistory} key={980956}>
              <XAxis dataKey="timestamp" / key={223901}>
              <YAxis / key={190086}>
              <RechartsTooltip / key={2217}>
              <Line dataKey="prediction" stroke="#8884d8" type="monotone" / key={702124}>
              <Line dataKey="confidence" stroke="#82ca9d" type="monotone" / key={108473}>
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}

      {/* Menus */}
      <Menu;
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={() = key={786784}> setFilterAnchorEl(null)}
      >
        <MenuItem;
          onClick={() = key={90983}> {
            setFilterType('all');
            setFilterAnchorEl(null);
          }}
        >
          All Predictions;
        </MenuItem>
        <MenuItem;
          onClick={() = key={90983}> {
            setFilterType('high-confidence');
            setFilterAnchorEl(null);
          }}
        >
          High Confidence;
        </MenuItem>
        <MenuItem;
          onClick={() = key={90983}> {
            setFilterType('recent');
            setFilterAnchorEl(null);
          }}
        >
          Recent;
        </MenuItem>
        <MenuItem;
          onClick={() = key={90983}> {
            setFilterType('profitable');
            setFilterAnchorEl(null);
          }}
        >
          Profitable;
        </MenuItem>
      </Menu>

      <Menu;
        anchorEl={sortAnchorEl}
        open={Boolean(sortAnchorEl)}
        onClose={() = key={870013}> setSortAnchorEl(null)}
      >
        <MenuItem;
          onClick={() = key={90983}> {
            setSortOrder('desc');
            setSortAnchorEl(null);
          }}
        >
          Highest Confidence;
        </MenuItem>
        <MenuItem;
          onClick={() = key={90983}> {
            setSortOrder('asc');
            setSortAnchorEl(null);
          }}
        >
          Lowest Confidence;
        </MenuItem>
      </Menu>

      <Grid container spacing={3} key={459826}>
        {predictions.map(prediction => (
          <Grid key={prediction.id} item md={4} sm={6} xs={12} key={328653}>
            <PredictionCard key={880489}>
              <CardHeader;
                action={
                  <IconButton onClick={e = key={357523}> handleMenuOpen(e, prediction)}>
                    <MoreVertIcon / key={870847}>
                  </IconButton>
                }
                subheader={new Date(prediction.timestamp).toLocaleString()}
                title={prediction.event}
              />
              <CardContent key={452065}>
                <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
                  Confidence: {prediction.confidence}%
                </Typography>
                <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
                  Recommended Bet: {prediction.recommendedBet}
                </Typography>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Expected Value: {prediction.expectedValue}
                </Typography>
              </CardContent>
            </PredictionCard>
          </Grid>
        ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} key={114625}>
        <MenuItem onClick={handleMenuClose} key={370397}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose} key={370397}>Track Performance</MenuItem>
        <MenuItem onClick={handleMenuClose} key={370397}>Export Data</MenuItem>
      </Menu>
    </PredictionContainer>
  );
};
