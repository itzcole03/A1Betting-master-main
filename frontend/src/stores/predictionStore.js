import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export const usePredictionStore = create()(devtools((set, get) => ({
    predictionsByEvent: {},
    updatePrediction: (eventId, data) => {
        set(state => ({
            predictionsByEvent: {
                ...state.predictionsByEvent,
                [eventId]: data,
            },
        }));
    },
    getPredictionForEvent: (eventId) => {
        return get().predictionsByEvent[eventId];
    },
    getLatestPredictions: () => {

        return Object.values(predictions).sort((a, b) => {


            return tb - ta;
        });
    },
}), { name: 'prediction-store' }));
