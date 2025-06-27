import React, { useState, useEffect  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material.ts';
import { useLogger } from '@/hooks/useLogger.ts';
import { useMetrics } from '@/hooks/useMetrics.ts';

interface FantasyPredictionEnhancerProps {
  fantasyData: Array<{
    playerId: string;
    playerName: string;
    team: string;
    position: string;
    salary: number;
    projectedPoints: number;
    actualPoints?: number;
    ownershipPercentage?: number;
    valueScore?: number;
  }>;
  predictions: Array<{
    playerId: string;
    playerName: string;
    predictedWinProbability: number;
    predictedScore: number;
  }>;
  onEnhancedPredictions: (
    enhancedPredictions: Array<{
      playerId: string;
      playerName: string;
      predictedWinProbability: number;
      predictedScore: number;
      fantasyValue: number;
      confidenceScore: number;
    }>
  ) => void;
}

export const FantasyPredictionEnhancer: React.FC<FantasyPredictionEnhancerProps key={929106}> = ({
  fantasyData,
  predictions,
  onEnhancedPredictions,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [enhancedPredictions, setEnhancedPredictions] = useState<
    Array<{
      playerId: string;
      playerName: string;
      predictedWinProbability: number;
      predictedScore: number;
      fantasyValue: number;
      confidenceScore: number;
    }>
  >([]);


  useEffect(() => {
    const enhancePredictions = async () => {
      if (!fantasyData.length || !predictions.length) return;

      setIsLoading(true);
      setError(null);

      try {
        // Match predictions with fantasy data;
        const matchedData = predictions;
          .map(prediction => {
            const fantasyPlayer = fantasyData.find(
              player => player.playerId === prediction.playerId;
            );

            if (!fantasyPlayer) {
              return null;
            }

            // Calculate fantasy value score;

            // Calculate confidence score based on multiple factors;
            const confidenceScore = calculateConfidenceScore(
              prediction.predictedWinProbability,
              prediction.predictedScore,
              fantasyValue,
              fantasyPlayer.ownershipPercentage || 0;
            );

            return {
              playerId: prediction.playerId,
              playerName: prediction.playerName,
              predictedWinProbability: prediction.predictedWinProbability,
              predictedScore: prediction.predictedScore,
              fantasyValue,
              confidenceScore,
            };
          })
          .filter(Boolean) as Array<{
          playerId: string;
          playerName: string;
          predictedWinProbability: number;
          predictedScore: number;
          fantasyValue: number;
          confidenceScore: number;
        }>;

        setEnhancedPredictions(matchedData);
        onEnhancedPredictions(matchedData);

        metrics.track('predictions_enhanced', 1, {
          predictionCount: predictions.length.toString(),
          enhancedCount: matchedData.length.toString(),
        });

        logger.info('Successfully enhanced predictions with fantasy data', {
          predictionCount: predictions.length,
          enhancedCount: matchedData.length,
        });
      } catch (err) {

        setError(errorMessage);
        logger.error('Error enhancing predictions', { error: errorMessage });
        metrics.increment('prediction_enhancement_error');
      } finally {
        setIsLoading(false);
      }
    };

    enhancePredictions();
  }, [fantasyData, predictions, onEnhancedPredictions, logger, metrics]);

  const calculateConfidenceScore = (
    winProbability: number,
    predictedScore: number,
    fantasyValue: number,
    ownershipPercentage: number;
  ): number => {
    // Normalize each factor to a 0-1 scale;

    const normalizedScore = Math.min(predictedScore / 30, 1); // Assuming max score of 30;
    const normalizedValue = Math.min(fantasyValue / 5, 1); // Assuming max value score of 5;

    // Weight each factor;
    const weights = {
      winProbability: 0.3,
      predictedScore: 0.3,
      fantasyValue: 0.25,
      ownership: 0.15,
    };

    // Calculate weighted average;
    return (
      (normalizedWinProb * weights.winProbability +
        normalizedScore * weights.predictedScore +
        normalizedValue * weights.fantasyValue +
        normalizedOwnership * weights.ownership) *
      100;
    ); // Convert to percentage;
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={3} key={112333}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }} key={474760}>
        {error}
      </Alert>
    );
  }

  return (
    <Card key={650115}>
      <CardContent key={452065}>
        <Typography gutterBottom variant="h6" key={368112}>
          Enhanced Predictions;
        </Typography>
        <TableContainer component={Paper} key={746829}>
          <Table key={889668}>
            <TableHead key={813147}>
              <TableRow key={300096}>
                <TableCell key={942983}>Player</TableCell>
                <TableCell align="right" key={741903}>Win Probability</TableCell>
                <TableCell align="right" key={741903}>Predicted Score</TableCell>
                <TableCell align="right" key={741903}>Fantasy Value</TableCell>
                <TableCell align="right" key={741903}>Confidence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody key={923191}>
              {enhancedPredictions.map(prediction => (
                <TableRow key={prediction.playerId} key={699693}>
                  <TableCell key={942983}>{prediction.playerName}</TableCell>
                  <TableCell align="right" key={741903}>
                    {prediction.predictedWinProbability.toFixed(1)}%
                  </TableCell>
                  <TableCell align="right" key={741903}>{prediction.predictedScore.toFixed(1)}</TableCell>
                  <TableCell align="right" key={741903}>{prediction.fantasyValue.toFixed(2)}</TableCell>
                  <TableCell align="right" key={741903}>{prediction.confidenceScore.toFixed(1)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
