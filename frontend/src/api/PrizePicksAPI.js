// import { EventMap } from './../../../src/types/core.ts'; // Temporarily remove as EventMap might not have these keys, FILE NOT FOUND;

export class PrizePicksAPI {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || API_BASE_URL;
    }
    async request(endpoint, method = 'GET', body, additionalHeaders, params) {

        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...additionalHeaders,
        };
        if (this.apiKey) {
            headers['X-Api-Key'] = this.apiKey;
        }
        const configInit = {
            method,
            headers,
        };
        if (body && (method === 'POST' || method === 'PUT')) {
            configInit.body = JSON.stringify(body);
        }
        try {

            if (!response.ok) {

                // Removed eventBus.emit for 'api:error'
                // this.eventBus?.emit('api:error' as any, {
                //   source: 'PrizePicksAPI',
                //   endpoint,
                //   status: response.status,
                //   error: errorBody,
                // });
                // console statement removed
                throw new Error(`PrizePicks API request failed to ${endpoint}: ${response.status} ${response.statusText} - ${errorBody}`);
            }
            if (response.status === 204) {
                // No Content;
                return null;
            }

            // Removed eventBus.emit for 'api:success'
            // this.eventBus?.emit('api:success' as any, {
            //     source: 'PrizePicksAPI',
            //     endpoint,
            //     status: response.status,
            //     data: responseData,
            // });
            return responseData;
        }
        catch (error) {
            // Removed eventBus.emit for 'api:error'
            // this.eventBus?.emit('api:error' as any, {
            //     source: 'PrizePicksAPI',
            //     endpoint,
            //     status: (error instanceof Response) ? error.status : 0,
            //     error: (error instanceof Error) ? error.message : String(error),
            // });
            // console statement removed
            throw error;
        }
    }
    async fetchProjections(leagueId, queryParams = {}) {


        if (leagueId) {
            params['league_id'] = leagueId;
        }
        else if (!params['league_id']) {
            // If no leagueId is provided in args or queryParams, default to NBA;
            params['league_id'] = 'NBA';
        }
        return this.request(endpoint, 'GET', undefined, undefined, params);
    }
    async fetchProjectionById(projectionId) {

        return this.request(endpoint);
    }
    async fetchLeagues() {

        return this.request(endpoint);
    }
    async fetchStatTypes() {

        return this.request(endpoint);
    }
    async fetchPlayerById(playerId) {

        return this.request(endpoint);
    }
}
