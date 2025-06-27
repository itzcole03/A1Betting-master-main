import { ModelMetadata, ModelVersion, ModelRegistryConfig } from '@/types.ts';
import { FeatureLogger } from '@/services/analytics/featureLogging.ts';
import * as fs from 'fs/promises.ts';
import * as path from 'path.ts';

export class ModelRegistry {
  private config: ModelRegistryConfig;
  private logger: FeatureLogger;
  private models: Map<string, ModelMetadata>;
  private versions: Map<string, ModelVersion[]>;

  constructor(config: ModelRegistryConfig) {
    this.config = config;
    this.logger = new FeatureLogger({});
    this.models = new Map();
    this.versions = new Map();
    this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.config.storagePath, { recursive: true });
      await this.loadModels();
    } catch (error) {
      this.logger.error('Failed to initialize model registry', error);
      throw error;
    }
  }

  private async loadModels(): Promise<void> {
    try {

      for (const file of files) {
        if (file.endsWith('.json')) {


          this.models.set(model.id, model);
          await this.loadVersions(model.id);
        }
      }
    } catch (error) {
      this.logger.error('Failed to load models', error);
      throw error;
    }
  }

  private async loadVersions(modelId: string): Promise<void> {
    try {


      const versions: ModelVersion[] = [];

      for (const file of files) {
        if (file.endsWith('.json')) {

          versions.push(JSON.parse(content) as ModelVersion);
        }
      }

      this.versions.set(modelId, versions);
    } catch (error) {
      this.logger.error(`Failed to load versions for model ${modelId}`, error);
      throw error;
    }
  }

  async registerModel(metadata: ModelMetadata): Promise<string> {
    try {

      await fs.mkdir(modelPath, { recursive: true });
      await fs.mkdir(path.join(modelPath, 'versions'), { recursive: true });

      await fs.writeFile(path.join(modelPath, 'metadata.json'), JSON.stringify(metadata, null, 2));

      this.models.set(metadata.id, metadata);
      this.versions.set(metadata.id, []);

      this.logger.info(`Registered new model: ${metadata.id}`);
      return metadata.id;
    } catch (error) {
      this.logger.error('Failed to register model', error);
      throw error;
    }
  }

  async getModel(modelId: string): Promise<ModelMetadata> {

    if (!model) {
      throw new Error(`Model not found: ${modelId}`);
    }
    return model;
  }

  async updateModel(modelId: string, version: ModelVersion): Promise<void> {
    try {

      versions.push(version);

      // Maintain version limit;
      if (versions.length > this.config.maxVersions) {
        versions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        versions.splice(this.config.maxVersions);
      }

      await fs.writeFile(
        path.join(this.config.storagePath, modelId, 'versions', `${version.version}.json`),
        JSON.stringify(version, null, 2)
      );

      this.versions.set(modelId, versions);
      this.logger.info(`Updated model ${modelId} with version ${version.version}`);
    } catch (error) {
      this.logger.error(`Failed to update model ${modelId}`, error);
      throw error;
    }
  }

  async getModelVersions(modelId: string): Promise<ModelVersion[]> {
    return this.versions.get(modelId) || [];
  }

  async getModelMetadata(modelId: string): Promise<ModelMetadata> {

    if (!model) {
      throw new Error(`Model not found: ${modelId}`);
    }
    return model;
  }

  async updateModelMetadata(modelId: string, metadata: Partial<ModelMetadata>): Promise<void> {
    try {


      await fs.writeFile(
        path.join(this.config.storagePath, modelId, 'metadata.json'),
        JSON.stringify(updatedModel, null, 2)
      );

      this.models.set(modelId, updatedModel);
      this.logger.info(`Updated metadata for model ${modelId}`);
    } catch (error) {
      this.logger.error(`Failed to update metadata for model ${modelId}`, error);
      throw error;
    }
  }

  async updateMetrics(modelId: string, evaluation: any): Promise<void> {
    try {

      if (!versions || versions.length === 0) {
        throw new Error(`No versions found for model ${modelId}`);
      }

      latestVersion.metrics = evaluation;

      await fs.writeFile(
        path.join(this.config.storagePath, modelId, 'versions', `${latestVersion.version}.json`),
        JSON.stringify(latestVersion, null, 2)
      );

      this.logger.info(`Updated metrics for model ${modelId}`);
    } catch (error) {
      this.logger.error(`Failed to update metrics for model ${modelId}`, error);
      throw error;
    }
  }

  async deleteModel(modelId: string): Promise<void> {
    try {

      await fs.rm(modelPath, { recursive: true });

      this.models.delete(modelId);
      this.versions.delete(modelId);

      this.logger.info(`Deleted model ${modelId}`);
    } catch (error) {
      this.logger.error(`Failed to delete model ${modelId}`, error);
      throw error;
    }
  }

  async backup(): Promise<void> {
    if (!this.config.backupEnabled) return;

    try {

      await fs.mkdir(backupPath, { recursive: true });

      for (const [modelId, model] of this.models.entries()) {


        await fs.mkdir(backupModelPath, { recursive: true });
        await fs.cp(modelPath, backupModelPath, { recursive: true });
      }

      this.logger.info('Created model registry backup');
    } catch (error) {
      this.logger.error('Failed to create backup', error);
      throw error;
    }
  }
}
