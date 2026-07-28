import CategoryCardClient from "./CategoryCardClient";
import { categoriesApi } from '@/lib/api/categories';
import { Category } from '@/types';

export default async function CategoriesPage() {
  // Fetch categories on the server
  let categories: Category[] = [];
  let error: string | null = null;

  try {
    const response = await categoriesApi.getAll();
    if (response.success && response.data) {
      categories = response.data;
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
