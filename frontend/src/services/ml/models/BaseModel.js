/**
 * Base model type definitions for ML models.
 */
// Minimal browser-compatible EventEmitter;
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, fn) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(fn);
    }
    off(event, fn) {
        if (!this.listeners[event])
            return;
        this.listeners[event] = this.listeners[event].filter(f => f !== fn);
    }
    emit(event, ...args) {
        (this.listeners[event] || []).forEach(fn => fn(...args));
    }
}
import { UnifiedLogger } from '../../../core/UnifiedLogger';
import { UnifiedErrorHandler } from '../../../core/UnifiedErrorHandler';
// Removed named imports from '../../../core/UnifiedError' as they do not exist.
import { ResourceManager } from '../resources/ResourceManager';
export class BaseModel extends EventEmitter {
    constructor(config) {
        super();
        this.metrics = {};
        this.isTraining = false;
        this.modelId = config.name;
        this.config = config;
        this.isTrained = false;
        this.lastUpdate = new Date().toISOString();
        this.metadata = {};
        this.logger = UnifiedLogger.getInstance();
        this.errorHandler = UnifiedErrorHandler.getInstance();
        this.resourceManager = ResourceManager.getInstance();
    }
    getModelId() {
        return this.modelId;
    }
    getConfig() {
        return this.config;
    }
    isModelTrained() {
        return this.isTrained;
    }
    getLastUpdate() {
        return this.lastUpdate;
    }
    getMetadata() {
        return { ...this.metadata };
    }
    getModelInfo() {
        return {
            modelId: this.modelId,
            type: this.config.type,
            isTrained: this.isTrained,
            lastUpdate: this.lastUpdate,
            metadata: this.metadata,
        };
    }
    updateLastUpdate() {
        this.lastUpdate = new Date().toISOString();
    }
    createPrediction(output, confidence) {
        return {
            output,
            confidence,
        };
    }
    createError(message, error) {
        if (error instanceof CoreModelError) {
            return error;
        }
        return new CoreModelError(message, { originalError: error });
    }
    async preprocessFeatures(data) {
        // Implement common preprocessing logic;
        return data;
    }
    async validateFeatures(data) {
        // Implement common validation logic;
        return true;
    }
    calculateMSE(actual, predicted) {
        return actual.reduce((acc, val, i) => acc + Math.pow(val - predicted[i], 2), 0) / actual.length;
    }
    calculateMAE(actual, predicted) {
        return actual.reduce((acc, val, i) => acc + Math.abs(val - predicted[i]), 0) / actual.length;
    }
    calculateMAPE(actual, predicted) {
        return ((actual.reduce((acc, val, i) => acc + Math.abs((val - predicted[i]) / val), 0) /
            actual.length) *
            100);
    }
    calculateF1Score(predictions, actuals) {


        return (2 * (precision * recall)) / (precision + recall);
    }
    async evaluate(testData) {




        this.metrics.mse = this.calculateMSE(actual, predicted);
        this.metrics.mae = this.calculateMAE(actual, predicted);
        this.metrics.mape = this.calculateMAPE(actual, predicted);
        this.metrics.responseTime = Date.now() - startTime;
        return this.metrics;
    }
    async ensureGPU() {
        await this.resourceManager.allocateResources(this);
    }
    calculateMetrics(predictions, actuals) {

        // Calculate common metrics;
        if (this.isClassification()) {
            metrics.accuracy = this.calculateAccuracy(predictions, actuals);
            metrics.precision = this.calculatePrecision(predictions, actuals);
            metrics.recall = this.calculateRecall(predictions, actuals);
            metrics.f1Score = this.calculateF1Score(predictions, actuals);
        }
        else {
            metrics.rmse = this.calculateRMSE(predictions, actuals);
            metrics.mae = this.calculateMAE(predictions, actuals);
            metrics.r2 = this.calculateR2(predictions, actuals);
        }
        return metrics;
    }
    isClassification() {
        return this.config.type === 'traditional' || this.config.type === 'deepLearning';
    }
    calculateAccuracy(predictions, actuals) {
        const correct = 0;
        for (const i = 0; i < predictions.length; i++) {
            if (predictions[i] === actuals[i])
                correct++;
        }
        return correct / predictions.length;
    }
    calculatePrecision(predictions, actuals) {
        const truePositives = 0;
        const falsePositives = 0;
        for (const i = 0; i < predictions.length; i++) {
            if (predictions[i] === 1 && actuals[i] === 1)
                truePositives++;
            if (predictions[i] === 1 && actuals[i] === 0)
                falsePositives++;
        }
        return truePositives / (truePositives + falsePositives);
    }
    calculateRecall(predictions, actuals) {
        const truePositives = 0;
        const falseNegatives = 0;
        for (const i = 0; i < predictions.length; i++) {
            if (predictions[i] === 1 && actuals[i] === 1)
                truePositives++;
            if (predictions[i] === 0 && actuals[i] === 1)
                falseNegatives++;
        }
        return truePositives / (truePositives + falseNegatives);
    }
    calculateRMSE(predictions, actuals) {
        const sum = 0;
        for (const i = 0; i < predictions.length; i++) {
            sum += Math.pow(predictions[i] - actuals[i], 2);
        }
        return Math.sqrt(sum / predictions.length);
    }
    calculateR2(predictions, actuals) {



        return 1 - ssResidual / ssTotal;
    }
    getMetrics() {
        return this.metrics;
    }
    getType() {
        return this.config.type;
    }
    getName() {
        return this.config.name;
    }
    isModelTraining() {
        return this.isTraining;
    }
}
// export { BaseModel }; // Removed duplicate export;
