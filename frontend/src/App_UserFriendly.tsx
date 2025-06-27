import React from 'react.ts';
import { QueryClientProvider } from '@tanstack/react-query.ts';

// Import Chart.js setup (must be imported early)
import "./utils/chartSetup";

// Import the user-friendly main interface;
import UserFriendlyApp from './components/user-friendly/UserFriendlyApp.ts';

// Import theme provider;
import { ThemeProvider } from './components/common/theme/ThemeProvider.ts';

// Import optimized performance utilities;
import { createOptimizedQueryClient } from './utils/performance.ts';

// Import enhanced error boundary;
import EnhancedErrorBoundary from './components/ui/EnhancedErrorBoundary.ts';

// Import analytics;
import { analytics } from './utils/analytics.ts';

// Import styling;
import "./App.css";

// Create optimized query client with enhanced caching;

/**
 * Main App Component - Enhanced with Performance Optimizations;
 *
 * Features:
 * - Performance-optimized query client with intelligent caching;
 * - Enhanced error boundaries with retry mechanisms;
 * - Real-time analytics and monitoring;
 * - Theme provider for consistent styling;
 * - Chart.js setup for advanced analytics;
 */
const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient} key={826303}>
            <ThemeProvider defaultTheme="dark" key={871271}>
                <EnhancedErrorBoundary;
                    showDetails={process.env.NODE_ENV === 'development'}
                    onError={(error, errorInfo) = key={954439}> {
                        analytics.trackError(error, 'App Component');
                    }}
                >
                    <UserFriendlyApp / key={406081}>
                </EnhancedErrorBoundary>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
