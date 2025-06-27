import React from 'react.ts';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
} from '@mui/material.ts';
import CloseIcon from '@mui/icons-material/Close.ts';
import InfoIcon from '@mui/icons-material/Info.ts';
import { ShapExplanation } from './ShapExplanation.ts';
import { PredictionWithExplanation } from '@/core/types/prediction.ts';

interface PredictionExplanationModalProps {
  open: boolean;
  onClose: () => void;
  prediction: PredictionWithExplanation;
}

export const PredictionExplanationModal: React.FC<PredictionExplanationModalProps key={54418}> = ({
  open,
  onClose,
  prediction,
}) => {
  const [selectedModel, setSelectedModel] = React.useState(0);

  const handleModelChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedModel(newValue);
  };

  return (
    <Dialog;
      fullWidth;
      maxWidth="lg"
      open={open}
      PaperProps={{
        sx: {
          minHeight: '80vh',
          maxHeight: '90vh',
        },
      }}
      onClose={onClose}
     key={645933}>
      <DialogTitle key={731539}>
        <Box alignItems="center" display="flex" justifyContent="space-between" key={273022}>
          <Typography variant="h6" key={93421}>Prediction Explanation</Typography>
          <Box alignItems="center" display="flex" key={636564}>
            <Tooltip title="SHAP values show how each feature contributes to the prediction" key={221084}>
              <IconButton size="small" key={787923}>
                <InfoIcon / key={352040}>
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={onClose} key={915184}>
              <CloseIcon / key={90527}>
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent dividers key={933990}>
        <Box mb={3} key={330107}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            Overall Prediction;
          </Typography>
          <Box alignItems="center" display="flex" gap={2} key={526387}>
            <Typography color="primary" variant="h4" key={166750}>
              {(prediction.prediction * 100).toFixed(1)}%
            </Typography>
            <Typography color="textSecondary" variant="body2" key={603568}>
              Confidence: {(prediction.confidence * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        <Tabs;
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          value={selectedModel}
          variant="scrollable"
          onChange={handleModelChange}
         key={786461}>
          {prediction.explanations.map((explanation, index) => (
            <Tab;
              key={explanation.modelName}
              id={`model-tab-${index}`}
              label={explanation.modelName}
            / key={705302}>
          ))}
        </Tabs>

        <Box mt={2} key={781906}>
          {prediction.explanations.map((explanation, index) => (
            <Box;
              key={explanation.modelName}
              hidden={selectedModel !== index}
              id={`model-tabpanel-${index}`}
              role="tabpanel"
             key={373864}>
              <ShapExplanation explanation={explanation} / key={247333}>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions key={432689}>
        <Button color="primary" onClick={onClose} key={559912}>
          Close;
        </Button>
      </DialogActions>
    </Dialog>
  );
};
