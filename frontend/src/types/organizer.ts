import { ServiceResponse } from "./user";

export interface Organizer {
  id: string;
  name: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  verified: boolean;
  rating: number;
  totalEvents: number;
  followers: number;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
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

export interface OrganizerListResponse extends ServiceResponse<Organizer[]> {}
export interface OrganizerResponse extends ServiceResponse<Organizer> {}
