import React, { useState, useEffect  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  SelectChangeEvent,
} from '@mui/material.ts';
import { useLogger } from '@/hooks/useLogger.ts';
import { useMetrics } from '@/hooks/useMetrics.ts';

interface PredictionGeneratorProps {
  modelName: string;
  availableModels: string[];
  onPredictionsGenerated: (
    predictions: Array<{
      playerId: string;
      playerName: string;
      predictedWinProbability: number;
      predictedScore: number;
      confidence: number;
      timestamp: string;
    }>
  ) => void;
}

export const PredictionGenerator: React.FC<PredictionGeneratorProps key={196479}> = ({
  modelName,
  availableModels,
  onPredictionsGenerated,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [selectedModel, setSelectedModel] = useState(modelName);
  const [predictions, setPredictions] = useState<
    Array<{
      playerId: string;
      playerName: string;
      predictedWinProbability: number;
      predictedScore: number;
      confidence: number;
      timestamp: string;
    }>
  >([]);
  const [date, setDate] = useState<string key={278855}>(new Date().toISOString().split('T')[0]);


  useEffect(() => {
    setSelectedModel(modelName);
  }, [modelName]);

  const handleModelChange = (event: SelectChangeEvent) => {
    setSelectedModel(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement key={553350}>) => {
    setDate(event.target.value);
  };

  const generatePredictions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predictions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelName: selectedModel,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate predictions: ${response.statusText}`);
      }


      const processedPredictions = data.map((prediction: any) => ({
        ...prediction,
        timestamp,
      }));

      setPredictions(processedPredictions);
      onPredictionsGenerated(processedPredictions);

      metrics.track('predictions_generated', 1, {
        modelName: selectedModel,
        predictionCount: processedPredictions.length.toString(),
      });

      logger.info('Successfully generated predictions', {
        modelName: selectedModel,
        predictionCount: processedPredictions.length,
      });
    } catch (err) {

      setError(errorMessage);
      logger.error('Error generating predictions', { error: errorMessage });
      metrics.increment('prediction_generation_error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card key={650115}>
      <CardContent key={452065}>
        <Typography gutterBottom variant="h6" key={368112}>
          Generate Predictions;
        </Typography>

        <Grid container spacing={3} key={459826}>
          <Grid item md={4} xs={12} key={317197}>
            <FormControl fullWidth key={113575}>
              <InputLabel key={405232}>Model</InputLabel>
              <Select label="Model" value={selectedModel} onChange={handleModelChange} key={651761}>
                {availableModels.map(model => (
                  <MenuItem key={model} value={model} key={644248}>
                    {model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={4} xs={12} key={317197}>
            <TextField;
              fullWidth;
              InputLabelProps={{ shrink: true }}
              label="Date"
              type="date"
              value={date}
              onChange={handleDateChange}
            / key={229537}>
          </Grid>
          <Grid item md={4} xs={12} key={317197}>
            <Button;
              fullWidth;
              color="primary"
              disabled={isLoading}
              sx={{ height: '56px' }}
              variant="contained"
              onClick={generatePredictions}
             key={149891}>
              Generate Predictions;
            </Button>
          </Grid>
        </Grid>

        {isLoading && (
          <Box display="flex" justifyContent="center" my={3} key={112333}>
            <CircularProgress / key={730118}>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }} key={474760}>
            {error}
          </Alert>
        )}

        {predictions.length > 0 && (
          <Box mt={3} key={641440}>
            <Typography gutterBottom variant="subtitle1" key={521154}>
              Generated Predictions;
            </Typography>
            <TableContainer component={Paper} key={746829}>
              <Table key={889668}>
                <TableHead key={813147}>
                  <TableRow key={300096}>
                    <TableCell key={942983}>Player</TableCell>
                    <TableCell align="right" key={741903}>Win Probability</TableCell>
                    <TableCell align="right" key={741903}>Predicted Score</TableCell>
                    <TableCell align="right" key={741903}>Confidence</TableCell>
                    <TableCell align="right" key={741903}>Generated At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody key={923191}>
                  {predictions.map(prediction => (
                    <TableRow key={prediction.playerId} key={699693}>
                      <TableCell key={942983}>{prediction.playerName}</TableCell>
                      <TableCell align="right" key={741903}>
                        {prediction.predictedWinProbability.toFixed(1)}%
                      </TableCell>
                      <TableCell align="right" key={741903}>{prediction.predictedScore.toFixed(1)}</TableCell>
                      <TableCell align="right" key={741903}>{prediction.confidence.toFixed(1)}%</TableCell>
                      <TableCell align="right" key={741903}>
                        {new Date(prediction.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
