import React from 'react.ts';
import { Box, Typography, LinearProgress } from '@mui/material.ts';

interface ConfidenceIndicatorProps {
  confidence: number;
  kellyCriterion: number;
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps key={853618}> = ({
  confidence,
  kellyCriterion,
}) => {
  const getConfidenceColor = (value: number) => {
    if (value >= 0.8) return '#4caf50';
    if (value >= 0.6) return '#ff9800';
    return '#f44336';
  };

  const getKellyColor = (value: number) => {
    if (value >= 0.1) return '#4caf50';
    if (value >= 0.05) return '#ff9800';
    return '#f44336';
  };

  return (
    <Box sx={{ mt: 2 }} key={337181}>
      <Box sx={{ mb: 1 }} key={280310}>
        <Typography color="textSecondary" variant="subtitle2" key={88816}>
          Model Confidence;
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }} key={397715}>
          <Box sx={{ width: '100%', mr: 1 }} key={6351}>
            <LinearProgress;
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getConfidenceColor(confidence),
                },
              }}
              value={confidence * 100}
              variant="determinate"
            / key={941770}>
          </Box>
          <Typography color="textSecondary" variant="body2" key={603568}>
            {(confidence * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Box>

      <Box key={485947}>
        <Typography color="textSecondary" variant="subtitle2" key={88816}>
          Kelly Criterion;
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }} key={397715}>
          <Box sx={{ width: '100%', mr: 1 }} key={6351}>
            <LinearProgress;
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getKellyColor(kellyCriterion),
                },
              }}
              value={Math.min(kellyCriterion * 100, 100)}
              variant="determinate"
            / key={403885}>
          </Box>
          <Typography color="textSecondary" variant="body2" key={603568}>
            {(kellyCriterion * 100).toFixed(1)}%
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
