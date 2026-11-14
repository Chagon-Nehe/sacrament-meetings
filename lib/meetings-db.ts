import type { SacramentMeeting } from './types';
import { addWeeks, getMostRecentSunday, toISODate } from './dates';

// Temporary in-memory data. Dates are built relative to the most recent
// Sunday so /meetings/current always has a matching record.
function buildMeetings(): SacramentMeeting[] {
  const thisSunday = getMostRecentSunday();
  const on = (weeksFromNow: number): string =>
    toISODate(addWeeks(thisSunday, weeksFromNow));

  return [
    {
      id: 1,
      date: on(-4),
      meetingType: 'regular',
      presiding: 'Bishop Daniel Mwale',
      conducting: 'Brother Peter Banda',
      announcements: ['Ward temple night is Thursday at 6:30 pm.'],
      openingHymn: { number: 2, title: 'The Spirit of God' },
      openingPrayer: 'Sister Grace Phiri',
      wardBusiness: [{ description: 'Sustaining of Brother James Kamanga as ward clerk.' }],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [
        { name: 'Sister Ruth Chirwa', topic: 'Gratitude in daily life', type: 'speaker' },
        { name: 'Primary children', topic: 'Love One Another', type: 'musical-number' },
        { name: 'Brother Joseph Tembo', topic: 'Serving one by one', type: 'speaker' },
      ],
      closingHymn: { number: 85, title: 'How Firm a Foundation' },
      closingPrayer: 'Brother Isaac Moyo',
    },
    {
      id: 2,
      date: on(-3),
      meetingType: 'testimony',
      presiding: 'Bishop Daniel Mwale',
      conducting: 'Brother Peter Banda',
      announcements: ['Fast offering donations can be given to the bishopric after the meeting.'],
      openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
      openingPrayer: 'Brother Samuel Nyirenda',
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
      speakers: [],
      closingHymn: { number: 136, title: 'I Know That My Redeemer Lives' },
      closingPrayer: 'Sister Esther Gondwe',
    },
    {
      id: 3,
      date: on(-2),
      meetingType: 'regular',
      presiding: 'Bishop Daniel Mwale',
      conducting: 'Brother Peter Banda',
      openingHymn: { number: 1, title: 'The Morning Breaks' },
      openingPrayer: 'Brother Henry Zulu',
      wardBusiness: [
        { description: 'Release of Sister Alice Mbewe as Primary secretary.' },
        { description: 'Sustaining of Sister Mary Kachingwe as Primary secretary.' },
      ],
      stakeBusiness: true,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [
        { name: 'Brother Moses Lungu', topic: 'Keeping a family prayer', type: 'speaker' },
        { name: 'Sister Naomi Banda', topic: 'Come, Follow Me: the week ahead', type: 'speaker' },
      ],
      closingHymn: { number: 249, title: 'Called to Serve' },
      closingPrayer: 'Sister Faith Mkandawire',
    },
    {
      id: 4,
      date: on(-1),
      meetingType: 'general',
      presiding: 'President of the Church',
      conducting: 'General conference broadcast',
      announcements: ['Meet in the chapel to watch the broadcast together.'],
      openingHymn: { number: 2, title: 'The Spirit of God' },
      openingPrayer: 'Per the broadcast',
      wardBusiness: [],
      stakeBusiness: false,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [],
      closingHymn: { number: 3, title: 'Now Let Us Rejoice' },
      closingPrayer: 'Per the broadcast',
    },
    {
      id: 5,
      date: on(0),
      meetingType: 'regular',
      presiding: 'Bishop Daniel Mwale',
      conducting: 'Brother Peter Banda',
      announcements: [
        'Youth activity on Wednesday at 5:00 pm.',
        'Ward choir practice follows the meeting.',
      ],
      openingHymn: { number: 5, title: 'High on the Mountain Top' },
      openingPrayer: 'Sister Joyce Msiska',
      wardBusiness: [{ description: 'Sustaining of Brother Paul Gama as Sunday School president.' }],
      stakeBusiness: false,
      sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
      speakers: [
        { name: 'Brother Andrew Sakala', topic: 'Finding peace in Christ', type: 'speaker' },
        { name: 'Ward choir', topic: 'Abide with Me', type: 'musical-number' },
        { name: 'Sister Patricia Ngwira', topic: 'Strengthening our testimonies', type: 'speaker' },
      ],
      closingHymn: { number: 308, title: 'Love One Another' },
      closingPrayer: 'Brother David Kumwenda',
    },
    {
      id: 6,
      date: on(1),
      meetingType: 'stake',
      presiding: 'President Elias Mhango',
      conducting: 'Stake presidency',
      announcements: ['Stake conference is held at the stake center. No ward meeting this Sunday.'],
      openingHymn: { number: 2, title: 'The Spirit of God' },
      openingPrayer: 'Assigned by the stake presidency',
      wardBusiness: [],
      stakeBusiness: true,
      sacramentHymn: { number: 169, title: 'As Now We Take the Sacrament' },
      speakers: [
        { name: 'Stake presidency', topic: 'Stake priorities for the year', type: 'speaker' },
      ],
      closingHymn: { number: 249, title: 'Called to Serve' },
      closingPrayer: 'Assigned by the stake presidency',
    },
  ];
}

export function getMeetings(date?: string): SacramentMeeting[] {
  const all = buildMeetings();
  return date ? all.filter((m) => m.date === date) : all;
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return buildMeetings().find((m) => m.id === id);
}
