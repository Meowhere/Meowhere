import { BASE_URL } from '@/src/constants/api';
import { logger } from '@/src/utils/logger';

export async function fetchFromClient(path: string, options: RequestInit = {}): Promise<Response> {
  try {
    const res = await fetch(`${BASE_URL}/api/${path}`, {
      ...options,
      credentials: 'include',
    });
    if (res.status === 401 || res.status === 403) {
      console.log(`인증 실패: ${res.status} ${res.statusText}`);
      return new Response(null, { status: res.status, statusText: res.statusText });
    }
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const error = new Error(errorData.message || `HTTP error: ${res.status}`);
      throw error;
    }
    return res;
  } catch (error) {
    logger.error('fetchFromClient error:', error);
    throw new Error(error instanceof Error ? `${error.message}` : 'Unknown network error');
  }
}
