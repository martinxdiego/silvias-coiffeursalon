"use client";

import { Check, Download, MessageCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { downloadIcs } from "@/lib/calendar";
import {
  paymentMethodLabels,
  type BookingResponse,
  type StoredBooking,
} from "@/lib/booking-types";
import { formatBookingDate } from "@/lib/availability";

type CancellationFormProps = {
  initialBookingId?: string;
  initialToken?: string;
};

export function CancellationForm({
  initialBookingId = "",
  initialToken = "",
}: CancellationFormProps) {
  const [bookingId, setBookingId] = useState(initialBookingId);
  const [emailOrToken, setEmailOrToken] = useState(initialToken);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState<BookingResponse | null>(null);
  const [previewBooking, setPreviewBooking] = useState<StoredBooking | null>(null);

  async function findAppointment() {
    setSubmitting(true);
    setError("");
    setPreviewBooking(null);

    try {
      const params = new URLSearchParams({
        bookingId,
        emailOrToken,
      });
      const apiResponse = await fetch(`/api/bookings/cancel?${params.toString()}`);
      const data = (await apiResponse.json()) as { booking?: StoredBooking; error?: string };

      if (!apiResponse.ok || !data.booking) {
        throw new Error(data.error ?? "Die Buchung konnte nicht gefunden werden.");
      }

      setPreviewBooking(data.booking);
    } catch (findError) {
      setError(
        findError instanceof Error
          ? findError.message
          : "Die Buchung konnte nicht gefunden werden.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function cancelAppointment() {
    setSubmitting(true);
    setError("");

    try {
      const apiResponse = await fetch("/api/bookings/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, emailOrToken }),
      });
      const data = (await apiResponse.json()) as BookingResponse | { error?: string };

      if (!apiResponse.ok || !("booking" in data)) {
        throw new Error("error" in data ? data.error : "Der Termin konnte nicht storniert werden.");
      }

      setResponse(data);
    } catch (cancelError) {
      setError(
        cancelError instanceof Error
          ? cancelError.message
          : "Der Termin konnte nicht storniert werden.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (response) {
    const booking = response.booking;

    return (
      <div className="rounded-[2rem] border border-cocoa/10 bg-ivory p-6 shadow-[0_22px_70px_rgba(45,33,27,0.1)] sm:p-8">
        <div className="inline-flex size-14 items-center justify-center rounded-full bg-rose/20 text-cocoa">
          <Check aria-hidden="true" className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-4xl leading-tight text-cocoa">
          Dein Termin wurde storniert.
        </h2>
        <p className="mt-4 leading-8 text-coffee">
          Die Stornierung ist im Prototyp gespeichert. Nutze WhatsApp als
          zuverlässige Rückmeldung an Silvia, bis die echte E-Mail- und
          Kalender-Integration aktiv ist.
        </p>

        <dl className="mt-8 grid gap-4 rounded-[1.75rem] bg-cream p-5 sm:grid-cols-2">
          <SummaryRow label="Buchungsnummer" value={booking.bookingNumber} />
          <SummaryRow label="Leistung" value={booking.serviceName} />
          <SummaryRow
            label="Termin"
            value={`${formatBookingDate(booking.date)}, ${booking.startTime}-${booking.endTime}`}
          />
          <SummaryRow label="Zahlung" value={paymentMethodLabels[booking.paymentMethod]} />
        </dl>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-ivory"
            onClick={() =>
              response.cancellationCalendar
                ? downloadIcs(
                    `silvias-coiffeursalon-storno-${booking.bookingNumber}.ics`,
                    response.cancellationCalendar,
                  )
                : undefined
            }
            type="button"
          >
            <Download aria-hidden="true" className="size-4" />
            Storno in Kalender speichern
          </button>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 text-sm font-semibold text-cocoa"
            href={response.whatsappHref}
            rel="noreferrer"
            target="_blank"
          >
            <MessageCircle aria-hidden="true" className="size-4" />
            Silvia per WhatsApp informieren
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-cocoa/10 bg-ivory p-6 shadow-[0_22px_70px_rgba(45,33,27,0.1)] sm:p-8">
      <div className="inline-flex size-14 items-center justify-center rounded-full bg-sand/30 text-cocoa">
        <XCircle aria-hidden="true" className="size-7" />
      </div>
      <h2 className="mt-6 font-serif text-4xl leading-tight text-cocoa">
        Termin stornieren
      </h2>
      <p className="mt-4 leading-8 text-coffee">
        Gib deine Buchungsnummer und deine E-Mail-Adresse oder den Stornocode
        aus dem Link ein. Ohne echte Datenbank funktioniert dies aktuell nur
        innerhalb des laufenden Prototyps.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-cocoa">
          Buchungsnummer
          <input
            className="min-h-12 rounded-2xl border border-cocoa/10 bg-white px-4 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
            onChange={(event) => setBookingId(event.target.value)}
            placeholder="SC-..."
            value={bookingId}
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-cocoa">
          E-Mail oder Stornocode
          <input
            className="min-h-12 rounded-2xl border border-cocoa/10 bg-white px-4 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
            onChange={(event) => setEmailOrToken(event.target.value)}
            placeholder="name@example.ch"
            value={emailOrToken}
          />
        </label>
      </div>

      {error ? (
        <p className="mt-5 rounded-2xl bg-rose/15 px-4 py-3 text-sm font-medium text-cocoa">
          {error}
        </p>
      ) : null}

      {previewBooking ? (
        <div className="mt-7 rounded-[1.75rem] border border-cocoa/10 bg-cream p-5">
          <h3 className="font-serif text-2xl text-cocoa">Diesen Termin stornieren?</h3>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <SummaryRow label="Buchungsnummer" value={previewBooking.bookingNumber} />
            <SummaryRow label="Leistung" value={previewBooking.serviceName} />
            <SummaryRow
              label="Termin"
              value={`${formatBookingDate(previewBooking.date)}, ${previewBooking.startTime}-${previewBooking.endTime}`}
            />
            <SummaryRow
              label="Name"
              value={`${previewBooking.customerFirstName} ${previewBooking.customerLastName}`}
            />
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory disabled:cursor-not-allowed disabled:opacity-50"
              disabled={submitting}
              onClick={cancelAppointment}
              type="button"
            >
              {submitting ? "Wird storniert..." : "Stornierung bestätigen"}
            </button>
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-6 text-sm font-semibold text-cocoa"
              onClick={() => setPreviewBooking(null)}
              type="button"
            >
              Angaben ändern
            </button>
          </div>
        </div>
      ) : (
        <button
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          disabled={!bookingId || !emailOrToken || submitting}
          onClick={findAppointment}
          type="button"
        >
          {submitting ? "Wird gesucht..." : "Termin suchen"}
        </button>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-mocha">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-cocoa">{value}</dd>
    </div>
  );
}
