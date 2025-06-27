import axios from 'axios';
import { EventBus } from '../unified/EventBus.js';
import { UnifiedConfig } from '../unified/UnifiedConfig.js';
export class SportradarService {
    constructor() {

        this.config = configManager.get('sportradar');
        this.client = axios.create({
            baseURL: this.config.baseUrl,
            timeout: this.config.timeout,
            headers: { 'X-API-Key': this.config.apiKey },
        });
        this.eventBus = EventBus.getInstance();
    }
    static getInstance() {
        if (!SportradarService.instance) {
            SportradarService.instance = new SportradarService();
        }
        return SportradarService.instance;
    }
    async getPlayerStats(playerId, options) {

        return response.data;
    }
    async getTeamStats(teamId, options) {

        return response.data;
    }
    async getGameSchedule(options) {

        return response.data;
    }
    async getInjuries(options) {


        this.eventBus.emit('injury:update', {
            injuries,
            timestamp: Date.now(),
        });
        return injuries;
    }
    async getMatchup(matchupId) {


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
    async getFeatures(context) {

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
