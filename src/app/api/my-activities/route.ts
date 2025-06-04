import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const queryString = url.search;

  const fullPath = `/my-activities${queryString}`;

  return await apiProxy(req, fullPath);
}
