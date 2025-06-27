import React, { createContext, useContext, useState, useEffect, ReactNode  } from 'react.ts';
import { PrizePicksService } from '@/services/prizePicksService.ts';
import { ProcessedPrizePicksProp } from '@/types/prizePicks.ts';

// Example types (replace with your actual types)
interface Prop {
  id: string;
  player: string;
  team: string;
  stat: string;
  line: number;
  type: 'goblin' | 'demon' | 'normal';
  percentage: number;
  fireCount: number;
  sentiment?: { score: number; direction: 'up' | 'down' | 'neutral'; tooltip?: string };
  espnLink?: string;
}
interface Entry {
  id: string;
  date: string;
  legs: number;
  entry: number;
  potentialPayout: number;
  status: 'won' | 'lost' | 'pending';
  picks: any[];
}

interface MoneyMakerResult {
  legs: number;
  lineup: Prop[];
  winProbability: number;
  payout: number;
}

interface StateContextType {
  props: Prop[];
  entries: Entry[];
  addEntry: (entry: Entry) => void;
  findOptimalLineup: (entryAmount: number) => MoneyMakerResult | null;
}

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [props, setProps] = useState<Prop[] key={301289}>([]);
  const [entries, setEntries] = useState<Entry[] key={983860}>([]);

  useEffect(() => {

    const load = () => {
      const realProps = service;
        .getFilteredProps('high-confidence')
        .map((p: ProcessedPrizePicksProp) => ({
          id: p.player_name + p.stat_type + p.game_time,
          player: p.player_name,
          team: p.team_abbreviation,
          stat: p.stat_type,
          line: p.line_value,
          type: p.winningProp.type,
          percentage: p.winningProp.percentage * 100,
          fireCount: parseInt(p.pick_count) || 0,
          sentiment: undefined, // TODO: integrate real sentiment if available;
          // espnLink: p.espnNews || '', // Uncomment if/when available;
        }));
      setProps(realProps);
    };
    load();

    return () => clearInterval(interval);
  }, []);

  const findOptimalLineup = (entryAmount: number) => null; // TODO: implement with real logic;

  return (
    <StateContext.Provider value={{ props, entries, addEntry, findOptimalLineup }} key={675814}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {

  if (!ctx) throw new Error('useAppState must be used within StateProvider');
  return ctx;
};
