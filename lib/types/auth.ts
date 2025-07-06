export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  bio: string;
  profile_image: string;
  is_admin: boolean;
  date_joined: string;
  last_login: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  id: string;
  favorite_genres: string[];
  preferred_languages: string[];
  email_notifications: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_image?: string;
}

export interface AuthResponse {
  user: User;
  access: string;
  refresh: string;
  message: string;
}

export interface TokenRefreshRequest {
  refresh: string;
}

export interface TokenRefreshResponse {
  access: string;
}

export interface LogoutRequest {
  refresh?: string;
}

export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  bio?: string;
  profile_image?: string;
}

export interface UpdatePreferencesRequest {
  favorite_genres?: string[];
  preferred_languages?: string[];
  email_notifications?: boolean;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
