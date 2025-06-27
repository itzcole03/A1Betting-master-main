class Metrics {
    constructor() {
        this.metrics = new Map();
        this.tags = new Map();
    }
    track(name, value, tags) {

        this.metrics.set(key, value || 1);
        if (tags) {
            this.tags.set(key, tags);
        }
    }
    increment(name, value, tags) {


        this.metrics.set(key, currentValue + (value || 1));
        if (tags) {
            this.tags.set(key, tags);
        }
    }
    gauge(name, value, tags) {

        this.metrics.set(key, value);
        if (tags) {
            this.tags.set(key, tags);
        }
    }
    timing(name, value, tags) {

        this.metrics.set(key, value);
        if (tags) {
            this.tags.set(key, tags);
        }
    }
    histogram(name, value, tags) {

        this.metrics.set(key, value);
        if (tags) {
            this.tags.set(key, tags);
        }
    }
    getMetricKey(name, tags) {
        if (!tags)
            return name;
        const sortedTags = Object.entries(tags)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([k, v]) => `${k}:${v}`)
            .join(',');
        return `${name}{${sortedTags}}`;
    }
    getMetrics() {
        return new Map(this.metrics);
    }
    getTags() {
        return new Map(this.tags);
    }
    clear() {
        this.metrics.clear();
        this.tags.clear();
    }
}

export function getMetrics() {
    return metricsInstance;
}
