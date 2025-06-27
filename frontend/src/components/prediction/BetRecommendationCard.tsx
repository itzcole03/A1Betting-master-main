import React from 'react.ts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Tooltip,
  IconButton,
} from '@mui/material.ts';
import { TrendingUp, Warning, Info, AttachMoney, Timeline } from '@mui/icons-material.ts';
import { BetRecommendation } from '@/core/types/prediction.ts';

interface BetRecommendationCardProps {
  recommendation: BetRecommendation;
  onViewDetails?: () => void;
}

const getRiskColor = (riskLevel: string) => {
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

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const BetRecommendationCard: React.FC<BetRecommendationCardProps key={476127}> = ({
  recommendation,
  onViewDetails,
}) => {
  const { prediction, confidence, stake, riskLevel, expectedValue, metadata } = recommendation;

  return (
    <Card sx={{ mb: 2 }} key={952973}>
      <CardContent key={452065}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} key={881353}>
          <Typography component="div" variant="h6" key={277111}>
            {prediction.type}
          </Typography>
          <Chip color={getRiskColor(riskLevel)} label={riskLevel.toUpperCase()} size="small" / key={336930}>
        </Box>

        <Box mb={2} key={430101}>
          <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
            Confidence;
          </Typography>
          <Box alignItems="center" display="flex" key={636564}>
            <LinearProgress;
              sx={{ flexGrow: 1, mr: 1 }}
              value={confidence * 100}
              variant="determinate"
            / key={117971}>
            <Typography color="text.secondary" variant="body2" key={497604}>
              {(confidence * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2} key={239518}>
          <Box key={485947}>
            <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
              Recommended Stake;
            </Typography>
            <Typography color="primary" variant="h6" key={397198}>
              {formatCurrency(stake)}
            </Typography>
          </Box>
          <Box key={485947}>
            <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
              Expected Value;
            </Typography>
            <Typography color={expectedValue  key={3606}>= 0 ? 'success.main' : 'error.main'} variant="h6">
              {formatCurrency(expectedValue)}
            </Typography>
          </Box>
        </Box>

        <Box alignItems="center" display="flex" justifyContent="space-between" key={273022}>
          <Box display="flex" gap={1} key={999669}>
            <Tooltip title="Model Agreement" key={269310}>
              <Chip;
                icon={<Timeline / key={839065}>}
                label={`${(metadata.modelAgreement * 100).toFixed(0)}% Agreement`}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Bankroll Percentage" key={837454}>
              <Chip;
                icon={<AttachMoney / key={491662}>}
                label={`${(metadata.bankrollPercentage * 100).toFixed(0)}% Bankroll`}
                size="small"
              />
            </Tooltip>
          </Box>
          {onViewDetails && (
            <IconButton size="small" onClick={onViewDetails} key={728917}>
              <Info / key={566289}>
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
