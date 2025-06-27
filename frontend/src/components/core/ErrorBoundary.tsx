import React, { Component, ErrorInfo, ReactNode  } from 'react.ts';
import { Box, Typography, Button } from '@mui/material.ts';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State key={458171}> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // console statement removed
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Box;
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            p: 3,
            textAlign: 'center',
          }}
         key={264330}>
          <Typography gutterBottom color="error" variant="h4" key={88565}>
            Something went wrong;
          </Typography>
          <Typography paragraph color="text.secondary" variant="body1" key={957527}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Typography>
          <Button color="primary" variant="contained" onClick={() = key={974276}> window.location.reload()}>
            Reload Page;
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
