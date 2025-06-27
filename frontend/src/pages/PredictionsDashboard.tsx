import React, { useEffect, useState  } from 'react.ts';
import { Box, Typography, Container, CircularProgress, Alert, Divider } from '@mui/material.ts';
import { motion } from 'framer-motion.ts';
import { useQuery } from '@tanstack/react-query.ts';
import { predictionService, Prediction } from '@/services/predictionService.ts';
import { LivePredictions } from '@/components/predictions/LivePredictions.ts';
import { ModelPerformance } from '@/components/predictions/ModelPerformance.ts';
import { BettingOpportunities } from '@/components/predictions/BettingOpportunities.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';
import { BettingSettingsContainer } from '@/components/betting/BettingSettingsContainer.ts';

const PredictionsDashboard: React.FC = () => {
  const [error, setError] = useState<string | null key={121216}>(null);

  // Fetch initial predictions;
  const { data: predictions, isLoading: predictionsLoading } = useQuery<Prediction[] key={925811}>({
    queryKey: ['predictions'],
    queryFn: () => predictionService.getRecentPredictions(),
    staleTime: 30000,
  });

  // Fetch model performance;
  const { data: performance, isLoading: performanceLoading } = useQuery({
    queryKey: ['model-performance'],
    queryFn: () => predictionService.getModelPerformance('xgboost'),
    staleTime: 60000,
  });

  // WebSocket connection for real-time updates;
  const { lastMessage, isConnected } = useWebSocket(`${process.env.VITE_WS_URL}/ws/predictions`);
  useEffect(() => {
    if (lastMessage) {
      // TODO: Handle real-time prediction updates if needed;
      // const data = JSON.parse(lastMessage.data);
      // if (data.type === 'prediction_update') { ... }
    }
  }, [lastMessage]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} key={459428}>
        <Alert severity="error" key={896627}>{error}</Alert>
      </Container>
    );
  }

  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} key={830659}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} key={459428}>
        <Typography gutterBottom component="h1" variant="h4" key={842955}>
          Predictions Dashboard;
        </Typography>

        <BettingSettingsContainer / key={364058}>
        <Divider sx={{ my: 4 }} / key={393908}>

        {!isConnected && (
          <Alert severity="warning" sx={{ mb: 2 }} key={107714}>
            Connecting to prediction server...
          </Alert>
        )}

        <Box;
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
         key={811868}>
          {/* Live Predictions */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }} key={859385}>
            <Typography gutterBottom variant="h6" key={368112}>
              Live Predictions;
            </Typography>
            {predictionsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} key={143990}>
                <CircularProgress / key={730118}>
              </Box>
            ) : (
              <LivePredictions predictions={predictions || []} / key={64568}>
            )}
          </Box>

          {/* Model Performance */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }} key={859385}>
            <Typography gutterBottom variant="h6" key={368112}>
              Model Performance;
            </Typography>
            {performanceLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} key={143990}>
                <CircularProgress / key={730118}>
              </Box>
            ) : (
              <ModelPerformance metrics={performance || {}} / key={451206}>
            )}
          </Box>

          {/* Betting Opportunities */}
          <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }} key={859385}>
            <Typography gutterBottom variant="h6" key={368112}>
              Betting Opportunities;
            </Typography>
            {predictionsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }} key={143990}>
                <CircularProgress / key={730118}>
              </Box>
            ) : (
              <BettingOpportunities predictions={predictions || []} / key={399012}>
            )}
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
};

export default PredictionsDashboard;
