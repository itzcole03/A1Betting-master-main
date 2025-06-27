import React, { useState  } from 'react.ts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  Cell,
} from 'recharts.ts';
import type {
  BarProps,
  XAxisProps,
  YAxisProps,
  TooltipProps,
  LegendProps,
  ScatterProps,
  LineProps,
} from 'recharts.ts';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Tooltip as MuiTooltip,
  IconButton,
  Chip,
  Stack,
} from '@mui/material.ts';
import InfoIcon from '@mui/icons-material/Info.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';
import {
  ShapExplanation as ShapExplanationType,
  ModelExplanation,
} from '@/core/types/prediction.ts';

interface ShapExplanationProps {
  explanation: ModelExplanation;
  className?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div;
      aria-labelledby={`shap-tab-${index}`}
      hidden={value !== index}
      id={`shap-tabpanel-${index}`}
      role="tabpanel"
      {...other}
     key={211249}>
      {value === index && <Box sx={{ p: 3 }} key={486541}>{children}</Box>}
    </div>
  );
};

export const ShapExplanation: React.FC<ShapExplanationProps key={139117}> = ({
  explanation,
  className = '',
}) => {
  const [tabValue, setTabValue] = useState(0);
  const { shapExplanation, modelName, confidence } = explanation;

  // Prepare data for different visualizations;
  const barChartData = (shapExplanation?.shapValues ?? []).map(value => ({
    feature: value.feature,
    impact: value.impact,
    direction: value.direction,
    value: value.value,
    confidence: value.confidence || 0.8,
  }));

  const scatterData = (shapExplanation?.shapValues ?? []).map(value => ({
    feature: value.feature,
    impact: value.impact,
    value: value.value,
    confidence: value.confidence || 0.8,
  }));

  const waterfallData = (shapExplanation?.shapValues ?? []).reduce(
    (acc, value, index) => {

      return [
        ...acc,
        {
          feature: value.feature,
          start: prevValue,
          end: prevValue + value.impact,
          impact: value.impact,
          confidence: value.confidence || 0.8,
        },
      ];
    },
    [] as Array<{ feature: string; start: number; end: number; impact: number; confidence: number }>
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Calculate feature impact statistics;



  const topFeatures = [...barChartData]
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
    .slice(0, 3);

  return (
    <Paper className={`p-4 ${className}`} elevation={3} key={323327}>
      <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} key={881353}>
        <Typography variant="h6" key={93421}>{modelName}</Typography>
        <Box alignItems="center" display="flex" gap={2} key={526387}>
          <Chip;
            color="success"
            icon={<TrendingUpIcon / key={493057}>}
            label={`${positiveFeatures.length} Positive Features`}
            size="small"
          />
          <Chip;
            color="error"
            icon={<TrendingDownIcon / key={278502}>}
            label={`${negativeFeatures.length} Negative Features`}
            size="small"
          />
          <Chip color="primary" label={`Total Impact: ${totalImpact.toFixed(3)}`} size="small" / key={535945}>
        </Box>
      </Box>

      <Box mb={2} key={430101}>
        <Typography gutterBottom color="textSecondary" variant="subtitle2" key={854908}>
          Top Influential Features;
        </Typography>
        <Stack direction="row" spacing={1} key={870213}>
          {topFeatures.map((feature, index) => (
            <Chip;
              key={index}
              color={feature.impact  key={609229}> 0 ? 'success' : 'error'}
              label={`${feature.feature}: ${feature.impact.toFixed(3)}`}
              size="small"
            />
          ))}
        </Stack>
      </Box>

      <Tabs centered value={tabValue} onChange={handleTabChange} key={172800}>
        <Tab label="Feature Impact" / key={242877}>
        <Tab label="Feature Dependence" / key={390595}>
        <Tab label="Waterfall" / key={987122}>
      </Tabs>

      <TabPanel index={0} value={tabValue} key={973565}>
        <Box height={400} key={951658}>
          <ResponsiveContainer height="100%" width="100%" key={191291}>
            <BarChart data={barChartData} layout="vertical" key={610633}>
              <XAxis type="number" / key={123561}>
              <YAxis dataKey="feature" tick={{ fontSize: 12 }} type="category" width={150} / key={195347}>
              <Tooltip;
                formatter={(value: number, name: string, props: any) = key={95345}> {

                  return [
                    `${item.impact.toFixed(4)} (${item.impact > 0 ? 'Positive' : 'Negative'} Impact)`,
                    'Impact',
                  ];
                }}
                labelFormatter={(label: string) => `Feature: ${label}`}
              />
              <Legend / key={913243}>
              <Bar;
                dataKey="impact"
                fill="#8884d8"
                isAnimationActive={false}
                label={{ position: 'right' }}
               key={537095}>
                {barChartData.map((entry, index) => (
                  <Cell;
                    key={`cell-${index}`}
                    fill={entry.impact  key={224238}> 0 ? '#4caf50' : '#f44336'}
                    opacity={entry.confidence}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>

      <TabPanel index={1} value={tabValue} key={685789}>
        <Box height={400} key={951658}>
          <ResponsiveContainer height="100%" width="100%" key={191291}>
            <ScatterChart key={380318}>
              <XAxis dataKey="value" name="Feature Value" / key={538458}>
              <YAxis dataKey="impact" name="Impact" / key={165390}>
              <Tooltip;
                formatter={(value: number, name: string, props: any) = key={95345}> {

                  return [
                    `${item.impact.toFixed(4)} (${item.impact > 0 ? 'Positive' : 'Negative'} Impact)`,
                    'Impact',
                  ];
                }}
                labelFormatter={(label: string) => `Feature: ${label}`}
              />
              <Legend / key={913243}>
              <Scatter data={scatterData} fill="#8884d8" isAnimationActive={false} key={955925}>
                {scatterData.map((entry, index) => (
                  <Cell;
                    key={`cell-${index}`}
                    fill={entry.impact  key={224238}> 0 ? '#4caf50' : '#f44336'}
                    opacity={entry.confidence}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>

      <TabPanel index={2} value={tabValue} key={415652}>
        <Box height={400} key={951658}>
          <ResponsiveContainer height="100%" width="100%" key={191291}>
            <LineChart data={waterfallData} key={502780}>
              <XAxis dataKey="feature" / key={690447}>
              <YAxis / key={190086}>
              <Tooltip;
                formatter={(value: number, name: string, props: any) = key={95345}> {

                  return [
                    `${item.impact.toFixed(4)} (${item.impact > 0 ? 'Positive' : 'Negative'} Impact)`,
                    'Impact',
                  ];
                }}
                labelFormatter={(label: string) => `Feature: ${label}`}
              />
              <Legend / key={913243}>
              <Line;
                dataKey="end"
                dot={{ fill: '#8884d8' }}
                isAnimationActive={false}
                stroke="#8884d8"
                type="monotone"
              / key={974474}>
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </TabPanel>
    </Paper>
  );
};
