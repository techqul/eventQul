import { Calendar, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EventInfoProps {
  eventTitle: string;
  venuName: string;
  eventStartDate: string;
  eventEndDate: string;
  eventTime: string;
}

export function EventInfo({
  eventTitle,
  venuName,
  eventStartDate,
  eventEndDate,
  eventTime,
}: EventInfoProps) {
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <div className="p-4 bg-muted/30 rounded-lg space-y-3">
      <h2 className="text-lg font-bold">{eventTitle}</h2>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="w-4 h-4" />
        <span>{venuName}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span>{formatDate(eventStartDate)}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4" />
        <span>{eventTime}</span>
      </div>
    </div>
  );
}
