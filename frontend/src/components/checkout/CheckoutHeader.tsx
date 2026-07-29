import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CheckoutHeaderProps {
  eventSlug?: string;
}

export function CheckoutHeader({ eventSlug }: CheckoutHeaderProps) {
  return (
    <Link
      href={eventSlug ? `/events/${eventSlug}` : "/events"}
      className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to event
    </Link>
  );
}
