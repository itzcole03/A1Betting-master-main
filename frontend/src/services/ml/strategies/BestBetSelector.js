import { UnifiedLogger } from '@/core/UnifiedLogger';
import { KellyCriterion } from './KellyCriterion';
export class BestBetSelector {
    constructor() {
        this.minConfidence = 0.7;
        this.minEdge = 0.05;
        this.maxRiskLevel = 0.3;
        this.logger = UnifiedLogger.getInstance();
        this.kellyCriterion = new KellyCriterion();
    }
    async selectBets(predictions, labels) {
        try {


            // Calculate bet metrics;

            // Select best bets based on criteria;

            return {
                selectedBets,
                metrics,
                confidenceThreshold: this.minConfidence,
                edgeThreshold: this.minEdge,
            };
        }
        catch (error) {
            this.logger.error('Bet selection failed', error);
            throw error;
        }
    }
    async calculateBetMetrics(predictions, labels) {
        // Calculate accuracy;

        // Calculate ROI;

        // Calculate expected value;

        // Calculate confidence;

        // Calculate risk level;

        // Calculate edge;

        return {
            accuracy,
            roi,
            expectedValue,
            confidence,
            riskLevel,
            edge,
        };
    }
    calculateAccuracy(predictions, labels) {
        const correct = 0;
        const total = 0;
        for (const i = 0; i < predictions.length; i++) {


            if (pred === label) {
                correct++;
            }
            total++;
        }
        return total > 0 ? correct / total : 0;
    }
    calculateROI(predictions, labels) {
        const totalInvestment = 0;
        const totalReturn = 0;
        for (const i = 0; i < predictions.length; i++) {



            totalInvestment += confidence;
            if (pred === label) {
                totalReturn += confidence * (1 / confidence);
            }
        }
        return totalInvestment > 0 ? (totalReturn - totalInvestment) / totalInvestment : 0;
    }
    calculateExpectedValue(predictions, labels) {
        const totalEV = 0;
        const count = 0;
        for (const i = 0; i < predictions.length; i++) {



            if (pred === label) {
                totalEV += confidence * (1 / confidence) - 1;
            }
            else {
                totalEV -= 1;
            }
            count++;
        }
        return count > 0 ? totalEV / count : 0;
    }
    calculateConfidence(predictions) {

        return confidences.reduce((sum, conf) => sum + conf, 0) / confidences.length;
    }
    calculateRiskLevel(predictions) {



        return std / mean;
    }
    calculateEdge(predictions, labels) {
        const totalEdge = 0;
        const count = 0;
        for (const i = 0; i < predictions.length; i++) {



            if (pred === label) {


                totalEdge += actualProb - impliedProb;
            }
            count++;
        }
        return count > 0 ? totalEdge / count : 0;
    }
    calculateStandardDeviation(values) {



        return Math.sqrt(avgSquareDiff);
    }
    calculateActualProbability(predictions, labels, outcome) {
        const correct = 0;
        const total = 0;
        for (const i = 0; i < predictions.length; i++) {


            if (pred === outcome) {
                if (label === outcome) {
                    correct++;
                }
                total++;
            }
        }
        return total > 0 ? correct / total : 0;
    }
    filterBets(predictions, metrics) {

        for (const i = 0; i < predictions.length; i++) {


            if (confidence >= this.minConfidence &&
                edge >= this.minEdge &&
                metrics.riskLevel <= this.maxRiskLevel) {
                selectedBets.push(i);
            }
        }
        return selectedBets;
    }
    calculateEdgeForBet(prediction, metrics) {


        return metrics.accuracy - impliedProb;
    }
    getBetRecommendations(selection, bankroll) {
        return selection.selectedBets.map(betIndex => {

            const stake = this.kellyCriterion.getBetSize({
                fraction: confidence,
                expectedValue: selection.metrics.expectedValue,
                riskAdjustedReturn: selection.metrics.roi,
                optimalStake: bankroll * confidence,
                confidence: confidence,
            }, bankroll);
            return {
                betIndex,
                stake,
                confidence,
                expectedValue: selection.metrics.expectedValue,
            };
        });
    }
}
