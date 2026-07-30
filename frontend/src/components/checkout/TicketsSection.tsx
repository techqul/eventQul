import { Ticket, MapPin, Badge as BadgeIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Ticket {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  isFree: boolean;
  benefits: string[];
}

interface TicketsSectionProps {
  tickets: Ticket[];
  qrCode: string;
}

export function TicketsSection({ tickets, qrCode }: TicketsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold flex items-center gap-2 mb-3">
        <Ticket className="w-4 h-4 text-primary" />
        Tickets ({tickets.length})
      </h3>
      <div className="grid grid-cols-2 gap-4 ">
        {tickets.map((ticket, index) => (
          <div
            key={`${ticket.id}-${index}`}
            className="border border-border rounded-lg p-4 space-y-3"
          >
            {/* Ticket Type Name */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold text-foreground">{ticket.name}</span>
              </div>
              {!ticket.isFree && (
                <span className="text-lg font-bold text-primary">
                  {ticket.currency} {ticket.price}
                </span>
              )}
            </div>

            {/* Ticket Description */}
            {ticket.description && (
              <p className="text-sm text-muted-foreground">{ticket.description}</p>
            )}

            {/* Benefits as Badges */}
            {ticket.benefits && ticket.benefits.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {ticket.benefits.map((benefit, idx) => (
                  <Badge
                    key={`${benefit}-${idx}`}
                    className="text-xs bg-green-700 text-white"
                  >
                    <BadgeIcon className="w-3 h-3 mr-1" />
                    {benefit}
                  </Badge>
                ))}
              </div>
            )}

            {/* QR Code Section */}
            {/* <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground">QR Code</p>
                <p className="text-xs font-mono text-muted-foreground">
                  {qrCode.slice(0, 12)}...
                </p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                <Ticket className="w-4 h-4 text-primary" />
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}
