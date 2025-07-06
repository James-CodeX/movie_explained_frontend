import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-lg flex items-center justify-center min-h-screen py-12">
      <LoginForm />
    </div>
  );
}

export const metadata = {
  title: 'Login - MovieExplained',
  description: 'Sign in to your MovieExplained account',
};
