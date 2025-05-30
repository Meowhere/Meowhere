import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function apiProxy(
  req: NextRequest,
  endpoint: string,
  tokenType: 'accessToken' | 'refreshToken' | null = 'accessToken'
): Promise<NextResponse> {
  const cookieStore = await cookies();
  let token: string | undefined;

  // tokenType에 따라 다른 쿠키에서 토큰을 가져옴
  if (tokenType === 'accessToken') {
    token = cookieStore.get('accessToken')?.value;
  } else if (tokenType === 'refreshToken') {
    token = cookieStore.get('refreshToken')?.value;
  }

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

  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    const body = await req.text();
    fetchOptions.body = body;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
      fetchOptions
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'External API Error', ...errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
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
