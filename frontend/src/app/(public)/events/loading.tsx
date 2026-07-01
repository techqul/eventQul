export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8 space-y-2">
        <div className="h-10 bg-muted rounded w-1/3 animate-pulse" />
        <div className="h-5 bg-muted rounded w-1/4 animate-pulse" />
      </div>

      {/* Search and Filters Skeleton */}
      <div className="bg-background/95 backdrop-blur py-4 mb-8 border-b space-y-4">
        <div className="h-12 bg-muted rounded animate-pulse" />
        <div className="hidden md:flex gap-3">
          <div className="h-10 bg-muted rounded w-48 animate-pulse" />
          <div className="h-10 bg-muted rounded w-48 animate-pulse" />
          <div className="h-10 bg-muted rounded w-48 animate-pulse" />
        </div>
      </div>

      {/* Results Skeleton */}
      <div className="mb-4">
        <div className="h-5 bg-muted rounded w-48 animate-pulse" />
      </div>

      {/* Event Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="space-y-3 animate-pulse">
            <div className="h-48 bg-muted rounded-lg" />
            <div className="h-6 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
