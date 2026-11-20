import { cacheLife } from 'next/cache';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import { getMostRecentSunday, toISODate } from '@/lib/dates';
export const instant = false;
async function getCurrentMeetingData() {
  'use cache';
  cacheLife('days');
  return {
    sunday: toISODate(getMostRecentSunday()),
    meetings: await getMeetings(),
  };
}

// Sends the visitor to this Sunday's program. If nothing is planned for
// that date, falls back to the latest earlier program, then to the list.
export default async function CurrentMeetingPage() {
  const { sunday, meetings } = await getCurrentMeetingData();

  const exact = meetings.find((m) => m.date === sunday);
  if (exact) redirect(`/meetings/${exact.id}`);

  const earlier = meetings
    .filter((m) => m.date < sunday)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  if (earlier) redirect(`/meetings/${earlier.id}`);

  redirect('/meetings');
}




