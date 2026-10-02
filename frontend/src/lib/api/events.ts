import { Event, EventListResponse, EventResponse, CreateEventDto, UpdateEventDto } from '@/types';
import { apiClient } from '../api-client';
import type {
  ServiceResponse,
} from '@/types/user';

export const eventsApi = {

  async getAll(page = 1, limit = 20, filters?: Record<string, string>): Promise<EventListResponse> {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...filters,
    });
    return apiClient.get<EventListResponse>(`/events?${queryParams.toString()}`);
  },

  async getById(id: string): Promise<EventResponse> {
    return apiClient.get<EventResponse>(`/events/${id}`);
  },

  async getBySlug(slug: string): Promise<EventResponse> {
    // Backend doesn't have a slug endpoint, so fetch all and filter
    const response = await apiClient.get<EventListResponse>('/events?limit=100');
    if (response.success && response.data) {
      const event = response.data.find((e: any) => e.slug === slug);
      if (event) {
        return {
          success: true,
          message: 'Event retrieved successfully',
          data: event,
        };
      }
    }
    return {
      success: false,
      message: 'Event not found',
      data: undefined,
    };
  },

  async getFeatured(): Promise<EventListResponse> {
    return apiClient.get<EventListResponse>('/events?featured=true');
  },

  async getTrending(): Promise<EventListResponse> {
    return apiClient.get<EventListResponse>('/events?trending=true');
  },

  async getByCategory(categoryId: string): Promise<EventListResponse> {
    return apiClient.get<EventListResponse>(`/events?categoryId=${categoryId}`);
  },

  async getByOrganizer(organizerId: string): Promise<EventListResponse> {
    return apiClient.get<EventListResponse>(`/events?organizerId=${organizerId}`);
  },

  async getByVenue(venueId: string): Promise<EventListResponse> {
    return apiClient.get<EventListResponse>(`/events?venueId=${venueId}`);
  },

  /**
   * Create new event (Organizer only)
   */
  async create(dto: CreateEventDto): Promise<ServiceResponse<Event>> {
    return apiClient.post<ServiceResponse<Event>>('/events', dto);
  },

  /**
   * Update event (Organizer only)
   */
  async update(id: string, data: UpdateEventDto): Promise<EventResponse> {
    return apiClient.patch<EventResponse>(`/events/${id}`, data);
  },

  /**
   * Delete event (Organizer only)
   */
  async delete(id: string): Promise<ServiceResponse<void>> {
    return apiClient.delete<ServiceResponse<void>>(`/events/${id}`);
  },

};
