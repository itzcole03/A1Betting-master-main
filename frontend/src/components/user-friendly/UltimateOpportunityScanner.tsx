import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  TrendingUp,
  DollarSign,
  Zap,
  Trophy,
  BarChart3,
  Activity,
  Clock,
  Star,
  AlertTriangle,
} from 'lucide-react';
import { productionApiService } from '@/services/api/ProductionApiService';
import { logger } from '@/utils/logger';

interface Opportunity {
  id: string;
  type: 'prizepicks' | 'arbitrage' | 'value_bet' | 'parlay';
  sport: string;
  game: string;
  description: string;
  expectedValue: number;
  confidence: number;
  stake: number;
  potentialProfit: number;
  riskLevel: 'low' | 'medium' | 'high';
  timeRemaining: string;
  bookmakers?: string[];
  analytics: {
    winProbability: number;
    sharpeRatio: number;
    kelly: number;
  };
}

interface ScannerMetrics {
  totalScanned: number;
  foundOpportunities: number;
  avgExpectedValue: number;
  successRate: number;
}

const UltimateOpportunityScanner: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [metrics, setMetrics] = useState<ScannerMetrics>({
    totalScanned: 0,
    foundOpportunities: 0,
    avgExpectedValue: 0,
    successRate: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    sport: 'all',
    type: 'all',
    riskLevel: 'all',
    minExpectedValue: 0,
  });

  // Mock data for demonstration
  const mockOpportunities: Opportunity[] = useMemo(() => [
    {
      id: '1',
      type: 'prizepicks',
      sport: 'NBA',
      game: 'Lakers vs Warriors',
      description: 'LeBron James Points Over 25.5',
      expectedValue: 12.5,
      confidence: 87,
      stake: 100,
      potentialProfit: 112.50,
      riskLevel: 'low',
      timeRemaining: '2h 45m',
      analytics: {
        winProbability: 0.68,
        sharpeRatio: 1.45,
        kelly: 0.15,
      },
    },
    {
      id: '2',
      type: 'arbitrage',
      sport: 'NFL',
      game: 'Chiefs vs Bills',
      description: 'Total Points Arbitrage',
      expectedValue: 25.8,
      confidence: 95,
      stake: 500,
      potentialProfit: 525.80,
      riskLevel: 'low',
      timeRemaining: '1h 20m',
      bookmakers: ['DraftKings', 'FanDuel'],
      analytics: {
        winProbability: 1.0,
        sharpeRatio: 2.8,
        kelly: 0.25,
      },
    },
    {
      id: '3',
      type: 'value_bet',
      sport: 'Esports',
      game: 'T1 vs Gen.G (LoL)',
      description: 'T1 to Win Map 1',
      expectedValue: 8.3,
      confidence: 73,
      stake: 75,
      potentialProfit: 83.30,
      riskLevel: 'medium',
      timeRemaining: '45m',
      analytics: {
        winProbability: 0.62,
        sharpeRatio: 1.2,
        kelly: 0.12,
      },
    },
  ], []);

  // Initialize scanner
  useEffect(() => {
    const initializeScanner = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setOpportunities(mockOpportunities);
        setMetrics({
          totalScanned: 1247,
          foundOpportunities: mockOpportunities.length,
          avgExpectedValue: mockOpportunities.reduce((acc, opp) => acc + opp.expectedValue, 0) / mockOpportunities.length,
          successRate: 73.2,
        });
      } catch (error) {
        logger.error('Failed to initialize opportunity scanner', error);
      } finally {
        setLoading(false);
      }
    };

    initializeScanner();
  }, [mockOpportunities]);

  const handleScan = async () => {
    setScanning(true);
    try {
      // Simulate scanning process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Add some variation to mock new opportunities
      const newOpportunity: Opportunity = {
        id: Date.now().toString(),
        type: 'value_bet',
        sport: 'NHL',
        game: 'Rangers vs Bruins',
        description: 'Total Goals Over 6.5',
        expectedValue: Math.random() * 20 + 5,
        confidence: Math.floor(Math.random() * 30 + 70),
        stake: 100,
        potentialProfit: Math.random() * 50 + 100,
        riskLevel: 'medium',
        timeRemaining: '3h 15m',
        analytics: {
          winProbability: Math.random() * 0.3 + 0.6,
          sharpeRatio: Math.random() * 2 + 1,
          kelly: Math.random() * 0.2 + 0.1,
        },
      };

      setOpportunities(prev => [newOpportunity, ...prev]);
      setMetrics(prev => ({
        ...prev,
        foundOpportunities: prev.foundOpportunities + 1,
        totalScanned: prev.totalScanned + Math.floor(Math.random() * 100 + 50),
      }));
    } catch (error) {
      logger.error('Scanning failed', error);
    } finally {
      setScanning(false);
    }
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(opp => {
      if (selectedFilters.sport !== 'all' && opp.sport !== selectedFilters.sport) return false;
      if (selectedFilters.type !== 'all' && opp.type !== selectedFilters.type) return false;
      if (selectedFilters.riskLevel !== 'all' && opp.riskLevel !== selectedFilters.riskLevel) return false;
      if (opp.expectedValue < selectedFilters.minExpectedValue) return false;
      return true;
    });
  }, [opportunities, selectedFilters]);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-400 bg-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/20';
      case 'high': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prizepicks': return <Trophy className="w-4 h-4" />;
      case 'arbitrage': return <Zap className="w-4 h-4" />;
      case 'value_bet': return <TrendingUp className="w-4 h-4" />;
      case 'parlay': return <BarChart3 className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Initializing Opportunity Scanner...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ultimate Opportunity Scanner
          </h1>
          <p className="text-gray-400 mt-2">
            AI-powered detection of profitable betting opportunities across all platforms
          </p>
        </div>
        
        <motion.button
          onClick={handleScan}
          disabled={scanning}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            scanning 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500'
          }`}
          whileHover={{ scale: scanning ? 1 : 1.05 }}
          whileTap={{ scale: scanning ? 1 : 0.95 }}
        >
          {scanning ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Scanning...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Scan Now
            </div>
          )}
        </motion.button>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Total Scanned</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.totalScanned.toLocaleString()}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Opportunities Found</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.foundOpportunities}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Avg Expected Value</span>
          </div>
          <p className="text-2xl font-bold text-white">${metrics.avgExpectedValue.toFixed(2)}</p>
        </div>

        <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-400">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{metrics.successRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            value={selectedFilters.sport}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, sport: e.target.value }))}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Sports</option>
            <option value="NBA">NBA</option>
            <option value="NFL">NFL</option>
            <option value="NHL">NHL</option>
            <option value="Esports">Esports</option>
          </select>

          <select 
            value={selectedFilters.type}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Types</option>
            <option value="prizepicks">PrizePicks</option>
            <option value="arbitrage">Arbitrage</option>
            <option value="value_bet">Value Bets</option>
            <option value="parlay">Parlays</option>
          </select>

          <select 
            value={selectedFilters.riskLevel}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, riskLevel: e.target.value }))}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>

          <input
            type="number"
            placeholder="Min Expected Value"
            value={selectedFilters.minExpectedValue}
            onChange={(e) => setSelectedFilters(prev => ({ ...prev, minExpectedValue: Number(e.target.value) }))}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
          />
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Live Opportunities ({filteredOpportunities.length})</h3>
        
        {filteredOpportunities.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No opportunities found matching your filters.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/20 rounded-lg">
                      {getTypeIcon(opportunity.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{opportunity.description}</h4>
                      <p className="text-sm text-gray-400">{opportunity.sport} • {opportunity.game}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskColor(opportunity.riskLevel)}`}>
                      {opportunity.riskLevel.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">{opportunity.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Expected Value</p>
                    <p className="text-lg font-semibold text-green-400">${opportunity.expectedValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Stake</p>
                    <p className="text-lg font-semibold text-white">${opportunity.stake}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Potential Profit</p>
                    <p className="text-lg font-semibold text-cyan-400">${opportunity.potentialProfit.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Time Remaining</p>
                    <p className="text-lg font-semibold text-purple-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {opportunity.timeRemaining}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span>Win Prob: {(opportunity.analytics.winProbability * 100).toFixed(1)}%</span>
                    <span>Sharpe: {opportunity.analytics.sharpeRatio.toFixed(2)}</span>
                    <span>Kelly: {(opportunity.analytics.kelly * 100).toFixed(1)}%</span>
                  </div>
                  
                  <motion.button
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg font-medium hover:from-cyan-400 hover:to-purple-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Place Bet
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

export default UltimateOpportunityScanner;
