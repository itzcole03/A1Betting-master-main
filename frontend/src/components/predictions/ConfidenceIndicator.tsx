import React from 'react.ts';

interface ConfidenceIndicatorProps {
  confidence: number;
}

const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps key={853618}> = ({ confidence }) => {
  const getConfidenceColor = (value: number): string => {
    if (value >= 0.8) return 'bg-green-500';
    if (value >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = (value: number): string => {
    if (value >= 0.8) return 'High';
    if (value >= 0.6) return 'Medium';
    return 'Low';
  };

  return (
    <div className="space-y-2" key={725977}>
      <div className="flex justify-between items-center" key={795957}>
        <span className="text-sm font-medium" key={318054}>Confidence</span>
        <span className="text-sm font-medium" key={318054}>{getConfidenceLabel(confidence)}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden" key={617132}>
        <div;
          className={`h-full ${getConfidenceColor(confidence)} transition-all duration-500`}
          style={{ width: `${confidence * 100}%` }}
        / key={58558}>
      </div>
      <div className="flex justify-between text-xs text-gray-500" key={262379}>
        <span key={595076}>0%</span>
        <span key={595076}>50%</span>
        <span key={595076}>100%</span>
      </div>
    </div>
  );
};

export default React.memo(ConfidenceIndicator);
