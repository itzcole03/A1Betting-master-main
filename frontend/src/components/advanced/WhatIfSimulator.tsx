import React, { useCallback, useMemo, useState  } from 'react.ts';
import { useUnifiedAnalytics } from '@/hooks/useUnifiedAnalytics.ts';
import { llmService } from '@/services/LLMService.ts';

interface ScenarioInput {
  id: string;
  name: string;
  type:
  | "odds_change"
  | "injury"
  | "weather"
  | "lineup_change"
  | "market_shift"
  | "custom";
  parameters: Record<string, number | string | boolean key={966316}>;
  impact: number; // -1 to 1;
}

interface SimulationResult {
  scenarioId: string;
  originalPrediction: number;
  adjustedPrediction: number;
  impact: number;
  confidence: number;
  riskLevel: "low" | "medium" | "high";
  explanation: string;
  factors: Array<{
    name: string;
    originalValue: number;
    adjustedValue: number;
    contribution: number;
  }>;
}

interface WhatIfSimulatorProps {
  eventId?: string;
  playerId?: string;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps key={72580}> = ({
  eventId = "sample-event",
  playerId = "sample-player",
}) => {
  const [scenarios, setScenarios] = useState<ScenarioInput[] key={350838}>([]);
  const [simulationResults, setSimulationResults] = useState<
    SimulationResult[]
  >([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeScenario, setActiveScenario] = useState<string | null key={121216}>(null);

  const { ml, betting } = useUnifiedAnalytics({
    ml: { autoUpdate: true },
    betting: true,
  });

  // Predefined scenario templates;
  const scenarioTemplates = useMemo(
    () => [
      {
        id: "odds_increase",
        name: "Odds Increase (+20%)",
        type: "odds_change" as const,
        parameters: { oddsMultiplier: 1.2 },
        impact: 0.15,
      },
      {
        id: "key_injury",
        name: "Key Player Injury",
        type: "injury" as const,
        parameters: { injuredPlayer: "star", severity: "high" },
        impact: -0.3,
      },
      {
        id: "weather_change",
        name: "Weather Impact (Rain)",
        type: "weather" as const,
        parameters: { condition: "rain", windSpeed: 15 },
        impact: -0.1,
      },
      {
        id: "lineup_change",
        name: "Lineup Change",
        type: "lineup_change" as const,
        parameters: { changedPositions: 2, quality: "upgrade" },
        impact: 0.08,
      },
      {
        id: "market_shift",
        name: "Market Sentiment Shift",
        type: "market_shift" as const,
        parameters: { sentimentChange: -0.2, volume: "high" },
        impact: -0.12,
      },
    ],
    [],
  );

  const addScenario = useCallback((template: (typeof scenarioTemplates)[0]) => {
    const newScenario: ScenarioInput = {
      ...template,
      id: `${template.id}_${Date.now()}`,
    };
    setScenarios((prev) => [...prev, newScenario]);
  }, []);

  const removeScenario = useCallback((scenarioId: string) => {
    setScenarios((prev) => prev.filter((s) => s.id !== scenarioId));
    setSimulationResults((prev) =>
      prev.filter((r) => r.scenarioId !== scenarioId),
    );
  }, []);

  const simulateScenario = useCallback(async (scenario: ScenarioInput) => {
    setIsSimulating(true);
    setActiveScenario(scenario.id);

    try {
      // Simulate prediction adjustment based on scenario;
      const baselinePrediction = 0.65; // Mock baseline;
      const adjustmentFactor = scenario.impact * 0.5; // Dampen impact;
      const adjustedPrediction = Math.max(
        0.05,
        Math.min(0.95, baselinePrediction + adjustmentFactor),
      );

      const riskLevel =
        Math.abs(adjustmentFactor) > 0.15;
          ? "high"
          : Math.abs(adjustmentFactor) > 0.08;
            ? "medium"
            : "low";

      // Generate factor breakdown;
      const factors = [
        {
          name: "Historical Performance",
          originalValue: 0.2,
          adjustedValue: 0.2 + (scenario.type === "injury" ? -0.05 : 0),
          contribution: scenario.type === "injury" ? -0.05 : 0,
        },
        {
          name: "Market Conditions",
          originalValue: 0.15,
          adjustedValue: 0.15 + (scenario.type === "odds_change" ? 0.03 : 0),
          contribution: scenario.type === "odds_change" ? 0.03 : 0,
        },
        {
          name: "Environmental Factors",
          originalValue: 0.1,
          adjustedValue: 0.1 + (scenario.type === "weather" ? -0.03 : 0),
          contribution: scenario.type === "weather" ? -0.03 : 0,
        },
        {
          name: "Team Dynamics",
          originalValue: 0.12,
          adjustedValue: 0.12 + (scenario.type === "lineup_change" ? 0.02 : 0),
          contribution: scenario.type === "lineup_change" ? 0.02 : 0,
        },
      ];

      const result: SimulationResult = {
        scenarioId: scenario.id,
        originalPrediction: baselinePrediction,
        adjustedPrediction,
        impact: adjustedPrediction - baselinePrediction,
        confidence,
        riskLevel,
        explanation: await generateExplanation(
          scenario,
          adjustedPrediction - baselinePrediction,
        ),
        factors,
      };

      setSimulationResults((prev) => [
        ...prev.filter((r) => r.scenarioId !== scenario.id),
        result,
      ]);
    } catch (error) {
      // console statement removed
    } finally {
      setIsSimulating(false);
      setActiveScenario(null);
    }
  }, []);

  const generateExplanation = async (
    scenario: ScenarioInput,
    impact: number,
  ): Promise<string key={278855}> => {
    try {


      const prompt = `Analyze this sports betting scenario:

        Scenario: ${scenario.name} (${scenario.type})
        Parameters: ${JSON.stringify(scenario.parameters)}
        Impact on prediction: ${magnitude} ${direction} by ${Math.abs(impact * 100).toFixed(1)}%

        Provide a detailed, expert-level explanation of how this scenario affects the betting outcome. Include:
        1. The specific factors that contribute to this change;
        2. Why this scenario has this particular impact;
        3. Any additional considerations for bettors;

        Keep the explanation concise but informative, around 2-3 sentences.`;

      const response = await llmService.generateAnalysis(prompt, {
        scenario_type: scenario.type,
        impact_magnitude: Math.abs(impact),
        impact_direction: direction;
      });

      return response.content || `${scenario.type} scenario ${magnitude} ${direction} prediction confidence due to the specified parameters.`;
    } catch (error) {
      // console statement removed
      // Fallback to simplified explanation;


      return `${scenario.type} scenario ${magnitude} ${direction} prediction confidence due to the specified parameters.`;
    }
  };

  const runAllScenarios = useCallback(async () => {
    for (const scenario of scenarios) {
      await simulateScenario(scenario);
      // Small delay to show progression;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }, [scenarios, simulateScenario]);

  const clearAll = useCallback(() => {
    setScenarios([]);
    setSimulationResults([]);
  }, []);

  const exportResults = useCallback(() => {
    const data = {
      eventId,
      playerId,
      timestamp: new Date().toISOString(),
      scenarios,
      results: simulationResults,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });


    a.href = url;
    a.download = `what-if-simulation-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [eventId, playerId, scenarios, simulationResults]);

  return (
    <div className="what-if-simulator max-w-7xl mx-auto p-6 space-y-6" key={755613}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" key={220675}>
        <div className="flex justify-between items-center" key={795957}>
          <div key={241917}>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white" key={150273}>
              🔬 What-If Scenario Simulator;
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1" key={395773}>
              Test different scenarios and see their impact on predictions;
            </p>
          </div>
          <div className="flex space-x-3" key={744346}>
            <button;
              onClick={runAllScenarios}
              disabled={scenarios.length === 0 || isSimulating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
             key={769747}>
              {isSimulating ? "Simulating..." : "Run All Scenarios"}
            </button>
            <button;
              onClick={exportResults}
              disabled={simulationResults.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
             key={41805}>
              Export Results;
            </button>
            <button;
              onClick={clearAll}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
             key={710638}>
              Clear All;
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" key={220675}>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" key={710060}>
          Add Scenarios;
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={696568}>
          {scenarioTemplates.map((template) => (
            <button;
              key={template.id}
              onClick={() = key={748241}> addScenario(template)}
              className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              <div className="text-left" key={599574}>
                <h3 className="font-medium text-gray-900 dark:text-white" key={307293}>
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1" key={208577}>
                  Expected impact: {template.impact > 0 ? "+" : ""}
                  {(template.impact * 100).toFixed(1)}%
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Scenarios */}
      {scenarios.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" key={220675}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" key={710060}>
            Active Scenarios ({scenarios.length})
          </h2>
          <div className="space-y-3" key={186520}>
            {scenarios.map((scenario) => {
              const result = simulationResults.find(
                (r) => r.scenarioId === scenario.id,
              );
              return (
                <div;
                  key={scenario.id}
                  className={`p-4 border rounded-lg ${activeScenario === scenario.id;
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-300 dark:border-gray-600"
                    }`}
                 key={108975}>
                  <div className="flex justify-between items-start" key={678391}>
                    <div className="flex-1" key={745195}>
                      <h3 className="font-medium text-gray-900 dark:text-white" key={307293}>
                        {scenario.name}
                      </h3>
                      {result && (
                        <div className="mt-2 space-y-2" key={602711}>
                          <div className="flex items-center space-x-4 text-sm" key={828276}>
                            <span className="text-gray-600 dark:text-gray-400" key={517223}>
                              Impact:{" "}
                              <span;
                                className={
                                  result.impact  key={64696}> 0;
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                {result.impact > 0 ? "+" : ""}
                                {(result.impact * 100).toFixed(1)}%
                              </span>
                            </span>
                            <span className="text-gray-600 dark:text-gray-400" key={517223}>
                              Confidence: {(result.confidence * 100).toFixed(1)}
                              %
                            </span>
                            <span;
                              className={`px-2 py-1 rounded text-xs font-medium ${result.riskLevel === "high"
                                  ? "bg-red-100 text-red-800"
                                  : result.riskLevel === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                             key={992743}>
                              {result.riskLevel} risk;
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                            {result.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2 ml-4" key={877941}>
                      <button;
                        onClick={() = key={920170}> simulateScenario(scenario)}
                        disabled={isSimulating}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {activeScenario === scenario.id;
                          ? "Running..."
                          : "Simulate"}
                      </button>
                      <button;
                        onClick={() = key={920170}> removeScenario(scenario.id)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                      >
                        Remove;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Comparison */}
      {simulationResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6" key={220675}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4" key={710060}>
            Simulation Results Comparison;
          </h2>
          <div className="overflow-x-auto" key={522094}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" key={899428}>
              <thead className="bg-gray-50 dark:bg-gray-700" key={892450}>
                <tr key={70014}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" key={903504}>
                    Scenario;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" key={903504}>
                    Original;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" key={903504}>
                    Adjusted;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" key={903504}>
                    Impact;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" key={903504}>
                    Risk Level;
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700" key={871884}>
                {simulationResults.map((result) => {
                  const scenario = scenarios.find(
                    (s) => s.id === result.scenarioId,
                  );
                  return (
                    <tr key={result.scenarioId} key={321214}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white" key={958109}>
                        {scenario?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" key={505714}>
                        {(result.originalPrediction * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" key={505714}>
                        {(result.adjustedPrediction * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm" key={507121}>
                        <span;
                          className={
                            result.impact  key={648602}> 0;
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {result.impact > 0 ? "+" : ""}
                          {(result.impact * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                        <span;
                          className={`px-2 py-1 rounded text-xs font-medium ${result.riskLevel === "high"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                              : result.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                            }`}
                         key={6333}>
                          {result.riskLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {scenarios.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center" key={103227}>
          <div className="text-6xl mb-4" key={671434}>🔬</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2" key={112114}>
            No Scenarios Added Yet;
          </h3>
          <p className="text-gray-600 dark:text-gray-400" key={300965}>
            Add scenarios from the templates above to start simulating different;
            conditions and their impact on predictions.
          </p>
        </div>
      )}
    </div>
  );
};

export default WhatIfSimulator;
