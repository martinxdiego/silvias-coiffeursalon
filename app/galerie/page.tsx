import type { Metadata } from "next";
import { BookingCta } from "@/components/booking-cta";
import { GalleryGrid } from "@/components/gallery-grid";
import { SectionHeader } from "@/components/section-header";
import { WhatsAppLink } from "@/components/whatsapp-link";

export const metadata: Metadata = {
  title: "Galerie | Silvias Coiffeursalon Emmenbrücke",
  description:
    "Galerie von Silvias Coiffeursalon in Emmenbrücke. Platzhalter für Salonfotos, Schnitte, Farben, Mèches, Balayage und Styling.",
};

export default function GaleriePage() {
  return (
    <main>
      <section className="bg-ivory py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            description="Die Struktur ist bereit für echte Bilder von Silvias Arbeiten und dem Salon in Emmenbrücke."
            eyebrow="Galerie"
            title="Schnitt, Farbe und Salonstimmung."
          />
          <div className="mt-10">
            <GalleryGrid showFilters />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-[2rem] border border-cocoa/10 bg-ivory p-7 shadow-[0_18px_50px_rgba(45,33,27,0.08)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Vorher / Nachher
            </p>
            <h2 className="font-serif text-3xl text-cocoa">
              Bereit für echte Transformationen.
            </h2>
            <p className="mt-4 leading-8 text-coffee">
              TODO: Hier kommen echte Vorher-Nachher-Beispiele von Farbe,
              Balayage, Schnitt und Styling hin, sobald Silvia passende Fotos
              freigegeben hat.
            </p>
          </article>
          <article className="rounded-[2rem] border border-cocoa/10 bg-cocoa p-7 text-ivory shadow-[0_18px_50px_rgba(45,33,27,0.12)]">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sand">
              Referenzbild
            </p>
            <h2 className="font-serif text-3xl">
              Du hast bereits eine Idee?
            </h2>
            <p className="mt-4 leading-8 text-ivory/76">
              Sende Silvia dein Referenzbild per WhatsApp und beschreibe kurz,
              was dir daran gefällt. So kann sie den Aufwand besser einschätzen.
            </p>
            <WhatsAppLink className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-sand px-6 text-sm font-semibold text-cocoa">
              Referenzbild per WhatsApp senden
            </WhatsAppLink>
          </article>
        </div>
      </section>

      <BookingCta
        text="Du kannst in der Buchung eine Notiz hinterlassen oder ein Referenzbild später per WhatsApp senden."
        title="Du hast bereits eine Idee?"
      />
    </main>
  );
}
