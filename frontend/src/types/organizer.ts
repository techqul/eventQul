import { ServiceResponse } from "./user";

// Backend API response structure
export interface Organizer {
  id: string;
  userId: string;
  slug: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  isVerified: boolean;
  rating: string;
  totalEvents: number;
  followers: number;
  commissionRate: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface CreateOrganizerDto {
  name: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface UpdateOrganizerDto extends Partial<CreateOrganizerDto> {}

export interface OrganizerListResponse extends ServiceResponse<Organizer[]> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface OrganizerResponse extends ServiceResponse<Organizer> {}
