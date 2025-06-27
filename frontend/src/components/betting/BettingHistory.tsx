import React, { useEffect, useState  } from 'react.ts';
import { Card, Badge, Icon, Spinner } from '@/ui/UnifiedUI.js';
import { UnifiedServiceRegistry } from '@/services/unified/UnifiedServiceRegistry.js';
import { UnifiedBettingService } from '@/services/unified/UnifiedBettingService.js';
import { Bet } from '@/types/betting.js';

interface BettingHistoryProps {
  eventId: string;
  marketId: string;
  selectionId: string;
  className?: string;
}

export const BettingHistory: React.FC<BettingHistoryProps key={228963}> = ({
  eventId,
  marketId,
  selectionId,
  className = '',
}) => {
  const [bets, setBets] = useState<Bet[] key={848729}>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null key={121216}>(null);


  useEffect(() => {
    const loadBets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!bettingService) {
          setError('Betting service unavailable');
          setBets([]);
          return;
        }

        setBets(history);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load betting history');
      } finally {
        setIsLoading(false);
      }
    }; loadBets();
  }, [eventId, marketId, selectionId, bettingService]);

  const getOutcomeColor = (outcome: Bet['outcome']): string => {
    switch (outcome) {
      case 'won':
        return 'text-green-500';
      case 'lost':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getOutcomeIcon = (outcome: Bet['outcome']): string => {
    switch (outcome) {
      case 'won':
        return 'check-circle';
      case 'lost':
        return 'x-circle';
      default:
        return 'clock';
    }
  };

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`} key={971488}>
        <div className="flex justify-center items-center h-32" key={71295}>
          <Spinner size="large" / key={932834}>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`} key={971488}>
        <div className="text-red-500 text-center" key={232604}>
          <Icon className="w-8 h-8 mx-auto mb-2" name="exclamation-circle" / key={646897}>
          <p key={161203}>{error}</p>
        </div>
      </Card>
    );
  }

  if (bets.length === 0) {
    return (
      <Card className={`p-6 ${className}`} key={971488}>
        <div className="text-center text-gray-500" key={262576}>
          <Icon className="w-8 h-8 mx-auto mb-2" name="document-text" / key={955050}>
          <p key={161203}>No betting history available</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 ${className}`} key={971488}>
      <h3 className="text-lg font-semibold mb-4" key={792268}>Betting History</h3>

      <div className="space-y-4" key={160407}>
        {bets.map(bet => (
          <div;
            key={bet.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            role="listitem"
           key={648305}>
            <div className="flex items-center space-x-4" key={787951}>
              <Icon;
                aria-label={`Outcome: ${bet.outcome}`}
                className={`w-6 h-6 ${getOutcomeColor(bet.outcome)}`}
                name={getOutcomeIcon(bet.outcome)}
              / key={504561}>
              <div key={241917}>
                <p className="font-medium" key={787187}>{bet.marketName}</p>
                <p className="text-sm text-gray-600" key={656535}>{new Date(bet.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div className="text-right" key={144468}>
              <div className="flex items-center space-x-2" key={740830}>
                <Badge;
                  variant={
                    bet.outcome === 'won'
                      ? 'success'
                      : bet.outcome === 'lost'
                        ? 'danger'
                        : 'info'
                  }
                 key={180060}>
                  {bet.outcome}
                </Badge>
                <p className={`font-semibold ${getOutcomeColor(bet.outcome)}`} key={620195}>
                  {bet.outcome === 'won' ? '+' : bet.outcome === 'lost' ? '-' : ''}
                  {bet.stake.toFixed(2)}
                </p>
              </div>
              <p className="text-sm text-gray-600" key={656535}>Odds: {bet.odds.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200" key={701583}>
        <div className="grid grid-cols-3 gap-4" key={542789}>
          <div key={241917}>
            <p className="text-sm text-gray-600" key={656535}>Total Bets</p>
            <p className="text-lg font-semibold" key={930820}>{bets.length}</p>
          </div>
          <div key={241917}>
            <p className="text-sm text-gray-600" key={656535}>Win Rate</p>
            <p className="text-lg font-semibold" key={930820}>
              {((bets.filter(b => b.outcome === 'won').length / bets.length) * 100).toFixed(1)}%
            </p>
          </div>
          <div key={241917}>
            <p className="text-sm text-gray-600" key={656535}>Profit/Loss</p>
            <p className="text-lg font-semibold" key={930820}>
              {bets;
                .reduce((acc, bet) => {
                  if (bet.outcome === 'won') return acc + (bet.stake * bet.odds - bet.stake);
                  if (bet.outcome === 'lost') return acc - bet.stake;
                  return acc;
                }, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
