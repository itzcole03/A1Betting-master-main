# A1Betting API Documentation

Generated on: 2025-06-27 03:38:51

## Overview

This document describes the REST API endpoints and data models for the A1Betting platform.

## Base URL

```
http://localhost:5000
```

## Authentication

Most endpoints require authentication. Include the Authorization header with your requests:

```
Authorization: Bearer <your-token>
```

---

# API Endpoints

---

# Data Models


## AccuracyOptimizationRequest

**File:** `backend\main_enhanced.py:770`

**Description:**
Accuracy optimization request model

**Example JSON:**
```json
{
}
```


## AccuracyOptimizationRequest

**File:** `backend\main_enhanced.py:774`

**Description:**
Accuracy optimization request model

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `strategy` | `AccuracyOptimizationStrategy` | ✗ | Optimization strategy |
| `target_accuracy` | `float` | ✗ | Target accuracy level |
| `max_iterations` | `int` | ✗ | Maximum optimization iterations |
| `ensemble_strategy` | `EnsembleStrategy` | ✗ | Ensemble strategy |
| `weight_optimization` | `WeightOptimizationMethod` | ✗ | Weight optimization method |

**Example JSON:**
```json
{
  "strategy": "value",
  "target_accuracy": 123.45,
  "max_iterations": 123,
  "ensemble_strategy": "value",
  "weight_optimization": "value"
}
```


## AnalysisRequest

**File:** `backend\api_integration.py:199`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `playerId` | `str` | ✓ | - |
| `statType` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "playerId": "string",
  "statType": "string",
  "line": 123.45
}
```


## AnalysisRequest

**File:** `backend\sports_expert_api.py:182`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `playerId` | `str` | ✓ | - |
| `statType` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "playerId": "string",
  "statType": "string",
  "line": 123.45
}
```


## AnalysisResponse

**File:** `backend\api_integration.py:205`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `recommendation` | `str` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `reasoning` | `str` | ✓ | - |
| `expectedValue` | `float` | ✓ | - |
| `volume` | `int` | ✓ | - |
| `oddsExplanation` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "recommendation": "string",
  "confidence": 123,
  "reasoning": "string",
  "expectedValue": 123.45,
  "volume": 123,
  "oddsExplanation": "string"
}
```


## AnalysisResponse

**File:** `backend\sports_expert_api.py:188`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `recommendation` | `str` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `reasoning` | `str` | ✓ | - |
| `expectedValue` | `float` | ✓ | - |
| `volume` | `int` | ✓ | - |
| `oddsExplanation` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "recommendation": "string",
  "confidence": 123,
  "reasoning": "string",
  "expectedValue": 123.45,
  "volume": 123,
  "oddsExplanation": "string"
}
```


## ArbitrageOpportunity

**File:** `backend\main.py:107`

**Description:**
Arbitrage opportunity model

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `event` | `str` | ✓ | - |
| `bookmaker_a` | `str` | ✓ | - |
| `bookmaker_b` | `str` | ✓ | - |
| `odds_a` | `float` | ✓ | - |
| `odds_b` | `float` | ✓ | - |
| `profit_margin` | `float` | ✓ | - |
| `required_stake` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "sport": "string",
  "event": "string",
  "bookmaker_a": "string",
  "bookmaker_b": "string",
  "odds_a": 123.45,
  "odds_b": 123.45,
  "profit_margin": 123.45,
  "required_stake": 123.45
}
```


## AuthResponse

**File:** `backend\api_integration.py:93`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user` | `UserProfile` | ✓ | - |
| `token` | `str` | ✓ | - |
| `refreshToken` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "user": "value",
  "token": "string",
  "refreshToken": "string"
}
```


## BankrollInfo

**File:** `backend\api_integration.py:220`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `balance` | `float` | ✓ | - |
| `totalDeposits` | `float` | ✓ | - |
| `totalWithdrawals` | `float` | ✓ | - |
| `totalWins` | `float` | ✓ | - |
| `totalLosses` | `float` | ✓ | - |
| `roi` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "balance": 123.45,
  "totalDeposits": 123.45,
  "totalWithdrawals": 123.45,
  "totalWins": 123.45,
  "totalLosses": 123.45,
  "roi": 123.45
}
```


## BehavioralPatternsRequest

**File:** `backend\ultra_accuracy_routes.py:86`

**Description:**
Request model for behavioral pattern analysis

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `features` | `Dict[str, Any]` | ✓ | - |
| `market_data` | `Optional[Dict[str, Any]]` | ✗ | - |

**Example JSON:**
```json
{
  "features": "string",
  "market_data": "string"
}
```


## BettingOpportunity

**File:** `backend\main.py:91`

**Description:**
Betting opportunity model

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `event` | `str` | ✓ | - |
| `market` | `str` | ✓ | - |
| `odds` | `float` | ✓ | - |
| `probability` | `float` | ✓ | - |
| `expected_value` | `float` | ✓ | - |
| `kelly_fraction` | `float` | ✓ | - |
| `confidence` | `float` | ✓ | - |
| `risk_level` | `str` | ✓ | - |
| `recommendation` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "sport": "string",
  "event": "string",
  "market": "string",
  "odds": 123.45,
  "probability": 123.45,
  "expected_value": 123.45,
  "kelly_fraction": 123.45,
  "confidence": 123.45,
  "risk_level": "string",
  "recommendation": "string"
}
```


## ChatRequest

**File:** `backend\api_integration.py:263`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | `str` | ✓ | - |
| `context` | `Optional[Dict[str, str]]` | ✗ | - |

**Example JSON:**
```json
{
  "message": "string",
  "context": "string"
}
```


## ChatResponse

**File:** `backend\api_integration.py:268`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `response` | `str` | ✓ | - |
| `confidence` | `Optional[int]` | ✗ | - |
| `suggestions` | `Optional[List[str]]` | ✗ | - |

**Example JSON:**
```json
{
  "response": "string",
  "confidence": 123,
  "suggestions": "string"
}
```


## DefaultModelResponse

**File:** `backend\llm_routes.py:211`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `default_model` | `Optional[str]` | ✗ | Current default LLM model override |

**Example JSON:**
```json
{
  "default_model": "string"
}
```


## EmbedRequest

**File:** `backend\llm_routes.py:72`

**Description:**
Request model for embedding multiple texts

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `texts` | `List[str]` | ✗ | List of texts to embed |

**Example JSON:**
```json
{
  "texts": "string"
}
```


## EmbedResponse

**File:** `backend\llm_routes.py:78`

**Description:**
Response model containing embeddings

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `embeddings` | `List[List[float]]` | ✗ | List of embeddings for each text |

**Example JSON:**
```json
{
  "embeddings": 123.45
}
```


## EnhancedPrediction

**File:** `backend\main_complete.py:78`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `event` | `str` | ✓ | - |
| `prediction` | `str` | ✓ | - |
| `confidence` | `float` | ✓ | - |
| `odds` | `float` | ✓ | - |
| `expected_value` | `float` | ✓ | - |
| `timestamp` | `str` | ✓ | - |
| `model_version` | `str` | ✓ | - |
| `features` | `Dict[str, float]` | ✓ | - |
| `shap_values` | `Optional[Dict[str, float]]` | ✗ | - |
| `explanation` | `Optional[str]` | ✗ | - |
| `risk_assessment` | `str` | ✓ | - |
| `recommendation` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "sport": "string",
  "event": "string",
  "prediction": "string",
  "confidence": 123.45,
  "odds": 123.45,
  "expected_value": 123.45,
  "timestamp": "string",
  "model_version": "string",
  "features": "string",
  "shap_values": "string",
  "explanation": "string",
  "risk_assessment": "string",
  "recommendation": "string"
}
```


## EnhancedPredictionRequest

**File:** `backend\enhanced_revolutionary_api.py:28`

**Description:**
Enhanced request model for revolutionary prediction

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✗ | Unique event identifier |
| `sport` | `str` | ✗ | Sport type |
| `features` | `Dict[str, Any]` | ✗ | Input features |
| `enable_neuromorphic` | `bool` | ✗ | Enable full Hodgkin-Huxley neuromorphic networks |
| `neuromorphic_timesteps` | `int` | ✗ | Number of temporal simulation steps |
| `enable_mamba` | `bool` | ✗ | Enable real Mamba state space models |
| `mamba_sequence_length` | `int` | ✗ | Sequence length for temporal modeling |
| `enable_causal_inference` | `bool` | ✗ | Enable PC algorithm causal discovery |
| `causal_significance_level` | `float` | ✗ | Statistical significance for causal tests |
| `enable_topological` | `bool` | ✗ | Enable GUDHI persistent homology |
| `topological_max_dimension` | `int` | ✗ | Maximum homological dimension |
| `enable_riemannian` | `bool` | ✗ | Enable Riemannian geometry computations |
| `riemannian_manifold_dim` | `int` | ✗ | Dimensionality of learned manifold |
| `use_gpu` | `bool` | ✗ | Use GPU acceleration if available |
| `numerical_precision` | `str` | ✗ | Numerical precision (float32/float64) |
| `convergence_tolerance` | `float` | ✗ | Convergence tolerance for iterative algorithms |
| `context` | `Dict[str, Any]` | ✗ | Additional context |

**Example JSON:**
```json
{
  "event_id": "string",
  "sport": "string",
  "features": "string",
  "enable_neuromorphic": true,
  "neuromorphic_timesteps": 123,
  "enable_mamba": true,
  "mamba_sequence_length": 123,
  "enable_causal_inference": true,
  "causal_significance_level": 123.45,
  "enable_topological": true,
  "topological_max_dimension": 123,
  "enable_riemannian": true,
  "riemannian_manifold_dim": 123,
  "use_gpu": true,
  "numerical_precision": "string",
  "convergence_tolerance": 123.45,
  "context": "string"
}
```


## EnhancedPredictionResponse

**File:** `backend\enhanced_revolutionary_api.py:83`

**Description:**
Enhanced response model with full mathematical rigor

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✓ | - |
| `strategy_used` | `str` | ✓ | - |
| `base_prediction` | `float` | ✓ | - |
| `neuromorphic_enhancement` | `float` | ✓ | - |
| `mamba_temporal_refinement` | `float` | ✓ | - |
| `causal_adjustment` | `float` | ✓ | - |
| `topological_smoothing` | `float` | ✓ | - |
| `riemannian_projection` | `float` | ✓ | - |
| `final_prediction` | `float` | ✓ | - |
| `neuromorphic_metrics` | `Dict[str, Any]` | ✓ | - |
| `mamba_metrics` | `Dict[str, Any]` | ✓ | - |
| `causal_metrics` | `Dict[str, Any]` | ✓ | - |
| `topological_metrics` | `Dict[str, Any]` | ✓ | - |
| `riemannian_metrics` | `Dict[str, Any]` | ✓ | - |
| `riemannian_curvature` | `float` | ✓ | - |
| `persistent_betti_numbers` | `Dict[str, int]` | ✓ | - |
| `causal_graph_structure` | `Dict[str, List[str]]` | ✓ | - |
| `mamba_eigenvalue_spectrum` | `List[float]` | ✓ | - |
| `neuromorphic_spike_statistics` | `Dict[str, float]` | ✓ | - |
| `topological_persistence_barcode` | `List[List[float]]` | ✓ | - |
| `convergence_rate` | `float` | ✓ | - |
| `stability_margin` | `float` | ✓ | - |
| `lyapunov_exponent` | `float` | ✓ | - |
| `mathematical_guarantees` | `Dict[str, bool]` | ✓ | - |
| `actual_complexity` | `Dict[str, Any]` | ✓ | - |
| `runtime_analysis` | `Dict[str, float]` | ✓ | - |
| `memory_usage` | `Dict[str, float]` | ✓ | - |
| `prediction_confidence` | `float` | ✓ | - |
| `uncertainty_bounds` | `List[float]` | ✓ | - |
| `confidence_intervals` | `Dict[str, List[float]]` | ✓ | - |
| `total_processing_time` | `float` | ✓ | - |
| `component_processing_times` | `Dict[str, float]` | ✓ | - |
| `timestamp` | `str` | ✓ | - |
| `numerical_stability` | `Dict[str, bool]` | ✓ | - |
| `convergence_diagnostics` | `Dict[str, Any]` | ✓ | - |
| `theoretical_bounds_satisfied` | `bool` | ✓ | - |

**Example JSON:**
```json
{
  "event_id": "string",
  "strategy_used": "string",
  "base_prediction": 123.45,
  "neuromorphic_enhancement": 123.45,
  "mamba_temporal_refinement": 123.45,
  "causal_adjustment": 123.45,
  "topological_smoothing": 123.45,
  "riemannian_projection": 123.45,
  "final_prediction": 123.45,
  "neuromorphic_metrics": "string",
  "mamba_metrics": "string",
  "causal_metrics": "string",
  "topological_metrics": "string",
  "riemannian_metrics": "string",
  "riemannian_curvature": 123.45,
  "persistent_betti_numbers": "string",
  "causal_graph_structure": "string",
  "mamba_eigenvalue_spectrum": 123.45,
  "neuromorphic_spike_statistics": "string",
  "topological_persistence_barcode": 123.45,
  "convergence_rate": 123.45,
  "stability_margin": 123.45,
  "lyapunov_exponent": 123.45,
  "mathematical_guarantees": "string",
  "actual_complexity": "string",
  "runtime_analysis": "string",
  "memory_usage": "string",
  "prediction_confidence": 123.45,
  "uncertainty_bounds": 123.45,
  "confidence_intervals": "string",
  "total_processing_time": 123.45,
  "component_processing_times": "string",
  "timestamp": "string",
  "numerical_stability": "string",
  "convergence_diagnostics": "string",
  "theoretical_bounds_satisfied": true
}
```


## ExpandedPlayerProp

**File:** `backend\api_integration.py:121`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `stat` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |
| `overOdds` | `int` | ✓ | - |
| `underOdds` | `int` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `aiRecommendation` | `str` | ✓ | - |
| `reasoning` | `str` | ✓ | - |
| `pickType` | `Optional[str]` | ✗ | - |
| `expectedValue` | `float` | ✓ | - |
| `volume` | `int` | ✓ | - |
| `oddsExplanation` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "stat": "string",
  "line": 123.45,
  "overOdds": 123,
  "underOdds": 123,
  "confidence": 123,
  "aiRecommendation": "string",
  "reasoning": "string",
  "pickType": "string",
  "expectedValue": 123.45,
  "volume": 123,
  "oddsExplanation": "string"
}
```


## ExplainBetRequest

**File:** `backend\llm_routes.py:136`

**Description:**
Request model for natural-language bet explanations

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `features` | `Dict[str, float]` | ✗ | Input features for prediction to explain |

**Example JSON:**
```json
{
  "features": "string"
}
```


## ExplainBetResponse

**File:** `backend\llm_routes.py:144`

**Description:**
Response model with natural language explanation

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `explanation` | `str` | ✗ | Natural language rationale for prediction |

**Example JSON:**
```json
{
  "explanation": "string"
}
```


## FeatureEngineeringRequest

**File:** `backend\enhanced_api_routes.py:86`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `data` | `Dict[str, List[float]]` | ✗ | Input data for feature engineering |
| `feature_types` | `List[str]` | ✗ | Types of features to engineer |
| `enable_wavelet_transforms` | `bool` | ✗ | Enable wavelet transforms |
| `enable_manifold_learning` | `bool` | ✗ | Enable manifold learning |
| `enable_information_theory` | `bool` | ✗ | Enable information theory features |
| `enable_graph_features` | `bool` | ✗ | Enable graph-based features |
| `target_dimensionality` | `Optional[int]` | ✗ | Target dimensionality for reduction |

**Example JSON:**
```json
{
  "data": "string",
  "feature_types": "string",
  "enable_wavelet_transforms": true,
  "enable_manifold_learning": true,
  "enable_information_theory": true,
  "enable_graph_features": true,
  "target_dimensionality": 123
}
```


## FeatureEngineeringRequest

**File:** `backend\main_enhanced.py:792`

**Description:**
Feature engineering request model

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `raw_data` | `Dict[str, Any]` | ✗ | Raw input data |
| `strategies` | `List[FeatureEngineeringStrategy]` | ✗ | Feature engineering strategies |
| `target_variable` | `Optional[str]` | ✗ | Target variable name |
| `context` | `Dict[str, Any]` | ✗ | Engineering context |

**Example JSON:**
```json
{
  "raw_data": "string",
  "strategies": [],
  "target_variable": "string",
  "context": "string"
}
```


## GenerateRequest

**File:** `backend\llm_routes.py:93`

**Description:**
Request model for text generation

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | `str` | ✗ | Text prompt to generate from |
| `max_tokens` | `int` | ✗ | Maximum tokens to generate |
| `temperature` | `float` | ✗ | Sampling temperature |

**Example JSON:**
```json
{
  "prompt": "string",
  "max_tokens": 123,
  "temperature": 123.45
}
```


## GenerateResponse

**File:** `backend\llm_routes.py:101`

**Description:**
Response model containing generated text

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | `str` | ✗ | Generated text response |

**Example JSON:**
```json
{
  "text": "string"
}
```


## HealthCheckResponse

**File:** `backend\enhanced_api_routes.py:54`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `str` | ✓ | - |
| `timestamp` | `str` | ✓ | - |
| `services` | `Dict[str, bool]` | ✓ | - |
| `mathematical_engines` | `Dict[str, bool]` | ✓ | - |
| `version` | `str` | ✓ | - |
| `uptime` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "status": "string",
  "timestamp": "string",
  "services": "string",
  "mathematical_engines": "string",
  "version": "string",
  "uptime": 123.45
}
```


## HealthCheckResponse

**File:** `backend\main.py:79`

**Description:**
Health check response model

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `str` | ✗ | Overall system status |
| `timestamp` | `datetime` | ✗ | Health check timestamp |
| `version` | `str` | ✗ | Application version |
| `uptime` | `float` | ✗ | System uptime in seconds |
| `services` | `Dict[str, str]` | ✗ | Service statuses |

**Example JSON:**
```json
{
  "status": "string",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "string",
  "uptime": 123.45,
  "services": "string"
}
```


## HealthResponse

**File:** `backend\simple_backend.py:87`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `str` | ✓ | - |
| `timestamp` | `datetime` | ✓ | - |
| `version` | `str` | ✓ | - |
| `uptime` | `float` | ✓ | - |
| `services` | `Dict[str, str]` | ✓ | - |

**Example JSON:**
```json
{
  "status": "string",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "string",
  "uptime": 123.45,
  "services": "string"
}
```


## LLMHealthResponse

**File:** `backend\llm_routes.py:267`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | `str` | ✓ | - |
| `provider` | `str` | ✓ | - |
| `endpoint` | `str` | ✓ | - |
| `models` | `List[str]` | ✓ | - |
| `last_refresh` | `float` | ✓ | - |
| `models_age_seconds` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "status": "string",
  "provider": "string",
  "endpoint": "string",
  "models": "string",
  "last_refresh": 123.45,
  "models_age_seconds": 123.45
}
```


## LineupRequest

**File:** `backend\api_integration.py:158`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `picks` | `List[SelectedPick]` | ✓ | - |

**Example JSON:**
```json
{
  "picks": []
}
```


## LineupRequest

**File:** `backend\sports_expert_api.py:150`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `picks` | `List[SelectedPick]` | ✓ | - |

**Example JSON:**
```json
{
  "picks": []
}
```


## LineupResponse

**File:** `backend\api_integration.py:162`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `totalOdds` | `float` | ✓ | - |
| `potentialPayout` | `float` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `isValid` | `bool` | ✓ | - |
| `violations` | `Optional[List[str]]` | ✗ | - |

**Example JSON:**
```json
{
  "id": "string",
  "totalOdds": 123.45,
  "potentialPayout": 123.45,
  "confidence": 123,
  "isValid": true,
  "violations": "string"
}
```


## LineupResponse

**File:** `backend\sports_expert_api.py:154`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `totalOdds` | `float` | ✓ | - |
| `potentialPayout` | `float` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `isValid` | `bool` | ✓ | - |
| `violations` | `Optional[List[str]]` | ✗ | - |

**Example JSON:**
```json
{
  "id": "string",
  "totalOdds": 123.45,
  "potentialPayout": 123.45,
  "confidence": 123,
  "isValid": true,
  "violations": "string"
}
```


## LivePrediction

**File:** `backend\api_integration.py:189`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `playerId` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `predictedValue` | `float` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `factors` | `List[PredictionFactor]` | ✓ | - |
| `timestamp` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "playerId": "string",
  "sport": "string",
  "predictedValue": 123.45,
  "confidence": 123,
  "factors": [],
  "timestamp": "string"
}
```


## LivePrediction

**File:** `backend\sports_expert_api.py:172`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `playerId` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `predictedValue` | `float` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `factors` | `List[PredictionFactor]` | ✓ | - |
| `timestamp` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "playerId": "string",
  "sport": "string",
  "predictedValue": 123.45,
  "confidence": 123,
  "factors": [],
  "timestamp": "string"
}
```


## LogEntry

**File:** `backend\admin_api.py:12`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | `str` | ✓ | - |
| `level` | `str` | ✓ | - |
| `message` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "timestamp": "string",
  "level": "string",
  "message": "string"
}
```


## LoginRequest

**File:** `backend\api_integration.py:65`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `str` | ✓ | - |
| `password` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "email": "string",
  "password": "string"
}
```


## LoginRequest

**File:** `backend\sports_expert_api.py:92`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `str` | ✓ | - |
| `password` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "email": "string",
  "password": "string"
}
```


## MarketAnalysis

**File:** `backend\prediction_engine.py:103`

**Description:**
Market analysis and arbitrage opportunities.

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `market_efficiency` | `float` | ✗ | Market efficiency score |
| `arbitrage_opportunities` | `List[Dict[str, Any]]` | ✗ | - |
| `value_bets` | `List[Dict[str, Any]]` | ✗ | - |
| `market_sentiment` | `str` | ✗ | Overall market sentiment |
| `liquidity_score` | `float` | ✗ | Market liquidity assessment |

**Example JSON:**
```json
{
  "market_efficiency": 123.45,
  "arbitrage_opportunities": "string",
  "value_bets": "string",
  "market_sentiment": "string",
  "liquidity_score": 123.45
}
```


## MarketEfficiencyRequest

**File:** `backend\ultra_accuracy_routes.py:80`

**Description:**
Request model for market efficiency analysis

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `market_data` | `Dict[str, Any]` | ✓ | - |

**Example JSON:**
```json
{
  "market_data": "string"
}
```


## MarketTrend

**File:** `backend\api_integration.py:254`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sport` | `str` | ✓ | - |
| `statType` | `str` | ✓ | - |
| `trend` | `str` | ✓ | - |
| `confidence` | `float` | ✓ | - |
| `timeframe` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "sport": "string",
  "statType": "string",
  "trend": "string",
  "confidence": 123.45,
  "timeframe": "string"
}
```


## MathematicalAnalysisRequest

**File:** `backend\enhanced_revolutionary_api.py:140`

**Description:**
Request for deep mathematical analysis

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prediction_data` | `List[Dict[str, Any]]` | ✗ | Historical prediction data |
| `analysis_depth` | `str` | ✗ | Analysis depth (basic/comprehensive/research) |
| `include_stability_analysis` | `bool` | ✗ | Include dynamical systems stability analysis |
| `include_convergence_analysis` | `bool` | ✗ | Include convergence rate analysis |
| `include_sensitivity_analysis` | `bool` | ✗ | Include parameter sensitivity analysis |
| `include_robustness_analysis` | `bool` | ✗ | Include robustness to perturbations |
| `verify_theoretical_guarantees` | `bool` | ✗ | Verify theoretical guarantees |
| `check_mathematical_consistency` | `bool` | ✗ | Check mathematical consistency |

**Example JSON:**
```json
{
  "prediction_data": "string",
  "analysis_depth": "string",
  "include_stability_analysis": true,
  "include_convergence_analysis": true,
  "include_sensitivity_analysis": true,
  "include_robustness_analysis": true,
  "verify_theoretical_guarantees": true,
  "check_mathematical_consistency": true
}
```


## ModelAnalysisRequest

**File:** `backend\revolutionary_api.py:103`

**Description:**
Request for advanced model analysis

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prediction_data` | `List[Dict[str, Any]]` | ✗ | Historical prediction data |
| `analysis_type` | `str` | ✗ | Type of analysis |
| `include_manifold_analysis` | `bool` | ✗ | Include manifold analysis |
| `include_causal_discovery` | `bool` | ✗ | Include causal structure discovery |
| `include_topological_features` | `bool` | ✗ | Include topological feature analysis |

**Example JSON:**
```json
{
  "prediction_data": "string",
  "analysis_type": "string",
  "include_manifold_analysis": true,
  "include_causal_discovery": true,
  "include_topological_features": true
}
```


## ModelPrediction

**File:** `backend\prediction_engine.py:68`

**Description:**
Enhanced individual model prediction with comprehensive metrics.

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `model_name` | `str` | ✓ | - |
| `model_type` | `str` | ✗ | Type of model (ensemble, neural, tree, etc.) |
| `value` | `float` | ✗ | Prediction value |
| `probability` | `float` | ✗ | Win probability |
| `confidence` | `float` | ✗ | Model confidence score |
| `performance` | `Dict[str, float]` | ✗ | Model performance metrics |
| `shap_values` | `Dict[str, float]` | ✗ | SHAP feature importance |
| `feature_importance` | `Dict[str, float]` | ✗ | Feature importance scores |
| `prediction_time` | `float` | ✗ | Time taken for prediction (ms) |
| `model_version` | `str` | ✗ | Model version |

**Example JSON:**
```json
{
  "model_name": "string",
  "model_type": "string",
  "value": 123.45,
  "probability": 123.45,
  "confidence": 123.45,
  "performance": "string",
  "shap_values": "string",
  "feature_importance": "string",
  "prediction_time": 123.45,
  "model_version": "string"
}
```


## ModelStatus

**File:** `backend\enhanced_api_routes.py:122`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `name` | `str` | ✓ | - |
| `status` | `str` | ✓ | - |
| `accuracy` | `float` | ✓ | - |
| `last_update` | `str` | ✓ | - |
| `mathematical_properties` | `Dict[str, bool]` | ✓ | - |
| `performance_metrics` | `Dict[str, float]` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "name": "string",
  "status": "string",
  "accuracy": 123.45,
  "last_update": "string",
  "mathematical_properties": "string",
  "performance_metrics": "string"
}
```


## PerformanceAlert

**File:** `backend\monitoring_service.py:50`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `metric_name` | `str` | ✓ | - |
| `threshold` | `float` | ✓ | - |
| `current_value` | `float` | ✓ | - |
| `timestamp` | `datetime` | ✓ | - |
| `severity` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "metric_name": "string",
  "threshold": 123.45,
  "current_value": 123.45,
  "timestamp": "2024-01-01T00:00:00Z",
  "severity": "string"
}
```


## PerformanceData

**File:** `backend\monitoring_service.py:44`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timestamp` | `datetime` | ✓ | - |
| `metrics` | `Dict[str, Dict[str, float]]` | ✓ | - |

**Example JSON:**
```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "metrics": "string"
}
```


## PerformanceMetrics

**File:** `backend\api_integration.py:244`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `totalBets` | `int` | ✓ | - |
| `winRate` | `float` | ✓ | - |
| `averageOdds` | `float` | ✓ | - |
| `totalProfit` | `float` | ✓ | - |
| `bestStreak` | `int` | ✓ | - |
| `currentStreak` | `int` | ✓ | - |
| `roi` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "totalBets": 123,
  "winRate": 123.45,
  "averageOdds": 123.45,
  "totalProfit": 123.45,
  "bestStreak": 123,
  "currentStreak": 123,
  "roi": 123.45
}
```


## PerformanceUpdateRequest

**File:** `backend\ultra_accuracy_routes.py:73`

**Description:**
Request model for updating model performance

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prediction_id` | `str` | ✓ | - |
| `actual_outcome` | `float` | ✗ | Actual outcome (0-1) |

**Example JSON:**
```json
{
  "prediction_id": "string",
  "actual_outcome": 123.45
}
```


## PlayerDetails

**File:** `backend\api_integration.py:136`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `player` | `str` | ✓ | - |
| `team` | `str` | ✓ | - |
| `opponent` | `str` | ✓ | - |
| `position` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `gameTime` | `str` | ✓ | - |
| `seasonStats` | `Dict[str, float]` | ✓ | - |
| `recentForm` | `List[str]` | ✓ | - |
| `props` | `List[ExpandedPlayerProp]` | ✓ | - |

**Example JSON:**
```json
{
  "player": "string",
  "team": "string",
  "opponent": "string",
  "position": "string",
  "sport": "string",
  "gameTime": "string",
  "seasonStats": "string",
  "recentForm": "string",
  "props": []
}
```


## PlayerProp

**File:** `backend\api_integration.py:100`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `player` | `str` | ✓ | - |
| `team` | `str` | ✓ | - |
| `opponent` | `str` | ✓ | - |
| `stat` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |
| `overOdds` | `int` | ✓ | - |
| `underOdds` | `int` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `aiRecommendation` | `str` | ✓ | - |
| `reasoning` | `str` | ✓ | - |
| `trend` | `str` | ✓ | - |
| `recentForm` | `str` | ✓ | - |
| `position` | `Optional[str]` | ✗ | - |
| `sport` | `Optional[str]` | ✗ | - |
| `gameTime` | `Optional[str]` | ✗ | - |
| `pickType` | `Optional[str]` | ✗ | - |
| `trendValue` | `Optional[float]` | ✗ | - |

**Example JSON:**
```json
{
  "id": "string",
  "player": "string",
  "team": "string",
  "opponent": "string",
  "stat": "string",
  "line": 123.45,
  "overOdds": 123,
  "underOdds": 123,
  "confidence": 123,
  "aiRecommendation": "string",
  "reasoning": "string",
  "trend": "string",
  "recentForm": "string",
  "position": "string",
  "sport": "string",
  "gameTime": "string",
  "pickType": "string",
  "trendValue": 123.45
}
```


## PlayerProp

**File:** `backend\sports_expert_api.py:119`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `player` | `str` | ✓ | - |
| `team` | `str` | ✓ | - |
| `opponent` | `str` | ✓ | - |
| `stat` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |
| `overOdds` | `int` | ✓ | - |
| `underOdds` | `int` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `aiRecommendation` | `str` | ✓ | - |
| `reasoning` | `str` | ✓ | - |
| `trend` | `str` | ✓ | - |
| `recentForm` | `str` | ✓ | - |
| `position` | `Optional[str]` | ✗ | - |
| `sport` | `Optional[str]` | ✗ | - |
| `gameTime` | `Optional[str]` | ✗ | - |
| `pickType` | `Optional[str]` | ✗ | - |
| `trendValue` | `Optional[float]` | ✗ | - |

**Example JSON:**
```json
{
  "id": "string",
  "player": "string",
  "team": "string",
  "opponent": "string",
  "stat": "string",
  "line": 123.45,
  "overOdds": 123,
  "underOdds": 123,
  "confidence": 123,
  "aiRecommendation": "string",
  "reasoning": "string",
  "trend": "string",
  "recentForm": "string",
  "position": "string",
  "sport": "string",
  "gameTime": "string",
  "pickType": "string",
  "trendValue": 123.45
}
```


## PredictionFactor

**File:** `backend\api_integration.py:172`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `str` | ✓ | - |
| `weight` | `float` | ✓ | - |
| `value` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "name": "string",
  "weight": 123.45,
  "value": 123.45
}
```


## PredictionFactor

**File:** `backend\sports_expert_api.py:166`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `str` | ✓ | - |
| `weight` | `float` | ✓ | - |
| `value` | `float` | ✓ | - |

**Example JSON:**
```json
{
  "name": "string",
  "weight": 123.45,
  "value": 123.45
}
```


## PredictionModel

**File:** `backend\api_integration.py:178`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `game` | `str` | ✓ | - |
| `prediction` | `float` | ✓ | - |
| `confidence` | `float` | ✓ | - |
| `timestamp` | `str` | ✓ | - |
| `potentialWin` | `float` | ✓ | - |
| `odds` | `float` | ✓ | - |
| `status` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "game": "string",
  "prediction": 123.45,
  "confidence": 123.45,
  "timestamp": "string",
  "potentialWin": 123.45,
  "odds": 123.45,
  "status": "string"
}
```


## PredictionRequest

**File:** `backend\prediction_engine.py:40`

**Description:**
Enhanced request model for prediction endpoint.

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✗ | Unique event identifier |
| `sport` | `str` | ✗ | Sport type (basketball, football, baseball, etc.) |
| `features` | `Dict[str, float]` | ✗ | Input features for prediction |
| `models` | `Optional[List[str]]` | ✗ | Specific models to use (optional) |
| `require_explanations` | `bool` | ✗ | Include detailed SHAP explanations |
| `risk_tolerance` | `float` | ✗ | Risk tolerance (0=conservative, 1=aggressive) |
| `bankroll` | `Optional[float]` | ✗ | Current bankroll for Kelly sizing |
| `metadata` | `Dict[str, Any]` | ✗ | Additional metadata |

**Example JSON:**
```json
{
  "event_id": "string",
  "sport": "string",
  "features": "string",
  "models": "string",
  "require_explanations": true,
  "risk_tolerance": 123.45,
  "bankroll": 123.45,
  "metadata": "string"
}
```


## ProfileUpdateRequest

**File:** `backend\api_integration.py:215`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | `Optional[str]` | ✗ | - |
| `preferences` | `Optional[Dict[str, Any]]` | ✗ | - |

**Example JSON:**
```json
{
  "name": "string",
  "preferences": "string"
}
```


## PropOllamaRequest

**File:** `backend\main_complete.py:63`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | `str` | ✓ | - |
| `context` | `Optional[Dict[str, Any]]` | ✗ | - |
| `analysisType` | `Optional[str]` | ✗ | - |
| `sport` | `Optional[str]` | ✗ | - |

**Example JSON:**
```json
{
  "message": "string",
  "context": "string",
  "analysisType": "string",
  "sport": "string"
}
```


## PropOllamaResponse

**File:** `backend\main_complete.py:69`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | `str` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `suggestions` | `List[str]` | ✓ | - |
| `model_used` | `str` | ✓ | - |
| `response_time` | `int` | ✓ | - |
| `analysis_type` | `str` | ✓ | - |
| `shap_explanation` | `Optional[Dict[str, Any]]` | ✗ | - |

**Example JSON:**
```json
{
  "content": "string",
  "confidence": 123,
  "suggestions": "string",
  "model_used": "string",
  "response_time": 123,
  "analysis_type": "string",
  "shap_explanation": "string"
}
```


## RefreshTokenRequest

**File:** `backend\api_integration.py:76`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `refreshToken` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "refreshToken": "string"
}
```


## RegisterRequest

**File:** `backend\api_integration.py:70`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `str` | ✓ | - |
| `password` | `str` | ✓ | - |
| `name` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```


## RegisterRequest

**File:** `backend\sports_expert_api.py:97`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | `str` | ✓ | - |
| `password` | `str` | ✓ | - |
| `name` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "email": "string",
  "password": "string",
  "name": "string"
}
```


## RevolutionaryPredictionRequest

**File:** `backend\revolutionary_api.py:26`

**Description:**
Request model for revolutionary prediction

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✗ | Unique event identifier |
| `sport` | `str` | ✗ | Sport type |
| `features` | `Dict[str, Any]` | ✗ | Input features |
| `strategy` | `RevolutionaryStrategy` | ✗ | Revolutionary strategy to use |
| `enable_neuromorphic` | `bool` | ✗ | Enable neuromorphic spiking networks |
| `enable_physics_informed` | `bool` | ✗ | Enable physics-informed constraints |
| `enable_causal_inference` | `bool` | ✗ | Enable causal inference with do-calculus |
| `enable_geometric_manifold` | `bool` | ✗ | Enable geometric deep learning |
| `enable_mamba_ssm` | `bool` | ✗ | Enable Mamba state space models |
| `enable_topological` | `bool` | ✗ | Enable topological deep learning |
| `enable_graph_transformer` | `bool` | ✗ | Enable graph transformer attention |
| `context` | `Dict[str, Any]` | ✗ | Additional context |

**Example JSON:**
```json
{
  "event_id": "string",
  "sport": "string",
  "features": "string",
  "strategy": "value",
  "enable_neuromorphic": true,
  "enable_physics_informed": true,
  "enable_causal_inference": true,
  "enable_geometric_manifold": true,
  "enable_mamba_ssm": true,
  "enable_topological": true,
  "enable_graph_transformer": true,
  "context": "string"
}
```


## RevolutionaryPredictionResponse

**File:** `backend\revolutionary_api.py:59`

**Description:**
Response model for revolutionary prediction

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✓ | - |
| `strategy_used` | `str` | ✓ | - |
| `base_prediction` | `float` | ✓ | - |
| `neuromorphic_enhancement` | `float` | ✓ | - |
| `physics_informed_correction` | `float` | ✓ | - |
| `causal_adjustment` | `float` | ✓ | - |
| `geometric_manifold_projection` | `float` | ✓ | - |
| `mamba_temporal_refinement` | `float` | ✓ | - |
| `topological_smoothing` | `float` | ✓ | - |
| `graph_attention_boost` | `float` | ✓ | - |
| `final_prediction` | `float` | ✓ | - |
| `manifold_distance` | `float` | ✓ | - |
| `causal_strength` | `float` | ✓ | - |
| `topological_persistence` | `float` | ✓ | - |
| `neuromorphic_spike_rate` | `float` | ✓ | - |
| `physics_constraint_violation` | `float` | ✓ | - |
| `temporal_coherence` | `float` | ✓ | - |
| `graph_centrality` | `float` | ✓ | - |
| `uncertainty_bounds` | `List[float]` | ✓ | - |
| `confidence_distribution` | `Dict[str, float]` | ✓ | - |
| `strategy_contributions` | `Dict[str, float]` | ✓ | - |
| `computational_complexity` | `Dict[str, Any]` | ✓ | - |
| `emergence_patterns` | `List[str]` | ✓ | - |
| `theoretical_bounds` | `Dict[str, float]` | ✓ | - |
| `processing_time` | `float` | ✓ | - |
| `timestamp` | `str` | ✓ | - |
| `breakthrough_methods_used` | `List[str]` | ✓ | - |
| `accuracy_improvements` | `Dict[str, float]` | ✓ | - |
| `novel_discoveries` | `List[str]` | ✓ | - |

**Example JSON:**
```json
{
  "event_id": "string",
  "strategy_used": "string",
  "base_prediction": 123.45,
  "neuromorphic_enhancement": 123.45,
  "physics_informed_correction": 123.45,
  "causal_adjustment": 123.45,
  "geometric_manifold_projection": 123.45,
  "mamba_temporal_refinement": 123.45,
  "topological_smoothing": 123.45,
  "graph_attention_boost": 123.45,
  "final_prediction": 123.45,
  "manifold_distance": 123.45,
  "causal_strength": 123.45,
  "topological_persistence": 123.45,
  "neuromorphic_spike_rate": 123.45,
  "physics_constraint_violation": 123.45,
  "temporal_coherence": 123.45,
  "graph_centrality": 123.45,
  "uncertainty_bounds": 123.45,
  "confidence_distribution": "string",
  "strategy_contributions": "string",
  "computational_complexity": "string",
  "emergence_patterns": "string",
  "theoretical_bounds": "string",
  "processing_time": 123.45,
  "timestamp": "string",
  "breakthrough_methods_used": "string",
  "accuracy_improvements": "string",
  "novel_discoveries": "string"
}
```


## RiskAssessment

**File:** `backend\prediction_engine.py:89`

**Description:**
Risk assessment and Kelly Criterion calculations.

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `kelly_fraction` | `float` | ✗ | Optimal Kelly fraction |
| `recommended_bet_size` | `float` | ✗ | Recommended bet size |
| `max_bet_size` | `float` | ✗ | Maximum recommended bet size |
| `risk_level` | `str` | ✗ | Risk level (low, medium, high) |
| `expected_value` | `float` | ✗ | Expected value of the bet |
| `variance` | `float` | ✗ | Prediction variance |
| `sharpe_ratio` | `float` | ✗ | Risk-adjusted return ratio |

**Example JSON:**
```json
{
  "kelly_fraction": 123.45,
  "recommended_bet_size": 123.45,
  "max_bet_size": 123.45,
  "risk_level": "string",
  "expected_value": 123.45,
  "variance": 123.45,
  "sharpe_ratio": 123.45
}
```


## RiskAssessmentRequest

**File:** `backend\enhanced_api_routes.py:108`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `portfolio` | `Dict[str, float]` | ✗ | Portfolio positions |
| `market_data` | `Dict[str, List[float]]` | ✗ | Market data for analysis |
| `risk_metrics` | `List[str]` | ✗ | Risk metrics to compute |
| `confidence_level` | `float` | ✗ | Confidence level for risk metrics |
| `time_horizon` | `int` | ✗ | Time horizon in days |

**Example JSON:**
```json
{
  "portfolio": "string",
  "market_data": "string",
  "risk_metrics": "string",
  "confidence_level": 123.45,
  "time_horizon": 123
}
```


## ScenarioRequest

**File:** `backend\llm_routes.py:177`

**Description:**
Request model for generating synthetic betting scenarios

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sport` | `str` | ✗ | Sport type for scenarios |
| `count` | `int` | ✗ | Number of scenarios to generate |
| `context` | `Optional[str]` | ✗ | Optional context or constraints |

**Example JSON:**
```json
{
  "sport": "string",
  "count": 123,
  "context": "string"
}
```


## ScenarioResponse

**File:** `backend\llm_routes.py:185`

**Description:**
Response model containing generated scenarios

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scenarios` | `List[str]` | ✗ | List of generated betting scenarios |

**Example JSON:**
```json
{
  "scenarios": "string"
}
```


## SelectedPick

**File:** `backend\api_integration.py:148`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `propId` | `str` | ✓ | - |
| `choice` | `str` | ✓ | - |
| `player` | `str` | ✓ | - |
| `stat` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `pickType` | `Optional[str]` | ✗ | - |

**Example JSON:**
```json
{
  "propId": "string",
  "choice": "string",
  "player": "string",
  "stat": "string",
  "line": 123.45,
  "confidence": 123,
  "pickType": "string"
}
```


## SelectedPick

**File:** `backend\sports_expert_api.py:140`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `propId` | `str` | ✓ | - |
| `choice` | `str` | ✓ | - |
| `player` | `str` | ✓ | - |
| `stat` | `str` | ✓ | - |
| `line` | `float` | ✓ | - |
| `confidence` | `int` | ✓ | - |
| `pickType` | `Optional[str]` | ✗ | - |

**Example JSON:**
```json
{
  "propId": "string",
  "choice": "string",
  "player": "string",
  "stat": "string",
  "line": 123.45,
  "confidence": 123,
  "pickType": "string"
}
```


## SentimentRequest

**File:** `backend\llm_routes.py:249`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `text` | `str` | ✗ | Text to analyze sentiment for |

**Example JSON:**
```json
{
  "text": "string"
}
```


## SentimentResponse

**File:** `backend\llm_routes.py:253`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sentiment` | `str` | ✗ | Sentiment classification result |

**Example JSON:**
```json
{
  "sentiment": "string"
}
```


## SetDefaultModelRequest

**File:** `backend\llm_routes.py:231`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `model_name` | `Optional[str]` | ✗ | Model name to override or clear override |

**Example JSON:**
```json
{
  "model_name": "string"
}
```


## SystemHealthResponse

**File:** `backend\enhanced_api_routes.py:132`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `models` | `List[ModelStatus]` | ✓ | - |
| `system_health` | `Dict[str, Any]` | ✓ | - |
| `mathematical_foundations` | `Dict[str, Any]` | ✓ | - |

**Example JSON:**
```json
{
  "models": [],
  "system_health": "string",
  "mathematical_foundations": "string"
}
```


## TokenResponse

**File:** `backend\api_integration.py:88`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | `str` | ✓ | - |
| `refreshToken` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "token": "string",
  "refreshToken": "string"
}
```


## TokenResponse

**File:** `backend\sports_expert_api.py:103`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `token` | `str` | ✓ | - |
| `refreshToken` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "token": "string",
  "refreshToken": "string"
}
```


## TokenResponse

**File:** `backend\src\auth.py:32`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `access_token` | `str` | ✓ | - |
| `token_type` | `str` | ✓ | - |
| `user` | `User` | ✓ | - |

**Example JSON:**
```json
{
  "access_token": "string",
  "token_type": "string",
  "user": "value"
}
```


## Transaction

**File:** `backend\api_integration.py:235`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `amount` | `float` | ✓ | - |
| `type` | `str` | ✓ | - |
| `description` | `Optional[str]` | ✗ | - |
| `timestamp` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "amount": 123.45,
  "type": "string",
  "description": "string",
  "timestamp": "string"
}
```


## TransactionRequest

**File:** `backend\api_integration.py:229`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | `float` | ✓ | - |
| `type` | `str` | ✓ | - |
| `description` | `Optional[str]` | ✗ | - |

**Example JSON:**
```json
{
  "amount": 123.45,
  "type": "string",
  "description": "string"
}
```


## UltraAccuracyPredictionRequest

**File:** `backend\main_enhanced.py:746`

**Description:**
Ultra-accuracy prediction request model

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✗ | Unique event identifier |
| `sport` | `str` | ✗ | Sport type |
| `features` | `Dict[str, Any]` | ✗ | Input features for prediction |
| `target_accuracy` | `float` | ✗ | Target accuracy level (0.0-1.0) |
| `optimization_strategy` | `AccuracyOptimizationStrategy` | ✗ | Accuracy optimization strategy |
| `uncertainty_method` | `UncertaintyQuantificationMethod` | ✗ | Uncertainty quantification method |
| `feature_engineering_strategies` | `List[FeatureEngineeringStrategy]` | ✗ | Feature engineering strategies to apply |
| `context` | `Dict[str, Any]` | ✗ | Prediction context |
| `require_explanations` | `bool` | ✗ | Include SHAP explanations |

**Example JSON:**
```json
{
  "event_id": "string",
  "sport": "string",
  "features": "string",
  "target_accuracy": 123.45,
  "optimization_strategy": "value",
  "uncertainty_method": 123,
  "feature_engineering_strategies": [],
  "context": "string",
  "require_explanations": true
}
```


## UltraAccuracyRequest

**File:** `backend\ultra_accuracy_routes.py:31`

**Description:**
Request model for ultra-accuracy prediction

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `features` | `Dict[str, Any]` | ✗ | Input features for prediction |
| `context` | `Optional[str]` | ✗ | Prediction context |
| `market_data` | `Optional[Dict[str, Any]]` | ✗ | Market data for analysis |
| `alternative_data` | `Optional[Dict[str, Any]]` | ✗ | Alternative data sources |
| `target_accuracy` | `Optional[float]` | ✗ | Target accuracy threshold |

**Example JSON:**
```json
{
  "features": "string",
  "context": "string",
  "market_data": "string",
  "alternative_data": "string",
  "target_accuracy": 123.45
}
```


## UltraAccuracyResponse

**File:** `backend\ultra_accuracy_routes.py:47`

**Description:**
Response model for ultra-accuracy prediction

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `success` | `bool` | ✓ | - |
| `prediction_id` | `str` | ✓ | - |
| `final_prediction` | `Optional[float]` | ✗ | - |
| `confidence_score` | `Optional[float]` | ✗ | - |
| `uncertainty_estimate` | `Optional[float]` | ✗ | - |
| `prediction_interval` | `Optional[List[float]]` | ✗ | - |
| `model_consensus` | `Optional[float]` | ✗ | - |
| `market_efficiency_score` | `Optional[float]` | ✗ | - |
| `expected_accuracy` | `Optional[float]` | ✗ | - |
| `alternative_data_signals` | `Optional[Dict[str, float]]` | ✗ | - |
| `behavioral_patterns` | `Optional[Dict[str, Any]]` | ✗ | - |
| `microstructure_analysis` | `Optional[Dict[str, Any]]` | ✗ | - |
| `feature_importance` | `Optional[Dict[str, float]]` | ✗ | - |
| `model_contributions` | `Optional[Dict[str, float]]` | ✗ | - |
| `risk_adjusted_edge` | `Optional[float]` | ✗ | - |
| `optimal_stake_fraction` | `Optional[float]` | ✗ | - |
| `prediction_rationale` | `Optional[str]` | ✗ | - |
| `processing_time` | `Optional[float]` | ✗ | - |
| `data_quality_score` | `Optional[float]` | ✗ | - |
| `market_conditions` | `Optional[Dict[str, Any]]` | ✗ | - |
| `rejection_reason` | `Optional[str]` | ✗ | - |

**Example JSON:**
```json
{
  "success": true,
  "prediction_id": "string",
  "final_prediction": 123.45,
  "confidence_score": 123.45,
  "uncertainty_estimate": 123.45,
  "prediction_interval": 123.45,
  "model_consensus": 123.45,
  "market_efficiency_score": 123.45,
  "expected_accuracy": 123.45,
  "alternative_data_signals": "string",
  "behavioral_patterns": "string",
  "microstructure_analysis": "string",
  "feature_importance": "string",
  "model_contributions": "string",
  "risk_adjusted_edge": 123.45,
  "optimal_stake_fraction": 123.45,
  "prediction_rationale": "string",
  "processing_time": 123.45,
  "data_quality_score": 123.45,
  "market_conditions": "string",
  "rejection_reason": "string"
}
```


## UnifiedPredictionRequest

**File:** `backend\enhanced_api_routes.py:63`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✗ | Unique event identifier |
| `sport` | `str` | ✗ | Sport type |
| `features` | `Dict[str, float]` | ✗ | Input features |
| `include_all_enhancements` | `bool` | ✗ | Include all mathematical enhancements |
| `processing_level` | `str` | ✗ | Processing level: basic, advanced, research_grade, revolutionary |

**Example JSON:**
```json
{
  "event_id": "string",
  "sport": "string",
  "features": "string",
  "include_all_enhancements": true,
  "processing_level": "string"
}
```


## UnifiedPredictionResponse

**File:** `backend\enhanced_api_routes.py:76`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `predictions` | `Dict[str, float]` | ✓ | - |
| `enhanced_revolutionary` | `Dict[str, Any]` | ✓ | - |
| `feature_engineering` | `Dict[str, Any]` | ✓ | - |
| `risk_assessment` | `Dict[str, Any]` | ✓ | - |
| `mathematical_analysis` | `Dict[str, Any]` | ✓ | - |
| `unified_confidence` | `float` | ✓ | - |
| `processing_summary` | `Dict[str, Any]` | ✓ | - |

**Example JSON:**
```json
{
  "predictions": "string",
  "enhanced_revolutionary": "string",
  "feature_engineering": "string",
  "risk_assessment": "string",
  "mathematical_analysis": "string",
  "unified_confidence": 123.45,
  "processing_summary": "string"
}
```


## UnifiedPredictionResponse

**File:** `backend\prediction_engine.py:115`

**Description:**
Ultimate unified prediction response with comprehensive analysis.

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `event_id` | `str` | ✓ | - |
| `sport` | `str` | ✓ | - |
| `final_value` | `float` | ✗ | Final ensemble prediction |
| `win_probability` | `float` | ✗ | Win probability (0-1) |
| `ensemble_confidence` | `float` | ✗ | Overall confidence score |
| `expected_payout` | `float` | ✗ | Expected payout |
| `risk_assessment` | `RiskAssessment` | ✓ | - |
| `market_analysis` | `MarketAnalysis` | ✓ | - |
| `model_breakdown` | `List[ModelPrediction]` | ✓ | - |
| `model_consensus` | `float` | ✗ | Model agreement score |
| `shap_values` | `Dict[str, float]` | ✗ | Aggregated SHAP values |
| `feature_importance` | `Dict[str, float]` | ✗ | Feature importance ranking |
| `explanation` | `str` | ✗ | Human-readable explanation |
| `confidence_intervals` | `Dict[str, Tuple[float, float]]` | ✗ | - |
| `prediction_timestamp` | `datetime` | ✗ | - |
| `processing_time` | `float` | ✗ | Total processing time (ms) |
| `model_versions` | `Dict[str, str]` | ✗ | - |
| `data_quality_score` | `float` | ✗ | Input data quality assessment |

**Example JSON:**
```json
{
  "event_id": "string",
  "sport": "string",
  "final_value": 123.45,
  "win_probability": 123.45,
  "ensemble_confidence": 123.45,
  "expected_payout": 123.45,
  "risk_assessment": "value",
  "market_analysis": "value",
  "model_breakdown": [],
  "model_consensus": 123.45,
  "shap_values": "string",
  "feature_importance": "string",
  "explanation": "string",
  "confidence_intervals": "string",
  "prediction_timestamp": "2024-01-01T00:00:00Z",
  "processing_time": 123.45,
  "model_versions": "string",
  "data_quality_score": 123.45
}
```


## User

**File:** `backend\admin_api.py:18`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `int` | ✓ | - |
| `username` | `str` | ✓ | - |
| `is_admin` | `bool` | ✓ | - |

**Example JSON:**
```json
{
  "id": 123,
  "username": "string",
  "is_admin": true
}
```


## User

**File:** `backend\src\auth.py:26`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `username` | `str` | ✓ | - |
| `email` | `str` | ✓ | - |

**Example JSON:**
```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```


## UserProfile

**File:** `backend\api_integration.py:80`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `email` | `str` | ✓ | - |
| `name` | `str` | ✓ | - |
| `role` | `str` | ✗ | - |
| `preferences` | `Dict[str, Any]` | ✗ | - |

**Example JSON:**
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "string",
  "preferences": "string"
}
```


## UserProfile

**File:** `backend\sports_expert_api.py:108`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `str` | ✓ | - |
| `email` | `str` | ✓ | - |
| `name` | `str` | ✓ | - |
| `role` | `str` | ✗ | - |
| `preferences` | `TypingDict[str, Any]` | ✗ | - |

**Example JSON:**
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "role": "string",
  "preferences": "string"
}
```


## WSMessage

**File:** `backend\api_integration.py:275`

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `str` | ✓ | - |
| `payload` | `Any` | ✓ | - |
| `timestamp` | `str` | ✓ | - |
| `userId` | `Optional[str]` | ✗ | - |

**Example JSON:**
```json
{
  "type": "string",
  "payload": "value",
  "timestamp": "string",
  "userId": "string"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad request",
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "An unexpected error occurred"
}
```

## Rate Limiting

API requests are limited to 1000 requests per hour per user. Rate limit information is included in response headers:

- `X-RateLimit-Limit`: Request limit per hour
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Time when the rate limit window resets

## Support

For API support, please contact the development team or refer to the project documentation.
