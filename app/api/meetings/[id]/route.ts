import { NextResponse } from 'next/server';
import { getMeetingById } from '@/lib/meetings-db';
import type { ApiError, SacramentMeeting } from '@/lib/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext
): Promise<NextResponse<SacramentMeeting | ApiError>> {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: 'id must be a number' }, { status: 400 });
  }

  const meeting = await getMeetingById(Number(id));
  if (!meeting) {
    return NextResponse.json({ error: `No meeting found with id ${id}` }, { status: 404 });
  }

  return NextResponse.json(meeting);
}
