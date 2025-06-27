import { ModelFactory } from '@/factory/ModelFactory.ts';
import { ModelConfig } from '@/models/BaseModel.ts';
import { AdvancedEnsembleConfig } from '@/models/AdvancedEnsembleModel.ts';
import {
  createModelConfig,
  validateModelConfig,
  validateRegularModelConfig,
} from '@/config/modelConfig.ts';
import { ModelRegistry, ModelType } from '@/registry/ModelRegistry.ts';

export class ModelManager {
  private static instance: ModelManager;
  private modelFactory: ModelFactory;
  private modelRegistry: ModelRegistry;
  private activeModels: Set<string> = new Set();
  private modelMetrics: Map<string, any> = new Map();

  private constructor() {
    this.modelFactory = ModelFactory.getInstance();
    this.modelRegistry = ModelRegistry.getInstance();
  }

  static getInstance(): ModelManager {
    if (!ModelManager.instance) {
      ModelManager.instance = new ModelManager();
    }
    return ModelManager.instance;
  }

  async initializeModel(
    modelId: string,
    type: ModelType,
    config?: Partial<ModelConfig | AdvancedEnsembleConfig>
  ): Promise<void> {
    try {
      // Get default configuration from registry;

      // Merge with provided config if any;

      // Validate configuration based on model type;
      if (type === 'ensemble') {
        validateModelConfig(finalConfig as AdvancedEnsembleConfig);
      } else {
        validateRegularModelConfig(finalConfig as ModelConfig);
      }

      // Create model using factory;
      await this.modelFactory.createModel(finalConfig, modelId);
      this.activeModels.add(modelId);

      // console statement removed
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async trainModel(modelId: string, data: any): Promise<void> {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    try {
      await this.modelFactory.trainModel(modelId, data);
      // console statement removed
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async predict(modelId: string, input: any): Promise<any> {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    try {
      return await this.modelFactory.predict(modelId, input);
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async evaluateModel(modelId: string, data: any): Promise<any> {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    try {

      this.modelMetrics.set(modelId, metrics);
      return metrics;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async updateModel(modelId: string, update: any): Promise<void> {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    try {
      await this.modelFactory.updateModel(modelId, update);
      // console statement removed
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async saveModel(modelId: string, path: string): Promise<void> {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    try {
      await this.modelFactory.saveModel(modelId, path);
      // console statement removed
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async loadModel(modelId: string, path: string): Promise<void> {
    try {
      await this.modelFactory.loadModel(modelId, path);
      this.activeModels.add(modelId);
      // console statement removed
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  deactivateModel(modelId: string): void {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    this.activeModels.delete(modelId);
    this.modelMetrics.delete(modelId);
    // console statement removed
  }

  getActiveModels(): string[] {
    return Array.from(this.activeModels);
  }

  getModelMetrics(modelId: string): any {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    return this.modelMetrics.get(modelId);
  }

  isModelActive(modelId: string): boolean {
    return this.activeModels.has(modelId);
  }

  getModelInfo(modelId: string): any {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    return this.modelFactory.getModelInfo(modelId);
  }

  isModelTrained(modelId: string): boolean {
    if (!this.activeModels.has(modelId)) {
      throw new Error(`Model ${modelId} is not active`);
    }

    return this.modelFactory.isModelTrained(modelId);
  }

  getAvailableModelTypes(): ModelType[] {
    return this.modelRegistry.getAvailableModelTypes();
  }

  getModelTypeInfo(type: ModelType): any {
    return this.modelRegistry.getModelTypeInfo(type);
  }
}
