import { siteConfig } from "@/data/site";
import { paymentMethodLabels, type StoredBooking } from "@/lib/booking-types";

export function buildSalonBookingNotification(booking: StoredBooking) {
  return [
    `Neue Buchung: ${booking.id}`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
    `Telefon: ${booking.customerPhone}`,
    `E-Mail: ${booking.customerEmail}`,
    `Leistung: ${booking.serviceName}`,
    `Kategorie: ${booking.category}`,
    `Preis: CHF ${booking.priceCHF}`,
    `Dauer: ${booking.durationMinutes} Minuten`,
    `Termin: ${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Zahlung: ${paymentMethodLabels[booking.paymentMethod]}`,
    booking.customerNotes ? `Notiz: ${booking.customerNotes}` : "Notiz: keine",
    `Admin-Link: ${siteConfig.url}/admin/bookings`,
  ].join("\n");
}

export function buildCustomerConfirmationNotification(booking: StoredBooking) {
  return [
    `Buchungsbestätigung ${booking.id}`,
    `Salon: ${siteConfig.name}`,
    `Adresse: ${siteConfig.addressLines.join(", ")}`,
    `Termin: ${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Leistung: ${booking.serviceName}`,
    `Preis: CHF ${booking.priceCHF}`,
    `Zahlung: ${paymentMethodLabels[booking.paymentMethod]}`,
    `Stornieren: ${siteConfig.url}${siteConfig.cancellationPath}?id=${booking.id}&token=${booking.cancellationToken}`,
  ].join("\n");
}

export function buildSalonCancellationNotification(booking: StoredBooking) {
  return [
    `Stornierung: ${booking.id}`,
    `Name: ${booking.customerFirstName} ${booking.customerLastName}`,
    `Termin: ${booking.date}, ${booking.startTime}-${booking.endTime}`,
    `Leistung: ${booking.serviceName}`,
  ].join("\n");
}

export async function notifySalonAboutBooking(booking: StoredBooking) {
  // TODO: If RESEND_API_KEY or SMTP credentials are configured, send this to
  // silviadeverin@gmail.com with the ICS attachment. Keep SDK clients lazily
  // initialized so next build does not require secrets.
  console.info("Salon booking email placeholder", buildSalonBookingNotification(booking));
}

export async function notifyCustomerAboutBooking(booking: StoredBooking) {
  if (!booking.sendConfirmationEmail) {
    return;
  }

  // TODO: Send customer confirmation email with booking summary, cancellation
  // link, and ICS attachment when a transactional email provider is configured.
  console.info("Customer confirmation email placeholder", buildCustomerConfirmationNotification(booking));
}

export async function notifySalonAboutCancellation(booking: StoredBooking) {
  // TODO: Send cancellation email to Silvia and update any external calendar
  // event when email/calendar credentials are configured.
  console.info("Salon cancellation email placeholder", buildSalonCancellationNotification(booking));
}
