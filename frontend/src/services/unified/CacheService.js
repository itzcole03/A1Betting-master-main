import { apiClient } from '../api/client';
export class CacheService {
    static async get(key) {
        try {

            return response.data?.value ?? null;
        }
        catch (error) {
            // console statement removed
            return null;
        }
    }
    static async set(key, value) {
        try {
            await apiClient.post('/cache/set', { key, value });
            return true;
        }
        catch (error) {
            // console statement removed
            return false;
        }
    }
}
export default CacheService;
