'use client';

import { useState } from 'react';
import { MovieGrid } from '@/components/movie/movie-grid';
import { MovieFilters } from '@/components/movie/movie-filters';
import { MoviePagination } from '@/components/movie/movie-pagination';
import { UnifiedSearch } from '@/components/movie/unified-search';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMovies, useFeaturedMovies, usePopularMovies, useTopRatedMovies } from '@/hooks/use-movies';
import type { MovieFilters as MovieFiltersType } from '@/lib/types/movies';

export default function MoviesClientPage() {
  const [filters, setFilters] = useState<MovieFiltersType>({
    page: 1,
    ordering: '-popularity_score',
  });
  
  const { data: moviesData, isLoading: moviesLoading } = useMovies(filters);
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedMovies();
  const { data: popularData, isLoading: popularLoading } = usePopularMovies();
  const { data: topRatedData, isLoading: topRatedLoading } = useTopRatedMovies();

  const handleFiltersChange = (newFilters: MovieFiltersType) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const totalPages = moviesData ? Math.ceil(moviesData.count / 20) : 1; // Assuming 20 items per page

  return (
    <div className="container mx-auto max-w-7xl py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Movies</h1>
        <p className="text-xl text-muted-foreground">
          Discover and explore movies with detailed explanations and AI-powered recommendations.
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="all">All Movies</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="top-rated">Top Rated</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <MovieFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
          
          <MovieGrid 
            movies={moviesData?.results || []} 
            isLoading={moviesLoading} 
          />
          
          {moviesData && moviesData.results.length > 0 && (
            <MoviePagination
              currentPage={filters.page || 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-8"
            />
          )}
        </TabsContent>

        <TabsContent value="search" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Search Movies</h2>
            <p className="text-muted-foreground">
              Search our database and TMDB for movies. New movies are automatically synced.
            </p>
          </div>
          
          <UnifiedSearch />
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Featured Movies</h2>
            <p className="text-muted-foreground">
              Hand-picked movies that showcase the best of cinema.
            </p>
          </div>
          
          <MovieGrid 
            movies={featuredData?.results || []} 
            isLoading={featuredLoading}
            showGenres={true}
          />
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Popular Movies</h2>
            <p className="text-muted-foreground">
              Movies that are trending and most watched by our community.
            </p>
          </div>
          
          <MovieGrid 
            movies={popularData?.results || []} 
            isLoading={popularLoading}
            showGenres={true}
          />
        </TabsContent>

        <TabsContent value="top-rated" className="space-y-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Top Rated Movies</h2>
            <p className="text-muted-foreground">
              The highest-rated movies based on user reviews and critic scores.
            </p>
          </div>
          
          <MovieGrid 
            movies={topRatedData?.results || []} 
            isLoading={topRatedLoading}
            showGenres={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
