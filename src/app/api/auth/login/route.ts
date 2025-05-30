import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const res = await apiProxy(request, '/auth/login');

    if (!res.ok) {
      return res;
    }

    const data = await res.json();
    // 토큰 추출
    const { accessToken, refreshToken, user } = data;

    if (!accessToken) {
      return NextResponse.json(
        { error: '인증 토큰을 받지 못했습니다.' },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        message: '로그인 성공',
        user: user,
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: '서버 오류가 발생했습니다.',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
