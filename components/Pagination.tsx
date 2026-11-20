'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4"
    >
      {currentPage > 1 ? (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Previous
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-3.5 py-2 text-sm font-medium text-gray-400"
        >
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-gray-700">
        Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Next
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-md border border-gray-200 bg-gray-100 px-3.5 py-2 text-sm font-medium text-gray-400"
        >
          Next
        </span>
      )}
    </nav>
  );
}