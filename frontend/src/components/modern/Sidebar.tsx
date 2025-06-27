import React from 'react.ts';
import { Link } from 'react-router-dom.ts';
import {
  HomeIcon,
  CurrencyDollarIcon,
  TableCellsIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  BanknotesIcon,
  ScaleIcon,
  CogIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline.ts';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className: string }>;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/', icon: HomeIcon },
  { name: 'Money Maker', path: '/money-maker', icon: CurrencyDollarIcon },
  { name: 'Props', path: '/props', icon: TableCellsIcon },
  { name: 'Analytics', path: '/analytics', icon: ChartBarIcon },
  { name: 'Arbitrage', path: '/arbitrage', icon: ArrowTrendingUpIcon },
  { name: 'Bankroll', path: '/bankroll', icon: BanknotesIcon },
  { name: 'Risk Manager', path: '/risk', icon: ScaleIcon },
  { name: 'Settings', path: '/settings', icon: CogIcon },
  { name: 'Admin', path: '/admin', icon: ShieldCheckIcon },
];

const Sidebar: React.FC<SidebarProps key={35290}> = ({ isOpen, onClose, currentPath }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={onClose} / key={49470}>
      )}

      {/* Sidebar */}
      <aside;
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
       key={890969}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 bg-indigo-600" key={742422}>
          <Link className="flex items-center space-x-3" to="/" key={821873}>
            <span className="text-2xl font-bold text-white" key={942482}>BetPro AI</span>
          </Link>
          <button className="p-1 text-white hover:text-gray-200 lg:hidden" onClick={onClose} key={117094}>
            <span className="sr-only" key={658352}>Close sidebar</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" key={872341}>
              <path;
                d="M6 18L18 6M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              / key={278359}>
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto" key={251961}>
          {navItems.map(item => {

            return (
              <Link;
                key={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  isActive;
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                to={item.path}
               key={458166}>
                <item.icon;
                  className={`w-5 h-5 mr-3 ${
                    isActive;
                      ? 'text-indigo-600 dark:text-indigo-200'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                / key={235525}>
                <span key={595076}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700" key={486268}>
          <div className="flex-shrink-0" key={11962}>
            <img;
              alt="User avatar"
              className="w-8 h-8 rounded-full"
              src="https://ui-avatars.com/api/?name=User"
            / key={966909}>
          </div>
          <div className="ml-3" key={916518}>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200" key={178630}>User Name</p>
            <p className="text-xs text-gray-500 dark:text-gray-400" key={941453}>Pro Member</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default React.memo(Sidebar);
