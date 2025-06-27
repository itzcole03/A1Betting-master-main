import {
  Analytics,
  Assessment,
  Download,
  EmojiEvents,
  Insights,
  PieChart,
  PrecisionManufacturing,
  Psychology,
  Refresh,
  ShowChart,
  Timeline,
  TrendingDown,
  TrendingUp,
  Warning;
} from '@mui/icons-material.ts';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tooltip,
  Typography;
} from '@mui/material.ts';
import { motion } from 'framer-motion.ts';
import React, { useCallback, useEffect, useMemo, useState  } from 'react.ts';
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis;
} from 'recharts.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';
import {
  formatCurrency,
  formatPercentage;
} from '@/utils/formatters.ts';

interface PerformanceMetrics {
  totalBets: number;
  winRate: number;
  roi: number;
  profitLoss: number;
  avgOdds: number;
  avgStake: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winStreak: number;
  lossStreak: number;
  profitFactor: number;
  kellyOptimal: number;
  consistencyScore: number;
  riskAdjustedReturn: number;
  confidenceAccuracy: number;
  modelAccuracy: number;
}

interface PredictionPerformance {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  calibration: number;
  coverage: number;
  totalPredictions: number;
  profitContribution: number;
  avgConfidence: number;
  riskAdjustedScore: number;
}

interface TimeSeriesData {
  timestamp: string;
  cumulativeProfit: number;
  winRate: number;
  roi: number;
  confidence: number;
  volume: number;
  drawdown: number;
}

interface CategoryPerformance {
  category: string;
  bets: number;
  winRate: number;
  roi: number;
  profit: number;
  avgOdds: number;
  riskLevel: "low" | "medium" | "high";
}

interface PerformanceAnalyticsDashboardProps {
  userId?: string;
  timeRange?: "7d" | "30d" | "90d" | "1y" | "all";
  showAdvancedMetrics?: boolean;
}

const COLORS = {
  primary: "#1976d2",
  secondary: "#dc004e",
  success: "#2e7d32",
  warning: "#ed6c02",
  error: "#d32f2f",
  info: "#0288d1",
};

const PIE_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82ca9d",
];

export const PerformanceAnalyticsDashboard: React.FC<
  PerformanceAnalyticsDashboardProps;
> = ({ userId = "default", timeRange = "30d", showAdvancedMetrics = true }) => {
  // State Management;
  const [activeTab, setActiveTab] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [selectedCategory, setSelectedCategory] = useState<string key={278855}>("all");
  const [showComparison, setShowComparison] = useState(false);
  const [benchmarkData, setBenchmarkData] = useState<any key={295429}>(null);

  // Performance Data State;
  const [metrics, setMetrics] = useState<PerformanceMetrics | null key={797932}>(null);
  const [predictions, setPredictions] = useState<PredictionPerformance[] key={182390}>([]);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[] key={903363}>([]);
  const [categoryPerformance, setCategoryPerformance] = useState<
    CategoryPerformance[]
  >([]);

  // UI State;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [lastUpdate, setLastUpdate] = useState<Date key={141202}>(new Date());

  // Analytics Hook;
  const { performance, ml, betting } = useUnifiedAnalytics({
    performance: true,
    ml: {
      autoUpdate: true,
      updateInterval: 60000;
    },
    betting: true,
  });

  // Load Performance Data;
  const loadPerformanceData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate loading performance data;
      const mockMetrics: PerformanceMetrics = {
        totalBets: 1247,
        winRate: 0.624,
        roi: 0.142,
        profitLoss: 8432.5,
        avgOdds: 2.15,
        avgStake: 125.0,
        sharpeRatio: 1.73,
        maxDrawdown: -0.085,
        winStreak: 12,
        lossStreak: 5,
        profitFactor: 1.89,
        kellyOptimal: 0.08,
        consistencyScore: 0.78,
        riskAdjustedReturn: 0.196,
        confidenceAccuracy: 0.856,
        modelAccuracy: 0.681,
      };

      const mockPredictions: PredictionPerformance[] = [
        {
          modelName: "Ensemble ML",
          accuracy: 0.725,
          precision: 0.698,
          recall: 0.742,
          f1Score: 0.719,
          calibration: 0.891,
          coverage: 0.856,
          totalPredictions: 456,
          profitContribution: 3247.8,
          avgConfidence: 0.724,
          riskAdjustedScore: 0.832,
        },
        {
          modelName: "Deep Learning",
          accuracy: 0.689,
          precision: 0.672,
          recall: 0.698,
          f1Score: 0.685,
          calibration: 0.823,
          coverage: 0.779,
          totalPredictions: 389,
          profitContribution: 2156.4,
          avgConfidence: 0.689,
          riskAdjustedScore: 0.756,
        },
        {
          modelName: "Random Forest",
          accuracy: 0.651,
          precision: 0.634,
          recall: 0.669,
          f1Score: 0.651,
          calibration: 0.778,
          coverage: 0.712,
          totalPredictions: 402,
          profitContribution: 1843.3,
          avgConfidence: 0.651,
          riskAdjustedScore: 0.698,
        },
      ];

      // Generate time series data;
      const mockTimeSeriesData: TimeSeriesData[] = [];

      startDate.setDate(
        startDate.getDate() - parseInt(selectedTimeRange.replace(/\D/g, "")) ||
        30,
      );

      const cumulativeProfit = 0;
      for (const i = 0; i < 30; i++) {

        date.setDate(date.getDate() + i);

        const dailyReturn = (Math.random() - 0.45) * 200; // Slight positive bias;
        cumulativeProfit += dailyReturn;

        mockTimeSeriesData.push({
          timestamp: date.toISOString().split("T")[0],
          cumulativeProfit,
          winRate: 0.55 + (Math.random() - 0.5) * 0.2,
          roi: 0.12 + (Math.random() - 0.5) * 0.1,
          confidence: 0.7 + (Math.random() - 0.5) * 0.3,
          volume: Math.floor(Math.random() * 50) + 20,
          drawdown: Math.min(
            0,
            cumulativeProfit -
            Math.max(...mockTimeSeriesData.map((d) => d.cumulativeProfit), 0),
          ),
        });
      }

      const mockCategoryPerformance: CategoryPerformance[] = [
        {
          category: "NBA Points",
          bets: 234,
          winRate: 0.647,
          roi: 0.178,
          profit: 2341.5,
          avgOdds: 1.95,
          riskLevel: "medium",
        },
        {
          category: "NFL Spreads",
          bets: 187,
          winRate: 0.598,
          roi: 0.142,
          profit: 1876.2,
          avgOdds: 1.91,
          riskLevel: "high",
        },
        {
          category: "MLB Over/Under",
          bets: 156,
          winRate: 0.673,
          roi: 0.203,
          profit: 1987.4,
          avgOdds: 2.08,
          riskLevel: "low",
        },
        {
          category: "Soccer Goals",
          bets: 98,
          winRate: 0.612,
          roi: 0.089,
          profit: 789.6,
          avgOdds: 2.45,
          riskLevel: "high",
        },
      ];

      setMetrics(mockMetrics);
      setPredictions(mockPredictions);
      setTimeSeriesData(mockTimeSeriesData);
      setCategoryPerformance(mockCategoryPerformance);
      setLastUpdate(new Date());
    } catch (err) {
      setError("Failed to load performance data");
      // console statement removed
    } finally {
      setIsLoading(false);
    }
  }, [selectedTimeRange, userId]);

  // Load data on mount and when dependencies change;
  useEffect(() => {
    loadPerformanceData();
  }, [loadPerformanceData]);

  // Computed Values;
  const filteredCategoryData = useMemo(() => {
    if (selectedCategory === "all") return categoryPerformance;
    return categoryPerformance.filter(
      (cat) => cat.category === selectedCategory,
    );
  }, [categoryPerformance, selectedCategory]);

  const performanceGrade = useMemo(() => {
    if (!metrics) return "N/A";

    const score =
      (metrics.winRate > 0.6 ? 20 : metrics.winRate * 33.33) +
      (metrics.roi > 0.15 ? 20 : metrics.roi * 133.33) +
      (metrics.sharpeRatio > 1.5 ? 20 : metrics.sharpeRatio * 13.33) +
      metrics.consistencyScore * 20 +
      (metrics.riskAdjustedReturn > 0.15;
        ? 20;
        : metrics.riskAdjustedReturn * 133.33);

    if (score >= 85) return "A+";
    if (score >= 80) return "A";
    if (score >= 75) return "B+";
    if (score >= 70) return "B";
    if (score >= 65) return "C+";
    if (score >= 60) return "C";
    return "D";
  }, [metrics]);

  const radarChartData = useMemo(() => {
    if (!metrics) return [];

    return [
      {
        metric: "Win Rate",
        value: metrics.winRate * 100,
        fullMark: 100,
      },
      {
        metric: "ROI",
        value: Math.min(metrics.roi * 500, 100), // Scale to 100;
        fullMark: 100,
      },
      {
        metric: "Sharpe Ratio",
        value: Math.min(metrics.sharpeRatio * 33.33, 100),
        fullMark: 100,
      },
      {
        metric: "Consistency",
        value: metrics.consistencyScore * 100,
        fullMark: 100,
      },
      {
        metric: "Confidence Accuracy",
        value: metrics.confidenceAccuracy * 100,
        fullMark: 100,
      },
      {
        metric: "Model Accuracy",
        value: metrics.modelAccuracy * 100,
        fullMark: 100,
      },
    ];
  }, [metrics]);

  // Export Function;
  const exportPerformanceReport = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      userId,
      timeRange: selectedTimeRange,
      performanceGrade,
      metrics,
      predictions,
      categoryPerformance,
      summary: {
        totalProfit: metrics?.profitLoss || 0,
        winRate: metrics?.winRate || 0,
        roi: metrics?.roi || 0,
        sharpeRatio: metrics?.sharpeRatio || 0,
        bestCategory:
          categoryPerformance.length > 0;
            ? categoryPerformance.reduce(
              (best, cat) => (cat.roi > best.roi ? cat : best),
              categoryPerformance[0]
            ).category;
            : "N/A",
        topModel:
          predictions.length > 0;
            ? predictions.reduce(
              (top, pred) => (pred.accuracy > top.accuracy ? pred : top),
              predictions[0]
            ).modelName;
            : "N/A",
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });


    a.href = url;
    a.download = `performance-report-${userId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [
    userId,
    selectedTimeRange,
    performanceGrade,
    metrics,
    predictions,
    categoryPerformance,
  ]);

  if (isLoading) {
    return (
      <Box;
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
       key={219816}>
        <CircularProgress size={60} / key={173336}>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert;
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={loadPerformanceData} key={169572}>
            Retry;
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <motion.div;
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
     key={253890}>
      <Card sx={{ mb: 3 }} key={857343}>
        <CardContent key={452065}>
          <Box;
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
           key={167950}>
            <Typography;
              variant="h5"
              component="h2"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
             key={972323}>
              <Analytics / key={168398}>
              Performance Analytics Dashboard;
              <Badge;
                badgeContent={performanceGrade}
                color={
                  performanceGrade.startsWith("A")
                    ? "success"
                    : performanceGrade.startsWith("B")
                      ? "warning"
                      : "error"
                }
                sx={{ ml: 1 }}
               key={493966}>
                <EmojiEvents / key={689925}>
              </Badge>
            </Typography>
            <Box display="flex" gap={1} alignItems="center" key={695772}>
              <FormControl size="small" sx={{ minWidth: 120 }} key={402711}>
                <InputLabel key={405232}>Time Range</InputLabel>
                <Select;
                  value={selectedTimeRange}
                  onChange={(e) = key={685204}> setSelectedTimeRange(e.target.value as any)}
                >
                  <MenuItem value="7d" key={760577}>7 Days</MenuItem>
                  <MenuItem value="30d" key={939101}>30 Days</MenuItem>
                  <MenuItem value="90d" key={589808}>90 Days</MenuItem>
                  <MenuItem value="1y" key={148533}>1 Year</MenuItem>
                  <MenuItem value="all" key={641531}>All Time</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel;
                control={
                  <Switch;
                    checked={showComparison}
                    onChange={(e) = key={411532}> setShowComparison(e.target.checked)}
                  />
                }
                label="Benchmark"
              />
              <Tooltip title="Last updated" key={854868}>
                <Chip;
                  label={lastUpdate.toLocaleTimeString()}
                  size="small"
                  icon={<Timeline / key={88564}>}
                />
              </Tooltip>
              <IconButton onClick={loadPerformanceData} key={486525}>
                <Refresh / key={393498}>
              </IconButton>
              <IconButton onClick={exportPerformanceReport} key={694736}>
                <Download / key={173972}>
              </IconButton>
            </Box>
          </Box>

          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6" key={643178}>
            <div key={241917}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="primary.main" key={559183}>
                  {formatCurrency(metrics?.profitLoss || 0)}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Total P&L;
                </Typography>
                <Box;
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                 key={823464}>
                  {(metrics?.profitLoss || 0) > 0 ? (
                    <TrendingUp color="success" fontSize="small" / key={904448}>
                  ) : (
                    <TrendingDown color="error" fontSize="small" / key={982590}>
                  )}
                </Box>
              </Paper>
            </div>

            <div key={241917}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="secondary.main" key={711142}>
                  {formatPercentage(metrics?.winRate || 0)}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Win Rate;
                </Typography>
                <Box mt={1} key={51953}>
                  <Chip;
                    label={
                      (metrics?.winRate || 0)  key={891643}> 0.6;
                        ? "Excellent"
                        : (metrics?.winRate || 0) > 0.55;
                          ? "Good"
                          : "Needs Improvement"
                    }
                    color={
                      (metrics?.winRate || 0) > 0.6;
                        ? "success"
                        : (metrics?.winRate || 0) > 0.55;
                          ? "warning"
                          : "error"
                    }
                    size="small"
                  />
                </Box>
              </Paper>
            </div>

            <div key={241917}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="success.main" key={386495}>
                  {formatPercentage(metrics?.roi || 0)}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  ROI;
                </Typography>
                <Box mt={1} key={51953}>
                  <LinearProgress;
                    variant="determinate"
                    value={Math.min((metrics?.roi || 0) * 500, 100)}
                    color={
                      (metrics?.roi || 0)  key={833328}> 0.15;
                        ? "success"
                        : (metrics?.roi || 0) > 0.05;
                          ? "warning"
                          : "error"
                    }
                  />
                </Box>
              </Paper>
            </div>

            <div key={241917}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="info.main" key={656320}>
                  {(metrics?.sharpeRatio || 0).toFixed(2)}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Sharpe Ratio;
                </Typography>
                <Box mt={1} key={51953}>
                  <Chip;
                    label={
                      (metrics?.sharpeRatio || 0)  key={969959}> 1.5;
                        ? "Excellent"
                        : (metrics?.sharpeRatio || 0) > 1.0;
                          ? "Good"
                          : "Fair"
                    }
                    color={
                      (metrics?.sharpeRatio || 0) > 1.5;
                        ? "success"
                        : (metrics?.sharpeRatio || 0) > 1.0;
                          ? "warning"
                          : "default"
                    }
                    size="small"
                  />
                </Box>
              </Paper>
            </div>

            <div key={241917}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="warning.main" key={388248}>
                  {formatPercentage(Math.abs(metrics?.maxDrawdown || 0))}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Max Drawdown;
                </Typography>
                <Box mt={1} key={51953}>
                  <Warning;
                    color={
                      Math.abs(metrics?.maxDrawdown || 0)  key={281150}> 0.15;
                        ? "error"
                        : Math.abs(metrics?.maxDrawdown || 0) > 0.1;
                          ? "warning"
                          : "disabled"
                    }
                    fontSize="small"
                  />
                </Box>
              </Paper>
            </div>

            <div key={241917}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" key={720252}>{metrics?.totalBets || 0}</Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Total Bets;
                </Typography>
                <Typography;
                  variant="caption"
                  display="block"
                  color="textSecondary"
                 key={47537}>
                  {metrics?.winStreak || 0}W / {metrics?.lossStreak || 0}L;
                  streak;
                </Typography>
              </Paper>
            </div>
          </div>

          {/* Tab Navigation */}
          <Tabs;
            value={activeTab}
            onChange={(_, newValue) = key={995268}> setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
          >
            <Tab label="Performance Trends" icon={<ShowChart / key={153487}>} />
            <Tab label="Model Analysis" icon={<PrecisionManufacturing / key={713511}>} />
            <Tab label="Category Breakdown" icon={<PieChart / key={229793}>} />
            <Tab label="Risk Analysis" icon={<Assessment / key={724225}>} />
            <Tab label="Insights" icon={<Insights / key={430253}>} />
          </Tabs>

          {/* Performance Trends Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Cumulative Performance;
                  </Typography>
                  <ResponsiveContainer width="100%" height={400} key={114808}>
                    <ComposedChart data={timeSeriesData} key={886440}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="timestamp" / key={223901}>
                      <YAxis yAxisId="left" / key={951284}>
                      <YAxis yAxisId="right" orientation="right" / key={346631}>
                      <RechartsTooltip / key={2217}>
                      <Legend / key={913243}>
                      <Area;
                        yAxisId="left"
                        type="monotone"
                        dataKey="cumulativeProfit"
                        fill={COLORS.primary}
                        fillOpacity={0.3}
                        stroke={COLORS.primary}
                        name="Cumulative Profit"
                      / key={837582}>
                      <Line;
                        yAxisId="right"
                        type="monotone"
                        dataKey="winRate"
                        stroke={COLORS.success}
                        strokeWidth={2}
                        name="Win Rate"
                      / key={476755}>
                      <Bar;
                        yAxisId="right"
                        dataKey="volume"
                        fill={COLORS.secondary}
                        opacity={0.6}
                        name="Daily Volume"
                      / key={676186}>
                    </ComposedChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2, height: 450 }} key={715126}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Performance Radar;
                  </Typography>
                  <ResponsiveContainer width="100%" height={350} key={1058}>
                    <RadarChart data={radarChartData} key={598246}>
                      <PolarGrid / key={555438}>
                      <PolarAngleAxis dataKey="metric" / key={578230}>
                      <PolarRadiusAxis;
                        angle={90}
                        domain={[0, 100]}
                        tick={false}
                      / key={726771}>
                      <Radar;
                        name="Performance"
                        dataKey="value"
                        stroke={COLORS.primary}
                        fill={COLORS.primary}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      / key={831210}>
                    </RadarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Model Analysis Tab */}
          {activeTab === 1 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Model Performance Comparison;
                  </Typography>
                  <TableContainer key={611233}>
                    <Table key={889668}>
                      <TableHead key={813147}>
                        <TableRow key={300096}>
                          <TableCell key={942983}>Model</TableCell>
                          <TableCell key={942983}>Accuracy</TableCell>
                          <TableCell key={942983}>Precision</TableCell>
                          <TableCell key={942983}>Recall</TableCell>
                          <TableCell key={942983}>F1 Score</TableCell>
                          <TableCell key={942983}>Calibration</TableCell>
                          <TableCell key={942983}>Profit Contribution</TableCell>
                          <TableCell key={942983}>Risk Score</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody key={923191}>
                        {predictions.map((model) => (
                          <TableRow key={model.modelName} key={222994}>
                            <TableCell key={942983}>
                              <Box display="flex" alignItems="center" gap={1} key={161969}>
                                <Avatar;
                                  sx={{ width: 32, height: 32, fontSize: 12 }}
                                 key={673512}>
                                  {model.modelName;
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </Avatar>
                                <Typography variant="body2" key={679167}>
                                  {model.modelName}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell key={942983}>
                              <Chip;
                                label={formatPercentage(model.accuracy)}
                                color={
                                  model.accuracy  key={395253}> 0.7;
                                    ? "success"
                                    : model.accuracy > 0.6;
                                      ? "warning"
                                      : "error"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell key={942983}>
                              {formatPercentage(model.precision)}
                            </TableCell>
                            <TableCell key={942983}>
                              {formatPercentage(model.recall)}
                            </TableCell>
                            <TableCell key={942983}>{model.f1Score.toFixed(3)}</TableCell>
                            <TableCell key={942983}>
                              <LinearProgress;
                                variant="determinate"
                                value={model.calibration * 100}
                                sx={{ width: 60 }}
                              / key={558284}>
                            </TableCell>
                            <TableCell key={942983}>
                              <Typography;
                                color={
                                  model.profitContribution  key={242838}> 0;
                                    ? "success.main"
                                    : "error.main"
                                }
                              >
                                {formatCurrency(model.profitContribution)}
                              </Typography>
                            </TableCell>
                            <TableCell key={942983}>
                              <Chip;
                                label={model.riskAdjustedScore.toFixed(2)}
                                color={
                                  model.riskAdjustedScore  key={546922}> 0.8;
                                    ? "success"
                                    : model.riskAdjustedScore > 0.7;
                                      ? "warning"
                                      : "error"
                                }
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Model Contributions;
                  </Typography>
                  <ResponsiveContainer width="100%" height={300} key={757181}>
                    <RechartsPieChart key={697175}>
                      <Pie;
                        data={predictions.map((p) = key={506125}> ({
                          name: p.modelName,
                          value: p.profitContribution,
                          color:
                            PIE_COLORS[
                            predictions.indexOf(p) % PIE_COLORS.length;
                            ],
                        }))}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) =>
                          `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {predictions.map((_, index) => (
                          <Cell;
                            key={`cell-${index}`}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          / key={92511}>
                        ))}
                      </Pie>
                      <RechartsTooltip;
                        formatter={(value) = key={789859}> formatCurrency(value as number)}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Category Breakdown Tab */}
          {activeTab === 2 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Box;
                    display="flex"
                    justifyContent="between"
                    alignItems="center"
                    mb={2}
                   key={173536}>
                    <Typography variant="h6" key={93421}>Category Performance</Typography>
                    <FormControl size="small" sx={{ minWidth: 150 }} key={158622}>
                      <InputLabel key={405232}>Category</InputLabel>
                      <Select;
                        value={selectedCategory}
                        onChange={(e) = key={373437}> setSelectedCategory(e.target.value)}
                      >
                        <MenuItem value="all" key={641531}>All Categories</MenuItem>
                        {categoryPerformance.map((cat) => (
                          <MenuItem key={cat.category} value={cat.category} key={788596}>
                            {cat.category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <ResponsiveContainer width="100%" height={400} key={114808}>
                    <RechartsBarChart data={filteredCategoryData} key={320274}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="category" / key={804098}>
                      <YAxis yAxisId="left" / key={951284}>
                      <YAxis yAxisId="right" orientation="right" / key={346631}>
                      <RechartsTooltip / key={2217}>
                      <Legend / key={913243}>
                      <Bar;
                        yAxisId="left"
                        dataKey="profit"
                        fill={COLORS.success}
                        name="Profit"
                      / key={861448}>
                      <Bar;
                        yAxisId="right"
                        dataKey="winRate"
                        fill={COLORS.primary}
                        name="Win Rate"
                      / key={955685}>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Category Summary;
                  </Typography>
                  <Stack spacing={2} key={169333}>
                    {categoryPerformance.map((category) => (
                      <Box;
                        key={category.category}
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: "divider",
                          borderRadius: 1,
                          backgroundColor:
                            selectedCategory === category.category;
                              ? "action.selected"
                              : "inherit",
                        }}
                       key={162679}>
                        <Box;
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={1}
                         key={290559}>
                          <Typography variant="subtitle2" key={895}>
                            {category.category}
                          </Typography>
                          <Chip;
                            label={category.riskLevel}
                            color={
                              category.riskLevel === "low"
                                ? "success"
                                : category.riskLevel === "medium"
                                  ? "warning"
                                  : "error"
                            }
                            size="small"
                          / key={772166}>
                        </Box>
                        <Grid container spacing={1} key={154616}>
                          <Grid item xs={6} key={823052}>
                            <Typography variant="caption" key={472228}>Bets</Typography>
                            <Typography variant="body2" key={679167}>
                              {category.bets}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} key={823052}>
                            <Typography variant="caption" key={472228}>Win Rate</Typography>
                            <Typography variant="body2" key={679167}>
                              {formatPercentage(category.winRate)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} key={823052}>
                            <Typography variant="caption" key={472228}>ROI</Typography>
                            <Typography;
                              variant="body2"
                              color={
                                category.roi  key={648634}>= 0;
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {formatPercentage(category.roi)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} key={823052}>
                            <Typography variant="caption" key={472228}>Profit</Typography>
                            <Typography;
                              variant="body2"
                              color={
                                category.profit  key={965619}>= 0;
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {formatCurrency(category.profit)}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Risk Analysis Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={6} key={637329}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Risk Metrics;
                  </Typography>
                  <Stack spacing={3} key={931520}>
                    <Box key={485947}>
                      <Typography variant="subtitle2" gutterBottom key={263945}>
                        Value at Risk (VaR)
                      </Typography>
                      <Box;
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                       key={909761}>
                        <Typography variant="h5" color="error.main" key={790849}>
                          {formatCurrency((metrics?.profitLoss || 0) * 0.05)}
                        </Typography>
                        <Typography variant="caption" key={472228}>
                          95% Confidence;
                        </Typography>
                      </Box>
                    </Box>

                    <Box key={485947}>
                      <Typography variant="subtitle2" gutterBottom key={263945}>
                        Expected Shortfall;
                      </Typography>
                      <Box;
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                       key={909761}>
                        <Typography variant="h5" color="warning.main" key={649980}>
                          {formatCurrency((metrics?.profitLoss || 0) * 0.08)}
                        </Typography>
                        <Typography variant="caption" key={472228}>
                          Conditional VaR;
                        </Typography>
                      </Box>
                    </Box>

                    <Box key={485947}>
                      <Typography variant="subtitle2" gutterBottom key={263945}>
                        Kelly Optimal Fraction;
                      </Typography>
                      <Box;
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                       key={909761}>
                        <Typography variant="h5" color="info.main" key={469891}>
                          {formatPercentage(metrics?.kellyOptimal || 0)}
                        </Typography>
                        <Typography variant="caption" key={472228}>
                          Recommended Size;
                        </Typography>
                      </Box>
                    </Box>

                    <Box key={485947}>
                      <Typography variant="subtitle2" gutterBottom key={263945}>
                        Risk-Adjusted Return;
                      </Typography>
                      <Box;
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                       key={909761}>
                        <Typography variant="h5" color="success.main" key={850965}>
                          {formatPercentage(metrics?.riskAdjustedReturn || 0)}
                        </Typography>
                        <Typography variant="caption" key={472228}>
                          Return per Unit Risk;
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} key={637329}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Drawdown Analysis;
                  </Typography>
                  <ResponsiveContainer width="100%" height={300} key={757181}>
                    <AreaChart data={timeSeriesData} key={6208}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="timestamp" / key={223901}>
                      <YAxis / key={190086}>
                      <RechartsTooltip / key={2217}>
                      <Area;
                        type="monotone"
                        dataKey="drawdown"
                        stroke={COLORS.error}
                        fill={COLORS.error}
                        fillOpacity={0.3}
                        name="Drawdown"
                      / key={490588}>
                    </AreaChart>
                  </ResponsiveContainer>

                  <Divider sx={{ my: 2 }} / key={369348}>

                  <Grid container spacing={2} key={272161}>
                    <Grid item xs={6} key={823052}>
                      <Typography variant="caption" key={472228}>
                        Max Drawdown Duration;
                      </Typography>
                      <Typography variant="h6" key={93421}>14 days</Typography>
                    </Grid>
                    <Grid item xs={6} key={823052}>
                      <Typography variant="caption" key={472228}>Recovery Time</Typography>
                      <Typography variant="h6" key={93421}>8 days</Typography>
                    </Grid>
                    <Grid item xs={6} key={823052}>
                      <Typography variant="caption" key={472228}>Calmar Ratio</Typography>
                      <Typography variant="h6" key={93421}>
                        {(
                          (metrics?.roi || 0) /
                          Math.abs(metrics?.maxDrawdown || 0.01)
                        ).toFixed(2)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} key={823052}>
                      <Typography variant="caption" key={472228}>Sterling Ratio</Typography>
                      <Typography variant="h6" key={93421}>
                        {(
                          (metrics?.roi || 0) /
                          (Math.abs(metrics?.maxDrawdown || 0.01) + 0.1)
                        ).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Insights Tab */}
          {activeTab === 4 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Performance Insights;
                  </Typography>
                  <Stack spacing={2} key={169333}>
                    <Alert severity="success" icon={<TrendingUp / key={204718}>}>
                      <Typography variant="subtitle2" key={895}>
                        Strong Performance Detected;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Your {formatPercentage(metrics?.winRate || 0)} win rate;
                        is above the 75th percentile. Consider increasing;
                        position sizes within Kelly criteria.
                      </Typography>
                    </Alert>

                    <Alert severity="info" icon={<Assessment / key={247969}>}>
                      <Typography variant="subtitle2" key={895}>
                        Model Optimization Opportunity;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Ensemble ML model shows{" "}
                        {formatPercentage(predictions[0]?.accuracy || 0)}{" "}
                        accuracy. Consider ensemble weighting adjustments for;
                        improved performance.
                      </Typography>
                    </Alert>

                    <Alert severity="warning" icon={<Warning / key={187334}>}>
                      <Typography variant="subtitle2" key={895}>
                        Risk Management Note;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Maximum drawdown of{" "}
                        {formatPercentage(Math.abs(metrics?.maxDrawdown || 0))}{" "}
                        suggests implementing stricter position sizing during;
                        losing streaks.
                      </Typography>
                    </Alert>

                    <Alert severity="info" icon={<Psychology / key={136471}>}>
                      <Typography variant="subtitle2" key={895}>
                        Category Performance Insight;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        NBA Points category shows highest ROI at{" "}
                        {formatPercentage(categoryPerformance[0]?.roi || 0)}.
                        Consider increasing allocation to this market segment.
                      </Typography>
                    </Alert>
                  </Stack>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Recommendations;
                  </Typography>
                  <Stack spacing={2} key={169333}>
                    <Box key={485947}>
                      <Typography;
                        variant="subtitle2"
                        color="success.main"
                        gutterBottom;
                       key={78845}>
                        ✓ Optimal Kelly Sizing;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Current {formatPercentage(metrics?.kellyOptimal || 0)}{" "}
                        allocation is appropriate.
                      </Typography>
                    </Box>

                    <Box key={485947}>
                      <Typography;
                        variant="subtitle2"
                        color="warning.main"
                        gutterBottom;
                       key={399004}>
                        ⚠ Model Diversification;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Consider adding momentum-based models to ensemble.
                      </Typography>
                    </Box>

                    <Box key={485947}>
                      <Typography;
                        variant="subtitle2"
                        color="info.main"
                        gutterBottom;
                       key={698949}>
                        ℹ Market Expansion;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Explore tennis and esports markets for diversification.
                      </Typography>
                    </Box>

                    <Box key={485947}>
                      <Typography;
                        variant="subtitle2"
                        color="error.main"
                        gutterBottom;
                       key={264070}>
                        ⛔ Risk Control;
                      </Typography>
                      <Typography variant="body2" key={679167}>
                        Implement dynamic position sizing based on recent;
                        performance.
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PerformanceAnalyticsDashboard;
