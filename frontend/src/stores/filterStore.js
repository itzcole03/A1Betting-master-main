import { create } from 'zustand';

function getPresetsFromStorage() {
    try {

        return raw ? JSON.parse(raw) : [];
    }
    catch {
        return [];
    }
}
function savePresetsToStorage(presets) {
    window.localStorage.setItem(FILTER_PRESETS_KEY, JSON.stringify(presets));
}
export const useFilterStore = create(set => ({
    activeFilters: new Set(),
    riskProfile: 'balanced',
    setRiskProfile: profile => set({ riskProfile: profile }),
    stakeSizing: 5,
    setStakeSizing: value => set({ stakeSizing: value }),
    model: 'default',
    setModel: model => set({ model }),
    confidenceThreshold: 0,
    setConfidenceThreshold: value => set({ confidenceThreshold: value }),
    toggleFilter: (filterId) => set(state => {

        if (newFilters.has(filterId)) {
            newFilters.delete(filterId);
        }
        else {
            newFilters.add(filterId);
        }
        return { activeFilters: newFilters };
    }),
    clearFilters: () => set({ activeFilters: new Set() }),
    savePreset: (name) => set(state => {

        const newPreset = {
            name,
            filters: {
                activeFilters: Array.from(state.activeFilters),
                riskProfile: state.riskProfile,
                stakeSizing: state.stakeSizing,
                model: state.model,
                confidenceThreshold: state.confidenceThreshold,
            },
        };

        savePresetsToStorage(updated);
        return {};
    }),
    loadPreset: (name) => set(state => {


        if (preset) {
            return {
                activeFilters: new Set(preset.filters.activeFilters),
                riskProfile: preset.filters.riskProfile,
                stakeSizing: preset.filters.stakeSizing,
                model: preset.filters.model,
                confidenceThreshold: preset.filters.confidenceThreshold,
            };
        }
        return {};
    }),
    removePreset: (name) => set(() => {

        savePresetsToStorage(presets);
        return {};
    }),
    listPresets: () => getPresetsFromStorage(),
}));
