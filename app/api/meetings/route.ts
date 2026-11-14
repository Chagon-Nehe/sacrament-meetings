import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';
import type { ApiError, SacramentMeeting } from '@/lib/types';

// GET /api/meetings
// GET /api/meetings?date=2026-05-03
export async function GET(
  request: Request
): Promise<NextResponse<SacramentMeeting[] | ApiError>> {
  const date = new URL(request.url).searchParams.get('date');

  if (date !== null && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'date must use the format YYYY-MM-DD' }, { status: 400 });
  }

  return NextResponse.json(getMeetings(date ?? undefined));
}
