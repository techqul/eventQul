import OrganizersClient from "./OrganizersClient";
import { organizersApi } from '@/lib/api/organizers';
import { Organizer } from '@/types';

// Transform API data to match frontend Organizer type
function transformOrganizer(apiOrganizer: any): Organizer {
  // Convert Google Drive file URLs to direct image URLs
  const convertGoogleDriveUrl = (url: string): string => {
    if (!url) return '';

    // Pattern: https://drive.google.com/file/d/[FILE_ID]/view?usp=drive_link
    const googleDriveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (googleDriveMatch) {
      const fileId = googleDriveMatch[1];
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }

    return url;
  };

  return {
    id: apiOrganizer.id,
    name: apiOrganizer.name,
    slug: apiOrganizer.slug,
    logo: convertGoogleDriveUrl(apiOrganizer.logo),
    banner: convertGoogleDriveUrl(apiOrganizer.banner),
    description: apiOrganizer.description || '',
    verified: apiOrganizer.isVerified || false,
    rating: parseFloat(apiOrganizer.rating) || 0,
    totalEvents: apiOrganizer.totalEvents || 0,
    followers: apiOrganizer.followers || 0,
    socialLinks: apiOrganizer.socialLinks || {
      facebook: '',
      instagram: '',
      twitter: '',
      website: '',
    },
  };
}

export default async function OrganizersPage() {
  // Fetch organizers on the server
  let organizers: Organizer[] = [];
  let error: string | null = null;
  let totalEvents = 0;

  try {
    const response = await organizersApi.getAll();
    if (response.success && response.data) {
      // Transform API data to match frontend Organizer type
      organizers = response.data.map(transformOrganizer);
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
