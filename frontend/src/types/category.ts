import { ServiceResponse } from "./user";

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

  export interface CreateCategoryDto {
  id: string;
  name: string;
  nameBengali?: string;
  slug: string;
  icon: string;
  color: string;
  eventCount: number;
  }


  export interface CategoryListResponse extends ServiceResponse<Category[]> {}
  export interface UpdateCategoryDto extends CreateCategoryDto {}
  
  export interface CategoryResponse extends ServiceResponse<Category> {}