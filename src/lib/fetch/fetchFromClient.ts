import { BASE_URL } from '@/src/constants/api';
import { logger } from '@/src/utils/logger';

export async function fetchFromClient(path: string, options: RequestInit = {}): Promise<Response> {
  try {
    const res = await fetch(`${BASE_URL}/api/${path}`, {
      ...options,
      credentials: 'include',
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error: ${res.status}`);
    }
    return res;
  } catch (error) {
    logger.error('fetchFromClient error:', error);
    throw new Error(
      error instanceof Error ? `Network error: ${error.message}` : 'Unknown network error'
    );
  }
}
