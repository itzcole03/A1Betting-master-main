import React, { useEffect, useState  } from 'react.ts';
import useStore from '@/store/useStore.ts';
import { BettingDecision, Projection, BetResult } from '@/types/core.ts';
import { PrizePicksAPI } from '@/services/PrizePicksAPI.ts';
import { UnifiedBettingSystem } from '@/core/UnifiedBettingSystem.ts';
import SHAPVisualization from '@/shared/SHAPVisualization.ts';
import Accordion from '@mui/material/Accordion.ts';
import AccordionSummary from '@mui/material/AccordionSummary.ts';
import AccordionDetails from '@mui/material/AccordionDetails.ts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.ts';
import { useRiskProfile } from '@/hooks/useRiskProfile.ts';

interface ParlayCard {
  id: string;
  projections: Projection[];
  confidence: number;
  expectedValue: number;
  potentialPayout: number;
  analysis: {
    historicalTrends: string[];
    marketSignals: string[];
    riskFactors: string[];
  };
}

const defaultBettingContext = {
  bankroll: 1000,
  maxRiskPerBet: 100,
  minOdds: 1.1,
  maxOdds: 1000,
  odds: 1.5,
  metrics: {
    totalBets: 0,
    winRate: 0,
    roi: 0,
    profitLoss: 0,
    clvAverage: 0,
    edgeRetention: 0,
    kellyMultiplier: 0,
    marketEfficiencyScore: 0,
    averageOdds: 0,
    maxDrawdown: 0,
    sharpeRatio: 0,
    betterThanExpected: 0,
  },
  recentBets: [],
  timestamp: Date.now(),
};

const MoneyMaker: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [parlays, setParlays] = useState<ParlayCard[] key={741237}>([]);
  const [selectedParlay, setSelectedParlay] = useState<string | null key={121216}>(null);
  const [error, setError] = useState<string | null key={121216}>(null);



  const { riskProfile, validateBet } = useRiskProfile();

  useEffect(() => {
    generateParlays();
  }, []);

  const generateParlays = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch available projections;
      const projections = await prizePicksAPI.getProjections({
        limit: 100,
      });

      // Group projections by sport and analyze each group;

      const parlayCards: ParlayCard[] = [];

      for (const [sport, sportProjections] of Object.entries(sportGroups)) {
        // Analyze each projection in the sport group;
        const decisions = await Promise.all(
          sportProjections.map(() => bettingSystem.analyzeBettingOpportunity(defaultBettingContext))
        );

        // Find high confidence projections;

        // Generate parlays from high confidence projections;
        const sportParlays = generateParlaysFromDecisions(
          highConfidenceDecisions,
          sportProjections;
        );

        parlayCards.push(...sportParlays);
      }

      // Sort parlays by expected value;

      setParlays(sortedParlays.slice(0, 10)); // Show top 10 parlays;
    } catch (err) {
      setError('Failed to generate parlays. Please try again later.');
      // console statement removed
    } finally {
      setLoading(false);
    }
  };

  const groupProjectionsBySport = (projections: Projection[]): Record<string, Projection[] key={839624}> => {
    return projections.reduce(
      (acc, proj) => {
        if (!acc[proj.sport]) {
          acc[proj.sport] = [];
        }
        acc[proj.sport].push(proj);
        return acc;
      },
      {} as Record<string, Projection[] key={839624}>
    );
  };

  const generateParlaysFromDecisions = (
    decisions: BettingDecision[],
    projections: Projection[]
  ): ParlayCard[] => {
    const parlays: ParlayCard[] = [];

    // Generate combinations of 2-3 legs;
    for (const size = 2; size <= maxParlaySize; size++) {

      for (const combo of combinations) {
        const projectionSet = combo;
          .map(decision => projections.find(p => p.playerId === decision.metadata.playerId))
          .filter((p): p is Projection => Boolean(p));
        if (projectionSet.length !== combo.length) continue;

        // Calculate combined metrics;

        const combinedEV =
          combo.reduce(
            (acc, d) => acc + (d.metadata && d.metadata.riskScore ? d.metadata.riskScore : 0),
            0;
          ) / combo.length;

        // Calculate potential payout;
        const odds = combo.length === 2 ? 3 : 6; // Simplified odds calculation;
        const potentialPayout = 100 * odds; // Assuming $100 stake;

        // Combine analysis factors;
        const historicalTrends = Array.from(
          new Set(combo.flatMap(d => d.analysis.historicalTrends))
        );


        parlays.push({
          id: `parlay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          projections: projectionSet,
          confidence: combinedConfidence,
          expectedValue: combinedEV,
          potentialPayout,
          analysis: {
            historicalTrends,
            marketSignals,
            riskFactors,
          },
        });
      }
    }

    return parlays;
  };

  const generateCombinations = <T, key={424684}>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];

    function combine(current: T[], start: number) {
      if (current.length === size) {
        result.push([...current]);
        return;
      }

      for (const i = start; i < arr.length; i++) {
        current.push(arr[i]);
        combine(current, i + 1);
        current.pop();
      }
    }

    combine([], 0);
    return result;
  };

  const placeBet = (parlay: ParlayCard) => {
    // Validate bet against risk profile;
    const betData = {
      stake: 100,
      confidence: parlay.confidence,
      kellyFraction: 0.1, // Example, replace with actual calculation if available;
      sport: parlay.projections[0]?.sport || '',
      market: parlay.projections[0]?.propType || '',
      eventId: parlay.projections[0]?.eventId || '',
    };

    if (!validation.isValid) {
      setError('Bet does not meet risk profile: ' + validation.errors.join(', '));
      return;
    }

    // Create bet record;
    const bet = {
      id: `bet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: 'current_user',
      propId: parlay.projections.map(p => p.id).join('_'),
      type: 'PARLAY',
      line: 0,
      odds: parlay.projections.length === 2 ? 3 : 6,
      stake: 100,
      result: 'pending' as BetResult,
      payout: parlay.potentialPayout,
      timestamp: Date.now(),
      metadata: {
        confidence: parlay.confidence,
        expectedValue: parlay.expectedValue,
        predictionFactors: [
          ...(parlay.analysis.historicalTrends || []),
          ...(parlay.analysis.marketSignals || []),
        ],
      },
    };

    // Add bet to store;
    addBet(bet);

    // Clear selection;
    setSelectedParlay(null);
  };

  if (error) {
    return (
      <div className="p-6" key={935494}>
        <div;
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
         key={846318}>
          <strong className="font-bold" key={895573}>Error!</strong>
          <span className="block sm:inline" key={59876}> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6" key={960230}>
      <div className="flex justify-between items-center" key={795957}>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white" key={720857}>
          AI-Powered Parlay Suggestions;
        </h2>
        <button;
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          disabled={loading}
          onClick={generateParlays}
         key={500547}>
          {loading ? 'Generating...' : 'Generate New Parlays'}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64" key={951011}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" key={482433}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" key={881323}>
          {parlays.map(parlay => (
            <div;
              key={parlay.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-200 ${
                selectedParlay === parlay.id ? 'ring-2 ring-indigo-500 transform scale-105' : ''
              }`}
              onClick={() = key={579907}> setSelectedParlay(parlay.id)}
            >
              {/* Parlay Header */}
              <div className="bg-indigo-600 px-4 py-2" key={494011}>
                <h3 className="text-lg font-semibold text-white" key={430547}>
                  {parlay.projections.length}-Leg Parlay;
                </h3>
              </div>

              {/* Projections */}
              <div className="p-4 space-y-4" key={453330}>
                {parlay.projections.map(proj => (
                  <div key={proj.id} className="flex justify-between items-center" key={2622}>
                    <div key={241917}>
                      <p className="font-medium text-gray-900 dark:text-white" key={159672}>{proj.playerName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400" key={198314}>
                        {proj.propType} {proj.line}
                      </p>
                    </div>
                    <div className="text-right" key={144468}>
                      <p className="font-medium text-gray-900 dark:text-white" key={159672}>
                        {proj.team} vs {proj.opponent}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400" key={198314}>
                        {new Date(proj.gameTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4" key={511569}>
                <div className="grid grid-cols-2 gap-4" key={354810}>
                  <div key={241917}>
                    <p className="text-sm text-gray-500 dark:text-gray-400" key={198314}>Confidence</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white" key={69252}>
                      {(parlay.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div key={241917}>
                    <p className="text-sm text-gray-500 dark:text-gray-400" key={198314}>Expected Value</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white" key={69252}>
                      {(parlay.expectedValue * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4" key={511569}>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2" key={46697}>Analysis</p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1" key={866853}>
                  {parlay.analysis.historicalTrends.slice(0, 2).map((trend, i) => (
                    <li key={i} className="flex items-center" key={805238}>
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2" key={371143}></span>
                      {trend}
                    </li>
                  ))}
                  {parlay.analysis.marketSignals.slice(0, 2).map((signal, i) => (
                    <li key={i} className="flex items-center" key={805238}>
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" key={972324}></span>
                      {signal}
                    </li>
                  ))}
                </ul>
                {/* SHAP/Explanation Accordion */}
                <Accordion sx={{ mt: 2 }} key={61077}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon / key={140382}>}>
                    <span className="text-sm font-medium text-gray-900 dark:text-white" key={986909}>
                      Model Explanation (SHAP)
                    </span>
                  </AccordionSummary>
                  <AccordionDetails key={487497}>
                    <SHAPVisualization;
                      explanations={[
                        ...parlay.analysis.historicalTrends.map((t, i) = key={833545}> ({
                          feature: t,
                          value: 1,
                          impact: 1,
                          direction: 'positive' as const,
                        })),
                        ...parlay.analysis.marketSignals.map((t, i) => ({
                          feature: t,
                          value: 0.7,
                          impact: 0.7,
                          direction: 'positive' as const,
                        })),
                        ...parlay.analysis.riskFactors.map((t, i) => ({
                          feature: t,
                          value: -0.5,
                          impact: -0.5,
                          direction: 'negative' as const,
                        })),
                      ]}
                    />
                    <div className="mt-2" key={848027}>
                      <span className="font-medium" key={514486}>Rationale:</span>
                      <ul className="list-disc ml-6" key={888506}>
                        {parlay.analysis.historicalTrends.map((t, i) => (
                          <li key={i} className="text-sm text-gray-500 dark:text-gray-400" key={51216}>
                            {t}
                          </li>
                        ))}
                        {parlay.analysis.marketSignals.map((t, i) => (
                          <li key={i} className="text-sm text-gray-500 dark:text-gray-400" key={51216}>
                            {t}
                          </li>
                        ))}
                        {parlay.analysis.riskFactors.map((t, i) => (
                          <li key={i} className="text-sm text-gray-500 dark:text-gray-400" key={51216}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>

              {/* Action Button */}
              {selectedParlay === parlay.id && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900" key={342049}>
                  <button;
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={() = key={440938}> placeBet(parlay)}
                  >
                    Place $100 Bet (Potential: ${parlay.potentialPayout})
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(MoneyMaker);
