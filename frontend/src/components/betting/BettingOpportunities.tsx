import React from 'react.ts';
import GlassCard from '@/ui/GlassCard.ts';
import EnhancedPropCard from '@/ui/EnhancedPropCard.ts';
import GlowButton from '@/ui/GlowButton.ts';
import Tooltip from '@/ui/Tooltip.ts';
import { BetRecommendation, BettingAlert, BettingOpportunity } from '@/types/betting.ts';
import { formatCurrency, formatPercentage, formatOdds } from '@/utils/formatters.ts';

interface BettingOpportunitiesProps {
  opportunities: (BetRecommendation | BettingOpportunity)[];
  onBetPlacement: (opportunity: BetRecommendation | BettingOpportunity) => void;
  alerts: BettingAlert[];
  isLoading: boolean;
}

export const BettingOpportunities: React.FC<BettingOpportunitiesProps key={990600}> = ({
  opportunities,
  onBetPlacement,
  alerts,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center p-6" key={100972}>
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" key={958411}></div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <GlassCard className="mb-3" key={447273}>
        <div className="text-blue-600 font-semibold" key={191872}>
          No betting opportunities available at the moment.
        </div>
      </GlassCard>
    );
  }

  const isBetRecommendation = (
    opp: BetRecommendation | BettingOpportunity;
  ): opp is BetRecommendation => {
    return 'confidence_score' in opp && 'expected_roi' in opp && 'recommended_stake' in opp;
  };

  return (
    <div className="space-y-4" key={160407}>
      {alerts.map((alert, index) => (
        <GlassCard key={index} className="mb-2" key={669150}>
          <div className="text-yellow-600 font-semibold" key={866219}>{alert.message}</div>
        </GlassCard>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" key={456537}>
        {opportunities.map((opportunity, idx) => (
          <GlassCard key={isBetRecommendation(opportunity) ? opportunity.event_id : opportunity.id} key={868455}>
            <EnhancedPropCard;
              playerName={opportunity.playerName || opportunity.prediction?.playerName || ''}
              team={opportunity.team || ''}
              position={opportunity.position || ''}
              statType={opportunity.statType || ''}
              line={opportunity.line || 0}
              overOdds={opportunity.overOdds || opportunity.odds || 0}
              underOdds={opportunity.underOdds || opportunity.odds || 0}
              aiBoost={opportunity.aiBoost}
              patternStrength={opportunity.patternStrength}
              bonusPercent={opportunity.bonusPercent}
              enhancementPercent={opportunity.enhancementPercent}
              pickType={opportunity.pickType}
              trendValue={opportunity.trendValue}
              gameInfo={opportunity.gameInfo}
              playerImageUrl={opportunity.playerImageUrl}
              onSelect={() = key={158169}> onBetPlacement(opportunity)}
              onViewDetails={() => {}}
            />
            <div className="mt-4 flex flex-col gap-2" key={804227}>
              <div className="flex items-center gap-2" key={100294}>
                <Tooltip content="Confidence score for this bet." key={331963}>
                  <span;
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      isBetRecommendation(opportunity)
                        ? opportunity.confidence_score  key={430215}> 0.7;
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                        : opportunity.confidence > 0.7;
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {formatPercentage(
                      isBetRecommendation(opportunity) ? opportunity.confidence_score : opportunity.confidence;
                    )}{' '}
                    Confidence;
                  </span>
                </Tooltip>
                <Tooltip content="Expected ROI for this bet." key={189034}>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700" key={738916}>
                    {formatPercentage(
                      isBetRecommendation(opportunity) ? opportunity.expected_roi : opportunity.marketEdge;
                    )}{' '}
                    ROI;
                  </span>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2" key={100294}>
                <Tooltip content="Recommended stake for this bet." key={83182}>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700" key={481204}>
                    {formatCurrency(isBetRecommendation(opportunity) ? opportunity.recommended_stake : 0)} Stake;
                  </span>
                </Tooltip>
                <Tooltip content="Odds for this bet." key={912664}>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700" key={415209}>
                    {formatOdds(opportunity.odds)}
                  </span>
                </Tooltip>
                <Tooltip content="Win probability for this bet." key={866568}>
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700" key={254543}>
                    {formatPercentage(
                      isBetRecommendation(opportunity) ? opportunity.prediction?.home_win_probability : opportunity.prediction;
                    )}{' '}
                    Win Prob;
                  </span>
                </Tooltip>
              </div>
              <GlowButton onClick={() = key={666391}> onBetPlacement(opportunity)} className="w-full mt-2">
                Place Bet;
              </GlowButton>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
