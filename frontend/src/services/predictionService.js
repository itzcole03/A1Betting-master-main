import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import { AppError, APIError } from '../core/UnifiedError';
import { unifiedMonitor } from '../core/UnifiedMonitor';
class PredictionService {
    constructor() {
        this.baseUrl = `${API_BASE_URL}/api/v1/predictions`;
    }
    async predict(request) {

        try {

            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data;
        }
        catch (error) {
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
            if (error instanceof APIError || error instanceof AppError)
                throw error;
            throw new AppError('Failed to get prediction from backend', errContext);
        }
    }
    async getGeneralInsights() {

        try {

            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data || [];
        }
        catch (error) {
            const errContext = {
                service: 'predictionService',
                operation: 'getGeneralInsights'
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            if (error instanceof APIError || error instanceof AppError)
                throw error;
            throw new AppError('Failed to fetch general insights from backend', errContext);
        }
    }
    // Helper method to create a prediction request;
    createPredictionRequest(features, propId, context) {
        return {
            propId,
            modelId: 'default_v1',
            context: context || {},
            prediction_input: {
                features;
            }
        };
    }
    async getPrediction(requestData) {

        try {


            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data;
        }
        catch (error) {
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
            if (error instanceof APIError || error instanceof AppError)
                throw error;
            throw new AppError('Failed to get prediction from backend', errContext);
        }
    }
    async getPredictionDetails(predictionId) {

        try {


            if (trace)
                trace.setHttpStatus(response.status);
            unifiedMonitor.endTrace(trace);
            return response.data;
        }
        catch (error) {
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
    async fetchGeneralInsights() {

        try {

            if (trace) {
                trace.setHttpStatus(response.status);
                unifiedMonitor.endTrace(trace);
            }
            return response.data || [];
        }
        catch (error) {
            const errContext = {
                service: 'predictionService',
                operation: 'fetchGeneralInsights'
            };
            unifiedMonitor.reportError(error, errContext);
            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            if (error instanceof APIError || error instanceof AppError)
                throw error;
            throw new AppError('Failed to fetch general insights from backend', errContext);
        }
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
export const getPrediction = async (requestData) => {
    return predictionService.getPrediction(requestData);
};
/**
 * Fetches detailed analytics or explanations for a past prediction.
 * @param predictionId The ID of the prediction to get details for.
 */
export const getPredictionDetails = async (predictionId) => {
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
export const fetchGeneralInsights = async () => {
    return predictionService.fetchGeneralInsights();
};
