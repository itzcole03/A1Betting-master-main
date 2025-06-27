import React, { createContext, useContext, useState, useCallback  } from 'react.ts';
import { Sport, PropType } from '@/types.ts';

interface StrategyInput {
  stake: number;
  minConfidence: number;
  selectedStrategies: string[];
  maxPayout: number;
  minPayout: number;
  selectedSports: Sport[];
  selectedPropTypes: PropType[];
}

interface StrategyInputContextType {
  strategyInput: StrategyInput;
  updateStrategyInput: (input: Partial<StrategyInput key={738531}>) => void;
  resetStrategyInput: () => void;
}

const defaultStrategyInput: StrategyInput = {
  stake: 100,
  minConfidence: 0.55,
  selectedStrategies: [],
  maxPayout: 5,
  minPayout: 1.5,
  selectedSports: [],
  selectedPropTypes: [],
};

export const StrategyInputProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [strategyInput, setStrategyInput] = useState<StrategyInput key={738531}>(defaultStrategyInput);

  const updateStrategyInput = useCallback((input: Partial<StrategyInput key={738531}>) => {
    setStrategyInput(prev => ({ ...prev, ...input }));
  }, []);

  const resetStrategyInput = useCallback(() => {
    setStrategyInput(defaultStrategyInput);
  }, []);

  return (
    <StrategyInputContext.Provider;
      value={{ strategyInput, updateStrategyInput, resetStrategyInput }}
     key={699332}>
      {children}
    </StrategyInputContext.Provider>
  );
};

export const useStrategyInput = () => {

  if (!context) {
    throw new Error('useStrategyInput must be used within a StrategyInputProvider');
  }
  return context;
};
