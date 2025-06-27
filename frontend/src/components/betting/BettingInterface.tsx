import React, { useEffect, useState  } from 'react.ts';
import { Box, Grid, Paper, Typography, Tab, Tabs } from '@mui/material.ts';
import { useSports, useEvents, useOdds, usePlaceBet } from '@/services/bettingService.ts';
import { useBettingStore } from '@/stores/bettingStore.ts';
import SportSelector from './SportSelector.ts';
import EventList from './EventList.ts';
import BetSlip from './BetSlip.ts';
import OddsDisplay from './OddsDisplay.ts';
import { ErrorBoundary } from 'react-error-boundary.ts';
import { toast } from 'react-toastify.ts';
import { BettingAnalytics } from './BettingAnalytics.ts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div;
      aria-labelledby={`betting-tab-${index}`}
      hidden={value !== index}
      id={`betting-tabpanel-${index}`}
      role="tabpanel"
      {...other}
     key={179553}>
      {value === index && <Box sx={{ p: 3 }} key={486541}>{children}</Box>}
    </div>
  );
}

const BettingInterface: React.FC = () => {
  const { selectedSport, selectedEvent, updateOdds, setSelectedSport, setSelectedEvent } =
    useBettingStore();
  const { data: sports, isLoading: sportsLoading } = useSports();
  const { data: events, isLoading: eventsLoading } = useEvents(selectedSport?.id ?? '');
  const { data: odds } = useOdds(selectedEvent?.id ?? '');

  const [selectedTab, setSelectedTab] = useState(0);

  // Update odds in store when they change;
  useEffect(() => {
    if (odds && selectedEvent) {
      updateOdds(selectedEvent.id, odds);
    }
  }, [odds, selectedEvent, updateOdds]);

  const handleError = (error: Error) => {
    toast.error(`An error occurred: ${error.message}`);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  if (sportsLoading) {
    return (
      <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh" key={106811}>
        <Typography key={705030}>Loading sports data...</Typography>
      </Box>
    );
  }

  return (
    <ErrorBoundary fallback={<div key={901280}>Something went wrong</div>} onError={handleError}>
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }} key={467303}>
        <Paper sx={{ width: '100%', mb: 2 }} key={834937}>
          <Tabs;
            indicatorColor="primary"
            textColor="primary"
            value={selectedTab}
            variant="fullWidth"
            onChange={handleTabChange}
           key={691307}>
            <Tab label="Betting" / key={962123}>
            <Tab label="Analytics" / key={487442}>
          </Tabs>
        </Paper>

        <TabPanel index={0} value={selectedTab} key={855766}>
          <Grid container spacing={2} key={272161}>
            <Grid item md={3} xs={12} key={236941}>
              <SportSelector selectedSport={selectedSport} onSportSelect={setSelectedSport} / key={435639}>
              <EventList;
                selectedEvent={selectedEvent}
                sport={selectedSport}
                onEventSelect={setSelectedEvent}
              / key={411497}>
            </Grid>
            <Grid item md={6} xs={12} key={967702}>
              {selectedEvent && <OddsDisplay event={selectedEvent} / key={237908}>}
            </Grid>
            <Grid item md={3} xs={12} key={236941}>
              <BetSlip onPlaceBet={placeBet.mutate} / key={577123}>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel index={1} value={selectedTab} key={495766}>
          <BettingAnalytics / key={893036}>
        </TabPanel>
      </Box>
    </ErrorBoundary>
  );
};

export default React.memo(BettingInterface);
