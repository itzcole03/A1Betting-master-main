import React, { useEffect, useState  } from 'react.ts';
import Box from '@mui/material/Box.ts';
import Paper from '@mui/material/Paper.ts';
import Typography from '@mui/material/Typography.ts';
import CircularProgress from '@mui/material/CircularProgress.ts';
import Alert from '@mui/material/Alert.ts';
import Chip from '@mui/material/Chip.ts';
import Stack from '@mui/material/Stack.ts';
import Tooltip from '@mui/material/Tooltip.ts';
import IconButton from '@mui/material/IconButton.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';
import InfoIcon from '@mui/icons-material/Info.ts';
import { usePredictionService } from '@/../hooks/usePredictionService.ts';
import { useRiskProfile } from '@/../hooks/useRiskProfile.ts';
import { EventBus } from '@/../unified/EventBus.ts';
import { ErrorHandler } from '@/../unified/ErrorHandler.ts';
import { PerformanceMonitor } from '@/../unified/PerformanceMonitor.ts';
import { ModelVersioning } from '@/../unified/ModelVersioning.ts';
import { Prediction, RiskProfile, ErrorCategory, ErrorSeverity } from '@/../types/core.ts';
import { BettingOpportunity } from '@/../types/betting.ts';
import { ShapExplanation } from '@/prediction/ShapExplanation.ts';
import { ConfidenceIndicator } from '@/common/ConfidenceIndicator.ts';
import { RiskLevelIndicator } from '@/common/RiskLevelIndicator.ts';
import { ValidationStatus } from '@/common/ValidationStatus.ts';
import { useFilterStore } from '@/../stores/filterStore.ts';

interface RealtimePredictionDisplayProps {
  predictionId: string;
}

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.8) return 'success';
  if (confidence >= 0.6) return 'warning';
  return 'error';
};

const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel) {
    case 'low':
      return 'success';
    case 'medium':
      return 'warning';
    case 'high':
      return 'error';
    default:
      return 'default';
  }
};

export const RealtimePredictionDisplay: React.FC<RealtimePredictionDisplayProps key={21011}> = ({
  predictionId,
}) => {
  const [prediction, setPrediction] = useState<Prediction | null key={547963}>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const { getPredictions } = usePredictionService();
  const { currentProfile } = useRiskProfile();





  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        setIsLoading(true);
        const results = await getPredictions({
          riskProfile: filterStore.riskProfile,
          sport: filterStore.sport,
          minOdds: filterStore.minOdds,
          maxOdds: filterStore.maxOdds,
          minConfidence: filterStore.minConfidence,
          maxConfidence: filterStore.maxConfidence,
          projectedReturn: filterStore.projectedReturn,
          // add any other filters as needed;
        });

        setPrediction(result || null);
        setError(null);

        // Track performance;
        performanceMonitor.recordOperation('fetchPrediction', performance.now());

        // Emit event for analytics;
        if (result) {
          eventBus.emit('prediction:fetched', {
            predictionId,
            confidence: result.confidence,
            riskLevel: result.riskLevel,
          });
        }
      } catch (err) {

        errorHandler.handleError(error, 'RealtimePredictionDisplay', 'fetchPrediction', {
          category: ErrorCategory.NETWORK,
          severity: ErrorSeverity.MEDIUM,
        });
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();

    // Subscribe to real-time updates;
    const unsubscribe = eventBus.subscribe(`prediction:${predictionId}`, (data: any) => {
      setPrediction(prev => ({
        ...prev,
        ...data,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [predictionId, filterStore]);

  if (isLoading) {
    return (
      <Box alignItems="center" display="flex" justifyContent="center" minHeight={200} key={317353}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }} key={957932}>
        {error}
      </Alert>
    );
  }

  if (!prediction) {
    return (
      <Alert severity="info" sx={{ mb: 2 }} key={672219}>
        No prediction data available;
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }} key={678742}>
      <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} key={881353}>
        <Typography variant="h6" key={93421}>Prediction Details</Typography>
        <Box alignItems="center" display="flex" gap={1} key={110385}>
          <ConfidenceIndicator value={prediction.confidence} / key={489670}>
          <RiskLevelIndicator level={prediction.riskLevel} / key={413313}>
          <ValidationStatus;
            message={validationStatus.reason || 'Validated'}
            status={validationStatus.isValid ? 'valid' : 'invalid'}
          / key={718883}>
        </Box>
      </Box>

      <Box mb={3} key={330107}>
        <Typography gutterBottom color="textSecondary" variant="subtitle2" key={854908}>
          Model Information;
        </Typography>
        <Stack direction="row" spacing={1} key={870213}>
          <Chip label={`Version: ${modelVersioning.getCurrentVersion()}`} size="small" / key={512023}>
          <Chip;
            label={`Last Updated: ${new Date(prediction.timestamp).toLocaleString()}`}
            size="small"
          / key={342498}>
        </Stack>
      </Box>

      <Box mb={3} key={330107}>
        <Typography gutterBottom color="textSecondary" variant="subtitle2" key={854908}>
          SHAP Values;
        </Typography>
        <ShapExplanation explanation={prediction.explanation} / key={173533}>
      </Box>

      <Box key={485947}>
        <Typography gutterBottom color="textSecondary" variant="subtitle2" key={854908}>
          Risk Profile Validation;
        </Typography>
        <Stack direction="row" spacing={1} key={870213}>
          <Chip;
            color={prediction.stake <= currentProfile.max_stake_percentage ? 'success' : 'error'}
            label={`Max Stake: ${(currentProfile.max_stake_percentage * 100).toFixed(1)}%`}
            size="small"
          / key={320889}>
          <Chip;
            color={
              prediction.confidence  key={816908}>= currentProfile.min_confidence_threshold ? 'success' : 'error'
            }
            label={`Min Confidence: ${(currentProfile.min_confidence_threshold * 100).toFixed(1)}%`}
            size="small"
          />
          <Chip;
            color={
              prediction.volatility <= currentProfile.volatility_tolerance ? 'success' : 'error'
            }
            label={`Volatility: ${(prediction.volatility * 100).toFixed(1)}%`}
            size="small"
          / key={888146}>
        </Stack>
      </Box>
    </Paper>
  );
};

const validatePrediction = (
  prediction: Prediction,
  riskProfile: RiskProfile;
): { isValid: boolean; reason?: string } => {
  if (prediction.confidence < riskProfile.min_confidence_threshold) {
    return {
      isValid: false,
      reason: `Confidence below threshold (${(riskProfile.min_confidence_threshold * 100).toFixed(1)}%)`,
    };
  }

  if (prediction.volatility > riskProfile.volatility_tolerance) {
    return {
      isValid: false,
      reason: `Volatility exceeds tolerance (${(riskProfile.volatility_tolerance * 100).toFixed(1)}%)`,
    };
  }

  if (prediction.riskScore > riskProfile.max_risk_score) {
    return {
      isValid: false,
      reason: `Risk score exceeds maximum (${(riskProfile.max_risk_score * 100).toFixed(1)}%)`,
    };
  }

  return { isValid: true };
};
