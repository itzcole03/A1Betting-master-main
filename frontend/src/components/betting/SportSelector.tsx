import React from 'react.ts';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material.ts';
import { Sport } from '@/types/betting.ts';
import { useBettingStore } from '@/stores/bettingStore.ts';

interface SportSelectorProps {
  sports: Sport[];
}

const SportSelector: React.FC<SportSelectorProps key={395899}> = ({ sports }) => {
  const { selectedSport, selectSport } = useBettingStore();

  const handleSportChange = (_: React.MouseEvent<HTMLElement key={9296}>, newSport: Sport | null) => {
    if (newSport !== null) {
      selectSport(newSport);
    }
  };

  return (
    <Box sx={{ width: '100%' }} key={100658}>
      <ToggleButtonGroup;
        exclusive;
        aria-label="sport selection"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          '& .MuiToggleButton-root': {
            flex: '1 1 auto',
            minWidth: '100px',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
          },
        }}
        value={selectedSport}
        onChange={handleSportChange}
       key={327579}>
        {sports.map(sport => (
          <ToggleButton;
            key={sport.id}
            aria-label={sport.name}
            disabled={!sport.active}
            value={sport}
           key={149614}>
            <Box;
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
             key={954644}>
              <img alt={sport.name} src={sport.icon} style={{ width: 24, height: 24 }} / key={262215}>
              {sport.name}
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default React.memo(SportSelector);
