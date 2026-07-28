import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Facebook, X, Instagram, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventGrid } from "@/components/event/EventGrid";
import { organizersApi } from '@/lib/api/organizers';
import { Organizer } from '@/types';
import { getGoogleDriveImageUrl } from '@/lib/utils/image';

interface OrganizerPageProps {
  params: Promise<{ slug: string }>;
}

export default async function OrganizerDetailPage({ params }: OrganizerPageProps) {
  const { slug } = await params;

  // Fetch organizer by slug from API
  let organizer: Organizer | null = null;
  let error: string | null = null;

  try {
    const response = await organizersApi.getBySlug(slug);
    if (response.success && response.data) {
      organizer = response.data;
    } else {
      error = response.message || 'Organizer not found';
    }
  } catch (err) {
    error = err instanceof Error ? err.message : 'An error occurred while fetching organizer';
    console.error('Error fetching organizer:', err);
  }

  if (!organizer) {
    notFound();
  }

  // TODO: Fetch events by organizer ID from API when endpoint is available
  // For now, use empty array
  const events: any[] = [];
  const totalRevenue = 0;

  return (
    <div className="flex flex-col">
      {/* Cover Image */}
      <div className="relative h-[40vh] md:h-[40vh] w-full">
        <Image
          src={getGoogleDriveImageUrl(organizer.banner)}
          alt={organizer.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button variant="glass" size="icon" asChild>
            <Link href="/organizers">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </Button>
        </div>

        {/* Organizer Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto flex items-end gap-6">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage src={getGoogleDriveImageUrl(organizer.logo)} />
              <AvatarFallback className="text-4xl">{organizer.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{organizer.name}</h1>
                {organizer.isVerified && (
                  <Badge variant="outline" className="text-sm">
                    <Check className="h-4 w-4 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {organizer.totalEvents} Events
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {organizer.followers.toLocaleString()} Followers
                </span>
                <span className="flex items-center gap-2">
                  ⭐ {organizer.rating} Rating
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
            {/* About */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {organizer.description}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">{organizer.totalEvents}</p>
                  <p className="text-sm text-muted-foreground">Events Hosted</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">{events.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-3xl font-bold text-primary">{totalRevenue}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Events by {organizer.name}</h2>
              {events.length > 0 ? (
                <EventGrid events={events}  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"/>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">
                      This organizer doesn't have any upcoming events.
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/events">Browse All Events</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {organizer.socialLinks.website && (
                      <a
                        href={organizer.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                    {organizer.socialLinks.facebook && (
                      <a
                        href={organizer.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Facebook className="h-4 w-4" />
                        <span className="text-sm">Facebook</span>
                      </a>
                    )}
                    {organizer.socialLinks.instagram && (
                      <a
                        href={organizer.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        <span className="text-sm">Instagram</span>
                      </a>
                    )}
                    {organizer.socialLinks.twitter && (
                      <a
                        href={organizer.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                        <span className="text-sm">Twitter/X</span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button className="w-full" variant="default">
                      Follow Organizer
                    </Button>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/organizers/signup">Become an Organizer</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SEO metadata
export async function generateMetadata({ params }: OrganizerPageProps) {
  const { slug } = await params;

  try {
    const response = await organizersApi.getBySlug(slug);
    if (response.success && response.data) {
      const organizer = response.data;
      return {
        title: `${organizer.name} - Event Organizer`,
        description: organizer.description,
        keywords: `${organizer.name}, event organizer, events, Bangladesh`,
      };
    }
  } catch (err) {
    console.error('Error generating metadata:', err);
  }

  return {
    title: 'Event Organizer',
    description: 'Discover amazing events from this organizer',
  };
}

// Generate static params for known organizer slugs
export async function generateStaticParams() {
  try {
    const response = await organizersApi.getAll();
    if (response.success && response.data) {
      return response.data.slice(0, 5).map((organizer: Organizer) => ({
        slug: organizer.slug,
      }));
    }
  } catch (err) {
    console.error('Error generating static params:', err);
  }

  return [];
}
