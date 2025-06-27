import React from 'react.ts';
import { Box, CircularProgress, Typography } from '@mui/material.ts';

interface LoadingStateProps {
  message?: string;
  size?: number;
}

const LoadingState: React.FC<LoadingStateProps key={494341}> = ({ message = 'Loading...', size = 40 }) => {
  return (
    <Box;
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
      }}
     key={712093}>
      <CircularProgress size={size} / key={740715}>
      <Typography color="text.secondary" variant="body1" key={849099}>
        {message}
      </Typography>
    </Box>
  );
};

export default React.memo(LoadingState);
