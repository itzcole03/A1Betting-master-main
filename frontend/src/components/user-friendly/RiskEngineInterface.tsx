import React, { useState } from 'react';
import { Shield, AlertTriangle, TrendingDown, BarChart3, Settings, Target } from 'lucide-react';

const RiskEngineInterface: React.FC = () => {
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [autoStop, setAutoStop] = useState(true);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Risk Engine Interface
        </h1>
        <p className="text-gray-400 mt-2">
          Advanced risk management and position sizing for maximum protection
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Protection Level</span>
          </div>
          <p className="text-2xl font-bold text-green-400">ACTIVE</p>
          <p className="text-sm text-gray-400">All systems operational</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Current Risk</span>
          </div>
          <p className="text-2xl font-bold text-yellow-400">MEDIUM</p>
          <p className="text-sm text-gray-400">2.3% portfolio exposure</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <span className="text-sm text-gray-400">Max Drawdown</span>
          </div>
          <p className="text-2xl font-bold text-white">5.2%</p>
          <p className="text-sm text-gray-400">Below 10% limit</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Risk Settings
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Risk Level</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setRiskLevel('low')}
                  className={`px-3 py-1 rounded text-sm ${
                    riskLevel === 'low' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Low
                </button>
                <button
                  onClick={() => setRiskLevel('medium')}
                  className={`px-3 py-1 rounded text-sm ${
                    riskLevel === 'medium' ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setRiskLevel('high')}
                  className={`px-3 py-1 rounded text-sm ${
                    riskLevel === 'high' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  High
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Auto-Stop Loss</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoStop}
                  onChange={(e) => setAutoStop(e.target.checked)}
                  className="rounded"
                  title="Auto-stop loss toggle"
                />
                <span className="text-gray-300">Enable automatic stop loss</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Maximum Position Size</label>
              <input
                type="number"
                placeholder="500"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-300 mb-2">Daily Loss Limit (%)</label>
              <input
                type="number"
                placeholder="5"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Risk Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Value at Risk (VaR)</span>
              <span className="text-white font-semibold">$247.50</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Sharpe Ratio</span>
              <span className="text-white font-semibold">1.42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Volatility</span>
              <span className="text-white font-semibold">12.3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Beta</span>
              <span className="text-white font-semibold">0.87</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Correlation</span>
              <span className="text-white font-semibold">0.23</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5" />
          Position Sizing Calculator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Bankroll</label>
            <input
              type="number"
              placeholder="10000"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Win Probability</label>
            <input
              type="number"
              placeholder="65"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Odds</label>
            <input
              type="number"
              placeholder="2.5"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            />
          </div>
        </div>
        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
          <p className="text-lg font-semibold text-green-400">
            Recommended Bet Size: $127.50 (1.3% of bankroll)
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Based on Kelly Criterion with 25% reduction for safety
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskEngineInterface;
