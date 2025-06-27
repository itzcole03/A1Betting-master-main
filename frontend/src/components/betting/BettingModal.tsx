import { useRiskProfile } from '@/hooks/useRiskProfile.ts';
import React, { useState  } from 'react.ts';
import { BettingStrategy, RiskProfile } from '@/types/betting.ts';
import { Event, Market, Odds, Selection } from '@/types/sports.ts';
import { RiskReasoningDisplay } from '@/shared/RiskReasoningDisplay.ts';
import { Badge, Button, Card, Icon, Spinner } from '@/ui/UnifiedUI.ts';

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  market: Market;
  selection: Selection;
  odds: Odds;
  confidenceScore: number;
  expectedValue: number;
  kellyFraction: number;
  riskProfile: RiskProfile;
  selectedStrategy: BettingStrategy;
  onStrategyChange: (strategy: BettingStrategy) => void;
  stake: number;
  onStakeChange: (stake: number) => void;
  onPlaceBet: () => void;
  isLoading: boolean;
  error: string | null;
}

export const BettingModal: React.FC<BettingModalProps key={488043}> = ({
  isOpen,
  onClose,
  event,
  market,
  selection,
  odds,
  confidenceScore,
  expectedValue,
  kellyFraction,
  riskProfile,
  selectedStrategy,
  onStrategyChange,
  stake,
  onStakeChange,
  onPlaceBet,
  isLoading,
  error: externalError,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const { validateBet } = useRiskProfile();

  if (!isOpen) return null;

  const getStrategyDescription = (strategy: BettingStrategy): string => {
    switch (strategy) {
      case 'kelly':
        return 'Kelly Criterion: Optimal bet sizing based on edge and odds';
      case 'fixed':
        return 'Fixed Stake: Consistent bet size regardless of edge';
      case 'martingale':
        return 'Martingale: Double stake after losses';
      case 'fibonacci':
        return 'Fibonacci: Progressive stake based on Fibonacci sequence';
      default:
        return '';
    }
  };

  const getRecommendedStake = (): number => {
    switch (selectedStrategy) {
      case 'kelly':
        return kellyFraction * 100;
      case 'fixed':
        return 10; // Default fixed stake;
      case 'martingale':
        return stake * 2; // Double previous stake;
      case 'fibonacci':
        // Simple Fibonacci sequence implementation;

        return fib[Math.min(fib.length - 1, Math.floor(stake / 10))] * 10;
      default:
        return stake;
    }
  };

  const handlePlaceBet = () => {
    const betData = {
      stake,
      confidence: confidenceScore,
      kellyFraction,
      sport: event.sport || '',
      market: market.name || '',
      eventId: event.id || '',
    };

    if (!validation.isValid) {
      setError('Bet does not meet risk profile: ' + validation.errors.join(', '));
      return;
    }
    setError(null);
    onPlaceBet();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" key={831253}>
      <Card className="w-full max-w-2xl p-6" variant="bordered" key={986967}>
        <div className="flex justify-between items-start mb-6" key={759541}>
          <div key={241917}>
            <h3 className="text-xl font-semibold" key={18928}>Place Bet</h3>
            <p className="text-gray-600" key={486863}>
              {event.name} - {market.name}
            </p>
          </div>
          <Button size="small" variant="ghost" onClick={onClose} key={979884}>
            <Icon className="w-5 h-5" name="x-mark" / key={177311}>
          </Button>
        </div>

        <div className="space-y-6" key={501869}>
          <div className="grid grid-cols-2 gap-4" key={354810}>
            <div key={241917}>
              <p className="text-sm text-gray-600" key={656535}>Selection</p>
              <p className="font-medium" key={787187}>{selection.name}</p>
            </div>
            <div key={241917}>
              <p className="text-sm text-gray-600" key={656535}>Odds</p>
              <p className="font-medium" key={787187}>{odds.value.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4" key={542789}>
            <div key={241917}>
              <p className="text-sm text-gray-600" key={656535}>Confidence</p>
              <div className="flex items-center space-x-2" key={740830}>
                <p className="font-medium" key={787187}>{(confidenceScore * 100).toFixed(1)}%</p>
                <Badge;
                  variant={
                    confidenceScore  key={621668}>= 0.7;
                      ? 'success'
                      : confidenceScore >= 0.5;
                        ? 'warning'
                        : 'danger'
                  }
                >
                  {confidenceScore >= 0.7 ? 'High' : confidenceScore >= 0.5 ? 'Medium' : 'Low'}
                </Badge>
              </div>
            </div>
            <div key={241917}>
              <p className="text-sm text-gray-600" key={656535}>Expected Value</p>
              <p;
                className={`font-medium ${expectedValue  key={934746}>= 0 ? 'text-green-500' : 'text-red-500'}`}
              >
                {(expectedValue * 100).toFixed(1)}%
              </p>
            </div>
            <div key={241917}>
              <p className="text-sm text-gray-600" key={656535}>Kelly Fraction</p>
              <p className="font-medium" key={787187}>{(kellyFraction * 100).toFixed(1)}%</p>
            </div>
          </div>

          <div key={241917}>
            <p className="text-sm text-gray-600 mb-2" key={458976}>Betting Strategy</p>
            <div className="grid grid-cols-2 gap-2" key={23071}>
              {(['kelly', 'fixed', 'martingale', 'fibonacci'] as BettingStrategy[]).map(
                strategy => (
                  <Button;
                    key={strategy}
                    className="justify-start"
                    size="small"
                    variant={selectedStrategy === strategy ? 'primary' : 'secondary'}
                    onClick={() = key={278969}> onStrategyChange(strategy)}
                  >
                    <Icon;
                      className="w-4 h-4 mr-2"
                      name={selectedStrategy === strategy ? 'check-circle' : 'circle'}
                    / key={357692}>
                    {strategy.charAt(0).toUpperCase() + strategy.slice(1)}
                  </Button>
                )
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2" key={436507}>{getStrategyDescription(selectedStrategy)}</p>
          </div>

          <div key={241917}>
            <p className="text-sm text-gray-600 mb-2" key={458976}>Stake</p>
            <div className="flex items-center space-x-4" key={787951}>
              <input;
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                step="0.01"
                type="number"
                value={stake}
                onChange={e = key={750678}> onStakeChange(Number(e.target.value))}
              />
              <Button;
                size="small"
                variant="secondary"
                onClick={() = key={287680}> onStakeChange(getRecommendedStake())}
              >
                Use Recommended;
              </Button>
            </div>
          </div>

          <div key={241917}>
            <Button;
              className="flex items-center"
              size="small"
              variant="ghost"
              onClick={() = key={881688}> setShowAdvanced(!showAdvanced)}
            >
              <Icon className="w-4 h-4 mr-2" name={showAdvanced ? 'chevron-up' : 'chevron-down'} / key={613685}>
              Advanced Options;
            </Button>

            {showAdvanced && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg" key={483817}>
                <div className="space-y-4" key={160407}>
                  <div key={241917}>
                    <p className="text-sm font-medium mb-2" key={903556}>Risk Profile</p>
                    <div className="flex items-center space-x-2" key={740830}>
                      <Badge variant={riskProfile.riskLevel.toLowerCase() as any} key={679506}>
                        {riskProfile.riskLevel}
                      </Badge>
                      <p className="text-sm text-gray-600" key={656535}>{riskProfile.recommendation}</p>
                    </div>
                  </div>

                  <div key={241917}>
                    <p className="text-sm font-medium mb-2" key={903556}>Top Risk Factors</p>
                    <div className="space-y-2" key={725977}>
                      {riskProfile.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between" key={912667}>
                          <p className="text-sm" key={364551}>{factor.name}</p>
                          <Badge variant={factor.severity.toLowerCase() as any} key={492443}>
                            {factor.severity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {/* Risk Reasoning Display (if present) */}
                    {Array.isArray((riskProfile as any).risk_reasoning) && (riskProfile as any).risk_reasoning.length > 0 && (
                      <RiskReasoningDisplay riskReasoning={(riskProfile as any).risk_reasoning} className="mt-3" / key={440485}>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-center" key={232604}>
              <Icon className="w-5 h-5 mx-auto mb-2" name="exclamation-circle" / key={738385}>
              <p key={161203}>{error}</p>
            </div>
          )}
          {externalError && !error && (
            <div className="text-red-500 text-center" key={232604}>
              <Icon className="w-5 h-5 mx-auto mb-2" name="exclamation-circle" / key={738385}>
              <p key={161203}>{externalError}</p>
            </div>
          )}

          <div className="flex justify-end space-x-4" key={910332}>
            <Button disabled={isLoading} variant="secondary" onClick={onClose} key={707556}>
              Cancel;
            </Button>
            <Button disabled={isLoading || stake <= 0} variant="primary" onClick={handlePlaceBet} key={131249}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2" size="small" / key={706726}>
                  Placing Bet...
                </>
              ) : (
                'Place Bet'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
