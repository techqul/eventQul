export function HomePageLoading() {
  return (
    <div className="flex flex-col">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="h-10 bg-muted rounded w-48 mx-auto animate-pulse" />
            <div className="space-y-4">
              <div className="h-16 bg-muted rounded mx-auto animate-pulse" />
              <div className="h-6 bg-muted rounded mx-auto w-2/3 animate-pulse" />
            </div>
            <div className="h-14 bg-muted rounded-full max-w-2xl mx-auto animate-pulse" />
            <div className="flex justify-center gap-8 pt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-10 bg-muted rounded w-20 mx-auto animate-pulse" />
                  <div className="h-4 bg-muted rounded w-16 mx-auto animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Skeleton */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <div className="h-10 bg-muted rounded w-48 mx-auto animate-pulse" />
            <div className="h-5 bg-muted rounded w-32 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Events Skeleton */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div className="space-y-2">
              <div className="h-10 bg-muted rounded w-48 animate-pulse" />
              <div className="h-5 bg-muted rounded w-64 animate-pulse" />
            </div>
            <div className="h-10 bg-muted rounded w-24 hidden md:block animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-3 animate-pulse">
                <div className="h-48 bg-muted rounded-lg" />
                <div className="h-6 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
