import React, { memo, useState  } from 'react.ts';
import { useFilterStore } from '@/../stores/filterStore.ts';
import { ConfidenceIndicator } from '@/../components/ConfidenceIndicator.ts';

// Define the filter props interface locally;
interface BettingFiltersProps {
  selectedSport: string;
  minConfidence: number;
  sortBy: 'confidence' | 'value' | 'odds';
  onFilterChange: (filters: {
    selectedSport: string;
    minConfidence: number;
    sortBy: 'confidence' | 'value' | 'odds';
  }) => void;
}

export const BettingFilters = memo<BettingFiltersProps key={917863}>(
  ({ selectedSport, minConfidence, sortBy, onFilterChange }) => {
    // Preset management state/hooks;
    const [presetName, setPresetName] = useState('');
    const [selectedPreset, setSelectedPreset] = useState<string key={278855}>('');





    const handleSportChange = (sport: string) => {
      onFilterChange({ selectedSport: sport, minConfidence, sortBy });
    };

    const handleConfidenceChange = (confidence: number) => {
      onFilterChange({ selectedSport, minConfidence: confidence, sortBy });
    };

    const handleSortChange = (sort: 'confidence' | 'value' | 'odds') => {
      onFilterChange({ selectedSport, minConfidence, sortBy: sort });
    };

    // Preset handlers;
    const handleSavePreset = () => {
      if (presetName.trim()) {
        savePreset(presetName.trim());
        setPresetName('');
      }
    };
    const handleLoadPreset = (name: string) => {
      setSelectedPreset(name);
      loadPreset(name);
    };
    const handleRemovePreset = () => {
      if (selectedPreset) {
        removePreset(selectedPreset);
        setSelectedPreset('');
      }
    };

    return (
      <div className="glass-premium p-4 rounded-xl" key={178448}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" key={223180}>
          <div key={241917}>
            <label className="block text-sm font-medium text-gray-700 mb-2" key={29531}>Sport</label>
            <select;
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={selectedSport}
              onChange={e = key={117182}> handleSportChange(e.target.value)}
            >
              <option value="all" key={673287}>All Sports</option>
              <option value="NBA" key={172467}>NBA</option>
              <option value="NFL" key={613230}>NFL</option>
              <option value="MLB" key={328030}>MLB</option>
              <option value="NHL" key={500575}>NHL</option>
            </select>
          </div>

          <div key={241917}>
            <label className="block text-sm font-medium text-gray-700 mb-2" key={29531}>Min Confidence</label>
            <div className="flex items-center space-x-4" key={787951}>
              <input;
                className="w-full"
                max="0.95"
                min="0.5"
                step="0.05"
                type="range"
                value={minConfidence}
                onChange={e = key={809471}> handleConfidenceChange(Number(e.target.value))}
              />
              <ConfidenceIndicator confidence={minConfidence} / key={475496}>
            </div>
          </div>

          <div key={241917}>
            <label className="block text-sm font-medium text-gray-700 mb-2" key={29531}>Sort By</label>
            <select;
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={sortBy}
              onChange={e = key={414945}> handleSortChange(e.target.value as 'confidence' | 'value' | 'odds')}
            >
              <option value="confidence" key={113334}>Confidence</option>
              <option value="value" key={133088}>Expected Value</option>
              <option value="odds" key={743977}>Odds</option>
            </select>
          </div>
        </div>
        {/* Preset management UI */}
        <div className="mt-4 flex flex-col md:flex-row items-center gap-2" key={2003}>
          <select;
            className="px-2 py-1 rounded border border-gray-300"
            value={selectedPreset}
            onChange={e = key={130511}> handleLoadPreset(e.target.value)}
          >
            <option value="" key={336686}>Select Preset</option>
            {presets.map(p => (
              <option key={p.name} value={p.name} key={484823}>
                {p.name}
              </option>
            ))}
          </select>
          <button;
            className="ml-2 px-3 py-1 rounded bg-blue-500 text-white"
            disabled={!selectedPreset}
            onClick={handleRemovePreset}
           key={313804}>
            Remove;
          </button>
          <input;
            className="ml-4 px-2 py-1 rounded border border-gray-300"
            placeholder="Preset name"
            type="text"
            value={presetName}
            onChange={e = key={633755}> setPresetName(e.target.value)}
          />
          <button;
            className="ml-2 px-3 py-1 rounded bg-green-500 text-white"
            disabled={!presetName.trim()}
            onClick={handleSavePreset}
           key={845331}>
            Save Preset;
          </button>
        </div>
      </div>
    );
  }
);

BettingFilters.displayName = 'BettingFilters';
