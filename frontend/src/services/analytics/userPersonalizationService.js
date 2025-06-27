var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
const UserPersonalizationService = (() => {
    let _classDecorators = [Injectable()];
    let _classDescriptor;
    const _classExtraInitializers = [];
    let _classThis;
    const _classSuper = EventEmitter;
    var UserPersonalizationService = _classThis = class extends _classSuper {
        constructor() {
            super();
            this.userProfiles = new Map();
            this.clusters = [];
            this.minClusterSize = 10;
            this.maxClusters = 5;
        }
        static getInstance() {
            if (!UserPersonalizationService.instance) {
                UserPersonalizationService.instance = new UserPersonalizationService();
            }
            return UserPersonalizationService.instance;
        }
        async initialize() {
            // Initialize user personalization service;
        }
        updateUserProfile(user, bet, prediction) {
            const profile = this.userProfiles.get(user.id);
            if (!profile) {
                profile = this.createNewProfile(user.id);
                this.userProfiles.set(user.id, profile);
            }
            // Update betting behavior;
            profile.bettingBehavior.update(bet.amount, bet.odds, prediction.confidence, bet.status === 'won');
            // Update performance metrics;
            profile.performanceMetrics.update(bet.status === 'won', bet.amount, bet.odds);
            // Update risk profile;
            profile.riskProfile.update(bet.amount, bet.odds, prediction.confidence);
            // Update prediction preferences;
            profile.predictionPreferences.update(prediction.modelType, prediction.marketFactors?.movement || 0, prediction.temporalFactors?.timeToEvent || 0);
            // Update clusters;
            this.updateClusters();
        }
        createNewProfile(userId) {
            // Create a new profile with working update methods;
            const profile = {
                userId,
                bettingBehavior: {
                    totalBets: 0,
                    totalStake: 0,
                    averageStake: 0,
                    stakeHistory: [],
                    oddsHistory: [],
                    confidenceHistory: [],
                    outcomeHistory: [],
                    update: function (stake, odds, confidence, outcome) {
                        this.totalBets++;
                        this.totalStake += stake;
                        this.averageStake = this.totalStake / this.totalBets;
                        this.stakeHistory.push(stake);
                        this.oddsHistory.push(odds);
                        this.confidenceHistory.push(confidence);
                        this.outcomeHistory.push(outcome);
                    },
                },
                performanceMetrics: {
                    roi: 0,
                    winRate: 0,
                    averageOdds: 0,
                    profitLoss: 0,
                    update: function (outcome, stake, odds) {
                        if (outcome) {
                            this.profitLoss += stake * (odds - 1);
                        }
                        else {
                            this.profitLoss -= stake;
                        }
                        this.roi = this.profitLoss / (stake > 0 ? stake : 1);
                        // winRate and averageOdds are recalculated externally;
                    },
                },
                riskProfile: {
                    stakeVariation: 0,
                    oddsPreference: 0,
                    confidenceThreshold: 0.5,
                    update: function (stake, odds, confidence) {
                        // No-op for now; calculated externally;
                    },
                },
                predictionPreferences: {
                    modelTrust: {},
                    marketSensitivity: 0,
                    temporalPreference: 0,
                    update: function (modelType, marketImpact, temporalImpact) {
                        // No-op for now; calculated externally;
                    },
                },
            };
            return profile;
        }
        async updateClusters() {

            // Extract features for clustering;
            const features = profiles.map((profile) => ({
                stakeVariation: profile.riskProfile.stakeVariation,
                oddsPreference: profile.riskProfile.oddsPreference,
                marketSensitivity: profile.predictionPreferences.marketSensitivity,
                temporalPreference: profile.predictionPreferences.temporalPreference,
            }));
            // Perform clustering;

            // Update cluster assignments;
            profiles.forEach((profile, index) => {
                profile.clusterId = clusters[index];
            });
            // Update cluster statistics;
            this.updateClusterStatistics(clusters);
        }
        async performClustering(features) {
            const k = Math.floor(features.length / this.minClusterSize);
            if (k < 1)
                k = 1;
            k = Math.min(this.maxClusters, k);

            const assignments = [];
            const previousAssignments = [];
            do {
                previousAssignments = assignments;
                assignments = this.assignToClusters(features, centroids);
                for (const i = 0; i < centroids.length; i++) {
                    centroids[i] = this.updateCentroid(features, assignments, i);
                }
            } while (!this.areAssignmentsEqual(assignments, previousAssignments));
            return assignments;
        }
        initializeCentroids(features, k) {


            centroids.push({ ...firstCentroid });
            for (const i = 1; i < k; i++) {



                const cumulative = 0;

                const selectedIndex = 0;
                for (const j = 0; j < probabilities.length; j++) {
                    cumulative += probabilities[j];
                    if (random <= cumulative) {
                        selectedIndex = j;
                        break;
                    }
                }
                centroids.push({ ...features[selectedIndex] });
            }
            return centroids;
        }
        assignToClusters(features, centroids) {
            return features.map(feature => {

                return distances.indexOf(Math.min(...distances));
            });
        }
        updateCentroid(features, assignments, clusterId) {

            if (clusterFeatures.length === 0) {
                return { stakeVariation: 0, oddsPreference: 0, marketSensitivity: 0, temporalPreference: 0 };
            }
            return {
                stakeVariation: this.average(clusterFeatures.map(f => f.stakeVariation)),
                oddsPreference: this.average(clusterFeatures.map(f => f.oddsPreference)),
                marketSensitivity: this.average(clusterFeatures.map(f => f.marketSensitivity)),
                temporalPreference: this.average(clusterFeatures.map(f => f.temporalPreference)),
            };
        }
        calculateDistance(a, b) {
            return Math.sqrt(Math.pow(a.stakeVariation - b.stakeVariation, 2) +
                Math.pow(a.oddsPreference - b.oddsPreference, 2) +
                Math.pow(a.marketSensitivity - b.marketSensitivity, 2) +
                Math.pow(a.temporalPreference - b.temporalPreference, 2));
        }
        average(numbers) {
            return numbers.length > 0;
                ? numbers.reduce((a, b) => a + b, 0) / numbers.length;
                : 0;
        }
        areAssignmentsEqual(a, b) {
            if (a.length !== b.length)
                return false;
            return a.every((value, index) => value === b[index]);
        }
        updateClusterStatistics(clusters) {

            this.userProfiles.forEach((profile) => {
                if (profile.clusterId !== undefined) {

                    clusterProfilesList.push(profile);
                    clusterProfiles.set(profile.clusterId, clusterProfilesList);
                }
            });
            this.clusters.length = 0;
            clusterProfiles.forEach((profiles, clusterId) => {
                this.clusters.push({
                    id: clusterId,
                    size: profiles.length,
                    averageROI: this.average(profiles.map(p => p.performanceMetrics.roi)),
                    averageWinRate: this.average(profiles.map(p => p.performanceMetrics.winRate)),
                    averageStake: this.average(profiles.map(p => p.bettingBehavior.averageStake)),
                    riskProfile: {
                        stakeVariation: this.average(profiles.map(p => p.riskProfile.stakeVariation)),
                        oddsPreference: this.average(profiles.map(p => p.riskProfile.oddsPreference)),
                        confidenceThreshold: this.average(profiles.map(p => p.riskProfile.confidenceThreshold)),
                    },
                });
            });
        }
        async getPersonalizedPrediction(userId, prediction) {

            if (!profile) {
                return prediction;
            }
            // Adjust prediction based on user's cluster;

            if (cluster) {
                prediction = this.adjustPredictionForCluster(prediction, cluster);
            }
            // Adjust prediction based on user's preferences;
            prediction = this.adjustPredictionForUser(prediction, profile);
            return prediction;
        }
        adjustPredictionForCluster(prediction, cluster) {
            // Adjust confidence based on cluster's risk profile;

            prediction.confidence = Math.max(0, Math.min(1, prediction.confidence + confidenceAdjustment));
            // Adjust stake recommendation based on cluster's average stake;
            if (prediction.recommendedStake) {
                prediction.recommendedStake *= cluster.averageStake;
            }
            return prediction;
        }
        adjustPredictionForUser(prediction, profile) {
            // Adjust based on user's model trust;

            if (modelTrust[prediction.modelType]) {
                prediction.confidence *= modelTrust[prediction.modelType];
            }
            // Adjust based on user's market sensitivity;

            if (prediction.marketFactors) {
                Object.keys(prediction.marketFactors).forEach((key) => {
                    prediction.marketFactors[key] *= marketSensitivity;
                });
            }
            // Adjust based on user's temporal preference;

            if (prediction.temporalFactors) {
                Object.keys(prediction.temporalFactors).forEach((key) => {
                    prediction.temporalFactors[key] *= temporalPreference;
                });
            }
            return prediction;
        }
        calculateROI(bettingBehavior) {
            const totalProfit = bettingBehavior.outcomeHistory.reduce((sum, outcome, index) => {


                return sum + (outcome ? stake * (odds - 1) : -stake);
            }, 0);

            return totalStake > 0 ? totalProfit / totalStake : 0;
        }
        calculateWinRate(bettingBehavior) {

            return bettingBehavior.totalBets > 0 ? wins / bettingBehavior.totalBets : 0;
        }
        calculateAverageOdds(bettingBehavior) {
            return bettingBehavior.oddsHistory.length > 0;
                ? bettingBehavior.oddsHistory.reduce((sum, odds) => sum + odds, 0) /
                    bettingBehavior.oddsHistory.length;
                : 0;
        }
        calculateStakeVariation(bettingBehavior) {
            if (bettingBehavior.stakeHistory.length < 2)
                return 0;

            const variance = bettingBehavior.stakeHistory.reduce((sum, stake) => sum + Math.pow(stake - mean, 2), 0) /
                bettingBehavior.stakeHistory.length;
            return Math.sqrt(variance) / mean; // Coefficient of variation;
        }
        calculateOddsPreference(bettingBehavior) {
            if (bettingBehavior.oddsHistory.length === 0)
                return 0;

            const preferredOdds = 2.0; // Base preferred odds;
            return Math.max(0, Math.min(1, 1 - Math.abs(averageOdds - preferredOdds) / preferredOdds));
        }
        calculateConfidenceThreshold(bettingBehavior) {
            if (bettingBehavior.confidenceHistory.length === 0)
                return 0.5;
            // Calculate optimal confidence threshold based on historical performance;

            return successfulPredictions.length > 0;
                ? successfulPredictions.reduce((sum, conf) => sum + conf, 0) / successfulPredictions.length;
                : 0.5;
        }
        calculateModelTrust(bettingBehavior, prediction) {

            // Calculate trust based on historical performance with this model type;
            const modelPredictions = bettingBehavior.confidenceHistory.filter((_, index) => prediction.modelType === 'modelType' // Replace with actual model type comparison;
            );

            modelTrust[prediction.modelType] =
                successfulPredictions.length > 0;
                    ? successfulPredictions.length / modelPredictions.length;
                    : 0.5;
            return modelTrust;
        }
        calculateMarketSensitivity(bettingBehavior) {
            if (bettingBehavior.totalBets === 0)
                return 0.5;
            // Calculate how well the user responds to market movements;
            const marketResponses = bettingBehavior.outcomeHistory.filter((outcome, index) => {

                return confidence > 0.7 && outcome; // High confidence bets that won;
            });
            return marketResponses.length / bettingBehavior.totalBets;
        }
        calculateTemporalPreference(bettingBehavior) {
            if (bettingBehavior.totalBets === 0)
                return 0.5;
            // Calculate how well the user performs with time-based predictions;
            const temporalBets = bettingBehavior.outcomeHistory.filter((outcome, index) => {

                return confidence > 0.6 && outcome; // Medium-high confidence bets that won;
            });
            return temporalBets.length / bettingBehavior.totalBets;
        }
        calculateFactorImpact(factor, weight) {
            return factor * weight;
        }
        calculateClusterImpact(cluster, weight) {
            return cluster.averageROI * weight + cluster.averageWinRate * (1 - weight);
        }
        calculateTotalImpact(factors) {
            return factors.reduce((sum, factor) => sum + factor, 0);
        }
    };
    __setFunctionName(_classThis, "UserPersonalizationService");
    (() => {

        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserPersonalizationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserPersonalizationService = _classThis;
})();
export { UserPersonalizationService };
export const userPersonalizationService = UserPersonalizationService.getInstance();
// TODO: Inject userPersonalizationService overlays into DashboardPage, BetsPage, AnalyticsPage and prediction overlays.
