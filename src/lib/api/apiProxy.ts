import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { TokenType } from '@/src/types/api.types';
import { logger } from '@/src/utils/logger';
import {
  getRequestBody,
  getTokenFromCookies,
  buildHeaders,
  buildFetchOptions,
} from '@/src/utils/api-helpers';
import {
  createSuccessResponse,
  createErrorResponse,
  createInternalErrorResponse,
} from '@/src/utils/response-helpers';
import { handleTokenRefresh } from '@/src/utils/token-refresh';

export async function apiProxy(
  req: NextRequest,
  endpoint: string,
  tokenType: TokenType = 'accessToken'
): Promise<NextResponse> {
  console.log('cookie:', req.cookies.get('accessToken'));
  const cookieStore = await cookies();
  const requestBody = await getRequestBody(req);

  async function makeApiRequest(useToken?: string): Promise<{
    response: Response;
    isSuccess: boolean;
  }> {
    const token = useToken || getTokenFromCookies(cookieStore, tokenType);
    const headers = buildHeaders(req, token);
    const fetchOptions = buildFetchOptions(req, headers, requestBody);
    console.log(fetchOptions);

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
      return await handleTokenRefresh(makeApiRequest, firstResponse);
    }

    return await createErrorResponse(firstResponse);
  } catch (error) {
    logger.error('프록시 에러', error);
    return createInternalErrorResponse(error);
  }
}
