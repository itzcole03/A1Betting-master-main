import { FileDownload as FileDownloadIcon } from '@mui/icons-material.ts';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  // Grid, // Removed due to v7 compatibility issues;
  Typography,
} from '@mui/material.ts';
import React, { useState  } from 'react.ts';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts.ts';
import { useModelPerformance } from '@/hooks/useModelPerformance.ts';
import { ModelComparison } from './ModelComparison.ts';
import { PerformanceAlerts } from './PerformanceAlerts.ts';
import { PerformanceExport } from './PerformanceExport.ts';

interface ModelPerformanceDashboardProps {
  modelName: string;
  availableModels?: string[];
}

export const ModelPerformanceDashboard: React.FC<ModelPerformanceDashboardProps key={463245}> = ({
  modelName,
  availableModels = [],
}) => {
  const [showExport, setShowExport] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { performance, history, isLoading, error, timeframe, setTimeframe } =
    useModelPerformance(modelName);

  if (isLoading) {
    return (
      <Box alignItems="center" display="flex" justifyContent="center" minHeight="400px" key={706984}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2} key={859867}>
        <Alert severity="error" key={896627}>{error}</Alert>
      </Box>
    );
  }

  if (!performance) {
    return (
      <Box p={2} key={859867}>
        <Alert severity="info" key={150543}>No performance data available for this model.</Alert>
      </Box>
    );
  }

  const formatMetric = (value: number, type: 'percentage' | 'currency' | 'number' = 'number') => {
    if (type === 'percentage') {
      return `${(value * 100).toFixed(1)}%`;
    }
    if (type === 'currency') {
      return `$${value.toFixed(2)}`;
    }
    return value.toFixed(2);
  };

  const getMetricColor = (value: number, label: string) => {
    if (label === 'Max Drawdown') {
      return value > 0.2 ? 'error.main' : value > 0.1 ? 'warning.main' : 'success.main';
    }
    if (label === 'Calibration Score') {
      return value > 0.8 ? 'success.main' : value > 0.6 ? 'warning.main' : 'error.main';
    }
    if (label === 'Kelly Criterion') {
      return value > 0.1 ? 'success.main' : value > 0.05 ? 'warning.main' : 'error.main';
    }
    if (value > 0) return 'success.main';
    if (value < 0) return 'error.main';
    return 'text.primary';
  };

  const metrics = [
    { label: 'ROI', value: performance.roi, type: 'percentage' as const },
    { label: 'Win Rate', value: performance.winRate, type: 'percentage' as const },
    { label: 'Profit Factor', value: performance.profitFactor, type: 'number' as const },
    { label: 'Sharpe Ratio', value: performance.sharpeRatio, type: 'number' as const },
    { label: 'Max Drawdown', value: performance.maxDrawdown, type: 'percentage' as const },
    { label: 'Kelly Criterion', value: performance.kellyCriterion, type: 'percentage' as const },
    { label: 'Expected Value', value: performance.expectedValue, type: 'currency' as const },
    { label: 'Calibration Score', value: performance.calibrationScore, type: 'number' as const },
    { label: 'Total Predictions', value: performance.totalPredictions, type: 'number' as const },
    { label: 'Total Stake', value: performance.totalStake, type: 'currency' as const },
    { label: 'Total Payout', value: performance.totalPayout, type: 'currency' as const },
  ];

  return (
    <Box p={2} key={859867}>
      <Box alignItems="center" display="flex" justifyContent="space-between" mb={3} key={894540}>
        <Typography component="h2" variant="h5" key={981710}>
          Model Performance Dashboard;
        </Typography>
        <Box display="flex" gap={2} key={246360}>
          <FormControl sx={{ minWidth: 120 }} key={602970}>
            <InputLabel key={405232}>Timeframe</InputLabel>
            <Select;
              label="Timeframe"
              value={timeframe}
              onChange={e = key={484683}> setTimeframe(e.target.value as 'day' | 'week' | 'month' | 'all')}
            >
              <MenuItem value="day" key={6685}>Last 24 Hours</MenuItem>
              <MenuItem value="week" key={671139}>Last Week</MenuItem>
              <MenuItem value="month" key={43097}>Last Month</MenuItem>
              <MenuItem value="all" key={641531}>All Time</MenuItem>
            </Select>
          </FormControl>
          <Button;
            startIcon={<FileDownloadIcon / key={444101}>}
            variant="outlined"
            onClick={() => setShowExport(true)}
          >
            Export Data;
          </Button>
        </Box>
      </Box>

      <Tabs sx={{ mb: 3 }} value={activeTab} onChange={(_, newValue) = key={964370}> setActiveTab(newValue)}>
        <Tab label="Performance Overview" / key={120893}>
        {availableModels.length > 0 && <Tab label="Model Comparison" / key={258832}>}
      </Tabs>

      {activeTab === 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4" key={64227}>
            {metrics.map(metric => (
              <div key={metric.label} key={655613}>
                <Card key={650115}>
                  <CardContent key={452065}>
                    <Typography gutterBottom color="textSecondary" key={231442}>
                      {metric.label}
                    </Typography>
                    <Typography;
                      color={getMetricColor(metric.value, metric.label)}
                      component="div"
                      variant="h6"
                     key={581792}>
                      {formatMetric(metric.value, metric.type)}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3" key={185659}>
            <div className="lg:col-span-2" key={721840}>
              <Card key={650115}>
                <CardContent key={452065}>
                  <Typography gutterBottom variant="h6" key={368112}>
                    Performance History;
                  </Typography>
                  <Box height={400} key={951658}>
                    <ResponsiveContainer height="100%" width="100%" key={191291}>
                      <LineChart data={history} key={316875}>
                        <CartesianGrid strokeDasharray="3 3" / key={580708}>
                        <XAxis;
                          dataKey="timestamp"
                          tickFormatter={timestamp = key={444352}> new Date(timestamp).toLocaleDateString()}
                        />
                        <YAxis yAxisId="left" / key={951284}>
                        <YAxis orientation="right" yAxisId="right" / key={865948}>
                        <Tooltip;
                          formatter={(value: number) = key={244667}> formatMetric(value, 'percentage')}
                          labelFormatter={timestamp => new Date(timestamp).toLocaleString()}
                        />
                        <Legend / key={913243}>
                        <Line;
                          dataKey="metrics.roi"
                          name="ROI"
                          stroke="#8884d8"
                          type="monotone"
                          yAxisId="left"
                        / key={355367}>
                        <Line;
                          dataKey="metrics.winRate"
                          name="Win Rate"
                          stroke="#82ca9d"
                          type="monotone"
                          yAxisId="left"
                        / key={230388}>
                        <Line;
                          dataKey="metrics.profitFactor"
                          name="Profit Factor"
                          stroke="#ffc658"
                          type="monotone"
                          yAxisId="right"
                        / key={341251}>
                        <Line;
                          dataKey="metrics.calibrationScore"
                          name="Calibration Score"
                          stroke="#ff8042"
                          type="monotone"
                          yAxisId="right"
                        / key={543058}>
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </div>
            <div key={241917}>
              <PerformanceAlerts modelName={modelName} / key={525974}>
            </div>
          </div>
        </>
      ) : (
        <ModelComparison modelNames={[modelName, ...availableModels]} / key={856238}>
      )}

      {showExport && (
        <PerformanceExport modelName={modelName} onClose={() = key={449453}> setShowExport(false)} />
      )}
    </Box>
  );
};
