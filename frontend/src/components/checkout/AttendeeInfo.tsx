import { User, Phone } from "lucide-react";

interface AttendeeInfoProps {
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
}

export function AttendeeInfo({ attendeeName, attendeeEmail, attendeePhone }: AttendeeInfoProps) {
  return (
    <div>
      <h3 className="font-semibold flex items-center gap-2 mb-3">
        <User className="w-4 h-4 text-primary" />
        Attendee Information
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Name:</span>
          <span className="font-medium">{attendeeName}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Email:</span>
          <span className="font-medium">{attendeeEmail}</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-muted-foreground">Phone:</span>
          <span className="font-medium">{attendeePhone}</span>
        </div>
      </div>
    </div>
  );
}
