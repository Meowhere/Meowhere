import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 쿠키에서 인증 토큰 확인
  const token = request.cookies.get('accessToken')?.value;
  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;

  // 로그인이 필요한 페이지에 비로그인 상태로 접근
  if (pathname === '/profile' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // 로그인된 상태에서 로그인 페이지 접근
  if (pathname === '/account' && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/account'],
};
