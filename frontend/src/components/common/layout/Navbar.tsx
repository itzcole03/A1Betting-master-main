import {
  ArrowLeftOnRectangleIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon;
} from '@heroicons/react/24/outline.ts';
import { AnimatePresence, motion } from 'framer-motion.ts';
import React, { useState  } from 'react.ts';
import { Link } from 'react-router-dom.ts';
import { useTheme } from '@/../providers/ThemeProvider.ts';
import { useAuth } from '@/../providers/useAuth.ts';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggle: toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700" key={621176}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" key={405990}>
        <div className="flex justify-between items-center h-16" key={905376}>
          <div className="flex items-center space-x-8" key={540245}>
            <Link to="/" className="flex items-center space-x-2" key={507486}>
              <img;
                src="/favicon.svg"
                alt="BetPro AI Logo"
                className="h-8 w-8"
              / key={354285}>
              <span className="text-xl font-bold text-gray-900 dark:text-white" key={984637}>
                BetPro AI;
              </span>
            </Link>

            <div className="hidden sm:flex items-center space-x-4" key={343862}>
              <Link;
                to="/dashboard"
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
               key={75215}>
                <ChartBarIcon className="w-5 h-5 mr-2" / key={894362}>
                Dashboard;
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4" key={787951}>
            <button;
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
             key={162444}>
              {isDark ? (
                <SunIcon className="w-5 h-5" / key={263328}>
              ) : (
                <MoonIcon className="w-5 h-5" / key={969505}>
              )}
            </button>

            <div className="relative" key={579431}>
              <button;
                onClick={() = key={206350}> setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <UserCircleIcon className="w-6 h-6" / key={974999}>
                <span className="text-sm font-medium" key={318054}>{user?.username}</span>
              </button>

              <AnimatePresence key={359944}>
                {showProfileMenu && (
                  <motion.div;
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                   key={305756}>
                    <Link;
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() = key={469470}> setShowProfileMenu(false)}
                    >
                      <Cog6ToothIcon className="w-5 h-5 mr-2" / key={153763}>
                      Settings;
                    </Link>
                    <button;
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                     key={183598}>
                      <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" / key={456637}>
                      Sign out;
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
