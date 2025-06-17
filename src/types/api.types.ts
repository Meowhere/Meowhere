export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  requiresLogin?: boolean;
}

export interface TokenRefreshResponse {
  accessToken?: string;
  error?: string;
  message?: string;
}

export type TokenType = 'accessToken' | 'refreshToken' | null;
