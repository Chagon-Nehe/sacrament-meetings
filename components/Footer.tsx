import { WARD_NAME } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface print:hidden">
      <div className="mx-auto max-w-5xl px-4 py-5 text-sm text-muted">
        {WARD_NAME} sacrament meeting planner. Programs are subject to change by the bishopric.
      </div>
    </footer>
  );
}
