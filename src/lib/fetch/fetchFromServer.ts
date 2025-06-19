import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { BASE_API_URL } from '../../constants/api';
import { handleTokenRefresh } from '../../utils/token-refresh';
import {
  createSuccessResponse,
  createErrorResponse,
  createInternalErrorResponse,
} from '../../utils/response-helpers';
import { logger } from '@/src/utils/logger';

export async function fetchFromServer(
  path: string,
  options: RequestInit = {}
): Promise<NextResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const makeApiRequest = async (token?: string) => {
      const res = await fetch(`${BASE_API_URL}${path}`, {
        ...options,
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
          ...(token || accessToken ? { Authorization: `Bearer ${token || accessToken}` } : {}),
        },
      });

      return {
        response: res,
        isSuccess: res.ok,
      };
    };

    const { response, isSuccess } = await makeApiRequest();

    // 401 에러 (토큰 만료)인 경우 토큰 갱신 시도
    if (response.status === 401) {
      const refreshResult = await handleTokenRefresh(makeApiRequest, response);
      return refreshResult;
    }

    // 성공 응답 처리
    if (isSuccess) {
      return await createSuccessResponse(response);
    }

    // 에러 응답 처리
    return await createErrorResponse(response);
  } catch (error) {
    logger.error('fetchFromServer error:', error);
    // 네트워크 에러나 기타 예외를 내부 에러로 처리
    return createInternalErrorResponse(error);
  }
}
