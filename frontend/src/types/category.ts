export interface Category {
  id: string;
  name: string;
  nameBengali?: string;
  slug: string;
  icon: string;
  color: string;
  eventCount: number;
}

export type CategorySlug =
  | "concerts"
  | "tech-conferences"
  | "corporate-events"
  | "sports"
  | "arts-culture"
  | "food-festival"
  | "startup-networking"
  | "workshops";

