"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VenueMapProps {
  embedCode: string;
}

export function VenueMap({ embedCode }: VenueMapProps) {
  const src =
    embedCode.match(/src=["']([^"']+)["']/)?.[1] || "";

  if (!src) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Venue Location</CardTitle>
      </CardHeader>

      <CardContent className="px-6">
        <iframe
          src={src}
          width="100%"
          height="200"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  );
}