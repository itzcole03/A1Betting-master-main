import { unifiedMonitor } from '../../core/UnifiedMonitor';
// import { APIError, AppError } from '../../core/UnifiedError'; // File does not exist, use UnifiedErrorService if needed;
// Error handling utilities;
export const handleApiError = (error, context) => {

    if (trace) {
        trace.setHttpStatus(error.response?.status || 500);
        unifiedMonitor.endTrace(trace);
    }
    if (error instanceof APIError)
        throw error;
    if (error instanceof AppError)
        throw error;
    throw new AppError(`Error in ${context}`, error.response?.status || 500, { context }, error);
};
// Data transformation utilities;
export const transformData = (data, transformer, context) => {
    try {
        return transformer(data);
    }
    catch (error) {
        handleApiError(error, `${context}.transform`);
    }
};
// Validation utilities;
export const validateResponse = (response, validator, context) => {
    if (!validator(response)) {
        throw new AppError(`Invalid response in ${context}`, 500, { response, context });
    }
    return response;
};
// Cache utilities;

const DEFAULT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes;
export const getCachedData = (key, ttl = DEFAULT_CACHE_TTL) => {

    if (!cached)
        return null;

    if (now - cached.timestamp > ttl) {
        cache.delete(key);
        return null;
    }
    return cached.data;
};
export const setCachedData = (key, data) => {
    cache.set(key, {
        data,
        timestamp: Date.now(),
    });
};
export const clearCache = (key) => {
    if (key) {
        cache.delete(key);
    }
    else {
        cache.clear();
    }
};
// Retry utilities;
export const retry = async (fn, options = {}) => {
    const { maxAttempts = 3, delay = 1000, backoff = 2, context = 'retry' } = options;
    let lastError;
    const currentDelay = delay;
    for (const attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts)
                break;

            if (trace) {
                trace.setHttpStatus(error.response?.status || 500);
                unifiedMonitor.endTrace(trace);
            }
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay *= backoff;
        }
    }
    throw lastError;
};
// Rate limiting utilities;

export const checkRateLimit = (key, limit, window) => {


    if (!current || now > current.resetTime) {
        rateLimits.set(key, { count: 1, resetTime: now + window });
        return true;
    }
    if (current.count >= limit) {
        return false;
    }
    current.count++;
    return true;
};
// Logging utilities;
export const logServiceCall = (service, method, params, result, error) => {

    if (trace) {
        if (error) {
            trace.setHttpStatus(error.response?.status || 500);
            unifiedMonitor.captureException(error, {
                extra: {
                    service,
                    method,
                    params,
                    result,
                },
            });
        }
        else {
            trace.setHttpStatus(200);
        }
        unifiedMonitor.endTrace(trace);
    }
};
// Performance monitoring utilities;
export const measurePerformance = async (fn, context) => {

    try {



        if (trace) {
            trace.setDuration(duration);
            unifiedMonitor.endTrace(trace);
        }
        return result;
    }
    catch (error) {


        if (trace) {
            trace.setDuration(duration);
            trace.setHttpStatus(error.response?.status || 500);
            unifiedMonitor.endTrace(trace);
        }
        throw error;
    }
};
