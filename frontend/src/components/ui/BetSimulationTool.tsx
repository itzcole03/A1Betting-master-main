import React, { useState, useEffect, useMemo, useCallback  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
} from '@mui/material.ts';
import {
  PlayArrow,
  Stop,
  Refresh,
  TrendingUp,
  TrendingDown,
  Assessment,
  MonetizationOn,
  Warning,
  Info,
  Download,
  Settings,
  Timeline,
} from '@mui/icons-material.ts';
import { useSimulationStore } from '@/store/slices/simulationSlice.ts';
import { confidenceService } from '@/services/analytics/confidenceService.ts';
import { MLSimulationService } from '@/services/MLSimulationService.ts';
import { formatCurrency, formatPercentage } from '@/utils/formatters.ts';

interface SimulationScenario {
  id: string;
  name: string;
  stake: number;
  odds: number;
  eventId: string;
  player: string;
  market: string;
  iterations: number;
  expectedValue?: number;
  riskLevel?: "low" | "medium" | "high";
}

interface SimulationResult {
  scenario: SimulationScenario;
  winProbability: number;
  expectedPayout: number;
  expectedLoss: number;
  expectedValue: number;
  kellyFraction: number;
  roi: number;
  riskAssessment: {
    level: "low" | "medium" | "high";
    factors: string[];
    recommendation: string;
  };
  breakdown: {
    wins: number;
    losses: number;
    totalPayout: number;
    totalLoss: number;
    variance: number;
    sharpeRatio: number;
  };
  confidence: {
    lower: number;
    upper: number;
    interval: number;
  };
}

const predefinedScenarios: SimulationScenario[] = [
  {
    id: "conservative",
    name: "Conservative Play",
    stake: 50,
    odds: 1.8,
    eventId: "NBA-LAL-BOS-2024",
    player: "LeBron James",
    market: "points",
    iterations: 1000,
    riskLevel: "low",
  },
  {
    id: "moderate",
    name: "Moderate Risk",
    stake: 100,
    odds: 2.2,
    eventId: "NBA-GSW-LAC-2024",
    player: "Stephen Curry",
    market: "threePointers",
    iterations: 1000,
    riskLevel: "medium",
  },
  {
    id: "aggressive",
    name: "High Risk/Reward",
    stake: 200,
    odds: 3.5,
    eventId: "NBA-MIA-DEN-2024",
    player: "Nikola Jokic",
    market: "rebounds",
    iterations: 1000,
    riskLevel: "high",
  },
];

export const BetSimulationTool: React.FC = () => {
  // State Management;
  const [activeTab, setActiveTab] = useState<"single" | "batch" | "comparison">(
    "single",
  );
  const [scenario, setScenario] = useState<SimulationScenario key={943730}>(
    predefinedScenarios[0],
  );
  const [scenarios, setScenarios] = useState<SimulationScenario[] key={326727}>([]);
  const [results, setResults] = useState<SimulationResult[] key={60050}>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [realTimeMode, setRealTimeMode] = useState(false);

  // Store Integration;




  // Computed Values;
  const currentResult = useMemo(() => {
    return results.find((r) => r.scenario.id === scenario.id);
  }, [results, scenario.id]);

  // Simulation Logic;
  const runSingleSimulation = useCallback(
    async (simScenario: SimulationScenario): Promise<SimulationResult key={961285}> => {
      const prediction = confidenceService.getPredictionWithConfidence(
        simScenario.eventId,
        simScenario.player,
        simScenario.market,
      );

      const simInput = {
        stake: simScenario.stake,
        odds: simScenario.odds,
        confidenceBand: prediction.confidenceBand,
        winProbability: prediction.winProbability,
        iterations: simScenario.iterations,
      };

      setInput(simInput);

      // Enhanced simulation with Monte Carlo analysis;
      const wins = 0;
      const totalPayout = 0;
      const totalLoss = 0;
      const outcomes: number[] = [];

      for (const i = 0; i < simScenario.iterations; i++) {

        if (randomValue <= prediction.winProbability) {
          wins++;

          totalPayout += payout;
          outcomes.push(payout);
        } else {
          totalLoss += simScenario.stake;
          outcomes.push(-simScenario.stake);
        }
      }




      // Kelly Criterion calculation;



      // ROI calculation;

      // Risk assessment;
      const riskLevel =
        kellyFraction > 0.25 ? "high" : kellyFraction > 0.1 ? "medium" : "low";

      if (simScenario.odds > 3.0)
        riskFactors.push("High odds indicate lower probability");
      if (kellyFraction < 0) riskFactors.push("Negative expected value");
      if (prediction.confidenceBand.lower < 0.6)
        riskFactors.push("Low prediction confidence");

      // Statistical calculations;

      const variance =
        outcomes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
        outcomes.length;


      // Confidence interval (95%)
      const confidenceInterval =
        1.96 * (standardDev / Math.sqrt(simScenario.iterations));

      const result: SimulationResult = {
        scenario: simScenario,
        winProbability: prediction.winProbability,
        expectedPayout,
        expectedLoss,
        expectedValue,
        kellyFraction: Math.max(0, kellyFraction),
        roi,
        riskAssessment: {
          level: riskLevel,
          factors: riskFactors,
          recommendation:
            kellyFraction > 0;
              ? kellyFraction > 0.25;
                ? "Reduce stake size"
                : "Proceed with caution"
              : "Avoid this bet",
        },
        breakdown: {
          wins,
          losses,
          totalPayout,
          totalLoss,
          variance,
          sharpeRatio,
        },
        confidence: {
          lower: mean - confidenceInterval,
          upper: mean + confidenceInterval,
          interval: 95,
        },
      };

      setStoreResult(result);
      return result;
    },
    [setInput, setStoreResult],
  );

  // Event Handlers;
  const handleSingleSimulation = async () => {
    setIsSimulating(true);
    try {

      setResults((prev) => {

        return [...filtered, result];
      });
    } catch (error) {
      // console statement removed
    } finally {
      setIsSimulating(false);
    }
  };

  const handleBatchSimulation = async () => {
    if (scenarios.length === 0) return;

    setIsSimulating(true);
    try {
      const batchResults: SimulationResult[] = [];
      for (const scenario of scenarios) {

        batchResults.push(result);
      }
      setResults(batchResults);
    } catch (error) {
      // console statement removed
    } finally {
      setIsSimulating(false);
    }
  };

  const addScenario = () => {
    const newScenario: SimulationScenario = {
      ...scenario,
      id: `custom_${Date.now()}`,
      name: `Scenario ${scenarios.length + 1}`,
    };
    setScenarios((prev) => [...prev, newScenario]);
  };

  const removeScenario = (id: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
    setResults((prev) => prev.filter((r) => r.scenario.id !== id));
  };

  const exportResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      scenarios: scenarios.length || 1,
      results: results.map((r) => ({
        scenario: r.scenario.name,
        expectedValue: r.expectedValue,
        roi: r.roi,
        winProbability: r.winProbability,
        riskLevel: r.riskAssessment.level,
        recommendation: r.riskAssessment.recommendation,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });


    a.href = url;
    a.download = `bet-simulation-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Real-time updates;
  useEffect(() => {
    if (!realTimeMode) return;

    const interval = setInterval(async () => {
      if (!isSimulating && scenario) {
        await handleSingleSimulation();
      }
    }, 30000); // Update every 30 seconds;

    return () => clearInterval(interval);
  }, [realTimeMode, isSimulating, scenario, handleSingleSimulation]);

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
              Advanced Bet Simulation Tool;
            </Typography>
            <Box display="flex" gap={1} key={999669}>
              <FormControlLabel;
                control={
                  <Switch;
                    checked={realTimeMode}
                    onChange={(e) = key={757752}> setRealTimeMode(e.target.checked)}
                  />
                }
                label="Real-time"
              />
              <IconButton;
                onClick={exportResults}
                disabled={results.length === 0}
               key={298218}>
                <Download / key={173972}>
              </IconButton>
              <IconButton onClick={() = key={588613}> setShowAdvanced(!showAdvanced)}>
                <Settings / key={834927}>
              </IconButton>
            </Box>
          </Box>

          {/* Tab Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }} key={395613}>
            <Stack direction="row" spacing={2} key={926315}>
              {["single", "batch", "comparison"].map((tab) => (
                <Button;
                  key={tab}
                  variant={activeTab === tab ? "contained" : "outlined"}
                  onClick={() = key={310452}> setActiveTab(tab as any)}
                  sx={{ textTransform: "capitalize" }}
                >
                  {tab} Simulation;
                </Button>
              ))}
            </Stack>
          </Box>

          {/* Single Simulation Tab */}
          {activeTab === "single" && (
            <Grid container spacing={3} key={459826}>
              <Grid item xs={12} md={6} key={637329}>
                <Paper sx={{ p: 2 }} key={136663}>
                  <Typography variant="h6" gutterBottom key={90207}>
                    Simulation Parameters;
                  </Typography>

                  <Grid container spacing={2} key={272161}>
                    <Grid item xs={6} key={823052}>
                      <TextField;
                        fullWidth;
                        label="Stake ($)"
                        type="number"
                        value={scenario.stake}
                        onChange={(e) = key={830063}>
                          setScenario((prev) => ({
                            ...prev,
                            stake: Number(e.target.value),
                          }))
                        }
                        inputProps={{ min: 1 }}
                      />
                    </Grid>
                    <Grid item xs={6} key={823052}>
                      <TextField;
                        fullWidth;
                        label="Odds"
                        type="number"
                        value={scenario.odds}
                        onChange={(e) = key={254255}>
                          setScenario((prev) => ({
                            ...prev,
                            odds: Number(e.target.value),
                          }))
                        }
                        inputProps={{ min: 1.01, step: 0.01 }}
                      />
                    </Grid>
                    <Grid item xs={12} key={689816}>
                      <TextField;
                        fullWidth;
                        label="Event ID"
                        value={scenario.eventId}
                        onChange={(e) = key={380184}>
                          setScenario((prev) => ({
                            ...prev,
                            eventId: e.target.value,
                          }))
                        }
                      />
                    </Grid>
                    <Grid item xs={6} key={823052}>
                      <TextField;
                        fullWidth;
                        label="Player"
                        value={scenario.player}
                        onChange={(e) = key={334233}>
                          setScenario((prev) => ({
                            ...prev,
                            player: e.target.value,
                          }))
                        }
                      />
                    </Grid>
                    <Grid item xs={6} key={823052}>
                      <FormControl fullWidth key={113575}>
                        <InputLabel key={405232}>Market</InputLabel>
                        <Select;
                          value={scenario.market}
                          onChange={(e) = key={993786}>
                            setScenario((prev) => ({
                              ...prev,
                              market: e.target.value,
                            }))
                          }
                        >
                          <MenuItem value="points" key={179845}>Points</MenuItem>
                          <MenuItem value="rebounds" key={402571}>Rebounds</MenuItem>
                          <MenuItem value="assists" key={732125}>Assists</MenuItem>
                          <MenuItem value="threePointers" key={499686}>
                            Three Pointers;
                          </MenuItem>
                          <MenuItem value="steals" key={161272}>Steals</MenuItem>
                          <MenuItem value="blocks" key={387234}>Blocks</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {showAdvanced && (
                      <Grid item xs={12} key={689816}>
                        <TextField;
                          fullWidth;
                          label="Simulation Iterations"
                          type="number"
                          value={scenario.iterations}
                          onChange={(e) = key={402027}>
                            setScenario((prev) => ({
                              ...prev,
                              iterations: Number(e.target.value),
                            }))
                          }
                          inputProps={{ min: 100, max: 100000, step: 100 }}
                        />
                      </Grid>
                    )}
                  </Grid>

                  <Box mt={2} key={781906}>
                    <Button;
                      variant="contained"
                      onClick={handleSingleSimulation}
                      disabled={isSimulating}
                      startIcon={
                        isSimulating ? (
                          <LinearProgress sx={{ width: 20 }} / key={953060}>
                        ) : (
                          <PlayArrow / key={629440}>
                        )
                      }
                      fullWidth;
                      size="large"
                    >
                      {isSimulating ? "Simulating..." : "Run Simulation"}
                    </Button>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} key={637329}>
                {currentResult && (
                  <motion.div;
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                   key={406736}>
                    <Paper sx={{ p: 2 }} key={136663}>
                      <Typography variant="h6" gutterBottom key={90207}>
                        Simulation Results;
                      </Typography>

                      <Stack spacing={2} key={169333}>
                        <Box key={485947}>
                          <Typography variant="subtitle2" color="textSecondary" key={270974}>
                            Expected Value;
                          </Typography>
                          <Typography;
                            variant="h4"
                            color={
                              currentResult.expectedValue  key={149147}>= 0;
                                ? "success.main"
                                : "error.main"
                            }
                          >
                            {formatCurrency(currentResult.expectedValue)}
                          </Typography>
                        </Box>

                        <Grid container spacing={2} key={272161}>
                          <Grid item xs={6} key={823052}>
                            <Box textAlign="center" key={525553}>
                              <Typography;
                                variant="subtitle2"
                                color="textSecondary"
                               key={955481}>
                                Win Probability;
                              </Typography>
                              <Typography variant="h6" key={93421}>
                                {formatPercentage(currentResult.winProbability)}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6} key={823052}>
                            <Box textAlign="center" key={525553}>
                              <Typography;
                                variant="subtitle2"
                                color="textSecondary"
                               key={955481}>
                                ROI;
                              </Typography>
                              <Typography;
                                variant="h6"
                                color={
                                  currentResult.roi  key={247246}>= 0;
                                    ? "success.main"
                                    : "error.main"
                                }
                              >
                                {formatPercentage(currentResult.roi / 100)}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Divider / key={11977}>

                        <Box key={485947}>
                          <Typography variant="subtitle2" gutterBottom key={263945}>
                            Risk Assessment;
                          </Typography>
                          <Chip;
                            label={currentResult.riskAssessment.level.toUpperCase()}
                            color={
                              currentResult.riskAssessment.level === "low"
                                ? "success"
                                : currentResult.riskAssessment.level ===
                                    "medium"
                                  ? "warning"
                                  : "error"
                            }
                            icon={
                              currentResult.riskAssessment.level === "low" ? (
                                <TrendingUp / key={547059}>
                              ) : currentResult.riskAssessment.level ===
                                "medium" ? (
                                <Warning / key={730258}>
                              ) : (
                                <TrendingDown / key={199645}>
                              )
                            }
                          />
                          <Typography variant="body2" sx={{ mt: 1 }} key={111636}>
                            {currentResult.riskAssessment.recommendation}
                          </Typography>
                        </Box>

                        {currentResult.riskAssessment.factors.length > 0 && (
                          <Alert severity="warning" icon={<Warning / key={187334}>}>
                            <Typography variant="subtitle2" key={895}>
                              Risk Factors:
                            </Typography>
                            <ul style={{ margin: 0, paddingLeft: 16 }} key={459208}>
                              {currentResult.riskAssessment.factors.map(
                                (factor, index) => (
                                  <li key={index} key={760236}>{factor}</li>
                                ),
                              )}
                            </ul>
                          </Alert>
                        )}

                        {showAdvanced && (
                          <>
                            <Divider / key={11977}>
                            <Box key={485947}>
                              <Typography variant="subtitle2" gutterBottom key={263945}>
                                Advanced Metrics;
                              </Typography>
                              <Grid container spacing={1} key={154616}>
                                <Grid item xs={6} key={823052}>
                                  <Typography variant="caption" key={472228}>
                                    Kelly Fraction;
                                  </Typography>
                                  <Typography variant="body2" key={679167}>
                                    {formatPercentage(
                                      currentResult.kellyFraction,
                                    )}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} key={823052}>
                                  <Typography variant="caption" key={472228}>
                                    Sharpe Ratio;
                                  </Typography>
                                  <Typography variant="body2" key={679167}>
                                    {currentResult.breakdown.sharpeRatio.toFixed(
                                      3,
                                    )}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} key={823052}>
                                  <Typography variant="caption" key={472228}>
                                    Confidence (95%)
                                  </Typography>
                                  <Typography variant="body2" key={679167}>
                                    {formatCurrency(
                                      currentResult.confidence.lower,
                                    )}{" "}
                                    -{" "}
                                    {formatCurrency(
                                      currentResult.confidence.upper,
                                    )}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} key={823052}>
                                  <Typography variant="caption" key={472228}>
                                    Variance;
                                  </Typography>
                                  <Typography variant="body2" key={679167}>
                                    {currentResult.breakdown.variance.toFixed(
                                      2,
                                    )}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </>
                        )}
                      </Stack>
                    </Paper>
                  </motion.div>
                )}
              </Grid>
            </Grid>
          )}

          {/* Batch Simulation Tab */}
          {activeTab === "batch" && (
            <Box key={485947}>
              <Box;
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
               key={236574}>
                <Typography variant="h6" key={93421}>Batch Simulation</Typography>
                <Box key={485947}>
                  <Button;
                    onClick={addScenario}
                    variant="outlined"
                    sx={{ mr: 1 }}
                   key={100010}>
                    Add Scenario;
                  </Button>
                  <Button;
                    onClick={handleBatchSimulation}
                    variant="contained"
                    disabled={scenarios.length === 0 || isSimulating}
                    startIcon={
                      isSimulating ? (
                        <LinearProgress sx={{ width: 20 }} / key={609872}>
                      ) : (
                        <PlayArrow / key={629440}>
                      )
                    }
                  >
                    Run Batch;
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={2} key={272161}>
                {scenarios.map((scenario, index) => (
                  <Grid item xs={12} md={6} key={scenario.id} key={452511}>
                    <Paper sx={{ p: 2 }} key={136663}>
                      <Box;
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                       key={657407}>
                        <Typography variant="subtitle1" key={265838}>
                          {scenario.name}
                        </Typography>
                        <Button;
                          size="small"
                          onClick={() = key={130273}> removeScenario(scenario.id)}
                        >
                          Remove;
                        </Button>
                      </Box>
                      <Typography variant="body2" key={679167}>
                        ${scenario.stake} @ {scenario.odds} odds -{" "}
                        {scenario.player} {scenario.market}
                      </Typography>
                      {results.find((r) => r.scenario.id === scenario.id) && (
                        <Box mt={1} key={51953}>
                          <Chip;
                            size="small"
                            label={`EV: ${formatCurrency(results.find((r) = key={933380}> r.scenario.id === scenario.id)!.expectedValue)}`}
                            color={
                              results.find(
                                (r) => r.scenario.id === scenario.id,
                              )!.expectedValue >= 0;
                                ? "success"
                                : "error"
                            }
                          />
                        </Box>
                      )}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              {scenarios.length === 0 && (
                <Alert severity="info" key={150543}>
                  Add scenarios to run batch simulations. You can start with;
                  predefined scenarios or create custom ones.
                </Alert>
              )}
            </Box>
          )}

          {/* Comparison Tab */}
          {activeTab === "comparison" && (
            <Box key={485947}>
              <Typography variant="h6" gutterBottom key={90207}>
                Simulation Comparison;
              </Typography>
              {results.length > 0 ? (
                <Grid container spacing={2} key={272161}>
                  {results.map((result) => (
                    <Grid item xs={12} md={4} key={result.scenario.id} key={553366}>
                      <Paper sx={{ p: 2 }} key={136663}>
                        <Typography variant="subtitle1" gutterBottom key={9738}>
                          {result.scenario.name}
                        </Typography>
                        <Stack spacing={1} key={41946}>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>
                              Expected Value;
                            </Typography>
                            <Typography;
                              variant="body2"
                              color={
                                result.expectedValue  key={319995}>= 0;
                                  ? "success.main"
                                  : "error.main"
                              }
                            >
                              {formatCurrency(result.expectedValue)}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>ROI</Typography>
                            <Typography variant="body2" key={679167}>
                              {formatPercentage(result.roi / 100)}
                            </Typography>
                          </Box>
                          <Box display="flex" justifyContent="space-between" key={904131}>
                            <Typography variant="caption" key={472228}>
                              Risk Level;
                            </Typography>
                            <Chip;
                              size="small"
                              label={result.riskAssessment.level}
                              color={
                                result.riskAssessment.level === "low"
                                  ? "success"
                                  : result.riskAssessment.level === "medium"
                                    ? "warning"
                                    : "error"
                              }
                            / key={285748}>
                          </Box>
                        </Stack>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Alert severity="info" key={150543}>
                  Run simulations to compare results. Switch to Single or Batch;
                  tabs to create simulations.
                </Alert>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
