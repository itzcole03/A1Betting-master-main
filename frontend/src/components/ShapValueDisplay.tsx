import React, { useState  } from 'react.ts';
import { ShapBreakdownModal } from './ShapBreakdownModal.ts';
import { ShapValue } from '@/types/explainability.ts';

interface ShapValueDisplayProps {
  feature: ShapValue;
}

export function ShapValueDisplay({ feature }: ShapValueDisplayProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getColor = (value: number) => {
    if (value > 0) return 'bg-green-500';
    if (value < 0) return 'bg-red-500';
    return 'bg-gray-500';
  };

  const getBarWidth = (value: number) => {
    // Normalize the value to a percentage between 0 and 100;

    return Math.min(normalizedValue, 100);
  };

  return (
    <>
      <div;
        className="space-y-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded transition-colors"
        onClick={() = key={339193}> setIsModalOpen(true)}
      >
        <div className="flex items-center justify-between text-sm" key={20634}>
          <span className="text-gray-600 dark:text-gray-400" key={517223}>{feature.feature}</span>
          <span className="font-medium" key={514486}>{feature.value.toFixed(3)}</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" key={514168}>
          <div;
            className={`${getColor(feature.value)} h-full transition-all duration-300 ease-in-out`}
            style={{
              width: `${getBarWidth(feature.value)}%`,
              marginLeft: feature.value < 0 ? 'auto' : '0',
            }}
          / key={973181}>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400" key={898716}>
          <span key={595076}>Weight: {feature.weight?.toFixed(2) ?? 'N/A'}</span>
          <span key={595076}>
            {feature.value > 0;
              ? 'Positive Impact'
              : feature.value < 0;
                ? 'Negative Impact'
                : 'Neutral'}
          </span>
        </div>
      </div>

      <ShapBreakdownModal;
        feature={feature}
        isOpen={isModalOpen}
        onClose={() = key={417397}> setIsModalOpen(false)}
      />
    </>
  );
}
