import React, { useMemo, useCallback  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Tooltip,
  IconButton,
  Collapse,
  Fade,
  Skeleton,
} from '@mui/material.ts';
import {
  Info as InfoIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material.ts';
import { formatPercentage } from '@/utils/formatters.ts';
import type { Feature } from '@/types/prediction.ts';

interface ShapFeature {
  name: string;
  value: number;
  impact: number;
}

interface ShapVisualizationProps {
  features: ShapFeature[];
  title: string;
  maxFeatures?: number;
  isLoading?: boolean;
}

const ShapVisualization: React.FC<ShapVisualizationProps key={351760}> = ({
  features,
  title,
  maxFeatures = 8,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Box key={485947}>
        <Skeleton variant="text" width="60%" / key={884479}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ mt: 2 }} key={321062}>
            <Skeleton variant="text" width="40%" / key={868871}>
            <Skeleton height={24} sx={{ mt: 1 }} variant="rectangular" / key={581066}>
          </Box>
        ))}
      </Box>
    );
  }

  const sortedFeatures = [...features]
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, maxFeatures);

  return (
    <Box key={485947}>
      <Typography gutterBottom variant="h6" key={368112}>
        {title}
      </Typography>
      {sortedFeatures.map((feature, index) => (
        <Box key={index} sx={{ mb: 2 }} key={233396}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }} key={792765}>
            <Typography color="text.secondary" variant="body2" key={497604}>
              {feature.name}
            </Typography>
            <Typography color={feature.impact  key={491100}> 0 ? 'success.main' : 'error.main'} variant="body2">
              {feature.impact > 0 ? '+' : ''}
              {feature.impact.toFixed(3)}
            </Typography>
          </Box>
          <LinearProgress;
            color={feature.impact  key={66956}> 0 ? 'success' : 'error'}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'action.hover',
              '& .MuiLinearProgress-bar': {
                transform: feature.impact < 0 ? 'scaleX(-1)' : 'none',
              },
            }}
            value={(Math.abs(feature.impact) / maxImpact) * 100}
            variant="determinate"
          />
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(ShapVisualization);
