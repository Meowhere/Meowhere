import { apiProxy } from '@/src/lib/api/apiProxy';
import { NextRequest } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;
  const fullPath = `/my-activities/${activityId}`;

  return await apiProxy(req, fullPath);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ activityId: string }> }
) {
  const { activityId } = await params;
  const fullPath = `/my-activities/${activityId}`;

  return await apiProxy(req, fullPath);
}
