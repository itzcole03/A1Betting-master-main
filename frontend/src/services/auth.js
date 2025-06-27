import apiService from './api';
class AuthService {
    constructor() {
        this.currentUser = null;
        // Initialize from localStorage if available;

        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
        }
    }
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    async login(email, password) {
        try {

            const { token } = response.data;
            // Store token;
            localStorage.setItem('auth_token', token);
            // Get user profile;

            this.currentUser = userProfile.data;
            // Store user in localStorage;
            localStorage.setItem('current_user', JSON.stringify(this.currentUser));
            return this.currentUser;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    async register(userData) {
        try {

            const { token } = response.data;
            // Store token;
            localStorage.setItem('auth_token', token);
            // Get user profile;

            this.currentUser = userProfile.data;
            // Store user in localStorage;
            localStorage.setItem('current_user', JSON.stringify(this.currentUser));
            return this.currentUser;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('current_user');
        this.currentUser = null;
        window.location.href = '/login';
    }
    getCurrentUser() {
        return this.currentUser;
    }
    isAuthenticated() {
        return !!localStorage.getItem('auth_token');
    }
    async updateProfile(profileData) {
        try {

            this.currentUser = response.data;
            localStorage.setItem('current_user', JSON.stringify(this.currentUser));
            return this.currentUser;
        }
        catch (error) {
            // console statement removed
            throw error;
        }
    }
}
export const authService = AuthService.getInstance();
export default authService;
