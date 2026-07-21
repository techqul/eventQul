"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Filter, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EVENTS } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function AdminEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Event Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage all events on the platform
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Events</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search events..." className="pl-10 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 font-medium">Event</th>
                  <th className="text-left pb-3 font-medium">Organizer</th>
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-left pb-3 font-medium">Status</th>
                  <th className="text-center pb-3 font-medium">Tickets Sold</th>
                  <th className="text-right pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.slice(0, 10).map((event, index) => (
                  <motion.tr
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b last:border-0 hover:bg-muted/50"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-muted overflow-hidden">
                          <img
                            src={event.coverImage}
                            alt={event.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium line-clamp-1 max-w-[200px]">
                            {event.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {event.category?.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <img
                          src={event?.organizer?.logo}
                          alt={event?.organizer?.name}
                          className="h-6 w-6 rounded"
                        />
                        <span className="text-sm">{event.organizer.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-muted-foreground text-sm">
                      {formatDate(event.startDate)}
                    </td>
                    <td className="py-4">
                      <Badge
                        variant={
                          event.status === "upcoming"
                            ? "success"
                            : event.status === "ongoing"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {event.status}
                      </Badge>
                      {event.featured && (
                        <Badge variant="secondary" className="ml-2">
                          Featured
                        </Badge>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      <span className="font-medium">
                        {event.soldTickets}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /{event.capacity}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/events/${event.slug}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
