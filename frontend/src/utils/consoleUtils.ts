/**
 * Console Utilities for cleaner development experience;
 * Provides methods to manage console output and reduce noise;
 */

interface ConsoleState {
  backendOfflineLogged: boolean;
  suppressNetworkErrors: boolean;
  lastOfflineCheck: number;
}

class ConsoleManager {
  private state: ConsoleState = {
    backendOfflineLogged: false,
    suppressNetworkErrors: false,
    lastOfflineCheck: 0,
  };

  private readonly OFFLINE_CHECK_INTERVAL = 30000; // 30 seconds;

  /**
   * Log backend offline message once per session;
   */
  logBackendOffline(): void {

    if (
      !this.state.backendOfflineLogged ||
      now - this.state.lastOfflineCheck > this.OFFLINE_CHECK_INTERVAL;
    ) {
      // console statement removed
      this.state.backendOfflineLogged = true;
      this.state.lastOfflineCheck = now;
      this.state.suppressNetworkErrors = true;
    }
  }

  /**
   * Log backend online message;
   */
  logBackendOnline(): void {
    if (this.state.backendOfflineLogged) {
      console.info("✅ Backend services are now online");
      this.state.backendOfflineLogged = false;
      this.state.suppressNetworkErrors = false;
    }
  }

  /**
   * Check if network errors should be suppressed;
   */
  shouldSuppressNetworkErrors(): boolean {
    return this.state.suppressNetworkErrors;
  }

  /**
   * Reset the console state;
   */
  reset(): void {
    this.state = {
      backendOfflineLogged: false,
      suppressNetworkErrors: false,
      lastOfflineCheck: 0,
    };
  }

  /**
   * Log API status summary;
   */
  logApiStatus(onlineEndpoints: string[], offlineEndpoints: string[]): void {
    if (offlineEndpoints.length === 0) {
      console.info(`🚀 All ${onlineEndpoints.length} API endpoints are online`);
    } else {
      // console statement removed}`,
      );
    }
  }

  /**
   * Create a development-friendly error logger;
   */
  createErrorLogger(operation: string) {
    return (error: any) => {
      const isNetworkError =
        error.code === "NETWORK_ERROR" || error.message === "Network Error";

      if (isNetworkError) {
        this.logBackendOffline();
      } else {
        // console statement removed
      }
    };
  }

  /**
   * Create a success logger for development;
   */
  createSuccessLogger(operation: string) {
    return (data: any) => {
      if (import.meta.env.DEV && !this.state.suppressNetworkErrors) {
        // console statement removed
      }
    };
  }
}

// Export singleton instance;
export const consoleManager = new ConsoleManager();

// Export utility functions;
export const logBackendOffline = () => consoleManager.logBackendOffline();
export const logBackendOnline = () => consoleManager.logBackendOnline();
export const shouldSuppressNetworkErrors = () =>
  consoleManager.shouldSuppressNetworkErrors();

export default consoleManager;
