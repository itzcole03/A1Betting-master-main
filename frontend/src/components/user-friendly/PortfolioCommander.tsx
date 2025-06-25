import React from 'react';
import { BarChart3, TrendingUp, DollarSign, PieChart, Wallet, Target } from 'lucide-react';

const PortfolioCommander: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          Portfolio Commander
        </h1>
        <p className="text-gray-400 mt-2">
          Advanced portfolio management and optimization for all betting strategies
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Total Portfolio</span>
          </div>
          <p className="text-2xl font-bold text-white">$12,485.50</p>
          <p className="text-sm text-green-400">+$1,247.30 (11.1%) today</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Active Bets</span>
          </div>
          <p className="text-2xl font-bold text-white">7</p>
          <p className="text-sm text-blue-400">Total exposure: $2,847.50</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Daily Goal</span>
          </div>
          <p className="text-2xl font-bold text-white">78%</p>
          <p className="text-sm text-purple-400">$1,560 / $2,000</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Platform Allocation</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Traditional Sports</span>
              <span className="text-white font-semibold">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Arbitrage</span>
              <span className="text-white font-semibold">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">PrizePicks</span>
              <span className="text-white font-semibold">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Esports</span>
              <span className="text-white font-semibold">10%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Risk Management</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Current Risk Level</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full w-1/4"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Kelly Criterion</span>
                <span className="text-white">3.2%</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Max Position Size</span>
                <span className="text-white">$500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCommander;
