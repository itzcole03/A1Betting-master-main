import React from 'react.ts';
import {
  Award,
  RefreshCw,
  Target;
} from 'lucide-react.ts';
import { useEffect, useState } from 'react.ts';
import {
  SPORT_OPTIONS,
  getSportDisplayName,
  getSportEmoji,
} from '@/constants/sports.ts';
import { useApp } from '@/contexts/AppContext.ts';
import { useEnhancedRealDataSources } from '@/hooks/useEnhancedRealDataSources.ts';
import { useRealDataValidation } from '@/hooks/useRealDataValidation.ts';
import { useToasts } from '@/hooks/useToasts.ts';
import { PlayerProp } from '@/types.ts';
import { DataGenerator } from '@/utils/dataGenerator.ts';
import { validateLineup } from '@/utils/lineupValidation.ts';
import { SportSelector } from '@/common/SportSelector.ts';
import { LineupBuilder } from '@/LineupBuilder.ts';
import { PropCard } from '@/modern/PropCard.ts';

export function EnhancedPrizePicks() {
  const { state, addSelectedProp } = useApp();
  const { addToast } = useToasts();
  const [currentProps, setCurrentProps] = useState<PlayerProp[] key={605018}>([]);
  const [selectedSport, setSelectedSport] = useState("All");
  const [loading, setLoading] = useState(false);
  const [displayedPropsCount, setDisplayedPropsCount] = useState(9);
  const [entryAmount, setEntryAmount] = useState(25);

  const {
    dataSources,
    players,
    loading: dataLoading,
    refreshData,
    getSourcesByCategory,
  } = useEnhancedRealDataSources();

  useEffect(() => {
    loadPlayerProps();
  }, [selectedSport, players]);

  const loadPlayerProps = async () => {
    setLoading(true);
    try {
      // Get PrizePicks data from enhanced data sources;

      const propsData = prizePicksSources.find(
        (s) => s.id === "prizepicks_props",
      );

      if (propsData?.connected && propsData.data?.projections) {
        if (process.env.NODE_ENV === "development") {
          // console statement removed
        }

        const playerProps = propsData.data.projections.map((projection: any) =>
          convertToPlayerProp(projection),
        );
        setCurrentProps(playerProps);
      } else {
        // console statement removed
        // Generate props from real player data;

        setCurrentProps(generatedProps);
      }
    } catch (error) {
      // console statement removed
      // Fallback to generated props;

      setCurrentProps(fallbackProps);
    } finally {
      setLoading(false);
    }
  };

  const convertToPlayerProp = (projection: any): PlayerProp => {
    return {
      id: projection.id,
      playerName: projection.player_name,
      team: projection.team || "TBD",
      position: projection.position || "Unknown",
      statType: projection.stat_type,
      line: projection.line,
      sport: projection.sport,
      realDataQuality: 0.95, // High quality for real PrizePicks data;
      overConfidence: calculateConfidence(projection, "over"),
      underConfidence: calculateConfidence(projection, "under"),
      expectedValue: projection.expected_value || 0,
      source: "PRIZEPICKS_REAL_DATA",
      aiEnhancement: {
        valueRating: projection.value_rating,
        kellyOptimal: projection.kelly_optimal,
        marketEdge: projection.expected_value / 100,
        riskScore: 1 - projection.confidence_score,
        weatherImpact: projection.weather_impact,
        injuryImpact: projection.injury_status === "Healthy" ? 0 : 0.1,
        formTrend: calculateFormTrend(projection.recent_form),
        sharpMoney: projection.sharp_money,
        publicBetting: projection.public_betting,
        lineMovement: projection.line_movement,
        steamMove: projection.steam_move,
        reverseLineMovement: projection.reverse_line_movement,
      },
      patternAnalysis: {
        overallStrength: projection.confidence_score || 0.8,
        seasonalTrends: calculateSeasonalTrends(projection),
        matchupAdvantage: calculateMatchupAdvantage(projection),
        recentPerformance: projection.recent_form || [0.5, 0.6, 0.7, 0.8, 0.9],
        homeAwayFactor: projection.home_away === "Home" ? 1.05 : 0.95,
        restAdvantage: projection.rest_days > 1 ? 1.02 : 0.98,
        backToBackPenalty: projection.back_to_back ? 0.95 : 1.0,
      },
    };
  };

  const generatePropsFromPlayers = (): PlayerProp[] => {
    const props: PlayerProp[] = [];

    // Filter players by sport;
    const filteredPlayers =
      selectedSport === "All"
        ? players;
        : players.filter((p) => p.sport === selectedSport);

    if (process.env.NODE_ENV === "development") {
      // console statement removed
    }
    filteredPlayers.slice(0, 20).forEach((player) => {

      statTypes.forEach((statType) => {

        props.push({
          id: `${player.sport}_${player.name}_${statType}`
            .replace(/\s+/g, "_")
            .toLowerCase(),
          playerName: player.name,
          team: player.team,
          position: player.position,
          statType: statType,
          line: line,
          sport: player.sport,
          realDataQuality: 0.85, // Good quality from real player data;
          overConfidence: DataGenerator.generateConfidence({
            ...player,
            statType,
            choice: "over",
          }),
          underConfidence: DataGenerator.generateConfidence({
            ...player,
            statType,
            choice: "under",
          }),
          expectedValue: DataGenerator.generateExpectedValue({
            ...player,
            statType,
          }),
          source: "REAL_PLAYER_DATA_ENHANCED",
          aiEnhancement: {
            valueRating: ["A+", "A", "B+", "B", "C+"][
              Math.floor(DataGenerator.generateConfidence(player) / 20)
            ],
            kellyOptimal:
              Math.abs(DataGenerator.generateExpectedValue(player)) / 100,
            marketEdge: DataGenerator.generateExpectedValue(player) / 100,
            riskScore: (100 - DataGenerator.generateConfidence(player)) / 100,
            weatherImpact: isOutdoorSport(player.sport)
              ? Math.abs(DataGenerator.generateExpectedValue(player)) / 200;
              : 0,
            injuryImpact: 0.02, // Low injury impact for active players;
            formTrend: DataGenerator.generateExpectedValue(player) / 500,
          },
          patternAnalysis: {
            overallStrength:
              DataGenerator.generateConfidence({ ...player, statType }) / 100,
          },
        });
      });
    });

    return props;
  };

  const calculateRealLine = (player: any, statType: string): number => {
    // Use realistic stat line generation;
    return DataGenerator.generateStatLine(player.sport, statType, player.name);
  };

  const calculateConfidence = (
    projection: any,
    type: "over" | "under",
  ): number => {




    const confidence = baseConfidence;

    // Adjust based on recent form;
    if (type === "over") {
      confidence += formTrend * 0.1;
      if (seasonAvg > projection.line) confidence += 0.05;
      if (vsOpponentAvg > projection.line) confidence += 0.03;
    } else {
      confidence -= formTrend * 0.1;
      if (seasonAvg < projection.line) confidence += 0.05;
      if (vsOpponentAvg < projection.line) confidence += 0.03;
    }

    return Math.min(Math.max(confidence, 0.5), 0.98) * 100;
  };

  const calculateFormTrend = (recentForm: number[]): number => {
    if (!recentForm || recentForm.length < 2) return 0;


    const weightedSum = 0;
    const totalWeight = 0;

    recent.forEach((form, index) => {

      weightedSum += form * weight;
      totalWeight += weight;
    });

    return weightedSum / totalWeight - 0.5;
  };

  const calculateSeasonalTrends = (projection: any): number => {


    const trend = 0.5;

    if (sport === "NBA") {
      trend = 0.4 + (month / 12) * 0.4;
    } else if (sport === "NFL") {
      trend = 0.6 - (month / 12) * 0.2;
    } else if (sport === "MLB") {
      trend = 0.5 + Math.sin(month / 2) * 0.1;
    }

    return trend;
  };

  const calculateMatchupAdvantage = (projection: any): number => {


    if (seasonAvg === 0) return 0.5;

    return Math.min(Math.max(vsOpponentAvg / seasonAvg, 0.7), 1.3) - 1;
  };

  const getStatTypesForSport = (sport: string): string[] => {
    const statTypes = {
      NBA: [
        "Points",
        "Rebounds",
        "Assists",
        "3-Pointers Made",
        "Steals",
        "Blocks",
      ],
      NFL: [
        "Passing Yards",
        "Rushing Yards",
        "Receptions",
        "Receiving Yards",
        "Touchdowns",
      ],
      MLB: ["Hits", "RBIs", "Runs", "Home Runs", "Strikeouts"],
      NHL: ["Goals", "Assists", "Shots", "Points"],
      Soccer: ["Goals", "Assists", "Shots", "Passes"],
      WNBA: ["Points", "Rebounds", "Assists", "3-Pointers Made"],
      MMA: ["Significant Strikes", "Takedowns", "Submission Attempts"],
      PGA: ["Birdies", "Eagles", "Fairways Hit", "Greens in Regulation"],
    };

    return statTypes[sport] || ["Points"];
  };

  const getBaseStatValue = (sport: string, statType: string): number => {
    const baseValues = {
      NBA: {
        Points: 20,
        Rebounds: 8,
        Assists: 5,
        "3-Pointers Made": 2.5,
        Steals: 1.2,
        Blocks: 0.8,
      },
      NFL: {
        "Passing Yards": 250,
        "Rushing Yards": 80,
        Receptions: 5,
        "Receiving Yards": 60,
        Touchdowns: 1.5,
      },
      MLB: {
        Hits: 1.2,
        RBIs: 1,
        Runs: 0.8,
        "Home Runs": 0.3,
        Strikeouts: 1.5,
      },
      NHL: {
        Goals: 0.8,
        Assists: 1.2,
        Shots: 3.5,
        Points: 2,
      },
    };

    return sportValues[statType] || 10;
  };

  const isOutdoorSport = (sport: string): boolean => {
    return ["NFL", "MLB", "Soccer", "PGA"].includes(sport);
  };

  const handleSelectProp = (propId: string, choice: "over" | "under") => {
    if (state.selectedProps.size >= 6) {
      return;
    }


    if (prop) {
      addSelectedProp(key, {
        propId,
        choice,
        enhanced: true,
        prop: prop,
        confidence:
          choice === "over" ? prop.overConfidence : prop.underConfidence,
        expectedValue: prop.expectedValue,
        source: prop.source,
      });
    }
  };

  const handleSubmitLineup = () => {
    // Validate lineup using PrizePicks rules;

    if (!validation.canSubmit) {
      if (validation.errors.length > 0) {
        validation.errors.forEach((error) => {
          addToast(error, "error");
        });
      } else {
        addToast("Please select 2-6 props to submit your lineup", "warning");
      }
      return;
    }

    const avgConfidence =
      selectedPropsArray.reduce(
        (sum, prop) => sum + (prop.confidence || 80),
        0,
      ) / selectedPropsArray.length;
    const totalEV = selectedPropsArray.reduce(
      (sum, prop) => sum + (prop.expectedValue || 0),
      0,
    );

    // Get unique teams and players for display;


    // Show success toast;
    addToast(
      `🎯 Lineup submitted successfully! Entry: $${entryAmount}, Expected payout: $${(entryAmount * 3.5).toFixed(2)}`,
      "success",
    );

    // Show warnings if any;
    if (validation.warnings.length > 0) {
      validation.warnings.forEach((warning) => {
        addToast(warning, "warning");
      });
    }

    // Log detailed information for debugging;
    // console statement removed,
      sports: Array.from(sports),
      entry: entryAmount,
      avgConfidence: avgConfidence.toFixed(1),
      totalEV: totalEV.toFixed(1),
      dataSource: selectedPropsArray[0]?.source || "Real Player Data",
    });
  };

  const refreshProps = async () => {
    await refreshData();
    await loadPlayerProps();
  };

  const prizePicksConnected = getSourcesByCategory("prizepicks").some(
    (s) => s.connected,
  );

  return (
    <div className="space-y-6" key={501869}>
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg" key={65136}>
        <div className="flex items-center justify-between" key={96335}>
          <div key={241917}>
            <h2 className="text-3xl font-bold flex items-center space-x-3" key={32376}>
              <Target className="w-8 h-8 text-primary-600" / key={684680}>
              <span className="dark:text-white" key={440205}>
                PrizePicks Intelligence Engine;
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2" key={616181}>
              Real-time player props with advanced AI analysis, live data;
              integration, and multi-sport coverage;
            </p>
            <div className="flex items-center space-x-6 mt-3 text-sm" key={131716}>
              <div className="flex items-center space-x-2" key={740830}>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" key={866883}></div>
                <span className="text-green-600 font-medium" key={964564}>
                  {prizePicksConnected;
                    ? "PrizePicks Data Active"
                    : "Real Player Data Mode"}
                </span>
              </div>
              <div className="text-gray-500" key={542487}>•</div>
              <span className="text-blue-600 font-medium" key={465762}>
                {currentProps.length} Available Props;
              </span>
              <div className="text-gray-500" key={542487}>•</div>
              <span className="text-purple-600 font-medium" key={431481}>
                {players.length} Real Players;
              </span>
              <div className="text-gray-500" key={542487}>•</div>
              <span className="text-yellow-600 font-medium" key={529612}>
                {sports.length - 1} Sports;
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4" key={787951}>
            <RulesButton / key={379353}>
            <SportSelector;
              selectedSport={selectedSport}
              onSportChange={setSelectedSport}
              className=""
              label=""
            / key={264281}>
            <button;
              onClick={refreshProps}
              disabled={loading || dataLoading}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center space-x-2 disabled:opacity-50"
             key={840563}>
              <RefreshCw;
                className={`w-4 h-4 ${loading || dataLoading ? "animate-spin" : ""}`}
              / key={100489}>
              <span key={595076}>Refresh Props</span>
            </button>
          </div>
        </div>
      </div>

      {/* Data Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800" key={325547}>
        <div className="flex items-center justify-between" key={96335}>
          <div className="flex items-center space-x-4" key={787951}>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center" key={145286}>
              <Award className="w-6 h-6 text-white" / key={349228}>
            </div>
            <div key={241917}>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300" key={910808}>
                {prizePicksConnected;
                  ? "PrizePicks Data Connected"
                  : "Real Player Data Active"}
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400" key={851434}>
                {prizePicksConnected;
                  ? `Live props from PrizePicks with ${currentProps.length} projections`
                  : `Generated from ${players.length} real players across ${sports.length - 1} sports`}
              </p>
            </div>
          </div>
          <div className="text-right" key={144468}>
            <div className="text-2xl font-bold text-green-600" key={702696}>
              {currentProps.length}
            </div>
            <div className="text-xs text-green-500" key={95510}>Available Props</div>
          </div>
        </div>
      </div>

      {/* Validation Warning */}
      {!validation.isValid && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4" key={251638}>
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2" key={926653}>
            ⚠️ Limited Functionality;
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300" key={900209}>
            Some API keys are missing. Props are generated from available real;
            player data. Add missing API keys for full PrizePicks integration.
          </p>
        </div>
      )}

      <div className="flex flex-col xl:flex-row gap-6 max-w-full" key={919818}>
        {/* Props Grid */}
        <div className="flex-1 min-w-0 overflow-hidden" key={360573}>
          {loading || dataLoading ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" key={697680}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div;
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 rounded-2xl p-6 animate-pulse"
                 key={786351}>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4" key={33308}></div>
                  <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4" key={362130}></div>
                  <div className="h-20 bg-gray-300 dark:bg-gray-600 rounded" key={904775}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4" key={697680}>
              {currentProps.slice(0, displayedPropsCount).map((prop) => (
                <PropCard;
                  key={prop.id}
                  prop={prop}
                  onSelect={handleSelectProp}
                  isPrizePicksData={prizePicksConnected}
                / key={361226}>
              ))}
            </div>
          )}

          {/* View More Button */}
          {!loading &&
            !dataLoading &&
            currentProps.length > displayedPropsCount && (
              <div className="text-center mt-6" key={28363}>
                <button;
                  onClick={() = key={887064}> {
                    const newCount = Math.min(
                      displayedPropsCount + 9,
                      currentProps.length,
                    );
                    setDisplayedPropsCount(newCount);
                  }}
                  className="bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-medium transition-colors flex items-center space-x-2 mx-auto"
                >
                  <span key={595076}>View More</span>
                  <svg;
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                   key={777873}>
                    <path;
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    / key={142791}>
                  </svg>
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2" key={139163}>
                  Showing {displayedPropsCount} of {currentProps.length}{" "}
                  available props;
                </p>
              </div>
            )}

          {/* View Less Button */}
          {!loading &&
            !dataLoading &&
            displayedPropsCount > 9 &&
            displayedPropsCount >= currentProps.length && (
              <div className="text-center mt-4" key={123598}>
                <button;
                  onClick={() = key={887064}> {
                    setDisplayedPropsCount(9);
                    // Scroll back to top of props grid;
                    const propsGrid =
                      document.querySelector(".xl\\:col-span-3");
                    propsGrid?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-gray-600 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                >
                  <svg;
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                   key={777873}>
                    <path;
                      d="M18 15L12 9L6 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    / key={139976}>
                  </svg>
                  <span key={595076}>View Less</span>
                </button>
              </div>
            )}

          {!loading && !dataLoading && currentProps.length === 0 && (
            <div className="text-center py-12" key={752807}>
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" / key={776575}>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2" key={263249}>
                No Props Available;
              </h3>
              <p className="text-gray-500 dark:text-gray-500" key={970416}>
                Try selecting a different sport or refreshing the data;
              </p>
            </div>
          )}
        </div>

        {/* Enhanced Lineup Builder */}
        <LineupBuilder;
          entryAmount={entryAmount}
          onEntryAmountChange={setEntryAmount}
          onSubmitLineup={handleSubmitLineup}
          prizePicksConnected={prizePicksConnected}
        / key={612998}>
      </div>

      {/* Data Debug Panel */}
      <DataDebug / key={277894}>
    </div>
  );
}

// Mock implementations for missing imports;



const PropCard = ({ prop, onSelect, isPrizePicksData }: any) => (
  <div className="bg-white p-4 rounded-lg shadow" key={641554}>
    <h3 key={661229}>{prop.playerName}</h3>
    <p key={161203}>
      {prop.statType}: {prop.line}
    </p>
    <div className="flex gap-2 mt-2" key={840824}>
      <button;
        onClick={() = key={698206}> onSelect(prop.id, "over")}
        className="px-3 py-1 bg-green-500 text-white rounded"
      >
        Over;
      </button>
      <button;
        onClick={() = key={698206}> onSelect(prop.id, "under")}
        className="px-3 py-1 bg-red-500 text-white rounded"
      >
        Under;
      </button>
    </div>
  </div>
);

const LineupBuilder = ({
  entryAmount,
  onEntryAmountChange,
  onSubmitLineup,
  prizePicksConnected,
}: any) => (
  <div className="bg-white p-4 rounded-lg shadow min-w-[300px]" key={204648}>
    <h3 className="font-bold mb-4" key={163065}>Lineup Builder</h3>
    <input;
      type="number"
      value={entryAmount}
      onChange={(e) = key={977573}> onEntryAmountChange(Number(e.target.value))}
      className="w-full p-2 border rounded mb-4"
      placeholder="Entry Amount"
    />
    <button;
      onClick={onSubmitLineup}
      className="w-full bg-blue-500 text-white py-2 rounded"
     key={623956}>
      Submit Lineup;
    </button>
  </div>
);

const SportSelector = ({
  selectedSport,
  onSportChange,
  className,
  label,
}: any) => (
  <select;
    value={selectedSport}
    onChange={(e) = key={902235}> onSportChange(e.target.value)}
    className="p-2 border rounded"
  >
    {SPORT_OPTIONS.map((sport) => (
      <option key={sport} value={sport} key={577991}>
        {sport}
      </option>
    ))}
  </select>
);

const RulesButton = () => (
  <button className="px-3 py-1 bg-gray-500 text-white rounded text-sm" key={718514}>
    Rules;
  </button>
);

const DataDebug = () => (
  <div className="bg-gray-100 p-4 rounded-lg" key={756997}>
    <h4 className="font-bold" key={466698}>Data Debug Panel</h4>
    <p className="text-sm text-gray-600" key={656535}>Debug information displayed here...</p>
  </div>
);

// Mock implementations for missing hooks and utils;
const useApp = () => ({
  state: { selectedProps: new Map() },
  addSelectedProp: (key: string, prop: any) =>
    // console statement removed,
});

const useToasts = () => ({
  addToast: (message: string, type: string) =>
    // console statement removed,
});

const useRealDataValidation = () => ({
  isValid: true,
  errors: [],
  warnings: [],
  missingKeys: [],
});

const validateLineup = (props: Map<string, any key={989582}>) => ({
  canSubmit: true,
  errors: [],
  warnings: [],
});

const DataGenerator = {
  generateConfidence: (player: any) => Math.floor(Math.random() * 100),
  generateExpectedValue: (player: any) => Math.random() * 10 - 5,
  generateStatLine: (sport: string, statType: string, playerName: string) =>
    Math.random() * 20 + 10,
};

export interface PlayerProp {
  id: string;
  playerName: string;
  team: string;
  position: string;
  statType: string;
  line: number;
  sport: string;
  realDataQuality: number;
  overConfidence: number;
  underConfidence: number;
  expectedValue: number;
  source: string;
  aiEnhancement?: any;
  patternAnalysis?: any;
}
