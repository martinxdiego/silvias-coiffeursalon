import type { ServiceCategory } from "@/data/services";

export type PaymentMethod =
  | "cash_on_site"
  | "twint_on_site"
  | "twint_after_confirmation"
  | "later_arrangement";

export type PaymentStatus = "pending" | "on_site_open" | "arrangement_open";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type BookingRequest = {
  serviceId: string;
  date: string;
  startTime: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  customerNotes?: string;
  paymentMethod: PaymentMethod;
  privacyAccepted: boolean;
  sendConfirmationEmail: boolean;
};

export type StoredBooking = {
  id: string;
  bookingNumber: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  priceCHF: number;
  durationMinutes: number;
  date: string;
  startTime: string;
  endTime: string;
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  customerNotes: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: BookingStatus;
  cancellationToken: string;
  createdAt: string;
  cancelledAt?: string;
  sendConfirmationEmail: boolean;
};

export type BookingResponse = {
  booking: StoredBooking;
  calendar: string;
  cancellationCalendar?: string;
  whatsappHref: string;
  cancellationHref: string;
};

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  cash_on_site: "Bar vor Ort",
  twint_on_site: "TWINT vor Ort",
  twint_after_confirmation: "TWINT nach Bestätigung",
  later_arrangement: "Zahlung später nach Absprache",
};

export const bookingStatusLabels: Record<BookingStatus, string> = {
  pending: "Anfrage erhalten",
  confirmed: "Bestätigt",
  cancelled: "Storniert",
};

export function getPaymentStatus(method: PaymentMethod): PaymentStatus {
  if (method === "twint_after_confirmation") {
    return "pending";
  }

  if (method === "later_arrangement") {
    return "arrangement_open";
  }

  return "on_site_open";
}

export function getPaymentStatusLabel(status: PaymentStatus) {
  if (status === "pending") {
    return "Zahlungsinfos folgen";
  }

  if (status === "arrangement_open") {
    return "Nach Absprache offen";
  }

  return "Vor Ort offen";
}
