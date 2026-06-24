import type { MetadataRoute } from 'next';
import { EVENTS } from '@/lib/mock-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eventqul.com';

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/organizers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Dynamic event routes
  const eventRoutes = EVENTS.map((event) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.createdAt),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [...routes, ...eventRoutes];
}
