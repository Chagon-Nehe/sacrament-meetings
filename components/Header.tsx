import { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { WARD_NAME } from '@/lib/site';
import { formatLongDate, toISODate } from '@/lib/dates';
import { cacheLife } from 'next/cache';

const MAIN_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings' },
];

async function getCurrentTimestamp() {
  'use cache';
  cacheLife('days');
  return Date.now();
}

export default async function Header() {
  const today = formatLongDate(toISODate(new Date(await getCurrentTimestamp())));
  return (
    <header className="bg-brand text-white print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-serif text-xl font-semibold text-white">
            {WARD_NAME}
          </Link>
          <p className="text-sm text-white/80">{today}</p>
        </div>
        <Suspense
          fallback={
            <nav aria-label="Main">
              <ul className="flex flex-wrap gap-1">
                {MAIN_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          }
        >
          <NavLinks items={MAIN_LINKS} label="Main" variant="header" />
        </Suspense>
      </div>
    </header>
  );
}
