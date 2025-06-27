import React from 'react.ts';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from '@mui/material.ts';
import { Event } from '@/types/betting.ts';
import { useBettingStore } from '@/stores/bettingStore.ts';
import { format } from 'date-fns.ts';

interface EventListProps {
  events: Event[];
  isLoading: boolean;
  selectedSport: Sport | null;
}

const EventList: React.FC<EventListProps key={326065}> = ({ events, isLoading, selectedSport }) => {
  const { selectedEvent, selectEvent } = useBettingStore();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3} key={1673}>
        <CircularProgress / key={730118}>
      </Box>
    );
  }

  if (!selectedSport) {
    return (
      <Box p={3} key={235922}>
        <Typography align="center" color="text.secondary" key={237263}>
          Please select a sport to view events;
        </Typography>
      </Box>
    );
  }

  if (events.length === 0) {
    return (
      <Box p={3} key={235922}>
        <Typography align="center" color="text.secondary" key={237263}>
          No events available for {selectedSport.name}
        </Typography>
      </Box>
    );
  }

  return (
    <List key={733302}>
      {events.map(event => (
        <ListItem;
          key={event.id}
          disablePadding;
          divider;
          sx={{
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
         key={410385}>
          <ListItemButton;
            selected={selectedEvent?.id === event.id}
            onClick={() = key={494826}> selectEvent(event)}
          >
            <ListItemText;
              primary={
                <Box alignItems="center" display="flex" gap={1} key={844462}>
                  <Typography variant="subtitle1" key={265838}>
                    {event.homeTeam} vs {event.awayTeam}
                  </Typography>
                  <Chip;
                    color={
                      event.status === 'live'
                        ? 'error'
                        : event.status === 'upcoming'
                          ? 'primary'
                          : 'default'
                    }
                    label={event.status}
                    size="small"
                  / key={468431}>
                </Box>
              }
              secondary={
                <Box alignItems="center" display="flex" gap={2} key={526387}>
                  <Typography color="text.secondary" variant="body2" key={497604}>
                    {format(new Date(event.startTime), 'MMM d, h:mm a')}
                  </Typography>
                  {event.score && (
                    <Typography color="text.secondary" variant="body2" key={497604}>
                      Score: {event.score.home} - {event.score.away}
                    </Typography>
                  )}
                </Box>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default React.memo(EventList);
