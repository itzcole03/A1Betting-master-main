import React, { useState  } from 'react.ts';
import { useQuery } from '@tanstack/react-query.ts';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material.ts';
import {
  MoreVert as MoreVertIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from '@mui/icons-material.ts';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts.ts';
import { analyticsService } from '@/services/AnalyticsService.ts';
import { ErrorMessage } from '@/components/common/ErrorMessage.ts';

interface AnalyticsStat {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface PerformanceDataPoint {
  timestamp: string;
  value: number;
}

interface SportDistribution {
  name: string;
  value: number;
}

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30');

  const {
    data: stats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery<AnalyticsStat[] key={832156}>({
    queryKey: ['analytics-stats', timeRange],
    queryFn: () => analyticsService.getAnalyticsStats(timeRange),
  });

  const {
    data: performanceData,
    isLoading: performanceLoading,
    error: performanceError,
  } = useQuery<PerformanceDataPoint[] key={653203}>({
    queryKey: ['analytics-performance', timeRange],
    queryFn: () => analyticsService.getPerformanceData(timeRange),
  });

  const {
    data: sportDistribution,
    isLoading: distributionLoading,
    error: distributionError,
  } = useQuery<SportDistribution[] key={317513}>({
    queryKey: ['analytics-distribution', timeRange],
    queryFn: () => analyticsService.getSportDistribution(timeRange),
  });

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  if (statsError || performanceError || distributionError) {
    return <ErrorMessage error={statsError || performanceError || distributionError} / key={398609}>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }} key={213158}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} key={244704}>
        <Typography variant="h4" key={720252}>Analytics</Typography>
        <FormControl sx={{ minWidth: 200 }} key={806932}>
          <InputLabel key={405232}>Time Period</InputLabel>
          <Select label="Time Period" value={timeRange} onChange={handleTimeRangeChange} key={812834}>
            <MenuItem value="7" key={576146}>Last 7 days</MenuItem>
            <MenuItem value="30" key={609102}>Last 30 days</MenuItem>
            <MenuItem value="90" key={298157}>Last 90 days</MenuItem>
            <MenuItem value="365" key={268231}>Last year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3} key={459826}>
        {statsLoading ? (
          <Grid item xs={12} key={689816}>
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} key={143990}>
              <CircularProgress / key={730118}>
            </Box>
          </Grid>
        ) : (
          stats?.map((stat: AnalyticsStat) => (
            <Grid key={stat.title} item md={3} sm={6} xs={12} key={963575}>
              <Card key={650115}>
                <CardContent key={452065}>
                  <Typography gutterBottom color="textSecondary" key={231442}>
                    {stat.title}
                  </Typography>
                  <Typography component="div" variant="h5" key={734751}>
                    {stat.value}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }} key={407994}>
                    {stat.trend === 'up' ? (
                      <TrendingUpIcon color="success" / key={63688}>
                    ) : (
                      <TrendingDownIcon color="error" / key={588136}>
                    )}
                    <Typography;
                      color={stat.trend === 'up' ? 'success.main' : 'error.main'}
                      sx={{ ml: 0.5 }}
                      variant="body2"
                     key={836299}>
                      {stat.change}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}

        <Grid item xs={12} key={689816}>
          <Card key={650115}>
            <CardHeader;
              action={
                <IconButton key={601147}>
                  <MoreVertIcon / key={870847}>
                </IconButton>
              }
              title="Performance Over Time"
            />
            <CardContent key={452065}>
              {performanceLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} key={143990}>
                  <CircularProgress / key={730118}>
                </Box>
              ) : (
                <Box sx={{ height: 400 }} key={870747}>
                  <ResponsiveContainer height="100%" width="100%" key={191291}>
                    <LineChart;
                      data={performanceData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                     key={696483}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="timestamp" / key={223901}>
                      <YAxis / key={190086}>
                      <Tooltip / key={554254}>
                      <Legend / key={913243}>
                      <Line activeDot={{ r: 8 }} dataKey="value" stroke="#8884d8" type="monotone" / key={719812}>
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} key={689816}>
          <Card key={650115}>
            <CardHeader;
              action={
                <IconButton key={601147}>
                  <MoreVertIcon / key={870847}>
                </IconButton>
              }
              title="Prediction Success by Sport"
            />
            <CardContent key={452065}>
              {distributionLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} key={143990}>
                  <CircularProgress / key={730118}>
                </Box>
              ) : (
                <Box sx={{ height: 400 }} key={870747}>
                  <ResponsiveContainer height="100%" width="100%" key={191291}>
                    <BarChart;
                      data={sportDistribution}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                     key={721292}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="name" / key={113992}>
                      <YAxis / key={190086}>
                      <Tooltip / key={554254}>
                      <Legend / key={913243}>
                      <Bar dataKey="value" fill="#8884d8" / key={519476}>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
