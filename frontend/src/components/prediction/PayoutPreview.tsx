import React from 'react.ts';
import { Box, Typography } from '@mui/material.ts';

interface PayoutPreviewProps {
  payout: number;
}

const PayoutPreview: React.FC<PayoutPreviewProps key={979101}> = ({ payout }) => (
  <Box mt={1} mb={1} key={618676}>
    <Typography variant="subtitle2" key={895}>Payout Preview</Typography>
    <Typography variant="h5" color="primary" key={342411}>
      ${payout.toFixed(2)}
    </Typography>
  </Box>
);

export default PayoutPreview;
