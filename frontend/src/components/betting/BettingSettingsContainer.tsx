import React, { useEffect  } from 'react.ts';
import { Box } from '@mui/material.ts';
import { BettingSettingsPanel } from './BettingSettingsPanel.ts';
import { BettingSettingsSummary } from './BettingSettingsSummary.ts';
import { useBettingSettings } from '@/hooks/useBettingSettings.ts';

export const BettingSettingsContainer: React.FC = () => {
  const { fetchSettings } = useBettingSettings();

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <Box sx={{ p: 3 }} key={486541}>
      <Box;
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr',
          },
          gap: 3,
        }}
       key={86819}>
        <BettingSettingsPanel / key={982092}>
        <BettingSettingsSummary / key={272268}>
      </Box>
    </Box>
  );
};
