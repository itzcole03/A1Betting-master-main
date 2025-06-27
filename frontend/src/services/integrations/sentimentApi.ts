import { ApiBase } from './apiBase.ts';
import { API_CONFIG } from '@/config/apiConfig.ts';

export class SentimentApi extends ApiBase {
  constructor() {
    super(API_CONFIG.SENTIMENT.BASE_URL, API_CONFIG.SENTIMENT.API_KEY);
  }

  async getSentimentSnapshot(params: Record<string, any> = {}) {
    return this.request({
      url: '/sentiment',
      method: 'GET',
      params: { ...params, api_key: this.apiKey },
    });
  }

  // Add more endpoints as needed;
}
