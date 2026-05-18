import type { StoredBooking } from "@/lib/booking-types";

export async function createSalonCalendarEvent(_booking: StoredBooking) {
  void _booking;
  // TODO: Integrate Google Calendar API or CalDAV later. Required inputs:
  // SILVIA_GOOGLE_CALENDAR_ACCOUNT, OAuth/API credentials, calendar ID, and a
  // production database field for the external calendar event ID.
  return null;
}

export async function cancelSalonCalendarEvent(_booking: StoredBooking) {
  void _booking;
  // TODO: Delete or cancel the external calendar event after real calendar sync
  // is configured. Do not fake sync without provider credentials.
  return null;
}
