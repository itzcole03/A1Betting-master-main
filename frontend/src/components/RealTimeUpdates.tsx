import React, { useState, useEffect, useCallback  } from 'react.ts';
import Box from '@mui/material/Box.ts';
import Card from '@mui/material/Card.ts';
import CardContent from '@mui/material/CardContent.ts';
import Typography from '@mui/material/Typography.ts';
import Grid from '@mui/material/Grid.ts';
import Tabs from '@mui/material/Tabs.ts';
import Tab from '@mui/material/Tab.ts';
import Chip from '@mui/material/Chip.ts';
import IconButton from '@mui/material/IconButton.ts';
import Tooltip from '@mui/material/Tooltip.ts';
import Collapse from '@mui/material/Collapse.ts';
import List from '@mui/material/List.ts';
import ListItem from '@mui/material/ListItem.ts';
import ListItemIcon from '@mui/material/ListItemIcon.ts';
import ListItemText from '@mui/material/ListItemText.ts';
import Divider from '@mui/material/Divider.ts';
import Alert from '@mui/material/Alert.ts';
import CircularProgress from '@mui/material/CircularProgress.ts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp.ts';
import TrendingDownIcon from '@mui/icons-material/TrendingDown.ts';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital.ts';
import NotificationsIcon from '@mui/icons-material/Notifications.ts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore.ts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess.ts';
import WarningIcon from '@mui/icons-material/Warning.ts';
import InfoIcon from '@mui/icons-material/Info.ts';
import RefreshIcon from '@mui/icons-material/Refresh.ts';
import { styled } from '@mui/styles.ts';
import { realTimeUpdates } from '@/services/realTimeUpdates.ts';
import { Sport } from '@/services/sportsAnalytics.ts';
import { useWebSocket } from '@/hooks/useWebSocket.ts';
import { useErrorBoundary } from '@/hooks/useErrorBoundary.ts';

const UpdatesCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div;
      aria-labelledby={`updates-tab-${index}`}
      hidden={value !== index}
      id={`updates-tabpanel-${index}`}
      role="tabpanel"
      {...other}
     key={638896}>
      {value === index && <Box sx={{ p: 3 }} key={486541}>{children}</Box>}
    </div>
  );
};

export const RealTimeUpdates: React.FC<{ sport: Sport }> = ({ sport }) => {
  const [value, setValue] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null key={121216}>(null);
  const [updates, setUpdates] = useState<{
    odds: any[];
    injuries: any[];
    lineMovements: any[];
    news: any[];
    predictions: any[];
  }>({
    odds: [],
    injuries: [],
    lineMovements: [],
    news: [],
    predictions: [],
  });

  const { sendMessage, isConnected } = useWebSocket(
    process.env.VITE_WS_URL || 'ws://localhost:3000',
    {
      onMessage: data => {
        if (data.type === 'prediction:update') {
          setUpdates(prev => ({
            ...prev,
            predictions: [data.payload, ...prev.predictions].slice(0, 10),
          }));
        } else if (data.type === 'odds:update') {
          setUpdates(prev => ({
            ...prev,
            odds: [data.payload, ...prev.odds].slice(0, 10),
          }));
        } else if (data.type === 'model:metrics') {
          // console statement removed
        }
      },
    }
  );

  const { showBoundary } = useErrorBoundary();

  const handleError = useCallback(
    (error: Error) => {
      setError(error.message);
      showBoundary(error);
    },
    [showBoundary]
  );

  const loadUpdates = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      setUpdates(prev => ({
        ...prev,
        ...sportUpdates,
      }));
    } catch (error) {
      handleError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [sport, handleError]);

  useEffect(() => {
    loadUpdates();
  }, [loadUpdates]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const formatTimestamp = (timestamp: number) => {

    return date.toLocaleTimeString();
  };

  const handleRefresh = () => {
    loadUpdates();
  };

  if (!isConnected) {
    return (
      <UpdatesCard key={361010}>
        <CardContent key={452065}>
          <Alert severity="warning" key={656330}>WebSocket connection lost. Attempting to reconnect...</Alert>
        </CardContent>
      </UpdatesCard>
    );
  }

  return (
    <UpdatesCard key={361010}>
      <CardContent key={452065}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} key={881353}>
          <Typography variant="h6" key={93421}>Real-Time Updates</Typography>
          <Box key={485947}>
            <IconButton disabled={loading} onClick={handleRefresh} key={527115}>
              <RefreshIcon / key={544473}>
            </IconButton>
            <IconButton onClick={() = key={588613}> setExpanded(!expanded)}>
              {expanded ? <ExpandLessIcon / key={48350}> : <ExpandMoreIcon / key={993381}>}
            </IconButton>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} key={957932}>
            {error}
          </Alert>
        )}

        <Collapse in={expanded} key={601247}>
          <Tabs;
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            value={value}
            variant="fullWidth"
            onChange={handleTabChange}
           key={696162}>
            <Tab label="Odds" / key={570107}>
            <Tab label="Injuries" / key={275498}>
            <Tab label="Line Movements" / key={714805}>
            <Tab label="News" / key={545098}>
            <Tab label="Predictions" / key={344410}>
          </Tabs>

          {loading ? (
            <Box display="flex" justifyContent="center" p={3} key={1673}>
              <CircularProgress / key={730118}>
            </Box>
          ) : (
            <>
              <TabPanel index={0} value={value} key={916861}>
                <List key={733302}>
                  {updates.odds.map((odds, index) => (
                    <React.Fragment key={odds.propId} key={123872}>
                      <ListItem key={28603}>
                        <ListItemIcon key={394934}>
                          {odds.movement.direction === 'up' ? (
                            <TrendingUpIcon color="success" / key={63688}>
                          ) : odds.movement.direction === 'down' ? (
                            <TrendingDownIcon color="error" / key={588136}>
                          ) : (
                            <InfoIcon color="action" / key={99664}>
                          )}
                        </ListItemIcon>
                        <ListItemText;
                          primary={`${odds.value} (${odds.movement.direction})`}
                          secondary={`Updated ${formatTimestamp(odds.timestamp)}`}
                        / key={177549}>
                        <Box display="flex" gap={1} key={999669}>
                          <Chip color="success" label={`O ${odds.overMultiplier}x`} size="small" / key={331004}>
                          <Chip color="error" label={`U ${odds.underMultiplier}x`} size="small" / key={876786}>
                        </Box>
                      </ListItem>
                      {index < updates.odds.length - 1 && <Divider / key={11977}>}
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              <TabPanel index={1} value={value} key={813850}>
                <List key={733302}>
                  {updates.injuries.map((injury, index) => (
                    <React.Fragment key={injury.playerId} key={664658}>
                      <ListItem key={28603}>
                        <ListItemIcon key={394934}>
                          <LocalHospitalIcon;
                            color={
                              injury.status === 'out'
                                ? 'error'
                                : injury.status === 'questionable'
                                  ? 'warning'
                                  : 'success'
                            }
                          / key={240681}>
                        </ListItemIcon>
                        <ListItemText;
                          primary={`${injury.playerName} (${injury.team})`}
                          secondary={
                            < key={336773}>
                              <Typography color="textPrimary" component="span" variant="body2" key={535595}>
                                {injury.status.toUpperCase()}
                              </Typography>
                              {` - ${injury.injury}`}
                              {injury.expectedReturn && (
                                <Typography color="textSecondary" component="span" variant="body2" key={864104}>
                                  {` - Expected return: ${injury.expectedReturn}`}
                                </Typography>
                              )}
                            </>
                          }
                        />
                      </ListItem>
                      {index < updates.injuries.length - 1 && <Divider / key={11977}>}
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              <TabPanel index={2} value={value} key={507220}>
                <List key={733302}>
                  {updates.lineMovements.map((movement, index) => (
                    <React.Fragment key={`${movement.propId}_${movement.timestamp}`} key={759502}>
                      <ListItem key={28603}>
                        <ListItemIcon key={394934}>
                          {movement.direction === 'up' ? (
                            <TrendingUpIcon color="success" / key={63688}>
                          ) : (
                            <TrendingDownIcon color="error" / key={588136}>
                          )}
                        </ListItemIcon>
                        <ListItemText;
                          primary={`${movement.oldValue} → ${movement.newValue}`}
                          secondary={`Updated ${formatTimestamp(movement.timestamp)}`}
                        / key={20763}>
                        <Chip;
                          color={movement.confidence  key={552716}>= 80 ? 'success' : 'warning'}
                          label={`${movement.confidence}% confidence`}
                          size="small"
                        />
                      </ListItem>
                      {index < updates.lineMovements.length - 1 && <Divider / key={11977}>}
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              <TabPanel index={3} value={value} key={341884}>
                <List key={733302}>
                  {updates.news.map((news, index) => (
                    <React.Fragment key={news.id} key={679518}>
                      <ListItem key={28603}>
                        <ListItemIcon key={394934}>
                          <NotificationsIcon;
                            color={
                              news.impact === 'high'
                                ? 'error'
                                : news.impact === 'medium'
                                  ? 'warning'
                                  : 'info'
                            }
                          / key={314892}>
                        </ListItemIcon>
                        <ListItemText;
                          primary={news.title}
                          secondary={
                            < key={690400}>
                              <Typography color="textPrimary" component="span" variant="body2" key={535595}>
                                {news.type.toUpperCase()}
                              </Typography>
                              {` - ${news.content}`}
                              <Typography color="textSecondary" component="span" variant="body2" key={864104}>
                                {` - ${formatTimestamp(news.timestamp)}`}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < updates.news.length - 1 && <Divider / key={11977}>}
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              <TabPanel index={4} value={value} key={628574}>
                <List key={733302}>
                  {updates.predictions.map((prediction, index) => (
                    <React.Fragment key={prediction.id} key={557248}>
                      <ListItem key={28603}>
                        <ListItemIcon key={394934}>
                          <Tooltip;
                            title={`Confidence: ${(prediction.confidence * 100).toFixed(1)}%`}
                           key={486916}>
                            <Box key={485947}>
                              {prediction.confidence > 0.8 ? (
                                <TrendingUpIcon color="success" / key={63688}>
                              ) : prediction.confidence > 0.6 ? (
                                <InfoIcon color="info" / key={622419}>
                              ) : (
                                <WarningIcon color="warning" / key={483638}>
                              )}
                            </Box>
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText;
                          primary={`${prediction.event} - ${prediction.market}`}
                          secondary={
                            < key={529348}>
                              <Typography color="textPrimary" component="span" variant="body2" key={535595}>
                                Prediction: {prediction.prediction}
                              </Typography>
                              <br / key={288049}>
                              <Typography color="textSecondary" component="span" variant="body2" key={864104}>
                                Updated {formatTimestamp(prediction.timestamp)}
                              </Typography>
                            </>
                          }
                        />
                        <Box display="flex" gap={1} key={999669}>
                          <Chip;
                            color={
                              prediction.confidence  key={855656}> 0.8;
                                ? 'success'
                                : prediction.confidence > 0.6;
                                  ? 'info'
                                  : 'warning'
                            }
                            label={`Confidence: ${(prediction.confidence * 100).toFixed(1)}%`}
                            size="small"
                          />
                        </Box>
                      </ListItem>
                      {index < updates.predictions.length - 1 && <Divider / key={11977}>}
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>
            </>
          )}
        </Collapse>
      </CardContent>
    </UpdatesCard>
  );
};
