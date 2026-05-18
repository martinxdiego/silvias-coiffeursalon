import type { Metadata } from "next";
import Link from "next/link";
import { formatBookingDate } from "@/lib/availability";
import { getAllBookings } from "@/lib/booking-store";
import { bookingStatusLabels, getPaymentStatusLabel, paymentMethodLabels } from "@/lib/booking-types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Buchungen",
  description: "Entwicklungsansicht für Buchungen von Silvias Coiffeursalon.",
};

export default function AdminBookingsPage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-cocoa/10 bg-ivory p-8 shadow-[0_22px_70px_rgba(45,33,27,0.1)]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
            Admin deaktiviert
          </p>
          <h1 className="font-serif text-4xl leading-tight text-cocoa">
            Diese Ansicht ist nur für die lokale Entwicklung gedacht.
          </h1>
          <p className="mt-4 leading-8 text-coffee">
            TODO: Vor Produktion Authentifizierung, rollenbasierte Rechte und
            eine echte Datenbank anbinden. Aus Datenschutzgründen werden auf der
            Live-Website keine Prototyp-Buchungen angezeigt.
          </p>
        </section>
      </main>
    );
  }

  const bookings = getAllBookings();

  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Admin Vorbereitung
        </p>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-serif text-5xl leading-tight text-cocoa">
              Buchungen
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-coffee">
              Entwicklungsansicht für gespeicherte Prototype-Buchungen. Diese
              Seite darf vor Produktion erst mit Authentifizierung und echten
              Berechtigungen online gehen.
            </p>
          </div>
          <Link
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory"
            href="/online-buchen"
          >
            Testbuchung erstellen
          </Link>
        </div>

        <div className="mt-8 rounded-[2rem] border border-cocoa/10 bg-ivory p-4 shadow-[0_22px_70px_rgba(45,33,27,0.1)]">
          <p className="mb-4 rounded-3xl bg-sand/25 p-4 text-sm leading-7 text-coffee">
            TODO: Authentifizierung, rollenbasierte Rechte, echte Datenbank,
            Audit-Log und sichere Admin-Aktionen ergänzen. Aktuell werden nur
            lokale In-Memory-Testbuchungen angezeigt.
          </p>

          {bookings.length === 0 ? (
            <div className="rounded-3xl bg-cream p-8 text-center text-coffee">
              Noch keine Buchungen im laufenden Prototyp gespeichert.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-cocoa/10 text-xs uppercase tracking-[0.16em] text-mocha">
                    <th className="px-3 py-4">Datum/Zeit</th>
                    <th className="px-3 py-4">Kunde</th>
                    <th className="px-3 py-4">Leistung</th>
                    <th className="px-3 py-4">Preis</th>
                    <th className="px-3 py-4">Zahlung</th>
                    <th className="px-3 py-4">Status</th>
                    <th className="px-3 py-4">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr className="border-b border-cocoa/10 last:border-0" key={booking.id}>
                      <td className="px-3 py-4 font-medium text-cocoa">
                        {formatBookingDate(booking.date)}
                        <span className="block text-mocha">
                          {booking.startTime}-{booking.endTime}
                        </span>
                        <span className="block text-xs text-mocha">{booking.bookingNumber}</span>
                      </td>
                      <td className="px-3 py-4 text-coffee">
                        {booking.customerFirstName} {booking.customerLastName}
                        <span className="block text-mocha">{booking.customerPhone}</span>
                      </td>
                      <td className="px-3 py-4 text-coffee">
                        {booking.serviceName}
                        <span className="block text-mocha">{booking.category}</span>
                      </td>
                      <td className="px-3 py-4 font-semibold text-cocoa">
                        CHF {booking.priceCHF}
                      </td>
                      <td className="px-3 py-4 text-coffee">
                        {paymentMethodLabels[booking.paymentMethod]}
                        <span className="block text-mocha">
                          {getPaymentStatusLabel(booking.paymentStatus)}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className="rounded-full bg-sand/30 px-3 py-1 text-xs font-semibold text-cocoa">
                          {bookingStatusLabels[booking.status]}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <Link
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-cocoa/15 bg-white px-4 text-xs font-semibold text-cocoa"
                          href={`/termin-stornieren?id=${booking.bookingNumber}&token=${booking.cancellationToken}`}
                        >
                          Stornieren
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
