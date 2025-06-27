import { logger } from '@/logger.ts';
import { cache } from '@/cache.ts';
import MLService from '@/ml.ts';
import { adapterManager } from '@/adapters.ts';
import prizePicksAdapter from '@/adapters/prizepicks.ts';

import { measurePerformance, handleApiError, transformData } from '@/utils.ts';
import { PrizePicksProps, PrizePicksPlayer, PrizePicksLines } from '@/types/prizePicks.ts';

interface Prop {
  id: string;
  playerName: string;
  propType: string;
  line: number;
  overOdds: number;
  underOdds: number;
  gameTime: Date;
  sport: string;
}

interface LineupRecommendation {
  playerName: string;
  propType: string;
  line: number;
  confidence: number;
  expectedValue: number;
  multiplier: number;
}

interface PrizePicksConfig {
  apiKey: string;
  baseUrl: string;
  cacheEnabled: boolean;
}

export class PrizePicksService {
  private static instance: PrizePicksService;
  private config: PrizePicksConfig;
  private mlService: MLService;
  private adapter: import('../../types').PrizePicksAdapter;

  private constructor(config: PrizePicksConfig) {
    this.config = config;
    this.mlService = MLService.getInstance();
    this.adapter = adapterManager.getAdapter<PrizePicksAdapter>('prizepicks')!;
  }

  public static getInstance(config?: PrizePicksConfig): PrizePicksService {
    if (!PrizePicksService.instance) {
      if (!config) {
        throw new Error('PrizePicksService configuration is required for initialization');
      }
      PrizePicksService.instance = new PrizePicksService(config);
    }
    return PrizePicksService.instance;
  }

  public async getAvailableProps(params: {
    sports: string[];
    timeWindow: string;
  }): Promise<Prop[]> {
    try {


      if (cachedProps) {
        return cachedProps;
      }

      await cache.set(cacheKey, props);
      return props;
    } catch (error) {
      logger.error('Failed to fetch props', { error, params });
      throw new Error('Failed to fetch props: ' + (error as Error).message);
    }
  }

  private async fetchProps(params: { sports: string[]; timeWindow: string }): Promise<Prop[]> {
    // Implementation of prop fetching logic;
    return [];
  }

  public async generateOptimizedLineup(params: {
    predictions: any[];
    props: Prop[];
    investmentAmount: number;
    strategyMode: string;
    portfolioSize: number;
  }): Promise<LineupRecommendation[]> {
    try {
      const { predictions, props, investmentAmount, strategyMode, portfolioSize } = params;

      // Filter props based on predictions and strategy;

      // Calculate optimal portfolio;
      const portfolio = this.calculateOptimalPortfolio(
        filteredProps,
        investmentAmount,
        portfolioSize;
      );

      return portfolio;
    } catch (error) {
      logger.error('Failed to generate lineup', { error, params });
      throw new Error('Failed to generate lineup: ' + (error as Error).message);
    }
  }

  private filterPropsByStrategy(props: Prop[], predictions: any[], strategyMode: string): Prop[] {
    // Implementation of strategy-based filtering;
    return props;
  }

  private calculateOptimalPortfolio(
    props: Prop[],
    investmentAmount: number,
    portfolioSize: number;
  ): LineupRecommendation[] {
    // Implementation of portfolio optimization;
    return [];
  }

  private calculateMultiplier(portfolioSize: number): number {
    const multipliers: Record<number, number> = {
      2: 3,
      3: 5,
      4: 10,
      5: 20,
      6: 40,
    };
    return multipliers[portfolioSize] || 1;
  }

  async fetchProjections(league?: string, statType?: string): Promise<PrizePicksProps[]> {
    return measurePerformance(async () => {
      try {
        const data = await this.adapter.fetchProps({
          sports: league ? [league] : [],
          timeWindow: statType || '',
        });

        return transformData(projections, this.transformProjections, 'prizepicks.fetchProjections');
      } catch (error) {
        handleApiError(error, 'prizepicks.fetchProjections');
        return []; // Return empty array on error;
      }
    }, 'prizepicks.fetchProjections');
  }

  async fetchPlayerDetails(playerId: string): Promise<PrizePicksPlayer | undefined> {
    return measurePerformance(async () => {
      try {
        const data = await this.adapter.fetchPlayers({ sports: [] }); // No playerId-based fetch, fallback to fetching all and filtering;

        return transformData(player, this.transformPlayerDetails, 'prizepicks.fetchPlayerDetails');
      } catch (error) {
        handleApiError(error, 'prizepicks.fetchPlayerDetails');
      }
    }, 'prizepicks.fetchPlayerDetails');
  }

  async fetchLines(propId: string): Promise<PrizePicksLines | null> {
    return measurePerformance(async () => {
      try {


        return transformData(lines, this.transformLines, 'prizepicks.fetchLines');
      } catch (error) {
        handleApiError(error, 'prizepicks.fetchLines');
        return null; // Return null on error;
      }
    }, 'prizepicks.fetchLines');
  }

  private transformProjections(data: any): PrizePicksProps[] {
    return data.map((proj: any) => ({
      id: proj.id,
      league: proj.relationships?.league?.data?.id || 'Unknown',
      player_name: proj.attributes.description.split(' ')[0] || 'Unknown Player',
      stat_type: proj.attributes.stat_type,
      line_score: proj.attributes.line_score,
      description: proj.attributes.description,
      start_time: proj.attributes.start_time,
      status: proj.attributes.status,
      image_url: proj.attributes.custom_image_url,
      projection_type: proj.attributes.projection_type,
      overOdds: undefined,
      underOdds: undefined,
      playerId: proj.relationships?.new_player?.data?.id,
      player: undefined,
    }));
  }

  private transformPlayerDetails(data: any): PrizePicksPlayer {
    return {
      id: data.id,
      name: data.attributes.name,
      team: data.attributes.team_name,
      position: data.attributes.position,
      image_url: data.attributes.image_url,
    };
  }

  private transformLines(data: any): PrizePicksLines {
    // If data is an array, return the first element or an empty array as fallback;
    if (Array.isArray(data)) {
      return data.length > 0 ? data[0] : [];
    }
    return data;

    // Removed unreachable/incorrect return statement. Only return processed data above.
  }

  private parseOdds(ptOld: string | undefined, type: 'o' | 'u'): number | undefined {
    if (!ptOld) return undefined;


    if (!part) return undefined;

    return isNaN(val) ? undefined : val;
  }
}

export default PrizePicksService;
