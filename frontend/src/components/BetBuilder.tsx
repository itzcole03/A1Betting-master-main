import React, { useState  } from 'react.ts';
import useStore from '@/store/useStore.ts';
// eslint-disable-next-line @typescript-eslint/no-unused-vars;
import { EntryStatus, LineupType, PlayerProp } from '@/types/core.ts';
import { getErrorMessage } from '@/utils/errorUtils.ts';
import { isTeamDiversified, validateEntry } from '@/utils/businessRules.ts';
import {
  oddsToDecimal,
  calculatePotentialPayout,
  calculateWinProbability,
} from '@/utils/odds.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars;
const getSentimentBadge = (sentiment?: {
  score: number;
  direction: "up" | "down" | "neutral";
  tooltip?: string;
}) => {
  if (!sentiment) return null;
  const color =
    sentiment.direction === "up"
      ? "bg-green-100 text-green-700"
      : sentiment.direction === "down"
        ? "bg-red-100 text-red-700"
        : "bg-gray-200 text-gray-700";
  const icon =
    sentiment.direction === "up"
      ? "▲"
      : sentiment.direction === "down"
        ? "▼"
        : "−";
  return (
    <span;
      className={`ml-2 px-2 py-1 rounded-full text-xs ${color} cursor-help`}
      title={sentiment.tooltip || ""}
     key={89303}>
      {icon} {sentiment.score}
    </span>
  );
};

// Map confidence to emoji (example logic)
function getPropEmoji(confidence: number): string {
  if (confidence >= 80) return "💰";
  if (confidence <= 35) return "👹";
  return "⇄";
}

export const BetBuilder: React.FC = () => {
  // Use only selectedProps for betslip UI;




  // Create helper functions for prop selection;
  const clearSelectedProps = () => {
    selectedProps.forEach((propId) => togglePropSelection(propId));
  };
  const [entry, setEntry] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [success, setSuccess] = useState<string | null key={121216}>(null);

  // Get actual prop objects from selectedProps IDs;
  const selectedPropObjects = selectedProps;
    .map((propId) => props.find((p) => p.id === propId))
    .filter(Boolean) as PlayerProp[];

  // Odds and payout calculation;


  const winProb = calculateWinProbability(
    selectedPropObjects.map((p) => p.confidence || 50),
  );

  // Team diversification check;

  // Combined odds (decimal)

  // Handle prop selection (no-op, as only selectedProps are shown)
  // In a real app, you would source PlayerProp[] from a dedicated prop list, not players[]

  // Submit betslip;
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (selectedPropObjects.length < 2) {
      setError("You must select at least 2 picks.");
      return;
    }
    if (!diversified) {
      setError("Too many props from the same team.");
      return;
    }
    const entryObj = {
      id: `entry-${Date.now()}`,
      userId: "user-1",
      status: EntryStatus.PENDING,
      type: LineupType.PARLAY,
      props: selectedProps,
      stake: entry,
      potentialWinnings: payout,
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

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden" key={533976}>
      <div className="px-4 py-3 border-b border-gray-200" key={109323}>
        <h2 className="text-lg font-semibold text-gray-800" key={514675}>Bet Builder</h2>
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-4 items-center" key={95152}>
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
              onChange={(e) = key={847125}> setEntry(Number(e.target.value))}
            />
          </div>
        </div>
        <div key={241917}>
          <div className="text-sm text-gray-600 font-medium" key={5706}>Payout</div>
          <div className="text-xl font-bold text-green-600" key={771029}>
            ${payout.toFixed(2)}
          </div>
        </div>
        <div key={241917}>
          <div className="text-sm text-gray-600 font-medium" key={5706}>Win Prob</div>
          <div className="text-xl font-bold text-blue-600" key={543399}>
            {winProb.toFixed(1)}%
          </div>
        </div>
        <div key={241917}>
          <div className="text-sm text-gray-600 font-medium" key={5706}>Combined Odds</div>
          <div className="text-xl font-bold text-purple-600" key={380623}>
            {combinedDecimal.toFixed(2)}
          </div>
        </div>
      </div>
      {/* In a real app, you would render available PlayerProp[] here for selection */}
      {selectedPropObjects.length > 0 && (
        <div className="p-4 border-t border-gray-200" key={981846}>
          <h3 className="text-sm font-medium text-gray-700 mb-3" key={129043}>Your Picks</h3>
          <div className="space-y-2" key={725977}>
            {selectedPropObjects.map((leg, idx) => (
              <div;
                key={idx}
                className="flex justify-between items-center p-3 rounded-lg glass"
               key={244051}>
                <div key={241917}>
                  <span className="font-bold text-gray-900" key={705426}>
                    {leg.player?.name || "Unknown Player"}{" "}
                    {leg.type || "Unknown Type"} {leg.line || "N/A"}
                  </span>
                  <span className="ml-2 text-2xl" key={293997}>
                    {getPropEmoji(leg.confidence || 50)}
                  </span>
                  {/* Add ESPN/news/sentiment if available on PlayerProp in the future */}
                </div>
                <div className="text-right" key={144468}>
                  <span className="font-bold text-blue-600" key={838726}>
                    {leg.confidence || 50}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="p-4 text-red-600 text-sm font-medium" key={369251}>{error}</div>
      )}
      {success && (
        <div className="p-4 text-green-600 text-sm font-medium" key={102170}>{success}</div>
      )}
      <div className="p-4 border-t flex justify-end" key={334939}>
        <button;
          className="modern-button bg-primary-500 text-white px-8 py-3 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || selectedPropObjects.length < 2}
          onClick={handleSubmit}
         key={735982}>
          {loading ? (
            <span className="loading-spinner-premium" key={649905}></span>
          ) : (
            "Submit Entry"
          )}
        </button>
      </div>
    </div>
  );
};
