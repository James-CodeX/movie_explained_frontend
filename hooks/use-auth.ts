import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth-store';
import type {
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  UpdatePreferencesRequest,
} from '@/lib/types/auth';

// Auth query keys
export const authKeys = {
  profile: ['auth', 'profile'] as const,
  preferences: ['auth', 'preferences'] as const,
};

// Login mutation
export const useLogin = () => {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.access, data.refresh);
      toast.success(data.message || 'Login successful!');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Login failed');
    },
  });
};

// Register mutation
export const useRegister = () => {
  const router = useRouter();
  const { setUser, setTokens } = useAuthStore();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setUser(data.user);
      setTokens(data.access, data.refresh);
      toast.success(data.message || 'Registration successful!');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Registration failed');
    },
  });
};

// Logout mutation
export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearAuth } = useAuthStore();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      toast.success('Logged out successfully');
      router.push('/login');
    },
    onError: (error: any) => {
      // Even if logout fails on server, clear local state
      clearAuth();
      queryClient.clear();
      toast.error(error.message || 'Logout failed');
      router.push('/login');
    },
  });
};

// Get profile query
export const useProfile = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: authKeys.profile,
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfilePartial,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.profile, data);
      toast.success('Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};

// Get preferences query
export const usePreferences = () => {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: authKeys.preferences,
    queryFn: authApi.getPreferences,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Update preferences mutation
export const useUpdatePreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updatePreferencesPartial,
    onSuccess: (data) => {
      queryClient.setQueryData(authKeys.preferences, data);
      toast.success('Preferences updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update preferences');
    },
  });
};

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: (data) => {
      toast.success(data.message || 'Password changed successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to change password');
    },
  });
};
