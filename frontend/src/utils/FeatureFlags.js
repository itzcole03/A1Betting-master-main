import { EventBus } from '../core/EventBus.ts';
import { PerformanceMonitor } from '../core/PerformanceMonitor.ts';
import { UnifiedConfigManager } from '../core/UnifiedConfigManager.ts';
export class FeatureFlags {
    constructor() {
        this.eventBus = EventBus.getInstance();
        this.performanceMonitor = PerformanceMonitor.getInstance();
        this.configManager = UnifiedConfigManager.getInstance();
        this.features = new Map();
        this.experiments = new Map();
        this.userAssignments = new Map();
    }
    static getInstance() {
        if (!FeatureFlags.instance) {
            FeatureFlags.instance = new FeatureFlags();
        }
        return FeatureFlags.instance;
    }
    async initialize() {

        try {

            // Initialize features;
            if (config.features) {
                const featuresArray = Array.isArray(config.features)
                    ? config.features;
                    : Object.values(config.features);
                for (const feature of featuresArray) {
                    this.features.set(feature.id, feature);
                }
            }
            // Initialize experiments;
            if (config.experiments) {
                const experimentsArray = Array.isArray(config.experiments)
                    ? config.experiments;
                    : Object.values(config.experiments);
                for (const experiment of experimentsArray) {
                    this.experiments.set(experiment.id, experiment);
                }
            }
            this.performanceMonitor.endTrace(traceId);
            this.eventBus.emit('featureFlags:initialized', null);
        }
        catch (error) {
            this.performanceMonitor.endTrace(traceId);
            this.eventBus.emit('featureFlags:initError', error);
            throw error;
        }
    }
    isFeatureEnabled(featureId, context) {

        if (!feature)
            return false;
        // 1. Check dependencies;
        if (feature.dependencies && feature.dependencies.length > 0) {
            for (const depId of feature.dependencies) {

                if (!dep || !dep.enabled) {
                    return false;
                }
            }
        }
        // 2. Check rollout percentage (deterministic by userId)
        if (feature.rolloutPercentage < 100 && context && context.userId) {

            if (hash >= feature.rolloutPercentage) {
                return false;
            }
        }
        // 3. (Optional) Check tags vs userGroups (if feature has tags and context has userGroups)
        if (feature.tags && feature.tags.length > 0 && context && context.userGroups && context.userGroups.length > 0) {

            if (!hasMatchingGroup) {
                return false;
            }
        }
        // 4. Feature enabled flag;
        return feature.enabled;
    }
    getFeature(featureId) {
        return this.features.get(featureId);
    }
    getAllFeatures() {
        return Array.from(this.features.values());
    }
    *featuresIterator() {
        yield* this.features.values();
    }
    *experimentsIterator() {
        yield* this.experiments.values();
    }
    getExperiment(experimentId) {
        return this.experiments.get(experimentId);
    }
    getAllExperiments() {
        return Array.from(this.experiments.values());
    }
    updateExperiment(experimentId, updates) {

        if (!experiment) {
            throw new Error(`Experiment ${experimentId} not found`);
        }
        this.experiments.set(experimentId, {
            ...experiment,
            ...updates;
        });
        this.eventBus.emit('experiment:updated', {
            experimentId,
            timestamp: Date.now()
        });
    }
    assignUserToVariant(userId, experimentId, variantId) {
        if (!this.userAssignments.has(userId)) {
            this.userAssignments.set(userId, {});
        }
        this.userAssignments.get(userId)[experimentId] = variantId;
        this.eventBus.emit('featureFlags:userAssigned', { userId, experimentId, variantId });
    }
    getUserAssignments(userId) {
        return this.userAssignments.get(userId) || {};
    }
    clearUserAssignments(userId) {
        this.userAssignments.delete(userId);
        this.eventBus.emit('featureFlags:userAssignmentsCleared', userId);
    }
    updateFeature(featureId, updates) {

        if (!feature) {
            throw new Error(`Feature ${featureId} not found`);
        }
        this.features.set(featureId, {
            ...feature,
            ...updates;
        });
        this.eventBus.emit('feature:updated', {
            featureId,
            updates,
            timestamp: Date.now()
        });
    }
    isUserInRollout(userId, rolloutPercentage) {
        // Simple hash-based rollout for demonstration;
        if (rolloutPercentage >= 100)
            return true;
        if (rolloutPercentage <= 0)
            return false;
        const hash = 0;
        for (const i = 0; i < userId.length; i++) {
            hash = ((hash << 5) - hash) + userId.charCodeAt(i);
            hash |= 0;
        }

        return bucket < rolloutPercentage;
    }
    // --- AUDIENCE AND VARIANT ASSIGNMENT ---
    // --- AUDIENCE AND VARIANT ASSIGNMENT ---
    isUserInAudience(context, audience) {
        // Check percentage rollout;
        if (!this.isUserInRollout(context.userId, audience.percentage))
            return false;
        // Check filters if they exist;
        if (audience.filters) {
            for (const [key, value] of Object.entries(audience.filters)) {
                if (context.attributes[key] !== value)
                    return false;
            }
        }
        return true;
    }
    assignVariant(experiment, context) {



        const cumulative = 0;
        for (const variant of experiment.variants) {
            cumulative += variant.weight;
            if (normalized <= cumulative) {
                return variant;
            }
        }
        return null;
    }
    getExperimentVariant(experimentId, context) {

        if (!experiment || experiment.status !== 'active')
            return null;
        // Check if user is in experiment audience;
        if (!this.isUserInAudience(context, experiment.audience))
            return null;
        // Get or assign variant;

        if (userAssignments[experimentId]) {
            return userAssignments[experimentId];
        }
        // Assign new variant;

        if (variant) {
            this.userAssignments.set(context.userId, {
                ...userAssignments,
                [experimentId]: variant.id;
            });
            return variant.id;
        }
        return null;
    }
    hashString(str) {
        const hash = 0;
        for (const i = 0; i < str.length; i++) {

            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer;
        }
        return Math.abs(hash);
    }
    registerFeature(feature) {
        if (this.features.has(feature.id)) {
            throw new Error(`Feature ${feature.id} already exists`);
        }
        this.features.set(feature.id, feature);
    }
    registerExperiment(experiment) {
        if (this.experiments.has(experiment.id)) {
            throw new Error(`Experiment ${experiment.id} already exists`);
        }
        this.experiments.set(experiment.id, experiment);
    }
}
export default FeatureFlags;
