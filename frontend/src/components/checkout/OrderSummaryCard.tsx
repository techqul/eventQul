import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDateTime } from "@/lib/utils";
import { getGoogleDriveImageUrl } from "@/lib/utils/image";
import { QuantitySelector } from "./QuantitySelector";
import { CouponInput } from "./CouponInput";

interface OrderSummaryCardProps {
  event: any;
  ticketType: any;
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
}

export function OrderSummaryCard({
  event,
  ticketType,
  quantity,
  subtotal,
  convenienceFee,
  discount,
  total,
  couponCode,
  onQuantityIncrease,
  onQuantityDecrease,
  onCouponChange,
  onApply,
  onPlaceOrder,
  isProcessing,
}: OrderSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Event */}
          <div className="flex gap-3">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={getGoogleDriveImageUrl(event?.coverImage)}
                alt={event?.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold line-clamp-2">{event?.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {ticketType?.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDateTime(event?.startDate)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Quantity */}
          <div className="flex items-center justify-between">
            <Label>Quantity</Label>
            <QuantitySelector
              quantity={quantity}
              maxQuantity={Number(ticketType?.maxPerPurchase) || 10}
              onIncrease={onQuantityIncrease}
              onDecrease={onQuantityDecrease}
            />
          </div>

          <Separator />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Subtotal ({quantity} × {formatPrice(Number(ticketType?.price))})
              </span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Convenience Fee</span>
              <span>{formatPrice(convenienceFee)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-500">
                <span>Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">{formatPrice(total)}</span>
          </div>

          {/* Coupon */}
          <CouponInput
            couponCode={couponCode}
            onCouponChange={onCouponChange}
            onApply={onApply}
          />

          {/* Place Order Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={onPlaceOrder}
            disabled={isProcessing}
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Place Order
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By placing this order, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
