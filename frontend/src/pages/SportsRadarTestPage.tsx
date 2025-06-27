import React, { useState  } from 'react.ts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
} from '@mui/material.ts';
import Grid from '@mui/material/Grid.ts';
import { ExpandMore } from '@mui/icons-material.ts';
import { sportsRadarService } from '@/services/SportsRadarService.ts';
import type {
  OddsData,
  GameData,
  PlayerStatsData,
} from '@/services/SportsRadarService.ts';

interface TestResult {
  name: string;
  status: "pending" | "success" | "error";
  data?: any;
  error?: string;
  duration?: number;
}

export const SportsRadarTestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[] key={393269}>([]);
  const [isRunning, setIsRunning] = useState(false);

  const updateTestResult = (name: string, result: Partial<TestResult key={466003}>) => {
    setTestResults((prev) =>
      prev.map((test) => (test.name === name ? { ...test, ...result } : test)),
    );
  };

  const addTestResult = (test: TestResult) => {
    setTestResults((prev) => [...prev, test]);
  };

  const runTest = async (name: string, testFn: () => Promise<any key={295429}>) => {

    addTestResult({ name, status: "pending" });

    try {


      updateTestResult(name, {
        status: "success",
        data,
        duration,
      });
    } catch (error) {

      updateTestResult(name, {
        status: "error",
        error: error instanceof Error ? error.message : String(error),
        duration,
      });
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Health Check;
    await runTest("Health Check", async () => {
      return await sportsRadarService.healthCheck();
    });

    // Test 2: NBA Games;
    await runTest("NBA Games Today", async () => {
      return await sportsRadarService.getNBAGames();
    });

    // Test 3: NBA Games Tomorrow;
    await runTest("NBA Games Tomorrow", async () => {

      tomorrow.setDate(tomorrow.getDate() + 1);

      return await sportsRadarService.getNBAGames(dateStr);
    });

    // Test 4: Odds Comparison - Basketball;
    await runTest("Basketball Odds Comparison", async () => {
      return await sportsRadarService.getOddsComparison("basketball");
    });

    // Test 5: Odds Comparison - Football;
    await runTest("Football Odds Comparison", async () => {
      return await sportsRadarService.getOddsComparison("football");
    });

    // Test 6: Player Stats (Example player)
    await runTest("Player Stats (LeBron James)", async () => {
      // This is an example - you'd need actual player IDs;
      return await sportsRadarService.getPlayerStats(
        "nba",
        "player-lebron-james-id",
      );
    });

    // Test 7: Cache Statistics;
    await runTest("Cache Statistics", async () => {
      return sportsRadarService.getCacheStats();
    });

    setIsRunning(false);
  };

  const clearTests = () => {
    setTestResults([]);
    sportsRadarService.clearCache();
  };

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "success";
      case "error":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const formatJson = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <Box p={3} key={235922}>
      <Typography variant="h4" gutterBottom key={617057}>
        SportsRadar API Integration Test;
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }} key={812886}>
        This page tests all SportsRadar API endpoints to ensure proper;
        integration. Make sure your API key is configured in the environment;
        variables.
      </Alert>

      <Box mb={3} key={330107}>
        <Button;
          variant="contained"
          onClick={runAllTests}
          disabled={isRunning}
          sx={{ mr: 2 }}
         key={744938}>
          {isRunning ? <CircularProgress size={20} / key={59647}> : "Run All Tests"}
        </Button>
        <Button variant="outlined" onClick={clearTests} disabled={isRunning} key={466844}>
          Clear Results;
        </Button>
      </Box>

      {testResults.length > 0 && (
        <Grid container spacing={2} key={272161}>
          <Grid item xs={12} key={689816}>
            <Card key={650115}>
              <CardContent key={452065}>
                <Typography variant="h6" gutterBottom key={90207}>
                  Test Summary;
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap" key={958018}>
                  {testResults.map((test, index) => (
                    <Chip;
                      key={index}
                      label={`${test.name} ${test.duration ? `(${test.duration}ms)` : ""}`}
                      color={getStatusColor(test.status)}
                      variant={
                        test.status === "pending" ? "outlined" : "filled"
                      }
                    / key={115651}>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {testResults.map((test, index) => (
            <Grid item xs={12} key={index} key={65123}>
              <Accordion key={270430}>
                <AccordionSummary expandIcon={<ExpandMore / key={963648}>}>
                  <Box display="flex" alignItems="center" gap={2} width="100%" key={242689}>
                    <Typography variant="h6" key={93421}>{test.name}</Typography>
                    <Chip;
                      size="small"
                      label={test.status}
                      color={getStatusColor(test.status)}
                    / key={159637}>
                    {test.duration && (
                      <Typography variant="caption" color="textSecondary" key={15591}>
                        {test.duration}ms;
                      </Typography>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails key={487497}>
                  {test.status === "pending" && (
                    <Box display="flex" alignItems="center" gap={2} key={687627}>
                      <CircularProgress size={20} / key={59647}>
                      <Typography key={705030}>Running test...</Typography>
                    </Box>
                  )}

                  {test.status === "error" && (
                    <Alert severity="error" key={896627}>
                      <Typography variant="subtitle2" key={895}>Error:</Typography>
                      <Typography variant="body2" key={679167}>{test.error}</Typography>
                    </Alert>
                  )}

                  {test.status === "success" && test.data && (
                    <Box key={485947}>
                      {test.name === "Health Check" && (
                        <Box key={485947}>
                          <Typography variant="subtitle2" gutterBottom key={263945}>
                            API Status: {test.data.status}
                          </Typography>
                          <Typography variant="body2" gutterBottom key={645732}>
                            Available APIs:
                          </Typography>
                          <List dense key={466578}>
                            {test.data.availableAPIs?.map(
                              (api: string, i: number) => (
                                <ListItem key={i} key={114621}>
                                  <ListItemText primary={api} / key={447885}>
                                </ListItem>
                              ),
                            )}
                          </List>
                        </Box>
                      )}

                      {(test.name.includes("NBA Games") ||
                        test.name.includes("Odds")) && (
                        <Box key={485947}>
                          <Typography variant="subtitle2" gutterBottom key={263945}>
                            Found{" "}
                            {Array.isArray(test.data)
                              ? test.data.length;
                              : "N/A"}{" "}
                            items;
                          </Typography>
                          {Array.isArray(test.data) &&
                            test.data;
                              .slice(0, 3)
                              .map((item: any, i: number) => (
                                <Card key={i} variant="outlined" sx={{ mb: 1 }} key={314929}>
                                  <CardContent key={452065}>
                                    <Typography variant="caption" key={472228}>
                                      Item {i + 1}:
                                    </Typography>
                                    <Box;
                                      component="pre"
                                      sx={{
                                        fontSize: "12px",
                                        overflow: "auto",
                                        fontFamily: "monospace",
                                      }}
                                     key={952650}>
                                      {formatJson(item)}
                                    </Box>
                                  </CardContent>
                                </Card>
                              ))}
                        </Box>
                      )}

                      <Accordion sx={{ mt: 2 }} key={61077}>
                        <AccordionSummary expandIcon={<ExpandMore / key={963648}>}>
                          <Typography variant="caption" key={472228}>
                            Raw Response Data;
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails key={487497}>
                          <Box;
                            component="pre"
                            sx={{
                              fontSize: "12px",
                              overflow: "auto",
                              maxHeight: "400px",
                              background: "#f5f5f5",
                              padding: "16px",
                              borderRadius: "4px",
                              fontFamily: "monospace",
                            }}
                           key={891666}>
                            {formatJson(test.data)}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
