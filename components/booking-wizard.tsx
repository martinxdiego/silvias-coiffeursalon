"use client";

import {
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  MessageCircle,
  Scissors,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { formatBookingDate, getBookableDays, getTimeSlotsForDate } from "@/lib/availability";
import { downloadIcs } from "@/lib/calendar";
import {
  getPaymentStatusLabel,
  paymentMethodLabels,
  type BookingRequest,
  type BookingResponse,
  type PaymentMethod,
} from "@/lib/booking-types";
import {
  activeServices,
  formatDuration,
  formatPrice,
  serviceCategories,
  type Service,
} from "@/data/services";

const steps = [
  { id: 1, label: "Leistung", icon: Scissors },
  { id: 2, label: "Termin", icon: Clock },
  { id: 3, label: "Kontakt", icon: UserRound },
  { id: 4, label: "Zahlung", icon: CreditCard },
  { id: 5, label: "Prüfen", icon: CalendarCheck },
];

const paymentOptions: Array<{
  id: PaymentMethod;
  title: string;
  text: string;
}> = [
  {
    id: "cash_on_site",
    title: "Bar vor Ort",
    text: "Du bezahlst den Termin direkt im Salon.",
  },
  {
    id: "twint_on_site",
    title: "TWINT vor Ort",
    text: "Du bezahlst im Salon per TWINT.",
  },
  {
    id: "twint_after_confirmation",
    title: "TWINT nach Bestätigung",
    text: "Du erhältst die Zahlungsinformationen nach Silvias Bestätigung.",
  },
  {
    id: "later_arrangement",
    title: "Zahlung später nach Absprache",
    text: "Silvia klärt die Zahlungsart persönlich mit dir.",
  },
];

type BookingWizardProps = {
  initialServiceId?: string;
};

type CustomerDetails = {
  customerFirstName: string;
  customerLastName: string;
  customerPhone: string;
  customerEmail: string;
  customerNotes: string;
  privacyAccepted: boolean;
  sendConfirmationEmail: boolean;
};

const initialDetails: CustomerDetails = {
  customerFirstName: "",
  customerLastName: "",
  customerPhone: "",
  customerEmail: "",
  customerNotes: "",
  privacyAccepted: false,
  sendConfirmationEmail: true,
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function BookingWizard({ initialServiceId }: BookingWizardProps) {
  const validInitialService = initialServiceId && activeServices.some((service) => service.id === initialServiceId)
    ? initialServiceId
    : activeServices[0].id;
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(validInitialService);
  const [selectedDate, setSelectedDate] = useState(() => getBookableDays(1)[0]?.date ?? "");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [details, setDetails] = useState<CustomerDetails>(initialDetails);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash_on_site");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

  const selectedService = activeServices.find((service) => service.id === selectedServiceId) ?? activeServices[0];
  const bookableDays = useMemo(() => getBookableDays(14), []);
  const timeSlots = useMemo(
    () =>
      selectedDate
        ? getTimeSlotsForDate(selectedDate, selectedService.durationMinutes)
        : [],
    [selectedDate, selectedService.durationMinutes],
  );
  const selectedSlot = timeSlots.find((slot) => slot.startTime === selectedStartTime);

  function updateDetails(field: keyof CustomerDetails, value: string | boolean) {
    setDetails((current) => ({ ...current, [field]: value }));
  }

  function selectService(service: Service) {
    setSelectedServiceId(service.id);
    setSelectedStartTime("");
  }

  function canContinue() {
    if (step === 1) {
      return Boolean(selectedService);
    }
    if (step === 2) {
      return Boolean(selectedDate && selectedSlot);
    }
    if (step === 3) {
      return Boolean(
        details.customerFirstName &&
          details.customerLastName &&
          details.customerPhone &&
          details.customerEmail &&
          isValidEmail(details.customerEmail) &&
          details.privacyAccepted,
      );
    }
    return true;
  }

  function nextStep() {
    setError("");
    if (!canContinue()) {
      setError("Bitte fülle die benötigten Angaben für diesen Schritt aus.");
      return;
    }
    setStep((current) => Math.min(current + 1, 5));
  }

  async function submitBooking() {
    if (!selectedSlot) {
      setError("Bitte wähle eine verfügbare Uhrzeit.");
      return;
    }

    const payload: BookingRequest = {
      serviceId: selectedService.id,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      customerFirstName: details.customerFirstName,
      customerLastName: details.customerLastName,
      customerPhone: details.customerPhone,
      customerEmail: details.customerEmail,
      customerNotes: details.customerNotes,
      paymentMethod,
      privacyAccepted: details.privacyAccepted,
      sendConfirmationEmail: details.sendConfirmationEmail,
    };

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as BookingResponse | { error?: string };

      if (!response.ok || !("booking" in data)) {
        throw new Error("error" in data ? data.error : "Die Buchung konnte nicht gespeichert werden.");
      }

      setBookingResponse(data);
    } catch (bookingError) {
      setError(
        bookingError instanceof Error
          ? bookingError.message
          : "Die Buchung konnte nicht gespeichert werden.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (bookingResponse) {
    const booking = bookingResponse.booking;

    return (
      <section className="mx-auto max-w-5xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-cocoa/10 bg-ivory p-6 shadow-[0_22px_70px_rgba(45,33,27,0.1)] sm:p-8">
          <div className="inline-flex size-14 items-center justify-center rounded-full bg-sage/20 text-cocoa">
            <Check aria-hidden="true" className="size-7" />
          </div>
          <h1 className="mt-6 font-serif text-4xl leading-tight text-cocoa sm:text-5xl">
            Vielen Dank, dein Termin wurde erfasst.
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-coffee">
            Die Buchung ist als Prototyp gespeichert. Für die Live-Version wird
            die E-Mail-Benachrichtigung an Silvia und die Kundenbestätigung
            angebunden. Nutze jetzt zusätzlich WhatsApp als sichere Bestätigung.
          </p>

          <BookingSummary
            bookingId={booking.id}
            date={booking.date}
            endTime={booking.endTime}
            paymentMethod={booking.paymentMethod}
            priceCHF={booking.priceCHF}
            category={booking.category}
            serviceName={booking.serviceName}
            startTime={booking.startTime}
            status={getPaymentStatusLabel(booking.paymentStatus)}
            customer={`${booking.customerFirstName} ${booking.customerLastName}`}
            phone={booking.customerPhone}
            email={booking.customerEmail}
            notes={booking.customerNotes}
            durationMinutes={booking.durationMinutes}
          />

          <p className="mt-5 rounded-3xl bg-cream p-4 text-sm leading-7 text-coffee">
            Adresse: Benziwilstrasse 4a, 6020 Emmenbrücke. Bitte melde dich
            frühzeitig, falls du den Termin nicht wahrnehmen kannst.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-5 text-sm font-semibold text-ivory"
              onClick={() =>
                downloadIcs(`silvias-coiffeursalon-${booking.id}.ics`, bookingResponse.calendar)
              }
              type="button"
            >
              <Download aria-hidden="true" className="size-4" />
              Termin in Kalender speichern
            </button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 text-sm font-semibold text-cocoa"
              href={bookingResponse.whatsappHref}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden="true" className="size-4" />
              An Silvia per WhatsApp senden
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 text-sm font-semibold text-cocoa"
              href={bookingResponse.cancellationHref}
            >
              Termin stornieren
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 text-sm font-semibold text-cocoa"
              href="/"
            >
              Zur Startseite
            </a>
          </div>

          <p className="mt-6 rounded-3xl bg-cream p-4 text-sm leading-7 text-coffee">
            Bitte melde dich frühzeitig, falls du den Termin nicht wahrnehmen
            kannst. Mit der Buchungsnummer {booking.id} kannst du den Termin
            später stornieren.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-[2rem] border border-cocoa/10 bg-ivory p-4 shadow-[0_22px_70px_rgba(45,33,27,0.1)] sm:p-7">
          <ProgressIndicator currentStep={step} />

          {step === 1 ? (
            <ServiceStep selectedServiceId={selectedService.id} onSelect={selectService} />
          ) : null}

          {step === 2 ? (
            <DateTimeStep
              days={bookableDays}
              selectedDate={selectedDate}
              selectedStartTime={selectedStartTime}
              setSelectedDate={(date) => {
                setSelectedDate(date);
                setSelectedStartTime("");
              }}
              setSelectedStartTime={setSelectedStartTime}
              slots={timeSlots}
            />
          ) : null}

          {step === 3 ? (
            <DetailsStep details={details} updateDetails={updateDetails} />
          ) : null}

          {step === 4 ? (
            <PaymentStep
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          ) : null}

          {step === 5 ? (
            <ReviewStep
              details={details}
              paymentMethod={paymentMethod}
              selectedDate={selectedDate}
              selectedService={selectedService}
              selectedSlot={selectedSlot}
            />
          ) : null}

          {error ? (
            <p className="mt-5 rounded-2xl bg-rose/15 px-4 py-3 text-sm font-medium text-cocoa">
              {error}
            </p>
          ) : null}

          <div className="mt-8 hidden items-center justify-between gap-3 border-t border-cocoa/10 pt-6 md:flex">
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-5 text-sm font-semibold text-cocoa disabled:cursor-not-allowed disabled:opacity-40"
              disabled={step === 1 || submitting}
              onClick={() => setStep((current) => Math.max(current - 1, 1))}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              Zurück
            </button>
            {step < 5 ? (
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!canContinue()}
                onClick={nextStep}
                type="button"
              >
                Weiter
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
            ) : (
              <button
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-6 text-sm font-semibold text-ivory disabled:cursor-not-allowed disabled:opacity-50"
                disabled={submitting}
                onClick={submitBooking}
                type="button"
              >
                {submitting ? "Wird gespeichert..." : "Termin buchen"}
              </button>
            )}
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <SelectedSummary
            paymentMethod={paymentMethod}
            selectedDate={selectedDate}
            selectedService={selectedService}
            selectedSlot={selectedSlot}
          />
        </aside>
      </div>

      <div className="sticky bottom-24 z-30 mt-6 rounded-[1.5rem] border border-cocoa/10 bg-ivory/95 p-3 shadow-[0_-16px_40px_rgba(45,33,27,0.12)] backdrop-blur md:hidden">
        <div className="mb-3 flex items-center justify-between gap-4 px-1 text-sm">
          <span className="font-semibold text-cocoa">{selectedService.name}</span>
          <span className="font-semibold text-cocoa">{formatPrice(selectedService.priceCHF)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cocoa/15 bg-white px-4 text-sm font-semibold text-cocoa disabled:opacity-40"
            disabled={step === 1 || submitting}
            onClick={() => setStep((current) => Math.max(current - 1, 1))}
            type="button"
          >
            Zurück
          </button>
          {step < 5 ? (
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-4 text-sm font-semibold text-ivory disabled:opacity-50"
              disabled={!canContinue()}
              onClick={nextStep}
              type="button"
            >
              Weiter
            </button>
          ) : (
            <button
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cocoa px-4 text-sm font-semibold text-ivory disabled:opacity-50"
              disabled={submitting}
              onClick={submitBooking}
              type="button"
            >
              Buchen
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mb-8 grid grid-cols-5 gap-2">
      {steps.map((item) => {
        const active = item.id <= currentStep;

        return (
          <li className="min-w-0" key={item.id}>
            <div
              className={`flex min-h-16 flex-col items-center justify-center rounded-2xl border px-2 text-center text-[11px] font-semibold transition sm:text-xs ${
                active
                  ? "border-cocoa bg-cocoa text-ivory"
                  : "border-cocoa/10 bg-cream text-mocha"
              }`}
            >
              <item.icon aria-hidden="true" className="mb-1 size-4" />
              {item.label}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ServiceStep({
  selectedServiceId,
  onSelect,
}: {
  selectedServiceId: string;
  onSelect: (service: Service) => void;
}) {
  return (
    <div>
      <StepTitle
        eyebrow="Schritt 1"
        title="Welche Leistung möchtest du buchen?"
        text="Wähle eine Leistung. Preis und Dauer bleiben während der Buchung sichtbar."
      />
      <div className="mt-8 grid gap-6">
        {serviceCategories.map((category) => (
          <div key={category}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              {category}
            </h3>
            <div className="grid gap-3">
              {activeServices
                .filter((service) => service.category === category)
                .map((service) => {
                  const selected = service.id === selectedServiceId;

                  return (
                    <button
                      className={`rounded-3xl border p-4 text-left transition ${
                        selected
                          ? "border-cocoa bg-cocoa text-ivory shadow-[0_18px_44px_rgba(45,33,27,0.16)]"
                          : "border-cocoa/10 bg-cream text-cocoa hover:border-gold/50 hover:bg-white"
                      }`}
                      key={service.id}
                      onClick={() => onSelect(service)}
                      type="button"
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span>
                          <span className="block font-serif text-2xl leading-tight">
                            {service.name}
                          </span>
                          <span
                            className={`mt-2 block text-sm leading-6 ${
                              selected ? "text-ivory/72" : "text-coffee"
                            }`}
                          >
                            {service.description}
                          </span>
                        </span>
                        <span className="shrink-0 text-right text-sm font-semibold">
                          {formatPrice(service.priceCHF)}
                          <span className="mt-1 block font-normal">
                            {formatDuration(service.durationMinutes)}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DateTimeStep({
  days,
  selectedDate,
  selectedStartTime,
  setSelectedDate,
  setSelectedStartTime,
  slots,
}: {
  days: ReturnType<typeof getBookableDays>;
  selectedDate: string;
  selectedStartTime: string;
  setSelectedDate: (date: string) => void;
  setSelectedStartTime: (time: string) => void;
  slots: ReturnType<typeof getTimeSlotsForDate>;
}) {
  return (
    <div>
      <StepTitle
        eyebrow="Schritt 2"
        title="Wähle Datum und Uhrzeit."
        text="Termine werden aus den Öffnungszeiten generiert. Sonntage und vergangene Zeiten sind gesperrt."
      />
      {/* TODO: Replace generated slots with real availability sync from a database/calendar. */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {days.map((day) => (
          <button
            className={`rounded-3xl border p-4 text-left transition ${
              selectedDate === day.date
                ? "border-cocoa bg-cocoa text-ivory"
                : "border-cocoa/10 bg-cream text-cocoa hover:border-gold/50 hover:bg-white"
            }`}
            key={day.date}
            onClick={() => setSelectedDate(day.date)}
            type="button"
          >
            <span className="block font-semibold">{day.shortLabel}</span>
            <span className="mt-1 block text-xs opacity-75">{day.openingLabel}</span>
          </button>
        ))}
      </div>
      <div className="mt-7">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          Freie Zeiten
        </h3>
        {slots.length > 0 ? (
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {slots.map((slot) => (
              <button
                className={`min-h-12 rounded-2xl border px-3 text-sm font-semibold transition ${
                  selectedStartTime === slot.startTime
                    ? "border-cocoa bg-cocoa text-ivory"
                    : "border-cocoa/10 bg-white text-cocoa hover:border-gold/50"
                }`}
                key={slot.startTime}
                onClick={() => setSelectedStartTime(slot.startTime)}
                type="button"
              >
                {slot.startTime}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 rounded-2xl bg-cream p-4 text-sm leading-6 text-coffee">
            Für diesen Tag gibt es keine passende Zeit mehr. Bitte wähle ein
            anderes Datum.
          </p>
        )}
      </div>
    </div>
  );
}

function DetailsStep({
  details,
  updateDetails,
}: {
  details: CustomerDetails;
  updateDetails: (field: keyof CustomerDetails, value: string | boolean) => void;
}) {
  return (
    <div>
      <StepTitle
        eyebrow="Schritt 3"
        title="Wie kann Silvia dich erreichen?"
        text="Nur die wichtigsten Angaben, damit der Termin bestätigt oder bei Rückfragen geklärt werden kann."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <TextField
          label="Vorname"
          name="first-name"
          onChange={(value) => updateDetails("customerFirstName", value)}
          value={details.customerFirstName}
        />
        <TextField
          label="Nachname"
          name="last-name"
          onChange={(value) => updateDetails("customerLastName", value)}
          value={details.customerLastName}
        />
        <TextField
          label="Telefon"
          name="phone"
          onChange={(value) => updateDetails("customerPhone", value)}
          type="tel"
          value={details.customerPhone}
        />
        <TextField
          label="E-Mail"
          name="email"
          onChange={(value) => updateDetails("customerEmail", value)}
          type="email"
          value={details.customerEmail}
        />
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-cocoa">
        Nachricht optional
        <textarea
          className="min-h-32 resize-y rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
          onChange={(event) => updateDetails("customerNotes", event.target.value)}
          placeholder="Zum Beispiel Haarlänge, Farbwunsch oder bevorzugte Kontaktzeit."
          value={details.customerNotes}
        />
      </label>
      <label className="mt-5 flex items-start gap-3 rounded-3xl bg-cream p-4 text-sm leading-6 text-coffee">
        <input
          checked={details.privacyAccepted}
          className="mt-1 size-4 accent-cocoa"
          onChange={(event) => updateDetails("privacyAccepted", event.target.checked)}
          type="checkbox"
        />
        <span>
          Ich akzeptiere die Datenschutz- und Buchungsbedingungen. Rechtliche
          Detailseiten werden vor dem Launch ergänzt.
        </span>
      </label>
      <label className="mt-3 flex items-start gap-3 rounded-3xl bg-cream p-4 text-sm leading-6 text-coffee">
        <input
          checked={details.sendConfirmationEmail}
          className="mt-1 size-4 accent-cocoa"
          onChange={(event) => updateDetails("sendConfirmationEmail", event.target.checked)}
          type="checkbox"
        />
        <span>Ich möchte eine Terminbestätigung per E-Mail erhalten.</span>
      </label>
    </div>
  );
}

function PaymentStep({
  paymentMethod,
  setPaymentMethod,
}: {
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
}) {
  return (
    <div>
      <StepTitle
        eyebrow="Schritt 4"
        title="Wie möchtest du bezahlen?"
        text="Online-Zahlung per TWINT wird vorbereitet. Aktuell kann die Bezahlung vor Ort oder nach Absprache erfolgen."
      />
      {/* TODO: Real TWINT payments require a Swiss provider such as Datatrans,
      Worldline, Payrexx, a Stripe-compatible workaround or another Swiss
      payment provider. Do not collect payment here until credentials and
      contracts are configured. */}
      <div className="mt-8 grid gap-3">
        {paymentOptions.map((option) => {
          const selected = paymentMethod === option.id;

          return (
            <button
              className={`rounded-3xl border p-5 text-left transition ${
                selected
                  ? "border-cocoa bg-cocoa text-ivory"
                  : "border-cocoa/10 bg-cream text-cocoa hover:border-gold/50 hover:bg-white"
              }`}
              key={option.id}
              onClick={() => setPaymentMethod(option.id)}
              type="button"
            >
              <span className="block font-serif text-2xl">{option.title}</span>
              <span className={`mt-2 block text-sm ${selected ? "text-ivory/72" : "text-coffee"}`}>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReviewStep({
  selectedService,
  selectedDate,
  selectedSlot,
  details,
  paymentMethod,
}: {
  selectedService: Service;
  selectedDate: string;
  selectedSlot?: { startTime: string; endTime: string };
  details: CustomerDetails;
  paymentMethod: PaymentMethod;
}) {
  return (
    <div>
      <StepTitle
        eyebrow="Schritt 5"
        title="Bitte prüfe deine Anfrage."
        text="Wenn alles stimmt, wird der Termin erfasst. Danach kannst du ihn direkt in deinen Kalender speichern."
      />
      <BookingSummary
        customer={`${details.customerFirstName} ${details.customerLastName}`}
        date={selectedDate}
        endTime={selectedSlot?.endTime ?? ""}
        paymentMethod={paymentMethod}
        priceCHF={selectedService.priceCHF}
        category={selectedService.category}
        serviceName={selectedService.name}
        startTime={selectedSlot?.startTime ?? ""}
        phone={details.customerPhone}
        email={details.customerEmail}
        notes={details.customerNotes}
        durationMinutes={selectedService.durationMinutes}
      />
      <p className="mt-5 rounded-3xl bg-sand/25 p-4 text-sm leading-7 text-coffee">
        Nach der Buchung erhält Silvia alle Termindetails. Du kannst den Termin
        anschliessend in deinem Kalender speichern.
      </p>
      {paymentMethod === "twint_after_confirmation" ? (
        <p className="mt-5 rounded-3xl bg-sand/25 p-4 text-sm leading-7 text-coffee">
          TWINT Hinweis: Du erhältst die Zahlungsinformationen nach der Buchung.
        </p>
      ) : null}
    </div>
  );
}

function SelectedSummary({
  selectedService,
  selectedDate,
  selectedSlot,
  paymentMethod,
}: {
  selectedService: Service;
  selectedDate: string;
  selectedSlot?: { startTime: string; endTime: string };
  paymentMethod: PaymentMethod;
}) {
  return (
    <div className="rounded-[2rem] border border-cocoa/10 bg-cocoa p-6 text-ivory shadow-[0_22px_70px_rgba(45,33,27,0.16)]">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand">
        Deine Auswahl
      </p>
      <h2 className="mt-4 font-serif text-3xl leading-tight">{selectedService.name}</h2>
      <dl className="mt-6 grid gap-4 text-sm">
        <SummaryRow label="Preis" value={formatPrice(selectedService.priceCHF)} />
        <SummaryRow label="Dauer" value={formatDuration(selectedService.durationMinutes)} />
        <SummaryRow
          label="Datum"
          value={selectedDate ? formatBookingDate(selectedDate) : "Noch offen"}
        />
        <SummaryRow
          label="Zeit"
          value={selectedSlot ? `${selectedSlot.startTime}-${selectedSlot.endTime}` : "Noch offen"}
        />
        <SummaryRow label="Zahlung" value={paymentMethodLabels[paymentMethod]} />
      </dl>
      <p className="mt-6 rounded-3xl bg-ivory/10 p-4 text-sm leading-6 text-ivory/76">
        Was passiert danach? Du erhältst eine Zusammenfassung, eine Kalenderdatei
        und eine WhatsApp-Vorlage an Silvia.
      </p>
    </div>
  );
}

function BookingSummary({
  bookingId,
  serviceName,
  priceCHF,
  category,
  date,
  startTime,
  endTime,
  customer,
  paymentMethod,
  status,
  phone,
  email,
  notes,
  durationMinutes,
}: {
  bookingId?: string;
  serviceName: string;
  priceCHF: number;
  category?: string;
  date: string;
  startTime: string;
  endTime: string;
  customer?: string;
  paymentMethod: PaymentMethod;
  status?: string;
  phone?: string;
  email?: string;
  notes?: string;
  durationMinutes?: number;
}) {
  return (
    <div className="mt-8 rounded-[1.75rem] border border-cocoa/10 bg-cream p-5">
      <dl className="grid gap-4 sm:grid-cols-2">
        {bookingId ? <SummaryRow label="Buchung" value={bookingId} /> : null}
        <SummaryRow label="Leistung" value={serviceName} />
        {category ? <SummaryRow label="Kategorie" value={category} /> : null}
        <SummaryRow label="Preis" value={formatPrice(priceCHF)} />
        {durationMinutes ? (
          <SummaryRow label="Dauer" value={formatDuration(durationMinutes)} />
        ) : null}
        <SummaryRow label="Datum" value={date ? formatBookingDate(date) : "Noch offen"} />
        <SummaryRow label="Zeit" value={startTime ? `${startTime}-${endTime}` : "Noch offen"} />
        {customer ? <SummaryRow label="Name" value={customer} /> : null}
        {phone ? <SummaryRow label="Telefon" value={phone} /> : null}
        {email ? <SummaryRow label="E-Mail" value={email} /> : null}
        <SummaryRow label="Zahlung" value={paymentMethodLabels[paymentMethod]} />
        {status ? <SummaryRow label="Status" value={status} /> : null}
        {notes ? <SummaryRow label="Notiz" value={notes} /> : null}
      </dl>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] opacity-60">
        {label}
      </dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

function StepTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-tight text-cocoa">{title}</h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-coffee">{text}</p>
    </div>
  );
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-cocoa">
      {label}
      <input
        className="min-h-12 rounded-2xl border border-cocoa/10 bg-white px-4 text-base outline-none transition placeholder:text-mocha/45 focus:border-gold focus:ring-4 focus:ring-gold/15"
        name={name}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}
