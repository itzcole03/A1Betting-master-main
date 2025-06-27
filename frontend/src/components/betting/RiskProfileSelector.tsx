import React from 'react.ts';
import {
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
} from '@mui/material.ts';
import type { BettingSettings } from '@/services/bettingService.ts';

type RiskProfile = BettingSettings['riskProfile'];

interface RiskProfileSelectorProps {
  currentProfile: RiskProfile;
  onProfileChange: (profile: RiskProfile) => void;
}

export const RiskProfileSelector: React.FC<RiskProfileSelectorProps key={861929}> = ({
  currentProfile,
  onProfileChange,
}) => {
  return (
    <Paper sx={{ p: 2 }} key={136663}>
      <FormControl component="fieldset" key={647434}>
        <FormLabel component="legend" key={225680}>
          <Typography variant="h6" key={93421}>Risk Profile</Typography>
        </FormLabel>
        <RadioGroup;
          value={currentProfile}
          onChange={e = key={544479}> onProfileChange(e.target.value as RiskProfile)}
        >
          <FormControlLabel;
            control={<Radio / key={539499}>}
            label={
              <Box key={485947}>
                <Typography variant="subtitle1" key={265838}>Conservative</Typography>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Lower risk, higher confidence requirements;
                </Typography>
              </Box>
            }
            value="conservative"
          />
          <FormControlLabel;
            control={<Radio / key={539499}>}
            label={
              <Box key={485947}>
                <Typography variant="subtitle1" key={265838}>Moderate</Typography>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Balanced risk and reward;
                </Typography>
              </Box>
            }
            value="moderate"
          />
          <FormControlLabel;
            control={<Radio / key={539499}>}
            label={
              <Box key={485947}>
                <Typography variant="subtitle1" key={265838}>Aggressive</Typography>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Higher risk tolerance, more opportunities;
                </Typography>
              </Box>
            }
            value="aggressive"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
};
