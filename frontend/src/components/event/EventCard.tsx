"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, Users, Ticket as TicketIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Event } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatPrice, formatRelativeTime, formatDateTime } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured" | "compact";
  showOrganizer?: boolean;
  className?: string;
}

export function EventCard({
  event,
  variant = "default",
  showOrganizer = true,
  className,
}: EventCardProps) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => t.price));
  const isSoldOut = event.soldTickets >= event.capacity;
  const isTrending = event.trending;
  const isFeatured = event.featured;

  if (variant === "compact") {
    return (
      <Link href={`/events/${event.slug}`} className="block">
        <Card
          className={cn(
            "overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer",
            "border-border/50 hover:border-primary/50",
            className
          )}
        >
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={event.coverImage}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {isFeatured && (
                  <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-primary to-purple-600">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatRelativeTime(event.startDate)}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{event.venue.city}</span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="font-bold text-primary">
                    {formatPrice(lowestPrice)}
                  </p>
                </div>
                {isSoldOut && (
                  <Badge variant="destructive" className="ml-auto">
                    Sold Out
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/events/${event.slug}`} className="block">
        <Card
          className={cn(
            "overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer",
            "border-border/50 hover:border-primary/50",
            variant === "featured" && "md:col-span-2",
            className
          )}
        >
          <div className="relative h-48 md:h-64 overflow-hidden">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
              {isFeatured && (
                <Badge className="bg-gradient-to-r from-primary to-purple-600">
                  Featured
                </Badge>
              )}
              {isTrending && (
                <Badge variant="secondary" className="bg-amber-500">
                  🔥 Trending
                </Badge>
              )}
              {isSoldOut && (
                <Badge variant="destructive">Sold Out</Badge>
              )}
            </div>

            {/* Date Badge */}
            <div className="absolute top-3 right-3 glass-strong rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">
                {new Date(event.startDate).toLocaleDateString("en", {
                  month: "short",
                })}
              </p>
              <p className="text-2xl font-bold">
                {new Date(event.startDate).getDate()}
              </p>
            </div>

            {/* Category Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="secondary"
                className={cn(
                  "bg-background/80 backdrop-blur",
                  event.category.color && `bg-gradient-to-r ${event.category.color} text-white`
                )}
              >
                {event.category.name}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4 space-y-3">
            <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDateTime(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="line-clamp-1">
                  {event.venue.name}, {event.venue.city}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>
                  {event.soldTickets}/{event.capacity} attending
                </span>
              </div>
            </div>

            {showOrganizer && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={event.organizer.logo} />
                  <AvatarFallback>
                    {event.organizer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  {event.organizer.name}
                </span>
                {event.organizer.verified && (
                  <Badge variant="outline" className="text-xs">
                    ✓ Verified
                  </Badge>
                )}
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Starting from</p>
              <p className="text-xl font-bold text-primary">
                {formatPrice(lowestPrice)}
              </p>
            </div>
            <div
              className={cn(
                "flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all",
                isSoldOut && "text-muted-foreground"
              )}
            >
              {isSoldOut ? (
                "Sold Out"
              ) : (
                <>
                  Get Tickets
                  <TicketIcon className="h-4 w-4" />
                </>
              )}
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
