import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { TokenType } from '@/src/types/api.types';
import { logger } from '@/src/lib/api/logger';
import {
  getRequestBody,
  getTokenFromCookies,
  buildHeaders,
  buildFetchOptions,
} from '@/src/lib/api/api-helpers';
import {
  createSuccessResponse,
  createErrorResponse,
  createInternalErrorResponse,
} from '@/src/lib/api/response-helpers';
import { handleTokenRefresh } from '@/src/lib/api/token-refresh';

export async function apiProxy(
  req: NextRequest,
  endpoint: string,
  tokenType: TokenType = 'accessToken'
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const requestBody = await getRequestBody(req);

  async function makeApiRequest(useToken?: string): Promise<{
    response: Response;
    isSuccess: boolean;
  }> {
    const token = useToken || getTokenFromCookies(cookieStore, tokenType);
    const headers = buildHeaders(token);
    const fetchOptions = buildFetchOptions(req, headers, requestBody);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
        fetchOptions
      );

      return { response, isSuccess: response.ok };
    } catch (error) {
      logger.error('API 요청 실패', error);
      throw error;
    }
  }

  try {
    const { response: firstResponse, isSuccess } = await makeApiRequest();

    if (isSuccess) {
      return await createSuccessResponse(firstResponse);
    }

    // 401 에러시 토큰 갱신
    if (firstResponse.status === 401 && tokenType === 'accessToken') {
      return await handleTokenRefresh(req, makeApiRequest, firstResponse);
    }

    return await createErrorResponse(firstResponse);
  } catch (error) {
    logger.error('프록시 에러', error);
    return createInternalErrorResponse(error);
  }
}
