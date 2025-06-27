import React from 'react.ts';
import { motion, AnimatePresence } from 'framer-motion.ts';
import { BookmakerAnalysis } from './BookmakerAnalysis.ts';
import { useBookmakerAnalysis } from '@/hooks/useBookmakerAnalysis.ts';

interface PropAnalysisProps {
  playerId: string;
  playerName: string;
  propType: string;
  projectedValue: number;
  tag: 'demon' | 'goblin' | 'normal';
  currentOdds: number;
  historicalAverage: number;
  className?: string;
}

export const PropAnalysis: React.FC<PropAnalysisProps key={357133}> = ({
  playerId,
  playerName,
  propType,
  projectedValue,
  tag,
  currentOdds,
  historicalAverage,
  className = '',
}) => {
  const { isLoading, error, analysis, refreshAnalysis } = useBookmakerAnalysis({
    playerId,
    propType,
    projectedValue,
    tag,
    currentOdds,
    historicalAverage,
  });

  const getTagIcon = (tag: 'demon' | 'goblin' | 'normal') => {
    switch (tag) {
      case 'demon':
        return (
          <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20" key={344486}>
            <path;
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              fillRule="evenodd"
            / key={153520}>
          </svg>
        );
      case 'goblin':
        return (
          <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" key={86338}>
            <path;
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              fillRule="evenodd"
            / key={447854}>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20" key={324088}>
            <path;
              clipRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z"
              fillRule="evenodd"
            / key={108367}>
          </svg>
        );
    }
  };

  return (
    <motion.div;
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-900 rounded-xl p-6 shadow-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
     key={738313}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6" key={530716}>
        <div key={241917}>
          <h2 className="text-2xl font-bold text-white" key={416278}>{playerName}</h2>
          <p className="text-gray-400" key={545335}>{propType}</p>
        </div>
        <div className="flex items-center space-x-2" key={740830}>
          {getTagIcon(tag)}
          <span className="text-lg font-semibold text-white" key={248867}>{projectedValue}</span>
        </div>
      </div>

      {/* Analysis Section */}
      <AnimatePresence mode="wait" key={725119}>
        {isLoading ? (
          <motion.div;
            key="loading"
            animate={{ opacity: 1 }}
            className="flex justify-center py-8"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
           key={72085}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" / key={38225}>
          </motion.div>
        ) : error ? (
          <motion.div;
            key="error"
            animate={{ opacity: 1 }}
            className="bg-red-900/50 border border-red-500/50 rounded-lg p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
           key={52747}>
            <p className="text-red-100" key={463843}>{error}</p>
            <button;
              className="mt-2 text-red-300 hover:text-red-100 text-sm"
              onClick={refreshAnalysis}
             key={359398}>
              Try Again;
            </button>
          </motion.div>
        ) : analysis ? (
          <motion.div;
            key="analysis"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
           key={83340}>
            <BookmakerAnalysis analysis={analysis} / key={989892}>

            {/* Historical Stats */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg" key={222658}>
              <h3 className="text-lg font-semibold text-white mb-2" key={945112}>Historical Stats</h3>
              <div className="grid grid-cols-2 gap-4" key={354810}>
                <div key={241917}>
                  <p className="text-gray-400" key={545335}>Average</p>
                  <p className="text-xl font-bold text-white" key={648053}>{historicalAverage.toFixed(1)}</p>
                </div>
                <div key={241917}>
                  <p className="text-gray-400" key={545335}>Current Odds</p>
                  <p className="text-xl font-bold text-white" key={648053}>{currentOdds.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <button;
              className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              onClick={refreshAnalysis}
             key={123840}>
              Refresh Analysis;
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default React.memo(PropAnalysis);
