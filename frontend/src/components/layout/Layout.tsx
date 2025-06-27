import React, { ReactNode, useState  } from 'react.ts';
import { EliteSportsHeader } from './EliteSportsHeader.ts';
import { AdvancedSidebar } from './AdvancedSidebar.ts';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // TODO: Replace with real data/context hooks;
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [isSidebarOpen] = useState(true); // Sidebar always open for desktop;
  // Mocked data for demo; replace with real hooks/context;






  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-blue-950" key={948458}>
      {/* Sidebar */}
      <div className="hidden md:block" key={73701}>
        <AdvancedSidebar;
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          connectedSources={connectedSources}
          dataQuality={dataQuality}
          state={state}
        / key={601118}>
      </div>
      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0" key={613574}>
        {/* Header */}
        <EliteSportsHeader;
          connectedSources={connectedSources}
          dataQuality={dataQuality}
          state={state}
          toggleDarkMode={toggleDarkMode}
          refreshData={refreshData}
          loading={loading}
        / key={785749}>
        {/* Main content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto" key={877563}>
          <div className="rounded-3xl bg-white/80 dark:bg-gray-900/80 shadow-xl p-6 md:p-10 min-h-[70vh]" key={711016}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
