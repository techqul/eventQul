"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Mail,
  Calendar,
  MapPin,
  Ticket,
  QrCode,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDateTime, formatPrice } from "@/lib/utils";

// Mock ticket data
const mockTicket = {
  orderId: "EQ-2025-001234",
  eventName: "James LIVE in Dhaka 2025",
  eventDate: new Date("2025-03-15T19:00:00"),
  venue: "International Convention City Bashundhara",
  venueAddress: "Plot No. EW(P) 04, Street 02, Civil Aviation, Bashundhara R/A",
  city: "Dhaka",
  ticketType: "VIP Pass",
  quantity: 2,
  totalPrice: 10000,
  attendee: {
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
  },
  coverImage: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Your tickets have been booked successfully
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Order ID: {mockTicket.orderId}
          </p>
        </motion.div>

        {/* Ticket Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Event Cover */}
              <div className="relative h-48">
                <Image
                  src={mockTicket.coverImage}
                  alt={mockTicket.eventName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/30" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2">Confirmed</Badge>
                  <h2 className="text-2xl font-bold text-white">
                    {mockTicket.eventName}
                  </h2>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">
                        {formatDateTime(mockTicket.eventDate)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{mockTicket.venue}</p>
                      <p className="text-sm text-muted-foreground">
                        {mockTicket.city}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Ticket Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ticket Type</span>
                    <span className="font-medium">{mockTicket.ticketType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quantity</span>
                    <span className="font-medium">{mockTicket.quantity} tickets</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Paid</span>
                    <span className="font-bold text-primary">
                      {formatPrice(mockTicket.totalPrice)}
                    </span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Attendee Info */}
                <div className="flex items-center gap-3 mb-6">
                  <Avatar>
                    <AvatarFallback>
                      {mockTicket.attendee.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mockTicket.attendee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {mockTicket.attendee.email}
                    </p>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-muted rounded-lg p-6 text-center mb-6">
                  <QrCode className="h-24 w-24 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Show this QR code at the venue entrance
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ticket ID: {mockTicket.orderId}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="flex-1" variant="gradient">
                    <Download className="h-4 w-4 mr-2" />
                    Download Tickets
                  </Button>
                  <Button className="flex-1" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Tickets
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                    1
                  </span>
                  <div>
                    <p className="font-medium">Check your email</p>
                    <p className="text-sm text-muted-foreground">
                      We've sent your tickets to {mockTicket.attendee.email}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                    2
                  </span>
                  <div>
                    <p className="font-medium">Save your ticket</p>
                    <p className="text-sm text-muted-foreground">
                      Download or add to Apple Wallet/Google Pay
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-sm font-bold">
                    3
                  </span>
                  <div>
                    <p className="font-medium">Arrive early</p>
                    <p className="text-sm text-muted-foreground">
                      Reach 30 minutes before the event with your QR code
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/dashboard/tickets">View My Tickets</Link>
          </Button>
          <Button size="lg" asChild>
            <Link href="/events">Browse More Events</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
