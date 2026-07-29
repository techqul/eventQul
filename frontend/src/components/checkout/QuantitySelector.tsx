import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  maxQuantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({
  quantity,
  maxQuantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrease}
        disabled={quantity <= 1}
      >
        -
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrease}
        disabled={quantity >= maxQuantity}
      >
        +
      </Button>
    </div>
  );
}
