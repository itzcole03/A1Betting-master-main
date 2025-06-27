import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { jsx as _jsx } from "react/jsx-runtime";
// Import providers and utilities;
import ErrorBoundary from "./components/ErrorBoundary";
import { SafeThemeProvider } from "./providers/SafeThemeProvider";
// Import the new intelligent merged interface;
import IntelligentMergedInterface from "./components/unified/IntelligentMergedInterface";
// Import styling;
import "./App.css";
import "./styles/enhanced-modern-theme.css";

// ============================================================================
// CONFIGURATION;
// ============================================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300000,
      gcTime: 600000, // Updated from cacheTime;
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      refetchInterval: false,
    },
  },
});

// ============================================================================
// MAIN APP COMPONENT;
// ============================================================================
const App = () => {
  return _jsx(ErrorBoundary, {
    children: _jsx(QueryClientProvider, {
      client: queryClient,
      children: _jsx(SafeThemeProvider, {
        children: _jsx(IntelligentMergedInterface, {}),
      }),
    }),
  });
};

export default App;
