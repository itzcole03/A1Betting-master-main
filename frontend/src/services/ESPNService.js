import axios from 'axios';
import { EventBus } from '../unified/EventBus.js';
import { UnifiedConfig } from '../unified/UnifiedConfig.js';
export class ESPNService {
    /**
     * Extracts and returns normalized features for a given context (game, player, team, etc.)
     * to be used in ensemble prediction. This enables ESPNService to contribute structured;
     * data to the unified prediction engine for maximum accuracy.
     *
     * @param context - An object containing identifiers and parameters for feature extraction.
     *                  Example: { gameId, playerId, teamId, metric, date, ... }
     * @returns A Promise resolving to a normalized feature object.
     */
    async getFeatures(context) {

        // Game-level features;
        if (context.gameId) {

            if (game) {
                features.gameId = game.id;
                features.sport = game.sport;
                features.league = game.league;
                features.homeTeam = game.homeTeam.name;
                features.awayTeam = game.awayTeam.name;
                features.homeScore = game.homeTeam.score ?? 0;
                features.awayScore = game.awayTeam.score ?? 0;
                features.status = game.status;
                features.venue = game.venue.name;
                if (game.weather) {
                    features.weather_temperature = game.weather.temperature;
                    features.weather_condition = game.weather.condition;
                    features.weather_windSpeed = game.weather.windSpeed;
                }
                features.startTime = game.startTime;
            }
        }
        // Player-level features;
        if (context.playerId) {

            if (player) {
                features.playerId = player.id;
                features.playerName = player.name;
                features.playerPosition = player.position;
                features.playerTeam = player.team;
                features.playerStatus = player.status;
                // Flatten stats;
                for (const [statKey, statValue] of Object.entries(player.stats)) {
                    features[`playerStat_${statKey}`] = statValue;
                }
                // Flatten projections;
                if (player.projections) {
                    for (const [projKey, projValue] of Object.entries(player.projections)) {
                        features[`playerProjection_${projKey}`] = projValue;
                    }
                }
            }
        }
        // Team-level features;
        if (context.teamId) {

            features.teamRosterSize = roster.length;
            // Optionally, aggregate team stats from roster;

            for (const player of roster) {
                for (const [statKey, statValue] of Object.entries(player.stats)) {
                    totalStats[statKey] = (totalStats[statKey] || 0) + statValue;
                }
            }
            for (const [statKey, statValue] of Object.entries(totalStats)) {
                features[`teamStat_${statKey}`] = statValue;
            }
        }
        // News/headlines features;
        if (context.teamId || context.playerId) {
            const headlines = await this.getHeadlines({
                team: context.teamId,
                player: context.playerId,
                limit: 5,
            });
            features.news_count = headlines.length;
            features.news_types = Array.from(new Set(headlines.map(h => h.type)));
        }
        return features;
    }
    constructor() {
        this.eventBus = EventBus.getInstance();
        this.configManager = UnifiedConfig.getInstance();
        this.cache = new Map();
        this.espnConfig = this.configManager.get('espn');
        this.client = axios.create({
            baseURL: this.espnConfig.baseUrl,
            timeout: this.espnConfig.timeout,
        });
        this.setupEventListeners();
    }
    static getInstance() {
        if (!ESPNService.instance) {
            ESPNService.instance = new ESPNService();
        }
        return ESPNService.instance;
    }
    // Legacy config initializer is now unused; config is loaded directly from UnifiedConfig;
    // private initializeConfig(): ESPNConfig { ... }
    setupEventListeners() {
        // Listen for game status updates;
        this.eventBus.on('game:status', async (event) => {
            try {

                if (game) {
                    this.eventBus.emit('game:status', {
                        game,
                        timestamp: Date.now(),
                    });
                }
            }
            catch (error) {
                // console statement removed
            }
        });
        // Listen for player updates;
        this.eventBus.on('player:update', async (event) => {
            try {

                if (player) {
                    this.eventBus.emit('player:update', {
                        player,
                        timestamp: Date.now(),
                    });
                }
            }
            catch (error) {
                // console statement removed
            }
        });
    }
    getCacheKey(endpoint, params) {
        return `${endpoint}:${params ? JSON.stringify(params) : ''}`;
    }
    getCachedData(key) {

        if (cached && Date.now() - cached.timestamp < this.espnConfig.cacheTimeout) {
            return cached.data;
        }
        return null;
    }
    setCachedData(key, data) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
        });
    }
    async getGames(params) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, games);
        return games;
    }
    async getGame(gameId) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, game);
        return game;
    }
    async getPlayers(params) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, players);
        return players;
    }
    async getPlayer(playerId) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, player);
        return player;
    }
    async getPlayerStats(playerId, params) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, stats);
        return stats;
    }
    async getPlayerProjections(playerId, params) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, projections);
        return projections;
    }
    async getHeadlines(params) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, headlines);
        return headlines;
    }
    async getTeamSchedule(teamId, params) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, games);
        return games;
    }
    async getTeamRoster(teamId) {


        if (cached)
            return cached;


        this.setCachedData(cacheKey, players);
        return players;
    }
    clearCache() {
        this.cache.clear();
    }
    clearCacheItem(key) {
        this.cache.delete(key);
    }
}
