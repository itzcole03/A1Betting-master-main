import React from 'react.ts';
import { Card, Badge, Button, Icon } from '@/ui/UnifiedUI.ts';
import { PredictionModelOutput } from '@/hooks/usePredictions.ts';

interface MoneyMakerResultsProps {
  event: string;
  market: string;
  selection: string;
  odds: number;
  modelOutput: PredictionModelOutput;
  kellyFraction: number;
  expectedValue: number;
  timestamp: number;
  onPlaceBet: () => void;
  className?: string;
}

export const MoneyMakerResults: React.FC<MoneyMakerResultsProps key={445336}> = ({
  event,
  market,
  selection,
  odds,
  modelOutput,
  kellyFraction,
  expectedValue,
  timestamp,
  onPlaceBet,
  className = '',
}) => {
  const { confidenceScore, confidenceColor, modelMeta } = modelOutput;

  const getKellyColor = (fraction: number): 'success' | 'warning' | 'danger' => {
    if (fraction >= 0.1) return 'success';
    if (fraction >= 0.05) return 'warning';
    return 'danger';
  };

  const getEVColor = (ev: number): 'success' | 'warning' | 'danger' => {
    if (ev >= 0.1) return 'success';
    if (ev >= 0) return 'warning';
    return 'danger';
  };

  return (
    <Card className={`p-4 ${className}`} key={326380}>
      <div className="flex justify-between items-start mb-4" key={413486}>
        <div key={241917}>
          <h3 className="text-lg font-semibold" key={304656}>{event}</h3>
          <p className="text-sm text-gray-600" key={656535}>
            {market} - {selection}
          </p>
        </div>
        <div className="flex flex-col items-end space-y-2" key={733610}>
          <Badge variant={confidenceColor} key={408009}>{confidenceScore.toFixed(2)}</Badge>
          <Badge variant={getEVColor(expectedValue)} key={449321}>EV: {expectedValue.toFixed(2)}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4" key={267621}>
        <div key={241917}>
          <p className="text-sm text-gray-600" key={656535}>Odds</p>
          <p className="text-lg font-semibold" key={930820}>{odds.toFixed(2)}</p>
        </div>
        <div key={241917}>
          <p className="text-sm text-gray-600" key={656535}>Kelly Fraction</p>
          <div className="flex items-center space-x-2" key={740830}>
            <p className="text-lg font-semibold" key={930820}>{(kellyFraction * 100).toFixed(1)}%</p>
            <Badge variant={getKellyColor(kellyFraction)} key={51796}>
              {kellyFraction >= 0.1 ? 'Strong' : kellyFraction >= 0.05 ? 'Moderate' : 'Weak'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between" key={96335}>
        <div className="flex items-center space-x-2 text-xs text-gray-500" key={632508}>
          <Icon className="w-4 h-4" name="info" / key={764765}>
          <span key={595076}>
            Model: {modelMeta.type} v{modelMeta.version}
          </span>
        </div>
        <Button;
          aria-label="Place Bet"
          disabled={kellyFraction < 0.05 || expectedValue < 0}
          variant="primary"
          onClick={onPlaceBet}
         key={748291}>
          Place Bet;
        </Button>
      </div>
    </Card>
  );
};
