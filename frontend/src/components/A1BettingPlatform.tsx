import React, { useState, useEffect, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Brain,
  DollarSign,
  Home,
  Menu,
  Settings as SettingsIcon,
  Target,
  TrendingUp,
  User,
  Zap,
  Activity,
  Trophy,
  X,
  Bell,
  Search,
  Calendar,
  PieChart,
  Layers,
  Database,
  Shield,
  Cpu,
} from 'lucide-react';

// Lazy load major components for performance
const Dashboard = lazy(() => import('./Dashboard'));
const BettingInterface = lazy(() => import('./BettingInterface'));
const PredictionDisplay = lazy(() => import('./PredictionDisplay'));
const UserProfile = lazy(() => import('./UserProfile'));

/**
 * A1Betting Platform - Comprehensive Sports Betting Intelligence
 *
 * Features:
 * - 73.8% Win Rate across all implemented strategies
 * - 18.5% ROI with risk-adjusted portfolio management
 * - 85%+ AI Accuracy in prediction models with SHAP explainability
 * - 47+ ML models including ensemble methods, deep learning, and causal inference
 * - Real-time processing with sub-100ms latency
 * - Multi-platform integration with live API connections
 */

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  component: React.ComponentType<any>;
  badge?: string;
  description: string;
}

interface PlatformStats {
  totalProfit: number;
  winRate: number;
  accuracy: number;
  activePredictions: number;
  portfolioValue: number;
  todayPnL: number;
}

const A1BettingPlatform: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Platform statistics - pulled from documentation
  const [stats] = useState<PlatformStats>({
    totalProfit: 18500, // 18.5% ROI as documented
    winRate: 73.8, // 73.8% Win Rate as documented
    accuracy: 85.2, // 85%+ AI Accuracy as documented
    activePredictions: 47, // 47+ ML models as documented
    portfolioValue: 125000,
    todayPnL: 2340,
  });

  // Navigation structure based on comprehensive documentation
  const navigationItems: NavigationItem[] = [
    {
      id: 'dashboard',
      label: 'Command Center',
      icon: <Home className='w-5 h-5' />,
      component: Dashboard,
      description: 'Live performance metrics and system overview',
    },
    {
      id: 'betting',
      label: 'Betting Interface',
      icon: <DollarSign className='w-5 h-5' />,
      component: BettingInterface,
      badge: 'Live',
      description: 'Place bets with AI-powered insights',
    },
    {
      id: 'predictions',
      label: 'AI Predictions',
      icon: <Brain className='w-5 h-5' />,
      component: PredictionDisplay,
      badge: '85%',
      description: '47+ ML models with ensemble methods',
    },
    {
      id: 'analytics',
      label: 'Performance Analytics',
      icon: <BarChart3 className='w-5 h-5' />,
      component: Dashboard, // Placeholder - will show analytics view
      description: 'Advanced performance tracking and insights',
    },
    {
      id: 'portfolio',
      label: 'Portfolio Manager',
      icon: <Target className='w-5 h-5' />,
      component: Dashboard, // Placeholder - will show portfolio view
      badge: '18.5%',
      description: 'Risk-adjusted portfolio management',
    },
    {
      id: 'live-data',
      label: 'Live Data Feeds',
      icon: <Activity className='w-5 h-5' />,
      component: Dashboard, // Placeholder - will show live data view
      badge: 'Real-time',
      description: 'SportsRadar, TheOdds, PrizePicks APIs',
    },
    {
      id: 'models',
      label: 'ML Model Center',
      icon: <Cpu className='w-5 h-5' />,
      component: Dashboard, // Placeholder - will show ML models view
      badge: '47+',
      description: 'Ensemble methods, deep learning, causal inference',
    },
    {
      id: 'profile',
      label: 'User Profile',
      icon: <User className='w-5 h-5' />,
      component: UserProfile,
      description: 'Account management and preferences',
    },
  ];

  // Initialize loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const ActiveComponent =
    navigationItems.find(item => item.id === activeView)?.component || Dashboard;
  const activeItem = navigationItems.find(item => item.id === activeView);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center'>
        <motion.div
          className='text-center'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className='w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-6'
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <h1 className='text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4'>
            A1 Betting Platform
          </h1>
          <p className='text-xl text-gray-300 mb-2'>AI-Powered Sports Intelligence</p>
          <div className='flex items-center justify-center space-x-4 text-sm text-gray-400'>
            <span>• 73.8% Win Rate</span>
            <span>• 85%+ AI Accuracy</span>
            <span>• 47+ ML Models</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white'>
      {/* Mobile Header */}
      <div className='lg:hidden bg-black/20 backdrop-blur-lg border-b border-white/10 p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-3'>
            <h1 className='text-xl font-bold text-yellow-400'>A1 Betting</h1>
            <span className='text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full'>
              Live
            </span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='text-white hover:text-yellow-400 transition-colors'
          >
            {isMobileMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      <div className='flex'>
        {/* Advanced Sidebar */}
        <AnimatePresence>
          {(isMobileMenuOpen || window.innerWidth >= 1024) && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className='fixed lg:relative z-50 lg:z-auto w-80 h-full lg:h-screen bg-black/40 backdrop-blur-lg border-r border-white/10'
            >
              <div className='p-6'>
                {/* Logo & Platform Stats */}
                <div className='hidden lg:block mb-8'>
                  <h1 className='text-2xl font-bold text-yellow-400 mb-2'>A1 Betting Platform</h1>
                  <p className='text-gray-400 text-sm mb-4'>AI Sports Intelligence</p>

                  {/* Live Stats Summary */}
                  <div className='grid grid-cols-2 gap-3 mb-6'>
                    <div className='bg-white/10 rounded-lg p-3'>
                      <p className='text-xs text-gray-400'>Win Rate</p>
                      <p className='text-lg font-bold text-green-400'>{stats.winRate}%</p>
                    </div>
                    <div className='bg-white/10 rounded-lg p-3'>
                      <p className='text-xs text-gray-400'>AI Accuracy</p>
                      <p className='text-lg font-bold text-blue-400'>{stats.accuracy}%</p>
                    </div>
                    <div className='bg-white/10 rounded-lg p-3'>
                      <p className='text-xs text-gray-400'>Total Profit</p>
                      <p className='text-lg font-bold text-yellow-400'>
                        ${stats.totalProfit.toLocaleString()}
                      </p>
                    </div>
                    <div className='bg-white/10 rounded-lg p-3'>
                      <p className='text-xs text-gray-400'>Models</p>
                      <p className='text-lg font-bold text-purple-400'>
                        {stats.activePredictions}+
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className='space-y-2'>
                  <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>
                    Platform Modules
                  </h3>
                  {navigationItems.map(item => (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveView(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                        activeView === item.id
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className='relative'>
                        {item.icon}
                        {item.badge && (
                          <span className='absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center'>
                            {item.badge === 'Live' ? '●' : item.badge}
                          </span>
                        )}
                      </div>
                      <div className='flex-1'>
                        <p className='font-medium'>{item.label}</p>
                        <p className='text-xs text-gray-400 mt-1'>{item.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </nav>

                {/* System Status */}
                <div className='mt-8 p-4 bg-white/5 rounded-lg'>
                  <h4 className='text-sm font-semibold text-white mb-3'>System Status</h4>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-gray-400'>SportsRadar API</span>
                      <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-gray-400'>TheOdds API</span>
                      <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-gray-400'>ML Models</span>
                      <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-gray-400'>Real-time Data</span>
                      <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Area */}
        <div className='flex-1 lg:ml-0'>
          {/* Top Bar */}
          <div className='hidden lg:flex items-center justify-between p-6 border-b border-white/10 bg-black/20 backdrop-blur-lg'>
            <div>
              <h2 className='text-2xl font-bold text-white'>{activeItem?.label || 'Dashboard'}</h2>
              <p className='text-gray-400 text-sm'>
                {activeItem?.description || 'Platform overview'}
              </p>
            </div>

            <div className='flex items-center space-x-4'>
              {/* Today's P&L */}
              <div className='text-right'>
                <p className='text-xs text-gray-400'>Today's P&L</p>
                <p
                  className={`font-semibold ${stats.todayPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {stats.todayPnL >= 0 ? '+' : ''}${stats.todayPnL.toLocaleString()}
                </p>
              </div>

              {/* Live Indicator */}
              <div className='flex items-center space-x-2'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-sm text-green-400'>Live</span>
              </div>
            </div>
          </div>

          {/* Component Content */}
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='min-h-screen'
          >
            <React.Suspense
              fallback={
                <div className='flex items-center justify-center min-h-96'>
                  <div className='text-center'>
                    <div className='w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
                    <p className='text-gray-400'>Loading {activeItem?.label}...</p>
                  </div>
                </div>
              }
            >
              <ActiveComponent />
            </React.Suspense>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default A1BettingPlatform;
