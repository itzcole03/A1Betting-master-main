import React from 'react.ts';
import { BarChart3, TrendingUp, Activity, PieChart } from 'lucide-react.ts';

const AnalyticsCommandCenter: React.FC = () => {
  return (
    <div className="space-y-6" key={501869}>
      <div key={241917}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" key={167446}>
          Analytics Command Center;
        </h1>
        <p className="text-gray-400 mt-2" key={874357}>
          Comprehensive analytics and performance insights across all betting platforms;
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" key={426410}>
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <BarChart3 className="w-5 h-5 text-cyan-400" / key={767032}>
            <span className="text-sm text-gray-400" key={257018}>Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>73.8%</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <TrendingUp className="w-5 h-5 text-green-400" / key={856799}>
            <span className="text-sm text-gray-400" key={257018}>ROI</span>
          </div>
          <p className="text-2xl font-bold text-green-400" key={176412}>18.5%</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <Activity className="w-5 h-5 text-purple-400" / key={770313}>
            <span className="text-sm text-gray-400" key={257018}>Sharpe Ratio</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>1.42</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <PieChart className="w-5 h-5 text-yellow-400" / key={674382}>
            <span className="text-sm text-gray-400" key={257018}>Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>87.2%</p>
        </div>
      </div>
      
      <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6" key={964047}>
        <h3 className="text-xl font-semibold mb-4" key={333128}>Performance Analytics</h3>
        <p className="text-gray-400" key={545335}>Advanced analytics dashboard coming soon...</p>
      </div>
    </div>
  );
};

export default AnalyticsCommandCenter;
