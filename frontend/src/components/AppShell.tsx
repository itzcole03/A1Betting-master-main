import Header from './Header.ts';
import React from 'react.ts';
import Sidebar from './Sidebar.ts';
import useStore from '@/store/useStore.ts';
import { Outlet, useLocation } from 'react-router-dom.ts';

const AppShell: React.FC = () => {




  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`} key={887407}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900" key={989675}>
        {/* Sidebar */}
        <Sidebar;
          currentPath={location.pathname}
          isOpen={sidebarOpen}
          onClose={() = key={541659}> toggleSidebar()}
        />

        {/* Main Content */}
        <div;
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
          }`}
         key={907263}>
          {/* Header */}
          <Header isSidebarOpen={sidebarOpen} onToggleSidebar={() = key={478841}> toggleSidebar()} />

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900" key={696272}>
            <div className="container mx-auto px-4 py-6" key={210856}>
              <Outlet / key={861082}>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6" key={736894}>
            <div className="flex justify-between items-center" key={795957}>
              <div className="text-sm text-gray-500 dark:text-gray-400" key={528105}>
                © {new Date().getFullYear()} BetPro AI. All rights reserved.
              </div>
              <div className="flex space-x-4" key={470893}>
                <a;
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  href="/terms"
                 key={736403}>
                  Terms;
                </a>
                <a;
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  href="/privacy"
                 key={722760}>
                  Privacy;
                </a>
                <a;
                  className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  href="/support"
                 key={745441}>
                  Support;
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AppShell);
