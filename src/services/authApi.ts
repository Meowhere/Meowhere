import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import {
  KakaoLoginRequest,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse,
} from '../types/auth.types';
import { User } from '../types/user.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const res = await fetchFromClient('/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  getMe: async (): Promise<User> => {
    const res = await fetchFromClient('/users/me', {
      method: 'GET',
      credentials: 'include',
    });

    return res.json();
  },

  signUp: async (credentials: SignUpRequest): Promise<SignUpResponse> => {
    const res = await fetchFromClient('/users', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return res.json();
  },

  logout: async () => {
    const res = await fetchFromClient('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    return res.json();
  },

  kakaoLogin: async (credentials: KakaoLoginRequest): Promise<LoginResponse> => {
    const res = await fetchFromClient('/oauth/sign-in', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return res.json();
  },
};
