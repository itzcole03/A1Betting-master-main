import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";

// Import Chart.js setup (must be imported early)
import "./utils/chartSetup";

// Import the user-friendly main interface
import UserFriendlyApp from "./components/user-friendly/UserFriendlyApp";

// Import theme provider
import { ThemeProvider } from "./components/common/theme/ThemeProvider";

// Import optimized performance utilities
import { createOptimizedQueryClient } from "./utils/performance";

// Import enhanced error boundary
import EnhancedErrorBoundary from "./components/ui/EnhancedErrorBoundary";

// Import analytics
import { analytics } from "./utils/analytics";

// Import styling
import "./App.css";

// Create optimized query client with enhanced caching
const queryClient = createOptimizedQueryClient();

/**
 * Main App Component - Enhanced with Performance Optimizations
 *
 * Features:
 * - Performance-optimized query client with intelligent caching
 * - Enhanced error boundaries with retry mechanisms
 * - Real-time analytics and monitoring
 * - Theme provider for consistent styling
 * - Chart.js setup for advanced analytics
 */
const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark">
                <EnhancedErrorBoundary
                    showDetails={process.env.NODE_ENV === 'development'}
                    onError={(error, errorInfo) => {
                        analytics.trackError(error, 'App Component');
                    }}
                >
                    <UserFriendlyApp />
                </EnhancedErrorBoundary>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default App;
