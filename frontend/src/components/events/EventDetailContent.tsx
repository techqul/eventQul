"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  Check,
  Facebook,
  Twitter,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatPrice, formatDateTime, formatDate, formatTime } from "@/lib/utils";
import { EventGrid } from "@/components/event/EventGrid";
import { Event } from "@/types";
import { cn } from "@/lib/utils";
import { getGoogleDriveImageUrl } from "@/lib/utils/image";

interface EventDetailContentProps {
  event: Event;
  relatedEvents: Event[];
}

export function EventDetailContent({
  event,
  relatedEvents,
}: EventDetailContentProps) {
  const lowestPrice = Math.min(...event.ticketTypes.map((t) => parseFloat(t.price)));
  const isSoldOut = event.soldTickets >= event.capacity;

  return (
    <div className="flex flex-col">
      {/* Cover Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={event.coverImage}
          alt={event.title}
          fill
          className="object-fit cener"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button variant="glass" size="icon" asChild>
            <Link href="/events">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="glass" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button variant="glass" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <Badge className="mb-4">{event.category.name}</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>9.00AM - 9.00PM</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>
                
                  {event.venue.name}, {event.venue.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Event */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">About this event</h2>
              <p className="text-muted-foreground leading-relaxed">
                {event.longDescription}
              </p>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">
                        {formatDateTime(event.startDate)}
                      </p>
                      {event.endDate &&
                        new Date(event.endDate) > new Date(event.startDate) && (
                          <p className="text-muted-foreground">
                            to {formatDateTime(event.endDate)}
                          </p>
                        )}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{event.venue.name}</p>
                      <p className="text-muted-foreground">{event.venue.address}</p>
                      <p className="text-muted-foreground">
                        {event.venue.city}, {event.venue.area}
                      </p>
                      <Button variant="link" className="p-0 h-auto mt-2">
                        View on map
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-muted-foreground">
                        {event.capacity} attendees
                      </p>
                      <p className="text-muted-foreground">
                        {event.soldTickets} tickets sold
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Venue Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Venue Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Interactive map coming soon
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Organizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={getGoogleDriveImageUrl(event.organizer.logo)}/>
                      <AvatarFallback>
                        {event.organizer.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">
                          {event.organizer.name}
                        </h3>
                        {event.organizer.isVerified && (
                          <Badge variant="outline" className="text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {event.organizer.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <span>⭐ {event.organizer.rating} rating</span>
                        <span>🎪 {event.organizer.totalEvents} events</span>
                        <span>👥 {event.organizer.followers.toLocaleString()} followers</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/organizers/${event.organizer.slug}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          Follow
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">FAQ</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the refund policy?</AccordionTrigger>
                  <AccordionContent>
                    Tickets can be refunded up to 48 hours before the event.
                    Contact our support team for assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Are tickets transferable?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, tickets can be transferred to another person up to 24
                    hours before the event through your dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    What payment methods are accepted?
                  </AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards, mobile banking (bKash,
                    Nagad, Rocket), and online payments.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">Related Events</h2>
                <EventGrid events={relatedEvents} variant="compact" />
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Ticket Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-baseline justify-between">
                      <CardTitle>Tickets</CardTitle>
                      <span className="text-sm text-muted-foreground">
                        From {formatPrice(lowestPrice)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {event.ticketTypes.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold">{ticket.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {ticket.description}
                            </p>
                          </div>
                          <p className="font-bold text-primary">
                            {formatPrice(Number(ticket.price))}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>{ticket.available} available</span>
                          <span>Max {ticket.maxPerPurchase} per person</span>
                        </div>
                        <Button
                          className="w-full"
                          disabled={ticket.available === 0 || isSoldOut}
                          asChild={
                            ticket.available > 0 && !isSoldOut
                              ? undefined
                              : undefined
                          }
                        >
                          {ticket.available === 0 || isSoldOut ? (
                            <span>Sold Out</span>
                          ) : (
                            <Link
                              href={`/checkout?event=${event.id}&ticket=${ticket.id}`}
                            >
                              Get Tickets
                            </Link>
                          )}
                        </Button>
                      </div>
                    ))}

                    {isSoldOut && (
                      <Badge variant="destructive" className="w-full justify-center py-2">
                        Event Sold Out
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Share Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Share this event</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Venue Facilities */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Venue Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {event.venue.facilities.map((facility) => (
                        <div
                          key={facility}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Check className="h-4 w-4 text-primary" />
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
