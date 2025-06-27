import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const usePayoutStore = create()(devtools((set, get) => ({
    payoutPreviews: {},
    updatePayoutPreview: (eventId, data) => {
        set(state => ({
            payoutPreviews: {
                ...state.payoutPreviews,
                [eventId]: data,
            },
        }));
    },
    getPayoutPreview: (eventId) => {
        return get().payoutPreviews[eventId];
    },
    calculateKellyStake: (odds, probability, bankroll) => {
        // Kelly Criterion formula: f* = (bp - q) / b;
        // where b = odds - 1, p = probability of winning, q = probability of losing;



        // Apply fractional Kelly (half Kelly) for more conservative staking;

        // Calculate stake based on bankroll;
        return Math.max(0, fractionalKelly * bankroll);
    },
    computeAndUpdatePayoutPreview: (selection, bankroll, riskProfile) => {
        const { eventId, odds, probability } = selection;
        // Kelly stake;

        // Risk-adjusted stake (apply max stake % from risk profile)


        // Potential payout;

        // Expected value;

        // Update store;
        get().updatePayoutPreview(eventId, {
            potential_payout,
            kelly_stake,
            risk_adjusted_stake,
            expected_value,
        });
    },
}), { name: 'payout-store' }));
