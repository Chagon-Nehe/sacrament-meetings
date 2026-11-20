import type { Metadata } from 'next';
import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import { Pagination } from '@/components/Pagination';
import { getMeetings, getMeetingsTotalPages } from '@/lib/meetings-db';
import { getMostRecentSunday, toISODate } from '@/lib/dates';

export const metadata: Metadata = { title: 'All programs' };

export default async function MeetingsPage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  const currentDate = toISODate(getMostRecentSunday());

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Meeting programs</h1>

      <Suspense fallback={<div>Loading search...</div>}>
        <MeetingSearch />
      </Suspense>

      {meetings.length === 0 ? (
        <p className="text-muted">No programs have been planned yet.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 justify-center items-center bg-gray-100 p-4 mb-4">
          {meetings.map((meeting) => (
            <li key={meeting.id}>
              <MeetingCard
                meeting={meeting}
                isCurrent={meeting.date === currentDate}
              />
            </li>
          ))}
        </ul>
      )}

      <Suspense fallback={<div>Loading pagination...</div>}>
        <Pagination totalPages={totalPages} />
      </Suspense>
    </div>
  );
}