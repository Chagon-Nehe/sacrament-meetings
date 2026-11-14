'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
  href: string;
  label: string;
}

interface NavLinksProps {
  items: NavItem[];
  label: string;
  variant?: 'header' | 'section';
}

const STYLES = {
  header: {
    base: 'rounded px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10',
    active: 'bg-white/20',
  },
  section: {
    base: 'rounded px-3 py-1.5 text-sm font-medium text-brand hover:bg-brand-soft',
    active: 'bg-brand-soft underline underline-offset-4',
  },
};

export default function NavLinks({ items, label, variant = 'header' }: NavLinksProps) {
  const pathname = usePathname();
  const styles = STYLES[variant];

  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-1">
        {items.map((item) => {
          const active =
            item.href === '/'
              ? pathname === '/'
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`${styles.base} ${active ? styles.active : ''}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
