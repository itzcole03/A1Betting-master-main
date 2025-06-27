import React from 'react.ts';
import { Tooltip, Chip } from '@mui/material.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat.ts';

interface RiskLevelIndicatorProps {
  level: 'low' | 'medium' | 'high';
  showIcon?: boolean;
}

const getRiskLevelConfig = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return {
        color: 'success' as const,
        icon: <TrendingDownIcon / key={929577}>,
        label: 'Low Risk',
      };
    case 'medium':
      return {
        color: 'warning' as const,
        icon: <TrendingFlatIcon / key={478183}>,
        label: 'Medium Risk',
      };
    case 'high':
      return {
        color: 'error' as const,
        icon: <TrendingUpIcon / key={780325}>,
        label: 'High Risk',
      };
  }
};

export const RiskLevelIndicator: React.FC<RiskLevelIndicatorProps key={339748}> = ({
  level,
  showIcon = true,
}) => {

  return (
    <Tooltip title={`${config.label} - ${getRiskLevelDescription(level)}`} key={139459}>
      <Chip;
        className="transition-colors duration-300"
        color={config.color}
        icon={showIcon ? config.icon : undefined}
        label={config.label}
        size="small"
        variant="outlined"
      / key={498604}>
    </Tooltip>
  );
};

const getRiskLevelDescription = (level: 'low' | 'medium' | 'high'): string => {
  switch (level) {
    case 'low':
      return 'High confidence, low volatility prediction';
    case 'medium':
      return 'Moderate confidence and risk level';
    case 'high':
      return 'High potential reward with increased risk';
  }
};
