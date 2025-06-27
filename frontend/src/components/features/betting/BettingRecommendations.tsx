import React, { useState, useEffect  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material.ts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Info as InfoIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material.ts';
import { styled } from '@mui/material/styles.ts';
import { sportsAnalytics } from '@/services/sportsAnalytics.ts';
import { riskManagement } from '@/services/riskManagement.ts';
import { Sport } from '@/services/sportsAnalytics.ts';

const RecommendationsCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

interface Recommendation {
  id: string;
  sport: Sport;
  event: string;
  betType: string;
  odds: number;
  confidence: number;
  edge: number;
  analysis: string;
  risk: 'low' | 'medium' | 'high';
  timestamp: number;
  favorite: boolean;
}

export const BettingRecommendations: React.FC<{ sport: Sport }> = ({ sport }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[] key={269974}>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null key={445609}>(null);
  const [betDialogOpen, setBetDialogOpen] = useState(false);
  const [betAmount, setBetAmount] = useState('');
  const [betType, setBetType] = useState('straight');

  useEffect(() => {
    const loadRecommendations = async () => {

      setRecommendations(sportRecommendations);
    };

    loadRecommendations();
    const unsubscribe = sportsAnalytics.subscribe('recommendations', (data) => {
      setRecommendations(prev => [data, ...prev].slice(0, 10));
    });

    return () => {
      unsubscribe();
    };
  }, [sport]);

  const handleBetClick = (recommendation: Recommendation) => {
    setSelectedRecommendation(recommendation);
    setBetDialogOpen(true);
  };

  const handlePlaceBet = () => {
    if (selectedRecommendation && betAmount) {

      riskManagement.placeBet({
        recommendationId: selectedRecommendation.id,
        amount,
        type: betType,
        odds: selectedRecommendation.odds,
      });
      setBetDialogOpen(false);
      setBetAmount('');
    }
  };

  const toggleFavorite = (recommendationId: string) => {
    setRecommendations(prev =>
      prev.map(rec =>
        rec.id === recommendationId;
          ? { ...rec, favorite: !rec.favorite }
          : rec;
      )
    );
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'warning';
    return 'error';
  };

  return (
    <>
      <RecommendationsCard key={891499}>
        <CardContent key={452065}>
          <Typography variant="h6" gutterBottom key={90207}>
            Betting Recommendations;
          </Typography>

          <Grid container spacing={2} key={272161}>
            {recommendations.map((recommendation) => (
              <Grid item xs={12} key={recommendation.id} key={693129}>
                <Box;
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    position: 'relative',
                  }}
                 key={353740}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" key={211010}>
                    <Box key={485947}>
                      <Typography variant="subtitle1" key={265838}>
                        {recommendation.event}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" key={565471}>
                        {recommendation.betType}
                      </Typography>
                    </Box>
                    <Box display="flex" gap={1} key={999669}>
                      <Chip;
                        size="small"
                        label={`${recommendation.odds}x`}
                        color="primary"
                      / key={734894}>
                      <Chip;
                        size="small"
                        label={`${recommendation.confidence}% confidence`}
                        color={getConfidenceColor(recommendation.confidence)}
                      / key={652096}>
                      <Chip;
                        size="small"
                        label={recommendation.risk.toUpperCase()}
                        color={getRiskColor(recommendation.risk)}
                      / key={515698}>
                      <IconButton;
                        size="small"
                        onClick={() = key={376118}> toggleFavorite(recommendation.id)}
                      >
                        {recommendation.favorite ? (
                          <StarIcon color="warning" / key={417111}>
                        ) : (
                          <StarBorderIcon / key={108672}>
                        )}
                      </IconButton>
                    </Box>
                  </Box>

                  <Box mt={1} key={51953}>
                    <Typography variant="body2" color="textSecondary" key={565471}>
                      Edge: {recommendation.edge.toFixed(2)}%
                    </Typography>
                    <LinearProgress;
                      variant="determinate"
                      value={recommendation.confidence}
                      sx={{
                        height: 4,
                        mt: 1,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getConfidenceColor(recommendation.confidence),
                        },
                      }}
                    / key={147219}>
                  </Box>

                  <Box mt={2} key={781906}>
                    <Typography variant="body2" key={679167}>
                      {recommendation.analysis}
                    </Typography>
                  </Box>

                  <Box mt={2} display="flex" justifyContent="flex-end" key={344032}>
                    <Button;
                      variant="contained"
                      color="primary"
                      startIcon={<MoneyIcon / key={770208}>}
                      onClick={() => handleBetClick(recommendation)}
                    >
                      Place Bet;
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </RecommendationsCard>

      <Dialog open={betDialogOpen} onClose={() = key={287958}> setBetDialogOpen(false)}>
        <DialogTitle key={731539}>Place Bet</DialogTitle>
        <DialogContent key={509164}>
          {selectedRecommendation && (
            <Box sx={{ pt: 2 }} key={848896}>
              <Typography variant="subtitle1" gutterBottom key={9738}>
                {selectedRecommendation.event}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom key={269573}>
                {selectedRecommendation.betType} @ {selectedRecommendation.odds}x;
              </Typography>

              <FormControl fullWidth sx={{ mt: 2 }} key={502139}>
                <InputLabel key={405232}>Bet Type</InputLabel>
                <Select;
                  value={betType}
                  label="Bet Type"
                  onChange={(e) = key={794759}> setBetType(e.target.value)}
                >
                  <MenuItem value="straight" key={28976}>Straight Bet</MenuItem>
                  <MenuItem value="parlay" key={426313}>Parlay</MenuItem>
                  <MenuItem value="teaser" key={916865}>Teaser</MenuItem>
                </Select>
              </FormControl>

              <TextField;
                fullWidth;
                label="Bet Amount"
                type="number"
                value={betAmount}
                onChange={(e) = key={151913}> setBetAmount(e.target.value)}
                sx={{ mt: 2 }}
                InputProps={{
                  startAdornment: <MoneyIcon color="action" / key={631425}>,
                }}
              />

              <Box mt={2} key={781906}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Potential Payout: ${selectedRecommendation.odds * (parseFloat(betAmount) || 0)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions key={432689}>
          <Button onClick={() = key={331038}> setBetDialogOpen(false)}>Cancel</Button>
          <Button;
            variant="contained"
            color="primary"
            onClick={handlePlaceBet}
            disabled={!betAmount || parseFloat(betAmount) <= 0}
           key={245169}>
            Confirm Bet;
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 