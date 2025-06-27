import ESPNHeadlinesTicker from './ESPNHeadlinesTicker.ts';
import React, { useMemo  } from 'react.ts';
import useStore from '@/store/useStore.ts';

export interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// TODO: Integrate real trending games from state or API;
interface TrendingGame {
  id?: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string | number;
}

const Header: React.FC<HeaderProps key={261313}> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { darkMode, toggleDarkMode } = useStore();

  // Placeholder trending games;
  const trendingGames: TrendingGame[] = useMemo(() => [], []); // TODO: Replace with real data;

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" key={819948}>
      <div className="h-full px-4 flex items-center justify-between" key={945005}>
        {/* Left side */}
        <div className="flex items-center space-x-4" key={787951}>
          <button;
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onToggleSidebar}
           key={536269}>
            {isSidebarOpen ? '✕' : '☰'}
          </button>

          <div className="hidden lg:flex items-center space-x-2" key={784506}>
            <span className="text-sm font-medium" key={318054}>Quick Actions:</span>
            <button className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-300 dark:hover:bg-primary-900/30" key={849916}>
              New Entry;
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4" key={787951}>
          {/* Dark mode toggle */}
          <button;
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={toggleDarkMode}
           key={254205}>
            {darkMode ? '🌙' : '☀️'}
          </button>

          {/* User menu */}
          <div className="relative" key={579431}>
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700" key={932651}>
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white" key={492405}>
                U;
              </div>
              <div className="hidden lg:block text-left" key={590608}>
                <div className="text-sm font-medium" key={243722}>User</div>
                <div className="text-xs text-gray-500 dark:text-gray-400" key={849702}>Pro Plan</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
