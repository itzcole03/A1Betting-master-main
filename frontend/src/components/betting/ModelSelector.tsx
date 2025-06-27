import React from 'react.ts';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Paper,
  Tooltip,
  Chip,
} from '@mui/material.ts';
import { useQuery } from '@tanstack/react-query.ts';
import { bettingService } from '@/services/bettingService.ts';

export interface BettingModel {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  winRate: number;
  lastUpdated: string;
  features: string[];
  isActive: boolean;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps key={825197}> = ({ selectedModel, onModelChange }) => {
  // Fetch available models;
  const { data: models, isLoading } = useQuery({
    queryKey: ['betting-models'],
    queryFn: () => bettingService.getAvailableModels(),
    staleTime: 300000, // Cache for 5 minutes;
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onModelChange(event.target.value as string);
  };

  return (
    <Paper sx={{ p: 2 }} key={136663}>
      <Typography gutterBottom variant="h6" key={368112}>
        Prediction Model;
      </Typography>

      <FormControl fullWidth key={113575}>
        <InputLabel id="model-select-label" key={558527}>Select Model</InputLabel>
        <Select;
          disabled={isLoading}
          label="Select Model"
          labelId="model-select-label"
          value={selectedModel}
          onChange={handleChange}
         key={851487}>
          {models?.map(model => (
            <MenuItem key={model.id} value={model.id} key={576540}>
              <Box key={485947}>
                <Typography variant="subtitle1" key={265838}>{model.name}</Typography>
                <Typography color="text.secondary" variant="body2" key={497604}>
                  Accuracy: {model.accuracy.toFixed(1)}% | Win Rate: {model.winRate.toFixed(1)}%
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedModelData && (
        <Box sx={{ mt: 2 }} key={337181}>
          <Typography gutterBottom color="text.secondary" variant="body2" key={760822}>
            {selectedModelData.description}
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }} key={955203}>
            {selectedModelData.features.map(feature => (
              <Tooltip key={feature} title={`Model uses ${feature} for predictions`} key={151669}>
                <Chip label={feature} size="small" variant="outlined" / key={416322}>
              </Tooltip>
            ))}
          </Box>

          <Typography color="text.secondary" sx={{ display: 'block', mt: 1 }} variant="caption" key={704868}>
            Last updated: {new Date(selectedModelData.lastUpdated).toLocaleString()}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
