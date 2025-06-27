export var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel || (LogLevel = {}));
export class UnifiedLogger {
    constructor() {
        this.logLevel = LogLevel.INFO;
        this.logs = [];
    }
    static getInstance() {
        if (!UnifiedLogger.instance) {
            UnifiedLogger.instance = new UnifiedLogger();
        }
        return UnifiedLogger.instance;
    }
    setLogLevel(level) {
        this.logLevel = level;
    }
    debug(message, source, details) {
        this.log(LogLevel.DEBUG, message, source, details);
    }
    info(message, source, details) {
        this.log(LogLevel.INFO, message, source, details);
    }
    warn(message, source, details) {
        this.log(LogLevel.WARN, message, source, details);
    }
    error(message, source, details) {
        this.log(LogLevel.ERROR, message, source, details);
    }
    log(level, message, source, details) {
        if (this.shouldLog(level)) {
            const entry = {
                level,
                message,
                timestamp: Date.now(),
                source,
                details,
            };
            this.logs.push(entry);
            this.outputLog(entry);
        }
    }
    shouldLog(level) {

        return levels.indexOf(level) >= levels.indexOf(this.logLevel);
    }
    outputLog(entry) {



        // console statement removed
    }
    getLogs(level) {
        return level ? this.logs.filter(log => log.level === level) : [...this.logs];
    }
    clearLogs() {
        this.logs = [];
    }
}
