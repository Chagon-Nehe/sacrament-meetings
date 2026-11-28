import type { Metadata } from 'next';
import Link from 'next/link';
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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Meeting programs</h1>
        <Link
          href="/meetings/new"
          className="rounded bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          New program
        </Link>
      </div>

      <Suspense fallback={<div>Loading search...</div>}>
        <MeetingSearch />
      </Suspense>

      {meetings.length === 0 ? (
        <p className="text-muted">No programs have been planned yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 bg-gray-100 p-4 mb-4 sm:grid-cols-2">
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