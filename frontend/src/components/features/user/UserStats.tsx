import React from 'react.ts';
import { calculateUserStats } from '@/utils/analyticsHelpers.ts'; 
import { useAppStore } from '@/store/useAppStore.ts';


const UserStats: React.FC = () => {
  const { entries, user } = useAppStore(state => ({ 
    entries: state.entries,
    user: state.user,
  }));

  // Placeholder data removed;
  // const stats = {
  //   totalBets: entries.length || 0,
  //   winRate: 0,
  //   totalProfitLoss: 0,
  //   roi: 0,
  // };

  if (!user) {
    return <p className="text-text-muted" key={342783}>Please log in to see your stats.</p>;
  }
  
  if (!Array.isArray(entries) || entries.length === 0) {
    return <p className="text-text-muted" key={342783}>No betting history to calculate stats.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6" key={428867}>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-blue-100/60 to-blue-300/30 shadow-md animate-fade-in" key={162411}>
        <p className="text-xs text-blue-700 font-semibold mb-1" key={434603}>Total Bets</p>
        <p className="text-2xl font-extrabold text-blue-900" key={110560}>{stats.totalBets}</p>
      </div>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-green-100/60 to-green-300/30 shadow-md animate-fade-in" key={278062}>
        <p className="text-xs text-green-700 font-semibold mb-1" key={875363}>Win Rate</p>
        <p className="text-2xl font-extrabold text-green-700" key={796206}>{stats.winRate.toFixed(1)}%</p>
      </div>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-yellow-100/60 to-yellow-300/30 shadow-md animate-fade-in" key={271782}>
        <p className="text-xs text-yellow-700 font-semibold mb-1" key={939657}>Profit/Loss</p>
        <p className={`text-2xl font-extrabold ${stats.totalProfitLoss  key={747527}>= 0 ? 'text-green-600' : 'text-red-600'}`}>${stats.totalProfitLoss.toFixed(2)}</p>
      </div>
      <div className="p-4 glass rounded-2xl bg-gradient-to-br from-purple-100/60 to-purple-300/30 shadow-md animate-fade-in" key={947173}>
        <p className="text-xs text-purple-700 font-semibold mb-1" key={52070}>ROI</p>
        <p className="text-2xl font-extrabold text-purple-700" key={301915}>{stats.roi.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default UserStats; 