import { ProtectedRoute } from '@/components/auth/protected-route';
import { PreferencesForm } from '@/components/profile/preferences-form';

export default function PreferencesPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Preferences</h1>
          <p className="text-muted-foreground">
            Customize your MovieExplained experience with your favorite genres and settings.
          </p>
        </div>
        <PreferencesForm />
      </div>
    </ProtectedRoute>
  );
}

export const metadata = {
  title: 'Preferences - MovieExplained',
  description: 'Customize your MovieExplained experience',
};
