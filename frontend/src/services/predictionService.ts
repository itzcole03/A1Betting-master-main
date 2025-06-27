import axios from 'axios.ts';
import { API_BASE_URL } from '@/config/constants.ts';
import { APIError, AppError } from '@/core/UnifiedError.ts';
import { unifiedMonitor } from '@/core/UnifiedMonitor.ts';
import type { PredictionUpdate } from '@/types/core.ts'; // Assuming PredictionUpdate can serve as response type;


// Define more specific request/response types for predictions if needed;
export interface PredictionRequestData {
    features: Record<string, number>; // Input features for the model;
    modelId?: string; // Optional: specify a model to use;
    context?: Record<string, unknown>; // Optional: additional context for prediction;
}

// Assuming PredictionUpdate from ../types can be used as a base for TResponse;
// Or define a specific PredictionServiceResponse;
export interface PredictionServiceResponse extends PredictionUpdate { }

export interface GeneralInsight {
    id: string;
    text: string;
    source: string; // e.g., 'TrendAnalysisModel', 'SocialSentimentAI'
    confidence?: number;
    type?: 'opportunity' | 'risk' | 'observation';
    relatedEntities?: Array<{ id: string, type: string }>; // e.g., [{id: 'player123', type: 'player'}]
}

export interface PredictionFeatureInput {
    features: {
        [key: string]: number;
    };
}

export interface PredictionRequest {
    propId?: string;
    modelId?: string;
    context?: Record<string, unknown>;
    prediction_input: PredictionFeatureInput;
}

export interface PredictionResponse {
    propId?: string;
    predictedOutcome: string | number;
    confidence?: number;
    modelUsed?: string;
    insights?: {
        confidence: number;
        feature_contributions: { [key: string]: number };
        model_metrics: { [key: string]: number | number[][] };
        prediction_timestamp: string;
    };
}

class PredictionService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = `${API_BASE_URL}/api/v1/predictions`;
    }

    async predict(request: PredictionRequest): Promise<PredictionResponse> {

        try {
            const response = await axios.post<PredictionResponse>(
                `${this.baseUrl}/predict`,
                request;
            );
            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data;
        } catch (error: unknown) {
            const errContext = {
                service: 'predictionService',
                operation: 'predict',
                modelId: request.modelId || 'default',
                context: request.context || {}
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            if (error instanceof APIError || error instanceof AppError) throw error;
            throw new AppError('Failed to get prediction from backend', errContext);
        }
    }

    async getGeneralInsights(): Promise<GeneralInsight[]> {

        try {
            const response = await axios.get<GeneralInsight[]>(
                `${this.baseUrl}/insights/general`
            );
            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data || [];
        } catch (error: unknown) {
            const errContext = {
                service: 'predictionService',
                operation: 'getGeneralInsights'
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            if (error instanceof APIError || error instanceof AppError) throw error;
            throw new AppError('Failed to fetch general insights from backend', errContext);
        }
    }

    // Helper method to create a prediction request;
    createPredictionRequest(
        features: { [key: string]: number },
        propId?: string,
        context?: Record<string, unknown>
    ): PredictionRequest {
        return {
            propId,
            modelId: 'default_v1',
            context: context || {},
            prediction_input: {
                features;
            }
        };
    }

    async getPrediction(requestData: PredictionRequestData): Promise<PredictionServiceResponse> {

        try {


            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data;
        } catch (error: unknown) {
            const errContext = {
                service: 'predictionService',
                operation: 'getPrediction',
                modelId: requestData.modelId,
                context: requestData.context;
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            if (error instanceof APIError || error instanceof AppError) throw error;
            throw new AppError('Failed to get prediction from backend', errContext);
        }
    }

    async getPredictionDetails(predictionId: string): Promise<Record<string, unknown>> {

        try {


            if (trace) trace.setHttpStatus(response.status);
            unifiedMonitor.endTrace(trace);
            return response.data;
        } catch (error: unknown) {
            const errContext = {
                service: 'predictionService',
                operation: 'getPredictionDetails',
                predictionId;
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            throw new AppError('Failed to fetch prediction details', errContext);
        }
    }

    async fetchGeneralInsights(): Promise<GeneralInsight[]> {

        try {

            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data || [];
        } catch (error: unknown) {
            const errContext = {
                service: 'predictionService',
                operation: 'fetchGeneralInsights'
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            if (error instanceof APIError || error instanceof AppError) throw error;
            throw new AppError('Failed to fetch general insights from backend', errContext);
        }
    }

    async getModelPerformance(modelType: string): Promise<any> {
        // TODO: Implement actual model performance retrieval;
        return {
            accuracy: 0.85,
            precision: 0.82,
            recall: 0.88,
            f1Score: 0.85,
            modelType;
        };
    }

    clearCaches(): void {
        // TODO: Implement cache clearing;
        // console statement removed
    }
}

// Export singleton instance;
export const predictionService = new PredictionService();

/**
 * Fetches ML-based predictions for a given set of inputs.
 * Calls backend POST /api/v1/predictions/predict.
 * Frontend PredictionRequestData is sent.
 * Backend expects PredictionRequest (see backend/app/api/v1/endpoints/prediction.py):
 * {
 *   "propId": "string" (optional),
 *   "modelId": "string" (optional),
 *   "context": {} (optional),
 *   "prediction_input": {
 *      "features": { "feature1": value1, ... } // Must match FEATURE_ORDER in backend;
 *   }
 * }
 * Backend returns PredictionResponse (see backend/app/api/v1/endpoints/prediction.py):
 * {
 *   "propId": "string" (optional),
 *   "predictedOutcome": any, // string or number;
 *   "confidence": number (optional),
 *   "modelUsed": "string" (optional)
 * }
 * This is mapped to frontend PredictionServiceResponse.
 */
export const getPrediction = async (requestData: PredictionRequestData): Promise<PredictionServiceResponse> => {
    return predictionService.getPrediction(requestData);
};

/**
 * Fetches detailed analytics or explanations for a past prediction.
 * @param predictionId The ID of the prediction to get details for.
 */
export const getPredictionDetails = async (predictionId: string): Promise<Record<string, unknown>> => {
    return predictionService.getPredictionDetails(predictionId);
};

/**
 * Fetches general ML insights not tied to a specific immediate prediction request.
 * Calls backend GET /api/v1/predictions/insights/general.
 * Expected backend response is a list of GeneralInsightResponse (see backend/app/api/v1/endpoints/prediction.py):
 * [
 *   {
 *     "id": "string",
 *     "text": "string",
 *     "source": "string",
 *     "confidence": number (optional),
 *     "type": "string (e.g., opportunity, risk)" (optional),
 *     "relatedEntities": [ { "id": "string", "type": "string" } ] (optional)
 *   },
 *   ...
 * ]
 * This is mapped to frontend GeneralInsight[].
 */
export const fetchGeneralInsights = async (): Promise<GeneralInsight[]> => {
    return predictionService.fetchGeneralInsights();
};
