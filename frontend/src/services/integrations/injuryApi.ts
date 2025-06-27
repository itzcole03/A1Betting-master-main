import { ApiBase } from './apiBase.ts';
import { API_CONFIG } from '@/config/apiConfig.ts';

export class InjuryApi extends ApiBase {
  constructor() {
    super(API_CONFIG.INJURY.BASE_URL, API_CONFIG.INJURY.API_KEY);
  }

  async getInjuries(params: Record<string, any> = {}) {
    return this.request({
      url: '/injuries',
      method: 'GET',
      params: { ...params, api_key: this.apiKey },
    });
  }

  // Add more endpoints as needed;
}
