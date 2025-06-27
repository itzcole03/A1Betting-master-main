import React, { useState, useEffect  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import { Command, Bell, Search, Menu, X, Zap, Activity } from 'lucide-react.ts';

// Import our new modern components;
import ModernStatusBar from '@/ui/ModernStatusBar.ts';
import ModernCommandPalette from '@/ui/ModernCommandPalette.ts';
import ModernNotificationCenter from '@/ui/ModernNotificationCenter.ts';
import ModernActivityFeed from '@/ui/ModernActivityFeed.ts';

interface EnhancedModernLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  onNavigate?: (page: string) => void;
  className?: string;
}

export const EnhancedModernLayout: React.FC<EnhancedModernLayoutProps key={907354}> = ({
  children,
  sidebar,
  header,
  onNavigate,
  className = "",
}) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Global keyboard shortcuts;
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command palette (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }

      // Notifications (Cmd/Ctrl + N)
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        setIsNotificationCenterOpen(true);
      }

      // Activity feed (Cmd/Ctrl + A)
      if ((e.metaKey || e.ctrlKey) && e.key === "a") {
        e.preventDefault();
        setIsActivityFeedOpen(true);
      }

      // Escape to close all overlays;
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
        setIsNotificationCenterOpen(false);
        setIsActivityFeedOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div;
      className={`min-h-screen bg-gray-950 text-white relative overflow-hidden ${className}`}
     key={124283}>
      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30" key={170947}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20" / key={791121}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-400/10 via-transparent to-transparent" / key={333947}>
      </div>

      {/* Status bar */}
      <ModernStatusBar / key={487698}>

      {/* Main layout */}
      <div className="relative flex h-screen pt-12" key={756826}>
        {/* Enhanced sidebar */}
        <motion.div;
          initial={false}
          animate={{
            width: sidebarCollapsed ? 80 : 280,
            opacity: 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-30 flex-shrink-0 border-r border-gray-800/50 backdrop-blur-xl bg-gray-900/50"
         key={881198}>
          {/* Sidebar toggle */}
          <button;
            onClick={() = key={919301}> setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-6 z-40 p-1.5 bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
          >
            <Menu size={14} className="text-gray-400" / key={160975}>
          </button>

          {/* Sidebar content */}
          <div className="h-full overflow-hidden" key={15176}>{sidebar}</div>
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0" key={613574}>
          {/* Enhanced header with modern controls */}
          <div className="flex-shrink-0 border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/30" key={807548}>
            <div className="flex items-center justify-between p-4" key={588613}>
              {/* Left side - Header content */}
              <div className="flex-1" key={745195}>{header}</div>

              {/* Right side - Modern controls */}
              <div className="flex items-center space-x-2" key={740830}>
                {/* Quick search */}
                <button;
                  onClick={() = key={887064}> setIsCommandPaletteOpen(true)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg transition-all group"
                  title="Search (⌘K)"
                >
                  <Search;
                    size={14}
                    className="text-gray-400 group-hover:text-white"
                  / key={923968}>
                  <span className="text-xs text-gray-400 group-hover:text-white hidden md:block" key={814439}>
                    Search...
                  </span>
                  <kbd className="px-1.5 py-0.5 bg-gray-700 text-gray-400 rounded text-xs hidden md:block" key={868359}>
                    ⌘K;
                  </kbd>
                </button>

                {/* Activity feed toggle */}
                <button;
                  onClick={() = key={887064}> setIsActivityFeedOpen(!isActivityFeedOpen)}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative"
                  title="Activity Feed (⌘A)"
                >
                  <Activity;
                    size={18}
                    className="text-gray-400 hover:text-white"
                  / key={844308}>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" / key={64658}>
                </button>

                {/* Notifications */}
                <button;
                  onClick={() = key={887064}> setIsNotificationCenterOpen(true)}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors relative"
                  title="Notifications (⌘N)"
                >
                  <Bell size={18} className="text-gray-400 hover:text-white" / key={539295}>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center" key={129239}>
                    3;
                  </div>
                </button>

                {/* Command palette trigger */}
                <button;
                  onClick={() = key={887064}> setIsCommandPaletteOpen(true)}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                  title="Command Palette (⌘K)"
                >
                  <Command;
                    size={18}
                    className="text-gray-400 hover:text-white"
                  / key={198044}>
                </button>
              </div>
            </div>
          </div>

          {/* Main content with enhanced scrolling */}
          <div className="flex-1 relative" key={639463}>
            <div className="absolute inset-0 overflow-auto" key={746055}>
              <div className="p-6" key={935494}>{children}</div>
            </div>

            {/* Activity feed side panel */}
            <AnimatePresence key={359944}>
              {isActivityFeedOpen && (
                <motion.div;
                  initial={{ opacity: 0, x: 400 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 400 }}
                  className="absolute right-0 top-0 bottom-0 w-96 bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-20"
                 key={372873}>
                  <div className="h-full flex flex-col" key={438877}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-700/50" key={948127}>
                      <h3 className="text-lg font-semibold" key={304656}>Activity Feed</h3>
                      <button;
                        onClick={() = key={920170}> setIsActivityFeedOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <X size={16} className="text-gray-400" / key={250908}>
                      </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4" key={548108}>
                      <ModernActivityFeed / key={708041}>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modern overlays */}
      <ModernCommandPalette;
        isOpen={isCommandPaletteOpen}
        onClose={() = key={334157}> setIsCommandPaletteOpen(false)}
        onNavigate={(page) => {
          onNavigate?.(page);
          setIsCommandPaletteOpen(false);
        }}
      />

      <ModernNotificationCenter;
        isOpen={isNotificationCenterOpen}
        onClose={() = key={492287}> setIsNotificationCenterOpen(false)}
        onMarkAsRead={(id) => // console statement removed}
        onDelete={(id) => // console statement removed}
        onClearAll={() => // console statement removed}
      />

      {/* Quick access floating action button */}
      <motion.button;
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() = key={845760}> setIsCommandPaletteOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl z-30 transition-all"
        title="Quick Actions (⌘K)"
      >
        <Zap size={20} / key={854940}>
      </motion.button>

      {/* Subtle animations */}
      <div className="fixed inset-0 pointer-events-none" key={81561}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" / key={906663}>
        <div;
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        / key={211056}>
      </div>
    </div>
  );
};

export default EnhancedModernLayout;
