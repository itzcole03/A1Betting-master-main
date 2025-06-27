/**
 * Intelligent Merged Interface - A1BETTING
 * Simple and user-friendly interface with optional advanced features
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  DollarSign,
  Target,
  BarChart3,
  Settings,
  User,
  Activity,
  TrendingUp,
} from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'ready' | 'active' | 'processing';
  gradient: string;
  badge?: string;
}

interface DashboardStats {
  totalProfit: number;
  aiWinRate: number;
  liveAccuracy: number;
  activeAlerts: number;
}

const IntelligentMergedInterface: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);
  const [stats] = useState<DashboardStats>({
    totalProfit: 48390,
    aiWinRate: 94.7,
    liveAccuracy: 97.3,
    activeAlerts: 6,
  });

  const services: ServiceCard[] = [
    {
      id: 'money-maker',
      title: 'Money Maker Pro',
      description: 'AI-powered profit generation with quantum enhancement',
      icon: <DollarSign className='w-8 h-8' />,
      status: 'ready',
      gradient: 'from-yellow-400 to-yellow-600',
      badge: '94.7% Win Rate',
    },
    {
      id: 'analytics',
      title: 'Analytics Hub',
      description: 'Advanced performance tracking and insights',
      icon: <BarChart3 className='w-8 h-8' />,
      status: 'active',
      gradient: 'from-blue-400 to-blue-600',
      badge: 'Live Data',
    },
    {
      id: 'ai-predictions',
      title: 'AI Predictions',
      description: 'Machine learning powered betting predictions',
      icon: <Brain className='w-8 h-8' />,
      status: 'ready',
      gradient: 'from-purple-400 to-purple-600',
      badge: '97.3% Accuracy',
    },
    {
      id: 'portfolio',
      title: 'Portfolio Manager',
      description: 'Risk management and bankroll optimization',
      icon: <Target className='w-8 h-8' />,
      status: 'ready',
      gradient: 'from-green-400 to-green-600',
      badge: 'Optimized',
    },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
      <div className='container mx-auto px-6 py-8'>
        {/* Header */}
        <div className='text-center mb-12'>
          <motion.h1
            className='text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            A1 Betting Intelligence
          </motion.h1>
          <p className='text-xl text-gray-300'>AI-Powered Sports Betting Platform</p>
        </div>

        {/* Stats Dashboard */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.05 }}
          >
            <div className='flex items-center justify-between mb-4'>
              <DollarSign className='w-8 h-8 text-yellow-400' />
              <span className='text-2xl font-bold'>${stats.totalProfit.toLocaleString()}</span>
            </div>
            <h3 className='text-gray-300 text-sm'>Total Profit</h3>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.05 }}
          >
            <div className='flex items-center justify-between mb-4'>
              <Target className='w-8 h-8 text-green-400' />
              <span className='text-2xl font-bold'>{stats.aiWinRate}%</span>
            </div>
            <h3 className='text-gray-300 text-sm'>AI Win Rate</h3>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.05 }}
          >
            <div className='flex items-center justify-between mb-4'>
              <Brain className='w-8 h-8 text-purple-400' />
              <span className='text-2xl font-bold'>{stats.liveAccuracy}%</span>
            </div>
            <h3 className='text-gray-300 text-sm'>Live Accuracy</h3>
          </motion.div>

          <motion.div
            className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6'
            whileHover={{ scale: 1.05 }}
          >
            <div className='flex items-center justify-between mb-4'>
              <Activity className='w-8 h-8 text-blue-400' />
              <span className='text-2xl font-bold'>{stats.activeAlerts}</span>
            </div>
            <h3 className='text-gray-300 text-sm'>Active Alerts</h3>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {services.map(service => (
            <motion.div
              key={service.id}
              className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all cursor-pointer'
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveView(service.id)}
            >
              <div className='flex items-start justify-between mb-6'>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient}`}>
                  {service.icon}
                </div>
                {service.badge && (
                  <span className='px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm'>
                    {service.badge}
                  </span>
                )}
              </div>

              <h3 className='text-xl font-semibold text-white mb-2'>{service.title}</h3>

              <p className='text-gray-400 mb-4'>{service.description}</p>

              <div className='flex items-center justify-between'>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    service.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {service.status}
                </span>

                <motion.button
                  className='px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition-all'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mode Toggle */}
        <div className='text-center mt-12'>
          <motion.button
            onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            className='px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all'
            whileHover={{ scale: 1.05 }}
          >
            {isAdvancedMode ? 'Switch to Simple Mode' : 'Switch to Advanced Mode'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default IntelligentMergedInterface;
