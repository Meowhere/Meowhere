import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authCookies = ['accessToken', 'refreshToken'];

  const response = NextResponse.json(
    {
      message: '로그아웃 성공',
    },
    { status: 200 }
  );

  authCookies.forEach((cookieName) => {
    response.cookies.set(cookieName, '', {
      expires: new Date(0),
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  });

  return response;
}
