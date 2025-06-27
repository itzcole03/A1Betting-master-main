import React, { useEffect, useState, useMemo, useCallback  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Chip,
  Alert,
  LinearProgress,
  Tooltip,
  IconButton,
  Divider,
  Paper,
  Stack,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material.ts';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  MonetizationOn,
  Warning,
  Info,
  Download,
  Settings,
  Timeline,
  ExpandMore,
  Refresh,
  Visibility,
  Speed,
  ShowChart,
  PieChart,
  BarChart,
  CandlestickChart,
  TrendingFlat,
} from '@mui/icons-material.ts';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
} from 'recharts.ts';
import { MarketAnalysisService } from '@/services/marketAnalysisService.ts';
import type {
  MarketMetrics,
  MarketEfficiencyMetrics,
  MarketAnomaly,
  OddsMovement,
  VolumeAnalysis,
  SentimentData,
  ArbitrageOpportunity,
  MarketDepth,
  LiquidityMetrics,
  MarketVolatility,
} from '@/types/betting.ts';
import {
  formatCurrency,
  formatPercentage,
  formatDateTime,
} from '@/utils/formatters.ts';

interface MarketAnalysisDashboardProps {
  eventId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
  showAdvancedMetrics?: boolean;
}

interface MarketSnapshot {
  timestamp: number;
  totalVolume: number;
  avgOdds: number;
  volatility: number;
  efficiency: number;
  sentiment: number;
  arbitrageCount: number;
}

const COLORS = {
  primary: "#1976d2",
  secondary: "#dc004e",
  success: "#2e7d32",
  warning: "#ed6c02",
  error: "#d32f2f",
  info: "#0288d1",
};

export const MarketAnalysisDashboard: React.FC<
  MarketAnalysisDashboardProps;
> = ({
  eventId = "default",
  autoRefresh = true,
  refreshInterval = 30000,
  showAdvancedMetrics = true,
}) => {
  // State Management;
  const [activeTab, setActiveTab] = useState(0);
  const [timeRange, setTimeRange] = useState<"1h" | "6h" | "24h" | "7d">("6h");
  const [selectedMetric, setSelectedMetric] = useState<
    "volume" | "odds" | "efficiency" | "sentiment"
  >("volume");

  // Market Data State;
  const [metrics, setMetrics] = useState<MarketMetrics | null key={244872}>(null);
  const [efficiency, setEfficiency] = useState<MarketEfficiencyMetrics | null key={993145}>(
    null,
  );
  const [anomalies, setAnomalies] = useState<MarketAnomaly[] key={626353}>([]);
  const [oddsMovements, setOddsMovements] = useState<OddsMovement[] key={425207}>([]);
  const [volumeAnalysis, setVolumeAnalysis] = useState<VolumeAnalysis | null key={459172}>(
    null,
  );
  const [sentimentData, setSentimentData] = useState<SentimentData | null key={723204}>(
    null,
  );
  const [arbitrageOpportunities, setArbitrageOpportunities] = useState<
    ArbitrageOpportunity[]
  >([]);
  const [marketDepth, setMarketDepth] = useState<MarketDepth | null key={826189}>(null);
  const [liquidityMetrics, setLiquidityMetrics] =
    useState<LiquidityMetrics | null key={235880}>(null);
  const [volatilityData, setVolatilityData] = useState<MarketVolatility | null key={700432}>(
    null,
  );
  const [historicalSnapshots, setHistoricalSnapshots] = useState<
    MarketSnapshot[]
  >([]);

  // UI State;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [lastUpdate, setLastUpdate] = useState<Date key={141202}>(new Date());

  // Service Instance;
  const marketAnalysisService = useMemo(
    () => MarketAnalysisService.getInstance(),
    [],
  );

  // Data Loading Functions;
  const loadMarketData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Load all market data in parallel;
      const [
        metricsData,
        efficiencyData,
        anomaliesData,
        oddsData,
        volumeData,
        sentimentInfo,
        arbitrageData,
        depthData,
        liquidityData,
        volatilityInfo,
      ] = await Promise.all([
        marketAnalysisService.getMarketMetrics(eventId),
        marketAnalysisService.getMarketEfficiency(eventId),
        marketAnalysisService.getAnomalies(eventId),
        marketAnalysisService.getOddsMovements(eventId, timeRange),
        marketAnalysisService.getVolumeAnalysis(eventId, timeRange),
        marketAnalysisService.getSentimentData(eventId),
        marketAnalysisService.getArbitrageOpportunities(eventId),
        marketAnalysisService.getMarketDepth(eventId),
        marketAnalysisService.getLiquidityMetrics(eventId),
        marketAnalysisService.getVolatilityData(eventId, timeRange),
      ]);

      setMetrics(metricsData);
      setEfficiency(efficiencyData);
      setAnomalies(anomaliesData);
      setOddsMovements(oddsData);
      setVolumeAnalysis(volumeData);
      setSentimentData(sentimentInfo);
      setArbitrageOpportunities(arbitrageData);
      setMarketDepth(depthData);
      setLiquidityMetrics(liquidityData);
      setVolatilityData(volatilityInfo);

      // Create historical snapshot;
      if (metricsData && efficiencyData && sentimentInfo) {
        const snapshot: MarketSnapshot = {
          timestamp: Date.now(),
          totalVolume: metricsData.totalVolume,
          avgOdds: metricsData.avgOdds,
          volatility: volatilityInfo?.currentVolatility || 0,
          efficiency: efficiencyData.overallEfficiency,
          sentiment: sentimentInfo.overall,
          arbitrageCount: arbitrageData.length,
        };

        setHistoricalSnapshots((prev) => {

          // Keep last 100 snapshots;
          return updated.slice(-100);
        });
      }

      setLastUpdate(new Date());
    } catch (err) {
      setError("Failed to load market data");
      // console statement removed
    } finally {
      setIsLoading(false);
    }
  }, [eventId, timeRange, marketAnalysisService]);

  // Auto-refresh Effect;
  useEffect(() => {
    loadMarketData();

    if (autoRefresh) {

      return () => clearInterval(interval);
    }
  }, [loadMarketData, autoRefresh, refreshInterval]);

  // Chart Data Preparation;
  const chartData = useMemo(() => {
    if (!oddsMovements.length) return [];

    return oddsMovements.map((movement) => ({
      timestamp: new Date(movement.timestamp).toLocaleTimeString(),
      odds: movement.newOdds,
      volume: movement.volume,
      change: movement.percentageChange,
      efficiency: movement.efficiency || 0,
    }));
  }, [oddsMovements]);

  const sentimentChartData = useMemo(() => {
    if (!sentimentData) return [];

    return [
      {
        name: "Positive",
        value: sentimentData.positive,
        color: COLORS.success,
      },
      { name: "Neutral", value: sentimentData.neutral, color: COLORS.info },
      { name: "Negative", value: sentimentData.negative, color: COLORS.error },
    ];
  }, [sentimentData]);

  const volumeDistributionData = useMemo(() => {
    if (!volumeAnalysis) return [];

    return volumeAnalysis.hourlyDistribution.map((volume, index) => ({
      hour: `${index}:00`,
      volume,
      percentageOfTotal: (volume / volumeAnalysis.totalVolume) * 100,
    }));
  }, [volumeAnalysis]);

  const marketDepthData = useMemo(() => {
    if (!marketDepth) return { bids: [], asks: [] };

    return {
      bids: marketDepth.bids.map((bid, index) => ({
        price: bid.odds,
        cumulative: marketDepth.bids;
          .slice(0, index + 1)
          .reduce((sum, b) => sum + b.volume, 0),
        volume: bid.volume,
      })),
      asks: marketDepth.asks.map((ask, index) => ({
        price: ask.odds,
        cumulative: marketDepth.asks;
          .slice(0, index + 1)
          .reduce((sum, a) => sum + a.volume, 0),
        volume: ask.volume,
      })),
    };
  }, [marketDepth]);

  // Export Functions;
  const exportAnalysis = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      eventId,
      timeRange,
      metrics,
      efficiency,
      anomalies,
      arbitrageOpportunities,
      historicalSnapshots,
      summary: {
        totalAnomalies: anomalies.length,
        totalArbitrageOpportunities: arbitrageOpportunities.length,
        marketEfficiency: efficiency?.overallEfficiency,
        avgVolatility: volatilityData?.avgVolatility,
        sentimentScore: sentimentData?.overall,
      },
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });


    a.href = url;
    a.download = `market-analysis-${eventId}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [
    eventId,
    timeRange,
    metrics,
    efficiency,
    anomalies,
    arbitrageOpportunities,
    historicalSnapshots,
    volatilityData,
    sentimentData,
  ]);

  // Risk Assessment;
  const riskAssessment = useMemo(() => {
    if (!metrics || !efficiency || !volatilityData) return null;

    const riskScore = 0;

    if (efficiency.overallEfficiency < 0.7) {
      riskFactors.push("Low market efficiency detected");
      riskScore += 2;
    }

    if (volatilityData.currentVolatility > volatilityData.avgVolatility * 2) {
      riskFactors.push("High volatility levels");
      riskScore += 3;
    }

    if (anomalies.length > 5) {
      riskFactors.push("Multiple market anomalies detected");
      riskScore += 2;
    }

    if (liquidityMetrics && liquidityMetrics.bidAskSpread > 0.1) {
      riskFactors.push("Wide bid-ask spreads");
      riskScore += 1;
    }

    const riskLevel =
      riskScore >= 5 ? "high" : riskScore >= 3 ? "medium" : "low";

    return {
      level: riskLevel,
      score: riskScore,
      factors: riskFactors,
      recommendation:
        riskLevel === "high"
          ? "Exercise extreme caution"
          : riskLevel === "medium"
            ? "Proceed with caution"
            : "Market conditions are favorable",
    };
  }, [metrics, efficiency, volatilityData, anomalies, liquidityMetrics]);

  if (isLoading && !metrics) {
    return (
      <Box;
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
       key={219816}>
        <LinearProgress sx={{ width: "50%" }} / key={592693}>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert;
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={loadMarketData} key={331154}>
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
              <Assessment / key={701819}>
              Market Analysis Dashboard;
              <Chip;
                label={eventId}
                color="primary"
                size="small"
                sx={{ ml: 1 }}
              / key={13484}>
            </Typography>
            <Box display="flex" gap={1} alignItems="center" key={695772}>
              <FormControl size="small" sx={{ minWidth: 120 }} key={402711}>
                <InputLabel key={405232}>Time Range</InputLabel>
                <Select;
                  value={timeRange}
                  onChange={(e) = key={213937}> setTimeRange(e.target.value as any)}
                >
                  <MenuItem value="1h" key={394961}>1 Hour</MenuItem>
                  <MenuItem value="6h" key={742844}>6 Hours</MenuItem>
                  <MenuItem value="24h" key={15738}>24 Hours</MenuItem>
                  <MenuItem value="7d" key={760577}>7 Days</MenuItem>
                </Select>
              </FormControl>
              <Tooltip title="Last updated" key={854868}>
                <Chip;
                  label={lastUpdate.toLocaleTimeString()}
                  size="small"
                  icon={<Timeline / key={88564}>}
                />
              </Tooltip>
              <IconButton onClick={loadMarketData} disabled={isLoading} key={794490}>
                <Refresh / key={393498}>
              </IconButton>
              <IconButton onClick={exportAnalysis} key={288593}>
                <Download / key={173972}>
              </IconButton>
            </Box>
          </Box>

          {/* Key Metrics Overview */}
          <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="primary.main" key={559183}>
                  {formatCurrency(metrics?.totalVolume || 0)}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Total Volume;
                </Typography>
                <Box;
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mt={1}
                 key={823464}>
                  {volumeAnalysis && volumeAnalysis.change24h > 0 ? (
                    <TrendingUp color="success" fontSize="small" / key={904448}>
                  ) : (
                    <TrendingDown color="error" fontSize="small" / key={982590}>
                  )}
                  <Typography variant="caption" sx={{ ml: 0.5 }} key={136077}>
                    {formatPercentage((volumeAnalysis?.change24h || 0) / 100)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="secondary.main" key={711142}>
                  {formatPercentage((efficiency?.overallEfficiency || 0) / 100)}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Market Efficiency;
                </Typography>
                <Box mt={1} key={51953}>
                  <Chip;
                    label={
                      (efficiency?.overallEfficiency || 0)  key={834668}> 0.8;
                        ? "High"
                        : (efficiency?.overallEfficiency || 0) > 0.6;
                          ? "Medium"
                          : "Low"
                    }
                    color={
                      (efficiency?.overallEfficiency || 0) > 0.8;
                        ? "success"
                        : (efficiency?.overallEfficiency || 0) > 0.6;
                          ? "warning"
                          : "error"
                    }
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="warning.main" key={388248}>
                  {anomalies.length}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Market Anomalies;
                </Typography>
                <Box mt={1} key={51953}>
                  <Chip;
                    label={
                      anomalies.length  key={221981}> 5;
                        ? "High Alert"
                        : anomalies.length > 2;
                          ? "Moderate"
                          : "Normal"
                    }
                    color={
                      anomalies.length > 5;
                        ? "error"
                        : anomalies.length > 2;
                          ? "warning"
                          : "success"
                    }
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3} key={214380}>
              <Paper sx={{ p: 2, textAlign: "center" }} key={534920}>
                <Typography variant="h4" color="success.main" key={386495}>
                  {arbitrageOpportunities.length}
                </Typography>
                <Typography variant="caption" color="textSecondary" key={15591}>
                  Arbitrage Opportunities;
                </Typography>
                <Box mt={1} key={51953}>
                  <Chip;
                    label={
                      arbitrageOpportunities.length  key={153171}> 3;
                        ? "Excellent"
                        : arbitrageOpportunities.length > 1;
                          ? "Good"
                          : "Limited"
                    }
                    color={
                      arbitrageOpportunities.length > 3;
                        ? "success"
                        : arbitrageOpportunities.length > 1;
                          ? "warning"
                          : "default"
                    }
                    size="small"
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* Risk Assessment */}
          {riskAssessment && (
            <Alert;
              severity={
                riskAssessment.level === "high"
                  ? "error"
                  : riskAssessment.level === "medium"
                    ? "warning"
                    : "success"
              }
              sx={{ mb: 3 }}
             key={698375}>
              <Typography variant="subtitle2" gutterBottom key={263945}>
                Risk Assessment: {riskAssessment.level.toUpperCase()} (Score:{" "}
                {riskAssessment.score}/10)
              </Typography>
              <Typography variant="body2" gutterBottom key={645732}>
                {riskAssessment.recommendation}
              </Typography>
              {riskAssessment.factors.length > 0 && (
                <Box mt={1} key={51953}>
                  <Typography variant="caption" color="textSecondary" key={15591}>
                    Risk Factors:
                  </Typography>
                  <ul style={{ margin: 0, paddingLeft: 16 }} key={459208}>
                    {riskAssessment.factors.map((factor, index) => (
                      <li key={index} key={760236}>
                        <Typography variant="caption" key={472228}>{factor}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Alert>
          )}

          {/* Tab Navigation */}
          <Tabs;
            value={activeTab}
            onChange={(_, newValue) = key={995268}> setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}
          >
            <Tab label="Market Trends" icon={<ShowChart / key={326363}>} />
            <Tab label="Volume Analysis" icon={<BarChart / key={569066}>} />
            <Tab label="Sentiment" icon={<PieChart / key={973452}>} />
            <Tab label="Market Depth" icon={<CandlestickChart / key={334326}>} />
            <Tab label="Anomalies" icon={<Warning / key={311094}>} />
            <Tab label="Arbitrage" icon={<MonetizationOn / key={346150}>} />
          </Tabs>

          {/* Market Trends Tab */}
          {activeTab === 0 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Odds Movement & Efficiency;
                  </Typography>
                  <ResponsiveContainer width="100%" height={400} key={114808}>
                    <LineChart data={chartData} key={187147}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="timestamp" / key={223901}>
                      <YAxis yAxisId="left" / key={951284}>
                      <YAxis yAxisId="right" orientation="right" / key={346631}>
                      <RechartsTooltip / key={2217}>
                      <Legend / key={913243}>
                      <Line;
                        yAxisId="left"
                        type="monotone"
                        dataKey="odds"
                        stroke={COLORS.primary}
                        strokeWidth={2}
                        name="Odds"
                      / key={864148}>
                      <Line;
                        yAxisId="right"
                        type="monotone"
                        dataKey="efficiency"
                        stroke={COLORS.success}
                        strokeWidth={2}
                        name="Efficiency"
                      / key={352495}>
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Volatility Analysis;
                  </Typography>
                  {volatilityData && (
                    <Stack spacing={2} key={169333}>
                      <Box key={485947}>
                        <Typography variant="caption" key={472228}>
                          Current Volatility;
                        </Typography>
                        <Typography;
                          variant="h4"
                          color={
                            volatilityData.currentVolatility  key={720815}>
                            volatilityData.avgVolatility * 1.5;
                              ? "error.main"
                              : volatilityData.currentVolatility >
                                  volatilityData.avgVolatility;
                                ? "warning.main"
                                : "success.main"
                          }
                        >
                          {formatPercentage(
                            volatilityData.currentVolatility / 100,
                          )}
                        </Typography>
                      </Box>

                      <Divider / key={11977}>

                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>24h Average</Typography>
                        <Typography variant="body2" key={679167}>
                          {formatPercentage(volatilityData.avgVolatility / 100)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>24h High</Typography>
                        <Typography variant="body2" key={679167}>
                          {formatPercentage(volatilityData.maxVolatility / 100)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>24h Low</Typography>
                        <Typography variant="body2" key={679167}>
                          {formatPercentage(volatilityData.minVolatility / 100)}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Volume Analysis Tab */}
          {activeTab === 1 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Hourly Volume Distribution;
                  </Typography>
                  <ResponsiveContainer width="100%" height={400} key={114808}>
                    <RechartsBarChart data={volumeDistributionData} key={935419}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="hour" / key={169066}>
                      <YAxis / key={190086}>
                      <RechartsTooltip / key={2217}>
                      <Bar dataKey="volume" fill={COLORS.primary} / key={818901}>
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Volume Metrics;
                  </Typography>
                  {volumeAnalysis && (
                    <Stack spacing={2} key={169333}>
                      <Box key={485947}>
                        <Typography variant="caption" key={472228}>
                          Peak Hour Volume;
                        </Typography>
                        <Typography variant="h5" key={944884}>
                          {formatCurrency(volumeAnalysis.peakHourVolume)}
                        </Typography>
                      </Box>
                      <Box key={485947}>
                        <Typography variant="caption" key={472228}>
                          Average Hourly;
                        </Typography>
                        <Typography variant="h6" key={93421}>
                          {formatCurrency(volumeAnalysis.avgHourlyVolume)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>24h Change</Typography>
                        <Typography;
                          variant="body2"
                          color={
                            volumeAnalysis.change24h  key={603471}>= 0;
                              ? "success.main"
                              : "error.main"
                          }
                        >
                          {formatPercentage(volumeAnalysis.change24h / 100)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>
                          Volume Velocity;
                        </Typography>
                        <Typography variant="body2" key={679167}>
                          {volumeAnalysis.velocity.toFixed(2)}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Sentiment Tab */}
          {activeTab === 2 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={6} key={637329}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Market Sentiment Distribution;
                  </Typography>
                  <ResponsiveContainer width="100%" height={300} key={757181}>
                    <RechartsPieChart key={697175}>
                      <Pie;
                        data={sentimentChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) = key={194953}>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {sentimentChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} / key={116639}>
                        ))}
                      </Pie>
                      <RechartsTooltip / key={2217}>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} key={637329}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Sentiment Analysis;
                  </Typography>
                  {sentimentData && (
                    <Stack spacing={2} key={169333}>
                      <Box key={485947}>
                        <Typography variant="caption" key={472228}>
                          Overall Sentiment Score;
                        </Typography>
                        <Typography;
                          variant="h4"
                          color={
                            sentimentData.overall  key={873356}> 0.6;
                              ? "success.main"
                              : sentimentData.overall > 0.4;
                                ? "warning.main"
                                : "error.main"
                          }
                        >
                          {(sentimentData.overall * 100).toFixed(0)}%
                        </Typography>
                      </Box>

                      <Divider / key={11977}>

                      <Box key={485947}>
                        <Typography variant="subtitle2" gutterBottom key={263945}>
                          Sentiment Breakdown;
                        </Typography>
                        <Stack spacing={1} key={41946}>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>Positive</Typography>
                            <Typography variant="body2" color="success.main" key={698567}>
                              {formatPercentage(sentimentData.positive / 100)}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>Neutral</Typography>
                            <Typography variant="body2" key={679167}>
                              {formatPercentage(sentimentData.neutral / 100)}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>Negative</Typography>
                            <Typography variant="body2" color="error.main" key={837392}>
                              {formatPercentage(sentimentData.negative / 100)}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>

                      <Box key={485947}>
                        <Typography variant="subtitle2" gutterBottom key={263945}>
                          Key Indicators;
                        </Typography>
                        <Stack spacing={1} key={41946}>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>
                              Volume Sentiment;
                            </Typography>
                            <Typography variant="body2" key={679167}>
                              {sentimentData.volumeWeighted.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>
                              Social Media Score;
                            </Typography>
                            <Typography variant="body2" key={679167}>
                              {sentimentData.socialMedia.toFixed(2)}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>
                              News Impact;
                            </Typography>
                            <Typography variant="body2" key={679167}>
                              {sentimentData.newsImpact.toFixed(2)}
                            </Typography>
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Market Depth Tab */}
          {activeTab === 3 && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={8} key={230289}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Order Book Depth;
                  </Typography>
                  <ResponsiveContainer width="100%" height={400} key={114808}>
                    <AreaChart key={534590}>
                      <CartesianGrid strokeDasharray="3 3" / key={580708}>
                      <XAxis dataKey="price" / key={44198}>
                      <YAxis / key={190086}>
                      <RechartsTooltip / key={2217}>
                      <Area;
                        type="monotone"
                        dataKey="cumulative"
                        stackId="1"
                        stroke={COLORS.success}
                        fill={COLORS.success}
                        fillOpacity={0.3}
                        data={marketDepthData.bids}
                        name="Bids"
                      / key={171160}>
                      <Area;
                        type="monotone"
                        dataKey="cumulative"
                        stackId="2"
                        stroke={COLORS.error}
                        fill={COLORS.error}
                        fillOpacity={0.3}
                        data={marketDepthData.asks}
                        name="Asks"
                      / key={600963}>
                    </AreaChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4} key={796413}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Liquidity Metrics;
                  </Typography>
                  {liquidityMetrics && (
                    <Stack spacing={2} key={169333}>
                      <Box key={485947}>
                        <Typography variant="caption" key={472228}>
                          Bid-Ask Spread;
                        </Typography>
                        <Typography;
                          variant="h5"
                          color={
                            liquidityMetrics.bidAskSpread  key={439443}> 0.1;
                              ? "error.main"
                              : liquidityMetrics.bidAskSpread > 0.05;
                                ? "warning.main"
                                : "success.main"
                          }
                        >
                          {formatPercentage(
                            liquidityMetrics.bidAskSpread / 100,
                          )}
                        </Typography>
                      </Box>

                      <Divider / key={11977}>

                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>Market Impact</Typography>
                        <Typography variant="body2" key={679167}>
                          {liquidityMetrics.marketImpact.toFixed(4)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>Depth Ratio</Typography>
                        <Typography variant="body2" key={679167}>
                          {liquidityMetrics.depthRatio.toFixed(2)}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>Turnover Rate</Typography>
                        <Typography variant="body2" key={679167}>
                          {formatPercentage(
                            liquidityMetrics.turnoverRate / 100,
                          )}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" key={904131}>
                        <Typography variant="caption" key={472228}>
                          Resilience Score;
                        </Typography>
                        <Typography variant="body2" key={679167}>
                          {liquidityMetrics.resilienceScore.toFixed(2)}
                        </Typography>
                      </Box>
                    </Stack>
                  )}
                </Paper>
              </Grid>
            </Grid>
          )}

          {/* Anomalies Tab */}
          {activeTab === 4 && (
            <Paper sx={{ p: 2 }} key={136663}>
              <Typography variant="h6" gutterBottom key={90207}>
                Market Anomalies;
              </Typography>

              {anomalies.length > 0 ? (
                <Stack spacing={2} key={169333}>
                  {anomalies.map((anomaly, index) => (
                    <Accordion key={index} key={36511}>
                      <AccordionSummary expandIcon={<ExpandMore / key={963648}>}>
                        <Box;
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                         key={499775}>
                          <Typography variant="subtitle1" key={265838}>
                            {anomaly.type}
                          </Typography>
                          <Box display="flex" gap={1} key={999669}>
                            <Chip;
                              label={anomaly.severity}
                              color={
                                anomaly.severity === "high"
                                  ? "error"
                                  : anomaly.severity === "medium"
                                    ? "warning"
                                    : "info"
                              }
                              size="small"
                            / key={259307}>
                            <Chip;
                              label={formatDateTime(anomaly.timestamp)}
                              size="small"
                              variant="outlined"
                            / key={662346}>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails key={487497}>
                        <Grid container spacing={2} key={272161}>
                          <Grid item xs={12} md={8} key={230289}>
                            <Typography variant="body2" gutterBottom key={645732}>
                              <strong key={829099}>Description:</strong>{" "}
                              {anomaly.description}
                            </Typography>
                            <Typography variant="body2" gutterBottom key={645732}>
                              <strong key={829099}>Impact:</strong> {anomaly.impact}
                            </Typography>
                            <Typography variant="body2" key={679167}>
                              <strong key={829099}>Recommendation:</strong>{" "}
                              {anomaly.recommendation}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={4} key={796413}>
                            <Box key={485947}>
                              <Typography variant="caption" key={472228}>
                                Confidence Score;
                              </Typography>
                              <LinearProgress;
                                variant="determinate"
                                value={anomaly.confidence * 100}
                                sx={{ mt: 1, mb: 2 }}
                              / key={179894}>
                              <Typography variant="body2" key={679167}>
                                {formatPercentage(anomaly.confidence)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Stack>
              ) : (
                <Alert severity="success" key={903826}>
                  No market anomalies detected in the current time range.
                </Alert>
              )}
            </Paper>
          )}

          {/* Arbitrage Tab */}
          {activeTab === 5 && (
            <Paper sx={{ p: 2 }} key={136663}>
              <Typography variant="h6" gutterBottom key={90207}>
                Arbitrage Opportunities;
              </Typography>

              {arbitrageOpportunities.length > 0 ? (
                <TableContainer key={611233}>
                  <Table key={889668}>
                    <TableHead key={813147}>
                      <TableRow key={300096}>
                        <TableCell key={942983}>Market</TableCell>
                        <TableCell key={942983}>Bookmaker 1</TableCell>
                        <TableCell key={942983}>Bookmaker 2</TableCell>
                        <TableCell key={942983}>Profit %</TableCell>
                        <TableCell key={942983}>ROI</TableCell>
                        <TableCell key={942983}>Risk Level</TableCell>
                        <TableCell key={942983}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody key={923191}>
                      {arbitrageOpportunities.map((opportunity, index) => (
                        <TableRow key={index} key={177740}>
                          <TableCell key={942983}>{opportunity.market}</TableCell>
                          <TableCell key={942983}>
                            {opportunity.bookmaker1} @ {opportunity.odds1}
                          </TableCell>
                          <TableCell key={942983}>
                            {opportunity.bookmaker2} @ {opportunity.odds2}
                          </TableCell>
                          <TableCell key={942983}>
                            <Typography color="success.main" fontWeight="bold" key={50717}>
                              {formatPercentage(opportunity.profitMargin / 100)}
                            </Typography>
                          </TableCell>
                          <TableCell key={942983}>
                            {formatPercentage(opportunity.roi / 100)}
                          </TableCell>
                          <TableCell key={942983}>
                            <Chip;
                              label={opportunity.riskLevel}
                              color={
                                opportunity.riskLevel === "low"
                                  ? "success"
                                  : opportunity.riskLevel === "medium"
                                    ? "warning"
                                    : "error"
                              }
                              size="small"
                            / key={782300}>
                          </TableCell>
                          <TableCell key={942983}>
                            <Button size="small" variant="outlined" key={990265}>
                              Execute;
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Alert severity="info" key={150543}>
                  No arbitrage opportunities currently available.
                </Alert>
              )}
            </Paper>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketAnalysisDashboard;
