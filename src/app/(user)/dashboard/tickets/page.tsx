"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TICKETS } from "@/lib/mock-data";
import { formatDateTime, formatPrice } from "@/lib/utils";

export default function UserTicketsPage() {
  const upcomingTickets = TICKETS.filter(
    (t) => new Date(t.eventDate) > new Date()
  );
  const pastTickets = TICKETS.filter(
    (t) => new Date(t.eventDate) <= new Date()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">My Tickets</h1>
        <p className="text-muted-foreground">
          Manage all your event tickets in one place
        </p>
      </motion.div>

      <Tabs defaultValue="upcoming">
        <TabsList className="mb-6">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingTickets.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({pastTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative h-40 w-40 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={ticket.eventCoverImage}
                        alt={ticket.eventName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Badge
                            variant={
                              ticket.status === "confirmed"
                                ? "success"
                                : "secondary"
                            }
                            className="mb-2"
                          >
                            {ticket.status}
                          </Badge>
                          <h3 className="text-xl font-bold">
                            {ticket.eventName}
                          </h3>
                        </div>
                        <Button variant="outline" size="icon">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDateTime(ticket.eventDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>Dhaka, Bangladesh</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Ticket Type
                          </p>
                          <p className="font-medium">{ticket.ticketType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Quantity</p>
                          <p className="font-medium">{ticket.quantity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total</p>
                          <p className="font-medium text-primary">
                            {formatPrice(ticket.totalPrice)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Order ID
                          </p>
                          <p className="font-medium text-xs">{ticket.orderId}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4">
                        <Button variant="gradient" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          View Ticket
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {upcomingTickets.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-semibold mb-2">No upcoming tickets</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any upcoming events. Start exploring!
                </p>
                <Button>Browse Events</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="opacity-75">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="relative h-32 w-32 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={ticket.eventCoverImage}
                        alt={ticket.eventName}
                        fill
                        className="object-cover grayscale"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{ticket.status}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(ticket.totalPrice)}
                        </p>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">
                        {ticket.eventName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {formatDateTime(ticket.eventDate)}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ticket.quantity} × {ticket.ticketType}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {pastTickets.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <h3 className="font-semibold mb-2">No past tickets</h3>
                <p className="text-muted-foreground">
                  Your attended events will appear here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
