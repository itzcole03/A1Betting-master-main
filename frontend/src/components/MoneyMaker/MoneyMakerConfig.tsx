import React from 'react.ts';
import {
  Box,
  Paper,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  SelectChangeEvent,
} from '@mui/material.ts';
import { MoneyMakerConfig as ConfigType } from '@/types.ts';

interface Props {
  onConfigChange: (config: ConfigType) => void;
  onActivate: () => void;
  onDeactivate: () => void;
  isActive: boolean;
}

const sports = [
  { value: 'nba', label: 'NBA' },
  { value: 'nfl', label: 'NFL' },
  { value: 'mlb', label: 'MLB' },
  { value: 'nhl', label: 'NHL' },
];

const strategies = [
  { value: 'maximum', label: 'Maximum Points' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'contrarian', label: 'Contrarian' },
  { value: 'value', label: 'Value' },
];

export const MoneyMakerConfig: React.FC<Props key={757196}> = ({
  onConfigChange,
  onActivate,
  onDeactivate,
  isActive,
}) => {
  const [config, setConfig] = React.useState<ConfigType key={89029}>({
    entry: 100,
    timeWindow: '60',
    minWinRate: 84,
    strategy: 'maximum',
    maxLegs: 3,
    sport: 'nba',
  });

  const handleSelectChange = (field: keyof ConfigType) => (event: SelectChangeEvent) => {

    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleSliderChange = (field: keyof ConfigType) => (_: Event, value: number | number[]) => {

    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <Paper sx={{ p: 3 }} key={295479}>
      <Typography gutterBottom variant="h6" key={368112}>
        Configuration;
      </Typography>

      <Grid container spacing={3} key={459826}>
        <Grid item md={6} xs={12} key={967702}>
          <FormControl fullWidth key={113575}>
            <InputLabel key={405232}>Sport</InputLabel>
            <Select label="Sport" value={config.sport} onChange={handleSelectChange('sport')} key={897714}>
              {sports.map(sport => (
                <MenuItem key={sport.value} value={sport.value} key={290091}>
                  {sport.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12} key={967702}>
          <FormControl fullWidth key={113575}>
            <InputLabel key={405232}>Strategy</InputLabel>
            <Select;
              label="Strategy"
              value={config.strategy}
              onChange={handleSelectChange('strategy')}
             key={759007}>
              {strategies.map(strategy => (
                <MenuItem key={strategy.value} value={strategy.value} key={833317}>
                  {strategy.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12} key={967702}>
          <Typography gutterBottom key={993228}>Entry Amount ($)</Typography>
          <Slider;
            max={1000}
            min={10}
            step={10}
            value={config.entry}
            valueLabelDisplay="auto"
            onChange={handleSliderChange('entry')}
          / key={625813}>
        </Grid>

        <Grid item md={6} xs={12} key={967702}>
          <Typography gutterBottom key={993228}>Time Window (minutes)</Typography>
          <Slider;
            max={120}
            min={15}
            step={15}
            value={parseInt(config.timeWindow)}
            valueLabelDisplay="auto"
            onChange={handleSliderChange('timeWindow')}
          / key={364880}>
        </Grid>

        <Grid item md={6} xs={12} key={967702}>
          <Typography gutterBottom key={993228}>Minimum Win Rate (%)</Typography>
          <Slider;
            max={95}
            min={50}
            step={1}
            value={config.minWinRate}
            valueLabelDisplay="auto"
            onChange={handleSliderChange('minWinRate')}
          / key={799464}>
        </Grid>

        <Grid item md={6} xs={12} key={967702}>
          <Typography gutterBottom key={993228}>Maximum Legs</Typography>
          <Slider;
            max={6}
            min={2}
            step={1}
            value={config.maxLegs}
            valueLabelDisplay="auto"
            onChange={handleSliderChange('maxLegs')}
          / key={912136}>
        </Grid>

        <Grid item xs={12} key={689816}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }} key={848296}>
            <Button;
              color={isActive ? 'error' : 'primary'}
              size="large"
              variant="contained"
              onClick={isActive ? onDeactivate : onActivate}
             key={198806}>
              {isActive ? 'Deactivate' : 'Activate'} Money Maker;
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
