import OrganizersClient from "./OrganizersClient";
import { organizersApi } from '@/lib/api/organizers';
import { Organizer } from '@/types';

export default async function OrganizersPage() {
  // Fetch organizers on the server
  let organizers: Organizer[] = [];
  let error: string | null = null;
  let totalEvents = 0;

  try {
    const response = await organizersApi.getAll();
    if (response.success && response.data) {
      organizers = response.data;
      totalEvents = organizers.reduce((sum, o) => sum + (o.totalEvents || 0), 0);
    } else {
      error = response.message || 'Failed to load organizers';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred while fetching organizers';
    console.error('Error fetching organizers:', err);
  }

  return (
    <OrganizersClient
      organizers={organizers}
      totalOrganizers={organizers.length}
      totalEvents={totalEvents}
      error={error}
    />
  );
}

// SEO metadata
export const metadata = {
  title: 'Event Organizers - EventQul',
  description: 'Discover trusted event organizers who bring amazing events to life in Bangladesh',
  keywords: 'event organizers, event planners, event management, Bangladesh',
};
