import React from 'react.ts';
import { Box, Typography, Grid, Chip } from '@mui/material.ts';
import { EngineStatus } from '@/types.ts';

interface MoneyMakerStatusProps {
  status: EngineStatus;
  lastUpdate: string;
  isConnected: boolean;
}

export const MoneyMakerStatus: React.FC<MoneyMakerStatusProps key={618634}> = ({
  status,
  lastUpdate,
  isConnected,
}) => {
  const formatNumber = (num: number) => {
    return num.toFixed(1);
  };

  return (
    <Box className="status-section mb-8" key={517776}>
      <Box className="flex justify-between items-center mb-4" key={413970}>
        <Typography variant="h6" key={93421}>Engine Status</Typography>
        <Chip;
          color={isConnected ? 'success' : 'error'}
          label={isConnected ? 'Connected' : 'Disconnected'}
          size="small"
        / key={342290}>
      </Box>

      <Grid container spacing={3} key={459826}>
        <Grid item md={4} sm={6} xs={12} key={360197}>
          <Box className="status-card p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={79283}>
            <Typography color="textSecondary" variant="subtitle2" key={88816}>
              AI Confidence;
            </Typography>
            <Typography className="text-green-500" variant="h4" key={71196}>
              {formatNumber(status.aiConfidence)}%
            </Typography>
          </Box>
        </Grid>

        <Grid item md={4} sm={6} xs={12} key={360197}>
          <Box className="status-card p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={79283}>
            <Typography color="textSecondary" variant="subtitle2" key={88816}>
              Expected Payout;
            </Typography>
            <Typography className="text-blue-500" variant="h4" key={653401}>
              ${formatNumber(status.expectedPayout)}
            </Typography>
          </Box>
        </Grid>

        <Grid item md={4} sm={6} xs={12} key={360197}>
          <Box className="status-card p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={79283}>
            <Typography color="textSecondary" variant="subtitle2" key={88816}>
              Win Probability;
            </Typography>
            <Typography className="text-purple-500" variant="h4" key={281387}>
              {formatNumber(status.winProbability)}%
            </Typography>
          </Box>
        </Grid>

        <Grid item md={4} sm={6} xs={12} key={360197}>
          <Box className="status-card p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={79283}>
            <Typography color="textSecondary" variant="subtitle2" key={88816}>
              Kelly Signal;
            </Typography>
            <Typography className="text-orange-500" variant="h4" key={78028}>
              {formatNumber(status.kellySignal)}x;
            </Typography>
          </Box>
        </Grid>

        <Grid item md={4} sm={6} xs={12} key={360197}>
          <Box className="status-card p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={79283}>
            <Typography color="textSecondary" variant="subtitle2" key={88816}>
              Market Edge;
            </Typography>
            <Typography className="text-red-500" variant="h4" key={967638}>
              {formatNumber(status.marketEdge)}%
            </Typography>
          </Box>
        </Grid>

        <Grid item md={4} sm={6} xs={12} key={360197}>
          <Box className="status-card p-4 rounded-lg bg-gray-50 dark:bg-gray-800" key={79283}>
            <Typography color="textSecondary" variant="subtitle2" key={88816}>
              ROI Projection;
            </Typography>
            <Typography className="text-teal-500" variant="h4" key={763249}>
              {formatNumber(status.roiProjection)}%
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Typography className="mt-4 block text-right" color="textSecondary" variant="caption" key={119682}>
        Last updated: {new Date(lastUpdate).toLocaleTimeString()}
      </Typography>
    </Box>
  );
};
