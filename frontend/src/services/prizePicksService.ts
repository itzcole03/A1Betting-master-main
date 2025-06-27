import { APIError, AppError } from '@/core/UnifiedError.ts';
import { RawPrizePicksProjection, PrizePicksIncludedResource } from '@/api/PrizePicksAPI.ts'; 
import { unifiedMonitor } from '@/core/UnifiedMonitor.ts';
import {
  PrizePicksProps, // Frontend representation;
  PrizePicksPlayer,
  PrizePicksLines,
  // Assuming backend response matches structure of services/prizepicks_service.py:PrizePicksAPIResponse;
  // which has { data: RawPrizePicksProjection[], included: any[] }
} from '@/types.ts';
// Corrected import path for raw types from the API definition file;

// Backend endpoint for PrizePicks projections is /api/prizepicks/projections;

// Type for the backend response structure from our Python backend;
// This should match what `routes/lineup.py` -> `/api/prizepicks/projections` returns,
// which is based on `services/prizepicks_service.py:PrizePicksAPIResponse`
interface BackendPrizePicksProjectionsResponse {
  data: RawPrizePicksProjection[];
  included?: PrizePicksIncludedResource[]; 
}

// Helper to transform raw backend data to frontend PrizePicksProps;
const transformBackendProjectionToFrontendProp = (
    rawProj: RawPrizePicksProjection,
    includedData?: PrizePicksIncludedResource[]
  ): PrizePicksProps => {
    let playerDetail: PrizePicksPlayer | undefined = undefined;

    if (playerId && includedData) {

        if (rawPlayer && rawPlayer.attributes) { // Added null check for attributes;
            playerDetail = {
                id: rawPlayer.id,
                name: rawPlayer.attributes.name,
                team: rawPlayer.attributes.team_name, 
                position: rawPlayer.attributes.position,
                image_url: rawPlayer.attributes.image_url,
                // league: rawPlayer.attributes.league_name, // If available;
            };
        }
    }
    // Handle custom_image_url possibly being null;

    return {
        id: rawProj.id,
        league: rawProj.relationships?.league?.data?.id || 'Unknown', // Or map from included league name;
        player_name: playerDetail?.name || rawProj.attributes.description.split(' ')[0] || 'Unknown Player', // Fallback for player name;
        stat_type: rawProj.attributes.stat_type,
        line_score: rawProj.attributes.line_score,
        description: rawProj.attributes.description,
        start_time: rawProj.attributes.start_time,
        status: rawProj.attributes.status,
        image_url: playerDetail?.image_url || (customImageUrl === null ? undefined : customImageUrl),
        projection_type: rawProj.attributes.projection_type as any, // Cast as needed;
        // Odds mapping needs to be confirmed based on actual backend transformation or direct PrizePicks API structure if proxied closely.
        // The backend's prizepicks_service.py currently just forwards the PrizePicks API structure.
        // RawPrizePicksProjection attributes like pt_old or flash_sale_line_score might contain odds info.
        // For now, setting to undefined as the direct mapping is unclear from backend service alone.
        overOdds: undefined, 
        underOdds: undefined,
        playerId: playerId,
        player: playerDetail,
    };
};

export const fetchPrizePicksProps = async (league?: string, statType?: string): Promise<PrizePicksProps[]> => {

  try {
    const { get } = await import('./api');
    const endpoint = `${PRIZEPICKS_BACKEND_PREFIX}/projections`;

    if (league) params.append('league_id', league);
    // Backend doesn't currently support statType filter for /projections, but can add if needed;
    // if (statType) params.append('stat_type', statType);
    if (params.toString()) endpoint += `?${params.toString()}`;

    if (trace) {
      trace.setHttpStatus(response.status);
      unifiedMonitor.endTrace(trace);
    }
    if (!response.data || !response.data.data) {
        unifiedMonitor.captureMessage('fetchPrizePicksProps: Backend response missing data field', 'warning', { responseData: response.data });
        return [];
    }

    const transformedProps = response.data.data.map(proj => 
        transformBackendProjectionToFrontendProp(proj, response.data.included)
    );
    return transformedProps;

  } catch (error: any) {

    unifiedMonitor.reportError(error, errContext);
    if (trace) {
      trace.setHttpStatus(error.response?.status || 500);
      unifiedMonitor.endTrace(trace);
    }
    if (error instanceof APIError || error instanceof AppError) throw error;
    throw new AppError('Failed to fetch PrizePicks props from backend.', undefined, errContext, error);
  }
};

/**
 * Fetches a specific player's details.
 * NOTE: The current backend does not have a dedicated endpoint for this.
 * This function might need to parse data from a broader fetch (e.g., from fetchPrizePicksProps's included data)
 * or a new backend endpoint would be required.
 * For now, this will be a placeholder or rely on data within already fetched props.
 */
export const fetchPrizePicksPlayer = async (playerId: string): Promise<PrizePicksPlayer | undefined> => {

  try {
    const { get } = await import('./api');
    // New backend endpoint: GET /api/prizepicks/player/{playerId}
    // This endpoint is expected to return the 'data' part of the PrizePicks player object structure.
    const response = await get<any>(`${PRIZEPICKS_BACKEND_PREFIX}/player/${playerId}`); // Using any for now for the direct player data attributes;
    if (trace) {
      trace.setHttpStatus(response.status);
      unifiedMonitor.endTrace(trace);
    }
    if (!response.data || !response.data.attributes) {
        unifiedMonitor.captureMessage('fetchPrizePicksPlayer: Backend response missing data or attributes', 'warning', { responseData: response.data, playerId });
        return undefined;
    }
    // Map the direct attributes from response.data (which is the player object itself from backend)

    const playerDetail: PrizePicksPlayer = {
        id: rawPlayer.id,
        name: rawPlayer.attributes.name,
        team: rawPlayer.attributes.team_name,
        position: rawPlayer.attributes.position,
        image_url: rawPlayer.attributes.image_url,
        // league: rawPlayer.attributes.league_name, // If available;
    };
    return playerDetail;
  } catch (error: any) {

    unifiedMonitor.reportError(error, errContext);
    if (trace) {
      trace.setHttpStatus(error.response?.status || 500);
      unifiedMonitor.endTrace(trace);
    }
    // Do not throw AppError here, allow undefined to be returned as per original mock;
    return undefined;
  }
};

/**
 * Fetches lines for a specific prop.
 * NOTE: Similar to player details, the current backend returns lines within the projection data.
 * This function would parse from existing data or need a new backend endpoint `/api/prizepicks/lines/{propId}`.
 */
export const fetchPrizePicksLines = async (propId: string): Promise<PrizePicksLines | null> => {

  try {
    const { get } = await import('./api');
    // New backend endpoint: GET /api/prizepicks/prop/{propId}
    // This endpoint returns a RawPrizePicksProjection object.

    if (trace) {
      trace.setHttpStatus(response.status);
      unifiedMonitor.endTrace(trace);
    }

    if (!rawProj || !rawProj.attributes) {
        unifiedMonitor.captureMessage('fetchPrizePicksLines: Backend response missing projection data or attributes', 'warning', { responseData: response.data, propId });
        return null;
    }

    let overOdds: number | undefined = undefined;
    let underOdds: number | undefined = undefined;

    // Attempt to parse odds from pt_old if available. This is highly speculative and PrizePicks specific.
    // Example pt_old format might be "o110 u120" or similar. Backend should ideally parse and provide this clearly.
    if (rawProj.attributes.pt_old && typeof rawProj.attributes.pt_old === 'string') {



        if (overPart) {

            if (!isNaN(val)) overOdds = val;
        }
        if (underPart) {

            if (!isNaN(val)) underOdds = val;
        }
        if (overOdds || underOdds) {
            unifiedMonitor.captureMessage('fetchPrizePicksLines: Parsed odds from pt_old', 'info', { propId, pt_old: rawProj.attributes.pt_old, overOdds, underOdds });
        } else {
            unifiedMonitor.captureMessage('fetchPrizePicksLines: pt_old present but could not parse odds', 'warning', { propId, pt_old: rawProj.attributes.pt_old });
        }
    } else if (rawProj.attributes.flash_sale_line_score && rawProj.attributes.line_score !== rawProj.attributes.flash_sale_line_score) {
        // This is not odds, but indicates a special line. Odds for flash sales are often standard (-110/-110 or similar) or also in pt_old.
        // unifiedMonitor.captureMessage('fetchPrizePicksLines: Flash sale detected, odds might be standard or in pt_old', 'info', { propId });
    }

    // TODO: The backend /api/prizepicks/prop/{propId} endpoint should ideally perform robust odds parsing;
    // from the PrizePicks raw API response (e.g. from 'pt_old.ts' or other fields)
    // and return clearly defined over_odds and under_odds if available.
    // Relying on client-side parsing of pt_old is fragile.

    return {
        prop_id: rawProj.id,
        line_score: rawProj.attributes.line_score,
        over_odds: overOdds, 
        under_odds: underOdds, 
    };

  } catch (error: any) {

    unifiedMonitor.reportError(error, errContext);
    if (trace) {
      trace.setHttpStatus(error.response?.status || 500);
      unifiedMonitor.endTrace(trace);
    }
    // Do not throw AppError here, allow null to be returned as per original mock;
    return null;
  }
};

// This would be used if the application allows placing entries directly via API (if PrizePicks supports it)
// export const submitPrizePicksEntry = async (entryData: PrizePicksEntrySubmission): Promise<PrizePicksEntry> => {
//   try {
//     const response = await apiClient.post<PrizePicksEntry>(`${PRIZEPICKS_API_PREFIX}/entries`, entryData);
//     return response.data;
//   } catch (error) {
//     // console statement removed
//     throw error;
//   }
// };

export const prizePicksService = {
  fetchPrizePicksProps,
  fetchPrizePicksPlayer,
  fetchPrizePicksLines,
  // submitPrizePicksEntry,
}; 