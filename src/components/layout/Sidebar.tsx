"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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
      { title: "Organizers", href: "/admin/organizers", icon: Users },
      { title: "Events", href: "/admin/events", icon: Calendar },
      { title: "Categories", href: "/admin/categories", icon: FileText },
      { title: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
    bottomItems: [
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
};

export function Sidebar({ type, isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const items = sidebarItems[type];
  const user = {
    name: "Ahmed Rahman",
    email: "ahmed@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  };

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 260 }}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] border-r bg-background/50 backdrop-blur-xl flex flex-col",
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
              </Button>
            </Link>
          );
        })}

        {/* Toggle Button */}
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
      </div>
    </motion.div>
  );
}
