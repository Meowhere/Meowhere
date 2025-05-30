import { apiProxy } from '@/src/lib/api/apiProxy';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const currentRefreshToken = cookieStore.get('refreshToken')?.value;

  if (!currentRefreshToken) {
    return NextResponse.json(
      { error: 'Refresh Token이 없습니다.' },
      { status: 401 }
    );
  }

  const res = await apiProxy(request, '/auth/tokens', 'refreshToken');
  const data = await res.json();
  const { accessToken, refreshToken } = data;

  if (!accessToken) {
    return NextResponse.json(
      { error: '인증 토큰을 받지 못했습니다.' },
      { status: 500 }
    );
  }

  const response = NextResponse.json(
    {
      message: '토큰 갱신 성공',
    },
    { status: 200 }
  );

  // 쿠키 설정
  // accessToken
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: '/',
  });

  // refreshToken
  response.cookies.set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30, // 30일
    path: '/',
  });

  return response;
}
