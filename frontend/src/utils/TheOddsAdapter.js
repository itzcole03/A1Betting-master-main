import { EventBus } from '../core/EventBus.js';
import { PerformanceMonitor } from '../core/PerformanceMonitor.js';
export class TheOddsAdapter {
    constructor(config) {
        this.id = 'the-odds';
        this.type = 'betting-odds';
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.config = config;
        this.cache = {
            data: null,
            timestamp: 0;
        };
    }
    async isAvailable() {
        try {

            return response.ok;
        }
        catch {
            return false;
        }
    }
    async fetch() {

        try {
            if (this.isCacheValid()) {
                return this.cache.data;
            }

            this.cache = {
                data,
                timestamp: Date.now()
            };
            this.eventBus.publish({
                type: 'odds-updated',
                payload: { data }
            });
            this.performanceMonitor.endTrace(traceId);
            return data;
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId, error);
            throw error;
        }
    }
    async fetchOddsData() {

        if (!response.ok) {
            throw new Error(`TheOdds API error: ${response.statusText}`);
        }
        return await response.json();
    }
    isCacheValid() {
        return (this.cache.data !== null &&
            Date.now() - this.cache.timestamp < this.config.cacheTimeout);
    }
    clearCache() {
        this.cache = {
            data: null,
            timestamp: 0;
        };
    }
    async connect() { }
    async disconnect() { }
    async getData() { return this.cache.data; }
    isConnected() { return true; }
    getMetadata() { return { id: this.id, type: this.type }; }
}
