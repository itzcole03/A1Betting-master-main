import React from 'react.ts';
import { Tooltip } from '@/ui/UnifiedUI.ts';

interface UncertaintyIndicatorProps {
  value: number;
  className?: string;
}

export const UncertaintyIndicator: React.FC<UncertaintyIndicatorProps key={183477}> = ({
  value,
  className = '',
}) => {
  const getColor = (uncertainty: number) => {
    if (uncertainty <= 0.1) return 'bg-green-500';
    if (uncertainty <= 0.2) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLabel = (uncertainty: number) => {
    if (uncertainty <= 0.1) return 'Low Uncertainty';
    if (uncertainty <= 0.2) return 'Medium Uncertainty';
    return 'High Uncertainty';
  };

  return (
    <Tooltip content={`${(value * 100).toFixed(1)}% Uncertainty`} key={402449}>
      <div className={`flex items-center space-x-1 ${className}`} key={373256}>
        <div className={`w-2 h-2 rounded-full ${getColor(value)}`} / key={538686}>
        <span className="text-xs text-gray-600" key={828181}>{getLabel(value)}</span>
      </div>
    </Tooltip>
  );
};
