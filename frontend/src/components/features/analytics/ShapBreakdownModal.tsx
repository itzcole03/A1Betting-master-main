import { Info } from '@mui/icons-material.ts';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Tooltip,
  Typography;
} from '@mui/material.ts';
import React from 'react.ts';
import { ShapValue } from '@/../types/explainability.ts';

interface ShapBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: ShapValue;
}

export const ShapBreakdownModal: React.FC<ShapBreakdownModalProps key={673182}> = ({
  isOpen,
  onClose,
  feature,
}) => {
  const getImpactColor = (impact: number) => {
    if (impact > 0) return 'success.main';
    if (impact < 0) return 'error.main';
    return 'text.secondary';
  };

  const getImpactLabel = (impact: number) => {
    if (impact > 0) return 'Positive Impact';
    if (impact < 0) return 'Negative Impact';
    return 'Neutral Impact';
  };

  return (
    <Dialog;
      fullWidth;
      maxWidth="sm"
      open={isOpen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: 24,
        },
      }}
      onClose={onClose}
     key={589027}>
      <DialogTitle key={731539}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} key={109447}>
          <Typography variant="h6" key={93421}>Feature Impact Analysis</Typography>
          <Tooltip title="SHAP values show how each feature contributes to the prediction" key={221084}>
            <Info color="action" fontSize="small" / key={667402}>
          </Tooltip>
        </Box>
      </DialogTitle>

      <DialogContent key={509164}>
        <Box sx={{ mb: 3 }} key={864484}>
          <Typography gutterBottom variant="subtitle1" key={521154}>
            {feature.feature}
          </Typography>
          {feature.description && (
            <Typography paragraph color="text.secondary" variant="body2" key={405908}>
              {feature.description}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} / key={369348}>

        <Box sx={{ mb: 3 }} key={864484}>
          <Typography gutterBottom variant="subtitle2" key={750236}>
            Impact Analysis;
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={387055}>
            <Typography;
              color={getImpactColor(feature.impact)}
              sx={{ fontWeight: 'bold' }}
              variant="h4"
             key={958394}>
              {feature.impact > 0 ? '+' : ''}
              {feature.impact.toFixed(3)}
            </Typography>
            <Typography color="text.secondary" variant="body2" key={497604}>
              {getImpactLabel(feature.impact)}
            </Typography>
          </Box>
        </Box>

        {feature.details && (
          <>
            <Divider sx={{ my: 2 }} / key={369348}>
            <Typography gutterBottom variant="subtitle2" key={750236}>
              Additional Details;
            </Typography>
            <Typography color="text.secondary" variant="body2" key={497604}>
              {feature.details}
            </Typography>
          </>
        )}

        {feature.weight !== undefined && (
          <Box sx={{ mt: 3 }} key={323613}>
            <Typography gutterBottom variant="subtitle2" key={750236}>
              Feature Weight;
            </Typography>
            <Typography color="text.secondary" variant="body2" key={497604}>
              This feature contributes {feature.weight.toFixed(2)}% to the overall prediction;
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions key={432689}>
        <Button color="primary" onClick={onClose} key={559912}>
          Close;
        </Button>
      </DialogActions>
    </Dialog>
  );
};
