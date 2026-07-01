"use client";

import { motion } from "framer-motion";
import { Bell, Calendar, Ticket, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    title: "Event Reminder",
    message:
      "James LIVE in Dhaka 2025 is happening tomorrow! Don't forget your tickets.",
    type: "event_reminder",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "2",
    title: "Booking Confirmed",
    message:
      "Your tickets for Bangladesh Tech Summit 2025 have been confirmed. Check your email for details.",
    type: "ticket",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "3",
    title: "New Event Nearby",
    message:
      "Dhaka Python Meetup is happening this weekend. Register now to secure your spot!",
    type: "info",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
  {
    id: "4",
    title: "Event Updated",
    message:
      "The venue for Pahela Baishakh Celebration has been changed to ICCB, Bashundhara.",
    type: "warning",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
  },
];

const typeConfig: Record<
  string,
  { icon: any; color: string; bgColor: string }
> = {
  event_reminder: {
    icon: Calendar,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  ticket: {
    icon: Ticket,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  info: {
    icon: Bell,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  warning: {
    icon: Bell,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm">
              Clear all
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const config = typeConfig[notification.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`transition-all hover:shadow-md ${
                  !notification.read ? "border-primary/50" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div
                      className={`p-3 rounded-lg ${config.bgColor} flex-shrink-0`}
                    >
                      <Icon className={`h-5 w-5 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="secondary" className="ml-2">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(notification.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">
              You're all caught up! We'll notify you when there's something new.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
