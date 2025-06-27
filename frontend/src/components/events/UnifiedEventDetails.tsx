import React, { useState, useEffect  } from 'react.ts';
import { useParams } from 'react-router-dom.ts';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.ts';
import { UnifiedPredictionService } from '@/services/unified/UnifiedPredictionService.ts';
import { UnifiedAnalyticsService } from '@/services/unified/UnifiedAnalyticsService.ts';
import { UnifiedStateService } from '@/services/unified/UnifiedStateService.ts';
import { UnifiedNotificationService } from '@/services/unified/UnifiedNotificationService.ts';
import { UnifiedErrorService } from '@/services/unified/UnifiedErrorService.ts';
import { Card, Button, Spinner, Toast, Badge, Modal, Tabs, Tab } from '@/ui/UnifiedUI.ts';

interface Event {
  id: string;
  name: string;
  sport: string;
  competition: string;
  startTime: string;
  status: 'upcoming' | 'live' | 'ended' | 'cancelled';
  homeTeam: {
    id: string;
    name: string;
    logo: string;
    stats: TeamStats;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
    stats: TeamStats;
  };
  venue: {
    name: string;
    city: string;
    country: string;
  };
  weather?: {
    condition: string;
    temperature: number;
    windSpeed: number;
    precipitation: number;
  };
  markets: Market[];
  predictions: Prediction[];
  statistics: EventStatistics;
}

interface TeamStats {
  form: string[];
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  winRate: number;
  averageGoals: number;
  homeAdvantage?: number;
  awayDisadvantage?: number;
}

interface Market {
  id: string;
  type: string;
  name: string;
  selections: Selection[];
  status: 'open' | 'suspended' | 'closed';
  lastUpdated: string;
}

interface Selection {
  id: string;
  name: string;
  odds: number;
  probability: number;
  prediction?: {
    confidence: number;
    expectedValue: number;
    kellyFraction: number;
  };
}

interface Prediction {
  marketType: string;
  selection: string;
  confidence: number;
  expectedValue: number;
  kellyFraction: number;
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
}

interface EventStatistics {
  headToHead: {
    total: number;
    homeWins: number;
    awayWins: number;
    draws: number;
    lastFive: Array<{
      date: string;
      homeTeam: string;
      awayTeam: string;
      score: string;
      winner: string;
    }>;
  };
  form: {
    home: {
      lastFive: string[];
      goalsScored: number;
      goalsConceded: number;
    };
    away: {
      lastFive: string[];
      goalsScored: number;
      goalsConceded: number;
    };
  };
  trends: {
    overUnder: {
      over2_5: number;
      under2_5: number;
      averageGoals: number;
    };
    bothTeamsToScore: {
      yes: number;
      no: number;
      percentage: number;
    };
    firstHalf: {
      homeWins: number;
      awayWins: number;
      draws: number;
    };
  };
}

export const UnifiedEventDetails: React.FC = () => {
  // Initialize services;




  const notificationService =
    serviceRegistry.getService<UnifiedNotificationService key={460301}>('notification');

  // Router hooks;
  const { eventId } = useParams<{ eventId: string }>();

  // State;
  const [event, setEvent] = useState<Event | null key={385473}>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<Market | null key={585252}>(null);
  const [showBetModal, setShowBetModal] = useState(false);
  const [selectedSelection, setSelectedSelection] = useState<Selection | null key={165096}>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'markets' | 'statistics' | 'predictions'>(
    'overview'
  );

  // Load event data;
  useEffect(() => {
    if (eventId) {
      loadEventData(eventId);
    }
  }, [eventId]);

  const loadEventData = async (id: string) => {
    try {
      setLoading(true);
      const [eventData, predictions] = await Promise.all([
        analyticsService.getEventDetails(id),
        predictionService.getEventPredictions(id),
      ]);
      setEvent({ ...eventData, predictions });
    } catch (error) {
      handleError('Failed to load event data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (message: string, error: any) => {
    setError(message);
    setToast({ message, type: 'error' });
    errorService.handleError(error, {
      code: 'EVENT_DETAILS_ERROR',
      source: 'UnifiedEventDetails',
      details: { message },
    });
  };

  const formatOdds = (odds: number) => {
    return odds.toFixed(2);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const getStatusBadge = (status: Event['status']) => {
    const variants = {
      upcoming: 'info',
      live: 'success',
      ended: 'secondary',
      cancelled: 'danger',
    };
    return <Badge variant={variants[status]} key={151838}>{status.toUpperCase()}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" key={591667}>
        <Spinner size="large" / key={932834}>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8" key={53071}>
        <Card key={650115}>
          <div className="text-center" key={120206}>
            <h2 className="text-2xl font-bold text-red-600" key={678103}>Event Not Found</h2>
            <p className="mt-2 text-gray-600" key={235362}>The requested event could not be found.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" key={53071}>
      <div className="max-w-7xl mx-auto" key={70872}>
        {/* Event Header */}
        <Card className="mb-8" key={727352}>
          <div className="flex items-center justify-between" key={96335}>
            <div className="flex items-center space-x-4" key={787951}>
              <img;
                alt={event.homeTeam.name}
                className="w-16 h-16 object-contain"
                src={event.homeTeam.logo}
              / key={15172}>
              <div key={241917}>
                <h1 className="text-2xl font-bold" key={199849}>{event.name}</h1>
                <p className="text-gray-600 dark:text-gray-400" key={300965}>
                  {event.competition} • {event.sport}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4" key={787951}>
              {getStatusBadge(event.status)}
              <p className="text-gray-600 dark:text-gray-400" key={300965}>
                {new Date(event.startTime).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Navigation Tabs */}
        <Tabs className="mb-8" value={activeTab} onChange={setActiveTab} key={900880}>
          <Tab label="Overview" value="overview" / key={769400}>
          <Tab label="Markets" value="markets" / key={219431}>
          <Tab label="Statistics" value="statistics" / key={786223}>
          <Tab label="Predictions" value="predictions" / key={703997}>
        </Tabs>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={411597}>
            {/* Teams */}
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Teams</h2>
              <div className="space-y-6" key={501869}>
                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center space-x-4" key={787951}>
                    <img;
                      alt={event.homeTeam.name}
                      className="w-12 h-12 object-contain"
                      src={event.homeTeam.logo}
                    / key={693927}>
                    <div key={241917}>
                      <h3 className="font-medium" key={380049}>{event.homeTeam.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                        Win Rate: {formatPercentage(event.homeTeam.stats.winRate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right" key={144468}>
                    <p className="font-medium" key={787187}>{event.homeTeam.stats.goalsScored} Goals</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                      {event.homeTeam.stats.cleanSheets} Clean Sheets;
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center space-x-4" key={787951}>
                    <img;
                      alt={event.awayTeam.name}
                      className="w-12 h-12 object-contain"
                      src={event.awayTeam.logo}
                    / key={104460}>
                    <div key={241917}>
                      <h3 className="font-medium" key={380049}>{event.awayTeam.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                        Win Rate: {formatPercentage(event.awayTeam.stats.winRate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right" key={144468}>
                    <p className="font-medium" key={787187}>{event.awayTeam.stats.goalsScored} Goals</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                      {event.awayTeam.stats.cleanSheets} Clean Sheets;
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Venue & Weather */}
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Venue & Weather</h2>
              <div className="space-y-4" key={160407}>
                <div key={241917}>
                  <h3 className="font-medium" key={380049}>Venue</h3>
                  <p className="text-gray-600 dark:text-gray-400" key={300965}>
                    {event.venue.name}, {event.venue.city}, {event.venue.country}
                  </p>
                </div>
                {event.weather && (
                  <div key={241917}>
                    <h3 className="font-medium" key={380049}>Weather</h3>
                    <div className="grid grid-cols-2 gap-4" key={354810}>
                      <div key={241917}>
                        <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Condition</p>
                        <p key={161203}>{event.weather.condition}</p>
                      </div>
                      <div key={241917}>
                        <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Temperature</p>
                        <p key={161203}>{event.weather.temperature}°C</p>
                      </div>
                      <div key={241917}>
                        <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Wind Speed</p>
                        <p key={161203}>{event.weather.windSpeed} km/h</p>
                      </div>
                      <div key={241917}>
                        <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Precipitation</p>
                        <p key={161203}>{event.weather.precipitation}%</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Head to Head */}
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Head to Head</h2>
              <div className="space-y-4" key={160407}>
                <div className="grid grid-cols-3 gap-4 text-center" key={762234}>
                  <div key={241917}>
                    <p className="text-2xl font-bold" key={180814}>{event.statistics.headToHead.homeWins}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Home Wins</p>
                  </div>
                  <div key={241917}>
                    <p className="text-2xl font-bold" key={180814}>{event.statistics.headToHead.draws}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Draws</p>
                  </div>
                  <div key={241917}>
                    <p className="text-2xl font-bold" key={180814}>{event.statistics.headToHead.awayWins}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Away Wins</p>
                  </div>
                </div>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>Last 5 Meetings</h3>
                  <div className="space-y-2" key={725977}>
                    {event.statistics.headToHead.lastFive.map((match, index) => (
                      <div;
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
                       key={996921}>
                        <div className="flex-1" key={745195}>{match.homeTeam}</div>
                        <div className="px-4 font-medium" key={822210}>{match.score}</div>
                        <div className="flex-1 text-right" key={463911}>{match.awayTeam}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Form & Trends */}
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Form & Trends</h2>
              <div className="space-y-4" key={160407}>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>Recent Form</h3>
                  <div className="grid grid-cols-2 gap-4" key={354810}>
                    <div key={241917}>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1" key={742391}>
                        {event.homeTeam.name}
                      </p>
                      <div className="flex space-x-1" key={828285}>
                        {event.statistics.form.home.lastFive.map((result, index) => (
                          <Badge;
                            key={index}
                            variant={
                              result === 'W' ? 'success' : result === 'D' ? 'warning' : 'danger'
                            }
                           key={654642}>
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div key={241917}>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1" key={742391}>
                        {event.awayTeam.name}
                      </p>
                      <div className="flex space-x-1" key={828285}>
                        {event.statistics.form.away.lastFive.map((result, index) => (
                          <Badge;
                            key={index}
                            variant={
                              result === 'W' ? 'success' : result === 'D' ? 'warning' : 'danger'
                            }
                           key={654642}>
                            {result}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>Trends</h3>
                  <div className="grid grid-cols-2 gap-4" key={354810}>
                    <div key={241917}>
                      <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>Over/Under 2.5</p>
                      <p className="font-medium" key={787187}>
                        Over: {formatPercentage(event.statistics.trends.overUnder.over2_5)} • Under:{' '}
                        {formatPercentage(event.statistics.trends.overUnder.under2_5)}
                      </p>
                    </div>
                    <div key={241917}>
                      <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                        Both Teams to Score;
                      </p>
                      <p className="font-medium" key={787187}>
                        Yes: {formatPercentage(event.statistics.trends.bothTeamsToScore.yes)} • No:{' '}
                        {formatPercentage(event.statistics.trends.bothTeamsToScore.no)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Markets Tab */}
        {activeTab === 'markets' && (
          <div className="space-y-8" key={778766}>
            {event.markets.map(market => (
              <Card key={market.id} key={895798}>
                <div className="flex items-center justify-between mb-4" key={810034}>
                  <h2 className="text-xl font-bold" key={540247}>{market.name}</h2>
                  <Badge;
                    variant={
                      market.status === 'open'
                        ? 'success'
                        : market.status === 'suspended'
                          ? 'warning'
                          : 'secondary'
                    }
                   key={278703}>
                    {market.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={696568}>
                  {market.selections.map(selection => (
                    <div key={selection.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg" key={504641}>
                      <div className="flex items-center justify-between mb-2" key={120997}>
                        <span className="font-medium" key={514486}>{selection.name}</span>
                        <span className="text-lg font-bold" key={921959}>{formatOdds(selection.odds)}</span>
                      </div>
                      {selection.prediction && (
                        <div className="space-y-1 text-sm" key={730039}>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-600 dark:text-gray-400" key={517223}>Confidence</span>
                            <span key={595076}>{formatPercentage(selection.prediction.confidence)}</span>
                          </div>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-600 dark:text-gray-400" key={517223}>Value</span>
                            <span;
                              className={
                                selection.prediction.expectedValue  key={928754}> 0;
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }
                            >
                              {formatPercentage(selection.prediction.expectedValue)}
                            </span>
                          </div>
                          <div className="flex justify-between" key={588832}>
                            <span className="text-gray-600 dark:text-gray-400" key={517223}>Kelly</span>
                            <span key={595076}>{formatPercentage(selection.prediction.kellyFraction)}</span>
                          </div>
                        </div>
                      )}
                      <Button;
                        className="w-full mt-4"
                        disabled={market.status !== 'open'}
                        variant="primary"
                        onClick={() = key={852518}> {
                          setSelectedMarket(market);
                          setSelectedSelection(selection);
                          setShowBetModal(true);
                        }}
                      >
                        Place Bet;
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={411597}>
            {/* Team Statistics */}
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Team Statistics</h2>
              <div className="space-y-6" key={501869}>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>{event.homeTeam.name}</h3>
                  <div className="space-y-2" key={725977}>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Goals Scored</span>
                      <span key={595076}>{event.statistics.form.home.goalsScored}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Goals Conceded</span>
                      <span key={595076}>{event.statistics.form.home.goalsConceded}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Clean Sheets</span>
                      <span key={595076}>{event.homeTeam.stats.cleanSheets}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Win Rate</span>
                      <span key={595076}>{formatPercentage(event.homeTeam.stats.winRate)}</span>
                    </div>
                  </div>
                </div>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>{event.awayTeam.name}</h3>
                  <div className="space-y-2" key={725977}>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Goals Scored</span>
                      <span key={595076}>{event.statistics.form.away.goalsScored}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Goals Conceded</span>
                      <span key={595076}>{event.statistics.form.away.goalsConceded}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Clean Sheets</span>
                      <span key={595076}>{event.awayTeam.stats.cleanSheets}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Win Rate</span>
                      <span key={595076}>{formatPercentage(event.awayTeam.stats.winRate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Match Statistics */}
            <Card key={650115}>
              <h2 className="text-xl font-bold mb-4" key={939378}>Match Statistics</h2>
              <div className="space-y-6" key={501869}>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>Goals</h3>
                  <div className="space-y-2" key={725977}>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Average Goals per Game</span>
                      <span key={595076}>{event.statistics.trends.overUnder.averageGoals.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Over 2.5 Goals</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.overUnder.over2_5)}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Under 2.5 Goals</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.overUnder.under2_5)}</span>
                    </div>
                  </div>
                </div>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>Both Teams to Score</h3>
                  <div className="space-y-2" key={725977}>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Yes</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.bothTeamsToScore.yes)}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>No</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.bothTeamsToScore.no)}</span>
                    </div>
                  </div>
                </div>
                <div key={241917}>
                  <h3 className="font-medium mb-2" key={656044}>First Half</h3>
                  <div className="space-y-2" key={725977}>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Home Wins</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.firstHalf.homeWins)}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Away Wins</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.firstHalf.awayWins)}</span>
                    </div>
                    <div className="flex justify-between" key={588832}>
                      <span key={595076}>Draws</span>
                      <span key={595076}>{formatPercentage(event.statistics.trends.firstHalf.draws)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="space-y-8" key={778766}>
            {event.predictions.map((prediction, index) => (
              <Card key={index} key={520458}>
                <div className="flex items-center justify-between mb-4" key={810034}>
                  <h2 className="text-xl font-bold" key={540247}>
                    {prediction.marketType} - {prediction.selection}
                  </h2>
                  <Badge;
                    variant={
                      prediction.expectedValue  key={195259}> 0;
                        ? 'success'
                        : prediction.expectedValue < 0;
                          ? 'danger'
                          : 'warning'
                    }
                  >
                    {formatPercentage(prediction.expectedValue)} Expected Value;
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
                  <div key={241917}>
                    <h3 className="font-medium mb-2" key={656044}>Prediction Details</h3>
                    <div className="space-y-2" key={725977}>
                      <div className="flex justify-between" key={588832}>
                        <span key={595076}>Confidence</span>
                        <span key={595076}>{formatPercentage(prediction.confidence)}</span>
                      </div>
                      <div className="flex justify-between" key={588832}>
                        <span key={595076}>Expected Value</span>
                        <span;
                          className={
                            prediction.expectedValue  key={224536}> 0 ? 'text-green-600' : 'text-red-600'
                          }
                        >
                          {formatPercentage(prediction.expectedValue)}
                        </span>
                      </div>
                      <div className="flex justify-between" key={588832}>
                        <span key={595076}>Kelly Fraction</span>
                        <span key={595076}>{formatPercentage(prediction.kellyFraction)}</span>
                      </div>
                    </div>
                  </div>
                  <div key={241917}>
                    <h3 className="font-medium mb-2" key={656044}>Factors</h3>
                    <div className="space-y-2" key={725977}>
                      {prediction.factors.map((factor, factorIndex) => (
                        <div key={factorIndex} className="p-2 bg-gray-50 dark:bg-gray-800 rounded" key={115144}>
                          <div className="flex justify-between mb-1" key={790471}>
                            <span className="font-medium" key={514486}>{factor.name}</span>
                            <span className={factor.impact  key={464140}> 0 ? 'text-green-600' : 'text-red-600'}>
                              {formatPercentage(factor.impact)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400" key={316578}>
                            {factor.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Bet Modal */}
      <Modal isOpen={showBetModal} title="Place Bet" onClose={() = key={32488}> setShowBetModal(false)}>
        {selectedMarket && selectedSelection && (
          <div className="space-y-4" key={160407}>
            <div key={241917}>
              <h3 className="font-medium mb-2" key={656044}>Bet Details</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Market</span>
                  <span key={595076}>{selectedMarket.name}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Selection</span>
                  <span key={595076}>{selectedSelection.name}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Odds</span>
                  <span key={595076}>{formatOdds(selectedSelection.odds)}</span>
                </div>
              </div>
            </div>
            {selectedSelection.prediction && (
              <div key={241917}>
                <h3 className="font-medium mb-2" key={656044}>Prediction</h3>
                <div className="space-y-2" key={725977}>
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>Confidence</span>
                    <span key={595076}>{formatPercentage(selectedSelection.prediction.confidence)}</span>
                  </div>
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>Expected Value</span>
                    <span;
                      className={
                        selectedSelection.prediction.expectedValue  key={277860}> 0;
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {formatPercentage(selectedSelection.prediction.expectedValue)}
                    </span>
                  </div>
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>Recommended Stake</span>
                    <span key={595076}>{formatPercentage(selectedSelection.prediction.kellyFraction)}</span>
                  </div>
                </div>
              </div>
            )}
            <div key={241917}>
              <h3 className="font-medium mb-2" key={656044}>Stake</h3>
              <Input min="0" placeholder="Enter stake amount" step="0.01" type="number" / key={263117}>
            </div>
            <div className="flex justify-end space-x-4" key={910332}>
              <Button variant="secondary" onClick={() = key={416583}> setShowBetModal(false)}>
                Cancel;
              </Button>
              <Button;
                variant="primary"
                onClick={() = key={292915}> {
                  // Handle bet placement;
                  setShowBetModal(false);
                }}
              >
                Place Bet;
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() = key={337979}> setToast(null)} />}
    </div>
  );
};
