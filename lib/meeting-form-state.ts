export type MeetingFieldErrors = {
  date?: string[];
  meetingType?: string[];
  presiding?: string[];
  conducting?: string[];
  openingHymnNumber?: string[];
  openingHymnTitle?: string[];
  openingPrayer?: string[];
  sacramentHymnNumber?: string[];
  sacramentHymnTitle?: string[];
  closingHymnNumber?: string[];
  closingHymnTitle?: string[];
  closingPrayer?: string[];
  stakeBusiness?: string[];
  speakersText?: string[];
  announcementsText?: string[];
  wardBusinessText?: string[];
};

export type MeetingFormState = {
  message?: string | null;
  errors?: MeetingFieldErrors;
};
