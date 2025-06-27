import React, { useState  } from 'react.ts';
import { useStore } from '@/../stores/useStore.ts';
import type { PlayerProp, Entry } from '@/../types/core.ts';
import { getErrorMessage } from '@/../utils/errorUtils.ts';
import { isTeamDiversified, validateEntry } from '@/../utils/businessRules.ts';
import {
  oddsToDecimal,
  calculatePotentialPayout,
  calculateWinProbability,
} from '@/../utils/odds.ts';
import { SmartControlsBar } from '@/../components/controls/SmartControlsBar.ts';
import GlassCard from '@/../components/ui/GlassCard.ts';
import EnhancedPropCard from '@/../components/ui/EnhancedPropCard.ts';
import PredictionExplanationOverlay from '@/../components/ui/PredictionExplanationOverlay.ts';
import { PayoutPreview } from '@/../components/PayoutPreview.ts';

export const BetBuilder: React.FC = () => {



  const [entry, setEntry] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [success, setSuccess] = useState<string | null key={121216}>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Odds and payout calculation;


  const winProb = calculateWinProbability(
    selectedProps.map((p: PlayerProp) => p.confidence),
  );

  const combinedDecimal = oddsArr.reduce(
    (acc: number, o: string) => acc * oddsToDecimal(o),
    1,
  );

  // Bonus and enhancement (placeholder logic)
  const bonusPercent = selectedProps.length * 2; // Example: 2% per pick;
  const enhancementPercent =
    selectedProps.reduce(
      (acc: number, p: PlayerProp) => acc + ((p as any).aiBoost || 0),
      0,
    ) / (selectedProps.length || 1);

  // Submit betslip;
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (selectedProps.length < 2) {
      setError("You must select at least 2 picks.");
      return;
    }
    if (!diversified) {
      setError("Too many props from the same team.");
      return;
    }
    const entryObj: Entry = {
      id: "",
      userId: "",
      status: "pending",
      type: "parlay",
      props: selectedProps,
      stake: entry,
      potentialPayout: payout,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (validationErrors.length) {
      setError(validationErrors.join(" "));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/entries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entryObj),
      });
      if (!res.ok) {

        setError(getErrorMessage(err));
        setLoading(false);
        return;
      }
      addEntry(entryObj);
      setSuccess("Entry submitted successfully!");
      clearSelectedProps();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Add missing variable/type definitions for props, isLoadingProps, propsError, availableProps, handleSelect, handleViewDetails, riskMultiplier, projectedEV;
  // For demonstration, use placeholders or simple logic if not already defined;


  const availableProps: PlayerProp[] = [];




  return (
    <div className="space-y-6" key={501869}>
      <SmartControlsBar className="mb-4 glass-card animate-fade-in" / key={256278}>
      {/* Left: Available Props */}
      <div className="flex-1 space-y-4" key={148951}>
        <GlassCard className="p-4 animate-scale-in" key={915758}>
          <h2 className="text-xl font-bold mb-2 text-primary-600" key={723629}>
            Available Props;
          </h2>
          {isLoadingProps && (
            <div className="text-gray-400" key={7335}>Loading props...</div>
          )}
          {propsError && (
            <div className="text-red-500" key={501560}>Failed to load props.</div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" key={997137}>
            {availableProps.map((prop: any) => (
              <EnhancedPropCard;
                key={prop.id}
                playerName={prop.player?.name || prop.playerName}
                statType={prop.type}
                line={prop.line}
                overOdds={prop.odds?.over ?? prop.overOdds}
                underOdds={prop.odds?.under ?? prop.underOdds}
                sentiment={prop.sentiment}
                aiBoost={prop.aiBoost}
                patternStrength={prop.patternStrength}
                bonusPercent={bonusPercent}
                enhancementPercent={enhancementPercent}
                selected={selectedProps.some(
                  (p: PlayerProp) = key={247789}> p.id === prop.id,
                )}
                onSelect={(pick) => handleSelect(prop, pick)}
                onViewDetails={() => handleViewDetails(prop)}
                className="transition-transform duration-200 hover:scale-105"
              />
            ))}
          </div>
        </GlassCard>
      </div>
      {/* Right: Bet Slip and Payout Preview */}
      <div className="flex-1 space-y-6" key={311300}>
        <GlassCard className="p-4 animate-fade-in" key={795347}>
          <div className="flex flex-col gap-4" key={986910}>
            <div className="flex items-center gap-4 flex-wrap" key={436873}>
              <div key={241917}>
                <label className="block text-sm font-medium text-gray-700" key={795081}>
                  Entry;
                </label>
                <div className="premium-input-container w-24" key={529765}>
                  <span className="currency-symbol" key={599010}>$</span>
                  <input;
                    className="premium-input text-gray-900"
                    max={1000}
                    min={1}
                    type="number"
                    value={entry}
                    onChange={(e) = key={287489}> setEntry(Number(e.target.value))}
                  />
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>Payout</div>
                <div className="text-xl font-bold text-green-600 animate-glow" key={986652}>
                  ${payout.toFixed(2)}
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>
                  Win Prob;
                </div>
                <div className="text-xl font-bold text-blue-600" key={543399}>
                  {winProb.toFixed(1)}%
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>
                  Combined Odds;
                </div>
                <div className="text-xl font-bold text-purple-600" key={380623}>
                  {combinedDecimal.toFixed(2)}
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>Bonus %</div>
                <div className="text-lg text-green-500 font-bold" key={973732}>
                  {bonusPercent}%
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>
                  Enhance %
                </div>
                <div className="text-lg text-blue-500 font-bold" key={963847}>
                  {enhancementPercent.toFixed(1)}%
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>
                  Risk Multiplier;
                </div>
                <div className="text-lg text-yellow-500 font-bold" key={866800}>
                  {riskMultiplier.toFixed(2)}x;
                </div>
              </div>
              <div key={241917}>
                <div className="text-sm text-gray-600 font-medium" key={5706}>
                  Projected EV;
                </div>
                <div;
                  className={`text-lg font-bold ${projectedEV  key={292289}>= 0 ? "text-green-600" : "text-red-500"}`}
                >
                  {projectedEV.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-4 animate-fade-in" key={795347}>
          <h3 className="text-lg font-semibold text-primary-600 mb-2" key={153745}>
            Your Picks;
          </h3>
          {selectedProps.length === 0 && (
            <div className="text-gray-400 dark:text-gray-500" key={266832}>
              No picks selected yet.
            </div>
          )}
          <div className="space-y-2" key={725977}>
            {selectedProps.map((leg: PlayerProp) => (
              <EnhancedPropCard;
                key={leg.id}
                playerName={leg.player?.name || (leg as any).playerName}
                statType={leg.type}
                line={leg.line}
                overOdds={(leg as any).odds?.over ?? (leg as any).overOdds}
                underOdds={(leg as any).odds?.under ?? (leg as any).underOdds}
                sentiment={(leg as any).sentiment}
                aiBoost={(leg as any).aiBoost}
                patternStrength={(leg as any).patternStrength}
                bonusPercent={bonusPercent}
                enhancementPercent={enhancementPercent}
                selected={true}
                onSelect={(pick: "over" | "under") = key={393515}> handleSelect(leg, pick)}
                onViewDetails={() => handleViewDetails(leg)}
                className="opacity-90"
              />
            ))}
          </div>
          {/* --- POE-preview: PayoutPreview integration --- */}
          {selectedProps.length > 0 && (
            <div className="mt-6 animate-fade-in" key={496322}>
              <PayoutPreview eventId={selectedProps[0].id} / key={894555}>
            </div>
          )}
        </GlassCard>
        {error && (
          <div className="p-4 text-red-600 text-sm font-medium" key={369251}>{error}</div>
        )}
        {success && (
          <div className="p-4 text-green-600 text-sm font-medium" key={102170}>
            {success}
          </div>
        )}
        <div className="flex justify-end" key={3830}>
          <button;
            className="modern-button bg-primary-500 text-white px-8 py-3 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || selectedProps.length < 2}
            onClick={handleSubmit}
           key={840209}>
            {loading ? (
              <span className="loading-spinner-premium" key={649905}></span>
            ) : (
              "Submit Entry"
            )}
          </button>
        </div>
      </div>
      {/* Overlay for prediction explanation */}
      <PredictionExplanationOverlay;
        open={overlayOpen}
        onClose={() = key={92207}> setOverlayOpen(false)}
        data={{}}
      />
    </div>
  );
};
