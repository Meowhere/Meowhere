import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const url = new URL(req.url);
  const queryString = url.search;

  const fullPath = `/my-activities/${id}/reservations${queryString}`;

  return await apiProxy(req, fullPath);
}
