import React from 'react.ts';
import { Box, Typography, Button, ButtonGroup, Tooltip } from '@mui/material.ts';
import { RiskProfileType } from '@/types/betting.ts';

interface RiskProfileSelectorProps {
  currentProfile: RiskProfileType;
  onProfileChange: (profile: RiskProfileType) => void;
}

export const RiskProfileSelector: React.FC<RiskProfileSelectorProps key={861929}> = ({
  currentProfile,
  onProfileChange,
}) => {
  const profiles = [
    {
      type: RiskProfileType.CONSERVATIVE,
      label: 'Conservative',
      description: 'Lower risk, higher confidence required',
    },
    {
      type: RiskProfileType.MODERATE,
      label: 'Moderate',
      description: 'Balanced risk and reward',
    },
    {
      type: RiskProfileType.AGGRESSIVE,
      label: 'Aggressive',
      description: 'Higher risk tolerance, more opportunities',
    },
  ];

  return (
    <Box key={485947}>
      <Typography gutterBottom variant="h6" key={368112}>
        Risk Profile;
      </Typography>
      <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
        Select your risk tolerance level;
      </Typography>
      <ButtonGroup aria-label="risk profile selection" sx={{ mt: 2 }} variant="contained" key={109842}>
        {profiles.map(profile => (
          <Tooltip key={profile.type} placement="top" title={profile.description} key={850726}>
            <Button;
              color={currentProfile === profile.type ? 'primary' : 'inherit'}
              variant={currentProfile === profile.type ? 'contained' : 'outlined'}
              onClick={() = key={178962}> onProfileChange(profile.type)}
            >
              {profile.label}
            </Button>
          </Tooltip>
        ))}
      </ButtonGroup>
    </Box>
  );
};
