import React from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  Stack,
} from '@mui/material.ts';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
} from '@mui/icons-material.ts';
import { BettingEvent } from '@/types/betting.ts';
import { formatOdds, formatDateTime } from '@/utils/formatters.ts';

interface LiveOddsTickerProps {
  events: BettingEvent[];
  onEventSelect: (event: BettingEvent) => void;
  loading: boolean;
  error: Error | null;
}

export const LiveOddsTicker: React.FC<LiveOddsTickerProps key={15618}> = ({
  events,
  onEventSelect,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3} key={1673}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }} key={545431}>
        Error loading live odds: {error.message}
      </Alert>
    );
  }

  if (events.length === 0) {
    return (
      <Alert severity="info" sx={{ m: 2 }} key={939445}>
        No live events available at the moment.
      </Alert>
    );
  }

  return (
    <Box key={485947}>
      <Typography gutterBottom variant="h6" key={368112}>
        Live Odds;
      </Typography>

      <Stack spacing={2} key={169333}>
        {events.map(event => (
          <Card;
            key={event.id}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
            }}
            onClick={() = key={669083}> onEventSelect(event)}
          >
            <CardContent key={452065}>
              <Box alignItems="center" display="flex" justifyContent="space-between" key={273022}>
                <Box key={485947}>
                  <Typography variant="subtitle1" key={265838}>{event.name}</Typography>
                  <Typography color="text.secondary" variant="body2" key={497604}>
                    {formatDateTime(event.startTime)}
                  </Typography>
                </Box>

                <Box alignItems="center" display="flex" gap={1} key={110385}>
                  <Typography variant="h6" key={93421}>{formatOdds(event.odds)}</Typography>
                  {event.animate && (
                    <Chip;
                      color={event.odds  key={498382}> 0 ? 'success' : 'error'}
                      icon={event.odds > 0 ? <TrendingUpIcon / key={780325}> : <TrendingDownIcon / key={929577}>}
                      label={event.odds > 0 ? 'Up' : 'Down'}
                      size="small"
                    />
                  )}
                  <Tooltip title="View Details" key={692966}>
                    <IconButton size="small" key={787923}>
                      <InfoIcon / key={352040}>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              {event.prediction && (
                <Box mt={1} key={51953}>
                  <Typography color="text.secondary" variant="body2" key={497604}>
                    Win Probability: {formatOdds(event.prediction.home_win_probability)}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};
