import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '@/src/constants/api';

export async function apiProxy(
  req: NextRequest,
  endpoint: string,
  tokenType: 'accessToken' | null = 'accessToken'
): Promise<NextResponse> {
  const cookieStore = await cookies();

  let requestBody: string | null = null;
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    try {
      requestBody = await req.text();
    } catch (error) {
      console.log('Body read error:', error);
      requestBody = null;
    }
  }

  // API 요청 함수
  async function makeApiRequest(
    useToken?: string
  ): Promise<{ response: Response; isSuccess: boolean }> {
    let token: string | undefined = useToken;

    // 토큰이 직접 제공되지 않은 경우 쿠키에서 가져오기
    if (!token) {
      if (tokenType === 'accessToken') {
        token = cookieStore.get('accessToken')?.value;
      } else if (tokenType === 'refreshToken') {
        token = cookieStore.get('refreshToken')?.value;
      }
    }

    // 헤더 설정
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    // 토큰 있으면 헤더 추가
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const fetchOptions: RequestInit = {
      method: req.method,
      headers,
    };

    // POST, PUT, PATCH은 바디 설정
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && requestBody !== null) {
      fetchOptions.body = requestBody;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
        fetchOptions
      );

      return { response, isSuccess: response.ok };
    } catch (error) {
      throw error;
    }
  }

  try {
    // 첫 번째 API 요청 시도
    const { response: firstResponse, isSuccess } = await makeApiRequest();

    // 요청이 성공하면 결과 반환
    if (isSuccess) {
      const data = await firstResponse.json();
      return NextResponse.json(data, { status: firstResponse.status });
    }

    // 401 에러이고 accessToken을 사용하는 경우 토큰 갱신 시도
    if (firstResponse.status === 401 && tokenType === 'accessToken') {
      console.log('토큰이 만료되어 갱신중...');

      const res = await fetch(`${BASE_URL}/api/auth/tokens`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Cookie: req.headers.get('cookie') || '',
        },
      });
      const data = await res.json();
      const { accessToken } = data;
      console.log('새토큰:', data);

      if (accessToken) {
        console.log('토큰 갱신 성공, 리퀘스트 재시도 중...');

        // 새로운 토큰으로 다시 요청
        const { response: retryResponse, isSuccess: retrySuccess } =
          await makeApiRequest(accessToken);

        if (retrySuccess) {
          const data = await retryResponse.json();
          const response = NextResponse.json(data, {
            status: retryResponse.status,
          });

          // 새로운 액세스 토큰을 응답 쿠키에 설정
          response.cookies.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7일
            path: '/',
          });

          return response;
        } else {
          // 재시도도 실패한 경우
          const errorData = await retryResponse.json().catch(() => ({}));
          return NextResponse.json(
            { error: errorData.message || 'External API Error', ...errorData },
            { status: retryResponse.status }
          );
        }
      } else {
        // 토큰 갱신 실패 - 로그인 필요
        return NextResponse.json(
          {
            error: '인증 실패',
            message: '다시 로그인해주세요',
            requiresLogin: true,
          },
          { status: 401 }
        );
      }
    }

    // 401이 아니면 에러 반환
    const errorData = await firstResponse.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.message || 'External API Error', ...errorData },
      { status: firstResponse.status }
    );
  } catch (error) {
    console.log('Proxy Error:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
