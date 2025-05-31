import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TokenType, TokenRefreshResponse } from '@/src/types/api.types';
import { logger } from './logger';

export async function getRequestBody(req: NextRequest): Promise<any | null> {
  const contentType = req.headers.get('content-type');

  if (!['POST', 'PUT', 'PATCH'].includes(req.method)) {
    return null;
  }

  if (contentType?.includes('multipart/form-data')) {
    return await req.formData();
  }

  try {
    return await req.text();
  } catch (error) {
    logger.warn('요청 본문 읽기 실패', error);
    return null;
  }
}

export function getTokenFromCookies(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  tokenType: TokenType
): string | undefined {
  if (!tokenType) return undefined;
  return cookieStore.get(tokenType)?.value;
}

export function buildHeaders(
  req: NextRequest,
  token?: string
): Record<string, string> {
  const contentType = req.headers.get('content-type');

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  if (!contentType?.includes('multipart/form-data')) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export function buildFetchOptions(
  req: NextRequest,
  headers: Record<string, string>,
  requestBody: string | null
): RequestInit {
  const fetchOptions: RequestInit = {
    method: req.method,
    headers,
  };

  if (['POST', 'PUT', 'PATCH'].includes(req.method) && requestBody) {
    fetchOptions.body = requestBody;
  }

  return fetchOptions;
}
