"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function EventError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Event detail error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Event Unavailable</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            We couldn't load this event. It may have been removed or is temporarily unavailable.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" asChild>
              <Link href="/events">Browse all events</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
