import React from 'react.ts';
import { BarChart3, TrendingUp, DollarSign, PieChart, Wallet, Target } from 'lucide-react.ts';

const PortfolioCommander: React.FC = () => {
  return (
    <div className="space-y-6" key={501869}>
      <div key={241917}>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent" key={205575}>
          Portfolio Commander;
        </h1>
        <p className="text-gray-400 mt-2" key={874357}>
          Advanced portfolio management and optimization for all betting strategies;
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" key={158598}>
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <Walconst className = "w-5 h-5 text-green-400" / key={397460}>
            <span className="text-sm text-gray-400" key={257018}>Total Portfolio</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>$12,485.50</p>
          <p className="text-sm text-green-400" key={263212}>+$1,247.30 (11.1%) today</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <TrendingUp className="w-5 h-5 text-blue-400" / key={547007}>
            <span className="text-sm text-gray-400" key={257018}>Active Bets</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>7</p>
          <p className="text-sm text-blue-400" key={586744}>Total exposure: $2,847.50</p>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4" key={959384}>
          <div className="flex items-center gap-2 mb-2" key={988706}>
            <Target className="w-5 h-5 text-purple-400" / key={664242}>
            <span className="text-sm text-gray-400" key={257018}>Daily Goal</span>
          </div>
          <p className="text-2xl font-bold text-white" key={36139}>78%</p>
          <p className="text-sm text-purple-400" key={793773}>$1,560 / $2,000</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6" key={964047}>
          <h3 className="text-xl font-semibold mb-4" key={333128}>Platform Allocation</h3>
          <div className="space-y-4" key={160407}>
            <div className="flex justify-between items-center" key={795957}>
              <span className="text-gray-300" key={110058}>Traditional Sports</span>
              <span className="text-white font-semibold" key={197018}>45%</span>
            </div>
            <div className="flex justify-between items-center" key={795957}>
              <span className="text-gray-300" key={110058}>Arbitrage</span>
              <span className="text-white font-semibold" key={197018}>25%</span>
            </div>
            <div className="flex justify-between items-center" key={795957}>
              <span className="text-gray-300" key={110058}>PrizePicks</span>
              <span className="text-white font-semibold" key={197018}>20%</span>
            </div>
            <div className="flex justify-between items-center" key={795957}>
              <span className="text-gray-300" key={110058}>Esports</span>
              <span className="text-white font-semibold" key={197018}>10%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6" key={964047}>
          <h3 className="text-xl font-semibold mb-4" key={333128}>Risk Management</h3>
          <div className="space-y-4" key={160407}>
            <div key={241917}>
              <div className="flex justify-between mb-2" key={99106}>
                <span className="text-gray-300" key={110058}>Current Risk Level</span>
                <span className="text-green-400" key={40612}>Low</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2" key={811414}>
                <div className="bg-green-400 h-2 rounded-full w-1/4" key={992283}></div>
              </div>
            </div>
            <div key={241917}>
              <div className="flex justify-between mb-2" key={99106}>
                <span className="text-gray-300" key={110058}>Kelly Criterion</span>
                <span className="text-white" key={453983}>3.2%</span>
              </div>
            </div>
            <div key={241917}>
              <div className="flex justify-between mb-2" key={99106}>
                <span className="text-gray-300" key={110058}>Max Position Size</span>
                <span className="text-white" key={453983}>$500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCommander;
