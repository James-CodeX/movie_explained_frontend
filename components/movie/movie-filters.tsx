'use client';

import { useState, useCallback } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGenres } from '@/hooks/use-movies';
import type { MovieFilters } from '@/lib/types/movies';

interface MovieFiltersProps {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
  className?: string;
}

const SORT_OPTIONS = [
  { value: 'title', label: 'Title (A-Z)' },
  { value: '-title', label: 'Title (Z-A)' },
  { value: '-release_date', label: 'Newest First' },
  { value: 'release_date', label: 'Oldest First' },
  { value: '-popularity_score', label: 'Most Popular' },
  { value: '-vote_average', label: 'Highest Rated' },
  { value: 'vote_average', label: 'Lowest Rated' },
];

const STATUS_OPTIONS = [
  { value: 'released', label: 'Released' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'in_production', label: 'In Production' },
];

const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

export function MovieFilters({ filters, onFiltersChange, className }: MovieFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: genresData } = useGenres();
  const genres = genresData?.results || [];

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, search: searchQuery.trim() || undefined, page: 1 });
  }, [filters, onFiltersChange, searchQuery]);

  const handleFilterChange = useCallback((key: keyof MovieFilters, value: string | boolean | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1, // Reset to first page when filters change
    });
  }, [filters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    onFiltersChange({
      page: 1,
      ordering: '-popularity_score', // Keep default sorting
    });
  }, [onFiltersChange]);

  const hasActiveFilters = !!(
    filters.search ||
    filters.genre ||
    filters.year ||
    filters.status ||
    filters.featured ||
    (filters.ordering && filters.ordering !== '-popularity_score')
  );

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.genre) count++;
    if (filters.year) count++;
    if (filters.status) count++;
    if (filters.featured) count++;
    if (filters.ordering && filters.ordering !== '-popularity_score') count++;
    return count;
  };

  return (
    <div className={className}>
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit" variant="default">
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {getActiveFilterCount()}
            </Badge>
          )}
        </Button>
      </form>

      {/* Filter Panel */}
      {showFilters && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Genre</label>
                <Select
                  value={filters.genre || ''}
                  onValueChange={(value) => handleFilterChange('genre', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.name}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Year</label>
                <Select
                  value={filters.year?.toString() || ''}
                  onValueChange={(value) => handleFilterChange('year', value ? parseInt(value) : undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All years</SelectItem>
                    {YEAR_OPTIONS.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select
                  value={filters.status || ''}
                  onValueChange={(value) => handleFilterChange('status', value || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All statuses</SelectItem>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort by</label>
                <Select
                  value={filters.ordering || '-popularity_score'}
                  onValueChange={(value) => handleFilterChange('ordering', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <Button
                variant={filters.featured ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleFilterChange('featured', !filters.featured || undefined)}
              >
                Featured Movies
              </Button>
              
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Search: "{filters.search}"
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => {
                  setSearchQuery('');
                  handleFilterChange('search', undefined);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.genre && (
            <Badge variant="secondary" className="gap-1">
              Genre: {filters.genre}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('genre', undefined)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.year && (
            <Badge variant="secondary" className="gap-1">
              Year: {filters.year}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('year', undefined)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.status && (
            <Badge variant="secondary" className="gap-1">
              Status: {STATUS_OPTIONS.find(s => s.value === filters.status)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('status', undefined)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.featured && (
            <Badge variant="secondary" className="gap-1">
              Featured
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 ml-1"
                onClick={() => handleFilterChange('featured', undefined)}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
