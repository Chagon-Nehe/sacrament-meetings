import { headers } from 'next/headers';
import type { SacramentMeeting } from './types';

// Server components can't fetch relative URLs, so build the origin from
// the incoming request headers.
async function getOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get('x-forwarded-host') ?? h.get('host') ?? 'localhost:3000';
  const proto =
    h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export async function fetchMeetings(): Promise<SacramentMeeting[]> {
  const res = await fetch(`${await getOrigin()}/api/meetings`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Could not load meetings (status ${res.status})`);
  return (await res.json()) as SacramentMeeting[];
}

// Returns null for a bad id (400) or a missing meeting (404).
export async function fetchMeeting(id: string): Promise<SacramentMeeting | null> {
  const res = await fetch(`${await getOrigin()}/api/meetings/${encodeURIComponent(id)}`, {
    cache: 'no-store',
  });
  if (res.status === 400 || res.status === 404) return null;
  if (!res.ok) throw new Error(`Could not load meeting (status ${res.status})`);
  return (await res.json()) as SacramentMeeting;
}
