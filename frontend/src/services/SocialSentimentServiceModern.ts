import { EventEmitter } from 'events.ts';

interface SentimentAnalysis {
  text: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence: number;
  platform: string;
  timestamp: number;
  topics: string[];
  entities: {
    name: string;
    type: string;
    sentiment: number;
  }[];
}

interface SentimentTrend {
  entityId: string;
  entityType: string;
  timeframe: string;
  platform?: string;
  sentiment: {
    positive: number;
    negative: number;
    neutral: number;
  };
  volume: number;
  trends: {
    timestamp: number;
    sentiment: number;
    volume: number;
  }[];
}

interface EntityMention {
  entityId: string;
  entityType: string;
  mentions: {
    text: string;
    platform: string;
    sentiment: number;
    timestamp: number;
    engagement: number;
  }[];
  summary: {
    totalMentions: number;
    avgSentiment: number;
    platforms: string[];
  };
}

interface SentimentConfig {
  apiUrl: string;
  apiKey: string;
  batchSize: number;
  refreshInterval: number;
  enableRealTime: boolean;
}

/**
 * Modern SocialSentimentService with proper async/await and error handling;
 */
export class SocialSentimentService extends EventEmitter {
  private config: SentimentConfig;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private analysisQueue: Array<{
    text: string;
    platform: string;
    timestamp: number;
  }> = [];
  private readonly CACHE_TTL = 300000; // 5 minutes;

  constructor() {
    super();
    this.config = {
      apiUrl: import.meta.env.VITE_SENTIMENT_API_URL || 'https://api.sentiment.com',
      apiKey: import.meta.env.VITE_SENTIMENT_API_KEY || '',
      batchSize: 50,
      refreshInterval: 30000,
      enableRealTime: import.meta.env.VITE_ENABLE_SENTIMENT === 'true',
    };

    if (this.config.enableRealTime) {
      this.startProcessingQueue();
    }
  }

  /**
   * Queue text for sentiment analysis;
   */
  queueAnalysis(text: string, platform: string): void {
    if (import.meta.env.VITE_DISABLE_SOCIAL_SENTIMENT === 'true') {
      return;
    }

    this.queueForAnalysis(text, platform, Date.now());
  }

  /**
   * Analyze sentiment for a single text;
   */
  async analyzeSentiment(text: string, platform: string): Promise<SentimentAnalysis | null> {
    if (import.meta.env.VITE_DISABLE_SOCIAL_SENTIMENT === 'true') {
      return this.simulateSentiment(text, platform);
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          text,
          platform,
          options: {
            includeEntities: true,
            includeTopics: true,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Sentiment API error: ${response.status}`);
      }

      this.reportStatus('sentiment-api', true, 0.9);
      return result;
    } catch (error) {
      // console statement removed
      this.reportStatus('sentiment-api', false, 0.1);
      return this.simulateSentiment(text, platform);
    }
  }

  /**
   * Get sentiment trend for an entity;
   */
  async getSentimentTrend(params: {
    entityId: string;
    entityType: string;
    timeframe: string;
    platform?: string;
  }): Promise<SentimentTrend | null> {


    if (cached) return cached;

    try {
      const response = await fetch(`${this.config.apiUrl}/trends`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Trends API error: ${response.status}`);
      }

      this.setCachedData(cacheKey, trend);
      return trend;
    } catch (error) {
      // console statement removed
      return null;
    }
  }

  /**
   * Get entity mentions;
   */
  async getEntityMentions(entityId: string, entityType: string): Promise<EntityMention | null> {


    if (cached) return cached;

    try {
      const response = await fetch(`${this.config.apiUrl}/entities/${entityId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Entity mentions API error: ${response.status}`);
      }

      this.setCachedData(cacheKey, mentions);
      return mentions;
    } catch (error) {
      // console statement removed
      return null;
    }
  }

  /**
   * Start processing the analysis queue;
   */
  private async startProcessingQueue(): Promise<void> {
    setInterval(async () => {
      if (this.analysisQueue.length === 0) return;

      try {
        await this.analyzeBatch(batch);
      } catch (error) {
        // console statement removed
      }
    }, this.config.refreshInterval);
  }

  /**
   * Process a batch of sentiment analysis requests;
   */
  private async analyzeBatch(batch: Array<{
    text: string;
    platform: string;
    timestamp: number;
  }>): Promise<SentimentAnalysis[]> {

    try {
      const response = await fetch(`${this.config.apiUrl}/analyze/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({ batch }),
      });

      if (!response.ok) {
        throw new Error(`Batch sentiment API error: ${response.status}`);
      }


      // Emit metrics;
      this.emit('metric:recorded', {
        type: 'sentiment_batch_processed',
        value: analyses.length,
        duration: Date.now() - startTime,
        timestamp: Date.now(),
      });

      return analyses;
    } catch (error) {
      // console statement removed
      
      // Return simulated results for fallback;
      return batch.map(item => this.simulateSentiment(item.text, item.platform));
    }
  }

  /**
   * Add text to analysis queue;
   */
  private queueForAnalysis(text: string, platform: string, timestamp: number): void {
    this.analysisQueue.push({ text, platform, timestamp });

    // Emit queue metrics;
    this.emit('metric:recorded', {
      type: 'sentiment_queue_size',
      value: this.analysisQueue.length,
      timestamp: Date.now(),
    });
  }

  /**
   * Simulate sentiment analysis for fallback;
   */
  private simulateSentiment(text: string, platform: string): SentimentAnalysis {



    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
    const confidence = 0.5;

    if (words.some(word => positiveWords.includes(word))) {
      sentiment = 'positive';
      confidence = 0.7;
    } else if (words.some(word => negativeWords.includes(word))) {
      sentiment = 'negative';
      confidence = 0.7;
    }

    return {
      text,
      sentiment,
      confidence,
      platform,
      timestamp: Date.now(),
      topics: ['sports', 'betting'],
      entities: [],
    };
  }

  /**
   * Report service status;
   */
  private reportStatus(source: string, connected: boolean, quality: number): void {
    if (typeof window !== 'undefined') {
      (window as any).appStatus = (window as any).appStatus || {};
      (window as any).appStatus[source] = { connected, quality, timestamp: Date.now() };
    }
    console.info(`[SocialSentimentService] ${source} status:`, { connected, quality });
  }

  /**
   * Generate cache key;
   */
  private getCacheKey(endpoint: string, params?: Record<string, any>): string {

    return `${endpoint}:${paramStr}`;
  }

  /**
   * Get cached data if still valid;
   */
  private getCachedData<T>(key: string): T | null {

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data as T;
    }
    return null;
  }

  /**
   * Set data in cache;
   */
  private setCachedData<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  /**
   * Clear all cached data;
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear specific cache item;
   */
  clearCacheItem(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Get current queue size;
   */
  getQueueSize(): number {
    return this.analysisQueue.length;
  }

  /**
   * Check if queue is processing;
   */
  isQueueProcessing(): boolean {
    return this.config.enableRealTime;
  }
}

// Export singleton instance;
export const socialSentimentService = new SocialSentimentService();
