import { Matrix } from 'ml-matrix';
import { FeatureLogger } from './featureLogging';
export class FeatureSelector {
    constructor(config) {
        this.config = config;
        this.logger = new FeatureLogger();
    }
    async selectFeatures(features) {
        try {
            const result = {
                numerical: [],
                categorical: [],
                temporal: [],
                derived: [],
                importance: {},
            };
            // Select numerical features;
            result.numerical = await this.selectNumericalFeatures(features.numerical);
            // Select categorical features;
            result.categorical = await this.selectCategoricalFeatures(features.categorical);
            // Select temporal features;
            result.temporal = await this.selectTemporalFeatures(features.temporal);
            // Select derived features;
            result.derived = await this.selectDerivedFeatures(features.derived);
            // Calculate feature importance;
            result.importance = await this.calculateFeatureImportance(features, result);
            // Filter features based on importance threshold;
            this.filterFeaturesByImportance(result);
            return result;
        }
        catch (error) {
            this.logger.error('Error in feature selection', error);
            throw error;
        }
    }
    async selectNumericalFeatures(features) {


        // Calculate correlation matrix;

        // Remove highly correlated features;

        // Calculate variance;

        // Select features based on variance threshold;
        for (const feature of uncorrelatedFeatures) {
            if (varianceScores[feature] > this.config.featureSelectionThreshold) {
                selectedFeatures.push(feature);
            }
        }
        return selectedFeatures;
    }
    async selectCategoricalFeatures(features) {

        for (const [feature, values] of Object.entries(features)) {
            // Calculate cardinality;

            // Calculate information value;

            // Select features based on cardinality and information value;
            if (cardinality > 1 &&
                cardinality < values.length / 2 &&
                informationValue > this.config.featureSelectionThreshold) {
                selectedFeatures.push(feature);
            }
        }
        return selectedFeatures;
    }
    async selectTemporalFeatures(features) {


        // Calculate autocorrelation;

        // Calculate trend strength;

        // Select features based on autocorrelation and trend strength;
        for (const [feature, values] of Object.entries(features)) {


            if (autocorrelation > this.config.featureSelectionThreshold ||
                trendStrength > this.config.featureSelectionThreshold) {
                selectedFeatures.push(feature);
            }
        }
        return selectedFeatures;
    }
    async selectDerivedFeatures(features) {


        // Calculate mutual information;

        // Select features based on mutual information;
        for (const [feature, score] of Object.entries(mutualInfoScores)) {
            if (score > this.config.featureSelectionThreshold) {
                selectedFeatures.push(feature);
            }
        }
        return selectedFeatures;
    }
    async calculateFeatureImportance(features, selectedFeatures) {

        const allFeatures = {
            ...features.numerical,
            ...features.temporal,
            ...features.derived,
        };
        // Calculate feature importance using multiple methods;



        // Combine importance scores;
        for (const feature of selectedFeatures.numerical) {
            importance[feature] = this.combineImportanceScores(varianceImportance[feature], correlationImportance[feature], mutualInfoImportance[feature]);
        }
        return importance;
    }
    createFeatureMatrix(features) {



        for (const i = 0; i < featureNames.length; i++) {

            for (const j = 0; j < numSamples; j++) {
                matrix.set(j, i, feature[j]);
            }
        }
        return matrix;
    }
    calculateCorrelationMatrix(matrix) {

        const covariance = centered;
            .transpose()
            .mmul(centered)
            .div(matrix.rows - 1);


        for (const i = 0; i < matrix.columns; i++) {
            for (const j = 0; j < matrix.columns; j++) {
                correlation.set(i, j, covariance.get(i, j) / (stdDevs[i] * stdDevs[j]));
            }
        }
        return correlation;
    }
    removeCorrelatedFeatures(features, correlationMatrix) {


        for (const i = 0; i < features.length; i++) {
            const isCorrelated = false;
            for (const selectedFeature of selectedFeatures) {

                if (Math.abs(correlationMatrix.get(i, j)) > correlationThreshold) {
                    isCorrelated = true;
                    break;
                }
            }
            if (!isCorrelated) {
                selectedFeatures.push(features[i]);
            }
        }
        return selectedFeatures;
    }
    calculateVarianceScores(matrix) {


        for (const i = 0; i < matrix.columns; i++) {
            varianceScores[`feature_${i}`] = variances[i];
        }
        return varianceScores;
    }
    calculateInformationValue(values) {

        for (const value of values) {
            valueCounts.set(value, (valueCounts.get(value) || 0) + 1);
        }
        const informationValue = 0;

        for (const [_, count] of valueCounts) {

            informationValue -= probability * Math.log2(probability);
        }
        return informationValue;
    }
    calculateAutocorrelationScores(matrix) {


        for (const i = 0; i < matrix.columns; i++) {

            const numerator = 0;
            const denominator = 0;

            for (const j = 0; j < column.length - lag; j++) {
                numerator += (column[j] - mean) * (column[j + lag] - mean);
                denominator += Math.pow(column[j] - mean, 2);
            }
            scores[`feature_${i}`] = numerator / denominator;
        }
        return scores;
    }
    calculateTrendScores(matrix) {

        for (const i = 0; i < matrix.columns; i++) {



            scores[`feature_${i}`] = Math.abs(slope);
        }
        return scores;
    }
    calculateMutualInformationScores(matrix) {


        for (const i = 0; i < matrix.columns; i++) {
            const totalMI = 0;

            for (const j = 0; j < matrix.columns; j++) {
                if (i !== j) {


                    totalMI += mi;
                }
            }
            scores[`feature_${i}`] = totalMI / (matrix.columns - 1);
        }
        return scores;
    }
    calculateMutualInformation(x, y, numBins) {






        for (const i = 0; i < n; i++) {

            jointCounts.set(key, (jointCounts.get(key) || 0) + 1);
            xCounts.set(xBins[i], (xCounts.get(xBins[i]) || 0) + 1);
            yCounts.set(yBins[i], (yCounts.get(yBins[i]) || 0) + 1);
        }
        const mi = 0;
        for (const [key, count] of jointCounts) {
            const [xBin, yBin] = key.split(',').map(Number);



            mi += pxy * Math.log2(pxy / (px * py));
        }
        return mi;
    }
    discretize(values, numBins) {



        return values.map(value => {

            return Math.min(bin, numBins - 1);
        });
    }
    calculateLinearRegressionSlope(x, y) {





        return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    }
    calculateVarianceImportance(features) {

        for (const [feature, values] of Object.entries(features)) {


            importance[feature] = variance;
        }
        return this.normalizeScores(importance);
    }
    calculateCorrelationImportance(features) {



        for (const i = 0; i < featureMatrix.columns; i++) {

            importance[`feature_${i}`] =
                correlations.reduce((a, b) => a + Math.abs(b), 0) / correlations.length;
        }
        return this.normalizeScores(importance);
    }
    calculateMutualInfoImportance(features) {



        for (const [feature, score] of Object.entries(mutualInfoScores)) {
            importance[feature] = score;
        }
        return this.normalizeScores(importance);
    }
    combineImportanceScores(varianceScore, correlationScore, mutualInfoScore) {
        return (varianceScore + correlationScore + mutualInfoScore) / 3;
    }
    normalizeScores(scores) {




        return Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, range === 0 ? 0 : (value - min) / range]));
    }
    filterFeaturesByImportance(result) {


        // Sort features by importance;
        const sortedFeatures = Object.entries(result.importance)
            .sort(([, a], [, b]) => b - a)
            .slice(0, maxFeatures);
        // Update selected features;
        result.numerical = result.numerical.filter(feature => sortedFeatures.some(([f]) => f === feature));
        result.categorical = result.categorical.filter(feature => sortedFeatures.some(([f]) => f === feature));
        result.temporal = result.temporal.filter(feature => sortedFeatures.some(([f]) => f === feature));
        result.derived = result.derived.filter(feature => sortedFeatures.some(([f]) => f === feature));
    }
}
