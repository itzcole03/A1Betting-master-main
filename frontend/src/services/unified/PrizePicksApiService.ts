import axios from 'axios.ts';
import type { AxiosInstance } from 'axios.ts';
import { BaseApiService, ApiResponse } from './ApiService.js';
import type { PrizePicksPlayer, Game, PrizePicksProjection } from '@/types/prizePicks.js';


export class PrizePicksApiService extends BaseApiService {
  protected initializeClient(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseURL,
      timeout: this.config.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  protected handleError(error: Error): void {
    this.emit('error', error);
    // console statement removed
  }

  protected handleResponse<T>(response: ApiResponse<T>): void {
    this.emit('response', response);
  }

  public async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      this.emit('request', endpoint);

      const apiResponse: ApiResponse<T> = {
        data: response.data,
        status: response.status,
        timestamp: Date.now(),
      };
      this.handleResponse(apiResponse);
      return response.data;
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  public async post<T>(endpoint: string, data: unknown): Promise<T> {
    try {
      this.emit('request', endpoint);

      const apiResponse: ApiResponse<T> = {
        data: response.data,
        status: response.status,
        timestamp: Date.now(),
      };
      this.handleResponse(apiResponse);
      return response.data;
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  // PrizePicks specific methods;
  public async getAvailableProps(): Promise<PrizePicksProjection[]> {
    return this.get<PrizePicksProjection[]>('/props/available');
  }

  public async getPlayerStats(playerId: string): Promise<PrizePicksPlayer> {
    // Returns player details and stats, strictly typed;
    return this.get<PrizePicksPlayer>(`/players/${playerId}/stats`);
  }

  public async getGameDetails(gameId: string): Promise<Game> {
    // Returns full game details, strictly typed;
    return this.get<Game>(`/games/${gameId}`);
  }
}
