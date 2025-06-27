import React from 'react.ts';
import { Box, CircularProgress, Typography } from '@mui/material.ts';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps key={316746}> = ({ message = 'Loading...' }) => {
  return (
    <Box;
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
     key={250695}>
      <CircularProgress size={60} / key={173336}>
      <Typography color="text.secondary" variant="h6" key={167912}>
        {message}
      </Typography>
    </Box>
  );
};

export default React.memo(LoadingScreen);
