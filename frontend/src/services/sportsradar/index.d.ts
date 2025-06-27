import { LiveScore, GameDetails, PlayerStats } from '@/types.ts';
declare class SportsRadarService {
    private adapter;
    constructor();
    fetchLiveScores(): Promise<LiveScore[]>;
    fetchGameDetails(gameId: string): Promise<GameDetails>;
    fetchPlayerStats(playerId: string): Promise<PlayerStats>;
    private transformLiveScores;
    private transformGameDetails;
    private transformPlayerStats;
}
export declare const sportsRadarService: SportsRadarService;
export {};
