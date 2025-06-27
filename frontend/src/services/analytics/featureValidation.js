import { FeatureLogger } from './featureLogging';
export class FeatureValidator {
    constructor(config) {
        this.config = config;
        this.logger = new FeatureLogger();
    }
    async validate(features) {
        try {
            const result = {
                isValid: true,
                errors: [],
                warnings: [],
            };
            // Validate numerical features;

            this.mergeValidationResults(result, numericalValidation);
            // Validate categorical features;

            this.mergeValidationResults(result, categoricalValidation);
            // Validate temporal features;

            this.mergeValidationResults(result, temporalValidation);
            // Validate derived features;

            this.mergeValidationResults(result, derivedValidation);
            // Validate feature metadata;

            this.mergeValidationResults(result, metadataValidation);
            // Check overall validation threshold;
            result.isValid = this.checkValidationThreshold(result);
            return result;
        }
        catch (error) {
            this.logger.error('Error in feature validation', error);
            throw error;
        }
    }
    async validateNumericalFeatures(features) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
        };
        for (const [feature, values] of Object.entries(features)) {
            // Check for missing values;

            if (missingCount > 0) {
                result.errors.push(`Feature ${feature} has ${missingCount} missing values`);
            }
            // Check for infinite values;

            if (infiniteCount > 0) {
                result.errors.push(`Feature ${feature} has ${infiniteCount} infinite values`);
            }
            // Check for constant values;

            if (uniqueValues === 1) {
                result.warnings.push(`Feature ${feature} is constant`);
            }
            // Check for outliers;

            if (outliers.length > 0) {
                result.warnings.push(`Feature ${feature} has ${outliers.length} outliers`);
            }
            // Check for distribution;

            if (!distributionCheck.isValid) {
                result.warnings.push(`Feature ${feature} has non-normal distribution: ${distributionCheck.reason}`);
            }
        }
        return result;
    }
    async validateCategoricalFeatures(features) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
        };
        for (const [feature, values] of Object.entries(features)) {
            // Check for missing values;

            if (missingCount > 0) {
                result.errors.push(`Feature ${feature} has ${missingCount} missing values`);
            }
            // Check cardinality;

            if (uniqueValues === 1) {
                result.warnings.push(`Feature ${feature} has only one unique value`);
            }
            else if (uniqueValues === values.length) {
                result.warnings.push(`Feature ${feature} has too many unique values`);
            }
            // Check value distribution;


            if (imbalancedCategories.length > 0) {
                result.warnings.push(`Feature ${feature} has imbalanced categories: ${imbalancedCategories.join(', ')}`);
            }
        }
        return result;
    }
    async validateTemporalFeatures(features) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
        };
        for (const [feature, values] of Object.entries(features)) {
            // Check for missing values;

            if (missingCount > 0) {
                result.errors.push(`Feature ${feature} has ${missingCount} missing values`);
            }
            // Check for temporal consistency;

            if (!consistencyCheck.isValid) {
                result.errors.push(`Feature ${feature} has temporal inconsistency: ${consistencyCheck.reason}`);
            }
            // Check for seasonality;

            if (seasonalityCheck.hasSeasonality) {
                result.warnings.push(`Feature ${feature} shows seasonality with period ${seasonalityCheck.period}`);
            }
            // Check for trend;

            if (trendCheck.hasTrend) {
                result.warnings.push(`Feature ${feature} shows ${trendCheck.trendType} trend`);
            }
        }
        return result;
    }
    async validateDerivedFeatures(features) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
        };
        for (const [feature, values] of Object.entries(features)) {
            // Check for missing values;

            if (missingCount > 0) {
                result.errors.push(`Feature ${feature} has ${missingCount} missing values`);
            }
            // Check for infinite values;

            if (infiniteCount > 0) {
                result.errors.push(`Feature ${feature} has ${infiniteCount} infinite values`);
            }
            // Check for correlation with original features;

            if (correlationCheck.hasHighCorrelation) {
                result.warnings.push(`Feature ${feature} has high correlation with ${correlationCheck.correlatedFeatures.join(', ')}`);
            }
        }
        return result;
    }
    async validateFeatureMetadata(metadata) {
        const result = {
            isValid: true,
            errors: [],
            warnings: [],
        };
        // Check feature names;
        if (metadata.featureNames.length === 0) {
            result.errors.push('No feature names provided');
        }
        // Check feature types;
        for (const [feature, type] of Object.entries(metadata.featureTypes)) {
            if (!['numerical', 'categorical', 'temporal', 'derived'].includes(type)) {
                result.errors.push(`Invalid feature type for ${feature}: ${type}`);
            }
        }
        // Check scaling parameters;
        for (const [feature, params] of Object.entries(metadata.scalingParams)) {
            if (isNaN(params.mean) || isNaN(params.std) || params.std <= 0) {
                result.errors.push(`Invalid scaling parameters for ${feature}`);
            }
        }
        // Check encoding maps;
        for (const [feature, encodingMap] of Object.entries(metadata.encodingMaps)) {
            if (Object.keys(encodingMap).length === 0) {
                result.warnings.push(`Empty encoding map for ${feature}`);
            }
        }
        return result;
    }
    mergeValidationResults(target, source) {
        target.errors.push(...source.errors);
        target.warnings.push(...source.warnings);
        target.isValid = target.isValid && source.isValid;
    }
    checkValidationThreshold(result) {


        return errorRatio <= 1 - this.config.validationThreshold;
    }
    detectOutliers(values) {


        const threshold = 3; // 3 standard deviations;
        return values.filter(value => Math.abs(value - mean) > threshold * std);
    }
    checkDistribution(values) {
        // Simple normality test using skewness and kurtosis;



        const kurtosis = values.reduce((a, b) => a + Math.pow(b - mean, 4), 0) / (values.length * Math.pow(std, 4)) -
            3;
        if (Math.abs(skewness) > 1) {
            return { isValid: false, reason: `High skewness (${skewness.toFixed(2)})` };
        }
        if (Math.abs(kurtosis) > 1) {
            return { isValid: false, reason: `High kurtosis (${kurtosis.toFixed(2)})` };
        }
        return { isValid: true, reason: '' };
    }
    calculateValueDistribution(values) {


        for (const value of values) {
            distribution[value] = (distribution[value] || 0) + 1;
        }
        for (const key of Object.keys(distribution)) {
            distribution[key] /= total;
        }
        return distribution;
    }
    detectImbalancedCategories(distribution) {
        const threshold = 0.1; // 10% threshold for imbalance;
        return Object.entries(distribution)
            .filter(([_, ratio]) => ratio < threshold)
            .map(([category]) => category);
    }
    checkTemporalConsistency(values) {
        // Check for gaps in the sequence;

        if (gaps.length > 0) {
            return {
                isValid: false,
                reason: `Found ${gaps.length} temporal gaps`,
            };
        }
        // Check for sudden changes;

        if (changes.length > 0) {
            return {
                isValid: false,
                reason: `Found ${changes.length} sudden changes`,
            };
        }
        return { isValid: true, reason: '' };
    }
    findTemporalGaps(values) {

        for (const i = 1; i < values.length; i++) {
            if (values[i] - values[i - 1] > 1) {
                gaps.push(i);
            }
        }
        return gaps;
    }
    detectSuddenChanges(values) {

        const threshold = 3; // 3 standard deviations;


        for (const i = 1; i < values.length; i++) {

            if (change > threshold * std) {
                changes.push(i);
            }
        }
        return changes;
    }
    checkSeasonality(values) {

        const bestPeriod = 1;
        const maxAutocorr = -1;
        for (const lag = 1; lag <= maxLag; lag++) {

            if (autocorr > maxAutocorr) {
                maxAutocorr = autocorr;
                bestPeriod = lag;
            }
        }
        return {
            hasSeasonality: maxAutocorr > 0.5,
            period: bestPeriod,
        };
    }
    checkTrend(values) {


        if (Math.abs(slope) < 0.01) {
            return { hasTrend: false, trendType: '' };
        }
        return {
            hasTrend: true,
            trendType: slope > 0 ? 'increasing' : 'decreasing',
        };
    }
    checkFeatureCorrelation(feature, values) {
        // This is a placeholder implementation;
        // In a real application, calculate correlation with other features;
        return {
            hasHighCorrelation: false,
            correlatedFeatures: [],
        };
    }
    calculateAutocorrelation(values, lag) {

        const numerator = 0;
        const denominator = 0;
        for (const i = 0; i < values.length - lag; i++) {
            numerator += (values[i] - mean) * (values[i + lag] - mean);
            denominator += Math.pow(values[i] - mean, 2);
        }
        return numerator / denominator;
    }
    calculateLinearRegressionSlope(x, y) {





        return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    }
}
