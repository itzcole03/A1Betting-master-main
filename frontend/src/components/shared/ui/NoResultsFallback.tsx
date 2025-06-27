import React from 'react.ts';
import { FaFilter, FaSearch } from 'react-icons/fa.ts';

export const NoResultsFallback: React.FC = () => {
  return (
    <div className="text-center py-12 px-4" key={251950}>
      <div className="flex justify-center mb-4" key={367379}>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full" key={387807}>
          <FaFilter className="w-8 h-8 text-gray-400" / key={911326}>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" key={654265}>No Results Found</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6" key={966769}>
        Try adjusting your filters to see more predictions;
      </p>
      <div className="flex justify-center space-x-4" key={320982}>
        <button;
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          onClick={() = key={514711}> window.location.reload()}
        >
          <FaSearch className="w-4 h-4 mr-2" / key={633301}>
          Refresh Predictions;
        </button>
      </div>
    </div>
  );
};
