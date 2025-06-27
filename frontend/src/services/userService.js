import { API_CONFIG } from '../config/apiConfig.js';
import { wrapWithRateLimit } from './rateLimit/wrapWithRateLimit.js';
import { unifiedMonitor } from '../core/UnifiedMonitor';
// src/services/userService.ts;
/**
 * UserService: Handles user profile, preferences, and entry retrieval.
 * All methods are type-safe, production-ready, and rate-limited.
 */
export class UserService {
    constructor() {
        /**
         * Fetch all PrizePicks entries for a user.
         */
        this.fetchUserEntries = wrapWithRateLimit(async (userId) => {

            try {

                const res = await fetch(url, {
                    method: 'GET',
                    headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY }
                });
                if (!res.ok)
                    throw new Error(`Failed to fetch user entries: ${res.statusText}`);

                unifiedMonitor.endTrace(trace);
                return data;
            }
            catch (error) {
                unifiedMonitor.reportError(error, { operation: 'userService.fetchUserEntries', userId });
                if (trace)
                    unifiedMonitor.endTrace(trace);
                throw error;
            }
        });
        /**
         * Fetch the user profile for a given userId.
         */
        this.fetchUserProfile = wrapWithRateLimit(async (userId) => {

            try {

                const res = await fetch(url, {
                    method: 'GET',
                    headers: { 'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY }
                });
                if (!res.ok)
                    throw new Error(`Failed to fetch user profile: ${res.statusText}`);

                unifiedMonitor.endTrace(trace);
                return data;
            }
            catch (error) {
                unifiedMonitor.reportError(error, { operation: 'userService.fetchUserProfile', userId });
                if (trace)
                    unifiedMonitor.endTrace(trace);
                throw error;
            }
        });
        /**
         * Update user preferences for a given userId.
         */
        this.updateUserPreferences = wrapWithRateLimit(async (userId, preferences) => {

            try {

                const res = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'x-api-key': API_CONFIG.SPORTS_DATA.API_KEY,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(preferences),
                });
                if (!res.ok)
                    throw new Error(`Failed to update user preferences: ${res.statusText}`);

                unifiedMonitor.endTrace(trace);
                return data;
            }
            catch (error) {
                unifiedMonitor.reportError(error, { operation: 'userService.updateUserPreferences', userId });
                if (trace)
                    unifiedMonitor.endTrace(trace);
                throw error;
            }
        });
    }
}
export const userService = new UserService();
