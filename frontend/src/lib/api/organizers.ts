import { Organizer, OrganizerListResponse, OrganizerResponse, CreateOrganizerDto, UpdateOrganizerDto } from '@/types';
import { apiClient } from '../api-client';
import type {
  ServiceResponse,
} from '@/types/user';

export const organizersApi = {

  async getAll(page = 1, limit = 20): Promise<OrganizerListResponse> {
    return apiClient.get<OrganizerListResponse>(`/organizers?page=${page}&limit=${limit}`);
  },

  async getById(id: string): Promise<OrganizerResponse> {
    return apiClient.get<OrganizerResponse>(`/organizers/${id}`);
  }, 
  
  async verifyOrganizer(id: string): Promise<OrganizerResponse> {
    return apiClient.get<OrganizerResponse>(`/organizers/${id}/verify`);
  },

  async getBySlug(slug: string): Promise<OrganizerResponse> {
    // Backend doesn't have a slug endpoint, so fetch all and filter
    const response = await apiClient.get<OrganizerListResponse>('/organizers');
    if (response.success && response.data) {
      const organizer = response.data.find((o: any) => o.slug === slug);
      if (organizer) {
        return {
          success: true,
          message: 'Organizer retrieved successfully',
          data: organizer,
        };
      }
    }
    return {
      success: false,
      message: 'Organizer not found',
      data: undefined,
    };
  },

  /**
   * Create new organizer (Admin only)
   */
  async create(dto: CreateOrganizerDto): Promise<ServiceResponse<Organizer>> {
    return apiClient.post<ServiceResponse<Organizer>>('/organizers', dto);
  },

  /**
   * Update organizer (Admin only)
   */
  async update(id: string, data: UpdateOrganizerDto): Promise<OrganizerResponse> {
    return apiClient.patch<OrganizerResponse>(`/organizers/${id}`, data);
  },

  /**
   * Delete organizer (Admin only)
   */
  async delete(id: string): Promise<ServiceResponse<void>> {
    return apiClient.delete<ServiceResponse<void>>(`/organizers/${id}`);
  },

};
