import React, { useState, useEffect, useCallback, useMemo  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
  Chip,
  Button,
  Collapse,
  Alert,
  CircularProgress,
} from '@mui/material.ts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material.ts';
import { formatPercentage, formatCurrency } from '@/utils/formatters.ts';
import { debounce } from 'lodash.ts';
import type { ModelPrediction } from '@/types/prediction.ts';

interface PredictionEnhancementProps {
  predictions: ModelPrediction[];
  onStakeOptimize: (prediction: ModelPrediction) => void;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  bankroll: number;
  onRefresh?: () => Promise<void key={132647}>;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

const PredictionEnhancement: React.FC<PredictionEnhancementProps key={691820}> = ({
  predictions,
  onStakeOptimize,
  riskProfile,
  bankroll,
  onRefresh,
  autoRefresh = false,
  refreshInterval = 30000,
}) => {
  const [selectedPrediction, setSelectedPrediction] = useState<ModelPrediction | null key={82017}>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);

  // Memoize confidence level calculation;
  const getConfidenceLevel = useCallback((confidence: number) => {
    if (confidence >= 0.9) return { label: 'Safe', color: 'success' as const };
    if (confidence >= 0.7) return { label: 'Medium', color: 'warning' as const };
    return { label: 'Risky', color: 'error' as const };
  }, []);

  // Memoize Kelly stake calculation;
  const calculateKellyStake = useCallback(
    (prediction: ModelPrediction) => {
      const { confidence, prediction: odds } = prediction;



      const riskMultiplier = {
        conservative: 0.25,
        moderate: 0.5,
        aggressive: 0.75,
      }[riskProfile];

      return Math.max(0, Math.min(kelly * riskMultiplier * bankroll, bankroll * 0.1));
    },
    [riskProfile, bankroll]
  );

  // Debounced refresh handler;
  const debouncedRefresh = useMemo(
    () =>
      debounce(async () => {
        if (!onRefresh) return;
        try {
          setIsRefreshing(true);
          setError(null);
          await onRefresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to refresh predictions');
        } finally {
          setIsRefreshing(false);
        }
      }, 1000),
    [onRefresh]
  );

  // Auto-refresh effect;
  useEffect(() => {
    if (!autoRefresh || !onRefresh) return;

    return () => clearInterval(interval);
  }, [autoRefresh, onRefresh, refreshInterval, debouncedRefresh]);

  // Memoize sorted predictions;
  const sortedPredictions = useMemo(() => {
    return [...predictions].sort((a, b) => b.confidence - a.confidence);
  }, [predictions]);

  return (
    <Box sx={{ p: 3 }} key={486541}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} key={244704}>
        <Typography variant="h5" key={944884}>
          Enhanced Predictions;
          <Tooltip title="AI-powered predictions with multi-model consensus" key={509604}>
            <IconButton key={49502}>
              <InfoIcon / key={352040}>
            </IconButton>
          </Tooltip>
        </Typography>
        {onRefresh && (
          <Button;
            disabled={isRefreshing}
            startIcon={isRefreshing ? <CircularProgress size={20} / key={683265}> : <RefreshIcon / key={544473}>}
            onClick={debouncedRefresh}
          >
            Refresh;
          </Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} key={957932}>
          {error}
        </Alert>
      )}

      <Box;
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 3,
        }}
       key={854733}>
        {sortedPredictions.map((prediction, index) => {


          return (
            <Card;
              key={prediction.eventId + index}
              sx={{
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
             key={294418}>
              <CardContent key={452065}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }} key={733531}>
                  <Typography variant="h6" key={93421}>{prediction.modelName}</Typography>
                  <Chip;
                    color={confidenceLevel.color}
                    icon={
                      confidenceLevel.color === 'success' ? (
                        <CheckCircleIcon / key={225494}>
                      ) : confidenceLevel.color === 'warning' ? (
                        <WarningIcon / key={78709}>
                      ) : (
                        <ErrorIcon / key={610137}>
                      )
                    }
                    label={confidenceLevel.label}
                  />
                </Box>

                <Box sx={{ mb: 2 }} key={144601}>
                  <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
                    Confidence Score;
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={109447}>
                    <LinearProgress;
                      color={confidenceLevel.color}
                      sx={{
                        flexGrow: 1,
                        height: 8,
                        borderRadius: 4,
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scaleY(1.2)',
                        },
                      }}
                      value={prediction.confidence * 100}
                      variant="determinate"
                    / key={325503}>
                    <Typography variant="body2" key={679167}>
                      {formatPercentage(prediction.confidence)}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }} key={144601}>
                  <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
                    Model Performance;
                  </Typography>
                  <Box;
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 1,
                    }}
                   key={341373}>
                    <Box key={485947}>
                      <Typography color="text.secondary" variant="caption" key={290635}>
                        Accuracy;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        {formatPercentage(prediction.performance.accuracy)}
                      </Typography>
                    </Box>
                    <Box key={485947}>
                      <Typography color="text.secondary" variant="caption" key={290635}>
                        ROI;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        {formatPercentage(prediction.performance.roi)}
                      </Typography>
                    </Box>
                    <Box key={485947}>
                      <Typography color="text.secondary" variant="caption" key={290635}>
                        Win Rate;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        {formatPercentage(prediction.performance.winRate)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }} key={144601}>
                  <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
                    Suggested Stake (Kelly Criterion)
                  </Typography>
                  <Typography color="primary" variant="h6" key={397198}>
                    {formatCurrency(suggestedStake)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }} key={973949}>
                  <Button;
                    fullWidth;
                    color="primary"
                    variant="contained"
                    onClick={() = key={19660}> onStakeOptimize(prediction)}
                  >
                    Optimize Stake;
                  </Button>
                  <Button;
                    variant="outlined"
                    onClick={() = key={806659}> {
                      setSelectedPrediction(prediction);
                      setShowDetails(!showDetails);
                    }}
                  >
                    Details;
                  </Button>
                </Box>

                <Collapse in={showDetails && selectedPrediction === prediction} key={959966}>
                  <Box sx={{ mt: 2 }} key={337181}>
                    <Typography gutterBottom variant="subtitle2" key={750236}>
                      Top Contributing Features;
                    </Typography>
                    {prediction.features.slice(0, 3).map((feature, idx) => (
                      <Box;
                        key={idx}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'action.hover',
                          transition: 'background-color 0.2s',
                          '&:hover': {
                            bgcolor: 'action.selected',
                          },
                        }}
                       key={327449}>
                        <Typography variant="body2" key={679167}>{feature.name}</Typography>
                        <Typography color="text.secondary" variant="body2" key={497604}>
                          {formatPercentage(feature.importance)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default React.memo(PredictionEnhancement);
