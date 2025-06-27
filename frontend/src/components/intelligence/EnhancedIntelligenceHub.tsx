import React, { useState, useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  BarChart3,
  Brain,
  Target,
  Settings,
  Activity,
  Zap,
  TrendingUp,
  Shield,
  Database,
  Cpu,
  Network,
  AlertCircle,
  CheckCircle,
  Eye,
  Gauge,
} from 'lucide-react.ts';
import { useQuery } from '@tanstack/react-query.ts';
import { api } from '@/services/integrationService.ts';

// Import existing components to integrate;
import { AdvancedIntelligenceHub } from './AdvancedIntelligenceHub.ts';
import { UltraAccuracyDashboard } from '@/overview/UltraAccuracyOverview.ts';
import { AdminSettings } from '@/admin/AdminSettings.ts';

interface IntelligenceHubProps {
  onNavigate?: (page: string) => void;
}

export const EnhancedIntelligenceHub: React.FC<IntelligenceHubProps key={281724}> = ({
  onNavigate,
}) => {
  const [activeSection, setActiveSection] = useState("overview");
  const [systemMetrics, setSystemMetrics] = useState<any key={295429}>(null);

  // Real-time system monitoring;
  const { data: healthData } = useQuery({
    queryKey: ["intelligence-health"],
    queryFn: () => api.getHealthStatus(),
    refetchInterval: 5000,
  });

  const { data: accuracyData } = useQuery({
    queryKey: ["intelligence-accuracy"],
    queryFn: () => api.getAccuracyMetrics(),
    refetchInterval: 10000,
  });

  // Intelligence Hub sections;
  const sections = [
    {
      id: "overview",
      label: "System Overview",
      icon: <Eye className="w-5 h-5" / key={765143}>,
      description: "Real-time system status and performance",
    },
    {
      id: "accuracy",
      label: "Ultra Accuracy",
      icon: <Target className="w-5 h-5" / key={201057}>,
      description: "Advanced accuracy monitoring and optimization",
    },
    {
      id: "intelligence",
      label: "AI Intelligence",
      icon: <Brain className="w-5 h-5" / key={358560}>,
      description: "AI models, predictions, and neural networks",
    },
    {
      id: "admin",
      label: "Admin Control",
      icon: <Settings className="w-5 h-5" / key={735275}>,
      description: "System administration and configuration",
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <SystemOverview healthData={healthData} accuracyData={accuracyData} / key={398293}>
        );
      case "accuracy":
        return <UltraAccuracyDashboard onNavigate={onNavigate} / key={782639}>;
      case "intelligence":
        return <AdvancedIntelligenceHub onNavigate={onNavigate} / key={254916}>;
      case "admin":
        return <AdminSettings onNavigate={onNavigate} / key={266560}>;
      default:
        return (
          <SystemOverview healthData={healthData} accuracyData={accuracyData} / key={398293}>
        );
    }
  };

  return (
    <div className="space-y-6" key={501869}>
      {/* Header */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
       key={472940}>
        <div className="text-6xl mb-4" key={671434}>🧠</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-2" key={661084}>
          Intelligence Hub;
        </h1>
        <p className="text-gray-400 text-lg" key={260320}>
          Central command for all AI systems and monitoring;
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
       key={479540}>
        <div className="glass-card rounded-xl p-6 text-center" key={797123}>
          <div className="text-2xl mb-2 text-green-400" key={284421}>
            <Activity className="w-8 h-8 mx-auto" / key={817549}>
          </div>
          <div className="text-xl font-bold text-white" key={280014}>
            {healthData?.status === "healthy" ? "ONLINE" : "OFFLINE"}
          </div>
          <div className="text-sm text-gray-400" key={372957}>System Status</div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center" key={797123}>
          <div className="text-2xl mb-2 text-blue-400" key={592353}>
            <Target className="w-8 h-8 mx-auto" / key={24366}>
          </div>
          <div className="text-xl font-bold text-white" key={280014}>
            {accuracyData;
              ? `${(accuracyData.overall_accuracy * 100).toFixed(1)}%`
              : "0%"}
          </div>
          <div className="text-sm text-gray-400" key={372957}>AI Accuracy</div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center" key={797123}>
          <div className="text-2xl mb-2 text-purple-400" key={759641}>
            <Brain className="w-8 h-8 mx-auto" / key={863121}>
          </div>
          <div className="text-xl font-bold text-white" key={280014}>
            {Object.keys(healthData?.services || {}).length}
          </div>
          <div className="text-sm text-gray-400" key={372957}>Active Models</div>
        </div>

        <div className="glass-card rounded-xl p-6 text-center" key={797123}>
          <div className="text-2xl mb-2 text-orange-400" key={989556}>
            <Zap className="w-8 h-8 mx-auto" / key={288219}>
          </div>
          <div className="text-xl font-bold text-white" key={280014}>
            {healthData?.uptime;
              ? `${Math.floor(healthData.uptime / 3600)}h`
              : "0h"}
          </div>
          <div className="text-sm text-gray-400" key={372957}>Uptime</div>
        </div>
      </motion.div>

      {/* Section Navigation */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-6"
       key={800622}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4" key={426410}>
          {sections.map((section) => (
            <motion.button;
              key={section.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() = key={759548}> setActiveSection(section.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                activeSection === section.id;
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50"
                  : "hover:bg-gray-800/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-2" key={283743}>
                {section.icon}
                <span className="font-semibold" key={331625}>{section.label}</span>
              </div>
              <p className="text-sm text-gray-400" key={965781}>{section.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Active Section */}
      <motion.div;
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-6"
       key={262248}>
        <AnimatePresence mode="wait" key={725119}>
          <motion.div;
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
           key={21572}>
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// System Overview Component;
const SystemOverview: React.FC<{ healthData: any; accuracyData: any }> = ({
  healthData,
  accuracyData,
}) => {
  return (
    <div className="space-y-6" key={501869}>
      <h2 className="text-2xl font-bold text-cyan-400 mb-6" key={906351}>System Overview</h2>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" key={813322}>
        <div className="space-y-4" key={160407}>
          <h3 className="text-lg font-semibold text-white" key={430547}>System Health</h3>
          {healthData?.services &&
            Object.entries(healthData.services).map(
              ([service, status]: [string, any]) => (
                <div;
                  key={service}
                  className="flex items-center justify-between p-3 bg-gray-800/40 rounded-lg"
                 key={897431}>
                  <span className="text-gray-300 capitalize" key={514389}>
                    {service.replace("_", " ")}
                  </span>
                  <div className="flex items-center gap-2" key={100294}>
                    {status === "operational" ? (
                      <CheckCircle className="w-4 h-4 text-green-400" / key={917642}>
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-400" / key={430349}>
                    )}
                    <span;
                      className={
                        status === "operational"
                          ? "text-green-400"
                          : "text-red-400"
                      }
                     key={945064}>
                      {status}
                    </span>
                  </div>
                </div>
              ),
            )}
        </div>

        <div className="space-y-4" key={160407}>
          <h3 className="text-lg font-semibold text-white" key={430547}>AI Performance</h3>
          <div className="space-y-3" key={186520}>
            {accuracyData?.performance_by_sport &&
              Object.entries(accuracyData.performance_by_sport).map(
                ([sport, data]: [string, any]) => (
                  <div key={sport} className="p-3 bg-gray-800/40 rounded-lg" key={502805}>
                    <div className="flex justify-between items-center mb-2" key={88839}>
                      <span className="text-gray-300 capitalize" key={514389}>{sport}</span>
                      <span className="text-cyan-400 font-bold" key={102942}>
                        {(data.accuracy * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2" key={811414}>
                      <div;
                        className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${data.accuracy * 100}%` }}
                      / key={672858}>
                    </div>
                    <div className="text-xs text-gray-500 mt-1" key={777441}>
                      {data.games} games analyzed;
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>
      </div>

      {/* Autonomous Intelligence Status */}
      <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-6" key={116544}>
        <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2" key={859812}>
          <Brain className="w-5 h-5" / key={358560}>
          Autonomous Intelligence Status;
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
          <div className="text-center" key={120206}>
            <div className="text-2xl text-green-400 mb-2" key={69712}>✅</div>
            <div className="text-sm font-semibold" key={957731}>Background Processing</div>
            <div className="text-xs text-gray-400" key={588004}>All user tools enhanced</div>
          </div>
          <div className="text-center" key={120206}>
            <div className="text-2xl text-blue-400 mb-2" key={85230}>🔄</div>
            <div className="text-sm font-semibold" key={957731}>Real-time Analysis</div>
            <div className="text-xs text-gray-400" key={588004}>Continuous learning</div>
          </div>
          <div className="text-center" key={120206}>
            <div className="text-2xl text-purple-400 mb-2" key={876971}>🎯</div>
            <div className="text-sm font-semibold" key={957731}>Smart Predictions</div>
            <div className="text-xs text-gray-400" key={588004}>Optimized for profit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedIntelligenceHub;
