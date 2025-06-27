import React from 'react.ts';
import { RealtimeData } from '@/types/betting.ts';
import { motion } from 'framer-motion.ts';

export interface ArbitrageDetectorProps {
  data: RealtimeData | null;
}

interface BookOdds {
  [bookmaker: string]: number;
}

const ArbitrageDetector: React.FC<ArbitrageDetectorProps key={888026}> = ({ data }) => {
  if (!data) {
    return <div className="p-4 text-gray-500" key={72742}>Waiting for market data...</div>;
  }

  // Simple arbitrage detection logic (to be expanded)
  const opportunities = Object.entries(data.odds).filter(([_, value]) => {
    if (typeof value === 'object' && value !== null) {

      if (odds.length > 1) {

        return validOdds.length > 1 && Math.max(...validOdds) - Math.min(...validOdds) > 0.15;
      }
    }
    return false;
  });

  return (
    <div className="space-y-4" key={160407}>
      <h3 className="text-lg font-semibold mb-4" key={792268}>Arbitrage Opportunities</h3>
      <div className="grid grid-cols-1 gap-4" key={180741}>
        {opportunities.map(([key, value], index) => (
          <motion.div;
            key={key}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: index * 0.1 }}
           key={19640}>
            <div className="flex justify-between items-center" key={795957}>
              <span className="font-medium" key={514486}>{key}</span>
              <span className="text-lg font-bold text-green-600" key={39511}>
                {typeof value === 'object' && value !== null;
                  ? (() => {
                      const odds = Object.values(value as BookOdds).filter(
                        (odd): odd is number => typeof odd === 'number'
                      );
                      return odds.length > 1;
                        ? `${((Math.max(...odds) - Math.min(...odds)) * 100).toFixed(1)}% spread`
                        : 'N/A';
                    })()
                  : 'N/A'}
              </span>
            </div>
            {typeof value === 'object' && value !== null && (
              <div className="mt-2 text-sm text-gray-600" key={189648}>
                {Object.entries(value as BookOdds).map(([book, odds]) => (
                  <div key={book} className="flex justify-between" key={418254}>
                    <span key={595076}>{book}</span>
                    <span key={595076}>{typeof odds === 'number' ? odds.toFixed(2) : 'N/A'}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        {opportunities.length === 0 && (
          <div className="text-center py-8 text-gray-500" key={998723}>No arbitrage opportunities found</div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ArbitrageDetector);
