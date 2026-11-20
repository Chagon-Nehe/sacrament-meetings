import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import MeetingDetail from '@/components/MeetingDetail';
import PrintButton from '@/components/PrintButton';
import { fetchMeeting } from '@/lib/api';
import { formatShortDate } from '@/lib/dates';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MeetingPageProps): Promise<Metadata> {
  const { id } = await params;
  const meeting = await fetchMeeting(id);
  return { title: meeting ? `Program for ${formatShortDate(meeting.date)}` : 'Meeting not found' };
}

async function MeetingContent({ params }: MeetingPageProps) {
  const { id } = await params;
  const meeting = await fetchMeeting(id);

  if (!meeting) notFound();

  return <MeetingDetail meeting={meeting} />;
}

async function Connection() {
  await connection();
  return null;
}

function DynamicMarker() {
  return (
    <Suspense>
      <Connection />
    </Suspense>
  );
}

function MeetingDetailSkeleton() {
  return (
    <article
      aria-busy="true"
      className="space-y-4 rounded-lg border border-line bg-surface p-6 sm:p-8"
    >
      <p className="text-muted">Loading meeting program...</p>
    </article>
  );
}

export default function MeetingPage({ params }: MeetingPageProps) {
  return (
    <>
      <DynamicMarker />
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
          <Link href="/meetings" className="text-sm font-medium text-brand underline underline-offset-4">
            Back to all programs
          </Link>
          <PrintButton />
        </div>
        <Suspense fallback={<MeetingDetailSkeleton />}>
          <MeetingContent params={params} />
        </Suspense>
      </div>
    </>
  );
}
