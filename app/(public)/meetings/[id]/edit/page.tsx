import { notFound } from 'next/navigation';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import MeetingForm from '@/components/MeetingForm';

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);
  if (!meeting) {
    notFound();
  }

  const boundUpdateAction = updateMeeting.bind(null, numericId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-950">Edit Sacrament Meeting</h1>
      <MeetingForm
        action={boundUpdateAction}
        initialMeeting={meeting}
        submitLabel="Save Changes"
      />
    </div>
  );
}