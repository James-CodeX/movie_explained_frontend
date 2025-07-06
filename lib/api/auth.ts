import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  LogoutRequest,
  ChangePasswordRequest,
  UpdateProfileRequest,
  UpdatePreferencesRequest,
  User,
  UserPreferences,
  ApiError,
} from '@/lib/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = Cookies.get('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          
          const { access } = response.data;
          Cookies.set('access_token', access, { expires: 1 }); // 1 day
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch {
        // Refresh failed, clear tokens and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Error handler
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response?.data) {
    const data = error.response.data as Record<string, unknown>;
    return {
      message: (data.message as string) || (data.detail as string) || 'An error occurred',
      errors: (data.errors as Record<string, string[]>) || data,
    };
  }
  return {
    message: error.message || 'Network error',
  };
};

// Auth API functions
export const authApi = {
  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/register/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/login/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Logout
  logout: async (data?: LogoutRequest): Promise<{ message: string }> => {
    try {
      const response = await api.post('/auth/logout/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Refresh token
  refreshToken: async (data: TokenRefreshRequest): Promise<TokenRefreshResponse> => {
    try {
      const response = await api.post('/auth/refresh/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Get profile
  getProfile: async (): Promise<User> => {
    try {
      const response = await api.get('/auth/profile/');
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Update profile (full)
  updateProfile: async (data: UpdateProfileRequest): Promise<User> => {
    try {
      const response = await api.put('/auth/profile/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Update profile (partial)
  updateProfilePartial: async (data: UpdateProfileRequest): Promise<User> => {
    try {
      const response = await api.patch('/auth/profile/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Get preferences
  getPreferences: async (): Promise<UserPreferences> => {
    try {
      const response = await api.get('/auth/preferences/');
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Update preferences (full)
  updatePreferences: async (data: UpdatePreferencesRequest): Promise<UserPreferences> => {
    try {
      const response = await api.put('/auth/preferences/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Update preferences (partial)
  updatePreferencesPartial: async (data: UpdatePreferencesRequest): Promise<UserPreferences> => {
    try {
      const response = await api.patch('/auth/preferences/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<{ message: string }> => {
    try {
      const response = await api.post('/auth/change-password/', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error as AxiosError);
    }
  },
};

export default api;
