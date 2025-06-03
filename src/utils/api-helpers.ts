import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TokenType, TokenRefreshResponse } from '@/src/types/api.types';
import { logger } from './logger';

// 리퀘스트 유형에 따라 바디 추가
export async function getRequestBody(req: NextRequest): Promise<string | FormData | null> {
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

// 쿠키에 토큰 빼오기
export function getTokenFromCookies(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  tokenType: TokenType
): string | undefined {
  if (!tokenType) return undefined;
  return cookieStore.get(tokenType)?.value;
}

// 리퀘스트에 따라 헤더 설정
export function buildHeaders(req: NextRequest, token?: string): Record<string, string> {
  const contentType = req.headers.get('content-type');

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  // 파일 타입이 아니면 헤더 추가
  if (!contentType?.includes('multipart/form-data')) {
    headers['Content-Type'] = 'application/json';
  }
  // 토큰이 필요하면 헤더에 토큰 추가
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// 최종으로 fetchOption 생성
export function buildFetchOptions(
  req: NextRequest,
  headers: Record<string, string>,
  requestBody: string | FormData | null
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
