import { ModelRegistry } from './ModelRegistry';
import { ModelEvaluator } from './ModelEvaluator';
import { FeatureLogger } from '../../services/analytics/featureLogging';
export class ModelManager {
    constructor(config) {
        this.registry = new ModelRegistry(config.registryConfig);
        this.evaluator = new ModelEvaluator(config.evaluatorConfig);
        this.logger = new FeatureLogger(config.loggerConfig);
        this.modelCache = new Map();
    }
    async createModel(metadata) {
        try {

            this.logger.info(`Created new model with ID: ${modelId}`);
            return modelId;
        }
        catch (error) {
            this.logger.error('Failed to create model', error);
            throw error;
        }
    }
    async trainModel(modelId, data, config) {
        try {


            // Evaluate the new version;

            version.metrics = evaluation;
            // Update registry;
            await this.registry.updateModel(modelId, version);
            this.logger.info(`Trained model ${modelId} to version ${version.version}`);
            return version;
        }
        catch (error) {
            this.logger.error(`Failed to train model ${modelId}`, error);
            throw error;
        }
    }
    async predict(modelId, data) {
        try {
            // Check cache first;

            if (this.modelCache.has(cacheKey)) {
                return this.modelCache.get(cacheKey);
            }


            // Cache the result;
            this.modelCache.set(cacheKey, prediction);
            return prediction;
        }
        catch (error) {
            this.logger.error(`Failed to make prediction with model ${modelId}`, error);
            throw error;
        }
    }
    async evaluateModel(modelId, data) {
        try {


            // Update model metrics;
            await this.registry.updateMetrics(modelId, evaluation);
            this.logger.info(`Evaluated model ${modelId}`);
            return evaluation;
        }
        catch (error) {
            this.logger.error(`Failed to evaluate model ${modelId}`, error);
            throw error;
        }
    }
    async getModelVersions(modelId) {
        try {
            return await this.registry.getModelVersions(modelId);
        }
        catch (error) {
            this.logger.error(`Failed to get versions for model ${modelId}`, error);
            throw error;
        }
    }
    async getModelMetadata(modelId) {
        try {
            return await this.registry.getModelMetadata(modelId);
        }
        catch (error) {
            this.logger.error(`Failed to get metadata for model ${modelId}`, error);
            throw error;
        }
    }
    async updateModelMetadata(modelId, metadata) {
        try {
            await this.registry.updateModelMetadata(modelId, metadata);
            this.logger.info(`Updated metadata for model ${modelId}`);
        }
        catch (error) {
            this.logger.error(`Failed to update metadata for model ${modelId}`, error);
            throw error;
        }
    }
    async deleteModel(modelId) {
        try {
            await this.registry.deleteModel(modelId);
            this.modelCache.delete(modelId);
            this.logger.info(`Deleted model ${modelId}`);
        }
        catch (error) {
            this.logger.error(`Failed to delete model ${modelId}`, error);
            throw error;
        }
    }
    async cleanupCache() {
        try {
            this.modelCache.clear();
            this.logger.info('Cleared model cache');
        }
        catch (error) {
            this.logger.error('Failed to cleanup cache', error);
            throw error;
        }
    }
}
