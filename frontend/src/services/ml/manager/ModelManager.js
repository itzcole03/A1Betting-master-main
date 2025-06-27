import { ModelFactory } from '../factory/ModelFactory';
import { validateModelConfig, validateRegularModelConfig, } from '../config/modelConfig';
import { ModelRegistry } from '../registry/ModelRegistry';
export class ModelManager {
    constructor() {
        this.activeModels = new Set();
        this.modelMetrics = new Map();
        this.modelFactory = ModelFactory.getInstance();
        this.modelRegistry = ModelRegistry.getInstance();
    }
    static getInstance() {
        if (!ModelManager.instance) {
            ModelManager.instance = new ModelManager();
        }
        return ModelManager.instance;
    }
    async initializeModel(modelId, type, config) {
        try {
            // Get default configuration from registry;

            // Merge with provided config if any;

            // Validate configuration based on model type;
            if (type === 'ensemble') {
                validateModelConfig(finalConfig);
            }
            else {
                validateRegularModelConfig(finalConfig);
            }
            // Create model using factory;
            await this.modelFactory.createModel(finalConfig, modelId);
            this.activeModels.add(modelId);
            // console statement removed
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async trainModel(modelId, data) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        try {
            await this.modelFactory.trainModel(modelId, data);
            // console statement removed
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async predict(modelId, input) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        try {
            return await this.modelFactory.predict(modelId, input);
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async evaluateModel(modelId, data) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        try {

            this.modelMetrics.set(modelId, metrics);
            return metrics;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async updateModel(modelId, update) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        try {
            await this.modelFactory.updateModel(modelId, update);
            // console statement removed
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async saveModel(modelId, path) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        try {
            await this.modelFactory.saveModel(modelId, path);
            // console statement removed
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async loadModel(modelId, path) {
        try {
            await this.modelFactory.loadModel(modelId, path);
            this.activeModels.add(modelId);
            // console statement removed
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    deactivateModel(modelId) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        this.activeModels.delete(modelId);
        this.modelMetrics.delete(modelId);
        // console statement removed
    }
    getActiveModels() {
        return Array.from(this.activeModels);
    }
    getModelMetrics(modelId) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        return this.modelMetrics.get(modelId);
    }
    isModelActive(modelId) {
        return this.activeModels.has(modelId);
    }
    getModelInfo(modelId) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        return this.modelFactory.getModelInfo(modelId);
    }
    isModelTrained(modelId) {
        if (!this.activeModels.has(modelId)) {
            throw new Error(`Model ${modelId} is not active`);
        }
        return this.modelFactory.isModelTrained(modelId);
    }
    getAvailableModelTypes() {
        return this.modelRegistry.getAvailableModelTypes();
    }
    getModelTypeInfo(type) {
        return this.modelRegistry.getModelTypeInfo(type);
    }
}
