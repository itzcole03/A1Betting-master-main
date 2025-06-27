import React, { useState  } from 'react.ts';
import Box from '@mui/material/Box.ts';
import Card from '@mui/material/Card.ts';
import CardContent from '@mui/material/CardContent.ts';
import Typography from '@mui/material/Typography.ts';
import Grid from '@mui/material/Grid.ts';
import IconButton from '@mui/material/IconButton.ts';
import Collapse from '@mui/material/Collapse.ts';
import Chip from '@mui/material/Chip.ts';
import LinearProgress from '@mui/material/LinearProgress.ts';
import Tooltip from '@mui/material/Tooltip.ts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.ts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';
import { FeatureImportance } from '@/types/prediction.ts';

interface FeatureImpact {
  feature: string;
  value: number;
  impact: number;
  direction: 'positive' | 'negative';
}

interface SHAPVisualizationProps {
  explanations: FeatureImpact[];
}

const SHAPVisualization = ({ explanations }: SHAPVisualizationProps) => {
  return (
    <Box display="flex" flexWrap="wrap" gap={1} key={33124}>
      {explanations.map((feat, idx) => (
        <Tooltip key={idx} title={`Impact: ${feat.impact.toFixed(2)}, Value: ${feat.value}`} key={722107}>
          <Chip;
            color={feat.direction === 'positive' ? 'success' : 'error'}
            label={`${feat.feature} (${feat.direction === 'positive' ? '+' : '−'}${feat.impact.toFixed(2)})`}
            size="small"
            variant="outlined"
          / key={90645}>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SHAPVisualization;
