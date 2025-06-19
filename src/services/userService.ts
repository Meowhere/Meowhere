// src/services/userService.ts
import { fetchFromClient } from '../lib/fetch/fetchFromClient';
import { User } from '../types/user.types';

export const getMe = async (): Promise<User> => {
  const res = await fetchFromClient('/users/me');
  if (!res.ok) throw new Error('내 정보를 불러올 수 없습니다.');
  return res.json();
};

export const patchMe = async (payload: Partial<User>): Promise<User> => {
  const res = await fetchFromClient('/users/me', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error: ${res.status}`);
  }
  return res.json();
};
