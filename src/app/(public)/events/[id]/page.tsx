import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEventBySlug, getRelatedEvents } from "@/lib/mock-data";
import { EventDetailContent } from "@/components/events/EventDetailContent";
import { generateEventStructuredData, generateBreadcrumbStructuredData } from "@/lib/structured-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { id } = await params;
  const event = getEventBySlug(id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));

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
          url: event.coverImage,
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
      images: [event.coverImage],
    },
    other: {
      "event:start_date": new Date(event.startDate).toISOString(),
      "event:end_date": event.endDate ? new Date(event.endDate).toISOString() : "",
      "event:location": `${event.venue.name}, ${event.venue.city}`,
      "event:price": lowestPrice.toString(),
      "event:availability": event.soldTickets < event.capacity ? "available" : "sold_out",
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;
  const event = getEventBySlug(id);
  const relatedEvents = event ? getRelatedEvents(event.id) : [];

  if (!event) {
    notFound();
  }

  const structuredData = generateEventStructuredData(event);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://eventqul.com" },
    { name: "Events", url: "https://eventqul.com/events" },
    { name: event.title, url: `https://eventqul.com/events/${event.slug}` },
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
        event={event}
        relatedEvents={relatedEvents}
      />
    </>
  );
}
