import { eventsApi } from '@/lib/api/events';
import { categoriesApi } from '@/lib/api/categories';
import { EventsPageContent } from "@/components/events/EventsPageContent";
import { Event, Category } from '@/types';

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const params = await searchParams;

  // Build filters from search params
  const filters: Record<string, string> = {};
  if (params.category) filters.category = params.category;
  if (params.location) filters.location = params.location;
  if (params.date) filters.date = params.date;
  if (params.price) filters.price = params.price;
  if (params.sort) filters.sort = params.sort;
  if (params.search) filters.search = params.search;

  // Fetch events from API
  let events: Event[] = [];
  let totalEvents = 0;
  let error: string | null = null;

  // Fetch categories for filters
  let categories: Category[] = [];

  try {
    const [eventsResponse, categoriesResponse] = await Promise.all([
      eventsApi.getAll(1, 20, filters),
      categoriesApi.getAll(1, 100),
    ]);

    if (eventsResponse.success && eventsResponse.data) {
      events = eventsResponse.data;
      totalEvents = eventsResponse.meta?.total || events.length;
    } else {
      error = eventsResponse.message || 'Failed to load events';
    }

    if (categoriesResponse.success && categoriesResponse.data) {
      categories = categoriesResponse.data;
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred while fetching events';
    console.error('Error fetching events:', err);
  }

  return (
    <EventsPageContent
      initialEvents={events}
      totalEvents={totalEvents}
      categories={categories}
      error={error}
    />
  );
}

// SEO metadata
export const metadata = {
  title: 'Events - EventQul',
  description: 'Discover and book tickets to the best events in Bangladesh. Concerts, conferences, sports, and more.',
  keywords: 'events, tickets, concerts, conferences, sports, Bangladesh',
};
