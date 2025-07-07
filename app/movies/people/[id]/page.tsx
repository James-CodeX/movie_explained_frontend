'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { usePerson } from '@/hooks/use-movies';

export default function PersonDetailPage() {
  const params = useParams();
  const personId = params.id as string;
  
  const { data: person, isLoading, error } = usePerson(personId);

  if (isLoading) {
    return <PersonDetailSkeleton />;
  }

  if (error || !person) {
    return (
      <div className="container mx-auto max-w-6xl py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Person Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The person you're looking for doesn't exist or has been removed.
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

  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (birthday: string, deathday?: string) => {
    if (!birthday) return null;
    const birthDate = new Date(birthday);
    const endDate = deathday ? new Date(deathday) : new Date();
    const age = endDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = endDate.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const age = calculateAge(person.birthday, person.deathday);

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <Link href="/movies">
        <Button variant="secondary" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Movies
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4">
                  {person.profile_image_url ? (
                    <Image
                      src={person.profile_image_url}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <Users className="w-24 h-24 text-muted-foreground" />
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{person.name}</h1>
                
                <div className="space-y-2 w-full">
                  {person.birthday && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDate(person.birthday)}
                        {age && (
                          <span className="ml-1">
                            ({person.deathday ? `${age} at death` : `${age} years old`})
                          </span>
                        )}
                      </span>
                    </div>
                  )}
                  
                  {person.deathday && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Died: {formatDate(person.deathday)}</span>
                    </div>
                  )}
                  
                  {person.place_of_birth && (
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{person.place_of_birth}</span>
                    </div>
                  )}
                  
                  {person.imdb_id && (
                    <div className="pt-2">
                      <a 
                        href={`https://www.imdb.com/name/${person.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View on IMDB
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Biography Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Biography</CardTitle>
            </CardHeader>
            <CardContent>
              {person.biography ? (
                <p className="text-muted-foreground leading-relaxed">
                  {person.biography}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  No biography available for {person.name}.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filmography */}
      <Tabs defaultValue="cast" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cast">
            Acting ({person.cast_roles?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="crew">
            Crew ({person.crew_roles?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cast" className="space-y-4">
          {person.cast_roles && person.cast_roles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {person.cast_roles
                .sort((a, b) => {
                  // Sort by release date (newest first)
                  const dateA = a.movie?.release_date ? new Date(a.movie.release_date).getTime() : 0;
                  const dateB = b.movie?.release_date ? new Date(b.movie.release_date).getTime() : 0;
                  return dateB - dateA;
                })
                .map((role) => (
                  <Card key={role.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="relative w-16 h-24 rounded overflow-hidden flex-shrink-0">
                          {role.movie?.poster_url ? (
                            <Image
                              src={role.movie.poster_url}
                              alt={role.movie.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/movies/${role.movie?.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                              {role.movie?.title}
                            </h3>
                          </Link>
                          {role.character_name && (
                            <p className="text-sm text-muted-foreground">
                              as {role.character_name}
                            </p>
                          )}
                          {role.movie?.release_date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(role.movie.release_date).getFullYear()}
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
              <p className="text-muted-foreground">No acting roles found for {person.name}.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="crew" className="space-y-4">
          {person.crew_roles && person.crew_roles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {person.crew_roles
                .sort((a, b) => {
                  // Sort by release date (newest first)
                  const dateA = a.movie?.release_date ? new Date(a.movie.release_date).getTime() : 0;
                  const dateB = b.movie?.release_date ? new Date(b.movie.release_date).getTime() : 0;
                  return dateB - dateA;
                })
                .map((role) => (
                  <Card key={role.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <div className="relative w-16 h-24 rounded overflow-hidden flex-shrink-0">
                          {role.movie?.poster_url ? (
                            <Image
                              src={role.movie.poster_url}
                              alt={role.movie.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/movies/${role.movie?.id}`}>
                            <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2">
                              {role.movie?.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {role.job}
                          </p>
                          {role.department && (
                            <p className="text-xs text-muted-foreground">
                              {role.department}
                            </p>
                          )}
                          {role.movie?.release_date && (
                            <p className="text-xs text-muted-foreground">
                              {new Date(role.movie.release_date).getFullYear()}
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
              <p className="text-muted-foreground">No crew roles found for {person.name}.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PersonDetailSkeleton() {
  return (
    <div className="container mx-auto max-w-6xl py-8">
      <Skeleton className="w-32 h-10 mb-6" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Skeleton className="w-48 h-48 rounded-full mb-4" />
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Skeleton className="h-10 w-full mb-6" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    </div>
  );
}
