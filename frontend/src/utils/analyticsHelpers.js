/**
 * Calculates user statistics based on their betting entries.
 */
export const calculateUserStats = (entries, userId) => {
    if (!userId) {
        return { totalBets: 0, settledBets: 0, winRate: 0, totalProfitLoss: 0, roi: 0 };
    }




    const wins = 0;
    const totalStakeOnSettled = 0;
    const totalGrossReturnFromWon = 0;
    settledEntries.forEach(entry => {
        totalStakeOnSettled += entry.stake;
        if (entry.status === 'won') {
            wins++;
            totalGrossReturnFromWon += entry.payout; // entry.payout is the gross return (stake + profit)
        }
        // For 'lost' entries, stake is part of totalStakeOnSettled, payout is effectively 0.
    });

    // Profit/Loss = (Total Payout from Won Bets) - (Total Stake on ALL Settled Bets)


    return {
        totalBets,
        settledBets: settledBetsCount,
        winRate,
        totalProfitLoss,
        roi,
    };
};
/**
 * Aggregates entry data for performance charting, focusing on settled bets.
 */
export const aggregatePerformanceData = (entries) => {

    if (settledEntries.length === 0) {
        return { labels: [], profitData: [] };
    }
    // Sort settled entries by timestamp to plot performance over time;



    const cumulativeProfit = 0;
    sortedSettledEntries.forEach((entry, index) => {
        // Use a more descriptive label, perhaps the date or a sequence number;
        labels.push(`Bet ${index + 1} (${new Date(entry.created_at).toLocaleDateString()})`);
        if (entry.status === 'won') {
            cumulativeProfit += (entry.payout - entry.stake); // Net profit from this bet;
        }
        else if (entry.status === 'lost') {
            cumulativeProfit -= entry.stake; // Loss from this bet;
        }
        // `else` (pending/active/canceled) is already filtered out;
        profitData.push(cumulativeProfit);
    });
    return {
        labels,
        profitData,
    };
};
