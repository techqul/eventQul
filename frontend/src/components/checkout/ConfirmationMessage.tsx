import { Mail } from "lucide-react";

interface ConfirmationMessageProps {
  attendeeEmail?: string;
  phoneNumber: string;
}

export function ConfirmationMessage({ phoneNumber }: ConfirmationMessageProps) {
  return (
    <div className="flex items-start items-center gap-3 pt-4 border-t border-border">
      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
        <Mail className="w-4 h-4 text-green-500" />
      </div>
      <p className="text-sm text-muted-foreground">
        A confirmation sms has been sent to{" "}
        <span className="font-medium text-foreground">{phoneNumber}</span>.
      </p>
    </div>
  );
}
