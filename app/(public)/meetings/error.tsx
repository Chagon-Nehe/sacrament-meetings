'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error('Meetings route error:', error);
  }, [error]);

  return (
    <section
      role="alert"
      className="mx-auto max-w-xl rounded-lg border border-red-200 bg-white p-8 text-center shadow-sm"
    >
      <h1 className="text-2xl font-bold text-red-900">Something Went Wrong</h1>
      <p className="mt-2 text-sm text-slate-700">
        {error.message || 'An unexpected error occurred while loading sacrament meetings.'}
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          Try Again
        </button>
        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Back to All Meetings
        </Link>
      </div>
    </section>
  );
}
