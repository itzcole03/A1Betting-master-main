import { ML_CONFIG } from '../config/constants';
import { predictionService } from '../services/predictionService';
import { useState, useCallback } from 'react';
export function usePrediction() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastPrediction, setLastPrediction] = useState(null);
    const makePrediction = useCallback(async (features, propId, context) => {
        setIsLoading(true);
        setError(null);
        try {


            // Only store predictions above confidence threshold;
            if (response.confidence && response.confidence >= ML_CONFIG.CONFIDENCE_THRESHOLD) {
                setLastPrediction(response);
            }
            return response;
        }
        catch (err) {

            setError(error);
            throw error;
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    const getInsights = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            return await predictionService.getGeneralInsights();
        }
        catch (err) {

            setError(error);
            throw error;
        }
        finally {
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
