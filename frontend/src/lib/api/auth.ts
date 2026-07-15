import { apiClient } from '../api-client';
import type { LoginCredentials, AuthResponse, UserResponse, User } from '@/types/user';

export const authApi = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', userData);
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<UserResponse> {
    return apiClient.get<UserResponse>('/auth/me');
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ data: { accessToken: string; refreshToken: string; expiresIn: string } }> {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  /**
   * Logout user
   */
  async logout(refreshToken: string): Promise<{ success: boolean; message: string }> {
    return apiClient.post('/auth/logout', { refreshToken });
  },
};
