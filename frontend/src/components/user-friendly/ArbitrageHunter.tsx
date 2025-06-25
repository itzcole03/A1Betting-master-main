import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Target,
  Shield,
} from 'lucide-react';
import { logger } from '@/utils/logger';

interface ArbitrageOpportunity {
  id: string;
  sport: string;
  game: string;
  market: string;
  guaranteed_profit: number;
  profit_percentage: number;
  total_stake: number;
  time_remaining: string;
  bookmakers: {
    name: string;
    odds: number;
    stake: number;
    outcome: string;
  }[];
  risk_score: number;
  confidence: number;
  execution_complexity: 'simple' | 'moderate' | 'complex';
}

interface ArbitrageMetrics {
  total_opportunities: number;
  avg_profit_margin: number;
  total_guaranteed_profit: number;
  success_rate: number;
  execution_speed: number;
}

const ArbitrageHunter: React.FC = () => {
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [autoScan, setAutoScan] = useState(false);
  const [metrics, setMetrics] = useState<ArbitrageMetrics>({
    total_opportunities: 0,
    avg_profit_margin: 0,
    total_guaranteed_profit: 0,
    success_rate: 0,
    execution_speed: 0,
  });

  // Mock arbitrage opportunities
  const mockOpportunities: ArbitrageOpportunity[] = useMemo(() => [
    {
      id: '1',
      sport: 'NBA',
      game: 'Lakers vs Warriors',
      market: 'Moneyline',
      guaranteed_profit: 47.50,
      profit_percentage: 4.75,
      total_stake: 1000,
      time_remaining: '1h 23m',
      bookmakers: [
        { name: 'DraftKings', odds: 2.10, stake: 476.19, outcome: 'Lakers Win' },
        { name: 'FanDuel', odds: 2.05, stake: 523.81, outcome: 'Warriors Win' }
      ],
      risk_score: 2,
      confidence: 98,
      execution_complexity: 'simple'
    },
    {
      id: '2',
      sport: 'NFL',
      game: 'Chiefs vs Bills',
      market: 'Total Points',
      guaranteed_profit: 32.80,
      profit_percentage: 6.56,
      total_stake: 500,
      time_remaining: '45m',
      bookmakers: [
        { name: 'BetMGM', odds: 1.91, stake: 262.30, outcome: 'Over 47.5' },
        { name: 'Caesars', odds: 1.98, stake: 237.70, outcome: 'Under 47.5' }
      ],
      risk_score: 1,
      confidence: 99,
      execution_complexity: 'simple'
    },
    {
      id: '3',
      sport: 'Esports',
      game: 'T1 vs DRX (LoL)',
      market: 'Match Winner',
      guaranteed_profit: 18.90,
      profit_percentage: 3.78,
      total_stake: 500,
      time_remaining: '2h 15m',
      bookmakers: [
        { name: 'Bet365', odds: 1.75, stake: 285.71, outcome: 'T1 Win' },
        { name: 'Pinnacle', odds: 2.35, stake: 214.29, outcome: 'DRX Win' }
      ],
      risk_score: 3,
      confidence: 95,
      execution_complexity: 'moderate'
    }
  ], []);

  useEffect(() => {
    const initializeHunter = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setOpportunities(mockOpportunities);
        setMetrics({
          total_opportunities: mockOpportunities.length,
          avg_profit_margin: mockOpportunities.reduce((acc, opp) => acc + opp.profit_percentage, 0) / mockOpportunities.length,
          total_guaranteed_profit: mockOpportunities.reduce((acc, opp) => acc + opp.guaranteed_profit, 0),
          success_rate: 97.3,
          execution_speed: 2.4
        });
      } catch (error) {
        logger.error('Failed to initialize arbitrage hunter', error);
      } finally {
        setLoading(false);
      }
    };

    initializeHunter();
  }, [mockOpportunities]);

  // Auto-scan functionality
  useEffect(() => {
    if (!autoScan) return;

    const interval = setInterval(async () => {
      setScanning(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate finding new opportunities
      if (Math.random() > 0.7) {
        const newOpp: ArbitrageOpportunity = {
          id: Date.now().toString(),
          sport: ['NBA', 'NFL', 'NHL', 'Esports'][Math.floor(Math.random() * 4)],
          game: 'New Game vs Another Team',
          market: ['Moneyline', 'Total Points', 'Spread'][Math.floor(Math.random() * 3)],
          guaranteed_profit: Math.random() * 50 + 10,
          profit_percentage: Math.random() * 5 + 2,
          total_stake: Math.random() * 500 + 500,
          time_remaining: `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`,
          bookmakers: [
            { name: 'BookA', odds: Math.random() * 2 + 1.5, stake: 250, outcome: 'Outcome A' },
            { name: 'BookB', odds: Math.random() * 2 + 1.5, stake: 250, outcome: 'Outcome B' }
          ],
          risk_score: Math.floor(Math.random() * 5) + 1,
          confidence: Math.floor(Math.random() * 10) + 90,
          execution_complexity: ['simple', 'moderate', 'complex'][Math.floor(Math.random() * 3)] as any
        };

        setOpportunities(prev => [newOpp, ...prev.slice(0, 9)]);
      }
      
      setScanning(false);
    }, 10000);

    return () => clearInterval(interval);
  }, [autoScan]);

  const handleManualScan = async () => {
    setScanning(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Refresh opportunities
      setOpportunities([...mockOpportunities]);
    } catch (error) {
      logger.error('Manual scan failed', error);
    } finally {
      setScanning(false);
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-400 bg-green-400/20';
      case 'moderate': return 'text-yellow-400 bg-yellow-400/20';
      case 'complex': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk <= 2) return 'text-green-400';
    if (risk <= 3) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Initializing Arbitrage Hunter...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Arbitrage Hunter
          </h1>
          <p className="text-gray-400 mt-2">
            Guaranteed profit opportunities with zero risk - Real-time arbitrage detection
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoScan}
              onChange={(e) => setAutoScan(e.target.checked)}
              className="rounded"
            />
            <span className="text-gray-300">Auto-Scan</span>
          </label>
          
          <motion.button
            onClick={handleManualScan}
            disabled={scanning}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              scanning 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500'
            }`}
            whileHover={{ scale: scanning ? 1 : 1.05 }}
            whileTap={{ scale: scanning ? 1 : 0.95 }}
          >
            {scanning ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Hunting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Hunt Now
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Live Opportunities</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.total_opportunities}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Avg Profit Margin</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.avg_profit_margin.toFixed(2)}%</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Total Guaranteed</span>
          </div>
          <p className="text-2xl font-bold text-white">${metrics.total_guaranteed_profit.toFixed(2)}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.success_rate}%</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-gray-400">Avg Execution</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.execution_speed}s</p>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${scanning ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            <span className="font-medium">
              {scanning ? 'Scanning for arbitrage opportunities...' : 'Ready - Monitoring live markets'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Auto-scan: {autoScan ? 'Enabled' : 'Disabled'} • Next scan in {scanning ? '--' : '8s'}
          </div>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Guaranteed Profit Opportunities ({opportunities.length})</h3>
        
        {opportunities.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No arbitrage opportunities currently available.</p>
            <p className="text-sm text-gray-500 mt-2">Market conditions are not favorable for arbitrage at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {opportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-yellow-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{opportunity.market}</h4>
                      <p className="text-sm text-gray-400">{opportunity.sport} • {opportunity.game}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getComplexityColor(opportunity.execution_complexity)}`}>
                      {opportunity.execution_complexity.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">{opportunity.confidence}%</span>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Guaranteed Profit</p>
                    <p className="text-lg font-bold text-green-400">${opportunity.guaranteed_profit.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Profit Margin</p>
                    <p className="text-lg font-bold text-yellow-400">{opportunity.profit_percentage.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total Stake</p>
                    <p className="text-lg font-bold text-white">${opportunity.total_stake}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Time Left</p>
                    <p className="text-lg font-bold text-orange-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {opportunity.time_remaining}
                    </p>
                  </div>
                </div>

                {/* Bookmaker Details */}
                <div className="bg-gray-700/50 rounded-lg p-4 mb-4">
                  <h5 className="text-sm font-medium text-gray-300 mb-3">Betting Strategy</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {opportunity.bookmakers.map((book, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-600/50 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{book.name}</p>
                          <p className="text-sm text-gray-400">{book.outcome}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Odds: {book.odds}</p>
                          <p className="font-medium text-cyan-400">${book.stake.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span className="text-gray-400">Risk:</span>
                      <span className={getRiskColor(opportunity.risk_score)}>
                        {opportunity.risk_score}/5
                      </span>
                    </span>
                    <span className="text-gray-400">
                      ROI: {((opportunity.guaranteed_profit / opportunity.total_stake) * 100).toFixed(2)}%
                    </span>
                  </div>
                  
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-medium hover:from-green-400 hover:to-green-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Execute Arbitrage
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArbitrageHunter;
