import { Organizer } from "./organizer";
import { Venue } from "./venue";
import { Category } from "./category";
import { TicketType } from "./ticket";

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  coverImage: string;
  gallery: string[];
  organizer: Organizer;
  venue: Venue;
  category: Category;
  startDate: Date;
  endDate: Date;
  timezone: string;
  ticketTypes: TicketType[];
  status: "upcoming" | "ongoing" | "past" | "cancelled";
  capacity: number;
  soldTickets: number;
  featured: boolean;
  trending: boolean;
  tags: string[];
  createdAt: Date;
}

export interface EventFilter {
  search?: string;
  category?: string;
  location?: string;
  date?: "today" | "tomorrow" | "this_week" | "this_month" | "all";
  price?: "free" | "paid" | "all";
  sort?: "relevance" | "date" | "price_low" | "price_high" | "popular";
}
