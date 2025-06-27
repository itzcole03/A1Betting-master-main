import { unifiedMonitor } from './UnifiedMonitor';
export class UnifiedLogger {
    constructor(serviceName) {
        this.config = {
            minLevel: 'info',
            enableConsole: true,
            enableMonitoring: true,
        };
        this.serviceName = serviceName;
    }
    static getInstance(serviceName) {
        if (!UnifiedLogger.instance) {
            UnifiedLogger.instance = new UnifiedLogger(serviceName);
        }
        return UnifiedLogger.instance;
    }
    configure(config) {
        this.config = { ...this.config, ...config };
    }
    shouldLog(level) {

        return levels.indexOf(level) >= levels.indexOf(this.config.minLevel);
    }
    formatMessage(context) {
        if (this.config.format) {
            return this.config.format(context);
        }





        return `[${timestamp}] ${context.level.toUpperCase()} [${component}]${action}: ${context.message}${details}${error}`;
    }
    log(context) {
        if (!this.shouldLog(context.level)) {
            return;
        }
        if (this.config.enableConsole) {

            switch (context.level) {
                case 'debug':
                    console.debug(formattedMessage);
                    break;
                case 'info':
                    console.info(formattedMessage);
                    break;
                case 'warn':
                    // console statement removed
                    break;
                case 'error':
                    // console statement removed
                    break;
            }
        }
        if (this.config.enableMonitoring) {
            unifiedMonitor.recordMetric(`log.${context.level}`, 1, {
                component: context.component || this.config.component || 'system',
                action: context.action || 'unknown',
            });
            if (context.error) {

                unifiedMonitor.reportError(errorToReport, {
                    code: 'INTERNAL_ERROR',
                    message: context.message,
                    details: context.details,
                    timestamp: context.timestamp,
                    component: context.component || this.config.component,
                    action: context.action,
                });
            }
        }
    }
    debug(message, context) {
        this.log({
            level: 'debug',
            message,
            timestamp: Date.now(),
            ...context,
        });
    }
    info(message, context) {
        this.log({
            level: 'info',
            message,
            timestamp: Date.now(),
            ...context,
        });
    }
    warn(message, context) {
        this.log({
            level: 'warn',
            message,
            timestamp: Date.now(),
            ...context,
        });
    }
    error(message, error, context) {
        this.log({
            level: 'error',
            message,
            timestamp: Date.now(),
            error,
            ...context,
        });
    }
}
export const unifiedLogger = UnifiedLogger.getInstance();
