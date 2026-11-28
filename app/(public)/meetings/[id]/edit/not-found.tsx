import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <section className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-blue-950">Meeting Not Found</h1>
      <p className="mt-2 text-sm text-slate-600">
        The sacrament meeting you tried to edit does not exist or may have been removed.
      </p>
      <Link
        href="/meetings"
        className="mt-6 inline-block rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
      >
        Return to Meetings
      </Link>
    </section>
  );
}