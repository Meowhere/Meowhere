import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  const { notificationId } = await params;

  const fullPath = `/my-notifications/${notificationId}`;

  return await apiProxy(req, fullPath);
}
