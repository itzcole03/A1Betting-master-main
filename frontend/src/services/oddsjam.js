import { apiService } from './api';
class OddsJamService {
    constructor() {
        this.config = {
            apiKey: process.env.REACT_APP_ODDSJAM_API_KEY || '',
            baseUrl: process.env.REACT_APP_ODDSJAM_API_URL || 'https://api.oddsjam.com',
        };
    }
    async getOdds(sport, date) {
        try {

            if (date)
                params.date = date;

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getMarketAnalysis(marketId) {
        try {

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getBookmakers() {
        try {
            const response = await apiService.get('/oddsjam/bookmakers', {
                apiKey: this.config.apiKey,
            });
            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getHistoricalOdds(marketId, days) {
        try {
            const response = await apiService.get(`/oddsjam/markets/${marketId}/history`, {
                apiKey: this.config.apiKey,
                days,
            });
            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getArbitrageOpportunities(sport) {
        try {
            const response = await apiService.get(`/oddsjam/${sport}/arbitrage`, {
                apiKey: this.config.apiKey,
            });
            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
}
export const oddsjamService = new OddsJamService();
