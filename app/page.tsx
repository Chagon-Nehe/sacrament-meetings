import Image from 'next/image';
import Link from 'next/link';
import { WARD_NAME } from '@/lib/site';

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-lg border border-line bg-surface">
        <Image
          src="/hero.svg"
          alt="Illustration of a meetinghouse with a steeple at sunrise"
          width={1200}
          height={450}
          priority
          className="h-auto w-full"
        />
        <div className="space-y-4 p-6 sm:p-8">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Sunday programs for {WARD_NAME}
          </h1>
          <p className="max-w-prose text-muted">
            Leaders can plan each sacrament meeting in one place. Members can open this
            week&rsquo;s program or look back at earlier ones, and print any of them.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/meetings/current"
              className="rounded bg-brand px-5 py-2.5 font-medium text-white hover:bg-brand-dark"
            >
              Open this Sunday&rsquo;s program
            </Link>
            <Link
              href="/meetings"
              className="rounded border border-brand px-5 py-2.5 font-medium text-brand hover:bg-brand-soft"
            >
              Browse all programs
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="what-you-can-do" className="space-y-4">
        <h2 id="what-you-can-do" className="text-2xl font-semibold">
          What you can do here
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          <li className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-1 text-lg font-semibold">Review the agenda</h3>
            <p className="text-sm text-muted">
              Hymns, prayers, ward business, speakers and musical numbers, in meeting order.
            </p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-1 text-lg font-semibold">Check past weeks</h3>
            <p className="text-sm text-muted">
              Every program stays in the list, so you can see who spoke and what was sung.
            </p>
          </li>
          <li className="rounded-lg border border-line bg-surface p-5">
            <h3 className="mb-1 text-lg font-semibold">Print a copy</h3>
            <p className="text-sm text-muted">
              The print view drops the site navigation and keeps just the program.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
