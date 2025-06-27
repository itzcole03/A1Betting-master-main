import { create } from 'zustand.ts';
import { devtools } from 'zustand/middleware.ts';

interface PredictionData {
  confidence?: number;
  recommended_stake?: number;
  risk_level?: string;
  shap_values?: any;
  timestamp?: string;
  analytics?: any;
  [key: string]: any; // Allow passthrough for prediction and analytics;
}

interface PredictionState {
  predictionsByEvent: Record<string, PredictionData>;
  updatePrediction: (eventId: string, data: PredictionData) => void;
  getPredictionForEvent: (eventId: string) => PredictionData | undefined;
  getLatestPredictions: () => PredictionData[];
}

export const usePredictionStore = create<PredictionState>()(
  devtools(
    (set, get) => ({
      predictionsByEvent: {},

      updatePrediction: (eventId: string, data: PredictionData) => {
        set(state => ({
          predictionsByEvent: {
            ...state.predictionsByEvent,
            [eventId]: data,
          },
        }));
      },

      getPredictionForEvent: (eventId: string) => {
        return get().predictionsByEvent[eventId];
      },

      getLatestPredictions: () => {

        return Object.values(predictions).sort(
          (a, b) => {


            return tb - ta;
          }
        );
      },
    }),
    { name: 'prediction-store' }
  )
);
