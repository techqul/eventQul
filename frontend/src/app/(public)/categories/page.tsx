import CategoryCardClient from "./CategoryCardClient";
import { categoriesApi } from '@/lib/api/categories';
import { Category } from '@/types';

// Icon mapping from backend (lowercase) to frontend (PascalCase)
const iconMapping: Record<string, string> = {
  music: 'Music',
  laptop: 'Laptop',
  briefcase: 'Briefcase',
  trophy: 'Trophy',
  palette: 'Palette',
  utensils: 'Utensils',
  rocket: 'Rocket',
  'graduation-cap': 'GraduationCap',
  monitor: 'Laptop',
  'calendar-range': 'Briefcase',
  group: 'Trophy',
  // Fallback for unknown icons
};

// Convert hex color to Tailwind gradient class
const colorMapping: Record<string, string> = {
  '#FF6B6B': 'from-pink-500 to-rose-500',
  '#FF6B2C': 'from-orange-500 to-red-500',
  '#FF6B5C': 'from-red-500 to-pink-500',
  '#E26B2C': 'from-orange-500 to-amber-500',
  '#FD6B2A': 'from-rose-500 to-orange-500',
  // Fallback gradient
  default: 'from-blue-500 to-cyan-500',
};

// Transform API data to match frontend Category type
function transformCategory(apiCategory: any): Category {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    nameBengali: apiCategory.nameBengali,
    slug: apiCategory.slug,
    icon: iconMapping[apiCategory.icon] || 'Trophy',
    color: colorMapping[apiCategory.color] || colorMapping.default,
    eventCount: apiCategory.eventCount || 0,
  };
}

export default async function CategoriesPage() {
  // Fetch categories on the server
  let categories: Category[] = [];
  let error: string | null = null;

  try {
    const response = await categoriesApi.getAll();
    if (response.success && response.data) {
      // Transform API data to match frontend Category type
      categories = response.data.map(transformCategory);
    } else {
      error = response.message || 'Failed to load categories';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred while fetching categories';
    console.error('Error fetching categories:', err);
  }

  return (
    <section className="py-20 bg-background/50">
      <CategoryCardClient categories={categories} error={error} />
    </section>
  );
}

// SEO metadata
export const metadata = {
  title: 'Browse by Category - EventQul',
  description: 'Find events that match your interests. Browse concerts, tech conferences, corporate events, sports, arts, food festivals, and more.',
  keywords: 'events, categories, concerts, conferences, sports, Bangladesh',
};
