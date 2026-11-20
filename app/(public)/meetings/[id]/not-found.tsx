import Link from 'next/link';

export default function MeetingNotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl font-semibold">Meeting not found</h1>
      <p className="text-muted">
        There is no program with that ID. Pick one from the list instead.
      </p>
      <Link href="/meetings" className="font-medium text-brand underline underline-offset-4">
        Back to all programs
      </Link>
    </div>
  );
}
