import { EventEmitter } from 'events';
/**
 * Modern ExternalApiService with proper async/await and error handling;
 */
export class ExternalApiService extends EventEmitter {
    constructor(config) {
        super();
        this.config = config;
    }
    /**
     * @deprecated Use newsService.fetchHeadlines instead. This method will be removed in a future release.
     * Calls the unified newsService.fetchHeadlines for robust news fetching.
     */
    async getSportsNews() {
        // DEPRECATED: Use newsService.fetchHeadlines instead;
        // console statement removed
        try {
            // Dynamic import to avoid circular dependencies;


            // Map ESPNHeadline to SportsNewsArticle;
            return headlines.map((h) => ({
                id: h.id || `article-${Date.now()}`,
                title: h.title || h.summary || 'Untitled',
                summary: h.summary || h.title || 'No summary available',
                url: h.link || '',
                publishedAt: h.publishedAt || new Date().toISOString(),
            }));
        }
        catch (error) {
            // console statement removed
            this.emit('error', error);
            // Return fallback data;
            return [
                {
                    id: 'fallback-1',
                    title: 'Sports News Unavailable',
                    summary: 'Unable to fetch latest sports news at this time.',
                    url: '',
                    publishedAt: new Date().toISOString(),
                },
            ];
        }
    }
    // Add more endpoints as needed;
    async getSchedule() {
        try {
            const response = await fetch(`${this.config.baseURL}/schedule`, {
                signal: AbortSignal.timeout(this.config.timeout || 5000),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            // console statement removed
            this.emit('error', error);
            return [];
        }
    }
}
export const externalApiService = new ExternalApiService({
    baseURL: import.meta.env.VITE_EXTERNAL_API_URL || 'https://api.sportsdata.io/v3/news',
    timeout: 10000,
});
