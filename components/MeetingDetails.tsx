import type { SacramentMeeting } from '@/lib/types';
import PrintButton from './PrintButton';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const isSacramentMeeting =
    meeting.meetingType === 'regular' || meeting.meetingType === 'testimony';

  return (
    <section className="mx-auto max-w-2xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm print:border-none print:shadow-none">
      <div className="mb-6 flex items-start justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Sacrament Meeting Program</h1>
          <p className="text-slate-600">
            {meeting.date} &bull; <span className="capitalize">{meeting.meetingType} Meeting</span>
          </p>
        </div>
        <PrintButton />
      </div>

      <div className="space-y-4 text-sm text-slate-800">
        <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-3">
          <p><strong>Presiding:</strong> {meeting.presiding}</p>
          <p><strong>Conducting:</strong> {meeting.conducting}</p>
        </div>

        {meeting.announcements && meeting.announcements.length > 0 && (
          <div className="border-b border-slate-100 pb-3">
            <h2 className="font-semibold text-blue-950">Announcements</h2>
            <ul className="mt-1 list-inside list-disc text-slate-700">
              {meeting.announcements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-2 border-b border-slate-100 pb-3">
          <p>
            <strong>Opening Hymn:</strong> #{meeting.openingHymn.number} &ldquo;{meeting.openingHymn.title}&rdquo;
          </p>
          <p><strong>Invocation:</strong> {meeting.openingPrayer}</p>
        </div>

        <div className="space-y-2 border-b border-slate-100 pb-3">
          <h2 className="font-semibold text-blue-950">Ward &amp; Stake Business</h2>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-inside list-disc text-slate-700">
              {meeting.wardBusiness.map((b, idx) => (
                <li key={idx}>{b.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No ward business</p>
          )}
          <p><strong>Stake Business:</strong> {meeting.stakeBusiness ? 'Yes' : 'None'}</p>
        </div>

        {isSacramentMeeting && (
          <div className="border-b border-slate-100 pb-3">
            <p>
              <strong>Sacrament Hymn:</strong> #{meeting.sacramentHymn.number} &ldquo;{meeting.sacramentHymn.title}&rdquo;
            </p>
            <p className="mt-1 italic text-slate-600">Administration of the Sacrament</p>
          </div>
        )}

        <div className="space-y-2 border-b border-slate-100 pb-3">
          <h2 className="font-semibold text-blue-950">Program</h2>
          {meeting.meetingType === 'testimony' ? (
            <p className="italic text-slate-700">Bearing of Testimonies by the Congregation</p>
          ) : meeting.speakers.length > 0 ? (
            <ul className="space-y-2">
              {meeting.speakers.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>
                    <strong>{item.type === 'musical-number' ? 'Musical Number:' : 'Speaker:'}</strong>{' '}
                    {item.name}
                  </span>
                  {item.topic && <span className="italic text-slate-600">{item.topic}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500">No speakers listed</p>
          )}
        </div>

        <div className="space-y-2 pt-1">
          <p>
            <strong>Closing Hymn:</strong> #{meeting.closingHymn.number} &ldquo;{meeting.closingHymn.title}&rdquo;
          </p>
          <p><strong>Benediction:</strong> {meeting.closingPrayer}</p>
        </div>
      </div>
    </section>
  );
}