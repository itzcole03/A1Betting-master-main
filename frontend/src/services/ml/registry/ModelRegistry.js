import { EventEmitter } from 'events';
export class ModelRegistry extends EventEmitter {
    constructor() {
        super();
        this.models = new Map();
        this.modelMetrics = new Map();
        this.modelWeights = new Map();
    }
    static getInstance() {
        if (!ModelRegistry.instance) {
            ModelRegistry.instance = new ModelRegistry();
        }
        return ModelRegistry.instance;
    }
    registerModel(model) {

        this.models.set(config.name, model);
        this.modelMetrics.set(config.name, {});
        this.modelWeights.set(config.name, 1.0);
        this.emit('modelRegistered', config.name);
    }
    unregisterModel(modelName) {
        this.models.delete(modelName);
        this.modelMetrics.delete(modelName);
        this.modelWeights.delete(modelName);
        this.emit('modelUnregistered', modelName);
    }
    getModel(modelName) {
        return this.models.get(modelName);
    }
    getModelsByType(type) {
        return Array.from(this.models.values()).filter(model => model.getType() === type);
    }
    getAllModels() {
        return Array.from(this.models.values());
    }
    updateModelMetrics(modelName, metrics) {
        this.modelMetrics.set(modelName, metrics);
        this.emit('metricsUpdated', modelName, metrics);
    }
    getModelMetrics(modelName) {
        return this.modelMetrics.get(modelName);
    }
    updateModelWeights() {
        const totalAccuracy = 0;
        const modelCount = 0;
        // Calculate total accuracy;
        for (const [name, metrics] of this.modelMetrics.entries()) {
            if (metrics.accuracy !== undefined) {
                totalAccuracy += metrics.accuracy;
                modelCount++;
            }
        }
        if (modelCount === 0)
            return;

        // Update weights based on relative accuracy;
        for (const [name, metrics] of this.modelMetrics.entries()) {
            if (metrics.accuracy !== undefined) {

                this.modelWeights.set(name, weight);
            }
        }
        this.emit('weightsUpdated', Object.fromEntries(this.modelWeights));
    }
    getModelWeight(modelName) {
        return this.modelWeights.get(modelName) || 1.0;
    }
    async trainAllModels(data) {

        await Promise.all(trainingPromises);
        this.emit('allModelsTrained');
    }
    async evaluateAllModels(data) {
        const evaluationPromises = Array.from(this.models.values()).map(async (model) => {

            this.updateModelMetrics(model.getName(), metrics);
        });
        await Promise.all(evaluationPromises);
        this.updateModelWeights();
        this.emit('allModelsEvaluated');
    }
    async saveAllModels(basePath) {

        await Promise.all(savePromises);
        this.emit('allModelsSaved');
    }
    async loadAllModels(basePath) {

        await Promise.all(loadPromises);
        this.emit('allModelsLoaded');
    }
}
