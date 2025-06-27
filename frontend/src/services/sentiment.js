import axios from 'axios';
import * as cheerio from 'cheerio';
class SentimentService {
    constructor() {
        this.config = {
            baseUrl: process.env.REACT_APP_SENTIMENT_API_URL || 'http://localhost:8000',
        };
    }
    async getSentiment(entity, options) {
        try {
            // Scrape data from multiple sources;
            const [redditData, espnData, rotowireData] = await Promise.all([
                this.scrapeReddit(entity),
                this.scrapeESPN(entity),
                this.scrapeRotowire(entity),
            ]);
            // Combine and analyze the data;
            const combinedData = this.combineSentimentData([
                { name: 'Reddit', data: redditData },
                { name: 'ESPN', data: espnData },
                { name: 'Rotowire', data: rotowireData },
            ]);
            return {
                entity,
                score: this.calculateOverallScore(combinedData),
                confidence: this.calculateConfidence(combinedData),
                sources: combinedData.map(source => ({
                    name: source.name,
                    score: source.data.score,
                    volume: source.data.volume,
                })),
                timeline: this.generateTimeline(combinedData),
                aspects: this.extractAspects(combinedData),
            };
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async scrapeReddit(entity) {
        try {
            const response = await axios.get(`https://www.reddit.com/search.json`, {
                params: {
                    q: entity,
                    sort: 'relevance',
                    t: 'day',
                    limit: 100,
                },
            });
            const posts = response.data.data.children.map((post) => ({
                title: post.data.title,
                text: post.data.selftext,
                score: post.data.score,
                comments: post.data.num_comments,
                created: post.data.created_utc,
            }));
            return this.analyzeRedditSentiment(posts);
        }
        catch (error) {
            // console statement removed
            return { score: 0, volume: 0 };
        }
    }
    async scrapeESPN(entity) {
        try {

            const $ = cheerio.load(response.data);
            const articles = $('.article')
                .map((_, el) => ({
                title: $(el).find('.title').text(),
                summary: $(el).find('.summary').text(),
                date: $(el).find('.date').text(),
            }))
                .get();
            return this.analyzeESPNSentiment(articles);
        }
        catch (error) {
            // console statement removed
            return { score: 0, volume: 0 };
        }
    }
    async scrapeRotowire(entity) {
        try {

            const $ = cheerio.load(response.data);
            const news = $('.news-item')
                .map((_, el) => ({
                title: $(el).find('.title').text(),
                content: $(el).find('.content').text(),
                date: $(el).find('.date').text(),
            }))
                .get();
            return this.analyzeRotowireSentiment(news);
        }
        catch (error) {
            // console statement removed
            return { score: 0, volume: 0 };
        }
    }
    analyzeRedditSentiment(posts) {
        const totalScore = posts.reduce((acc, post) => {

            return acc + postScore;
        }, 0);
        return {
            score: totalScore / posts.length,
            volume: posts.length,
        };
    }
    analyzeESPNSentiment(articles) {
        const totalScore = articles.reduce((acc, article) => {





            return acc + (positiveCount - negativeCount);
        }, 0);
        return {
            score: totalScore / articles.length,
            volume: articles.length,
        };
    }
    analyzeRotowireSentiment(news) {
        const totalScore = news.reduce((acc, item) => {





            return acc + (positiveCount - negativeCount);
        }, 0);
        return {
            score: totalScore / news.length,
            volume: news.length,
        };
    }
    combineSentimentData(sources) {
        return sources.map(source => ({
            ...source,
            weight: source.data.volume / sources.reduce((acc, s) => acc + s.data.volume, 0),
        }));
    }
    calculateOverallScore(combinedData) {
        return combinedData.reduce((acc, source) => {
            return acc + source.data.score * source.weight;
        }, 0);
    }
    calculateConfidence(combinedData) {

        return Math.min(totalVolume / 100, 1); // Normalize to 0-1 range;
    }
    generateTimeline(combinedData) {
        // Implement timeline generation based on the data;
        return [];
    }
    extractAspects(combinedData) {
        // Implement aspect extraction from the data;
        return {};
    }
}
export const sentimentService = new SentimentService();
