import { ServiceResponse } from "./user";

// Backend API response structure
export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  time: string;
  coverImage: string;
  gallery: string[];
  organizer: EventOrganizer;
  venue: EventVenue;
  category: EventCategory;
  startDate: string;
  endDate: string;
  timezone: string;
  ticketTypes: EventTicketType[];
  status: "upcoming" | "ongoing" | "past" | "cancelled";
  capacity: number;
  soldTickets: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  organizerId: string;
  venueId: string;
  categoryId: string;
}

export interface EventOrganizer {
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
}

export interface EventVenue {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  area: string;
  capacity: number;
  mapImage: string;
  facilities: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EventCategory {
  id: string;
  slug: string;
  name: string;
  nameBengali?: string;
  icon: string;
  color: string;
  eventCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventTicketType {
  id: string;
  eventId: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  available: number;
  maxPerPurchase: number;
  benefits: string[];
  createdAt: string;
  updatedAt: string;
}

export interface EventFilter {
  search?: string;
  category?: string;
  location?: string;
  date?: "today" | "tomorrow" | "this_week" | "this_month" | "all";
  price?: "free" | "paid" | "all";
  sort?: "relevance" | "date" | "price_low" | "price_high" | "popular";
}

export interface CreateEventDto {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  coverImage: string;
  gallery: string[];
  organizerId: string;
  venueId: string;
  categoryId: string;
  startDate: string;
  endDate: string;
  timezone: string;
  capacity: number;
  ticketTypes: any[];
  tags: string[];
}

export interface UpdateEventDto extends Partial<CreateEventDto> {}

export interface EventListResponse extends ServiceResponse<Event[]> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface EventResponse extends ServiceResponse<Event> {}
