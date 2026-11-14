'use client';

import { startTransition, useEffect, useState } from 'react';

export default function HeaderDate() {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      setFormattedDate(
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      );
    });
  }, []);

  return <p className="text-sm text-slate-600">{formattedDate ?? '…'}</p>;
}
