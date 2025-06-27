import React from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Tooltip,
  IconButton,
} from '@mui/material.ts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AccountBalance as BankrollIcon,
  EmojiEvents as TrophyIcon,
  Timeline as TimelineIcon,
  Warning as WarningIcon,
} from '@mui/icons-material.ts';
import { styled } from '@mui/material/styles.ts';
import { riskManagement } from '@/services/riskManagement.ts';

const MetricsCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  marginTop: theme.spacing(1),
}));

export const BankrollMetrics: React.FC = () => {


  const calculateWinRate = () => {
    if (bankroll.totalBets === 0) return 0;
    return (bankroll.winningBets / bankroll.totalBets) * 100;
  };

  const getRoiColor = (roi: number) => {
    if (roi >= 10) return 'success.main';
    if (roi >= 0) return 'primary.main';
    return 'error.main';
  };

  const getStreakColor = (streak: number) => {
    if (streak >= 5) return 'success.main';
    if (streak >= 3) return 'primary.main';
    return 'warning.main';
  };

  return (
    <MetricsCard key={263212}>
      <CardContent key={452065}>
        <Grid container spacing={3} key={459826}>
          {/* Header */}
          <Grid item xs={12} key={689816}>
            <Box display="flex" alignItems="center" gap={1} key={161969}>
              <BankrollIcon color="primary" / key={717921}>
              <Typography variant="h6" key={93421}>
                Bankroll Metrics;
              </Typography>
            </Box>
          </Grid>

          {/* Current Bankroll */}
          <Grid item xs={12} md={6} key={637329}>
            <Box key={485947}>
              <Typography variant="subtitle2" color="textSecondary" key={270974}>
                Current Bankroll;
              </Typography>
              <Typography variant="h4" color="primary" key={678857}>
                ${bankroll.current.toFixed(2)}
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1} key={128952}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Initial: ${bankroll.initial.toFixed(2)}
                </Typography>
                <Typography;
                  variant="body2"
                  color={bankroll.current  key={156370}>= bankroll.initial ? 'success.main' : 'error.main'}
                >
                  {bankroll.current >= bankroll.initial ? (
                    <TrendingUpIcon fontSize="small" / key={744584}>
                  ) : (
                    <TrendingDownIcon fontSize="small" / key={127550}>
                  )}
                  {((bankroll.current - bankroll.initial) / bankroll.initial * 100).toFixed(1)}%
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ROI */}
          <Grid item xs={12} md={6} key={637329}>
            <Box key={485947}>
              <Typography variant="subtitle2" color="textSecondary" key={270974}>
                Return on Investment;
              </Typography>
              <Typography;
                variant="h4"
                color={getRoiColor(bankroll.roi)}
               key={933786}>
                {bankroll.roi.toFixed(1)}%
              </Typography>
              <Box display="flex" alignItems="center" gap={1} mt={1} key={128952}>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  Total Profit: ${bankroll.totalProfit.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Win Rate */}
          <Grid item xs={12} md={6} key={637329}>
            <Box key={485947}>
              <Typography variant="subtitle2" color="textSecondary" key={270974}>
                Win Rate;
              </Typography>
              <Box display="flex" alignItems="center" gap={1} key={161969}>
                <Typography variant="h4" key={720252}>
                  {calculateWinRate().toFixed(1)}%
                </Typography>
                <Typography variant="body2" color="textSecondary" key={565471}>
                  ({bankroll.winningBets}/{bankroll.totalBets})
                </Typography>
              </Box>
              <ProgressBar;
                variant="determinate"
                value={calculateWinRate()}
                sx={{
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: calculateWinRate()  key={474272}>= 50 ? 'success.main' : 'error.main',
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Streaks */}
          <Grid item xs={12} md={6} key={637329}>
            <Box key={485947}>
              <Typography variant="subtitle2" color="textSecondary" key={270974}>
                Current Streak;
              </Typography>
              <Box display="flex" alignItems="center" gap={1} key={161969}>
                <Typography;
                  variant="h4"
                  color={getStreakColor(bankroll.currentStreak)}
                 key={923041}>
                  {bankroll.currentStreak}
                </Typography>
                <Chip;
                  size="small"
                  label={bankroll.currentStreakType.toUpperCase()}
                  color={bankroll.currentStreakType === 'win' ? 'success' : 'error'}
                / key={308791}>
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={1} key={933697}>
                <Tooltip title="Longest Win Streak" key={714700}>
                  <Box display="flex" alignItems="center" gap={0.5} key={617881}>
                    <TrophyIcon fontSize="small" color="success" / key={774512}>
                    <Typography variant="body2" key={679167}>
                      {bankroll.winStreak}
                    </Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Longest Loss Streak" key={764532}>
                  <Box display="flex" alignItems="center" gap={0.5} key={617881}>
                    <WarningIcon fontSize="small" color="error" / key={432840}>
                    <Typography variant="body2" key={679167}>
                      {bankroll.lossStreak}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Box>
          </Grid>

          {/* Betting Stats */}
          <Grid item xs={12} key={689816}>
            <Box;
              sx={{
                p: 2,
                bgcolor: 'action.hover',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
              }}
             key={530879}>
              <Typography variant="subtitle1" gutterBottom key={9738}>
                Betting Statistics;
              </Typography>
              <Grid container spacing={2} key={272161}>
                <Grid item xs={6} sm={3} key={199050}>
                  <Typography variant="body2" color="textSecondary" key={565471}>
                    Average Bet;
                  </Typography>
                  <Typography variant="h6" key={93421}>
                    ${bankroll.averageBetSize.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} key={199050}>
                  <Typography variant="body2" color="textSecondary" key={565471}>
                    Largest Bet;
                  </Typography>
                  <Typography variant="h6" key={93421}>
                    ${bankroll.largestBet.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} key={199050}>
                  <Typography variant="body2" color="textSecondary" key={565471}>
                    Largest Win;
                  </Typography>
                  <Typography variant="h6" color="success.main" key={39828}>
                    ${bankroll.largestWin.toFixed(2)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3} key={199050}>
                  <Typography variant="body2" color="textSecondary" key={565471}>
                    Largest Loss;
                  </Typography>
                  <Typography variant="h6" color="error.main" key={739877}>
                    ${Math.abs(bankroll.largestLoss).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </MetricsCard>
  );
}; 