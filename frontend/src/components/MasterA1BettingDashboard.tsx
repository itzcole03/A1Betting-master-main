/**
 * Master A1Betting Dashboard - Consolidates ALL Best Features;
 * The ultimate money-making interface with real API integrations;
 */

import React, { useState, useEffect, useMemo, useCallback  } from 'react.ts';
import { AnimatePresence, motion } from 'framer-motion.ts';
import {
  BarChart3, Bell, Brain, DollarSign, Home, Menu, Search,
  Settings as SettingsIcon, Trophy, TrendingUp, User, Zap,
  Target, Gamepad2, Activity, Shield, BarChart, Wifi, WifiOff,
  AlertTriangle, CheckCircle, Clock, Star, ArrowUp, ArrowDown;
} from 'lucide-react.ts';

// Consolidated service imports;
import LiveAPIIntegrationService from '@/services/LiveAPIIntegrationService.ts';
import RealTimeMoneyMakingService from '@/services/RealTimeMoneyMakingService.ts';
import APITestSuite from '@/utils/APITestSuite.ts';
import { analytics } from '@/utils/analytics.ts';

// UI Components;
import RealTimeAPIIntegrationDashboard from '@/api/RealTimeAPIIntegrationDashboard.ts';
import toast from 'react-hot-toast.ts';

// Feature interfaces;
interface MoneyMakingStats {
  totalProfit: number;
  winRate: number;
  opportunitiesFound: number;
  activeBets: number;
  apiStatus: 'healthy' | 'degraded' | 'critical';
}

interface LiveOpportunity {
  id: string;
  type: 'arbitrage' | 'value_bet' | 'prop_special';
  player: string;
  sport: string;
  line: number;
  odds: number;
  confidence: number;
  expectedValue: number;
  timeRemaining: number;
  source: string;
}

export const MasterA1BettingDashboard: React.FC = () => {
  // State management;
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline'>('online');
  const [moneyMakingStats, setMoneyMakingStats] = useState<MoneyMakingStats key={231936}>({
    totalProfit: 0,
    winRate: 0,
    opportunitiesFound: 0,
    activeBets: 0,
    apiStatus: 'healthy'
  });
  const [liveOpportunities, setLiveOpportunities] = useState<LiveOpportunity[] key={741573}>([]);
  const [apiHealth, setApiHealth] = useState<any key={295429}>({});

  // Service instances;



  // Initialize dashboard;
  useEffect(() => {
    initializeDashboard();
    const interval = setInterval(updateLiveData, 30000); // Update every 30 seconds;
    return () => clearInterval(interval);
  }, []);

  const initializeDashboard = async () => {
    setIsLoading(true);
    try {
      // Test API connections;

      setApiHealth(healthCheck);
      
      // Initialize money-making service;

      setMoneyMakingStats({
        totalProfit: stats.totalProfit,
        winRate: stats.winRate,
        opportunitiesFound: stats.totalOpportunitiesFound,
        activeBets: stats.totalBetsPlaced,
        apiStatus: healthCheck.status;
      });

      // Start opportunity scanning;
      const opportunities = await moneyMaker.scanForOpportunities({
        sports: ['NFL', 'NBA', 'MLB'],
        minConfidence: 70,
        maxExposure: 1000;
      });
      
      setLiveOpportunities(opportunities.slice(0, 10).map(opp => ({
        id: opp.id,
        type: opp.type as any,
        player: opp.playerName,
        sport: 'NFL', // Default;
        line: opp.line,
        odds: opp.odds,
        confidence: opp.confidence,
        expectedValue: opp.expectedValue,
        timeRemaining: opp.timeRemaining,
        source: opp.source;
      })));

      analytics.track('dashboard_initialized', {
        api_status: healthCheck.status,
        opportunities_found: opportunities.length;
      });

    } catch (error) {
      // console statement removed
      toast.error('Failed to initialize dashboard');
    }
    setIsLoading(false);
  };

  const updateLiveData = async () => {
    try {

      setApiHealth(healthCheck);

      setMoneyMakingStats(prev => ({
        ...prev,
        totalProfit: stats.totalProfit,
        winRate: stats.winRate,
        apiStatus: healthCheck.status;
      }));
    } catch (error) {
      // console statement removed
    }
  };

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    analytics.track('tab_changed', { tab });
  }, []);

  // Render loading state;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center" key={761277}>
        <div className="text-center" key={120206}>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4" key={734304}></div>
          <h2 className="text-2xl font-bold text-white mb-2" key={958765}>🚀 Initializing A1Betting</h2>
          <p className="text-gray-300" key={821246}>Testing API connections and loading opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" key={826192}>
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10" key={297521}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" key={405990}>
          <div className="flex justify-between items-center h-16" key={905376}>
            <div className="flex items-center" key={520222}>
              <div className="flex-shrink-0" key={11962}>
                <h1 className="text-2xl font-bold text-white" key={937265}>
                  A1<span className="text-yellow-400" key={476313}>Betting</span>
                </h1>
              </div>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center space-x-4" key={787951}>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                apiHealth.status === 'healthy' 
                  ? 'bg-green-500/20 text-green-400'
                  : apiHealth.status === 'degraded'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-red-500/20 text-red-400'
              }`} key={59014}>
                {apiHealth.status === 'healthy' ? (
                  <><CheckCircle size={16} / key={439891}> All Systems Operational</>
                ) : apiHealth.status === 'degraded' ? (
                  <><AlertTriangle size={16} / key={288901}> Limited Functionality</>
                ) : (
                  <><WifiOff size={16} / key={265024}> Connection Issues</>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" key={503153}>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8" key={275596}>
          <motion.div; 
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
           key={415423}>
            <div className="flex items-center" key={520222}>
              <DollarSign className="h-8 w-8 text-green-400" / key={256324}>
              <div className="ml-4" key={699940}>
                <p className="text-sm font-medium text-gray-300" key={464090}>Total Profit</p>
                <p className="text-2xl font-bold text-white" key={36139}>
                  ${moneyMakingStats.totalProfit.toFixed(2)}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div; 
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
           key={43286}>
            <div className="flex items-center" key={520222}>
              <Trophy className="h-8 w-8 text-yellow-400" / key={993659}>
              <div className="ml-4" key={699940}>
                <p className="text-sm font-medium text-gray-300" key={464090}>Win Rate</p>
                <p className="text-2xl font-bold text-white" key={36139}>
                  {moneyMakingStats.winRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div; 
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
           key={341697}>
            <div className="flex items-center" key={520222}>
              <Target className="h-8 w-8 text-blue-400" / key={154808}>
              <div className="ml-4" key={699940}>
                <p className="text-sm font-medium text-gray-300" key={464090}>Opportunities</p>
                <p className="text-2xl font-bold text-white" key={36139}>
                  {moneyMakingStats.opportunitiesFound}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div; 
            className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
           key={147429}>
            <div className="flex items-center" key={520222}>
              <Activity className="h-8 w-8 text-purple-400" / key={771114}>
              <div className="ml-4" key={699940}>
                <p className="text-sm font-medium text-gray-300" key={464090}>Active Bets</p>
                <p className="text-2xl font-bold text-white" key={36139}>
                  {moneyMakingStats.activeBets}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8" key={286587}>
          <nav className="flex space-x-8" key={41143}>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'opportunities', label: 'Live Opportunities', icon: Target },
              { id: 'arbitrage', label: 'Arbitrage Hunter', icon: Brain },
              { id: 'apis', label: 'API Status', icon: Activity },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ id, label, icon: Icon }) => (
              <button;
                key={id}
                onClick={() = key={782984}> handleTabChange(id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === id;
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" / key={934185}>
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait" key={725119}>
          {activeTab === 'dashboard' && (
            <motion.div;
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
             key={401804}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
                {/* Live Opportunities Preview */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20" key={985645}>
                  <h3 className="text-xl font-bold text-white mb-4" key={768896}>🎯 Top Opportunities</h3>
                  <div className="space-y-3" key={186520}>
                    {liveOpportunities.slice(0, 5).map((opp) => (
                      <div key={opp.id} className="flex justify-between items-center p-3 bg-black/20 rounded-lg" key={49415}>
                        <div key={241917}>
                          <p className="text-white font-medium" key={873883}>{opp.player}</p>
                          <p className="text-gray-400 text-sm" key={516838}>{opp.type} • {opp.source}</p>
                        </div>
                        <div className="text-right" key={144468}>
                          <p className="text-green-400 font-bold" key={786530}>+{opp.expectedValue.toFixed(2)}%</p>
                          <p className="text-gray-400 text-sm" key={516838}>{opp.confidence}% confidence</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* API Health Overview */}
                <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20" key={985645}>
                  <h3 className="text-xl font-bold text-white mb-4" key={768896}>📡 API Health</h3>
                  <div className="space-y-3" key={186520}>
                    {Object.entries(apiHealth.services || {}).map(([service, status]) => (
                      <div key={service} className="flex justify-between items-center" key={131631}>
                        <span className="text-gray-300 capitalize" key={514389}>{service}</span>
                        <span className={`px-2 py-1 rounded text-sm ${
                          status ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`} key={373320}>
                          {status ? 'Operational' : 'Issues'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'opportunities' && (
            <motion.div;
              key="opportunities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
             key={632777}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20" key={985645}>
                <h3 className="text-xl font-bold text-white mb-6" key={948901}>🎯 Live Money-Making Opportunities</h3>
                <div className="grid gap-4" key={449070}>
                  {liveOpportunities.map((opp) => (
                    <div key={opp.id} className="bg-black/20 rounded-lg p-4 border border-white/10" key={69528}>
                      <div className="flex justify-between items-start" key={678391}>
                        <div className="flex-1" key={745195}>
                          <div className="flex items-center space-x-2 mb-2" key={766767}>
                            <span className="text-white font-bold" key={372180}>{opp.player}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              opp.type === 'arbitrage' ? 'bg-green-500/20 text-green-400' :
                              opp.type === 'value_bet' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-purple-500/20 text-purple-400'
                            }`} key={633690}>
                              {opp.type.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm" key={516838}>
                            Line: {opp.line} • Odds: {opp.odds} • Source: {opp.source}
                          </p>
                          <div className="flex items-center space-x-4 mt-2" key={687333}>
                            <span className="text-green-400" key={40612}>
                              EV: +{opp.expectedValue.toFixed(2)}%
                            </span>
                            <span className="text-blue-400" key={510194}>
                              Confidence: {opp.confidence}%
                            </span>
                            <span className="text-yellow-400 flex items-center" key={99630}>
                              <Clock size={14} className="mr-1" / key={592798}>
                              {opp.timeRemaining}m;
                            </span>
                          </div>
                        </div>
                        <button; 
                          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                          onClick={() = key={539686}> {
                            toast.success(`Analyzing ${opp.player} opportunity...`);
                            analytics.track('opportunity_clicked', { opportunity_id: opp.id });
                          }}
                        >
                          Analyze;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'apis' && (
            <motion.div;
              key="apis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
             key={828121}>
              <RealTimeAPIIntegrationDashboard / key={134747}>
            </motion.div>
          )}

          {activeTab === 'arbitrage' && (
            <motion.div;
              key="arbitrage"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
             key={233714}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20" key={985645}>
                <h3 className="text-xl font-bold text-white mb-6" key={948901}>🧠 Arbitrage Hunter</h3>
                <div className="text-center py-12" key={752807}>
                  <Brain className="h-16 w-16 text-yellow-400 mx-auto mb-4" / key={383170}>
                  <h4 className="text-xl font-bold text-white mb-2" key={632124}>Advanced Arbitrage Detection</h4>
                  <p className="text-gray-400 mb-6" key={414460}>
                    Cross-platform arbitrage opportunities using TheOdds and PrizePicks APIs;
                  </p>
                  <button; 
                    className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                    onClick={() = key={781447}> {
                      toast.loading('Scanning for arbitrage opportunities...');
                      analytics.track('arbitrage_scan_started');
                    }}
                  >
                    Start Arbitrage Scan;
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div;
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
             key={272233}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20" key={985645}>
                <h3 className="text-xl font-bold text-white mb-6" key={948901}>📊 Advanced Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" key={151516}>
                  <div className="bg-black/20 rounded-lg p-4" key={530095}>
                    <h4 className="text-white font-bold mb-2" key={444369}>Performance Metrics</h4>
                    <div className="space-y-2" key={725977}>
                      <div className="flex justify-between" key={588832}>
                        <span className="text-gray-400" key={912100}>ROI</span>
                        <span className="text-green-400" key={40612}>+12.5%</span>
                      </div>
                      <div className="flex justify-between" key={588832}>
                        <span className="text-gray-400" key={912100}>Sharpe Ratio</span>
                        <span className="text-blue-400" key={510194}>1.8</span>
                      </div>
                      <div className="flex justify-between" key={588832}>
                        <span className="text-gray-400" key={912100}>Max Drawdown</span>
                        <span className="text-red-400" key={60158}>-3.2%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/20 rounded-lg p-4" key={530095}>
                    <h4 className="text-white font-bold mb-2" key={444369}>API Usage</h4>
                    <div className="space-y-2" key={725977}>
                      <div className="flex justify-between" key={588832}>
                        <span className="text-gray-400" key={912100}>SportsRadar</span>
                        <span className="text-yellow-400" key={476313}>75% quota used</span>
                      </div>
                      <div className="flex justify-between" key={588832}>
                        <span className="text-gray-400" key={912100}>TheOdds</span>
                        <span className="text-green-400" key={40612}>45% quota used</span>
                      </div>
                      <div className="flex justify-between" key={588832}>
                        <span className="text-gray-400" key={912100}>PrizePicks</span>
                        <span className="text-green-400" key={40612}>Unlimited</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-12" key={577069}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" key={198115}>
          <div className="text-center text-gray-400" key={642401}>
            <p key={161203}>A1Betting Platform • Real API Integrations • Live Money-Making Opportunities</p>
            <p className="text-sm mt-1" key={622732}>
              SportsRadar: R10yQ...7s • TheOdds: 8684b...0ee • Enhanced with AI Analytics;
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MasterA1BettingDashboard;
