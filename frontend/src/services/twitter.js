import { apiService } from '../services/api/ApiService.js';
class TwitterService {
    constructor() {
        this.config = {
            apiKey: process.env.REACT_APP_TWITTER_API_KEY || '',
            baseUrl: process.env.REACT_APP_TWITTER_API_URL || 'https://api.twitter.com',
        };
    }
    async searchTweets(query, options) {
        try {
            const params = {
                apiKey: this.config.apiKey,
                query,
                ...(options || {}),
            };

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getSentimentAnalysis(entity, options) {
        try {
            const params = {
                apiKey: this.config.apiKey,
                entity,
                ...(options || {}),
            };

            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getTrendingTopics(sport) {
        try {
            const response = await apiService.get(`/twitter/trends/${sport}`, {
                apiKey: this.config.apiKey,
            });
            return response;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async getUserSentiment(username) {
        try {
            const response = await apiService.get(`/twitter/users/${username}/sentiment`, {
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
export const twitterService = new TwitterService();
