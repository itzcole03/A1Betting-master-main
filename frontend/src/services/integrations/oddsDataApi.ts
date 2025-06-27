import { ApiBase } from './apiBase.ts';
import { API_CONFIG } from '@/config/apiConfig.ts';

export class OddsDataApi extends ApiBase {
  constructor() {
    super(API_CONFIG.ODDS_DATA.BASE_URL, API_CONFIG.ODDS_DATA.API_KEY);
  }

  async getOdds(params: Record<string, any> = {}) {
    return this.request({
      url: '/odds',
      method: 'GET',
      params: { ...params, api_key: this.apiKey },
    });
  }

  // Add more endpoints as needed;
}
