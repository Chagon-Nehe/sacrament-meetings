'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createMeetingInDb,
  deleteMeetingInDb,
  updateMeetingInDb,
} from './meetings-db';
import type { MeetingFormState } from './meeting-form-state';

const hymnNumber = z
  .string()
  .trim()
  .min(1, 'Hymn number is required.')
  .transform(Number)
  .pipe(
    z
      .number()
      .int('Hymn number must be a whole number.')
      .min(0, 'Hymn number cannot be negative.')
      .max(400, 'Hymn number must be 400 or less.'),
  );

const MeetingFormSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD).')
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
    }, 'Please enter a valid date (YYYY-MM-DD).'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general'], {
    message: 'Select a valid meeting type.',
  }),
  presiding: z.string().trim().min(2, 'Presiding leader is required.'),
  conducting: z.string().trim().min(2, 'Conducting leader is required.'),
  openingHymnNumber: hymnNumber,
  openingHymnTitle: z.string().trim().min(1, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(2, 'Opening prayer name is required.'),
  sacramentHymnNumber: hymnNumber,
  sacramentHymnTitle: z.string().trim().min(1, 'Sacrament hymn title is required.'),
  closingHymnNumber: hymnNumber,
  closingHymnTitle: z.string().trim().min(1, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(2, 'Closing prayer name is required.'),
  stakeBusiness: z.boolean().default(false),
  announcementsText: z.string().optional().default(''),
  wardBusinessText: z.string().optional().default(''),
  speakersText: z.string().optional().default(''),
});

type ParsedMeetingForm = z.infer<typeof MeetingFormSchema>;

function parseFormToInput(parsed: ParsedMeetingForm) {
  const announcements = parsed.announcementsText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const wardBusiness = parsed.wardBusinessText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((description) => ({ description }));

  // Format each line as "Name | Topic | speaker" or "Name | Topic | musical-number"
  const speakers = parsed.speakersText
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, topicPart, typePart] = line.split('|').map((s) => s.trim());
      const itemType = typePart === 'musical-number' ? 'musical-number' : 'speaker';
      return {
        name: namePart || 'Speaker',
        topic: topicPart || '',
        type: itemType as 'speaker' | 'musical-number',
      };
    });

  return {
    date: parsed.date,
    meetingType: parsed.meetingType,
    presiding: parsed.presiding,
    conducting: parsed.conducting,
    announcements,
    openingHymn: {
      number: parsed.openingHymnNumber,
      title: parsed.openingHymnTitle,
    },
    openingPrayer: parsed.openingPrayer,
    wardBusiness,
    stakeBusiness: parsed.stakeBusiness,
    sacramentHymn: {
      number: parsed.sacramentHymnNumber,
      title: parsed.sacramentHymnTitle,
    },
    speakers,
    closingHymn: {
      number: parsed.closingHymnNumber,
      title: parsed.closingHymnTitle,
    },
    closingPrayer: parsed.closingPrayer,
  };
}

function extractRawFormData(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    announcementsText: formData.get('announcementsText') ?? '',
    wardBusinessText: formData.get('wardBusinessText') ?? '',
    speakersText: formData.get('speakersText') ?? '',
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  const validated = MeetingFormSchema.safeParse(extractRawFormData(formData));

  if (!validated.success) {
    return {
      message: 'Please fix the highlighted fields before saving.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await createMeetingInDb(parseFormToInput(validated.data));
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Unable to save the new sacrament meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  if (!Number.isInteger(id) || id <= 0) {
    return { message: 'Invalid meeting ID.' };
  }

  const validated = MeetingFormSchema.safeParse(extractRawFormData(formData));

  if (!validated.success) {
    return {
      message: 'Please fix the highlighted fields before updating.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateMeetingInDb(id, parseFormToInput(validated.data));
    if (!updated) {
      return { message: 'Meeting record was not found.' };
    }
  } catch (error) {
    console.error(`Failed to update meeting ${id}:`, error);
    throw new Error('Unable to update the sacrament meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid meeting ID.');
  }

  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error(`Failed to delete meeting ${id}:`, error);
    throw new Error('Unable to delete the sacrament meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}