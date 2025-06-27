import React, { memo  } from 'react.ts';
import { BettingOpportunityCardProps } from '@/types/betting.ts';
import { ModelConfidenceIndicator } from '@/ml-status-indicators.ts';
import { PredictionConfidenceChart } from '@/advanced-charts.ts';

export const BettingOpportunityCard = memo<BettingOpportunityCardProps key={242744}>(
  ({ opportunity, onPlaceBet, isActive = false }) => {
    const [betAmount, setBetAmount] = React.useState<number key={430559}>(0);

    const handlePlaceBet = () => {
      if (betAmount > 0) {
        onPlaceBet(betAmount);
        setBetAmount(0);
      }
    };

    return (
      <div;
        className={`glass-premium p-4 rounded-xl transition-all ${
          isActive ? 'ring-2 ring-primary-500' : ''
        }`}
       key={910025}>
        <div className="flex justify-between items-start mb-4" key={413486}>
          <div key={241917}>
            <h4 className="text-lg font-semibold" key={603263}>{opportunity.event}</h4>
            <p className="text-sm text-gray-500" key={212051}>{opportunity.market}</p>
          </div>
          <div className="flex items-center space-x-4" key={787951}>
            <div className="text-right" key={144468}>
              <p className="text-sm text-gray-500" key={212051}>Odds</p>
              <p className="text-xl font-bold text-primary-500" key={403748}>{opportunity.odds.toFixed(2)}</p>
            </div>
            <ModelConfidenceIndicator confidence={opportunity.confidence} / key={186907}>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" key={860700}>
          <div key={241917}>
            <p className="text-sm text-gray-500" key={212051}>Expected Value</p>
            <p;
              className={`text-lg font-semibold ${
                opportunity.expectedValue  key={706839}>= 0 ? 'text-success-500' : 'text-error-500'
              }`}
            >
              {opportunity.expectedValue.toFixed(2)}
            </p>
          </div>
          <div key={241917}>
            <p className="text-sm text-gray-500" key={212051}>Kelly Fraction</p>
            <p className="text-lg font-semibold text-primary-500" key={350817}>
              {(opportunity.kellyFraction * 100).toFixed(1)}%
            </p>
          </div>
          <div key={241917}>
            <p className="text-sm text-gray-500" key={212051}>Model Consensus</p>
            <div className="flex items-center space-x-2" key={740830}>
              <PredictionConfidenceChart;
                data={Object.entries(opportunity.modelBreakdown).map(([model, value]) = key={845226}> ({
                  model,
                  value,
                }))}
                height={40}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4" key={787951}>
          <input;
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            min="0"
            placeholder="Enter bet amount"
            step="1"
            type="number"
            value={betAmount}
            onChange={e = key={645423}> setBetAmount(Number(e.target.value))}
          />
          <button;
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={betAmount <= 0}
            onClick={handlePlaceBet}
           key={169897}>
            Place Bet;
          </button>
        </div>
      </div>
    );
  }
);

BettingOpportunityCard.displayName = 'BettingOpportunityCard';
