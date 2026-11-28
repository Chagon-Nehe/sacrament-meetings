import Link from 'next/link';
import { deleteMeeting } from '@/lib/actions';
import type { SacramentMeeting } from '@/lib/types';
import { formatLongDate } from '@/lib/dates';
import { meetingTypeLabel } from '@/lib/meeting-utils';

interface MeetingCardProps {
  meeting: SacramentMeeting;
  isCurrent?: boolean;
}

export default function MeetingCard({ meeting, isCurrent = false }: MeetingCardProps) {
  const speakerCount = meeting.speakers.filter((s) => s.type === 'speaker').length;
  const musicCount = meeting.speakers.length - speakerCount;

  return (
    <article className="rounded-lg border border-line bg-surface p-5 transition-shadow focus-within:shadow-md hover:shadow-md">
      <Link href={`/meetings/${meeting.id}`} className="block rounded-lg">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-semibold">{formatLongDate(meeting.date)}</h2>
          {isCurrent && (
            <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-white">
              This Sunday
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-muted">{meetingTypeLabel(meeting.meetingType)}</p>
        <dl className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
          <div>
            <dt className="inline text-muted">Presiding: </dt>
            <dd className="inline">{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="inline text-muted">Conducting: </dt>
            <dd className="inline">{meeting.conducting}</dd>
          </div>
          <div>
            <dt className="inline text-muted">Opening hymn: </dt>
            <dd className="inline">
              #{meeting.openingHymn.number}, {meeting.openingHymn.title}
            </dd>
          </div>
          <div>
            <dt className="inline text-muted">Program: </dt>
            <dd className="inline">
              {speakerCount} {speakerCount === 1 ? 'speaker' : 'speakers'}, {musicCount} musical{' '}
              {musicCount === 1 ? 'number' : 'numbers'}
            </dd>
          </div>
        </dl>
      </Link>
      <div className='mt-4 flex-col items-center gap-4'>
        <form action={deleteMeeting.bind(null, meeting.id)} className="mt-4">
        <button
          type="submit"
          aria-label={`Delete program for ${formatLongDate(meeting.date)}`}
          className='inline-flex h-9 items-center justify-center rounded-md border border-red-200 bg-white px-3 text-sm font-medium leading-none text-red-600 shadow-sm transition-colors hover:border-red-300 hover:bg-red-50'
        >
          Delete
        </button>
        </form>
        <Link href={`/meetings/${meeting.id}/edit`} className='inline-flex h-9 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-sm font-medium leading-none text-slate-700 shadow-sm transition-colors hover:bg-slate-50'>
        Edit
        </Link>
      </div>  
    </article>
  );
}
