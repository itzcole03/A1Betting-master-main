import React from 'react.ts';

export const PerformanceModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6 backdrop-blur-sm" key={984392}>
      <div className="modern-card max-w-6xl w-full p-8 max-h-[90vh] overflow-y-auto" key={345593}>
        <div className="flex justify-between items-start mb-8" key={225490}>
          <h3 className="text-2xl font-bold" key={850417}>📊 Performance Analytics</h3>
          <button;
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            onClick={onClose}
           key={75357}>
            ×
          </button>
        </div>
        <div key={241917}>Performance content goes here</div>
      </div>
    </div>
  ) : null;

export const LineupComparisonModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-6 backdrop-blur-sm" key={266323}>
      <div className="modern-card max-w-7xl w-full p-8 text-gray-900 dark:text-white max-h-[90vh] overflow-y-auto" key={911065}>
        <div className="flex justify-between items-start mb-8" key={225490}>
          <h3 className="text-2xl font-bold" key={850417}>📊 Lineup Comparison</h3>
          <button;
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            onClick={onClose}
           key={75357}>
            ×
          </button>
        </div>
        <div key={241917}>Lineup comparison content goes here</div>
      </div>
    </div>
  ) : null;

export const EntryProgressModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-6 backdrop-blur-sm" key={266323}>
      <div className="modern-card max-w-4xl w-full p-8 text-gray-900 dark:text-white max-h-[90vh] overflow-y-auto" key={470356}>
        <div className="flex justify-between items-start mb-8" key={225490}>
          <h3 className="text-2xl font-bold" key={850417}>📊 Entry Progress</h3>
          <button;
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            onClick={onClose}
           key={75357}>
            ×
          </button>
        </div>
        <div key={241917}>Entry progress content goes here</div>
      </div>
    </div>
  ) : null;

export const PropDetailModal: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-6 backdrop-blur-sm" key={266323}>
      <div className="modern-card max-w-2xl w-full p-8 text-gray-900 dark:text-white max-h-[90vh] overflow-y-auto" key={578895}>
        <div className="flex justify-between items-start mb-8" key={225490}>
          <button;
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-light"
            onClick={onClose}
           key={726516}>
            ←
          </button>
        </div>
        <div key={241917}>Prop detail content goes here</div>
      </div>
    </div>
  ) : null;

export const InfoModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) =>
  open ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6 backdrop-blur-sm" key={984392}>
      <div className="modern-card max-w-md w-full p-8" key={110380}>
        <div className="flex justify-between items-start mb-6" key={759541}>
          <h3 className="text-xl font-bold" key={54291}>Information</h3>
          <button;
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            onClick={onClose}
           key={75357}>
            ×
          </button>
        </div>
        <div key={241917}>Info content goes here</div>
      </div>
    </div>
  ) : null;
