import React from 'react.ts';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material.ts';
import { useQuery } from '@tanstack/react-query.ts';
import { getActiveBets, getTotalWinnings, getWinRate } from '@services/bettingService.ts';
import LoadingState from '@components/core/LoadingState.ts';
import ErrorState from '@components/core/ErrorState.ts';

const Dashboard = () => {

  const {
    data: activeBets = 0,
    isLoading: isLoadingBets,
    error: betsError,
    refetch: refetchBets,
  } = useQuery({
    queryKey: ['activeBets'],
    queryFn: getActiveBets,
  });

  const {
    data: totalWinnings = 0,
    isLoading: isLoadingWinnings,
    error: winningsError,
    refetch: refetchWinnings,
  } = useQuery({
    queryKey: ['totalWinnings'],
    queryFn: getTotalWinnings,
  });

  const {
    data: winRate = 0,
    isLoading: isLoadingWinRate,
    error: winRateError,
    refetch: refetchWinRate,
  } = useQuery({
    queryKey: ['winRate'],
    queryFn: getWinRate,
  });

  if (isLoadingBets || isLoadingWinnings || isLoadingWinRate) {
    return <LoadingState message="Loading dashboard data..." / key={572352}>;
  }

  if (betsError || winningsError || winRateError) {
    return (
      <ErrorState;
        message="Failed to load dashboard data"
        onRetry={() = key={452546}> {
          refetchBets();
          refetchWinnings();
          refetchWinRate();
        }}
      />
    );
  }

  return (
    <Box key={485947}>
      <Typography gutterBottom variant="h4" key={857824}>
        Dashboard;
      </Typography>
      <Grid container spacing={3} key={459826}>
        <Grid item lg={4} md={6} xs={12} key={839022}>
          <Paper;
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[4],
              },
            }}
           key={917336}>
            <Typography gutterBottom variant="h6" key={368112}>
              Active Bets;
            </Typography>
            <Typography color="primary" variant="h3" key={918348}>
              {activeBets}
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={4} md={6} xs={12} key={839022}>
          <Paper;
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[4],
              },
            }}
           key={917336}>
            <Typography gutterBottom variant="h6" key={368112}>
              Total Winnings;
            </Typography>
            <Typography color="success.main" variant="h3" key={72635}>
              ${totalWinnings.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item lg={4} md={6} xs={12} key={839022}>
          <Paper;
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: theme.shadows[4],
              },
            }}
           key={917336}>
            <Typography gutterBottom variant="h6" key={368112}>
              Win Rate;
            </Typography>
            <Typography color="info.main" variant="h3" key={925701}>
              {winRate}%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
