import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const res = await apiProxy(request, '/users');
  if (!res.ok) {
    return res;
  }
  const data = await res.json();
  const response = NextResponse.json(
    {
      message: '회원가입 성공',
      success: true,
      user: data,
    },
    { status: 200 }
  );
  return response;
}
