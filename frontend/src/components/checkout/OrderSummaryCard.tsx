import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface OrderSummaryCardProps {
  orderNumber: string;
  total: string;
  status: string;
}

export function OrderSummaryCard({ orderNumber, total, status }: OrderSummaryCardProps) {
  const { toast } = useToast();

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(orderNumber);
    toast({
      title: "Copied!",
      description: "Order number copied to clipboard",
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Ticket ID</p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-500">{orderNumber}</span>
            <button
              onClick={handleCopyOrderNumber}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total Paid</p>
          <p className="text-xl font-bold text-green-500">৳{total}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
          {status}
        </span>
      </div>
    </>
  );
}
