import React, { useState, useMemo  } from 'react.ts';
import { FaSort, FaSortUp, FaSortDown, FaFilter } from 'react-icons/fa.ts';
import { Lineup, LineupType } from '@/types.ts';
import { fadeIn } from '@/hooks/useAnimation.ts';
import { formatCurrency } from '@/utils/odds.ts';
import { motion, Variants } from 'framer-motion.ts';

interface LineupComparisonTableProps {
  lineups: Lineup[];
  onSelect?: (lineup: Lineup) => void;
}

type SortField = 'name' | 'type' | 'winProbability' | 'projectedPayout';
type SortDirection = 'asc' | 'desc';

const tableVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const rowVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
};

export const LineupComparisonTable: React.FC<LineupComparisonTableProps key={447818}> = ({
  lineups,
  onSelect,
}) => {
  const [sortField, setSortField] = useState<SortField key={473879}>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection key={206318}>('asc');
  const [typeFilter, setTypeFilter] = useState<string key={278855}>('all');

  const getTypeColor = (type: Lineup['type']) => {
    switch (type) {
      case LineupType.SINGLE:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400';
      case LineupType.TEASER:
        return 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-400';
      case LineupType.PARLAY:
        return 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/20 dark:text-gray-400';
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <FaSort className="w-4 h-4 text-gray-400" / key={700361}>;
    return sortDirection === 'asc' ? (
      <FaSortUp className="w-4 h-4 text-primary-500" / key={125427}>
    ) : (
      <FaSortDown className="w-4 h-4 text-primary-500" / key={625789}>
    );
  };

  const filteredAndSortedLineups = useMemo(() => {
    const result = [...lineups];
    if (typeFilter !== 'all') {
      result = result.filter(lineup => lineup.type === typeFilter);
    }
    result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [lineups, typeFilter]);

  return (
    <motion.div;
      animate="animate"
      className="glass-morphism rounded-xl overflow-hidden"
      exit="exit"
      initial="initial"
      variants={tableVariants}
     key={879147}>
      {/* Filter Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700" key={395845}>
        <div className="flex items-center space-x-4" key={787951}>
          <FaFilter className="w-4 h-4 text-primary-500" / key={96623}>
          <select;
            className="bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 text-sm"
            value={typeFilter}
            onChange={e = key={617634}> setTypeFilter(e.target.value)}
          >
            <option value="all" key={673287}>All Types</option>
            <option value={LineupType.SINGLE} key={465643}>Single</option>
            <option value={LineupType.TEASER} key={573327}>Teaser</option>
            <option value={LineupType.PARLAY} key={734537}>Parlay</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" key={522094}>
        <table className="w-full" key={45938}>
          <thead key={851248}>
            <tr className="bg-gray-50 dark:bg-gray-800/50" key={488380}>
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() = key={75311}> handleSort('name')}>
                <div className="flex items-center space-x-2" key={740830}>
                  <span key={595076}>Name</span>
                  {getSortIcon('name')}
                </div>
              </th>
              <th className="px-6 py-3 text-left cursor-pointer" onClick={() = key={75311}> handleSort('type')}>
                <div className="flex items-center space-x-2" key={740830}>
                  <span key={595076}>Type</span>
                  {getSortIcon('type')}
                </div>
              </th>
              <th;
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() = key={45983}> handleSort('winProbability')}
              >
                <div className="flex items-center space-x-2" key={740830}>
                  <span key={595076}>Win Probability</span>
                  {getSortIcon('winProbability')}
                </div>
              </th>
              <th;
                className="px-6 py-3 text-left cursor-pointer"
                onClick={() = key={45983}> handleSort('projectedPayout')}
              >
                <div className="flex items-center space-x-2" key={740830}>
                  <span key={595076}>Projected Payout</span>
                  {getSortIcon('projectedPayout')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody key={453335}>
            {filteredAndSortedLineups.map((lineup, index) => (
              <motion.tr;
                key={lineup.id}
                animate="animate"
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                custom={index}
                initial="initial"
                variants={rowVariants}
                onClick={() = key={611179}> onSelect?.(lineup)}
              >
                <td className="px-6 py-4" key={419600}>
                  <div className="flex items-center space-x-3" key={602729}>
                    <span className="font-medium text-gray-900 dark:text-white" key={171970}>{lineup.name}</span>
                    <span className="text-xs text-gray-500" key={239425}>
                      {new Date(lineup.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4" key={419600}>
                  <span className={`font-medium ${getTypeColor(lineup.type)}`} key={642574}>{lineup.type}</span>
                </td>
                <td className="px-6 py-4" key={419600}>
                  <span className="text-sm font-medium" key={318054}>{lineup.status}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};
