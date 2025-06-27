import React from 'react.ts';
import { Box, Typography, Button } from '@mui/material.ts';
import { Error as ErrorIcon } from '@mui/icons-material.ts';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps key={153417}> = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <Box;
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
        p: 3,
      }}
     key={258169}>
      <ErrorIcon color="error" sx={{ fontSize: 48 }} / key={846259}>
      <Typography align="center" color="error" variant="h6" key={275695}>
        {message}
      </Typography>
      {onRetry && (
        <Button color="primary" sx={{ mt: 2 }} variant="contained" onClick={onRetry} key={746638}>
          Try Again;
        </Button>
      )}
    </Box>
  );
};

export default React.memo(ErrorState);
