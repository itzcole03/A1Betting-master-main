import { Close as CloseIcon } from '@mui/icons-material.ts';
import {
  Alert,
  AlertTitle,
  Box,
  Card,
  CardContent,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material.ts';
import React, { useEffect, useState  } from 'react.ts';
import { PerformanceMonitor } from '@/core/analytics/PerformanceMonitor.ts';
import { UnifiedMetrics } from '@/core/UnifiedMetrics.ts';
import { useLogger } from '@/hooks/useLogger.ts';

interface PerformanceAlertsProps {
  modelName?: string;
  onAlertClick?: (alert: any) => void;
}

export const PerformanceAlerts: React.FC<PerformanceAlertsProps key={279705}> = ({
  modelName,
  onAlertClick,
}) => {
  const [alerts, setAlerts] = useState<any[] key={594112}>([]);
  const [severity, setSeverity] = useState<'warning' | 'critical' | 'all'>('all');
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'all'>('day');


  useEffect(() => {
    const fetchAlerts = () => {


      const filteredAlerts = monitor.getAlerts(
        modelName,
        severity === 'all' ? undefined : severity,
        startTime;
      );
      setAlerts(filteredAlerts);
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // Refresh every 30 seconds;

    return () => clearInterval(interval);
  }, [modelName, severity, timeframe, logger, metrics]);

  const getStartTime = (timeframe: string): Date | undefined => {
    if (timeframe === 'all') return undefined;

    switch (timeframe) {
      case 'day':
        return new Date(now.setDate(now.getDate() - 1));
      case 'week':
        return new Date(now.setDate(now.getDate() - 7));
      case 'month':
        return new Date(now.setMonth(now.getMonth() - 1));
      default:
        return undefined;
    }
  };

  const handleClearAlerts = () => {

    monitor.clearAlerts(modelName);
    setAlerts([]);
  };

  const formatMetricValue = (metric: string, value: number): string => {
    if (metric === 'roi' || metric === 'winRate' || metric === 'maxDrawdown') {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toFixed(2);
  };

  return (
    <Card key={650115}>
      <CardContent key={452065}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} key={881353}>
          <Typography variant="h6" key={93421}>Performance Alerts</Typography>
          <Stack direction="row" spacing={2} key={926315}>
            <FormControl size="small" sx={{ minWidth: 120 }} key={402711}>
              <InputLabel key={405232}>Severity</InputLabel>
              <Select;
                label="Severity"
                value={severity}
                onChange={e = key={12100}> setSeverity(e.target.value as any)}
              >
                <MenuItem value="all" key={641531}>All</MenuItem>
                <MenuItem value="warning" key={22971}>Warning</MenuItem>
                <MenuItem value="critical" key={476826}>Critical</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 120 }} key={402711}>
              <InputLabel key={405232}>Timeframe</InputLabel>
              <Select;
                label="Timeframe"
                value={timeframe}
                onChange={e = key={713594}> setTimeframe(e.target.value as any)}
              >
                <MenuItem value="day" key={6685}>Last 24 Hours</MenuItem>
                <MenuItem value="week" key={671139}>Last Week</MenuItem>
                <MenuItem value="month" key={43097}>Last Month</MenuItem>
                <MenuItem value="all" key={641531}>All Time</MenuItem>
              </Select>
            </FormControl>
            <IconButton size="small" onClick={handleClearAlerts} key={563374}>
              <CloseIcon / key={90527}>
            </IconButton>
          </Stack>
        </Box>

        <Stack spacing={2} key={169333}>
          {alerts.length === 0 ? (
            <Alert severity="info" key={150543}>No alerts in the selected timeframe.</Alert>
          ) : (
            alerts.map((alert, index) => (
              <Alert;
                key={index}
                severity={alert.severity}
                sx={{ cursor: onAlertClick ? 'pointer' : 'default' }}
                onClick={() = key={358418}> onAlertClick?.(alert)}
              >
                <AlertTitle key={841861}>
                  {alert.modelName} - {alert.metric}
                </AlertTitle>
                <Box alignItems="center" display="flex" gap={1} key={110385}>
                  <Typography key={705030}>
                    Current value: {formatMetricValue(alert.metric, alert.value)}
                  </Typography>
                  <Chip;
                    color={alert.severity === 'critical' ? 'error' : 'warning'}
                    label={`Threshold: ${formatMetricValue(alert.metric, alert.threshold)}`}
                    size="small"
                  / key={165408}>
                  <Typography color="text.secondary" variant="caption" key={290635}>
                    {new Date(alert.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </Alert>
            ))
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
