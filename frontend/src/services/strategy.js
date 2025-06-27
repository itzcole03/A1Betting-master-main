import { apiService } from './api';
class StrategyService {
    constructor() {
        this.activeStrategies = new Map();
    }
    static getInstance() {
        if (!StrategyService.instance) {
            StrategyService.instance = new StrategyService();
        }
        return StrategyService.instance;
    }
    async getStrategies() {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async analyzeStrategy(strategyId) {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async executeStrategy(strategyId) {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getStrategyPerformance(strategyId) {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getStrategyHistory(strategyId) {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    activateStrategy(strategy) {
        this.activeStrategies.set(strategy.id, strategy);
    }
    deactivateStrategy(strategyId) {
        this.activeStrategies.delete(strategyId);
    }
    getActiveStrategies() {
        return Array.from(this.activeStrategies.values());
    }
    isStrategyActive(strategyId) {
        return this.activeStrategies.has(strategyId);
    }
    async updateStrategySettings(strategyId, settings) {
        try {
            await apiService.updateStrategySettings(strategyId, settings);
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getStrategyRecommendations() {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
}
export const strategyService = StrategyService.getInstance();
export default strategyService;
