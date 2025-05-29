import { authProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // 쿼리 파라미터 처리
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const endpoint = `/activities${queryString ? `?${queryString}` : ''}`;

  // 체험 목록 조회는 인증 불필요
  return authProxy(request, endpoint);
}

export async function POST(request: NextRequest) {
  // 체험 등록은 인증 필요
  return authProxy(request, '/activities');
}
