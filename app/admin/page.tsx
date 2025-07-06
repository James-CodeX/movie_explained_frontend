import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto max-w-6xl py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Administrator features will be available in future stages of development.
          </p>
          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              This section will include user management, content management, 
              analytics, and administrative tools for managing the MovieExplained platform.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export const metadata = {
  title: 'Admin Dashboard - MovieExplained',
  description: 'Administrative dashboard for MovieExplained',
};
