import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TokenRefreshResponse } from '@/src/types/api.types';
import { logger } from './logger';
import {
  createSuccessResponse,
  createErrorResponse,
  createLoginRequiredResponse,
} from './response-helpers';
import { BASE_API_URL } from '../constants/api';
import { COOKIE_OPTIONS } from '../constants/cookie';

export async function handleTokenRefresh(
  makeApiRequest: (token?: string) => Promise<{ response: Response; isSuccess: boolean }>,
  originalResponse: Response
): Promise<NextResponse> {
  logger.info('토큰 만료 감지, 갱신 시도 중...');

  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    // refreshToken이 없으면 로그인 리스폰스 보내기
    if (!refreshToken) {
      logger.warn('RefreshToken이 없음');
      return createLoginRequiredResponse();
    }
    // 토큰 갱신 요청
    const tokenRefreshResponse = await fetch(`${BASE_API_URL}/auth/tokens`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    // 토큰 갱신 실패시 로그인 요청
    if (!tokenRefreshResponse.ok) {
      logger.warn('토큰 갱신 실패', tokenRefreshResponse.status);
      return createLoginRequiredResponse();
    }
    // 토큰 갱신 후 accessToken 추출
    const tokenData: TokenRefreshResponse = await tokenRefreshResponse.json();
    const { accessToken } = tokenData;
    // accessToken을 받지 못하면 로그인 요청 리스폰스
    if (!accessToken) {
      logger.warn('새 액세스 토큰을 받지 못함');
      return createLoginRequiredResponse();
    }

    logger.info('토큰 갱신 성공, 원본 요청 재시도 중...');
    // 토큰 갱신이 성공하면 토큰을 포함하여 리퀘스트 재시도
    const { response: retryResponse, isSuccess: retrySuccess } = await makeApiRequest(accessToken);
    // 성공시 토큰을 포함한 성공 리스폰스 보내기
    if (retrySuccess) {
      const successResponse = await createSuccessResponse(retryResponse);

      successResponse.cookies.set('accessToken', accessToken, COOKIE_OPTIONS.accessToken);

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
