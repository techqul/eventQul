export default function EventDetailLoading() {
  return (
    <div className="flex flex-col">
      {/* Cover Image Skeleton */}
      <div className="relative h-[50vh] md:h-[70vh] w-full bg-muted animate-pulse" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Event Skeleton */}
            <div className="space-y-3">
              <div className="h-8 bg-muted rounded w-1/3 animate-pulse" />
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-6 bg-muted rounded w-3/4 animate-pulse" />
              </div>
            </div>

            {/* Event Details Skeleton */}
            <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
              <div className="h-6 bg-muted rounded w-32 animate-pulse" />
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-5 bg-muted rounded w-20 animate-pulse" />
                  <div className="h-5 bg-muted rounded w-48 animate-pulse" />
                </div>
                <div className="h-px bg-muted" />
                <div className="flex gap-3">
                  <div className="h-5 bg-muted rounded w-20 animate-pulse" />
                  <div className="h-5 bg-muted rounded w-64 animate-pulse" />
                </div>
                <div className="h-px bg-muted" />
                <div className="flex gap-3">
                  <div className="h-5 bg-muted rounded w-20 animate-pulse" />
                  <div className="h-5 bg-muted rounded w-48 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Organizer Skeleton */}
            <div className="p-6 bg-muted/30 rounded-lg space-y-3">
              <div className="flex gap-4">
                <div className="h-16 w-16 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-muted rounded w-48 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-64 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Ticket Card Skeleton */}
              <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-muted rounded w-20 animate-pulse" />
                  <div className="h-5 bg-muted rounded w-24 animate-pulse" />
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-2">
                    <div className="h-6 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                    <div className="h-10 bg-muted rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
