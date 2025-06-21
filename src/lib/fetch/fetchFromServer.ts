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

    // 응답 데이터를 미리 읽어서 NextResponse로 반환
    const responseData = await response.text();

    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    logger.error('fetchFromServer error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
