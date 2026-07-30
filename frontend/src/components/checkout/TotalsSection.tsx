interface TotalsSectionProps {
  subtotal: string;
  total: string;
}

export function TotalsSection({ subtotal, total }: TotalsSectionProps) {
  return (
    <div className="space-y-2 pt-4 border-t border-border">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="text-muted-foreground">৳{subtotal}</span>
      </div>
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-primary">৳{total}</span>
      </div>
    </div>
  );
}
