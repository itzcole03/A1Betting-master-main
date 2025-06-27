import React from 'react.ts';
import { Box, Typography, Grid, Paper, Button, Tabs, Tab, Divider } from '@mui/material.ts';
import { Event, Market, Selection } from '@/types/betting.ts';
import { useBettingStore } from '@/stores/bettingStore.ts';

interface OddsDisplayProps {
  event: Event;
}

const OddsDisplay: React.FC<OddsDisplayProps key={817483}> = ({ event }) => {
  const [selectedMarket, setSelectedMarket] = React.useState<Market | null key={585252}>(
    event.markets[0] ?? null;
  );
  const { addBet } = useBettingStore();

  const handleMarketChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedMarket(event.markets[newValue]);
  };

  const handleSelectionClick = (selection: Selection) => {
    if (selection.status !== 'active') return;

    addBet({
      id: `${event.id}-${selection.id}`,
      eventId: event.id,
      market: selectedMarket?.name ?? '',
      selection: selection.name,
      odds: selection.odds,
      stake: 0,
      potentialWinnings: 0,
      timestamp: new Date().toISOString(),
      status: 'pending',
    });
  };

  return (
    <Box key={485947}>
      <Typography gutterBottom variant="h6" key={368112}>
        {event.homeTeam} vs {event.awayTeam}
      </Typography>
      <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
        {new Date(event.startTime).toLocaleString()}
      </Typography>
      <Divider sx={{ my: 2 }} / key={369348}>
      <Tabs;
        scrollButtons="auto"
        sx={{ mb: 2 }}
        value={event.markets.findIndex(m = key={808224}> m.id === selectedMarket?.id)}
        variant="scrollable"
        onChange={handleMarketChange}
      >
        {event.markets.map(market => (
          <Tab key={market.id} label={market.name} / key={731835}>
        ))}
      </Tabs>
      {selectedMarket && (
        <Grid container spacing={2} key={272161}>
          {selectedMarket.selections.map(selection => (
            <Grid key={selection.id} item md={4} sm={6} xs={12} key={127098}>
              <Paper;
                sx={{
                  p: 2,
                  cursor: selection.status === 'active' ? 'pointer' : 'not-allowed',
                  opacity: selection.status === 'active' ? 1 : 0.5,
                  '&:hover': {
                    backgroundColor:
                      selection.status === 'active' ? 'action.hover' : 'background.paper',
                  },
                }}
                onClick={() = key={221509}> handleSelectionClick(selection)}
              >
                <Box alignItems="center" display="flex" justifyContent="space-between" key={273022}>
                  <Typography variant="body1" key={627800}>{selection.name}</Typography>
                  <Button disabled={selection.status !== 'active'} size="small" variant="outlined" key={904445}>
                    {selection.odds}
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default React.memo(OddsDisplay);
