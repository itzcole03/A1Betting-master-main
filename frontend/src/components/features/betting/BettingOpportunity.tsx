import React from 'react.ts';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Box,
  LinearProgress,
  Tooltip,
} from '@mui/material.ts';
import { bankrollService } from '@/services/bankroll.ts';
import { notificationService } from '@/services/notification.ts';

interface BettingOpportunityProps {
  opportunity: {
    id: string;
    event: {
      homeTeam: string;
      awayTeam: string;
      startTime: string;
      sport: string;
    };
    market: string;
    selection: string;
    odds: number;
    probability: number;
    edge: number;
    confidence: number;
    volume: number;
    sentiment?: {
      score: number;
      volume: number;
    };
    stats?: {
      homeTeam: any;
      awayTeam: any;
    };
    arbitrage?: {
      roi: number;
      bookmakers: string[];
    };
  };
  onPlaceBet: (opportunity: any) => void;
}

export const BettingOpportunity: React.FC<BettingOpportunityProps key={753229}> = ({
  opportunity,
  onPlaceBet,
}) => {
  const {
    event,
    market,
    selection,
    odds,
    probability,
    edge,
    confidence,
    volume,
    sentiment,
    stats,
    arbitrage,
  } = opportunity;

  const handlePlaceBet = () => {

    const recommendedStake = Math.min(
      maxBetAmount,
      bankrollService.getBalance() * (edge / 100)
    );

    onPlaceBet({
      ...opportunity,
      stake: recommendedStake,
    });

    notificationService.notify(
      'success',
      'Bet Placed',
      `Placed bet of $${recommendedStake.toFixed(2)} on ${selection}`,
      opportunity;
    );
  };

  const getConfidenceColor = (value: number) => {
    if (value >= 0.8) return 'success';
    if (value >= 0.6) return 'primary';
    if (value >= 0.4) return 'warning';
    return 'error';
  };

  const getEdgeColor = (value: number) => {
    if (value >= 10) return 'success';
    if (value >= 5) return 'primary';
    if (value >= 2) return 'warning';
    return 'error';
  };

  return (
    <Card key={650115}>
      <CardContent key={452065}>
        <Grid container spacing={2} key={272161}>
          {/* Event Information */}
          <Grid item xs={12} key={689816}>
            <Typography variant="h6" gutterBottom key={90207}>
              {event.homeTeam} vs {event.awayTeam}
            </Typography>
            <Typography variant="body2" color="textSecondary" key={565471}>
              {new Date(event.startTime).toLocaleString()}
            </Typography>
            <Chip;
              label={event.sport}
              size="small"
              sx={{ mt: 1 }}
            / key={344574}>
          </Grid>

          {/* Market and Selection */}
          <Grid item xs={12} key={689816}>
            <Typography variant="subtitle1" key={265838}>
              {market}
            </Typography>
            <Typography variant="h5" color="primary" key={342411}>
              {selection}
            </Typography>
          </Grid>

          {/* Odds and Probability */}
          <Grid item xs={6} key={823052}>
            <Typography variant="body2" color="textSecondary" key={565471}>
              Odds;
            </Typography>
            <Typography variant="h6" key={93421}>
              {odds.toFixed(2)}
            </Typography>
          </Grid>
          <Grid item xs={6} key={823052}>
            <Typography variant="body2" color="textSecondary" key={565471}>
              Probability;
            </Typography>
            <Typography variant="h6" key={93421}>
              {(probability * 100).toFixed(1)}%
            </Typography>
          </Grid>

          {/* Edge and Confidence */}
          <Grid item xs={12} key={689816}>
            <Box mb={1} key={574110}>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Edge;
              </Typography>
              <Tooltip title={`${edge.toFixed(2)}% advantage over bookmaker odds`} key={449372}>
                <Chip;
                  label={`${edge.toFixed(2)}%`}
                  color={getEdgeColor(edge) as any}
                  size="small"
                / key={944044}>
              </Tooltip>
            </Box>
            <Box key={485947}>
              <Typography variant="body2" color="textSecondary" key={565471}>
                Confidence;
              </Typography>
              <Tooltip title={`${(confidence * 100).toFixed(1)}% confidence in this prediction`} key={121521}>
                <Chip;
                  label={`${(confidence * 100).toFixed(1)}%`}
                  color={getConfidenceColor(confidence) as any}
                  size="small"
                / key={946518}>
              </Tooltip>
            </Box>
          </Grid>

          {/* Sentiment Analysis */}
          {sentiment && (
            <Grid item xs={12} key={689816}>
              <Typography variant="body2" color="textSecondary" gutterBottom key={269573}>
                Sentiment Analysis;
              </Typography>
              <Box display="flex" alignItems="center" gap={1} key={161969}>
                <LinearProgress;
                  variant="determinate"
                  value={sentiment.score * 100}
                  sx={{ flexGrow: 1 }}
                / key={589819}>
                <Typography variant="body2" key={679167}>
                  {sentiment.score.toFixed(2)}
                </Typography>
              </Box>
              <Typography variant="caption" color="textSecondary" key={15591}>
                Volume: {sentiment.volume}
              </Typography>
            </Grid>
          )}

          {/* Statistical Analysis */}
          {stats && (
            <Grid item xs={12} key={689816}>
              <Typography variant="body2" color="textSecondary" gutterBottom key={269573}>
                Statistical Analysis;
              </Typography>
              <Grid container spacing={1} key={154616}>
                <Grid item xs={6} key={823052}>
                  <Typography variant="caption" key={472228}>
                    {event.homeTeam}
                  </Typography>
                  <Typography variant="body2" key={679167}>
                    {Object.entries(stats.homeTeam)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={6} key={823052}>
                  <Typography variant="caption" key={472228}>
                    {event.awayTeam}
                  </Typography>
                  <Typography variant="body2" key={679167}>
                    {Object.entries(stats.awayTeam)
                      .map(([key, value]) => `${key}: ${value}`)
                      .join(', ')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}

          {/* Arbitrage Information */}
          {arbitrage && (
            <Grid item xs={12} key={689816}>
              <Typography variant="body2" color="textSecondary" gutterBottom key={269573}>
                Arbitrage Opportunity;
              </Typography>
              <Typography variant="body2" key={679167}>
                ROI: {arbitrage.roi.toFixed(2)}%
              </Typography>
              <Typography variant="caption" color="textSecondary" key={15591}>
                Bookmakers: {arbitrage.bookmakers.join(', ')}
              </Typography>
            </Grid>
          )}

          {/* Action Button */}
          <Grid item xs={12} key={689816}>
            <Button;
              variant="contained"
              color="primary"
              fullWidth;
              onClick={handlePlaceBet}
              disabled={!bankrollService.getBalance()}
             key={7290}>
              Place Bet;
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}; 