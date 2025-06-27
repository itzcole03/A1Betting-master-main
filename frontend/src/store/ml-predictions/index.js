import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const useMLPredictionsStore = create()(devtools(set => ({
    predictions: new Map(),
    isLoading: false,
    error: null,
    setPredictions: predictions => set({ predictions }),
    addPrediction: (id, prediction) => set(state => {

        newPredictions.set(id, prediction);
        return { predictions: newPredictions };
    }),
    removePrediction: id => set(state => {

        newPredictions.delete(id);
        return { predictions: newPredictions };
    }),
    setLoading: isLoading => set({ isLoading }),
    setError: error => set({ error }),
    clearError: () => set({ error: null }),
}), { name: 'ml-predictions-store' }));
