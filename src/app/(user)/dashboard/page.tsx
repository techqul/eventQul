"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  Ticket,
  Wallet,
  Bell,
  ArrowRight,
  Clock,
  MapPin,
  QrCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TICKETS } from "@/lib/mock-data";
import { formatDateTime, formatPrice } from "@/lib/utils";

export default function UserDashboardPage() {
  const upcomingTickets = TICKETS.filter(
    (t) => new Date(t.eventDate) > new Date()
  );

  const stats = [
    {
      title: "Events Attended",
      value: "12",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Spent",
      value: formatPrice(45000),
      icon: Wallet,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Active Tickets",
      value: upcomingTickets.length.toString(),
      icon: Ticket,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome back, Ahmed!</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your tickets
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Upcoming Tickets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Upcoming Events</h2>
          <Button variant="ghost" asChild>
            <Link href="/dashboard/tickets">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {upcomingTickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden">
              <div className="flex">
                <div className="relative h-32 w-32 flex-shrink-0">
                  <Image
                    src={ticket.eventCoverImage}
                    alt={ticket.eventName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="success" className="text-xs">
                      {ticket.status}
                    </Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-1">
                    {ticket.eventName}
                  </h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDateTime(ticket.eventDate)}</span>
                    </div>
                    <p className="line-clamp-1">{ticket.ticketType}</p>
                    <p className="font-medium">
                      {ticket.quantity} ticket{ticket.quantity > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {upcomingTickets.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Ticket className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-4">
                Browse events and find your next experience
              </p>
              <Button asChild>
                <Link href="/events">Browse Events</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Browse Events</h3>
              <p className="text-sm text-muted-foreground">
                Discover upcoming events
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Ticket className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">My Tickets</h3>
              <p className="text-sm text-muted-foreground">
                View all your tickets
              </p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <Bell className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with alerts
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
