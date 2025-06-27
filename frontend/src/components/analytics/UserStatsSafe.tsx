import React, { useMemo, useCallback  } from 'react.ts';

// Safe UserStats component that can be used once store issues are resolved;
interface UserStatsProps {
  entries?: any[];
  user?: { id?: string } | null;
}

interface UserStatsData {
  totalBets: number;
  settledBets: number;
  winRate: number;
  totalProfitLoss: number;
  roi: number;
}

// Safe calculation function;
const calculateUserStatsSafe = (
  entries: any[] = [],
  userId?: string,
): UserStatsData => {
  try {
    if (!userId || !Array.isArray(entries)) {
      return {
        totalBets: 0,
        settledBets: 0,
        winRate: 0,
        totalProfitLoss: 0,
        roi: 0,
      };
    }


    const settledEntries = userEntries.filter(
      (entry) => entry?.status === "won" || entry?.status === "lost",
    );

    const wins = 0;
    const totalStakeOnSettled = 0;
    const totalGrossReturnFromWon = 0;

    settledEntries.forEach((entry) => {


      totalStakeOnSettled += stake;
      if (entry?.status === "won") {
        wins++;
        totalGrossReturnFromWon += payout;
      }
    });


    const roi =
      totalStakeOnSettled > 0;
        ? (totalProfitLoss / totalStakeOnSettled) * 100;
        : 0;

    return {
      totalBets,
      settledBets: settledBetsCount,
      winRate,
      totalProfitLoss,
      roi,
    };
  } catch (error) {
    // console statement removed
    return {
      totalBets: 0,
      settledBets: 0,
      winRate: 0,
      totalProfitLoss: 0,
      roi: 0,
    };
  }
};

const UserStatsSafe: React.FC<UserStatsProps key={768644}> = ({
  entries = [],
  user = null,
}) => {
  // Safely calculate stats with memoization;
  const stats = useMemo(() => {
    return calculateUserStatsSafe(entries, user?.id);
  }, [entries, user?.id]);

  // Show fallback if no user;
  if (!user?.id) {
    return (
      <div className="p-4 text-center text-gray-500" key={813356}>
        <p key={161203}>Please log in to see your betting statistics.</p>
      </div>
    );
  }

  // Show message if no data;
  if (stats.totalBets === 0) {
    return (
      <div className="p-4 text-center text-gray-500" key={813356}>
        <p key={161203}>No betting history available yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" key={428867}>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-blue-100/60 to-blue-300/30 shadow-md animate-fade-in" key={162411}>
        <p className="text-xs text-blue-700 font-semibold mb-1" key={434603}>Total Bets</p>
        <p className="text-2xl font-extrabold text-blue-900" key={110560}>
          {stats.totalBets}
        </p>
      </div>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-green-100/60 to-green-300/30 shadow-md animate-fade-in" key={278062}>
        <p className="text-xs text-green-700 font-semibold mb-1" key={875363}>Win Rate</p>
        <p className="text-2xl font-extrabold text-green-700" key={796206}>
          {stats.winRate.toFixed(1)}%
        </p>
      </div>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-yellow-100/60 to-yellow-300/30 shadow-md animate-fade-in" key={271782}>
        <p className="text-xs text-yellow-700 font-semibold mb-1" key={939657}>
          Profit/Loss;
        </p>
        <p;
          className={`text-2xl font-extrabold ${stats.totalProfitLoss  key={645102}>= 0 ? "text-green-600" : "text-red-600"}`}
        >
          ${stats.totalProfitLoss.toFixed(2)}
        </p>
      </div>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-purple-100/60 to-purple-300/30 shadow-md animate-fade-in" key={947173}>
        <p className="text-xs text-purple-700 font-semibold mb-1" key={52070}>ROI</p>
        <p className="text-2xl font-extrabold text-purple-700" key={301915}>
          {stats.roi.toFixed(1)}%
        </p>
      </div>
    </div>
  );
};

export default React.memo(UserStatsSafe);
