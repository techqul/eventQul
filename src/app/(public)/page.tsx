import { Suspense } from "react";
import {
  getFeaturedEvents,
  getTrendingEvents,
  getUpcomingEvents,
} from "@/lib/mock-data";
import { CATEGORIES } from "@/lib/constants";
import { HomePageContent } from "@/components/home/HomePageContent";
import { HomePageLoading } from "@/components/home/HomePageLoading";

export default function HomePage() {
  const featuredEvents = getFeaturedEvents();
  const trendingEvents = getTrendingEvents();
  const upcomingEvents = getUpcomingEvents().slice(0, 8);

  return (
    <Suspense fallback={<HomePageLoading />}>
      <HomePageContent
        featuredEvents={featuredEvents}
        trendingEvents={trendingEvents}
        upcomingEvents={upcomingEvents}
        categories={CATEGORIES}
      />
    </Suspense>
  );
}
