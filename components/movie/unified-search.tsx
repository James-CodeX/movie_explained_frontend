'use client';

import { useState, useCallback } from 'react';
import { Search, Database, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MovieGrid } from './movie-grid';
import { useSearchMovies } from '@/hooks/use-movies';
import type { MovieSearchParams } from '@/lib/types/movies';

interface UnifiedSearchProps {
  className?: string;
}

export function UnifiedSearch({ className }: UnifiedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useState<MovieSearchParams | null>(null);

  const { data: searchResults, isLoading, error } = useSearchMovies(
    searchParams || { q: '' }
  );

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({
        q: searchQuery.trim(),
        page: 1,
      });
    }
  }, [searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSearchParams(null);
  }, []);

  return (
    <div className={className}>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search for movies (includes TMDB results)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" disabled={!searchQuery.trim()}>
            Search
          </Button>
          {searchParams && (
            <Button type="button" variant="outline" onClick={clearSearch}>
              Clear
            </Button>
          )}
        </div>
      </form>

      {/* Search Info */}
      {!searchParams && (
        <div className="bg-muted/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Enhanced Search
          </h3>
          <p className="text-muted-foreground mb-4">
            Our search automatically includes results from both our local database and TMDB. 
            New movies found on TMDB are automatically added to our database for future searches.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Searches local database first</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-green-600" />
              <span className="text-sm">Auto-syncs missing movies from TMDB</span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchParams && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Search Results for "{searchParams.q}"
            </h2>
            {searchResults?.search_stats && (
              <div className="text-sm text-muted-foreground">
                {searchResults.search_stats.total_count} result{searchResults.search_stats.total_count !== 1 ? 's' : ''} found
                {searchResults.search_stats.synced_count > 0 && (
                  <span className="ml-2 text-green-600">
                    (+{searchResults.search_stats.synced_count} new from TMDB)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Search Statistics */}
          {searchResults?.search_stats && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchResults.search_stats.local_count > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-xs">
                  <Database className="w-3 h-3" />
                  {searchResults.search_stats.local_count} from database
                </div>
              )}
              {searchResults.search_stats.synced_count > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">
                  <Download className="w-3 h-3" />
                  {searchResults.search_stats.synced_count} synced from TMDB
                </div>
              )}
              {searchResults.search_stats.tmdb_count > 0 && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-xs">
                  <TrendingUp className="w-3 h-3" />
                  {searchResults.search_stats.tmdb_count} found on TMDB
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-4">
              <p className="font-medium">Search Error</p>
              <p className="text-sm">
                {error instanceof Error ? error.message : 'Failed to search movies'}
              </p>
            </div>
          )}

          <MovieGrid
            movies={searchResults?.results || []}
            isLoading={isLoading}
            showGenres={true}
          />
        </div>
      )}
    </div>
  );
}
