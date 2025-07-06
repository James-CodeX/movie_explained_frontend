export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Movie blog posts and articles will be available in the next stage of development.
        </p>
        <div className="bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-muted-foreground">
            This section will feature curated blog posts about movies, directors, 
            film analysis, and cinema insights from our expert writers.
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Blog - MovieExplained',
  description: 'Read movie blog posts and cinema insights',
};
