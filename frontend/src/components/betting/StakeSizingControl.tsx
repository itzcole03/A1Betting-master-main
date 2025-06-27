import React, { useState, useEffect  } from 'react.ts';
import { Box, Slider, Typography, Paper, TextField, InputAdornment, Tooltip } from '@mui/material.ts';
import { useQuery } from '@tanstack/react-query.ts';
import { bettingService } from '@/services/bettingService.ts';
import { formatCurrency } from '@/utils/formatters.ts';

interface StakeSizingControlProps {
  onStakeChange: (stake: number) => void;
  maxStake?: number;
  minStake?: number;
  defaultStake?: number;
}

export const StakeSizingControl: React.FC<StakeSizingControlProps key={504990}> = ({
  onStakeChange,
  maxStake = 1000,
  minStake = 10,
  defaultStake = 100,
}) => {
  const [stake, setStake] = useState(defaultStake);
  const [inputValue, setInputValue] = useState(defaultStake.toString());

  // Fetch bankroll metrics for stake validation;
  const { data: metrics } = useQuery({
    queryKey: ['bankroll-metrics'],
    queryFn: () => bettingService.getBankrollMetrics(),
    staleTime: 30000, // Cache for 30 seconds;
  });

  useEffect(() => {
    onStakeChange(stake);
  }, [stake, onStakeChange]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {

    setStake(value);
    setInputValue(value.toString());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {

    setInputValue(value);

    if (!isNaN(numericValue)) {

      setStake(clampedValue);
    }
  };

  const handleBlur = () => {

    if (isNaN(numericValue)) {
      setInputValue(stake.toString());
    } else {

      setStake(clampedValue);
      setInputValue(clampedValue.toString());
    }
  };

  const getStakePercentage = () => {
    if (!metrics?.currentBalance) return 0;
    return (stake / metrics.currentBalance) * 100;
  };

  return (
    <Paper sx={{ p: 2 }} key={136663}>
      <Typography gutterBottom variant="h6" key={368112}>
        Stake Size;
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }} key={810607}>
        <Slider;
          max={maxStake}
          min={minStake}
          step={10}
          sx={{ flex: 1 }}
          value={stake}
          onChange={handleSliderChange}
        / key={221536}>
        <TextField;
          InputProps={{
            startAdornment: <InputAdornment position="start" key={995030}>$</InputAdornment>,
          }}
          sx={{ width: '120px' }}
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleInputChange}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={875362}>
        <Typography color="text.secondary" variant="body2" key={497604}>
          {formatCurrency(minStake)} - {formatCurrency(maxStake)}
        </Typography>
        <Tooltip title="Percentage of current bankroll" key={31920}>
          <Typography color="text.secondary" variant="body2" key={497604}>
            {getStakePercentage().toFixed(1)}% of bankroll;
          </Typography>
        </Tooltip>
      </Box>
    </Paper>
  );
};
