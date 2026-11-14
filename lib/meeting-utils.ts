import type { MeetingType } from './types';

const LABELS: Record<MeetingType, string> = {
  regular: 'Regular meeting',
  testimony: 'Fast and testimony meeting',
  stake: 'Stake conference',
  general: 'General conference',
};

export function meetingTypeLabel(type: MeetingType): string {
  return LABELS[type];
}

// Stake and general conference Sundays have no ward sacrament service.
export function hasSacrament(type: MeetingType): boolean {
  return type === 'regular' || type === 'testimony';
}
