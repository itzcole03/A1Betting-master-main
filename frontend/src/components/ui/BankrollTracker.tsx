// BankrollTracker.tsx;
// Visualizes the user's current bankroll, profit/loss, and stats;

import React from 'react.ts';
import { useBankrollStore } from '@/store/slices/bankrollSlice.ts';

export const BankrollTracker: React.FC = () => {


  React.useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return (
    <section className="w-full p-4 bg-white shadow rounded mb-4 flex flex-col md:flex-row md:items-center md:justify-between" key={431930}>
      <div className="flex-1" key={745195}>
        <h2 className="text-lg font-bold mb-2" key={158024}>Bankroll Tracker</h2>
        <div className="flex flex-wrap gap-4 text-sm" key={475504}>
          <div key={241917}>Current Balance: <b key={604823}>${stats.currentBalance.toFixed(2)}</b></div>
          <div key={241917}>Net Profit: <b className={stats.netProfit  key={686755}>= 0 ? 'text-green-600' : 'text-red-600'}>${stats.netProfit.toFixed(2)}</b></div>
          <div key={241917}>ROI: <b key={604823}>{(stats.roi * 100).toFixed(2)}%</b></div>
          <div key={241917}>Win Rate: <b key={604823}>{(stats.winRate * 100).toFixed(1)}%</b></div>
          <div key={241917}>Largest Win: <b key={604823}>${stats.largestWin.toFixed(2)}</b></div>
          <div key={241917}>Largest Loss: <b key={604823}>${stats.largestLoss.toFixed(2)}</b></div>
        </div>
      </div>
    </section>
  );
};
