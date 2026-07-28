import { Metadata } from "next";
import { notFound } from "next/navigation";
import { eventsApi } from '@/lib/api/events';
import { EventDetailContent } from "@/components/events/EventDetailContent";
import { generateEventStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data";
import { Event } from '@/types';
import { getGoogleDriveImageUrl } from '@/lib/utils/image';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Transform API event data and convert image URLs
function transformEventImages(event: Event): Event {
  return {
    ...event,
    coverImage: getGoogleDriveImageUrl(event.coverImage),
    gallery: event.gallery.map(getGoogleDriveImageUrl),
  };
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response = await eventsApi.getBySlug(slug);

    if (!response.success || !response.data) {
      return {
        title: "Event Not Found",
      };
    }

    const event = response.data;
    const lowestPrice = Math.min(...event.ticketTypes.map((t) => parseFloat(t.price)));
    const coverImage = getGoogleDriveImageUrl(event.coverImage);

    return {
      title: `${event.title} | EventQul`,
      description: event.description,
      keywords: [
        event.title,
        event.category.name,
        event.venue.city,
        "events",
        "tickets",
        "Bangladesh",
      ],
      openGraph: {
        title: event.title,
        description: event.description,
        images: [
          {
            url: coverImage,
            width: 1200,
            height: 630,
            alt: event.title,
          },
        ],
        type: "website",
        locale: "en_BD",
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description: event.description,
        images: [coverImage],
      },
      other: {
        "event:start_date": event.startDate,
        "event:end_date": event.endDate,
        "event:location": `${event.venue.name}, ${event.venue.city}`,
        "event:price": lowestPrice.toString(),
        "event:availability": event.soldTickets < event.capacity ? "available" : "sold_out",
      },
    };
  } catch (err) {
    return {
      title: "Event Not Found",
    };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch event by slug from API
  let event: Event | null = null;

  try {
    const response = await eventsApi.getBySlug(slug);
    if (response.success && response.data) {
      event = response.data;
    }
  } catch (err) {
    console.error('Error fetching event:', err);
  }

  if (!event) {
    notFound();
  }

      console.log('events details', event);

  // Transform image URLs
  const transformedEvent = transformEventImages(event);

  // TODO: Fetch related events from API when endpoint is available
  const relatedEvents: Event[] = [];

  const structuredData = generateEventStructuredData(transformedEvent);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://eventqul.com" },
    { name: "Events", url: "https://eventqul.com/events" },
    { name: transformedEvent.title, url: `https://eventqul.com/events/${transformedEvent.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <EventDetailContent
        event={transformedEvent}
        relatedEvents={relatedEvents}
      />
    </>
  );
}
