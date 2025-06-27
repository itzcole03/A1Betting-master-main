import { FeatureConfig, EngineeredFeatures, FeatureRegistryConfig } from '@/types.ts';
import { FeatureLogger } from './featureLogging.ts';
import { FeatureStore } from './featureStore.ts';

export class FeatureRegistry {
  private readonly config: FeatureRegistryConfig;
  private readonly logger: FeatureLogger;
  private readonly store: FeatureStore;
  private readonly registry: Map<string, EngineeredFeatures>;

  constructor(config: FeatureRegistryConfig) {
    this.config = config;
    this.logger = new FeatureLogger();
    this.store = new FeatureStore({
      path: this.config.path,
      type: 'local',
      backupEnabled: this.config.backupEnabled,
      backupInterval: this.config.backupInterval,
    });
    this.registry = new Map();
    this.initializeRegistry();
  }

  private async initializeRegistry(): Promise<void> {
    try {

      for (const version of versions) {

        this.registry.set(version, features);
      }
      this.logger.info(`Initialized feature registry with ${versions.length} versions`);
    } catch (error) {
      this.logger.error('Failed to initialize feature registry', error);
      throw error;
    }
  }

  public async registerFeatures(features: EngineeredFeatures, version: string): Promise<void> {
    try {
      // Validate features;
      if (!this.validateFeatures(features)) {
        throw new Error('Invalid features');
      }

      // Save features to store;
      await this.store.saveFeatures(features, version);

      // Update registry;
      this.registry.set(version, features);

      // Update metadata;
      features.metadata.lastUpdated = new Date().toISOString();

      this.logger.info(`Registered features version ${version}`);
    } catch (error) {
      this.logger.error('Failed to register features', error);
      throw error;
    }
  }

  public async getFeatures(version: string): Promise<EngineeredFeatures> {
    try {
      // Check registry first;

      if (features) {
        return features;
      }

      // Load from store if not in registry;

      this.registry.set(version, loadedFeatures);
      return loadedFeatures;
    } catch (error) {
      this.logger.error('Failed to get features', error);
      throw error;
    }
  }

  public async listVersions(): Promise<string[]> {
    try {
      return Array.from(this.registry.keys());
    } catch (error) {
      this.logger.error('Failed to list versions', error);
      throw error;
    }
  }

  public async getVersionInfo(version: string): Promise<any> {
    try {
      return await this.store.getVersionInfo(version);
    } catch (error) {
      this.logger.error('Failed to get version info', error);
      throw error;
    }
  }

  public async deleteVersion(version: string): Promise<void> {
    try {
      // Delete from store;
      await this.store.deleteVersion(version);

      // Remove from registry;
      this.registry.delete(version);

      this.logger.info(`Deleted features version ${version}`);
    } catch (error) {
      this.logger.error('Failed to delete version', error);
      throw error;
    }
  }

  public async cleanupOldVersions(maxVersions: number): Promise<void> {
    try {
      await this.store.cleanupOldVersions(maxVersions);
      await this.initializeRegistry(); // Reload registry after cleanup;
    } catch (error) {
      this.logger.error('Failed to cleanup old versions', error);
      throw error;
    }
  }

  private validateFeatures(features: EngineeredFeatures): boolean {
    try {
      // Check required fields;
      if (
        !features.numerical ||
        !features.categorical ||
        !features.temporal ||
        !features.derived ||
        !features.metadata;
      ) {
        return false;
      }

      // Check metadata;

      if (
        !metadata.featureNames ||
        !metadata.featureTypes ||
        !metadata.scalingParams ||
        !metadata.encodingMaps;
      ) {
        return false;
      }

      // Check feature types;
      for (const [feature, type] of Object.entries(metadata.featureTypes)) {
        if (!['numerical', 'categorical', 'temporal', 'derived'].includes(type)) {
          return false;
        }
      }

      // Check scaling parameters;
      for (const [feature, params] of Object.entries(metadata.scalingParams)) {
        if (typeof params.mean !== 'number' || typeof params.std !== 'number' || params.std <= 0) {
          return false;
        }
      }

      return true;
    } catch (error) {
      this.logger.error('Failed to validate features', error);
      return false;
    }
  }

  public async getFeatureStats(version: string): Promise<any> {
    try {

      const stats = {
        numerical: this.calculateNumericalStats(features.numerical),
        categorical: this.calculateCategoricalStats(features.categorical),
        temporal: this.calculateTemporalStats(features.temporal),
        derived: this.calculateDerivedStats(features.derived),
      };

      return stats;
    } catch (error) {
      this.logger.error('Failed to get feature stats', error);
      throw error;
    }
  }

  private calculateNumericalStats(features: Record<string, number[]>): Record<string, any> {
    const stats: Record<string, any> = {};
    for (const [feature, values] of Object.entries(features)) {




      stats[feature] = {
        mean,
        std,
        min,
        max,
        count: values.length,
        missing: values.filter(v => v === null || v === undefined || isNaN(v)).length,
      };
    }
    return stats;
  }

  private calculateCategoricalStats(features: Record<string, string[]>): Record<string, any> {
    const stats: Record<string, any> = {};
    for (const [feature, values] of Object.entries(features)) {

      const valueCounts = values.reduce(
        (acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>
      );

      stats[feature] = {
        uniqueCount: uniqueValues.size,
        valueCounts,
        count: values.length,
        missing: values.filter(v => v === null || v === undefined || v === '').length,
      };
    }
    return stats;
  }

  private calculateTemporalStats(features: Record<string, number[]>): Record<string, any> {
    const stats: Record<string, any> = {};
    for (const [feature, values] of Object.entries(features)) {


      // Calculate trend;


      // Calculate seasonality;

      stats[feature] = {
        mean,
        std,
        trend: {
          slope,
          direction: slope > 0 ? 'increasing' : slope < 0 ? 'decreasing' : 'stable',
        },
        seasonality,
        count: values.length,
        missing: values.filter(v => v === null || v === undefined || isNaN(v)).length,
      };
    }
    return stats;
  }

  private calculateDerivedStats(features: Record<string, number[]>): Record<string, any> {
    const stats: Record<string, any> = {};
    for (const [feature, values] of Object.entries(features)) {


      stats[feature] = {
        mean,
        std,
        count: values.length,
        missing: values.filter(v => v === null || v === undefined || isNaN(v)).length,
      };
    }
    return stats;
  }

  private calculateLinearRegressionSlope(x: number[], y: number[]): number {





    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  }

  private calculateSeasonality(values: number[]): {
    hasSeasonality: boolean;
    period: number;
    strength: number;
  } {

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
      strength: maxAutocorr,
    };
  }

  private calculateAutocorrelation(values: number[], lag: number): number {

    const numerator = 0;
    const denominator = 0;

    for (const i = 0; i < values.length - lag; i++) {
      numerator += (values[i] - mean) * (values[i + lag] - mean);
      denominator += Math.pow(values[i] - mean, 2);
    }

    return numerator / denominator;
  }
}
