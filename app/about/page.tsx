export default function AboutPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">About MovieExplained</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-xl text-muted-foreground mb-8 text-center">
            Your gateway to understanding the stories behind every movie.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                MovieExplained is dedicated to helping movie enthusiasts discover and understand 
                the deeper meanings, themes, and storytelling techniques in cinema. We believe 
                that every movie has a story worth exploring.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Comprehensive movie explanations and analysis</li>
                <li>• AI-powered personalized recommendations</li>
                <li>• Curated blog content about cinema</li>
                <li>• Community discussions and reviews</li>
                <li>• Genre-based movie discovery</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-muted-foreground mb-6">
              Connect with fellow movie lovers, share your insights, and discover new 
              perspectives on the films you love. Whether you&apos;re a casual viewer or
              a serious cinephile, there&apos;s something here for everyone.
            </p>
            <p className="text-sm text-muted-foreground">
              MovieExplained - Discover the Stories Behind Every Movie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'About - MovieExplained',
  description: 'Learn about MovieExplained and our mission to explain movies',
};
