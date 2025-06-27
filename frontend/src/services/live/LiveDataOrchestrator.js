// LiveDataOrchestrator.ts;
// Service for ingesting and scoring real-time external data (sentiment, line movement, weather, injuries)
// Simulates fallback and data source confidence scoring, logs freshness and API priority;
export class LiveDataOrchestrator {
    constructor() {
        this.sources = [];
        this.records = [];
    }
    registerSource(source) {
        this.sources.push(source);
    }
    ingestData(sourceName, value) {

        if (!source)
            throw new Error('Source not registered');



        const record = {
            source,
            value,
            receivedAt: now,
            freshness,
            qualityScore: Math.max(0, Math.min(100, qualityScore)),
        };
        this.records.push(record);
        source.lastUpdated = now;
        return record;
    }
    getBestRecord(type) {

        if (candidates.length === 0)
            return null;
        // Sort by qualityScore, then by priority;
        return candidates.sort((a, b) => b.qualityScore - a.qualityScore || a.source.priority - b.source.priority)[0];
    }
    simulateFallback(type) {
        // Return the next-best record if the best is stale or low quality;

        if (candidates.length < 2)
            return null;

        if (best.qualityScore < 60 || best.freshness > 120) {
            return candidates[1];
        }
        return best;
    }
    logSources() {
        return this.sources.map(s => ({
            name: s.name,
            type: s.type,
            lastUpdated: s.lastUpdated.toISOString(),
            confidence: s.confidence,
            priority: s.priority,
            enrichment: s.enrichment,
        }));
    }
    logRecords() {
        return this.records.map(r => ({
            source: r.source.name,
            value: r.value,
            receivedAt: r.receivedAt.toISOString(),
            freshness: r.freshness,
            qualityScore: r.qualityScore,
        }));
    }
}
