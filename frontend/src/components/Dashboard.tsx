import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Target,
  Activity,
  Brain,
  BarChart3,
  Bell,
  Zap,
  Trophy,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Cpu,
  Shield,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
  tier: string;
}

interface Bet {
  id: number;
  match: string;
  amount: number;
  odds: number;
  status: 'pending' | 'won' | 'lost';
  potentialWinnings: number;
  placedAt: string;
  sport: string;
  confidence?: number;
}

interface Prediction {
  id: number;
  match: string;
  prediction: string;
  confidence: number;
  odds: number;
  sport: string;
  expectedValue?: number;
  modelAccuracy?: number;
}

interface EnhancedPerformanceStats {
  totalProfit: number;
  winRate: number;
  todayProfit: number;
  activeBets: number;
  sharpeRatio: number;
  maxDrawdown: number;
  totalBets: number;
  avgBetSize: number;
  roiWeekly: number;
  mlModelsActive: number;
}

interface DashboardProps {
  user?: User;
  accountBalance?: number;
  recentBets?: Bet[];
  livePredictions?: Prediction[];
  performanceStats?: EnhancedPerformanceStats;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  accountBalance,
  recentBets,
  livePredictions,
  performanceStats,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Default data based on documented platform performance
  const defaultUser: User = {
    id: 1,
    name: 'Elite Bettor',
    email: 'elite@example.com',
    balance: 125000,
    tier: 'Quantum Pro',
  };

  const defaultPerformanceStats: EnhancedPerformanceStats = {
    totalProfit: 18500, // 18.5% ROI as documented
    winRate: 73.8, // 73.8% Win Rate as documented
    todayProfit: 2340,
    activeBets: 12,
    sharpeRatio: 1.42, // Excellent risk-adjusted performance
    maxDrawdown: 2.3, // Conservative risk management
    totalBets: 347,
    avgBetSize: 127.5,
    roiWeekly: 3.2,
    mlModelsActive: 47, // 47+ ML models as documented
  };

  const defaultRecentBets: Bet[] = [
    {
      id: 1,
      match: 'Lakers vs Warriors',
      amount: 150,
      odds: 2.15,
      status: 'won',
      potentialWinnings: 322.5,
      placedAt: '2024-01-15T10:30:00Z',
      sport: 'NBA',
      confidence: 87,
    },
    {
      id: 2,
      match: 'Cowboys vs Giants',
      amount: 100,
      odds: 1.85,
      status: 'pending',
      potentialWinnings: 185,
      placedAt: '2024-01-15T14:20:00Z',
      sport: 'NFL',
      confidence: 92,
    },
    {
      id: 3,
      match: 'Yankees vs Red Sox',
      amount: 75,
      odds: 2.3,
      status: 'won',
      potentialWinnings: 172.5,
      placedAt: '2024-01-14T19:45:00Z',
      sport: 'MLB',
      confidence: 78,
    },
    {
      id: 4,
      match: 'Bruins vs Rangers',
      amount: 125,
      odds: 1.92,
      status: 'lost',
      potentialWinnings: 240,
      placedAt: '2024-01-14T16:15:00Z',
      sport: 'NHL',
      confidence: 85,
    },
  ];

  const defaultLivePredictions: Prediction[] = [
    {
      id: 1,
      match: 'Celtics vs Heat',
      prediction: 'Celtics -5.5',
      confidence: 92,
      odds: 1.95,
      sport: 'NBA',
      expectedValue: 4.7,
      modelAccuracy: 87,
    },
    {
      id: 2,
      match: 'Chiefs vs Bills',
      prediction: 'Over 47.5',
      confidence: 88,
      odds: 2.1,
      sport: 'NFL',
      expectedValue: 6.3,
      modelAccuracy: 84,
    },
    {
      id: 3,
      match: 'Dodgers vs Padres',
      prediction: 'Under 8.5',
      confidence: 79,
      odds: 1.87,
      sport: 'MLB',
      expectedValue: 3.1,
      modelAccuracy: 82,
    },
    {
      id: 4,
      match: 'Lightning vs Panthers',
      prediction: 'Lightning ML',
      confidence: 85,
      odds: 2.25,
      sport: 'NHL',
      expectedValue: 5.8,
      modelAccuracy: 79,
    },
  ];

  const actualUser = user || defaultUser;
  const actualBalance = accountBalance || defaultUser.balance;
  const actualStats = performanceStats || defaultPerformanceStats;
  const actualBets = recentBets || defaultRecentBets;
  const actualPredictions = livePredictions || defaultLivePredictions;

  useEffect(() => {
    // Simulate loading with real initialization
    const timer = setTimeout(() => setIsLoading(false), 1500);

    // Update time every second
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
    };
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-blue-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'won':
        return 'bg-green-500/20 text-green-400';
      case 'lost':
        return 'bg-red-500/20 text-red-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-white text-center'>
          <motion.div
            className='w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-6'
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <h3 className='text-xl font-bold mb-2'>Loading Dashboard</h3>
          <p className='text-gray-400'>Preparing your enterprise analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Enhanced Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2'>
                Welcome back, {actualUser.name}
              </h1>
              <p className='text-gray-400 flex items-center space-x-4'>
                <span>Enterprise Sports Intelligence • {actualUser.tier} Member</span>
                <span className='flex items-center space-x-1'>
                  <Clock className='w-4 h-4' />
                  <span>{currentTime.toLocaleTimeString()}</span>
                </span>
              </p>
            </div>

            <div className='flex items-center space-x-4 mt-4 lg:mt-0'>
              <div className='text-right'>
                <p className='text-gray-400 text-sm'>Portfolio Value</p>
                <p className='text-2xl font-bold text-yellow-400'>
                  ${actualBalance.toLocaleString()}
                </p>
              </div>
              <div className='flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30'>
                <CheckCircle className='w-4 h-4 text-green-400' />
                <span className='text-green-400 text-sm font-medium'>All Systems Live</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Account Balance</p>
                <p className='text-2xl font-bold text-white'>${actualBalance.toLocaleString()}</p>
                <p className='text-green-400 text-sm mt-1'>
                  +${actualStats.todayProfit.toFixed(2)} today
                </p>
              </div>
              <DollarSign className='w-8 h-8 text-yellow-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-yellow-400/10 rounded-full'></div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Win Rate</p>
                <p className='text-2xl font-bold text-green-400'>{actualStats.winRate}%</p>
                <p className='text-gray-400 text-sm mt-1'>{actualStats.totalBets} total bets</p>
              </div>
              <Trophy className='w-8 h-8 text-green-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-green-400/10 rounded-full'></div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Sharpe Ratio</p>
                <p className='text-2xl font-bold text-blue-400'>{actualStats.sharpeRatio}</p>
                <p className='text-gray-400 text-sm mt-1'>
                  {actualStats.maxDrawdown}% max drawdown
                </p>
              </div>
              <BarChart3 className='w-8 h-8 text-blue-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-blue-400/10 rounded-full'></div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 relative overflow-hidden'
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>ML Models Active</p>
                <p className='text-2xl font-bold text-purple-400'>{actualStats.mlModelsActive}+</p>
                <p className='text-gray-400 text-sm mt-1'>{actualStats.activeBets} active bets</p>
              </div>
              <Cpu className='w-8 h-8 text-purple-400' />
            </div>
            <div className='absolute -bottom-2 -right-2 w-20 h-20 bg-purple-400/10 rounded-full'></div>
          </motion.div>
        </div>

        {/* Advanced Performance Metrics */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Shield className='w-5 h-5 mr-2 text-green-400' />
              Risk Metrics
            </h3>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Sharpe Ratio</span>
                <span className='text-green-400 font-semibold'>{actualStats.sharpeRatio}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Max Drawdown</span>
                <span className='text-yellow-400 font-semibold'>{actualStats.maxDrawdown}%</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Avg Bet Size</span>
                <span className='text-blue-400 font-semibold'>${actualStats.avgBetSize}</span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-gray-400'>Weekly ROI</span>
                <span className='text-purple-400 font-semibold'>{actualStats.roiWeekly}%</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Brain className='w-5 h-5 mr-2 text-purple-400' />
              AI Predictions
            </h3>
            <div className='space-y-3'>
              {actualPredictions.slice(0, 4).map(prediction => (
                <div
                  key={prediction.id}
                  className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
                >
                  <div className='flex-1'>
                    <p className='text-white font-medium text-sm'>{prediction.match}</p>
                    <p className='text-gray-400 text-xs'>
                      {prediction.prediction} • {prediction.sport}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p
                      className={`font-semibold text-xs ${getConfidenceColor(prediction.confidence)}`}
                    >
                      {prediction.confidence}%
                    </p>
                    {prediction.expectedValue && (
                      <p className='text-green-400 text-xs'>EV: +{prediction.expectedValue}%</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Activity className='w-5 h-5 mr-2 text-blue-400' />
              Recent Activity
            </h3>
            <div className='space-y-3'>
              {actualBets.slice(0, 4).map(bet => (
                <div
                  key={bet.id}
                  className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
                >
                  <div className='flex-1'>
                    <p className='text-white font-medium text-sm'>{bet.match}</p>
                    <p className='text-gray-400 text-xs'>
                      ${bet.amount} at {bet.odds} • {bet.sport}
                    </p>
                  </div>
                  <div className='text-right'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(bet.status)}`}
                    >
                      {bet.status}
                    </span>
                    {bet.confidence && (
                      <p className={`text-xs mt-1 ${getConfidenceColor(bet.confidence)}`}>
                        {bet.confidence}% conf
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Enhanced Quick Actions */}
        <motion.div
          className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className='text-xl font-semibold text-white mb-6'>Quick Actions</h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <motion.button
              className='bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className='w-5 h-5' />
              <span>AI Predictions</span>
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className='w-5 h-5' />
              <span>Live Opportunities</span>
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className='w-5 h-5' />
              <span>Analytics</span>
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all flex items-center justify-center space-x-2'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className='w-5 h-5' />
              <span>Arbitrage Hunter</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
export { Dashboard };
