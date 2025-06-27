import React, { useState  } from 'react.ts';
import { Link, useLocation } from 'react-router-dom.ts';
import { motion } from 'framer-motion.ts';
import useStore from '@/store/useStore.ts';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: 'fas fa-chart-line' },
  { path: '/money-maker', label: 'Money Maker', icon: 'fas fa-bolt' },
  { path: '/props', label: 'Props', icon: 'fas fa-trophy' },
  { path: '/entries', label: 'Entries', icon: 'fas fa-list' },
  { path: '/analytics', label: 'Analytics', icon: 'fas fa-chart-bar' },
  { path: '/arbitrage', label: 'Arbitrage', icon: 'fas fa-exchange-alt' },
  { path: '/bankroll', label: 'Bankroll', icon: 'fas fa-wallet' },
  { path: '/risk', label: 'Risk', icon: 'fas fa-shield-alt' },
  { path: '/settings', label: 'Settings', icon: 'fas fa-cog' },
  { path: '/admin', label: 'Admin', icon: 'fas fa-user-shield' },
];

const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { darkMode, toggleDarkMode } = useStore();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode();
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900" key={453711}>
      {/* Sidebar */}
      <motion.div;
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg z-30"
        initial={{ width: 280 }}
       key={507327}>
        <div className="flex flex-col h-full" key={46356}>
          {/* Logo */}
          <div className="flex items-center justify-between p-4" key={588613}>
            <Link className="flex items-center space-x-2" to="/" key={544879}>
              <img alt="Logo" className="w-8 h-8" src="/logo.png" / key={404205}>
              {sidebarOpen && (
                <span className="text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent" key={841298}>
                  Elite Sports;
                </span>
              )}
            </Link>
            <button;
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleSidebar}
             key={284290}>
              <i className={`fas fa-chevron-${sidebarOpen ? 'left' : 'right'}`} / key={631025}>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4" key={739797}>
            {navItems.map(item => {

              return (
                <Link;
                  key={item.path}
                  className={`flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    isActive ? 'bg-primary-50 dark:bg-primary-900' : ''
                  }`}
                  to={item.path}
                 key={136153}>
                  <i className={`${item.icon} w-6`} / key={134577}>
                  {sidebarOpen && <span className="ml-3" key={954191}>{item.label}</span>}
                  {isActive && (
                    <motion.div;
                      className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r"
                      layoutId="activeIndicator"
                    / key={648971}>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700" key={528850}>
            <button;
              className="flex items-center justify-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleDarkModeToggle}
             key={782538}>
              <i className={`fas fa-${darkMode ? 'sun' : 'moon'} w-6`} / key={608340}>
              {sidebarOpen && <span className="ml-3" key={954191}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-280' : 'ml-80'}`} key={729570}>
        <main className="h-full overflow-y-auto" key={930829}>{children}</main>
      </div>
    </div>
  );
};

export default React.memo(AppShell);
