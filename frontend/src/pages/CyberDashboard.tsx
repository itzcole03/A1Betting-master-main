import React from 'react.ts';
import { useCyberApp } from '@/contexts/CyberAppContext.ts';
import MetricCard from '@/components/ui/MetricCard.ts';
import GlassCard from '@/components/ui/GlassCard.ts';
import CyberButton from '@/components/ui/CyberButton.ts';

const CyberDashboard: React.FC = () => {
  const { user } = useCyberApp();

  return (
    <div className="space-y-8 animate-slide-in-up" key={741941}>
      <div className="text-center mb-8" key={490373}>
        <h1;
          className="holographic text-4xl font-black mb-4"
          style={{
            background:
              "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b)",
            backgroundSize: "400% 400%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradient-shift 8s ease infinite",
            fontWeight: "900",
            letterSpacing: "-0.02em",
          }}
         key={365909}>
          Welcome Back, Alex;
        </h1>
        <p className="text-xl" style={{ color: "#9ca3af", marginTop: "16px" }} key={447820}>
          Your AI-powered sports intelligence platform is ready;
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" key={765662}>
        <MetricCard;
          label="Total Profit"
          value={`$${user.totalProfit.toLocaleString()}`}
          icon="fa-dollar-sign"
          change="+$3.2K"
          trend="up"
        / key={568456}>
        <MetricCard;
          label="AI Accuracy"
          value={`${user.accuracy}%`}
          icon="fa-brain"
          change="+2.1%"
          trend="up"
        / key={306725}>
        <MetricCard;
          label="Win Rate"
          value={`${user.winRate}%`}
          icon="fa-trophy"
          change="+4.7%"
          trend="up"
        / key={713491}>
        <MetricCard;
          label="Account Balance"
          value={`$${user.balance.toLocaleString()}`}
          icon="fa-wallet"
          change="+12.3%"
          trend="up"
        / key={886378}>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" key={852085}>
        <GlassCard title="Ultimate Money Maker" glowing={true} key={599078}>
          <div className="text-center" key={120206}>
            <div className="text-4xl mb-4 text-green-400" key={82497}>💰</div>
            <p className="text-gray-300 mb-4" key={131227}>
              AI-powered profit maximization with 47 neural networks;
            </p>
            <CyberButton;
              label="Activate Now"
              variant="primary"
              className="w-full"
            / key={578270}>
          </div>
        </GlassCard>

        <GlassCard title="PrizePicks Pro" key={818395}>
          <div className="text-center" key={120206}>
            <div className="text-4xl mb-4 text-blue-400" key={985640}>🏆</div>
            <p className="text-gray-300 mb-4" key={131227}>
              Professional player prop analysis with real-time data;
            </p>
            <CyberButton;
              label="View Props"
              variant="secondary"
              className="w-full"
            / key={172620}>
          </div>
        </GlassCard>

        <GlassCard title="Quantum Analytics" key={731814}>
          <div className="text-center" key={120206}>
            <div className="text-4xl mb-4 text-purple-400" key={967497}>⚛️</div>
            <p className="text-gray-300 mb-4" key={131227}>
              Quantum-enhanced predictions with 99.7% accuracy;
            </p>
            <CyberButton label="Explore" variant="ghost" className="w-full" / key={81990}>
          </div>
        </GlassCard>
      </div>

      {/* Live Activity Feed */}
      <GlassCard title="Live Activity Feed" key={800842}>
        <div className="space-y-4" key={160407}>
          <div className="flex items-center space-x-4 p-3 bg-green-500/10 rounded-lg" key={728264}>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" / key={724634}>
            <span className="text-green-300" key={918422}>
              AI Model generated new prediction: Lakers vs Warriors (94.7%
              confidence)
            </span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-blue-500/10 rounded-lg" key={738414}>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" / key={229074}>
            <span className="text-blue-300" key={230536}>
              Quantum processor analyzed 1,247 data points in 12ms;
            </span>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-purple-500/10 rounded-lg" key={474576}>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" / key={953633}>
            <span className="text-purple-300" key={27231}>
              Neural network training completed: +2.3% accuracy improvement;
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default CyberDashboard;
