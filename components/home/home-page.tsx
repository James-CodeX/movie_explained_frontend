'use client';

import Link from 'next/link';
import { Film, Users, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MovieGrid } from '@/components/movie/movie-grid';
import { useAuthStore } from '@/store/auth-store';
import { useFeaturedMovies } from '@/hooks/use-movies';

export function HomePage() {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    return <AuthenticatedHome user={user} />;
  }

  return <UnauthenticatedHome />;
}

function AuthenticatedHome({ user }: { user: { first_name?: string; username: string; preferences?: { favorite_genres?: string[] } } }) {
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedMovies();
  
  return (
    <div className="container mx-auto max-w-7xl py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome back, {user.first_name || user.username}!
        </h1>
        <p className="text-xl text-muted-foreground">
          Ready to explore more movies and discover new stories?
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              Explore Movies
            </CardTitle>
            <CardDescription>
              Discover new movies and read detailed explanations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/movies">Browse Movies</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Latest Blog Posts
            </CardTitle>
            <CardDescription>
              Read our latest articles about cinema and storytelling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/blog">Read Blog</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Your Preferences
            </CardTitle>
            <CardDescription>
              Customize your experience based on your favorite genres
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile/preferences">Manage Preferences</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {(user.preferences?.favorite_genres?.length ?? 0) > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Based on Your Preferences</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {user.preferences?.favorite_genres?.slice(0, 5).map((genre: string) => (
              <span
                key={genre}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {genre}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground">
            We&apos;ll recommend movies based on your favorite genres. Update your preferences anytime!
          </p>
        </div>
      )}
      
      {/* Featured Movies Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Movies</h2>
          <Button variant="outline" asChild>
            <Link href="/movies">View All Movies</Link>
          </Button>
        </div>
        
        <MovieGrid 
          movies={featuredData?.results.slice(0, 10) || []} 
          isLoading={featuredLoading}
          showGenres={true}
        />
      </div>
    </div>
  );
}

function UnauthenticatedHome() {
  const { data: featuredData, isLoading: featuredLoading } = useFeaturedMovies();
  
  return (
    <div className="container mx-auto max-w-7xl py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover the Stories Behind
          <span className="text-primary"> Every Movie</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          MovieExplained provides comprehensive movie explanations, reviews, and AI-powered 
          recommendations. Join our community of film enthusiasts and discover new perspectives 
          on your favorite movies.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/movies">Browse Movies</Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <Film className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Movie Explanations</CardTitle>
            <CardDescription>
              Detailed breakdowns of complex plots, themes, and hidden meanings in movies
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Sparkles className="h-12 w-12 text-primary mb-4" />
            <CardTitle>AI-Powered Insights</CardTitle>
            <CardDescription>
              Get personalized movie recommendations based on your preferences and viewing history
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Community Reviews</CardTitle>
            <CardDescription>
              Join discussions with fellow movie enthusiasts and share your own insights
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Curated Blog Content</CardTitle>
            <CardDescription>
              Read expertly written articles about cinema, directors, and film analysis
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Film className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Genre Classifications</CardTitle>
            <CardDescription>
              Explore movies by genre and discover hidden gems in your favorite categories
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <Sparkles className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Smart Recommendations</CardTitle>
            <CardDescription>
              Our AI analyzes your preferences to suggest movies you&apos;ll love
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      {/* Featured Movies Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Movies</h2>
          <Button variant="outline" asChild>
            <Link href="/movies">View All Movies</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mb-8">
          Discover some of our hand-picked movies with detailed explanations and insights.
        </p>
        
        <MovieGrid 
          movies={featuredData?.results.slice(0, 10) || []} 
          isLoading={featuredLoading}
          showGenres={true}
        />
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
        <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Join MovieExplained today and unlock a world of cinematic insights, 
          personalized recommendations, and engaging community discussions.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/register">Create Account</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
