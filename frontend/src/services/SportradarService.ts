import type { AxiosInstance } from 'axios.ts';
import axios from 'axios.ts';
import { EventBus } from '@/unified/EventBus.js';
import { UnifiedConfig } from '@/unified/UnifiedConfig.js';

export interface SportradarPlayerStats {
  [stat: string]: number;
}

export interface SportradarTeamStats {
  [stat: string]: number;
}

export interface SportradarInjury {
  id: string;
  playerId: string;
  teamId: string;
  description: string;
  status: string;
}

export interface SportradarMatchupData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
}

export class SportradarService {
  private static instance: SportradarService;
  private readonly config: {
    apiKey: string;
    baseUrl: string;
    timeout: number;
    cacheDuration: number;
  };
  private readonly client: AxiosInstance;
  private readonly eventBus: EventBus;

  private constructor() {

    this.config = configManager.get('sportradar');
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: { 'X-API-Key': this.config.apiKey },
    });
    this.eventBus = EventBus.getInstance();
  }

  static getInstance(): SportradarService {
    if (!SportradarService.instance) {
      SportradarService.instance = new SportradarService();
    }
    return SportradarService.instance;
  }

  async getPlayerStats(playerId: string, options?: { season?: string; league?: string }): Promise<SportradarPlayerStats> {

    return response.data;
  }

  async getTeamStats(teamId: string, options?: { season?: string; league?: string }): Promise<SportradarTeamStats> {

    return response.data;
  }

  async getGameSchedule(options?: { startDate?: string; endDate?: string; league?: string }): Promise<SportradarMatchupData[]> {

    return response.data;
  }

  async getInjuries(options?: { team?: string; league?: string }): Promise<SportradarInjury[]> {


    this.eventBus.emit('injury:update', {
      injuries,
      timestamp: Date.now(),
    });
    return injuries;
  }

  async getMatchup(matchupId: string): Promise<SportradarMatchupData> {


    this.eventBus.emit('match:update', {
      match,
      timestamp: Date.now(),
    });
    return match;
  }

  /**
   * Extracts and returns normalized features for ensemble prediction.
   * @param context - { playerId, teamId, matchupId }
   * @returns Normalized feature object;
   */
  async getFeatures(context: { playerId?: string; teamId?: string; matchupId?: string }): Promise<Record<string, number | string>> {
    const features: Record<string, number | string> = {};
    if (context.playerId) {

      for (const [k, v] of Object.entries(stats)) {
        features[`playerStat_${k}`] = v;
      }
    }
    if (context.teamId) {

      for (const [k, v] of Object.entries(stats)) {
        features[`teamStat_${k}`] = v;
      }
    }
    if (context.matchupId) {

      features.matchupId = matchup.id;
      features.homeTeam = matchup.homeTeam;
      features.awayTeam = matchup.awayTeam;
      features.date = matchup.date;
    }
    return features;
  }
}

export const sportradarService = SportradarService.getInstance();
