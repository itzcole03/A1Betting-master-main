import React from 'react.ts';
import type { Sport, PropType } from '@/types.ts';
import { motion, Variants } from 'framer-motion.ts';
import {
  FaFilter,
  FaChartBar,
  FaPercentage,
  FaMoneyBillWave,
  FaFire,
  FaHistory,
  FaTimes;
} from 'react-icons/fa.ts';
// import { useStore } from '@/store/useStore.ts';

const filterVariants: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const sportFilters: { id: Sport; label: string }[] = [
  { id: 'NBA', label: 'NBA' },
  { id: 'NFL', label: 'NFL' },
  { id: 'MLB', label: 'MLB' },
  { id: 'NHL', label: 'NHL' }
];

const propTypeFilters: { id: PropType; label: string }[] = [
  { id: 'POINTS', label: 'Points' },
  { id: 'REBOUNDS', label: 'Rebounds' },
  { id: 'ASSISTS', label: 'Assists' },
  { id: 'THREES', label: '3-Pointers' },
  { id: 'STEALS', label: 'Steals' },
  { id: 'BLOCKS', label: 'Blocks' }
];

const confidenceFilters = [
  { id: 'high', label: 'High Confidence (65%+)', icon: FaFire },
  { id: 'medium', label: 'Medium Confidence (55-65%)', icon: FaChartBar },
  { id: 'low', label: 'Low Confidence (<55%)', icon: FaPercentage }
];

const payoutFilters = [
  { id: 'high', label: 'High Payout (5x+)', icon: FaMoneyBillWave },
  { id: 'medium', label: 'Medium Payout (2-5x)', icon: FaMoneyBillWave },
  { id: 'low', label: 'Low Payout (<2x)', icon: FaMoneyBillWave }
];

export const FilterBar: React.FC = () = key={469077}> {
  // const { activeFilters, toggleFilter } = useStore();

  const isFilterActive = (filterId: string) => {
    // if (activeFilters) {
    //   return activeFilters.has(filterId);
    // }
    return false;
  };

  const FilterButton: React.FC<{
    id: string;
    label: string;
    icon?: React.ElementType;
  }> = ({ id, label, icon: Icon }) => (
    <motion.button;
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // onClick={() = key={788504}> toggleFilter(id)}
      className={`
        inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium;
        transition-colors duration-200;
        ${
          isFilterActive(id)
            ? 'bg-primary-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }
      `}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" / key={604463}>}
      {label}
    </motion.button>
  );

  return (
    <motion.div;
      variants={filterVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="glass-morphism rounded-xl p-6 mb-6 space-y-6"
     key={235073}>
      {/* Header */}
      <div className="flex items-center justify-between" key={96335}>
        <div className="flex items-center space-x-2" key={740830}>
          <FaFilter className="w-5 h-5 text-primary-500" / key={460445}>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white" key={867356}>
            Filters;
          </h2>
        </div>
        {/* activeFilters.size > 0 && (
          <button;
            // onClick={() = key={692259}> activeFilters.forEach(filter => toggleFilter(filter))}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center space-x-1"
          >
            <FaTimes className="w-4 h-4" / key={756871}>
            <span key={595076}>Clear All</span>
          </button>
        ) */}
      </div>

      {/* Sports */}
      <div className="space-y-2" key={725977}>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300" key={396373}>
          Sports;
        </h3>
        <div className="flex flex-wrap gap-2" key={835928}>
          {sportFilters.map(({ id, label }) => (
            <FilterButton key={id} id={id} label={label} / key={912157}>
          ))}
        </div>
      </div>

      {/* Prop Types */}
      <div className="space-y-2" key={725977}>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300" key={396373}>
          Prop Types;
        </h3>
        <div className="flex flex-wrap gap-2" key={835928}>
          {propTypeFilters.map(({ id, label }) => (
            <FilterButton key={id} id={id} label={label} / key={912157}>
          ))}
        </div>
      </div>

      {/* Confidence Levels */}
      <div className="space-y-2" key={725977}>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300" key={396373}>
          Confidence Level;
        </h3>
        <div className="flex flex-wrap gap-2" key={835928}>
          {confidenceFilters.map(({ id, label, icon }) => (
            <FilterButton key={id} id={`confidence_${id}`} label={label} icon={icon} / key={318105}>
          ))}
        </div>
      </div>

      {/* Payout Ranges */}
      <div className="space-y-2" key={725977}>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300" key={396373}>
          Potential Payout;
        </h3>
        <div className="flex flex-wrap gap-2" key={835928}>
          {payoutFilters.map(({ id, label, icon }) => (
            <FilterButton key={id} id={`payout_${id}`} label={label} icon={icon} / key={980329}>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {/* activeFilters.size > 0 && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700" key={440181}>
          <div className="flex items-center space-x-2" key={740830}>
            <FaHistory className="w-4 h-4 text-gray-500" / key={684213}>
            <span className="text-sm text-gray-600 dark:text-gray-400" key={10584}>
              {activeFilters.size} active filter{activeFilters.size !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      ) */}
    </motion.div>
  );
}; 