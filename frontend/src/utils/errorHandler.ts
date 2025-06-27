import { toast } from 'react-toastify.ts';
import { EventBus } from '@/unified/EventBus.ts';
import { PerformanceMonitor } from '@/unified/PerformanceMonitor.ts';
import { UnifiedMonitor } from '@/unified/UnifiedMonitor.ts';
import { UnifiedConfigManager } from '@/unified/UnifiedConfig.ts';
import {
  ErrorContext,
  ErrorCategory,
  ErrorSeverity,
  BettingSystemError,
  UnifiedError,
  SystemError,
  ValidationError,
  NetworkError,
  AuthenticationError,
} from '@/unified/UnifiedError.ts';

interface ErrorLog {
  type: string;
  message: string;
  timestamp: string;
  stack?: string;
  details?: Record<string, any>;
}

interface ApiCallLog {
  url: string;
  method: string;
  status: number;
  statusText: string;
  duration: number;
  timestamp: string;
  ok: boolean;
}

interface ErrorHandlerConfig {
  maxErrors?: number;
  flushInterval?: number;
  onError?: (error: Error, context: ErrorContext) => void;
}

export class ErrorHandler {
  private static instance: ErrorHandler;
  private readonly eventBus: EventBus;
  private readonly performanceMonitor: PerformanceMonitor;
  private readonly monitor: UnifiedMonitor;
  private readonly configManager: UnifiedConfigManager;
  private errors: Array<{ error: Error; context: ErrorContext }> = [];
  private apiCalls: ApiCallLog[] = [];
  private config: ErrorHandlerConfig;
  private flushTimer: NodeJS.Timeout | undefined;
  private readonly DEFAULT_MAX_ERRORS = 100;
  private readonly DEFAULT_FLUSH_INTERVAL = 60000; // 1 minute;

  private constructor(config: ErrorHandlerConfig = {}) {
    this.eventBus = EventBus.getInstance();
    this.performanceMonitor = PerformanceMonitor.getInstance();
    this.monitor = UnifiedMonitor.getInstance();
    this.configManager = UnifiedConfigManager.getInstance();
    this.config = {
      maxErrors: config.maxErrors || this.DEFAULT_MAX_ERRORS,
      flushInterval: config.flushInterval || this.DEFAULT_FLUSH_INTERVAL,
      onError: config.onError,
    };
    this.startFlushTimer();
    this.setupGlobalHandlers();
  }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private setupGlobalHandlers(): void {
    // Catch unhandled errors;
    window.addEventListener('error', event => {
      this.handleError(
        new SystemError(event.message, {
          stack: event.error?.stack,
          category: ErrorCategory.SYSTEM,
          severity: ErrorSeverity.HIGH,
        })
      );
    });

    // Catch promise rejections;
    window.addEventListener('unhandledrejection', event => {
      this.handleError(
        new SystemError('Unhandled Promise Rejection', {
          details: { reason: event.reason },
          category: ErrorCategory.SYSTEM,
          severity: ErrorSeverity.HIGH,
        })
      );
    });

    // Intercept console.error;

    console.error = (...args) => {
      this.handleError(
        new SystemError(args.join(' '), {
          category: ErrorCategory.SYSTEM,
          severity: ErrorSeverity.MEDIUM,
        })
      );
      originalError.apply(console, args);
    };

    // Intercept fetch for API logging;

    window.fetch = async (...args) => {

      const [url, options = {}] = args;
      try {


        this.logApiCall({
          url: url.toString(),
          method: options.method || 'GET',
          status: response.status,
          statusText: response.statusText,
          duration,
          timestamp: new Date().toISOString(),
          ok: response.ok,
        });
        if (!response.ok) {
          this.handleError(
            new NetworkError(`API Error: ${response.statusText}`, {
              details: { url, status: response.status },
              category: ErrorCategory.NETWORK,
              severity: ErrorSeverity.HIGH,
            })
          );
        }
        return response;
      } catch (error: unknown) {
        this.handleError(
          new NetworkError('Fetch Error', {
            details: { url, error: error instanceof Error ? error.message : String(error) },
            category: ErrorCategory.NETWORK,
            severity: ErrorSeverity.HIGH,
          })
        );
        throw error;
      }
    };
  }

  private startFlushTimer(): void {
    this.flushTimer = setInterval(() => this.flush(), this.config.flushInterval);
  }

  public async handleError(
    error: Error | BettingSystemError,
    context?: Record<string, any>
  ): Promise<void> {

    try {

      this.logError({
        type: systemError.name,
        message: systemError.message,
        timestamp: new Date().toISOString(),
        stack: systemError.stack,
        details: systemError.context,
      });

      // Emit error event;
      this.eventBus.emit('data:updated', {
        data: {
          error: systemError,
          emergency: systemError.severity === ErrorSeverity.CRITICAL,
        },
        sourceId: 'error-handler',
        timestamp: Date.now(),
      });

      // Report to monitoring service;
      this.monitor.reportError(systemError, {
        component: 'ErrorHandler',
        context: { ...context, source: 'error-handler' },
      });

      // Check if we should trigger emergency procedures;
      if (systemError.severity === ErrorSeverity.CRITICAL) {
        await this.triggerEmergencyProcedures(systemError);
      }

      // Add error to queue;
      this.errors.push({ error: systemError, context: { timestamp: Date.now(), ...context } });

      // Maintain size limit;
      if (this.errors.length > this.config.maxErrors!) {
        this.errors = this.errors.slice(-this.config.maxErrors!);
      }

      // Call error handler if configured;
      if (this.config.onError) {
        try {
          this.config.onError(systemError, { timestamp: Date.now(), ...context });
        } catch (handlerError) {
          // console statement removed
        }
      }

      // Log to console in development;
      if (process.env.NODE_ENV === 'development') {
        // console statement removed
        // console statement removed
      }
    } catch (handlingError) {
      // console statement removed
      this.monitor.reportError(handlingError as Error, {
        component: 'ErrorHandler',
        context: { originalError: error },
      });
    } finally {
      this.performanceMonitor.endTrace(traceId);
    }
  }

  private normalizeError(
    error: Error | BettingSystemError,
    context?: Record<string, any>
  ): BettingSystemError {
    if (this.isBettingSystemError(error)) {
      return error;
    }

    return new SystemError(error.message, {
      stack: error.stack,
      category: ErrorCategory.SYSTEM,
      severity: ErrorSeverity.HIGH,
      ...context,
    });
  }

  private isBettingSystemError(error: Error | BettingSystemError): error is BettingSystemError {
    return 'code' in error && 'component' in error && 'severity' in error;
  }

  private logError(error: ErrorLog): void {
    try {

      stored.push(error);
      if (stored.length > this.config.maxErrors!) stored.shift();
      localStorage.setItem('app_errors', JSON.stringify(stored));
    } catch (e) {
      // console statement removed
    }
  }

  private logApiCall(call: ApiCallLog): void {
    this.apiCalls.push(call);
    try {

      stored.push(call);
      if (stored.length > this.config.maxErrors!) stored.shift();
      localStorage.setItem('app_api_calls', JSON.stringify(stored));
    } catch (e) {
      // console statement removed
    }
  }

  private async triggerEmergencyProcedures(error: BettingSystemError): Promise<void> {
    // Notify administrators;
    this.eventBus.emit('data:updated', {
      data: {
        error,
        emergency: true,
      },
      sourceId: 'error-handler',
      timestamp: Date.now(),
    });

    // Attempt to save state;
    try {
      await this.configManager.updateConfig({
        system: {
          ...this.configManager.getConfig().system,
          emergencyMode: true,
        },
      });
    } catch (saveError) {
      // console statement removed
    }
  }

  public generateReport(): Record<string, any> {
    return {
      generated: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      errors: this.errors,
      apiCalls: this.apiCalls,
      localStorage: {
        errors: JSON.parse(localStorage.getItem('app_errors') || '[]'),
        apiCalls: JSON.parse(localStorage.getItem('app_api_calls') || '[]'),
      },
    };
  }

  public downloadReport(): void {




    a.href = url;
    a.download = `error_report_${new Date().getTime()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  public clearLogs(): void {
    this.errors = [];
    this.apiCalls = [];
    localStorage.removeItem('app_errors');
    localStorage.removeItem('app_api_calls');
  }

  async flush(): Promise<void> {
    if (this.errors.length === 0) return;

    try {
      // Here you would typically send errors to your error tracking system;
      // For now, we'll just clear them;
      this.errors = [];
    } catch (error) {
      // console statement removed
    }
  }

  // Cleanup on destruction;
  destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    this.errors = [];
  }
}

// Create global instance;

// Add error report button to page;
window.addEventListener('load', () => {

  button.textContent = 'Download Error Report';
  button.style.cssText =
    'position:fixed;bottom:10px;right:10px;z-index:9999;padding:10px;background:#ff4444;color:white;border:none;border-radius:5px;cursor:pointer;';
  button.onclick = () => errorHandler.downloadReport();
  document.body.appendChild(button);
});

export default errorHandler;
