import React, { useState  } from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import { Search, X, TrendingUp, User, Calendar } from 'lucide-react.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps key={904539}> = ({
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      type: "game",
      title: "Lakers vs Warriors",
      subtitle: "NBA • Tonight 8:00 PM",
      icon: <Calendar className="w-4 h-4" / key={921199}>,
    },
    {
      type: "player",
      title: "LeBron James",
      subtitle: "Lakers • 27.5 Points O/U",
      icon: <User className="w-4 h-4" / key={490416}>,
    },
    {
      type: "prediction",
      title: "High Value Bets",
      subtitle: "5 opportunities found",
      icon: <TrendingUp className="w-4 h-4" / key={673347}>,
    },
  ]);

  const filteredResults = searchResults.filter(
    (result) =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence key={359944}>
      <motion.div;
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-20"
        onClick={onClose}
       key={294767}>
        <motion.div;
          initial={{ scale: 0.9, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          className="w-full max-w-2xl bg-slate-900 rounded-xl border border-slate-700 overflow-hidden shadow-2xl"
          onClick={(e) = key={618060}> e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-4 p-4 border-b border-slate-700" key={156554}>
            <Search className="w-5 h-5 text-blue-400" / key={915749}>
            <input;
              type="text"
              placeholder="Search games, players, predictions..."
              value={searchQuery}
              onChange={(e) = key={797224}> setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-lg"
              autoFocus;
            />
            <button;
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
             key={660844}>
              <X className="w-5 h-5 text-slate-400" / key={549421}>
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto" key={390781}>
            {filteredResults.length > 0 ? (
              <div className="p-2" key={386488}>
                {filteredResults.map((result, index) => (
                  <motion.div;
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
                    onClick={() = key={993949}> {
                      // Handle result click;
                      // console statement removed
                      onClose();
                    }}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500/20 rounded-lg text-blue-400" key={183030}>
                      {result.icon}
                    </div>
                    <div key={241917}>
                      <div className="text-white font-medium" key={579803}>
                        {result.title}
                      </div>
                      <div className="text-slate-400 text-sm" key={23511}>
                        {result.subtitle}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="p-8 text-center text-slate-400" key={139267}>
                <Search className="w-12 h-12 mx-auto mb-4 text-slate-600" / key={279384}>
                <p key={161203}>No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400" key={139267}>
                <Search className="w-12 h-12 mx-auto mb-4 text-slate-600" / key={279384}>
                <p key={161203}>Start typing to search...</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
