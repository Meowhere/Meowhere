import { User } from './user.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user?: User;
  error?: string;
}

export interface KakaoLoginRequest {
  redirectUri: string;
  token: string;
}

export interface KakaoSignUpRequest {
  nickname: string;
  redirectUri: string;
  token: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface SignUpResponse {
  message: string;
  success?: string;
  user?: User;
  error?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}
