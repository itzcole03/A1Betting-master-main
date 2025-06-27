import { ML_CONFIG } from '@/config/constants.ts';
import { predictionService, PredictionRequest, PredictionResponse, GeneralInsight } from '@/services/predictionService.ts';
import { useState, useCallback } from 'react.ts';


interface UsePredictionReturn {
    makePrediction: (features: { [key: string]: number }, propId?: string, context?: { [key: string]: any }) => Promise<PredictionResponse>;
    getInsights: () => Promise<GeneralInsight[]>;
    isLoading: boolean;
    error: Error | null;
    lastPrediction: PredictionResponse | null;
}

export function usePrediction(): UsePredictionReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastPrediction, setLastPrediction] = useState<PredictionResponse | null>(null);

    const makePrediction = useCallback(async (
        features: { [key: string]: number },
        propId?: string,
        context?: { [key: string]: any }
    ) => {
        setIsLoading(true);
        setError(null);
        
        try {


            // Only store predictions above confidence threshold;
            if (response.confidence && response.confidence >= ML_CONFIG.CONFIDENCE_THRESHOLD) {
                setLastPrediction(response);
            }
            
            return response;
        } catch (err) {

            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            return await predictionService.getGeneralInsights();
        } catch (err) {

            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        makePrediction,
        getInsights,
        isLoading,
        error,
        lastPrediction;
    };
} 