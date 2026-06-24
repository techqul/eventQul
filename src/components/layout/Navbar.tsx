import Link from "next/link";
import { Ticket } from "lucide-react";
import { NavbarClient } from "./NavbarClient";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "default" | "transparent" | "glass";
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Categories", href: "/categories" },
    { name: "Organizers", href: "/organizers" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all",
        variant === "transparent"
          ? "border-transparent bg-background/50 backdrop-blur-xl"
          : variant === "glass"
          ? "glass"
          : "bg-background"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600">
            <Ticket className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">EventQul</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Client-side interactive elements */}
        <NavbarClient variant={variant} />
      </div>
    </nav>
  );
}
