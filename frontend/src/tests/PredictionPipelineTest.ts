// Integration test for the prediction pipeline;
import { AdvancedAnalysisEngine } from '@/core/AdvancedAnalysisEngine.ts';
import { DataIntegrationHub } from '@/core/DataIntegrationHub.ts';
import { UnifiedPredictionEngine } from '@/core/UnifiedPredictionEngine.ts';
import { llmService } from '@/services/LLMService.ts';

// Test interface for prediction pipeline;
export interface PredictionPipelineTest {
    testBasicPrediction(): Promise<boolean>;
    testDataIntegration(): Promise<boolean>;
    testLLMIntegration(): Promise<boolean>;
    testAnalysisEngine(): Promise<boolean>;
}

export class PredictionPipelineIntegration implements PredictionPipelineTest {
    private predictionEngine: UnifiedPredictionEngine;
    private dataHub: DataIntegrationHub;
    private analysisEngine: AdvancedAnalysisEngine;

    constructor() {
        this.predictionEngine = UnifiedPredictionEngine.getInstance();
        this.dataHub = DataIntegrationHub.getInstance();
        this.analysisEngine = AdvancedAnalysisEngine.getInstance();
    }

    async testBasicPrediction(): Promise<boolean> {
        try {
            // console statement removed

            const testContext = {
                playerId: 'test-player-123',
                metric: 'points',
                timestamp: Date.now(),
                marketState: {
                    line: 25.5,
                    volume: 1000,
                    movement: 'up' as const;
                }
            };

            // console statement removed

            return prediction &&
                typeof prediction.value === 'number' &&
                typeof prediction.confidence === 'number' &&
                prediction.confidence >= 0 && prediction.confidence <= 1;

        } catch (error) {
            // console statement removed
            return false;
        }
    }

    async testDataIntegration(): Promise<boolean> {
        try {
            // console statement removed

            // console statement removed.length > 0,
                hasSentiment: Object.keys(integratedData.sentiment).length > 0,
                hasOdds: Object.keys(integratedData.odds).length > 0;
            });

            return integratedData &&
                typeof integratedData.timestamp === 'number' &&
                typeof integratedData.projections === 'object';

        } catch (error) {
            // console statement removed
            return false;
        }
    }

    async testLLMIntegration(): Promise<boolean> {
        try {
            // console statement removed

            const response = await llmService.processChatMessage(testMessage, {
                previousMessages: [],
                gameData: { activeAnalyses: 1, liveGames: 1, confidencePicks: 1, valueBets: 1 },
                userPreferences: { riskTolerance: 'moderate', preferredSports: ['NBA'], betTypes: ['player_props'] }
            });

            // console statement removed

            return response && typeof response.content === 'string' && response.content.length > 0;

        } catch (error) {
            // console statement removed
            return false;
        }
    }

    async testAnalysisEngine(): Promise<boolean> {
        try {
            // console statement removed

            const testData = {
                playerId: 'test-player-123',
                sport: 'nba',
                position: 'forward',
                recentStats: { points: 25, rebounds: 8, assists: 6 }
            };

            // console statement removed

            return analysis &&
                typeof analysis.predictions === 'object' &&
                typeof analysis.trends === 'object';

        } catch (error) {
            // console statement removed
            return false;
        }
    }

    async runAllTests(): Promise<{
        basicPrediction: boolean;
        dataIntegration: boolean;
        llmIntegration: boolean;
        analysisEngine: boolean;
        overall: boolean;
    }> {
        // console statement removed

        const results = {
            basicPrediction: await this.testBasicPrediction(),
            dataIntegration: await this.testDataIntegration(),
            llmIntegration: await this.testLLMIntegration(),
            analysisEngine: await this.testAnalysisEngine(),
            overall: false;
        };

        results.overall = Object.values(results).slice(0, -1).every(result => result === true);

        // console statement removed

        if (results.overall) {
            // console statement removed
        } else {
            // console statement removed
        }

        return results;
    }
}

// Export singleton instance for easy testing;
export const predictionPipelineTest = new PredictionPipelineIntegration();

// Helper function to run tests from browser console;
(window as any).testPredictionPipeline = () => predictionPipelineTest.runAllTests();
