import { EventBus } from '@/core/EventBus';
import { PerformanceMonitor } from './PerformanceMonitor';
export class DataCache {
    constructor(defaultTtl = 5 * 60 * 1000) {
        this.defaultTtl = defaultTtl;
        this.cache = new Map();
    }
    set(key, data, ttl) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: ttl ?? this.defaultTtl;
        });
    }
    get(key) {

        if (!entry)
            return undefined;
        if (Date.now() - entry.timestamp > entry.ttl) {
            this.cache.delete(key);
            return undefined;
        }
        return entry.data;
    }
    clear() {
        this.cache.clear();
    }
}
export class StreamingDataPipeline {
    constructor(source, stages, sink, options = {
        cacheEnabled: true,
        cacheTtl: 5 * 60 * 1000,
        processingInterval: 1000,
        retryAttempts: 3,
        batchSize: 100;
    }) {
        this.source = source;
        this.stages = stages;
        this.sink = sink;
        this.options = options;
        this.isRunning = false;
        this.processInterval = null;
        this.metrics = {
            processedCount: 0,
            errorCount: 0,
            averageLatency: 0,
            lastProcessed: 0,
            throughput: 0;
        };
        this.cache = new DataCache(options.cacheTtl);
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
    }
    async start() {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.processInterval = setInterval(() => this.process(), this.options.processingInterval);
        this.eventBus.publish({
            type: 'pipeline:started',
            payload: {
                sourceId: this.source.id,
                sinkId: this.sink.id,
                timestamp: Date.now()
            }
        });
    }
    async stop() {
        if (!this.isRunning)
            return;
        this.isRunning = false;
        if (this.processInterval) {
            clearInterval(this.processInterval);
            this.processInterval = null;
        }
        if (this.sink.flush) {
            await this.sink.flush();
        }
        this.eventBus.publish({
            type: 'pipeline:stopped',
            payload: {
                sourceId: this.source.id,
                sinkId: this.sink.id,
                timestamp: Date.now(),
                metrics: this.metrics;
            }
        });
    }
    async process() {
        const traceId = this.performanceMonitor.startTrace('pipeline-processing', {
            sourceId: this.source.id,
            sinkId: this.sink.id;
        });
        try {


            if (this.options.cacheEnabled) {


                if (cached) {
                    this.performanceMonitor.endTrace(traceId);
                    return;
                }
                this.cache.set(cacheKey, data);
            }
            const transformed = data;
            for (const stage of this.stages) {

                try {
                    if (stage.validate) {

                        if (!isValid) {
                            throw new Error(`Validation failed at stage ${stage.id}`);
                        }
                    }
                    transformed = await stage.transform(transformed);
                    this.performanceMonitor.endTrace(stageTraceId);
                }
                catch (error) {
                    this.performanceMonitor.endTrace(stageTraceId, error);
                    throw error;
                }
            }
            await this.sink.write(transformed);

            this.updateMetrics(duration);
            this.eventBus.publish({
                type: 'pipeline:processed',
                payload: {
                    sourceId: this.source.id,
                    sinkId: this.sink.id,
                    duration,
                    timestamp: Date.now()
                }
            });
            this.performanceMonitor.endTrace(traceId);
        }
        catch (error) {
            this.metrics.errorCount++;
            this.performanceMonitor.endTrace(traceId, error);
            this.eventBus.publish({
                type: 'pipeline:error',
                payload: {
                    sourceId: this.source.id,
                    sinkId: this.sink.id,
                    error: error,
                    timestamp: Date.now()
                }
            });
        }
    }
    generateCacheKey(data) {
        return `${this.source.id}-${JSON.stringify(data)}`;
    }
    updateMetrics(duration) {
        this.metrics.processedCount++;
        this.metrics.lastProcessed = Date.now();
        this.metrics.averageLatency =
            (this.metrics.averageLatency * (this.metrics.processedCount - 1) + duration) /
                this.metrics.processedCount;
        this.metrics.throughput = this.metrics.processedCount /
            ((Date.now() - this.metrics.lastProcessed) / 1000);
    }
    getMetrics() {
        return { ...this.metrics };
    }
}
