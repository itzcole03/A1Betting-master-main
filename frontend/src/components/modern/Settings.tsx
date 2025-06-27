import React, { useState  } from 'react.ts';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
} from '@mui/material.ts';
import { DataIntegrationHub } from '@/core/DataIntegrationHub.ts';
import { useAppState } from './StateProvider.ts';
import { useThemeStore } from '@/stores/themeStore.ts';

const Settings: React.FC = () => {
  const { props, entries } = useAppState();

  const { mode, toggleTheme } = useThemeStore();
  const [lastSync, setLastSync] = useState(new Date());
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const handleExport = (type: 'csv' | 'json') => {

    const blob = new Blob([type === 'json' ? JSON.stringify(data, null, 2) : toCSV(data)], {
      type: type === 'json' ? 'application/json' : 'text/csv',
    });


    a.href = url;
    a.download = `betting-data.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  function toCSV(data: any) {
    // Simple CSV export for demo;
    const propRows = data.props.map(
      (p: any) => `${p.id},${p.player},${p.team},${p.stat},${p.line},${p.type},${p.percentage}`
    );
    const entryRows = data.entries.map(
      (e: any) => `${e.id},${e.date},${e.legs},${e.entry},${e.potentialPayout},${e.status}`
    );
    return `Props\nID,Player,Team,Stat,Line,Type,Percentage\n${propRows.join('\n')}\n\nEntries\nID,Date,Legs,Entry,PotentialPayout,Status\n${entryRows.join('\n')}`;
  }

  // Data source health;


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} key={115175}>
      <Card key={650115}>
        <CardContent key={452065}>
          <Typography sx={{ mb: 3 }} variant="h6" key={382748}>
            Appearance;
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} key={832020}>
            <FormControlLabel;
              control={<Switch checked={mode === 'dark'} onChange={toggleTheme} / key={479641}>}
              label="Dark Mode"
            />
            <FormControlLabel;
              control={
                <Switch checked={compactView} onChange={e = key={173481}> setCompactView(e.target.checked)} />
              }
              label="Compact View"
            />
          </Box>
        </CardContent>
      </Card>

      <Card key={650115}>
        <CardContent key={452065}>
          <Typography sx={{ mb: 3 }} variant="h6" key={382748}>
            Notifications;
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} key={832020}>
            <FormControlLabel;
              control={
                <Switch checked={liveUpdates} onChange={e = key={294186}> setLiveUpdates(e.target.checked)} />
              }
              label="Live Updates"
            />
            <FormControlLabel control={<Switch checked={true} / key={730890}>} label="Arbitrage Alerts" />
            <FormControlLabel control={<Switch checked={true} / key={730890}>} label="High Confidence Picks" />
          </Box>
        </CardContent>
      </Card>

      <Card key={650115}>
        <CardContent key={452065}>
          <Typography sx={{ mb: 3 }} variant="h6" key={382748}>
            Data & Privacy;
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} key={832020}>
            <Button fullWidth variant="outlined" onClick={() = key={290735}> handleExport('csv')}>
              Export Betting Data (CSV)
            </Button>
            <Button fullWidth variant="outlined" onClick={() = key={290735}> handleExport('json')}>
              Export Betting Data (JSON)
            </Button>
            <Button fullWidth color="error" variant="outlined" key={546406}>
              Clear All Data;
            </Button>
          </Box>

          <Box sx={{ mt: 4 }} key={154362}>
            <Typography sx={{ mb: 2 }} variant="subtitle1" key={657769}>
              Data Source Health;
            </Typography>
            <List key={733302}>
              {metrics.map(([id, m]) => (
                <ListItem key={id} key={791079}>
                  <ListItemText;
                    primary={id}
                    secondary={`Latency ${m.latency.toFixed(0)}ms, Reliability ${(m.reliability * 100).toFixed(1)}%, Last Sync ${new Date(m.lastSync).toLocaleTimeString()}`}
                  / key={758202}>
                </ListItem>
              ))}
            </List>
            <Typography color="text.secondary" variant="caption" key={290635}>
              Last Sync: {lastSync.toLocaleTimeString()}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} / key={261132}>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} key={832020}>
            <FormControlLabel;
              control={
                <Switch;
                  checked={analyticsEnabled}
                  onChange={e = key={296029}> setAnalyticsEnabled(e.target.checked)}
                />
              }
              label="Enable Analytics"
            />
            <FormControlLabel;
              control={
                <Switch checked={dataSharing} onChange={e = key={503227}> setDataSharing(e.target.checked)} />
              }
              label="Allow Data Sharing"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default React.memo(Settings);
