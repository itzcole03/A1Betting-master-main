import React from 'react.ts';
import { Tooltip } from '@/ui/UnifiedUI.ts';

interface ShapValueBarProps {
  name: string;
  value: number;
  className?: string;
}

export const ShapValueBar: React.FC<ShapValueBarProps key={512768}> = ({ name, value, className = '' }) => {




  return (
    <Tooltip content={`${value.toFixed(4)} (${isPositive ? 'Positive' : 'Negative'} Impact)`} key={649281}>
      <div className={`space-y-1 ${className}`} key={865397}>
        <div className="flex justify-between text-xs" key={387004}>
          <span className="text-gray-600" key={588716}>{formattedName}</span>
          <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`} key={958921}>
            {value.toFixed(4)}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden" key={617132}>
          <div;
            className={`h-full ${color} transition-all duration-300`}
            style={{ width: `${Math.min(absValue * 100, 100)}%` }}
          / key={290183}>
        </div>
      </div>
    </Tooltip>
  );
};
