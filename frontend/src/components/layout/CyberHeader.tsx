import React from 'react.ts';
import { useCyberApp } from '@/contexts/CyberAppContext.ts';
import StatusIndicator from '@/ui/StatusIndicator.ts';

const CyberHeader: React.FC = () => {
  const { user, theme, setTheme } = useCyberApp();

  const toggleTheme = () => {

    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header;
      className="glass-card border-b border-white/10 sticky top-0 z-50"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
     key={242499}>
      <div className="max-w-7xl mx-auto px-6 py-4" key={684497}>
        <div className="flex justify-between items-center" key={795957}>
          <div className="flex items-center space-x-6" key={969313}>
            <div className="flex items-center space-x-3" key={602729}>
              <div className="relative float-element" key={507071}>
                <div className="absolute inset-0 bg-gradient-to-r from-electric-400 to-neon-blue rounded-xl blur-lg opacity-75" / key={746483}>
                <div className="relative w-10 h-10 bg-gradient-to-br from-electric-400 to-neon-blue rounded-xl flex items-center justify-center" key={930543}>
                  <i className="fas fa-brain text-black text-lg font-bold" / key={913077}>
                </div>
              </div>
              <div key={241917}>
                <div className="holographic text-xl font-black tracking-tight" key={739335}>
                  A1BETTING;
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest" key={817179}>
                  Quantum Intelligence;
                </div>
              </div>
            </div>
            <div className="hidden md:flex space-x-4" key={246592}>
              <StatusIndicator status="active" label="All Systems Online" / key={746895}>
              <StatusIndicator status="active" label="47 AI Models Active" / key={412704}>
            </div>
          </div>

          <div className="flex items-center space-x-6" key={969313}>
            <div className="hidden lg:flex items-center space-x-6 text-sm" key={534889}>
              <div className="text-center" key={120206}>
                <div className="text-xs text-gray-400 uppercase" key={669073}>Balance</div>
                <div className="font-bold text-green-400" key={989962}>
                  ${user.balance.toLocaleString()}
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-xs text-gray-400 uppercase" key={669073}>
                  AI Accuracy;
                </div>
                <div className="font-bold text-electric-400" key={48528}>
                  {user.accuracy}%
                </div>
              </div>
              <div className="text-center" key={120206}>
                <div className="text-xs text-gray-400 uppercase" key={669073}>Tier</div>
                <div className="font-bold text-purple-400" key={763551}>{user.tier}</div>
              </div>
            </div>

            <button;
              onClick={toggleTheme}
              className="p-3 glass-card rounded-xl hover:shadow-neon transition-all duration-300"
             key={168260}>
              <i;
                className={`fas ${theme === "light" ? "fa-moon" : "fa-sun"} text-electric-400`}
              / key={391472}>
            </button>

            <div className="flex items-center space-x-3" key={602729}>
              <div className="relative" key={579431}>
                <div className="absolute inset-0 bg-electric-400 rounded-full blur-sm opacity-50" / key={376507}>
                <img;
                  src="https://ui-avatars.com/api/?name=Alex+Chen&background=000&color=00ff88&bold=true"
                  alt="Profile"
                  className="relative w-9 h-9 rounded-full border-2 border-electric-400"
                / key={228033}>
              </div>
              <div className="hidden md:block" key={73701}>
                <div className="font-semibold text-white text-sm" key={25409}>
                  {user.name}
                </div>
                <div className="text-xs text-gray-400" key={588004}>{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CyberHeader;
