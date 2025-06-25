import React from 'react';
import { BarChart3, TrendingUp, Activity, PieChart } from 'lucide-react';

const AnalyticsCommandCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Analytics Command Center
        </h1>
        <p className="text-gray-400 mt-2">
          Comprehensive analytics and performance insights across all betting platforms
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Win Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">73.8%</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">ROI</span>
          </div>
          <p className="text-2xl font-bold text-green-400">18.5%</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Sharpe Ratio</span>
          </div>
          <p className="text-2xl font-bold text-white">1.42</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Accuracy</span>
          </div>
          <p className="text-2xl font-bold text-white">87.2%</p>
        </div>
      </div>
      
      <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4">Performance Analytics</h3>
        <p className="text-gray-400">Advanced analytics dashboard coming soon...</p>
      </div>
    </div>
  );
};

export default AnalyticsCommandCenter;
