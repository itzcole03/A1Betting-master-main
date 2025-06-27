import { api } from './api';
class AdminService {
    async getUsers() {

        return response.data;
    }
    async updateUserStatus(userId, status) {
        await api.patch(`/admin/users/${userId}/status`, { status });
    }
    async getLogs() {

        return response.data;
    }
    async getMetrics() {

        return response.data;
    }
    async updateSystemSettings(settings) {
        await api.post('/admin/settings', settings);
    }
    async refreshCache() {
        await api.post('/admin/cache/refresh');
    }
    async backupDatabase() {
        await api.post('/admin/database/backup');
    }
}
export const adminService = new AdminService();
