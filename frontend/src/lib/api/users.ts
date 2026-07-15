import { apiClient } from '../api-client';
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  UsersListResponse,
  UserResponse,
  ServiceResponse,
} from '@/types/user';

export const usersApi = {
  /**
   * Get all users with pagination (Admin only)
   */
  async getAll(page = 1, limit = 20): Promise<UsersListResponse> {
    return apiClient.get<UsersListResponse>(`/users?page=${page}&limit=${limit}`);
  },

  /**
   * Get user by ID (Admin only)
   */
  async getById(id: string): Promise<UserResponse> {
    return apiClient.get<UserResponse>(`/users/${id}`);
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<UserResponse> {
    return apiClient.get<UserResponse>('/users/me');
  },

  /**
   * Update current user profile
   */
  async updateProfile(data: UpdateUserDto): Promise<UserResponse> {
    return apiClient.patch<UserResponse>('/users/me', data);
  },

  /**
   * Create new user (Admin only)
   */
  async create(userData: CreateUserDto): Promise<ServiceResponse<User>> {
    return apiClient.post<ServiceResponse<User>>('/users', userData);
  },

  /**
   * Update user (Admin only)
   */
  async update(id: string, data: UpdateUserDto): Promise<UserResponse> {
    return apiClient.patch<UserResponse>(`/users/${id}`, data);
  },

  /**
   * Delete user (Admin only)
   */
  async delete(id: string): Promise<ServiceResponse<void>> {
    return apiClient.delete<ServiceResponse<void>>(`/users/${id}`);
  },

  /**
   * Update user status (Admin only) - this might need a dedicated endpoint
   * For now, we can use the update method
   */
  async updateStatus(id: string, status: string): Promise<UserResponse> {
    return apiClient.patch<UserResponse>(`/users/${id}`, { status });
  },
};
