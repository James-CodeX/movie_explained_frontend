import { ProtectedRoute } from '@/components/auth/protected-route';
import { ProfileForm } from '@/components/profile/profile-form';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and personal information.
          </p>
        </div>
        <ProfileForm />
      </div>
    </ProtectedRoute>
  );
}

export const metadata = {
  title: 'Profile - MovieExplained',
  description: 'Manage your account settings and personal information',
};
