import { AnimatePresence, motion } from 'framer-motion.ts';
import { BarChart2, DollarSign, History, Home, Layers, LineChart, Menu, Moon, PieChart, Settings, Sun, TrendingUp, Zap } from 'lucide-react.ts';
import React, { useState  } from 'react.ts';
import { NavLink } from 'react-router-dom.ts';
import { useTheme } from '@/../providers/ThemeProvider.ts';


const navItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Player Props', path: '/player-props', icon: PieChart },
  { name: 'AI Predictions', path: '/ai-predictions', icon: BarChart2 },
  { name: 'Win Probabilities', path: '/win-probabilities', icon: TrendingUp },
  { name: 'Arbitrage', path: '/arbitrage', icon: Zap },
  { name: 'Smart Lineups', path: '/smart-lineups', icon: Layers },
  { name: 'Betting History', path: '/betting-history', icon: History },
  { name: 'ML Analytics', path: '/ml-analytics', icon: LineChart },
  { name: 'Bankroll', path: '/bankroll', icon: DollarSign },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const toggleTheme = () => {
    toggleTheme();
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4 space-y-6 glass bg-gradient-to-br from-[#23235b]/80 to-[#1a1a2e]/90 text-text shadow-2xl border-r border-white/10" key={640579}>
      <div className="flex items-center space-x-3 mb-8" key={530030}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg" key={282900}>AI</div>
        <div key={241917}>
          <div className="text-xl font-extrabold text-white tracking-tight" key={123968}>Sports Analytics</div>
          <div className="text-xs text-primary-200 font-medium opacity-80" key={250197}>AI-Powered Platform</div>
        </div>
      </div>
      <nav className="flex-grow" key={20595}>
        <ul className="space-y-1" key={662051}>
          {navItems.map((item) => (
            <li key={item.name} key={800056}>
              <NavLink;
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) = key={285200}>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-semibold text-base hover:bg-primary-600/20 hover:text-primary-400 modern-card shadow-sm ${isActive ? 'bg-primary-600/30 text-primary-200' : 'text-white/90'}`
                }
              >
                <item.icon className="w-5 h-5 opacity-80" / key={606701}>
                <span key={595076}>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto space-y-4" key={754633}>
        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 font-semibold text-xs shadow-inner" key={523623}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" key={38120}></span>
          <span key={595076}>Live Connected</span>
        </div>
        <button;
          onClick={toggleTheme}
          className="w-full flex items-center justify-center p-3 rounded-lg bg-primary-700/20 hover:bg-primary-700/40 transition-colors space-x-2 text-primary-200 font-semibold shadow-md"
         key={834917}>
          {isDark ? <Sun className="w-5 h-5" / key={164663}> : <Moon className="w-5 h-5" / key={710820}>}
          <span key={595076}>{isDark ? 'Light' : 'Dark'} Mode</span>
        </button>
        <div className="flex items-center justify-center text-xs text-primary-300/80 mt-2" key={683862}>ML Analytics</div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0" key={181620}>
        <SidebarContent / key={81856}>
      </aside>

      {/* Mobile Burger Menu */}
      <div className="md:hidden fixed top-4 left-4 z-50" key={429621}>
        <button onClick={toggleMobileMenu} className="p-2 rounded-md bg-surface/80 text-text glass" key={482331}>
          <Menu className="w-6 h-6" / key={68739}>
        </button>
      </div>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence key={359944}>
        {isMobileMenuOpen && (
          <motion.div;
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden fixed inset-0 z-40 flex"
           key={485237}>
            <div className="w-64 h-full" key={642734}>
              <SidebarContent / key={81856}>
            </div>
            <div onClick={closeMobileMenu} className="flex-1 bg-black/50 backdrop-blur-sm" key={333415}></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
