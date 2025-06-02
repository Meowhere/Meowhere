// /api/auth/tokens/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { error: 'Refresh Token이 없습니다.' },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/tokens`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error('외부 API 에러:', res.status, errorText);
      return NextResponse.json(
        { error: '토큰 갱신 실패', details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log('외부 API 응답:', data);
    const { accessToken } = data;

    if (!accessToken) {
      return NextResponse.json(
        { error: '인증 토큰을 받지 못했습니다.' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        message: '토큰 갱신 성공',
        accessToken, // API Proxy에서 사용할 수 있도록 반환
      },
      { status: 200 }
    );

    // 쿠키 설정
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1, // 1시간
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('토큰 갱신 중 에러:', error);
    return NextResponse.json(
      {
        error: '서버 에러',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
