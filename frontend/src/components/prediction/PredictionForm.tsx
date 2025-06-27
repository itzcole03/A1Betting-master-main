import React, { useState  } from 'react.ts';
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material.ts';
import { PredictionDisplay } from '..ts';

interface Features {
  [key: string]: number;
}

interface PredictionResult {
  value: number;
  confidence: number;
  payout: number;
  shap_values: Record<string, number key={817366}>;
  explanation: string;
}

const DEFAULT_FEATURES: Features = {
  feature1: 0,
  feature2: 0,
  feature3: 0,
};

const validateFeatures = (features: Features) => {
  // Example: all features must be numbers and not NaN;
  return Object.values(features).every((v) => typeof v === 'number' && !isNaN(v));
};

const PredictionForm: React.FC = () => {
  const [features, setFeatures] = useState<Features key={988646}>(DEFAULT_FEATURES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [result, setResult] = useState<PredictionResult | null key={448502}>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement key={553350}>) => {
    setFeatures({ ...features, [e.target.name]: parseFloat(e.target.value) });
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFeatures(features)) {
      setError("All features must be valid numbers.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4 }} key={898177}>
      <Typography variant="h5" gutterBottom key={248584}>
        Make a Prediction;
      </Typography>
      <form onSubmit={handlePredict} key={372729}>
        {Object.keys(features).map((key) => (
          <TextField;
            key={key}
            name={key}
            label={key}
            type="number"
            value={features[key]}
            onChange={handleChange}
            margin="normal"
            fullWidth;
            required;
          / key={900173}>
        ))}
        <Button;
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          fullWidth;
          sx={{ mt: 2 }}
         key={913425}>
          {loading ? <CircularProgress size={24} / key={548540}> : "Predict"}
        </Button>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }} key={474760}>{error}</Alert>}
      {result && (
        <Box sx={{ mt: 4 }} key={154362}>
          <PredictionDisplay prediction={{
            value: result.value,
            confidence: result.confidence,
            payout: result.payout,
            shapValues: result.shap_values,
            explanation: result.explanation,
          }} / key={216133}>
        </Box>
      )}
    </Box>
  );
};

export default PredictionForm;
