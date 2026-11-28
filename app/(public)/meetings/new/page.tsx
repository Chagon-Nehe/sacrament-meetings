import { createMeeting } from '@/lib/actions';
import MeetingForm from '@/components/MeetingForm';

export default function NewMeetingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-950">Create Sacrament Meeting</h1>
      <MeetingForm action={createMeeting} submitLabel="Create Meeting" />
    </div>
  );
}