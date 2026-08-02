"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EventGrid } from "@/components/event/EventGrid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CATEGORIES } from "@/lib/constants";
import { Event, EventFilter, Category } from "@/types";

const CITIES = ["Dhaka", "Chittagong", "Sylhet", "Rajshahi", "Khulna"];

interface EventsPageContentProps {
  initialEvents: Event[];
  totalEvents: number;
  categories?: Category[];
  error?: string | null;
}

export function EventsPageContent({
  initialEvents,
  totalEvents,
  categories = [],
  error,
}: EventsPageContentProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<EventFilter>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Use API categories if available, otherwise fall back to constants
  const displayCategories = categories.length > 0 ? categories : CATEGORIES;

  const filteredEvents = useMemo(() => {
    let filtered = [...initialEvents];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((e) => e.category.slug === filters.category);
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (e) => e.venue.city.toLowerCase() === filters.location?.toLowerCase()
      );
    }

    // Price filter
    if (filters.price === "free") {
      filtered = filtered.filter((e) =>
        e.ticketTypes.some((t) => parseFloat(t.price) === 0)
      );
    } else if (filters.price === "paid") {
      filtered = filtered.filter((e) =>
        e.ticketTypes.some((t) => parseFloat(t.price) > 0)
      );
    }

    // Sort
    if (filters.sort === "date") {
      filtered.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );
    } else if (filters.sort === "price_low") {
      filtered.sort(
        (a, b) =>
          Math.min(...a.ticketTypes.map((t) => parseFloat(t.price))) -
          Math.min(...b.ticketTypes.map((t) => parseFloat(t.price)))
      );
    } else if (filters.sort === "price_high") {
      filtered.sort(
        (a, b) =>
          Math.min(...b.ticketTypes.map((t) => parseFloat(t.price))) -
          Math.min(...a.ticketTypes.map((t) => parseFloat(t.price)))
      );
    } else if (filters.sort === "popular") {
      filtered.sort((a, b) => b.soldTickets - a.soldTickets);
    }

    return filtered;
  }, [search, filters, initialEvents]);

  const activeFilterCount = [
    filters.category,
    filters.location,
    filters.price,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setFilters({});
    setSearch("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-4xl font-bold mb-2">Discover Events</h1>
        <p className="text-muted-foreground">
          Find your next experience from {totalEvents}+ events
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur py-4 mb-8 border-b">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:flex gap-3">
            <Select
              value={filters.category || "all"}
              onValueChange={(value) =>
                setFilters({ ...filters, category: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {displayCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.slug}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.location || "all"}
              onValueChange={(value) =>
                setFilters({ ...filters, location: value === "all" ? undefined : value })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sort || "relevance"}
              onValueChange={(value) =>
                setFilters({ ...filters, sort: value as any })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Filter Button */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Category
                  </label>
                  <Select
                    value={filters.category || "all"}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        category: value === "all" ? undefined : value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {displayCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.slug}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Location
                  </label>
                  <Select
                    value={filters.location || "all"}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        location: value === "all" ? undefined : value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Price
                  </label>
                  <Select
                    value={filters.price || "all"}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        price: value === "all" ? undefined : (value as any),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Sort By
                  </label>
                  <Select
                    value={filters.sort || "relevance"}
                    onValueChange={(value) =>
                      setFilters({ ...filters, sort: value as any })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="popular">Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {activeFilterCount > 0 && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {filters.category && (
              <Badge variant="secondary" className="gap-1">
                Category: {CATEGORIES.find((c) => c.slug === filters.category)?.name}
                <button
                  onClick={() => setFilters({ ...filters, category: undefined })}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.location && (
              <Badge variant="secondary" className="gap-1">
                Location: {filters.location}
                <button
                  onClick={() => setFilters({ ...filters, location: undefined })}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            )}
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-6">
          <p className="text-destructive font-medium mb-2">Failed to load events</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Results */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredEvents.length} events found
        </p>
      </div>

             <EventGrid events={filteredEvents} gridClassName="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6" />

      {filteredEvents.length === 0 && (
        <div className="text-center py-20">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search terms
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
