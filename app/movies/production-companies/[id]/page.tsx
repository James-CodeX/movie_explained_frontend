'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieGrid } from '@/components/movie/movie-grid';
import { Skeleton } from '@/components/ui/skeleton';
import { useProductionCompany } from '@/hooks/use-movies';

export default function ProductionCompanyDetailPage() {
  const params = useParams();
  const companyId = params.id as string;
  
  const { data: company, isLoading, error } = useProductionCompany(companyId);

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl py-8">
        <Skeleton className="w-32 h-10 mb-6" />
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="w-16 h-16 rounded" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
          </div>
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

  if (error || !company) {
    return (
      <div className="container mx-auto max-w-6xl py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Production Company Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The production company you're looking for doesn't exist or has been removed.
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

      <div className="flex items-center gap-4 mb-8">
        <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0 border">
          {company.logo_url ? (
            <Image
              src={company.logo_url}
              alt={company.name}
              fill
              className="object-contain p-1"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <Building className="w-8 h-8 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div>
          <h1 className="text-4xl font-bold mb-1">{company.name}</h1>
          {company.origin_country && (
            <p className="text-lg text-muted-foreground">
              {company.origin_country}
            </p>
          )}
          {company.movies && company.movies.length > 0 && (
            <p className="text-sm text-muted-foreground mt-1">
              {company.movies.length} movie{company.movies.length !== 1 ? 's' : ''} produced
            </p>
          )}
        </div>
      </div>

      <MovieGrid 
        movies={company.movies || []} 
        isLoading={false}
        showGenres={true}
      />
    </div>
  );
}
