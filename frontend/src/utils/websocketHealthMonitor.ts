/**
 * WebSocket Health Monitor
 * Monitors WebSocket connections and provides health status
 */

interface ConnectionHealth {
  isHealthy: boolean;
  lastCheck: Date;
  errors: string[];
  reconnectAttempts: number;
}

class WebSocketHealthMonitor {
  private connections: Map<string, ConnectionHealth> = new Map();
  private checkInterval: NodeJS.Timeout | null = null;
  private readonly CHECK_INTERVAL = 30000; // 30 seconds

  constructor() {
    this.startMonitoring();
  }

  private startMonitoring() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      this.performHealthCheck();
    }, this.CHECK_INTERVAL);
  }

  private performHealthCheck() {
    this.connections.forEach((health, url) => {
      const timeSinceLastCheck = Date.now() - health.lastCheck.getTime();

      // If it's been too long since last update, mark as unhealthy
      if (timeSinceLastCheck > this.CHECK_INTERVAL * 2) {
        health.isHealthy = false;
        health.errors.push(
          `No activity for ${Math.round(timeSinceLastCheck / 1000)}s`,
        );
      }
    });
  }

  registerConnection(url: string) {
    this.connections.set(url, {
      isHealthy: true,
      lastCheck: new Date(),
      errors: [],
      reconnectAttempts: 0,
    });
  }

  updateConnectionHealth(url: string, isHealthy: boolean, error?: string) {
    const health = this.connections.get(url);
    if (health) {
      health.isHealthy = isHealthy;
      health.lastCheck = new Date();

      if (error) {
        health.errors.push(error);
        // Keep only last 5 errors
        if (health.errors.length > 5) {
          health.errors = health.errors.slice(-5);
        }
      }

      if (!isHealthy) {
        health.reconnectAttempts++;
      } else {
        health.reconnectAttempts = 0;
        health.errors = []; // Clear errors on successful connection
      }
    }
  }

  getConnectionHealth(url: string): ConnectionHealth | null {
    return this.connections.get(url) || null;
  }

  getAllConnections(): Map<string, ConnectionHealth> {
    return new Map(this.connections);
  }

  removeConnection(url: string) {
    this.connections.delete(url);
  }

  getOverallHealth(): {
    totalConnections: number;
    healthyConnections: number;
    unhealthyConnections: number;
    isOverallHealthy: boolean;
  } {
    const total = this.connections.size;
    const healthy = Array.from(this.connections.values()).filter(
      (h) => h.isHealthy,
    ).length;
    const unhealthy = total - healthy;

    return {
      totalConnections: total,
      healthyConnections: healthy,
      unhealthyConnections: unhealthy,
      isOverallHealthy: unhealthy === 0,
    };
  }

  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
    this.connections.clear();
  }
}

// Singleton instance
export const websocketHealthMonitor = new WebSocketHealthMonitor();

// Helper function to suppress known development WebSocket errors
export const suppressViteWebSocketErrors = () => {
  const originalConsoleError = console.error;

  console.error = (...args) => {
    const message = args.join(" ");

    // Suppress Vite HMR WebSocket errors
    if (
      message.includes("WebSocket closed without opened") ||
      message.includes("WebSocket connection") ||
      message.includes("@vite/client")
    ) {
      return; // Suppress the error
    }

    // Call original console.error for other errors
    originalConsoleError.apply(console, args);
  };
};

// Auto-initialize error suppression in development
if (import.meta.env.DEV) {
  suppressViteWebSocketErrors();
}
