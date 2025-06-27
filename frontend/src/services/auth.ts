import apiService from './api.ts';
import { User } from '@/types.ts';

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {
    // Initialize from localStorage if available;

    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(email: string, password: string): Promise<User> {
    try {

      const { token } = response.data;

      // Store token;
      localStorage.setItem('auth_token', token);

      // Get user profile;

      this.currentUser = userProfile.data;

      // Store user in localStorage;
      localStorage.setItem('current_user', JSON.stringify(this.currentUser));

      return this.currentUser;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  async register(userData: { email: string; password: string; name: string }): Promise<User> {
    try {

      const { token } = response.data;

      // Store token;
      localStorage.setItem('auth_token', token);

      // Get user profile;

      this.currentUser = userProfile.data;

      // Store user in localStorage;
      localStorage.setItem('current_user', JSON.stringify(this.currentUser));

      return this.currentUser;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    this.currentUser = null;
    window.location.href = '/login';
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    try {

      this.currentUser = response.data;
      localStorage.setItem('current_user', JSON.stringify(this.currentUser));
      return this.currentUser;
    } catch (error) {
      // console statement removed
      throw error;
    }
  }
}

export const authService = AuthService.getInstance();
export default authService;
