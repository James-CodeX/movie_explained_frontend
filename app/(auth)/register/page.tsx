import { RegisterForm } from '@/components/auth/register-form';

export default function RegisterPage() {
  return (
    <div className="container mx-auto max-w-lg flex items-center justify-center min-h-screen py-12">
      <RegisterForm />
    </div>
  );
}

export const metadata = {
  title: 'Register - MovieExplained',
  description: 'Create a new MovieExplained account',
};
