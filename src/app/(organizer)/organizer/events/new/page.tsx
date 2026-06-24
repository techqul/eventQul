"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";
import { VENUES } from "@/lib/mock-data";

export default function CreateEventPage() {
  const router = useRouter();
  const [ticketTypes, setTicketTypes] = useState([
    { id: 1, name: "", price: "", available: "", description: "" },
  ]);

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { id: Date.now(), name: "", price: "", available: "", description: "" },
    ]);
  };

  const removeTicketType = (id: number) => {
    setTicketTypes(ticketTypes.filter((t) => t.id !== id));
  };

  const handleCreateEvent = () => {
    // Mock event creation
    router.push("/organizer/events");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/organizer/events"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-muted-foreground mb-8">
          Fill in the details to create your event
        </p>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input id="title" placeholder="Enter event title" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your event"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="longDescription">Detailed Description</Label>
                <Textarea
                  id="longDescription"
                  placeholder="Full details about your event"
                  rows={6}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      {VENUES.map((venue) => (
                        <SelectItem key={venue.id} value={venue.id}>
                          {venue.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date & Time */}
          <Card>
            <CardHeader>
              <CardTitle>Date & Time</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input id="startDate" type="datetime-local" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="datetime-local" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Dhaka">
                      Asia/Dhaka (GMT+6)
                    </SelectItem>
                    <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Capacity */}
          <Card>
            <CardHeader>
              <CardTitle>Event Capacity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Total Capacity *</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Enter maximum capacity"
                />
              </div>
            </CardContent>
          </Card>

          {/* Ticket Types */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Ticket Types</CardTitle>
                <Button variant="outline" size="sm" onClick={addTicketType}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Ticket
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {ticketTypes.map((ticket, index) => (
                <div key={ticket.id} className="grid md:grid-cols-5 gap-4 p-4 border rounded-lg">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      placeholder="VIP Pass"
                      value={ticket.name}
                      onChange={(e) => {
                        const updated = [...ticketTypes];
                        updated[index].name = e.target.value;
                        setTicketTypes(updated);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price (BDT)</Label>
                    <Input
                      type="number"
                      placeholder="500"
                      value={ticket.price}
                      onChange={(e) => {
                        const updated = [...ticketTypes];
                        updated[index].price = e.target.value;
                        setTicketTypes(updated);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Available</Label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={ticket.available}
                      onChange={(e) => {
                        const updated = [...ticketTypes];
                        updated[index].available = e.target.value;
                        setTicketTypes(updated);
                      }}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label>Description</Label>
                    <Input
                      placeholder="Benefits..."
                      value={ticket.description}
                      onChange={(e) => {
                        const updated = [...ticketTypes];
                        updated[index].description = e.target.value;
                        setTicketTypes(updated);
                      }}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTicketType(ticket.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Event Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  Drag and drop your cover image here, or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Recommended: 1920x1080px, JPG or PNG
                </p>
                <Button variant="outline" className="mt-4">
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" asChild>
              <Link href="/organizer/events">Cancel</Link>
            </Button>
            <Button className="flex-1" variant="gradient" onClick={handleCreateEvent}>
              Create Event
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
