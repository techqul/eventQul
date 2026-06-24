"use client";

import Link from "next/link";
import { ORGANIZERS } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function OrganizersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center space-y-4"
      >
        <h1 className="text-4xl font-bold">Event Organizers</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover trusted organizers who bring amazing events to life
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="gradient" asChild>
            <Link href="/organizers/signup">Become an Organizer</Link>
          </Button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { label: "Total Organizers", value: ORGANIZERS.length },
          { label: "Verified", value: ORGANIZERS.filter((o) => o.verified).length },
          { label: "Events Hosted", value: ORGANIZERS.reduce((sum, o) => sum + o.totalEvents, 0) },
          { label: "Total Followers", value: `${(ORGANIZERS.reduce((sum, o) => sum + o.followers, 0) / 1000).toFixed(0)}K` },
        ].map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Organizers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ORGANIZERS.map((organizer, index) => (
          <motion.div
            key={organizer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/organizers/${organizer.slug}`}>
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-border/50 h-full">
                {/* Banner */}
                <div className="h-32 relative overflow-hidden">
                  <Image
                    src={organizer.banner}
                    alt={organizer.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>

                <CardContent className="p-6 -mt-12 relative">
                  <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                    <AvatarImage src={organizer.logo} />
                    <AvatarFallback>{organizer.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {organizer.name}
                      </h3>
                      {organizer.verified && (
                        <Badge variant="outline" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                      {organizer.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {organizer.totalEvents} events
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {(organizer.followers / 1000).toFixed(1)}K followers
                      </span>
                      <span className="flex items-center gap-1">
                        ⭐ {organizer.rating}
                      </span>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
