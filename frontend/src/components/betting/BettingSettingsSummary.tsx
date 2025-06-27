import React from 'react.ts';
import { Box, Paper, Typography, Chip, Tooltip, LinearProgress } from '@mui/material.ts';
import { useBettingSettings } from '@/hooks/useBettingSettings.ts';
import { formatCurrency } from '@/utils/formatters.ts';

export const BettingSettingsSummary: React.FC = () => {
  const { settings } = useBettingSettings();

  const getRiskProfileColor = (profile: string) => {
    switch (profile) {
      case 'conservative':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'aggressive':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }} key={995156}>
      <Typography gutterBottom variant="h6" key={368112}>
        Current Settings;
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }} key={492963}>
        <Box key={485947}>
          <Typography gutterBottom color="text.secondary" variant="subtitle2" key={771402}>
            Risk Profile;
          </Typography>
          <Chip;
            color={getRiskProfileColor(settings.riskProfile)}
            label={settings.riskProfile.charAt(0).toUpperCase() + settings.riskProfile.slice(1)}
            size="small"
          / key={161146}>
        </Box>

        <Box key={485947}>
          <Typography gutterBottom color="text.secondary" variant="subtitle2" key={771402}>
            Stake Size;
          </Typography>
          <Typography variant="body1" key={627800}>{formatCurrency(settings.stakeSize)}</Typography>
          <Tooltip title="Stake range" key={438335}>
            <Typography color="text.secondary" variant="caption" key={290635}>
              Range: {formatCurrency(settings.minStake)} - {formatCurrency(settings.maxStake)}
            </Typography>
          </Tooltip>
        </Box>

        <Box sx={{ gridColumn: { xs: '1 / -1' } }} key={648123}>
          <Typography gutterBottom color="text.secondary" variant="subtitle2" key={771402}>
            Confidence Threshold;
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={109447}>
            <LinearProgress;
              sx={{ flex: 1 }}
              value={settings.confidenceThreshold * 100}
              variant="determinate"
            / key={258253}>
            <Typography variant="body2" key={679167}>
              {(settings.confidenceThreshold * 100).toFixed(0)}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ gridColumn: { xs: '1 / -1' } }} key={648123}>
          <Typography gutterBottom color="text.secondary" variant="subtitle2" key={771402}>
            Selected Model;
          </Typography>
          <Typography noWrap variant="body1" key={286700}>
            {settings.modelId || 'No model selected'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
