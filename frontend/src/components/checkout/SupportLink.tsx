import { HelpCircle } from "lucide-react";

export function SupportLink() {
  return (
    <div className="text-center mt-6">
      <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 mx-auto">
        <HelpCircle className="w-4 h-4" />
        Need help? Contact Support
      </button>
    </div>
  );
}
