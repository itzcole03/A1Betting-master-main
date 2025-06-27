import React from 'react.ts';
import { useState } from 'react.ts';
import { useBettingAnalytics } from '@/hooks/useBettingAnalytics.ts';
import { BettingStrategy } from '@/services/unified/UnifiedBettingAnalytics.ts';
import { RiskReasoningDisplay } from '@/shared/RiskReasoningDisplay.ts';

interface BettingAnalyticsProps {
  market: string;
  initialOdds: number;
  initialStake: number;
  className?: string;
}

export function BettingAnalytics({
  market,
  initialOdds,
  initialStake,
  className = '',
}: BettingAnalyticsProps) {
  const [odds, setOdds] = useState(initialOdds);
  const [stake, setStake] = useState(initialStake);

  const {
    analysis,
    isLoading,
    error,
    strategies,
    addStrategy,
    removeStrategy,
    calculatePotentialProfit,
    getRecommendedStake,
    getRiskAssessment,
  } = useBettingAnalytics({
    market,
    odds,
    stake,
    autoRefresh: true,
  });

  const handleAddStrategy = () => {
    const newStrategy: BettingStrategy = {
      id: crypto.randomUUID(),
      name: 'Custom Strategy',
      riskLevel: 'medium',
      stakePercentage: 5,
      minOdds: 1.5,
      maxOdds: 3.0,
    };
    addStrategy(newStrategy);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8" key={330113}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" / key={299563}>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700" key={679835}>
        <p key={161203}>Error loading analysis: {error.message}</p>
      </div>
    );
  }



  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`} key={679157}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
        {/* Market Information */}
        <div className="space-y-4" key={160407}>
          <h2 className="text-2xl font-bold text-gray-900" key={381367}>Market Analysis</h2>
          <div className="flex items-center space-x-4" key={787951}>
            <div className="flex-1" key={745195}>
              <label className="block text-sm font-medium text-gray-700" key={795081}>Odds</label>
              <input;
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="1"
                step="0.01"
                type="number"
                value={odds}
                onChange={e = key={762088}> setOdds(Number(e.target.value))}
              />
            </div>
            <div className="flex-1" key={745195}>
              <label className="block text-sm font-medium text-gray-700" key={795081}>Stake</label>
              <input;
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="1"
                type="number"
                value={stake}
                onChange={e = key={918057}> setStake(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="space-y-4" key={160407}>
          <h2 className="text-2xl font-bold text-gray-900" key={381367}>Risk Assessment</h2>
          <div;
            className={`p-4 rounded-lg ${riskAssessment.level === 'low'
                ? 'bg-green-50 text-green-700'
                : riskAssessment.level === 'medium'
                  ? 'bg-yellow-50 text-yellow-700'
                  : 'bg-red-50 text-red-700'
              }`}
           key={54984}>
            <p className="font-semibold capitalize" key={452184}>Risk Level: {riskAssessment.level}</p>
            <ul className="mt-2 space-y-1" key={838219}>
              {riskAssessment.factors.map((factor, index) => (
                <li key={index} key={760236}>2 {factor}</li>
              ))}
            </ul>
            {/* Risk Reasoning Display */}
            {analysis?.risk_reasoning && (
              <RiskReasoningDisplay riskReasoning={analysis.risk_reasoning} className="mt-3" / key={24883}>
            )}
          </div>
        </div>

        {/* Analytics */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4" key={279633}>
          <div className="bg-blue-50 rounded-lg p-4" key={217813}>
            <h3 className="text-lg font-semibold text-blue-900" key={253984}>Recommended Stake</h3>
            <p className="text-2xl font-bold text-blue-600" key={945487}>${recommendedStake.toFixed(2)}</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4" key={515466}>
            <h3 className="text-lg font-semibold text-green-900" key={55655}>Potential Profit</h3>
            <p className="text-2xl font-bold text-green-600" key={401802}>${potentialProfit.toFixed(2)}</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-4" key={181963}>
            <h3 className="text-lg font-semibold text-purple-900" key={350706}>Prediction Confidence</h3>
            <p className="text-2xl font-bold text-purple-600" key={213052}>
              {analysis?.predictionConfidence;
                ? `${(analysis.predictionConfidence * 100).toFixed(1)}%`
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Strategies */}
        <div className="md:col-span-2" key={52711}>
          <div className="flex items-center justify-between mb-4" key={810034}>
            <h2 className="text-2xl font-bold text-gray-900" key={381367}>Active Strategies</h2>
            <button;
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleAddStrategy}
             key={451466}>
              Add Strategy;
            </button>
          </div>
          <div className="space-y-4" key={160407}>
            {strategies.map(strategy => (
              <div;
                key={strategy.id}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-4"
               key={585371}>
                <div key={241917}>
                  <h3 className="font-semibold" key={204068}>{strategy.name}</h3>
                  <p className="text-sm text-gray-600" key={656535}>
                    Risk: {strategy.riskLevel} | Stake: {strategy.stakePercentage}%
                  </p>
                </div>
                <button;
                  className="text-red-600 hover:text-red-800"
                  onClick={() = key={697480}> removeStrategy(strategy.id)}
                >
                  Remove;
                </button>
              </div>
            ))}
            {strategies.length === 0 && (
              <p className="text-gray-500 text-center py-4" key={980913}>No active strategies</p>
            )}
          </div>
        </div>

        {/* Hedging Opportunities */}
        {analysis?.hedgingOpportunities && analysis.hedgingOpportunities.length > 0 && (
          <div className="md:col-span-2" key={52711}>
            <h2 className="text-2xl font-bold text-gray-900 mb-4" key={132579}>Hedging Opportunities</h2>
            <div className="space-y-4" key={160407}>
              {analysis.hedgingOpportunities.map((opportunity, index) => (
                <div;
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                 key={462101}>
                  <div key={241917}>
                    <h3 className="font-semibold" key={204068}>{opportunity.market}</h3>
                    <p className="text-sm text-gray-600" key={656535}>
                      Odds: {opportunity.odds} | Recommended Stake: $
                      {opportunity.recommendedStake.toFixed(2)}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" key={133429}>
                    Place Hedge;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
