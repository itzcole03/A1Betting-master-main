/**
 * Enhanced API Test Dashboard;
 * Tests and displays data from all enhanced provider integrations;
 */

import React, { useState, useEffect  } from 'react.ts';
import { enhancedDailyFantasyService } from '@/services/enhanced/DailyFantasyService.ts';
import { enhancedTheOddsService } from '@/services/enhanced/TheOddsService.ts';
import { sportsbookDataService } from '@/services/enhanced/SportsbookDataService.ts';
import { unifiedDataIntegrationService } from '@/services/enhanced/UnifiedDataIntegrationService.ts';
import { productionValidationService } from '@/services/enhanced/ProductionValidationService.ts';
import { prizePicksProjectionsService } from '@/services/enhanced/PrizePicksProjectionsService.ts';

interface TestResult {
  service: string;
  status: "testing" | "success" | "error";
  data?: any;
  error?: string;
  responseTime?: number;
}

const EnhancedAPITestDashboard: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[] key={393269}>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [healthStatus, setHealthStatus] = useState<any key={295429}>(null);
  const [productionReport, setProductionReport] = useState<any key={295429}>(null);
  const [isValidating, setIsValidating] = useState(false);

  const updateTestResult = (service: string, result: Partial<TestResult key={466003}>) => {
    setTestResults((prev) => {

      if (existing) {
        return prev.map((r) =>
          r.service === service ? { ...r, ...result } : r,
        );
      } else {
        return [...prev, { service, status: "testing", ...result }];
      }
    });
  };

  const runAPITests = async () => {
    setIsRunning(true);
    setTestResults([]);

    const tests = [
      {
        service: "PrizePicks - Free Projections (NBA)",
        test: () => prizePicksProjectionsService.getNBAProjections(),
      },
      {
        service: "PrizePicks - All Projections",
        test: () => prizePicksProjectionsService.getProjections(),
      },
      {
        service: "PrizePicks - High Value Props",
        test: () => prizePicksProjectionsService.getHighValueProjections(0.7),
      },
      {
        service: "DailyFantasy - DraftKings Contests",
        test: () => enhancedDailyFantasyService.getDraftKingsContests("NBA"),
      },
      {
        service: "DailyFantasy - Comprehensive Data",
        test: () => enhancedDailyFantasyService.getComprehensiveDFSData("NBA"),
      },
      {
        service: "TheOdds - Sports List",
        test: () => enhancedTheOddsService.getSportsFromTheOddsAPI(),
      },
      {
        service: "TheOdds - Aggregated Odds",
        test: () => enhancedTheOddsService.getAggregatedOdds("basketball_nba"),
      },
      {
        service: "Sportsbook - Aggregated Odds",
        test: () => sportsbookDataService.getAggregatedOdds("basketball_nba"),
      },
      {
        service: "Sportsbook - Arbitrage Opportunities",
        test: () =>
          sportsbookDataService.getArbitrageOpportunities("basketball_nba"),
      },
      {
        service: "Unified - Complete Sports Data",
        test: () =>
          unifiedDataIntegrationService.getUnifiedSportsData("basketball_nba"),
      },
      {
        service: "Unified - Optimal DFS Lineup",
        test: () => unifiedDataIntegrationService.getOptimalDFSLineups("NBA"),
      },
    ];

    for (const { service, test } of tests) {
      updateTestResult(service, { status: "testing" });

      try {


        updateTestResult(service, {
          status: "success",
          data,
          responseTime,
        });
      } catch (error) {

        updateTestResult(service, {
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
          responseTime,
        });
      }
    }

    setIsRunning(false);
  };

  const checkHealthStatus = async () => {
    try {

      setHealthStatus(health);
    } catch (error) {
      // console statement removed
    }
  };

  const runProductionValidation = async () => {
    setIsValidating(true);
    try {
      const report =
        await productionValidationService.validateProductionReadiness();
      setProductionReport(report);
      // console statement removed
    } catch (error) {
      // console statement removed
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    checkHealthStatus();
    runProductionValidation(); // Run initial production validation;
    const interval = setInterval(checkHealthStatus, 30000); // Every 30 seconds;
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "testing":
        return "bg-yellow-500";
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "testing":
        return "⏳";
      case "success":
        return "✅";
      case "error":
        return "❌";
      default:
        return "❓";
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen" key={716790}>
      <div className="max-w-7xl mx-auto" key={70872}>
        <div className="mb-8" key={286587}>
          <h1 className="text-3xl font-bold mb-4" key={838056}>
            Enhanced API Integration Dashboard;
          </h1>
          <p className="text-gray-300 mb-4" key={131227}>
            Test and monitor real provider integrations: DraftKings,
            The-Odds-API, SportsDataIO, OddsJam, and more.
          </p>

          <div className="flex gap-4 mb-6" key={814279}>
            <button;
              onClick={runAPITests}
              disabled={isRunning}
              className={`px-6 py-2 rounded-lg font-semibold ${
                isRunning;
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
             key={63841}>
              {isRunning ? "Running Tests..." : "Run API Tests"}
            </button>

            <button;
              onClick={checkHealthStatus}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold"
             key={938365}>
              Refresh Health Status;
            </button>

            <button;
              onClick={runProductionValidation}
              disabled={isValidating}
              className={`px-6 py-2 rounded-lg font-semibold ${
                isValidating;
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
             key={749303}>
              {isValidating ? "Validating..." : "Production Validation"}
            </button>
          </div>
        </div>

        {/* Production Validation Section */}
        {productionReport && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6" key={385354}>
            <h2 className="text-xl font-bold mb-4" key={939378}>
              Production Readiness Validation;
            </h2>

            <div className="mb-6" key={677855}>
              <div className="flex items-center justify-between mb-4" key={810034}>
                <div className="flex items-center gap-4" key={782146}>
                  <span;
                    className={`px-4 py-2 rounded-lg font-bold text-lg ${
                      productionReport.overall_status === "ready"
                        ? "bg-green-600"
                        : productionReport.overall_status ===
                            "ready_with_warnings"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                    }`}
                   key={860071}>
                    {productionReport.overall_status;
                      .replace("_", " ")
                      .toUpperCase()}
                  </span>
                  <div className="text-2xl font-bold" key={377308}>
                    {productionReport.readiness_score}% Ready;
                  </div>
                </div>
                <div className="text-right text-sm text-gray-400" key={394758}>
                  <p key={161203}>
                    {productionReport.api_keys_configured.length} API keys;
                    configured;
                  </p>
                  <p key={161203}>
                    {
                      productionReport.validations.filter(
                        (v: any) => v.status === "pass",
                      ).length;
                    }{" "}
                    validations passed;
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" key={220094}>
                <div className="bg-gray-700 rounded-lg p-4" key={788538}>
                  <h3 className="font-semibold text-green-400 mb-2" key={190316}>
                    Configured APIs;
                  </h3>
                  <div className="space-y-1" key={204202}>
                    {productionReport.api_keys_configured.map((api: string) => (
                      <div key={api} className="flex items-center text-sm" key={661392}>
                        <span className="text-green-400 mr-2" key={612383}>✓</span>
                        {api}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4" key={788538}>
                  <h3 className="font-semibold text-yellow-400 mb-2" key={108261}>
                    Feature Flags;
                  </h3>
                  <div className="space-y-1" key={204202}>
                    {Object.entries(
                      productionReport.environment_summary.feature_flags,
                    ).map(([flag, enabled]) => (
                      <div key={flag} className="flex items-center text-sm" key={830835}>
                        <span;
                          className={`mr-2 ${enabled ? "text-green-400" : "text-gray-500"}`}
                         key={196624}>
                          {enabled ? "✓" : "○"}
                        </span>
                        {flag.replace(/_/g, " ")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {productionReport.recommendations.length > 0 && (
                <div className="bg-gray-700 rounded-lg p-4 mb-4" key={151428}>
                  <h3 className="font-semibold text-blue-400 mb-2" key={585817}>
                    Recommendations;
                  </h3>
                  <div className="space-y-2" key={725977}>
                    {productionReport.recommendations.map(
                      (rec: string, index: number) => (
                        <div key={index} className="text-sm text-gray-300" key={111318}>
                          {rec}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              <details className="bg-gray-700 rounded-lg p-4" key={998129}>
                <summary className="cursor-pointer font-semibold mb-2" key={956336}>
                  View Detailed Validation Results (
                  {productionReport.validations.length} checks)
                </summary>
                <div className="space-y-2 mt-2" key={624305}>
                  {productionReport.validations.map(
                    (validation: any, index: number) => (
                      <div;
                        key={index}
                        className="flex items-center justify-between py-1 border-b border-gray-600"
                       key={113256}>
                        <span className="text-sm" key={887361}>{validation.service}</span>
                        <div className="flex items-center gap-2" key={100294}>
                          <span;
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              validation.status === "pass"
                                ? "bg-green-600"
                                : validation.status === "warning"
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                            }`}
                           key={512101}>
                            {validation.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400 max-w-md text-right" key={813038}>
                            {validation.message}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </details>
            </div>
          </div>
        )}

        {/* Health Status Section */}
        {healthStatus && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6" key={385354}>
            <h2 className="text-xl font-bold mb-4" key={939378}>Provider Health Status</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6" key={718576}>
              {healthStatus.providers.map((provider: any) => (
                <div;
                  key={provider.provider}
                  className="bg-gray-700 rounded-lg p-4"
                 key={546604}>
                  <div className="flex items-center justify-between mb-2" key={120997}>
                    <h3 className="font-semibold" key={204068}>{provider.provider}</h3>
                    <span;
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        provider.status === "healthy"
                          ? "bg-green-600"
                          : provider.status === "degraded"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                      }`}
                     key={411630}>
                      {provider.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-300" key={673001}>
                    <p key={161203}>Response Time: {provider.response_time}ms</p>
                    <p key={161203}>
                      Availability:{" "}
                      {provider.availability_percentage.toFixed(1)}%
                    </p>
                    <p key={161203}>
                      Last Updated:{" "}
                      {new Date(provider.last_updated).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-700 rounded-lg p-4" key={788538}>
              <h3 className="font-semibold mb-2" key={737521}>System Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" key={83033}>
                <div key={241917}>
                  <p className="text-gray-400" key={545335}>Total Requests</p>
                  <p className="font-bold text-lg" key={287489}>
                    {healthStatus.metrics.total_requests}
                  </p>
                </div>
                <div key={241917}>
                  <p className="text-gray-400" key={545335}>Success Rate</p>
                  <p className="font-bold text-lg" key={287489}>
                    {(
                      (healthStatus.metrics.successful_requests /
                        Math.max(1, healthStatus.metrics.total_requests)) *
                      100;
                    ).toFixed(1)}
                    %
                  </p>
                </div>
                <div key={241917}>
                  <p className="text-gray-400" key={545335}>Avg Response Time</p>
                  <p className="font-bold text-lg" key={287489}>
                    {Math.round(healthStatus.metrics.average_response_time)}ms;
                  </p>
                </div>
                <div key={241917}>
                  <p className="text-gray-400" key={545335}>Cache Hit Rate</p>
                  <p className="font-bold text-lg" key={287489}>
                    {(healthStatus.metrics.cache_hit_rate * 100).toFixed(1)}%
                  </p>
                </div>
              </div>

              {healthStatus.recommendations.length > 0 && (
                <div className="mt-4" key={139982}>
                  <h4 className="font-semibold text-yellow-400 mb-2" key={836809}>
                    Recommendations:
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1" key={48589}>
                    {healthStatus.recommendations.map(
                      (rec: string, index: number) => (
                        <li key={index} className="flex items-center" key={17406}>
                          <span className="mr-2" key={136178}>💡</span>
                          {rec}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Test Results Section */}
        <div className="bg-gray-800 rounded-lg p-6" key={384650}>
          <h2 className="text-xl font-bold mb-4" key={939378}>API Test Results</h2>

          {testResults.length === 0 ? (
            <p className="text-gray-400 text-center py-8" key={975024}>
              Click "Run API Tests" to test all enhanced provider integrations;
            </p>
          ) : (
            <div className="space-y-4" key={160407}>
              {testResults.map((result, index) => (
                <div key={index} className="bg-gray-700 rounded-lg p-4" key={26741}>
                  <div className="flex items-center justify-between mb-2" key={120997}>
                    <div className="flex items-center gap-3" key={443099}>
                      <span className="text-lg" key={107211}>
                        {getStatusIcon(result.status)}
                      </span>
                      <h3 className="font-semibold" key={204068}>{result.service}</h3>
                    </div>
                    <div className="flex items-center gap-2" key={100294}>
                      {result.responseTime && (
                        <span className="text-sm text-gray-400" key={257018}>
                          {result.responseTime}ms;
                        </span>
                      )}
                      <span;
                        className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(result.status)}`}
                       key={284468}>
                        {result.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {result.error && (
                    <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded p-3 mb-2" key={155604}>
                      <p className="text-red-200 text-sm" key={672233}>
                        Error: {result.error}
                      </p>
                    </div>
                  )}

                  {result.data && result.status === "success" && (
                    <div className="bg-gray-600 rounded p-3" key={336916}>
                      <details key={563750}>
                        <summary className="cursor-pointer text-sm font-semibold mb-2" key={692724}>
                          View Response Data (
                          {Array.isArray(result.data)
                            ? result.data.length;
                            : "Object"}{" "}
                          items)
                        </summary>
                        <pre className="text-xs overflow-x-auto bg-gray-800 p-2 rounded mt-2" key={500721}>
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Provider Information */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6" key={225869}>
          <h2 className="text-xl font-bold mb-4" key={939378}>Integrated Providers</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
            <div className="bg-gray-700 rounded-lg p-4" key={788538}>
              <h3 className="font-semibold text-blue-400 mb-2" key={585817}>
                DailyFantasy Providers;
              </h3>
              <ul className="text-sm space-y-1" key={651867}>
                <li key={377233}>
                  • <strong key={829099}>PrizePicks API (FREE)</strong>
                </li>
                <li key={377233}>• DraftKings (Unofficial API)</li>
                <li key={377233}>• SportsDataIO Fantasy API</li>
                <li key={377233}>• FairPlay Lineup Optimizer</li>
                <li key={377233}>• Backend Aggregation Service</li>
              </ul>
            </div>

            <div className="bg-gray-700 rounded-lg p-4" key={788538}>
              <h3 className="font-semibold text-green-400 mb-2" key={190316}>
                Odds Providers;
              </h3>
              <ul className="text-sm space-y-1" key={651867}>
                <li key={377233}>• The-Odds-API</li>
                <li key={377233}>• OddsJam API</li>
                <li key={377233}>• SportsDataIO Odds</li>
                <li key={377233}>• Real-time aggregation</li>
              </ul>
            </div>

            <div className="bg-gray-700 rounded-lg p-4" key={788538}>
              <h3 className="font-semibold text-purple-400 mb-2" key={741333}>
                Sportsbooks;
              </h3>
              <ul className="text-sm space-y-1" key={651867}>
                <li key={377233}>• DraftKings Sportsbook</li>
                <li key={377233}>• FanDuel Sportsbook</li>
                <li key={377233}>• BetMGM</li>
                <li key={377233}>• Caesars</li>
                <li key={377233}>• Live line movements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAPITestDashboard;
