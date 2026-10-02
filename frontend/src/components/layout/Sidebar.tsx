"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Settings,
  FileText,
  BarChart3,
  Plus,
  Ticket,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
} from "lucide-react";

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

interface SidebarProps {
  type: "user" | "organizer" | "admin";
  isCollapsed?: boolean;
  onToggle?: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const sidebarItems: Record<
  string,
  { items: SidebarItem[]; bottomItems?: SidebarItem[] }
> = {
  user: {
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { title: "My Tickets", href: "/dashboard/tickets", icon: Ticket },
      { title: "Profile", href: "/dashboard/profile", icon: Users },
      { title: "Notifications", href: "/dashboard/notifications", icon: FileText, badge: 3 },
    ],
    bottomItems: [
      { title: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
  organizer: {
    items: [
      { title: "Dashboard", href: "/organizer", icon: LayoutDashboard },
      { title: "Events", href: "/organizer/events", icon: Calendar },
      { title: "Create Event", href: "/organizer/events/new", icon: Plus },
      { title: "Attendees", href: "/organizer/attendees", icon: Users },
      { title: "Revenue", href: "/organizer/revenue", icon: DollarSign },
      { title: "Analytics", href: "/organizer/analytics", icon: BarChart3 },
    ],
    bottomItems: [
      { title: "Settings", href: "/organizer/settings", icon: Settings },
    ],
  },
  admin: {
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Organizers", href: "/admin/organizers", icon: Building2 },
      { title: "Events", href: "/admin/events", icon: Calendar },
      { title: "Categories", href: "/admin/categories", icon: FileText },
      { title: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
    bottomItems: [
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
};

export function Sidebar({
  type,
  isCollapsed = false,
  onToggle,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const items = sidebarItems[type];
  const user = {
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  };

  return (
    <>
      {/* Mobile Sidebar with Overlay */}
      <AnimatePresence>
        {/* Mobile Overlay */}
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onMobileClose}
          />
        )}

        {/* Mobile Sidebar */}
        {isMobileOpen && (
          <motion.div
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r bg-background/95 backdrop-blur-xl flex flex-col md:hidden"
          >
            {/* User Profile */}
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                {onMobileClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMobileClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {items.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Items */}
            <div className="border-t py-4 px-3 space-y-1">
              {items.bottomItems?.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onMobileClose}
                  >
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3",
                        isActive && "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        className={cn(
          // Hidden on mobile, visible on desktop
          "hidden md:flex flex-col border-r bg-background/95 backdrop-blur-xl",
          // Height and width
          "min-h-screen h-[calc(100vh-4rem)]",
          // Width based on collapse state
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* User Profile */}
        <div className="p-4 border-b">
          <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {items.items.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed && "justify-center px-2",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  {isCollapsed && <span className="sr-only">{item.title}</span>}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Bottom Items */}
        <div className="border-t py-4 px-3 space-y-1">
          {items.bottomItems?.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    isCollapsed && "justify-center px-2",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                  {isCollapsed && <span className="sr-only">{item.title}</span>}
                </Button>
              </Link>
            );
          })}

          {/* Toggle Button - Desktop only */}
          {onToggle && (
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 mt-2",
                isCollapsed && "justify-center px-2"
              )}
              onClick={onToggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 flex-shrink-0" />
              ) : (
                <>
                  <ChevronLeft className="h-5 w-5 flex-shrink-0" />
                  <span>Collapse</span>
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </>
  );
}
