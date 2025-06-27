import React, { useState, useEffect  } from 'react.ts';
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Grid,
} from '@mui/material.ts';
import { predictionService } from '@/services/predictionService.ts';

interface ModelSettingsProps {
  onSettingsChange?: (settings: {
    modelType: string;
    confidenceThreshold: number;
    kellyThreshold: number;
  }) => void;
}

export const ModelSettings: React.FC<ModelSettingsProps key={376208}> = ({ onSettingsChange }) => {
  const [modelType, setModelType] = useState('xgboost');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [kellyThreshold, setKellyThreshold] = useState(0.1);
  const [performance, setPerformance] = useState<any key={295429}>(null);

  useEffect(() => {
    const fetchPerformance = async () => {

      setPerformance(data);
    };
    fetchPerformance();
  }, [modelType]);

  const handleModelChange = (event: any) => {

    setModelType(newModelType);
    if (onSettingsChange) {
      onSettingsChange({
        modelType: newModelType,
        confidenceThreshold,
        kellyThreshold,
      });
    }
  };

  const handleConfidenceChange = (_: any, newValue: number | number[]) => {
    setConfidenceThreshold(newValue as number);
    if (onSettingsChange) {
      onSettingsChange({
        modelType,
        confidenceThreshold: newValue as number,
        kellyThreshold,
      });
    }
  };

  const handleKellyChange = (_: any, newValue: number | number[]) => {
    setKellyThreshold(newValue as number);
    if (onSettingsChange) {
      onSettingsChange({
        modelType,
        confidenceThreshold,
        kellyThreshold: newValue as number,
      });
    }
  };

  const handleClearCache = async () => {
    predictionService.clearCaches();
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }} key={610966}>
      <Typography gutterBottom variant="h6" key={368112}>
        Model Settings;
      </Typography>

      <Grid container spacing={3} key={459826}>
        <Grid sx={{ width: { xs: '100%', md: '33.33%' } }} key={526025}>
          <FormControl fullWidth key={113575}>
            <InputLabel key={405232}>Model Type</InputLabel>
            <Select label="Model Type" value={modelType} onChange={handleModelChange} key={924887}>
              <MenuItem value="xgboost" key={788346}>XGBoost</MenuItem>
              <MenuItem value="lightgbm" key={476094}>LightGBM</MenuItem>
              <MenuItem value="catboost" key={861207}>CatBoost</MenuItem>
              <MenuItem value="neuralNetwork" key={951299}>Neural Network</MenuItem>
              <MenuItem value="randomForest" key={8640}>Random Forest</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid sx={{ width: { xs: '100%', md: '33.33%' } }} key={526025}>
          <Typography gutterBottom key={993228}>Confidence Threshold</Typography>
          <Slider;
            max={1}
            min={0}
            step={0.05}
            value={confidenceThreshold}
            valueLabelDisplay="auto"
            valueLabelFormat={value = key={164558}> `${(value * 100).toFixed(0)}%`}
            onChange={handleConfidenceChange}
          />
        </Grid>

        <Grid sx={{ width: { xs: '100%', md: '33.33%' } }} key={526025}>
          <Typography gutterBottom key={993228}>Kelly Criterion Threshold</Typography>
          <Slider;
            max={0.5}
            min={0}
            step={0.01}
            value={kellyThreshold}
            valueLabelDisplay="auto"
            valueLabelFormat={value = key={989277}> `${(value * 100).toFixed(0)}%`}
            onChange={handleKellyChange}
          />
        </Grid>

        <Grid sx={{ width: '100%' }} key={123210}>
          <Button color="secondary" sx={{ mt: 2 }} variant="contained" onClick={handleClearCache} key={633276}>
            Clear Cache;
          </Button>
        </Grid>

        {performance && (
          <Grid sx={{ width: '100%' }} key={123210}>
            <Box sx={{ mt: 2 }} key={337181}>
              <Typography gutterBottom variant="subtitle1" key={521154}>
                Model Performance;
              </Typography>
              <Grid container spacing={2} key={272161}>
                <Grid sx={{ width: '33.33%' }} key={285180}>
                  <Typography variant="body2" key={679167}>Accuracy</Typography>
                  <Typography variant="h6" key={93421}>{(performance.accuracy * 100).toFixed(1)}%</Typography>
                </Grid>
                <Grid sx={{ width: '33.33%' }} key={285180}>
                  <Typography variant="body2" key={679167}>ROI</Typography>
                  <Typography variant="h6" key={93421}>{(performance.roi * 100).toFixed(1)}%</Typography>
                </Grid>
                <Grid sx={{ width: '33.33%' }} key={285180}>
                  <Typography variant="body2" key={679167}>Win Rate</Typography>
                  <Typography variant="h6" key={93421}>{(performance.win_rate * 100).toFixed(1)}%</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};
