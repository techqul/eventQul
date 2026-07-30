import { CheckCircle2 } from "lucide-react";

export function OrderSuccessHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4 relative">
        <CheckCircle2 className="w-8 h-8 text-green-500" />
        {/* Confetti dots */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full" />
        <div className="absolute -bottom-1 -left-2 w-1.5 h-1.5 bg-green-500 rounded-full" />
        <div className="absolute top-0 -left-3 w-2 h-2 bg-blue-500 rounded-full" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Ticket Confirmed!</h1>
      <p className="text-muted-foreground text-sm">
        Thank you for your purchase. Your ticket has been confirmed.
      </p>
    </div>
  );
}
