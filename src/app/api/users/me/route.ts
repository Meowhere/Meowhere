import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return await apiProxy(request, '/users/me');
}

export async function PATCH(request: NextRequest) {
  return await apiProxy(request, '/users/me');
}
