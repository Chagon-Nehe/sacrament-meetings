import type { Metadata } from 'next';
import MeetingCard from '@/components/MeetingCard';
import { fetchMeetings } from '@/lib/api';
import { getMostRecentSunday, toISODate } from '@/lib/dates';

export const metadata: Metadata = { title: 'All programs' };

export default async function MeetingsPage() {
  const meetings = await fetchMeetings();
  const sorted = [...meetings].sort((a, b) => b.date.localeCompare(a.date));
  const currentDate = toISODate(getMostRecentSunday());

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Meeting programs</h1>
      {sorted.length === 0 ? (
        <p className="text-muted">No programs have been planned yet.</p>
      ) : (
        <ul className="space-y-4">
          {sorted.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard meeting={meeting} isCurrent={meeting.date === currentDate} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
