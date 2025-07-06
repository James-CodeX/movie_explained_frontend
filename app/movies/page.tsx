export default function MoviesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Movies</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Movie listings and explanations will be available in the next stage of development.
        </p>
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            This section will feature comprehensive movie listings, detailed explanations, 
            and AI-powered recommendations based on your preferences.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Movies - MovieExplained',
  description: 'Discover and explore movies with detailed explanations',
};
