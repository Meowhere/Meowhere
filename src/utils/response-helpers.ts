import { NextResponse } from 'next/server';
import { logger } from './logger';

export async function createSuccessResponse(response: Response): Promise<NextResponse> {
  try {
    if (response.status === 204) {
      return NextResponse.json(
        { success: true, message: '삭제 성공' },
        { status: 200 } // 204 대신 200 사용
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    logger.error('성공 응답 JSON 파싱 실패', error);
    return NextResponse.json({ error: 'Response parsing failed' }, { status: 500 });
  }
}

export async function createErrorResponse(response: Response): Promise<NextResponse> {
  try {
    const errorData = await response.json();
    return NextResponse.json(
      {
        error: errorData.message || errorData.error || 'External API Error',
        ...errorData,
      },
      { status: response.status }
    );
  } catch (error) {
    // JSON 파싱 실패 시 텍스트로 한 번 더 시도
    try {
      const text = await response.text();
      return NextResponse.json(
        {
          error: text || 'External API Error',
        },
        { status: response.status }
      );
    } catch (e) {
      logger.error('에러 응답 파싱 실패', e);
      return NextResponse.json({ error: 'External API Error' }, { status: response.status });
    }
  }
}

export function createInternalErrorResponse(error: unknown): NextResponse {
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    },
    { status: 500 }
  );
}

export function createLoginRequiredResponse(): NextResponse {
  return NextResponse.json(
    {
      error: '인증 실패',
      message: '다시 로그인해주세요',
      requiresLogin: true,
    },
    { status: 401 }
  );
}
