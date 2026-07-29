import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CouponInputProps {
  couponCode: string;
  onCouponChange: (code: string) => void;
  onApply: () => void;
}

export function CouponInput({
  couponCode,
  onCouponChange,
  onApply,
}: CouponInputProps) {
  return (
    <div className="flex gap-2">
      <Input
        placeholder="Coupon code"
        value={couponCode}
        onChange={(e) => onCouponChange(e.target.value)}
      />
      <Button variant="outline" onClick={onApply}>
        Apply
      </Button>
    </div>
  );
}
