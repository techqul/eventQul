"use client";

import { Event } from "@/types";
import { EventCard } from "./EventCard";

interface EventGridProps {
  events: Event[];
  variant?: "default" | "featured" | "compact";
  showOrganizer?: boolean;
  className?: string;
}

export function EventGrid({
  events,
  variant = "default",
  showOrganizer = true,
  className,
}: EventGridProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events found</p>
      </div>
    );
  }

  return (
    <div
      className={
        variant === "compact"
          ? "space-y-3"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
      }
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          variant={variant}
          showOrganizer={showOrganizer}
          className={className}
        />
      ))}
    </div>
  );
}
