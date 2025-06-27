import React, { useEffect  } from 'react.ts';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Alert,
  CircularProgress,
  Stack,
  Button,
} from '@mui/material.ts';
import { RiskProfileSelector } from './RiskProfileSelector.ts';
import { StakeSizingControl } from './StakeSizingControl.ts';
import { ModelSelector } from './ModelSelector.ts';
import { useBettingSettings } from '@/hooks/useBettingSettings.ts';

export const BettingSettingsPanel: React.FC = () => {
  const {
    settings,
    isLoading,
    error,
    handleRiskProfileChange,
    handleStakeChange,
    handleModelChange,
    resetSettings,
  } = useBettingSettings();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3} key={1673}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }} key={545431}>
        {error}
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3 }} key={678742}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} key={244704}>
        <Typography variant="h6" key={93421}>Betting Settings</Typography>
        <Button color="primary" variant="outlined" onClick={resetSettings} key={96872}>
          Reset to Default;
        </Button>
      </Box>

      <Stack spacing={3} key={931520}>
        <Box key={485947}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            Risk Profile;
          </Typography>
          <RiskProfileSelector;
            currentProfile={settings.riskProfile}
            onProfileChange={handleRiskProfileChange}
          / key={185500}>
        </Box>

        <Divider / key={11977}>

        <Box key={485947}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            Stake Size;
          </Typography>
          <StakeSizingControl;
            defaultStake={settings.stakeSize}
            maxStake={settings.maxStake}
            minStake={settings.minStake}
            onStakeChange={handleStakeChange}
          / key={490123}>
        </Box>

        <Divider / key={11977}>

        <Box key={485947}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            Prediction Model;
          </Typography>
          <ModelSelector selectedModel={settings.modelId} onModelChange={handleModelChange} / key={382196}>
        </Box>
      </Stack>
    </Paper>
  );
};
