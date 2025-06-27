import React, { useState, useEffect, useMemo  } from 'react.ts';
import { motion } from 'framer-motion.ts';
import {
  Gamepad2,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Trophy,
  Zap,
  BarChart3,
  Activity,
  Users,
  Target,
  AlertTriangle,
} from 'lucide-react.ts';
import { logger } from '@/utils/logger.ts';

interface EsportsMatch {
  id: string;
  game: string;
  tournament: string;
  team1: string;
  team2: string;
  start_time: string;
  status: 'upcoming' | 'live' | 'finished';
  map?: string;
  format: string;
}

interface EsportsBet {
  id: string;
  match: EsportsMatch;
  market_type: string;
  description: string;
  odds: number;
  expected_value: number;
  confidence: number;
  stake_recommendation: number;
  potential_profit: number;
  risk_level: 'low' | 'medium' | 'high';
  analysis: {
    recent_form: string;
    head_to_head: string;
    map_advantage: string;
    momentum: number;
  };
}

interface EsportsMetrics {
  total_matches: number;
  active_bets: number;
  daily_profit: number;
  win_rate: number;
  avg_odds: number;
  roi: number;
}

const EsportsMoneyMaker: React.FC = () => {
  const [bets, setBets] = useState<EsportsBet[] key={892378}>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState<string key={278855}>('all');
  const [selectedMarket, setSelectedMarket] = useState<string key={278855}>('all');
  const [metrics, setMetrics] = useState<EsportsMetrics key={407484}>({
    total_matches: 0,
    active_bets: 0,
    daily_profit: 0,
    win_rate: 0,
    avg_odds: 0,
    roi: 0,
  });


  // Mock esports betting opportunities;
  const mockBets: EsportsBet[] = useMemo(() => [
    {
      id: '1',
      match: {
        id: 'm1',
        game: 'League of Legends',
        tournament: 'LCK Spring 2024',
        team1: 'T1',
        team2: 'Gen.G',
        start_time: '2024-03-15T10:00:00Z',
        status: 'upcoming',
        format: 'BO3'
      },
      market_type: 'Match Winner',
      description: 'T1 to win vs Gen.G',
      odds: 2.15,
      expected_value: 15.8,
      confidence: 78,
      stake_recommendation: 150,
      potential_profit: 172.50,
      risk_level: 'medium',
      analysis: {
        recent_form: 'T1 won 4/5 recent matches',
        head_to_head: 'T1 leads 3-2 in last 5 meetings',
        map_advantage: 'Strong on current patch meta',
        momentum: 0.75;
      }
    },
    {
      id: '2',
      match: {
        id: 'm2',
        game: 'CS2',
        tournament: 'IEM Katowice 2024',
        team1: 'FaZe',
        team2: 'Navi',
        start_time: '2024-03-15T15:30:00Z',
        status: 'live',
        map: 'Dust2',
        format: 'BO1'
      },
      market_type: 'Map Winner',
      description: 'FaZe to win Dust2',
      odds: 1.85,
      expected_value: 12.3,
      confidence: 82,
      stake_recommendation: 200,
      potential_profit: 170.00,
      risk_level: 'low',
      analysis: {
        recent_form: 'FaZe undefeated on Dust2 this tournament',
        head_to_head: 'FaZe 75% win rate vs Navi on Dust2',
        map_advantage: 'Historically strong on this map',
        momentum: 0.85;
      }
    },
    {
      id: '3',
      match: {
        id: 'm3',
        game: 'Valorant',
        tournament: 'VCT Americas',
        team1: 'Sentinels',
        team2: 'NRG',
        start_time: '2024-03-15T20:00:00Z',
        status: 'upcoming',
        format: 'BO3'
      },
      market_type: 'Total Maps',
      description: 'Over 2.5 Maps',
      odds: 2.05,
      expected_value: 18.9,
      confidence: 71,
      stake_recommendation: 100,
      potential_profit: 105.00,
      risk_level: 'medium',
      analysis: {
        recent_form: 'Both teams have close recent matches',
        head_to_head: '80% of their matches go to 3 maps',
        map_advantage: 'Very even map pool',
        momentum: 0.65;
      }
    },
    {
      id: '4',
      match: {
        id: 'm4',
        game: 'Dota 2',
        tournament: 'DPC EEU Division I',
        team1: 'Team Spirit',
        team2: 'BetBoom',
        start_time: '2024-03-15T12:00:00Z',
        status: 'upcoming',
        format: 'BO2'
      },
      market_type: 'First Blood',
      description: 'Team Spirit First Blood Game 1',
      odds: 1.92,
      expected_value: 8.7,
      confidence: 68,
      stake_recommendation: 75,
      potential_profit: 69.00,
      risk_level: 'high',
      analysis: {
        recent_form: 'Spirit aggressive early game style',
        head_to_head: '60% first blood rate vs BetBoom',
        map_advantage: 'Strong laning phase',
        momentum: 0.55;
      }
    }
  ], []);

  useEffect(() => {
    const initializeEsports = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBets(mockBets);
        setMetrics({
          total_matches: 24,
          active_bets: mockBets.length,
          daily_profit: 342.75,
          win_rate: 73.5,
          avg_odds: mockBets.reduce((acc, bet) => acc + bet.odds, 0) / mockBets.length,
          roi: 15.8;
        });
      } catch (error) {
        logger.error('Failed to initialize esports money maker', error);
      } finally {
        setLoading(false);
      }
    };

    initializeEsports();
  }, [mockBets]);

  const filteredBets = useMemo(() => {
    return bets.filter(bet => {
      if (selectedGame !== 'all' && bet.match.game !== selectedGame) return false;
      if (selectedMarket !== 'all' && bet.market_type !== selectedMarket) return false;
      return true;
    });
  }, [bets, selectedGame, selectedMarket]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'high': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'text-red-400 bg-red-400/20';
      case 'upcoming': return 'text-blue-400 bg-blue-400/20';
      case 'finished': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getGameIcon = (game: string) => {
    // In a real app, you'd have specific icons for each game;
    return <Gamepad2 className="w-5 h-5" / key={276805}>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96" key={797634}>
        <div className="text-center" key={120206}>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto" key={296358}></div>
          <p className="mt-4 text-gray-400" key={301158}>Loading Esports Opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <div className="flex items-center justify-between" key={96335}>
        <div key={241917}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" key={233760}>
            Esports Money Maker;
          </h1>
          <p className="text-gray-400 mt-2" key={874357}>
            Professional esports betting with advanced analytics and real-time data;
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-lg" key={234136}>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" key={242492}></div>
          <span className="text-sm text-purple-300" key={682676}>Live Tracking</span>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4" key={851616}>
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <Trophy className="w-5 h-5 text-purple-400" / key={406383}>
            <span className="text-sm text-gray-400" key={257018}>Total Matches</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>{metrics.total_matches}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <Target className="w-5 h-5 text-cyan-400" / key={16195}>
            <span className="text-sm text-gray-400" key={257018}>Active Bets</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>{metrics.active_bets}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <DollarSign className="w-5 h-5 text-green-400" / key={238943}>
            <span className="text-sm text-gray-400" key={257018}>Daily Profit</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>${metrics.daily_profit.toFixed(2)}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <Star className="w-5 h-5 text-yellow-400" / key={976743}>
            <span className="text-sm text-gray-400" key={257018}>Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>{metrics.win_rate}%</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <BarChart3 className="w-5 h-5 text-orange-400" / key={26794}>
            <span className="text-sm text-gray-400" key={257018}>Avg Odds</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>{metrics.avg_odds.toFixed(2)}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <TrendingUp className="w-5 h-5 text-pink-400" / key={356152}>
            <span className="text-sm text-gray-400" key={257018}>ROI</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>{metrics.roi}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
        <h3 className="text-lg font-semibold mb-4" key={792268}>Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" key={476625}>
          <div key={241917}>
            <label className="block text-sm text-gray-400 mb-2" key={475782}>Game</label>
            <select; 
              value={selectedGame}
              onChange={(e) = key={81622}> setSelectedGame(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              aria-label="Select game"
            >
              {games.map(game => (
                <option key={game} value={game} key={919306}>
                  {game === 'all' ? 'All Games' : game}
                </option>
              ))}
            </select>
          </div>

          <div key={241917}>
            <label className="block text-sm text-gray-400 mb-2" key={475782}>Market Type</label>
            <select; 
              value={selectedMarket}
              onChange={(e) = key={238627}> setSelectedMarket(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
              aria-label="Select market type"
            >
              {markets.map(market => (
                <option key={market} value={market} key={684143}>
                  {market === 'all' ? 'All Markets' : market}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Betting Opportunities */}
      <div className="space-y-4" key={160407}>
        <h3 className="text-xl font-semibold" key={18928}>Esports Opportunities ({filteredBets.length})</h3>
        
        {filteredBets.length === 0 ? (
          <div className="text-center py-12" key={752807}>
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" / key={43269}>
            <p className="text-gray-400" key={545335}>No opportunities found for the selected filters.</p>
          </div>
        ) : (
          <div className="grid gap-4" key={449070}>
            {filteredBets.map((bet) => (
              <motion.div;
                key={bet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all"
               key={180023}>
                <div className="flex items-start justify-between mb-4" key={886571}>
                  <div className="flex items-center gap-3" key={443099}>
                    <div className="p-2 bg-purple-500/20 rounded-lg" key={193372}>
                      {getGameIcon(bet.match.game)}
                    </div>
                    <div key={241917}>
                      <h4 className="font-semibold text-white" key={684150}>{bet.description}</h4>
                      <p className="text-sm text-gray-400" key={965781}>
                        {bet.match.game} • {bet.match.tournament}
                      </p>
                      <p className="text-sm text-gray-500" key={212051}>
                        {bet.match.team1} vs {bet.match.team2}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2" key={100294}>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(bet.match.status)}`} key={693475}>
                      {bet.match.status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(bet.risk_level)}`} key={326088}>
                      {bet.risk_level.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400" key={462499}>
                      <Star className="w-4 h-4" / key={274600}>
                      <span className="text-sm" key={887361}>{bet.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" key={477110}>
                  <div key={241917}>
                    <p className="text-xs text-gray-400" key={777449}>Expected Value</p>
                    <p className="text-lg font-semibold text-green-400" key={101239}>${bet.expected_value.toFixed(2)}</p>
                  </div>
                  <div key={241917}>
                    <p className="text-xs text-gray-400" key={777449}>Odds</p>
                    <p className="text-lg font-semibold text-white" key={917428}>{bet.odds.toFixed(2)}</p>
                  </div>
                  <div key={241917}>
                    <p className="text-xs text-gray-400" key={777449}>Recommended Stake</p>
                    <p className="text-lg font-semibold text-cyan-400" key={615962}>${bet.stake_recommendation}</p>
                  </div>
                  <div key={241917}>
                    <p className="text-xs text-gray-400" key={777449}>Potential Profit</p>
                    <p className="text-lg font-semibold text-purple-400" key={524097}>${bet.potential_profit.toFixed(2)}</p>
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4" key={925695}>
                  <h5 className="text-sm font-medium text-gray-300 mb-3" key={948933}>Analysis</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm" key={225557}>
                    <div key={241917}>
                      <span className="text-gray-400" key={912100}>Recent Form:</span>
                      <span className="text-white ml-2" key={788436}>{bet.analysis.recent_form}</span>
                    </div>
                    <div key={241917}>
                      <span className="text-gray-400" key={912100}>Head-to-Head:</span>
                      <span className="text-white ml-2" key={788436}>{bet.analysis.head_to_head}</span>
                    </div>
                    <div key={241917}>
                      <span className="text-gray-400" key={912100}>Map Advantage:</span>
                      <span className="text-white ml-2" key={788436}>{bet.analysis.map_advantage}</span>
                    </div>
                    <div className="flex items-center" key={520222}>
                      <span className="text-gray-400" key={912100}>Momentum:</span>
                      <div className="ml-2 flex items-center gap-2" key={658188}>
                        <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden" key={620397}>
                          <div; 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                            style={{ width: `${bet.analysis.momentum * 100}%` }}
                          / key={312857}>
                        </div>
                        <span className="text-white text-xs" key={934608}>{(bet.analysis.momentum * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between" key={96335}>
                  <div className="flex items-center gap-4 text-sm text-gray-400" key={890363}>
                    <span key={595076}>Format: {bet.match.format}</span>
                    {bet.match.map && <span key={595076}>Map: {bet.match.map}</span>}
                    <span className="flex items-center gap-1" key={136445}>
                      <Clock className="w-4 h-4" / key={414649}>
                      {bet.match.status === 'live' ? 'LIVE NOW' : new Date(bet.match.start_time).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <motion.button;
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-medium hover:from-purple-400 hover:to-pink-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                   key={531775}>
                    Place Bet;
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EsportsMoneyMaker;
