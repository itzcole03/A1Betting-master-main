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
}

interface Prediction {
  id: number;
  match: string;
  prediction: string;
  confidence: number;
  odds: number;
  sport: string;
}

interface DashboardProps {
  user: User;
  accountBalance: number;
  recentBets: Bet[];
  livePredictions: Prediction[];
  performanceStats: {
    totalProfit: number;
    winRate: number;
    todayProfit: number;
    activeBets: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  accountBalance,
  recentBets,
  livePredictions,
  performanceStats,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4'></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <motion.div
          className='mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2'>
            Welcome back, {user.name}
          </h1>
          <p className='text-gray-400'>Your AI Sports Betting Dashboard - {user.tier} Member</p>
        </motion.div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Account Balance</p>
                <p className='text-2xl font-bold text-white'>${accountBalance.toLocaleString()}</p>
              </div>
              <DollarSign className='w-8 h-8 text-yellow-400' />
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Today's Profit</p>
                <p
                  className={`text-2xl font-bold ${performanceStats.todayProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {performanceStats.todayProfit >= 0 ? '+' : ''}$
                  {performanceStats.todayProfit.toLocaleString()}
                </p>
              </div>
              <TrendingUp className='w-8 h-8 text-green-400' />
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Win Rate</p>
                <p className='text-2xl font-bold text-blue-400'>{performanceStats.winRate}%</p>
              </div>
              <Target className='w-8 h-8 text-blue-400' />
            </div>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.02 }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-400 text-sm'>Active Bets</p>
                <p className='text-2xl font-bold text-purple-400'>{performanceStats.activeBets}</p>
              </div>
              <Activity className='w-8 h-8 text-purple-400' />
            </div>
          </motion.div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Recent Bets */}
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <BarChart3 className='w-5 h-5 mr-2' />
              Recent Bets
            </h3>
            <div className='space-y-3'>
              {recentBets.slice(0, 5).map(bet => (
                <div
                  key={bet.id}
                  className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
                >
                  <div>
                    <p className='text-white font-medium'>{bet.match}</p>
                    <p className='text-gray-400 text-sm'>
                      ${bet.amount} at {bet.odds}
                    </p>
                  </div>
                  <div className='text-right'>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        bet.status === 'won'
                          ? 'bg-green-500/20 text-green-400'
                          : bet.status === 'lost'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {bet.status}
                    </span>
                    <p className='text-gray-400 text-sm mt-1'>
                      {bet.status === 'pending'
                        ? `Win $${bet.potentialWinnings}`
                        : bet.status === 'won'
                          ? `+$${bet.potentialWinnings}`
                          : `-$${bet.amount}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Predictions */}
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className='text-xl font-semibold text-white mb-4 flex items-center'>
              <Brain className='w-5 h-5 mr-2' />
              AI Predictions
            </h3>
            <div className='space-y-3'>
              {livePredictions.slice(0, 5).map(prediction => (
                <div
                  key={prediction.id}
                  className='flex items-center justify-between p-3 bg-white/5 rounded-lg'
                >
                  <div>
                    <p className='text-white font-medium'>{prediction.match}</p>
                    <p className='text-gray-400 text-sm'>
                      {prediction.prediction} • {prediction.sport}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='text-yellow-400 font-semibold'>{prediction.odds}</p>
                    <p className='text-green-400 text-sm'>{prediction.confidence}% confidence</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          className='mt-8 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className='text-xl font-semibold text-white mb-4'>Quick Actions</h3>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <motion.button
              className='bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 px-6 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all flex items-center justify-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Brain className='w-5 h-5 mr-2' />
              View AI Predictions
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-400 hover:to-green-500 transition-all flex items-center justify-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <DollarSign className='w-5 h-5 mr-2' />
              Place New Bet
            </motion.button>

            <motion.button
              className='bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all flex items-center justify-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className='w-5 h-5 mr-2' />
              View Analytics
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Default component with mock data for standalone use
const DashboardWithMockData: React.FC = () => {
  const mockUser: User = {
    id: 1,
    name: 'Elite Bettor',
    email: 'elite@example.com',
    balance: 2500.0,
    tier: 'Quantum Pro',
  };

  const mockBets: Bet[] = [
    {
      id: 1,
      match: 'Lakers vs Warriors',
      amount: 100,
      odds: 2.15,
      status: 'won',
      potentialWinnings: 215,
      placedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: 2,
      match: 'Cowboys vs Giants',
      amount: 50,
      odds: 1.85,
      status: 'pending',
      potentialWinnings: 92.5,
      placedAt: '2024-01-15T14:20:00Z',
    },
  ];

  const mockPredictions: Prediction[] = [
    {
      id: 1,
      match: 'Celtics vs Heat',
      prediction: 'Celtics -5.5',
      confidence: 85,
      odds: 1.95,
      sport: 'NBA',
    },
    {
      id: 2,
      match: 'Chiefs vs Bills',
      prediction: 'Over 47.5',
      confidence: 78,
      odds: 2.1,
      sport: 'NFL',
    },
  ];

  const mockStats = {
    totalProfit: 1250,
    winRate: 78.5,
    todayProfit: 125.5,
    activeBets: 3,
  };

  return (
    <Dashboard
      user={mockUser}
      accountBalance={2500.0}
      recentBets={mockBets}
      livePredictions={mockPredictions}
      performanceStats={mockStats}
    />
  );
};

export default DashboardWithMockData;
export { Dashboard };
