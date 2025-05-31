import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TokenRefreshResponse } from '@/src/types/api.types';
import { logger } from './logger';
import {
  createSuccessResponse,
  createErrorResponse,
  createLoginRequiredResponse,
} from './response-helpers';

export async function handleTokenRefresh(
  makeApiRequest: (
    token?: string
  ) => Promise<{ response: Response; isSuccess: boolean }>,
  originalResponse: Response
): Promise<NextResponse> {
  logger.info('토큰 만료 감지, 갱신 시도 중...');

  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      logger.warn('RefreshToken이 없음');
      return createLoginRequiredResponse();
    }

    const tokenRefreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tokens`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    );

    if (!tokenRefreshResponse.ok) {
      logger.warn('토큰 갱신 실패', tokenRefreshResponse.status);
      return createLoginRequiredResponse();
    }

    const tokenData: TokenRefreshResponse = await tokenRefreshResponse.json();
    const { accessToken } = tokenData;

    if (!accessToken) {
      logger.warn('새 액세스 토큰을 받지 못함');
      return createLoginRequiredResponse();
    }

    logger.info('토큰 갱신 성공, 원본 요청 재시도 중...');

    const { response: retryResponse, isSuccess: retrySuccess } =
      await makeApiRequest(accessToken);

    if (retrySuccess) {
      const successResponse = await createSuccessResponse(retryResponse);

      successResponse.cookies.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1일
        path: '/',
      });

      return successResponse;
    } else {
      logger.warn('토큰 갱신 후 재시도 실패');
      return await createErrorResponse(retryResponse);
    }
  } catch (error) {
    logger.error('토큰 갱신 처리 중 에러', error);
    return await createErrorResponse(originalResponse);
  }
}
