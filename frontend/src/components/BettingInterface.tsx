import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Target,
  TrendingUp,
  Clock,
  Star,
  Filter,
  Search,
  RefreshCw,
} from 'lucide-react';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  sport: string;
  league: string;
  startTime: string;
  status: 'scheduled' | 'live' | 'finished';
}

interface Odds {
  id: number;
  matchId: number;
  bookmaker: string;
  marketType: string;
  homeOdds: number;
  awayOdds: number;
  drawOdds?: number;
  overUnder?: {
    line: number;
    overOdds: number;
    underOdds: number;
  };
}

interface NewBet {
  matchId: number;
  betType: string;
  selection: string;
  stake: number;
  odds: number;
}

interface BetResult {
  success: boolean;
  betId?: number;
  message: string;
}

interface BettingInterfaceProps {
  availableMatches: Match[];
  liveOdds: Odds[];
  onPlaceBet: (bet: NewBet) => Promise<BetResult>;
  userBalance: number;
}

const BettingInterface: React.FC<BettingInterfaceProps> = ({
  availableMatches,
  liveOdds,
  onPlaceBet,
  userBalance,
}) => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedBetType, setSelectedBetType] = useState<string>('match_winner');
  const [selectedSelection, setSelectedSelection] = useState<string>('');
  const [selectedOdds, setSelectedOdds] = useState<number>(0);
  const [stakeAmount, setStakeAmount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [isPlacingBet, setIsPlacingBet] = useState<boolean>(false);

  const filteredMatches = availableMatches.filter(match => {
    const matchesSearch =
      searchTerm === '' ||
      match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = selectedSport === 'all' || match.sport === selectedSport;
    return matchesSearch && matchesSport;
  });

  const potentialWinnings = stakeAmount * selectedOdds;
  const profit = potentialWinnings - stakeAmount;

  const handlePlaceBet = async () => {
    if (!selectedMatch || !selectedSelection || stakeAmount <= 0) return;

    setIsPlacingBet(true);
    try {
      const result = await onPlaceBet({
        matchId: selectedMatch.id,
        betType: selectedBetType,
        selection: selectedSelection,
        stake: stakeAmount,
        odds: selectedOdds,
      });

      if (result.success) {
        // Reset form
        setSelectedMatch(null);
        setSelectedSelection('');
        setSelectedOdds(0);
        setStakeAmount(0);
        alert(`Bet placed successfully! Bet ID: ${result.betId}`);
      } else {
        alert(`Failed to place bet: ${result.message}`);
      }
    } catch (error) {
      alert('An error occurred while placing the bet');
    } finally {
      setIsPlacingBet(false);
    }
  };

  const getMatchOdds = (matchId: number) => {
    return liveOdds.filter(odds => odds.matchId === matchId);
  };

  const sports = ['all', ...new Set(availableMatches.map(match => match.sport))];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2'>
            Betting Interface
          </h1>
          <p className='text-gray-400'>
            Place your bets with AI-powered insights • Balance: ${userBalance.toLocaleString()}
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Match Selection */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Filters */}
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'>
              <h3 className='text-xl font-semibold text-white mb-4'>Filter Matches</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-gray-400 text-sm mb-2'>Search Teams</label>
                  <div className='relative'>
                    <Search className='absolute left-3 top-3 w-4 h-4 text-gray-400' />
                    <input
                      type='text'
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder='Search teams...'
                      className='w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-gray-400 text-sm mb-2'>Sport</label>
                  <select
                    value={selectedSport}
                    onChange={e => setSelectedSport(e.target.value)}
                    className='w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
                  >
                    {sports.map(sport => (
                      <option key={sport} value={sport} className='bg-slate-800'>
                        {sport === 'all' ? 'All Sports' : sport.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Available Matches */}
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'>
              <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
                <Target className='w-5 h-5 mr-2' />
                Available Matches ({filteredMatches.length})
              </h3>
              <div className='space-y-3'>
                {filteredMatches.map(match => {
                  const matchOdds = getMatchOdds(match.id);
                  const isSelected = selectedMatch?.id === match.id;

                  return (
                    <motion.div
                      key={match.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-yellow-500/20 border-yellow-500/50'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedMatch(match)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className='flex items-center justify-between mb-2'>
                        <div>
                          <h4 className='text-white font-semibold'>
                            {match.homeTeam} vs {match.awayTeam}
                          </h4>
                          <p className='text-gray-400 text-sm'>
                            {match.league} • {new Date(match.startTime).toLocaleString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            match.status === 'live'
                              ? 'bg-red-500/20 text-red-400'
                              : match.status === 'scheduled'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {match.status}
                        </span>
                      </div>

                      {matchOdds.length > 0 && (
                        <div className='grid grid-cols-3 gap-2 mt-3'>
                          <div className='text-center p-2 bg-white/10 rounded'>
                            <p className='text-gray-400 text-xs'>{match.homeTeam}</p>
                            <p className='text-white font-semibold'>{matchOdds[0]?.homeOdds}</p>
                          </div>
                          {matchOdds[0]?.drawOdds && (
                            <div className='text-center p-2 bg-white/10 rounded'>
                              <p className='text-gray-400 text-xs'>Draw</p>
                              <p className='text-white font-semibold'>{matchOdds[0]?.drawOdds}</p>
                            </div>
                          )}
                          <div className='text-center p-2 bg-white/10 rounded'>
                            <p className='text-gray-400 text-xs'>{match.awayTeam}</p>
                            <p className='text-white font-semibold'>{matchOdds[0]?.awayOdds}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bet Slip */}
          <div className='space-y-6'>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'>
              <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
                <DollarSign className='w-5 h-5 mr-2' />
                Bet Slip
              </h3>

              {selectedMatch ? (
                <div className='space-y-4'>
                  <div>
                    <h4 className='text-white font-medium mb-2'>
                      {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                    </h4>
                    <p className='text-gray-400 text-sm'>{selectedMatch.league}</p>
                  </div>

                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Bet Type</label>
                    <select
                      value={selectedBetType}
                      onChange={e => setSelectedBetType(e.target.value)}
                      className='w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400'
                    >
                      <option value='match_winner' className='bg-slate-800'>
                        Match Winner
                      </option>
                      <option value='over_under' className='bg-slate-800'>
                        Over/Under
                      </option>
                      <option value='handicap' className='bg-slate-800'>
                        Handicap
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Selection</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <button
                        onClick={() => {
                          setSelectedSelection('home');
                          setSelectedOdds(getMatchOdds(selectedMatch.id)[0]?.homeOdds || 0);
                        }}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedSelection === 'home'
                            ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <p className='text-sm'>{selectedMatch.homeTeam}</p>
                        <p className='font-semibold'>
                          {getMatchOdds(selectedMatch.id)[0]?.homeOdds}
                        </p>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSelection('away');
                          setSelectedOdds(getMatchOdds(selectedMatch.id)[0]?.awayOdds || 0);
                        }}
                        className={`p-3 rounded-lg border transition-all ${
                          selectedSelection === 'away'
                            ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
                            : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        <p className='text-sm'>{selectedMatch.awayTeam}</p>
                        <p className='font-semibold'>
                          {getMatchOdds(selectedMatch.id)[0]?.awayOdds}
                        </p>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className='block text-gray-400 text-sm mb-2'>Stake Amount</label>
                    <input
                      type='number'
                      value={stakeAmount}
                      onChange={e => setStakeAmount(Number(e.target.value))}
                      placeholder='Enter stake amount...'
                      className='w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                    />
                    <div className='flex gap-2 mt-2'>
                      {[10, 25, 50, 100].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setStakeAmount(amount)}
                          className='px-3 py-1 bg-white/10 border border-white/20 rounded text-sm text-gray-300 hover:bg-white/20 transition-all'
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {stakeAmount > 0 && selectedOdds > 0 && (
                    <div className='bg-white/5 rounded-lg p-4 space-y-2'>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Stake:</span>
                        <span className='text-white'>${stakeAmount}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Odds:</span>
                        <span className='text-white'>{selectedOdds}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-400'>Potential Winnings:</span>
                        <span className='text-green-400'>${potentialWinnings.toFixed(2)}</span>
                      </div>
                      <div className='flex justify-between font-semibold'>
                        <span className='text-gray-400'>Profit:</span>
                        <span className='text-green-400'>${profit.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <motion.button
                    onClick={handlePlaceBet}
                    disabled={
                      !selectedSelection ||
                      stakeAmount <= 0 ||
                      stakeAmount > userBalance ||
                      isPlacingBet
                    }
                    className='w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isPlacingBet ? (
                      <>
                        <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                        Placing Bet...
                      </>
                    ) : (
                      <>
                        <DollarSign className='w-4 h-4 mr-2' />
                        Place Bet
                      </>
                    )}
                  </motion.button>
                </div>
              ) : (
                <div className='text-center py-8'>
                  <Target className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-400'>Select a match to place a bet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Default component with mock data
const BettingInterfaceWithMockData: React.FC = () => {
  const mockMatches: Match[] = [
    {
      id: 1,
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      sport: 'basketball',
      league: 'NBA',
      startTime: '2024-01-15T20:00:00Z',
      status: 'scheduled',
    },
    {
      id: 2,
      homeTeam: 'Cowboys',
      awayTeam: 'Giants',
      sport: 'football',
      league: 'NFL',
      startTime: '2024-01-16T18:00:00Z',
      status: 'scheduled',
    },
  ];

  const mockOdds: Odds[] = [
    {
      id: 1,
      matchId: 1,
      bookmaker: 'DraftKings',
      marketType: 'match_winner',
      homeOdds: 1.85,
      awayOdds: 1.95,
    },
    {
      id: 2,
      matchId: 2,
      bookmaker: 'DraftKings',
      marketType: 'match_winner',
      homeOdds: 2.1,
      awayOdds: 1.75,
    },
  ];

  const handlePlaceBet = async (bet: NewBet): Promise<BetResult> => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      betId: Math.floor(Math.random() * 1000),
      message: 'Bet placed successfully',
    };
  };

  return (
    <BettingInterface
      availableMatches={mockMatches}
      liveOdds={mockOdds}
      onPlaceBet={handlePlaceBet}
      userBalance={2500}
    />
  );
};

export default BettingInterfaceWithMockData;
export { BettingInterface };
