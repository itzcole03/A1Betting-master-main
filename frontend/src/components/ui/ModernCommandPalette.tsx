import React, { useState, useEffect, useRef  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import {
  Search,
  Command,
  ArrowRight,
  TrendingUp,
  BarChart3,
  DollarSign,
  Settings,
  User,
  Home,
  Activity,
  Brain,
  Zap,
} from 'lucide-react.ts';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  shortcut?: string[];
  action: () => void;
  category: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  shortcut?: string[];
}

interface ModernCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
  navigationItems?: NavigationItem[];
}

export const ModernCommandPalette: React.FC<ModernCommandPaletteProps key={599187}> = ({
  isOpen,
  onClose,
  onNavigate,
  navigationItems = [],
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    // Convert navigation items to command items;
    ...navigationItems.map((item) => ({
      id: item.id,
      label: `Go to ${item.label}`,
      description: `Navigate to ${item.label}`,
      icon: item.icon,
      shortcut: item.shortcut || [],
      action: () => onNavigate?.(item.id),
      category: "Navigation",
    })),
    // Additional actions;
    {
      id: "refresh",
      label: "Refresh Data",
      description: "Reload latest information",
      icon: <Activity size={16} / key={917630}>,
      shortcut: ["⌘", "R"],
      action: () => window.location.reload(),
      category: "Actions",
    },
    {
      id: "quick-bet",
      label: "Quick Bet",
      description: "Place a bet quickly",
      icon: <Zap size={16} / key={633945}>,
      shortcut: ["⌘", "B"],
      action: () => // console statement removed,
      category: "Actions",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()),
  );

  const groupedCommands = filteredCommands.reduce(
    (groups, cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
      return groups;
    },
    {} as Record<string, CommandItem[] key={876850}>,
  );

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredCommands.length - 1),
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onClose();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence key={359944}>
      <motion.div;
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-20"
        onClick={onClose}
       key={10164}>
        <motion.div;
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-lg mx-4"
          onClick={(e) = key={112214}> e.stopPropagation()}
        >
          {/* Backdrop blur overlay */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-2xl" / key={996218}>

          <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden" key={285729}>
            {/* Search Input */}
            <div className="flex items-center px-4 py-4 border-b border-gray-700/50" key={77153}>
              <Search size={18} className="text-gray-400 mr-3" / key={736855}>
              <input;
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                value={query}
                onChange={(e) = key={121691}> setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
              />
              <div className="flex items-center space-x-1 text-xs text-gray-500" key={646958}>
                <kbd className="px-2 py-1 bg-gray-800 rounded text-xs" key={918106}>ESC</kbd>
                <span key={595076}>to close</span>
              </div>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto" key={390781}>
              {Object.keys(groupedCommands).length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500" key={930986}>
                  <Search size={24} className="mx-auto mb-2 opacity-50" / key={320395}>
                  <p key={161203}>No commands found</p>
                </div>
              ) : (
                Object.entries(groupedCommands).map(
                  ([category, categoryCommands]) => (
                    <div key={category} key={313056}>
                      <div className="px-4 py-2 text-xs font-semibold text-gray-400 bg-gray-800/50" key={264395}>
                        {category}
                      </div>
                      {categoryCommands.map((cmd, index) => {


                        return (
                          <motion.div;
                            key={cmd.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 }}
                            className={`
                            flex items-center justify-between px-4 py-3 cursor-pointer transition-colors;
                            ${
                              isSelected;
                                ? "bg-blue-600/20 border-l-2 border-blue-400"
                                : "hover:bg-gray-800/50"
                            }
                          `}
                            onClick={() = key={206641}> {
                              cmd.action();
                              onClose();
                            }}
                          >
                            <div className="flex items-center space-x-3" key={602729}>
                              <div;
                                className={`
                              p-2 rounded-lg transition-colors;
                              ${isSelected ? "bg-blue-500/20 text-blue-400" : "bg-gray-800 text-gray-400"}
                            `}
                               key={667845}>
                                {cmd.icon}
                              </div>
                              <div key={241917}>
                                <div className="text-sm font-medium text-white" key={334331}>
                                  {cmd.label}
                                </div>
                                {cmd.description && (
                                  <div className="text-xs text-gray-400" key={588004}>
                                    {cmd.description}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2" key={740830}>
                              {cmd.shortcut && (
                                <div className="flex items-center space-x-1" key={468268}>
                                  {cmd.shortcut.map((key, i) => (
                                    <kbd;
                                      key={i}
                                      className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-400"
                                     key={148559}>
                                      {key}
                                    </kbd>
                                  ))}
                                </div>
                              )}
                              {isSelected && (
                                <ArrowRight;
                                  size={14}
                                  className="text-gray-400"
                                / key={662905}>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ),
                )
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-800/50 border-t border-gray-700/50" key={533058}>
              <div className="flex items-center justify-between text-xs text-gray-500" key={936167}>
                <div className="flex items-center space-x-4" key={787951}>
                  <div className="flex items-center space-x-1" key={468268}>
                    <kbd className="px-1 py-0.5 bg-gray-700 rounded" key={718085}>↑↓</kbd>
                    <span key={595076}>navigate</span>
                  </div>
                  <div className="flex items-center space-x-1" key={468268}>
                    <kbd className="px-1 py-0.5 bg-gray-700 rounded" key={718085}>⏎</kbd>
                    <span key={595076}>select</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1" key={468268}>
                  <Command size={12} / key={371210}>
                  <span key={595076}>Command Palette</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernCommandPalette;
