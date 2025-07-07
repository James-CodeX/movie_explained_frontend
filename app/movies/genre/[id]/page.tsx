'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieGrid } from '@/components/movie/movie-grid';
import { Skeleton } from '@/components/ui/skeleton';
import { useGenre } from '@/hooks/use-movies';

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = params.id as string;
  
  const { data: genre, isLoading, error } = useGenre(genreId);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl py-8">
        <Skeleton className="w-32 h-10 mb-6" />
        <div className="mb-8">
          <Skeleton className="h-10 w-1/3 mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-[2/3] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !genre) {
    return (
      <div className="container mx-auto max-w-6xl py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Genre Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The genre you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/movies">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movies
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <Link href="/movies">
        <Button variant="secondary" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Movies
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{genre.name}</h1>
        {genre.description ? (
          <p className="text-xl text-muted-foreground">
            {genre.description}
          </p>
        ) : (
          <p className="text-xl text-muted-foreground">
            Explore all movies in the {genre.name} genre.
          </p>
        )}
        {genre.movies && genre.movies.length > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            {genre.movies.length} movie{genre.movies.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      <MovieGrid 
        movies={genre.movies || []} 
        isLoading={false}
        showGenres={false}
      />
    </div>
  );
}
