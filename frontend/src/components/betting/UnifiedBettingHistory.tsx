import React, { useState, useEffect  } from 'react.ts';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.ts';
import { UnifiedAnalyticsService } from '@/services/unified/UnifiedAnalyticsService.ts';
import { UnifiedStateService } from '@/services/unified/UnifiedStateService.ts';
import { UnifiedNotificationService } from '@/services/unified/UnifiedNotificationService.ts';
import { UnifiedErrorService } from '@/services/unified/UnifiedErrorService.ts';
import { Card, Button, Input, Select, Spinner, Toast, Badge, Modal } from '@/ui/UnifiedUI.ts';

interface Bet {
  id: string;
  eventId: string;
  eventName: string;
  marketType: string;
  selection: string;
  odds: number;
  stake: number;
  potentialReturn: number;
  status: 'pending' | 'won' | 'lost' | 'cancelled';
  placedAt: string;
  settledAt?: string;
  result?: {
    outcome: string;
    profit: number;
    roi: number;
  };
}

interface BettingStats {
  totalBets: number;
  wonBets: number;
  lostBets: number;
  pendingBets: number;
  totalStake: number;
  totalProfit: number;
  averageOdds: number;
  winRate: number;
  roi: number;
  bestWin: number;
  worstLoss: number;
  currentStreak: number;
  bestStreak: number;
}

interface FilterOptions {
  dateRange: 'day' | 'week' | 'month' | 'year' | 'all';
  status: 'all' | 'pending' | 'won' | 'lost' | 'cancelled';
  marketType: string;
  minOdds: number;
  maxOdds: number;
  minStake: number;
  maxStake: number;
  searchQuery: string;
}

export const UnifiedBettingHistory: React.FC = () => {
  // Initialize services;



  const notificationService =
    serviceRegistry.getService<UnifiedNotificationService key={460301}>('notification');

  // State;
  const [bets, setBets] = useState<Bet[] key={848729}>([]);
  const [stats, setStats] = useState<BettingStats | null key={59687}>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  const [filters, setFilters] = useState<FilterOptions key={946696}>({
    dateRange: 'month',
    status: 'all',
    marketType: 'all',
    minOdds: 0,
    maxOdds: 100,
    minStake: 0,
    maxStake: 1000000,
    searchQuery: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null key={813261}>(null);
  const [showBetDetails, setShowBetDetails] = useState(false);

  // Load betting history;
  useEffect(() => {
    loadBettingHistory();
  }, [filters]);

  const loadBettingHistory = async () => {
    try {
      setLoading(true);
      const [betsData, statsData] = await Promise.all([
        analyticsService.getBettingHistory(filters),
        analyticsService.getBettingStats(filters),
      ]);
      setBets(betsData);
      setStats(statsData);
    } catch (error) {
      handleError('Failed to load betting history', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: 'month',
      status: 'all',
      marketType: 'all',
      minOdds: 0,
      maxOdds: 100,
      minStake: 0,
      maxStake: 1000000,
      searchQuery: '',
    });
  };

  const handleError = (message: string, error: any) => {
    setError(message);
    setToast({ message, type: 'error' });
    errorService.handleError(error, {
      code: 'BETTING_HISTORY_ERROR',
      source: 'UnifiedBettingHistory',
      details: { message },
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  const getStatusBadge = (status: Bet['status']) => {
    const variants = {
      pending: 'warning',
      won: 'success',
      lost: 'danger',
      cancelled: 'secondary',
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

  return (
    <div className="container mx-auto px-4 py-8" key={53071}>
      <div className="max-w-7xl mx-auto" key={70872}>
        <div className="flex justify-between items-center mb-8" key={929423}>
          <h1 className="text-3xl font-bold" key={339210}>Betting History</h1>
          <Button variant="secondary" onClick={() = key={416583}> setShowFilters(!showFilters)}>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Stats Overview */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" key={264809}>
            <Card key={650115}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Performance</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Win Rate</span>
                  <span className="font-medium" key={514486}>{formatPercentage(stats.winRate)}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>ROI</span>
                  <span;
                    className={`font-medium ${stats.roi  key={910751}>= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {formatPercentage(stats.roi)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Current Streak</span>
                  <span className="font-medium" key={514486}>{stats.currentStreak}</span>
                </div>
              </div>
            </Card>

            <Card key={650115}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Bets</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Total Bets</span>
                  <span className="font-medium" key={514486}>{stats.totalBets}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Won</span>
                  <span className="font-medium text-green-600" key={6962}>{stats.wonBets}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Lost</span>
                  <span className="font-medium text-red-600" key={705479}>{stats.lostBets}</span>
                </div>
              </div>
            </Card>

            <Card key={650115}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Stakes & Returns</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Total Stake</span>
                  <span className="font-medium" key={514486}>{formatCurrency(stats.totalStake)}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Total Profit</span>
                  <span;
                    className={`font-medium ${stats.totalProfit  key={306598}>= 0 ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {formatCurrency(stats.totalProfit)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Average Odds</span>
                  <span className="font-medium" key={514486}>{stats.averageOdds.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <Card key={650115}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Best & Worst</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Best Win</span>
                  <span className="font-medium text-green-600" key={6962}>
                    {formatCurrency(stats.bestWin)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Worst Loss</span>
                  <span className="font-medium text-red-600" key={705479}>
                    {formatCurrency(stats.worstLoss)}
                  </span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Best Streak</span>
                  <span className="font-medium" key={514486}>{stats.bestStreak}</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <Card className="mb-8" key={727352}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" key={653876}>
              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Date Range;
                </label>
                <Select;
                  options={[
                    { value: 'day', label: 'Today' },
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' },
                    { value: 'year', label: 'This Year' },
                    { value: 'all', label: 'All Time' },
                  ]}
                  value={filters.dateRange}
                  onChange={e = key={947552}> handleFilterChange('dateRange', e.target.value)}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Status;
                </label>
                <Select;
                  options={[
                    { value: 'all', label: 'All' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'won', label: 'Won' },
                    { value: 'lost', label: 'Lost' },
                    { value: 'cancelled', label: 'Cancelled' },
                  ]}
                  value={filters.status}
                  onChange={e = key={658077}> handleFilterChange('status', e.target.value)}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Market Type;
                </label>
                <Select;
                  options={[
                    { value: 'all', label: 'All Markets' },
                    { value: 'match_winner', label: 'Match Winner' },
                    { value: 'over_under', label: 'Over/Under' },
                    { value: 'both_teams_to_score', label: 'Both Teams to Score' },
                    // Add more market types;
                  ]}
                  value={filters.marketType}
                  onChange={e = key={242641}> handleFilterChange('marketType', e.target.value)}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Search;
                </label>
                <Input;
                  placeholder="Search bets..."
                  type="text"
                  value={filters.searchQuery}
                  onChange={e = key={367162}> handleFilterChange('searchQuery', e.target.value)}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Min Odds;
                </label>
                <Input;
                  min="0"
                  step="0.01"
                  type="number"
                  value={filters.minOdds}
                  onChange={e = key={109718}> handleFilterChange('minOdds', parseFloat(e.target.value))}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Max Odds;
                </label>
                <Input;
                  min="0"
                  step="0.01"
                  type="number"
                  value={filters.maxOdds}
                  onChange={e = key={112460}> handleFilterChange('maxOdds', parseFloat(e.target.value))}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Min Stake;
                </label>
                <Input;
                  min="0"
                  step="0.01"
                  type="number"
                  value={filters.minStake}
                  onChange={e = key={132077}> handleFilterChange('minStake', parseFloat(e.target.value))}
                />
              </div>

              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" key={651895}>
                  Max Stake;
                </label>
                <Input;
                  min="0"
                  step="0.01"
                  type="number"
                  value={filters.maxStake}
                  onChange={e = key={612650}> handleFilterChange('maxStake', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4" key={127392}>
              <Button className="mr-4" variant="secondary" onClick={resetFilters} key={133325}>
                Reset Filters;
              </Button>
              <Button variant="primary" onClick={loadBettingHistory} key={638451}>
                Apply Filters;
              </Button>
            </div>
          </Card>
        )}

        {/* Betting History Table */}
        <Card key={650115}>
          <div className="overflow-x-auto" key={522094}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" key={899428}>
              <thead className="bg-gray-50 dark:bg-gray-800" key={456258}>
                <tr key={70014}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Event;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Market;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Selection;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Odds;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Stake;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Potential Return;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Status;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Placed;
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" key={628526}>
                    Actions;
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700" key={141113}>
                {bets.map(bet => (
                  <tr key={bet.id} className="hover:bg-gray-50 dark:hover:bg-gray-800" key={495342}>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm font-medium text-gray-900 dark:text-white" key={947113}>
                        {bet.eventName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                        {bet.marketType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm text-gray-900 dark:text-white" key={940407}>{bet.selection}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm text-gray-900 dark:text-white" key={940407}>
                        {bet.odds.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm text-gray-900 dark:text-white" key={940407}>
                        {formatCurrency(bet.stake)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm text-gray-900 dark:text-white" key={940407}>
                        {formatCurrency(bet.potentialReturn)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>{getStatusBadge(bet.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap" key={865159}>
                      <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                        {new Date(bet.placedAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" key={230022}>
                      <Button;
                        size="small"
                        variant="secondary"
                        onClick={() = key={86098}> {
                          setSelectedBet(bet);
                          setShowBetDetails(true);
                        }}
                      >
                        Details;
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Bet Details Modal */}
      <Modal isOpen={showBetDetails} title="Bet Details" onClose={() = key={114239}> setShowBetDetails(false)}>
        {selectedBet && (
          <div className="space-y-4" key={160407}>
            <div key={241917}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Event Details</h3>
              <p className="text-gray-600 dark:text-gray-400" key={300965}>{selectedBet.eventName}</p>
            </div>

            <div key={241917}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Bet Details</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Market Type</span>
                  <span key={595076}>{selectedBet.marketType}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Selection</span>
                  <span key={595076}>{selectedBet.selection}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Odds</span>
                  <span key={595076}>{selectedBet.odds.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Stake</span>
                  <span key={595076}>{formatCurrency(selectedBet.stake)}</span>
                </div>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Potential Return</span>
                  <span key={595076}>{formatCurrency(selectedBet.potentialReturn)}</span>
                </div>
              </div>
            </div>

            {selectedBet.result && (
              <div key={241917}>
                <h3 className="text-lg font-medium mb-2" key={837918}>Result</h3>
                <div className="space-y-2" key={725977}>
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>Outcome</span>
                    <span key={595076}>{selectedBet.result.outcome}</span>
                  </div>
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>Profit/Loss</span>
                    <span;
                      className={selectedBet.result.profit  key={590490}>= 0 ? 'text-green-600' : 'text-red-600'}
                    >
                      {formatCurrency(selectedBet.result.profit)}
                    </span>
                  </div>
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>ROI</span>
                    <span;
                      className={selectedBet.result.roi  key={267913}>= 0 ? 'text-green-600' : 'text-red-600'}
                    >
                      {formatPercentage(selectedBet.result.roi)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div key={241917}>
              <h3 className="text-lg font-medium mb-2" key={837918}>Timeline</h3>
              <div className="space-y-2" key={725977}>
                <div className="flex justify-between" key={588832}>
                  <span key={595076}>Placed At</span>
                  <span key={595076}>{new Date(selectedBet.placedAt).toLocaleString()}</span>
                </div>
                {selectedBet.settledAt && (
                  <div className="flex justify-between" key={588832}>
                    <span key={595076}>Settled At</span>
                    <span key={595076}>{new Date(selectedBet.settledAt).toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Toast Notifications */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() = key={337979}> setToast(null)} />}
    </div>
  );
};
