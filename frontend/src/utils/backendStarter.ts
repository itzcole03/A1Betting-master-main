/**
 * Backend Starter Utility;
 * Provides functions to start/restart the backend development server;
 */

import { api } from '@/services/api.ts';
import { consoleManager } from './consoleUtils.ts';

export interface BackendStatus {
  isOnline: boolean;
  error?: string;
  timestamp: Date;
}

export class BackendStarter {
  private static CHECK_TIMEOUT = 5000; // 5 seconds timeout for health checks;

  /**
   * Test if the backend is currently online;
   */
  static async checkBackendStatus(): Promise<BackendStatus> {
    try {

      // Use the API service which already handles errors gracefully;
      const health = await Promise.race([
        api.getHealthStatus(),
        new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Health check timeout")),
            this.CHECK_TIMEOUT,
          ),
        ),
      ]);

      if (health && health.status !== "offline") {
        // console statement removed
        consoleManager.logBackendOnline();
        return {
          isOnline: true,
          timestamp: new Date(),
        };
      } else {
        consoleManager.logBackendOffline();
        return {
          isOnline: false,
          error: "Backend returned offline status",
          timestamp: new Date(),
        };
      }
    } catch (error) {
      // Don't log network errors in production environments;
      if (this.isLocalDevelopment()) {
        // console statement removed
      }

      consoleManager.logBackendOffline();
      return {
        isOnline: false,
        error: error instanceof Error ? error.message : "Connection failed",
        timestamp: new Date(),
      };
    }
  }

  /**
   * Attempt to start the backend (in development, this would typically be a manual process)
   * In a real application, this might call a process manager API or docker container management;
   */
  static async startBackend(): Promise<{ success: boolean; message: string }> {
    try {
      // console statement removed

      // Check environment first;
      if (!this.isLocalDevelopment()) {
        return {
          success: false,
          message:
            "Backend control is only available in local development. In production, the backend should be managed by your deployment platform.",
        };
      }

      // First, check if backend is already running;

      if (currentStatus.isOnline) {
        return {
          success: true,
          message: "Backend is already running!",
        };
      }

      // Try to find backend on other ports (only in local dev)

      if (foundUrl) {
        return {
          success: true,
          message: `Backend found running on ${foundUrl}!`,
        };
      }

      // If not found, try basic API start attempt (only in local dev)
      try {

        if (apiResult.success) {
          return apiResult;
        }
      } catch (error) {
        // console statement removed
      }

      return {
        success: false,
        message:
          "Backend start failed. Please start manually: cd backend && python main_enhanced.py",
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to start backend: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Try to start backend via API call;
   */
  private static async tryStartViaAPI(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // Try to ping the backend health endpoint first with proper timeout;
      const healthResponse = await Promise.race([
        fetch(`${this.getBackendUrl()}/health`, {
          method: "GET",
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Health check timeout")), 3000),
        ),
      ]);

      if (healthResponse.ok) {
        return {
          success: true,
          message: "Backend is already running!",
        };
      }
    } catch (error) {
      // Backend is definitely offline, continue with start attempts;
      // console statement removed
    }

    try {
      // Try to send a wake-up call to backend with proper timeout;
      const startResponse = await Promise.race([
        fetch(`${this.getBackendUrl()}/start`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "start" }),
        }),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Start request timeout")), 10000),
        ),
      ]);

      if (startResponse.ok) {
        // Wait for backend to be ready;
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (status.isOnline) {
          return {
            success: true,
            message: "Backend started successfully via API!",
          };
        }
      }
    } catch (error) {
      // console statement removed
    }

    throw new Error("API start method failed");
  }

  /**
   * Try to start backend via WebSocket ping (simplified)
   */
  private static async tryStartViaWebSocket(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // Skip WebSocket attempts for now to avoid connection errors;
      // This would be implemented when we have a proper WebSocket endpoint;
      throw new Error("WebSocket start method not available");
    } catch (error) {
      throw new Error("WebSocket start method failed");
    }
  }

  /**
   * Provide manual instructions as fallback;
   */
  private static async tryManualInstructions(): Promise<{
    success: boolean;
    message: string;
  }> {
    // Final fallback - provide instructions;
    return {
      success: false,
      message:
        "Please start the backend manually:\n\n1. Open terminal (PowerShell/CMD/Bash)\n2. cd backend\n3. python main_enhanced.py\n\nNote: Run commands separately in PowerShell.\nOr check if backend is running on a different port.",
    };
  }

  /**
   * Restart the backend service;
   */
  static async restartBackend(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      // console statement removed

      // Simulate restart process;
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check status;

      if (status.isOnline) {
        return {
          success: true,
          message: "Backend restarted successfully",
        };
      } else {
        return {
          success: false,
          message: "Backend restart failed. Please restart manually.",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Failed to restart backend: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Get development instructions for starting the backend;
   */
  static getStartupInstructions(): string[] {
    return [
      "1. Open a new terminal (PowerShell, CMD, or Bash)",
      "2. Navigate to the backend directory: cd backend",
      "3. Install dependencies: pip install -r requirements.txt",
      "4. Start the server: python main_enhanced.py",
      "5. Backend should be available at http://localhost:8000",
      "",
      "Note: In PowerShell/CMD, run each command separately.",
      "In Bash/Terminal, you can use: cd backend && python main_enhanced.py",
    ];
  }

  /**
   * Get the backend URL based on environment;
   */
  static getBackendUrl(): string {
    return import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  }

  /**
   * Scan common ports to find running backend (only in local development)
   */
  static async scanForBackend(): Promise<string | null> {
    // Skip port scanning if we're not in a local development environment;
    if (!this.isLocalDevelopment()) {
      // console statement removed
      return null;
    }


    // console statement removed

    for (const port of commonPorts) {
      try {

        // Use Promise.race for proper timeout handling;
        const response = await Promise.race([
          fetch(`${testUrl}/health`, {
            method: "GET",
          }),
          new Promise<Response>((_, reject) =>
            setTimeout(() => reject(new Error("Port scan timeout")), 2000),
          ),
        ]);

        if (response.ok) {
          // console statement removed
          return testUrl;
        }
      } catch (error) {
        // Port not responding, continue scanning;
        continue;
      }
    }

    // console statement removed
    return null;
  }

  /**
   * Check if we're running in local development environment;
   */
  private static isLocalDevelopment(): boolean {
    if (typeof window === "undefined") return false;

    const isLocal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.endsWith(".local");

    return isLocal;
  }

  /**
   * Enhanced connection check with port scanning;
   */
  static async checkBackendStatusWithScan(): Promise<BackendStatus> {
    // First try the default URL;

    if (defaultStatus.isOnline) {
      return defaultStatus;
    }

    // If default fails, scan for backend on other ports;
    // console statement removed

    if (foundUrl) {
      // Update the environment variable for future calls;
      if (typeof window !== "undefined") {
        (window as any).__VITE_API_BASE_URL = foundUrl;
      }

      return {
        isOnline: true,
        timestamp: new Date(),
      };
    }

    return {
      isOnline: false,
      error:
        "Backend not found on common ports (8000, 8080, 3000, 5000, 8888, 9000)",
      timestamp: new Date(),
    };
  }
}

export default BackendStarter;
