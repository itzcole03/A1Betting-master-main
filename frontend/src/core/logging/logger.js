// Centralized logger: swap out console.* for Sentry, Datadog, etc. here for production;
class Logger {
    constructor(context) {
        this.context = context;
    }
    info(message, ...args) {
        // Replace with production logger if needed;
        // console statement removed
    }
    error(message, ...args) {
        // Replace with production logger if needed;
        // console statement removed
    }
    warn(message, ...args) {
        // Replace with production logger if needed;
        // console statement removed
    }
    debug(message, ...args) {
        // Replace with production logger if needed;
        console.debug(`[${this.context}] DEBUG: ${message}`, ...args);
    }
    trace(message, ...args) {
        // Replace with production logger if needed;
        console.trace(`[${this.context}] TRACE: ${message}`, ...args);
    }
}
export function getLogger(context) {
    return new Logger(context);
}
