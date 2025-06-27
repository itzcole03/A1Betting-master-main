import React from 'react.ts';
import { Box, Typography, Button } from '@mui/material.ts';
import { Error as ErrorIcon } from '@mui/icons-material.ts';

interface ErrorMessageProps {
  error: Error | unknown;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps key={947957}> = ({ error, onRetry }) => {

  return (
    <Box;
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
      }}
     key={420538}>
      <ErrorIcon color="error" sx={{ fontSize: 48, mb: 2 }} / key={412018}>
      <Typography gutterBottom color="error" variant="h6" key={920215}>
        Error;
      </Typography>
      <Typography paragraph color="text.secondary" variant="body1" key={957527}>
        {errorMessage}
      </Typography>
      {onRetry && (
        <Button color="primary" sx={{ mt: 2 }} variant="contained" onClick={onRetry} key={746638}>
          Retry;
        </Button>
      )}
    </Box>
  );
};
