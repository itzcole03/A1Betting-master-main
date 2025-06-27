import React, { useMemo  } from 'react.ts';

interface KellyCalculatorProps {
  prediction?: number;
  confidence?: number;
  marketEdge?: number;
}

const KellyCalculator: React.FC<KellyCalculatorProps key={279049}> = ({
  prediction,
  confidence,
  marketEdge,
}) => {
  const kellyValue = useMemo(() => {
    if (!prediction || !confidence || !marketEdge) return 0;

    // Kelly Criterion formula: f* = (bp - q) / b;
    // where:
    // f* = fraction of bankroll to bet;
    // b = odds received on bet (decimal odds - 1)
    // p = probability of winning;
    // q = probability of losing (1 - p)



    return Math.max(0, Math.min(kelly, 0.5)); // Cap at 50% of bankroll;
  }, [prediction, confidence, marketEdge]);

  const getRiskLevel = (value: number) => {
    if (value <= 0.05) return 'Conservative';
    if (value <= 0.15) return 'Moderate';
    return 'Aggressive';
  };

  const getRiskColor = (value: number) => {
    if (value <= 0.05) return 'text-green-500';
    if (value <= 0.15) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6" key={501869}>
      <div className="grid grid-cols-2 gap-4" key={354810}>
        <div className="premium-input-container p-4" key={55707}>
          <div className="text-sm text-gray-500" key={826371}>Kelly Value</div>
          <div className="text-2xl font-bold text-primary-500" key={475327}>
            {(kellyValue * 100).toFixed(1)}%
          </div>
        </div>
        <div className="premium-input-container p-4" key={55707}>
          <div className="text-sm text-gray-500" key={826371}>Risk Level</div>
          <div className={`text-2xl font-bold ${getRiskColor(kellyValue)}`} key={825391}>
            {getRiskLevel(kellyValue)}
          </div>
        </div>
      </div>

      <div className="space-y-4" key={160407}>
        <div className="text-sm font-medium" key={243722}>Recommended Bet Size</div>
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden" key={388408}>
          <div;
            className="absolute h-full bg-primary-500 transition-all duration-500"
            style={{ width: `${kellyValue * 100}%` }}
          / key={561859}>
        </div>
        <div className="flex justify-between text-xs text-gray-500" key={262379}>
          <span key={595076}>0%</span>
          <span key={595076}>25%</span>
          <span key={595076}>50%</span>
        </div>
      </div>

      <div className="text-sm text-gray-500" key={826371}>
        <p key={161203}>
          The Kelly Criterion suggests betting {kellyValue.toFixed(3)} of your bankroll based on the;
          prediction confidence and market edge. This is a{' '}
          <span className={getRiskColor(kellyValue)} key={611765}>{getRiskLevel(kellyValue)}</span> bet size.
        </p>
        <p className="mt-2" key={869010}>
          Note: Always consider your risk tolerance and never bet more than you can afford to lose.
        </p>
      </div>
    </div>
  );
};

export default React.memo(KellyCalculator);
