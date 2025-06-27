import { ModelRegistry } from '../registry/ModelRegistry';
import { EventEmitter } from 'events';
export class EnsembleManager extends EventEmitter {
    constructor() {
        super();
        this.ensembles = new Map();
        this.modelRegistry = ModelRegistry.getInstance();
    }
    static getInstance() {
        if (!EnsembleManager.instance) {
            EnsembleManager.instance = new EnsembleManager();
        }
        return EnsembleManager.instance;
    }
    async createEnsemble(config) {
        // Validate models exist;
        for (const modelName of config.models) {
            if (!this.modelRegistry.getModel(modelName)) {
                throw new Error(`Model ${modelName} not found in registry`);
            }
        }
        // Initialize weights if not provided;
        if (!config.weights) {
            config.weights = {};

            config.models.forEach(model => {
                config.weights[model] = weight;
            });
        }
        this.ensembles.set(config.name, config);
        this.emit('ensembleCreated', { name: config.name, config });
    }
    async getEnsemblePrediction(ensembleName, input) {

        if (!ensemble) {
            throw new Error(`Ensemble ${ensembleName} not found`);
        }
        // Get predictions from all models;
        const predictions = await Promise.all(ensemble.models.map(async (modelName) => {

            if (!model) {
                throw new Error(`Model ${modelName} not found`);
            }

            return {
                modelName,
                prediction,
                weight: ensemble.weights[modelName],
            };
        }));
        // Combine predictions based on voting strategy;

        // Create ensemble prediction object;
        const ensemblePrediction = {
            prediction: combinedPrediction.prediction,
            confidence: combinedPrediction.confidence,
            modelContributions: {},
            metadata: {
                timestamp: Date.now(),
                modelCount: predictions.length,
                votingStrategy: ensemble.votingStrategy,
            },
        };
        // Add individual model contributions;
        predictions.forEach(({ modelName, prediction, weight }) => {
            ensemblePrediction.modelContributions[modelName] = {
                prediction: prediction.prediction,
                confidence: prediction.confidence,
                weight,
            };
        });
        this.emit('predictionGenerated', {
            ensembleName,
            prediction: ensemblePrediction,
        });
        return ensemblePrediction;
    }
    combinePredictions(predictions, ensemble) {
        switch (ensemble.votingStrategy) {
            case 'weighted':
                return this.weightedVoting(predictions);
            case 'majority':
                return this.majorityVoting(predictions);
            case 'confidence':
                return this.confidenceVoting(predictions);
            default:
                throw new Error(`Unknown voting strategy: ${ensemble.votingStrategy}`);
        }
    }
    weightedVoting(predictions) {


        return {
            prediction: weightedSum,
            confidence,
        };
    }
    majorityVoting(predictions) {

        const totalConfidence = 0;
        predictions.forEach(({ prediction }) => {

            votes.set(vote, (votes.get(vote) || 0) + 1);
            totalConfidence += prediction.confidence;
        });
        const maxVotes = 0;
        const majorityPrediction = null;
        votes.forEach((count, prediction) => {
            if (count > maxVotes) {
                maxVotes = count;
                majorityPrediction = prediction;
            }
        });
        return {
            prediction: majorityPrediction,
            confidence: totalConfidence / predictions.length,
        };
    }
    confidenceVoting(predictions) {

        return {
            prediction: sortedPredictions[0].prediction.prediction,
            confidence: sortedPredictions[0].prediction.confidence,
        };
    }
    async updateEnsembleWeights(ensembleName, weights) {

        if (!ensemble) {
            throw new Error(`Ensemble ${ensembleName} not found`);
        }
        // Validate weights;

        if (Math.abs(totalWeight - 1) > 0.0001) {
            throw new Error('Weights must sum to 1');
        }
        ensemble.weights = weights;
        this.emit('weightsUpdated', { ensembleName, weights });
    }
    getEnsembleConfig(ensembleName) {
        return this.ensembles.get(ensembleName);
    }
    getAllEnsembles() {
        return new Map(this.ensembles);
    }
    async removeEnsemble(ensembleName) {
        if (this.ensembles.delete(ensembleName)) {
            this.emit('ensembleRemoved', { name: ensembleName });
        }
    }
}
