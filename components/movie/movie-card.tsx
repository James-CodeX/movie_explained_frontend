'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/types/movies';

interface MovieCardProps {
  movie: Movie;
  showGenres?: boolean;
  className?: string;
}

export function MovieCard({ movie, showGenres = true, className }: MovieCardProps) {
  const formatReleaseDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).getFullYear().toString();
  };

  const formatRuntime = (runtime: number) => {
    if (!runtime) return '';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${className}`}>
      <CardHeader className="p-0">
        <Link href={`/movies/${movie.id}`}>
          <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
            {movie.poster_url ? (
              <Image
                src={movie.poster_url}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
            {movie.is_featured && (
              <Badge className="absolute top-2 left-2 bg-primary">
                Featured
              </Badge>
            )}
            {movie.vote_average > 0 && (
              <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>
      
      <CardContent className="p-4">
        <Link href={`/movies/${movie.id}`}>
          <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
            {movie.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
          {movie.release_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatReleaseDate(movie.release_date)}</span>
            </div>
          )}
          {movie.runtime > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
          )}
        </div>
        
        {showGenres && movie.genres && movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <Link key={genre.id} href={`/movies/genre/${genre.id}`}>
                <Badge 
                  variant="secondary" 
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {genre.name}
                </Badge>
              </Link>
            ))}
            {movie.genres.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genres.length - 2}
              </Badge>
            )}
          </div>
        )}
        
        {movie.overview && (
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
            {movie.overview}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
