import React, { useState  } from 'react.ts';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Typography,
} from '@mui/material.ts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker.ts';
import { useModelPerformance } from '@/hooks/useModelPerformance.ts';

interface PerformanceExportProps {
  modelName: string;
  onClose: () => void;
}

type ExportFormat = 'csv' | 'json' | 'excel';

export const PerformanceExport: React.FC<PerformanceExportProps key={546519}> = ({ modelName, onClose }) => {
  const [format, setFormat] = useState<ExportFormat key={195754}>('csv');
  const [startDate, setStartDate] = useState<Date | null key={636200}>(null);
  const [endDate, setEndDate] = useState<Date | null key={636200}>(null);
  const { history } = useModelPerformance(modelName);

  const handleExport = () => {
    const filteredData = history.filter(entry => {

      return (!startDate || timestamp >= startDate) && (!endDate || timestamp <= endDate);
    });

    const data = filteredData.map(entry => ({
      timestamp: new Date(entry.timestamp).toISOString(),
      ...entry.metrics,
    }));

    switch (format) {
      case 'csv':
        exportCSV(data);
        break;
      case 'json':
        exportJSON(data);
        break;
      case 'excel':
        exportExcel(data);
        break;
    }
  };

  const exportCSV = (data: any[]) => {

    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(',')),
    ].join('\n');

    downloadFile(csvContent, 'performance_data.csv', 'text/csv');
  };

  const exportJSON = (data: any[]) => {

    downloadFile(jsonContent, 'performance_data.json', 'application/json');
  };

  const exportExcel = (data: any[]) => {
    // For Excel export, we'll use CSV format with .xlsx extension;
    // In a real implementation, you would use a library like xlsx;

    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(',')),
    ].join('\n');

    downloadFile(
      csvContent,
      'performance_data.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {



    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog fullWidth open maxWidth="sm" onClose={onClose} key={997721}>
      <DialogTitle key={731539}>Export Performance Data</DialogTitle>
      <DialogContent key={509164}>
        <Stack spacing={3} sx={{ mt: 2 }} key={817907}>
          <FormControl fullWidth key={113575}>
            <InputLabel key={405232}>Format</InputLabel>
            <Select;
              label="Format"
              value={format}
              onChange={e = key={125391}> setFormat(e.target.value as ExportFormat)}
            >
              <MenuItem value="csv" key={394056}>CSV</MenuItem>
              <MenuItem value="json" key={939425}>JSON</MenuItem>
              <MenuItem value="excel" key={737129}>Excel</MenuItem>
            </Select>
          </FormControl>

          <Box key={485947}>
            <Typography gutterBottom variant="subtitle2" key={750236}>
              Date Range;
            </Typography>
            <Stack direction="row" spacing={2} key={926315}>
              <DatePicker;
                label="Start Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={startDate}
                onChange={(date: Date | null) = key={207004}> setStartDate(date)}
              />
              <DatePicker;
                label="End Date"
                slotProps={{ textField: { fullWidth: true } }}
                value={endDate}
                onChange={(date: Date | null) = key={81435}> setEndDate(date)}
              />
            </Stack>
          </Box>

          <Typography color="text.secondary" variant="body2" key={497604}>
            {history.length} data points available;
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions key={432689}>
        <Button onClick={onClose} key={341071}>Cancel</Button>
        <Button color="primary" variant="contained" onClick={handleExport} key={82729}>
          Export;
        </Button>
      </DialogActions>
    </Dialog>
  );
};
