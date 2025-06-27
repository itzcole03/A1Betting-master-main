import React, { useState, useEffect  } from 'react.ts';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material.ts';
import { Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material.ts';
import { errorLogger, ErrorLog } from '@/utils/errorLogger.ts';

export const ErrorLogs: React.FC = () => {
  const [logs, setLogs] = useState<ErrorLog[] key={380670}>([]);
  const [severityFilter, setSeverityFilter] = useState<ErrorLog['severity'] | 'all' key={177356}>('all');

  const fetchLogs = () => {

    setLogs(allLogs);
  };

  useEffect(() => {
    fetchLogs();
    // Refresh logs every 30 seconds;

    return () => clearInterval(interval);
  }, []);

  const handleClearLogs = () => {
    errorLogger.clearLogs();
    setLogs([]);
  };

  const handleSeverityChange = (event: any) => {

    setSeverityFilter(severity);
  };

  const filteredLogs =
    severityFilter === 'all' ? logs : logs.filter(log => log.severity === severityFilter);

  const getSeverityColor = (severity: ErrorLog['severity']) => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }} key={610966}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }} key={317418}>
        <Typography variant="h6" key={93421}>Error Logs</Typography>
        <Box sx={{ display: 'flex', gap: 2 }} key={205992}>
          <FormControl sx={{ minWidth: 120 }} key={602970}>
            <InputLabel key={405232}>Severity</InputLabel>
            <Select;
              label="Severity"
              size="small"
              value={severityFilter}
              onChange={handleSeverityChange}
             key={219486}>
              <MenuItem value="all" key={641531}>All</MenuItem>
              <MenuItem value="error" key={173409}>Error</MenuItem>
              <MenuItem value="warning" key={22971}>Warning</MenuItem>
              <MenuItem value="info" key={783621}>Info</MenuItem>
            </Select>
          </FormControl>
          <IconButton color="primary" onClick={fetchLogs} key={595331}>
            <RefreshIcon / key={544473}>
          </IconButton>
          <IconButton color="error" onClick={handleClearLogs} key={736051}>
            <DeleteIcon / key={636687}>
          </IconButton>
        </Box>
      </Box>

      <TableContainer key={611233}>
        <Table size="small" key={822594}>
          <TableHead key={813147}>
            <TableRow key={300096}>
              <TableCell key={942983}>Timestamp</TableCell>
              <TableCell key={942983}>Severity</TableCell>
              <TableCell key={942983}>Message</TableCell>
              <TableCell key={942983}>Context</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key={923191}>
            {filteredLogs.map((log, index) => (
              <TableRow key={index} key={177740}>
                <TableCell key={942983}>{new Date(log.timestamp).toLocaleString()}</TableCell>
                <TableCell key={942983}>
                  <Chip color={getSeverityColor(log.severity)} label={log.severity} size="small" / key={355259}>
                </TableCell>
                <TableCell key={942983}>{log.message}</TableCell>
                <TableCell key={942983}>
                  {log.context ? (
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }} key={535454}>
                      {JSON.stringify(log.context, null, 2)}
                    </pre>
                  ) : (
                    '-'
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredLogs.length === 0 && (
              <TableRow key={300096}>
                <TableCell align="center" colSpan={4} key={394114}>
                  No logs found;
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
