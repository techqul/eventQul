import { HomePageContent } from "@/components/home/HomePageContent";
import { HomePageLoading } from "@/components/home/HomePageLoading";
import { categoriesApi } from "@/lib/api/categories";
import { eventsApi } from "@/lib/api/events";
import { organizersApi } from "@/lib/api/organizers";
import type { EventListResponse } from "@/types";


async function getHomeData() {
  try {
    // Fetch all data in parallel
    const [categoriesRes, featuredRes, trendingRes, upcomingRes, organizersRes] = await Promise.all([
      categoriesApi.getAll(1, 20),
      eventsApi.getFeatured(),
      eventsApi.getTrending(),
      eventsApi.getAll(1, 8, { status: 'upcoming' }),
      organizersApi.getAll(1, 12),
    ]);

    // Get past events separately (might fail if status filter not supported)
    let pastRes: EventListResponse = { success: false, message: 'Failed to fetch past events', data: [] };
    try {
      pastRes = await eventsApi.getAll(1, 8, { status: 'past' });
    } catch (e) {
      console.error('Past events error:', e);
    }

    return {
      categories: categoriesRes.data ?? [],
      featuredEvents: featuredRes.data ?? [],
      trendingEvents: trendingRes.data ?? [],
      upcomingEvents: upcomingRes.data ?? [],
      pastEvents: pastRes.data ?? [],
      organizers: organizersRes.data ?? [],
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      categories: [],
      featuredEvents: [],
      trendingEvents: [],
      upcomingEvents: [],
      pastEvents: [],
      organizers: [],
    };
  }
}

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <HomePageContent
      categories={data.categories}
      featuredEvents={data.featuredEvents}
      trendingEvents={data.trendingEvents}
      upcomingEvents={data.upcomingEvents}
      pastEvents={data.pastEvents}
      organizers={data.organizers}
    />
  );
}

export const dynamic = 'force-dynamic';
