'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Clock, Star, DollarSign, Building, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { useMovie } from '@/hooks/use-movies';

export default function MovieDetailPage() {
  const params = useParams();
  const movieId = params.id as string;
  
  const { data: movie, isLoading, error } = useMovie(movieId);

  if (isLoading) {
    return <MovieDetailSkeleton />;
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto max-w-6xl py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The movie you're looking for doesn't exist or has been removed.
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatRuntime = (runtime: number) => {
    if (!runtime) return 'Unknown';
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Backdrop */}
      <div 
        className="relative h-[60vh] flex items-end bg-gradient-to-t from-background via-background/80 to-background/20"
        style={{
          backgroundImage: movie.backdrop_url ? `url(${movie.backdrop_url})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative z-10 pb-8">
          <Link href="/movies">
            <Button variant="secondary" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Movies
            </Button>
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div className="relative w-64 h-96 rounded-lg overflow-hidden shadow-2xl">
                {movie.poster_url ? (
                  <Image
                    src={movie.poster_url}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="flex-1 text-white">
              <div className="flex items-start gap-2 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
                {movie.is_featured && (
                  <Badge className="bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              {movie.original_title && movie.original_title !== movie.title && (
                <p className="text-xl text-gray-300 mb-2">
                  Original Title: {movie.original_title}
                </p>
              )}
              
              {movie.tagline && (
                <p className="text-lg italic text-gray-300 mb-4">
                  "{movie.tagline}"
                </p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 mb-4">
                {movie.release_date && (
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                )}
                {movie.runtime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
                {movie.vote_average > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)}/10</span>
                    {movie.vote_count > 0 && (
                      <span className="text-gray-400">({movie.vote_count} votes)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genres.map((genre) => (
                    <Link key={genre.id} href={`/movies/genre/${genre.id}`}>
                      <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                        {genre.name}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              {/* Overview */}
              {movie.overview && (
                <p className="text-lg leading-relaxed max-w-3xl">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="container mx-auto max-w-6xl py-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="cast">Cast</TabsTrigger>
            <TabsTrigger value="crew">Crew</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {movie.budget > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget:</span>
                      <span className="font-medium">{formatCurrency(movie.budget)}</span>
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue:</span>
                      <span className="font-medium">{formatCurrency(movie.revenue)}</span>
                    </div>
                  )}
                  {movie.budget > 0 && movie.revenue > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Profit:</span>
                      <span className={`font-medium ${movie.revenue - movie.budget > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(movie.revenue - movie.budget)}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="outline">{movie.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                  </div>
                  {movie.popularity_score && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Popularity Score:</span>
                      <span className="font-medium">{movie.popularity_score.toFixed(1)}</span>
                    </div>
                  )}
                  {movie.adult !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Adult Content:</span>
                      <span className="font-medium">{movie.adult ? 'Yes' : 'No'}</span>
                    </div>
                  )}
                  {movie.imdb_id && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IMDB ID:</span>
                      <a 
                        href={`https://www.imdb.com/title/${movie.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary hover:underline"
                      >
                        {movie.imdb_id}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {movie.trailer_url && (
              <Card>
                <CardHeader>
                  <CardTitle>Trailer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      src={movie.trailer_url}
                      title={`${movie.title} Trailer`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cast" className="space-y-6">
            {movie.cast && movie.cast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.cast.slice(0, 12).map((castMember) => (
                  <Card key={castMember.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          {castMember.person.profile_image_url ? (
                            <Image
                              src={castMember.person.profile_image_url}
                              alt={castMember.person.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Users className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/movies/people/${castMember.person.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">
                              {castMember.person.name}
                            </h3>
                          </Link>
                          {castMember.character_name && (
                            <p className="text-sm text-muted-foreground">
                              as {castMember.character_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No cast information available.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="crew" className="space-y-6">
            {movie.crew && movie.crew.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.crew.slice(0, 12).map((crewMember) => (
                  <Card key={crewMember.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          {crewMember.person.profile_image_url ? (
                            <Image
                              src={crewMember.person.profile_image_url}
                              alt={crewMember.person.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Users className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/movies/people/${crewMember.person.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">
                              {crewMember.person.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {crewMember.job}
                          </p>
                          {crewMember.department && (
                            <p className="text-xs text-muted-foreground">
                              {crewMember.department}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No crew information available.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            {movie.production_companies && movie.production_companies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movie.production_companies.map((company) => (
                  <Card key={company.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                          {company.logo_url ? (
                            <Image
                              src={company.logo_url}
                              alt={company.name}
                              fill
                              className="object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Building className="w-6 h-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/movies/production-companies/${company.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors">
                              {company.name}
                            </h3>
                          </Link>
                          {company.origin_country && (
                            <p className="text-sm text-muted-foreground">
                              {company.origin_country}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No production company information available.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="h-[60vh] bg-muted">
        <div className="container mx-auto max-w-6xl relative z-10 pb-8 pt-8">
          <Skeleton className="w-32 h-10 mb-4" />
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="w-64 h-96 rounded-lg" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl py-8">
        <Skeleton className="h-10 w-full mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}
