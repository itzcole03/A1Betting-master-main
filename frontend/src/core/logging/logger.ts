import { UnifiedLogger } from '@/types.ts';

// Centralized logger: swap out console.* for Sentry, Datadog, etc. here for production;
class Logger implements UnifiedLogger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  info(message: string, ...args: any[]): void {
    // Replace with production logger if needed;
    // console statement removed
  }

  error(message: string, ...args: any[]): void {
    // Replace with production logger if needed;
    // console statement removed
  }

  warn(message: string, ...args: any[]): void {
    // Replace with production logger if needed;
    // console statement removed
  }

  debug(message: string, ...args: any[]): void {
    // Replace with production logger if needed;
    console.debug(`[${this.context}] DEBUG: ${message}`, ...args);
  }

  trace(message: string, ...args: any[]): void {
    // Replace with production logger if needed;
    console.trace(`[${this.context}] TRACE: ${message}`, ...args);
  }
}

export function getLogger(context: string): UnifiedLogger {
  return new Logger(context);
}
