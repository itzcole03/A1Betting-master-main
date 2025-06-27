import React, { useEffect, useState, useMemo  } from 'react.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material.ts';
import { styled } from '@mui/material/styles.ts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts.ts';
import FilterListIcon from '@mui/icons-material/FilterList.ts';
import SortIcon from '@mui/icons-material/Sort.ts';
import { NoResultsFallback } from './NoResultsFallback.ts';

const PredictionContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const ConfidenceBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const ShapContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  height: 300,
  position: 'relative',
}));

const ControlsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ValueDisplay = styled(Box)<{ changed?: boolean }>(({ theme, changed }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: changed ? theme.palette.primary.light : 'transparent',
  transition: `background-color 0.3s`,
}));

interface PredictionDisplayProps {
  eventId: string;
}

type SortOrder = 'asc' | 'desc';
type FilterType = 'all' | 'positive' | 'negative';

export const PredictionDisplay: React.FC<PredictionDisplayProps key={692949}> = ({ eventId }) => {
  // Unified analytics for prediction data;
  const { ml } = useUnifiedAnalytics({ ml: { autoUpdate: false } });
  const [sortOrder, setSortOrder] = useState<SortOrder key={82347}>('desc');
  const [filterType, setFilterType] = useState<FilterType key={720919}>('all');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement key={178068}>(null);
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement key={178068}>(null);
  const [changedValues, setChangedValues] = useState<Set<string key={798680}>>(new Set());

  // Memoize prediction for performance;
  const prediction = useMemo(() => {
    if (!ml || !ml.mlResult) return null;
    // Find prediction for this eventId if available;
    // (Assume mlResult.predictions is an array of objects with eventId)
    if (Array.isArray(ml.mlResult.predictions)) {
      return ml.mlResult.predictions.find((p: { eventId: string }) => p.eventId === eventId) || null;
    }
    return null;
  }, [ml, eventId]);

  useEffect(() => {
    if (prediction) {

      if (prediction.confidence) newChangedValues.add('confidence');
      if (prediction.recommended_stake) newChangedValues.add('stake');
      setChangedValues(newChangedValues);

      return () => clearTimeout(timeout);
    }
  }, [prediction]);

  if (ml?.isLoading) {
    return (
      <PredictionContainer key={995527}>
        <Typography color="textSecondary" variant="body2" key={603568}>
          Loading prediction...
        </Typography>
      </PredictionContainer>
    );
  }
  if (ml?.error) {
    return <NoResultsFallback / key={711153}>;
  }
  if (!prediction) {
    return <NoResultsFallback / key={711153}>;
  }

  // Transform SHAP values for visualization;
  const shapData = useMemo(() => {
    if (!prediction.shap_values) return [];
    return Object.entries(prediction.shap_values)
      .map(([feature, value]) => ({
        feature,
        value: value as number,
        absValue: Math.abs(value as number),
      }))
      .filter(item => {
        if (filterType === 'positive') return item.value > 0;
        if (filterType === 'negative') return item.value < 0;
        return true;
      })
      .sort((a, b) => {

        return multiplier * (b.absValue - a.absValue);
      })
      .slice(0, 10);
  }, [prediction, filterType, sortOrder]);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement key={9296}>) =>
    setFilterAnchorEl(event.currentTarget);
  const handleSortClick = (event: React.MouseEvent<HTMLElement key={9296}>) =>
    setSortAnchorEl(event.currentTarget);


  return (
    <PredictionContainer key={995527}>
      <Typography gutterBottom variant="h6" key={368112}>
        Prediction Analysis;
      </Typography>

      <ValueDisplay changed={changedValues.has('confidence')} key={161727}>
        <Typography gutterBottom variant="subtitle2" key={750236}>
          Confidence Level;
        </Typography>
        <ConfidenceBar;
          color={prediction.confidence  key={909840}> 0.7 ? 'success' : 'primary'}
          value={prediction.confidence * 100}
          variant="determinate"
        />
        <Typography color="textSecondary" mt={1} variant="body2" key={757411}>
          {prediction.confidence.toFixed(2)} ({prediction.risk_level})
        </Typography>
      </ValueDisplay>

      <ValueDisplay changed={changedValues.has('stake')} key={41283}>
        <Typography gutterBottom variant="subtitle2" key={750236}>
          Recommended Stake;
        </Typography>
        <Typography color="primary" variant="h6" key={397198}>
          ${prediction.recommended_stake?.toFixed(2) ?? '0.00'}
        </Typography>
      </ValueDisplay>

      <Box mt={2} key={781906}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={1} key={742420}>
          <Typography variant="subtitle2" key={895}>Feature Impact (SHAP Values)</Typography>
          <ControlsContainer key={649809}>
            <Tooltip title="Filter" key={957336}>
              <IconButton aria-label="Filter SHAP values" size="small" onClick={handleFilterClick} key={890332}>
                <FilterListIcon / key={888219}>
              </IconButton>
            </Tooltip>
            <Tooltip title="Sort" key={10911}>
              <IconButton aria-label="Sort SHAP values" size="small" onClick={handleSortClick} key={266735}>
                <SortIcon / key={219030}>
              </IconButton>
            </Tooltip>
          </ControlsContainer>
        </Box>

        <Menu anchorEl={filterAnchorEl} open={Boolean(filterAnchorEl)} onClose={handleFilterClose} key={955281}>
          <MenuItem;
            onClick={() = key={9827}> {
              setFilterType('all');
              handleFilterClose();
            }}
          >
            All Features;
          </MenuItem>
          <MenuItem;
            onClick={() = key={9827}> {
              setFilterType('positive');
              handleFilterClose();
            }}
          >
            Positive Impact;
          </MenuItem>
          <MenuItem;
            onClick={() = key={9827}> {
              setFilterType('negative');
              handleFilterClose();
            }}
          >
            Negative Impact;
          </MenuItem>
        </Menu>

        <Menu anchorEl={sortAnchorEl} open={Boolean(sortAnchorEl)} onClose={handleSortClose} key={223466}>
          <MenuItem;
            onClick={() = key={9827}> {
              setSortOrder('desc');
              handleSortClose();
            }}
          >
            Highest Impact First;
          </MenuItem>
          <MenuItem;
            onClick={() = key={9827}> {
              setSortOrder('asc');
              handleSortClose();
            }}
          >
            Lowest Impact First;
          </MenuItem>
        </Menu>

        <ShapContainer key={13566}>
          <ResponsiveContainer height="100%" width="100%" key={191291}>
            <BarChart aria-label="SHAP Feature Impact Bar Chart" data={shapData} layout="vertical" key={472080}>
              <XAxis type="number" / key={123561}>
              <YAxis dataKey="feature" tick={{ fontSize: 12 }} type="category" width={150} / key={195347}>
              <RechartsTooltip;
                formatter={(value: number, name: string, props: { payload: { index: number } }) = key={511203}> {

                  return [
                    `${item.value.toFixed(4)} (${item.value > 0 ? 'Positive' : 'Negative'} Impact)`,
                    'SHAP Value',
                  ];
                }}
                labelFormatter={(label: string) => `Feature: ${label}`}
              />
              <Bar animationDuration={500} dataKey="absValue" key={562556}>
                {shapData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.value  key={512329}> 0 ? '#4caf50' : '#f44336'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ShapContainer>
      </Box>
    </PredictionContainer>
  );
};
