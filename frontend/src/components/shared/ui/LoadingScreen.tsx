import React from 'react.ts';
import { Box, CircularProgress, Typography } from '@mui/material.ts';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps key={316746}> = ({ message = 'Loading...' }) => {
  return (
    <Box;
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
     key={937315}>
      <CircularProgress;
        size={60}
        sx={{
          color: 'primary.main',
          mb: 2,
        }}
        thickness={4}
      / key={76634}>
      <Typography;
        color="text.secondary"
        sx={{
          mt: 2,
          textAlign: 'center',
        }}
        variant="h6"
       key={980264}>
        {message}
      </Typography>
    </Box>
  );
};
