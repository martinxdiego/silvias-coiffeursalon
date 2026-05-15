import { BookingLink } from "@/components/booking-link";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site";

type BookingCtaProps = {
  title?: string;
  text?: string;
};

export function BookingCta({
  title = "Bereit für deinen nächsten Termin?",
  text = "Wähle online deine Leistung oder melde dich direkt bei Silvia. Du erhältst eine klare Zusammenfassung und kannst den Termin in deinen Kalender speichern.",
}: BookingCtaProps) {
  return (
    <section className="bg-cocoa px-4 py-16 text-ivory sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-sand">
            Termin
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-ivory/74">
            {text}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <BookingLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sand px-6 text-sm font-semibold text-cocoa" />
          <WhatsAppLink className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/20 px-6 text-sm font-semibold text-ivory" />
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/20 px-6 text-sm font-semibold text-ivory"
            href={`tel:${siteConfig.mobileHref}`}
          >
            <Phone aria-hidden="true" className="size-4" />
            Anrufen
          </a>
        </div>
      </div>
    </section>
  );
}
