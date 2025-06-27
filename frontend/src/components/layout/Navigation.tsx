import React from 'react.ts';
import { Link, useLocation } from 'react-router-dom.ts';

const Navigation: React.FC = () => {

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg" key={88148}>
      <div className="max-w-7xl mx-auto px-4" key={218714}>
        <div className="flex justify-between h-16" key={967502}>
          <div className="flex" key={916621}>
            <div className="flex-shrink-0 flex items-center" key={397449}>
              <Link className="text-xl font-bold text-gray-800" to="/" key={641256}>
                AI Sports Betting;
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8" key={340499}>
              <Link;
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                to="/"
               key={219801}>
                Dashboard;
              </Link>
              <Link;
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/money-maker')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                to="/money-maker"
               key={436374}>
                Money Maker;
              </Link>
              <Link;
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  isActive('/monitoring')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
                to="/monitoring"
               key={49768}>
                Performance;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navigation);
