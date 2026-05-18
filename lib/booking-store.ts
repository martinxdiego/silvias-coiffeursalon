import { randomUUID } from "node:crypto";
import { siteConfig } from "@/data/site";
import { getServiceById } from "@/data/services";
import { addMinutesToTime, getTimeSlotsForDate } from "@/lib/availability";
import { cancelSalonCalendarEvent, createSalonCalendarEvent } from "@/lib/calendar-sync";
import {
  bookingStatusLabels,
  getPaymentStatus,
  paymentMethodLabels,
  type BookingRequest,
  type StoredBooking,
} from "@/lib/booking-types";
import {
  notifyCustomerAboutBooking,
  notifySalonAboutBooking,
  notifySalonAboutCancellation,
} from "@/lib/notifications";

type BookingStoreGlobal = typeof globalThis & {
  silviasBookingStore?: Map<string, StoredBooking>;
};

const globalStore = globalThis as BookingStoreGlobal;

// TODO: Replace this in-memory prototype store with Supabase, PostgreSQL/Prisma,
// MongoDB or Firebase before accepting production bookings.
const bookings = globalStore.silviasBookingStore ?? new Map<string, StoredBooking>();
globalStore.silviasBookingStore = bookings;

function minutesFromTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function isPlausiblePhone(phone: string) {
  return /^[+0-9][0-9\s()./-]{6,}$/.test(phone.trim());
}

export function createBooking(payload: BookingRequest) {
  const service = getServiceById(payload.serviceId);

  if (!service) {
    throw new Error("Bitte wähle eine gültige Leistung aus.");
  }

  if (!payload.privacyAccepted) {
    throw new Error("Bitte bestätige Datenschutz und Buchungsbedingungen.");
  }

  if (
    !payload.customerFirstName?.trim() ||
    !payload.customerLastName?.trim() ||
    !payload.customerPhone?.trim() ||
    !payload.customerEmail?.trim()
  ) {
    throw new Error("Bitte fülle Name, Telefon und E-Mail vollständig aus.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.customerEmail)) {
    throw new Error("Bitte gib eine gültige E-Mail-Adresse ein.");
  }

  if (!isPlausiblePhone(payload.customerPhone)) {
    throw new Error("Bitte gib eine gültige Telefonnummer ein.");
  }

  if (!payload.date || !payload.startTime) {
    throw new Error("Bitte wähle Datum und Uhrzeit aus.");
  }

  if (!payload.paymentMethod || !paymentMethodLabels[payload.paymentMethod]) {
    throw new Error("Bitte wähle eine Zahlungsart aus.");
  }

  const matchingSlot = getTimeSlotsForDate(payload.date, service.durationMinutes).find(
    (slot) => slot.startTime === payload.startTime,
  );

  if (!matchingSlot) {
    throw new Error("Dieser Termin ist nicht verfügbar. Bitte wähle eine andere Zeit.");
  }

  const requestedStart = minutesFromTime(payload.startTime);
  const requestedEnd = requestedStart + service.durationMinutes;
  const hasOverlap = Array.from(bookings.values()).some((booking) => {
    // TODO: Once a production database is connected, this overlap check must
    // query persisted bookings and optionally Silvia's real calendar.
    if (booking.status === "cancelled" || booking.date !== payload.date) {
      return false;
    }

    const existingStart = minutesFromTime(booking.startTime);
    const existingEnd = minutesFromTime(booking.endTime);
    return requestedStart < existingEnd && requestedEnd > existingStart;
  });

  if (hasOverlap) {
    throw new Error("Diese Zeit wurde gerade reserviert. Bitte wähle einen anderen Termin.");
  }

  const id = randomUUID();
  const bookingNumber = `SC-${id.slice(0, 8).toUpperCase()}`;
  const cancellationToken = randomUUID();
  const booking: StoredBooking = {
    id,
    bookingNumber,
    serviceId: service.id,
    serviceName: service.name,
    category: service.category,
    priceCHF: service.priceCHF,
    durationMinutes: service.durationMinutes,
    date: payload.date,
    startTime: payload.startTime,
    endTime: addMinutesToTime(payload.startTime, service.durationMinutes),
    customerFirstName: payload.customerFirstName.trim(),
    customerLastName: payload.customerLastName.trim(),
    customerPhone: payload.customerPhone.trim(),
    customerEmail: payload.customerEmail.trim(),
    customerNotes: payload.customerNotes?.trim() ?? "",
    paymentMethod: payload.paymentMethod,
    paymentStatus: getPaymentStatus(payload.paymentMethod),
    status: "pending",
    cancellationToken,
    createdAt: new Date().toISOString(),
    sendConfirmationEmail: Boolean(payload.sendConfirmationEmail),
  };

  bookings.set(id, booking);

  // TODO: Send email notification to silviadeverin@gmail.com via Resend or
  // Nodemailer-compatible SMTP. Include booking details and an ICS attachment.
  // TODO: Send customer confirmation email with the calendar event attached.
  // TODO: Create a real Google Calendar/CalDAV event for Silvia when API
  // credentials are configured.
  void notifySalonAboutBooking(booking);
  void notifyCustomerAboutBooking(booking);
  void createSalonCalendarEvent(booking);

  return booking;
}

export function getBooking(id: string) {
  return bookings.get(id);
}

export function getAllBookings() {
  return Array.from(bookings.values()).sort((a, b) =>
    `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`),
  );
}

export function findBookingForCancellation(id: string, tokenOrEmail: string) {
  const booking =
    bookings.get(id) ??
    Array.from(bookings.values()).find(
      (storedBooking) => storedBooking.bookingNumber.toLowerCase() === id.trim().toLowerCase(),
    );

  if (!booking) {
    throw new Error("Diese Buchung wurde nicht gefunden.");
  }

  const credential = tokenOrEmail.trim().toLowerCase();
  const canAccess =
    credential === booking.cancellationToken.toLowerCase() ||
    credential === booking.customerEmail.toLowerCase();

  if (!canAccess) {
    throw new Error("Buchungsnummer und E-Mail oder Stornocode passen nicht zusammen.");
  }

  return booking;
}

export function cancelBooking(id: string, tokenOrEmail: string) {
  const booking = findBookingForCancellation(id, tokenOrEmail);

  const cancelledBooking: StoredBooking = {
    ...booking,
    status: "cancelled",
    cancelledAt: new Date().toISOString(),
  };

  bookings.set(booking.id, cancelledBooking);

  // TODO: Notify Silvia about the cancellation by email and remove/cancel the
  // matching Google Calendar/CalDAV event after calendar sync is configured.
  void notifySalonAboutCancellation(cancelledBooking);
  void cancelSalonCalendarEvent(cancelledBooking);

  return cancelledBooking;
}

export function buildSalonNotification(booking: StoredBooking) {
  return [
    `Neue Terminanfrage: ${booking.bookingNumber}`,
    `Status: ${bookingStatusLabels[booking.status]}`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
    `Telefon: ${booking.customerPhone}`,
    `E-Mail: ${booking.customerEmail}`,
    `Leistung: ${booking.serviceName}`,
    `Preis: CHF ${booking.priceCHF}`,
    `Dauer: ${booking.durationMinutes} Minuten`,
    `Termin: ${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Zahlung: ${paymentMethodLabels[booking.paymentMethod]}`,
    booking.customerNotes ? `Notiz: ${booking.customerNotes}` : "Notiz: keine",
  ].join("\n");
}

export function buildCancellationNotification(booking: StoredBooking) {
  return [
    `Stornierung: ${booking.bookingNumber}`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
    `Termin: ${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Leistung: ${booking.serviceName}`,
  ].join("\n");
}

export function buildBookingWhatsAppHref(booking: StoredBooking) {
  const message = [
    `Hallo Silvia, ich möchte diesen Termin anfragen:`,
    `Buchung: ${booking.bookingNumber}`,
    `${booking.serviceName}`,
    `${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Preis: CHF ${booking.priceCHF}`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
    `Telefon: ${booking.customerPhone}`,
    `E-Mail: ${booking.customerEmail}`,
    `Zahlung: ${paymentMethodLabels[booking.paymentMethod]}`,
    booking.customerNotes ? `Notiz: ${booking.customerNotes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildCancellationWhatsAppHref(booking: StoredBooking) {
  const message = [
    `Hallo Silvia, ich möchte meinen Termin stornieren:`,
    `Buchung: ${booking.bookingNumber}`,
    `${booking.serviceName}`,
    `${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
  ].join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
