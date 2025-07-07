'use client';

import { MovieCard } from './movie-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Movie } from '@/lib/types/movies';

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  showGenres?: boolean;
  className?: string;
}

export function MovieGrid({ movies, isLoading = false, showGenres = true, className }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}>
        {Array.from({ length: 10 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center mb-4">
          <span className="text-3xl">🎬</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">No movies found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any movies matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 ${className}`}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} showGenres={showGenres} />
      ))}
    </div>
  );
}

function MovieCardSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-[2/3] w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
