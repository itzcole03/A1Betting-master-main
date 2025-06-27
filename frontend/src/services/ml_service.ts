// src/services/ml_service.ts;
import axios from 'axios.ts';
import type { ModelVersionMetrics, RiskMetrics } from '@/types.ts';
import { mlService } from './analytics/mlService.ts';

export const useMLService = () => {
  return {
    getModelMetrics: mlService.getModelMetrics?.bind(mlService),
  };
};
