"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TShirtSize {
  value: string;
  label: string;
  description?: string;
}

const DEFAULT_SIZES: TShirtSize[] = [
  { value: "S", label: "Small (S)", description: "36\" chest" },
  { value: "M", label: "Medium (M)", description: "38\" chest" },
  { value: "L", label: "Large (L)", description: "40\" chest" },
  { value: "XL", label: "X-Large (XL)", description: "42\" chest" },
  { value: "XXL", label: "XX-Large (XXL)", description: "44\" chest" },
    { value: "3XL", label: "3X-Large (3XL)", description: "46\" chest" },
];

interface TShirtSizeSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  sizes?: TShirtSize[];
  className?: string;
  disabled?: boolean;
}

export function TShirtSizeSelector({
  value,
  onChange,
  sizes = DEFAULT_SIZES,
  className,
  disabled = false,
}: TShirtSizeSelectorProps) {
  return (
    <div className={cn(className)}>
      {sizes.map((size) => (
        <button
          key={size.value}
          type="button"
          onClick={() => !disabled && onChange(size.value)}
          disabled={disabled}
          className={cn(
            "w-full relative group p-4 rounded-lg border-2 text-left transition-all duration-200",
            "hover:border-primary/50 hover:bg-primary/5",
            value === size.value
              ? "border-primary bg-primary/10"
              : "border-border",
            disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-transparent"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* T-shirt Icon */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors",
                    value === size.value
                      ? "border-primary bg-primary"
                      : "border-border group-hover:border-primary/50"
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      value === size.value
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {size.value}
                  </span>
                </div>
                <div>
                  <div
                    className={cn(
                      "font-medium",
                      value === size.value
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {size.label}
                  </div>
                  {size.description && (
                    <div className="text-sm text-muted-foreground">
                      {size.description}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Check mark for selected */}
            {value === size.value && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
