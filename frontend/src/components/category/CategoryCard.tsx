"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Category } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Music, Laptop, Briefcase, Trophy, Palette, Utensils, Rocket, GraduationCap } from "lucide-react";

const iconMap: Record<string, any> = {
  Music,
  Laptop,
  Briefcase,
  Trophy,
  Palette,
  Utensils,
  Rocket,
  GraduationCap,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Trophy;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link href={`/events?category=${category.slug}`}>
        <Card
          className={cn(
            "overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 border-border/50",
            className
          )}
        >
          <CardContent className="p-6">
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                category.color && `bg-gradient-to-br ${category.color}`
              )}
            >
              <Icon className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-semibold mb-1">{category.name}</h3>
            {category.nameBengali && (
              <p className="text-sm text-muted-foreground mb-3">
                {category.nameBengali}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {category.eventCount} events
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
