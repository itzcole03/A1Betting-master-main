export class ModelVersioning {
    constructor() {
        this.versions = new Map();
    }
    static getInstance() {
        if (!ModelVersioning.instance) {
            ModelVersioning.instance = new ModelVersioning();
        }
        return ModelVersioning.instance;
    }
    addVersion(modelId, version) {
        if (!this.versions.has(modelId)) {
            this.versions.set(modelId, []);
        }
        this.versions.get(modelId).push(version);
    }
    getLatestVersion(modelId) {

        if (!versions || versions.length === 0)
            return undefined;
        return versions[versions.length - 1];
    }
    getVersion(modelId, versionId) {

        if (!versions)
            return undefined;
        return versions.find(v => v.id === versionId);
    }
    getAllVersions(modelId) {
        return this.versions.get(modelId) || [];
    }
    rollbackToVersion(modelId, versionId) {

        if (!versions)
            return false;

        if (targetIndex === -1)
            return false;
        this.versions.set(modelId, versions.slice(0, targetIndex + 1));
        return true;
    }
    compareVersions(modelId, version1Id, version2Id) {

        if (!versions)
            return undefined;


        if (!v1 || !v2)
            return undefined;

        // Compare metrics;
        Object.keys(v1.metrics).forEach(key => {
            if (v1.metrics[key] !== v2.metrics[key]) {
                differences[`metrics.${key}`] = {
                    v1: v1.metrics[key],
                    v2: v2.metrics[key],
                };
            }
        });
        // Compare features;
        if (JSON.stringify(v1.features) !== JSON.stringify(v2.features)) {
            differences.features = {
                v1: v1.features,
                v2: v2.features,
            };
        }
        // Compare metadata;
        Object.keys(v1.metadata).forEach(key => {
            if (JSON.stringify(v1.metadata[key]) !==
                JSON.stringify(v2.metadata[key])) {
                differences[`metadata.${key}`] = {
                    v1: v1.metadata[key],
                    v2: v2.metadata[key],
                };
            }
        });
        return {
            version1: v1,
            version2: v2,
            differences,
        };
    }
}
