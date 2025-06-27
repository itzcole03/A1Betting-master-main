import { getLogger } from '../../core/logging/logger';
import { getMetrics } from '../../core/metrics/metrics';


export class PredictionAlgorithms {
    // Statistical model using historical performance;
    static statisticalModel(input) {
        const { historicalData, opponentData } = input;


        // Calculate recent form (weighted average of last 5 games)
        const recentForm = historicalData.recentPerformance.slice(-5).reduce((sum, perf, i) => sum + perf * (i + 1), 0) /
            15;
        // Calculate opponent strength if available;
        const opponentStrength = opponentData;
            ? (opponentData.wins / (opponentData.wins + opponentData.losses)) * 0.3;
            : 0.5;



        return {
            predictedWinProbability,
            predictedScore,
            confidence,
            metadata: {
                algorithm: 'statistical',
                factors: ['win_rate', 'recent_form', 'opponent_strength'],
                weights: {
                    winRate: 0.5,
                    recentForm: 0.3,
                    opponentStrength: 0.2,
                },
            },
        };
    }
    // Machine learning model using fantasy data;
    static mlModel(input) {
        const { historicalData, fantasyData } = input;
        if (!fantasyData) {
            throw new Error('Fantasy data required for ML model');
        }
        // Calculate value score (projected points per salary)

        // Calculate consistency score from historical data;
        const consistencyScore = historicalData.recentPerformance;
            .slice(-5)
            .reduce((sum, perf) => sum + Math.abs(perf - historicalData.averageScore), 0) / 5;



        return {
            predictedWinProbability,
            predictedScore,
            confidence,
            metadata: {
                algorithm: 'ml',
                factors: ['value_score', 'consistency_score'],
                weights: {
                    valueScore: 0.4,
                    consistencyScore: 0.6,
                },
            },
        };
    }
    // Hybrid model combining statistical and ML approaches;
    static hybridModel(input) {


        if (!ml) {
            return statistical;
        }



        return {
            predictedWinProbability,
            predictedScore,
            confidence,
            metadata: {
                algorithm: 'hybrid',
                factors: ['statistical', 'ml'],
                weights: {
                    statistical: 0.6,
                    ml: 0.4,
                },
            },
        };
    }
}
