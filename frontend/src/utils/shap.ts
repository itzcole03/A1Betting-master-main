// SHAP utility functions for model explainability;
import { ShapVector } from '@/types/models.js';

/**
 * Calculate SHAP values for given features;
 * This is a simplified implementation for demonstration;
 */
export function calculateShap(features: Record<string, number>, modelType: string = 'default'): ShapVector {
  const shapValues: ShapVector = {};
  
  // Simple SHAP calculation based on feature importance;

  for (const [key, value] of Object.entries(features)) {
    // Normalize by total feature importance;
    // Production: Should use real SHAP calculation, not randomized values;

    shapValues[key] = baseImportance; // No noise in production;
  }
  
  return shapValues;
}

/**
 * Aggregate multiple SHAP vectors into a single vector;
 */
export function aggregateShapValues(shapVectors: ShapVector[]): ShapVector {
  if (shapVectors.length === 0) return {};
  
  const aggregated: ShapVector = {};

  // Collect all unique keys;
  shapVectors.forEach(shap => {
    Object.keys(shap).forEach(key => allKeys.add(key));
  });
  
  // Calculate average for each key;
  allKeys.forEach(key => {

    aggregated[key] = values.reduce((sum, val) => sum + val, 0) / values.length;
  });
  
  return aggregated;
}

/**
 * Get top N most important features from SHAP values;
 */
export function getTopShapFeatures(shapValues: ShapVector, n: number = 5): Array<{feature: string, importance: number}> {
  return Object.entries(shapValues)
    .map(([feature, importance]) => ({ feature, importance: Math.abs(importance) }))
    .sort((a, b) => b.importance - a.importance)
    .slice(0, n);
}
