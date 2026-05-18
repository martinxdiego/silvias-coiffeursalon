import { siteConfig } from "@/data/site";
import { paymentMethodLabels, type StoredBooking } from "@/lib/booking-types";

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function toUtcStamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function dateFromBookingParts(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

export function createBookingIcs(booking: StoredBooking) {
  const start = dateFromBookingParts(booking.date, booking.startTime);
  const end = dateFromBookingParts(booking.date, booking.endTime);
  const description = [
    `Leistung: ${booking.serviceName}`,
    `Preis: CHF ${booking.priceCHF}`,
    `Dauer: ${booking.durationMinutes} Minuten`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
    `Kontakt: ${booking.customerFirstName} ${booking.customerLastName}, ${booking.customerPhone}, ${booking.customerEmail}`,
    `Zahlung: ${paymentMethodLabels[booking.paymentMethod]}`,
    `Buchungsnummer: ${booking.bookingNumber}`,
    `Stornieren: ${siteConfig.url}${siteConfig.cancellationPath}?id=${booking.bookingNumber}&token=${booking.cancellationToken}`,
    "Hinweis: Bitte melde dich frühzeitig, falls du den Termin nicht wahrnehmen kannst.",
  ].join("\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Silvias Coiffeursalon//Booking//DE-CH",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${booking.id}@silvias-coiffeursalon.vercel.app`,
    `DTSTAMP:${toUtcStamp(new Date(booking.createdAt))}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    "SUMMARY:Termin bei Silvias Coiffeursalon",
    `LOCATION:${escapeIcsText(siteConfig.addressLines.join(", "))}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    booking.status === "confirmed" ? "STATUS:CONFIRMED" : "STATUS:TENTATIVE",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function createCancellationIcs(booking: StoredBooking) {
  const start = dateFromBookingParts(booking.date, booking.startTime);
  const end = dateFromBookingParts(booking.date, booking.endTime);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Silvias Coiffeursalon//Booking Cancellation//DE-CH",
    "CALSCALE:GREGORIAN",
    "METHOD:CANCEL",
    "BEGIN:VEVENT",
    `UID:${booking.id}@silvias-coiffeursalon.vercel.app`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    "SUMMARY:Termin bei Silvias Coiffeursalon storniert",
    `LOCATION:${escapeIcsText(siteConfig.addressLines.join(", "))}`,
    `DESCRIPTION:${escapeIcsText(`Stornierung für Buchung ${booking.bookingNumber}`)}`,
    "STATUS:CANCELLED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
