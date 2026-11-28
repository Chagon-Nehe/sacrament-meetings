import { Suspense } from 'react';
import Link from 'next/link';
import NavLinks from '@/components/NavLinks';

const SECTION_LINKS = [
  { href: '/meetings', label: 'All programs' },
  { href: '/meetings/current', label: 'This Sunday' },
  { href: '/meetings/new', label: 'New program' },
];

export default function MeetingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-line pb-3 print:hidden">
        <Suspense
          fallback={
            <nav aria-label="Meetings">
              <ul className="flex flex-wrap gap-1">
                {SECTION_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="rounded px-3 py-1.5 text-sm font-medium text-brand hover:bg-brand-soft"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          }
        >
          <NavLinks items={SECTION_LINKS} label="Meetings" variant="section" />
        </Suspense>
      </div>
      {children}
    </div>
  );
}