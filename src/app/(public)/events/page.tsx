import { EVENTS } from "@/lib/mock-data";
import { EventsPageContent } from "@/components/events/EventsPageContent";

export default function EventsPage() {
  // Server component passes initial data to client component
  return (
    <EventsPageContent
      initialEvents={EVENTS}
      totalEvents={EVENTS.length}
    />
  );
}
