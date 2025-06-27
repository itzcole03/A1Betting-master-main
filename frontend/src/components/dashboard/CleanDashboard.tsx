import React from 'react.ts';
import { motion } from 'framer-motion.ts';
import { TrendingUp, BarChart3, Activity, Clock } from 'lucide-react.ts';

// Import our real components;
import MetricsOverview from './MetricsOverview.ts';
import LiveOpportunities from './LiveOpportunities.ts';
import ModernActivityFeed from '@/ui/ModernActivityFeed.ts';

interface CleanDashboardProps {
  className?: string;
}

export const CleanDashboard: React.FC<CleanDashboardProps key={389367}> = ({
  className = "",
}) => {
  return (
    <div className={`space-y-8 ${className}`} key={274210}>
      {/* Hero Section */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-cyan-900/30 border border-gray-700/50 backdrop-blur-xl overflow-hidden"
       key={748468}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" key={335614}>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full blur-3xl" / key={378829}>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full blur-3xl" / key={123830}>
        </div>

        <div className="relative" key={579431}>
          <div className="flex items-center justify-between" key={96335}>
            <div key={241917}>
              <h1 className="text-4xl font-bold text-white mb-2" key={30716}>
                AI Sports Intelligence Platform;
              </h1>
              <p className="text-xl text-gray-300" key={547795}>
                Real-time data • Advanced ML predictions • 94.2% accuracy;
              </p>
              <div className="flex items-center space-x-6 mt-4" key={496828}>
                <div className="flex items-center space-x-2" key={740830}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" / key={724634}>
                  <span className="text-green-400 font-medium" key={119374}>
                    System Online;
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400" key={491177}>
                  <Clock size={16} / key={629845}>
                  <span key={595076}>Last updated: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6" key={605525}>
              <div className="text-center" key={120206}>
                <div className="text-3xl font-bold text-blue-400" key={962204}>94.2%</div>
                <div className="text-sm text-gray-400" key={372957}>Accuracy</div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-3xl font-bold text-green-400" key={948549}>+$18K</div>
                <div className="text-sm text-gray-400" key={372957}>This Month</div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-3xl font-bold text-purple-400" key={992010}>91.5%</div>
                <div className="text-sm text-gray-400" key={372957}>Win Rate</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Overview */}
      <MetricsOverview / key={742395}>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8" key={985772}>
        {/* Live Opportunities - Takes up 2 columns */}
        <div className="xl:col-span-2" key={237328}>
          <LiveOpportunities / key={71323}>
        </div>

        {/* Activity Feed - Takes up 1 column */}
        <div className="space-y-6" key={501869}>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl" key={821258}>
            <ModernActivityFeed maxItems={8} showTimeline={true} / key={678083}>
          </div>

          {/* System Status */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl" key={821258}>
            <div className="flex items-center space-x-3 mb-4" key={584588}>
              <div className="p-2 rounded-lg bg-green-500/20" key={230602}>
                <BarChart3 size={18} className="text-green-400" / key={295468}>
              </div>
              <h3 className="text-lg font-semibold text-white" key={430547}>
                System Health;
              </h3>
            </div>

            <div className="space-y-3" key={186520}>
              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>API Status</span>
                <div className="flex items-center space-x-2" key={740830}>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" / key={724634}>
                  <span className="text-sm text-green-400 font-medium" key={630471}>
                    Online;
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Model Performance</span>
                <span className="text-sm text-white font-medium" key={240835}>94.7%</span>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Data Latency</span>
                <span className="text-sm text-white font-medium" key={240835}>12ms</span>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Active Models</span>
                <span className="text-sm text-white font-medium" key={240835}>47</span>
              </div>

              <div className="flex items-center justify-between" key={96335}>
                <span className="text-sm text-gray-400" key={257018}>Connected Sources</span>
                <span className="text-sm text-white font-medium" key={240835}>8/8</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700/50" key={494181}>
              <div className="flex items-center justify-between text-xs text-gray-500" key={936167}>
                <span key={595076}>Data Quality: 98.3%</span>
                <span key={595076}>Uptime: 99.9%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 backdrop-blur-xl" key={821258}>
            <h3 className="text-lg font-semibold text-white mb-4" key={580332}>
              Quick Actions;
            </h3>
            <div className="space-y-3" key={186520}>
              <button className="w-full p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 hover:border-blue-400/50 text-blue-400 hover:text-blue-300 rounded-lg transition-all text-left" key={465731}>
                <div className="font-medium" key={471146}>Run New Analysis</div>
                <div className="text-xs text-gray-400" key={588004}>
                  Generate fresh predictions;
                </div>
              </button>

              <button className="w-full p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 hover:border-green-400/50 text-green-400 hover:text-green-300 rounded-lg transition-all text-left" key={371683}>
                <div className="font-medium" key={471146}>View Opportunities</div>
                <div className="text-xs text-gray-400" key={588004}>
                  Check latest betting edges;
                </div>
              </button>

              <button className="w-full p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-lg transition-all text-left" key={4671}>
                <div className="font-medium" key={471146}>Configure Models</div>
                <div className="text-xs text-gray-400" key={588004}>
                  Adjust AI parameters;
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CleanDashboard;
