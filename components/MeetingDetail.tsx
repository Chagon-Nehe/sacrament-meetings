import type { ReactNode } from 'react';
import type { Hymn, SacramentMeeting } from '@/lib/types';
import { formatLongDate } from '@/lib/dates';
import { hasSacrament, meetingTypeLabel } from '@/lib/meeting-utils';
import { WARD_NAME } from '@/lib/site';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-4 first:border-t-0 print:break-inside-avoid">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function HymnLine({ hymn }: { hymn: Hymn }) {
  return (
    <p>
      <span className="font-medium">#{hymn.number}</span> {hymn.title}
    </p>
  );
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const sacrament = hasSacrament(meeting.meetingType);

  return (
    <article className="rounded-lg border border-line bg-surface p-6 sm:p-8 print:border-0 print:p-0">
      <header className="mb-4">
        <p className="hidden text-sm text-muted print:block">{WARD_NAME}</p>
        <h1 className="text-3xl font-semibold">{formatLongDate(meeting.date)}</h1>
        <p className="mt-1 text-muted">{meetingTypeLabel(meeting.meetingType)}</p>
        <dl className="mt-3 grid gap-1 sm:grid-cols-2">
          <div>
            <dt className="inline text-muted">Presiding: </dt>
            <dd className="inline">{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="inline text-muted">Conducting: </dt>
            <dd className="inline">{meeting.conducting}</dd>
          </div>
        </dl>
      </header>

      {!sacrament && (
        <p className="mb-4 rounded bg-brand-soft p-3 text-sm print:border print:border-black print:bg-white">
          There is no ward sacrament service at this meeting.
        </p>
      )}

      {meeting.announcements && meeting.announcements.length > 0 && (
        <Section title="Announcements">
          <ul className="list-disc space-y-1 pl-5">
            {meeting.announcements.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section title="Opening hymn">
        <HymnLine hymn={meeting.openingHymn} />
      </Section>

      <Section title="Opening prayer">
        <p>{meeting.openingPrayer}</p>
      </Section>

      <Section title="Ward business">
        {meeting.wardBusiness.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="text-muted print:text-black">No ward business.</p>
        )}
        <p className="mt-2">
          <span className="text-muted print:text-black">Stake business: </span>
          {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>
      </Section>

      {sacrament && (
        <Section title="Sacrament hymn">
          <HymnLine hymn={meeting.sacramentHymn} />
        </Section>
      )}

      <Section title={meeting.meetingType === 'testimony' ? 'Testimonies' : 'Speakers and musical numbers'}>
        {meeting.speakers.length > 0 ? (
          <ul className="space-y-2">
            {meeting.speakers.map((item) => (
              <li key={`${item.name}-${item.topic}`}>
                <span className="font-medium">{item.name}</span>
                <span className="text-muted print:text-black">
                  {' '}
                  ({item.type === 'speaker' ? 'speaker' : 'musical number'})
                </span>
                <br />
                <span className="text-sm">{item.topic}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted print:text-black">
            {meeting.meetingType === 'testimony'
              ? 'Open to members who wish to bear their testimonies.'
              : 'None scheduled.'}
          </p>
        )}
      </Section>

      <Section title="Closing hymn">
        <HymnLine hymn={meeting.closingHymn} />
      </Section>

      <Section title="Closing prayer">
        <p>{meeting.closingPrayer}</p>
      </Section>
    </article>
  );
}
