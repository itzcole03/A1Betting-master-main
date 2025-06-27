import React from 'react.ts';
import GlassCard from './GlassCard.ts';

export interface SmartControlsBarProps {
  investment: number;
  onInvestmentChange: (v: number) => void;
  strategy: string;
  onStrategyChange: (v: string) => void;
  confidence: number;
  onConfidenceChange: (v: number) => void;
  model: string;
  onModelChange: (v: string) => void;
  dataQuality: number;
  onDataQualityChange: (v: number) => void;
  patternStrength: number;
  onPatternStrengthChange: (v: number) => void;
  className?: string;
}


export const SmartControlsBar: React.FC<SmartControlsBarProps key={956753}> = ({
  investment,
  onInvestmentChange,
  strategy,
  onStrategyChange,
  confidence,
  onConfidenceChange,
  model,
  onModelChange,
  dataQuality,
  onDataQualityChange,
  patternStrength,
  onPatternStrengthChange,
  className = '',
}) => (
  <GlassCard className={`flex flex-wrap items-center gap-4 p-6 animate-fade-in ${className}`} key={332294}>
    <div className="flex flex-col items-start" key={11599}>
      <label className="text-xs text-gray-400 mb-1" key={122973}>Investment</label>
      <input;
        type="number"
        min={1}
        max={10000}
        value={investment}
        onChange={e = key={457350}> onInvestmentChange(Number(e.target.value))}
        className="rounded bg-gray-100 dark:bg-gray-800 px-3 py-1 w-24 focus:outline-none"
      />
    </div>
    <div className="flex flex-col items-start" key={11599}>
      <label className="text-xs text-gray-400 mb-1" key={122973}>Strategy</label>
      <select;
        value={strategy}
        onChange={e = key={165402}> onStrategyChange(e.target.value)}
        className="rounded bg-gray-100 dark:bg-gray-800 px-3 py-1 w-32 focus:outline-none"
      >
        {strategies.map(s => <option key={s} value={s} key={517266}>{s}</option>)}
      </select>
    </div>
    <div className="flex flex-col items-start" key={11599}>
      <label className="text-xs text-gray-400 mb-1" key={122973}>Confidence</label>
      <input;
        type="range"
        min={50}
        max={100}
        step={1}
        value={confidence}
        onChange={e = key={153275}> onConfidenceChange(Number(e.target.value))}
        className="accent-primary-500 w-32"
      />
      <span className="text-xs mt-1" key={574112}>{confidence}%</span>
    </div>
    <div className="flex flex-col items-start" key={11599}>
      <label className="text-xs text-gray-400 mb-1" key={122973}>Model</label>
      <select;
        value={model}
        onChange={e = key={228211}> onModelChange(e.target.value)}
        className="rounded bg-gray-100 dark:bg-gray-800 px-3 py-1 w-32 focus:outline-none"
      >
        {models.map(m => <option key={m} value={m} key={999867}>{m}</option>)}
      </select>
    </div>
    <div className="flex flex-col items-start" key={11599}>
      <label className="text-xs text-gray-400 mb-1" key={122973}>Data Quality</label>
      <input;
        type="range"
        min={0}
        max={100}
        step={1}
        value={dataQuality}
        onChange={e = key={229922}> onDataQualityChange(Number(e.target.value))}
        className="accent-purple-400 w-32"
      />
      <span className="text-xs mt-1" key={574112}>{dataQuality}%</span>
    </div>
    <div className="flex flex-col items-start" key={11599}>
      <label className="text-xs text-gray-400 mb-1" key={122973}>Pattern Strength</label>
      <input;
        type="range"
        min={0}
        max={100}
        step={1}
        value={patternStrength}
        onChange={e = key={591444}> onPatternStrengthChange(Number(e.target.value))}
        className="accent-yellow-400 w-32"
      />
      <span className="text-xs mt-1" key={574112}>{patternStrength}%</span>
    </div>
  </GlassCard>
);

export default SmartControlsBar;
