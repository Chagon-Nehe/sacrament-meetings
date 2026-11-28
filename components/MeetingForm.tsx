'use client';

import { useActionState } from 'react';
import type { MeetingFormState } from '@/lib/meeting-form-state';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingFormProps {
  action: (prevState: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  initialMeeting?: SacramentMeeting | null;
  submitLabel: string;
}

const initialState: MeetingFormState = {
  message: null,
  errors: {},
};

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return (
    <div id={id} aria-live="polite" className="mt-1 min-h-5 text-sm text-red-700">
      {errors && errors.length > 0 ? errors[0] : null}
    </div>
  );
}

export default function MeetingForm({
  action,
  initialMeeting,
  submitLabel,
}: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const defaultSpeakersText = initialMeeting?.speakers
    ? initialMeeting.speakers
        .map((s) => `${s.name} | ${s.topic} | ${s.type}`)
        .join('\n')
    : '';

  const defaultAnnouncementsText = initialMeeting?.announcements?.join('\n') ?? '';
  const defaultWardBusinessText =
    initialMeeting?.wardBusiness?.map((w) => w.description).join('\n') ?? '';

  return (
    <form
      action={formAction}
      noValidate
      className="mx-auto max-w-2xl space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-md border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-800"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-800">
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialMeeting?.date ?? ''}
            aria-describedby="date-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="date-error" errors={state.errors?.date} />
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-slate-800">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={initialMeeting?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError id="meetingType-error" errors={state.errors?.meetingType} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-slate-800">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={initialMeeting?.presiding ?? ''}
            aria-describedby="presiding-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="presiding-error" errors={state.errors?.presiding} />
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-slate-800">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={initialMeeting?.conducting ?? ''}
            aria-describedby="conducting-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="conducting-error" errors={state.errors?.conducting} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-slate-800">
            Opening Hymn Number
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={initialMeeting?.openingHymn.number ?? ''}
            aria-describedby="openingHymnNumber-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="openingHymnNumber-error" errors={state.errors?.openingHymnNumber} />
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-slate-800">
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={initialMeeting?.openingHymn.title ?? ''}
            aria-describedby="openingHymnTitle-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="openingHymnTitle-error" errors={state.errors?.openingHymnTitle} />
        </div>
      </div>

      <div>
        <label htmlFor="openingPrayer" className="block text-sm font-medium text-slate-800">
          Opening Prayer (Invocation)
        </label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={initialMeeting?.openingPrayer ?? ''}
          aria-describedby="openingPrayer-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <FieldError id="openingPrayer-error" errors={state.errors?.openingPrayer} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-slate-800">
            Sacrament Hymn Number
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={initialMeeting?.sacramentHymn.number ?? ''}
            aria-describedby="sacramentHymnNumber-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="sacramentHymnNumber-error" errors={state.errors?.sacramentHymnNumber} />
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-slate-800">
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={initialMeeting?.sacramentHymn.title ?? ''}
            aria-describedby="sacramentHymnTitle-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="sacramentHymnTitle-error" errors={state.errors?.sacramentHymnTitle} />
        </div>
      </div>

      <div>
        <label htmlFor="speakersText" className="block text-sm font-medium text-slate-800">
          Speakers &amp; Musical Numbers (one per line: Name | Topic | speaker or musical-number)
        </label>
        <textarea
          id="speakersText"
          name="speakersText"
          rows={3}
          defaultValue={defaultSpeakersText}
          aria-describedby="speakersText-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <FieldError id="speakersText-error" errors={state.errors?.speakersText} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-slate-800">
            Closing Hymn Number
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={initialMeeting?.closingHymn.number ?? ''}
            aria-describedby="closingHymnNumber-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="closingHymnNumber-error" errors={state.errors?.closingHymnNumber} />
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-slate-800">
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={initialMeeting?.closingHymn.title ?? ''}
            aria-describedby="closingHymnTitle-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
          <FieldError id="closingHymnTitle-error" errors={state.errors?.closingHymnTitle} />
        </div>
      </div>

      <div>
        <label htmlFor="closingPrayer" className="block text-sm font-medium text-slate-800">
          Closing Prayer (Benediction)
        </label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={initialMeeting?.closingPrayer ?? ''}
          aria-describedby="closingPrayer-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <FieldError id="closingPrayer-error" errors={state.errors?.closingPrayer} />
      </div>

      <div>
        <label htmlFor="wardBusinessText" className="block text-sm font-medium text-slate-800">
          Ward Business (one item per line)
        </label>
        <textarea
          id="wardBusinessText"
          name="wardBusinessText"
          rows={2}
          defaultValue={defaultWardBusinessText}
          aria-describedby="wardBusinessText-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <FieldError id="wardBusinessText-error" errors={state.errors?.wardBusinessText} />
      </div>

      <div>
        <label htmlFor="announcementsText" className="block text-sm font-medium text-slate-800">
          Announcements (one per line)
        </label>
        <textarea
          id="announcementsText"
          name="announcementsText"
          rows={2}
          defaultValue={defaultAnnouncementsText}
          aria-describedby="announcementsText-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <FieldError id="announcementsText-error" errors={state.errors?.announcementsText} />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={initialMeeting?.stakeBusiness ?? false}
          aria-describedby="stakeBusiness-error"
          className="h-4 w-4 rounded border-slate-300"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-800">
          Stake Business to be Read
        </label>
        <FieldError id="stakeBusiness-error" errors={state.errors?.stakeBusiness} />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}