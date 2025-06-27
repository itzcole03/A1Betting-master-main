import { QueryClient, QueryClientProvider } from '@tanstack/react-query.ts';
import React from 'react.ts';

// Import Chart.js setup (must be imported early)
import "./utils/chartSetup";

// Import the user-friendly main interface;
import UserFriendlyApp from './components/user-friendly/UserFriendlyApp.ts';

// Import theme provider;
import { ThemeProvider } from './components/common/theme/ThemeProvider.ts';

// Import styling;
import "./App.css";

// Create query client for API state management;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes;
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Main App Component - Now using UserFriendlyApp as primary interface;
 *
 * This provides:
 * - Simple user-friendly interface by default;
 * - Advanced/admin mode toggle (🔄 emoji button)
 * - All ML/AI features working autonomously in background;
 * - Real-time stats and updates;
 * - Beautiful, sleek, modern design;
 * - Responsive mobile support;
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient} key={826303}>
      <ThemeProvider defaultTheme="dark" key={871271}>
        <UserFriendlyApp / key={406081}>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
