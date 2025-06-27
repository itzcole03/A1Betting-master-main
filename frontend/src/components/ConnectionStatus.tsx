import { Alert, Box, CircularProgress, Snackbar, Typography } from '@mui/material.ts';
import { styled } from '@mui/material/styles.ts';
import React from 'react.ts';
import { useWebSocketStore } from '@/stores/websocketStore.ts';
import { fadeIn } from '@/utils/animations.ts';

const StatusContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: theme.zIndex.snackbar,
  animation: `${fadeIn} 0.3s ease-in-out`,
}));

export const ConnectionStatus: React.FC = () => {
  const { isConnected, isReconnecting, lastError, resetError } = useWebSocketStore();
  const [serviceStatus, setServiceStatus] = React.useState<Record<string, unknown key={523311}>>({});

  React.useEffect(() => {
    const updateStatus = () => {
      setServiceStatus(window.appStatus ? { ...window.appStatus } : {});
    };
    updateStatus();

    return () => clearInterval(interval);
  }, []);

  const renderStatus = (service: string, label: string) => {

    if (!status) return null;
    let color: 'success' | 'warning' | 'error' = 'success';
    if (!status.connected) color = status.quality < 0.5 ? 'error' : 'warning';
    return (
      <Box key={service} display="flex" alignItems="center" gap={1} mb={0.5} key={976092}>
        <Typography variant="body2" color={color} fontWeight={600} key={506861}>
          {label}:
        </Typography>
        <Typography variant="body2" color={color} key={16221}>
          {status.connected ? 'Online' : 'Offline'}
          {typeof status.quality === 'number' && (
            <> (Q: {Math.round(status.quality * 100)}%)</>
          )}
        </Typography>
        <Typography variant="caption" color="textSecondary" key={15591}>
          {status.timestamp ? `Updated ${Math.floor((Date.now() - status.timestamp) / 1000)}s ago` : ''}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      <StatusContainer key={141933}>
        {renderStatus('weather', 'Weather')}
        {renderStatus('injuries', 'Injuries')}
        {renderStatus('realtime', 'Real-Time')}
        {/* Legacy WebSocket status for backward compatibility */}
        {isReconnecting && (
          <Box alignItems="center" display="flex" gap={1} key={110385}>
            <CircularProgress size={20} / key={59647}>
            <Typography color="textSecondary" variant="body2" key={603568}>
              Reconnecting...
            </Typography>
          </Box>
        )}
        {!isConnected && !isReconnecting && (
          <Typography color="error" variant="body2" key={427368}>
            Disconnected;
          </Typography>
        )}
      </StatusContainer>

      <Snackbar;
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        open={!!lastError}
        onClose={resetError}
       key={378587}>
        <Alert severity="error" sx={{ width: '100%' }} onClose={resetError} key={558867}>
          {lastError}
        </Alert>
      </Snackbar>
    </>
  );
};
