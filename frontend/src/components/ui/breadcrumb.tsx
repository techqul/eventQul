import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  homeHref?: string;
  showHome?: boolean;
}

export function Breadcrumb({
  items,
  className,
  homeHref = "/",
  showHome = true,
}: BreadcrumbProps) {
  const allItems = showHome
    ? [{ label: "Home", href: homeHref, icon: <Home className="h-4 w-4" /> }, ...items]
    : items;

  return (
    <nav aria-label="breadcrumb" className={cn("flex items-center space-x-1 text-sm", className)}>
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1 flex-shrink-0" />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span
                className={cn(
                  "flex items-center space-x-1 font-medium",
                  isLast ? "text-foreground" : "text-muted-foreground"
                )}
                aria-current={isLast ? "page" : undefined}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
