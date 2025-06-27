/**
 * Comprehensive API Test Page;
 * Tests SportsRadar, DailyFantasy, and TheOdds API integrations;
 */

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
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material.ts';
import { ExpandMore, CheckCircle, Error, Warning } from '@mui/icons-material.ts';
import { sportsRadarService } from '@/services/SportsRadarService.ts';
import { dailyFantasyService } from '@/services/dailyFantasyService.ts';
import { theOddsService } from '@/services/TheOddsService.ts';

interface TestResult {
  name: string;
  service: "SportsRadar" | "DailyFantasy" | "TheOdds";
  status: "pending" | "success" | "error";
  data?: any;
  error?: string;
  duration?: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div;
      role="tabpanel"
      hidden={value !== index}
      id={`api-tabpanel-${index}`}
      aria-labelledby={`api-tab-${index}`}
      {...other}
     key={842556}>
      {value === index && <Box sx={{ p: 3 }} key={486541}>{children}</Box>}
    </div>
  );
}

export const APITestPage: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[] key={393269}>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  // Debug: Validate imports;
  React.useEffect(() => {
    // console statement removed
    // console statement removed
    // console statement removed
    // console statement removed
  }, []);

  const updateTestResult = (name: string, result: Partial<TestResult key={466003}>) => {
    setTestResults((prev) =>
      prev.map((test) => (test.name === name ? { ...test, ...result } : test)),
    );
  };

  const addTestResult = (test: TestResult) => {
    setTestResults((prev) => [...prev, test]);
  };

  const runTest = async (
    name: string,
    service: TestResult["service"],
    testFn: () => Promise<any key={295429}>,
  ) => {

    addTestResult({ name, service, status: "pending" });

    try {


      updateTestResult(name, {
        status: "success",
        data,
        duration,
      });
    } catch (error) {

      updateTestResult(name, {
        status: "error",
        error:
          error && typeof error === "object" && "message" in error;
            ? (error as any).message;
            : String(error),
        duration,
      });
    }
  };

  const runSportsRadarTests = async () => {
    // SportsRadar Health Check;
    await runTest("SportsRadar Health Check", "SportsRadar", async () => {
      if (!sportsRadarService?.healthCheck) {
        throw new Error("SportsRadar service not available");
      }
      return await sportsRadarService.healthCheck();
    });

    // NBA Games;
    await runTest("NBA Games Today", "SportsRadar", async () => {
      if (!sportsRadarService?.getNBAGames) {
        throw new Error("SportsRadar getNBAGames not available");
      }
      return await sportsRadarService.getNBAGames();
    });

    // Odds Comparison;
    await runTest("Basketball Odds", "SportsRadar", async () => {
      if (!sportsRadarService?.getOddsComparison) {
        throw new Error("SportsRadar getOddsComparison not available");
      }
      return await sportsRadarService.getOddsComparison("basketball");
    });
  };

  const runDailyFantasyTests = async () => {
    // DailyFantasy Health Check;
    await runTest("DailyFantasy Health Check", "DailyFantasy", async () => {
      if (!dailyFantasyService?.healthCheck) {
        throw new Error("DailyFantasy service not available");
      }
      return await dailyFantasyService.healthCheck();
    });

    // NBA Contests;
    await runTest("NBA Contests", "DailyFantasy", async () => {
      if (!dailyFantasyService?.getContests) {
        throw new Error("DailyFantasy getContests not available");
      }
      return await dailyFantasyService.getContests("nba");
    });

    // Player Projections (example)
    await runTest("Player Projections", "DailyFantasy", async () => {
      if (!dailyFantasyService?.getPlayerProjections) {
        throw new Error("DailyFantasy getPlayerProjections not available");
      }
      return await dailyFantasyService.getPlayerProjections(
        "example-player-id",
      );
    });
  };

  const runTheOddsTests = async () => {
    // TheOdds Health Check;
    await runTest("TheOdds Health Check", "TheOdds", async () => {
      if (!theOddsService?.healthCheck) {
        throw new Error("TheOdds service not available");
      }
      return await theOddsService.healthCheck();
    });

    // Available Sports;
    await runTest("Available Sports", "TheOdds", async () => {
      if (!theOddsService?.getSports) {
        throw new Error("TheOdds getSports not available");
      }
      return await theOddsService.getSports();
    });

    // NBA Odds;
    await runTest("NBA Odds", "TheOdds", async () => {
      if (!theOddsService?.getOdds) {
        throw new Error("TheOdds getOdds not available");
      }
      return await theOddsService.getOdds("basketball_nba");
    });

    // Best Odds Analysis;
    await runTest("Best Odds Analysis", "TheOdds", async () => {
      if (!theOddsService?.getBestOdds) {
        throw new Error("TheOdds getBestOdds not available");
      }
      return await theOddsService.getBestOdds("basketball_nba");
    });
  };

  const runAllTests = async () => {
    try {
      setIsRunning(true);
      setTestResults([]);

      await runSportsRadarTests();
      await runDailyFantasyTests();
      await runTheOddsTests();
    } catch (error) {
      // console statement removed
      addTestResult({
        name: "Test Runner Error",
        service: "SportsRadar",
        status: "error",
        error:
          error && typeof error === "object" && "message" in error;
            ? (error as any).message;
            : String(error),
      });
    } finally {
      setIsRunning(false);
    }
  };

  const clearTests = () => {
    setTestResults([]);
    try {
      sportsRadarService?.clearCache?.();
      dailyFantasyService?.clearCache?.();
      theOddsService?.clearCache?.();
    } catch (error) {
      // console statement removed
    }
  };

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle color="success" / key={521971}>;
      case "error":
        return <Error color="error" / key={755825}>;
      case "pending":
        return <CircularProgress size={20} / key={59647}>;
      default:
        return <Warning color="warning" / key={175532}>;
    }
  };

  const getServiceColor = (service: TestResult["service"]) => {
    switch (service) {
      case "SportsRadar":
        return "primary";
      case "DailyFantasy":
        return "secondary";
      case "TheOdds":
        return "success";
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

  const serviceResults = {
    SportsRadar: testResults.filter((r) => r.service === "SportsRadar"),
    DailyFantasy: testResults.filter((r) => r.service === "DailyFantasy"),
    TheOdds: testResults.filter((r) => r.service === "TheOdds"),
  };

  const getServiceStats = (service: TestResult["service"]) => {





    return { total, success, errors, pending };
  };

  return (
    <Box p={3} key={235922}>
      <Typography variant="h4" gutterBottom key={617057}>
        🧪 API Integration Test Suite;
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }} key={812886}>
        Comprehensive testing of SportsRadar, DailyFantasy, and TheOdds API;
        integrations. Ensure your backend server is running on port 8000.
      </Alert>

      <Box mb={3} key={330107}>
        <Button;
          variant="contained"
          onClick={() = key={53599}> runAllTests()}
          disabled={isRunning}
          sx={{ mr: 2 }}
        >
          {isRunning ? <CircularProgress size={20} / key={59647}> : "🚀 Run All Tests"}
        </Button>
        <Button;
          variant="outlined"
          onClick={() = key={423213}> clearTests()}
          disabled={isRunning}
        >
          🧹 Clear Results;
        </Button>
      </Box>

      {testResults.length > 0 && (
        <>
          {/* Service Summary Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }} key={482082}>
            {(["SportsRadar", "DailyFantasy", "TheOdds"] as const).map(
              (service) => {

                return (
                  <Grid item xs={12} md={4} key={service} key={602474}>
                    <Card key={650115}>
                      <CardContent key={452065}>
                        <Typography variant="h6" gutterBottom key={90207}>
                          {service}
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap" key={958018}>
                          <Chip;
                            label={`${stats.success}/${stats.total} Passed`}
                            color={
                              stats.success === stats.total;
                                ? "success"
                                : "default"
                            }
                            size="small"
                          / key={409737}>
                          {stats.errors > 0 && (
                            <Chip;
                              label={`${stats.errors} Failed`}
                              color="error"
                              size="small"
                            / key={511489}>
                          )}
                          {stats.pending > 0 && (
                            <Chip;
                              label={`${stats.pending} Running`}
                              color="warning"
                              size="small"
                            / key={451548}>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              },
            )}
          </Grid>

          {/* Detailed Results */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }} key={957002}>
            <Tabs;
              value={tabValue}
              onChange={(event, newValue) = key={262208}> {
                if (typeof newValue === "number") {
                  setTabValue(newValue);
                }
              }}
            >
              <Tab label="All Results" / key={438796}>
              <Tab label="SportsRadar" / key={894507}>
              <Tab label="DailyFantasy" / key={228077}>
              <Tab label="TheOdds" / key={753750}>
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0} key={561611}>
            {testResults.map((test, index) => (
              <Accordion key={index} key={36511}>
                <AccordionSummary expandIcon={<ExpandMore / key={963648}>}>
                  <Box display="flex" alignItems="center" gap={2} width="100%" key={242689}>
                    {getStatusIcon(test.status)}
                    <Typography variant="h6" key={93421}>{test.name}</Typography>
                    <Chip;
                      size="small"
                      label={test.service}
                      color={getServiceColor(test.service)}
                    / key={787592}>
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
                      <Typography variant="subtitle2" gutterBottom key={263945}>
                        Success! Data received:
                      </Typography>
                      <Box;
                        component="pre"
                        sx={{
                          fontSize: "12px",
                          overflow: "auto",
                          maxHeight: "300px",
                          background: "#f5f5f5",
                          padding: "16px",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                        }}
                       key={262004}>
                        {formatJson(test.data)}
                      </Box>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </TabPanel>

          {(["SportsRadar", "DailyFantasy", "TheOdds"] as const).map(
            (service, index) => (
              <TabPanel value={tabValue} index={index + 1} key={service} key={99486}>
                {serviceResults[service].map((test, testIndex) => (
                  <Accordion key={testIndex} key={704775}>
                    <AccordionSummary expandIcon={<ExpandMore / key={963648}>}>
                      <Box;
                        display="flex"
                        alignItems="center"
                        gap={2}
                        width="100%"
                       key={646236}>
                        {getStatusIcon(test.status)}
                        <Typography variant="h6" key={93421}>{test.name}</Typography>
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
                          <Typography variant="subtitle2" gutterBottom key={263945}>
                            Success! Data received:
                          </Typography>
                          <Box;
                            component="pre"
                            sx={{
                              fontSize: "12px",
                              overflow: "auto",
                              maxHeight: "300px",
                              background: "#f5f5f5",
                              padding: "16px",
                              borderRadius: "4px",
                              fontFamily: "monospace",
                            }}
                           key={220530}>
                            {formatJson(test.data)}
                          </Box>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </TabPanel>
            ),
          )}
        </>
      )}
    </Box>
  );
};
