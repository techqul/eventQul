import { ServiceResponse } from "./user";

// Backend API response structure
export interface Category {
  id: string;
  name: string;
  nameBengali?: string;
  slug: string;
  icon: string;
  color: string;
  eventCount: number;
  createdAt: string;
  updatedAt: string;
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

export interface CreateCategoryDto {
  name: string;
  nameBengali?: string;
  slug: string;
  icon: string;
  color: string;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {}

export interface CategoryListResponse extends ServiceResponse<Category[]> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface CategoryResponse extends ServiceResponse<Category> {}
