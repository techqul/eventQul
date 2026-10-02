import { Card, CardContent } from "@/components/ui/card";
import { Copy, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Event, TicketType } from "@/types";
import { CouponInput } from "./CouponInput";
import { QuantitySelector } from "./QuantitySelector";

// Props for checkout flow (before order is placed)
interface CheckoutSummaryProps {
  event: Event | null;
  ticketType: TicketType | null;
  quantity: number;
  subtotal: number;
  convenienceFee: number;
  discount: number;
  total: number;
  couponCode: string;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
  onCouponChange: (code: string) => void;
  onApply: () => void;
  onPlaceOrder: () => void;
  isProcessing: boolean;
  orderNumber?: never;
  status?: never;
}

// Props for success page (after order is placed)
interface SuccessSummaryProps {
  orderNumber: string;
  total: string;
  status: string;
  event?: never;
  ticketType?: never;
  quantity?: never;
  subtotal?: never;
  convenienceFee?: never;
  discount?: never;
  couponCode?: never;
  onQuantityIncrease?: never;
  onQuantityDecrease?: never;
  onCouponChange?: never;
  onApply?: never;
  onPlaceOrder?: never;
  isProcessing?: never;
}

type OrderSummaryCardProps = CheckoutSummaryProps | SuccessSummaryProps;

export function OrderSummaryCard(props: OrderSummaryCardProps) {
  const { toast } = useToast();

  // Success page mode
  if ("orderNumber" in props && props.orderNumber) {
    const { orderNumber, total, status } = props;

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

  // Checkout flow mode
  const {
    event,
    ticketType,
    quantity,
    subtotal,
    convenienceFee,
    discount,
    total: checkoutTotal,
    couponCode,
    onQuantityIncrease,
    onQuantityDecrease,
    onCouponChange,
    onApply,
    onPlaceOrder,
    isProcessing,
  } = props as CheckoutSummaryProps;

  return (
    <Card className="p-6 space-y-6">
      {/* Event Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">{event?.title || "Event"}</h3>
        <p className="text-sm text-muted-foreground">
          {ticketType?.name || "Ticket"} - ৳{ticketType ? Number(ticketType.price).toFixed(2) : "0.00"}
        </p>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Quantity</span>
        <QuantitySelector
          quantity={quantity}
          maxQuantity={Number(ticketType?.maxPerPurchase) || 10}
          onIncrease={onQuantityIncrease}
          onDecrease={onQuantityDecrease}
        />
      </div>

      {/* Coupon Code */}
      <CouponInput
        couponCode={couponCode}
        onCouponChange={onCouponChange}
        onApply={onApply}
      />

      {/* Totals */}
      <div className="space-y-2 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-muted-foreground">৳{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Convenience Fee</span>
          <span className="text-muted-foreground">৳{convenienceFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span>-৳{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">৳{checkoutTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={onPlaceOrder}
        disabled={isProcessing}
        className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Buy Ticket"
        )}
      </button>
    </Card>
  );
}
