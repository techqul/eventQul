import { Category, CategoryListResponse, CategoryResponse, CreateCategoryDto, UpdateCategoryDto } from '@/types';
import { apiClient } from '../api-client';
import type {
  ServiceResponse,
} from '@/types/user';

export const categoriesApi = {

  async getAll(page = 1, limit = 20): Promise<CategoryListResponse> {
    return apiClient.get<CategoryListResponse>(`/categories?page=${page}&limit=${limit}`);
  },

  async getById(id: string): Promise<CategoryResponse> {
    return apiClient.get<CategoryResponse>(`/categories/${id}`);
  },

  /**
   * Create new category (Admin only)
   */
  async create(dto: CreateCategoryDto): Promise<ServiceResponse<Category>> {
    return apiClient.post<ServiceResponse<Category>>('/categories', dto);
  },

  /**
   * Update user (Admin only)
   */
  async update(id: string, data: UpdateCategoryDto): Promise<CategoryResponse> {
    return apiClient.patch<CategoryResponse>(`/categories/${id}`, data);
  },

  /**
   * Delete user (Admin only)
   */
  async delete(id: string): Promise<ServiceResponse<void>> {
    return apiClient.delete<ServiceResponse<void>>(`/categories/${id}`);
  },

};
