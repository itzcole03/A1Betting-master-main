import { useAppStore } from '@/store/useAppStore.ts';
import React, { useEffect  } from 'react.ts';
import MoneyMaker from '@/modern/MoneyMaker.ts';
import MLInsights from '@/analytics/MLInsights.ts';
import PerformanceChart from '@/analytics/PerformanceChart.ts';
import UserStats from '@/analytics/UserStats.ts';
import PropCards from '@/betting/PropCards.ts';
import ESPNHeadlinesTicker from '@/news/ESPNHeadlinesTicker.ts';
import EntryTracking from '@/tracking/EntryTracking.ts';


const Dashboard: React.FC = () => {
  const {
    fetchProps,
    fetchEntries,
    fetchHeadlines,
    // fetchSentiments, // Removed as it was example, can be added if specific dashboard sentiment is needed;
  } = useAppStore(state => ({ // Ensure to select from state for a smaller subscription scope;
    fetchProps: state.fetchProps,
    fetchEntries: state.fetchEntries,
    fetchHeadlines: state.fetchHeadlines,
    // fetchSentiments: state.fetchSentiments,
  }));

  useEffect(() => {
    // Initial data fetching for the dashboard;
    fetchProps();
    fetchEntries();
    fetchHeadlines();
    // fetchSentiments('general_market'); // Example for dashboard-specific sentiment if needed;
  }, [fetchProps, fetchEntries, fetchHeadlines]);

  return (
    <div className="space-y-8" key={778766}>
      {/* Hero Card with Platform Stats */}
      <div className="w-full glass rounded-3xl shadow-2xl p-8 bg-gradient-to-br from-primary-700/80 to-primary-500/80 flex flex-col md:flex-row items-center justify-between mb-6 animate-fade-in" key={365530}>
        <div className="flex-1" key={745195}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight drop-shadow-lg" key={696898}>AI Sports Analytics Platform</h1>
          <div className="text-lg text-primary-100/90 mb-4 font-medium" key={586119}>Real-time data • Advanced ML predictions • 84%+ win rates</div>
        </div>
        <div className="flex flex-row flex-wrap gap-6 items-center justify-end" key={55400}>
          <div className="flex flex-col items-center" key={510285}>
            <span className="text-2xl md:text-3xl font-extrabold text-white" key={259084}>68.9%</span>
            <span className="text-xs text-primary-200/80" key={41280}>AI Accuracy</span>
          </div>
          <div className="flex flex-col items-center" key={510285}>
            <span className="text-2xl md:text-3xl font-extrabold text-green-300" key={12635}>+$1.8K</span>
            <span className="text-xs text-primary-200/80" key={41280}>Monthly P&L</span>
          </div>
          <div className="flex flex-col items-center" key={510285}>
            <span className="text-2xl md:text-3xl font-extrabold text-yellow-300" key={326511}>7</span>
            <span className="text-xs text-primary-200/80" key={41280}>Active Arbs</span>
          </div>
          <div className="flex flex-col items-center" key={510285}>
            <span className="text-2xl md:text-3xl font-extrabold text-blue-200" key={469133}>41.3%</span>
            <span className="text-xs text-primary-200/80" key={41280}>Monthly ROI</span>
          </div>
        </div>
      </div>

      {/* Money Maker Callout */}
      <div className="w-full glass rounded-2xl shadow-xl p-6 bg-gradient-to-br from-green-700/80 to-green-500/80 mb-6 animate-fade-in" key={451610}>
        <h2 className="text-2xl font-bold text-green-100 mb-2 flex items-center" key={271422}><span className="mr-2" key={136178}>💰</span> Let's Get Money</h2>
        <div className="text-green-200 text-base font-medium mb-2" key={269013}>AI finds the highest-paying 84%+ win probability lineup</div>
        <MoneyMaker / key={321154}>
      </div>

      {/* Key Stats & Entry Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" key={793741}>
        <div className="lg:col-span-2 space-y-6" key={381409}>
          <div className="p-6 glass rounded-xl shadow-lg" key={731393}>
            <h3 className="text-xl font-semibold text-text mb-3" key={864341}>Key Performance Indicators</h3>
            <UserStats / key={388552}>
          </div>
        </div>
        <EntryTracking / key={519676}>
      </div>

      {/* Prop Cards & Performance Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" key={793741}>
        <div className="lg:col-span-2" key={721840}>
          <PropCards / key={736922}>
        </div>
        <div className="p-6 glass rounded-xl shadow-lg" key={731393}>
          <h3 className="text-xl font-semibold text-text mb-3" key={864341}>Performance Analytics</h3>
          <PerformanceChart / key={452246}>
        </div>
      </div>

      {/* ESPN Headlines & ML Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
        <ESPNHeadlinesTicker / key={463301}>
        <div className="p-6 glass rounded-xl shadow-lg" key={731393}>
          <h3 className="text-xl font-semibold text-text mb-3" key={864341}>AI/ML Insights</h3>
          <MLInsights / key={210267}>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
