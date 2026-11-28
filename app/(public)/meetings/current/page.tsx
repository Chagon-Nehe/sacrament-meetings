import { Suspense } from 'react';
import { io } from 'next/cache';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';
import { getMostRecentSunday, toISODate } from '@/lib/dates';

export const instant = false;

// Sends the visitor to this Sunday's program. If nothing is planned for
// that date, falls back to the latest earlier program, then to the list.
export default function CurrentMeetingPage() {
  return (
    <Suspense fallback={<p role="status">Finding this Sunday&apos;s program...</p>}>
      <CurrentMeetingRedirect />
    </Suspense>
  );
}

async function CurrentMeetingRedirect() {
  await io();
  const sunday = toISODate(getMostRecentSunday());
  const meetings = await getMeetings();

  const exact = meetings.find((m) => m.date === sunday);
  if (exact) return redirect(`/meetings/${exact.id}`);

  const earlier = meetings
    .filter((m) => m.date < sunday)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  if (earlier) return redirect(`/meetings/${earlier.id}`);

  return redirect('/meetings');
}