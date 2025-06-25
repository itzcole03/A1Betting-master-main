import React, { useState } from "react";
import useStore from "../store/useStore";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { EntryStatus, LineupType, PlayerProp } from "../types/core";
import { getErrorMessage } from "../utils/errorUtils";
import { isTeamDiversified, validateEntry } from "../utils/businessRules";
import {
  oddsToDecimal,
  calculatePotentialPayout,
  calculateWinProbability,
} from "../utils/odds";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <span
      className={`ml-2 px-2 py-1 rounded-full text-xs ${color} cursor-help`}
      title={sentiment.tooltip || ""}
    >
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
  // Use only selectedProps for betslip UI
  const selectedProps = useStore((s) => s.selectedProps);
  const props = useStore((s) => s.props);
  const togglePropSelection = useStore((s) => s.togglePropSelection);
  const addEntry = useStore((s) => s.addEntry);

  // Create helper functions for prop selection
  const clearSelectedProps = () => {
    selectedProps.forEach((propId) => togglePropSelection(propId));
  };
  const [entry, setEntry] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get actual prop objects from selectedProps IDs
  const selectedPropObjects = selectedProps
    .map((propId) => props.find((p) => p.id === propId))
    .filter(Boolean) as PlayerProp[];

  // Odds and payout calculation
  const oddsArr = selectedPropObjects.map((p) => p.odds?.toString() || "2.0");
  const payout = calculatePotentialPayout(entry, oddsArr);
  const winProb = calculateWinProbability(
    selectedPropObjects.map((p) => p.confidence || 50),
  );

  // Team diversification check
  const diversified = isTeamDiversified(selectedPropObjects);

  // Combined odds (decimal)
  const combinedDecimal = oddsArr.reduce((acc, o) => acc * oddsToDecimal(o), 1);

  // Handle prop selection (no-op, as only selectedProps are shown)
  // In a real app, you would source PlayerProp[] from a dedicated prop list, not players[]

  // Submit betslip
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
    const validationErrors = validateEntry(entryObj);
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
        const err = await res.json();
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Bet Builder</h2>
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Entry
          </label>
          <div className="premium-input-container w-24">
            <span className="currency-symbol">$</span>
            <input
              className="premium-input text-gray-900"
              max={1000}
              min={1}
              type="number"
              value={entry}
              onChange={(e) => setEntry(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 font-medium">Payout</div>
          <div className="text-xl font-bold text-green-600">
            ${payout.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 font-medium">Win Prob</div>
          <div className="text-xl font-bold text-blue-600">
            {winProb.toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600 font-medium">Combined Odds</div>
          <div className="text-xl font-bold text-purple-600">
            {combinedDecimal.toFixed(2)}
          </div>
        </div>
      </div>
      {/* In a real app, you would render available PlayerProp[] here for selection */}
      {selectedPropObjects.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Your Picks</h3>
          <div className="space-y-2">
            {selectedPropObjects.map((leg, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 rounded-lg glass"
              >
                <div>
                  <span className="font-bold text-gray-900">
                    {leg.player?.name || "Unknown Player"}{" "}
                    {leg.type || "Unknown Type"} {leg.line || "N/A"}
                  </span>
                  <span className="ml-2 text-2xl">
                    {getPropEmoji(leg.confidence || 50)}
                  </span>
                  {/* Add ESPN/news/sentiment if available on PlayerProp in the future */}
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-600">
                    {leg.confidence || 50}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="p-4 text-red-600 text-sm font-medium">{error}</div>
      )}
      {success && (
        <div className="p-4 text-green-600 text-sm font-medium">{success}</div>
      )}
      <div className="p-4 border-t flex justify-end">
        <button
          className="modern-button bg-primary-500 text-white px-8 py-3 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || selectedPropObjects.length < 2}
          onClick={handleSubmit}
        >
          {loading ? (
            <span className="loading-spinner-premium"></span>
          ) : (
            "Submit Entry"
          )}
        </button>
      </div>
    </div>
  );
};
